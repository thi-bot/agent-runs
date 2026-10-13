<!-- braindump: rules extracted from PR review patterns -->

# tests/backends/ Guidelines

## Testing

<!-- rule:5683 -->
- Set `connection_encoding` to a non-UTF-8 value like `iso-8859` (via a copied connection or `OPTIONS`) in client-encoding tests — don't assume `'UTF-8'` is the effective default, since `OPTIONS` makes encoding overridable. — Asserting a fixed UTF-8 default fails to exercise the `OPTIONS`-based override path, so regressions in custom encoding handling go undetected; pinning a distinct encoding and asserting the effective value verifies the override actually propagates.
<!-- rule:3607 -->
- Add operation tests per backend in `tests/backends/{backend}/test_operations.py` — keeps coverage discoverable and consistent across backends — Placing operation tests at `tests/backends/{backend}/test_operations.py` gives each backend a predictable test location. Testing empty/single/composite `fields` and calling operations with the args real callers use (sequences as lists, optional params passed explicitly as `None`) catches bugs that happy-path or permissive-shortcut tests skip.
  - Cover empty, single, and composite `fields` in op tests — edge cases surface bugs that happy-path tests miss
  - Invoke ops with signature-matching args: lists for `fields`, explicit `None` for absent `params` — exercises the real call shape rather than permissive shortcuts
<!-- rule:3608 -->
- Add unconditional backend-agnostic tests in `tests/backends/tests.py` asserting methods callable on all backends don't raise — catches API contract violations across every supported backend. — Backend API methods that every backend must support can silently break on one backend without a shared contract test, so a no-raise assertion ensures the common interface stays uniform and surfaces regressions immediately.
<!-- rule:6352 -->
- In `tests/backends`, assert `is_usable`-style predicates return the correct outcome for each connection lifecycle state (`open`, `closed`, non-existing) — a non-raising check alone won't catch wrong results. — Predicates like `is_usable` can return `False` (or the wrong value) without raising, so tests that only check for absence of exceptions pass even when the predicate is broken across lifecycle transitions.
<!-- rule:2010 -->
- Verify Oracle pool session reuse via `SID` + `serial#` using non-privileged queries (see python-oracledb pool tests) — querying `v$session` needs `SYSDBA`, which CI lacks — `v$session` requires a `SYSDBA` connection, so tests written against it fail in normal environments; the non-privileged pattern keeps pool/session-reuse checks runnable in CI while still asserting the full session identity (`SID` + `serial#`), which is what actually distinguishes reused sessions.
<!-- rule:3455 -->
- Cover all `SQLInsertCompiler.assemble_as_sql` branches in PostgreSQL compiler tests — assert `InsertUnnest` is produced for multi-row literal non-array inserts, and the base compiler for single-row, raw/compilable-value, or array-typed-field inserts — so regressions in the UNNEST bulk-insert path selection surface immediately. — Guards the UNNEST bulk-insert optimization from silent regressions: the compiler must pick the right path per input shape.

## File-Specific Rules

### `tests/backends/sqlite/tests.py`

<!-- rule:4742 -->
- In `tests/backends/sqlite/tests.py`, add tests for `OSError` on invalid/unwritable DB directories and for recursive creation across multiple subdirectory levels (`parents=True`) — these cover the SQLite dir-setup failure and recursion branches that otherwise go untested. — The two code paths most likely to break without notice: the `OSError`/unwritable-path case that determines whether errors propagate cleanly, and the `parents=True` recursion that determines whether deeply nested DB dirs get created.

<!-- /braindump -->