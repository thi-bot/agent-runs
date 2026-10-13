<!-- braindump: rules extracted from PR review patterns -->

# django/db/ Guidelines

## API Design

<!-- rule:2322 -->
- In `django/db`, treat ORM query aliases as first-class references distinct from column references: — Aliases in the ORM SQL compiler are reference objects, not literal identifiers. Confusing the two — quoting an alias as a column, re-expressing aliased selects inline, or rebinding an alias to a different selection position — produces invalid SQL or silently changes `DISTINCT ON`/annotation semantics across backends.
  - Use the supplied alias and cache per alias when constructing column sources or subqueries — aliases are references, not columns
  - Mark aliases as aliases so compilers don't quote them as columns — quoting turns a reference into a literal identifier and breaks emitted SQL
  - Prefer emitting an existing alias over duplicating the full expression — avoids redundant SQL and keeps `DISTINCT ON`/annotation ordering stable
  - Bind alias lookups to the alias's own selection position — keeps `DISTINCT ON` and annotation ordering correct
  - Prohibit `__` in multi-column subquery aliases (e.g. `CompositePrimaryKey`) — avoids collisions with field-lookup syntax
  - Preserve backend safeguards like Oracle's `GROUP BY` alias-collision check; when a compiler invariant guarantees a concrete alias source, prefer it over fallback resolution — fallback resolution can silently pick a different expression
<!-- rule:3356 -->
- Trust that `remote_field.through` is populated for `ManyToManyField` through models — skip defensive `remote_field`/`through` guards; Django sets these during field setup, but the backend layer (see `django/db/backends/base/introspection.py`) can rebuild them, so guards read as real absence. — These come from Django ORM internals across `django/db/models/fields/related.py`, `related_descriptors.py`, and `django/db/backends/base/introspection.py`. `remote_field.through` and `m2m_db_table` are part of the populated `ManyToManyField` state — treating them as possibly-missing hides real setup bugs. Filtering by the reverse FK targets rows for the specific instance rather than the whole join table. A composite unique constraint on `(source_fk, target_fk)` already serves as an index prefix on `source_fk`, so an extra single-column index is pure overhead.
  - Use `m2m_db_table` to get the join table name for a `ManyToManyField` — it reflects the table Django actually created for the through model, which may differ from a naive name join.
  - Filter through-model rows by the FK that points back to the related instance — matches the correct join rows for that instance rather than all rows on the join table.
  - Skip adding a redundant index on the source FK when a composite unique constraint already covers lookups — avoids duplicate index maintenance and storage.
<!-- rule:5135 -->
- Put new attribute setup in `contribute_to_class()` / `ModelBase.add_to_class()`, not marker flags or extra `ModelMetaclass`/`ModelBase` subclasses — keeps the class-construction lifecycle single-pathed — These rules are scoped to `django/db/models/base.py` and helpers/classes implementing `contribute_to_class` (e.g. `django/db/migrations/state.py`). Django's model metaclass already exposes `contribute_to_class()` and `ModelBase.add_to_class()` as the extension points for attribute processing, so reusing them preserves a single lifecycle path and keeps third-party models (which call these hooks directly) working. Adding marker flags or intermediate metaclass classes forks the construction path and breaks introspection like `_meta` setup and migration state cloning. `add_to_class` overriding is intentional — mixins and abstract bases rely on shadowing — so raising there breaks valid user code; warning keeps a paper trail without breaking compatibility. `six.with_metaclass()`'s `NewBase` is a synthetic class with exactly `__mro__ == (base, object)`; duck-typing with `isinstance(base, ModelBase)` plus that structural check survives reloading and alternate loaders, whereas name/module string checks fail. Inheritance fixes must be localized to the class being created because parent classes are shared across siblings — deleting or mutating their attributes corrupts unrelated models.
  - In `add_to_class()`, if the name is already in `cls.__dict__`, warn and honor the override — raising breaks subclasses and mixins that intentionally shadow fields
  - Skip `six.with_metaclass()`'s synthetic `NewBase` in inheritance walks with `isinstance(base, ModelBase)` and not (`base.__name__ == 'NewBase'` and `base.__mro__ == (base, object)`) instead of name/module string checks — those break under reruns/other loaders
  - Fix inheritance issues on the class being created in `ModelBase.__new__`; never delete or mutate parent attributes — sibling classes share those bases and will silently lose state
<!-- rule:1638 -->
- Keep connection pools and persistent connections in fork-safe per-connection/thread-local state that resets on fork, not class-level mutable globals — forked children would otherwise share the parent's live handles and corrupt both sides' connections — Django DB backends hold OS-level resources (sockets, pools) that are not safe to share across processes. Class-level globals cause the parent and forked child to fight over the same handles; resetting too early (at import) or in the wrong process (`before=`) either breaks backend overrides or kills connections the parent still needs.
  - Register fork cleanup through the connection-opening lifecycle (not at module import) — so each backend under `django/db/backends/*` can customize or override the reset
  - Perform fork cleanup via `os.register_at_fork(after_in_child=...)`, not `before=...` — the parent's resources stay open and usable; only the child's inherited copies get reset
<!-- rule:6327 -->
- Keep `Field`/`Index` helpers model-free; derive model-dependent values via `set_name_using_model(model)` — `Options` assigns the model after instantiation, so caching it in `set_model` or hiding it behind property-access side effects leaves stale refs when models are cloned or swapped. — `Options` assigns the model after instantiation, so caching it in `set_model` or hiding it behind property-access side effects leaves stale refs when models are cloned or swapped.
<!-- rule:2897 -->
- Mirror `ConnectionHandler` when adding async support: expose `async_connections = AsyncConnectionHandler()` alongside `connections = ConnectionHandler()` with an identical interface — shared code can operate on either handler without branching. — Shared ORM code (e.g. `django/db/models/query.py`) and backends (`django/db/backends/postgresql/base.py`) must work transparently against both handlers; parallel interfaces avoid branching on sync/async. Lazy caching with opt-in `.new()` prevents accidental per-request connection churn. Event-loop detection prevents `AsyncConnectionHandler` from being created where it cannot run.
  - Lazily create and cache per-alias connections in `ConnectionHandler.__getitem__`; make new connections explicit opt-in via `connections[alias].new()` — default access reuses one per-request connection, preventing connection leaks.
  - Check for a running event loop before instantiating `AsyncConnectionHandler` and fall back to the synchronous path when none exists — keeps sync-only contexts (management commands, tests, sync views) working.
<!-- rule:920 -->
- In relation-tracking APIs (`django/db/models/fields/related.py`, `ProjectState.related_fields`), return the matched related field/model or `None` directly, and keep an inverse index keyed by the target model for O(1) lookup/removal — scanning all tracked relations or wrapping results in an aggregate container forces callers to unpack and makes large relation sets quadratic. — Callers expect the object they looked up, not a container to unpack, and inverse-indexed removal keeps relation bookkeeping O(1) instead of scanning every tracked relation — a scan cost that compounds across the many lookups performed during model and migration state resolution.
<!-- rule:6376 -->
- Define set-operation keywords (`UNION`/`INTERSECT`/`EXCEPT`) in `DatabaseWrapper.set_operators`, not as hardcoded constants — Oracle spells `except` as `MINUS`. — Read them via `self.connection.set_operators[...]` or `connections[self.db].set_operators[...]` in the SQL compiler; store only the base keyword per operation (e.g. Oracle's `set_operators` maps `except`→`MINUS`, `union`→`UNION`, `intersect`→`INTERSECT`) so the compiler can append modifiers like `ALL`. Hardcoding breaks on backends whose syntax differs.
<!-- rule:1391 -->
- Centralize `Concat` behavior in base `django/db/models/functions/text.py` hooks (`as_sql`, `prepare_concat_expr`); let backend overrides (SQLite/Postgres/Oracle) supply only operator differences and minimal null/casting tweaks — isolates the concat/null-handling contract for nullable and non-text inputs so backends can't silently diverge. Deprecate internal helpers like `ConcatPair` once the unified strategy lands. — Splitting shared concatenation, null-handling, and casting into the base implementation keeps the nullable/non-text input contract consistent across all backends, so per-backend overrides only express genuine operator and coalescing differences rather than duplicating (and drifting from) shared behavior.
<!-- rule:3023 -->
- In Django ORM query-tracking code (`django/db/models/query.py`, `django/db/backends/base/base.py`): — This prevents query-tracking state from becoming inconsistent between `connection.queries`/`queries_log` and QuerySet execution, which would cause incorrect query counts, stale logs, and unreliable debugging or `assertNumQueries` behavior.

## Naming

<!-- rule:5955 -->
- Use the established ceiling name per backend — `_sqlite_ceiling` in `django/db/backends/sqlite3/base.py`, `CEIL` for Oracle — never `_sqlite_ceil` or `CEILING`. — Django's ORM layer in `django/db/models/functions/math.py` and the backend implementations in `django/db/backends/*/base.py` resolve these helpers by name, and each backend exposes its own native spelling. Introducing a variant silently breaks that name-based lookup and leaves the same operation called three different things across backends, which makes cross-backend behavior hard to compare and debug.
<!-- rule:4957 -->
- Use `sliced`/subquery-slicing terms and flags like `is_sliced` and `allow_sliced_subqueries_with_in` in Django ORM query-slicing and backend feature code — slicing can be offset-only and may not emit a SQL `LIMIT`, so `limit`-specific names and new `*_with_limit` capability flags misrepresent the semantics — Slicing is a superset of limiting: `qs[5:]` is offset-only and produces no `LIMIT` clause. Naming flags after `limit` (e.g. `allow_sliced_subqueries_with_limit`, `is_limited`) would falsely imply a SQL `LIMIT` is always present, leading backend authors to gate capabilities incorrectly and query builders to reason about the wrong invariant. The existing `is_sliced` / `allow_sliced_subqueries_with_in` vocabulary in `django/db/models/sql/query.py` and `django/db/backends/base/features.py` captures the actual condition being tested.
<!-- rule:4874 -->
- Centralize quoting/sanitization of generated index names in `_create_index_name()` — call-site quoting drifts between `schema.py` and `indexes.py`. Document and test non-obvious transforms so they can't be silently dropped. — Both `django/db/backends/base/schema.py` and `django/db/models/indexes.py` generate index names; keeping quoting in the shared helper ensures consistent behavior across backends and models. Testing non-obvious transformations (e.g., truncation, hashing) prevents accidental removal or inconsistent application during refactors.

## Code Style

<!-- rule:3713 -->
- Rule text: When updating multiple rows or keys in the same table/target, aggregate them into a single UPDATE statement (using WHERE key IN (...) or an OR-combined condition) instead of issuing one query per row or per batch. If only a single update is pending, calling update() directly is acceptable. — Reformulate as a concise AGENTS.md bullet under 100 chars for the rule, with rationale about batching updates to avoid N+1 query performance issues, preserving Django file references.
  Category: code_style
  Scope: Django bulk-update and deletion code, e.g. django/db/models/deletion.py and sequence-reset logic
  Placement rationale: The rule is a database-layer performance/code-style convention, not a repo-wide Python style rule. It applies across Django DB code, notably django/db/models/deletion.py and django/db/backends/sqlite3/operations.py, so the shared parent module django/db is the narrowest common scope. Placing it in django/db/AGENTS.md makes it discoverable for AI assistants editing ORM, backend, or sequence-reset code while avoiding an overly global rule at the repository root.
  Example of bad code: None
  Example of good code: None
  ---
  Rewrite this rule for an AGENTS.md file. Make it concise, actionable, and include the WHY. Preserve Django-specific references like django/db/models/deletion.py. Use backticks for code identifiers. Target the shared parent module django/db.
<!-- rule:3792 -->
- ## Django ORM / SQL column ordering — Django's ORM code (in `django/db/models/sql/query.py` and backend `introspection.py`) tracks columns by index; any unordered container or unsynchronized mutation yields misaligned columns or nondeterministic query results.
  - Derive positional column order from ordered sequences, never `set` or `set.union()` — sets scramble indices in `Query.select`/`Query.selected`, `annotation_select_mask`, and positional `GROUP BY n`/`ORDER BY n` clauses.
  - Mutate `self.selected` in the same method that changes its ordered source — parallel index maps silently desync and point at wrong columns otherwise.
  - Require an explicit `ORDER BY` (e.g., `ORDER BY index_name, column_position`) when per-key row order matters in `django/db/backends/*/introspection.py` — databases make no ordering guarantee without it.

## General

<!-- rule:2583 -->
- Write regression tests for selective cleanup/filtering in `Collector.collect()` that fail when the new branch is removed **and** assert non-matching entries are preserved — positive-only assertions miss over-filtering that silently drops unrelated rows (applies to deferred SQL/`RESTRICT` handling in `django/db/models/deletion.py` and deferred SQL cleanup in `django/db/backends/base/schema.py`) — Selective cleanup logic (e.g., removing only deferred SQL entries referencing a deleted index, or `RESTRICT` handling) is easy to over-broaden; tests that only assert targeted entries were removed will pass even when unrelated entries are wrongly dropped. The negative assertion and the fails-when-removed check together pin down the exact branch.
<!-- rule:6195 -->
- Treat `Meta.auto_register = False` as a full opt-out: do not create/modify related models or touch `AppCache`/registries. — Ensures internal models (e.g. schema-editor models in `django/db/backends/sqlite3/schema.py`) that pass through `django/db/models/base.py` / `loading.py` don't leak into the global app registry when they explicitly opt out.

## File-Specific Rules

### `django/db/transaction.py`

<!-- rule:5267 -->
- Expose robust callbacks as `on_commit(func, robust=False)` on `transaction.on_commit()` — not a separate `on_commit_robust(...)` function. Keep one ordered hook registry in `django/db/transaction.py` with per-entry metadata like `(sid, func, is_robust)` instead of parallel per-variant lists, and run all callbacks in registration order. — A single entry point keeps the public API in `django/db/transaction.py` small and consistent, and one ordered registry preserves cross-variant declaration order — parallel lists drift and make robust vs. plain callbacks fire in inconsistent sequences, breaking callers that rely on ordering.
<!-- rule:5715 -->
- Define test-only transaction flags on `transaction.Atomic` (e.g. `_ensure_durability`), not on `BaseDatabaseWrapper` — Flags on `BaseDatabaseWrapper` are per-connection, so behavior meant to be global silently differs across connections and backends; class-level attributes on `Atomic` apply uniformly and stay out of the backend connection API.

<!-- /braindump -->