import concurrent.futures
import datetime
import json
import os
import pathlib
import subprocess
import time

ROOT = pathlib.Path(__file__).resolve().parent
CLI = '/home/thibaudcolas/dev/agent-lighthouse/packages/cli/dist/bin.js'
def now():
    return datetime.datetime.now(datetime.timezone.utc).isoformat()

def scan(target):
    folder = ROOT / target['id']
    folder.mkdir(exist_ok=False)
    config = {'url': target['url'], 'pageType': 'homepage', 'timeout': 180,
              'output': ['terminal', 'html', 'json', 'md'], 'outputDir': str(folder)}
    (folder / 'config.json').write_text(json.dumps(config, indent=2) + '\n')
    command = ['node', CLI, target['url'], '--config', str(folder / 'config.json'),
               '--trace', str(folder / 'audit-trace.ndjson'),
               '--log-file', str(folder / 'scan-log.jsonl'), '--progress-json']
    record = {'id': target['id'], 'url': target['url'], 'command': command, 'cwd': str(ROOT),
              'started_at': now(), 'output_directory': str(folder)}
    (folder / 'run.json').write_text(json.dumps(record, indent=2) + '\n')
    started = time.monotonic()
    print('START', target['id'], target['url'], flush=True)
    with (folder / 'terminal.log').open('w') as stdout, (folder / 'progress.ndjson').open('w') as stderr:
        try:
            completed = subprocess.run(command, cwd=ROOT, stdout=stdout, stderr=stderr,
                                       timeout=240, env={**os.environ, 'NO_COLOR': '1'})
            record['exit_code'] = completed.returncode
        except subprocess.TimeoutExpired:
            record['exit_code'] = None
            record['failure'] = 'External 240-second watchdog expired; process killed.'
    record['finished_at'] = now()
    record['elapsed_seconds'] = round(time.monotonic() - started, 3)
    report_path = folder / 'agent-lighthouse-report.json'
    if report_path.exists():
        report = json.loads(report_path.read_text())
        record['overall_score'] = report.get('overallScore')
        record['scan_validity'] = report.get('scanValidity')
    else:
        record['failure'] = record.get('failure', 'No JSON report produced')
    (folder / 'run.json').write_text(json.dumps(record, indent=2) + '\n')
    print('DONE', target['id'], 'exit=', record['exit_code'], 'score=', record.get('overall_score'), 'seconds=', record['elapsed_seconds'], flush=True)
    return record

if __name__ == '__main__':
    targets = json.loads((ROOT / 'targets.json').read_text())
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
        results = list(pool.map(scan, targets))
    (ROOT / 'runs.json').write_text(json.dumps(results, indent=2) + '\n')
