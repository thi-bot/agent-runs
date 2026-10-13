# Markdown Accessibility Audit

An audit of markdown documentation, run on 2026-10-13. Read the executive summary for the verdict, the priorities section for what to do first, and the findings tables for detail.

## Metadata

What was audited, with what, and under which settings.

| Field | Value |
|---|---|
| Date | 2026-10-13 |
| Scope | 9 items |
| Skills run | pr-review |
| Tooling | node v26.8.1 |
| Scan configuration | defaults, no config file found |
| Checks counted | 10 |

Audited:

- `.gitignore`
- `README.md`
- `a11y_llm_tests/`
- `config/`
- `docs/legacy-copilot.md`
- `requirements-copilot.txt`
- `requirements.txt`
- `scripts/`
- `tests/`

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

- Campaign setup finding resolved: README now covers Unix locking, host Codex auth.json login, and exclusive baseline creation using Harbor Task.checksum.
- Four new test modules total 670 lines against 1368 new production lines, above the skill 20% threshold.
- Harbor dependency and optional legacy Copilot SDK installation paths are documented.
- No credential-like tokens or private-key material found by pattern scan of all 21 pending files.
- No generated experiment outputs included among pending files; runs, jobs, exported datasets and review artifacts are ignored.
- No hard-coded user home paths found in pending files.

## Needs a human

Items a skill could not decide, or could not check automatically.

- **pr-review**: Triage publication review only; extensive Python logic review and runtime tests are handled separately by the parent agent.
- **pr-review**: Change map: new Harbor integration and campaign/comparison features, variant-loading refactor, report wording, config/docs/dependencies, four test modules.
- **pr-review**: Commit story: pending migration builds on upstream f6ac724; no publication commit exists yet.
- **pr-review**: No existing publication review document or workspace scan configuration found.
- **pr-review**: Security-sensitive behavior: campaign uses host Codex auth.json through Harbor; no credentials are embedded in source.
- **pr-review**: Delta: DOC-CAMPAIGN-SETUP resolved after rereading the revised README. No remaining findings.

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
    "pr-review"
  ],
  "scope": [
    ".gitignore",
    "README.md",
    "a11y_llm_tests/",
    "config/",
    "docs/legacy-copilot.md",
    "requirements-copilot.txt",
    "requirements.txt",
    "scripts/",
    "tests/"
  ],
  "findings": [],
  "passed": [
    "Campaign setup finding resolved: README now covers Unix locking, host Codex auth.json login, and exclusive baseline creation using Harbor Task.checksum.",
    "Four new test modules total 670 lines against 1368 new production lines, above the skill 20% threshold.",
    "Harbor dependency and optional legacy Copilot SDK installation paths are documented.",
    "No credential-like tokens or private-key material found by pattern scan of all 21 pending files.",
    "No generated experiment outputs included among pending files; runs, jobs, exported datasets and review artifacts are ignored.",
    "No hard-coded user home paths found in pending files."
  ],
  "notes": [
    {
      "skill": "pr-review",
      "note": "Triage publication review only; extensive Python logic review and runtime tests are handled separately by the parent agent."
    },
    {
      "skill": "pr-review",
      "note": "Change map: new Harbor integration and campaign/comparison features, variant-loading refactor, report wording, config/docs/dependencies, four test modules."
    },
    {
      "skill": "pr-review",
      "note": "Commit story: pending migration builds on upstream f6ac724; no publication commit exists yet."
    },
    {
      "skill": "pr-review",
      "note": "No existing publication review document or workspace scan configuration found."
    },
    {
      "skill": "pr-review",
      "note": "Security-sensitive behavior: campaign uses host Codex auth.json through Harbor; no credentials are embedded in source."
    },
    {
      "skill": "pr-review",
      "note": "Delta: DOC-CAMPAIGN-SETUP resolved after rereading the revised README. No remaining findings."
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
  "generated": "2026-10-13",
  "template": "markdown"
}
```
