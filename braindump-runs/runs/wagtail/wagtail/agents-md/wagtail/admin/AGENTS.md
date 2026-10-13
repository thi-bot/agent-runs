<!-- braindump: rules extracted from PR review patterns -->

# wagtail/admin/ Guidelines

## API Design

<!-- rule:2470 -->
- Limit `wagtail/admin/api` serializers to general-purpose, validatable fields — omit computed/internal params, unvalidated audit identifiers, and anything a dedicated action already handles; unvalidated or narrow fields bloat the API and can't be enforced at the boundary. — 
<!-- rule:1027 -->
- In admin listing/chooser views, render `active_filters` summaries with the same localized labels the filter form uses (e.g. `Yes`/`No`/`Any`, formatted dates, translated durations — never raw `True`/`False`/`None`) — users see the filter form and its summary side-by-side, so mismatched or unlocalized labels read as bugs. — Two bullets keep the rule actionable while preserving the Wagtail-specific references (`active_filters`, `BaseListingView`, chooser views) and both behavioral requirements: human-readable localized summaries, and a distinct filtered-empty state. Rationale is framed around user confusion rather than 'the rules say so'.
  - When URL filters produce empty results in `BaseListingView` / generic chooser views, show a filters-applied empty state instead of the plain 'no objects' message — otherwise users can't tell their filter is hiding results and assume the dataset is empty.
<!-- rule:1384 -->
- Expose combined search/filter state as a view property (e.g. `is_searching_or_filtering`) instead of duplicating `is_searching or is_filtering` in templates — keeps view and template logic in sync — Rationale: The rule enforces single-source-of-truth for the combined condition (DRY) so templates and view code cannot drift out of sync, and keeps `is_filtering`'s narrower filters-only semantics intact for callers that rely on it — overloading it would silently change behavior.
  - Add a distinct combined property rather than overloading narrower flags like `is_filtering` — preserves filters-only behavior for callers that still need it
<!-- rule:1095 -->
- Listing dropdown hooks return `MenuItem`/`Button`; top-level hooks return `ListingButton`/`ButtonWithDropdown` — mismatched button types break dropdown rendering — Wagtail's listing view hooks expect these specific base classes; returning the wrong shape causes dropdowns to render incorrectly or fail silently.
<!-- rule:804 -->
- Keep `search`/filter state and parameter-filtering in the filter form itself; support search and filter inputs independently (either may be omitted, both may submit to the shared index URL) — views and templates like `wagtail/admin/views/generic/chooser.py` and `wagtail/admin/templates/wagtailadmin/shared/headers/slim_header.html` then reuse one mechanism instead of duplicating ad-hoc filter handling. — Avoid duplicated ad-hoc filter handling across views and templates — centralizing state and param-filtering in the form keeps reusable chooser/search components consistent.
<!-- rule:1328 -->
- In `wagtail/admin/utils.py` admin config attributes, keep generated UI items to pure data (`name`, `heading`) and accept any iterable — presentation details like `classname` belong to rendering, so keeping items minimal lets view/panel code evolve without breaking configs, and iterable-acceptance lets callers pass enums without forcing `list()` conversions. — The two clauses share one motivation: config attributes should describe *what* items exist, not *how* they look. A minimal item shape means adding or changing presentation (classnames, behavior) is a rendering concern and doesn't ripple into every config. Typing the attribute as `Iterable` rather than `list` matches how Wagtail admins already define item sets as enums, avoiding defensive `list(...)` wrapping at call sites.
  -
<!-- rule:3056 -->
- Keep UI component-selection logic in the view layer, not in `wagtail/admin/ui/` component or side-panel classes. Component classes should only render what they represent — mixing in "which component to show" logic makes them harder to test, reuse, and reason about as the view's branching grows. — Preserves separation between rendering and orchestration; keeps side-panel classes like those in `wagtail/admin/ui/side_panels.py` focused on rendering so view-level branching (permissions, context, feature flags) stays in one testable place.
<!-- rule:2627 -->
- Pass `entity_type`/`mutability` as constructor args to inline entity handlers — lets one generic handler (e.g. `InlineEntityElementHandler`) serve every entity type in `wagtail/admin/rich_text/converters/` — Hard-coding entity metadata forces a new handler class per entity type; parameterizing it collapses them into a single reusable converter and keeps new entity types a config change rather than a code change.
<!-- rule:2904 -->
- Centralize save-triggered side effects (logging, notifications) for an entity in one shared helper, and call it from every save site — including `perform_workflow_action`, `cancel`, and `restart` — so alternate flows don't silently skip them. — Duplicating side effects across save paths causes them to drift or be forgotten in less-common flows (workflow actions, cancel, restart), leading to inconsistent behavior and missed notifications/logs. A single helper keeps all persist paths in sync when the effect changes.
<!-- rule:987 -->
- In report/listing views, build querysets from the rendered model (e.g. `Page`) via its existing relations, not from auxiliary log/audit or link tables — keeps queries efficient and avoids joins through unrelated tables. — Module-specific rule for `wagtail/admin/views/AGENTS.md` (e.g. `wagtail/admin/views/reports/page_types_usage.py`). Anchored on the primary rendered model, existing relations, single PK→instance mapping, and avoidance of auxiliary log/audit or link tables and parallel id-to-object helpers.
  - When decorating paginated results, keep one PK→instance mapping and derive nested display fields from that instance — parallel mappings and separate id-to-object helpers drift and trigger extra queries.
<!-- rule:3071 -->
- Format read-only field values via the field type's existing read-only representation (`rich_text` `readOnly={true}`, `StreamField` `read_only`, diff view without diff markings) rather than a redacted placeholder, and render `help_text` visibly instead of only via `aria-describedby`. — Preserves user-facing info in `wagtail/admin/panels.py` and `read_only_field_panel.html` — redaction hides content users can still legitimately view, and help text set to visible shouldn't disappear just because the field is read-only.
<!-- rule:2793 -->
- In Wagtail workflow action menus (`wagtail/admin/action_menu.py`), reserve "Restart workflow" for actions that re-run from the beginning, and label continuation actions with the specific task name (e.g., "Save and resume {task.name}", "Resubmit to {task.name}"). Consolidate or remove actions that duplicate the same restart/resume effect — ambiguous labels cause users to lose in-progress task state when they only meant to resume. — Users cannot distinguish a destructive restart (loses all progress) from a resume (returns to an existing task) when labels overlap; task-specific wording and one action per effect make the outcome predictable and prevent accidental data loss.
<!-- rule:2351 -->
- Workflow cancel/restart actions in `wagtail/admin/views/pages.py` should reuse the same comment-logging and notification logic as `submit_action`, and their messages should be handled consistently with other workflow states (placed in the corresponding `is_cancelling_workflow` branch while still permitting cancellation on a locked page). — The rule governs workflow handling (cancel/restart vs. submit_action) in Wagtail's admin page views, and the evidence spans two related but distinct files — `wagtail/admin/views/pages.py` and `wagtail/admin/views/pages/edit.py`. Because the rule is module/area-specific rather than repo-global, and because neither a single file nor a strict sync relationship fully captures it, directory-scoped guidance is the best fit. The common enclosing directory, `wagtail/admin/views`, covers both files where workflow handling lives. Keeping cancel/restart aligned with `submit_action` avoids drift in audit logging and user-facing messages as new workflow states are added, and preserving the locked-page cancellation path prevents silently blocking users on locked content.

## Code Style

<!-- rule:996 -->
- Render user references in Wagtail admin templates, reports, and views through `user_display_name` or `get_deleted_user_display_name` — missing/deleted users then get a consistent localized fallback instead of raw objects or ad-hoc per-location handling — Ensures consistent localized fallbacks for deleted/missing users and prevents whitespace-only names from being treated as valid.
  - In `wagtailadmin_tags.user_display_name`, `.strip()` every candidate (`user.get_full_name()` and the `user.get_username()` fallback) before emptiness checks or fallback selection — usernames can contain whitespace when the default validator is overridden
<!-- rule:2721 -->
- In `wagtail/admin/templates/`, pick the semantically correct block element: use `<p>` for standalone sentences, messages, and paragraph content (not `<span>`/`<div>`); use `<div>` for layout/grouping containers, blocks that may embed block-level HTML (e.g. thumbnail/preview safe strings), and block help text — avoids resetting default `<p>` margins with `w-mb-0`/`w-my-0`. — Semantic block elements keep screen readers, default spacing, and CSS overrides working as intended; `<div>` for containers and block-help text prevents margin-reset utility churn.
<!-- rule:1735 -->
- Reuse existing `theme('borderRadius.*')` tokens in Wagtail admin SCSS (`borderRadius.xl` for pills, `borderRadius.full` for circles) — hardcoded pixels or new tokens break theming consistency across light/dark and future design-token updates — The rule is a code-style convention about how border-radius values must be authored in Wagtail admin SCSS: instead of hardcoded pixels or new tokens, reuse existing `theme('borderRadius.*')` tokens. Scope is effectively Wagtail admin styling; tokens come from the shared design-token source under `client/src/tokens/`. Rationale: raw pixel values drift from the design system, and ad-hoc tokens fragment the theme source, so reusing canonical tokens keeps surfaces consistent and lets a single token change propagate everywhere.
<!-- rule:1216 -->
- Apply `|unlocalize` to machine-consumed numbers (IDs, PKs, hidden field values, checkbox `id`/`value`) in `wagtail/admin/templates`, not `|intcomma` — locale formatting turns `1000` into `1,234` and breaks round-tripped submissions and comparisons. — The rule is the core insight — `|intcomma` and similar locale-aware filters corrupt numeric identifiers in HTML output, causing form round-trips and programmatic comparisons to fail. The original already contains this reasoning, so it should be preserved as the *why* clause. Project-specific identifiers (`wagtail/admin/templates`, `|unlocalize`, `|intcomma`, the `id`/`value` attribute names) are kept verbatim because they're what makes the rule findable and actionable in an AGENTS.md. Length is slightly over 100 characters for the main clause, but the list of affected contexts (IDs, PKs, hidden fields, checkbox attributes) is the concrete guidance that makes the rule useful — trimming it would lose signal. The phrasing is imperative ("Apply X to Y") and uses backticks around all code-ish tokens.
<!-- rule:378 -->
- Style messages with semantic classes like `status-msg warning`, never hard-coded inline `style` colors — keeps admin UI themeable and consistent across themes — supports discoverability for assistants editing wagtail/admin templates and components
  Apply `w-status--*` modifier classes only to actual status tags, not generic buttons or unrelated elements — prevents style leakage into non-status UI
<!-- rule:1613 -->
- Use a `SuffixedMultiWidget` subclass with min/max placeholders for stacked range bounds — the default `RangeWidget` dash leaves each bound unlabeled. Mirror the date-range widget in `wagtail/admin/filters.py`. — Range filter widgets and adapters (e.g. `wagtail/admin/active_filters.py`, and consumers like `wagtail/images/views/images.py`) stack two bounds vertically, where the default `RangeWidget` dash and an empty-string or `N/A` label make it ambiguous which bound is set and whether the filter is broken. Explicit `SuffixedMultiWidget` placeholders and contextual `from`/`until` labels keep partial ranges legible.
  - Render a neutral placeholder for a missing bound, never an empty string or error-like labels such as `N/A` — prefer conditional `from {start}` / `until {end}` labels so half-filled ranges read as intentional.
<!-- rule:2111 -->
- In `Table` subclasses, set only subclass-specific attributes — inherit shared ones (e.g. orderable item identifiers) from the base or mixin to avoid duplicated assignments that drift from mixin behavior. — Redundant attributes silently diverge when the mixin changes, breaking behavior in unexpected ways.
<!-- rule:2666 -->
- Prefer standard widget rendering over the legacy `WidgetWithScript` mixin in `wagtail/admin/rich_text/editors/` — only widgets that genuinely need inline-script rendering should use it; `HalloRichTextArea` should match `DraftailRichTextArea`. — Standard widget rendering keeps the editor widgets consistent and easier to maintain; `WidgetWithScript` is a legacy pattern reserved for cases that truly require inline scripts, so carrying it forward adds noise and unexpected behavior.
<!-- rule:2883 -->
- Isolate styles in UI injected into host pages (`wagtail/admin` userbar): use neutral `div` + ARIA roles instead of semantic/interactive elements, or reset with `all: initial !important;` — host page and UA styles otherwise leak in — Host-page CSS cascades into injected components like the Wagtail userbar, breaking layout and behavior unpredictably; a hard reset at the top of style declarations severs that inheritance while keeping accessibility via ARIA roles.
<!-- rule:1006 -->
- The rule text field indicates the raw rule is exactly that. — not used
<!-- rule:2854 -->
- Use `prefetch_related_objects(self.comments, 'user', 'replies__user')` on in-memory form collections in `CommentPanel` — re-querying by PK drops unsaved edits — Form-bound collections may hold unsaved user edits; re-querying by PK would silently discard them. Batch-prefetching related users and nested replies in memory avoids N+1 `.user` lookups without losing pending changes. Use a bulk `in_bulk()` user-ID fallback where prefetching isn't feasible.
<!-- rule:997 -->
- In Wagtail admin reports (`wagtail/admin/views/reports/`, templates in `wagtailadmin/reports/`), read existing denormalized fields (e.g., `Page.owner`, `Page.latest_revision_created_at`) and nested template attributes (e.g., `page_type.last_edited_page.owner`) directly — avoid `PageLogEntry` subqueries or new Python properties, which add query cost and duplicate existing data. — Denormalized fields already hold these values; subqueries/properties slow the report and drift from the source of truth.

## Testing

<!-- rule:614 -->
- Test Wagtail admin menu visibility via the admin home/dashboard view and assert against the server-provided menu JSON, not rendered HTML — menus are populated client-side in JS — converted to actionable bullets with WHY for each, preserving Wagtail-specific references
  - In menu tests, assert expected item URLs plus parent/child hierarchy and ordering, not just labels with `assertContains` — label-only checks miss structural regressions
  - Put menu tests in the existing `Test*Menus` class of the feature module (e.g. `wagtail/tests/test_{feature}.py`), not a new file/class — keeps related coverage colocated
  - Don't register menu items via `Menu`/`register_temporarily` in these tests — manual registration bypasses the `wagtail_hooks.py` hook logic (`modeladmin_register`/`add_to_admin_menu`) under test
<!-- rule:1598 -->
- **Feature JS assets**: assert injected `<script>` tags in the feature's existing view test class (e.g. `src == versioned_static(...)`) — colocated tests stay in sync and avoid new files or broad assertions in unrelated tests. — Colocating assertions with the feature's existing view tests keeps them discoverable and in sync, while a full-page skeleton test is required for head markup because the element's placement/value only makes sense in the assembled admin document.
  - **Template tags emitting into the admin skeleton/head** (e.g. `<meta>` tags): add a skeleton/base-template test that renders the full page and asserts the element with its full value — verifies the tag lands in the real document head, not an isolated fragment.
<!-- rule:279 -->
- Test page explorer reordering with both same-page-type and mixed-page-type parent/child hierarchies, and manually run the `sort_menu_order` flow in the admin UI — the resulting messages and actions differ per case, so tests alone can miss regressions — Same-page-type and mixed-page-type hierarchies exercise different code paths in the page explorer; the real sort-menu-order workflow surfaces messages and actions that unit tests may not replicate.
<!-- rule:3050 -->
- Verify cloned panel context boilerplate against base `Component`; unit-test any new template rendering — copy-paste drift silently breaks panel output — Copied context-setup often diverges from base `Component` semantics, and template rendering behavior added by a panel is easy to break without a dedicated test; both only surface at render time in the admin.
<!-- rule:2636 -->
- In `wagtail/admin/tests/test_contentstate.py` and related HTML conversion/paste tests, feed `ContentstateConverter` real browser/editor markup (e.g. `<br>` not `<br/>`, inline elements like `<br>` outside block tags) — Draftail's well-formed output hides legacy-editor bugs. — Real-world paste input diverges from Draftail's normalized output; testing only well-formed markup leaves conversion bugs undetected in production.
<!-- rule:179 -->
- Test Django widget HTML via `assertInHTML`, not raw strings — verify defaults, `attrs` overrides, `@override_settings`-driven `data-*` with `assertIn`/`assertNotIn`, and boolean attrs by presence/absence. Raw HTML equality breaks on benign formatting changes like attribute reordering or quoting; asserting the contract (per `wagtail/admin/tests/test_widgets.py`) keeps tests stable while still catching real regressions. — Django widget tests in `wagtail/admin/tests/test_widgets.py` (paired with `wagtail/admin/widgets/slug.py`) assert the rendered HTML contract rather than exact strings.

## Naming

<!-- rule:2471 -->
- Name API registration keys and fields in `snake_case`, mirroring the action class or method name — keeps the API self-documenting and consistent — Consistent naming makes the admin API predictable across endpoints, prevents redundant qualifiers from leaking into user-facing field names, and avoids the impedance mismatch when internal helpers diverge from the public terminology.
  - Drop qualifiers already implied by the action context (use `revision_id`, not `previous_revision_id`) — redundant prefixes leak implementation details into the public API
  - Reuse the same field name for equivalent parameters across related actions, and align internal helper params with the public API term — mismatched names force callers to translate between layers
<!-- rule:1560 -->
- Use `MOD`/`mod` (⌘ on macOS, `Ctrl` elsewhere) for keyboard shortcut modifiers in `wagtail/admin/` mappings and template tags — not `meta` or `CMD`; keeps shortcuts Mousetrap-compatible and cross-platform. — Mousetrap's own convention, so templates in `wagtail/admin/templates/wagtailadmin/` render the right modifier per OS without per-platform branching; `meta` and `CMD` would mislabel the key on non-macOS.
<!-- rule:3057 -->
- Name panel visibility/rendering booleans after their behavior (`is_visible`, `has_visible_children`, `show_panel_furniture`) — generic flags like `is_custom_rendered`/`is_shown_immediately` obscure intent and fragment terminology across `wagtail/admin/panels.py`. — The rule drives consistency of boolean predicate naming for panel visibility/rendering in wagtail admin code, avoiding generic flags that hurt readability and discoverability. It also discourages parallel predicates that risk divergent behavior. Scope is Wagtail-admin-specific (panel/object-list classes), not repo-wide.
  - Reuse existing visibility predicates rather than adding parallel methods — prevents divergent checks; disambiguate when a new state sits alongside an existing flag.
  Applies to Wagtail admin panel/object-list classes (e.g., `wagtail/admin/panels.py`).
<!-- rule:2560 -->
- ... — ...

## Error Handling

<!-- rule:1853 -->
- In conflict/overwrite warnings, link to the version history UI instead of surfacing raw revision or DB IDs — raw IDs leak internals and mean nothing to editors — The scope is `wagtail/admin/views` conflict/overwrite warning UI, where these warnings render directly to users; exposing internal identifiers is confusing and exposes implementation details, while the version history UI presents the same information in editor-friendly form. If a warning must show revision IDs, list every intervening revision between the conflicting endpoints — endpoint-only IDs hide the actual span of changes. When telling a user that newer revisions exist since a session's original revision, surface only the latest newer revision — listing all newer ones buries the signal the user needs to act on.
<!-- rule:2403 -->
- Catch and tolerate SQLite `database is locked` on non-critical autosave writes (e.g., Wagtail preview `FormState`) and continue the request; don't add locks or wrap read-then-writes in `transaction.atomic()` — a later autosave retries, so a dropped write isn't data loss, and these approaches only add fragility under SQLite's file-level locking without reducing contention. — Error handling for non-critical state persistence: swallowing `database is locked` on paths like Wagtail admin preview `FormState` avoids spurious failures, and avoiding `transaction.atomic()`/explicit locks prevents introducing fragility on top of SQLite's file-level locking.
<!-- rule:2215 -->
- Never gate actions on hidden form fields — tamperable client-side; validate server-side in the POST handler. In the Wagtail admin collection edit form, when a user lacks permission to move a collection, omit `parent` from the form and ignore any posted `parent` value server-side. Add a test in `wagtail/admin/tests/test_collections_views.py` that POSTs a different `parent` and asserts the collection's parent is unchanged — catches regressions where a form field is the only guard. — Hidden fields are attacker-controlled, so permission checks must live in the POST handler where they can't be bypassed by editing the request.

## Config

<!-- rule:2419 -->
- Register always-on rich-text features in every relevant ruleset (`contentstate` **and** `editorhtml`), mirroring neighbouring defaults like `register_core_features` entries — a missing ruleset silently drops the feature in one converter path. Keep optional/configurable features out of the default ruleset; register them conditionally via their config or hook instead, so they only activate when opted in. — Default features must work uniformly across all converters (`wagtail/admin/rich_text/converters/html_to_contentstate.py` and peers) or they appear broken/inconsistent depending on which ruleset is used. Optional features baked into defaults would force-enable behaviour for every project, breaking backward compatibility for sites that didn't opt in.
<!-- rule:2692 -->
- Nest `block_map` in `to_database_format`/`from_database_format` symmetrically for block features — a `code-block` feature registers `<pre><code>...</code></pre>`, not a bare `<code>` element. Asymmetric nesting silently drops or duplicates wrappers on the DB round-trip. — Symmetric nesting keeps `block_map` round-trips lossless; mismatched shapes silently drop/duplicate wrappers.
<!-- rule:2634 -->
- Pre-initialize all optional exporter sections to empty collections before the feature loop in exporter config assembly, then merge/extend per feature — hard-coding a subset drops sections when features are added — Assembling exporter config in `wagtail/admin/` from feature converter rules: init `block_map`, `style_map`, `entity_decorators`, `composite_decorators` (and peers) as empty collections before iterating features, then `.update()`/`.extend()` each relevant section inside the loop. Hard-coding a fixed subset silently drops sections that future features introduce, breaking round-trip export for those features.

## General

<!-- rule:177 -->
- Keep compatibility globals like `window.unicodeSlugsEnabled` in `wagtail/admin` until slug/URLify refactor lands — removing early breaks un-migrated templates/JS; defer cleanup to follow-up work. — Deprecation sequencing rule for Wagtail admin editor compatibility globals; scoped to `wagtail/admin` template + JS code.

## File-Specific Rules

### `wagtail/admin/active_filters.py`

<!-- rule:2143 -->
- In `wagtail/admin/active_filters.py`, register default adapters for `Filter` subclasses whose display is known, and reuse existing adapters — duplicated render logic drifts and new subclasses risk silently mis-rendering. For `Filter` types with dynamic `field_class` or ambiguous rendering, add dynamic adapter selection or leave them unregistered; guessing renders wrong labels to users. — Prevents silent mis-rendering for `Filter` subclasses with dynamic `field_class`, and avoids divergent rendering logic across duplicated adapters.

### `wagtail/admin/compare.py`

<!-- rule:1652 -->
- Make `StructBlockComparison` in `wagtail/admin/compare.py` block-type-aware — recurse into nested `StructBlock`s (including custom templates) with block-type-specific comparison instead of HTML/template fallback; HTML rendering loses field-level diffs. — Structural comparison keeps nested field changes visible and diffable; falling back to rendered HTML hides which field changed and breaks custom-template blocks.
<!-- rule:1653 -->
- In `wagtail/admin/compare.py`, route every block-comparison diff through the comparison class's `htmldiff()` (covering added/deleted/changed/unchanged) instead of duplicating diff logic or calling `block.render_basic()` directly — keeps rendering consistent across all comparison states. — Centralizing on `htmldiff()` prevents divergent rendering between comparison states and avoids duplicating diff logic in each subclass.

### `wagtail/admin/edit_handlers.py`

<!-- rule:2695 -->
- In `EditHandler.get_comparison_class`, branch on field config (e.g. `choices`), not just field type — `choices` fields must hit the `ChoiceFieldComparison` branch before the generic `CharField`/`TextField` fallthrough, which routes them to `TextFieldComparison` and loses choice-specific diffing. Don't re-check `choices` inside the `CharField`/`TextField` branch; the earlier specialized branch already owns that case, so duplicating it splits the routing logic in two places that can drift. — Choices-aware fields need `ChoiceFieldComparison` to render meaningful diffs; letting them fall through to `TextFieldComparison` silently degrades the comparison UI. A single, ordered branch keeps the selection logic in one place, avoiding drift between duplicated checks.

### `wagtail/admin/filters.py`

<!-- rule:2778 -->
- `FilteredSelect`/`FilteredModelChoiceField` accessors (e.g. `filter_accessor`) accept a string attribute name **or** a callable `(instance) -> value/queryset` — callables enable per-instance filtering without subclassing — Placed at file scope for `wagtail/admin/filters.py` so an assistant editing `FilteredSelect`, `FilteredModelChoiceField`, or `get_filter_value` finds the accessor contract immediately. The dual string-or-callable signature and the normalization order in `get_filter_value` are the two details most likely to be missed when touching these classes.
  - `get_filter_value` must invoke callable accessors with the instance before normalizing the returned queryset to IDs — otherwise callable accessors silently break
<!-- rule:2779 -->
- Document `FilteredSelect`/`FilteredModelChoiceField` usage in `wagtail/admin/filters.py` — Covers `filter_field`, `filter_accessor`, and the `data-filter-field`/`data-filter-value` contract — this Python↔JS coupling breaks silently when either side changes without docs.

### `wagtail/admin/paginator.py`

<!-- rule:2015 -->
- Expose pagination limits as class attributes on `Paginator`, not inline magic numbers — subclasses can override them and page counts stay manageable — Hardcoded page sizes and button/ellipsis limits in `wagtail/admin/paginator.py` can't be tuned per-view, forcing subclasses to fork logic and making large result sets awkward to display. Named class attributes on `Paginator` give callers a single override point and keep rendering decisions localized to the class that owns them.

### `wagtail/admin/panels.py`

<!-- rule:3044 -->
- Replacing a user-defined panel with hard-coded view rendering in `wagtail/admin/panels.py`: give the new implementation a different class name and keep the legacy panel class as an always-hidden no-op — deleting it breaks user subclasses/references that still resolve to it. — Preserves backward compatibility for user code referencing the old panel class while avoiding duplicate definitions/rendering when the built-in is hard-coded into the view.

<!-- /braindump -->