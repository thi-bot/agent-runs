import collections
import csv
import hashlib
import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent
rows, findings, errors = [], [], []
for target in json.loads((ROOT / 'targets.json').read_text()):
    folder = ROOT / target['id']
    runfile = folder / 'run.json'
    reportfile = folder / 'agent-lighthouse-report.json'
    if not runfile.exists():
        continue
    run = json.loads(runfile.read_text())
    if 'finished_at' not in run:
        continue
    row = {'id': target['id'], 'url': target['url'], 'exit_code': run['exit_code'], 'elapsed_seconds': run['elapsed_seconds'], 'report_json': str(reportfile), 'report_html': str(folder / 'agent-lighthouse-report.html')}
    if not reportfile.exists():
        row['failure'] = run.get('failure', 'No report')
        rows.append(row)
        continue
    report = json.loads(reportfile.read_text())
    conditions = report.get('conditions', {})
    checks = [check for category in report['categories'] for check in category['checks']]
    eligible = [c for c in checks if c.get('tier') == 'scored' and c.get('weight', 0) > 0 and c.get('scoreDisplayMode') != 'informative']
    counts = collections.Counter(c['status'] for c in eligible)
    traces = [json.loads(line) for line in (folder / 'audit-trace.ndjson').read_text().splitlines()]
    trace_counts = collections.Counter(t['outcome'] for t in traces)
    row.update({'overall_score': report['overallScore'], 'score_tier': report['scoreTier'], 'judgeable': report['scanValidity']['judgeable'], 'unscored_reason': report['scanValidity'].get('unscoredReason'), 'scanned_at': report['scannedAt'], 'pages_scanned': len(report['pagesScanned']), 'page_attempts': report.get('pageAttempts'), 'declared_page_type': 'homepage', 'scored_status_counts': dict(counts), 'trace_outcomes': dict(trace_counts), 'coverage': conditions.get('coverage'), 'budget': conditions.get('budget'), 'request_stop': conditions.get('requestStop'), 'category_scores': {c['id']: c['score'] if c.get('assessedMass', 0) > 0 else None for c in report['categories']}, 'failure': run.get('failure')})
    issues = sorted([c for c in eligible if c['status'] in ['fail', 'warn']], key=lambda c: (-c.get('weight', 0), c['status'] != 'fail', c['id']))
    row['scored_issues'] = [{'id': c['id'], 'status': c['status'], 'weight': c.get('weight'), 'title': c['title'], 'display_value': c.get('displayValue'), 'explanation': c.get('explanation')} for c in issues]
    for c in checks:
        findings.append({'site_id': target['id'], 'site_url': target['url'], **c})
    for t in traces:
        if t['outcome'] == 'error':
            errors.append({'site_id': target['id'], **t})
    rows.append(row)

(ROOT / 'summary.json').write_text(json.dumps(rows, indent=2) + '\n')
(ROOT / 'findings.json').write_text(json.dumps(findings, indent=2) + '\n')
(ROOT / 'audit-errors.json').write_text(json.dumps(errors, indent=2) + '\n')
with (ROOT / 'summary.csv').open('w', newline='') as f:
    fields = ['id','url','overall_score','judgeable','pages_scanned','elapsed_seconds','exit_code','scored_pass','scored_warn','scored_fail','scored_na','audit_errors','budget_exhausted','requests_stopped','unscored_reason','report_html']
    writer = csv.DictWriter(f, fieldnames=fields)
    writer.writeheader()
    for r in rows:
        line = {key:r.get(key) for key in fields}
        line.update({'scored_'+status: r.get('scored_status_counts',{}).get(status,0) for status in ['pass','warn','fail','na']})
        line['audit_errors'] = r.get('trace_outcomes',{}).get('error',0)
        line['budget_exhausted'] = r.get('budget',{}).get('exhausted')
        line['requests_stopped'] = r.get('request_stop',{}).get('stopped')
        writer.writerow(line)

lines = ['Agent Lighthouse baseline campaign', '', 'Local checkout: /home/thibaudcolas/dev/agent-lighthouse', 'Revision: '+json.loads((ROOT/'manifest.json').read_text())['revision'], 'CLI/core version: 10.6.0', '', 'Scope: nine example-site entry pages from web-sustainability-agents. Each is explicitly declared homepage of the site/subsite. HTTP evidence only, plus engine built-in root-file and sitemap probes. No browser DOM supplied, no LLM, no agent task execution, no target source-code review.', '', 'Scores describe this engine, population and time, not site-wide or cross-tool readiness. A missing score remains null. Scored-status counts exclude zero-weight/informative checks; category scores with no assessed mass remain null. Original sustainability samples differ from this baseline.', '', 'For guide.wagtail.org/en/, docs.wagtail.org/en/stable/, and wagtail.github.io/draftjs_exporter/, the entry is a documentation subsite homepage. Origin/root-file checks can describe the host rather than that subsite, especially on shared GitHub Pages hosting.', '', 'Site | Score | Pages | Audit errors | Budget exhausted | Request stop']
for row in rows:
    lines.append(' | '.join(str(x) for x in [row['id'], row.get('overall_score'), row.get('pages_scanned'), row.get('trace_outcomes',{}).get('error',0), row.get('budget',{}).get('exhausted'),row.get('request_stop',{}).get('reason')]))
lines += ['', 'Artifacts: summary.json and summary.csv aggregate the saved reports; findings.json flattens all top-level checks; audit-errors.json preserves scanner audit errors. Each site directory includes unmodified engine reports, full request log, audit trace, progress events, terminal output, exact config and invocation with timestamps/exit status. manifest.json and setup/ record checkout/build provenance. targets.json preserves original source sample URLs but does not claim they were all scanned.', '', 'No target files were changed. No forms or transactions were submitted. Findings are unreviewed scanner findings; inspect evidence before adopting recommendations.']
(ROOT / 'RUN_NOTES.txt').write_text('\n'.join(lines)+'\n')
print('\n'.join(lines))
