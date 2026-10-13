<!-- braindump: rules extracted from PR review patterns -->

# Coding Guidelines

Also see directory-specific guidelines:

- [wagtail_localize/AGENTS.md](wagtail_localize/AGENTS.md)

## Code Style

<!-- rule:11 -->
- Delete commented-out code and resolved `TODO`/`FIXME`s before merging — git history preserves removals, and stale comments mislead. Guard version-specific code with an explicit check (e.g., `if WAGTAIL_VERSION >= (4, 0, 0):`) instead of commenting it out. — Commenting out code was once the only way to keep brittle snippets around, but version control already preserves every removal. Leaving dead code and stale `TODO`/`FIXME` markers in source forces future readers to guess whether the notes are still load-bearing. When a block is only invalid under a particular dependency version (e.g., a Wagtail API that changed in 4.0), an explicit `if WAGTAIL_VERSION >= (4, 0, 0):` guard keeps both branches live and testable, so the codebase works across supported versions without silent bit-rot.
<!-- rule:4 -->
- Let `black` format long boolean/conditional expressions — don't hand-wrap them for readability. — `black` is the project's single source of truth for formatting, so manual re-wrapping of long boolean/conditional clauses drifts from what CI/`black --check` expects and creates noisy diffs across files like `wagtail_localize/segments/extract.py` and `wagtail_localize/wagtail_hooks.py`. Reviewer readability preferences are not a reason to diverge; the formatter's split-per-clause style is the canonical form.
  If a reviewer's layout suggestion conflicts with `black` output (e.g. in `wagtail_localize/segments/extract.py`), keep the `black`-compliant form and explain that `black` owns layout.
<!-- rule:67 -->
- Keep optional sub-app views, templates, and management commands inside that sub-app's package (e.g. `wagtail_localize/modeladmin/views.py`, `wagtail_localize/modeladmin/templates/...`, `wagtail_localize/translation/management/commands/`) — never in shared/core modules or top-level dirs like `wagtail_localize/management/commands/`. Optional features living in shared paths couple them into core, so a sub-app can't be dropped or extracted without breaking unrelated parts of the project. — Optional sub-apps are meant to be removable. If their views, templates, or management commands sit in core/top-level locations, removing the sub-app leaves dangling references and forces core to depend on optional code, breaking projects that don't use that feature.
<!-- rule:39 -->
- Run the project's pre-commit hooks locally (e.g. `pre-commit install && pre-commit run --all-files`) before submitting changes, including documentation-only edits, to catch lint and formatting issues before CI or review. — Running hooks locally surfaces lint and formatting failures before CI and review, so contributors don't waste a review cycle on fixable issues. Documentation-only edits still pass through the same hooks (e.g. trailing-whitespace, end-of-file-fixer), so skipping the local run for docs still breaks CI.
<!-- rule:3 -->
- Hoist repeated declarations out of `switch`/`if-else` branches before the branching logic — prevents drift when only one branch is updated — Duplicate declarations across branches silently diverge; consolidating them before the branch keeps a single source of truth.
<!-- rule:32 -->
- Pick dict access matching intent — `.values()` when the key is unused, `list(mapping.items())` when returning pairs — avoids dead variables and wasteful rebuilding — Using `.items()` with an ignored key or a comprehension that rebuilds pairs signals the wrong intent and adds needless work; idiomatic call sites stay readable repo-wide.
<!-- rule:41 -->
- Read optional dict entries with `dict.get(key, default)` instead of `if key in d` + fallback — keeps the default in one place and avoids a duplicate lookup — The presence-check-then-fallback pattern repeats the lookup and scatters the default across two branches; the built-in forms put the default at the call site and match how `wagtail_localize/` already reads optional options and attributes.
  - Read optional attributes with `getattr(obj, 'attr', default)` instead of `hasattr(obj, 'attr')` + conditional — matches existing precedent under `wagtail_localize/` and expresses the fallback once
<!-- rule:5 -->
- Consolidate overlapping conditional branches — duplicated conditions drift apart and hide bugs — When a new check repeats a condition already present in the same scope, merge it into the existing branch instead of adding a parallel one; express mutually exclusive adjacent paths as `if`/`else` rather than sequential `if`s; and fold `elif` branches that share a type check into a single `elif` with a nested secondary condition. Duplicated conditions silently diverge when one copy is later edited, so a change meant for both paths only lands in one.
<!-- rule:109 -->
- In nested SCSS, ensure every `&--modifier` block is closed before the next sibling `&--modifier` block begins; when reformatting or removing blank lines, verify brace balance so that adjacent modifiers remain siblings and do not become nested (which would compile to incorrect chained class names like `.icon--green--red` instead of `.icon--red`). — Prevents accidental chained class names like `.icon--green--red` in compiled CSS when nested `&--modifier` blocks lose brace balance during reformatting; adjacent modifiers must stay siblings, not nested.
<!-- rule:13 -->
- Avoid ES6+ browser APIs like `NodeList.prototype.forEach` in Wagtail frontend/admin JS — IE11 lacks them; use a `for` loop over `querySelectorAll` results or add a polyfill. Keeps admin UI working for IE11 users. — IE11 is still a supported target for Wagtail admin UI, so ES6+ APIs such as `NodeList.prototype.forEach` throw at runtime and break interactive admin components; fall back to a `for` loop or ship a polyfill.
<!-- rule:74 -->
- Use imperative present tense in inline comments describing code actions (`Remove ...`, not `Removed ...`) — reads as the code's ongoing action, keeping comments accurate as code evolves — Comments describe what the code does now, not what someone once did; past tense implies a historical change and goes stale when the code is later modified.
<!-- rule:110 -->
- Use `zip(..., strict=True)` (ruff `B905`); fix mock data lengths rather than relaxing the check — mismatched iterables hide real bugs and silencing `B905` leaves the length mismatch in place. — The repo's ruff config enforces `B905`, and `strict=True` surfaces length mismatches between zipped iterables that would otherwise be silently truncated — a common source of subtle data bugs. When mocked responses in tests fail under strict mode, the mock, not the check, is wrong: shortening or padding mock iterables to match keeps the safety guarantee while fixing the actual inconsistency.
<!-- rule:56 -->
- Use named `%(name)s` placeholders with a dict mapping in translatable strings, not positional `%s` — matches Wagtail core convention and keeps translated strings reorderable across languages without breaking interpolation — Positional placeholders force translators to preserve argument order verbatim; named placeholders let them reorder words safely and stay consistent with the convention used throughout Wagtail core and `wagtail_localize`.
<!-- rule:35 -->
- Sync all translatable fields in `wagtail_localize/segments/ingest.py` via the shared predicate in `wagtail_localize/fields.py` before processing segments — keeps one source of truth for field classification. — The rule pairs segment ingestion with the shared transltable-field predicate.  If a field needed by ingest is excluded, updating the predicate in `fields.py` centrally is the correct change; patching at the call site duplicates classification logic and lets the two definitions drift, causing fields to be selectively dropped or missed during segment ingestion.
  - Broaden the predicate in `wagtail_localize/fields.py` when it excludes a field you need — never special-case field types at call sites; divergent logic silently drops or misroutes fields from ingestion.
<!-- rule:66 -->
- Extract deeply nested conditionals (e.g. multi-way URL resolution) into named helper functions, and extract analogous sibling logic the same way — inline branches obscure intent and drift apart when copy-pasted. — Complex branching left inline is hard to read and gets duplicated across sibling code paths; pulling it into a helper keeps the logic in one place and makes the sibling versions stay consistent.
<!-- rule:1 -->
- Prefer `Form(request.POST or None)` in views; use `if request.method == 'POST'` when empty POST must still validate — `request.POST or None` leaves the form unbound on empty POST — The shorthand avoids an extra branch and falls through cleanly for GET (as in `wagtail_localize/views/submit_translations.py`), but an empty QueryDict is falsy, so required-field errors (e.g. selecting no locales) would never surface.

## Documentation

<!-- rule:15 -->
- Proofread comments and `docs/**/*.md` (incl. tutorials) before committing — fix typos, stray leading characters, misspellings, and unfinished fragments. Users copy tutorial prose verbatim, so errors propagate into their code. — Users copy tutorial prose verbatim, so errors in example prose/comments propagate directly into their code.
<!-- rule:30 -->
- Match doc/help wording to actual behavior — describe what a setting does ("configure the default X") rather than overstate ("disabling X") when the feature remains available — Mismatched wording makes users think capabilities are gone or behave differently than they do, causing support churn and misuse. Prefer plain descriptive phrases ("models that support drafts") over ad-hoc compounds like "draft-able models", which read as jargon and age poorly.
<!-- rule:68 -->
- Use official casing for proper nouns in docs and changelogs (`Google Cloud`, `Wagtail`, `Python`, `JavaScript`), keeping lowercase only for code identifiers, import paths, package names, and repo slugs — mismatched casing makes docs look unpolished and breaks case-sensitive grep/search for a product name. Match the casing already used elsewhere in the same file. — Vendor brand casing is what users search for and what other files in the repo already use; diverging creates inconsistency across docs.
<!-- rule:26 -->
- Keep published support metadata in sync with the real support matrix — stale classifiers and version lists make users install unsupported versions and mislead packagers. — Each piece of published metadata (classifiers, pins, README, CHANGELOG) is independently consumed by users, packagers, and CI; silent drift means people build against versions the project no longer tests or supports, and undocumented pins get removed or copied without their compatibility context.
    - Drop `setup.py` classifiers for versions the project no longer supports.
    - Pin a dependency only with a comment/link to upstream compatibility docs — otherwise nobody can tell a deliberate pin from an accident.
    - Match `README.md` supported-version lists to the CI build/test matrix and upstream EOL data (e.g., `endoflife.date`); list current versions only, not outgoing+incoming or accumulated history.
    - When a PR drops support/testing for a version, record `- Drop {tool} testing for {dependency/version}` under `### Removed` in `CHANGELOG.md` — upgraders need to see it.
<!-- rule:75 -->
- Render notes/caveats/setup requirements as MkDocs admonitions (`!!! note`, `!!! attention`) with indented content — not bold/italic or plain paragraphs — and drop lead-ins like "Note that" inside them. — MkDocs Material styles admonitions distinctly from prose; ad-hoc bold notes and redundant lead-ins don't pick up that styling, so they read inconsistently across `docs/` and `docs/how-to/integrations/*.md`. The callout form is also what readers scan for when checking prerequisites.
<!-- rule:22 -->
- Write documentation code examples with real, copy-pasteable identifiers — no guessed names or `bakerydemo.*` paths — Readers copy examples verbatim; a fabricated import path or misspelled setting silently fails at runtime and erodes trust in the docs.
<!-- rule:23 -->
- Format code identifiers in docs as `` `inline code` ``, matching surrounding style — don't also bold them — Keeps `docs/` prose (e.g. `docs/how-to/field-configuration.md`) readable and consistent with existing convention; double-wrapping with `**` adds noise and diverges from how identifiers like module paths and setting names are rendered elsewhere in the same file.
<!-- rule:99 -->
- In `docs/how-to/integrations/*.md`, annotate example config values with inline comments — flag placeholders (endpoints, URLs, keys) as needing customization, note optional and self-hosted-specific behavior inline, and place the upstream API reference link next to the provider-specific option rather than as a separate link after the block. Readers copy configs verbatim, and inline notes keep them from shipping broken endpoints or missing self-hosted overrides. — Readers copy configs verbatim; inline annotations prevent shipping broken endpoints and missing self-hosted overrides, and links adjacent to the option avoid back-and-forth scanning after the block. This convention applies uniformly across every file in `docs/how-to/integrations/*.md`.
<!-- rule:73 -->
- Comment the *why* for non-obvious or destructive operations (esp. when a less-destructive alternative exists) — future maintainers need intent, not a restatement of the code — A plausible-but-rejected alternative looks like a bug to a reader who lacks the original context; documenting the intent prevents someone from "fixing" it into a regression.
<!-- rule:97 -->
- When a class or module wraps or integrates a third-party/external API (e.g., machine translator integrations in `wagtail_localize/machine_translators/`), include a link to that API's official documentation in the class or module docstring. — External APIs change without notice and contributors may never have worked with the wrapped service; docstring links let maintainers quickly check upstream behavior before modifying or debugging the integration.
<!-- rule:102 -->
- Show a setup+usage snippet in scenario-based how-tos (e.g., `docs/how-to/tips.md`) — grounds abstract scenarios in runnable code readers can adapt — Scenario-based how-to guides walk readers through a concrete situation; without a snippet showing the relevant setup and usage, readers can't map the prose to their own code and may misapply the guidance.

## Dependencies

<!-- rule:81 -->
- **Wagtail version compatibility policy** (`wagtail_localize/`, README support matrix) — This repo's support matrix spans Wagtail 2.15 through 4.2, so any unconditional use of a newer API silently breaks the oldest supported release at runtime. Conversely, removing compat shims that are still load-bearing for one of those versions causes the same breakage, and untagged shims are prime targets for well-meaning cleanups. Historical migrations are explicitly exempt because users upgrading from old Wagtail versions must be able to replay them. The rule is grouped under 'dependencies' because it governs the `pyproject.toml` version constraints and the README support matrix, which are the source of truth for what compat code must remain.
  - Gate newer Wagtail APIs behind version checks — unguarded calls break the oldest supported release (currently 2.15, 4.1, 4.2 per README)
  - Verify the actual minimum supported Wagtail version before removing a version-gated branch or raising a `pyproject.toml` constraint — removing a shim still needed by a supported version silently breaks those installs
  - Replace dead compat shims with direct API calls and run `updatemodulepaths` — leaves version-check noise around APIs the minimum version already provides
  - Keep required compat branches and tag them, e.g. `# needs to stay for Wagtail 4.1 compat` — untagged shims get re-removed by future cleanups
  - Never strip version-gated code from historical files under `wagtail_localize/migrations/` — released migrations must still run on older Wagtail during upgrades
  - Note the removed version in the commit message when dropping compat code — reviewers need the justification to confirm the support matrix actually allows it
  - When dropping a newer-only API/template attribute/icon, add a version-conditional fallback instead of unconditional use — older supported versions lack it and crash at runtime
  Suggested rephrasing of original rule:
  - "Support every Wagtail version listed in the README support matrix (currently 2.15, 4.1, 4.2) — unconditional use of newer-only APIs, template attributes, or icon names breaks the oldest supported release"
  - "Before deleting version-gated code or bumping the minimum Wagtail version, confirm the true minimum from the README/`pyproject.toml` — deleting a still-needed shim breaks installs on older supported versions"
  - "Replace shims for APIs the minimum supported Wagtail already offers with direct calls and run `updatemodulepaths` — dead compat branches obscure the real API surface"
  - "Keep compat code required by an older supported version and comment why, e.g. `# needs to stay for Wagtail 4.1 compat` — future cleanup passes otherwise remove it again"
  - "Do not remove version-gated code in released migrations (`wagtail_localize/migrations/`) — historical migrations must still apply when upgrading from older Wagtail versions"
<!-- rule:24 -->
- **Make dependency specifiers encode the range you actually test** in `setup.py` `install_requires`, `pyproject.toml` `dependencies`, and `tox.ini` `deps` — wrong bounds either block valid installs or advertise support that CI never exercises. — Dependency bounds are a compatibility contract: too-tight caps break installs against newer upstream releases and contradict other packages' ranges, while stale lower bounds imply support for versions CI no longer tests.
    - Set lower bounds to the true minimum supported version and bump them when support is dropped (e.g. `Django>=5.2`)
    - Omit upper bounds that nightly/compat CI already covers — prefer `Wagtail>=4.1` over `Wagtail>=4.1,<5.0`
    - Cap only when testing against an upstream main branch, and cap at the next release line (`vNext+1`)
    - Don't cap below what another dependency supports (Wagtail 6.2 supports Django 5.1) — the resolver fails on contradictory bounds
    - Use `~=X.Y` for test deps where you mean `>=X.Y,<X.Z`
<!-- rule:69 -->
- Gate every optional Wagtail/Django integration on `apps.is_installed("<app>")` — register views/URLs only when installed, import optional classes inline inside the guard, and build optional URLs via custom template tags instead of hardcoded `{% url %}`. Keeps the package importable and functional when optional apps aren't in `INSTALLED_APPS`. — Module-scope imports of optional classes or unconditional URL/view registration crash startup when the app is missing; guarding with `apps.is_installed` and inlining imports inside the branch keeps each integration truly optional.
<!-- rule:38 -->
- Keep lint/format deps only in `.pre-commit-config.yaml`, never `package.json` — add CI-only lint tooling to that same config so local hooks and CI share identical rules and versions, avoiding drift. — A single source of truth keeps local hooks and CI on identical tool versions and rules.
<!-- rule:52 -->
- Declare test/dev-only dependencies in the shared dev/test dependency file, not duplicated in `tox.ini` `deps` — avoids version drift between the two sources. — Factor-conditional `tox.ini` deps (`factor: package`) only install when that factor runs, so the factor must also appear in `envlist` and the CI build matrix; otherwise the dependency silently never installs in CI.
<!-- rule:27 -->
- Before adding model fields or migrations, check existing definitions for equivalents — prevents duplicate/conflicting fields — The project supports a range of Django (and other dependency) versions, so any API newer than the minimum breaks installs on older supported versions. Compatibility shims and kwargs constants (like `use_json_field=True`) exist only to bridge that gap; inlining them once all supported versions accept the modern API prevents the shims from becoming confusing, unmaintained cruft.
  - Only use APIs available in the project's minimum supported dependency versions (e.g. no Django 3.1+ APIs while Django 2.11 is supported) — keeps installs working across the supported matrix
  - Once all supported versions accept a modern kwarg (e.g. `use_json_field=True`), inline it and drop the compatibility shim/constant — removes dead version-check code

## Naming

<!-- rule:2 -->
- Name fields/vars after the exact model they reference (`snippet_revision`, not `page_revision`); mirror public-docs terms like `translatable_fields` — Confusable names like `SegmentOverride` vs `OverridableSegment`, or block-specific variants like `translatable_blocks`, invite bugs when the wrong concept is wired up. Reusing established domain terms keeps code searchable and consistent with the public API.
<!-- rule:54 -->
- Never unpack to bare `_` in modules importing `gettext`/`gettext_lazy` as `_` — shadowing the alias makes later `_("...")` calls crash. — The gettext alias `_` must stay callable for every translation lookup in the module; a local `_, x = ...` rebinds it to a plain value, so subsequent `_("text")` calls raise `TypeError` at runtime instead of returning a translated string. Applies repo-wide wherever `from django.utils.translation import gettext as _` (or `gettext_lazy`) is used.
  - Use a descriptive name like `_created`, or restructure to avoid the unused unpacked value.
<!-- rule:63 -->
- Name SVG icon files under `templates/{package}/icons/` after the icon's namespaced symbol `id` with the `icon-` prefix stripped (e.g., `wagtail-localize-convert.svg` for `icon-wagtail-localize-convert`), and register each one in `wagtail_hooks.py` — Wagtail strips `icon-` to resolve the template, so a mismatched filename silently renders nothing. — Wagtail resolves SVG symbol ids to template paths by stripping `icon-`, so any filename mismatch fails silently as a missing icon. Pairing the naming convention with registration in `wagtail_hooks.py` keeps the two coordinated.
<!-- rule:58 -->
- Prefix new Django settings with `WAGTAILLOCALIZE_` (no underscore between `WAGTAIL` and `LOCALIZE`), named for the behavior they control — keeps settings greppable and consistent with existing names in `wagtail_localize/operations.py` and `docs/how-to/installation.md` — Consistent prefixing makes settings discoverable across the codebase and docs, and concise behavior-based names avoid verbose duplication when new options are added.
<!-- rule:80 -->
- Name boolean context flags with `has_` prefix and merge flags for the same condition — avoids near-duplicate names like `uses_legacy_header` and `has_editor_css` that drift out of sync — Near-duplicate flags for the same condition (e.g., `uses_legacy_header` and `has_editor_css`, or `has_legacy_styling`) diverge over time and force templates to check multiple names, causing inconsistency; a single `has_`-prefixed flag keeps the condition authoritative and predictable.

## Testing

<!-- rule:93 -->
- Patch `transaction.on_commit` per-test, never in shared `setUp` — a global patch hides deferred side effects from unrelated tests — `TestCase` wraps each test in a transaction, so `on_commit` callbacks never fire and state like `live_revision` stays stale. Execute or capture callbacks explicitly before asserting, and keep the patch local so other tests still exercise real commit behavior.
<!-- rule:60 -->
- Scope fixtures, mocks, and helpers to the tests that use them — extra setup obscures what each test actually exercises — Test code stays readable and diffs stay small: unused fixtures hide intent, inconsistent helper APIs slow refactors, and needless rewrites of widely-used helpers add churn without behavior change.
  - Use one consistent request/helper API within a test class — mixed APIs make tests harder to read and refactor
  - Keep existing shared helpers that already have multiple call sites — replacing them churns many tests without changing behavior
<!-- rule:65 -->
- Keep test comments aligned with the method under test and its assertions — Comments describing unrelated methods (e.g. `__str__`) or contradicting the assertion mislead readers about test intent; update the comment or the implementation so they agree.
<!-- rule:106 -->
- Test conditionally rendered form fields in both states — when the optional integration or external config is unavailable (field absent) and available (field present). A one-state test misses regressions in the gating logic. — Gating logic that hides/shows fields based on optional integrations or external config can silently break in either direction — the field may appear when it shouldn't (breaking non-integrated setups) or vanish when it should. Covering both states catches regressions the single happy path misses.
<!-- rule:86 -->
- Call Django's `reverse()` directly in tests; don't add pass-through helpers (e.g. in `wagtail_localize/tests/utils.py`) — inline existing wrappers, including `reverse()` version-compat shims. — Thin wrappers add an indirection layer that hides which URL name is being resolved and defeats grep/search for `reverse(` call sites; modern Django's `reverse()` has a stable import path, so compat shims only obscure intent.

## Config

<!-- rule:50 -->
- In `tox.ini` and the CI matrix, use tox-recognized factor names (`py{3.10}`, `main`, `django4.2`) — non-standard forms break factor expansion. — Because `tox.ini` defines the `envlist` factors (and their `basepython` mappings) while the GitHub Actions workflow mirrors those same factors in its build matrix, the two files must resolve to identical environments. Raw dependency specifiers or concatenated factors in either place silently generate mismatched or unresolvable environments, and custom/dotted Python factors without an explicit `basepython` mapping fall back to the wrong interpreter — both fail only at CI time.
<!-- rule:47 -->
- Keep linter/formatter and `sdist` exclude lists minimal — only exclude paths that can hold relevant files — Over-broad excludes hide real issues from linters and silently drop legit files from source distributions. Use glob patterns like `**/tests` for repeated directory categories instead of enumerating each path, so the lists stay auditable and don't drift as the tree grows.
<!-- rule:10 -->
- Don't hardcode `/admin/` in frontend JS/TS — inject the admin base URL from Django via `{% url 'wagtailadmin_home' %}` (e.g. `window.adminUrl`) or pass it via props/backend, then prepend it when building admin links or API paths; hardcoding breaks deployments using a custom admin mount path. — Projects can mount the Wagtail admin at a non-default prefix; hardcoded `/admin/` (as SnippetChooser did) produces broken links and 404s under custom mounts. Sourcing the base URL from Django keeps frontend and backend in sync.
<!-- rule:107 -->
- Restrict provider options to the cross-locale supported subset — and document it. — Provider options (e.g. machine translation formality levels) accept different values per locale; restricting to the intersection in `wagtail_localize/machine_translators/` keeps a single config valid across all target locales, and documenting the subset in `docs/how-to/integrations/` tells users why some values are unavailable.
<!-- rule:57 -->
- Name settings that change default behavior `DEFAULT_<FEATURE>_MODE = 'mode-a' | 'mode-b'`, not `DISABLE_<FEATURE>` — a `DISABLE_*` flag misrepresents features that stay available when users can pick other modes. — In Wagtail Localize, a `DISABLE_*` boolean implies the capability is gone, but when the feature is still available and only its default differs, users and AI assistants reading the settings API will draw the wrong conclusion. A `DEFAULT_<FEATURE>_MODE` setting keeps the naming honest and leaves room to add modes without renaming (which would break existing configs).

## API Design

<!-- rule:55 -->
- Use `gettext_lazy` for import-time or cached strings, `gettext`/`_()` for per-request strings — Lazy strings defer translation so each request/user gets their own locale; eager `gettext` at import time would freeze the first locale. Applies to filter labels, `null_label`, `empty_label`, and choice labels.
<!-- rule:79 -->
- Make data-mutating management commands idempotent — use `get_or_create`/`update_or_create` for required objects and log only actual state changes (e.g., `inactive` -> `active`), as done in `wagtail_localize/management/commands` and `demo/blog/management/commands` — Rerunning commands (CI, deploy scripts, local setup) must repair missing state rather than duplicate or crash; quiet no-op runs keep logs signal-rich so real mutations stand out.
<!-- rule:48 -->
- Destructive admin confirmations must state the concrete consequence and name the target object (e.g., `This will overwrite {page.title} ({locale})`) — generic `Are you sure?` prompts don't reveal what is lost. — Naming the affected object plus distinguishing attributes such as source page title and locale lets admins verify they're overwriting the right page in the right language before an irreversible action.
<!-- rule:76 -->
- Gate field-specific `post_save` receivers behind change detection — capture the prior value in a paired `pre_save` handler, check `update_fields`, or persist the last-signalled state. Otherwise every save re-fires signals and side effects (e.g., spurious activation/deactivation) for fields that never changed. — A `post_save` receiver that fires on every save emits signals and runs logic even when the watched field (like an activation flag) is untouched, causing duplicate side effects and inconsistent state.
<!-- rule:105 -->
- Add/remove integration-dependent form fields in the form's `__init__` using the integration-availability helper — never conditionally hide them in the template. Fields hidden only in templates are still submitted by crafted requests, so unavailable integrations (e.g., machine translation) would bypass validation. — Hiding a field in the template leaves it bound and submittable, so an unavailable integration can be exercised despite runtime configuration; mutating `__init__` with the same availability helper used elsewhere keeps validation and rendering in sync.

## Error Handling

<!-- rule:17 -->
- Use `.get()` for querysets expected to match one row; reserve `.first()` for genuinely multi-row cases and comment why — `.first()` silently masks broken uniqueness invariants that `.get()` would surface as `DoesNotExist`/`MultipleObjectsReturned`. — `.get()` raises `DoesNotExist` or `MultipleObjectsReturned` when a uniqueness invariant breaks, failing loudly at the call site; `.first()` swallows that signal and returns `None` or an arbitrary row, hiding data bugs. Requiring an inline comment for `.first()` forces the author to justify that multiple matches are genuinely possible or expected.
<!-- rule:70 -->
- Initialize variables before `if`/`try` when read afterward — prevents `UnboundLocalError` on unassigned paths — A variable assigned only inside a conditional branch or `try` body leaves no binding on the other paths; if it is referenced afterward, Python raises `UnboundLocalError` at runtime. Bind it on every path — via a pre-block default, an exhaustive `else`, or a `None` fallback in the `except` handler.
<!-- rule:14 -->
- In validation messages, use `"Unrecognised"` for unexpected or missing values/IDs, and `"Invalid"` only for malformed or structurally incorrect data. — These signal distinct failure modes to users — a lookup miss vs. bad data — so mixing them sends misleading diagnostics and makes messages inconsistent across modules.

## File-Specific Rules

### `CHANGELOG.md`

<!-- rule:95 -->
- Consolidate related `CHANGELOG.md` entries into a single bullet — group those sharing a PR reference or describing one change's net effect, so release notes stay readable instead of mirroring commit history. — Grouping entries that share a PR reference or describe the net effect of one change keeps `CHANGELOG.md` readable for consumers, rather than mirroring the commit log.
<!-- rule:94 -->
- Categorize `CHANGELOG.md` entries by nature: `### Changed` for compat/workflow/test-matrix and other non-bug edits, `### Fixed` for real bug fixes only, `### Removed` for user-facing removals — misfiled entries hide breaking changes from users who scan by section — Two bullets covering categorization and the combined add/remove case. Both reference `CHANGELOG.md` and the Keep a Changelog section headers (`### Changed`, `### Fixed`, `### Removed`, `### Added`) so the rule stays findable by file and preserves the section conventions. Rationale explains the reader-impact: misfiled sections hide breaking changes from users scanning by section, and split entries misrepresent a single swap as two independent changes.
  - Record comparable add+remove changes (e.g. test-matrix versions) as a single `### Changed` entry in `CHANGELOG.md`, not split `### Added`/`### Removed` — the split obscures that it's one swap, not two independent changes
<!-- rule:96 -->
- Write `CHANGELOG.md` entries in a natural human voice, matching sibling repos' style, with consistent tense and capitalization (all `Add ...` or all `Remove ...`) within adjacent entries — Scannable release notes require uniform phrasing; mixing `Add`/`Added` or `remove`/`Remove` across neighboring lines looks machine-generated and breaks the project-wide changelog convention users compare across repos.

### `README.md`

<!-- rule:78 -->
- In `README.md` setup steps, document required Django commands (e.g. `collectstatic`) with the minimal default form, plus a one-line why. — Copy-pasteable defaults work in every project; optional flags like `--link` break in common setups, and a short why lets users skip commands their project doesn't need without re-reading Django's deployment docs.

### `setup.cfg`

<!-- rule:36 -->
- Keep isort's `line_length` equal to flake8's `max-line-length` in `setup.cfg` — mismatched limits make isort emit imports that flake8 then flags as E501. — Both settings live in the same file, so an assistant editing setup.cfg can see and enforce the pair directly; a mismatch produces lint failures on already-sorted import lines.
<!-- rule:37 -->
- In `setup.cfg` `[isort]`, set `known_first_party` to the project's own package name only — leave `known_django`/`known_wagtail` unset so external frameworks stay `THIRDPARTY` — Custom `known_*` sections misclassify Django/Wagtail imports as project code, producing sort orders that diverge from isort's defaults and drift across contributors' environments.

### `tox.ini`

<!-- rule:46 -->
- Group `tox.ini` `envlist` entries by version-family factor, split across lines, and use brace expansion (`py{38,39,40}`) — keeps the matrix readable and avoids hand-duplicated combinations — The `envlist` in `tox.ini` is the source of truth for the CI matrix, so it must stay a minimal, valid, and readable set. Brace expansion and factor grouping prevent hand-maintained duplication; excluding incompatible/redundant combos avoids CI runs that can never pass; reduced subsets for secondary backends like `sqlite` keep test time bounded; and purging dropped versions from both `envlist` and `deps` prevents the repo from silently continuing to test unsupported releases.
  - Cover every supported dependency version up to the dev-branch alias in `envlist` — omitting a version leaves that release untested
  - Drop incompatible or redundant factor combinations from `envlist` — invalid combos waste CI time and signal support you don't have
  - Use a reduced representative subset for secondary backends like `sqlite` — full matrices multiply runtime without adding coverage
  - When a version is dropped, remove it from every `tox.ini` section (`envlist`, `deps`) instead of keeping old and new matrices side by side — stale entries test unsupported releases
<!-- rule:98 -->
- Name tox envs after service+version (`postgres12`, `postgres15`) and provision the real service in each — Adding only the client dependency runs tests against no server — pin a driver compatible with that version and pass its connection env vars so each env actually exercises the target.
<!-- rule:25 -->
- Pin pre-releases explicitly in `tox.ini` deps (`pkg==x.yrc1` or `pkg>=x.y.rc1,<x.y+1`) — pip resolves stable ranges like `>=x.y,<x.y+1` to the latest stable, silently skipping the RC you meant to test. — Some `tox.ini` environments exist specifically to exercise release candidates. A stable range like `pkg>=x.y,<x.y+1` looks correct but pip's default resolution excludes pre-releases, so the RC is never installed and the environment silently tests the stable release instead — giving false confidence that the RC was validated.

<!-- /braindump -->