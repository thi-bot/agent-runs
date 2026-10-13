<!-- braindump: rules extracted from PR review patterns -->

# django/core/cache/backends/ Guidelines

## API Design

<!-- rule:5643 -->
- Normalize cache success/failure to `bool` once, in the lowest client method that calls the backend (e.g., `RedisCacheClient` methods wrapping Redis commands) — wrappers like `RedisCache` and `BaseMemcachedCache` must return the client's result as-is. Re-wrapping in `bool()` duplicates the contract and lets the two layers drift, so one layer silently stops guaranteeing a strict `bool` after a refactor. — Placing the `bool` normalization in a single layer (the client) makes the boolean guarantee explicit and testable, and prevents the higher-level wrappers from diverging if the client's behavior changes.
<!-- rule:5627 -->
- Normalize timeouts at the backend boundary in `get_backend_timeout()`: resolve `DEFAULT_TIMEOUT` to `self.default_timeout`, return `None` for persistent keys, and clamp non-positive values with `max(0, int(timeout))` — storage backends mishandle or reject negative TTLs, so a single normalized contract (`None` / `0` / positive `int`) keeps every backend in `django/core/cache/backends/*.py` behaving consistently. — Timeout semantics differ per backend: Redis `EX` with a non-positive TTL silently leaves the key alive, and other storages may raise on negative values. Normalizing in `get_backend_timeout()` (returning `None`, `0`, or a positive `int`) gives every backend a well-defined input and makes immediate expiry/deletion reproducible across `django/core/cache/backends/*.py`.
  - In `redis.py`, never pass non-positive timeouts to `SET ... EX`; use `EXPIRE`/`PX` (e.g. `px=1`) instead — `EX` with non-positive values leaves keys undeleted rather than expiring them immediately.
<!-- rule:5288 -->
- Use the client's atomic delete primitive in cache backend `delete` methods — for python-memcached, `_deletetouch(expected=[b'DELETED'], ...)` in `MemcachedCache.delete` instead of `self._cache.get()` followed by `delete()` — a separate existence check adds a TOCTOU race and an extra round-trip — Cache backends should return the client's atomic delete result directly; pre-checking with `get()` in `django/core/cache/backends/memcached.py` introduces a race window and doubles round-trips.

## Error Handling

<!-- rule:5808 -->
- In replica-routing cache backends (e.g. `django/core/cache/backends/redis.py`), route mutating ops (`set`, `set_many`, `add`, `touch`, `delete`, `clear`) through `get_client(write=True)`; leave reads (`get`, `get_many`) on the default read connection — writes sent to a replica are silently dropped or invisible on the primary, while reads on replicas spread load. — Writes sent to a replica are silently dropped or invisible on the primary; reads on replicas spread load.
<!-- rule:4077 -->
- Raise `NotImplementedError` for backend ops needing atomicity (`add`, `incr`, `decr`, `touch`) in `base.py` — a non-atomic read-modify-write fallback breaks the concurrency contract callers rely on — Splitting base and override into separate bullets keeps each under ~100 chars while preserving both file references (`base.py`, `filebased.py`). The rationale names the concrete failure — silent races from read-modify-write fallbacks, and API divergence between backends that users swap via settings — rather than appealing to a convention.
  - When overriding those methods in `filebased.py` and other `django/core/cache/backends/` subclasses, match the base backend's atomicity guarantee — callers pick a backend by name and expect identical race-free behavior

## File-Specific Rules

### `django/core/cache/backends/db.py`

<!-- rule:4842 -->
- In `backends/db.py` bulk ops, pick the key structure per method: `delete_many` collects made keys only, `get_many` builds the `made_key -> original_key` map — mapping is wasted work when results never map back to originals, so don't copy `get_many`'s pattern into other bulk methods. — Build `made_key -> original_key` mappings only for operations that recover original keys (`get_many`); `delete_many` needs just the made-key list. Copying `get_many`'s mapping pattern adds unused bookkeeping and obscures what each bulk method actually requires.

### `django/core/cache/backends/redis.py`

<!-- rule:2417 -->
- Verify Redis keys with a Lua script or `WATCH`/`MULTI`/`EXEC` before mutating — a pipelined `exists()` + `incr()` runs unconditionally and `incr` creates the key, forcing racy cleanup — Redis pipelines don't short-circuit: both `exists()` and `incr()` execute, and `incr` auto-creates the key, so a plain pipeline can't express "only increment if it already exists" and leaves you deleting a key you just created. Atomic conditional mechanisms keep the check and mutation a single server-side operation in the cache backend.
<!-- rule:5810 -->
- In `RedisCacheClient`, use `flushdb()` in `clear()` and forward a `db` param (default `0`) via `_client_kwargs` — Scope `RedisCacheClient` to one logical database — `flushall()` wipes every db on the Redis instance, and a hardcoded db breaks multi-tenant or per-environment setups that need an isolated cache.
<!-- rule:2416 -->
- Batch multi-command Redis ops (e.g. `mset` + per-key `expire`) with `.pipeline()` in `django/core/cache/backends/redis.py` — one round-trip instead of one per key — In the Redis cache backend, a single logical operation like `set_many` may map to multiple Redis commands (`mset` plus `expire` per key). Issuing them individually multiplies network round-trips proportionally to the number of keys, which dominates latency in the caching hot path. Pipelines send them as one request.

<!-- /braindump -->