<!-- braindump: rules extracted from PR review patterns -->

# .github/workflows/ Guidelines

## Config

<!-- rule:269 -->
- Remove temporary triggers (`pull_request`, `push`) and stale comments from `.github/workflows/*.yml` before merging — leftover PR-validation configs otherwise reach production and re-trigger CI on every branch push. — Workflows added during PR validation often carry triggers and comments that were only meant for that one PR; if left in place after merge, they leak into the production workflow and cause CI to fire on unintended branches/events.
<!-- rule:26 -->
- Quote version-like scalars in workflow YAML (`python-version: "3.10"`) — Unquoted, the YAML parser coerces `3.10` to the float `3.1`, silently selecting the wrong interpreter in `.github/workflows/*.yml`.
<!-- rule:377 -->
- In `.github/workflows`, set scheduled `cron` just after likely merge windows (e.g. Mon AM post-weekend) and update the adjacent comment with the new day/time and rationale — automated runs then hit fresh commits, and the comment preserves why that slot was chosen, so future edits don't silently drift off the merge cadence. — 

## General

<!-- rule:24 -->
- Pin actions in `.github/workflows/*.yml` to current major tags (`actions/checkout@v4`, `@v5`). — Matches the pinning style already used elsewhere in the workflow — outdated majors (`@v2`) go stale and full patch pins (`@v5.5.1`) churn. Commit-SHA pinning is preferred when supply-chain security matters, but a major-version tag is acceptable to keep workflow files consistent.
<!-- rule:308 -->
- In `.github/workflows/*.yml` that validate Docker Compose, exercise the real Compose runtime rather than static checks. — Static or mocked validation misses orchestration bugs — broken service wiring, wrong startup order, container crashes on boot — so tests must hit the live stack to be trustworthy.

<!-- /braindump -->