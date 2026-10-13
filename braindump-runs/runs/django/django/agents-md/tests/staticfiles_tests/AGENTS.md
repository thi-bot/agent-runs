<!-- braindump: rules extracted from PR review patterns -->

# tests/staticfiles_tests/ Guidelines

## Testing

<!-- rule:2979 -->
- Cover every ES import form in `tests/staticfiles_tests/project/documents/` JS fixtures — default, named, aliased, `* as`, multiline, semicolon-less, and whitespace variants around `import`/`*`/`as` — so the staticfiles import resolver can't regress on an untested syntax. — Each syntax variant exercises a distinct branch of the staticfiles ES module import resolver; untested forms can break without any fixture failing. Negative cases pin the boundary between locally-resolvable paths and external/bare specifiers. Identifier mismatches would make assertions succeed or fail for reasons unrelated to import resolution, obscuring the actual signal.
  - Add negative cases in those fixtures — bare module names, `@vendor/package`, `#js/...` — that must not resolve as local paths, pinning the resolver's local-vs-external split.
  - Match imported identifiers exactly to each fixture module's exports — a typo makes the test pass or fail for the wrong reason.
<!-- rule:3027 -->
- In `tests/staticfiles_tests/`, extend existing fixtures (e.g., `ignored.css`) and test methods (e.g., `test_path_ignored_completely()`) instead of duplicating — keeps coverage in one place so new edge cases (non-matching, ignored, malformed) are added where they run — Following these conventions keeps the staticfiles test suite reliable by preventing duplicated coverage, setup drift and hash-state leakage between tests, brittle hash expectations, coupling to private hashing internals, and tests that enshrine unsupported STATICFILES_DIRS behavior.
  - Use `CollectionTestCase` from `cases.py` for standard static directories — its `setUp` resets `storage.staticfiles_storage.hashed_files`, so duplicated setup drifts and leaks hash state between tests
  - Derive hashed paths via `self.hashed_file_path(...)` and commit fixture files under the staticfiles test project — hardcoded hashes break whenever the hashing algorithm or fixture contents change
  - Prefer a custom `Storage` subclass over mocking internals like `file_hash` — mocks couple tests to private implementation and hide real hashing behavior
  - Drop finder tests for unsupported `STATICFILES_DIRS` shapes; cover the supported list/tuple forms instead — tests for rejected configs lock in behavior the project doesn't guarantee
<!-- rule:6014 -->
- In staticfiles tests, replace `settings.STORAGES` entirely rather than `pop()`-ing individual aliases to simulate a missing alias. — `UserSettingsHolder` restores default and staticfiles aliases on attribute access, so `pop()`/delete only removes the local override and the alias resurfaces — whole-dictionary replacement is the only way to actually hide it.
<!-- rule:6280 -->
- In `tests/staticfiles_tests/storage.py` reference classes, show a concrete before/after rewrite in the docstring and keep the pattern implementation technically correct — readers copy these into production code. — Oversimplified or docstring-less examples in `tests/staticfiles_tests/storage.py` get lifted verbatim into real storage backends, propagating subtly broken pattern-substitution logic.

## General

<!-- rule:2232 -->
- Name unimplemented-storage test helpers/tests after the specific method they simulate (`PathNotImplementedStorage`, `test_handle_path_notimplemented`), not the generic exception — keeps each simulated gap distinguishable as more accumulate — Naming after the general exception (`NotImplementedStorage`, `test_notimplemented`) becomes ambiguous once multiple unimplemented behaviors exist in `tests/staticfiles_tests/storage.py` and `tests/staticfiles_tests/test_management.py`; method-specific names keep each case findable and self-documenting.

<!-- /braindump -->