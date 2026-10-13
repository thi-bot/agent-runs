# Django Models & Fields

> Rules for defining models and fields: field types, null/blank conventions, cached_property, related_name, Meta constraints, indexes, and model helper logic.

**When to check**: When defining or modifying Django model fields, Meta options, indexes, or model-level helpers.

## Rules

<!-- rule:681 -->
- Use `@cached_property` for expensive derived values (DB queries, I/O, object construction) stable for the instance or request/response cycle, storing raw inputs in `__init__` and computing lazily — avoids eager work in `__init__` and recomputation on every `@property` access — Category: code_style. Scope: global. Placed at repo-root `AGENTS.md` because the convention spans many unrelated wagtail modules (models, admin viewsets, action menus, embeds, account views, workflow tests), so an AI assistant should apply it consistently anywhere it writes Python.
  - Name the `@cached_property` with the intended public API name rather than wrapping it in a `get_*()` method — keeps one obvious, cache-hitting access path
  - Skip `@cached_property` for cheap lookups or values derived from mutable related-object state (e.g. workflow/task or lock state that changes mid-request); invalidate explicitly or use a plain `@property` — stale caches cause hard-to-trace bugs
<!-- rule:1630 -->
- On Django/Wagtail `CharField`/`TextField`, use `blank=True` and `default=""` instead of `null=True` — keeping `''` as the single empty sentinel avoids `None`/`''` ambiguity and lets you query `field=''` rather than `__isnull=True`. Exception: a `unique=True` string field still needs `null=True` to permit multiple blanks without violating the constraint. — One canonical empty value simplifies querying and avoids `None`-vs-`''` bugs.
<!-- rule:2496 -->
- Add a model field only for a concrete current use — every field is a schema commitment (migrations, stored data, API surface) that's costly to remove — This rule was validated across 4 PRs spanning `wagtail/wagtailcore`, `wagtail/contrib/redirects`, `wagtail/admin` templates, and `docs`, so it applies wherever Django models are defined.
  - Skip speculative, derived, and denormalized fields — they duplicate or guess at state and drift out of sync
  - Remove an existing field only after its replacement ships or the logic requiring it is gone — prevents breaking consumers mid-change
<!-- rule:1192 -->
- Include `locale` in translation-model `UniqueConstraint` fields and name it with `%(app_label)s`/`%(class)s` placeholders (e.g. `unique_translation_key_locale_%(app_label)s_%(class)s`) — prevents cross-locale collisions and keeps constraint names unique across apps and subclassed models. — Translations of the same object differ only by `locale`, so omitting it from the constraint would block storing more than one translation per key. Django requires `%(app_label)s`/`%(class)s` placeholders in `Meta.constraints` names so the same abstract/multi-table-inheritance model can be reused in other apps without clashing constraint names.
<!-- rule:1851 -->
- Delegate DB (de)serialization to the wrapped field: in custom Django fields (e.g. `JSONField` wrappers), call the wrapped field's `get_db_prep_value()`/`from_db_value()` instead of reimplementing them in `get_prep_value()` — keeps backend-specific encoding (Postgres JSONB) in one place and matches the `wagtail/fields.py` / `wagtail/core/fields.py` precedent — Concise, imperative bullets that preserve the project-specific identifiers (`get_prep_value`, `get_db_prep_value`, `from_db_value`, `value_to_string`, `StreamValue`, `JSONField`, `wagtail/fields.py`, `wagtail/core/fields.py`) and explain why each step matters (backend correctness, lookup-value passthrough, round-trip safety).
  - In `get_prep_value()`, call `super().get_prep_value(value)` first and keep it to Python-value prep only; gate wrapper-specific prep behind `isinstance(value, WrapperType)` (e.g. `StreamValue`) so raw lookup values (lists, dicts) bypass it
  - If `get_prep_value()` no longer serializes, serialize in `value_to_string()` using the wrapped field's encoder — otherwise string round-trips silently break
<!-- rule:2370 -->
- Put Django model validation in the dedicated hooks — `clean_<field_name>()` for single fields, `clean()` for cross-field, `validate_unique()` for uniqueness beyond DB constraints. — Django's validation framework calls each hook at the right phase and attaches errors to the correct field; generic `clean()` overrides lose field-level error mapping and form/admin integration.
<!-- rule:1655 -->
- Wagtail/modelcluster model definitions — Preserve project-specific references
<!-- rule:1508 -->
- Index model fields used in frequent lookups, `endswith`/suffix filters, or per-request middleware queries — avoids full-table scans on hot paths — Fields hit by duplicate checks, middleware, or suffix lookups run constantly; unindexed they degrade to full-table scans as data grows.
<!-- rule:981 -->
- Always set `related_name` on `ForeignKey` fields — use a descriptive name when reversed, or `"+"` when unused. — Omitting it lets Django derive the name, which silently breaks on refactor or collides between models. Explicit `"+"` documents intent and skips the reverse accessor.
<!-- rule:982 -->
- Model cross-model relationships with concrete `ForeignKey`s (or per-model concrete subclasses of a shared `abstract` base model/mixin) — never generic FKs (`content_type` + `object_id`) or new settings. — Concrete FKs preserve referential integrity, enable typed queries and joins, and avoid config drift from `settings` that silently point at missing models.
<!-- rule:2369 -->
- Define shared `Meta` options (`indexes`, `ordering`) in abstract base models and inherit via `class Meta(Base.Meta)` — keeps non-field-dependent options DRY across concrete subclasses — Non-field-dependent `Meta` options belong on the abstract base so every concrete subclass (e.g. `wagtail/contrib/settings/models.py`, `wagtail/models/audit_log.py`) stays consistent without duplication. Field overrides with relaxed options are easy to get wrong because Django's field resolution across abstract inheritance can pick up base-level constraints; checking which field wins prevents surprising query/index behavior in derived models.
  - When an abstract subclass overrides an inherited field with looser options, verify the subclass field definition is the one resolved for concrete models — inherited stricter constraints silently leaking changes query behavior
<!-- rule:1212 -->
- Avoid adding constraints (`max_length`, validators) to previously unbounded model fields — silently rejects existing data and breaks API consumers; align the app-specific dependent field instead. — The rule is a cross-cutting API-design principle: tightening a previously unbounded field is a backward-incompatible change that can reject values already persisted or accepted by callers. Adjusting the dependent or app-specific field, or accepting practical inconsistency, keeps the core model's contract stable while still resolving the alignment issue.
<!-- rule:893 -->
- Use `on_delete=models.DO_NOTHING` on audit/log FKs — preserves history if the referenced row is deleted — Cascade deletes would erase the audit trail that log records exist to provide.
<!-- rule:2129 -->
- Order Wagtail model mixins `WorkflowMixin`, `LockableMixin`, `DraftStateMixin`, `RevisionMixin` — MRO gives `get_lock()` correct precedence — The canonical order matches how the mixins were introduced and controls Python's MRO, so `get_lock()` (and other overridden methods) resolve to the intended implementation. Reordering silently changes which mixin's method wins.
