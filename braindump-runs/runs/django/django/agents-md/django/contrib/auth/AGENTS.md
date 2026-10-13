<!-- braindump: rules extracted from PR review patterns -->

# django/contrib/auth/ Guidelines

## API Design

<!-- rule:4468 -->
- Use `auth.login()`/`auth.alogin()` to set `request.user` after authentication — manual assignment skips session rotation and signal firing — `auth.login()` also cycles the session key (prevents session fixation), records the backend, and fires `user_logged_in`; direct assignment leaves stale caches and audit gaps.
<!-- rule:1893 -->
- Mirror `AccessMixin` in `LoginRequiredMiddleware`: delegate denial to `handle_no_permission`, resolve `login_url`/`redirect_field_name` from the view before settings/middleware defaults, share async+sync logic via a helper, and skip extra runtime checks — keeps middleware behavior identical to the mixins/decorators users already rely on. — Middleware and mixins/decorators must behave the same or users get inconsistent auth behavior depending on which abstraction they hit.
<!-- rule:2241 -->
- In auth backends (`django/contrib/auth/backends.py`, related auth logic), read optional user attributes (e.g., `is_active`) defensively via `getattr`, treating missing as permissive — custom user models may omit them; document and test this behavior. — Django supports swapped-in custom user models that don't define `is_active` or similar fields, so any direct attribute access in auth backends will raise `AttributeError` and lock those users out.

## Error Handling

<!-- rule:3822 -->
- Match `Permission`/`ContentType` rows by exact `app_label` + model name (or lowercased exact), never `icontains`/`endswith` — substring matching in `django/contrib/auth/management/__init__.py` silently rewrites rows for similarly-named models — A model rename migration that selects rows by text patterns like `icontains` or `endswith` catches other models whose code/name happens to contain the renamed model's name, corrupting their permission and content-type rows. Filtering on the exact `app_label` plus the exact (or lowercased-exact) model name keeps the update scoped to the intended model.
<!-- rule:4460 -->
- Centralize timing-attack mitigation in the password-verification path: run the dummy hasher only when the user lookup returns `None`, and for existing users let `check_password()` do the hashing — double-hashing wastes work, and skipping the hash on state (e.g. `user_can_authenticate()`) lets the response time leak whether an account exists. — Authentication backends in `django/contrib/auth` must keep constant-time behavior whether or not the user exists. Forcing mitigation through the password-check path ensures no code path (ordering, boolean short-circuits, inactive-user branches) can skip hashing for existing users and reveal account existence via timing.

## General

<!-- rule:1896 -->
- In `django/contrib/auth/mixins.py` and `tests/auth_tests/test_mixins.py`, keep class and test docstrings to one behavior-focused sentence naming the mixin (e.g. `AccessRequiredMixin`), not the decorator it wraps. — Without this, docstrings that name the wrapped decorator or span multiple sentences misdescribe the mixin’s public behavior and break the existing one-sentence docstring convention in these files.
    The mixin is the public API users compose with, so decorator-centric or multi-sentence wording misdescribes what the class does and drifts from the existing single-line pattern — e.g. "View works on an async view wrapped in `AccessRequiredMixin`."

## File-Specific Rules

### `django/contrib/auth/backends.py`

<!-- rule:1438 -->
- In `ModelBackend.with_perm`, make `is_active` tri-state (`True`/`False`/`None`) — `None` disables the active-user filter, so a plain truthy check would wrongly exclude inactive users callers meant to include. — These are `django/contrib/auth/backends.py`-specific rules about the tri-state semantics of the `is_active` parameter and the meaning of `include_superusers`; placing them at the file level keeps them discoverable where the backend implementation is inspected.
  - Keep `include_superusers` orthogonal to the permission filter: `include_superusers=False` must still apply the core permission check — it only toggles superuser inclusion, never bypasses the permission query.

### `django/contrib/auth/base_user.py`

<!-- rule:6112 -->
- Keep `get_session_auth_hash()` unchanged; add a separate generator method that yields a salted HMAC per `SECRET_KEY_FALLBACKS` secret, reusing the same key salt and algorithm as the primary hash. — Third-party subclasses in `django/contrib/auth/base_user.py` override `get_session_auth_hash()`, so altering its signature or return type silently breaks them; a separate generator lets callers try each rotated key in turn without touching the existing single-hash contract.

### `django/contrib/auth/hashers.py`

<!-- rule:5440 -->
- In `BasePasswordHasher` subclasses (`django/contrib/auth/hashers.py`): use `decode(encoded)` with snake_case keys (e.g. `'work_factor'`) for programmatic inspection like `must_update`; reserve `safe_summary(encoded)` for display output with translated labels (e.g. `_('work factor')`) — it may mask values and must list every cost parameter in the hash format (work factor, block size, parallelism). — `decode` keys are a stable API surface — logic like `must_update` would silently break if display strings or masked values shifted, while `safe_summary` intentionally redacts and localizes, so treating its values as machine-readable produces wrong update decisions and untranslatable output.
<!-- rule:5463 -->
- Make `BasePasswordHasher.decode()` the single algorithm-validation point; keep callers thin — Consolidating validation in `decode()` prevents divergence between `verify()`, `must_update()`, and `safe_summary()`, which each duplicate the same algorithm checks today. A default `decode()` that warns `RemovedInDjango41Warning` and returns `{}` lets third-party hashers degrade gracefully instead of crashing when they haven't implemented the new API — add `assertWarnsRegex` coverage in `tests/auth_tests/test_hashers.py` to lock in that behavior.
<!-- rule:5441 -->
- Coerce numeric hash params (`iterations`, `work_factor`, `salt_len`) to `int` in `decode()`/parse helpers in `django/contrib/auth/hashers.py` — callers like `verify()`/`must_update()` then read `decoded['iterations']` directly, never re-wrapping in `int(...)`. Returning raw string slices forces every caller to re-convert, and mixing converted/unconverted fields causes subtle type bugs across hashers. — If decode() returns raw string slices, every caller of verify()/must_update() would have to re-wrap them in int() itself, and any caller that forgets produces string-vs-int comparisons (e.g. iterations thresholds) that silently mis-evaluate or raise TypeError across hashers.
<!-- rule:5442 -->
- Split password hasher encoded strings with `encoded.split('$', N)` so the hash stays the final field, and name the trailing segment `rest` in every hasher method — a bounded split tolerates `$` inside the hash, and consistent `rest` naming keeps `encode`/`verify`/`must_update` in sync. — An unbounded `encoded.split('$')` would misparse any hash containing `$`, and inconsistent variable names across `encode`/`verify`/`must_update` make the field layout hard to trace in `django/contrib/auth/hashers.py`.

### `django/contrib/auth/tokens.py`

<!-- rule:5221 -->
- Normalize token state and build `_make_hash_value` inside the token generator (`django/contrib/auth/tokens.py`) — keeps token internals out of the user model and prevents drift between timestamp truncation and hashing — Token normalization (e.g., truncating timestamps with `datetime.now().replace(microsecond=0)`) and hash construction belong together in `django/contrib/auth/tokens.py`. Pushing either down to the user model (e.g., passing `timestamp` as a token-specific input) couples the model to token semantics and risks mismatched precision between what's hashed and what's validated — breaking token verification across calls.
<!-- rule:5219 -->
- Keep the `int()` cast in `_num_seconds()` (`django/contrib/auth/tokens.py`) even when upstream precision is normalized — `timedelta.total_seconds()` returns a `float` that raises `TypeError` in integer-only consumers like downstream token expires math. Drop it only if no caller needs an `int`. — Normalizing input precision (e.g. `datetime.now().replace(microsecond=0)`) does not make the helper's return type integral — `timedelta.total_seconds()` and similar arithmetic still yield `float`, so removing the cast silently breaks integer-only downstream code with `TypeError`.

<!-- /braindump -->