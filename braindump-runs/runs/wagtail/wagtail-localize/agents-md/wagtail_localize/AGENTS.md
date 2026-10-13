<!-- braindump: rules extracted from PR review patterns -->

# wagtail_localize/ Guidelines

## Testing

<!-- rule:49 -->
- Mock `requests.post`, not `translate()`, in `wagtail_localize/machine_translators/tests/` — testing at the HTTP boundary still exercises endpoint selection by auth key, `StringValue(translated_text)` dict returns, and error-status raises; stubbing `translate()` skips all of that. — Asserting on public `translate()` behavior after mocking the HTTP call verifies the translator's real logic — which endpoint each auth key selects, the `{source: StringValue(translated)}` mapping, and raising on error HTTP statuses — none of which a mocked `translate()` would catch.
<!-- rule:53 -->
- Use `model.objects.create(**kwargs)` inside test helpers — persists in one call and avoids a stray `save()` — The helper is the single source of model setup in `wagtail_localize/tests`, so model changes ripple through one place instead of every `setUp` and test body.
  - Name helper params that take a model instance `instance` or `object`, never `model` — `model` reads as a class, inviting misuse like `model.objects.create` on an instance
  - Keep model setup in the helper only — duplicating dependent state in `setUp` or test bodies drifts from the factory and breaks unrelated tests when the model changes
<!-- rule:7 -->
- Add a `test_language_code` in each `test_{translator}_translator.py` under `wagtail_localize/machine_translators/`. — The rule targets the machine-translator test suite, where each translator implements its own `language_code()` normalization against multi-segment locales. Bare-code fixtures don't exercise the reduction path, so without a dedicated per-translator `test_language_code` a broken normalization ships silently to every provider sharing that code.
  - Assert `language_code()` reduces `'fr-fr'` → `'fr'` and `'foo-bar-baz'` → `'foo'` — catches normalization regressions per translator.
  - Use region-specific locale fixtures (e.g., `'fr-fr'`) over bare codes (e.g., `'fr'`) — bare codes skip the normalization code path, leaving the test vacuous.
<!-- rule:42 -->
- In test models (e.g. `wagtail_localize/test/models.py`), define models with only the fields, `translatable_fields`, and `panels` the test exercises, and skip `@register_snippet` / `ClusterableModel` unless the test is specifically about snippet admin behavior — otherwise use a plain `TranslatableMixin` model. — Minimal test models keep assertions focused on the behavior under test and avoid snippet registration side effects (URLs, admin views, extra DB tables) leaking into unrelated tests. Use `@register_snippet`/`ClusterableModel` only when snippet admin behavior is what you're verifying.
<!-- rule:89 -->
- Rule text: In translation publishing tests, mirror the Snippet publish/draft tests against the equivalent Page tests (both go through Translation.save_target()), and assert the logged revision equals the object's live_revision (e.g., assertEqual(log.revision, obj.live_revision)) rather than only asserting that TranslationLog.page_revision is a Revision instance. — Keep `Snippet` and `Page` publish/draft coverage symmetric in `wagtail_localize/tests/test_edit_translation.py` and `test_translation_model.py`: both paths funnel through `Translation.save_target()`, so a gap on one side silently hides regressions in the other. And compare `log.revision` to `obj.live_revision` rather than only checking `TranslationLog.page_revision` is a `Revision` — a type check passes even when the log points at a different or stale revision, which is exactly the bug these tests exist to catch.
  Category: testing
  Scope: module
  Placement rationale: The rule prescribes a testing convention that applies to the translation publishing test suite specifically — both cited source files (test_edit_translation.py, test_translation_model.py) live under wagtail_localize/tests/. It governs how tests in that module should be structured (mirroring Snippet vs Page publish/draft tests around Translation.save_target() and asserting log.revision == obj.live_revision). It is not a global repo-wide behavioral rule, nor is it tied to a single file or a specif
  Example of bad code: None
  Example of good code: None

## API Design

<!-- rule:62 -->
- Use `.specific` on `Page.objects` queries only when downstream code touches page-type-specific fields, methods, overrides, logging, alias conversion, or translations — `.specific` forces a per-page subclass lookup — Base `Page` instances silently lack subclass fields/methods, so omitting `.specific` breaks that logic; adding it to base-only flows like `get_children()` adds N extra queries for nothing. Pick the same choice for every related lookup in a flow or callers get mixed instance types.
<!-- rule:77 -->
- Don't add `next` to action links when the target admin view computes a contextual success URL — an unnecessary `next` overrides and masks its default redirect, making the intended destination unreachable. If an override is needed, pass contextual data via `get_default_success_url(object)` and reserve `get_success_url()` for explicit `next` handling. — In `wagtail_localize` class-based admin views, the view already derives the right success URL from context; injecting `next` short-circuits that logic so users land on the wrong page.
<!-- rule:100 -->
- Keep shared `apply` helpers mutation-only: take explicit deps (`translation_id`, `user`, `translator`), never request context or permission/validation/side-effect logic. — Keeps the helper testable and reusable — hidden request-context reads and embedded checks silently bind it to one entry point, so other callers inherit permissions they never asked for.
<!-- rule:44 -->
- Set `should_save = True` for every scalar field mutation in `should_save`-accumulating sync/update methods — a single trailing `.save()` silently drops unmarked changes. Relation changes via manager calls (`.set()`, `.add()`) persist immediately and need no flag. — In `wagtail_localize/models.py` sync/update methods that batch field changes behind one `should_save` guard before calling `.save()` once, an unmarked scalar assignment is never persisted. M2M managers write through independently, so flagging them is redundant — distinguish the two to avoid both silent data loss and pointless saves.

## Code Style

<!-- rule:12 -->
- Use an order-preserving collection (list or dict) instead of `set()` in export/serialization code that feeds ordered output (e.g., `export_po` message entries) — `set` iteration order is not guaranteed, so generated output would be nondeterministic — Set iteration order is not guaranteed, so using a set to collect entries for `export_po` and other serializers produces nondeterministic output; order-preserving collections keep exports stable and diffable.
<!-- rule:84 -->
- Remove ad-hoc decorative indicators (e.g. arrows in colored label/badge boxes) when aligning `wagtail_localize` UI components with the shared design system (e.g. Wagtail 4.0) — restyling them in place diverges from the design system's visuals and adds upkeep. — The design system already supplies label/badge styling; keeping ad-hoc indicators alive by tweaking dimensions or colors leaves the UI inconsistent with the rest of `wagtail_localize` and creates extra markup to maintain or migrate later.
<!-- rule:0 -->
- Search `common/components/` for an existing UI action component before adding a new one — reuse it or extract a single generic (e.g. `ActionMenuButtonAction`). Per-location variants like `Header*Action` or `ActionMenu*Action` with no distinct behavior duplicate logic and drift out of sync as the UI evolves. — Per-location variants like `Header*Action` or `ActionMenu*Action` add no distinct behavior and duplicate logic, so they drift out of sync and multiply maintenance surface as the UI evolves. Centralizing in `common/components/` keeps behavior consistent.

## General

<!-- rule:29 -->
- Strip unneeded `dependencies` from test app migrations — cross-app deps like `wagtailcore` couple test DB setup to application migration order, causing failures — Generated migrations under a test app's `migrations/` directory (e.g. `wagtail_localize/test/migrations/`) often pick up `dependencies` entries that aren't required by the test models. Cross-app entries such as `wagtailcore` tie the test database setup to the migration ordering of the real application, which can break tests. Remove deps unless the test models genuinely need them.
<!-- rule:21 -->
- PO import: never fall back to `entry.msgid` when `entry.msgstr` is empty — an untranslated msgid imported as translated silently marks source text as translated, breaking locale correctness and downstream sync in `wagtail_localize`. — When `entry.msgstr` is empty, substituting `entry.msgid` stores the source string as a translation. This corrupts the PO import in `wagtail_localize/management/commands/import_po.py`, producing false 'translated' states that hide missing translations and break later syncs.

## File-Specific Rules

### `wagtail_localize/machine_translators/deepl.py`

<!-- rule:92 -->
- In `wagtail_localize/machine_translators/deepl.py`, restrict `FORMALITY` to `'default'`, `'prefer_less'`, `'prefer_more'` — raise `ValueError` on anything else rather than silently dropping it — These are the only values DeepL supports across all locales; silently ignoring an unsupported value hides misconfiguration from callers and produces translations with unexpected formality.

### `wagtail_localize/models.py`

<!-- rule:71 -->
- Keep content paths (block IDs) and field paths (block type names) separate in `wagtail_localize/models.py` — never assign field-path components to a content-path variable, since mixing them misidentifies positions when recursing into nested `StreamBlock`s. — Content paths and field paths intentionally use different component vocabularies: content paths index into an instance's blocks via block IDs, while field paths index into the data model via block type names. Swapping them (e.g. threading a field-path component into a content-path variable during recursion) produces lookups against the wrong namespace and only surfaces as a bug once StreamBlocks nest.
  - Recurse StreamField paths in `wagtail_localize/models.py` with the full remaining component list, not a depth-truncated slice — truncation silently drops nested `StreamBlock` levels.

### `wagtail_localize/signals.py`

<!-- rule:72 -->
- Name signals in `wagtail_localize/signals.py` with a `locale_` prefix (e.g., `locale_activated`) — matches the `locale` argument they pass and the domain's terminology, avoiding misleading `language_` names. — Signal names carry a `locale` payload, so a `locale_` prefix keeps the name, argument, and surrounding domain language aligned — renaming to `language_` would imply a different concept and confuse subscribers.

### `wagtail_localize/strings.py`

<!-- rule:18 -->
- In `wagtail_localize/strings.py`, name validation functions after their full scope (e.g., inline tag IDs, not just links); rename them when scope broadens — stale names lead callers to misjudge what's actually validated. — Validation functions in `wagtail_localize/strings.py` often start narrow (e.g., link validation) and grow to cover broader concerns like all inline tags or attributes. Keeping the name aligned with the real scope keeps callers from assuming the function checks less (or more) than it does.
<!-- rule:9 -->
- In `wagtail_localize/strings.py`, scan **all** attributed inline tags (including custom ones), not just `<a>` — normalization assigns an `id` to any attributed tag, so rejecting non-`id` attributes wrongly drops valid custom inline tags — Inline tag normalization in `wagtail_localize/strings.py` assigns an `id` to every attributed inline tag, including custom tags beyond `<a>`. Hard-coding `<a>`-only validation (or `<a>`-specific error messages) causes valid custom inline tags to be rejected and produces misleading errors when a non-`<a>` tag fails validation. Scanning all attributed tags and using generic messages keeps custom inline tags working and errors accurate.
  - Phrase inline tag errors generically (e.g. `Unrecognised id: {}`) rather than hard-coding `<a>` — the check applies to custom tags too, so tag-specific wording is misleading
  - Don't add redundant validation for attributes that aren't `id` on `<a>` — such checks reject valid custom inline tags instead of catching real errors

### `wagtail_localize/views/edit_translation.py`

<!-- rule:104 -->
- When adding a chooser/block mapping in `widget_from_block()`, mirror it in `widget_from_field()` for direct `ForeignKey` fields on the same model — e.g. a media FK must also map to `media_chooser`, so block and field paths resolve to the same widget type. — The two functions are parallel entry points into widget resolution for the same model, so an update to one without the other silently produces inconsistent editor widgets depending on whether the value came from a block or a plain field.

<!-- /braindump -->