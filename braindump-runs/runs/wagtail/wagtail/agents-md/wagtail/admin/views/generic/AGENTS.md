<!-- braindump: rules extracted from PR review patterns -->

# wagtail/admin/views/generic/ Guidelines

## API Design

<!-- rule:1590 -->
- Resolve objects in generic model views (`EditView`, `DeleteView`) via a configurable lookup field / URL kwarg (Django-style `pk_url_kwarg` / `slug_url_kwarg`) instead of hard-coding `id` or `pk`. Default the lookup field to `id` — avoids `_meta` resolution overhead per request. Subclasses (e.g. a `CustomUser` with no `id`) should set their own kwarg rather than overriding `get_object()` or URL-building methods, so URL construction stays centralized. — keeps object resolution consistent across `wagtail/admin/views/generic/` subclasses and lets models without an `id` field reuse the same base views without patching `get_object()`.
<!-- rule:1867 -->
- In `wagtail/admin/views/generic` CBV mixins, use `cached_property` for optional/derived state instead of eager `setup()`/`setup_*()` initialization — lazy computation avoids doing work on requests that never touch the attribute; reserve eager init for state needed early in the request flow. — Mixins are composed into many concrete views; not all of them need every piece of derived state, so computing it only on access keeps the request path lean and avoids coupling mixins to setup ordering.
<!-- rule:1487 -->
- `get_*_url` helpers (`get_add_url`, `get_edit_url`, `get_inspect_url`) return `None` when the target view is disabled or permission is missing — lets callers chain fallbacks like `if edit_url := self.get_edit_url(instance): ...` — Module-scoped to `wagtail/admin/views/generic/models.py`. Preserves project-specific identifiers, clarifies the API contract, avoids `ImproperlyConfigured` misuse, and ties tests to the `None` behavior.
  - Preserve a `None` from `super()` — early-return before URL-modifying helpers (query-string utils) so you never transform a non-existent URL
  - Raise `ImproperlyConfigured` only when the `*_url_name` config is missing and no fallback exists — avoids masking disabled-view cases as config errors
  - When relying on the `None` return (fallback chain, disabled view), add/update a test using a viewset where that view is not enabled, with a comment explaining the disabled-view context — documents intent for future readers
<!-- rule:1031 -->
- In `wagtail/admin/views/generic` listing views, expose empty-state messages as overridable methods like `no_results_message` — subclasses can customize without forking templates. — Template-only customization forces every subclass to duplicate or fork the listing template just to change one string, so method hooks keep the view API extensible and templates reusable.

## General

<!-- rule:2078 -->
- In reordering views (e.g. `wagtail/admin/views/generic/ordering.py`), persist `sort_order` whenever `current_sort_order is None` even if the target position matches — otherwise a nullable field never initializes. — Explicit initialization + dedup keeps nullable `sort_order` fields consistent and avoids tie-breaking bugs in ordering views.
  - Assign concrete `sort_order` values to items with null `sort_order` on every reorder — two nulls can otherwise collide at the same position.

## File-Specific Rules

### `wagtail/admin/views/generic/chooser.py`

<!-- rule:2026 -->
- In generic chooser views (`wagtail/admin/views/generic/chooser.py`), when `get_results_page()` already calls `self.get_results()`, reuse that result in `get_context_data()` rather than calling `self.get_results()` again — avoids redundant DB queries and `assertNumQueries` test failures. — Preserves the precise method pair and file path an assistant needs to locate the pattern, while the WHY (redundant queries → `assertNumQueries` failures) makes the tradeoff concrete enough to apply the rule to analogous cases.

### `wagtail/admin/views/generic/mixins.py`

<!-- rule:2349 -->
- In `wagtail/admin/views/generic/mixins.py`, comments above the `form_invalid()` / cancel-workflow branch must enumerate every reason the form may be invalid — validation errors and a lock — not just one cause (`locked`/permission) or the action that triggered it. — Understating the branch misleads future edits: an assistant reading only one cause may "fix" validation handling into an assumption that the path is lock-only, breaking the other cases.

<!-- /braindump -->