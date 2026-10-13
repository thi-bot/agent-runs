<!-- braindump: rules extracted from PR review patterns -->

# docs/ref/models/ Guidelines

## Documentation

<!-- rule:6331 -->
- Document NULL placement as database-dependent or undefined in `docs/ref/models/` (esp. `expressions.txt`, `querysets.txt`) — asserting a fixed order misleads users on other backends. — Across `docs/ref/models/expressions.txt` and `docs/ref/models/querysets.txt`, claiming a specific NULL sort order is incorrect on backends that differ (e.g. some place NULLs first, others last), so docs must defer to the database and only note the order a query explicitly enforces.
<!-- rule:6332 -->
- In `docs/ref/models/indexes.txt` and `docs/ref/models/expressions.txt`, document `asc()`, `desc()`, `nulls_first()`, and `nulls_last()` together with usage examples — users expect the full ordering modifier set to be discoverable in one place, not scattered. — Ordering modifiers are used as a set (`F.asc()`/`F.desc()` paired with `nulls_first()`/`nulls_last()` in `Index.fields`), so documenting them together with examples prevents users from missing the null-placement variants or misusing them with the wrong ordering direction.
<!-- rule:3009 -->
- In `docs/ref/models/`, describe ORM field attributes with database-accurate wording: say a field "can store `NULL` values" (not that empty values convert to `NULL`) and use "database-computed" to distinguish server-side defaults from client-side ones — Users reading `docs/ref/models/fields.txt` rely on this wording to know whether behavior is enforced by the database or only by Python, and imprecise phrasing leads them to expect conversions or defaults that never happen.
<!-- rule:3441 -->
- State directly that `F()` works with `update()` in `docs/ref/models/expressions.txt` — describe capability, don't hedge — Readers skimming ORM reference docs miss the bulk-update feature when it's phrased indirectly; direct capability wording (

## File-Specific Rules

### `docs/ref/models/constraints.txt`

<!-- rule:1818 -->
- In `docs/ref/models/constraints.txt`, state changed behavior directly and use self-contained examples — readers hit one constraint section at a time and can't chase external context. — Django's constraint reference is read out of order and often mid-debug, so a note like 'If `<attribute>` is set, this code is now always used' or a snippet with plain field names stands alone; a cross-reference to an earlier migration or version note forces the reader to hunt for it. Label a behavior change as a behavior change (`now always used`), since previously-valid model definitions silently stop behaving the same way after the constraint is added.

### `docs/ref/models/database-functions.txt`

<!-- rule:6384 -->
- In `docs/ref/models/database-functions.txt`, qualify MySQL backend behavior warnings (e.g. `INSTR`/`StrIndex` case-insensitivity) with collation-dependent exceptions such as binary collations (`utf8mb4_bin`) instead of blanket case-insensitivity claims. — Prevents documentation from stating behavior that is false under binary collations, keeping the MySQL notes accurate for readers using `utf8mb4_bin` and similar collations.

### `docs/ref/models/expressions.txt`

<!-- rule:841 -->
- Document `Exists()` in `docs/ref/models/expressions.txt` as an `annotate()`/`filter()` conditional expression — not a `filter()` keyword arg on a non-field name (which fails at query time) — Users copying the wrong pattern will hit ORM errors when they pass a non-field name as a kwarg instead of wrapping `Exists()` inside the query expression, so the reference docs must show the correct usage.

### `docs/ref/models/fields.txt`

<!-- rule:888 -->
- Document `DB_*` `on_delete` variants in `docs/ref/models/fields.txt` as concise counterparts to their Python-level options: — Formatting and prose conventions for the `on_delete` reference entries in `docs/ref/models/fields.txt`, so the `DB_*` variants stay discoverable, correctly versioned, and free of redundant or inaccurate detail.
    - Place each `DB_*` entry immediately after its non-DB match — readers scanning `on_delete` expect the SQL variant right next to its Python twin
    - Cross-reference related classes/fields with Sphinx roles — lets readers jump between Python and SQL layers without leaving the page
    - Add `.. versionchanged::` for changed behavior — users on older versions need to know when semantics shifted
    - Don't repeat shared SQL-constraint caveats or cite inaccurate `ON DELETE` keywords — duplicated caveats drift out of sync and wrong keywords mislead users debugging migrations
<!-- rule:5143 -->
- When documenting class-accepting parameters (e.g. `encoder`/`decoder`), name the required base class and link its authoritative external docs (e.g. `json.JSONEncoder`) — gives readers the exact subclassing contract and a reference to follow. — Readers of `docs/ref/models/fields.txt` need to know which class to subclass — without the base class and a link, they must search the library's docs to find the exact contract, and easy mismatches (e.g. `json.JSONEncoder` vs. a wrapper) go unnoticed.
<!-- rule:6100 -->
- In `GeneratedField` docs (`docs/ref/models/fields.txt`), say expressions reference fields "in the same model and database table" — not just "in the model" — Multi-table inheritance splits a model across tables, so "within the model" implies inherited parent fields are usable, which they are not — the vaguer phrasing leads users to expressions that fail at the database level.
<!-- rule:6099 -->
- Describe `GeneratedField.expression` constraints as "deterministic" in `docs/ref/models/fields.txt` — referenced fields can mutate, so "immutable" would misstate the requirement. — The expression's referenced input fields may change over time; only the expression itself must produce stable output for a given set of inputs.

### `docs/ref/models/indexes.txt`

<!-- rule:5283 -->
- Document each `Index` option section in `docs/ref/models/indexes.txt` with a short code example — options accepting multiple expression types (`F()`, function expressions, mixed column/function indexes) are the ones readers most often get wrong, and a snippet disambiguates the accepted forms. — Readers consulting `docs/ref/models/indexes.txt` need concrete snippets to see how options that accept multiple expression types (`F()`, function expressions, mixed column and function indexes) are actually written; without an example they must guess the correct form, and API docs without examples are a common source of user error.
<!-- rule:4785 -->
- Document in the PostgreSQL partial-index section: with `USE_TZ = False`, `Q` conditions on timezone-aware datetimes may need explicit `tzinfo` casting — quoting the error `ProgrammingError: functions in index predicate must be marked IMMUTABLE` — so readers understand why the cast is mutable and how to fix it. — The `IMMUTABLE` predicate check is non-obvious and the failure mode surfaces only at index creation time, so users hitting `ProgrammingError` need the docs to name the `USE_TZ = False` interaction and the `tzinfo` workaround directly.

### `docs/ref/models/querysets.txt`

<!-- rule:4886 -->
- In `select_for_update()` docs (`docs/ref/models/querysets.txt`), wrap examples in `transaction.atomic()`, document the `of=(...)` selected-fields constraint with tuple syntax, qualify backend support with `Currently`, and link PostgreSQL `no_key`/`key=True` to PostgreSQL explicit-locking docs — users otherwise copy examples that silently fail or misuse `of`. — `select_for_update()` raises `TransactionManagementError` outside a transaction, and `of=(...)` requires at least one field per model (e.g. via `values()`); showing the full scope and constraint in the reference prevents copy-paste breakage and incorrect locking assumptions.
<!-- rule:553 -->
- In `docs/ref/models/querysets.txt`, describe `&` as effectively chaining QuerySets and illustrate with `filter(a).filter(b)` — comma-separated `filter(a, b)` and `Q()` examples have different semantics and mislead readers; state the same-base-model precondition for combining QuerySets. — `filter(a, b)` and equivalent-looking `Q()` combinations don't behave the same as chained `.filter()` calls, so using them as the equivalence example teaches users an incorrect mental model of `&`.
<!-- rule:6366 -->
- In `docs/ref/models/querysets.txt`, enumerate every SQL operation allowed on combined querysets (`union()`, `intersection()`, `difference()`), pairing each SQL keyword with its QuerySet equivalent (e.g. `LIMIT`/`OFFSET`→slicing, `ORDER_BY`→`order_by()`). — Partial lists make users assume the omitted operations are disallowed; keyword-to-method pairs let readers map existing SQL knowledge onto the ORM.
    Partial lists make users assume the omitted operations are disallowed; keyword-to-method pairs let readers map existing SQL knowledge onto the ORM.

<!-- /braindump -->