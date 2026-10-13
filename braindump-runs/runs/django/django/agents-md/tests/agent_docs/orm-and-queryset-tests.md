# ORM and QuerySet Tests

> Exercise models, relations, expressions, composite keys, bulk operations, mutation APIs, and QuerySet compilation using public ORM APIs.

**When to check**: When testing ORM behavior, model relations, expressions, composite keys, bulk operations, or related managers.

## Rules

<!-- rule:3442 -->
- Prefer `bulk_update` over repeated `.update()` calls in tests — exercises the same codepath as real bulk updates. — Test code in `tests/` should mirror how bulk updates actually run in production. Repeated `.update()` calls hide bugs that only surface in bulk paths, and assigning the same literal to a unique field across multiple rows raises spurious `IntegrityError`s instead of testing the behavior under test. Applying expressions via a full-model queryset update (`Model.objects.update(...)`) keeps the test faithful to real bulk-update usage.
  - Set unique fields per-row with `F()` expressions applied through a full-model `Model.objects.update(field=Expression())` — repeated literals collide on unique constraints and skip the bulk-update handling these tests exist to cover.
<!-- rule:4090 -->
- Set up multi-table inheritance fixtures by instantiating the most-derived model and traversing the relation chain — mirrors how the ORM actually writes to each split table — Multi-table inheritance splits each subclass into its own DB table joined by a `OneToOneField`. Tests that only check the derived model miss the parent rows that callers and migrations depend on; fixtures built bottom-up keep the traversal path aligned with real ORM writes, and adding minimal subclasses avoids proliferating hierarchies that fragment coverage across the `tests/model_inheritance*` suites.
  Assert post-operation state on every model in the inheritance chain — catches drift between parent and child table rows that the derived-only view hides
  Extend inheritance coverage with minimal subclasses rather than new top-level hierarchies — reuses existing fixtures and assertions instead of duplicating setup
<!-- rule:2859 -->
- Test expressions via real public concrete types (`Func()` subclasses, `F`, existing expression classes) and the public API that consumes them, covering `Value` wrappers alongside literals — internal mixins like `Combinable`, single-property test-only subclasses, and unrelated constructs like `Subquery` don't exercise real usage and hide regressions that public types would catch. — Internal mixins and test-only subclasses don't reflect how expressions are actually consumed, so they can pass while real public types break.
<!-- rule:1253 -->
- In Django ORM relation tests (`select_related`, related managers, composite PK/`ForeignObject` models, `null_fk`), always include nullable FK/relation cases with NULL parents/targets at multiple levels — set `null=True` on the composite `ForeignObject` and participating source fields when nullable, then assert NULL-relation rows survive using counts/`select_related`; when covering batching, include more than one non-null related object so the batching path is actually exercised. — NULL relations are a common source of bugs (rows silently dropped, batching short-circuited), so exercising them in ORM tests catches regressions before they ship.
<!-- rule:5303 -->
- Cover grouped (nested) choices, overridden choice sets, and reverse-relation `limit_choices_to` (double-underscore) filters in choice-field and `get_choices` tests — each hits a distinct code path, and repeating the same override path adds maintenance cost without coverage gain — ...
  Only test here under `tests/`; conversely, don't rely on such helpers as model fields in production code without checking actual choice exposure.'
<!-- rule:4089 -->
- In `tests/` multi-table inheritance models, restate the parent's PK field and copy `Meta` options like `required_db_features` onto the child — Django doesn't auto-inherit the PK or `Meta` in MTI, so children silently lose test constraints like `required_db_features` and exercise the wrong DB configuration.
<!-- rule:4676 -->
- Test `F()` refs on composite/tuple-key columns (e.g., `F("pk")`, `F("<composite_alias>__pk")`) resolve to `ColPairs` and compile through joins — otherwise they're silently treated as scalar `col` and break tuple lookups — Guards composite-key and tuple-lookup regressions across `tests/composite_field/test_composite_field.py` and `tests/foreign_object/test_tuple_lookups.py`: `F()` on a composite column must produce a `ColPairs`, not a scalar `col`, or joins on composite keys quietly mis-resolve.
<!-- rule:1961 -->
- Use `.set([...])` rather than repeated `.add()` in M2M test setup — avoids duplicate rows and unique-constraint `IntegrityError`s. — Calling `.add()` twice for the same object re-inserts into the join table, tripping its unique constraint in some databases/versions; `.set()` replaces the relation atomically so tests stay deterministic and DB-agnostic.
<!-- rule:5832 -->
- Place query-composition tests in the thematically matching class in `tests/queries` or `tests/constraints` — keeps coverage discoverable and parallel to the SQL layer — Mirrors the production module structure so contributors find the right suite without guessing; cross-cutting queries land next to their constraints instead of being scattered.
<!-- rule:2085 -->
- Test non-concrete field paths (`_get_field_expression_map`, `_prepare_related_fields_for_save()`) with `GenericForeignKey` (and `ManyToManyField` when available) fixtures. — Non-concrete fields (`GenericForeignKey`, `ManyToManyField`) exercise `_get_field_expression_map` and `_prepare_related_fields_for_save()` differently from concrete fields; using them as the fixture case catches the class of bugs concrete-field tests miss. The dedicated `test_save_generic_foreign_key_after_parent` pins the known save-after-parent regression so it can't silently return.
  - **Why:** these are the non-concrete field types that exercise the machinery most realistically.
  - **Cover the save-after-parent case:** include a dedicated `test_save_generic_foreign_key_after_parent` test — guards the known regression where a `GenericForeignKey` is saved after its parent object.
<!-- rule:4564 -->
- In `tests/admin_views/admin.py`, soft-delete models use a `deleted` boolean, a default manager filtering `deleted=False`, and an unfiltered `all_objects` — tests flag rows active/deleted so they don't depend on hardcoded PKs, and admin/queryset overrides can still reach soft-deleted rows. — In admin test models with soft-delete, relying on hardcoded primary keys or implicit deletion can make active and deleted rows indistinguishable, so tests may pass against filtered-out or stale data while admin/queryset overrides that need soft-deleted rows lack a reliable access path. An explicit `deleted` boolean, a default manager filtering on `deleted=False`, and an unfiltered `all_objects` manager keep ordinary queries from leaking soft-deleted rows and make intentional deleted-row access explicit.
<!-- rule:4101 -->
- Cover both `get_or_create()` race branches in regression tests — the existing-row `get()` path and the `IntegrityError` loser — and assert whether caches like `select_related()` survive — a single-branch test hides the cache-invalidation bug the race fix must handle. — The concurrent-insert fix has two distinct outcomes (row already exists vs. this call lost the insert race), and each can leave related-object caches in a different state — testing only one branch would let a regression in the other ship undetected.
