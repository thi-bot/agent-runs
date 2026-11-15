import fs from 'node:fs';
import path from 'node:path';
import {score} from '/home/thibaudcolas/.agents/skills/a11y-core/scripts/merge-findings.mjs';
const project='/home/thibaudcolas/dev/guide';
const run=path.join(project,'.a11y-history/2026-10-06-production');
const raw=path.join(run,'raw');
const reportFile=process.argv[2]||path.join(project,'WEB-ACCESSIBILITY-AUDIT.md');
const settings=JSON.parse(fs.readFileSync(path.join(raw,'report-settings.json')));
let report=fs.readFileSync(reportFile,'utf8');
const merged=JSON.parse(report.match(/```json a11y-findings\n([\s\S]*?)\n```/)[1]);
const crawl=[...new Map(JSON.parse(fs.readFileSync(path.join(raw,'crawl.json'))).filter(r=>!r.url.endsWith('/SKILL.md')).map(r=>[r.url,r])).values()];
const responsive=JSON.parse(fs.readFileSync(path.join(raw,'responsive.json'))).filter(r=>!r.url.endsWith('/SKILL.md'));
const states=JSON.parse(fs.readFileSync(path.join(raw,'states.json')));
const good=crawl.filter(r=>r.status===200), broken=crawl.filter(r=>r.status===404);
const routes=[...new Set(good.map(r=>new URL(r.url).pathname))];
const esc=s=>String(s??'').replace(/\|/g,'\\|').replace(/\n/g,' ');
const rows=(headers,items)=>['| '+headers.join(' | ')+' |','| '+headers.map(()=>'---').join(' | ')+' |',...items.map(r=>'| '+r.map(esc).join(' | ')+' |')].join('\n');
const urlLink=u=>`[${new URL(u).pathname+new URL(u).search}](${u})`;
const wcag=merged.findings.filter(f=>f.wcag!=='n/a');
const advice=merged.findings.filter(f=>f.wcag==='n/a');
const additions=[];
additions.push('## Audit scope and methodology','',rows(['Field','Value'],[
 ['Target',settings.target],['Production',settings.production],['Source revision',settings.sourceCommit],['Tool versions',settings.tooling],['Crawl',`${JSON.parse(fs.readFileSync(path.join(raw,'crawl-summary.json'))).count} navigations; ${crawl.length} unique final HTML addresses; ${good.length} successful addresses (${routes.length} distinct content paths, plus version aliases); ${broken.length} linked error addresses`],['Languages','English, Icelandic, French, Brazilian Portuguese, Arabic'],['Axe tags',settings.tags.join(', ')],['Additional states',`${states.length} baseline/search/copy/feedback snapshots; keyboard, AX and tooltip checks stored separately`],['Full sweep',`${responsive.length} successful HTML addresses tested in dark theme, at 320 CSS px, and with WCAG text-spacing overrides`],['Screenshots','None captured or inspected'],['Production writes',settings.feedback],['Scan configuration',settings.config],['Excluded',settings.exclusions.join('; ')]]),'',
 'Discovery followed the sitemap and every same-origin public HTML link found, including translated navigation, version redirects and broken destinations. Fragments were checked against heading IDs. Query-driven search and interaction states were tested separately. Non-HTML Markdown resources were excluded from WCAG HTML findings, including one synthetic browser document generated for a plaintext SKILL.md response. Source review used the local revision above; the deployed revision was not independently identified.','',
 `${wcag.length} findings identify WCAG A/AA failures; ${advice.length} findings are explicitly marked n/a and are usability, content or structural recommendations. Repeated instances are grouped by root cause, so fixing one shared component can address many pages. The generated headline score is the skill renderer’s finding-set score, not a percentage of WCAG criteria met or a conformance certificate.`, '',
 'The shipped scorer uses weights critical=10, serious=5, moderate=2 and minor=1, adjusted by confidence, and normalizes against findings plus named passed checks. Its grade thresholds are A≥90, B≥80, C≥70, D≥60, otherwise F. This implementation differs from the prose scoring example in the wizard reference; this report consistently uses the required renderer implementation.', '',
 'Evidence and reproducibility: [audit history](.a11y-history/2026-10-06-production/), [raw crawl](.a11y-history/2026-10-06-production/raw/crawl.json), [responsive sweep](.a11y-history/2026-10-06-production/raw/responsive.json), [interaction states](.a11y-history/2026-10-06-production/raw/states.json), [runtime inventory](.a11y-history/2026-10-06-production/raw/runtime-inventory.json). Reproduction scripts and settings are saved beside the raw evidence.','');
additions.push('## Findings evidence and verification','', 'The source excerpts below show the reviewed implementation. Apply the adjacent remediation in the findings table, then use the verification step to check the result. Content findings require editing the published CMS content as well as any exported source.','');
const verify=f=>{
 if(f.rule.startsWith('CONTRAST'))return 'Repeat computed contrast and axe checks in light/dark themes and forced-colors mode as applicable.';
 if(f.rule.startsWith('LANG'))return 'Inspect the HTML lang attributes and verify pronunciation with a screen reader on the affected locales/search/error pages.';
 if(f.rule.startsWith('LIVE'))return 'Verify success, empty and error outcomes with NVDA and VoiceOver while focus remains on the invoking control; intercept feedback POSTs.';
 if(f.rule.startsWith('REFLOW'))return 'At 320 CSS px and 400% desktop zoom, confirm all page tools and text remain available without two-dimensional scrolling; repeat text-spacing overrides.';
 if(f.rule.includes('TOOLTIP'))return 'Move the pointer onto the tooltip and press Escape; content should persist while hovered and be dismissible when required.';
 if(f.rule.startsWith('LINK'))return 'Follow each affected link from its source page and confirm a public translated destination returns HTTP 200.';
 if(f.rule.includes('LABEL'))return 'Open search from the full search page and confirm input.labels and accessibility-tree names point to each corresponding field.';
 if(f.rule.includes('MOBILE')||f.rule.includes('MODAL'))return 'Use Tab, Shift+Tab, Enter/Space and Escape on desktop/mobile; confirm names/state and that no focused control is obscured.';
 if(f.rule.includes('THEME'))return 'Toggle with Enter/Space and confirm the accessibility tree and screen reader expose the correct selected state after initial load and each change.';
 if(f.rule.includes('NAV'))return 'Navigate to multiple articles and confirm only the current link exposes aria-current=page.';
 if(f.wcag.startsWith('1.1.1'))return 'Review each informative image with its surrounding prose and provide equivalent localized text; confirm decorative images stay silent.';
 return 'Recheck the affected component/content after the proposed remediation.';
};
const snippets={
 'LANG-SHARED-001':'<html lang="{{ self.locale.language_code|default:LANGUAGE_CODE }}">',
 'LANG-UNTRANSLATED-PARTS-001':'<!-- Keep the page language correct and mark each untranslated English region. -->\n<div lang="en">…English source content…</div>',
 'ARIA-NAV-CURRENT-001':'currentLink.classList.add("active");\ncurrentLink.setAttribute("aria-current", "page");',
 'ARIA-MOBILE-POPUP-001':'<button aria-expanded="false" aria-controls="primary-navigation">…</button>\n<nav id="primary-navigation">…</nav>',
 'ARIA-THEME-STATE-001':'<button aria-label="Dark mode" aria-pressed="false">…</button>\n// Synchronize at initialization and after theme changes.\nbutton.setAttribute("aria-pressed", String(isDark));',
 'FORM-SEARCH-DUPLICATE-LABEL-TARGET':'<label for="page-search">Search</label>\n<input id="page-search" name="query">\n<!-- Modal has its own unique id. -->\n<label for="modal-search">Search</label>\n<input id="modal-search" name="query" data-search-input>',
 'MODAL-ACCESSIBLE-NAME':'<div id="search-modal" class="search modal fade" tabindex="-1"\n     aria-label="{% trans \'Search\' %}" aria-hidden="true">…</div>',
 'LIVE-001':'<div data-results-count-container role="status" aria-atomic="true"></div>',
 'LIVE-002':'<span data-copy-status role="status" aria-atomic="true"></span>\n// After a successful clipboard write, update this persistent region.\nstatus.textContent = translatedCopiedMessage;',
 'LIVE-003':'<p data-feedback-status role="status" aria-atomic="true"></p>\n<!-- Keep this node outside containers whose children are removed. -->',
 'REFLOW-001':'.page-tools { flex-wrap: wrap; }\n.language-selector { min-inline-size: 0; }\n.language-selector__toggle { white-space: normal; overflow-wrap: anywhere; }',
 'TOOLTIP-FEEDBACK-NOT-HOVERABLE':'<!-- One option: replace hover-only explanations with visible action labels. -->\n<button type="button">{% trans \'This page was helpful\' %}</button>'
};
merged.findings.forEach((f,i)=>{
 additions.push(`### ${i+1}. ${f.rule}: ${f.summary}`,'',`**${f.severity}; ${f.wcag}; confidence ${f.confidence||'high'}** — ${f.location}`,'',`**Evidence:** ${f.evidence||'See specialist payload and corresponding raw evidence.'}`,'');
 const match=f.location.match(/^([^:]+):(\d+)$/);
 if(match){const file=path.join(project,match[1]);if(fs.existsSync(file)){const text=fs.readFileSync(file,'utf8').split('\n'),line=+match[2];additions.push('Reviewed source excerpt:','','```'+(file.endsWith('.py')?'python':file.endsWith('.scss')?'scss':file.endsWith('.js')?'javascript':'html'),...text.slice(Math.max(0,line-2),line+2),'```','');}}
 additions.push(`**Remediation:** ${f.fix}`,'');
 if(snippets[f.rule])additions.push('Example remediation (adapt translations and component wiring):','','```'+(f.rule==='REFLOW-001'?'css':'html'),snippets[f.rule],'```','');
 additions.push(`**Verify:** ${verify(f)}`,'');
});
additions.push('## Axe-core scan results','', 'See [ACCESSIBILITY-SCAN.md](ACCESSIBILITY-SCAN.md) for the complete automated state matrix and [ACCESSIBILITY-SCAN.json](ACCESSIBILITY-SCAN.json) for machine-readable results.', '', 'The complete scan is stored as JSON. The scorecard below covers initial rendered HTML; interaction and manual findings above can fail even when this baseline has zero axe violations. Each row uses the shipped scorer with failed rule types and the number of passing axe rules; its score is diagnostic only.','');
const resp=new Map(responsive.map(r=>[r.url,r]));
const scoreRows=crawl.sort((a,b)=>a.url.localeCompare(b.url)).map(r=>{const violations=r.axe.violations;const fs_=violations.map(v=>({severity:v.impact||'moderate'}));const s=score(fs_,r.axe.passes.length);return [urlLink(r.url),r.status,`${s.score} (${s.grade})`,violations.map(v=>`${v.id} (${v.nodes.length})`).join('; ')||'0',r.axe.passes.length,r.axe.incomplete.length,resp.get(r.url)?.mobile?.scrollWidth??'—'];});
additions.push(rows(['Final HTML address','HTTP','Baseline score','Axe failing rules (nodes)','Passed rules','Manual-review rules','320px document width'],scoreRows),'');
const allRuns=[...crawl.map(r=>r.axe),...responsive.flatMap(r=>[r.dark?.axe,r.mobile?.axe]),...states.map(r=>r.axe)].filter(Boolean);
const ruleCounts=new Map();for(const run of allRuns)for(const v of run.violations){const z=ruleCounts.get(v.id)||{tests:0,nodes:0,url:v.helpUrl};z.tests++;z.nodes+=v.nodes.length;ruleCounts.set(v.id,z);}
additions.push('### Rule cross-reference','',rows(['Axe rule','Scan-state occurrences','Node occurrences','Reference'],[...ruleCounts].map(([id,c])=>[id,c.tests,c.nodes,`[Rule help](${c.url})`])),'', 'Counts across states deliberately include the same defect recurring in different views. The findings list counts distinct remediation causes once. The explicit aria-dialog-name check is a separately targeted best-practice rule, manually assessed against ARIA naming requirements; it is absent from the WCAG-tag baseline.','');
const coverageFile=path.join(raw,'wcag-coverage.json');
if(fs.existsSync(coverageFile)){const c=JSON.parse(fs.readFileSync(coverageFile));const items=Array.isArray(c)?c:(c.criteria||c.coverage||[]);additions.push('## WCAG 2.2 A/AA coverage','', 'Status reflects the tests performed and the limitations recorded; no issue found is not a conformance claim.', '', rows(['Criterion','Name','Status','Evidence / limitation'],items.map(i=>[i.criterion||i.id,i.name,i.status,i.evidence||i.notes])), '');}
additions.push('## Cross-page patterns and remediation order','',rows(['Priority','Shared cause','Reach','Action'],[
 ['1','Content language and informative image alternatives','Translated content; search and all linked 404 pages','Correct page/region language and informative alternatives; coordinate with translation/CMS editors.'],
 ['1','Mobile navigation and page-tool layout','Shared navigation; Icelandic mobile pages','Ensure focused controls remain visible and allow page tools to wrap.'],
 ['1','Status announcements','Search and feedback shared flows','Use persistent status regions; test rating, query and error paths.'],
 ['2','Badge and alert colors','Affected English and translated articles','Change the shared color styles once; confirm contrast in both themes.'],
 ['2','Names, relationships and state','Theme, primary nav, mobile menu and search modal','Expose selected/current states and unique input label relationships.'],
 ['3','Functional/content recommendations','Unavailable locale links and specific content pages','Repair broken destinations and structural recommendations; keep n/a findings distinct from WCAG failures.']]),'', 'No source fixes were applied during this audit. No CI workflow or scan configuration was installed.','');
additions.push('## Page metadata dashboard','',rows(['Check','Successful HTML pages present','Missing / needs review'],[
 ['Document title',good.filter(r=>r.title).length,good.filter(r=>!r.title).length],['Document language',good.filter(r=>r.lang).length,good.filter(r=>!r.lang).length],['Viewport meta',good.filter(r=>r.meta?.viewport).length,good.filter(r=>!r.meta?.viewport).length],['Main landmark',good.filter(r=>r.meta?.main).length,good.filter(r=>!r.meta?.main).length],['Image alt attribute',good.flatMap(r=>r.images).filter(i=>i.alt!==null).length,good.flatMap(r=>r.images).filter(i=>i.alt===null).length],['Empty image alt',0,good.flatMap(r=>r.images).filter(i=>i.alt==='').length]]),'', 'An alt attribute being present does not prove its content is equivalent. Empty alternatives are appropriate for decorative/redundant imagery; informative localized examples and manual-review items are identified in the findings/evidence. Search and error views are tracked separately and fail document-language checks.','');
additions.push('## Testing coverage, limitations and next verification','',...settings.limitations.map(s=>'- '+s),'', 'No tables, interactive grids, audio, video, iframes, public authentication flows, drag-only tasks, repeated-entry process or user-facing session timeout were found in the audited public content. Criteria specific to those features are not applicable within this scope. Backend validation, unavailable network/clipboard outcomes and native assistive-technology/device behavior still need targeted tests.','',
 'Before a conformance claim, run NVDA with Firefox and Chrome, VoiceOver with Safari on macOS/iOS, and TalkBack with Chrome on Android. Verify navigation landmark distinction, document/region pronunciation, menu focus visibility, dialog names, both search labels, result announcements, selected theme/current page, clipboard outcomes and feedback outcomes. Use a test environment or intercept feedback POSTs. Repeat native 400% zoom, Firefox text enlargement, orientation and operating-system high-contrast checks.','',
 'For regression coverage, extend Django tests for language fallback and unique search IDs, Vitest checks for theme/current-page state, and Playwright/axe tests for initial and open states across light/dark themes and mobile widths. Include an Icelandic home page, English full search, a contrast-affected article and a missing URL. Fail on confirmed A/AA violations rather than trusting a normalized score. Re-run each remediation group immediately; perform a full route/state re-audit before release and repeat content scans periodically.','',
 'Authoritative references: [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/), [Focus Not Obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html), [Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html).','');
report=report.replace('## Findings data\n',additions.join('\n')+'\n## Findings data\n');
fs.writeFileSync(reportFile,report);
fs.writeFileSync(path.join(raw,'report-summary.json'),JSON.stringify({score:merged.score,grade:merged.grade,counts:merged.counts,findings:merged.findings.length,wcagFindings:wcag.length,advisories:advice.length,htmlAddresses:crawl.length,successful:good.length,contentPaths:routes.length,errors:broken.length,responsive:responsive.length,states:states.length,axeRuns:allRuns.length},null,2));
console.log(JSON.stringify({file:reportFile,findings:merged.findings.length,score:merged.score,htmlAddresses:crawl.length,responsive:responsive.length}));
