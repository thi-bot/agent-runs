# Exception Handling & Propagation

> How to raise, catch, aggregate, and preserve exceptions: wrapping parser/IO failures, preserving causes, avoiding retained tracebacks, and version-gated initialization.

**When to check**: When raising, catching, wrapping, or aggregating exceptions in library or application code.

## Rules

<!-- rule:2800 -->
- In custom deserializers (e.g., `django/core/serializers/jsonl.py`), decode/normalize `str`/`bytes` input before constructing or iterating the format reader, and pass the built reader to `super().__init__(...)` — mismatched input types silently produce empty or broken streams. — Django's `Deserializer` base expects text-mode readers; feeding raw `bytes` or an un-normalized stream yields `AttributeError`s or empty `read()` results that surface far from the cause.
<!-- rule:3412 -->
- Validate enumerated params in Python against the exact allowed set, raising `ValueError` — e.g. `Lexeme.__init__`'s `weight` must be `{'A','B','C','D'}` or `None`; DB-level checks let invalid values through silently. — Catching bad enum values at the API boundary gives callers an immediate, traceable error instead of a corrupted row or a late failure far from the source.
<!-- rule:4367 -->
- Raise `ValueError` on `{path!r}` resolution failure, using `Expected {path!r} to point to {expected}` — the string arg is valid, so only its target is wrong, and "point to" reflects dereferencing rather than a type/value comparison; `TypeError`/"to be" would misattribute the fault. — Distinguishes path-resolution failures (valid string, bad target) from actual type misuse, so callers can catch the right exception and error messages trace the reference chain instead of the input.
<!-- rule:4547 -->
- In `django.contrib.auth.password_validation`, check `callable(klass)` after importing `NAME` and raise `ImproperlyConfigured` (not `TypeError`) for non-callable entries. — A non-callable `NAME` (e.g. `json.tool`) is a config mistake in `AUTH_PASSWORD_VALIDATORS`, so it should surface as `ImproperlyConfigured` with a message naming the module path. This is a behavioral change, so `test_get_password_validators_custom_invalid` in `auth_tests/test_validators.py` must be updated to expect the new exception for `{'NAME': 'json.tool'}`.
<!-- rule:4712 -->
- Count exceptions with an int counter, not a list, when only the total is needed — exception instances retain `__traceback__`, which keeps frames and all objects they reference alive (e.g., in `django/test/runner.py`, tally unraisable exceptions as an int and add the count to `suite_result` rather than storing them and calling `len()`). — Holding exception objects pins tracebacks, frames, and their entire referenced object graphs in memory; an int avoids that leak when only an aggregate count is required.
<!-- rule:5133 -->
- Put `gzip.open` and its subsequent read/parse inside the **same** `try`/`except OSError`, and route both the gzip and plain-`open` fallback paths through one shared parsing block — `gzip.open` defers `OSError` until `read()`, so guarding only the open lets corrupt-file errors escape the handler, and duplicated parsing logic in each branch silently drifts apart (see `django/contrib/auth/password_validation.py`). — gzip.open is lazy: an invalid/truncated gzip file raises OSError only when read, so a try/except around the open call alone misses the real failure. Keeping read and parse inside the same block catches it, and a single shared parse function keeps gzip and plain-file behavior identical instead of diverging over time.
<!-- rule:6385 -->
- Concise version — Following the concise version prevents inconsistency and unnecessary divergence from the codebase's established style by ensuring contributors use the shorter form rather than verbose alternatives that accomplish the same thing.
<!-- rule:3795 -->
- In `@contextmanager` generators iterating candidates (e.g. `connections.all()`), `break` after the first successful yield. — A second yield raises `RuntimeError: generator didn't stop`, crashing the `with` block after the resource is already acquired.
<!-- rule:4224 -->
- This rule is too long. Rewrite it as a single concise bullet point — under 100 characters for the rule itself, with a short rationale after the em dash. Keep the version-gated global pattern (`if not PY315`, `lock`) and the `django/utils/inspect.py` reference. Explain the `NameError` bug the rule prevents. — Without the `if not PY315` gate, `django/utils/inspect.py` would raise a `NameError` on Python 3.15+ where the global `lock` no longer exists.
<!-- rule:6065 -->
- Let `subprocess` stderr inherit; use `subprocess.PIPE` only when you unconditionally forward, inspect, or suppress it — captured-but-unread stderr silently hides warnings and diagnostics from users. — Subprocess stderr that is captured via `subprocess.PIPE` but never read (or only conditionally read) disappears instead of surfacing tool warnings and error output, making failures hard to diagnose.
