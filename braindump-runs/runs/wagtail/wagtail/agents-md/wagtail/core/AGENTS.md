<!-- braindump: rules extracted from PR review patterns -->

# wagtail/core/ Guidelines

## API Design

<!-- rule:2915 -->
- Keep workflow-state querying out of `Page`'s public API: expose public states via `WorkflowMixin.workflow_states`, put prefetch/annotation helpers (`prefetch_workflow_states`, `annotate_approved_schedule`, `annotate_site_root_state`) on `PageQuerySet`, back prefetching with an internal `_workflow_states` `GenericRelation` instead of redefining `workflow_states` per backend, and guard workflow prefetches behind `WAGTAIL_WORKFLOW_ENABLED` — keeps the public `Page` API backend-agnostic and stable while letting `PageQuerySet` optimize queries. — Separating public state access (`WorkflowMixin.workflow_states`) from query optimization (`PageQuerySet` helpers + internal `_workflow_states` relation) prevents backend-specific queries from leaking into the public `Page` surface, which would break compatibility and duplicate logic across database backends. Gating on `WAGTAIL_WORKFLOW_ENABLED` avoids broken prefetches when workflows are disabled.
<!-- rule:2412 -->
- In StreamField helpers (`blocks_by_type`, `blocks_of_type`, `first_block_of_type`, `collectors.py`), branch on the runtime value type, not the declared block definition — declared types miss dynamically-inserted blocks such as `RawHTMLBlock` inside rich text fields. — Scope tag, category, and placement rationale preserved as-is.
  - Return block objects (not `.value`) from these helpers — callers need the block instance to honor custom templates and block-level behavior.
  - Use `child_blocks` / block-definition checks only to recurse structurally through `StructBlock` and `StreamBlock` children.
  - Prepopulate aggregation mappings with an empty collection for every type in `stream_block.child_blocks`, even when the stream contains no matching blocks — keeps the result shape stable and avoids missing-key handling in callers.
<!-- rule:2794 -->
- Explicitly allow `user.is_superuser` in permission checks like `user_can_access_editor` — superusers bypass group checks by design, so omitting this silently locks them out of the Wagtail editor. — Preserves `wagtail/core/models.py` permission semantics; superusers are expected to have universal access, and group-membership-only checks break that contract.
<!-- rule:2959 -->
- Have `check()` in action classes validate relational args belong to the primary target (e.g., `self.revision in self.page.revisions`) and raise the action-specific error (e.g., `RevertToPageRevisionError`) — rejects miswired callers before mutation — Prevents silent misuse of actions with mismatched object pairs; the action-specific error preserves a clear, catchable contract for callers.
<!-- rule:2421 -->
- Return `get_form_state` values in the shape the client-side component expects by delegating to the widget's Django `format_value` at base `FieldBlock` (`wagtail/core/blocks/field_block.py`) — centralizes conversion and avoids returning raw stored values or reimplementing it per block. — Two bullets work best here because the rule has a main directive plus a subtle ordering caveat:

- **Bullet 1** captures the primary design principle — centralize conversion via `format_value` on `FieldBlock`, never return raw DB values. Preserving the class name and file path makes it immediately actionable.

- **Bullet 2** captures the non-obvious caveat: `format_value` operates on the canonical stored value, so `block.value_for_form` must be applied first. Without this, developers will pass the already-rendered front-end value and hit subtle bugs.

Splitting keeps each bullet scannable (the rule fits under 200 chars excluding rationale) while preserving project-specific anchors (`get_form_state`, `format_value`, `FieldBlock`, `wagtail/core/blocks/field_block.py`, `value_for_form`) that generic phrasing would lose.

## Error Handling

<!-- rule:193 -->
- In custom block `ValidationError` subclasses (e.g. `StreamBlockValidationError`, `ListBlockValidationError`), expose each error group as a named attribute (`self.block_errors`, `self.non_block_errors`) instead of packing them into `ValidationError.params`, and default those fields in the constructor (e.g. to `ErrorList()`). — Lets callers and subclasses construct errors without knowing serialization conventions, and keeps the telepath adapter working.
<!-- rule:2951 -->
- Reject unhonorable overrides in `wagtail/core/actions/` with `CreatePageAliasIntegrityError`/`CreatePageIntegrityError` instead of letting save logic silently override — silent parent-derived overrides mask caller bugs. — Page-tree actions like `CreatePageAliasAction` accept option overrides for values the model derives from the parent (e.g., `update_locale` on non-root pages). Validating the combination upfront and raising a domain-specific integrity exception makes the failure explicit and diagnosable; silently substituting the parent-derived value lets callers believe their override took effect when it didn't.

## General

<!-- rule:2897 -->
- Name locale-organization modules/namespaces `i18n` (e.g., `wagtail/core/models/i18n.py`), reserving `translation` for code that actually translates content (`wagtail-localize`, `wagtail.contrib.simple_translation`) — keeps the two concerns distinguishable; update all imports/usages when renaming. — The original rule is already fairly close to the desired form, but the phrasing "name modules and namespaces... and reserve..." is a bit long and the WHY (distinguishing locale organization from actual translation) is implicit. I made the distinction explicit so the reader understands the purpose, kept the concrete file paths, kept the project-specific references, and upgraded the renaming clause with a semicolon to keep it within the rule's main line. Backticks added to the identifiers and modules. Under ~180 chars total, main rule fits one bullet.
<!-- rule:2665 -->
- Test nested `StreamBlock`/`ListBlock`/`StructBlock` paths in `wagtail/core/collectors.py` — flat structures miss path-alignment and wrapper-unwrapping bugs — Nested blocks (e.g. `StreamBlock` inside `StreamBlock`) exercise path alignment and wrapper unwrapping that flat/top-level cases never trigger, so bugs in those code paths ship undetected.

## File-Specific Rules

### `wagtail/core/collectors.py`

<!-- rule:2669 -->
- In `wagtail/core/collectors.py`, document each collector method's contract (inputs, yields, recursion) and delete unused helper state (attributes, ctor params, recursive args). — Collectors recurse and share mutable bookkeeping across subclasses, so undocumented assumptions and leftover state cause subtle traversal bugs.
<!-- rule:2663 -->
- In recursive traversals that thread a parent/context variable across iterations (e.g. `parent_use` in `Use.from_nested_list` in `wagtail/core/collectors.py`), explicitly reset that variable to `None` in branches where the current item must not become the parent of later items — guards against stale state leaking when `NestedObjects.nested()` ordering or other undocumented input invariants can't be relied on — Preserves project-specific references: `wagtail/core/collectors.py`, `Use.from_nested_list`, `parent_use`, and the Django `NestedObjects.nested()` dependency. Imperative mood, single bullet, rationale tied to concrete bug class (stale parent leakage) rather than abstract correctness.
<!-- rule:2664 -->
- In `StreamFieldCollector.find_values` (`wagtail/core/collectors.py`), advance `block_path` exactly once per logical block level — when both the `StreamValue` and `StreamChild` wrappers represent the same `StreamBlock`, let only one consume the path entry (keep the current value mapped to `block_path[0]` or to the block already consumed upstream). Duplicate pops desynchronize paths from blocks and return the wrong nested block. — Single-consumption invariant prevents path/block desync in recursive StreamField traversal.

### `wagtail/core/fields.py`

<!-- rule:403 -->
- In `StreamField.__init__` (`wagtail/fields.py`), require `BaseStreamBlock` for a pre-built top-level block and pass `block_opts` into `StreamBlock(block_types, **block_opts)` — rejecting arbitrary `Block` instances and avoiding `self.stream_block.set_meta_options(block_opts)` makes unsupported options fail fast with `TypeError` instead of silently at runtime — Constructor-time validation catches invalid `block_opts` and mis-typed top-level blocks immediately, so misconfigurations surface at definition time rather than during StreamField evaluation.

### `wagtail/core/models.py`

<!-- rule:2610 -->
- Route cache keys through a shared helper in `wagtail/core/models.py` — avoids cache misses from inline formats drifting between call sites — Consolidating key construction (e.g. `"{hostname}:{port}"`) into one helper ensures every read/write site uses the same format; ad-hoc inline strings drift and silently break cache lookups.

<!-- /braindump -->