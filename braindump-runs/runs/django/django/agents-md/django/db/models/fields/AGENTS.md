<!-- braindump: rules extracted from PR review patterns -->

# django/db/models/fields/ Guidelines

## General

<!-- rule:1396 -->
- Wrapper/composite Django fields should delegate `check(**kwargs)` to `self.output_field.check(**kwargs)` unconditionally, alongside any wrapper-level checks — gating delegation with `isinstance(self.output_field, SomeField)` skips validation that other output-field types still need to run, letting invalid definitions slip past `makemigrations`/`check`. — Each `output_field` type owns its own `check()` logic; only calling it under a specific `isinstance` branch hides errors for every other field type a wrapper might wrap.
<!-- rule:4599 -->
- When overriding a base `Field` property in subclasses, keep the base return type and semantics — a property that returns `bool` must still return `bool`, not a `Field` instance — and decorate the override with `@property` — callers (e.g., `CompositeField` subclasses in `django/db/models/fields/composite.py`) branch on these return types, so changing them silently breaks the hierarchy's contract. — In the `django/db/models/fields` class hierarchy, base `Field` properties document specific return types that subclasses and callers rely on. If an override swaps a `bool` for a `Field` instance, callers that branch on truthiness or compare against `True`/`False` break silently. Mirroring the `@property` decorator ensures the override remains a descriptor rather than a plain method, preserving attribute-access semantics across the subclass.
<!-- rule:2306 -->
- Name field classes in `django/db/models/fields` for the narrow capability they implement — e.g. `CompositePrimaryKey`, not `CompositeField` — since a broader name advertises non-primary-key behavior the class doesn't provide, and callers will write code that breaks when they rely on it. — Naming a Django model field after the specific capability it implements (`CompositePrimaryKey`) instead of a broader label (`CompositeField`) keeps the API honest: the class name is the only contract callers see before reading the source. A general-sounding name invites use in non-primary-key contexts, where the field will silently misbehave or fail. Reserve the wider name for when the wider behavior is actually implemented.
<!-- rule:6127 -->
- Don't recheck a signal connection's guard condition inside its callback — the guard in `Field.contribute_to_class` (e.g. `width_field or height_field`) is the source of truth — The callback only fires when the connection guard already held, so a duplicate check is dead code that drifts out of sync if the guard later changes.

## File-Specific Rules

### `django/db/models/fields/composite.py`

<!-- rule:2324 -->
- Enforce `CompositeField` invariants at construction: require ≥2 subfields, reject nested `CompositeField` instances, reject names containing `LOOKUP_SEP` — the lookup API resolves a single field at a time and can't handle other shapes — CompositeField is defined as strict, flat, and multi-subfield; allowing nesting, fewer than two subfields, or `LOOKUP_SEP` in names would create shapes the lookup API never produces, so any handling for them is dead weight or a latent bug.
  - Process `CompositeField` by iterating over all subfields, not assuming the first represents the whole, and skip defensive branches for shapes the lookup API can't produce — keeps `django/db/models/fields/composite.py` lookup logic operating on one resolved field
<!-- rule:2326 -->
- In `django/db/models/fields/composite.py`, raise `ValueError` on subfield lookup failure with available subfield names in the message — matches stdlib bad-argument conventions and helps users spot typos in subfield names. — Subfield lookup failures are argument errors, not field errors, so `ValueError` is the correct exception type; including available subfield names turns an opaque failure into a self-diagnosing typo report.
<!-- rule:2289 -->
- Add `__delete__` to descriptors defining `__get__`/`__set__` — otherwise `del instance.attr` raises `AttributeError` instead of matching assignment semantics. In `CompositeAttribute` (`django/db/models/fields/composite.py`), implement `__delete__` to clear the composite value consistently with `__set__(instance, None)`. — Descriptor classes that support both reading and assignment via `__get__`/`__set__` break the Python data-descriptor contract when `del instance.attr` fails with `AttributeError`. Implementing `__delete__` keeps deletion semantics consistent with assignment, so callers can clear a managed attribute the same way they set it. For `CompositeAttribute`, this means passing through to `__set__(instance, None)`.
<!-- rule:2330 -->
- Self-describe composite PK lookup validation errors with both the lookup operator and the field, e.g. ``'<lookup>' lookup of '<field>' field must be a tuple or a list`` — callers only see the message, so naming both pinpoints which lookup on which field failed. — Composite primary key validation in `django/db/models/fields/composite.py` raises errors that users debug solely from the message text; an error that omits the lookup operator or field name leaves them guessing which lookup failed. The `__in` case is subtle: the violation is per-element shape (each RHS element must match the composite's component-field count), not the outer collection length, so a generic
  - For `__in` length mismatches on composite PKs in `django/db/models/fields/composite.py`, say each element must hold one value per component field, e.g. ``'in' lookup of 'primary_key' field must have 2 elements each`` — the outer list length is fine, so blaming it misdirects users debugging the wrong collection.

### `django/db/models/fields/files.py`

<!-- rule:6415 -->
- In `FileField.__init__`, assign the resolved storage callable's result directly to `self.storage` and validate with `isinstance(value, Storage)` — not `issubclass` — and avoid a `check_storage` temp var. — The storage callable resolves to an instance, so `issubclass(value, Storage)` raises `TypeError`; validating the instance directly on `self.storage` keeps the resolution path minimal and correct.
<!-- rule:6286 -->
- Keep `FileField.generate_filename()` as the public compatibility entry point in `django/db/models/fields/files.py`; invoke overridden `get_directory_name()`/`get_filename()` with a deprecation warning — silently dropping them breaks user subclasses that rely on these hooks to customize upload paths. — User subclasses of `FileField` that override `get_directory_name()` or `get_filename()` would silently lose their custom path logic if these hooks were ignored; keeping `generate_filename()` public and warning on the overrides preserves backward compatibility while guiding callers toward the new storage-backend API.

### `django/db/models/fields/json.py`

<!-- rule:4141 -->
- **Prefer one native JSON SQL workaround over chained generic lookups/fallbacks** in `django/db/models/fields/json.py` — a single native call covers every JSON value type, whereas stacking generic lookup classes accumulates vendor caveats (Oracle in particular). Reach for `JSON_EXISTS(lhs, '$?(@==%s)')` for Oracle array/scalar containment, `DBMS_LOB.SUBSTR(lhs) LIKE '{%%%%}'`/`'[%%%%]'` for empty Oracle containers, or `JSON_EQUAL(..., value) OR` chains for JSON null `__in` lookups, pairing with `features.py` capability flags as needed. — Keeps vendor-specific JSON lookups tractable and bug-free: Django centralizes all JSONField lookup implementations in `django/db/models/fields/json.py`, so layering generic lookup classes or fallbacks per vendor multiplies special cases and risks inconsistent behavior across JSON value types. A single native SQL workaround is easier to reason about and correctly handles all value types, including Oracle arrays/scalars, empty containers, and JSON null `__in` — cases that chained generic lookups tend to mishandle.
<!-- rule:5168 -->
- Disable psycopg2 JSON/JSONB decoding with an identity loader (`register_default_json`/`register_default_jsonb`, `loads=lambda x: x`) so the field's `from_db_value` parses the column — casting to `::text` forces a redundant decode/encode/decode round-trip — When the driver auto-decodes JSON/JSONB by OID, the field's `from_db_value` can't apply its own encoder/decoder; an identity loader hands raw JSON through so parsing happens once. Casting the column to text instead makes the driver skip its decode, but then the field must decode the text, re-encode it, and decode again — wasted work and an extra failure surface for custom JSON fields.

### `django/db/models/fields/related.py`

<!-- rule:5900 -->
- `centralize-default-vs-filtered-dispatch-in-get-path-info.md` — ## Centralize `filtered_relation` dispatch in `get_path_info()`

- **Call `get_path_info(filtered_relation)` unconditionally in `django/db/models/fields/related.py` path-info accessors — don't branch on `filtered_relation` at each call site.**
  The default-vs-filtered choice belongs inside `get_path_info()` itself: return `self.path_infos` when no `filtered_relation` is passed, otherwise delegate to `_get_path_info(...)`. Keeping the branch in one method means every related-field path-info accessor stays consistent, and changing filtering behavior only requires editing `get_path_info()` instead of chasing down duplicated `if filtered_relation:` checks across callers.
<!-- rule:6396 -->
- Pass only the unqualified table name to `truncate_name()` — strip schema prefixes like `"USERNAME".` first — `truncate_name()` measures its input against the backend's max identifier length, so a leftover schema prefix eats the budget and shortens the real table name, yielding wrong or colliding `db_table` values for m2m tables generated in `django/db/models/fields/related.py`. Keep the full qualified identifier for the SQL that creates the table; only the truncation call should see the bare name.

### `django/db/models/fields/related_descriptors.py`

<!-- rule:6398 -->
- Keep `RelatedManager` optional params keyword-only and named as in `set(..., *, clear=False, through_defaults=None)` — apply the same to `create`, `get_or_create`, `update_or_create`, `add`, and `_add_items` in `django/db/models/fields/related_descriptors.py`; accepting them positionally or inventing per-method synonyms breaks callers that pass `through_defaults=` by name. — The rule governs the signatures of specific methods (`create`, `get_or_create`, `update_or_create`, `add`) on the `RelatedManager` class and its `_add_items` helper, all of which live in `django/db/models/fields/related_descriptors.py`. It is a convention about how these particular entities accept optional parameters (keyword-only, consistent names like `through_defaults`), so file-level placement anchored to `RelatedManager` gives the rule maximum findability where an assistant would actually edit. Keeping the parameters keyword-only and identically named across the API prevents silent breakage for callers that pass `through_defaults=` by name, and avoids forcing users to memorise per-method synonyms for the same concept. Mirroring the existing `set(..., *, clear=False, through_defaults=None)` signature keeps the related-manager API internally consistent, so a pattern learned from `set` transfers directly to `add` or `get_or_create`.

### `django/db/models/fields/tuple_lookups.py`

<!-- rule:4591 -->
- Implement `lhs` on `CompositeSubfieldTransform` in `django/db/models/fields/tuple_lookups.py` for composite subfield resolution — don't add `get_lhs_expressions`/`get_lhs_len` helpers to lookup mixins — The `lhs` property is the standard resolution protocol for lookups and transforms; custom mixin helpers bypass that flow and introduce non-standard APIs that other lookups won't call

<!-- /braindump -->