<!-- braindump: rules extracted from PR review patterns -->

# .github/workflows/ Guidelines

## Config

<!-- rule:879 -->
- Fold new coverage into existing `.github/workflows/test.yml` matrix cells — each added entry, key, or runner job multiplies job count and burns CI minutes. Replace a lower-priority job or use `env`/conditionals for per-job config instead of new matrix keys. — matrix entries multiply runner jobs and CI minutes
<!-- rule:1879 -->
- Steps in `.github/workflows/*.yml` that run on fork PRs get only `GITHUB_TOKEN` — never require repo secrets there. — Fork PR runners can't access repository secrets, so secret-dependent steps would fail.
<!-- rule:2396 -->
- Use simple tool-oriented names in workflow `name:` fields — avoids YAML escaping from apostrophes/colons — Workflow names and user-facing strings in `.github/workflows/**/*.yml` appear in CI UI and logs. Marketing-style text with apostrophes or colons forces quoting/escaping and clutters the Actions list; short tool/function-style names (e.g., `test`, `lint`, `release`) stay unambiguous and scrape cleanly in badges/status checks.
<!-- rule:2836 -->
- Set both `issue-message` and `pr-message` in `actions/first-interaction` — omitting either leaves first-time reporters/PR authors with no automated greeting — First-time contributors who open a PR and hear nothing may assume the project is unmaintained; an explicit review-ASAP message in `pr-message` sets expectations and encourages them to stay engaged.
  - Include a "maintainers will review ASAP" note in `pr-message` — first-time contributors otherwise can't tell if their PR was noticed
<!-- rule:860 -->
- Keep at least one non-parallel job per database backend in CI test matrices; reserve parallel test flags for the remaining jobs. — Serial jobs surface ordering-dependent failures and per-backend setup bugs that parallel execution can mask or hide behind flaky concurrency issues.

<!-- /braindump -->