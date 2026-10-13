<!-- braindump: rules extracted from PR review patterns -->

# django/test/ Guidelines

## Testing

<!-- rule:6270 -->
- In config-driven test generators (e.g. `django/test/selenium.py`), emit no parameterized methods when config is empty (no browsers selected) — a no-op generator must not leave collectable tests; if methods stay discoverable in subclasses, skip the declaring class and every subclass explicitly rather than relying on a base-class `skipIf`, since the class-level skip doesn't propagate to subclasses. — Empty configuration otherwise produces phantom test runs (or silent passes) instead of unmistakable 'nothing to run', and subclasses rediscover the original method even when the base class is skipped.
<!-- rule:4652 -->
- In Selenium test classes, map each config (e.g. browser name) to its resource in `setupClass`, expose it via `cached_property` (e.g. a `selenium` property looking up the WebDriver for `self.browser`), and `quit()` every driver in `tearDownClass` — spinning up browsers per test is too expensive. — Browsers/drivers are expensive to start; sharing one per class per configuration keeps runs fast without leaking processes. Grouping parameterized configs prevents interleaved start/stop cycles that would otherwise dominate test runtime.
  - For classes parameterized across configs, run all tests for one config as a group, starting its resource before the first and stopping after the last before moving on — avoids repeated browser startup/teardown thrash (see `django/test/selenium.py`).

## General

<!-- rule:4653 -->
- Expose test config (e.g. `browser` specs) as class attributes on the test class/metaclass — populated from environment variables by the test runner — so users can override per test class or subclass without editing the runner. — Attribute-based config lets subclasses and callers customize browser selection declaratively while keeping the runner code shared between `django/test/selenium.py` and `django/test/playwright.py`.
<!-- rule:5456 -->
- Expose suite-specific setup (settings, serialized contents, multiprocessing start method) via an optional `initialize_suite()` hook on the suite class; have the runner invoke it via `hasattr(suite, 'initialize_suite')` before `runner.run(suite)` — keeps the runner generic and avoids hard-coded, suite-specific setup leaking into it. — Centralizing suite-specific setup in `initialize_suite()` keeps `django/test/runner.py` unaware of individual suite internals, so new suites can be added without editing the runner and multiprocessing/serialization details stay with the suite that owns them.
<!-- rule:4117 -->
- Pass an `exc_info` `(type, value, traceback)` tuple to `TestResult.addFailure()`/`addError()`/`addExpectedFailure()` — a bare exception instance loses the traceback that `django/test/runner.py` relies on to report failures in `tests/test_runner/test_parallel.py`. — Test runner reporting should preserve the full traceback so failures surfaced from `django/test/runner.py` (including parallel runs exercised by `tests/test_runner/test_parallel.py`) remain diagnosable.
  - Word exception notes to point at the traceback (e.g. `'see traceback above'`) instead of naming an internal failure mode — users can diagnose the actual cause rather than guess at it.

## File-Specific Rules

### `django/test/client.py`

<!-- rule:1364 -->
- In `django/test/client.py` request methods, default optional string params (`data`, `content_type`) to `''`, not `None` — these populate WSGI environ values, and `cgi.parse_header` raises `TypeError: must be str, not NoneType` on `None`. — Downstream WSGI parsing (e.g. `cgi.parse_header`) performs string operations on environ values, so a `None` default crashes request handling with `TypeError: must be str, not NoneType`.
<!-- rule:5223 -->
- Handle client-level options like `follow` in `AsyncClient` HTTP method wrappers, not in `AsyncRequestFactory.generic()`. — Keeps `generic()` as a low-level request factory and avoids duplicating client concerns at the wrong layer. Once the wrappers always consume an option first, delete the factory's unreachable branch so dead handling doesn't accumulate in `django/test/client.py`.}
<!-- rule:6433 -->
- Centralize content-type encoding/dispatch in one `_encode_*` helper in `django/test/client.py` — avoids repeating content-type checks across `post`/`put`/`patch`. — Duplicated content-type checks in each request method drift out of sync as formats are added, and a helper named after one format (`_encode_json`) hides that it actually dispatches on content type, so callers misjudge what it accepts.
  - Name a dispatching helper for its behavior, not one format (`_encode_data`, not `_encode_json`) — a format-specific name misleads callers about what inputs it handles.
<!-- rule:3860 -->
- Build ASGI scopes with only ASGI HTTP connection scope keys — client-side flags like `follow` aren't part of the protocol and leak transport concerns into code that just forwards scope to the server — The ASGI HTTP connection scope has a fixed, protocol-defined shape; adding keys like `follow` puts a client-side policy decision into a structure the server and other scope consumers don't recognize. Redirect-following also depends on inspecting the response, which scope-construction helpers never see — keeping it in the request method that processes the response means the behaviour is implemented where the data it needs actually exists, and `AsyncRequestFactory.generic()` remains a thin, predictable transport builder.
  - Handle redirect-following in the request method that processes the response, not in `AsyncRequestFactory.generic()` — scope helpers stay transport-level, so redirect logic lives where the response is actually inspected

### `django/test/html.py`

<!-- rule:5773 -->
- Annotate sets/constants in `django/test/html.py` with their WHATWG spec link and tag deprecated entries `# Deprecated tags.` — matches `SELF_CLOSING_TAGS`, keeps spec references traceable — Consistent spec links make it obvious where each set (e.g., `BOOLEAN_ATTRIBUTES`) came from and which entries are outdated, so future updates can be verified against the HTML spec instead of guessed.

### `django/test/playwright.py`

<!-- rule:4641 -->
- hello — world

### `django/test/runner.py`

<!-- rule:4092 -->
- Route all `DiscoverRunner` diagnostics through `self.log()` — bare `print()` bypasses verbosity filtering and breaks `--verbosity` semantics. — Callers of the test runner expect `-v 0/1/2` to actually control noise; stray `print()` output ignores this and pollutes CI logs.
<!-- rule:3278 -->
- In `django/test/runner.py`, subclass `unittest`'s `TestResult`/`TextTestResult` for custom result classes — override only what differs, mirroring CPython's `unittest` and disabling inherited bookkeeping that adds unused overhead instead of copy-pasting stdlib APIs. — Copy-pasted stdlib APIs silently drift from CPython's `unittest` semantics, breaking Django's runner on edge cases; subclassing keeps behavior aligned and lets Django skip unused bookkeeping.
  Rationale: Copy-pasted stdlib APIs silently drift from CPython's `unittest` semantics (e.g. `addError`/`addFailure` bookkeeping, `_exc_info_to_string`), so Django's runner diverges on edge cases and breaks when stdlib behavior changes; subclassing keeps behavior aligned while letting the runner skip bookkeeping Django doesn't use.
<!-- rule:4726 -->
- In `load_tests_for_label` (`django/test/runner.py`), group resolved test cases by `type(test)` and call each group's own `get_test_variations()` instead of reusing `test_cases[0]`'s variations — whole-module labels resolve across sibling classes, so one class's variation list duplicates or drops variants for the others. — Whole-module test labels resolve tests from multiple sibling classes. Deriving variations from `test_cases[0]` and applying them to all cases re-applies one class's variations to unrelated classes, duplicating or dropping variants.
<!-- rule:5780 -->
- Print `Used shuffle seed: {seed} ({kind})` after the result summary when shuffling is on in `django/test/runner.py` — the seed is otherwise lost, so failed shuffle-only test orderings can't be reproduced — Reports the seed that produced a randomized test order so a failing run can be replayed; without it, order-dependent failures from `--shuffle` are unreproducible.
  - Keep the `{kind}` suffix in the seed line (`"shuffle"` vs unknown kinds) — downstream parsers and users rely on it to know why the order was shuffled
<!-- rule:5781 -->
- Keep seed generation and shuffle-kind resolution in `Shuffler`; `DiscoverRunner` should only pass shuffle settings in — separates shuffle internals from test-runner orchestration in `django/test/runner.py` — Keeps shuffle-specific state localized to `Shuffler`, so changes to seed or kind logic don't ripple into `DiscoverRunner` and runner behavior stays independent of shuffle configuration details.

### `django/test/selenium.py`

<!-- rule:6177 -->
- Make `SeleniumTestCase` window-size helpers (`desktop_size`, `small_screen_size`, `mobile_size`) `@classmethod`s — they can then decorate test methods (`@SeleniumTestCase.small_screen_size`) without depending on `cls.selenium`, which only exists after `setUpClass` runs. — Instance methods on `SeleniumTestCase` would require an instance, so they can't be used as decorators and would fail whenever `setUpClass` hasn't run yet; classmethods keep `django/test/selenium.py` helpers usable in decorator position with no `cls.selenium` dependency.

### `django/test/testcases.py`

<!-- rule:1712 -->
- When reusing a generic assertion helper in inverse mode (e.g. `assertNotInHTML` delegating to `assertInHTML(..., count=0)`), customize the failure message for the inverse case — say the needle was unexpectedly found, use the original `needle`/`haystack` args (not internal parsed vars), and update tests to expect a message naming the response that lacks the substring. — Generic count mismatches ("0 != 1") are cryptic for inverse assertions; specializing the message keeps `django/test/testcases.py` failures actionable and consistent with what tests should expect.
<!-- rule:5007 -->
- Snapshot `cls.__dict__` before `setUpClass`/`setUpTestData` and diff by identity (`is`), not name sets — predeclared placeholders get overwritten in place, so set differences miss them. — Tracking class attributes in Django `TestCase.setUpClass`/`setUpTestData` via a set difference of attribute names silently drops placeholders that already existed on `cls` and were replaced during setup; comparing snapshotted `cls.__dict__` values by identity (`is`) or value change catches these overwrites.

### `django/test/utils.py`

<!-- rule:4000 -->
- In test wrappers like `instrumented_test_render` (`django/test/utils.py`), call the saved original for all subclasses instead of adding `isinstance` branches (e.g. `isinstance(self, PartialTemplate)`) — keeps instrumentation transparent and prevents subclasses from silently bypassing monkeypatched behavior. — Subclass-specific branches in monkeypatched wrappers make instrumentation fragile: any subclass not explicitly listed skips the wrapper entirely, hiding the real behavior being tested. Wrapping the original method wholesale (or delegating to the saved original) keeps all classes uniformly instrumented. Add a regression test whenever instrumentation behavior is extended so the coverage stays honest.
<!-- rule:5592 -->
- Pass short noun-phrase labels to `time_it`, matching existing label style in the file — Keeps timing output consistent and readable — verbose past-tense phrasing like '... took' breaks the established style.
<!-- rule:3203 -->
- When converting scalar↔collection settings (`SECRET_KEY`/`SECRET_KEYS`) in `django/test/utils.py`, map falsy sources to their empty/default derived value instead of wrapping or indexing them — wrapping an empty scalar in a list or indexing an empty collection yields a wrong override rather than an empty one. — The override helper round-trips settings between `_KEY` and `_KEYS` forms; treating `''`/`None`/`[]` uniformly is what keeps `override_settings` and its reverse translation symmetric, so tests that clear a setting don't silently leave stale values in place.
<!-- rule:4788 -->
- Use `enable`/`disable` naming for `TestContextDecorator` members, not `enter`/`exit` or `first` — Subclasses in `django/test/utils.py` override and hook into the `enable`/`disable` pair; matching that terminology (e.g., `enable_exception`) keeps new members discoverable and consistent with the existing API surface.

<!-- /braindump -->