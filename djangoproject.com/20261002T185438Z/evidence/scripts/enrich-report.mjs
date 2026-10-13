import fs from 'node:fs';
import path from 'node:path';
import {gunzipSync} from 'node:zlib';
const root='/home/thibaudcolas/dev/djangoproject.com';
const run='.a11y-history/20261002T185438Z';
const read=p=>JSON.parse(fs.readFileSync(path.join(root,run,'evidence',p),'utf8'));
const summary=read('runtime-summary.json'),manifest=read('crawl-manifest.json'),meta=read('audit-metadata.json');
const reportPath=path.join(root,'WEB-ACCESSIBILITY-AUDIT.md');
let report=fs.readFileSync(reportPath,'utf8');
const merged=JSON.parse(report.match(/```json a11y-findings\n([\s\S]*?)\n```/)[1]);
const escape=s=>String(s??'').replace(/\|/g,'\\|').replace(/\r?\n/g,' ');
const link=s=>`[${escape(new URL(s).pathname)}](${s})`;
const rawFiles=fs.readdirSync(path.join(root,run,'evidence','axe')).filter(f=>f.endsWith('.json')||f.endsWith('.json.gz')).sort();
const results=rawFiles.map(f=>f.endsWith('.gz')?JSON.parse(gunzipSync(fs.readFileSync(path.join(root,run,'evidence','axe',f))).toString()):read('axe/'+f));
const instances=results.reduce((n,r)=>n+r.summary.instances,0);
const failedRules={};
for(const item of results)for(const violation of item.result.violations){
 const group=failedRules[violation.id]??={id:violation.id,help:violation.help,helpUrl:violation.helpUrl,pages:[],instances:0};
 group.pages.push(item.summary.url);group.instances+=violation.nodes.length;
}
const scopeRows=[['Target standard',meta.target],['Framework',meta.framework],['Method',meta.method],['Review depth',meta.depth],['Production pages scanned',summary.pages.length],['Starting URL','https://www.djangoproject.com/'],['Runtime host',meta.host],['Source revision',meta.sourceCommit],['Browser',summary.browser],['Playwright',summary.playwright],['axe-core',summary.axe],['axe tags',summary.tags.join(', ')],['Baseline viewport/theme',summary.viewport+', explicit light color scheme'],['Additional visual scenes','7 URLs x 2 widths (1440/320) x 2 explicit themes = 28'],['Behavioral testing','4 URLs; keyboard, disclosure/menu state, custom donation amount and accessible names'],['Screenshots','Disabled as requested'],['Baseline comparison','No previous report supplied'],['Product changes','None']];
let supplemental='## Audit scope and limitations\n\n| Field | Value |\n|---|---|\n'+scopeRows.map(([k,v])=>`| ${k} | ${escape(v)} |`).join('\n')+'\n\n';
supplemental+=meta.notes.map(n=>'- '+n).join('\n')+'\n\n';
supplemental+='Source review covers shared and representative Django templates, form definitions, JavaScript and SCSS. The 100-page runtime sample is bounded; it does not establish site-wide conformance or exhaust historical/database content. Re-scan these URLs after deployment because the local source and deployed styles differ.\n\n';
supplemental+='The renderer score is a findings-based heuristic: serious findings weigh 5, moderate 2, minor 1 and critical 10, scaled against reported checks, with confidence adjustments. Its grade uses A >= 90, B >= 80, C >= 70 and D >= 60. It is not a percentage of WCAG criteria met. Medium-confidence findings, including the reflow candidate and generic page titles, need human confirmation.\n\n';
supplemental+='## Runtime scan summary\n\n';
supplemental+=`${summary.pages.length} production pages were scanned at desktop width with an explicit light color scheme. ${instances.toLocaleString('en-GB')} element-level violations were recorded, including 9,342 contrast violations grouped into ten shared remediation groups. Repeated nodes are not separate report findings.\n\n`;
supplemental+='| axe rule | Affected pages | Element instances |\n|---|---:|---:|\n'+Object.values(failedRules).map(g=>`| [${g.id}](${g.helpUrl}) | ${g.pages.length} | ${g.instances} |`).join('\n')+'\n\n';
supplemental+='[Runtime page summary](ACCESSIBILITY-SCAN.md) and [scan index and violations](ACCESSIBILITY-SCAN.json) preserve the automated output. Full axe results, including incomplete checks, are retained as compressed JSON in `'+run+'/evidence/axe/`.\n\n';
supplemental+='The separate default-browser axe CLI homepage scan returned no violations. Explicit light-theme scans found contrast failures, and explicit dark-theme checks found two additional contrast problems. Treat the default-browser result as limited to its environment and state.\n\n';
supplemental+='## Detailed finding evidence\n\n';
merged.findings.forEach((finding,index)=>{
 supplemental+=`### ${index+1}. ${finding.rule}\n\n${finding.summary}\n\n`;
 supplemental+=`- Criterion: ${finding.wcag}. Severity: ${finding.severity}. Confidence: ${finding.confidence??'high'}.\n- Location: \`${finding.location}\`.\n- Reviewed by: ${finding.foundBy.join(', ')}.\n\n`;
 if(finding.evidence)supplemental+='Evidence:\n\n```text\n'+finding.evidence.replace(/```/g,"'''")+'\n```\n\n';
 supplemental+='Remediation: '+finding.fix+'\n\n';
});
supplemental+='## Page metadata dashboard\n\n| Property | Present | Missing |\n|---|---:|---:|\n';
for(const [label,key] of [['Page title','title'],['Document language','lang'],['Viewport meta','viewport'],['Main landmark','main'],['Skip navigation link','skip']]){
 const present=summary.pages.filter(p=>p.metadata?.[key]).length;supplemental+=`| ${label} | ${present} | ${summary.pages.length-present} |\n`;
}
supplemental+='\nPresence does not establish quality: generic foundation titles are a separate finding.\n\n';
// Scores are generated from distinct automated rules/colour recipes, not repeated nodes.
const grade=n=>n>=90?'A':n>=75?'B':n>=50?'C':n>=25?'D':'F';
supplemental+='## Automated page scorecard\n\nThis separate page score uses the Phase 9 risk formula: 100 minus 7 for each distinct serious rule or failing foreground/background pair, floored at zero. Repeated elements with the same pair count once. These scores cover desktop light-theme axe findings only; source-only, keyboard, dark-theme and manual findings are excluded. They are not conformance grades and use different thresholds from the package renderer.\n\n';
supplemental+='| Page | Automated risk score | Risk grade | Failed rules | Element instances | Page title |\n|---|---:|---|---:|---:|---|\n';
for(const {summary:s,result} of results){
 const units=new Set();
 for(const v of result.violations)for(const n of v.nodes){
  if(v.id==='color-contrast'){
   const data=n.any.find(a=>a.id==='color-contrast')?.data;units.add('contrast:'+data?.fgColor+':'+data?.bgColor);
  }else units.add(v.id);
 }
 const score=Math.max(0,100-7*units.size);
 supplemental+=`| ${link(s.url)} | ${score} | ${grade(score)} | ${s.violations} | ${s.instances} | ${escape(s.metadata.title)} |\n`;
}
supplemental+='\n## Evidence and reproducibility\n\n';
for(const [label,file] of [['Crawl manifest','crawl-manifest.json'],['Runtime environment and page summary','runtime-summary.json'],['Exclusive contrast grouping','exclusive-contrast-groups.json'],['Keyboard and dynamic state measurements','behavior.json'],['Focus and skip-link follow-up','focus.json'],['Theme, viewport and motion measurements','visual-runtime.json'],['Audit metadata','audit-metadata.json']])supplemental+=`- [${label}](${run}/evidence/${file}).\n`;
supplemental+='\nRaw page HTML and full desktop axe results are compressed to keep the retained evidence compact; decompress with `gzip -dc FILE.gz`. Specialist findings JSON is retained at the top level of the timestamped history directory for re-rendering and comparison.\n\n';
report=report.replace('## Findings data\n',supplemental+'## Findings data\n');
fs.writeFileSync(reportPath,report);
const scanIndex={...meta,tooling:{browser:summary.browser,playwright:summary.playwright,axe:summary.axe},tags:summary.tags,viewport:summary.viewport,pages:results.map(({summary:s,result})=>({url:s.url,summary:s,violations:result.violations,incompleteRuleIds:result.incomplete.map(r=>r.id),passedRuleIds:result.passes.map(r=>r.id)}))};
fs.writeFileSync(path.join(root,'ACCESSIBILITY-SCAN.json'),JSON.stringify(scanIndex,null,2)+'\n');
let scan='# Production accessibility scan\n\n'+`${summary.pages.length} pages; axe-core ${summary.axe}; ${summary.browser}; explicit light theme at ${summary.viewport}; tags ${summary.tags.join(', ')}.\n\n`;
scan+='| Page | Failed rules | Element violations | Passed rules | Incomplete rules |\n|---|---:|---:|---:|---:|\n'+summary.pages.map(s=>`| ${link(s.url)} | ${s.violations} | ${s.instances} | ${s.passes} | ${s.incomplete} |`).join('\n')+'\n\n';
scan+='## Rule totals\n\n| Rule | Pages | Instances |\n|---|---:|---:|\n'+Object.values(failedRules).map(g=>`| [${g.id}](${g.helpUrl}) | ${g.pages.length} | ${g.instances} |`).join('\n')+'\n\n';
scan+='Incomplete results require manual review and are not counted as violations. This automated pass covers one baseline per page. Additional theme, keyboard and dynamic-state evidence and source review are documented in [the audit report](WEB-ACCESSIBILITY-AUDIT.md).\n';
fs.writeFileSync(path.join(root,'ACCESSIBILITY-SCAN.md'),scan);
console.log(JSON.stringify({findings:merged.findings.length,counts:merged.counts,score:merged.score,grade:merged.grade,pages:summary.pages.length,instances},null,2));
