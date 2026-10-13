# Markdown Accessibility Audit

An audit of markdown documentation, run on 2026-10-10. Read the executive summary for the verdict, the priorities section for what to do first, and the findings tables for detail.

## Metadata

What was audited, with what, and under which settings.

| Field | Value |
|---|---|
| Date | 2026-10-10 |
| Scope | 4 items |
| Skills run | python-specialist |
| Tooling | node v26.8.1 |
| Scan configuration | defaults, no config file found |
| Checks counted | 12 |

Audited:

- `scripts/compare_harbor_runs.py`
- `scripts/run_harbor_campaign.py`
- `tests/test_compare_harbor_runs.py`
- `tests/test_harbor_campaign.py`

## Executive summary

Pass. No critical or serious findings.

The headline numbers for this run.

| Measure | Value |
|---|---|
| Score | 100 out of 100 |
| Grade | A |
| Findings | 0 |
| Blocking (critical plus serious) | 0 |
| Verdict | Pass |

## Severity breakdown

Counts by severity, highest impact first.

| Severity | Count | What it means |
|---|---:|---|
| critical | 0 | Blocks a person from completing the task |
| serious | 0 | Major barrier with a difficult workaround |
| moderate | 0 | Real friction, workaround exists |
| minor | 0 | Noticeable but rarely blocking |

## Findings

No findings. Every check listed under "What passed" ran and came back clean.

## Remediation priorities

Nothing to remediate.

## What passed

12 checks ran and found nothing.

- .venv/bin/python -m pytest tests/test_compare_harbor_runs.py tests/test_harbor_campaign.py -q: 39 passed.
- A completed accessibility failure stops retries; exactly one selected outcome per task is imported.
- Comparison rejects incomplete campaigns and mismatched configurations or prompt coverage.
- Completed or exhausted round restart does not reset retry allowance.
- Exception timing and verifier result distinguish agent-phase failures from verifier-only failures.
- Five-run arithmetic mean, median, sample standard deviation and variance use explicit units and preserve ERROR denominators.
- Initial PY-CAMPAIGN-001 through PY-CAMPAIGN-004 findings resolved on re-review.
- Mixed model and infrastructure failures remain incomplete without regeneration.
- Native Harbor retries are disabled; at most three campaign attempts are retained in separate job directories.
- Nested multistep regrade wrappers preserve classification of their underlying transport failures.
- Regrade selection checks ordered skill-step coverage, artifact manifest source/destination/status, and retained directories.
- Verifier sidecar errors and missing required verifier/artifact records cannot silently complete a run.

## Needs a human

Items a skill could not decide, or could not check automatically.

- **python-specialist**: Unknown verifier and infrastructure errors conservatively require review rather than automatic retry.
- **python-specialist**: Interrupted Harbor jobs are retained and stop the campaign; native resume is intentionally avoided because it can delete unfinished trial directories.
- **python-specialist**: Raw attempt results retain token/cost evidence; cumulative multistep usage and copied regrade usage must not be summed as independent charges.
- **python-specialist**: This review exercised deterministic tests and installed Harbor interfaces, without launching new paid agent generations.

## Next steps

1. Keep the current checks in continuous integration so this does not regress.
2. Re-audit when the interface changes materially, or quarterly.
3. Confirm the automated result with a manual screen reader and keyboard pass.

Automated checks find a minority of accessibility barriers. A passing score is a floor, not a guarantee.

## Findings data

The merged findings, embedded so the next run can compute a delta without parsing this document.

```json a11y-findings
{
  "skills": [
    "python-specialist"
  ],
  "scope": [
    "scripts/compare_harbor_runs.py",
    "scripts/run_harbor_campaign.py",
    "tests/test_compare_harbor_runs.py",
    "tests/test_harbor_campaign.py"
  ],
  "findings": [],
  "passed": [
    ".venv/bin/python -m pytest tests/test_compare_harbor_runs.py tests/test_harbor_campaign.py -q: 39 passed.",
    "A completed accessibility failure stops retries; exactly one selected outcome per task is imported.",
    "Comparison rejects incomplete campaigns and mismatched configurations or prompt coverage.",
    "Completed or exhausted round restart does not reset retry allowance.",
    "Exception timing and verifier result distinguish agent-phase failures from verifier-only failures.",
    "Five-run arithmetic mean, median, sample standard deviation and variance use explicit units and preserve ERROR denominators.",
    "Initial PY-CAMPAIGN-001 through PY-CAMPAIGN-004 findings resolved on re-review.",
    "Mixed model and infrastructure failures remain incomplete without regeneration.",
    "Native Harbor retries are disabled; at most three campaign attempts are retained in separate job directories.",
    "Nested multistep regrade wrappers preserve classification of their underlying transport failures.",
    "Regrade selection checks ordered skill-step coverage, artifact manifest source/destination/status, and retained directories.",
    "Verifier sidecar errors and missing required verifier/artifact records cannot silently complete a run."
  ],
  "notes": [
    {
      "skill": "python-specialist",
      "note": "Unknown verifier and infrastructure errors conservatively require review rather than automatic retry."
    },
    {
      "skill": "python-specialist",
      "note": "Interrupted Harbor jobs are retained and stop the campaign; native resume is intentionally avoided because it can delete unfinished trial directories."
    },
    {
      "skill": "python-specialist",
      "note": "Raw attempt results retain token/cost evidence; cumulative multistep usage and copied regrade usage must not be summed as independent charges."
    },
    {
      "skill": "python-specialist",
      "note": "This review exercised deterministic tests and installed Harbor interfaces, without launching new paid agent generations."
    }
  ],
  "counts": {
    "critical": 0,
    "serious": 0,
    "moderate": 0,
    "minor": 0
  },
  "components": [],
  "score": 100,
  "grade": "A",
  "penalty": 0,
  "checks": 12,
  "generated": "2026-10-10",
  "template": "markdown"
}
```
