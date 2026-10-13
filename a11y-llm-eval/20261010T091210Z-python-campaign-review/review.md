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
| Checks counted | 10 |

Audited:

- `scripts/compare_harbor_runs.py`
- `scripts/run_harbor_campaign.py`
- `tests/test_compare_harbor_runs.py`
- `tests/test_harbor_campaign.py`

## Executive summary

Fail. Critical or serious findings must be fixed before this ships.

The headline numbers for this run.

| Measure | Value |
|---|---|
| Score | 66 out of 100 |
| Grade | D |
| Findings | 4 |
| Blocking (critical plus serious) | 3 |
| Verdict | Fail |

## Severity breakdown

Counts by severity, highest impact first.

| Severity | Count | What it means |
|---|---:|---|
| critical | 0 | Blocks a person from completing the task |
| serious | 3 | Major barrier with a difficult workaround |
| moderate | 1 | Real friction, workaround exists |
| minor | 0 | Noticeable but rarely blocking |

## Findings

4 findings, ordered by severity then by rule.

### Serious (3)

Each row names the rule, the criterion it fails, where it is, and what to change.

| Rule | WCAG | Location | Problem | Fix |
|---|---|---|---|---|
| `PY-CAMPAIGN-001` | n/a | scripts/run_harbor_campaign.py:60 | A model failure suppresses a separate infrastructure exception and marks an unresolved run complete. | Classify every exception before deciding completeness; prohibit regeneration when a model failure exists but retain unresolved infrastructure as review/incomplete, or regrade saved outputs where possible. |
| `PY-CAMPAIGN-002` | n/a | scripts/run_harbor_campaign.py:55 | Verifier infrastructure errors without Harbor exceptions are counted as terminal outcomes and can enter the five-run mean. | Inspect each verifier/a11y-result.json, including skill-step sidecars, before declaring a trial complete. Recognized infrastructure errors may be regraded; unresolved errors must mark the run incomplete. Preserve ordinary model failures. |
| `PY-CAMPAIGN-004` | n/a | scripts/run_harbor_campaign.py:170 | The runner schedules unregradable partial skill trials after an early verifier infrastructure failure. | Validate ordered step coverage and artifact availability before choosing regrade. If later skill steps never ran, use a permitted whole-task infrastructure retry or explicitly retain the run as incomplete when regeneration is prohibited. |

### Moderate (1)

Each row names the rule, the criterion it fails, where it is, and what to change.

| Rule | WCAG | Location | Problem | Fix |
|---|---|---|---|---|
| `PY-CAMPAIGN-003` | n/a | scripts/run_harbor_campaign.py:81 | A multistep regrade wrapper hides recoverable nested transport failures and prevents the second permitted retry. | Recognize the specific MultiStepRegradeTrial wrapper only when nested step errors fully explain it, then classify those errors and preserve regrade-only mode. Add a wrapper regression test. |

## Remediation priorities

Then the 3 remaining blocking findings, in this order:

1. `PY-CAMPAIGN-001` at scripts/run_harbor_campaign.py:60. Classify every exception before deciding completeness; prohibit regeneration when a model failure exists but retain unresolved infrastructure as review/incomplete, or regrade saved outputs where possible.
2. `PY-CAMPAIGN-002` at scripts/run_harbor_campaign.py:55. Inspect each verifier/a11y-result.json, including skill-step sidecars, before declaring a trial complete. Recognized infrastructure errors may be regraded; unresolved errors must mark the run incomplete. Preserve ordinary model failures.
3. `PY-CAMPAIGN-004` at scripts/run_harbor_campaign.py:170. Validate ordered step coverage and artifact availability before choosing regrade. If later skill steps never ran, use a permitted whole-task infrastructure retry or explicitly retain the run as incomplete when regeneration is prohibited.

The remaining 1 moderate and minor findings can follow in normal work.

## What passed

3 checks ran and found nothing.

- 28 targeted campaign/comparison tests pass.
- Five-run mean, sample standard deviation, variance units, and incomplete-campaign comparison rejection are correct.
- Native retries are disabled and retry waves preserve separate original job directories.

## Needs a human

Items a skill could not decide, or could not check automatically.

- **python-specialist**: Current tests do not exercise run_round restart behavior, total retry bounds, or final publication end to end.
- **python-specialist**: Installed Harbor source was read to verify retry deletion, verifier reward parsing, and multistep regrade requirements.

## Next steps

1. Fix the 3 blocking findings above, starting with any repeated component.
2. Re-run this audit and check the delta section for regressions.
3. Wire the scan into continuous integration so the next regression is caught before review.

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
  "findings": [
    {
      "rule": "PY-CAMPAIGN-001",
      "wcag": "n/a",
      "severity": "serious",
      "location": "scripts/run_harbor_campaign.py:60",
      "summary": "A model failure suppresses a separate infrastructure exception and marks an unresolved run complete.",
      "fix": "Classify every exception before deciding completeness; prohibit regeneration when a model failure exists but retain unresolved infrastructure as review/incomplete, or regrade saved outputs where possible.",
      "evidence": "AgentTimeoutError in one step plus a Docker transport failure in another returns terminal; run_round treats every terminal selection as complete.",
      "foundBy": [
        "python-specialist"
      ]
    },
    {
      "rule": "PY-CAMPAIGN-002",
      "wcag": "n/a",
      "severity": "serious",
      "location": "scripts/run_harbor_campaign.py:55",
      "summary": "Verifier infrastructure errors without Harbor exceptions are counted as terminal outcomes and can enter the five-run mean.",
      "fix": "Inspect each verifier/a11y-result.json, including skill-step sidecars, before declaring a trial complete. Recognized infrastructure errors may be regraded; unresolved errors must mark the run incomplete. Preserve ordinary model failures.",
      "evidence": "harbor_verifier writes reward.txt=0 on Node/browser exceptions. Harbor Verifier parses that reward even when test.sh exits nonzero, leaving exception_info unset.",
      "foundBy": [
        "python-specialist"
      ]
    },
    {
      "rule": "PY-CAMPAIGN-004",
      "wcag": "n/a",
      "severity": "serious",
      "location": "scripts/run_harbor_campaign.py:170",
      "summary": "The runner schedules unregradable partial skill trials after an early verifier infrastructure failure.",
      "fix": "Validate ordered step coverage and artifact availability before choosing regrade. If later skill steps never ran, use a permitted whole-task infrastructure retry or explicitly retain the run as incomplete when regeneration is prohibited.",
      "evidence": "MultiStepTrial stops after an exceptional step without verifier_result; MultiStepRegradeTrial._validate_regradable rejects records that omit any configured step.",
      "foundBy": [
        "python-specialist"
      ]
    },
    {
      "rule": "PY-CAMPAIGN-003",
      "wcag": "n/a",
      "severity": "moderate",
      "location": "scripts/run_harbor_campaign.py:81",
      "summary": "A multistep regrade wrapper hides recoverable nested transport failures and prevents the second permitted retry.",
      "fix": "Recognize the specific MultiStepRegradeTrial wrapper only when nested step errors fully explain it, then classify those errors and preserve regrade-only mode. Add a wrapper regression test.",
      "evidence": "RegradeError: Fresh verification failed for regrade step(s) ... returns review before nested Docker transport errors are examined.",
      "foundBy": [
        "python-specialist"
      ]
    }
  ],
  "passed": [
    "28 targeted campaign/comparison tests pass.",
    "Five-run mean, sample standard deviation, variance units, and incomplete-campaign comparison rejection are correct.",
    "Native retries are disabled and retry waves preserve separate original job directories."
  ],
  "notes": [
    {
      "skill": "python-specialist",
      "note": "Current tests do not exercise run_round restart behavior, total retry bounds, or final publication end to end."
    },
    {
      "skill": "python-specialist",
      "note": "Installed Harbor source was read to verify retry deletion, verifier reward parsing, and multistep regrade requirements."
    }
  ],
  "counts": {
    "critical": 0,
    "serious": 3,
    "moderate": 1,
    "minor": 0
  },
  "components": [],
  "score": 66,
  "grade": "D",
  "penalty": 17,
  "checks": 10,
  "generated": "2026-10-10",
  "template": "markdown"
}
```
