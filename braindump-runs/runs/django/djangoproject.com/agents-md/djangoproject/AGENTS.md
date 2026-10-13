<!-- braindump: rules extracted from PR review patterns -->

# djangoproject/ Guidelines

## Config

<!-- rule:328 -->
- In `djangoproject/settings/*.py`, read required config with direct indexing (`os.environ["KEY"]`) — missing values fail fast instead of silently propagating `None`. — Settings modules follow project-specific lookup patterns; deviations cause inconsistent secret resolution and fail-late errors. Placement: djangoproject/settings/AGENTS.md.
  - Assign secret-backed optional settings unconditionally with an explicit default (e.g. `""`), not inside an `if` block — the setting stays defined so later imports don't hit `AttributeError`.
  - Use the project's established env/secret lookup pattern; no ad-hoc `os.getenv(...)` or `SECRETS.get(...)` fallbacks — inconsistent lookups diverge from how secrets resolve elsewhere.
  - Don't parameterize hardcoded settings values — exposing them invites config that breaks the project.
<!-- rule:276 -->
- Keep environment-specific settings in dedicated settings modules, not shared ones. Put Docker-only settings (e.g., `ALLOWED_HOSTS` for Docker-network hostnames) in the Docker settings module under `djangoproject/settings/`, not in shared modules like `dev.py` — this prevents weakening configuration for other local/dev contexts. Use dedicated modules per environment so each context gets only the overrides it needs. — Extracted from raw rule about settings organization under `djangoproject/settings/`.
  In development settings, keep `ALLOWED_HOSTS` as an explicit list of documented dev hostnames (plus any secrets-provided hosts) rather than `['*']` — wildcard hosts hide misrouting and disable host validation. Keep the list aligned with the `README`, fixtures, `hosts.py`, and tests so documented hostnames actually resolve.
  If a configured domain returns a Host-header mismatch, fix the upstream Docker/network config or update the docs — don't relax `ALLOWED_HOSTS` to silence the error. Verify each configured domain serves the intended site.
<!-- rule:329 -->
- Use quoted snake_case strings for `SECRETS` lookups in `settings/*.py` — unquoted names raise `NameError` — `SECRETS` is a dict, not a namespace, so `in SECRETS` only works with string keys. Quoting them (and keeping lowercase snake_case, e.g. `'recaptcha_public_key'`) prevents `NameError` at import time and keeps secret names consistent across `djangoproject/settings/` modules.

## Code Style

<!-- rule:74 -->
- Reuse existing DOM selectors and hooks before adding classes, attributes, or data-testids — new hooks duplicate what the JS already depends on and drift out of sync — New selectors/hooks duplicate what JS already relies on and drift out of sync. A shared class like `.doc-floating-warning` ensures one layout-offset calculation covers all warning variants, instead of missing variant-specific IDs. `getElementById` is the direct/faster API, and consistent query style within a file avoids gratuitous churn.
  - Query shared-behavior elements by a class, not variant-specific IDs — e.g. in `djangoproject/static/js/mod/*`, floating doc warnings all use `.doc-floating-warning` so shared layout offsets apply to `#dev-warning` and `#outdated-warning` alike
  - Prefer `getElementById('id')` for ID lookups (direct, faster API); don't mix `querySelector` and `getElementById` arbitrarily within a file — a consistent style keeps DOM queries scannable
<!-- rule:379 -->
- Follow PEP 8 in Django doc examples — two blank lines between top-level classes and `admin.site.register` calls; readers copy these as canonical style — Documentation examples are copy-pasted by users, so non-PEP 8 formatting spreads bad habits and undermines the docs' authority.
  },

## Testing

<!-- rule:403 -->
- Rewrite as concise, actionable guideline with rationale, preserving code references and markdown formatting. — N/A
<!-- rule:291 -->
- Use `{host}:{port}` in `Host` headers for `django-hosts` tests; keep bare host vars for settings — `django-hosts` resolves hosts by matching ports, so a port-less header won't route, while settings-level allowed/excluded lists still need the bare host. — `django-hosts` resolves hosts by matching ports, so a port-less `Host` header won't route, while settings-level allowed/excluded lists still need the bare host.

## General

<!-- rule:31 -->
- Expose LTS status via `Release.version_with_lts`, returning `gettext("{version} (LTS)").format(version=self.version)` when `self.is_lts` (keep the `# Translators:` comment), and render it in release roadmap/download templates — keeps the LTS marker inside the translatable string so translations stay correct; a bare `self.version` cell silently drops LTS info and breaks the translated output. — Wrapping the whole `{version} (LTS)` string in `gettext` lets translators localize the marker alongside the version, matching how it appears in release docs. Using `self.version` alone would render an untranslatable and LTS-less cell.

## File-Specific Rules

### `djangoproject/settings/common.py`

<!-- rule:400 -->
- Set `HOST` (e.g. `"localhost"`) explicitly in `MAILERS` in `djangoproject/settings/common.py` — backend class defaults documented for direct instantiation don't apply to `MAILERS`, so omitting required options leaves the backend misconfigured. — Defaults advertised on the backend class only hold when it's instantiated directly; Django's `MAILERS` wiring can bypass them, so relying on the implicit default silently breaks mail delivery.

<!-- /braindump -->