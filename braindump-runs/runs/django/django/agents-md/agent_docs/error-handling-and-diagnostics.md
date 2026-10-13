# Error Handling and Diagnostics

> Writing clear error messages, handling exceptions, validating inputs, and surfacing failures correctly.

**When to check**: When writing error messages, exception handling, input validation, or failure recovery.

## Rules

<!-- rule:2335 -->
- Write error messages for missing/unresolved constructs as concise declarative statements of the problem (e.g., `"Partial 'X' is not defined in the current template."`, `"Named cycle %r does not exist."`) — don't restate the user's action or prepend broader diagnostic context. — Keeps failure modes greppable and consistent, so users and tests can identify the specific missing construct without parsing unrelated framing.
<!-- rule:1911 -->
- Don't derive special-case ordering constraints from user-configurable order settings; raise an explicit error naming the required position (e.g., `"X must be listed after Y"`). — Users can reorder configurable settings freely, so tying a fixed dependency to a sort order makes the constraint silently disappear or misfire; a message naming the required relative position (`after X`) is unambiguous, whereas `must follow` leaves users guessing whether it means position or sequence.
<!-- rule:1507 -->
- In `loaddata` diagnostics (`django/core/management/commands/loaddata.py` and tests like `tests/fixtures/tests.py`, `tests/multiple_database/tests.py`), write messages that name the exact condition and responsible component. — Imprecise wording sends users down the wrong debugging path: `"No valid fixture data found for ..."` (not `"No fixture data found for ..."`) distinguishes an empty/unparseable fixture from a missing file, and attributing NUL-character rejection to `psycopg2` (not PostgreSQL) points at the layer actually raising the error.
<!-- rule:723 -->
- Fix zero-length/boundary bugs at the point the limit is exceeded, in the truncation logic itself — premature `%(truncated_text)s` resolution or separate counters only mask the off-by-one cases they should fix. — Fixing the truncation helper directly keeps behavior correct for zero-length and boundary inputs, rather than leaving them broken behind workarounds that hide the root cause.
<!-- rule:3548 -->
- Short-circuit uninitialized `reduce(operation, sequence)` calls on empty input — `reduce` raises `TypeError` on an empty iterable, so check truthiness before consuming the sequence — An uninitialized `reduce` (no third argument) throws `TypeError` on empty iterables, so guarding with a truthiness/non-emptiness check on the input before the call prevents runtime crashes on empty querysets, lists, or generators.
<!-- rule:1829 -->
- Use `parse_http_date_safe()` over `parse_http_date()` for HTTP date headers (`Expires`, `Last-Modified`, `If-Modified-Since`) and skip dependent logic when it returns `None` — malformed or user-set headers would otherwise raise and crash the request. — HTTP date headers can be malformed or set by user code; `parse_http_date_safe()` returns `None` instead of raising, so downstream cache/middleware calculations must be guarded.
<!-- rule:6170 -->
- Validate collection length and raise `ValueError` when an API accepts a sequence but supports only one item — silently using the first item or dropping extras hides caller bugs and can cause data loss — APIs whose contract is single-item (e.g. accepting a sequence of querysets) should reject multi-item input rather than silently truncating or ignoring entries; silent coercion masks misuse at the call site and leads to unexpected persistence behavior.
<!-- rule:6108 -->
- Catch only expected client aborts like `RequestAborted`; let `AssertionError` propagate uncaught — swallowing broad exceptions in protocol-server request handling turns internal invariant bugs into fake recoverable responses, hiding real server defects from developers. — Broad `except` blocks in request handlers convert internal implementation bugs (signaled by `AssertionError`) into ordinary error responses, so server-side defects silently masquerade as client-visible failures instead of surfacing in logs and tests. Restricting catches to genuinely expected client-abort conditions such as `RequestAborted` keeps error handling honest about what is recoverable.
<!-- rule:4632 -->
- Init warning registries via `module.__dict__.setdefault("__warningregistry__", {})`, not direct attribute access — warning helpers must not raise on modules lacking the registry. — Direct `module.__warningregistry__` access raises `AttributeError` on modules that haven't been warned yet; `setdefault` creates the registry atomically. Since warning/deprecation helpers exist to inform, not to fail, they must swallow errors from malformed module internals rather than propagate them.
  Catch exceptions when reading module internals in warning/deprecation helpers and fall back gracefully — malformed internals otherwise turn a cosmetic warning into a crash.
<!-- rule:5092 -->
- Keep `asyncio.current_task()` call, its `None` check, and the sync fallback in one `try`/`except RuntimeError` block. — Both absence modes — a `None` return (no running task) and a `RuntimeError` (no running event loop) — require the same sync fallback assignment. Handling only one path, or branching later on a possibly-`None` result, leaves the other case silently unhandled.
