<!-- braindump: rules extracted from PR review patterns -->

# django/http/ Guidelines

## API Design

<!-- rule:5575 -->
- Subclass header mappings (e.g., `ResponseHeaders`) to override behavior locally — relaxing invariants like immutability on the base type leaks changes into all existing subclasses. — The shared base mapping is depended on by existing subclasses; loosening its invariants (e.g., immutability) silently changes behavior everywhere it's used, whereas a new subclass localizes the override.
<!-- rule:1533 -->
- Construct parsers per request; `parse()` accepts the content and returns a `(data, files)` tuple — captures request-specific metadata (`encoding`, content type) and lets callers unpack uniformly (`MultiValueDict()` as `files` for non-form parsers, no `HttpRequest` mutation, lazy `request.body` read). — Per-request construction keeps request-specific metadata (`encoding`, content type) captured; the uniform `parse()` contract (normalize `HttpRequest` internally, return `(data, files)` instead of mutating) means callers in `django/http/parsers.py` can unpack results without special-casing form vs non-form parsers.

## General

<!-- rule:4029 -->
- Count only parsed payload bytes (FIELD + FILE parts) toward `DATA_UPLOAD_MAX_MEMORY_SIZE` — metadata like field-name length isn't user payload and would prematurely reject valid requests. — Guards `django/http/request.py` and `django/http/multipartparser.py` request body parsing.
<!-- rule:6179 -->
- Normalize HTTP charset/encoding case before equality checks in `django/http/request.py` — HTTP charset values are case-insensitive, so case-sensitive comparisons silently reject valid requests. Cover case variants in tests. — HTTP charset tokens are case-insensitive per spec, so a literal comparison like `encoding == "utf-8"` can reject legitimate requests that send `UTF-8` or `Utf-8`. Normalizing before the check keeps request parsing correct for all valid clients, and tests for case variants lock in the behavior.
<!-- rule:1544 -->
- In `django/http/multipartparser.py`, name POST parameters `keys`, not `fields` — `fields` is reserved for Django form fields — The multipart parser operates on arbitrary POST bodies, not just Django forms; conflating the two with `fields` implies form-specific behavior the parser doesn't have.
  - Document multipart parsing as handling general POST key/value data, not Django forms — the parser serves any POST body, so form terminology misleads readers

## File-Specific Rules

### `django/http/multipartparser.py`

<!-- rule:5797 -->
- Keep `django/http/multipartparser.py::sanitize_file_name` cleanup generic and Unicode-safe — no OS-specific blacklists or Windows reserved-device-name checks, and no micro-opts that break Unicode correctness (verify against the Unicode filename tests in `tests/file_storage/test_generate_filename.py`) — Django sanitizes filenames for every upload, so hardcoding Windows forbidden-char lists or reserved device names breaks valid filenames on other platforms, and Unicode shortcuts silently corrupt non-ASCII names — both are regressions caught only by the Unicode filename tests.
<!-- rule:1370 -->
- When editing `django/http/multipartparser.py`, add tests for both success and error paths — including `max_header_size` overflow and `handler.file_complete()` returning a falsy non-None value — since these edge cases regress silently and break upload handling. — New chunked parsing branches and error paths in django/http/multipartparser.py, along with a falsy-but-not-None return from handler.file_complete(), change how multipart request bodies are consumed; without tests for successful parsing, exceeding max_header_size, and that falsy completion case, regressions can silently corrupt uploads or mishandle request bodies. Tests for modified parsing behavior and these edge cases prevent later changes from breaking multipart handling in ways that are difficult to trace.
<!-- rule:5654 -->
- Test new `handler` callbacks in `parse()` (`django/http/multipartparser.py`) — untested branches silently skip callbacks like `StopUpload` — Untested branches in `parse()` can silently skip their `handler` callbacks, so without a test that exercises each new branch the parser may never invoke `StopUpload` (or other handlers), letting file-size/field limits be bypassed and uploads be silently truncated without any test catching the regression.

### `django/http/request.py`

<!-- rule:338 -->
- In `django/http/request.py` negotiation helpers (`accepted_types`, `get_preferred_type`, `preferred_language`), rank media types by specificity (concrete before wildcard), then `q` (absent = `1.0`), per RFC 7231 §5.3.2 — wrong ordering silently picks the wrong representation. — These negotiation helpers previously returned non-deterministic or incorrectly ordered results — a wildcard could be chosen over a concrete type, or an empty `Accept` header treated as matching nothing — silently serving the wrong content type, so the rule pins down RFC 7231 §5.3.2 specificity-then-`q` ordering, candidate-list tie-breaking, and regression tests to keep content negotiation deterministic and backward-compatible.
  - Treat an empty `Accept` value as `*/*`, same as a missing header. Break remaining ties by caller/server candidate-list order, not client header order — keeps wildcard-match results deterministic and backward-compatible.
  - Add tests locking tie-breaking behavior — these ordering rules regress easily.
<!-- rule:3434 -->
- Validate the port in `Host`/`X-Forwarded-Host` strictly in `django/http/request.py` (`get_host`/`split_domain_port`/`validate_host`): reject empty, non-numeric, out-of-range, reserved (port 0), and ambiguous leading-zero ports — partial values leak into downstream URL construction and security checks. — Port parsing in `get_host` feeds request routing, redirect targets, and origin checks; accepting a partial or unvalidated port silently corrupts those (e.g. `example.com:` or `example.com:080`), while letting `ValueError` from `int()` escape turns malformed client input into a 500 instead of the 400 Django already produces for bad hosts.
  - Raise `SuspiciousOperation` (HTTP 400) for malformed client-supplied host headers, reusing the existing `ALLOWED_HOSTS`/`DisallowedHost` path — parsing errors must not surface as HTTP 500, which masks attacker-controlled input as a server fault.
<!-- rule:3451 -->
- In `HttpRequest` (`django/http/request.py`), resolve forwarded port via `HTTP_X_FORWARDED_PORT` directly — `get_port()` falls back to non-forwarded `SERVER_PORT`, which misreports the client-facing port. — Reading a non-forwarded port contaminates the resolved host:port with the internal listener's port, breaking external URLs and redirects when behind a proxy.
<!-- rule:4399 -->
- Propagate `encoding` explicitly when rebuilding `QueryDict` in `django/http/request.py` — pass `encoding=val` to `QueryDict(mutable=True, encoding=val)` and forward it into `parse_qsl`/`limited_parse_qsl` for the bytes branch — never fall back to `settings.DEFAULT_CHARSET` or alter the string-parsing branch. Otherwise `HttpRequest.encoding` changes (e.g. replacing `_post`) silently lose the override and mis-decode request bodies. — The `HttpRequest.encoding` override and `_post` rebuild exist precisely to re-decode with a caller-specified charset; relying on `settings.DEFAULT_CHARSET` or the string branch discards that override, producing wrong decodings when apps set a non-default encoding.
<!-- rule:2912 -->
- Round or reject `q` values in `django/http/request.py` beyond 3 decimals (`0.0004`, `0.0_4`) — RFC 9110 caps quality-value precision, so a plain `0 <= q <= 1` range check lets malformed values be cached and returned. — RFC 9110 limits quality-value precision to three decimal places. A bare `0 <= q <= 1` float range check accepts spec-invalid inputs like `0.0004` or `0.0_4`, which then propagate into cached/returned parsing results in `django/http/request.py`. Either validate and reject those values or normalize by rounding to three decimals before caching or returning.
<!-- rule:3882 -->
- For `MediaType` in `django/http/request.py`, keep `params` as the full parsed mapping including `q` and expose non-`q` media-type parameters via `type_params` — existing callers rely on `params` containing the full mapping; splitting `type_params` out lets consumers get media-type-only params without breaking backward compatibility

### `django/http/response.py`

<!-- rule:3080 -->
- Mirror `HttpResponse.__repr__` in every response class in `django/http/response.py` — use `self.__class__.__qualname__`, `status_code`, and `self._content_type_for_repr` so subclass reprs stay consistent instead of drifting. — Consistent reprs across the HTTP response hierarchy; shared fragments on `HttpResponseBase` prevent per-subclass duplication from diverging.
  - Hoist any `__repr__` fragment shared by multiple response classes into a private helper/property on `HttpResponseBase` — keeps conditional formatting in one place rather than duplicated per subclass.
<!-- rule:5567 -->
- Keep `ResponseHeaders` (`django/http/response.py`) non-dict semantics intact — `__delitem__` on a missing key must be a no-op, not a `KeyError` (e.g. `del response.headers['not-there']` succeeds). — The `ResponseHeaders` class intentionally diverges from `dict` behavior; middleware and existing callers rely on the documented no-op `__delitem__`, and without regression tests a refactor can quietly reintroduce `KeyError`.
  - Cover these documented edge cases with regression tests — middleware and callers are written against the documented `HttpResponse.headers` interface, so breaking it silently breaks them.
<!-- rule:5184 -->
- Close each resource at most once in `close()` loops over `_closable_objects` — wrapper-synthesized `close()` methods otherwise double-close the underlying file and raise `ValueError` on already-closed streams. — `FileResponse.close()` walks `_closable_objects` and calls `close()` on each; when a wrapped stream's `close()` is registered alongside the wrapper's own cleanup, the underlying file gets closed twice, which raises and masks the original error. Centralizing on `_wrap_file_to_stream_close()` keeps the closed-state check in a single helper instead of scattering monkey-patched flags across the class.
  - In `FileResponse`, add a file-like object to `_closable_objects` only if it defined `close()` *before* `_wrap_file_to_stream_close()` — the wrapper's synthesized `close()` isn't owned by that object, so registering it duplicates cleanup.
  - Route streaming-file cleanup through `_wrap_file_to_stream_close()` rather than adding separate stateful close monkey-patching — keeps close tracking in one place and avoids divergent closed-state bookkeeping.

<!-- /braindump -->