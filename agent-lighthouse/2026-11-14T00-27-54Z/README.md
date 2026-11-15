# Agent Lighthouse: nine-site baseline

Run date: 2026-11-14 UTC. Local checkout: `/home/thibaudcolas/dev/agent-lighthouse`, revision `6f8097bb883ab2c9af6e3e4c1b0c64502c262603`, CLI/core 10.6.0.

All nine scans completed with exit code 0, judgeable results, no audit errors, no exhausted scan budgets, and no recorded request stops.

## Results

| Site | Engine score | Report |
| --- | ---: | --- |
| Tate | 80 | [Tate HTML report](tate/agent-lighthouse-report.html) |
| NHS | 89 | [NHS HTML report](nhs/agent-lighthouse-report.html) |
| Google Blog | 84 | [Google Blog HTML report](google-blog/agent-lighthouse-report.html) |
| W3C | 82 | [W3C HTML report](w3c/agent-lighthouse-report.html) |
| Low-tech Magazine | 79 | [Low-tech Magazine HTML report](lowtech/agent-lighthouse-report.html) |
| Wagtail editor guide | 85 | [Wagtail editor guide HTML report](fresh-guide/agent-lighthouse-report.html) |
| Wagtail | 86 | [Wagtail HTML report](fresh-wagtail/agent-lighthouse-report.html) |
| Wagtail documentation | 81 | [Wagtail documentation HTML report](docs-wagtail/agent-lighthouse-report.html) |
| Draft.js exporter | 79 | [Draft.js exporter HTML report](draftjs-exporter/agent-lighthouse-report.html) |

## Scope and interpretation

Each scan declares the site or documentation subsite entry page as `homepage`. The engine additionally performs its built-in origin-file and sitemap probes. This is an HTTP baseline: no browser DOM was supplied, no LLM ran, and no agent completed a user journey. The original sustainability sample URLs are retained in `targets.json` for provenance; this run does not claim to have audited those complete samples.

The scores are the unmodified engine results for this version, time and sample. They are not directly comparable to sustainability scores or another readiness tool. Findings still need applicability and evidence review. A category with no assessed mass is represented as null in the aggregate rather than reporting its raw stored zero as a failing score.

Guide `/en/`, documentation `/en/stable/`, and Draft.js exporter `/draftjs_exporter/` are declared subsite homepages. Root-file and origin checks may describe the hosting origin, especially shared `wagtail.github.io`, rather than the individual documentation project.

## Findings to review before acting

- **Commerce applicability:** `agentic-commerce/acp-policy-link-surface` fails on eight sites and warns on Tate. Its source and dossier describe merchant checkout policy links, yet its precondition only requires a scanned page with links. It has no commerce-adoption or merchant gate. On NHS, W3C and documentation sites, this looks like an applicability gap requiring review, not evidence that they need checkout policies. The NHS finding maps social-care support to an ACP support link. All original findings and scores remain unchanged.
- **Review and trust assumptions:** `answer-readiness/review-signals` fails on every sampled homepage. `answer-readiness/trust-signals` fails on Tate and NHS and warns on the other seven. Review/testimonial and quantified-social-proof expectations may not fit institutional or documentation homepages. These are review candidates, not independently confirmed defects.
- **Static CSS and ARIA findings:** CSS hidden-content and accessibility checks use HTTP-derived evidence. Compare them with browser snapshots before concluding that users or browser agents cannot perceive a control or content. No rendered-browser confirmation was performed here.

Source references for the applicability review: [ACP audit](https://github.com/ForkPoint/agent-lighthouse/blob/6f8097bb883ab2c9af6e3e4c1b0c64502c262603/packages/core/src/audits/agentic-commerce/acp-policy-link-surface.ts), [ACP evidence dossier](https://github.com/ForkPoint/agent-lighthouse/blob/6f8097bb883ab2c9af6e3e4c1b0c64502c262603/docs/evidence/audits/agentic-commerce/acp-policy-link-surface.md), [review-signal audit](https://github.com/ForkPoint/agent-lighthouse/blob/6f8097bb883ab2c9af6e3e4c1b0c64502c262603/packages/core/src/audits/answer-readiness/review-signals.ts), [trust-signal audit](https://github.com/ForkPoint/agent-lighthouse/blob/6f8097bb883ab2c9af6e3e4c1b0c64502c262603/packages/core/src/audits/answer-readiness/trust-signals.ts).

## Artifacts

- [Summary CSV](summary.csv) and [summary JSON](summary.json): scores, scored status counts, coverage, timings, conditions and findings.
- All findings: flattened top-level engine checks, archived in [agent-runs-traces](https://github.com/thi-bot/agent-runs-traces/tree/main/projects/thibaudcolas/agent-lighthouse/baseline/20261114); regenerate with `summarize.py`. [Audit errors](audit-errors.json) is empty.
- [Manifest](manifest.json), [targets](targets.json), `setup/`, and each `run.json`: exact source/build/configuration, timestamps, command and exit status.
- Each site directory contains original JSON, HTML and Markdown reports, audit trace, request logs, progress events and terminal output.
- `run-campaign.py` records the exact orchestration used. It refuses to overwrite existing site directories. Copy it and `targets.json` into a new campaign directory for a new run.
- `summarize.py` rebuilds aggregate views from the saved original reports without network access.

No target files changed, and no forms or transactions were submitted.
