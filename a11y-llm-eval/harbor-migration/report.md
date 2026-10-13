# Web Accessibility Audit

An audit of web content, run on 2026-10-06. Read the executive summary for the verdict, the priorities section for what to do first, and the findings tables for detail.

## Metadata

What was audited, with what, and under which settings.

| Field | Value |
|---|---|
| Date | 2026-10-06 |
| Scope | 1 item |
| Skills run | cognitive-accessibility |
| Tooling | node v26.8.1 |
| Scan configuration | defaults, no config file found |
| Checks counted | 10 |

Audited:

- `a11y_llm_tests/report.py changed runtime and methodology prose`

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

4 checks ran and found nothing.

- Changed wording explains Harbor's role in selecting and running coding agents.
- Instruction-set wording identifies how Harbor and legacy Copilot runs deliver custom instructions.
- New runtime explanations use concise sentences.
- The Harbor link has descriptive text and surrounding context explaining its purpose.

## Needs a human

Items a skill could not decide, or could not check automatically.

- **cognitive-accessibility**: Review limited to changed prose; layout, controls, semantic structure, CSS, and runtime behavior were outside scope.

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
    "cognitive-accessibility"
  ],
  "scope": [
    "a11y_llm_tests/report.py changed runtime and methodology prose"
  ],
  "findings": [],
  "passed": [
    "Changed wording explains Harbor's role in selecting and running coding agents.",
    "Instruction-set wording identifies how Harbor and legacy Copilot runs deliver custom instructions.",
    "New runtime explanations use concise sentences.",
    "The Harbor link has descriptive text and surrounding context explaining its purpose."
  ],
  "notes": [
    {
      "skill": "cognitive-accessibility",
      "note": "Review limited to changed prose; layout, controls, semantic structure, CSS, and runtime behavior were outside scope."
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
  "generated": "2026-10-06",
  "template": "web"
}
```
