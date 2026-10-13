<!-- braindump: rules extracted from PR review patterns -->

# .github/workflows/ Guidelines

## Config

<!-- rule:2879 -->
- Mirror triggers, `paths`/`paths-ignore`, and shared components across sibling workflows (`tests.yml`, `linters.yml`, `docs.yml`) — divergent CI config makes identical checks fire inconsistently. — Sibling workflows doing comparable checks should share trigger and path config so PRs don't get inconsistent results (some checks running, others silently skipped). Scoping to real source globs avoids firing irrelevant jobs on CSS/JS/HTML/Markdown-only changes, while including `/*` (or mirroring `paths-ignore:`) ensures config-only changes still trigger. Local check scripts must track the CI workflow they mirror or devs only discover drift after pushing.
  Scope PR triggers to the source globs a job validates (e.g., `django/**/*.py`); include `/*` in `paths:` allowlists so config-only changes still run — asset/docs-only edits shouldn't fire code checks.
  Match `paths-ignore:` to the sibling doing the same checks (e.g., `coverage_tests.yml` vs `tests.yml`) and keep local check scripts in sync — mismatches surface only after pushing.
<!-- rule:1669 -->
- Set explicit least-privilege `permissions` on `GITHUB_TOKEN` in every `.github/workflows/*.yml`, one access level (`read`/`write`/`none`) per scope — `write` implies `read` — Default token scopes are broad; pinning them limits blast radius if a workflow is compromised. Listing both `read` and `write` for a scope is invalid YAML semantics — `write` already grants read, so specifying one level avoids misconfiguration.
<!-- rule:2063 -->
- Failure surfacing in `.github/workflows/` — Branch protection can only block merges on a real failed job, so a failure that exits 0 or is swallowed by `continue-on-error` merges as green. Exiting from the detecting step (instead of a third-party status action) removes external action/token dependencies, and honoring the tool's built-in failure mode keeps `set -e` intact rather than masking the error.
<!-- rule:2064 -->
- Keep `.github/workflows/` minimal — add only the jobs, steps, and triggers the check needs. — Keeps CI fast to read and cheap to run while preserving per-check visibility in logs.
  - Skip extra conditional optimizations (e.g., commit-recency filters on scheduled runs) unless a concrete capacity or cost need is demonstrated — they add complexity and opaque behaviour for no measured saving.
  - Merge independent checks that share environment setup into one job — avoids duplicated setup, configuration drift, and wasted runner resources.
  - Give each check its own named workflow step instead of chaining commands in a single `run` block — each check then appears as a separate log section, so failures are easy to locate.
<!-- rule:4187 -->
- Set `timeout-minutes: 60` on every job in `.github/workflows/*.yml` — hung jobs otherwise burn the 360-minute default — GitHub Actions jobs default to a 360-minute timeout, so a stuck or looping step can hold a runner for up to six hours before failing. An explicit `timeout-minutes: 60` bounds that to one hour and surfaces hangs as failures instead of silently consuming runner minutes.

## General

<!-- rule:4056 -->
- In `.github/workflows/*.yml`, install only the system packages the project currently requires — unused CI deps bloat images and hide real dependency drift. — These rules keep `.github/workflows/*.yml` dependency provisioning minimal and uniform: extra packages and unstripped recommends inflate images and can break unrelated jobs, ad-hoc `apt-get` invocations drift across workflows, per-job reinstalls of base-image deps waste time, and duplicate `apt-get update` calls add latency and can race.
  - Provision system packages with the single form `apt install -y --no-install-recommends <packages>` — consistent invocation avoids per-workflow divergence and skips unneeded recommends.
  - Bake commonly needed deps into the CI base image instead of reinstalling them per job — keeps job setup fast and identical across workflows.
  - Remove redundant `apt-get update` calls — the base image index is already fresh; duplicate updates waste minutes and can race.
<!-- rule:2051 -->
- In `.github/workflows/`, validate special install/runtime configs with the canonical suite (`python tests/runtests.py`), not smoke checks like `manage.py check`/`migrate` — smoke checks pass even when the config the job exists to test is broken. — This prevents CI from passing on broken special install/runtime configurations that smoke checks never exercise, and avoids slow, unnecessary full-suite runs in feature-specific workflows.
  - In feature-specific workflows, run only the relevant subset (e.g. `runtests.py gis_tests`) instead of the full suite — keeps CI fast without dropping coverage of the changed code.
<!-- rule:4191 -->
- Guard `github.event` array derefs (`pull_requests[0]`, `commits[0]`) with a null/empty check in the step `if:` or shell — these arrays can be empty even when the trigger implies otherwise, and a bare index fails the step. — `github.event` payload arrays like `pull_requests` and `commits` can be empty in edge cases (e.g., certain `workflow_run` scenarios) even when the workflow trigger appears to guarantee presence. Without an explicit null/empty check, `pull_requests[0].number`-style dereferences resolve to null/empty and cause the step to fail or produce unexpected values.

## File-Specific Rules

### `.github/workflows/docs.yml`

<!-- rule:4379 -->
- In `.github/workflows/docs.yml`, replace `cd docs && make check` with separate `make spelling`, `make lint`, and `make black` steps; set `continue-on-error: true` on spelling and lint — so a failing check doesn't hide results from the other independent checks sharing the same setup

### `.github/workflows/tests.yml`

<!-- rule:4262 -->
- In `.github/workflows/tests.yml`, keep at least one job running latest/unpinned dependencies on `main` pushes only, never PRs — surfaces upstream breakage without adding noise to PR checks — Unpinned runs on `main` catch upstream breakage early, while excluding them from PRs keeps PR checks focused on the change under review.

<!-- /braindump -->