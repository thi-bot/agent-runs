# Web Accessibility Audit

An audit of web content, run on 2026-10-08. Read the executive summary for the verdict, the priorities section for what to do first, and the findings tables for detail.

## Metadata

What was audited, with what, and under which settings.

| Field | Value |
|---|---|
| Date | 2026-10-08 |
| Scope | 2 items |
| Skills run | python-specialist |
| Tooling | node v26.8.1 |
| Scan configuration | defaults, no config file found |
| Checks counted | 10 |

Audited:

- `scripts/compare_harbor_runs.py`
- `tests/test_compare_harbor_runs.py`

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

6 checks ran and found nothing.

- ERROR outcomes remain in denominators and have explicit per-run counts.
- Median uses three variant/turn PASS rates, separately from per-prompt majority voting.
- Original-to-median differences use percentage points with an explicit direction.
- Preserves separate variant/turn groups and writes JSON and CSV.
- Rejects mismatched models, prompt metadata, prompt hashes, dimensions, coverage, and duplicate attempts.
- Requires three distinct result paths and run IDs.

## Needs a human

Items a skill could not decide, or could not check automatically.

- **python-specialist**: Three runs provide descriptive repeatability, not statistical certainty.
- **python-specialist**: Execution independence depends on task checksums and execution configuration, not just distinct run IDs.
- **python-specialist**: Main-agent verification after review: nine tests passed, including separate skill turns and differing local asset paths.

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
    "tests/test_compare_harbor_runs.py"
  ],
  "findings": [],
  "passed": [
    "ERROR outcomes remain in denominators and have explicit per-run counts.",
    "Median uses three variant/turn PASS rates, separately from per-prompt majority voting.",
    "Original-to-median differences use percentage points with an explicit direction.",
    "Preserves separate variant/turn groups and writes JSON and CSV.",
    "Rejects mismatched models, prompt metadata, prompt hashes, dimensions, coverage, and duplicate attempts.",
    "Requires three distinct result paths and run IDs."
  ],
  "notes": [
    {
      "skill": "python-specialist",
      "note": "Three runs provide descriptive repeatability, not statistical certainty."
    },
    {
      "skill": "python-specialist",
      "note": "Execution independence depends on task checksums and execution configuration, not just distinct run IDs."
    },
    {
      "skill": "python-specialist",
      "note": "Main-agent verification after review: nine tests passed, including separate skill turns and differing local asset paths."
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
  "checks": 10,
  "generated": "2026-10-08",
  "template": "web"
}
```
