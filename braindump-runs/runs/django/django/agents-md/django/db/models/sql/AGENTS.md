<!-- braindump: rules extracted from PR review patterns -->

# django/db/models/sql/ Guidelines

## API Design

<!-- rule:2323 -->
- Generate column aliases in the SELECT/GROUP BY compiler only when consumed or requested via `with_col_aliases=True`, passing `None` otherwise — avoids emitting unused aliases on positional access and positional `GROUP BY` paths, reducing SQL noise without changing semantics. When aliases are needed, assign them to every selected column after compiling column SQL and before emitting the component, including empty-result fallback paths, so consumers relying on aliased columns don't break on edge cases. — Django's ORM splits alias needs across positional and aliased access paths; emitting aliases where they're unused bloats generated SQL, while skipping them on fallback paths (e.g. empty results) breaks downstream code that indexes by name. This rule governs `django/db/models/sql/compiler.py` and `query.py` alias generation for SELECT and `GROUP BY`.
<!-- rule:4226 -->
- Dereference resolved expressions directly from `query.annotations`/`group_by` — don't re-call `resolve_expression()`; re-resolution allocates new objects, breaking identity checks and duplicating work in `compiler.py`. — When the target already lives in a resolved structure (e.g. `query.annotations`, or `group_by` populated from `Query.select`/`annotations`), calling `resolve_expression()` again creates fresh expression instances, which defeats identity comparisons Django relies on and repeats work the compiler already did.
<!-- rule:6052 -->
- Set explicit attributes on `transform_function` partials; don't introspect `keywords` — `functools.partial.keywords` encodes how a transform happens to be wired up, so any refactor of that call site silently changes what `compiler.py` sees. Declare the property where it's known (`transform_function.has_transforms = True` in `query.py`) and read it defensively (`getattr(transform_function, "has_transforms", False)`) in `compiler.py`.
  Rationale: `functools.partial.keywords` encodes how a transform happens to be wired up, so any refactor of that call site silently changes what `compiler.py` sees. Declare the property where it's known (`transform_function.has_transforms = True` in `query.py`) and read it defensively (`getattr(transform_function, "has_transforms", False)`) in `compiler.py`.

## Testing

<!-- rule:5846 -->
- When changing query construction in `django/db/models/sql/` (especially `query.py` and `split_exclude()`), test every affected branch: connector/negation combos, `allow_joins` values, model vs. no-model queries, and multi-join relations — and assert no duplicate joins are introduced — Query construction branches interact subtly, so an untested combination silently regresses SQL generation; duplicate joins produce wrong results and extra rows, so they must be caught at test time rather than in production.
<!-- rule:2353 -->
- Add regression tests when changing expression restriction, DB converters, or slice/`RETURNING` handling in `django/db/models/sql/compiler.py` — these paths silently coerce or drop values, so untested edge cases ship as bad data — The compiler's coercion and slicing logic is shared across iterables but each result iterable assembles rows differently, so regression coverage for only model-returning paths leaves `.values()`/`.values_list()` bugs undetected — including silent value corruption from converter or `RETURNING` handling.
  - Cover primary-key expressions, converter-backed fields, and raw SQL `RETURNING` paths in those tests
  - Verify compiler changes against `ModelIterable`, `ValuesIterable`, and `ValuesListIterable` — iterables diverge in row assembly, so `.values()`/`.values_list()` can break while `.all()` still passes

## Code Style

<!-- rule:626 -->
- In `SQLCompiler`, detect outer-query refs by comparing `query.model` to the outer query's model — never aliases, since one model can appear under multiple aliases; traverse related-field paths against the outer query's aliases so chained references target the outer table instead of collapsing into a self-comparison on the subquery's own table. — Alias comparison misses correlated subqueries when the same model is referenced under different aliases, producing an incorrect self-comparison against the subquery's own table. Model-based detection plus outer-alias traversal keeps correlated `EXISTS`/`IN` lookups pointing at the outer table.
<!-- rule:4704 -->
- Emit `CROSS JOIN` for INNER joins without predicates; use `ON (1 = 1)` only for join types like `LOUTER` that structurally require an `ON` clause — backends reject the placeholder inconsistently, so match the form your target databases actually support. — `ON (1 = 1)` is a non-predicate masquerading as a predicate: it obscures join intent in generated SQL and isn't universally accepted by database backends (e.g. some dialects reject constant-`ON` inner joins). `CROSS JOIN` states the intent directly and matches SQL grammar, while `LOUTER`-style outer joins genuinely need an `ON` clause in the grammar so the placeholder must stay there. This keeps the ORM's generated SQL portable and readable.
  - Emit explicit `CROSS JOIN` (or a comma-separated `FROM` item) instead of `ON (1 = 1)` for predicate-less INNER joins in the SQL compiler — the placeholder is a lie the optimizer may not fold away, and some backends reject it outright. Reserve `ON (1 = 1)` for join types whose grammar mandates an `ON` clause (e.g. `LOUTER`), and verify the emitted form against every supported database backend.

## General

<!-- rule:4020 -->
- Comment `EmptyResultSet` SQL omissions with the exact combinators/positions they're valid for, updating the dependent implementation and tests together — validity differs per combinator (e.g. `UNION` vs `DIFFERENCE`), so an undocumented omission silently breaks when that path is reused. — In `django/db/models/sql/compiler.py`, whether SQL may be skipped under `EmptyResultSet` depends on the surrounding combinator and clause position; noting the specific valid cases keeps later edits from reusing the shortcut where it drops required SQL, and keeping tests in sync catches such regressions.

## File-Specific Rules

### `django/db/models/sql/compiler.py`

<!-- rule:2296 -->
- Gate the `last_insert_id()` fallback on `AutoField` PKs only in `django/db/models/sql/compiler.py` — models with non-`AutoField` PKs (incl. `CompositePrimaryKey`) or `GeneratedField` members in `returning_fields` must take the standard `RETURNING` path, since Oracle's sequence-based `last_insert_id` and MySQL's generated columns will otherwise crash or silently assign the wrong value to returned fields. — Oracle's `last_insert_id()` is sequence-based and MySQL's generated columns break the fallback contract; routing non-`AutoField` PKs and `GeneratedField` `returning_fields` through `RETURNING` prevents crashes and silent misassignment of returned field values.
<!-- rule:4492 -->
- In `django/db/models/sql/compiler.py`, preserve explicit `ORDER BY` on subqueries when it's semantic: sliced compound queries (`LIMIT`/`OFFSET` on slicing backends) and row-locked subqueries (`select_for_update()` on Postgres), where ordering sets lock-acquisition order and prevents deadlocks. Drop it only for unsliced compound queries; if the outer query depends on the ordering, raise `DatabaseError` at compile time rather than silently eliding. — Row-lock ordering defines deadlock-free lock acquisition on Postgres, and sliced compound queries need deterministic row selection; silently dropping ORDER BY the outer query relies on causes wrong results, so fail loud at compile time.
<!-- rule:4275 -->
- Compute `self.col_count` by expanding `ColPairs` in `self.select` — not `len(self.select)`, which undercounts composite PKs that compile to multiple columns, truncating `val[0 : self.col_count]` and the `cursor_iter` fetchmany batch. Use `self.col_count` for both; avoid a parallel `self.row_col_count`. — `self.select` may contain `ColPairs` (e.g. composite primary keys) that expand into several columns, so `len(self.select)` silently undercounts. A single canonical `self.col_count` keeps row truncation and cursor batching consistent and prevents downstream slice/batch mismatches.
<!-- rule:3494 -->
- Comment the *why* for non-obvious branches in `SQLInsertCompiler` (`django/db/models/sql/compiler.py`): omitting all-`DEFAULT` fields, the `supports_default_keyword_in_bulk_insert` fallback, the empty-object (`# An empty object.`) path, and `pk_default_value()` backend default-PK handling. — Without comments explaining why, these `SQLInsertCompiler` branches (all-`DEFAULT` omission, the bulk-insert default-keyword fallback, the empty-object path, and backend default-PK handling) look like removable dead code, so future refactors could erase invisible constraints—such as the empty-object path being reachable only for models with no explicit fields and backend-specific default-PK requirements—and silently break INSERT compilation.
    Rationale: these branches look removable but are load-bearing — the empty-object path is only reachable for models with no explicit fields (the implicit `AutoField` primary-key case, *not* composite PKs), and `pk_default_value()` exists to satisfy backend-specific default PK requirements. Documenting why prevents future refactors from silently breaking INSERT compilation.

### `django/db/models/sql/query.py`

<!-- rule:6275 -->
- In `django/db/models/sql/query.py`, put lookup value inspection/normalization in `prepare_lookup_value` (not `build_filter`), and dispatch value-type-specific prep through a `_prepare_as_filter_value` hook overridden on relevant classes instead of `hasattr` fallback branches — keeps the customization point polymorphic and overridable, so subclasses extend behavior without `build_filter` growing type checks. — Centralizing value prep in `prepare_lookup_value` with a `_prepare_as_filter_value` hook makes the extension point explicit and polymorphic: subclasses override a method rather than being detected via `hasattr`, so `build_filter` stays free of type-sniffing branches and new value types slot in without editing shared dispatch code.
<!-- rule:5404 -->
- Emit every `FilteredRelation.condition` child in the JOIN's `ON` clause (`LEFT JOIN ... ON (... AND condition)`); raise on unhandled children rather than dropping them. — Dropping condition children or using `INNER JOIN` with implicit `id IS NOT NULL` masks crashes and silently changes the condition's semantics.
  Constants like `False` and conditional expressions count as children too. Dropping a child or falling back to `INNER JOIN` with an implicit `id IS NOT NULL` masks the crash and silently changes the filter's semantics.
<!-- rule:5432 -->
- When resolving alias/column collisions in `Query` (`django/db/models/sql/query.py`), iterate `Join` entries in `self.alias_map` and collect `join_field.related_model`, skipping the base `self.model` — the base and a join's local `model` are already covered elsewhere, so including them triggers spurious collisions. — Including the base model or the join's local `model` duplicates models that other branch/table collection already covers, producing false alias and column collision hits during ORM query compilation. Iterating `self.alias_map` joins and defaulting to `join_field.related_model` keeps the model set to exactly the far-side joined tables, unless downstream behavior explicitly requires the local `model`.
<!-- rule:956 -->
- Add an explanatory comment to non-obvious conditional branches in query-construction code, stating the specific condition being matched and the SQL semantics (connector and null handling) the branch emits. — Non-obvious branches in query construction have SQL semantics that aren't inferable from the control flow alone, so contributors can misread what connector or null behavior a branch emits and silently change it during edits.
<!-- rule:4675 -->
- In `django/db/models/sql/query.py`, raise an explicit error when a composite query-expression type can't be fully supported rather than partial special-casing it — silent partial support lets unsupported query combinations through and misleads users at runtime. — Composite query-expression types resist complete handling without disproportionate complexity; failing loudly surfaces the limitation instead of hiding it behind fragile special cases.
<!-- rule:5403 -->
- Validate `FilteredRelation` conditions via field/alias resolution, not nesting depth — depth checks miss aliased or same-depth cross-relation lookups, letting invalid conditions reach the SQL builder — Depth comparison passes conditions whose lookups traverse a different relation at the same depth, producing incorrect SQL or silently wrong filters. Resolving each lookup's field/alias path against the `FilteredRelation`'s own alias correctly rejects cross-relation conditions.

### `django/db/models/sql/subqueries.py`

<!-- rule:3020 -->
- Key queued update expressions by field in `django/db/models/sql/subqueries.py` — an append-only list emits duplicate `SET` targets for the same column when several transforms hit one field, producing invalid SQL. — Merge expressions per field before emitting the assignment so each column appears once in `SET`.

### `django/db/models/sql/where.py`

<!-- rule:5447 -->
- In `django/db/models/sql/where.py`, render n-ary XOR as an odd-parity check — `MOD(SUM(CASE WHEN cond THEN 1 ELSE 0 END), 2) = 1` — for any child count, not just `len(children) > 2`. — Since XOR is true iff an odd number of its operands are true, the parity formula already handles 1, 2, and n children; branching on `len(children) > 2` produces a second SQL shape that must be kept in sync and can silently diverge. Only add a length guard if benchmarks show a real performance penalty.
<!-- rule:5829 -->
- In `WhereNode.split_having()`, push `XOR` branches with aggregates entirely into `HAVING` — `XOR` doesn't decompose like `AND`/`OR`, so splitting children across `WHERE`/`HAVING` corrupts the query. — `XOR` semantics are not distributive over row-level vs aggregate-level filtering, so `WhereNode.split_having()` must treat it as an atomic branch. The `in_negated` context changes whether `XOR` behaves like a conjunction or disjunction for the split decision, and getting either wrong produces malformed `HAVING` clauses.
  - When computing `may_need_split` in `WhereNode.split_having()`, group `XOR` with `AND` under `in_negated` and exclude it alongside `OR` otherwise — negation flips which connector is effectively active.

<!-- /braindump -->