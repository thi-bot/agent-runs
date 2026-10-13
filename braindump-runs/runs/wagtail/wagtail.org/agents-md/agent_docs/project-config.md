# Project Configuration, CI, and Environments

> Project setup: env-var settings, shared upstream configs, pre-commit/CI wiring, DEFAULT_AUTO_FIELD and AppConfig conventions, dev-only apps, Node/browser targets, Docker user setup, Makefile, and environment constants.

**When to check**: When setting up or changing project configuration, CI, or environment/deployment settings

## Rules

<!-- rule:38 -->
- Read env-dependent/sensitive config from environment variables via `env.get("ENV_VAR", default)` in `settings/base.py` — never hardcode credentials, secrets, service IDs, feature toggles, or API keys; always supply a sensible default instead of letting the value fall through to `None`, so deployments don't crash on missing vars. — Hardcoded secrets leak in source control and can't vary per deployment; missing defaults turn every unset variable into a `NoneType` crash at runtime.
<!-- rule:65 -->
- Run code-quality checks and the production build in CI on pushes to `main` and pull requests — catches failures before they reach `main` — CI catches breakage before merge. Running lint/format only through `pre-commit` — with tool versions pinned in `.pre-commit-config.yaml` — ensures the same hooks run locally and in CI, so results never diverge. Defining per-tool CI jobs or duplicating tools as dev dependencies in `pyproject.toml` creates competing version sources that drift silently.
  - Centralize lint/format in `pre-commit`: run hooks via `pre-commit/action` in CI and pin tool versions in `.pre-commit-config.yaml` — one source of truth keeps local and CI hooks from drifting; avoid separate per-tool CI jobs or dev-dependency entries for these tools in `pyproject.toml`
<!-- rule:45 -->
- Extend upstream shared configs (e.g. `stylelint-config-wagtail`) in `.stylelintrc.js`, not legacy one-offs like `.prettierrc.toml` — keeps derived projects consistent with fixes upstream ships — Upstream-derived projects that pull in canonical presets lose those fixes and drift out of sync if they instead carry legacy or one-off local configs. Only add project-specific entries (e.g. `ignoreAtRules` for at-rules the project actually uses) and drop stale references to unused tools like Tailwind, so configs stay accurate and maintainable.
<!-- rule:26 -->
- Set project-wide Django defaults such as `DEFAULT_AUTO_FIELD` once in the shared base settings module; in `AppConfig` classes (`search/apps.py`, `navigation/apps.py`, etc.), set `default_auto_field` only for apps that define models — omitting it elsewhere avoids redundant config and keeps migration settings consistent across the project. — A single source of truth for `DEFAULT_AUTO_FIELD` (in `settings/base.py`) prevents divergent auto-field choices that produce inconsistent migrations; limiting per-app `default_auto_field` to model-defining apps keeps `AppConfig` classes minimal and correct.
<!-- rule:8 -->
- Create non-root dev users with `useradd -m -u $UID` and pass `$UID` from the Makefile `setup` target — keeps bind-mounted files owned by the host user, preventing permission clashes on the mounted workspace. — The `-m` flag gives the user a home directory so tools that write to `$HOME` (caches, configs) work, and the configurable `-u $UID` combined with the Makefile `setup` target's UID pass-through ensures files created inside the container (e.g. by the app during bind-mounted dev) are owned by the invoking host user rather than root or an arbitrary in-container UID — otherwise the host checkout gets root-owned files that break subsequent host-side edits and git operations.
<!-- rule:63 -->
- Keep a root `Makefile` with a default `help` target listing tasks, even when another task runner exists — gives contributors one predictable place to discover commands. — Contributors grep the root for how to build/test; if tasks live only in another runner, they miss commands or reinvent them.
<!-- rule:50 -->
- Pin the Node LTS version in `.nvmrc`, then mirror it in `.github/workflows/ci.yml`, `package.json` `engines`, and any lockfile regeneration — drift between these lets local installs and CI resolve different dependency trees. — The `.nvmrc` version, CI runner, `engines` field, and lockfiles are one coordinated unit; when they fall out of sync, a lockfile regenerated on a newer Node can break installs on the pinned version (and vice versa), producing "works on my machine" build failures. Pin to the newest LTS that all project dependencies support, and regenerate lockfiles with that same version.
<!-- rule:189 -->
- Don't use `{% trans %}`, `{% blocktrans %}`, or `{% load i18n %}` in `wagtailio` templates — the site isn't localized, so they add noise and translate nothing — Templates are spread across dirs like `wagtailio/packages/templates/`, so scanning for i18n tags to remove later is expensive; skipping them keeps templates readable and avoids implying translations exist.
<!-- rule:54 -->
- Treat `package.json` `browserslist` as the browser-support source of truth — use Wagtail's standard list (Firefox ESR, last 2 Chrome/ChromeAndroid/Edge, last 1 Firefox, last 2 iOS, last 3 Safari; exclude Safari 13 and IE 11), since tooling and polyfills key off it — 
  - Mirror that baseline in `tsconfig.json` (`compilerOptions.target: es2020`, with a comment noting modern-browser support) — a lower target emits syntax the supported browsers already handle, while a higher one emits syntax they can't parse
<!-- rule:87 -->
- Keep `PRODUCTION_APP_INSTANCE` in `fabfile.py` in sync with the production app name — deployments target a stale instance otherwise. — The constant is hardcoded (currently `"wagtail-org-production"`), so renaming infrastructure without updating it here silently points deployment commands at a non-existent app instance.
<!-- rule:25 -->
- Register custom `AppConfig` via dotted path in `INSTALLED_APPS`, not `default_app_config` — the latter was deprecated in Django 3.2 and removed in 4.1 — `default_app_config` no longer exists in Django 4.1+, so apps relying on it will silently fail to load their custom `AppConfig`. Using the dotted path in `INSTALLED_APPS` works across all supported Django versions and makes the active config explicit at the registration site.
<!-- rule:27 -->
- Put dev-only Django apps in environment-specific settings like `dev.py`, not base — if a dev-only app must live in base `INSTALLED_APPS`, move its package into the main dependency group so production installs and imports stay consistent. — Keeps production deployments from installing or loading dev-only packages, and prevents base `INSTALLED_APPS` from referencing packages absent from the main dependency group.
