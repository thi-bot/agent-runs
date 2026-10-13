<!-- braindump: rules extracted from PR review patterns -->

# wagtail/models/ Guidelines

## API Design

<!-- rule:848 -->
- Guard subclass-specific attribute access (e.g., `.specific`) on polymorphic content objects with `isinstance()` — prevents `AttributeError` when the object isn't the expected subtype. — Content objects are polymorphic; assuming the subtype causes runtime crashes.
<!-- rule:2145 -->
- Expose a `GenericRelation` for ORM filtering/`prefetch_related` only; otherwise keep it private via no `related_query_name`, or prefix the field with `_` if it collides — preserves the public query API while letting subclasses opt in. — A public `GenericRelation` leaks into the model's query API and can shadow existing fields; keeping internal ones private (no `related_query_name`, or `_`-prefixed) avoids breaking query compatibility for subclasses and downstream users who reference the public fields.
<!-- rule:2355 -->
- Resolve nested fields from each related model's `_meta` (e.g. `child_field.related_model._meta`) when recursively traversing Django relations — reusing the root model's `_meta` yields wrong field lookups at depth 2+ — Correctness: each hop in a relation path lives on a different model, so field metadata must come from that hop's model.
<!-- rule:2754 -->
- Separate protected-field defaults from the public override in copy APIs: keep a default exclusion list (e.g. `latest_revision`) distinct from the user-configurable `exclude_fields_in_copy`, and merge defaults + instance override + caller-supplied exclusions before copying — keeps internal fields protected while letting callers tune behavior without breaking the contract. — Copy APIs (e.g. `RevisionMixin`, `Page`) expose both protected-field defaults and a user override; conflating them silently breaks caller overrides or leaks internal fields, and merging all three at copy time gives predictable precedence. Document how the default list and instance override combine so callers know what wins. Mirror the analogous public field name (e.g. `Page`'s `default_exclude_fields_in_copy`) on sibling mixins rather than a private `_`-prefixed name, so users discover the override via the same pattern across classes in `wagtail/models/i18n.py` and `wagtail/models/__init__.py`.

## File-Specific Rules

### `wagtail/models/__init__.py`

<!-- rule:2128 -->
- Re-export `WorkflowManager` in `wagtail/models/__init__.py` — so `from wagtail.models import WorkflowManager` keeps working for downstream projects that subclass it for custom `AbstractWorkflow` implementations

### `wagtail/models/i18n.py`

<!-- rule:1327 -->
- In `TranslatableQuerySetMixin.localized()` (`wagtail/models/i18n.py`) with `preserve_order=True`, skip the `original_order` annotation and `.order_by("original_order")` when `original_translation_keys` is empty — an empty list yields an invalid annotation, so return the localized queryset early instead. — Prevents an invalid `original_order` annotation / `order_by` when the key list is empty.
<!-- rule:3087 -->
- In `wagtail/models/i18n.py` translation-copy flows, resolve the source with `get_latest_revision_as_object()` when it's a `DraftStateMixin`, then copy via `_copy(object, exclude_fields=exclude_fields)` — manual child-locale copies drift from live draft state and miss fields the helper handles. — Preserves the internal `_copy` contract and draft-aware copying so translations reflect the current revision and stay in sync with future field additions.
<!-- rule:1326 -->
- Make `TranslatableQuerySetMixin.localized()` semantic changes explicit parameters with conservative defaults — reusing `live=True` to silently include drafts surprises callers. — Query filters like `live=True` describe publication state, not translation visibility. Inferring new behavior from existing filters silently changes results for code that never opted in, breaking backward compatibility and making the behavior undiscoverable at the call site. An explicit parameter with a conservative default keeps existing queries unchanged and surfaces the new behavior where it's used.

### `wagtail/models/reference_index.py`

<!-- rule:2335 -->
- Apply parent-chain fixes to every sibling `describe_*` method on `ReferenceIndex` (e.g. `describe_source_field()`, `describe_on_delete()`) — a partial fix leaves the others resolving the first parent instead of the correct one, giving inconsistent results across related attributes. — ...

<!-- /braindump -->