<!-- braindump: rules extracted from PR review patterns -->

# django/db/backends/oracle/ Guidelines

## API Design

<!-- rule:5957 -->
- In the Oracle backend, convert `datetime.timedelta` in `quote_value()` to a quoted ISO duration via `duration_iso_string(value)`; don't override `prepare_default()` to emit `duration_string(value, verbose=True)`. — Oracle's interval literals only accept ISO 8601 durations, so verbose `duration_string` output would produce invalid SQL and diverge from what `quote_value()` emits.
<!-- rule:1344 -->
- Pass `arraysize` to `cursor.var()` only inside output type handlers, matching the cursor's `arraysize`; omit it for input binds like `Variable.bind_parameter` in `django/db/backends/oracle/utils.py` — input-bind variables aren't fetched, so a per-var `arraysize` overrides the cursor setting and skews fetch buffering. — In cx_Oracle, `arraysize` controls fetch buffering and is meaningful only for variables read back from the database. Applying it to input-bind vars overrides the cursor-level value and can change fetch behavior unexpectedly, so it must be reserved for output type handler variables that mirror the cursor's `arraysize`.

## General

<!-- rule:5589 -->
- Run Oracle tests under both `MAX_STRING_SIZE=EXTENDED` and default `STANDARD` — skip guards only cover graceful degradation, not the enabled path. — Conditional `skip` guards in the existing suite verify tests *skip* cleanly when `MAX_STRING_SIZE` is `STANDARD`, but never exercise the new `EXTENDED` code path; running only the default setting leaves the enabled branch untested and regressions undetected.
<!-- rule:5818 -->
- Join on key columns, not repeated filters: correlate `user_col_comments.table_name = user_tab_cols.table_name AND user_col_comments.column_name = user_tab_cols.column_name` in the `ON` clause instead of re-binding `UPPER(%s)` in `WHERE` — the join already exposes normalized values, and duplicating filters re-binds params and drifts out of sync with the joined relation (see `django/db/backends/oracle/introspection.py`). — The joined relation (e.g. `user_tab_cols`) has already applied the normalization and parameter binding, so its columns are directly comparable. Restating `UPPER(%s)` filters or rebinding the same parameter in `WHERE` duplicates work and creates a second source of truth that can silently diverge from the join condition.
<!-- rule:5590 -->
- Detect `max_string_size` in `django/db/backends/oracle` by creating a global temporary table with a `VARCHAR2(5000)` column and inserting a 5000-char string, then reading back its length (`4000` = `STANDARD`, `5000` = `EXTENDED`) — querying `v$parameter` requires `SELECT_CATALOG_ROLE`, which most users don't have. — The GTT probe works with ordinary privileges, so `migrate`/`createdb` don't fail for users lacking `SELECT_CATALOG_ROLE`.

## File-Specific Rules

### `django/db/backends/oracle/creation.py`

<!-- rule:4362 -->
- Expose hard-coded test-DB creation params as tunable `TEST.*` settings (e.g. `DATAFILE_SIZE`, `DATAFILE_EXTSIZE`, `DATAFILE_TMP_SIZE` in `django/db/backends/oracle/creation.py`) — otherwise users can't size tablespaces/datafiles for their environment; mirror existing `*_TMP_*` naming so related options stay discoverable — Hard-coded sizing in `django/db/backends/oracle/creation.py` forces users to fork the backend when their Oracle environment needs larger/ smaller datafiles or temp tablespaces. Promoting these to `TEST.*` settings keeps the backend usable across environments, and mirroring existing names like `DATAFILE_MAXSIZE`/`DATAFILE_TMP_MAXSIZE` with size/extsize/tmp variants prevents confusion when users set one option but not its temp counterpart.

### `django/db/backends/oracle/introspection.py`

<!-- rule:6162 -->
- ## Oracle `get_table_description()` — Both bullets are scoped to `django/db/backends/oracle/introspection.py:get_table_description()`, preserving the exact identifiers (`is_json`, `is_autofield`, `cursor.prepare`, `cache_key`, `SELECT *`) that an assistant editing that file needs. The rationale for each explains the concrete failure mode (missing flags / stale prepared-statement cache) rather than invoking a rule.
  - **Keep Oracle-specific column flags in `django/db/backends/oracle/introspection.py:get_table_description()`** — pull `is_json`, `is_autofield`, etc. from Oracle dictionary views rather than swapping in a generic column-description list; those flags don't exist in the generic shape and downstream schema/migration code depends on them.
  - **Call `cursor.prepare(statement, cache_key)` with a unique `cache_key` before `cursor.execute(statement)`** in this function — Oracle caches prepared statements per cursor, so reusing a key makes migrations pick up a stale `SELECT *` column list from an earlier table and introspect the wrong schema.

### `django/db/backends/oracle/operations.py`

<!-- rule:5275 -->
- In `date_extract_sql` (`django/db/backends/oracle/operations.py`), extend the `if/elif` chain with Oracle-native `TO_CHAR` branches per `lookup_type`; for `iso_week_day`, adapt `TO_CHAR(field, 'D')` with simple date arithmetic (e.g. subtract one day) rather than composing `TRUNC`-based or invented function names — keeps the backend consistent with Django's Oracle idioms and avoids expressions Oracle can't optimally execute. — Django's Oracle backend relies on native `TO_CHAR` formatting and straightforward date arithmetic so queries stay portable, index-friendly, and consistent with the rest of `operations.py`. Divergent `TRUNC`-based or ad-hoc function compositions break that convention and can produce incorrect ISO week-day values.
<!-- rule:602 -->
- In `bulk_insert_sql()` (`django/db/backends/oracle/operations.py`), wrap the `UNION ALL` of `SELECT ... FROM DUAL` in an outer `SELECT * FROM (...)` and alias every first-SELECT column uniquely (`col_0`, `col_1`) — emitting the set operation directly triggers `ORA-00918`, because Oracle identity columns implicitly add `sequence.nextval`, which cannot appear in a `SELECT` combined via `UNION`/`INTERSECT`/`MINUS`. — Without wrapping the set operation and uniquely aliasing the first-SELECT columns, Django bulk inserts into Oracle identity-column tables fail with ORA-00918 because the implicit `sequence.nextval` is left as an unaliased/duplicate column name in the `UNION ALL`, making the compound query ambiguous.
<!-- rule:6394 -->
- Document Oracle SQL-shape constraints inline in `django/db/backends/oracle/operations.py` — the `sequence.nextval` identity workaround can't mix with `UNION`/`INTERSECT`/`MINUS`, and the `SELECT * FROM (...)` alias wrapper avoids `ORA-00918`, so unexplained odd SQL gets "cleaned up" and rebreaks Oracle. — The Oracle backend emits SQL shapes that look wrong on purpose: identity columns resolve through `sequence.nextval`, that sequence cannot appear in a `SELECT` combined with `UNION`/`INTERSECT`/`MINUS`, and the generated query is wrapped in `SELECT * FROM (...)` with aliases to dodge `ORA-00918`. Without a nearby comment, a maintainer sees weird SQL and "simplifies" it, reintroducing the Oracle errors the workaround was written to prevent.
<!-- rule:6325 -->
- In `sql_flush(..., allow_cascade=True)` (`django/db/backends/oracle/operations.py`), group FK constraints by source table (`{foreign_table: {constraint, ...}}`), not a flat set — per-table `ALTER TABLE ... DISABLE/ENABLE CONSTRAINT` must emit independently so identifier-length behavior holds. — A flat constraint set collapses DDL into a single emit path, so Oracle identifier-length handling can't apply per table. Keying by source table keeps each `ALTER TABLE` independent.

Process each table/constraint once per flush, even when it recurs in a dependency cycle — prevents redundant truncation and constraint toggling.

### `django/db/backends/oracle/schema.py`

<!-- rule:2406 -->
- Release backend metadata before schema changes: in `alter_field` (`django/db/backends/oracle/schema.py`) drop the identity or PK constraint before altering/dropping that column — Oracle raises `ORA-` errors on the ALTER while it exists, so converting a PK column to identity or dropping an identity column fails without the cleanup. — Without dropping the identity or PK constraint metadata first, Oracle raises `ORA-` errors on the subsequent ALTER or DROP, so identity-column drops and PK-to-identity conversions fail instead of completing.

<!-- /braindump -->