#!/usr/bin/env python3
"""Run pinned local CLI; preserve failures and metadata without overwriting runs."""
import concurrent.futures, datetime, json, os, pathlib, signal, subprocess, time
ROOT = pathlib.Path(__file__).resolve().parent
REPO = pathlib.Path('/home/thibaudcolas/dev/agentic-web-check')
def now(): return datetime.datetime.now(datetime.timezone.utc).isoformat()
def run(target):
    out = ROOT / target['id'] / 'baseline'
    out.mkdir(parents=True, exist_ok=False)
    cmd = ['node', str(REPO/'dist/cli.js'), 'scan', target['url'], '--pages', '1', '--timeout', '30000', '--tasks', 'default', '--agent', 'baseline', '--out', str(out), '--no-color', '--verbose']
    record = {'target':target, 'command':cmd, 'cwd':str(REPO), 'started_at':now(), 'timeout_seconds':480}
    (out/'run.json').write_text(json.dumps(record,indent=2)+'\n')
    print('START', target['id'], flush=True)
    with (out/'stdout.log').open('w') as stdout, (out/'stderr.log').open('w') as stderr:
        process = subprocess.Popen(cmd, cwd=REPO, stdout=stdout, stderr=stderr, start_new_session=True)
        try:
            record['exit_code'] = process.wait(timeout=480)
        except subprocess.TimeoutExpired:
            os.killpg(process.pid, signal.SIGTERM)
            try: process.wait(timeout=10)
            except subprocess.TimeoutExpired:
                os.killpg(process.pid, signal.SIGKILL)
                process.wait()
            record['exit_code'] = process.returncode
            record['error'] = 'Campaign timeout after 480 seconds; process group terminated'
    record['finished_at'] = now()
    record['results_present'] = (out/'results.json').exists()
    (out/'run.json').write_text(json.dumps(record,indent=2)+'\n')
    print('DONE', target['id'], record['exit_code'], record['results_present'], flush=True)
    return record
if __name__ == '__main__':
    targets = json.loads((ROOT/'targets.json').read_text())
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
        records = list(pool.map(run, targets))
    (ROOT/'runs.json').write_text(json.dumps(records,indent=2)+'\n')
