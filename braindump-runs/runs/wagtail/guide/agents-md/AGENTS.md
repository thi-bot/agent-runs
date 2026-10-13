<!-- braindump: rules extracted from PR review patterns -->

# Coding Guidelines

Also see directory-specific guidelines:

- [apps/frontend/static_src/scss/AGENTS.md](apps/frontend/static_src/scss/AGENTS.md)

## Code Style

<!-- rule:28 -->
- End every text/config file (`*.py`, templates, `.gitignore`, `*.scss`) with a single trailing newline — avoids noisy POSIX-violation diffs when tools touch the last line — Files without a trailing newline trigger `\ No newline at end of file` markers in diffs and cause tools like `black`, `prettier`, and editors to rewrite the last line on every save, creating spurious changes across `apps/`, `content/`, and template directories.
<!-- rule:33 -->
- Delete dead, commented-out, and unused code instead of keeping it "just in case" — version control already preserves anything worth recovering. — Retained dead code makes the codebase harder to navigate, hides what's actually live, and drifts silently out of sync with real usage. Examples to remove: empty `admin.py` boilerplate in `content/admin.py`, test fixtures in `home/fixtures` not referenced by any test in `guide/tests`, style-less or unused SCSS selectors in `apps/frontend`, and class names in templates with no matching style or script. Attach style rules only where styling is actually applied.
<!-- rule:22 -->
- Apply a11y semantics to all non-text visuals in `apps/*/templates`: decorative SVG → `aria-hidden="true"` once; decorative `<img>` → `alt=""` with explicit dims; icon-only links/buttons → descriptive `aria-label`; text-bearing buttons → no `aria-label` — keeps screen-reader output accurate without duplicate or missing labels — This applies across every template in `apps/*/templates` (e.g. `apps/core/templates`, `apps/search/templates`) rather than any specific app. Screen readers silently skip `aria-hidden` decoratives and announce `alt`/`aria-label` text, so mismatches cause noisy or confusing announcements: duplicate `aria-hidden` degrades linting, missing labels render icon buttons unusable for non-visual users, and redundant `aria-label` on text buttons overrides the visible label.
<!-- rule:35 -->
- Render StreamField blocks with `{% include_block field %}` (or `render_block`) instead of looping with `{% for %}` or filtering `block.value` manually — `include_block` preserves each block's `template` and context, which manual iteration silently drops. — Manual iteration bypasses each block's own template selection and context, so blocks render without their designated markup and break as soon as a block type is added or restyled.
<!-- rule:4 -->
- Set explicit `type` on every `<button>` (`type="button"` for non-submit actions, `type="submit"` for form submission) — HTML defaults to `submit`, so untyped buttons inside forms silently trigger submission and reload the page — The default `type` is `submit`, so a `<button>` used for non-submit actions inside a `<form>` will unintentionally submit and reload the page — an easy bug to introduce and hard to spot.
<!-- rule:52 -->
- Give every app's `templatetags` module its own `register = template.Library()`; never import `register` from `django.template.defaultfilters` — a shared register lets one app's tags shadow or clobber another's. — Preserves the per-app `templatetags` convention (e.g., `apps/core/templatetags/core_tags.py`) so tag libraries stay isolated; simple component names keep templates readable; single loads keep template dependencies explicit.
  - Name inclusion tags after the rendered component (`footer`, `navigation`), not as accessors (`get_*_content`) — templates should read as markup to whoever opens them, not as function calls.
  - Check for an existing `{% load %}` before adding another to a template — duplicates add no behavior and hide which libraries a template actually depends on.
<!-- rule:73 -->
- Prefer server-rendered search/data flows: submit a `<form>` to the existing search URL or render via `views`/`templates`, not ad-hoc client-side `fetch`/DOM injection — keeps routing, filters, and deep-linkable URLs in one source of truth and works without JS. — Server-rendered flows keep the search URL, query parsing, and template output authoritative; ad-hoc client-side live-search duplicates that logic, breaks no-JS clients and deep links, and silently diverges from the server route over time.
  Add client-side search behavior only when the change explicitly intends it, and comment why it stays client-side — ad-hoc `fetch`/DOM code drifts from the server route/template contract.
<!-- rule:48 -->
- Wrap only user-facing strings in `{% trans %}` / `_()` (UI labels, displayed text) — translating internal strings like non-displayed model `verbose_name`s bloats `.po` catalogs with entries translators never see — Scattered, unused translations slow down `makemessages` and confuse translators, since only UI strings are actually rendered.
<!-- rule:45 -->
- Evaluate each QuerySet once per function and reuse the result — use `.exists()` for existence checks instead of `if qs:`, and assign `.first()`/`.last()` to a local variable used by both the condition and return. — Bare truthiness fetches all rows, and calling `.first()`/`.last()` for both the condition and the return doubles the query — cache the result in a local variable.
  Bare truthiness in a boolean context (or re-iterating a QuerySet) fetches all rows, and calling `.first()`/`.last()` separately for the check and the return doubles the DB hit — caching the result avoids duplicate queries and races between the check and use.
<!-- rule:25 -->
- Prefer `{% if variable %}` over `!= None` and `is` over `==` in Django templates — matches Python semantics; `!= None` lets falsy values like `0` and `''` slip through as "present" — 
<!-- rule:12 -->
- Reference source `.svg` assets (or the asset pipeline) from `static_src/scss` components instead of embedding base64 data-URI icons — base64 blobs are uneditable, unsearchable, and produce opaque diffs. — These conventions keep icons as editable, diffable source rather than opaque base64 blobs buried in SCSS, ensure `templates/svg/` files are recognized by editors and build steps via their `.svg` extension, and prevent un-optimized exports from bloating the repo.
  - Store SVG template assets under `templates/svg/` with an `.svg` extension matching their content — extensions drive tooling, syntax highlighting, and build pipelines.
  - Optimize SVGs (e.g., SVGOMG) before committing — strips editor cruft and keeps asset size down.
<!-- rule:39 -->
- Flatten helpers and template filters (e.g. `apps/core/templatetags/core_tags.py`) with guard clauses and early returns — nested `if`/`else` chains obscure what each branch actually returns. — Flat, purposeful control flow in helpers and template tags makes each branch's outcome obvious at a glance, and removing guards with equivalent branches prevents dead code from diverging from the value it's supposed to compute.
  - Drop conditional guards whose branches produce the same downstream result; return the value directly — equivalent branches silently drift apart and hide bugs when one is edited.
<!-- rule:83 -->
- In Wagtail richtext, render `<code>` in output and style the `code` element in `scss/richtext_features/` — semantic HTML keeps markup accessible and lets styles apply without custom classes. — Using `<span>` with custom classes for code blocks in Wagtail richtext output breaks semantic accessibility and forces every richtext consumer to know project-specific class names. Semantic elements like `<code>` are portable, screen-reader friendly, and let `scss/richtext_features/` target the element directly.
<!-- rule:84 -->
- Combine `@font-face` rules into one when all `unicode-range` subsets load the same font file; use `unicode-range` only when each subset points to a different file — duplicate rules repeat the same `src` and add nothing. — Splitting a single font file across multiple `@font-face` blocks with `unicode-range` only differs in which subset triggers the load, but every block re-declares the same `src`, `font-family`, and weight/style. That duplication is easy to get out of sync and misleads readers into thinking distinct files are served. Reserving `unicode-range` for genuinely separate per-subset files keeps each declaration meaningful.
<!-- rule:11 -->
- Single-source related CSS/SCSS dimensions (e.g., `flex-basis`, `min-width`, `max-width` sharing a ratio) via variables or `calc()` — duplicated literals drift out of sync when one is tuned — Keeps CSS/SCSS sizing intentional across `apps/frontend` styles and `apps/core` template components: shared ratios stay in sync when one value changes, and flex children render at the design's specified proportions instead of collapsing to equal widths.
  - Set explicit `flex`/`width`/`flex-basis` per flex child to match design proportions — siblings otherwise default to equal widths, breaking the intended layout
<!-- rule:62 -->
- Debounce or throttle network requests in high-frequency event listeners (`keyup`, scroll, resize) — A bare `setTimeout` delay still schedules one request per event, flooding the backend; a real debounce/throttle utility cancels or rate-limits pending invocations.
<!-- rule:76 -->
- Hook JS behavior to `data-*` attributes (`document.querySelector('[data-...]')` / `querySelectorAll`), not IDs — IDs are unique and often claimed by anchors/styles, so `getElementById` hooks break when IDs change and can't be reused across multiple elements. — Per Wagtail HTML guidelines, `data-*` attributes decouple JS behavior from CSS/anchoring concerns. Binding to IDs via `getElementById` ties behavior to a single element, conflicts with anchor targets, and silently breaks when the ID is renamed for styling reasons; `[data-...]` selectors stay stable and let one behavior apply to many elements.
<!-- rule:68 -->
- Anchor locale/prefix replacements with `/{segment}/` or `str.replace(..., count=1)` — prevents clobbering slugs elsewhere in the path — Replacing a bare locale or prefix string with `str.replace` also rewrites any later match inside slugs or other path components, silently corrupting URLs — anchoring with path delimiters or limiting to one replacement keeps edits scoped to the intended segment.
<!-- rule:89 -->
- In Python files, enforce import formatting with automated tools such as Black and isort: keep the import block separate from subsequent module-level code with two blank lines. — Separating imports from the rest of the module with a blank line keeps the import block visually distinct from module code, which helps readers quickly locate dependencies and prevents formatter/tooling drift across the codebase.
<!-- rule:40 -->
- Derive header strapline/title from page metadata (e.g. homepage `page.title`) instead of a hardcoded `{% trans %}` string in shared templates like `apps/core/templates/components/header.html` — keeps copy in sync with CMS content and avoids stale translation entries — Hardcoded translated strings in shared header templates drift from the actual page title managed in the CMS, producing duplicated i18n entries and mismatched copy. Reading from page metadata keeps a single source of truth.

## API Design

<!-- rule:36 -->
- Render page copy from editable page-model/StreamField fields (`{{ self.<field> }}`), not hardcoded or PO strings — Editors can only change page-specific copy through fields on the page model or its StreamField blocks — hardcoding it in templates (e.g. `apps/home/templates`, `apps/core/templates`) or routing it through `{% blocktrans %}`/PO files puts content behind a developer deploy. Reserve `{% trans %}` for shared chrome like buttons, labels, and controls.
<!-- rule:69 -->
- Use `get_language()` from `django.utils.translation` for the active language — reflects `LocaleMiddleware` state, not the request header — Django's `LocaleMiddleware` and resolver/locale ordering can be sensitive to when activation happens relative to rendering; making it explicit and testing side effects catches locale bugs that status-code-only tests silently miss.
  - Activate the locale before rendering (resolve resolver/locale ordering explicitly) — relying on incidental `get_response()` timing breaks translations
  - Test `LocaleMiddleware` via `get_language()` or localized rendered content, not just response status — status-only tests miss translation regressions
<!-- rule:16 -->
- Localization UI must reflect the actual translation state: language selectors should list only locales that have real translations (not every locale the i18n framework supports), and translatable HTML templates must set `<html lang>` to the active language instead of hardcoding it. — Listing every framework-supported locale offers users languages that render as untranslated English, and a hardcoded `<html lang>` misinforms screen readers and search engines about the page language. Both erode trust in the localization layer that `apps/core/templates/components/language_selector.html` and `apps/core/templates/500.html` depend on.
<!-- rule:55 -->
- In middleware `__call__`, read `request.resolver_match` only after `self.get_response(request)` — it's populated during URL resolution inside `get_response()` and is `None` beforehand, so accessing it first silently yields nothing; for earlier access use `process_view` or call `resolve(request.path_info)` explicitly. — 
<!-- rule:66 -->
- Build URL query params with `URLSearchParams` in `apps/frontend/static_src/js` — concatenating raw values leaves `&`, `=`, `#`, and spaces unencoded, so user input breaks the URL or injects extra params — Concatenating user input into a query string without encoding mangles URLs whenever the input contains `&`, `=`, `#`, spaces, or non-ASCII characters, and lets a crafted value smuggle in additional parameters. `URLSearchParams` percent-encodes values consistently and keeps the URL structure intact.
<!-- rule:51 -->
- Make translatable Wagtail models inherit `TranslatableMixin` — it wires up `locale`/`translation_key` and the translation API for snippets, clusterable snippets, and their `Orderable` children. — Without the mixin, `wagtail-localize`/admin translation workflows silently skip the model.
<!-- rule:77 -->
- In `apps/frontend/static_src/js`, build root-level API URLs from `window.location.origin` instead of relative paths — pages served under locale/version prefixes (e.g. `/en/2.0/`) resolve relative URLs against that prefix and hit the wrong endpoint. — Pages under `apps/frontend/static_src/js` are served from locale/version path prefixes. Relative API paths and client-side string surgery on backend URLs both assume a known prefix shape, so they break when the prefix changes or a new locale/version is added.
  - Don't string-replace backend-provided URLs to strip locale/version prefixes; have the backend return final usable URLs or normalize paths server-side — client-side prefix patching silently breaks whenever prefix formats change.
<!-- rule:34 -->
- In Wagtail blocks, derive rendering context in `get_context()` via `super().get_context(value, parent_context)`; implement value-dependent accessors on a `StructValue` subclass, not as `self.{field}` on the `StructBlock`. — `StructBlock` instances aren't bound to a value during rendering, so `self.{field}` lookups can't reach rendered child values — `StructValue` is where those live. Keeping derived values in `get_context()` also gives a single, predictable place to shape block template context.

## Config

<!-- rule:47 -->
- For admin models use `__str__` + `Meta.verbose_name`/`verbose_name_plural`, not `ModelAdmin.menu_label` — `menu_label` only labels the Wagtail sidebar, so names set there drift from what FKs, admin listings, forms, and logs display. — `__str__` and `Meta.verbose_name`/`verbose_name_plural` are read everywhere (foreign-key dropdowns, admin listings, form labels, shell/log output), while `ModelAdmin.menu_label` affects only the Wagtail sidebar. Setting labels on the model keeps every surface consistent; relying on `menu_label` makes the display name diverge across contexts.
<!-- rule:63 -->
- Prefer framework defaults: set model/class-level defaults (e.g. `show_in_menus_default = True`) and omit attributes that already match Django/Wagtail defaults — Cuts redundant config in models and `ModelAdmin` subclasses so intent is visible and framework upgrades propagate automatically — explicit overrides silently pin stale values and obscure the real per-instance exceptions
<!-- rule:88 -->
- Put shared settings in `settings/base.py`; override env-specific values in `settings/{environment}.py` (`dev.py`, `test.py`, `production.py`) instead of editing `base.py` — keeps base canonical so one env's tweak doesn't silently change the others. Comment any non-obvious override. — Environment files exist to diverge from `base.py`; editing or removing a shared setting there changes every environment at once and hides the difference. Explicit overrides with a comment make each environment's deviations discoverable.
<!-- rule:31 -->
- Centralize all translations in a single repo-level locale dir via `LOCALE_PATHS` (e.g., `BASE_DIR / 'locale'`), one `.po` per language. — Per-app/per-module `locale/` dirs fragment catalogs and cause missed or conflicting lookups; a single tree keeps msgids deduped and `makemessages`/`compilemessages` scoped to one path.
<!-- rule:87 -->
- Default S3 objects to `AWS_DEFAULT_ACL = 'private'` and grant public access via bucket policies, not per-object ACLs — required when using `wagtail_storages`, since per-object ACLs leak private documents when any uploader forgets to set one. — Bucket policies are enforced centrally by S3 and can't be bypassed by an individual upload call; per-object ACLs are opt-in per write, so any code path that forgets to set `'private'` silently exposes documents. Wagtail's storage backend (via `wagtail_storages`) relies on this default to keep uploaded documents non-public.
<!-- rule:43 -->
- Keep `docker-compose.yml` free of duplicated config: define invariant startup commands in the Dockerfile `CMD` (not Compose `command:`), and source env vars from `.env`/`env_file` or dummy local values instead of mirroring real ones in `environment:`. — Duplicating Dockerfile `CMD` in Compose `command:` makes the Compose file drift out of sync with the image it runs, and copying real env values into `environment:` risks leaking secrets and forcing edits in two places. Sourcing from `.env`/`env_file` keeps one source of truth; dummy local values keep the Compose file safe to commit.
<!-- rule:79 -->
- Keep config-setting comments accurate and adjacent to their setting — stale or platform-specific references mislead readers who change `apps/guide/settings` or `guide/settings` values. — A comment detached from its setting, or describing an old platform, causes developers to misread what a config value actually does and change it incorrectly.

## Documentation

<!-- rule:6 -->
- Link external programs, orgs, and frameworks to canonical sources, and every internal link to this project's own current destination — copy-pasted boilerplate (e.g., `bakerydemo` contributing links in `README.md`) ships broken cross-project URLs to users. — README and docs are often cloned from sibling projects, leaving stale links to the source project's contributing guide, GSoC page, or docs. Rewriting each to the current project's equivalent keeps navigation correct and avoids sending readers to another project's resources.
<!-- rule:54 -->
- Capitalize proper names in prose (`Python`, `Django`, `Wagtail`) — matches upstream branding and reads as professional docs — Lowercase forms like `python` or `django` look like sloppy CLI commands rather than product names, undermining trust in READMEs, docs pages, and docstrings.
<!-- rule:5 -->
- Proofread user-facing Markdown (e.g. `README.md`) and run `make format` before committing or merging — keeps docs typo-free and formatter-clean. — Docs are read by users before the code; typos or unformatted Markdown erode trust and cause churn in later diffs. Running `make format` before commit keeps the repo's Markdown consistent with the project formatter and avoids reformat-only follow-up commits.
<!-- rule:59 -->
- Use conventional README/docs headings (`Table of Contents`) and standard taxonomy labels as explicit noun phrases (`How-to articles`, `Reference materials`) — bare terms like `How-to` or `Reference` read ambiguously to readers scanning the docs. — Conventional headings and the Tutorials/How-to/Explanation/Reference taxonomy plus noun-phrase labels keep section intent unambiguous and consistent across the root `README.md` and other docs, so readers can scan for the content they need.
<!-- rule:38 -->
- Conditionally render optional SEO/social meta tags in Wagtail base templates (`apps/core/templates/base.html`) only when the page field (e.g., `search_description`) is set **and** the site supports the integration — omit the tag entirely instead of emitting a fallback value or unsupported markup. — Fallback or unsupported meta tags leak empty/placeholder values into search results and social previews, and reference integrations the site doesn't actually have.
<!-- rule:0 -->
- Indent fenced code blocks under list items to match the item's content indent — extra spaces break list nesting and code rendering — Markdown renderers treat over-indented fences as a new block, breaking the list structure and sometimes the code block itself. Misaligned indentation causes inconsistent rendering across viewers (GitHub, IDE previews, static site generators).

## Dependencies

<!-- rule:64 -->
- Pin deps with bounded ranges in `requirements/base.txt` (e.g. `pkg>=X,<Y`); mirror the upstream stack framework's constraint (e.g. Wagtail's) and cite its source — unbounded or drifted specifiers cause silent breakage on upstream releases and make README/config listings untrustworthy. — Unbounded or hand-edited pins let an upstream release (e.g. a new Wagtail minor) slip in untested; citing the source constraint keeps the range auditable. Syncing README dependency tables with `pyproject.toml`, `setup.cfg`, and CI matrices prevents users and CI from disagreeing on what's actually supported.
<!-- rule:29 -->
- Trim migration `dependencies` to only those strictly required for execution; delete gratuitous cross-app deps that autogenerated migrations add — extra deps cause `models` resolution errors and needless coupling. — Django resolves all declared dependencies before running a migration, so an unneeded cross-app reference can force apps to load in wrong orders (raising `AppRegistryNotReady`/model resolution errors) and entangles apps that have no real relationship. Removing them keeps `apps/*/migrations` independent and avoids breakage when code is refactored or apps are split out.
<!-- rule:46 -->
- Keep initial content creation out of schema migrations — use a separate `migrations.RunPython` data migration — Schema migrations should only alter structure; mixing in content creation makes rollbacks unsafe, breaks `--fake`/re-apply scenarios, and forces data refactors to be entangled with schema history.
<!-- rule:82 -->
- Manage third-party JS deps via `npm` and import as modules — vendored or checked-in minified builds go stale and skip audit/update tooling — Sourced from a global frontend dependency-management convention (applied in `apps/frontend`, intended repo-wide for JS).
  - When a single utility is needed, use its dedicated package (e.g. `lodash.debounce`) — avoids importing a whole library or maintaining a hand-rolled subset that drifts from upstream
<!-- rule:78 -->
- Pin official actions to their latest stable major tag in `.github/workflows/*.yml` (e.g., `actions/checkout@v4`, `actions/setup-python@v5`) — old majors stop receiving security patches and break when GitHub retires their Node runtime. — Older major versions of official actions (e.g., `actions/checkout@v3`, `actions/setup-python@v4`) no longer receive security fixes and are pinned to deprecated Node runtimes that GitHub eventually removes, causing workflow failures. Latest stable major tags keep CI secure and running without per-commit version churn.

## Naming

<!-- rule:17 -->
- Use Wagtail's canonical locale codes — lowercase, hyphenated (`is-is`, `id-id`) — in `locale/*`, `locale/pt_pt/LC_MESSAGES/django.po`, app code, and templates like `apps/core/templates/components/language_selector.html`, and drop the region when it duplicates the language (`pt`, not `pt-pt`) — deviating from Wagtail's bundled naming breaks locale fallback, and the language-only form still resolves to regional variants like `pt-br`. — Using the wrong format (e.g., `pt_pt` with underscore or `pt-pt` with a redundant region) causes Wagtail's locale lookup to miss bundled translations and skip fallback to regional variants such as `pt-br`. Keep codes lowercase and hyphenated (`is-is`, `id-id`), and drop duplicate-language regions (`pt` over `pt-pt`) so the language-only code still provides fallback to its regional children.
<!-- rule:75 -->
- Use `kebab-case` for HTML element IDs, `camelCase` for JavaScript variables — Separating ID names from variable names (IDs need not match variables) keeps HTML templates like `apps/core/templates/components/header.html` decoupled from scripts like `apps/frontend/static_src/js/main.js`, so either side can be renamed without breaking the other.
<!-- rule:65 -->
- Name `templatetags/` filters after the exact output they produce, not a broader concept — e.g. `hreflang_url` (not `canonical_url`) for a filter that emits alternate-language URLs — so template authors can trust filter names without reading the source. — Filter names are the primary discovery surface in templates; a name that describes the wrong concept (like `canonical_url` producing hreflang tags) invites misuse and hides bugs during template review.

## Testing

<!-- rule:27 -->
- Generate test fixtures with factories or helpers instead of committing static files under `fixtures/` — static fixtures drift from real data shapes and bloat the repo. — Factories keep fixture data in sync with the code that produces it and make per-test variations cheap, whereas large committed fixture files go stale silently and add noise to diffs and review.
<!-- rule:42 -->
- Use lazy evaluation in factories only for dynamic values: `@factory.lazy_attribute`, `factory.LazyFunction`, `SubFactory` for related objects; static fields should be plain class attributes — class-level expressions like `timezone.now()` or a shared factory instance evaluate once at import, so every generated instance would otherwise reuse the same stale value or object. — Declarative attributes and `SubFactory` are evaluated at factory definition time for static values, but `timezone.now()` and similar calls would freeze at import — producing identical timestamps and shared mutable objects across every generated instance.
  - Never class-assign already-evaluated expressions or a class-level factory instance in factory_boy factories — they are computed at definition/import time, not per-instance, so all factory output ends up sharing one value.

## General

<!-- rule:70 -->
- Surface user-triggered frontend failures via UI (`alert`, toast, or inline message) — silent returns and `console.log` hide errors from users — Errors in DOM event handlers and their async catch blocks are invisible to end users when only logged or swallowed; a visible UI mechanism ensures failures in `apps/frontend/static_src/js/main.js` and similar entry points reach the user instead of failing silently.
<!-- rule:53 -->
- Use absolute imports (`from apps.core.templatetags.core_tags import ...`) over relative imports — relative paths break when modules are moved or reorganized across `apps/` packages — Django app modules under `apps/` move between packages during refactors; relative imports silently resolve to the wrong module or raise `ImportError`, while absolute paths stay valid project-wide and are easier to grep.

## File-Specific Rules

### `Makefile`

<!-- rule:44 -->
- Define per-component targets (e.g., ``format-backend``, ``lint-frontend``) and compose aggregate targets (``format``, ``lint``) by invoking them — lets devs run one component in isolation and keeps the root ``Makefile`` free of conditional flags — Per-component targets let developers run just the backend or frontend formatter/linter directly for faster feedback, and composing aggregates from them avoids brittle ``if``/variable gating that grows harder to reason about as components are added.

### `README.md`

<!-- rule:8 -->
- In `README.md`, strip lead-ins like "by running", the project name, and "Setup with {Tool}" framing from setup steps and headings — readers scan for the action, not the prose — Concise, action-first phrasing lets readers scan setup instructions and section headings without parsing redundant context, and explicit `Or, ...` framing prevents ambiguity about whether a command is required or an alternative.
  - Prefix optional alternative commands in `README.md` with `Or, ...` — makes branching instructions unambiguous at a glance
<!-- rule:56 -->
- In `README.md` development/installation docs, document exactly one default setup path using runtime-bundled tools (`venv` for Python; omit `pip` where preinstalled). Put cloud/optional environments like Gitpod in a separate `evaluation`/`trial` section. — A single canonical path avoids decision paralysis and stale advice; listing `virtualenv`/`virtualenvwrapper` or equivalent alternatives as peers implies they are still required when modern Python ships `venv`.
<!-- rule:1 -->
- Document frontend scripts in the README setup section by workflow: `yarn start`/a file watcher for local dev, `yarn build` for production — describe what each enables, not just the compile step; readers who can't tell them apart run builds during dev or ship unminified bundles. — Frontend devs scan the README to pick a command; conflating the dev watcher (`yarn start`) with the production build (`yarn build`) sends them to the wrong mode, costing hot-reload or shipping unoptimized output.

### `apps/core/templates/500.html`

<!-- rule:30 -->
- Keep `apps/core/templates/500.html` logic-free: no `{% trans %}`, no template tags, hardcoded English text plus an inline comment explaining why. Its rendering path must not depend on context, i18n, or other runtime state that may already be broken. — The 500 handler runs when the app has already failed, so Django's rendering pipeline, the i18n machinery, and translation catalogs may be unavailable or themselves the cause of the error. A template that pulls in `{% trans %}` or translated strings can raise a second exception inside the error view, turning a clean 500 response into a blank page or a raw traceback that leaks internals.

### `apps/core/templates/components/header.html`

<!-- rule:67 -->
- **Spacing in header templates**: Use explicit spacing utilities around header elements and between adjacent controls. Match mirrored gaps (e.g., left/right) so controls don't crowd or touch — uneven spacing breaks visual alignment and makes interactive targets feel cramped. — Header controls that visually touch or have mismatched mirrored gaps look broken and hurt tap-target usability; explicit utilities keep gaps intentional rather than inherited from defaults.

### `apps/guide/settings/base.py`

<!-- rule:50 -->
- `django-csp` (production only): override docs—never `CSP_REPORT_ONLY` — docs/miscellaneous.md cites this rule, and `base.py` auto-derives
`CSP_REPORT_ONLY := DEBUG`—so in production reports are enforced, not
merely reported. Overriding it to report-only silently disables
enforcement while appearing configured.
  (`base.py` already sets `CSP_REPORT_ONLY := DEBUG`; in prod reports are
  enforced, not reported. Forcing report-only silently disables enforcement
  in production, so the site runs with no active CSP.)

### `pyproject.toml`

<!-- rule:9 -->
- Omit the `authors` field in `pyproject.toml` — the project website is the canonical attribution source, so metadata lives in one place and contributions aren't blocked on personal emails — Explains the reader's likely confusion: an AI assistant editing pyproject.toml might naturally add authors as part of packaging metadata (as most Python projects do). The rationale grounds the rule in real consequences: keeping contributor metadata in one canonical location (the project website) and not gatekeeping contributions behind personal email disclosure. This makes the rule feel principled rather than arbitrary, and gives the assistant enough context to decide what to do instead (credit contributors on the website).
  - The `[project]` table in `pyproject.toml` intentionally has no `authors` entry; add contributor credit on the project website instead
  - Don't add `authors` to `pyproject.toml` — attribution is centralized on the project website, not duplicated in packaging metadata

### `setup.cfg`

<!-- rule:81 -->
- In `setup.cfg` `[coverage:run] omit`, use slash-free globs like `*env*` and `*test*`, not `*/env/*` — matching dir names at any depth keeps coverage correct regardless of invocation path, and excluding both env and test dirs leaves only shipped code counted — Slash-containing patterns like `*/env/*` only match when the path is invoked from a specific depth, so coverage silently includes or omits the wrong files. Slash-free globs (`*env*`, `*test*`) match at any nesting level, keeping reports stable from any working directory. Excluding both environment and test directories ensures only shipped code is measured — otherwise vendored deps or test helpers skew coverage numbers.

<!-- /braindump -->