<!-- braindump: rules extracted from PR review patterns -->

# django/contrib/postgres/ Guidelines

## API Design

<!-- rule:3661 -->
- Override `get_placeholder()` for string-literal field types (`array.py`, `ranges.py`) — not ad-hoc transform casts — Centralizing literal handling in `get_placeholder()` keeps the cast (e.g. `::int2[]::bigint[]`) correct even when the value is expression-wrapped like `Value([...])` rather than a naked list; scattering casts across transforms drifts out of sync and drops the outer cast on wrapped values.
  Centralizing literal handling in `get_placeholder()` keeps the cast (e.g. `::int2[]::bigint[]`) correct even when the value is expression-wrapped like `Value([...])` rather than a naked list; scattering casts across transforms drifts out of sync and drops the outer cast on wrapped values.
<!-- rule:5420 -->
- ## Composite query construction — In `django/contrib/postgres`, composite query objects like `SearchQuery` carry a `config` that controls how full-text search is parsed and executed. When a composite is built from existing query objects without copying their `config`, the result silently falls back to the default config, so searches that worked on the source objects return different results in the combined one. Copy `config` into the combined object and add a regression test asserting the combined object retains the expected `config`.
  - Propagate the source object's `config` when building composite queries (e.g. composing a `SearchQuery` from existing query objects) — dropped config silently changes search behavior

## Error Handling

<!-- rule:3663 -->
- Validate array index/slice lookup tokens before the DB query — malformed values (whitespace/newline) must raise a Python error, not reach Postgres — Malformed index/slice tokens slipped into the SQL would surface as opaque database errors (or wrong results) instead of a clear Python exception, making the lookup code hard to debug. Validating up front keeps the failure local to the array lookup implementation, and the tests in `tests/postgres_tests/test_array.py` lock in that malformed tokens fail before the query executes.
  - Assert this in `tests/postgres_tests/test_array.py` — tests catch the failure before any database call, so the error stays attributable to parsing rather than the query layer
<!-- rule:5595 -->
- Issue collation `CREATE`/`DROP` directly without `IF (NOT) EXISTS` — a name alone doesn't capture locale/provider/deterministic identity, so name-based checks silently treat distinct collations as duplicates — PostgreSQL collation identity is defined by locale, provider, and determinism settings, not just its name. If a migration silently skips creation because the name exists, it can leave an incompatible collation in place; letting the statement fail loudly surfaces the actual semantic conflict. Applies to collation operations in `django/contrib/postgres/operations.py` and similar backend-specific operation classes.

## General

<!-- rule:5339 -->
- Check `cast_db_type()` normalization and existing field-class mappings before registering a new `type_mapping` or `data_types_reverse` OID entry — duplicates break introspection consistency. — Redundant entries in lookup `type_mapping` (e.g. `smallserial`/`serial`/`bigserial`) or `connection.introspection.data_types_reverse` OIDs shadow the normalization already done by `cast_db_type()`, causing divergent type resolution across `django/contrib/postgres/` introspection paths. Only register a mapping when no existing normalization or field-class mapping covers it.

## File-Specific Rules

### `django/contrib/postgres/fields/array.py`

<!-- rule:5892 -->
- Match each array-slice SQL parameter to its placeholder bound — `[:%s]` gets the end bound, not another — In Django's PostgreSQL `ArraySlice` SQL generation (`array.py`), branches conditionally emit placeholders like `[:%s]` or `[%s:%s]`; passing the wrong bound silently returns the wrong slice range instead of raising an error, so keep parameter order aligned with the emitted placeholder.

### `django/contrib/postgres/search.py`

<!-- rule:3417 -->
- **`django/contrib/postgres/search.py` — validate full-text-search args in Python before hitting Postgres** — Postgres either raises opaque syntax errors or silently coerces bad input, hiding caller bugs.
<!-- rule:3418 -->
- Use `plainto_tsquery` (not `to_tsquery`) for arbitrary user text in `django/contrib/postgres/search.py` — it tolerates characters like `!` that raise syntax errors; delegate quoting/escaping to the PostgreSQL adapter and centralize version/adapter-specific lexeme escaping in a single module-level helper instead of branching inline per compilation. Assert stemmed/normalized lexemes in tests, not just raw sanitation. — Hand-rolled regex escaping diverges across PostgreSQL versions and adapters, and `to_tsquery` chokes on user-supplied punctuation such as `!`. `plainto_tsquery` parses plain text safely, and a single module-level helper keeps escaping correct across versions. Because these functions stem and normalize terms, tests that only check sanitization will miss the actual transformed output.
<!-- rule:3416 -->
- In `django/contrib/postgres/search.py`, model `SearchConfig` as an `Expression` subclass that owns its `::regconfig` cast in `as_sql` — wrapping via `Value` or a mixin hides the cast and breaks composability with other expressions. — A dedicated `SearchConfig` expression keeps the `::regconfig` cast visible and composable, so search expressions can be nested and combined without hidden wrapping; explicit `config` args keep the query-parsing vs. document-parsing distinction clear — `SearchQuery` governs how the query text is parsed, while document-side functions like `SearchHeadline` may need a different config, and reading config off a nested expression silently conflates the two.
  - Accept `config` as an explicit argument on each search function/expression rather than reading it off a nested query expression — `SearchQuery`/`tsquery` owns the config for query parsing, while functions that combine a document with a query (e.g. `SearchHeadline`) take a separate `config` for document parsing.

<!-- /braindump -->