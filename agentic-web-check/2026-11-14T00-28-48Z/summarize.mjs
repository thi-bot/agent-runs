import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { computeScores } from '/home/thibaudcolas/dev/agentic-web-check/dist/index.js';

const root = path.dirname(fileURLToPath(import.meta.url));
const targets = JSON.parse(fs.readFileSync(path.join(root, 'targets.json')));
const rows = targets.map(target => {
  const folder = path.join(root, target.id, 'baseline');
  const resultPath = path.join(folder, 'results.json');
  const run = JSON.parse(fs.readFileSync(path.join(folder, 'run.json')));
  if (!fs.existsSync(resultPath)) return {id: target.id, url: target.url, exit_code: run.exit_code, error: run.error ?? 'No results.json', report: null};
  const result = JSON.parse(fs.readFileSync(resultPath));
  const deterministic = computeScores(result.checks, []);
  fs.writeFileSync(path.join(folder, 'deterministic-score.json'), JSON.stringify({
    provenance: 'Derived from this run\'s captured checks via pinned tool computeScores(checks, []); not a separate scan.',
    source: 'results.json', ...deterministic,
  }, null, 2) + '\n');
  return {
    id: target.id, url: target.url, exit_code: run.exit_code,
    overall_with_tasks: result.overall,
    deterministic_only_derived: deterministic.overall,
    check_status_counts: Object.fromEntries(['pass','warn','fail','na','info'].map(status => [status, result.checks.filter(c => c.status === status).length])),
    task_verdict_counts: Object.fromEntries(['PASS','FAIL','BLOCKED','INCONCLUSIVE'].map(status => [status, result.tasks.filter(t => t.verdict === status).length])),
    tasks: result.tasks.map(t => ({name: t.name, verdict: t.verdict, reason: t.reason, steps: t.steps.length, final_url: t.finalUrl, blocker: t.blocker ?? null, off_origin_final: new URL(t.finalUrl).origin !== new URL(target.url).origin})),
    failed_checks: result.checks.filter(c => c.status === 'fail').map(c => ({id:c.id, summary:c.summary})),
    warned_checks: result.checks.filter(c => c.status === 'warn').map(c => ({id:c.id, summary:c.summary})),
    dimensions: result.dimensions, pages: result.pages,
    elapsed_seconds: +(result.meta.durationMs / 1000).toFixed(1), browser: result.meta.browser.version,
    report: `${target.id}/baseline/report.html`, results: `${target.id}/baseline/results.json`,
  };
});
fs.writeFileSync(path.join(root, 'summary.json'), JSON.stringify(rows,null,2)+'\n');
const headers = ['site','url','overall_with_tasks','deterministic_only_derived','PASS','FAIL','BLOCKED','INCONCLUSIVE','elapsed_seconds','exit_code'];
const csv = [headers, ...rows.map(r => [r.id,r.url,r.overall_with_tasks,r.deterministic_only_derived,...['PASS','FAIL','BLOCKED','INCONCLUSIVE'].map(k => r.task_verdict_counts?.[k]),r.elapsed_seconds,r.exit_code])].map(r => r.map(v => JSON.stringify(v ?? '')).join(',')).join('\n');
fs.writeFileSync(path.join(root,'summary.csv'),csv+'\n');
const table = rows.map(r => r.report ? `| [${r.id}](${r.report}) | ${r.deterministic_only_derived} | ${r.overall_with_tasks} | ${r.task_verdict_counts.PASS} | ${r.task_verdict_counts.FAIL} | ${r.task_verdict_counts.BLOCKED} | ${r.task_verdict_counts.INCONCLUSIVE} |` : `| ${r.id} | unavailable | unavailable | - | - | - | - |`).join('\n');
const details = rows.map(r => `### ${r.id}\n\n` + (r.tasks ? r.tasks.map(t => `- ${t.name}: **${t.verdict}**, ${t.steps} steps. ${t.reason}. Final URL: ${t.final_url}${t.off_origin_final ? ' (off the entry origin)' : ''}.`).join('\n') : r.error)).join('\n\n');
const readme = `# Agentic Web Check: nine example sites\n\n`+
`Completed local scans with three built-in read-only baseline tasks per site. No LLM was used. The supported AWC/OpenAI/Anthropic provider environment variables were unset; unrelated credential stores were not inspected.\n\n`+
`The [target manifest](targets.json) copies the exact entry URLs from the paired [Agent Lighthouse campaign](../../agent-lighthouse/2026-11-14T00-27-54Z/targets.json). Original sustainability sample URLs are provenance only. This campaign scans one entry page per site; task agents may navigate beyond that page and clicks/redirects can leave its origin.\n\n`+
`## Results\n\n| Site | Deterministic only (derived) | With baseline tasks | Pass | Fail | Blocked | Inconclusive |\n| --- | ---: | ---: | ---: | ---: | ---: | ---: |\n${table}\n\n`+
`The deterministic-only score is recomputed from the same captured checks using the tool's exported computeScores(checks, []). It is not a separate run. Original results.json and reports retain the tool's combined behavioural score. All numbers are this tool's methodology v1 and cannot be compared numerically with Agent Lighthouse scores.\n\n`+
`## Reproduction and artifacts\n\n`+
`- Checkout: /home/thibaudcolas/dev/agentic-web-check, revision 35ec1e1e61f1ca962228846d13a855eaa74f9876, package 0.1.0.\n`+
`- Dependencies installed with pnpm 10.34.6 and the committed frozen lockfile; built locally with pnpm build. Install and build logs are retained.\n`+
`- Each run used: node /home/thibaudcolas/dev/agentic-web-check/dist/cli.js scan URL --pages 1 --timeout 30000 --tasks default --agent baseline --out DIRECTORY --no-color --verbose.\n`+
`- Two sites ran concurrently, with an outer 480-second per-site timeout. The three stock tasks each allow up to 12 steps. No form-submit or consequential-action opt-in was supplied; TLS verification stayed enabled.\n`+
`- Each site/baseline directory contains results.json, report.html, summary.md, badge.svg, task screenshots, stdout.log, stderr.log, run.json and derived deterministic-score.json.\n`+
`- [campaign.json](campaign.json), [runs.json](runs.json), [tasks.json](tasks.json), [summary.json](summary.json), and [summary.csv](summary.csv) retain options, timings, exact task definitions, raw report paths, and aggregate observations. The scripts run-campaign.py and summarize.mjs preserve the execution and aggregation procedure.\n\n`+
`## Interpretation limits\n\n`+
`These are unmodified tool outputs, not adjudicated site defects or a validated benchmark. Baseline is a deterministic name-matching agent, not an LLM or a named consumer browser agent. The generic contact, legal-policy, and help/about tasks are not tailored to these sites; their success criteria can reward particular URLs/headings rather than proving the full natural-language goal.\n\n`+
`CAPTCHA findings require review: the tool searches page markup for strings such as recaptcha and may block tasks even when the page is otherwise readable. Tate's entry scan loaded HTTP 200 with a populated accessibility snapshot, while all tasks were stopped by this detector. NHS contact navigation reached another origin before its CAPTCHA block. Read task traces and screenshots before interpreting a BLOCKED verdict as inaccessible content.\n\n`+
`Concrete task-validity examples: the developer-documentation contact task passed on /en/stable/tutorial/create_contact_page.html, a contact-page tutorial; the Google Blog help/about task passed on an article about saving giant kelp. These are reasons to inspect the task assertions and page evidence before treating a PASS as completion of the natural-language goal. The Wagtail help task also left the entry origin for a StreamField documentation page.\n\n`+
`The tool records requests and state through its own checks and task-step evidence; this campaign does not add an independent browser trace or network archive. Existing read-only protections were used without bypassing bot protection.\n\n`+
`## Task outcomes\n\n${details}\n`;
fs.writeFileSync(path.join(root,'README.md'),readme);
console.log(JSON.stringify(rows.map(r=>({id:r.id,score:r.overall_with_tasks,deterministic:r.deterministic_only_derived,tasks:r.task_verdict_counts,error:r.error})),null,2));
