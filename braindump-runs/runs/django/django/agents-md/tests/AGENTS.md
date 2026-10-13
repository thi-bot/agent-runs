<!-- braindump: rules extracted from PR review patterns -->

# tests/ Guidelines

## Testing

<!-- rule:347 -->
- Default to `'NAME': ':memory:'` for SQLite tests; detect in-memory DBs via `DatabaseCreation.is_in_memory_db` / `connection.is_in_memory_db()`, not `NAME` string matching — use named shared-cache URIs only when multiple connections must share the same DB. `is_in_memory_db()` handles URI-style names and shared-cache variants that manual `NAME` checks miss, so string matching silently misclassifies those connections and causes tests to hit disk or skip setup. — Wait, this needs to be a single rule. Let me reformat.
<!-- rule:6320 -->
- Guard in-loop assertions with a non-empty check — otherwise a vacuous pass hides regressions — When verification logic lives inside a loop over a collection, an empty collection skips every check and the test passes without exercising anything. Add an explicit non-empty/loop-ran guard before or after the loop, or accumulate the matched result during iteration and assert after the loop with an explicit failure when nothing matched. This pattern applies across `tests/` (e.g. `tests/schema/tests.py`, `tests/introspection/tests.py`).
<!-- rule:833 -->
- Add logging tests to `tests/logging_tests/`, extending existing classes and reusing helpers like `make_log_record()` — Logging tests scattered across `tests/admin_views/tests.py` and sibling suites duplicate log-record setup and drift from the shared assertions in `tests/logging_tests/`, so new coverage belongs with the existing classes.
<!-- rule:3645 -->
- Add parser tests to the existing parser test module/class (e.g., `tests/template_tests/test_parser.py::ParserTests`) — not higher-level integration tests or new test classes — Parser branches — especially exception-handling and handler-callback paths — are easiest to isolate and debug where the parser's own tests already live; scattering them across integration tests or new classes hides coverage gaps and duplicates setup.
<!-- rule:59 -->
- Branch version-dependent tests on explicit `GDAL_VERSION` / `geos_version_tuple` checks with version-appropriate assertions — mocks or unchecked expectations falsely pass on other CI runtimes — The test suite runs against multiple GDAL/GEOS/Python versions; if a test assumes one version's behavior without branching, it either fails on other CI runtimes or — worse — passes for the wrong reason and hides a real incompatibility. Explicit conditionals keep expectations aligned with what each runtime actually does.
<!-- rule:16 -->
- In `self.subTest(...)` loops, pass the varying input as a keyword arg (e.g. `self.subTest(locale=locale)`) and hoist loop-invariants out of the body — keyword labels pin the failing case; assertion output already shows expected/actual, and unstable `repr()`s make identifiers unreliable — Keyword labels on `self.subTest(...)` make the failing case greppable from CI output. Expected/actual values are already printed by the assertion, and platform-dependent `str()`/`repr()` objects can't reliably identify a case across runs.
<!-- rule:1782 -->
- Exercise ASGI views through `HTTP/ApplicationCommunicator` in `asgi.tests.ASGITest`, never `sleep` — sleep-based timing makes disconnect races flaky. — Lives in `tests/asgi/AGENTS.md`: an assistant editing ASGI tests needs to know the local convention of driving views over `HTTP/ApplicationCommunicator` rather than sleeping, and that mid-flight `http.disconnect` is asserted via view-side state (body received, one-time cleanup) because no `http.response.body` is emitted. `await communicator.wait()` plus cleanup keeps `python -Wall` runs `ResourceWarning`-free, and adding the test first makes lifecycle changes explicit.
  - Send `http.disconnect` while request/view processing is still in flight, then assert view-side state (`request.body` was received, cleanup ran exactly once) instead of awaiting an `http.response.body` — a disconnected request never produces a response.
  - `await communicator.wait()` and application cleanup so tests stay free of `ResourceWarning` under `python -Wall` — leaked tasks/apps surface as warnings in CI.
  - Add such a test first when changing request lifecycle behavior — it pins the intended semantics before the implementation drifts.
<!-- rule:2593 -->
- Preserve original interaction semantics when refactoring UI/interaction tests under `tests/` — carry over prerequisite interactions, implicit events, and incidental setup used by screenshots or assertions; capture screenshots at each meaningful interaction state rather than a single computed CSS assertion. — Dropping a prerequisite click, an implicit event the prior interaction fired, or incidental setup steps silently changes what the test actually exercises — screenshots and assertions pass against the wrong state. Per-state screenshots catch visual regressions that a single computed-CSS check misses.
<!-- rule:4548 -->
- In view tests, drive requests through the Django test client (`self.client`, `Client`) or existing shared helpers rather than calling views directly. — Exercising the real request/response lifecycle catches middleware, URL resolution, and context processor bugs that direct calls bypass.
<!-- rule:4121 -->
- Comment hardcoded/magic test values — explain how each was derived and what bug it catches — Values like `last().id + 100`, `pk=1`, or pre-signed tokens in `tests/` look arbitrary later; an inline note on derivation and the regression it guards (see `tests/bulk_create/tests.py`, `tests/signing/tests.py`) keeps failing tests debuggable.
<!-- rule:1320 -->
- Adjust wording only; no further tool calls needed. — Transform into concise AGENTS.md bullet(s).
<!-- rule:4845 -->
- Pass raw input to `call_command('makemessages', ...)` in `tests/i18n` and assert on the normalized output — pre-normalizing in the test or calling the normalization helper directly skips the command's own conversion path, so invalid input, `_`/`-` separator handling, casing, extended subtags (>2 chars), and `x-` private-use subtags never get exercised — Tests must cover every normalization branch: invalid input, `_`/`-` separator handling, casing transforms, extended subtags (>2 chars after the dash), and private-use `x-` subtags.
<!-- rule:4106 -->
- In tests, spawn subprocesses with `sys.executable` and copy `os.environ` instead of hardcoding `'python'` or overwriting `PYTHONPATH` — Hardcoded `'python'` can resolve to a different interpreter than the one running the suite (wrong venv or version), and overwriting `PYTHONPATH` drops existing entries; extending the copied `os.environ` with `os.pathsep`-joined `sys.path` dirs keeps the child env consistent with the parent.
<!-- rule:3095 -->
- Add combined-function tests to the primary function's test file in `tests/db_functions/json/` — keeps related cases discoverable together instead of scattered across sibling files. — Cover keys containing SQL metacharacters (`,`, `'`, `"`) and nested invocations — these are the inputs that surface parsing and quoting bugs in the JSON DB layer, and placing them alongside the primary function's tests means reviewers of that function see the full contract.
<!-- rule:3535 -->
- Cover pagination boundary cases as separate test methods — `first page`, `last page`, invalid, and out-of-range — asserting `EmptyPage` on out-of-range navigation and `PageNotAnInteger` on non-integer input, so each failure mode has an isolated, diagnosable test. — Separate methods pinpoint which boundary broke; conflating them hides regressions in `django/views/generic/list.py`.
<!-- rule:3287 -->
- Add each backend-specific EXPLAIN option as its own entry in the kwargs validation test (e.g. a separate dict in `test_options` in `tests/queries/test_explain.py`) — one entry per option keeps failures isolated and avoids silent gaps when options change. — Independent entries pinpoint which option broke; batching them hides failures behind the first assertion.
<!-- rule:2317 -->
- Keep one operation, behavior, or endpoint per test — put save logic in `test_save_user`, split shared behaviors into `test_{behavior}_{operation}` (e.g., `_save`, `_bulk_create`, `_bulk_update`), and extend an existing test class before adding a new one — Isolating each operation makes a failing test pinpoint exactly which write path broke; mixing status codes or unrelated endpoints in one test hides the cause and can pass for the wrong reason — so after reverting the code under test, confirm the assertion-driven test actually fails (a default 404 will otherwise produce a false pass)
<!-- rule:1946 -->
- Derive test input sizes from the boundary constant (`LIMIT + 10`, `LIMIT * 2 + 1`), not hardcoded numbers — a literal size silently stops exercising the limit once the constant changes, leaving truncation/batching tests passing without coverage. — When `LIMIT` is edited (increased, decreased, or made configurable), a hardcoded input size can fall below the threshold and the test quietly stops exercising the truncation/batching path it was written to guard. Deriving sizes from the constant keeps the test meaningful across refactors.
<!-- rule:530 -->
- Test forged/unauthorized admin POSTs in `tests/admin_views` (fake `select_across`, disallowed `field_name`, fields for unauthorized objects) and assert the value is rejected/ignored with no protected data leaked — regression-locks the security fix. — Django admin POST handlers can be spoofed by crafted `select_across`, `field_name`, and cross-object field submissions; full-fixture POSTs hide the validation gaps that let those pass.
  - POST only the unauthorized fields/objects, not the full fixture set — mirrors a real request and surfaces validation bugs that full-data POSTs would mask.
<!-- rule:1479 -->
- Put `output_field`-resolution and query-compilation tests in `tests/expressions/`, not `tests/aggregation/` — keeps expression tests next to the code they exercise so they stay discoverable and don't get lost across modules — Rationale explains why the rule matters in the codebase — the bug, incompatibility, or inconsistency it prevents. Write it for a reader who only ever sees the final text.
  - Cover the resolution edge cases: composed expressions (e.g. `Excluded('field') + 1`), implicit construction (e.g. `values(...).query.output_field`), unresolved values with and without an explicit `output_field`, and assert the resolved `output_field` equals the declared one — these paths regress silently and only fail downstream
<!-- rule:3840 -->
- This is the transformed rule text — This is the rationale
<!-- rule:2198 -->
- Add prefetch regression tests to `CustomPrefetchTests` in `tests/prefetch_related/tests.py` — It prevents prefetch regressions from being covered by standalone ticket-numbered TestCases or parallel model hierarchies that fall outside the shared suite and silently stop running, leaving the actual `Author`/`AuthorChild` prefetch behavior unverified.
  - Reuse the existing `Author`/`AuthorChild` model hierarchy instead of new standalone `TestCase`s or parallel models — keeps fixtures shared and prevents ticket-numbered classes from drifting out of the suite
  - New prefetch models belong in `tests/prefetch_related/models.py`, not a parallel hierarchy
    — future readers find regressions next to the behavior they cover
<!-- rule:3797 -->
- In `tests/migrations` removal tests (`test_operations.py`, `test_autodetector.py`), build state so the removal logic actually runs: use multiple related models/option entries, make the owning/deleted model own the removed options, and cover partial + full removal. Assert removed fields/indexes/constraints stay absent from project state and the materialized model's `_meta`; in `test_autodetector.py`, also assert the exact generated operation sequence — prevents no-op tests that pass without exercising removal. — Removal tests that use a single model, or a model that doesn't itself own the removed options, produce no state changes or operations — so the test passes trivially while real regressions in removal detection, state cleanup, and `_meta`/autodetector output go unnoticed.
<!-- rule:2199 -->
- **Verify prefetching with query counts and a cache check** — wrap `prefetch_related`/`prefetch_related_objects` in `assertNumQueries(1)`, the subsequent related-object access in `assertNumQueries(0)`, and confirm the cache populated via `RelatedModel.field.is_cached(instance)` or `_prefetched_objects_cache`, resetting the cache between iterations. A plain functional test passes even when prefetch silently degrades to N+1 queries — the query-count assertions catch that regression, and the cache-state check confirms the 0-query read came from the prefetch rather than a prior query. — Django's prefetch optimization is invisible in pass/fail terms, so tests that only check returned data can green-light N+1 regressions. Splitting the assertions across the prefetch call (1 query) and the follow-up access (0 queries) localizes *where* an extra query appears, and the explicit `is_cached`/`_prefetched_objects_cache` check rules out the false pass where 0 queries happen for the wrong reason (e.g., a warm cache from earlier in the test or a shared instance). Resetting between iterations prevents a stale prefetch from masking a missing one on the next loop pass. Scoped to tests under `tests/prefetch_related/`.
<!-- rule:1729 -->
- Test one header/input source per test; use distinct values when a value can come from multiple sources, split independent headers, and reserve table-driven cases for repeated variants of one behavior — ambiguous inputs mask which source actually drove the result, making failures hard to localize. — Ambiguous inputs mask which source actually drove the result, making failures hard to localize.
<!-- rule:1731 -->
- Organize tests to match the unit under test and the resources they need. — Misalignment hides tests from discovery and makes failures ambiguous: calling `self.server.stop()` from a base class that never starts a server fails in teardown, and mingling server-dependent tests with server-free tests makes the suite fail whenever no server is running (see `tests/servers`, `tests/mail`, `tests/staticfiles_tests/test_management.py`).
<!-- rule:5942 -->
- In `tests/`, skip special characters in fixture names: use plain alphabetic names like `nonexistent` for unrelated fixtures, and reserve reserved chars (`><:?|*`) and trailing `.`/space for explicit sanitization/path-handling cases — such names are invalid or behave differently on Windows and break cross-platform runs. — Windows disallows `><:?|*` and trailing dots/spaces in filenames, so tests using them incidentally fail on Windows CI; only sanitization suites should exercise them deliberately.
<!-- rule:5536 -->
- Use `os.devnull` instead of hardcoding `'/dev/null'` in tests — keeps them portable across Windows and other OSes — `'/dev/null'` doesn't exist on Windows, so tests that hardcode it fail off-POSIX; `os.devnull` resolves to the correct null device (`nul` on Windows, `/dev/null` elsewhere) on every platform.
<!-- rule:3859 -->
- In ASGI request tests, build requests with `AsyncRequestFactory` from a `scope` via `_base_scope(...)`, overriding only the fields under test — lets you assert on request attributes directly. Represent duplicate HTTP headers as separate tuples in `scope['headers']`, not a comma-joined value, so the parser's header-joining behavior is actually exercised. — Direct scope construction gives tests full visibility into request attributes; comma-joining duplicate headers bypasses the parser's join logic, hiding bugs in how repeated headers are merged. Belongs in `tests/AGENTS.md` since this pattern is test-suite specific (`tests/asgi/tests.py`, `tests/handlers/tests.py`).
<!-- rule:4913 -->
- Assert on `LogEntry.change_message` (and absence of a `LogEntry` for unchanged submissions) rather than rendering the admin history view — history entries are read-only, so testing the rendered view adds noise and breaks on unrelated template changes. — The `LogEntry` rows are the source of truth for change history; the admin history view is just a rendering of them. Asserting on `change_message` keeps tests stable against template/markup churn and directly verifies what Django persists.
<!-- rule:5909 -->
- In `tests/i18n/test_extraction.py`, assert both expected `msgid` presence and obsolete `msgid` absence in `makemessages` `.po` output — asserting only one direction lets stale or missing entries pass. When normalization changes, also cover existing `.po` files and both `invoked_for_django` paths. — Presence-only assertions miss leftover obsolete msgids; absence-only assertions miss dropped expected ones. Covering existing `.po` files and both `invoked_for_django` branches prevents regressions in normalization that only surface on one path.
<!-- rule:173 -->
- Gate `JSONField`/JSON-function tests with `supports_json_field` or the matching `supports_json_*` flag, not narrower flags like `has_json_object_function`. — Narrow function flags silently skip backends where the feature actually works, hiding coverage gaps and real failures.
<!-- rule:1960 -->
- Test the full M2M mutation surface — `add`, `set`, `remove`, `clear` — including proxy-model variants, not just a subset. — Partial coverage lets regressions in the untested methods (e.g. `clear` or proxy overrides) slip through, since these paths dispatch to different manager code.
<!-- rule:1722 -->
- Prefer focused, low-level handler tests over higher-level or live-server tests: put request-handler behavior tests in the dedicated handler test case instead of duplicating them in higher-level integration tests; use lightweight test bases (`WSGIRequestHandlerTestCase`, `SimpleTestCase`) rather than `LiveServerTestCase` or unrelated subsystems like the template engine, reserving a live server for behavior that specifically requires it, and implement test handler helpers/subclasses with only the methods and state the test exercises, using minimal no-op dummies for incidental inherited callbacks. — Low-level handler tests run faster, isolate the behavior under test, and avoid duplicate coverage that breaks in higher-level suites; live servers and unrelated subsystems (e.g. the template engine) add flakiness and coupling that obscure what's actually being verified. Minimal helpers keep the test's exercised surface visible.
<!-- rule:1695 -->
- Use `f'{__name__}.<symbol>'` for dotted paths to current-module symbols in tests — survives file moves and renames — Applies to settings hooks, `override_settings` values, `DATABASE_ROUTERS`, and similar string paths under `tests/`. Hardcoded module paths go stale if the test file is moved within `tests/`, whereas `__name__` always resolves to the correct dotted path for the running test module.
<!-- rule:5649 -->
- Check `tests/test_client_regress` for existing file-upload coverage before adding tests; extend those instead of duplicating test views under `tests/test_client/`. — Prevents duplicate upload test views across the two test suites, keeping coverage in one place.
<!-- rule:5506 -->
- Add regression tests per compression format/extension in management commands, covering every alias and matching the fixture/output filename's extension to the format — a mismatch between suffix and codec only surfaces when the test filename matches the real extension. — Compressed-output management commands map each alias to both a codec and a suffix; tests that reuse one fixture filename or skip an alias pass while that alias emits the wrong format or suffix. Naming the fixture/output with the exact extension forces the codec to be exercised end-to-end.
<!-- rule:4273 -->
- Always guarantee mock patcher teardown: prefer `with mock.patch.object(...):` or `self.addCleanup(patcher.stop)` over manual `.start()` — leaked patches silently corrupt later tests and hide real failures. — In `tests/gis_tests/utils.py`, `FuncTestMixin.tearDown` stops patchgers that a test may already have stopped; make teardown idempotent by catching the expected `RuntimeError` around `patcher.stop()` rather than sentinel/`None` guards or resetting the patcher attribute, so the mixin stays safe for any consumer.
<!-- rule:3592 -->
- Parameterize host/port parser tests across IPv4, IPv6, bracketed IPv6, IPv4-mapped IPv6, and mixed-case hosts — format-specific regex/type branches and normalization are only exercised per variant, so a single-format case leaves the rest untested — Each input variant hits a distinct regex/type branch and normalization path; omitting variants silently leaves those branches uncovered in host/port parsing and IP address validation tests.
<!-- rule:4158 -->
- Only `repr()`-serialize settings values that are self-contained literals — else emit the needed imports in the generated module. — Test helpers that synthesize temporary settings modules (e.g. in `tests/migrations/test_loader.py`) write values with `repr()`, but `repr()` output for objects like `Path`, `datetime`, or custom instances isn't a valid standalone literal — the generated file fails to import. Emitting the corresponding imports keeps the synthesized module self-contained and loadable.
<!-- rule:3627 -->
- Add choice display-value tests to the module's existing test class (`tests/admin_utils/tests.py`, `test_logentry.py`), one `test_list_display_for_value_*` method per case, and assert the expected display string directly — no `try`/`except`/`fail` wrappers. The method-per-case pattern keeps each `django/contrib/admin/utils.py` display path independently discoverable and failing output names the exact choice that broke, while wrapper blocks swallow the real assertion and obscure which value regressed. — Grouping display-value cases in the module's existing test class keeps them findable alongside the admin-utils code they cover, and one method per case makes a failure point directly at the offending choice. Direct assertions (rather than try/except/fail) preserve the actual vs. expected output, which wrapper blocks discard, making regressions in display formatting much harder to diagnose.
<!-- rule:5556 -->
- Test auth validation through the full public path — `AbstractUser.clean()`, `UserCreationForm` save/validation — not mocked manager calls — Mocking internal manager calls skips the normalization logic that actually processes user input, letting regressions slip past the tests that should catch them.
<!-- rule:939 -->
- Extend shared model `A` in `tests/delete/models.py` (add matching FK, register in `create_a()`) and mirror the `OnDeleteTests` case in `tests/delete/tests.py` — reusing shared fixtures keeps DB-level variants covered and consistent. — Isolated tests skip the shared fixtures and DB-level variants that `OnDeleteTests` exercises, leaving gaps in coverage. Adding a field to model `A` and the FK to `create_a()` ensures every `on_delete` mode is tested against the same schema.
<!-- rule:1844 -->
- Compare GIS geometries with `equals()` or `equals_exact(tolerance)`, not WKT strings or `.tuple` — backends like MySQL/MariaDB reorder polygon rings, and GDAL/GEOS version differences make exact representations unreliable. — A topological comparison passes regardless of ring order or minor representation differences; exact WKT/`.tuple` assertions fail spuriously across backends and library versions.
<!-- rule:4912 -->
- Keep GDAL raster fixtures free of `.aux.xml`; clean sidecars or use temp raster copies — stale PAM metadata leaks between test runs and breaks assertions. Skip PAM-dependent checks when `GDAL_PAM_ENABLED` is disabled. — Prevents cross-run test failures in `tests/gis_tests/gdal_tests/` caused by leftover sidecar files and avoids false failures when PAM is turned off.
<!-- rule:5908 -->
- Assert PO contents with shared helpers (`assertMsgId`, `assertMsgStr`, `assertNotMsgId`) in i18n extraction tests, not raw `assertIn`/`assertNotIn` on `po_contents` or positional-flag internals like `_assertPoKeyword("msgid", str, po_contents, True)`. — The named helpers read clearly and fail with useful messages; raw membership checks and boolean-positional calls obscure intent and break when helper signatures change. Exception: obsolete entries are `#~`-prefixed and never match msgid helpers, so verify their removal with raw `assertNotIn('#~ msgid ...', po_contents)`.
<!-- rule:3656 -->
- Test composite `QuerySet.update()` cases on structured fields (multiple indices, hstore keys, or nested paths plus database expressions in one call) alongside literal and edge cases — single-field updates miss bugs where combined lookups or expressions interact, in `tests/postgres_tests/test_array.py`, `test_hstore.py`, and `test_json.py` — Structured-field updates can silently drop or misapply sibling lookups and expressions when combined; composite tests catch regressions that single-index, literal-only tests never exercise.
<!-- rule:3394 -->
- Assert generated SQL, params, and `quote_value()` escaping in `as_sql`/`test_as_sql` tests (e.g., under `tests/postgres_tests/`) — surfaces SQL-generation regressions directly; when DB-side sanitization/normalization (e.g., `plainto_tsquery`, stemming) rewrites input, update expectations to the transformed SQL rather than only asserting sanitization ran — Direct SQL-string assertions in `as_sql`/`test_as_sql` catch regressions before they ship, and matching transformed output keeps the tests honest when normalization changes the actual query.
<!-- rule:4222 -->
- Assert full pickling round-trip equivalence in `tests/queryset_pickle/` — verify returned objects *and* generated SQL (including `SELECT` column list), not just query count or evaluability. Counting queries alone misses serialization bugs like dropped deferred fields, so round-trip assertions are the only way to catch them. — Counting queries alone misses serialization bugs like dropped deferred fields, so round-trip assertions are the only way to catch them.
<!-- rule:2443 -->
- In `tests/schema`, prefer portable field types for indexed/generated/expression definitions — `TextField` and similar backend-dependent types fail on backends that can't index them — Schema and index tests run across every supported backend. Indexing a `TextField` is unsupported on some backends, so a portable default keeps the suite green; isolating backend-specific behavior behind feature flags lets those paths still be tested where the backend actually supports them.
  - Only use backend-dependent fields in index definitions when the test specifically targets that field's behavior
  - Gate backend-specific support (e.g. `supports_index_on_text_field`) behind feature flags — lets each backend exercise its real capabilities instead of assuming one
<!-- rule:5772 -->
- Keep sitemap test fixtures direct — `lastmod(obj)` should read `obj.lastmod`, not a mirrored `data` dict. — Indirection in `tests/sitemaps_tests/urls/http.py` fixtures hides the attribute under test, so a failure in `lastmod` handling points at the wrong place. Direct reads keep the fixture a thin wrapper over the object's real behavior.
<!-- rule:3638 -->
- Test filter-arg parsing through `FilterExpression(...).resolve({})` — invokes `args_check()` — Registering a filter and calling the decorated function directly bypasses `args_check()`, so invalid numeric inputs like `'abc'` pass silently. Use `subTest` to parameterize valid syntax cases, and assert invalid numerics resolve to `None` with `ignore_failures=True`.
<!-- rule:1446 -->
- Merge test cases under `tests/` that differ only by backend skip decorators or input-event ordering — duplicate runs double CI time without covering new behavior, and diverging copies drift out of sync. — Duplicates and un-deduped target lists inflate CI runtime and hide real coverage gaps, so collapsing equivalent tests and catching the first-element repeat keeps the suite honest and fast.
  - Dedupe test-target/browser entries before running, including repeats of the first element — dedup that seeds its seen-set with the first entry silently lets that repeat through, re-running the same suite twice.
<!-- rule:1091 -->
- In tests, build form/query payloads as plain `dict`s with faithfully serialized values — e.g. `"true"`/`"false"` strings rather than Python `True`/`1` — and reserve `QueryDict` for cases emulating `request.POST` behavior. — Payloads only exercise the code under test if they look like what actually arrives over the wire — Python booleans and ambiguous numeric strings silently diverge from server-side parsing, producing tests that pass for the wrong reason. `QueryDict` carries `request.POST`-specific semantics (multi-value handling, `.getlist()`) that plain-dict tests should not accidentally depend on.
<!-- rule:1232 -->
- Remove unused fields and model classes from test `models.py` files — dead test models add tables and slow every test run that touches them. — In the Django test suite, every model declared under `tests/*/models.py` becomes a real database table for that test app, so leftover fields and classes (e.g. in `tests/admin_changelist/`, `tests/admin_inlines/`) inflate schema creation and migration work for tests that no longer use them. Keeping test models minimal to what their tests exercise keeps the suite fast and makes it obvious which models a test file actually covers.
<!-- rule:6187 -->
- Normalize line endings in file-content assertions — convert `\r\n` to `\n` unless newline handling is under test; otherwise platform-specific endings break exact-match assertions (e.g. `tests/files/tests.py`, `tests/staticfiles_tests/test_storage.py`). — Test code reads and writes files across platforms; unnormalized `\r\n` breaks exact-content assertions on Windows CI, while omitting `\r`/`\r\n` cases leaves universal-newline handling untested on Linux/macOS.
  Explicitly cover both `\r` and `\r\n` cases when testing universal-newline behavior — line iteration differs across platforms and subtle regressions go unnoticed on LF-only CI.
<!-- rule:743 -->
- Use `find_element(...).click()` for simple Selenium clicks; reserve `ActionChains` for multi-step input — Direct clicks keep tests readable and avoid `ActionChains` overhead/obscured intent in tests/
<!-- rule:3517 -->
- Use a single realistic domain (e.g. `example.com`) for email/domain test inputs — digit-bearing TLDs fail `EmailValidator` and diverge across test files like `tests/forms_tests/field_tests/test_emailfield.py`. — Django's `EmailValidator` rejects TLDs containing digits, so ad-hoc values silently break tests; reusing one realistic domain keeps inputs consistent across the suite (e.g. `tests/utils_tests/test_html.py`).
<!-- rule:3536 -->
- Extend `BasePaginationTests` for pagination test classes — reuses existing test infrastructure instead of duplicating setup. — Pagination behavior is identical across tests, so reusing `BasePaginationTests` and existing admin classes like `SwallowAdmin` avoids subtle divergence in setup and keeps fixtures discoverable in one place. Sizing test data to page size + 1 is enough to hit first/last/empty boundaries without bloating test runtime or database state.
  For admin changelist pagination, use an existing admin class like `SwallowAdmin` with a small `list_per_page` — avoids adding one-off admin fixtures.
  Create only the minimum objects needed (e.g. page size + 1) per pagination test — small datasets still exercise page boundaries while keeping the suite fast.
<!-- rule:1759 -->
- Assert project-owned behavior, not CPython semantics like `__slots__`/`__dict__` subclass behavior — runtime internals can shift across versions, producing failures unrelated to your code's contracts — Tests locked to interpreter internals (e.g., CPython `__slots__`/`__dict__` subclass behavior) or test-only micro-optimizations break on version upgrades without catching real regressions; assert only the behavior the project relies on (e.g., unexpected attribute assignment raises `AttributeError`).
<!-- rule:1402 -->
- ... — ...
<!-- rule:5048 -->
- Cover custom `ExceptionReporter` methods (e.g. `get_traceback_text`) with a debug-view test that hits the endpoint and asserts the custom output; delete unused overrides — untested ones silently drift from what users actually see. For the text traceback path, send an AJAX request with `HTTP_X_REQUESTED_WITH='XMLHttpRequest'` and assert the custom text with `status_code=500` — that branch isn't reached by a plain browser request. — Custom `ExceptionReporter` methods like `get_traceback_text` only fire on specific request paths (AJAX vs. browser), so a plain debug-view test won't exercise them. Untested overrides rot silently while unused ones add dead code — the debug-view test is what proves the custom output actually reaches the error response (e.g., in `tests/logging_tests` and `tests/view_tests/tests`).
<!-- rule:2269 -->
- Use canonical environ keys/values in request fixtures (`SCRIPT_NAME`, not `PATH_INFO`; no trailing slash in ASGI `root_path`) — wrong keys silently exercise the wrong code branch. — Handlers branch on specific environ keys and canonical path formats, so a fixture using `PATH_INFO` instead of `SCRIPT_NAME`, or a trailing-slash `root_path`, passes tests through unintended branches and misdocuments expected usage. Mirroring real WSGI/ASGI environ shapes keeps fixtures honest about what production sends.
<!-- rule:3744 -->
- Assert query/batch counts with the capability flag for the exact operation (e.g. `insert` vs `update`), and factor shared expected-count logic into a `tests` helper — mismatched flags silently pass on backends that don't differ, and duplicated math drifts between test files. — Test assertions about query/batch counts depend on backend capabilities, and the right flag differs per operation. Using a broad or wrong capability flag can make assertions pass on backends that happen to behave the same, hiding real divergence. Duplicating the expected-count arithmetic across tests also invites silent drift when capabilities change.
  Placement: add a directory-scoped `AGENTS.md` under `tests/` so it covers `tests/basic/`, `tests/prefetch_related/`, and future test subdirs without leaking into non-test code.
<!-- rule:2124 -->
- Cover `{related}__{field}` lookups with multi-row fixtures in aggregation tests — single-row data never exercises the JOIN and grouping paths where aggregation bugs actually occur. — Aggregation over `{related}__{field}` compiles into JOINs plus GROUP BY/HAVING, and those paths only misbehave when more than one parent and more than one related row exist. A single-row fixture produces the same result whether or not the JOIN and grouping logic is correct, so `tests/aggregation` cases must seed at least two parents with multiple related rows each to expose incorrect counts, duplicate rows, and mis-grouped results.
<!-- rule:5352 -->
- In schema tests, pass field attrs via the constructor (e.g. `name=...`) instead of calling `set_attributes_from_name(...)` manually — mirrors the normal ORM initialization path that production code hits. — Tests exercise the same code path as real models, so they catch the bugs users would see.
<!-- rule:1061 -->
- **Test ModelForm exclusion on both paths** — assert default exclusion (e.g. generic foreign keys under `fields = '__all__'`) and explicit inclusion via a declared `fields` entry. — The model's `editable` flag doesn't exercise either exclusion path in ModelForm code, so asserting only on it hides regressions users would actually hit. Comparing the `fields='__all__'` form against the `exclude=[...]` variant proves the exclusion bypasses validation cleanly while the full form still surfaces the constraint error.
  - **Pair full and excluded forms for constraint tests** — build one with `fields='__all__'` and one with the field in `exclude=[...]`; assert the excluded form is valid (or `full_clean(exclude=...)` yields `error_dict` keys for that field) while the full form reports the expected `__all__` constraint error.
<!-- rule:2187 -->
- Name test helpers, variables, and fixtures to match the data they actually handle — supports accurate, self-contained tests — Avoid `all_` prefixes when a helper only processes a passed-in collection, skip intermediate collection vars when one item suffices, and reuse fixture helpers within the same test block instead of pulling values across blocks — misleading names and cross-block coupling make tests hard to reason about when they break.
<!-- rule:3148 -->
- Put `ArrayField` validation tests in `tests/postgres_tests/test_array.py` and colocate new cases with related tests (e.g. `test_invalid_char_length`) — keeps the array-validation suite one place to find/run — Scattering new `ArrayField` validation tests elsewhere makes the array-validation suite impossible to find or run as a unit, so bugs in `ArrayField` validation slip through unnoticed.
<!-- rule:633 -->
- Add regression tests for feature-gated grouping paths, e.g. implicit grouping by selected PKs when `features.allows_group_by_selected_pks` is enabled — feature toggles silently change query compilation. — The rule is a testing convention that applies specifically to Django ORM query compilation tests, and all evidence is confined to the tests/ tree (tests/composite_pk/test_values.py and tests/expressions/tests.py). It is not tied to a single file or entity, nor does it describe a file-sync relationship, so file-level and cross_file placements do not fit. It spans multiple test subdirectories (composite_pk, expressions), but they all live under tests/, making tests/AGENTS.md the natural, findable home.
  - In tests needing a non-empty group-by, use stable field expressions like `Lower('field')` instead of combined `Value(...)` — `Value(...)` forms can change and break the assertion.
<!-- rule:1787 -->
- Use fractional-second sleeps or mocked time in tests — `time.sleep()` calls accumulate into multi-second wall-clock delays that slow the suite — Keeping real-time waits short prevents individual tests from piling up seconds of wall-clock time across the suite, which compounds into a noticeably slow CI run. `join(timeout=N)`-style guards should stay generous finite safety nets (e.g. 10s) that only prevent infinite runs, never narrow thresholds that double as performance assertions — those are flaky and mislead about what the test actually verifies.
<!-- rule:5438 -->
- Test stale `ContentType` detection with a dedicated empty app (e.g., `empty_models` in `INSTALLED_APPS`/`available_apps`) — deleting all `ContentType` rows globally mislabels app labels as stale. — Global `ContentType` deletion makes every app label appear stale, so a targeted `empty_models` app isolates the condition being tested without corrupting unrelated app labels.
<!-- rule:5538 -->
- Place `QuerySet.update()` ORDER BY regression tests in the existing DB-specific class (e.g. `MySQLUpdateOrderByTest` in `tests/update/tests.py`) — keeps backend-specific coverage alongside its peers. — Order-safe deltas like `+2` never collide regardless of row order, so they let the ORDER BY bug pass unnoticed; a `+1` increment on adjacent unique values forces a constraint violation whenever rows are sorted wrong. Asserting the affected row count surfaces partial updates. Reusing `MySQLUpdateOrderByTest`'s closest method keeps backend-specific tests co-located in `tests/update/tests.py`.
  - Copy the closest existing test method and vary only the ordering/annotation condition — isolates the regression under test.
  - Use update values that break a unique constraint if rows are processed out of order (e.g. `+1` on adjacent unique values), not order-safe ones (`+2`) — order-safe values pass even when the bug is present.
  - Cover the annotation/`Ref` path via `annotated.order_by(...).update(...)` and assert the affected row count — catches partial or mis-ordered writes.
<!-- rule:4146 -->
- Put migration writer/serializer tests in the existing `WriterTests` class in `tests/migrations/test_writer.py` — new test modules or migration integration tests split coverage; defer test-module reorganization to a separate refactor commit — Keeping serializer unit tests in `WriterTests` (rather than a new module or integration tests) matches the established convention across `test_base.py`, `test_commands.py`, and `test_serializer.py`, avoids fragmenting test discovery, and keeps behavioral changes reviewable separately from structural churn.
<!-- rule:5457 -->
- Test lazy-object helpers with lazy inputs (positional and keyword), not just concrete values — concrete values only exercise the non-lazy code path, so lazy short-circuiting/identity behavior goes untested and regressions ship silently. — Concrete values only exercise the non-lazy code path, so lazy short-circuiting/identity behavior goes untested and regressions ship silently.
<!-- rule:2795 -->
- **Keep RFC 822/MIME fixtures minimal — omit unrelated headers/content** (e.g., drop `Subject` when testing attachment encoding) — but always include at least one of `Subject`, `Date`, or `From`, as in `tests/mail/tests.py`; the minimum required header keeps the fixture a technically valid RFC 822 message so failures reflect the behavior under test, not a malformed message. — Trimming unrelated headers keeps mail tests focused and readable; keeping one required header prevents parsers from rejecting the fixture before the tested code runs.
<!-- rule:1687 -->
- Declare fixture helpers as `@classmethod` returning `cls.<fixture>`, not `@staticmethod`; use instance methods (`def helper(self):`) when they touch `self` — Reading the fixture off `cls` (e.g. the class-level auth user) keeps it the single source of truth instead of re-passing it at every call site, and helpers that depend on instance state or sibling instance helpers break or force argument threading if made static.
<!-- rule:1679 -->
- In decorator tests: apply the decorator under test to a named `def` function, not a lambda — lambdas can't exercise argument inspection realistically, hiding bugs that real function signatures trigger. — Lambdas lack the real signatures that signature-inspecting decorators depend on, so tests using them can pass while the same decorator breaks on ordinary named functions, and a fixture built from the decorator under test will fail for reasons unrelated to the fixture's purpose, leaving you unable to tell whether the fixture or the decorator is at fault.
  - Use a simple dummy decorator in fixtures rather than the decorator under test — dogfooding couples the fixture to behavior it's meant to isolate.
<!-- rule:5633 -->
- Test callable-/type-constrained params (e.g., `FileField.storage` as callable vs `BaseStorage`) with one assertion per behavior — merged assertions obscure which case broke — These conventions live with the storage tests in `tests/file_storage/tests.py`. Focused, per-value, per-behavior assertions make failures explicit and ensure invalid inputs are rejected instead of silently accepted.
  - Cover the negative case (e.g., a non-`Storage` object) and assert the expected error — happy-path-only tests silently accept invalid input
  - Wrap each invalid-value `assertRaisesMessage` in `self.subTest(...)` — isolates the failing value instead of aborting the whole loop
<!-- rule:5551 -->
- Establish a known-good baseline before editing auth/access-control tests — confirm authentication succeeds with the same credentials across relevant auth states before mutating user state or changing assertions. — An unverified assertion change can mask a real auth regression or bake in a broken expectation; if the behavior isn't confirmed across all relevant auth states, revert rather than commit a premature assertion update.
<!-- rule:97 -->
- Cover untested ORM/SQL paths (e.g. `Exists.select_format` with `subquery=False`), but assert only behavior unique to the new path — re-checking SQL columns already covered by an existing `exists()` boolean test adds maintenance noise without catching new bugs — The rule is a testing-convention guideline for ORM/SQL tests, not a single-file rule and not a file-synchronization relationship. ORM SQL tests are spread across many modules under the Django `tests/` tree (with the cited example in `tests/queries/test_qs_combinators.py`), so the natural home is a directory-scoped `AGENTS.md` at `tests/` rather than a single test file or a repo-root global file. This keeps the rule discoverable for any AI writing ORM/SQL tests, while avoiding the noise of placing it too narrowly.
    Placed in `tests/AGENTS.md` since ORM SQL tests span many modules (e.g. `tests/queries/test_qs_combinators.py`), so the rule applies to any AI writing ORM/SQL tests.
<!-- rule:5779 -->
- Write syntax-error fixtures (e.g. `tests/test_runner_apps/tagged/tests_syntax_error.py`) with syntax invalid on **every** supported Python version — Version-dependent constructs like `:=` parse fine on 3.8+, so the fixture silently stops raising `SyntaxError` and the test passes without exercising the error path.
<!-- rule:5272 -->
- Define enums/classes at module level or nested in `TestCase`, not inside test methods, when tests assert on serialized import paths — in-method classes serialize with a `<locals>` segment that breaks path assertions — Placement: `tests/AGENTS.md` (e.g., `tests/migrations/test_writer.py`) — testing-only convention, not for production code.
  - Add a regression test defining the class in the problematic scope (e.g., a nested enum in a `TestCase`) when fixing serialization/reflection of scoped classes — pins the fix against regressions
<!-- rule:6300 -->
- Add regression tests for admin widgets that switch behavior on the form field `name`, including a formset/inline case with a prefixed name — prefixed fields (`form-0-name`) silently bypass logic matching on an exact `name`. — Admin widget code that branches on the incoming field `name` (e.g. checking `name == "foo"`) breaks when the same widget is rendered inside a formset or inline, where Django prefixes the name as `prefix-N-name`. Without a prefixed-name test case, the widget silently falls back to default behavior in inlines and no existing test catches it.
<!-- rule:924 -->
- Keep `tests/delete` relation-path tests passing on every backend — e.g. `test_db_restrict_path_db_cascade_direct` must pass wherever the analogous `test_db_restrict_path_cascade_direct` does. A backend-only FK integrity error there is a real referential-action bug, not a flake. — Direct vs indirect cascade paths, and ORM vs DB-level cascades, describe the same referential semantics — if they disagree, the ORM or backend is mishandling a deletion, so confirm and fix rather than xfail.
<!-- rule:940 -->
- Gate DB-level `on_delete` tests with `@skipUnlessDBFeature` using the action-specific flag (`supports_on_delete_db_default`, `supports_on_delete_db_null`, `supports_on_delete_db_cascade`), not a flag for a different action — a mismatched flag either skips tests on capable backends or runs them where the action isn't supported, producing false failures or false passes. — A DB-level `on_delete` test only makes sense on backends that support the specific referential action it exercises; reusing another action's flag gives incorrect skip behavior. Add a granular `supports_on_delete_db_{action}` flag when a backend might not implement a new action.
<!-- rule:2131 -->
- Test `None` on both the left- and right-hand sides of binary expressions for each compatible `output_field` type — `output_field` resolution can differ by operand side, so one-sided cases let asymmetric bugs slip through. — In tests/expressions/tests.py, output_field resolution depends on which operand is None and which is typed. Testing only one side misses bugs where the resolution logic is not symmetric. This is a module-level convention for expression tests, so it belongs in tests/expressions/AGENTS.md alongside the tests it governs.
<!-- rule:2248 -->
- Call and await `asave()` directly in async tests to exercise the real async save path; don't override `asave()` for derived-field logic — put those updates in `save()` or a dedicated method so tests reflect where the behavior actually lives — Overriding `asave()` in test models to inject derived-field logic hides the production code path and lets tests pass against behavior that doesn't exist in `save()`, masking real regressions in the async save flow.
<!-- rule:5458 -->
- When an exception moves from lazy timing (iteration, query compile, evaluation) to eager timing (call time), delete the lazy-timing tests that the eager-path test already covers — reverting to lazy evaluation would hide behavior callers now depend on. — Keeps tests aligned with the actual evaluation contract after an eager/lazy timing change, and prevents "fixing" failures by restoring lazy evaluation, which would mask pre-existing bugs callers can already trigger.
  - Treat an exception newly exposed by forced eager evaluation as a real latent bug to fix, not a reason to revert — it was already reachable, the timing change just surfaces it.
<!-- rule:1092 -->
- For same-name field/file multipart tests, POST via `MultiValueDict` with the shared key mapped to the scalar value plus files, then assert on `request.POST.getlist(name)` and `request.FILES.getlist(name)` rather than encoded bytes — byte inspection misses parser regressions that separate fields from files. — Asserting on `request.POST.getlist()` and `request.FILES.getlist()` exercises the real multipart parser for same-name field/file collisions, whereas inspecting raw encoded bytes only re-verifies the test's own encoding and would silently pass even if the parser misfiled the shared key into the wrong multidict.
<!-- rule:1371 -->
- Mock `os.walk`/`os.scandir` in traversal tests — filesystem iteration order isn't guaranteed, so ordering assertions become flaky across OSes/filesystems. Supply a controlled `(dirpath, dirnames, filenames)` sequence, assert the exact per-directory call order (see `tests/i18n/test_compilation.py`), and use real files/dirs only for path/existence checks. Skip only if the required order can't be produced. — Directory traversal order depends on the underlying filesystem, so tests that rely on real `os.walk`/`os.scandir` ordering can pass locally and fail in CI or on other platforms. Mocking the traversal API pins the ordering and makes per-directory processing assertions deterministic, while real paths still exercise path/existence logic.
<!-- rule:3917 -->
- Simulate a missing optional library by patching discovery (`ctypes.util.find_library`) to return `None`, then re-import the module and assert both that import succeeds and that lazy access (e.g. `module.lgdal["GDALVersionInfo"]`) raises `ImproperlyConfigured` — this proves the degradation path works: the module must stay importable without the library and defer the error to first use, not fail at import. — Testing only the happy path leaves the fallback untested. In projects like Django's GIS stack, `django.contrib.gis.gdal` imports fine without GDAL but raises `ImproperlyConfigured` when an attribute like `lgdal["GDALVersionInfo"]` is touched. Patching the discovery function to `None` and re-importing exercises that exact path; asserting on `ImproperlyConfigured` pins the contract that the error is deferred rather than raised at import time, which is what makes the optional dependency genuinely optional.
<!-- rule:1241 -->
- Use the enum member — The rule text itself was supplied with a markdown artifact at the end; I'll strip it. Output should be clean. — Using raw literals instead of the enum member allows values to silently drift out of sync when the enum is renamed or its underlying values change, which breaks exhaustiveness checks and comparisons.
<!-- rule:5651 -->
- Add a `PyLibMCCache` test with `LOCATION='/tmp/memcached.sock'` — keeps the `unix:/` prefix optional — `pylibmc` accepts a bare Unix socket path, so a regression test pins that parsing behavior and catches changes that would start requiring the `unix:/` scheme.
<!-- rule:5126 -->
- In M2M test cleanup, drop explicit through-model tables once — via model metadata or M2M field metadata, not both — and only auto-created M2M tables need separate M2M-field cleanup. — Dropping the same table from both model metadata and M2M field metadata breaks idempotent teardown with `table does not exist` errors.
<!-- rule:6408 -->
- Wrap `EXPLAIN ANALYZE` queryset calls in `transaction.atomic()` with `transaction.set_rollback(True)` in tests and examples — `EXPLAIN ANALYZE` actually executes the query, so rollback keeps test data unmutated. — `EXPLAIN ANALYZE` (unlike plain `EXPLAIN`) runs the query for real, meaning inserts/updates/deletes in the analyzed queryset will persist and leak into other tests unless wrapped in `transaction.atomic()` and marked for rollback via `transaction.set_rollback(True)`. The atomic block alone isn't enough — without `set_rollback(True)` the transaction commits normally at the end of the block.
<!-- rule:5096 -->
- Return a `dict` from env-capturing test helpers — not a sorted `['NAME=VALUE', ...]` list — Callers can index variables by name instead of parsing `NAME=VALUE` strings, and the shape stays stable as helpers evolve. Document the return in the docstring as a dict of the variable family using wildcard notation (e.g., `PG*`) and `{}` for the empty case, so readers know what keys to expect without reading the body.
<!-- rule:6153 -->
- Keep test generators flat — extract nested/shared sequences into named helper generators and delegate with `yield from`, not `return`. — Recursive or self-referential generators in `tests/` are hard to debug when tests fail on unexpected items. `yield from` yields the helper's items directly; returning a generator object wraps them in an extra layer that callers must unwrap, causing silent mismatches in parametrized/fixture data.
<!-- rule:4931 -->
- Name dotfile-ignoring fixtures `.hidden`, not `.gitignore`, and describe the behavior under test inside the file — `.gitignore` carries real git semantics that obscure what's actually being verified (e.g. that `directory_name()` skips dot-prefixed files) — Using a neutral name like `.hidden` keeps the fixture from being mistaken for real git configuration, and the embedded comment documents that the test targets dot-prefix ignoring (not gitignore parsing).
<!-- rule:6413 -->
- When testing fixture re-import idempotency, capture `old_obj` before re-loading and assert `old_obj.pk == new_obj.pk` plus unchanged field values after — count-only assertions pass even when a duplicate row is inserted. — Count-based checks confirm the row total, but a broken `loaddata` path that inserts a duplicate while deleting the original produces the same count — only pk/value equality proves the existing row was updated in place. This is the specific regression `tests/serializers/test_natural.py` guards against.
  - Applies to Django `loaddata`/serializer tests like `tests/serializers/test_natural.py`; use `Model.objects.get()` (not `.count()`) around the repeated import.
<!-- rule:341 -->
- In tests that build a [1m`ConnectionHandler`[22m manually, pair [1m`ensure_connection()`[22m with a [1m`try/finally`[22m that closes [1m`connections['default']`[22m  leaks persist across tests and cause order-dependent failures  — The monospaced identifiers and the em-dash rationale clause carry the message: manual `ConnectionHandler` tests otherwise leave live connections attached to `connections['default']`, which contaminates later tests and makes failures depend on execution order. The `finally` guarantees cleanup even when the test body raises. This is a testing-specific convention, so it belongs in `tests/AGENTS.md` where assistants authoring tests will encounter it.
<!-- rule:4774 -->
- Use a non-existent table name in dry-run SQL capture tests in `tests/cache/tests.py` — dry-run intercepts SQL *after* the table-exists check, so an existing table short-circuits `CREATE TABLE` and leaves nothing to assert on — Reusing an existing table name silently produces zero captured SQL, so the assertion fails or passes vacuously. Dry-run skipping side effects does not mean table setup is irrelevant: the existence check still runs before interception.
<!-- rule:2935 -->
- In `tests/mail`, get backends via `django.core.mail.get_connection()` (pass `provider` when relevant) instead of instantiating `EmailBackend` subclasses directly — exercises `EMAIL_PROVIDERS` resolution and the production connection factory, catching config wiring bugs that direct construction hides. — Same rationale, stated as the reason: the rule's WHY is exactly that it keeps `EMAIL_PROVIDERS` resolution and the production connection factory on the tested path.
<!-- rule:4929 -->
- Parameterize test helpers/factories by varying data — e.g. `Receiver(operation, [injected])` — instead of one subclass per injection combination in `tests/migrate_signals`; a subclass per combo multiplies classes combinatorially as new operations or injections are added. — Subclassing per (operation, injections) pair in `tests/migrate_signals/test_operation_signals.py` scales as a product rather than a sum: each new operation or injection point forces a wave of new subclasses to cover combinations, so helpers should instead accept the operation and injected ops as arguments.
<!-- rule:3764 -->
- In template placement-warning tests, assert warnings only for non-whitespace text after the tag — Other tags like `{% load %}` have side effects and must not trigger warnings; test `{# ... #}` comments and block tags as negative cases (no warning) alongside positive non-whitespace text cases in `tests/template_tests/test_extends.py`-style suites.
<!-- rule:6034 -->
- In transaction callback/hook tests, interleave variant callbacks with existing callback types and assert execution follows declaration order, not type grouping — catches ordering bugs introduced when a new hook variant is batched by type instead of run in its declared position. — A variant hook API (e.g., robust commit hooks) can silently reorder execution if callbacks are grouped by type rather than declared sequence. Interleaving in the regression test surfaces that while the variant is still new.
<!-- rule:941 -->
- Test both the normal and missing-target paths of every DB `on_delete` mode — single-mode coverage doesn't generalize — DB-level `on_delete` semantics differ between the happy path and the case where the referenced row is gone, and combinations of modes (e.g. mixed `SET_DEFAULT`/`CASCADE` on the same FK graph) don't behave like the sum of their parts — so testing only the common path leaves constraint violations and dangling children undetected until production.
    - For `DB_SET_DEFAULT`, cover default-row present/absent, assert the expected `IntegrityError`, and delete dangling child rows before teardown — orphaned rows leak into later tests
    - Test mixed `on_delete` combinations explicitly — per-mode coverage doesn't predict their combined behavior
<!-- rule:4580 -->
- Assert backend/routing options (`--using`) directly on results — `message.sent_using == "notifications"` — since generic assertions won't catch aliases that fail to propagate to helper paths. — Backend/routing options in CLI commands are easy to wire into the top-level call but silently fail to reach per-recipient helper branches (e.g. admin vs manager sends). Asserting on the selected alias on the resulting object — rather than just checking that a message was sent — exercises the exact propagation path the option controls, and a dedicated default-case test pins the omitted-option behavior so future refactors can't quietly change which backend is used by default.
  Cover the full `--using` surface: default when the option is omitted (`sent_using == "default"`) and each per-recipient mode (`--admins`, `--managers`); add a dedicated default-case test like `test_using_default()` in `tests/mail/test_sendtestemail.py` to lock in the unset path.
<!-- rule:5427 -->
- Use `skip_empty=True` with the `flush` command in tests — `only_nonempty_tables` is not an accepted option and will fail. — The `flush` management command only accepts `skip_empty`, so passing `only_nonempty_tables=True` raises an error in any test that invokes it.
<!-- rule:1660 -->
- Wrap cleanup-time values (e.g. `sys.exc_info()`) in a lambda for `addCleanup()` — args evaluate eagerly at registration, so they capture setup context instead of the failure. Reach for `tearDown()` when you need failure-aware exception context. — `unittest` evaluates `addCleanup()` arguments when the call is made, not when cleanup runs — an `exc_info` snapshot taken there reflects setup success (or a setup error), never the test failure. Deferring via a callable preserves the real cleanup-time exception state, and `tearDown()` already runs with the failure in `sys.exc_info()`, so prefer it when a failure-aware context is what you actually need.
<!-- rule:3082 -->
- In `tests/`, subclass `list` (or another built-in with `__class_getitem__`) when a subscriptable class is needed — don't hand-roll `__class_getitem__` with `types.GenericAlias`, which is missing on Python 3.8, still supported by the test suite. — Using a custom `__class_getitem__` built on `types.GenericAlias` breaks test collection on Python 3.8, since that name only exists from 3.9 onward; inheriting from a built-in that already implements `__class_getitem__` keeps the tests runnable on all supported interpreters.
<!-- rule:4296 -->
- In test fakes, take real-resource params via `**kwargs`, pass test-safe defaults to `super().__init__` — prevents caller args (e.g. `host`, `connection`) from making the fake's behavior hit real resources or change based on inputs. — Fakes that forward caller-supplied `host`/`connection`-style args to a real superclass become argument-dependent: tests can silently reach real infrastructure or behave differently depending on what the caller passes. Swallowing those params with `**kwargs` and feeding test-safe defaults to `super().__init__` keeps the fake isolated and deterministic.
<!-- rule:5521 -->
- Test `\A`, `\Z`, `^`, and `$` in regex simplification/translation tests — rarely-used anchors hide translation bugs that `^`/`$`-only cases miss — Testing only `^`/`$` leaves the code paths that handle `\A`/`\Z` unexercised, so translation or simplification bugs specific to those anchors can ship unnoticed.
<!-- rule:3680 -->
- Test ORM arithmetic (`F('field') * N`) across `int`, `float`, `Decimal` and both operand orders (`field * N`, `N * field`, `field / N`) — catches coercion, commutativity, and division bugs. — ORM expression tests in `tests/AGENTS.md` (e.g. `tests/annotations/tests.py`) are the place where type coercion, operand-order asymmetry, and division semantics get exercised; testing only one numeric type or operand order silently misses regressions in the others.
<!-- rule:5878 -->
- Pass the request class variant into shared request-building helpers in `tests/` (e.g., `tests/csrf_tests/tests.py`) and let the helper apply the setting-specific branch — one helper can then serve every settings combination instead of duplicating per-variant builders — Test suites that run against multiple settings variants need the same request built slightly differently for each; branching inside one parameterized helper (e.g., `tests/csrf_tests/tests.py`) avoids copy-pasted builders drifting apart. Keeping custom request classes constructor-compatible (class attributes over `__init__` args) means the shared helper can swap in a variant without special-casing its signature.
  - Give custom test request classes their per-class configuration as class attributes rather than `__init__` arguments — shared helpers can then instantiate any variant without knowing its constructor signature
<!-- rule:6418 -->
- Test each `Site` relation type (direct FK, null FK, M2M) for site-based redirect/shortcut views — a single relation type never exercises the others' lookup paths — Site-based views branch on how the target model relates to `Site`; covering only a direct FK leaves the null-FK and M2M code paths untested, and a loose 'use current site' assertion can pass even when the object isn't attached to that site. Absolute `testserver` URLs are required because `assertRedirects` resolves relative redirects against the test client host, otherwise the host-check fails.
  - Assert the current site is used only when the object is actually attached to it — catches fallback bugs when the FK is null or the M2M is empty
  - Use `assertRedirects` with absolute `'http://testserver{}'.format(...)` URLs — relative paths fail Django's host check
  - Mirror nearby tests in the same module (e.g. `tests/contenttypes_tests/test_views.py`) — keeps fixtures and view setup consistent
<!-- rule:4415 -->
- Test consecutive encoding changes on cached request data — assert re-decoding to the latest encoding, since stale caching is a common regression — Cached request data that doesn't re-decode on later encoding changes silently returns wrong values; a test that flips encoding twice catches this. Document any deviation from documented `HttpRequest.encoding` semantics with a ticket reference so future readers know it's intentional.
<!-- rule:1727 -->
- In `tests/`, count callback invocations with plain `int`s (init `0`) and assert final values directly — `itertools.count`/`next()` indirection hides the expected count and complicates debugging. For recursive/tree hooks, define explicit, alphabetically-named local hook functions over dynamically generated or stateful-iterator hooks, and mark the counters `nonlocal` when nested hooks mutate them — keeps nesting readable and mutation explicit. — Plain counters make assertions self-contained and diff-friendly, while explicitly named hooks (see patterns in `tests/test_utils/tests.py`) keep recursive callback tests linear and easy to trace; missing `nonlocal` silently breaks nested mutation.
<!-- rule:4157 -->
- In test helpers that format assertion arguments, pass values through the helper's own parameter list instead of interpolating them into string literals with `.format()`, and wrap any formatter call (e.g. `black.format_str`) so unparseable input returns the original value instead of raising. Rationale: assertion helpers get called on incomplete or fuzzed snippets that a formatter can't parse — inline interpolation hides which values were substituted, and an unguarded `format_str` turns a comparison failure into a parse crash, so the test reports the wrong thing (or errors out entirely) instead of showing the actual mismatch. — Placement rationale: Both source files (tests/admin_scripts/tests.py and tests/inspectdb/tests.py) live under the tests directory but in different submodules, indicating the rule is scoped to testing code broadly rather than to any single module. The rule concerns a general pattern for test helpers (parameter passing and guarding formatter calls), which is module-specific (testing) rather than truly global. Placing it in tests/AGENTS.md makes it findable by an AI assistant working anywhere in the test suite while keeping it out of the truly global AGENTS.md.
<!-- rule:4664 -->
- The user wants a concise, actionable guideline for AGENTS.md about configuring the spatial DB backend in Django GIS test settings. — Without configuring a spatial database backend in Django GIS test settings, any test exercising spatial lookups or geometry fields fails or errors because the default non-GIS backend cannot execute GIS SQL.
<!-- rule:6078 -->
- Verify the parent/current process can still use the resource in fork/pool cleanup tests — child-side teardown can accidentally close shared handles. — Tests that only assert cleanup in the forked/child process can pass while the parent's shared connection/file handle is silently broken; asserting parent usability in `tests/` catches these cross-process regressions.
<!-- rule:1069 -->
- Test each password scenario in `tests/admin_views/test_password_form.py` — new user, existing user with usable password, existing user with unusable password — since the shared base class only exercises the new-user path — The shared admin test base class only exercises the new-user password path, so without scenario-specific files and a dedicated `PostSensitiveDataTest`, existing users with usable or unusable passwords and sensitive-data POST exception behavior would go untested, while scenario-specific assertions added to the base would silently leak into every unrelated suite that inherits it.
  - Put sensitive-data POST exception tests in a dedicated `PostSensitiveDataTest` in `tests/admin_views/tests.py`, not the shared base class — keeps scenario-specific assertions from leaking into unrelated suites
<!-- rule:5677 -->
- In `tests/auth_tests/test_tokens.py`, cover email-change token invalidation with a custom-field model (e.g. `CustomEmailField` in `tests/auth_tests/models/__init__.py`), not just `User` — overridden email fields can skip the invalidation path that `User` exercises, leaving regressions untested. — Token invalidation on email change depends on signal/hook wiring that a model overriding the email field may not inherit. Testing only the default `User` model hides breakage for downstream projects with `CustomEmailField`-style models; adding that case to `tests/auth_tests/test_tokens.py` guards the behavior for both.
<!-- rule:5544 -->
- In date-based generic view tests, pick dates inside the target week and match the directive's week-start (`%U` Sunday vs `%W` Monday) — empty querysets pass silently, and a wrong week-start shifts `week`/`date` context by one. — `WeekArchiveView`/`DayArchiveView`/`DateDetailView` tests only fail loudly if the chosen date actually falls in the archived period; a date outside the fixture's range yields a 200 with an empty queryset. Similarly, `week_format` defaults to `%U` (Sunday-start) while `%W` is Monday-start, so asserting context values written for the wrong convention produces off-by-one failures that look like view bugs.
<!-- rule:4932 -->
- Test direct recursion (a `post_operation` receiver re-emitting the same operation) and cyclical/mutual recursion (receivers re-emitting each other) as separate cases — different failure modes, and a single test can't distinguish which one broke — Direct and mutual recursion fail differently between Django's forward and backward migration signal/router paths, so tests that conflate the two shapes or only exercise one direction — or that lean on concrete operations like `CreateModel` whose internals muddy the assertions — can silently pass while infinite-loop or missed-recursion bugs in `post_operation` handling go undetected.
  - Cover both apply and unapply paths for each recursion shape — Django's signal/`DatabaseRouter` behavior differs between forwards and backwards migration
  - Use custom no-op operations instead of concrete ones like `CreateModel` in `tests/migrate_signals/` — isolates the recursion shape so assertions don't depend on migration operation internals
<!-- rule:3206 -->
- Reuse task definitions from `tests/tasks/tasks.py` instead of defining ad-hoc tasks inline. — Keeps `tests/tasks/` tests exercising one set of task definitions, so signature or behavior changes only need updating in `tests/tasks/tasks.py` rather than scattered duplicates.
<!-- rule:4504 -->
- In `tests/utils_tests/`, when testing a utility with a mirrored counterpart sharing a code path (e.g., `timesince`/`timesuntil` via `reversed=True`), assert both directions in the same test and mirror the structure of sibling tests. — A shared code path means a regression in one direction likely breaks the other; asserting both in one test surfaces that immediately and keeps the inverse case from drifting out of sync. Matching sibling test structure keeps `test_timesince.py` readable and diff-friendly.

## Code Style

<!-- rule:6356 -->
- In `tests/`, use PEP 8 indentation: module-level test functions at column 0, test methods indented 4 spaces inside their class, method bodies one level deeper, and hanging 4-space continuation indent. — Matches pytest's discovery and standard Python style so tests stay readable and diffs stay clean across `tests/file_storage`, `tests/requests`, and `tests/filtered_relation`.
<!-- rule:2588 -->
- Extract non-trivial args for `with` context managers (e.g. `self.urlopen(...)`, `self.settings()`) into named locals before the block — deep inline setup obscures the test's intent — Keeping setup out of the `with` header and avoiding deep dictionary literals inside context managers keeps test bodies flat and readable, while inlining genuinely one-off URLs prevents needless local noise; hoisting only reused URLs keeps the reuse explicit.
  - Inline single-use `reverse()` URLs in client request calls; hoist to a local only when the same URL is reused across requests or assertions — avoids over-abstracting one-off URLs
  - Hoist the inner dict passed to `self.settings()` (or similar settings-override contexts) into a local before the `with` — avoids awkward multi-level indentation
  - Applies across `tests/`; see `tests/servers/tests.py`, `tests/admin_docs/test_views.py`, `tests/cache/tests.py`, `tests/contenttypes_tests/test_views.py` for examples
<!-- rule:2671 -->
- Format multi-line test-data collections (`subTest` inputs, parameterized case lists) one element per line, flat, no trailing blank lines. — This prevents multi-line test-data collections from acquiring deep nesting or stray blank lines that break the established flat, one-element-per-line pattern used across the test suite and create noisy, inconsistent diffs that obscure real changes during review.
<!-- rule:736 -->
- Locate each Selenium element once into a variable named after it (`status_element`, `input`) — re-calling `find_element` re-queries the DOM and generic `element` names hide intent — Kills DOM re-queries, keeps selector updates localized, and makes count checks consistent. Applies to all `tests/` Selenium modules.
  - Hoist CSS selectors used more than once (or sharing a common prefix) into a named constant or helper — selectors then drift from markup in one place instead of many
  - Route element-count assertions through `assertCountSeleniumElements(selector, count)` — keeps counting semantics identical across Selenium tests

## Naming

<!-- rule:2200 -->
- Name `tests/prefetch_related/` tests after the lookup they exercise (e.g., `test_related_objects_lookup`), following the module's `test_prefetch_<feature>_<pk_type>_pk` pattern — vague names hide which prefetch paths are actually covered, and reserving `recursive` for true recursive traversal keeps `test_nested_prefetch_related_with_duplicate_prefetcher`-style names meaningful — Naming these tests after the lookup they exercise (and reserving `recursive` for genuine recursive traversal) keeps it clear which prefetch paths — such as nested prefetches with duplicate prefetchers — are actually covered, so vague names can't mask untested or duplicated prefetch behavior.
<!-- rule:3030 -->
- Name test methods `test_{feature}_{subject}_with_{condition}` — keeps the varying condition visible in test runner output and groups same-feature tests together. — When tests are named with the feature/subject first, pytest output shows `test_models_user_without_password_and_email` → the failing condition is immediately visible. Leading with the feature also sorts related tests adjacently (e.g. `tests/auth_tests/test_models.py`, `tests/expressions/tests.py`), so it's easy to see coverage of a feature and spot gaps or duplicates at a glance.
<!-- rule:4820 -->
- Name request payload/body parameters `data` — matches the client method's payload arg and avoids misleading placeholder names like `example` — Keeps test/helper signatures aligned with the client API's `data` argument, so callers don't have to translate between names and readers aren't misled into thinking the parameter is sample data.
<!-- rule:6409 -->
- Use `a` as the lambda parameter in test assertion transforms (e.g. `assertQuerysetEqual(..., transform=lambda a: a.n1)`) — matches the convention across `tests/`, so reviewers and AI edits spot the pattern instantly — Scoped to test code (`tests/`, especially `tests/db_functions/` and other assertion-heavy modules). Deviating with `x` or other names breaks visual consistency in assertion suites where the lambda body is read at a glance.
<!-- rule:4669 -->
- Name browser tests after the behavior verified (e.g. `..._on_visibilitychange`), not the trigger that produces it (e.g. `..._when_parent_minimized`) — multiple triggers can produce the same event, so trigger-based names go stale when the test setup changes or a new trigger is covered. — Browser events like `visibilitychange` can be provoked by many user actions (minimizing, tab switching, window blur), so a test named after one trigger misleads readers when the setup changes and makes it unclear which behavior is actually under test. Naming by the event keeps `tests` self-describing and lets several trigger scenarios share a consistent naming scheme.

## Documentation

<!-- rule:1889 -->
- Comment non-obvious URL-pattern deps in `tests/auth_tests/urls.py` and `tests/auth_tests/test_views.py` — e.g. why a password-reset route is needed for admin-redirect tests, or which backend a pattern specifies in the URL — so nobody deletes a route that looks unrelated but is silently required by another auth test. — Auth test URL patterns exist to serve tests, not production routes, so their purpose is rarely obvious from the pattern itself. Without a note, a maintainer pruning `tests/auth_tests/urls.py` can remove a route (like the password-reset entry backing admin-redirect coverage, or a pattern that pins a specific auth backend) and break distant tests in `tests/auth_tests/test_views.py` in ways that are hard to trace back to the URL config.
<!-- rule:5931 -->
- Every test case in `tests/sitemaps_tests/` must have a short docstring summarizing the scenario and expected sitemap behavior (e.g., whether all items have `lastmod` and therefore whether the sitemap emits `lastmod`), consistent with the existing tests in the module. — Without these docstrings, someone modifying sitemap tests cannot distinguish an intentional absence of `lastmod` from a regression, which leads to incorrect test updates and inconsistent sitemap behavior.

## General

<!-- rule:734 -->
- In `tests/`, locate elements with `find_element(By.<STRATEGY>, "<value>")` / `find_elements(...)` — the deprecated `find_elements_by_*` helpers were removed in Selenium 4, so old form breaks on upgrade — Keeps Selenium tests in `tests/` running on modern Selenium and consistent across modules; short CSS selectors survive markup refactors that break long XPath chains.
  - When updating one locator to the `By.*` form, update similar occurrences in the same file — mixed old/new APIs leave the suite half-migrated and silently failing
  - Prefer `By.CSS_SELECTOR` over `By.XPATH` (and over deep descendant chains) — shorter selectors are more readable and less brittle against DOM changes

## Topic Guides

Check these when working in specific areas:

- **[Assertion Precision and Observable Contracts](agent_docs/assertion-precision-and-observable-contracts.md)**: When asserting on output, equality, serialization, errors, reprs, or other observable contracts.
- **[ORM and QuerySet Tests](agent_docs/orm-and-queryset-tests.md)**: When testing ORM behavior, model relations, expressions, composite keys, bulk operations, or related managers.

## File-Specific Rules

### `tests/admin_docs/test_views.py`

<!-- rule:3325 -->
- In `tests/admin_docs/test_views.py`, assert built-in tag links as `/admindocs/tags/#built_in-{tag_name}` — admin docs prefix built-in anchors, so bare `#{tag_name}` never matches the rendered URL and the test fails. — Admin docs render built-in template tag anchors with a `built_in-` prefix, so asserting a bare `#{tag_name}` href would never match the URL the view actually produces and the test would fail.
<!-- rule:3324 -->
- In `tests/admin_docs/test_views.py`, assert summary and body fragments separately with `assertContains(..., html=True)` and include the exact `href` per context — link generation differs between summary and body, so a combined assertion hides which one broke — Summary and body docstring rendering generate links through different code paths; asserting them together with a loose `href` check lets a regression in one path pass silently. Pinning the exact `href` per context catches breakage precisely.

### `tests/admin_scripts/tests.py`

<!-- rule:4015 -->
- In `tests/admin_scripts/tests.py`, exercise `startapp` target-directory handling via both `django-admin` and `manage.py`, wrapping each case in `self.subTest()` — covers rejected importable-module names (including existing-directory collisions), accepted valid targets, and path forms (nested targets, relative paths with `..`, and fallback when the target doesn't yield a dotted app name). — `startapp` has two entry points and several path-resolution branches; `subTest` isolates failures so a regression in name validation or dotted-name fallback doesn't mask other cases.

### `tests/admin_widgets/tests.py`

<!-- rule:738 -->
- In `tests/admin_widgets/tests.py`, test related-field/widget behavior at the unit level: instantiate `RelatedFieldWidgetWrapper` directly in `RelatedFieldWidgetWrapperTests` for permission/attribute checks, and assert rendered related-object links on the object's change form, not the add form; reach for Selenium only when the focused test can't cover the behavior — direct instantiation isolates wrapper logic (faster, fewer flakes), and add-form links break when related PKs need URL quoting. — Unit-level instantiation of `RelatedFieldWidgetWrapper` in `RelatedFieldWidgetWrapperTests` localizes wrapper bugs to the code under test, avoiding Selenium's overhead and flakiness. Using the change form instead of the add form matters because rendered related-object links are only valid when the object has a primary key; add-form links break for PKs that require URL quoting.

### `tests/auth_tests/test_auth_backends.py`

<!-- rule:2238 -->
- Mirror every `authenticate` test with an `aauthenticate` test in `tests/auth_tests/test_auth_backends.py` — sync and async backends share logic, so an untested path can drift silently. — Sync and async auth code paths are separate implementations of the same behavior; pairing tests catches divergence where one path is fixed or updated and the other is not.

### `tests/auth_tests/test_tokens.py`

<!-- rule:5685 -->
- In `tests/auth_tests/test_tokens.py`, name tests `test_<method_under_test>_<scenario>` using the exact API name (e.g., `check_token`, not `verify`) — keeps tests greppable by the method they cover — Naming tests after the exact method under test (rather than a synonym) makes the whole suite searchable by method name: grepping `check_token` surfaces every scenario testing it, which breaks down if tests call it `verify`. The `_<scenario>` suffix also disambiguates multiple tests for the same method.

### `tests/contenttypes_tests/test_management.py`

<!-- rule:5439 -->
- In `remove_stale_contenttypes` tests, assert each stale deletion is logged to stdout and `ContentType.objects.count()` returns to the pre-test count — catches silent no-op cleanup. — `remove_stale_contenttypes` reports and deletes stale rows; asserting the stdout log lines and the restored `ContentType.objects.count()` catches cases where the command silently deletes nothing or leaves orphaned rows behind. Scope: `tests/contenttypes_tests/test_management.py`.

### `tests/deprecation/test_warn_about_implementation.py`

<!-- rule:4633 -->
- Test warning-registry setup when a `sys.modules` module lacks `__warningregistry__` — prevents regression to direct attribute access — Some real modules in `sys.modules` are not preconfigured with `__warningregistry__`, so the helper must defensively initialize it; a regression test locks in that behavior and stops a future refactor from reverting to bare attribute access, which would raise `AttributeError` on those modules.

### `tests/get_or_create/tests.py`

<!-- rule:5623 -->
- When adding or modifying `get_or_create` default-update tests, include a separate multi-table inheritance (MTI) case using non-local concrete fields, and place it in `tests/get_or_create/tests.py` alongside the existing default-update tests. — MTI default-update behavior differs from single-table cases — inherited (non-local) concrete fields can regress silently without explicit coverage in `tests/get_or_create/tests.py`. Changing existing default-update tests should also trigger this MTI case in the same file. The same file keeps MTI coverage findable when a developer edits the default-update tests.

### `tests/gis_tests/gdal_tests/test_raster.py`

<!-- rule:4911 -->
- In `tests/gis_tests/gdal_tests/test_raster.py`, hold `GDALRaster` on `self` (e.g. `self.raster` in `setUp`) and release with `self.raster = None` — never `gc.collect()` to force GDAL cleanup. — CPython refcounting closes the raster deterministically once the last reference drops, so PAM metadata is written before assertions; `gc.collect()` makes close/flush timing unpredictable and flaky.
  Rationale: CPython refcounting closes the raster deterministically once the last reference drops, so PAM metadata is written before assertions; `gc.collect()` makes close/flush timing unpredictable and flaky.

### `tests/gis_tests/geoapp/models.py`

<!-- rule:3248 -->
- In `tests/gis_tests/geoapp/models.py`, reuse `ThreeDimensionalFeature` for 3D feature/point tests instead of adding a new `City3d` model. — Rationale: keeps `geoapp` migrations stable and avoids duplicating 3D geometry fixtures.
  New models in the `geoapp` test app require matching migrations and can silently break the swappable-app test setup; `ThreeDimensionalFeature` already covers 3D point/feature fixtures across GIS backends.

### `tests/gis_tests/test_geoforms.py`

<!-- rule:5726 -->
- Match test values to `geom_type` in `BaseGeometryWidget.get_context()` tests (`'polygon'` for `POLYGON`, `'geometry'` for `GEOMETRY`) — copying placeholders like `'point'` asserts an impossible widget state and masks bugs — A value inconsistent with the configured `geom_type` makes `get_context()` produce output the widget would never produce in real use, so the test can pass while the polygon/geometry rendering path is broken and can mislead anyone copying the case as a template.

### `tests/httpwrappers/tests.py`

<!-- rule:3081 -->
- Place HTTP response wrapper/subclass tests in `tests/httpwrappers/tests.py` under `HttpResponseSubclassesTests`, not in `tests/responses/tests.py` — keeps subclass coverage discoverable alongside the wrappers it exercises and avoids drift from duplicated tests. — Consolidating subclass tests with their wrappers prevents duplicated/stale coverage in `tests/responses/tests.py` and makes it obvious where new `__repr__`/property tests belong.

### `tests/i18n/tests.py`

<!-- rule:6248 -->
- Use `override_settings()` instead of `patch_formats` in `tests/i18n/tests.py` — the format-cache signal handler makes the helper obsolete, so remove it and migrate any remaining usages. — `patch_formats` is redundant after the format-cache signal handler was introduced, so leaving it around invites new tests to use a stale pattern; migrating to `override_settings()` keeps test setup consistent with current Django behavior.

### `tests/mail/tests.py`

<!-- rule:2677 -->
- In `tests/mail/tests.py`, assert on rendered/parsed attachment output (`msg.message().as_string()`, `MailTests.get_decoded_attachments(msg)`, `self.get_raw_attachments(email)`) — bare `msg.message()` only proves rendering doesn't raise — Asserting only that `msg.message()` doesn't raise would let attachment rendering silently produce wrong or missing MIME parts, and without explicitly covering unnamed/plain-tuple entries on `EmailMessage.attachments`, the backwards-compatible attachment form can regress unnoticed because nothing verifies the decoded/raw output actually contains those attachments.
  - Explicitly test unnamed/plain-tuple attachments on `EmailMessage.attachments` — the backwards-compat form regresses silently otherwise

### `tests/messages_tests/base.py`

<!-- rule:5816 -->
- Test inherited behavior (e.g. `__repr__`) in the shared `BaseTests` mixin using `self.storage_class(request)` — every backend then inherits the assertion instead of one-off coverage in a single subclass. — `BaseTests` is instantiated per storage subclass, so a single assertion there automatically covers all backends and prevents drift where only one backend's inherited behavior gets checked.

### `tests/middleware/tests.py`

<!-- rule:6369 -->
- In `tests/middleware/tests.py`, assert the exact `GZipMiddleware` ETag transformation after `process_response`: strong ETags become weak (`W/"..."`), already-weak ETags stay byte-identical — a loose assertion would let a regression in weak/strong handling pass unnoticed. — `GZipMiddleware` must weaken strong ETags (since the compressed body no longer matches the original) while leaving already-weak ETags untouched. Asserting the exact transformation catches regressions that a truthy or substring check would miss.

### `tests/migrations/test_executor.py`

<!-- rule:4156 -->
- In `tests/migrations/test_executor.py`, test every `MigrationExecutor` logging combination of apply/unapply × real/fake × log level; use `subTest` to consolidate analogous cases — untested combos regress silently, and `subTest` reports per-case failures without duplicating test bodies. — Without exhaustively testing every apply/unapply × real/fake × log-level combination via `subTest`, an untested combination can silently regress to emitting missing, wrong-level, or spuriously duplicated migration logs, while duplicating test bodies per case obscures which specific combination failed.

### `tests/migrations/test_loader.py`

<!-- rule:6210 -->
- In `tests/migrations/test_loader.py`, sort expected migration-plan entries by application order — first-applied at top, last-applied at bottom — consistently across every expected plan. Matches how plans are actually applied, so diffs and failures read top-to-bottom. — Migration plans execute in application order, so test assertions ordered the same way read naturally and make failures easy to trace from first to last migration. Inconsistent ordering across expected plans in the same test file obscures which step diverged.

### `tests/queries/test_q.py`

<!-- rule:552 -->
- Test all `Q` arg forms in construction/traversal tests: nested `Q`, kwargs yielding `(lookup, value)` tuples, and non-`Q` positionals like `Lookup` instances — each produces a distinct child shape in `Q.flatten()`, so untested forms silently break tree traversal (see `tests/queries/test_q.py`). — `Q.flatten()` walks children that come in three different shapes depending on how they were added. A test suite that only exercises one shape passes while the other traversal paths rot — this keeps `tests/queries/test_q.py` (including `test_fields`) guarding every supported input form.

### `tests/queryset_pickle/tests.py`

<!-- rule:5684 -->
- Bind `test_pickle_filteredrelation_m2m` filters and setup to the created `m2mmodel` instance (e.g. `Q(m2mmodel=m2mmodel)`, `Q(m2mmodel__pk=m2mmodel.pk)`) or explicit deterministic PKs like `id=1` — avoids depending on serial PK ordering or unused `added` dates that break under DB/test-runner variance. — `pk__lt=10` and stray dates assume a serial PK sequence that isn't guaranteed across runs or backends, so the test can silently match the wrong rows; tying conditions to the actual instance keeps the assertion about the same object the test created.

### `tests/requests_tests/test_accept_header.py`

<!-- rule:339 -->
- Use RFC 7231 §5.3.2 canonical examples in `tests/requests_tests/test_accept_header.py` — spec-anchored cases expose the precedence bugs real clients hit — RFC 7231 §5.3.2 examples are the anchor for `Accept` precedence, so tests written against them catch deviations that ad-hoc cases miss. Splitting precedence/order-resolution tests from q-value/wildcard tests localizes failures, and explicitly covering same-wildcard ties under both quality/specificity and server/caller-list order prevents an untested ordering assumption in `test_accept_header.py`.
  - Keep precedence/order-resolution tests separate from q-value/wildcard tests — combined cases can't tell which behavior broke
  - Test both quality/specificity precedence and server/caller-list order for same-wildcard ties — q-values alone don't define tie-breaking

### `tests/runtests.py`

<!-- rule:5839 -->
- In `tests/runtests.py`, resolve path-like CLI labels relative to `RUNTESTS_DIR` (not cwd), validate existence and containment with a descriptive error, normalize trailing separators and dotted segments, then convert to a dotted importable module name before the unittest loader sees it — prevents cwd-dependent breakage and loader errors when the suite is invoked from outside `tests/`. — Path-like CLI labels in `tests/runtests.py` must be interpreted relative to `RUNTESTS_DIR` so users can run the suite from anywhere in the repo without their labels silently resolving against cwd or blowing up in the unittest loader. Normalization (trailing separators, dotted segments) and module-name conversion are needed because the loader expects dotted import paths, not filesystem paths. Regression coverage for both path forms, including invocations from outside `tests/`, keeps the contract from regressing back to cwd-relative behavior.
  - Add regression tests for path-like labels in both trailing-slash and non-trailing-slash forms, and from outside `tests/` — locks in the `RUNTESTS_DIR`-relative contract that users rely on when running the suite from the repo root.
<!-- rule:2424 -->
- In `tests/runtests.py`, validate the Selenium `--driver` choice via `issubclass(driver_cls, selenium.webdriver.remote.webdriver.WebDriver)` — instantiating the class during argparse launches a blank browser before tests run — Instantiating a WebDriver has the side effect of opening a real browser window; doing this inside argument parsing spawns a stray blank browser every time any test command runs, before any test has even started.

### `tests/sessions_tests/tests.py`

<!-- rule:6271 -->
- In `tests/sessions_tests/tests.py`, check session existence/clearing/deletion via `self.backend(key)` (e.g. `.exists()`, `.load() == {}`), not the `Session` model directly — verifying through the backend exercises the same path production code uses, so tests won't pass on state that real backends wouldn't expose. When asserting a session was cleared or deleted, first set a value and `save(must_create=True)` so the empty `load()` proves removal, not absence. — Querying `Session` directly bypasses the backend abstraction and can pass even when the configured backend behaves differently. Populating before asserting an empty `load()` with `save(must_create=True)` distinguishes 'data was removed' from 'data was never written' — without it, the assertion is vacuous.

### `tests/shell/tests.py`

<!-- rule:3111 -->
- In `tests/shell/tests.py`, assert the complete auto-import set (`models`, `settings`, `functions`, `transaction`) in expected stdout, including verbose `v=2` output — the shell prints every default import at `v=2`, so a partial subset lets a dropped import pass silently; document any intentional omission. — The shell prints every default import at `v=2`. Asserting only a partial subset of auto-imported names means a removed or renamed import would go unnoticed by the test suite.
<!-- rule:3112 -->
- Stub `get_auto_imports` to `[]` in a `tests/shell/tests.py` case — covers the '0 objects' display path — The '0 objects' console output branch is only reachable when `get_auto_imports` returns an empty list, so without this stub the path ships untested and can regress silently.

### `tests/test_runner/test_discover_runner.py`

<!-- rule:5805 -->
- In `tests/test_runner/test_discover_runner.py`, call shared helpers like `DiscoverRunner.build_suite` with `test_labels` positional, matching surrounding tests — keeps the file's call style consistent and makes diffs reviewable — Matching the argument-passing style of neighboring tests in `tests/test_runner/test_discover_runner.py` keeps the file internally consistent; mismatched keyword vs. positional calls create noisy diffs and make it harder to spot real changes when scanning `build_suite` usages.

### `tests/utils_tests/test_html.py`

<!-- rule:2875 -->
- Add new `urlize` cases to the existing parameterized `tests` tuple in `test_urlize` (`tests/utils_tests/test_html.py`) (e.g. `test_urlize_assume_https`) instead of new test methods, and use one representative host per distinct parsing behavior — keeps related cases scannable and stops near-duplicate hosts from muddying which behavior actually regressed. — The `test_urlize` suite is parameterized: each tuple entry names one parsing behavior. Separate methods or many near-identical hosts split attention and make failures harder to attribute, so one representative host per behavior keeps the table readable and each failure signal unambiguous.

### `tests/utils_tests/test_http.py`

<!-- rule:5131 -->
- In `urlencode` tests (`tests/utils_tests/test_http.py`), cover `doseq=False` with list/tuple inputs — guards the `and not doseq` branch in `django/utils/http.py`. Don't assert `bytearray` + `doseq=False`; that combination is underspecified. — Covers both requirements: the list/tuple case with `doseq=False` prevents regression of the `and not doseq` branch in `django/utils/http.py`, while bytearray + `doseq=False` is an underspecified edge case where assertions would lock in incidental behavior.
<!-- rule:2946 -->
- Test RFC 2231 continuations in `tests/utils_tests/test_http.py` with `subTest` — cover UTF-8 chars split across segments and groups not starting at section 0; assert split sequences decode and malformed continuations fall back to the direct parameter value, since silent misassembling or clobbering of supplied values is invisible without these cases. — `django.utils.http.parse_header_parameters` joins RFC 2231 continuation segments before decoding, so a multi-byte UTF-8 character spanning a segment boundary can corrupt silently and continuation groups that skip section 0 should be discarded in favor of a directly supplied parameter — neither failure surfaces without targeted `subTest` regression cases in `tests/utils_tests/test_http.py`.

<!-- /braindump -->