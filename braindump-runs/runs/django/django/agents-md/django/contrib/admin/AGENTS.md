<!-- braindump: rules extracted from PR review patterns -->

# django/contrib/admin/ Guidelines

## Code Style

<!-- rule:2696 -->
- In `django/contrib/admin/templates`, name every landmark and control with translated text referenced by `aria-labelledby` (stable ID) — raw `aria-label` strings stay untranslated for non-English users — The Django admin ships translations for every shipped string; hard-coded `aria-label` text silently drops the admin's i18n coverage for screen-reader users and duplicates labels across repeated regions like pagination, search, and filters make those landmarks indistinguishable when navigating by landmark.
  - Prefer a `sr-only`/`visually-hidden` `<h2>`/`<span>` with `{% translate %}`/`{% blocktranslate %}`; use one translated `aria-label` on the landmark only when a nested heading would be announced redundantly
  - Add model/page context to repeated region names (`pagination`, `search`, `filters`) — screen-reader users otherwise hear identical landmark labels and can't tell them apart
<!-- rule:688 -->
- Mark the current page with `aria-current="page"` on exactly one breadcrumb/pagination item; don't put it on links that navigate elsewhere — a single accurate flag is what screen readers and the styling hook both rely on. — Django admin breadcrumb/pagination templates render multiple links; marking exactly one as current lets assistive tech announce the current page and lets CSS target it via a single attribute. `:last-child`/`:not(:last-child)` depend on DOM order and break when extra items are added, while a `this-page` class duplicates state the attribute already carries and can drift out of sync.
  - Style current items via the `[aria-current="page"]` selector in `django/contrib/admin/static/admin/css/base.css`, not `:last-child`/`:not(:last-child)` or a `this-page` class — structural selectors silently break when item order changes, and `this-page` creates a second source of truth that can desync from the attribute.
<!-- rule:4350 -->
- Use `word-break: break-word` or `overflow-wrap: break-word` (never `anywhere`) for long unbroken text in `static/admin/css/` and `templates/admin/` — `anywhere` splits mid-word, breaking admin UI consistency — The `anywhere` value performs mid-word breaks that render awkwardly and diverge from the wrapping style already used throughout `django/contrib/admin`. Consolidating selectors onto the existing wrapping declaration prevents scattered, inconsistent wrapping behavior as admin UI styles evolve.
  - Extend existing wrapping declarations with related selectors instead of adding a divergent property — keeps wrapping behavior uniform across admin elements
  - Long unbroken text in admin CSS/templates must wrap, not overflow its container — overflowing strings break admin layouts
<!-- rule:3165 -->
- Drive admin SVG icon geometry with `viewBox`; let CSS set size — omit `width`, `height`, `preserveAspectRatio` unless the 100%/matching-ratio defaults are insufficient. — Icons in `django/contrib/admin/static/admin/img/*.svg` are consumed as `<symbol>` sprite entries (`templates/admin/base.html`) and sized by `widgets.css`/`responsive.css`. Redundant intrinsic attributes on the SVG compete with CSS sizing and desync sprite and inline usage, so geometry belongs in `viewBox` and dimensions in the stylesheet.
<!-- rule:3900 -->
- Apply UI asset conventions (`img/` icons, `css/` state backgrounds) across all related assets and state variants — partial rollouts leave mismatched admin states — Django admin static assets are consumed collectively by widget and page templates, so a convention applied to one file but not its siblings (e.g. hover/active/disabled backgrounds, icon variants) produces visibly inconsistent UI. Editing any file under the shared `img/` / `css/` parent is a signal to check whether sibling assets need the same treatment.
<!-- rule:6032 -->
- Edit only the identified margin side using longhand (`margin-top`), never shorthand — avoids shifting unrelated elements in `django/contrib/admin/static/admin/css/` stylesheets shared by `forms.css` and `dark_mode.css`. — Longhand edits localize the change; shorthand or multi-side edits silently shift unrelated elements across `forms.css`, `dark_mode.css`, and other Django admin stylesheets.
<!-- rule:1928 -->
- Consolidate theme CSS into the existing `:root`/`html[data-theme="..."]` selector and reference theme vars like `--body-quiet-color` via `var(...)` — duplicate selectors and copied literals drift out of sync between theme blocks. Exception: `@media (prefers-color-scheme: dark)` values don't cascade, so mirror them in the explicit `html[data-theme="dark"]` block. — Duplicating theme selectors or pasting literal color values instead of referencing shared `--body-quiet-color`-style vars lets the light and dark blocks silently drift apart, so a token fixed in one theme stays broken in the other — and since `prefers-color-scheme` media values don't cascade into the themed blocks, they must be mirrored in `html[data-theme="dark"]` to keep OS-dark users consistent with explicit-dark users.
<!-- rule:3382 -->
- Render theme-dependent admin icons as inline `<svg>` with `fill="currentColor"`, driving color via CSS `color: light-dark(light, dark)` (see rocket in `default_urlconf.html`) instead of encoded SVG data URIs in `background-image` — keeps icon color responsive to theme without duplicate assets. — Admin icons span two sibling subtrees: `django/contrib/admin/templates/` (inline SVG markup) and `django/contrib/admin/static/admin/img/` (variant assets). Inline `<svg>` + `currentColor` + `light-dark()` keeps them theme-aware without duplicated assets, while external `<use href="...">` breaks CSS styling of internal `<path>` fills. Context-neutral shared assets plus `{icon-name}-{variant}.svg` naming keep the `img/` directory consistent and prevent shared icons from breaking on pages where hardcoded transforms or colors don't apply.
  - Inline raw SVG (not `<use href="...">`) when CSS must target internal `<path>` fills — external references don't expose internal shapes to selectors.
  - Keep icons under `django/contrib/admin/static/admin/img/` context-neutral: no hardcoded transforms or colors on shared assets; apply them via page-scoped CSS so reuse across pages stays safe.
  - Name color/dark-mode variants as `{icon-name}-{variant}.svg` (e.g. `icon-yes-dark.svg`) under `django/contrib/admin/static/admin/img/` — matches the existing convention and avoids ambiguity.
  - Avoid duplicating raw SVG path data across templates: use an in-page `<symbol>` + `<use>`, or a Unicode glyph for simple icons — prevents drift between copies.
<!-- rule:689 -->
- Never render the current breadcrumb or paginator entry as `<a href="">` in `django/contrib/admin` templates — use plain translated text for breadcrumbs, and a real URL, `href="#"`, or plain text for pagination; an empty `href` resolves to the current URL, so middle-click/open-in-new-tab silently reloads the same page instead of navigating. — An empty `href=""` points at the current URL, breaking expected link affordances (middle-click, keyboard nav, `target="_blank"`) and misleading users into thinking the current page is a real destination. Plain translated text marks the current location honestly, while a real URL keeps pagination links fully functional.
<!-- rule:5525 -->
- Use Django-native parsing for admin input — no `shlex` or regex escaping — `smart_split()` with conditional `unescape_string_literal()` handles quoted search terms correctly, and `prepare_lookup_value` stays simple with `value.split(',')`. Shell-like or regex escaping introduces edge-case bugs in `django/contrib/admin/options.py` and `utils.py`; only add complex escaping for a documented requirement.
<!-- rule:6328 -->
- Insert new entries in Django admin permission structures at their canonical position, not at the end — keeps diffs stable and related keys grouped — These ordered collections (permission dicts, context dicts, widget assignments, call-site kwargs in `django/contrib/admin/widgets.py` and `django/contrib/admin/options.py`) are read positionally by reviewers and diffs; appending scrambles grouping and produces noisy churn unrelated to the change.
<!-- rule:5734 -->
- Use `type="search"` and a search affordance (icon/styling) for admin filter inputs like `#nav-filter` — matches the main admin search bar so users get a familiar interaction and native clear button — Django admin users already recognize the main search bar's affordance; sidebar/list filter inputs that look like plain text fields feel inconsistent and lose the native clear button browsers provide for `type="search"`.
<!-- rule:4394 -->
- Apply new list-rendering filters/helpers to every related list in the same template/context, even lists lacking the button that motivated them — keeps rendering consistent and avoids divergent list markup across `django/contrib/admin/templates/admin` — In `django/contrib/admin/templates/admin`, sibling lists share markup and helper imports; filtering only the list that motivated a change leaves the others rendering differently, which produces inconsistent admin UI and divergent template code that later fixes must patch piecemeal.
<!-- rule:3381 -->
- Use fill colors that meet WCAG non-text contrast against all display backgrounds, incl. light mode — low-contrast fills like `#adadad` make admin icons invisible to low-vision users. Applies to all SVGs in `django/contrib/admin/static/admin/img/`. — Django's admin ships icons rendered on varying backgrounds; a fixed light-gray fill may look fine on dark but fails contrast on light, hiding controls from users who need them.
<!-- rule:696 -->
- In `django/contrib/admin/templates/admin/`, truncate breadcrumb/link object display values with `truncatechars` (not `truncatewords`) — word truncation can't bound strings without whitespace (e.g. UUIDs) and collapses repeated spaces; when migrating, raise the numeric limit (word count ≠ character count) and apply truncation after the display filter: `|to_object_display_value|truncatechars:"18"`. — Word-based truncation fails to bound strings without whitespace (e.g. long identifiers/UUIDs) and collapses repeated spaces. When migrating from `truncatewords` to `truncatechars`, increase the numeric limit because word-count ≠ character-count, and apply the truncation filter after the display filter (e.g. `|to_object_display_value|truncatechars:"18"`) so it operates on the final rendered string.

## API Design

<!-- rule:3551 -->
- Keep field-type display/formatting in `display_for_field`; pass context like `is_link`/`link_to_changelist` instead of special-casing in `lookup_field` callers — duplicating in generic lookups splits the source of truth and breaks link columns. — `lookup_field` is a generic utility; field-type-specific formatting belongs in `display_for_field` so link rendering, admin filters, and other callers stay consistent. Overriding formatted output in callers causes diverging behavior between contexts.
<!-- rule:1185 -->
- In `django/contrib/admin` changelist/`list_editable` handlers, slice the queryset to `initial_form_count()` or `total_form_count()` before `zip()`ing it with formset forms — `zip()` stopping early doesn't stop QuerySet iteration from fetching every row, so unsliced code loads instances it never consumes. — An unsliced QuerySet paired positionally with formset forms silently loads rows that are never used and, when counts diverge, associates forms with the wrong model instances — a mismatch that fails quietly rather than erroring.
  - Prefer matching formset forms to model instances by primary key over `zip()` position — positional pairing silently mismatches whenever form and queryset counts diverge.
<!-- rule:2095 -->
- Extend admin search via `ModelAdmin.get_search_results()` and `ChangeList.search_form_class`, not private attrs or reimplemented `search_fields` — Staying on Django's documented extension points keeps search semantics and form handling in one place — reimplementing `search_fields` filtering or stashing state in private `ModelAdmin` attributes bypasses admin-tested behavior and breaks across Django releases.
<!-- rule:1186 -->
- In `django/contrib/admin` changelist bulk-edit/`list_editable` handling, derive targets from structured state — `cl.result_list` or `cl.get_queryset(request)` — not regex-parsed `request.POST` keys — POST key formats are implicit and break on refactor, while structured state mirrors Django's selection semantics — Post key formats are implicit and break on refactor.
  - Caveat: page-scoped results can go stale between render and submit under concurrent add/delete/reorder (Django #11313) — fall back to submitted formset IDs when correctness requires it
<!-- rule:4039 -->
- Route changelist/inline formset construction through a single `has_change_permission`-filtered helper for both GET and POST — never fall back to an unfiltered formset on submit, or users can POST changes to objects they were never allowed to see or edit. — The shared helper keeps the object-level filter consistent between rendering and submission; reusing an unfiltered formset on POST silently bypasses object-level permissions.
<!-- rule:823 -->
- Pass `str(obj)` as `object_repr` in admin `LogEntry` logging — `repr(obj)` breaks the historical `log_action()`/`actions.py` output users rely on — Preserves the historical admin log format users and tooling depend on, prevents content loss from double truncation, and keeps tests checking the real stored value against `log_action()`'s contract.
  - Let `log_action()` truncate `object_repr` to 200 chars; don't pre-truncate — double-truncation silently drops content in admin history
  - In admin log-entry tests, assert on `str(obj)[:200]` (the stored value) — re-escaping/re-truncating in the test hides mismatches; only assert rendered response directly when checking the view output
  - Category: api_design | Scope: `django/contrib/admin/models.py` (`LogEntryManager`) and `actions.py`, plus `tests/admin_utils`/`tests/modeladmin` log-entry tests
  - Placement: document in `django/contrib/admin/AGENTS.md` — implementation and behavioral contract live in the admin logging module, so the rule stays discoverable where the code is changed.
  <rationale>
  `str(obj)` vs `repr(obj)`: the admin log's human-readable `object_repr` has always been the `str()` form; switching to `repr()` changes stored history and breaks backward compatibility for users and tooling reading `LogEntry` rows. Single truncation: `log_action()` already caps `object_repr` at 200 chars, so pre-truncating at the call site can drop more than intended (and diverge from `actions.py` behavior). Tests: asserting the raw stored value (`str(obj)[:200]`) verifies the actual contract between caller and `log_action()`; re-computing escapes/truncation in the test would pass even if the stored value were wrong.
  </rationale>

## Error Handling

<!-- rule:3512 -->
- Convert non-primitive values with `str()` before adding to `popup_response` payloads like `popup_response['optgroup']` — `JSONEncoder` chokes on model instances and lazy translation objects. When translations are disabled or deferred, prefer `str()` over `_()`/`gettext` so values stay untranslated and serializable. — The Django admin popup JSON response pipeline serializes payloads directly, so passing a model instance or a `gettext_lazy` proxy raises a `TypeError` at response time — often only on the popup path, not the main admin views, so it ships silently. Using `str()` for explicitly-untranslated strings keeps the output both human-readable and JSON-safe.
<!-- rule:239 -->
- Parse changeform GET params defensively: catch and skip invalid inline field lookups in `get_changeform_initial_data` the same way invalid top-level fields are skipped — a malformed inline param (or bad indexed field name, comma-separated M2M PK, etc.) must not crash the admin changeform. Cover all of these cases in the `django/contrib/admin` test suite. — `get_changeform_initial_data` in `django/contrib/admin/options.py` receives arbitrary query params from the changeform URL, so unresolved references (bad top-level fields, invalid inline fields, malformed indexed/M2M params) must be swallowed rather than raised; uncaught lookups turn a typo'd link into a 500. Tests in the admin suite lock in the behavior across the indexed-field, M2M-PK, invalid-name, and malformed-inline cases.
<!-- rule:3067 -->
- In `django/contrib/admin/templates/admin/*.html` form templates, render the error summary as a `role="alert"` container with `aria-labelledby` pointing to its translatable heading and `tabindex="-1"`, and ensure JS or an anchor target moves focus to it first on load/submit with errors — screen reader users get the errors announced and keyboard users land on the summary instead of tabbing through fields to find them. Top-of-page placement is preferred but secondary; first-focus behavior is what makes the W3C error-summary pattern work. — Non-focused error summaries are silently skipped by screen readers and force keyboard users to hunt for failures. The `role="alert"` + `aria-labelledby` + `tabindex="-1"` combination is the W3C pattern; without the focus move it does nothing.
<!-- rule:2379 -->
- Treat composite primary keys as unsupported in admin audit logging — Admin URL helpers can't build valid links for composite PKs, so attempting it produces broken URLs in the audit log. Until support is added, `LogEntry.get_admin_url()` must return `None` and `LogEntry` creation must be skipped for these models so the log stays consistent. Applies across `django/contrib/admin/` (e.g., `models.py`, `options.py`).
<!-- rule:4923 -->
- In `django/contrib/admin/utils.py`, resolve `changed_data` labels defensively — use the shared label helper or `try: form.fields[f].label / except KeyError`, fall back to the raw field name when the field is absent from `form.fields` or its label is `None`, and don't special-case fields like `password`. Apply the same fallback in formset/inline changed-object rendering. — Fields can be missing from `form.fields` (custom admin forms, excluded fields) or have a `None` label, so a bare `form.fields[f].label` lookup raises `KeyError` or leaks `None` into the admin change message. Falling back to the field name keeps change messages readable for any form without per-field hacks, and reusing the shared helper keeps inline/formset output consistent with standalone change messages.

## Documentation

<!-- rule:528 -->
- Give each admin action its own `message_user` feedback naming the outcome, not the form fields — and never promise a follow-up the user lacks permission for; the shared paths in `django/contrib/admin/options.py`, `django/contrib/admin/templatetags/admin_modify.py`, and auth `add_form` templates otherwise surface confirmations that mislead users straight into 403s. — Admin success messages are rendered from generic code paths (`django/contrib/admin/options.py`, `admin_modify.py`, auth `add_form` templates), so wording that just lists form fields or promises actions like "you can now edit X" is often untrue for the current user's permissions. Action-specific, truthful `message_user` text — supplied by the custom action itself — keeps the confirmation accurate and avoids sending users to links they cannot use.
<!-- rule:4001 -->
- **Rule:** In `django/contrib/admin` templates and templatetags (filters, nav `aria-label`s), and in `django/contrib/admin/templates/` reusable filter components: label and placeholder text for admin filter/navigation controls must name the action plus the targeted model/field (the actual `field_name`), not internal names like `hierarchy` or vague generics. — The rule is a module-level documentation/accessibility convention for Django admin filter and navigation controls. It applies across templates and templatetags under `django/contrib/admin` but not repo-wide, so it belongs in `django/contrib/admin/AGENTS.md` where assistants editing the admin module will see it, rather than at the root or as a file-level rule.
  - Name the real model/field in filter and nav labels (e.g. `Filter Post.title`), not internal names like `hierarchy` — non-developers and screen-reader users can't map implementation terms to visible content.
  - Include `field_name` when several similar controls appear on one screen — otherwise users can't tell which filter targets which field.
  - Use action-based generic text (e.g. `Filter navigation items`) in shared reusable filter components that accept arbitrary content — hardcoding one entity name breaks reuse at other call sites.
  - Surface the active filter field as visible UI text when it affects all users — `aria-label` and query-string-only signaling is invisible to non-developers.
<!-- rule:1055 -->
- In admin JS, prefix dynamic help/warning element IDs with the input's own `id` (`${inp.id}_timezone_warning_helptext`), not the fieldset's. — — fieldset- or field-group-level IDs get reused across inputs, so `aria-describedby` associations collide or point at the wrong help text.

## General

<!-- rule:4420 -->
- Reuse existing `ModelAdmin` display-limit options (e.g. `delete_confirmation_max_display`) for inline and protected-error rendering in `django/contrib/admin/options.py` instead of adding inline-specific constants, and make the shared option apply to inline paths too. — One option means one place for users to tune; separate inline constants drift from the `ModelAdmin` value and produce inconsistent truncation between admin and inline views.

## File-Specific Rules

### `django/contrib/admin/bin/compress.py`

<!-- rule:6423 -->
- Comment the omitted-`.js` allowance in `django/contrib/admin/bin/compress.py` (e.g. `# Allow omitting the .js prefix in the script's arguments.`) — flags deliberate leniency so it isn't "corrected" as a bug — This comment prevents a future maintainer from "correcting" the omitted-`.js` shorthand as an apparent validation bug, which would break callers that invoke the script without the extension.
<!-- rule:6422 -->
- Always analyse the entire file. Then output each function in relevant file ignoring line numbers as line numbers can be off due to formatting. — Processing the complete file first ensures the model has full context before producing outputs, preventing truncated or context-starved function extraction. Emitting functions without line numbers keeps the output stable across formatting changes, since line numbers can shift due to formatting and would otherwise cause incorrect references.
<!-- rule:6424 -->
- Keep `#!/usr/bin/env python` in `django/contrib/admin/bin/compress.py` while ticket 27878 is open — don't "fix" it to `python3` in unrelated cleanup. — The legacy shebang is intentionally preserved pending Django ticket 27878; changing it as a drive-by cleanup breaks the file's ticket-tracked state and confuses the eventual fix.

### `django/contrib/admin/models.py`

<!-- rule:826 -->
- In `django/contrib/admin/models.py`, wrap every user-facing fragment in `LogEntry.get_change_message` and `LogEntry.__str__` in `gettext`, including field names and partial message pieces — any unwrapped piece stays English in localized admin log output. — These two methods build admin log entries shown to end users; a stray unwrapped field name or message fragment renders untranslated regardless of the active locale. The placement note: tightly scoped to `django/contrib/admin/models.py` (`LogEntry.get_change_message`, `LogEntry.__str__`), so keep it file-level.
  - Match punctuation/formatting to the existing related admin log messages rather than picking a convention for a new message in isolation — keeps related entries visually consistent.
<!-- rule:4028 -->
- In `LogEntryManager.log_actions`, when only `user_id` is given, fill `action_by_repr` from the dedicated `get_*_repr` helper; if neither actor ID nor representation is supplied, raise `ValueError` — every audit entry must name an actor, otherwise admin logs become unattributable. — Audit logs exist to record who changed what; an entry with no actor is useless for forensics or accountability.

### `django/contrib/admin/options.py`

<!-- rule:2093 -->
- In `construct_search`/`get_search_results`, gate lookups by field type — `__iexact` only on `CharField`/`TextField`, never a blanket string `Cast` on exact lookups for non-text fields: casts defeat DB index usage — Unconditional casts and case-insensitive lookups on non-text fields silently break index-backed queries and produce semantically wrong matches.
<!-- rule:2083 -->
- In `admin/options.py` search, validate each `search_fields` term via `smart_split` before OR-ing into `Q.create()` — drop only invalid terms, not the whole queryset — A single bad term caught around the aggregate `Q.create()` (returning `queryset.none()`) or a whole-string `Cast`-skip decision silently suppresses matches for every other valid term; per-term validation keeps valid lookups working and only yields an empty result when nothing is valid.
<!-- rule:424 -->
- In `django/contrib/admin/options.py`, detect popups via `IS_POPUP_VAR in request.POST or request.GET` and return popup-shaped responses on every branch — including errors — so popup windows aren't redirected to `admin:index` and the parent form breaks. — Popup windows must return a response that `_popup` JS can consume; an unconditional `admin:index` redirect in error branches breaks the parent form. Untrusted POST params and model metadata can be absent or attacker-controlled, so unhandled exceptions there are a bug and a potential DoS.
  Validate or fallback untrusted POST params (`SOURCE_MODEL_VAR`/`_source_model`) and source-admin metadata (`_meta`, `opts`) — missing or forged values must not raise unhandled exceptions.
<!-- rule:4041 -->
- In `ModelAdmin.get_form`/`get_formsets` (`django/contrib/admin/options.py`), gate add-only options like `prepopulated_fields` to the add view, and compute `is_multipart()` from the main admin form plus every inline formset's form — change views misbehave and file uploads silently break when these aren't view-type aware. — Options such as `prepopulated_fields` only make sense when adding a new object, so applying them on the change view produces wrong field behavior. Likewise, `is_multipart()` drives whether the `<form>` gets `enctype="multipart/form-data"`; if an inline formset's form has file fields but the flag is derived only from the main form, uploads in inlines fail. Checking the main form and every inline formset's form keeps add/change behavior correct and prevents silent upload bugs.
<!-- rule:6442 -->
- Parse inline formset field indices with `\d+` and validate against `TOTAL_FORMS`/`INITIAL_FORMS` — `\w+` also matches non-numeric junk, and unbounded indices let crafted POST data address formsets the admin never rendered, corrupting saves in `django/contrib/admin/options.py`. — Inline formset field names are attacker-controlled on POST. Matching `\w+` accepts suffixes like `foo` that then fail confusingly downstream, and skipping the management-form bounds check lets a submitted index reference a formset index outside the rendered range, so validation can be bypassed or writes land on the wrong form.
<!-- rule:789 -->
- In `ModelAdmin.formfield_for_*` methods (`django/contrib/admin/options.py`), chain mutually exclusive field configs like `autocomplete_fields`, `raw_id_fields`, `choices` with `if`/`elif` so the first match wins — else a later branch silently overwrites the selected widget — These field-configuration options are mutually exclusive, so a second `if` on the same field replaces the widget chosen by the first branch and gives users the wrong form control with no error.
<!-- rule:508 -->
- In `response_action` (`django/contrib/admin/options.py`), return the action's response — never force a changelist redirect unconditionally. — Actions legitimately return success messages, intermediate confirmation pages, or file downloads; overriding them with a changelist redirect discards those responses and breaks custom action flows.
<!-- rule:3073 -->
- In `ModelAdmin.get_readonly_fields`, conditionally add readonly fields only when `obj is not None and not self.save_as`  skipping this breaks the "Save as new" workflow, which needs the identifying field editable to create a distinct object. — The `save_as` flow re-submits an existing object as a new one via `ModelAdmin`; a record's immutable identifier (slug, email) would be duplicated or rejected if it were readonly, so `obj is not None and not self.save_as` lets the copy be re-identified while still locking the field during in-place edits.
<!-- rule:5425 -->
- Combine per-term search `Q` objects in `ModelAdmin.get_search_results` with the default `AND` connector; don't pass `_connector=models.Q.OR` when joining term queries — admin search terms narrow the queryset, and OR would match on any term. — Admin search semantics expect multiple terms to narrow results; an OR connector would broaden the queryset and surface records matching any single term, contradicting user expectations.

### `django/contrib/admin/static/admin/css/changelists.css`

<!-- rule:4308 -->
- In `changelists.css`, verify `flex-basis`/`max-width` edits don't alter sidebar row wrapping, and keep selectors like `#changelist-filter h3` — The admin changelist filter sidebar relies on wrapping and on structural selectors — controls such as "Clear all filters" target `#changelist-filter h3`, so dropping or renaming it silently breaks those controls.

### `django/contrib/admin/static/admin/js/actions.js`

<!-- rule:6158 -->
- In `django/contrib/admin/static/admin/js/actions.js`, comment the `pageshow` listener to note it syncs the action counter on navigation, including browser back/forward — `DOMContentLoaded` misses bfcache restores, so readers don't "simplify" it into a back-button bug. — `pageshow` fires on back/forward navigation restored from the bfcache, where `DOMContentLoaded` does not; without the comment a future edit is likely to swap in the "standard" event and break the action counter when users go back.

### `django/contrib/admin/static/admin/js/calendar.js`

<!-- rule:5695 -->
- Suffix calendar/locale property variants with `Abbrev` (`monthOfYear` → `monthOfYearAbbrev`), not as a prefix — keeps each abbreviation grouped with its base property and its alphabetical position stable in `calendar.js`. — A suffix keeps the abbreviated property adjacent to the full one in the locale data object and preserves the file's existing ordering (`monthOfYear`, `monthOfYearAbbrev`), so readers and tooling that scan for the base name still find both entries together. Prefixing (`abbrevMonthOfYear`) scatters related properties across the object and breaks that grouping.

### `django/contrib/admin/templates/admin/widgets/related_widget_wrapper.html`

<!-- rule:5986 -->
- In `related_widget_wrapper.html`, style all four action links (`add`, `change`, `view`, `delete`) identically — matching `admin/img/icon-*.svg`, translated `alt` text, `vertical-align: middle`, and explicit `width`/`height`. Styling only the link you're changing (or falling back to text labels / empty placeholders) makes the admin widget row render at inconsistent heights and drops the label screen readers rely on. — The action links sit side by side in one row, so per-link styling produces mismatched icon sizes and baselines. Using the existing `admin/img/icon-*.svg` assets with translated `alt` keeps visual consistency with the rest of `django/contrib/admin` and preserves accessibility.

### `django/contrib/admin/templatetags/admin_list.py`

<!-- rule:6257 -->
- In `_coerce_field_name()` (`django/contrib/admin/templatetags/admin_list.py`), prefer the callable's `short_description`, fall back to `__name__`, and sanitize `<lambda>` into a human-readable label — surfacing the raw `<lambda>` placeholder in admin list headers confuses users and ignores the explicit `short_description` devs set to control the display name — Preferring `short_description` honors the explicit display name developers set; sanitizing `<lambda>` prevents the raw `<lambda>` placeholder from leaking into admin list column headers, which looks broken and is meaningless to end users.

### `django/contrib/admin/views/main.py`

<!-- rule:6289 -->
- Feed Select2 v4 widgets from `ForeignKeyJsonView.get` (and similar Django JSON endpoints) using Select2's native schema: `{'results': [...], 'pagination': {'more': <bool>}}` with `more` nested under `pagination` and each result's `id` stringified via `force_text(pk)`. Emitting a top-level `more`, numeric ids, or relying on a client-side `processResults` transform breaks Select2 v4's built-in paging — it reads `pagination.more` directly and assumes string ids, so client-side reshaping only works until the widget's contract drifts. — Select2 v4 expects the nested `pagination.more` flag and string ids in its JSON contract; a top-level `more`, numeric ids, or a `processResults` shim silently breaks paging and matching as soon as the widget's assumptions change.
<!-- rule:6430 -->
- In `get_filters()` (`django/contrib/admin/views/main.py`), wrap `date_hierarchy` param parsing (`int()`, `datetime.datetime(...)`) in `try`/`except ValueError` and raise `IncorrectLookupParameters`. — Malformed or out-of-range year/month/day values from the query string would otherwise surface as a raw `ValueError` (HTTP 500) instead of the intended `IncorrectLookupParameters` redirect/error path.
<!-- rule:6104 -->
- Treat `ModelAdmin.show_facets` as enum `{ALWAYS, ALLOW, NEVER}`; make `NEVER` short-circuit faceting in `ChangeList.get_facets` even when `IS_FACETS_VAR` is in `request.GET` — an explicit opt-out must not be overridden by a request-level opt-in. — `ALWAYS` forces facets, `ALLOW` honors `request.GET`, and `NEVER` is an explicit opt-out; if `NEVER` didn't override `IS_FACETS_VAR`, admins who disabled faceting would still pay the query cost and see facets whenever a client appends the var.

### `django/contrib/admin/widgets.py`

<!-- rule:5220 -->
- Default `data-ajax--delay` to 250ms in `AutocompleteSelect`/AJAX widgets — keep it overridable by subclasses and instances — 250ms is Select2's documented rate-limiting default; arbitrary larger values in `django/contrib/admin/widgets.py` silently diverge from upstream behavior and surprise subclasses that expect to tune or disable the delay.
<!-- rule:6299 -->
- When deriving a field identifier in `django/contrib/admin/widgets.py`, strip formset/inline prefixes and indices from the field's `name` first — inline fields arrive as `items-0-price`, so using the raw name builds broken `app_label.Model.field_name` lookups. — Inline formsets render every field name with a `<formset-prefix>-<index>-` prefix, so an unnormalized `name` no longer matches the underlying model field and `app_label.Model.field_name` identifiers (used to build related-field URLs and lookups) point at nonexistent fields.

<!-- /braindump -->