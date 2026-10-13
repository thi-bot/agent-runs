<!-- braindump: rules extracted from PR review patterns -->

# Coding Guidelines

Also see directory-specific guidelines:

- [bakerydemo/templates/AGENTS.md](bakerydemo/templates/AGENTS.md)

## Code Style

<!-- rule:9 -->
- Remove dead CSS selectors from both templates and stylesheets (e.g. `bakerydemo/static/css/main.css`) in the same commit as the refactor that orphaned them — Splitting the cleanup leaves dead CSS and unused class hooks behind, making future refactors harder since nobody can tell which selectors are still load-bearing.
<!-- rule:59 -->
- End every source file, including templates, with exactly one trailing newline — Missing final newlines break POSIX line semantics and trigger linter warnings, while extra trailing blank lines create diff noise and inconsistency across files.
<!-- rule:10 -->
- Use relative units (`rem`/`em`/`%`) for `font-size` and unitless values for `line-height` (e.g., `line-height: 1.5`) — never `px` — Relative units respect user browser font-size preferences and unitless `line-height` scales proportionally with the element's `font-size`, keeping text accessible and correctly spaced when sizes change.
<!-- rule:16 -->
- Keep underlines (or a non-color affordance) on inline body links — scope any `text-decoration: none` to UI links and restore underlines in content, including `:hover` states — Color-only link styling fails WCAG accessibility: users with low vision or color blindness can't distinguish links from surrounding text.
<!-- rule:21 -->
- Use standard breakpoints (e.g., `768px`, not `766px`) defined centrally as custom properties like `--breakpoint-md` in `:root`; put all-viewport styles in the base rule and reserve media queries for overrides, scoping tweaks like `width: auto` to the breakpoint that needs them — Near-duplicate one-off values and scattered overrides fragment the responsive design, causing inconsistent layouts and making breakpoint changes require edits across many rules.
<!-- rule:67 -->
- Use built-in blocks like `ImageBlock` directly in `StreamField` (no single-block `StreamBlock` wrappers); name custom blocks after added behavior (e.g. `CaptionedImageBlock`) and compose with `ImageChooserBlock` when adding fields like `caption`. — Avoids redundant nesting, name-shadowing of built-ins, and overlapping alt-text fields — keeps block definitions minimal and consistent across modules like `bakerydemo/recipes/blocks.py` and `bakerydemo/base/blocks.py`.
<!-- rule:85 -->
- Use 4-space indentation in all CSS files, never 2-space — Matches the project's Python indentation style and prevents mixed 2-space/4-space blocks that create noisy diffs and inconsistent formatting across stylesheets.
<!-- rule:48 -->
- Scope demo/environment notices to their admin/login templates using existing components like `help_block`; don't inject global banners via middleware (`base/middleware.py`) — Middleware-injected banners appear on every HTML response where they're irrelevant and are harder to maintain, while reusing `help_block` keeps notices contextual and consistent with the project's UI patterns.
<!-- rule:86 -->
- In Wagtail page templates, access fields via the `page` context variable (`page.image`, `page.origin`), never `self.field` — Mixing `self.field` and `page.field` makes templates harder to read and risks subtle breakage when the template context changes; a single access pattern keeps page templates predictable project-wide.
<!-- rule:13 -->
- Avoid `!important`; use class-only selectors (e.g., `.nav-pills > .breads`, not `li.breads`) and match the overridden class so source order decides — `!important` breaks the cascade and forces escalating specificity wars; equal-specificity class selectors keep overrides predictable and debuggable via source order.
<!-- rule:41 -->
- Style with class selectors, not `[role=...]` attribute selectors, in CSS (e.g., `main.css`) — ARIA roles are semantic accessibility attributes that may be absent, changed, or invalid in markup — coupling styles to them makes styling fragile and conflates presentation with accessibility semantics.
<!-- rule:15 -->
- Apply hover styles and `cursor: pointer` only to interactive elements (`a`, `button`); for container-level hover reactions in `bakerydemo/static/css/main.css`, scope the CSS to the interactive child or make the container itself interactive. — Hover affordances on non-clickable elements falsely signal interactivity, confusing users and undermining trust in UI cues.
<!-- rule:22 -->
- Offset adjacent `min-width`/`max-width` media queries by 1px (e.g., `max-width: 991px` + `min-width: 992px`); never set both to the same value — use `width` for fixed sizes. — Both bounds are inclusive, so equal values make both queries match at the boundary and apply conflicting styles simultaneously.
<!-- rule:37 -->
- Render rich text fields with `|richtext`, never `|safe`, in Django/Wagtail templates — e.g. `{{ page.body|richtext }}` in templates like `templates/base/home_page.html`. — `|safe` disables autoescaping and bypasses Wagtail's rich-text handling (embeds, links), causing rendering glitches and potential XSS.
<!-- rule:66 -->
- In templates, wrap optional metadata fields in conditionals together with their separators, labels, and container tags — never emit empty elements or dangling punctuation when the backing value is absent. — Empty containers and orphaned separators render as visual clutter (stray commas, blank labels) in output, confusing users and breaking downstream parsers that expect well-formed content.
<!-- rule:33 -->
- Compose management commands via `call_command()` (see `reset_demo.py`) instead of duplicating subcommand logic — check the subcommand's behavior before adding explicit steps. — Reusing existing commands keeps side effects and output consistent, so fixes to a subcommand propagate everywhere instead of diverging across copies.
<!-- rule:11 -->
- Write zero CSS values as `0`, not `0px` — units are redundant on zero — Zero is zero in every CSS unit, so dropping units keeps stylesheets shorter and consistent with the style used in files like `bakerydemo/static/css/main.css`.
<!-- rule:30 -->
- Declare colors and font stacks via CSS custom properties (`var(--name)` from `:root`) — never hardcode hex/rgb or even named colors like `white`; match generic fallbacks to the font's real classification (e.g. `serif` for Marcellus) — Centralizing values in `:root` keeps a single source of truth so theme changes propagate everywhere, and correct fallbacks prevent wrong font rendering when webfonts fail to load.

## Documentation

<!-- rule:5 -->
- Link docs to stable URLs (`latest`, `stable`, repo tags/releases pages) — never version-pinned or deprecated links; verify links resolve — Version-pinned URLs rot as releases move on, sending readers to outdated or broken pages; stable aliases and authoritative sources stay correct without manual upkeep.
<!-- rule:4 -->
- Use audience-appropriate, domain-familiar language in docs, labels, and help text; in `bakerydemo`, keep StreamField preview values, fixtures, and seed data bakery-themed — no Lorem ipsum or off-theme filler. — Demo content doubles as documentation, so jargon or unrelated filler undermines comprehension and breaks the demo's cohesive bakery theme.
<!-- rule:28 -->
- Document only valid `DJANGO_SETTINGS_MODULE` entrypoints (e.g., `bakerydemo.settings.dev`) in README and `docs/settings` — don't reference auto-loaded or obsolete modules, and don't call optional files like `.env` or `bakerydemo/settings/local.py` required for the server to start. — Keeps setup docs matching the actual settings/env configuration so the project is immediately runnable and new contributors aren't blocked by misleading instructions.
<!-- rule:49 -->
- Use exact current names when comments/docstrings reference code entities (signals, functions, env vars, config keys), and update them on renames — Stale or paraphrased names send readers searching for entities that don't exist, making documentation actively misleading instead of helpful.
<!-- rule:57 -->
- Write comments in config/example files (`.env.example`, `bakerydemo/settings/base.py`) as reader docs: explain each setting's purpose and how to change it — not 'we/our' convention notes or content lists. — New developers copy these files first; comments that explain intent and give actionable steps let them configure without digging through source, while 'we/our' notes only make sense to the original team.
<!-- rule:6 -->
- Keep deployment configs (`app.json`, `heroku.yml`, `Dockerfile`) and README deploy instructions in sync — never document a platform with no config in the repo, and remove docs when its config is removed — Out-of-sync deployment docs send users through broken or unsupported deploy paths, eroding trust in the demo project.
<!-- rule:61 -->
- Say "compatible"/"compatibility" for framework or dependency support; reserve "compliant"/"compliance" for formal specification or regulation adherence — "Compliance" implies certified adherence to a standard or regulation — using it for dependency support overstates guarantees and can create legal/support expectations.
<!-- rule:8 -->
- Use precise ORM/storage terminology in model/page docstrings and comments — describe actual fields, constraints, and behavior; avoid vague wording like 'independently of the database', 'preview', or 'any type of page content', and prefer 'Specifies that...' over 'Defines that...' for child-page constraints — Vague or misleading docstrings cause wrong assumptions about persistence and page-type behavior; precise, consistently phrased docs keep the codebase trustworthy and easier to extend.
<!-- rule:42 -->
- When docs rely on cache-based prebuilds, add a scheduled CI job to refresh the cache and document in `readme.md` how users can verify artifacts aren't stale — Cached artifacts silently go stale over time — without cache refresh and user-facing verification steps, users unknowingly consume outdated prebuilds and lose trust in the docs.
<!-- rule:74 -->
- Write code verbatim inside fenced blocks (```): no inline backticks, no extra indent — indent only to nest under list items — Stray backticks or indentation render literally in the output, breaking copy-paste and readability of code samples in files like `contributing.md` and `readme.md`.

## Config

<!-- rule:17 -->
- Keep shared config minimal and portable: limit `requirements/base.txt`, `settings/base.py`, and `.env.example` to what all environments need, and move env-specific or optional deps/settings to scoped files (e.g., `requirements/production.txt`, `.env.docker.example` for container-only vars). Keep Dockerfile `ENV` to production-safe, image-general defaults (debug off, production settings module), pass deployment-specific values at runtime, and expose tunables as env vars rather than hardcoded constants. — Baking deployment-specific values into shared config or the image breaks portability across environments, risks unsafe defaults reaching production, and forces image rebuilds for changes that should be runtime configuration.
<!-- rule:64 -->
- Make setup non-blocking: default `DJANGO_SETTINGS_MODULE` in `manage.py`, load optional files like `bakerydemo/settings/local.py` via `try`/`except`, and in setup docs separate hard startup requirements from optional files (`.env`, local settings) — documenting those too. — New contributors should get a working server on first run; sane defaults and documented optional files prevent blocked setups and surprise discoveries later.
<!-- rule:73 -->
- Guard Django-version- or database-backend-specific imports, middleware, and `INSTALLED_APPS` entries (e.g. `django.contrib.postgres`) behind version or `DATABASES` engine checks instead of adding them unconditionally — Unconditional additions break settings with `ImportError` or startup crashes when the project runs on a different Django version or a non-matching database backend, so conditional guards keep one settings module portable across environments.
<!-- rule:14 -->
- Never hardcode API keys, external service URLs, or deployment-specific values in templates (e.g., under `bakerydemo/templates/`) — define them as settings variables and inject them into the template context, or omit non-essential external links. — Hardcoded values break across environments (dev/staging/prod) and can leak secrets into version control; settings-driven injection keeps templates portable and configurable per deployment.
<!-- rule:51 -->
- Gate optional features behind a dedicated feature flag or env-var conditional, keeping all related settings inside the same guard — Reusing unrelated settings or scattering config outside the guard makes features impossible to disable cleanly and causes confusing partial-enable bugs.
<!-- rule:50 -->
- Fix the code or use a scoped suppression (e.g., `# noqa`) instead of adding global flake8 ignores in `setup.cfg`; delete global ignores once the offending code is gone — Global suppressions silently mask real issues across the entire codebase and linger as dead config after the code that needed them is removed.
<!-- rule:89 -->
- On Wagtail Page models (e.g., `PersonPage`), include all user-searchable fields in `search_fields` (e.g., `introduction`, not just `body`), and wrap relations like `origin`/`Country` in `index.RelatedFields` — Indexing only `body` or a relation's ID makes search miss content users expect to find — `index.RelatedFields` indexes the related model's searchable fields (e.g., country name) so search matches them.
<!-- rule:27 -->
- Define each setting exactly once in `settings/base.py`; never re-define it in other settings modules — Duplicated definitions drift apart over time, so overrides in `dev.py`/`production.py` silently diverge from the canonical value and it becomes unclear which definition actually takes effect.
<!-- rule:34 -->
- In demo settings (`bakerydemo/settings/base.py`) and reset commands (`reset_demo.py`), never leave `changeme` or other intentional-looking admin passwords — use a self-descriptive placeholder like `demo` or a dedicated superuser, and keep dependent seed/fixture data in sync — Realistic-looking defaults get deployed unchanged and can be mistaken for actual credentials, while obvious placeholders signal the value is not a real secret and must be changed.
<!-- rule:80 -->
- Declare ordering only for concrete requirements: add `Meta.ordering` or Wagtail `SnippetViewSet.ordering` with just the fields needed for the default sort (no fallback fields), and keep manual sort on CMS-managed models configurable rather than hard-coded. — Unnecessary ordering declarations add sort overhead and silently override editorial/manual ordering, making CMS-managed content behave unexpectedly.

## Dependencies

<!-- rule:46 -->
- Use the smallest sufficient Docker base image (e.g. `python:3.12-slim`), pinned to the target Python version and kept in sync with packaging/CI config; if a heavier image like `python:<version>` is required, document the reason and size impact. Keep template Dockerfiles simple — avoid unnecessary layers or tooling. — Slim images reduce attack surface, pull time, and image bloat, while version pinning aligned with packaging/CI prevents 'works in Docker but not in CI' drift and hard-to-debug environment mismatches.
<!-- rule:25 -->
- Pin deps in requirements files as `{package}>=X.Y,<upper`: lower bound = minimum STABLE release supporting the APIs/imports the codebase uses, inclusive lower / exclusive upper — never use `>` lower bounds or release candidates. — `>X.Y,<=X.(Y+1)` excludes patch releases of the lower bound while admitting patches of the next minor — the opposite of the intended range — and release candidates aren't stable bases.
<!-- rule:70 -->
- Generate migrations in `*/migrations/` against pinned/stable dependency versions, not dev or pre-release builds, and verify every `dependencies` entry references migration names that exist in those versions. — Migrations generated from dev/master/pre-release builds can reference migrations that don't exist in released versions, breaking installs and upgrades for anyone on stable dependencies.
<!-- rule:81 -->
- Remove temporary workarounds (e.g., CLI flags in the `Makefile`, pins in `requirements/`) once the upstream fix lands in the version you use; when adding one, link the upstream issue/PR that will obsolete it — Stale workarounds silently accumulate into fragile config, and an upstream reference tells future maintainers exactly when it's safe to delete them.

## Naming

<!-- rule:0 -->
- Use sentence-case `verbose_name`/`verbose_name_plural` and let Django's `capfirst()` handle display capitalization; set explicit labels for acronyms (`url` → "URL"). Make labels self-explanatory: define domain acronyms, override ambiguous `verbose_name`s, omit labels that restate the field name, use `Meta.label_format` with `{field_name}` for multi-field `StructBlock`s, give `ChoiceBlock` choices human-readable labels distinct from stored values, and write `ForeignKey` or "foreign key" — never `foreignKey`. — Sentence-case labels let `capfirst()` adapt capitalization per context so the same metadata renders correctly everywhere; self-explanatory labels keep admin forms usable without code knowledge, and correct framework terminology avoids confusion in reviews and docs.
<!-- rule:87 -->
- Name retrieval methods `get_<noun>` after the returned entity (e.g., `get_posts()`, not `blogs()`); use regular methods, not `@property` — The name tells callers exactly what's returned, and a `get_` method (unlike `@property`) signals that computation/fetching happens — keeps model APIs consistent across `bakerydemo/blog/models.py` and `bakerydemo/breads/models.py`.

## API Design

<!-- rule:32 -->
- Model repeated/featured sections as query-returning properties or `Orderable` child models with `ForeignKey` to `wagtailcore.Page` + inline panel — never hard-coded numbered fields (`featured_section_1..N`) or duplicated template blocks; iterate in one loop, cap with `slice:"6"`, but show full relations (e.g. authors) uncapped and fix clutter in CSS. — Numbered scalar fields need a migration for every added/removed section and duplicated markup drifts out of sync, while dynamic queries stay current and `slice` degrades gracefully when fewer items exist.
<!-- rule:43 -->
- Give each interactive control one accessible name: action-oriented `aria-label` for icon-only controls, no extra `<label>` if `aria-label`/`aria-labelledby` exists, and keep visible labels stable — expose state via `aria-pressed` instead — Duplicate or conflicting labels make screen readers announce controls inconsistently, and renaming visible text on state change disorients users — ARIA state attributes convey changes without breaking the stable name.

## General

<!-- rule:69 -->
- Keep at least one usage of each specialized wrapper block and its underlying chooser block (e.g. `ImageChooserBlock`) in the demo block set; define reusable content blocks in `BaseStreamBlock` instead of one-off standalone `StreamBlock`s. — Dropping the last usage of a wrapper or chooser block silently removes demo/test coverage for base Wagtail blocks, and registering blocks in `BaseStreamBlock` lets them be composed at arbitrary points in any stream across `base/blocks.py` and `recipes/blocks.py`.
<!-- rule:83 -->
- When renaming a Wagtail block (e.g. `CaptionedImageBlock` in `bakerydemo/base/blocks.py`), rename its template to the snake_case of the new class name, update all imports/references, and use the built-in block where no custom behavior is needed. — Block class, template file, and usages must change together — stale template paths break page rendering, and using the custom block where the generic one suffices adds needless coupling.

## File-Specific Rules

### `.pre-commit-config.yaml`

<!-- rule:75 -->
- In `.pre-commit-config.yaml`, scope hook `files`/`types_or` filters and enabled hooks to languages the project actually uses — don't copy SCSS/TypeScript/ESLint configs from other projects — Hooks and filters for absent languages cause false failures, confuse contributors, and slow runs on irrelevant file types.
<!-- rule:76 -->
- In `.pre-commit-config.yaml`, use `additional_dependencies` only for plugins the hook's `rev` doesn't already pin — never to duplicate pins or mirror `package.json` versions. — Duplicated pins drift out of sync over time, causing version conflicts between the isolated hook environment and the versions `package.json` actually enforces.

### `Dockerfile`

<!-- rule:58 -->
- In `Dockerfile`, skip virtualenvs unless needed — the container already isolates; if used, invoke executables via `PATH` (e.g. `uwsgi`) and install with `pythonX.Y -m pip`, never bare `pip` or absolute paths — Bare `pip` or absolute paths can target the wrong interpreter, silently installing packages where the app can't find them; redundant virtualenvs add indirection without extra isolation.

### `README.md`

<!-- rule:18 -->
- In `readme.md` setup docs, scope each section to one concrete supported environment/tool and document only the primary setup method; fold conditional steps for user subsets into the relevant section, and link to upstream guides instead of duplicating their basic install steps — Keeps setup instructions unambiguous and prevents duplicated upstream steps from drifting out of date, so new users don't hit contradictory guidance.

<!-- /braindump -->