<!-- braindump: rules extracted from PR review patterns -->

# django/db/backends/ Guidelines

## Code Style

<!-- rule:4363 -->
- Construct test-database params through the shared `_get_test_db_params(suffix)` helper in `django/db/backends/*/creation.py`; don't add per-operation helpers like `_get_cloned_db_params()` or `if suffix:` branches at call sites. — Creation and cloning share the same parameter shape, so a single helper keeps them in sync — separate helpers let params drift between operations and across backends (`sqlite3`, `oracle`).
  Rationale: Creation and cloning share the same parameter shape, so a single helper keeps them in sync — separate helpers let params drift between operations and across backends (`sqlite3`, `oracle`).
<!-- rule:5357 -->
- Log `COMMIT`/`ROLLBACK` SQL debug in `CursorDebugWrapper` methods (`django/db/backends/utils.py`) via the `debug_sql(sql=...)` context manager — e.g. `def commit(self): with self.debug_sql(sql='COMMIT'): return super().commit()` — not in `BaseDatabaseWrapper` connection methods like `_commit`. — Keeps debug output on the same code path as all other SQL logging, so it's consistent with query logging and `queries_log`, and keeps debug concerns out of the core connection wrapper.
<!-- rule:475 -->
- Consolidate shared connection setup into the single lifecycle hook that needs it — duplicated setup between `prepare_database()` and `get_new_connection()` drifts silently; comment intentional duplication so reviewers can tell it apart from an oversight — Lifecycle-hook setup is easy to duplicate without noticing, and each copy can be edited independently, so the hooks silently drift apart. Comments are the only signal distinguishing deliberate duplication from accidental. Test passes after removing a setup call often mean the code path isn't exercised, not that the call was unnecessary. When shared setup is extracted, non-pooled backends are the easy-to-miss path; if a helper ends up bypassed on one path, reverting beats maintaining two behaviours. Requiring an explicit `connection` argument prevents helpers from silently binding to whatever default connection happens to be active.
  - Never remove a setup call from a hook just because tests pass — passing tests flag missing coverage, not redundancy
  - Invoke extracted setup helpers on every construction path (pooled and non-pooled) — revert the refactor rather than leave paths diverged
  - Pass `connection` explicitly to connection-dependent helpers — don't rely on a default connection
<!-- rule:5935 -->
- In `get_relations()` constraint checks, assign to `relations` and unpack with `for key, (value_a, value_b) in relations.items():` — avoids `NameError` from an unbound variable and matches the method's nested-tuple return shape — The method returns `{key: (value_a, value_b)}`, so assigning to `relations` before iterating prevents `NameError` and the tuple unpacking matches the actual return shape.
<!-- rule:3845 -->
- In backend `introspection.py` routines like `get_table_description()`, apply derived-field adjustments (e.g., composite PK `pk` demotion) inside the loop that builds the `FieldInfo` collection — a separate pass re-derives the conditions and can drift from the construction logic. — Keeping construction and adjustment co-located means the demotion conditions are evaluated against the same per-field state used to build each `FieldInfo`, so they can't diverge. A second pass over the finished list would duplicate the derivation logic, risk mismatched indices, and make the two code paths drift apart across the sqlite3, MySQL, PostgreSQL, and Oracle backends.

## API Design

<!-- rule:1987 -->
- Access database cursors via the public API only in `django/db/backends` — a single driver exposes multiple cursor classes (e.g. psycopg3), so private attrs like `_cursor` present on one may be missing on another, raising `AttributeError` at runtime. — Drivers like psycopg3 expose several cursor classes within the same backend; underscore-prefixed attributes are not part of the shared interface and absent on some classes, so reaching into them breaks cursor handling depending on which cursor type is in use.
<!-- rule:2905 -->
- Encapsulate connection/hook setup+teardown for `BaseDatabaseWrapper` in a single cached context manager with a behavior-descriptive name (`connect_manager`, `execute_hook`) and wrap `connect()`/`aconnect()` and cursor methods with it — one code path for the lifecycle, so sync/async and hook teardown can't drift apart — Collapsing connect/hook lifecycle into one cached context manager keeps sync and async paths and their teardown consistent, while the cached no-op fast path preserves query throughput when no hooks exist.
  - On hot per-query paths, keep a cached no-op fast path so the context manager/`ExitStack` is only entered when hooks are registered — avoids paying per-query overhead in the common no-hooks case
<!-- rule:1681 -->
- In `django/db/backends/*/base.py`, limit `create_cursor`/`make_cursor` params to what the driver's `cursor()` accepts (cx_Oracle takes none) — unsupported `args`/`kwargs` raise at runtime. — Cursor wrappers live in sibling backend modules under `django/db/backends/*/base.py`, so signatures must track each driver's real `cursor()` contract rather than a shared superset. Drivers such as cx_Oracle accept no arguments to `cursor()`, so forwarding `args`/`kwargs` raises at connection time; when the limitation is unavoidable, an inline note at the creation site keeps future maintainers from re-adding the dropped parameters.
  - Comment inline at the cursor-creation site when a driver limitation forces dropping `args`/`kwargs` — readers would otherwise "fix" the omission and break that backend.
<!-- rule:5675 -->
- In Django schema editors, read field-specific DB params (e.g. `collation`) from the `db_params` dict-like structure, not via `getattr` on the field or method return conventions — backends like MySQL, SQLite, and Postgres adapt SQL by overriding `db_params`, so direct attribute reads bypass per-backend customization. — Backend schema editors customize column SQL by overriding the `db_params` dict (e.g. adding `collation`); reading field attributes directly breaks that adaptation and silently produces wrong DDL on backends that rely on it.

## Config

<!-- rule:346 -->
- Split `init_command` on `;` when executing, and join generated connection-init clauses with `;` when they can't merge — preserves single-roundtrip connection setup and matches MySQL's `;`-splitting convention used across DB backends. — Different DB backends (MySQL, SQLite, etc.) accept multiple init statements differently, but the convention is to treat `;` as the statement separator uniformly. Splitting incoming `init_command` values at execution and joining unmergeable clauses with `;` lets a backend run all init statements in one roundtrip — avoiding per-statement connection overhead and keeping behavior consistent with `django/db/backends/mysql/base.py`. Backends that skip this diverge in behavior and test expectations like those in `tests/backends/sqlite/tests.py`. This belongs in the backends-layer `AGENTS.md`, not the root, since it only applies to DB connection initialization code.
<!-- rule:1632 -->
- Key per-alias backend caches (e.g., Django connection pools) by `self.alias`, not mutable params like `password`, `dbname`, or `conn_params` — password rotation would create new cache entries, causing unbounded cache growth and leaked pools. — Both rules concern how `django/db/backends/*` backends (notably `postgresql/base.py`) manage per-alias resources. Caching by mutable connection parameters breaks under runtime changes like password rotation, and repurposing aliases for config flags corrupts introspection, so the guidance is module-scoped rather than repo-wide.
  - Don't overload connection aliases to control unrelated options (e.g., enabling pooling) — aliases must reflect the real connection identity so database logs and introspection stay accurate.
  Place this in a directory-scoped `AGENTS.md` at `django/db/backends/`.
<!-- rule:5528 -->
- Compare boolean `OPTIONS`/settings values with `is True`/`is False`, never truthiness — env-var-derived strings like `"False"` or `"0"` are truthy and would silently enable the option — Environment variables always arrive as strings, so a truthiness check on e.g. `django/db/backends/*` `OPTIONS` would treat `"False"` and `"0"` as enabled; identity checks keep env-configured booleans behaving as written.
<!-- rule:5165 -->
- Detect `JSONField` columns per backend: MySQL via `FIELD_TYPE.JSON`/`data_type`, MariaDB via `information_schema.check_constraints` where `check_clause` is `json_valid(`column`)`; map to `JSONField` in `FIELD_TYPE` and `get_field_type()`, and add the `JSON_VALID` `data_type_check_constraint` only when `self.connection.mysql_is_mariadb` is true. — MariaDB aliases JSON as `LONGTEXT` guarded by a `json_valid` CHECK constraint, so MySQL-only detection silently misclassifies columns and applies constraints the server rejects.

## Error Handling

<!-- rule:330 -->
- SQLite ignores `PRAGMA foreign_keys = OFF` once a transaction is open (silent no-op after `BEGIN`), so: — SQLite cannot toggle `foreign_keys` inside an open transaction, so code that disables FK checks from within `atomic()` or after `BEGIN` silently fails to disable them — leading to test setup that quietly enforces constraints and unexpected `IntegrityError`s. Documenting it inline prevents the next maintainer from re-learning this the hard way.
  - Issue `PRAGMA foreign_keys = OFF` before `BEGIN` — inside a transaction it silently does nothing, leaving FK enforcement on
  - Never call `constraint_checks_disabled()` inside an `atomic()` block in the SQLite backend — the pragma won't take effect and tests silently keep FK checks active
  - Verify FK-disabling support per backend before assuming a backend-agnostic pattern — SQLite's semantics differ from PostgreSQL/MySQL
  - Add inline comments in `django/db/backends/sqlite3/base.py` (and analogous backend modules under `django/db/backends/base/`) documenting this non-obvious behavior — future maintainers won't rediscover the silent no-op
<!-- rule:4852 -->
- Match `pg_class.relkind` codes to the intended relation type in introspection queries — e.g. use `'f'` for foreign tables, not an assumed default. — Catalog filters in `django/db/backends/*/introspection.py` are consumed by schema-editing and migration code; a predicate that relies on an undocumented relkind default or that filters constraint types in Python instead of SQL can silently include or drop relations (e.g. foreign tables) and break migrations on backends the reader didn't test against.
  Push constraint-type and relation-type filtering into SQL `WHERE`/join predicates instead of Python `if` branches — keeps the query's contract with `pg_catalog` explicit and avoids silently widening results when the catalog changes.
  Avoid filters that rely on undocumented catalog behavior; base predicates only on documented `pg_class`, `pg_constraint`, etc. columns and codes — the introspection contract must hold across supported Postgres versions.
<!-- rule:342 -->
- In `ensure_connection`-style methods, put new connection-opening checks inside the `if connection is None:` branch — validation must run only when a new connection is actually opened, so reused connections aren't re-validated or falsely rejected. — Placing the check outside the `if connection is None:` branch causes it to run on every call, including when an existing healthy connection is returned. That breaks reuse semantics — already-open connections get re-validated (and potentially rejected) on every access, adding overhead and spurious failures in Django database backend connection-acquisition paths under `django/db/backends`.
<!-- rule:1951 -->
- Keep no-op, fallback, and unsupported-feature paths in schema editor methods silent — signal state via return values or exceptions, not debug logs — These paths are expected in `django/db/backends` schema editors (backends legitimately lack feature support), so logging them just spams output; return values and exceptions let callers distinguish intentional no-ops from real failures.

## General

<!-- rule:4762 -->
- Gate `BLOB`/`TEXT` defaults on `_is_limited_data_type(field)` plus the MariaDB 10.2.1 boundary — non-MariaDB or MariaDB < 10.2.1 must skip them, and only MySQL needs the parenthesized default — MySQL and MariaDB diverged on when limited data types (BLOB/TEXT) accept defaults, and MySQL only supports setting them via `MODIFY COLUMN ... DEFAULT` rather than `ALTER COLUMN ... SET DEFAULT`. Encoding the wrong version boundary or assuming shared capability produces invalid DDL on one backend, so the precise ranges must be cited in docstrings and gated via `_is_limited_data_type(field)` in the MySQL schema editor.
  - Treat `_supports_limited_data_type_defaults` as MariaDB-10.2.1+ only; MySQL lacks `ALTER COLUMN ... SET DEFAULT` (only `MODIFY COLUMN ... DEFAULT` works)
  - Docstrings/comments must state exact version ranges (e.g. "MySQL < 8.0.13", "MariaDB (except 10.2+)") with no obsolete references
<!-- rule:1682 -->
- Name backend cursor classes distinctly from driver classes — e.g. `ServerSideCursor`, not `ServerCursor` — so they aren't confused with psycopg's `ServerCursor`, whose semantics differ. — Django DB backend cursor classes often reuse names from psycopg2/psycopg3 (`ServerCursor`, etc.) but change behavior. Distinct names plus documented base-class provenance prevent callers and maintainers from assuming driver semantics and misusing the cursor.
  - In cursor class docstrings, note which base classes come from `psycopg2`/`psycopg3` vs. are project-defined — readers can then tell which semantics apply.
<!-- rule:1988 -->
- Document cursor output-type handlers in `django/db/backends` with a docstring noting they run once per fetched column and why values are converted — prevents "simplifying" conversions (e.g. numbers returned as strings to avoid decimal rounding errors) that look redundant. — These handlers run per-column, so their conversions are deliberate; undocumented, later readers delete them as noise and reintroduce rounding bugs.
<!-- rule:4851 -->
- Use catalog-qualified forms like `obj_description(c.oid, 'pg_class')` and `col_description(oid, 'pg_class'::regclass)` in PostgreSQL introspection SQL, not deprecated single-arg forms — single-arg variants misresolve across catalogs and break on newer servers — Single-argument `obj_description`/`col_description` are deprecated and resolve against the default catalog, which yields wrong comments when introspecting non-`pg_class` relations and errors on newer PostgreSQL versions; the two-arg form is the documented, forward-compatible API.

## Topic Guides

Check these when working in specific areas:

- **[Database Backend SQL Generation and Type Mapping](agent_docs/database-backend-sql-generation.md)**: When writing or modifying database backend SQL generation, type mappings, query-analysis helpers, or flush/sequence SQL.

## File-Specific Rules

### `django/db/backends/base/operations.py`

<!-- rule:1318 -->
- In `django/db/backends/base/operations.py` window-frame docstrings, document `start` as a preceding offset from the current row and `end` as a following offset, and describe the return value as SQL for an `OVER`-clause window-frame — the relative framing is non-obvious and misreading it as absolute positions yields wrong frame specs. — The relative framing is non-obvious and misreading it as absolute positions yields wrong frame specs.

### `django/db/backends/base/schema.py`

<!-- rule:2780 -->
- In `_iter_column_sql` (`django/db/backends/base/schema.py`), emit generated columns as their own branch and skip `NOT NULL`/`NULL` — nullability derives from the `GENERATED ALWAYS` expression, so explicit clauses there are invalid or conflicting. — Keeps DDL generation aligned with how the database derives nullability for computed columns; appending explicit nullability produces invalid or contradictory SQL.

### `django/db/backends/mysql/operations.py`

<!-- rule:5537 -->
- Dispatch `ON DUPLICATE KEY UPDATE` row refs by vendor/version in `mysql/operations.py` — never hardcode `VALUES(column)`. — `VALUES()` is deprecated (and removed) in MySQL 8.0.20+ and MariaDB 10.3.3+; emit `AS new` + `new.column` for MySQL 8.0.19+, `VALUE(column)` for MariaDB 10.3.3+, and legacy `VALUES(column)` otherwise — hardcoding the legacy form breaks `ON DUPLICATE KEY UPDATE` on newer servers.

### `django/db/backends/mysql/schema.py`

<!-- rule:1620 -->
- In `django/db/backends/mysql/schema.py`, hardcode `_max_index_size` to utf8mb4 char limits: 191 on MySQL < 5.7.7, 767 on 5.7.7+ — deriving from connection charset produces different index sizes per connection, so pin the utf8mb4-based limits instead — Connection-charset-derived limits vary by each connection's charset, giving inconsistent index sizing; the fixed utf8mb4-based values keep `_max_index_size` deterministic regardless of configured charset.

### `django/db/backends/postgresql/base.py`

<!-- rule:2159 -->
- In `create_cursor` (django/db/backends/postgresql/base.py), set defaults via `kwargs.setdefault('scrollable', False)` and `kwargs.setdefault('withhold', self.connection.autocommit)` while still forwarding `*args, **kwargs` — changing defaults silently alters downstream cursor behavior. — These helpers have precise defaults and lifecycle semantics relied on by callers; deviating breaks cursor scrollability/withhold behavior and timezone cursor cleanup.
  - In `ensure_timezone()`, close the explicit `self.connection.cursor()` in a `finally` block — using `with` or `self.cursor()` would alter cursor lifecycle handling.

### `django/db/backends/postgresql/compiler.py`

<!-- rule:3456 -->
- Link authoritative UNNEST docs from `InsertUnnest` in `django/db/backends/postgresql/compiler.py` — the class exists only to exploit UNNEST's bulk-insert speedup, so the docstring needs the source that explains why. — `InsertUnnest` in `django/db/backends/postgresql/compiler.py` is a non-obvious optimization: it swaps multi-row `VALUES` for `UNNEST`, which is much faster for large inserts. Without a citation, future readers can't tell whether the tradeoff is intentional or accidental, making the class a tempting target for "cleanup" that would regress bulk-insert performance.

### `django/db/backends/postgresql/introspection.py`

<!-- rule:4850 -->
- Use `pg_table_is_visible(oid)`, `current_schema()`, and `self.connection.schema_name` for relation/schema visibility in `postgresql/introspection.py` — hardcoding `public`, adding `pg_namespace` joins or schema-equality predicates, or adding `pg_catalog.` qualifiers ignores `search_path` and breaks non-public-schema setups. — PostgreSQL resolves unqualified identifiers through `search_path`, so visibility must be delegated to `pg_table_is_visible`/`current_schema()` rather than assumed to be `public`. Django's reference introspection SQL already does this; deviating produces wrong `get_table_list()` results for schemas like `tenant1` or `myschema`. The `relnamespace` restriction preserves the same guarantee on the join side.
  When introspection SQL returns unqualified relation names, constrain any `pg_class`↔`pg_namespace` join to the same `relnamespace` — otherwise cross-schema relations get reported as local tables.

### `django/db/backends/postgresql/psycopg_any.py`

<!-- rule:6011 -->
- Alias `Inet` to `ipaddress.ip_address`, not `ipaddress.ip_network` in `django/db/backends/postgresql/psycopg_any.py` — `GenericIPAddressField` stores addresses, not networks — `ip_network` normalizes to CIDR (`/32`/`/128`) and psycopg serializes it as `cidr`, breaking backends without `cidr` support (e.g. CockroachDB).

### `django/db/backends/sqlite3/_functions.py`

<!-- rule:5958 -->
- Compute quarter months with `ceil(dt.month / 3)` in `django/db/backends/sqlite3/_functions.py` — reuses the `_sqlite_datetime_extract()` expression, so `_sqlite_date_trunc()` and extraction stay in sync — Equivalent-but-different formulas drift over edits and produce inconsistent quarter boundaries between truncation and extraction.
<!-- rule:5961 -->
- Format dates in `django/db/backends/sqlite3/_functions.py` with f-strings like `f"{dt.year:04d}"`, not `strftime` or `%`-formatting — These are hot-path helpers called per row, and explicit numeric specs keep zero-padding correct for years < 1000, where `strftime`'s output is platform-dependent.

### `django/db/backends/sqlite3/base.py`

<!-- rule:4741 -->
- In `django/db/backends/sqlite3/base.py`, wrap the parent-dir `mkdir` for file-based databases in `try`/`except OSError` and re-raise as `InterfaceError ... from e`; skip via `is_in_memory_db()` — raw `OSError` shouldn't leak to Django callers, and in-memory DBs have no directory to create. — Without the `try`/`except` + `from e`, filesystem failures surface as raw `OSError` rather than Django's `InterfaceError`, breaking the backend's error contract; without the `is_in_memory_db()` guard, in-memory databases would spuriously create directories.

### `django/db/backends/sqlite3/creation.py`

<!-- rule:5471 -->
- Comment branches in `django/db/backends/sqlite3/creation.py` test-db cloning — start-method/storage-mode branches aren't self-evident — Conditions checking multiprocessing start methods or DB storage modes don't reveal their intent from the code alone, so future readers can't tell which cloning operation each branch performs.
<!-- rule:5996 -->
- Name the destination connection `target_db` in SQLite backup/copy code in `django/db/backends/sqlite3/creation.py` (not `second_db` or other ordinals) — ordinal names hide which side is source vs. destination, so backup direction reads wrong at a glance. — In the SQLite backend's backup/copy logic, an ordinal like `second_db` says nothing about role: readers can't tell whether it is being read from or written to, and the same ordinal slips out of sync if a third connection is added. Naming the destination `target_db` makes the copy direction explicit at every call site in `django/db/backends/sqlite3/creation.py`.

<!-- /braindump -->