<!-- braindump: rules extracted from PR review patterns -->

# django/ Guidelines

## API Design

<!-- rule:1841 -->
- In `process_response`, set computed headers only if absent: `if name not in response: response[name] = <value>` — An unconditional assignment (or `response.setdefault(...)`) overwrites headers the view already set. Guarding on presence also keeps the value unconstructed until needed. Evaluate the guard against the final value — including explicit overrides such as `extra_headers` — so a check meant to drop an empty value doesn't also drop a caller-supplied one.
<!-- rule:5139 -->
- Prefer inheritance-aware dispatch in `CombinedExpression.dispatch` / `multipledispatch` registrations — register against the most general applicable type and let subclass matching cover subclasses. Redundant subclass-specific entries shadow broader handlers, and correct dispatch order is non-obvious to readers. — multipledispatch resolves by declared types, not intent — over-registering shadows broader handlers and under-registering drops subclass cases, both silently. These conventions keep dispatch predictable across the ORM expression layer and its contrib field integrations.
  Before adding a handler, check that no broader/wildcard/existing handler already covers that type combo — `multipledispatch` ambiguities fail silently or warn confusingly across `django/db/models/expressions.py`, `operators.py`, and `contrib/postgres/fields/array.py`.
  Add explicit handlers only to disambiguate intersecting subclass pairs (e.g. `(SubclassA, BaseB)` vs `(BaseA, SubclassB)`), symmetric special/generic or special/special cases, or when a subclass needs behavior distinct from its base.
  Guard semantically incompatible subclass combos with runtime checks — inheritance matching will otherwise route them to the wrong handler.
  Use an explicit catch-all like `Field` instead of `None` for wildcard rules — `None` obscures intent and interacts poorly with subclass resolution.
<!-- rule:3953 -->
- In `__get__` descriptors, handle `instance is None` (class access) explicitly — return `self` or raise `AttributeError` for instance-only descriptors; never `assert instance is not None`. — Class-level access passes `instance=None`, so asserting or dereferencing it crashes on `Model.field`-style lookups; the `(self, instance, cls=None)` signature and explicit branch keep descriptors working for both instance and class access.
<!-- rule:4834 -->
- Match the collection shape to what the DB API consumes in `django/db` query/expression construction — use a plain `list`/`set` when the paired side is unused, keep key-value pairs as `tuple`s — avoids passing unused values into queries and preserves the structural intent of params. — Django's DB query and expression APIs consume specific collection shapes; flattening key-value pairs or passing unused sides forces the caller to reconstruct structure and can leak extraneous values into the generated SQL/expressions.
<!-- rule:2186 -->
- Subclass `GeomOutputGeoFunc` (not `GeoFunc`) for any function returning geometry in `django/contrib/gis/db/models/functions.py` — `GeoFunc` mishandles the output's geometry type. — Django's GIS layer expects geometry operands to stay first-class: `GeomOutputGeoFunc` preserves the returned geometry type, direct geometry passing keeps SRID/dimensionality intact through the DB, and avoiding needless clones/fixes keeps values round-tripping identically between read and write. Tests in `tests/gis_tests/geoapp/test_functions.py` lock these behaviors in.
  - Pass existing geometries straight into expression functions like `Distance`/`Area`; don't rewrap them in `Point(...)` — rewrapping loses SRID/type info and breaks identity.
  - Skip unconditional `.clone()` or backend-specific geometry fixups (e.g. in `django/contrib/gis/db/backends/oracle/adapter.py`) — they break read-write symmetry and cost extra round-trips.
<!-- rule:2216 -->
- In middleware request hooks (e.g. `process_view` in `django/middleware/csrf.py`), short-circuit on cheap state checks like `csrf_processing_done` before any token/cookie/session lookup — repeated lookups waste work and can re-trigger side effects. — Request hooks run on every request; an already-processed flag lets them bail out before touching session or token storage.
<!-- rule:5916 -->
- Hand-code lazy handling in hot `keep_lazy` utilities (`django/utils/functional.py`, `django.utils.html.escape()`): check args for `Promise`, delegate to a module-level `lazy(func, result_class)` only when lazy, keeping the common non-lazy path unwrapped — avoids the generic dispatcher's per-call overhead. — The `keep_lazy` decorator wraps every call, adding dispatch cost to functions like `escape()` that are called in tight loops with non-lazy inputs. Checking for `Promise` inline keeps the dominant non-lazy path free of wrapper overhead.
  - Benchmark before adding a more elaborate fast path: cover first-arg/later-arg and positional/keyword promise cases — a simpler middle-ground that's fast enough is preferred over complexity.
<!-- rule:2988 -->
- Keep `name`/`filename` args and the wrapped file's `.name` attribute as parallel name sources. — `File` subclasses in `django/core/files/` must forward `name` to `File.__init__`, and docs must mention both sources where both are accepted — derived names then work whether a caller passes a path or a pre-opened file, avoiding surprising `None` names.
<!-- rule:4245 -->
- Treat URL resolvers as pluggable — use `getattr(obj, 'url_patterns', [])` and validate `resolve`, not `check`/`reverse` — Custom resolvers in `django/urls/resolvers.py` may omit `urlconf_name`, `check`, or `reverse`; relying on them breaks traversal in third-party implementations, while `url_patterns` and `resolve` are the interface contract.
<!-- rule:5094 -->
- Name helper parameters `subscript` (not `slice_obj`) — covers both indexing and slicing — A `slice_obj` name implies slicing-only and misleads callers who pass integer indices; `subscript` is accurate for both.
<!-- rule:2918 -->
- Delegate `provider` and its `OPTIONS` resolution to the connection helper; forward explicit credentials through as `username`/`password` — callers that resolve the provider themselves silently drop per-call credential overrides in favor of provider defaults — The connection helper in `django/core/mail/__init__.py` owns provider-aware `OPTIONS` merging, so it is the only place that can consistently let explicit `auth_user`/`auth_password` win over provider-supplied defaults. Callers that re-resolve the provider or pass credentials under different key names lose that precedence and produce inconsistent auth behavior between the helper and its callers.
<!-- rule:6245 -->
- Centralize URL pattern description composition for includes, views, and constraints instead of manipulating regex strings per constraint; when composing, concatenate the component regexes in order and keep only the first leading `^` anchor, matching `BaseResolver.describe()`. — Prevents divergent anchor handling — each constraint stripping/adding `^` independently produces inconsistent descriptions that don't match `BaseResolver.describe()`. Concatenating component regexes in order and keeping only the first `^` yields one canonical composition path.
<!-- rule:5437 -->
- Call `ContentType.objects.clear_cache()` right after `router.allow_migrate_model(db, ContentType)` in contenttypes management commands that read or write `ContentType` rows — otherwise stale cached instances from earlier in the process leak into lookups and deletions — `ContentType` instances are cached per-database by `ContentTypeManager`. Management commands like `remove_stale_contenttypes.py` query and delete rows outside the migration path that normally invalidates that cache, so without an explicit `clear_cache()` the command can act on ContentType objects that no longer match the database — deleting the wrong rows or reporting stale `app_label`/`model` pairs.
<!-- rule:6260 -->
- Pass `c_void_p`, not `int`, to `GDALBase` subclasses; raise `null_ptr_exception_class` on NULL — raw C ints break ctypes, and invalid pointers crash native calls — Passing raw ints instead of c_void_p makes ctypes pass the wrong argument type to native GDAL calls, and failing to raise null_ptr_exception_class on NULL lets invalid pointers reach native code, both causing crashes or corruption.
<!-- rule:6111 -->
- Match spatial lookup operators to the PostGIS type variant's supported SQL; if unsupported, substitute an equivalent and audit sibling lookups in `operations.py` — prevents broken queries on that variant. — PostGIS type variants (e.g. `geometry` vs `geography`, curved vs linear) expose different SQL operator sets; using an operator a variant lacks fails at query time, and the same mistake often recurs in sibling lookups.
<!-- rule:3776 -->
- Build a new iterable/async CM for transformed chunks instead of wrapping the source stream (e.g. `response.streaming_acmgr_content` in `django/middleware/gzip.py`) — reusing the original iterator mutates shared streaming state, producing corrupted output for any other consumer of that response — Because a streaming response body’s iterator is shared and single-pass, wrapping and consuming the original stream advances or mutates that shared state, so any other middleware, wrapper, or server consumer later reading the same response receives missing or duplicated chunks and corrupted output, while building a fresh iterable/async context manager keeps the source stream intact for all consumers.
<!-- rule:3228 -->
- Give each timestamp on task/result dataclasses a distinct, documented lifecycle meaning (e.g. `TaskResult.started_at` = first attempt start, `last_attempted_at` = latest attempt start) — overlapping semantics make it impossible to reason about retries and scheduling from the result alone — Timestamp fields live in `django/tasks/base.py` and the task-result dataclasses, but they're populated by backends; without a shared contract about what each field means and when it's set, callers can't distinguish retries, and immediate backends silently produce inconsistent timestamps for the same event.
  - Drop or redefine any timestamp field that is always `None` or always duplicates another field — stale fields mislead callers and drift out of sync with the actual lifecycle
  - In synchronous/immediate backends (e.g. `django/tasks/backends/immediate.py`), capture `timezone.now()` once and assign it to every field that represents the same instant — separate calls produce sub-millisecond skew that breaks equality checks and log correlation

## Error Handling

<!-- rule:4250 -->
- Raise `BadRequest`/`ValueError` on malformed, conflicting, or bad caller-supplied headers/options — identify the offending `header`/field, explain the rejection, and state the correct API/argument. Silent drops hide caller bugs and protocol/security violations. — Loud failures at the parsing boundary surface misconfigurations immediately and prevent security-relevant silent fallbacks. Keep shared helpers context-agnostic; add header-specific context (e.g. in `django/core/handlers/wsgi.py`, `django/utils/http.py`, `django/core/mail/message.py`) at the calling layer so the same helper stays reusable.
<!-- rule:2440 -->
- Validate missing file names at the boundary that requires them (`Storage.save`, `FileField.pre_save`), not inside individual `File` subclasses — one guard covers every backend and subclass instead of duplicating checks per implementation — `File.name` is `""` by default, so check falsiness (catches both `None` and `""`) rather than `name is None`, and raise an error that tells the caller how to fix it (e.g. `ContentFile` must be passed a `name`). Placing the check at `Storage.save` / `FileField.pre_save` keeps validation consistent across all `File`/`Storage` combinations and avoids silent bad writes from subclasses that forget their own check.
<!-- rule:1739 -->
- Apply `not field.null` to both `create` and `remove` spatial indexes in `mysql` and `oracle` `schema.py` — unpaired predicates strand indexes and break migrations — MySQL and Oracle can't index nullable columns. If the guard is applied when creating but not removing (or vice versa), the backend can create a spatial index it never manages to drop — leaving schema drift and failing migrations on fields that flip nullability.
<!-- rule:2152 -->
- Enumerate template-tag libraries from all sources — auto-discovered `<app>/templatetags`, `django.templatetags`, and each engine's `OPTIONS['libraries']` — in `django/core/checks/templates.py`, but scope collision detection to a single backend's `libraries` option. Missing sources hides real duplicate-name bugs; broader scoping would falsely flag names legitimately reused across backends. — Template-tag duplicate-name checks that omit custom libraries configured in a template engine's `OPTIONS['libraries']` (or auto-discovered app `templatetags` or `django.templatetags`) can let colliding tag libraries load silently and break template rendering, while checks that compare names across multiple backends produce false collisions for a name reused in separate backends. G11 (PR#14735) covers all configured sources, and G6 (PR#17981) scopes collision detection to a single backend's `libraries` option so cross-backend reuse is not flagged.
<!-- rule:4373 -->
- Route `fail_silently` to the mail component that owns failure handling — helpers pass it to `message.send(fail_silently=fail_silently)`, and backends that handle it themselves accept it directly rather than forwarding to `BaseEmailBackend`. Each layer has distinct failure semantics, so misrouting swallows or double-handles exceptions. — In `django.core.mail`, `fail_silently` means different things at different layers: `django/core/mail/__init__.py` helpers (`send_mail`, `mail_admins`, etc.) must hand it to `message.send(...)` so the actual send path honors it, while backends in `backends/base.py`, `smtp.py`, `filebased.py`, and `console.py` that already implement their own failure handling must consume it directly instead of passing it down to `BaseEmailBackend`. Forwarding it to the wrong layer causes exceptions to be silently swallowed or raised twice, breaking the caller's expectation of what `fail_silently=True` suppresses.
<!-- rule:6250 -->
- Wrap middleware dispatch in `MiddlewareMixin.__call__` and call `process_exception` when defined — inline `try`/`except` skips every registered exception hook and silently changes response behavior — Django's request/middleware pipeline defines one contract for turning exceptions into responses: `MiddlewareMixin.__call__` invokes `process_exception`, and `inner_exception_handler` in `django/core/handlers/base.py` records the exception, fires signals, and converts it to a response. Hand-rolled `try`/`except` blocks inside handlers diverge from that path — `process_exception` hooks never fire, `got_request_exception` signals go missing, and error responses differ depending on which code path caught the error. Keeping both entry points routed through the framework mechanisms means middleware authors and error-reporting integrations see every exception exactly once, with the same response semantics.
  - Use `inner_exception_handler` (`django/core/handlers/base.py`) instead of ad-hoc `try`/`except` in the request pipeline — it keeps exception logging, signals, and response conversion identical across handlers
<!-- rule:3167 -->
- Distinguish "record missing" from "record found but out of scope" in ID-based retrieval — raise a not-found error only when absent, and a dedicated data-integrity error when the record exists but belongs to a different owner/task/type; in `django.tasks`, `Task.get_result()` must raise a data-integrity error when the result doesn't belong to the current task, reserving `ResultDoesNotExist` for truly missing results — this preserves backward-compatible not-found semantics while surfacing cross-scope access bugs that a reused not-found error would silently mask. — Callers rely on `ResultDoesNotExist` to mean the result is genuinely absent; collapsing scope mismatches into the same class hides ownership bugs and breaks callers that branch on not-found.
<!-- rule:5271 -->
- ... — The rule text and rejected rationale were both sent as empty placeholders ("..."), so there is nothing to base a replacement rationale on — please send the actual rule text and the rejected rationale.
<!-- rule:5573 -->
- Warn only with remedies that actually silence the check — advertising a fix that leaves the warning firing sends users into useless edits. — In `django/core/checks/compatibility/`, warnings are surfaced with a suggested remedy (e.g. an upgrade or settings change). If the remedy can't actually suppress the warning, users follow it and the warning persists, eroding trust in the check. When the correct fix varies by model (per-model state), a single global warning can only advertise one remedy, which will be wrong for some models — emitting the check per-model lets each warning carry a remedy that actually silences it.
  - Emit checks per-model when the remedy depends on per-model state — a single global warning in `django/core/checks/compatibility/` can't hint at a fix that works for every model.
<!-- rule:1790 -->
- Pair every `request_started` with `request_finished` on all exit paths, including client disconnects and `CancelledError` — unbalanced signals in `django/core/handlers/asgi.py` skip connection cleanup and leak resources — If an exit path such as a client disconnect or `CancelledError` bypasses `request_finished`, the ASGI handler in `django/core/handlers/asgi.py` never runs its connection cleanup, so sockets and associated resources leak for the lifetime of the process.
<!-- rule:5739 -->
- Reject malformed input in `django/middleware` security code — fail closed, never open — When parsing untrusted input (e.g. CSRF origin verification in `django/middleware/csrf.py`), accepting unparseable values or letting the parse exception propagate either admits a forged request or turns a clean denial into an unhandled 500.
<!-- rule:3182 -->
- task arguments and results and exception serialization — This governs the serialization contract for `django/tasks` — args/results must be JSON-safe, exceptions are diagnostic-only. These are behavioral conventions, not structural constraints, so they belong in module-level AGENTS.md rather than a rule referencing specific files.
<!-- rule:3812 -->
- Preserve input line fidelity in text utilities (`django/utils/text.py`, `django/core/management/commands/makemessages.py`): keep empty/whitespace-only lines in output, and apply normalization fixups (e.g., trailing-EOL restoration after `splitlines()`) only to lines the function generated internally — never to caller-supplied pre-split input. Dropping blank lines silently changes file content, and mutating caller data breaks round-trip guarantees. — Blank lines are meaningful in source files (seen by `makemessages`); dropping them changes the file. Normalization fixups exist only to repair `splitlines()` output the function created — applying them to caller lines mutates input the caller owns and breaks round-trip fidelity.
<!-- rule:3976 -->
- Validate numeric template tag args (e.g. `count`) against `(decimal.Decimal, float, int)`, not `int` alone — templates often pass `3.0`/`Decimal`, so an `int`-only check rejects valid input; phrase the error as "must be a number" to match the accepted types — Templates commonly supply float or Decimal literals; an int-only check would reject valid numeric arguments and produce a misleading "must be an integer" error that doesn't match the accepted types.

## Code Style

<!-- rule:1919 -->
- Keep `django/conf/locale/{locale}/__init__.py` present and exactly zero bytes — no blank lines, no comments. — The `__init__.py` marks each locale directory as an importable package `django.conf.locale.<locale>` (used by `django.utils.translation` when loading catalog modules), so it must exist; it must stay empty because any content would execute on import and could break locale discovery/packaging checks.
<!-- rule:3705 -->
- Keep `_get_field_value_map()` as the single source of truth for field/expression maps — do shared normalization (e.g. the `pk` alias) inside it, and have downstream constraint/validation paths (e.g. `django/contrib/postgres/constraints.py`) reuse the already-computed `replacement_map` rather than re-deriving it via `_get_field_expression_map(meta=..., exclude=...)` — Recomputing the map in downstream paths (like constraint validation) drifts from the canonical normalization applied in `_get_field_value_map()`, so `pk` aliases and exclusions silently disagree between call sites and produce inconsistent field resolution across `django/db/models/constraints.py` and `django/contrib/postgres/constraints.py`.
<!-- rule:1376 -->
- Read bounded streams with a single `read(size)` per loop, `size` defaulting to the `-1` EOF sentinel — skip incremental/chunked search loops — the input is already capped by a small `max_*` constant, so the extra loop machinery only adds complexity without benefit. Applies across `django/` stream readers like `django/http/multipartparser.py` and `django/core/files/images.py`. — Ad-hoc incremental chunked search loops over an already bounded stream can silently scan past the small `max_*` cap or miss patterns that straddle chunk boundaries, producing wrong parses of multipart uploads and images, whereas a single `read(size)` with the `-1` EOF sentinel reads each bounded stream in one deterministic pass that matches the cap already enforced by the caller.
<!-- rule:3947 -->
- In `ManifestFilesMixin.save_manifest`, serialize with `json.dumps(payload, sort_keys=True, indent=4).encode()` — deterministic, indented output keeps manifest diffs stable and readable. — Keys must be sorted and output indented so generated JSON manifests produce stable, reviewable diffs; but when the underlying collection is pre-sorted upstream, adding `sort_keys=True` double-sorts and hides that intent.
  - Skip `sort_keys=True` when the payload is already sorted upstream — re-sorting obscures the collection's intended order and adds needless work.
<!-- rule:2029 -->
- Inspect `inspect.signature(func).parameters` in a single pass with early exit once the needed facts are known (second param present, `*args`/`**kwargs` present) — decorators in `django/utils/functional.py` run per-call, so multi-pass scans and derived collections waste cycles on the hot path — These decorator/lazy-utility helpers in `django/utils/functional.py` are invoked on every wrapped call, so redundant iteration over `inspect.signature(...)` parameters multiplies cost across the whole `django/utils/` stack (e.g. `django.utils.html.escape()`). A single pass with early exit and skipping the keyword-arg scan when none are accepted preserves the same dispatch decision with far less per-call work.
  - Skip scanning `kwargs.values()` when the wrapped signature accepts no keyword arguments — the mapping is empty and the scan is pure overhead in `django/utils/` utilities
<!-- rule:3862 -->
- Update all `_deferred_filter`/`_defer_next_filter` consumers when changing the state, including related managers in `django/contrib/contenttypes/fields.py` — stale copies silently diverge from queryset filtering — Deferred-filtering state in the ORM (`django/db/models/query.py`) is duplicated across related-manager implementations. If a change to the representation doesn't propagate, filtering behavior diverges between the queryset and its related managers, producing silent correctness bugs.
  - Add tests exercising deferred/sticky filtering whenever that state is retained rather than removed — untested related-manager paths regress silently
<!-- rule:5952 -->
- Keep one source of truth for the Django GIS OpenLayers widget instead of duplicating logic across files: — The OpenLayers widget spans `django/contrib/gis/templates/gis/openlayers.html`, `templates/gis/admin/openlayers.html`, and the JS in `static/gis/js/`. Parallel templates/classes/exports drift independently, producing divergent rendering between the admin and public maps and duplicated sizing rules that conflict with the OpenLayers `<canvas>`.
    - Mirror changes between `templates/gis/openlayers.html` and `templates/gis/admin/openlayers.html` (both ways) — they render the same widget, so drift breaks admin vs. frontend consistency.
    - Don't restate `data-width`/`data-height`/inline sizing styles on the map container `div` — the rendered OpenLayers `<canvas>` already owns those dimensions, so duplicates fight the canvas for layout.
    - Merge duplicate widget classes/exports (e.g. fold `MapWidget` into `OLMapWidget`, drop `window.MapWidget`) instead of keeping parallel entry points that subtly diverge.
<!-- rule:5951 -->
- In `gis/openlayers.html` templates, use `href=""` with JS click handlers instead of `javascript:` URLs — `javascript:` links are blocked by CSP and modern browsers — `javascript:` hrefs count as inline script, so they fail under a Content-Security-Policy and are increasingly dropped by browsers, silently breaking the map controls in `django/contrib/gis/templates/gis/openlayers.html` and `admin/openlayers.html`.
<!-- rule:397 -->
- Key silenced-check state by arbitrary objects in `defaultdict(WeakValueDictionary)`, not `WeakKeyDictionary` — A `WeakKeyDictionary` needs hashable keys and holds the *key* weakly while keeping values alive; silencing a temporary object (e.g. a test model or field) would therefore pin that object in memory, and non-hashable/mutable-hash keys would raise. A weak-value container lets the tracked object die naturally and tolerates any key type — important in `django/core/checks/` where checks are silenced for arbitrary models, fields, and other user-defined objects.

## Config

<!-- rule:5279 -->
- Set `FIRST_DAY_OF_WEEK` from the locale's national/calendar reference (`0`=Sun, `1`=Mon) — copying a neighboring locale misaligns week-based UI — A wrong `FIRST_DAY_OF_WEEK` in `django/conf/locale/*/formats.py` shifts every week grid and date picker for that locale, so it must be verified against the region's own calendar source rather than assumed from a similar locale.
<!-- rule:476 -->
- In `AppConfig.ready()` loops over `connections.all()`, nest backend setup under `conn.vendor == '<vendor>'` — metadata config (e.g., `introspection.data_types_reverse`) applied inside `if conn.connection is not None` guards silently skips unopened connections, so all matching backends must be configured before any connect. — Contrib backends are configured per-connection in `AppConfig.ready()` over `connections.all()`. `conn.connection` is `None` until a connection is actually opened, so gating metadata setup (like `introspection.data_types_reverse`) on it leaves later-opened connections unconfigured. Vendor guards keep backend-specific setup from leaking into other backends' connections.
<!-- rule:5681 -->
- In `check_cache_and_media_root`, treat any nesting between the file-based cache `LOCATION` and `MEDIA_ROOT`/`STATIC_ROOT` as `security.W024` — test both directions — A one-directional check misses half the hazard: cache under `MEDIA_ROOT`/`STATIC_ROOT` exposes cached data to public serving, and `MEDIA_ROOT`/`STATIC_ROOT` under the cache path lets cache eviction/corruption clobber real media files.
<!-- rule:4522 -->
- In `django/urls/resolvers.py` and `django/urls/base.py`, apply supported-language fallback to language codes (from URL path or `settings.LANGUAGE_CODE`) before choosing a localized route or falling back to the original URL — otherwise variants like `de-at` miss `de` routes and miscompare against the default language. — URL/language resolution must normalize language codes to their supported form first; otherwise locale variants such as `de-at` fail to match `de` routes and comparisons against `settings.LANGUAGE_CODE` give the wrong route decision.
<!-- rule:6228 -->
- Make external map service URLs configurable via widget options and use protocol-relative URLs (e.g., `//maps.opengeo.org/...`) in `OL3MapWidget.js` instead of hardcoding `http://` or `https://` — hardcoded schemes force mixed-content warnings on HTTPS sites and prevent swapping providers per deployment. — HTTPS pages block `http://` map tiles, and hardcoded hosts can't be overridden by downstream projects. Protocol-relative URLs follow the page's scheme; exposing the URL as a widget option lets deployments point at their own tile servers without patching `OL3MapWidget.js`.
<!-- rule:2928 -->
- Resolve provider/backend config only in `mail.get_connection()` — it's the sole reader of `settings.EMAIL_PROVIDERS` and owner of `OPTIONS` resolution; mail helpers delegate via `get_connection(provider=...)`, and `EmailBackend` implementations must not re-read `settings.EMAIL_PROVIDERS` or reimplement provider lookup — duplicate resolution lets backends drift and silently breaks provider selection (don't add lookup just to make a test pass). — `get_connection()` is the single source of truth for provider/backend resolution in `django.core.mail`. If helpers or `EmailBackend`s re-read `settings.EMAIL_PROVIDERS` or reimplement lookup, the resolution logic forks, backends quietly diverge from `OPTIONS` handling, and provider selection can break without any test catching it (especially when tests patch around the real config path).
<!-- rule:5059 -->
- In `prepare_database` methods across GIS backends (e.g. `postgis/base.py`), auto-create only core extensions; gate feature-specific ones behind a setting or explicit `CreateExtension` operation rather than unconditional `CREATE EXTENSION`. — Unconditional `CREATE EXTENSION` breaks setups where the DB user lacks superuser rights or the extension isn't installed, and forces optional dependencies on every project — opt-in keeps core setups working everywhere.
<!-- rule:5662 -->
- Gate i18n-dependent code (locale path scanning, filesystem watchers, translation resource loading) behind `if settings.USE_I18N` — prevents wasted work and side effects when internationalization is disabled. — Django's translation utilities and i18n signal receivers can perform work — scanning locale paths, registering filesystem watchers, loading translation resources — that has no purpose when `settings.USE_I18N` is `False`. In projects that disable i18n (a common optimization for English-only deployments), skipping this guard means unnecessary filesystem scans, watcher registrations, and resource loads at startup or signal dispatch time. Since `django/utils/translation/` code runs during app initialization and via signal receivers, the cost is paid on every request/startup even though no translations exist. Checking `settings.USE_I18N` keeps the disabled path a no-op and matches Django's existing convention of short-circuiting i18n behavior at the settings level.

## Testing

<!-- rule:2231 -->
- Test new backends under `django/core/files/storage/` and any overridden storage methods in `tests/file_storage/`, reusing the shared storage test mixins and exercising the public storage API. — Custom branches (e.g., `get_available_name` with `allow_overwrite`) can silently bypass default path-traversal and dangerous-filename handling inherited from the base backend — tests must cover both the custom branch and the fallback behavior so security-sensitive regressions surface in CI.
<!-- rule:5901 -->
- Test `filtered_relation` changes in `PathInfo` against `GenericRelation` + multi-table inheritance, not just direct models — Fields defined on a parent and accessed from a child model take a different path-resolution branch, so direct-model tests silently miss breakage in the inherited path.

## Naming

<!-- rule:1130 -->
- Match `field.name` against declared-name sets (`exclude`, `unique_together`, index field names); use `field.attname`/`field.column` for attribute access and name-set membership across accessors — `ForeignKey` field `name` and `attname` differ (`author` vs `author_id`), so the wrong identifier kind silently misses or misresolves fields. — Using `field.name` for declared-name sets and `field.attname`/`field.column` for attribute access prevents ForeignKey fields from being silently skipped or misresolved because their `name` (`author`) differs from their `attname`/`column` (`author_id`).
<!-- rule:6130 -->
- Name check-message constructors `get_warning_for_<problem>` (or another `get_*` form), not `warn_<problem>` — callers in `django/core/checks/` need to see at the call site that the function returns a message object rather than emitting a warning itself — The `warn_` prefix implies a side effect (emitting a warning) when the function actually returns a `Warning`/`Error` instance to be collected. Misreading it leads to callers discarding the return value expecting the warning to have been raised, so the check silently produces no output. The `get_` prefix matches Python's convention for pure accessors and makes the data-returning contract obvious in `django/core/checks/`. Violations break the check framework's expectation that checks accumulate and return messages rather than emitting them.

## Documentation

<!-- rule:6239 -->
- Document accepted text formats for GIS geometry/expression methods with text params (e.g., `Distance`); if EWKT is supported, list only EWKT since it supersets WKT — undocumented formats become accidental public API and removing them later breaks users. If a format isn't meant as public API, remove or deprecate it instead of leaving it undocumented. — An undocumented format is still de facto public API — once users depend on it, removing it becomes a breaking change. Listing only EWKT (a WKT superset) avoids redundant docs and matches what users actually pass.
<!-- rule:3912 -->
- Document package-wide patterns (e.g. lazy-loading to defer a dependency load) in the `django/contrib/gis/gdal` package/module docstring, and have affected sites reference that explanation instead of vague inline comments — scattered comments drift and hide the cross-cutting reason. — Keeps non-obvious invariants discoverable in one place, so implementers understand why a site defers work rather than re-deriving or breaking it.

## General

<!-- rule:4384 -->
- Put shared ORM default-label and choice lookup in `django/db/models/utils.py`; import it from `django.contrib.admin`, `django.db.models`, and `django.forms` instead of reading `django.conf.settings` directly. Duplicated lookup logic drifts, so admin, forms, and model rendering can disagree on the same field's labels and choices. — Callers in `django.contrib.admin`, `django.db.models`, and `django.forms` all need the same default-label and choice resolution; inlining settings reads in each place lets them diverge, producing fields that render different labels in forms, admin, and model output.
<!-- rule:6343 -->
- Export JS classes via the module system or an existing registration API — never assign to `window` — `window` assignments make classes depend on script load order, leak into the global namespace, and can't be imported or mocked by module consumers. Tightly coupled helpers belong on the widget class that owns their state, not as parallel globals.
  - Fold tightly coupled classes into their `django/contrib/gis/static/gis/js/` widget class instead of exporting new globals
<!-- rule:2782 -->
- Rule text: When a function maps deprecated positional `*args` to parameter names via a parallel list (e.g., `zip(args, [...])`), keep that list synchronized with which parameters were historically accepted positionally: add names for parameters that were previously positional, but never add newly introduced keyword-only parameters. — If the parallel name list drifts from the parameters that were historically positional, deprecated positional calls will either silently bind to the wrong parameter or newly introduced keyword-only parameters will be unintentionally accepted positionally, breaking the backward-compatibility contract the deprecation shim exists to preserve.
  Category: deprecation
  Scope: backward-compatible positional argument handling
  Placement rationale: The rule is a general coding convention for handling deprecated positional arguments, but the only evidence comes from the Django package. It is not tied to a specific file or entity, so file-level placement would be too narrow. Placing it at django/AGENTS.md keeps it discoverable by AI assistants working anywhere within the Django codebase while avoiding over-generalization to the entire repository root, since no cross-directory evidence exists.
  Example of bad code: None
  Example of good code: None

## File-Specific Rules

### `django/conf/global_settings.py`

<!-- rule:3204 -->
- In `django/conf/global_settings.py`, only carry an empty-value comment (`= ''`, `= ()`, `= {}`) to another setting if that empty value triggers the same special-case handling — the comment documents *why* the value is empty, so copying it claims handling the target setting doesn't have. — Empty-value comments in `django/conf/global_settings.py` mark settings whose emptiness is meaningful (deprecated, computed at runtime, or explicitly treated as "unset" by downstream code). Reusing such a comment on a setting that isn't special-cased the same way misleads readers into assuming that behavior exists, and they will build on a false premise.

### `django/contrib/admindocs/utils.py`

<!-- rule:408 -->
- Centralize `simplify_regex` helpers in `django/contrib/admindocs/utils.py` — `views.py` and other callers reuse this logic, so keeping it here prevents duplicated, drifting matchers. Use simple regex patterns, consistent naming ('unnamed', not 'non_named'), and docstring examples scoped to each helper's transformation. — Shared logic centralized in this module is what `simplify_regex` in `views.py` and other callers depend on; scattering or duplicating matchers causes them to drift out of sync. Naming and documentation inconsistencies ('unnamed' vs 'non_named', vague examples) make the helpers harder to reuse safely.
<!-- rule:3836 -->
- In `django/contrib/admindocs/utils.py`, route all `replace_*_groups()` group-boundary scanning through a shared `_find_groups(pattern, group_matcher)` helper — variants pass flags like `named=True/False` instead of re-implementing bracket matching, so a fix to the scanning logic lands everywhere at once. — Duplicated bracket-matching in the `replace_*_groups()` utilities means any parsing bug or edge case must be fixed in each copy, and they drift apart over time; centralizing the scan in `_find_groups` keeps the group-detection behavior identical across the `named`/unnamed variants.

### `django/contrib/gis/db/backends/oracle/operations.py`

<!-- rule:2176 -->
- In `OracleOperations.spatial_functions`, map each spatial op to its Oracle Spatial function (e.g. `"FromWKB": "SDO_UTIL.FROM_WKBGEOMETRY"`) — a missing entry silently breaks that lookup on Oracle. — `spatial_functions` in `django/contrib/gis/db/backends/oracle/operations.py` is what resolves op names to `SDO_*` calls; any op absent from the dict fails at query time.

### `django/contrib/gis/db/backends/postgis/adapter.py`

<!-- rule:6372 -->
- Test emptiness via `.empty`, not by serializing to WKT and matching a sentinel — string comparison on `'POINT EMPTY'` is slower and misses other empty types — Using `.empty` avoids costly WKT round-tripping and prevents empty non-point geometries from being mislabeled as `POINT EMPTY`, which preserves the correct `geom_type` for PostGIS and Django.
  - Serialize empty geometries with their own type's literal (`POLYGON EMPTY`, `GEOMETRYCOLLECTION EMPTY`) — a hardcoded `POINT EMPTY` misrepresents non-point geometries to PostGIS and Django

### `django/contrib/gis/db/backends/spatialite/base.py`

<!-- rule:4665 -->
- Fall back to `spatialite_lib = 'mod_spatialite'` when `find_library('mod_spatialite')` returns `None` — `find_library()` misses installed extensions, so `None` doesn't mean it's absent. — In `django/contrib/gis/db/backends/spatialite/base.py`, `find_library('mod_spatialite')` can return `None` even when the extension is installed, so relying on it alone causes false negatives; the fallback to a literal module name keeps the backend loadable. Deferring `ImproperlyConfigured` to `get_new_connection()` prevents `__init__()` from failing on valid configurations where detection is unreliable.
  - Raise `ImproperlyConfigured` in `get_new_connection()`, not `__init__()` — defers the error to actual connect time so unreliable `find_library()` detection doesn't break valid SpatiaLite setups.

### `django/contrib/gis/gdal/raster/source.py`

<!-- rule:5644 -->
- In `GDALRaster.clone()`, give file-backed rasters a real path (mirroring `warp()`'s generated filenames, not `/vsimem/`) and in-memory rasters a fresh `VSI_FILESYSTEM_BASE_PATH` uuid — never reuse the source's name/path, or the clone shares backing and isn't independent. — `GDALRaster.clone()` is expected to return a fully independent raster; reusing the source's name or `/vsimem/` path for file-backed rasters aliases the same backing, so later edits (or deletes) on one affect the other. File-backed driver formats need a real filesystem path, hence the `warp()`-style naming; in-memory rasters only need uniqueness, so a fresh `uuid.uuid4()` under `VSI_FILESYSTEM_BASE_PATH` avoids collisions.

### `django/contrib/gis/geos/geometry.py`

<!-- rule:6373 -->
- Treat `SRID` 0 as valid in EWKT serialization/comparison in `django/contrib/gis/geos/geometry.py` — preserve the `SRID=0;` prefix instead of using truthiness checks that drop zero-valued SRIDs. — `SRID` 0 is a legitimate SRID in EWKT; `if srid:` silently strips the prefix the same way it strips `None`, corrupting round-trips and equality comparisons against geometries that explicitly carry `SRID=0;`. Place the rule in `django/contrib/gis/geos/geometry.py` so it is findable when working on `GEOSGeometry` EWKT output.

### `django/contrib/gis/measure.py`

<!-- rule:1837 -->
- Add units to the owning `MeasureBase` subclass's `UNITS` dict in `django/contrib/gis/measure.py` instead of separate category mappings — keeps lookups centralized per measure class. — Adding units and only genuinely distinct, alphabetically sorted aliases to the owning `MeasureBase` subclass's `UNITS` dict prevents unit resolution from fragmenting across separate category mappings or accumulating redundant case/plural aliases that normalization already handles, which would otherwise cause missed, inconsistent, or ambiguous conversions.
  - Add `ALIAS` entries only for distinct long-form/historical names, alphabetically sorted — plural and case variants are already handled by normalization, so extra entries are redundant.

### `django/contrib/gis/templates/gis/openlayers.html`

<!-- rule:6223 -->
- Consume WMTS providers via `ol.source.XYZ` with the provider's `{z}/{y}/{x}` template (e.g., NASA GIBS), not `ol.source.TileWMS` — TileWMS can't consume fixed-tile-matrix URLs. — TileWMS issues WMS requests and breaks against level-encoded XYZ endpoints. Set the OpenLayers view `maxZoom` to the tile matrix level in the URL (`GoogleMapsCompatible_Level8` → `8`) — higher zooms request tiles that don't exist.
<!-- rule:6229 -->
- Default base layers in `gis/openlayers.html` should use stable, maintained tile services with worldwide coverage (e.g., official OpenLayers examples, NASA GIBS) rather than demo, third-party, or region-specific endpoints. — Because this template ships to every Django user worldwide and the default base layer URLs cannot be customized per user, demo or third-party endpoints that get retired and region-specific endpoints that lack global coverage would leave many users with a broken map out of the box.

### `django/contrib/messages/storage/cookie.py`

<!-- rule:2817 -->
- In `django/contrib/messages/storage/cookie.py`, keep `_legacy_hash()` pinned to `key_salt = 'django.contrib.messages'` and document that prefix-less pre-3.1 cookies are deprecated and invalid in Django 4.0+ — the fixed salt is what keeps cookies set by pre-3.1 Django verifiable, so changing it silently drops users' pending messages. — The `_legacy_hash()` salt value is baked into every hash written before Django 3.1; altering it invalidates those cookies on upgrade. The deprecation note tells readers why the prefix-less format must not be reintroduced.
<!-- rule:2802 -->
- Serialize optional fields at fixed positions using an explicit sentinel (e.g., `None`) instead of length-based detection — adding/removing fields otherwise breaks deserialization of existing cookies in `django/contrib/messages/storage/cookie.py`, where `extra_tags` and `extra_kwargs` must always be present. — Cookies from older Django versions persist in browsers; if `django/contrib/messages/storage/cookie.py` infers field presence from list length, adding or reordering fields silently misparses existing serialized messages. Fixed positions with a `None` sentinel keep old and new payloads mutually readable.
<!-- rule:2818 -->
- Remove or delegate redundant helpers (`_encode` → `_encode_parts`) in `django/contrib/messages/storage/cookie.py` — duplicated sign/compress logic drifts out of sync and diverges from the canonical implementation — Two helper methods carrying their own sign/compress logic will diverge as one is patched and the other isn't; delegating to the canonical helper keeps a single source of truth.

### `django/contrib/redirects/forms.py`

<!-- rule:6406 -->
- In `RedirectForm` (`django/contrib/redirects/forms.py`), keep `site` and `domain` consistent — never silently overwrite `domain` in `save()` — Without a rule here, `site` and `domain` can silently diverge: `save()` clobbers `domain`, so the form shows one value while the DB stores another. Make it explicit — either treat `site` and `domain` as mutually exclusive, raise a `ValidationError` when `site.domain != domain`, or bind/display `domain` dynamically so the UI always matches what gets saved.

### `django/contrib/sessions/backends/base.py`

<!-- rule:5395 -->
- Catch `django.core.signing.BadSignature` (not broad `Exception`) when decoding signed session data — lets you log tampering to `django.security.SuspiciousSession` instead of silently swallowing it — Narrowing to `BadSignature` separates tampering (security-relevant, logged to `SuspiciousSession`) from mere corruption (unpicklable data, handled by returning `{}`). A broad `Exception` collapses these cases, so signature failures stop being reported as suspicious sessions. The deprecation comment preserves this contract after the legacy path is removed.
  - Catch broad `Exception` only for malformed/unpicklable data and return `{}` — keeps one corrupt session from crashing the request while still flagging signature failures as suspicious
  - When the legacy decode path in `sessions/backends/base.py` is deprecated, leave a comment documenting the post-deprecation `BadSignature`/`SuspiciousSession` handling — otherwise that suspicious-session logging is silently dropped
<!-- rule:4514 -->
- When wrapping Django signing in `django/contrib/sessions/backends/base.py`, delegate to `signing.dumps()`/`signing.loads()` and forward config explicitly — pass `self.key_salt`, `self.serializer`, `compress=True` to `dumps()` and `self.serializer`, `max_age=max_age` to `loads()` — so signed session payloads stay compatible with Django's signing contract. — Wrapping Django's signing helpers without explicitly forwarding `key_salt`, `serializer`, `compress`, and `max_age` silently changes the signing contract, so payloads written by one configuration (or Django version) can no longer be verified by another, and reusing `session_dict` inside `decode()` raises `NameError` because that name only exists in `encode()`'s scope.
  - Forward signing options through `**extra` rather than adding individual parameters one at a time — new signing kwargs flow through without churning the backend's public signature.
  - In `encode()`/`decode()`, pass the plain `session_dict` to `encode()`, but pass the encoded payload `session_data` to `signing.loads()` in `decode()` — reusing `session_dict` there raises `NameError` because it's undefined in that scope.

### `django/contrib/sitemaps/views.py`

<!-- rule:5766 -->
- In `django/contrib/sitemaps/views.py`, set the sitemap index `Last-Modified` only when every sitemap defines a `lastmod`, using the max across them — omit the header if any lack one, since a partial value claims freshness the index can't guarantee. — Prevents the index view from advertising a stale or misleading timestamp to crawlers when freshness is only partially known.

### `django/contrib/staticfiles/storage.py`

<!-- rule:4440 -->
- In `django/contrib/staticfiles/storage.py`, parse CSS comments/strings/URLs with CSS Syntax tokenization: use the spec consume-comment regex `\/\*[^*]*\*+([^/*][^*]*\*+)*\/` (not `\/\*.*?\*\/`), put the escape branch (`|\\.`) before string branches, and only rewrite URL/imports inside comments containing `url` or `import`. — Non-greedy `.*?` breaks on comments containing `*` (e.g. `/**/`), escaped quotes would spuriously open strings and swallow real `url()` calls, and filtering to `url`/`import` comments avoids mangling unrelated comment text during post-processing.
<!-- rule:3937 -->
- Extract cohesive blocks (e.g. JS import/export `complex_adjustments`) in `django/contrib/staticfiles/storage.py` into helpers placed above `_post_process` — keeps `post_process` under ~100 lines and moved code out of the diff — Helpers defined above `_post_process`/`post_process` don't register as changed lines when code is moved, so refactor diffs stay reviewable and the main post-processing method stays small enough to follow.
<!-- rule:3330 -->
- Bump `ManifestFilesMixin.manifest_version` only when `staticfiles.json` format/contents change — never for internal refactors — Scope: `django/contrib/staticfiles/storage.py`, `ManifestFilesMixin`.
    - The version is itself written into the manifest, so it exists to signal real format/serialization changes to anything reading `staticfiles.json` (CDNs, deploy tooling). Bumping it during a changes entry that already leaves the file identical adds pointless churn and forces downstream caches to invalidate for no reason.
<!-- rule:5482 -->
- Keep `hashed_name` in `django/contrib/staticfiles/storage.py` always returning a content-hashed name — no flags to skip hashing or existence checks; callers rely on the return value being content-addressed for cache-busting. — `hashed_name` is a contract: Django's manifest storage and downstream cache headers assume the returned filename changes whenever file content changes. Any bypass flag silently serves stale URLs and breaks cache invalidation for everyone.
<!-- rule:2980 -->
- Allow optional whitespace between `*` and `as` in `HashedFilesMixin` import regexes — minifiers emit `import *as x`, which would otherwise go unhashed. — Minified JS commonly drops the space in `import * as foo`, so a regex requiring `* as` silently misses those references in `django/contrib/staticfiles/storage.py` and leaves the hashed URL unreplaced.

### `django/core/env_helpers.py`

<!-- rule:5527 -->
- In `django/core/env_helpers.py` boolean parsers, normalize with `str(val).lower()` and accept `y`/`yes`/`on` alongside `true`/`t`/`1`; in strict mode validate against both truthy and falsy token sets and raise `ValueError` for unrecognized values. — Env vars are typed by humans with inconsistent casing and spellings (`YES`, `On`, `Y`) — case-sensitive parsing silently coerces these to `False`, and strict-mode silent coercion hides misconfiguration instead of surfacing it as an error.

### `django/core/exceptions.py`

<!-- rule:5599 -->
- Compare and hash the full error structure in `__eq__`/`__hash__` for structured error types like `ValidationError` — include field-key mappings (keys and values), don't flatten to sorted messages or rely only on type discriminators. Keep `__hash__` consistent with `__eq__`. — Two errors with identical messages but different field-key mappings should not compare or hash equal; flattening or using only the type discriminator silently merges distinct errors, and a `__hash__` out of sync with `__eq__` breaks use as dict/set keys.

### `django/core/files/storage/filesystem.py`

<!-- rule:4554 -->
- Use `os.O_CREAT | os.O_EXCL` in `FileSystemStorage._save()` when `allow_overwrite=False` — an exists-check then rename races, so concurrent saves clobber each other — The existence check and the write are separate steps, so two processes can both find the destination missing and one silently overwrites the other. Opening the destination with `os.O_CREAT | os.O_EXCL` makes the create-or-fail decision atomic in the kernel, so `allow_overwrite=False` actually holds under concurrency.

### `django/core/files/uploadhandler.py`

<!-- rule:5653 -->
- `MultiPartParser.parse()` owns upload lifecycle state (`uploaded_file` flag) and fires `handler.upload_stopped()` on `StopUpload` or when no file completed — keeps every handler's state consistent instead of relying on each handler to track aborts itself — Handlers registered with `MultiPartParser.parse()` can be aborted mid-upload via `StopUpload` or finish without a completed file; if each handler tracked this itself, some would miss the abort and leak stale state. Centralizing the `uploaded_file` flag and always calling `handler.upload_stopped()` guarantees uniform notification.

### `django/core/handlers/asgi.py`

<!-- rule:1781 -->
- Poll `receive()` for `http.disconnect` in `ASGIHandler` — ASGI never pushes disconnects proactively — Incorrect disconnect handling in `django/core/handlers/asgi.py` causes two failure modes: aborted responses for views that already completed (disconnect arriving after the view returns), and leaked tasks when `RequestAborted` tears down the TaskGroup. Polling `receive()` is required because ASGI servers do not deliver `http.disconnect` proactively, and re-raising `AssertionError` preserves protocol-server bug signals instead of masking them as client cancellations.
  - Run view processing concurrently with `listen_for_disconnect`; raise `RequestAborted` only when disconnect arrives mid-flight — late disconnects must not kill an already-finished response
  - After the request body is fully processed, consume at most one `receive` event and assert its type — enforces the protocol-server contract
  - Treat `RequestAborted` as expected cleanup: cancel the disconnect listener *inside* the TaskGroup, never end the TaskGroup to abort it
  - Re-raise `AssertionError` from protocol-server failures — swallowing it hides real bugs in `django/core/handlers/asgi.py`
<!-- rule:3874 -->
- In `django/core/handlers/asgi.py`, join repeated `HTTP_COOKIE` values with `"; "`, skipping the delimiter when the previous value already ends with `"; "` — cookies are `"; "`-delimited per RFC 6265, so `","` joining misparses them downstream. — The rules preserve the special-casing in `django/core/handlers/asgi.py`: cookies use a different delimiter than other HTTP list headers, and the delimiter-skipping detail prevents duplicated or trailing `"; "` from creating empty cookie names when values are re-joined.
  - Join every other repeated header in the `META` aggregation with `","` — those follow comma-separated list semantics (RFC 9110).

### `django/core/mail/__init__.py`

<!-- rule:2919 -->
- Propagate options like `using`/connection to every sibling mail helper in `django/core/mail/__init__.py` (`mail_admins`/`mail_managers`, `send_mail`/`send_mass_mail`) — helpers that skip it silently ignore the selected backend. — This matters because without it sibling mail helpers would silently ignore a caller-supplied `using`/`connection` and fall back to the default backend, while duplicated recipient/validation/send logic and redundant empty-recipient guards would drift apart and produce inconsistent behavior across `mail_admins`/`mail_managers` and `send_mail`/`send_mass_mail`.
  - Extract shared recipient/validation/send logic into a private parameterized helper in `django/core/mail/__init__.py` rather than duplicating across the siblings — keeps `mail_admins`/`mail_managers` and `send_mail`/`send_mass_mail` from drifting apart.
  - Don't re-add guards the downstream helper already implements (e.g. empty `ADMINS`/`MANAGERS` checks) in `django/core/mail/__init__.py` — duplicate checks diverge and cause inconsistent behavior.

### `django/core/mail/backends/locmem.py`

<!-- rule:1298 -->
- Store `copy.deepcopy(message)` in `locmem.EmailBackend`'s outbox, not the original `message` — a regression test mutating the message after `send()` must leave the outbox copy unchanged, catching aliasing bugs where callers reuse/mutate the message object. — The in-memory backend (`django/core/mail/backends/locmem.py`) keeps messages for inspection, so storing the original reference lets any post-`send()` mutation silently rewrite sent mail; deep-copying isolates the outbox and the mutation-after-`send()` test guards against regressions.

### `django/core/mail/message.py`

<!-- rule:3530 -->
- When two public attachment APIs are meant to be equivalent (`attach()` and assigning to `attachments`), keep their normalization for `text/*` MIME types identical — divergent paths silently produce different content for the same input — Callers reasonably assume `msg.attach(...)` and `msg.attachments = [...]` produce identical messages for the same payload. When their content-normalization paths diverge (e.g. different handling of `text/*` MIME types and encodings), the same attachment ends up encoded differently depending on which API was used — a subtle, hard-to-diagnose bug. Add parity regression tests before simplifying either path; if a proposed simplification would change one side's normalization, keep the explicit normalization instead.

### `django/core/paginator.py`

<!-- rule:4836 -->
- In `django/core/paginator.py`, match `Paginator`'s API conventions: `number` for page-position params, `get_page`/`safe*` for safe retrieval, `_check_<subject>_is_<condition>` for validators, and reuse `_get_page` instead of parallel methods — mirrors upstream naming so subclasses and users can rely on stable hooks, and avoid public wrappers over `validate_number()` since callers already have `get_page()`. — Following these conventions preserves Paginator's stable extension and call surface, preventing subclasses and callers that override `_get_page`, call `get_page(number)`, or rely on `_check_*` hooks from breaking, and avoiding duplicate or fragmented behavior through parallel methods or wrappers over `validate_number()`.

### `django/core/serializers/json.py`

<!-- rule:4565 -->
- In `DjangoJSONEncoder.default`, use `dt.isoformat(sep='T')` with `timespec='seconds'` when `microsecond == 0`, else `timespec='milliseconds'` — never slice or replace chars in the result, so sub-ms precision is preserved and the output stays valid ISO-8601 — Passing `timespec` to `isoformat()` avoids silently rounding microseconds to zero for non-zero values, and skipping string post-processing prevents truncation bugs that corrupt the timestamp format consumers depend on.

### `django/core/serializers/xml_serializer.py`

<!-- rule:4228 -->
- In `django/core/serializers/xml_serializer.py`, raise `SuspiciousOperation`/`UnexpectedNode` for unsupported nested markup and unexpected XML nodes — don't swallow them — Silently skipped nodes turn malformed fixtures into partial or corrupted deserialization that's hard to trace; explicit errors surface the bad XML at the source. Re-raise these in broad exception handlers and in sibling helpers like `save_deferred_fields()`, and assert them in the fixture-parsing tests so the behavior doesn't regress.
<!-- rule:4218 -->
- Bound recursion in XML/fixture text extractors (`django/core/serializers/xml_serializer.py`) with an explicit `max_depth` and `_depth` counter set to the format's exact needed depth — unbounded recursion risks infinite loops on cyclic nodes, while narrowing below `getInnerText`'s original depth (direct children plus their immediate children) silently drops text the serializer depends on. — `getInnerText` intentionally collects text from direct children and their immediate children; changing that bound either risks infinite recursion on malformed/cyclic XML or silently truncates fixture text, breaking round-trip serialization.

### `django/core/signing.py`

<!-- rule:4515 -->
- Implement signing utilities in `django/core/signing.py` and import them via `from django.core import signing` — keeps the public signing API in one canonical module instead of splitting it into `django.utils`. — Scoping rules to `django/core/signing.py` because that file is both the implementation site and the class of code the rule governs; `django/core` as a whole doesn't share these conventions. Browse `django/utils/` for reference implementations to keep helper logic consistent with the rest of Django.
  - Pass `self.algorithm` (and other configured options) when computing signatures — surface-level calls without the configured algorithm produce signatures that silently mismatch what the caller configured.
  - Use `force_bytes(settings.SECRET_KEY)` before signing — callers may set `SECRET_KEY` as a `str` or `bytes`, and skipping the conversion raises `TypeError` on the str path.
  - Keep internal signing helpers scoped to the concrete conversion they perform (base conversion, negation sign, etc.) — speculative parametrization of `base`/negation signs adds surface area with no callers and makes the module harder to audit.
<!-- rule:5380 -->
- In `django/core/signing.py`, thread any configurable hash algorithm through the whole sign/verify path (including HMAC/signature computation), not just store it as config — Storing the algorithm without applying it in the signature logic silently falls back to the default hash, causing sign/verify mismatches and defeating the configurability.
<!-- rule:3676 -->
- In `django/core/signing.py`, surface per-call metadata (e.g. timestamp from `TimestampSigner.unsign`) via an explicit return mode like `return_timestamp=True` returning `(value, timestamp)` — never stash transient results on `self`, and keep `unsign_object` consistent with `unsign`. — Storing per-call state on `self` breaks under concurrent or nested calls on a shared signer instance and forces callers to `unsign` twice to get value+metadata. An opt-in tuple return keeps the default API unchanged while letting callers fetch metadata in a single call, and matching the pattern in `unsign_object` keeps the two entry points interchangeable for users.

### `django/core/validators.py`

<!-- rule:4625 -->
- Keep `__call__()` thin in `django/core/validators.py` validators — delegate to overridable `parse_*` and `validate_*` hooks. — Subclasses (e.g. of `EmailValidator`) can override one parse or component check (`validate_<component>()`) without duplicating the whole pipeline; `validate()` receives the parsed components and optionally the original value.
<!-- rule:5073 -->
- Keep `limit_value` a public attribute on `BaseValidator`; resolve callables at integration points like `IntegerField.validators()` — Subclasses and third-party validators read `limit_value` directly, so adding `_limit_value`/`get_limit_value()` indirection breaks them; callable resolution belongs where the field binds its bound, not in the shared base.

### `django/dispatch/dispatcher.py`

<!-- rule:4182 -->
- In `asend()`/`asend_robust()` docstrings, note that only async receivers run concurrently — sync receivers are `sync_to_async()`-wrapped and awaited before the async group, so callers shouldn't assume parallel execution across mixed receivers. — This matters because callers who assume mixed sync and async receivers run in parallel may design them to depend on each other's concurrent progress or rely on parallel latency, causing deadlocks, race conditions, or unexpected serialization when sync receivers are actually awaited first.

### `django/middleware/csp.py`

<!-- rule:2607 -->
- Add Django system checks that flag unusable CSP nonce config — warn/error when `CSP.NONCE` is enabled but never reaches a header: absent from all configured header directives, or `django.template.context_processors.csp` missing from `TEMPLATES['OPTIONS']['context_processors']` (or a dedicated `django/core/checks/csp.py` module). Misconfiguration silently drops the nonce, breaking inline scripts with no clear failure signal. — `CSP.NONCE` only takes effect when it appears in at least one header directive *and* the `csp` context processor is installed — otherwise the nonce is generated but never emitted, and inline scripts blocked by CSP fail with a confusing browser error instead of a startup warning.
<!-- rule:2610 -->
- Apply per-view CSP exceptions with CSP decorators on the specific views that need them, not by special-casing status codes in `ContentSecurityPolicyMiddleware.process_response` — keeps the middleware's response path uniform and prevents one-off status checks from silently leaking policy overrides to unrelated responses — Special-casing status codes in ContentSecurityPolicyMiddleware.process_response can leak policy overrides to unrelated responses, and giving debug-only pages their own view-level CSP decorators adds maintenance and can fail exactly when debugging, so per-view decorators and a middleware-level DEBUG exemption keep CSP exceptions scoped to the views that actually need them.
  - For debug-only pages (Django debug 404/500 when `DEBUG=True`), skip CSP with a middleware-level exemption rather than view decorators setting custom policies — debug pages never ship to production, so custom policies there just add maintenance and can break exactly when you need to debug

### `django/middleware/csrf.py`

<!-- rule:2233 -->
- In `django/middleware/csrf.py`, compare the request origin against the exact allowed origins before building the normalized expected origin, and short-circuit referer validation with the origin-verified flag — keeps the common path cheap and referer behavior unchanged; only widen the accepted-referer set with explicit justification, since doing so silently relaxes CSRF protection. — As above — exact-origin check first avoids normalization work on the hot path; the origin-verified flag preserves existing referer semantics; broadening accepted referers weakens CSRF defense.
<!-- rule:2245 -->
- In `django/middleware/csrf.py`: sanitize only user-controlled token sources (cookies, headers), never session-stored CSRF tokens — session tokens are server-controlled, and sanitizing them corrupts valid tokens. Keep accepting the raw CSRF cookie value as a valid token — client-side nonce generators depend on it. Name token helpers after what they actually do; rename `_sanitize_token` if it only validates, since misleading names hide validation behavior from maintainers. — Sanitizing session-stored CSRF tokens corrupts server-controlled valid tokens and causes spurious CSRF failures, breaks client-side nonce generators that depend on the raw cookie value, and a misleadingly named `_sanitize_token` helper hides validation-only behavior from maintainers.
  Category: error_handling
  Scope: `django/middleware/csrf.py`
<!-- rule:5668 -->
- In `django/middleware/csrf.py`'s Origin-header check, source cross-origin config only from `CSRF_TRUSTED_ORIGINS` — `SESSION_COOKIE_DOMAIN`/`CSRF_COOKIE_DOMAIN` carry no scheme semantics for origin comparison — Cookie-domain settings describe domain scope, not scheme; treating them as origin sources breaks comparison since origins are scheme-qualified while cookie domains are not.
<!-- rule:5857 -->
- In `CsrfViewMiddleware.process_response`, check `request.csrf_cookie_needs_reset` before the early returns on `response.csrf_cookie_set`/`CSRF_COOKIE_USED` — call `_set_token` then clear the flag, or forced resets are silently skipped. — The `process_response` method has multiple early returns; if a forced CSRF reset is handled after them, the token is never rotated. Storing flags on the shared middleware instance causes cross-request state bleed in Django's single-instance middleware model.
  Keep per-request CSRF flags on `request`, not `self` — the middleware instance is shared across requests, so `self` leaks state between users.

### `django/middleware/locale.py`

<!-- rule:6303 -->
- In `django/middleware/locale.py`, gate any language-prefix or redirect on `prefixed_default_language` (or `language != settings.LANGUAGE_CODE`) — adding a prefix to the default language breaks unprefixed URLs — Unprefixed default-language URLs are the expected site shape when `prefixed_default_language` is false; guarding on `language != settings.LANGUAGE_CODE` alone (or its inverse) causes incorrect redirects and doubled prefixes. Apply the same guard to sibling branches when fixing one, and in the `process_response` 404 redirect rely on `prefixed_default_language` and `not language_from_path` — a redundant `language != settings.LANGUAGE_CODE` check there re-introduces the bug the flag exists to prevent.

### `django/tasks/backends/base.py`

<!-- rule:3210 -->
- In `BaseTaskBackend.check()`, raise an error when `ENQUEUE_ON_COMMIT` (or other transaction-dependent behavior) is enabled but the DB connection's `supports_transactions` is `False` (e.g., MySQL MyISAM) — the on-commit callback never fires without transaction support, so tasks would be silently dropped. — Without transaction support, `ENQUEUE_ON_COMMIT` hooks observe no commit event, so tasks are silently never enqueued; surfacing this at check time tells users to switch storage engines or disable the option.

### `django/tasks/signal_handlers.py`

<!-- rule:3178 -->
- Log `run_after` in `log_task_enqueued` (`django/tasks/signal_handlers.py`) with task id, path, and backend — lets readers correlate later task mentions and see whether the task was scheduled to run immediately or deferred. — The enqueue debug log is the only place a task's scheduling intent is captured at enqueue time. Without `run_after`, correlating the log line with later execution/worker logs is guesswork, and there's no way to tell an immediate run from a delayed one from the log alone.

### `django/urls/resolvers.py`

<!-- rule:2103 -->
- In `django/urls/resolvers.py`, pass `instance._is_endpoint` when compiling a route to regex — without it, endpoint routes lose the `$` anchor and over-match. — The companion rules send `_is_endpoint` into the regex compiler and justify keeping the explanatory comment. Without the flag, endpoint resolvers no longer emit the `$` terminator and match longer paths; without the comment, the next editor may "simplify" the branch and silently reintroduce the same over-match. Both are confined to `django/urls/resolvers.py`.
  - Keep the comment explaining that the non-endpoint branch only applies to non-endpoints unless the PR description explicitly justifies removing it — it documents the anchor invariant future editors would otherwise break.
<!-- rule:4982 -->
- Return structured `route_components`, not a pre-joined route string — callers composing nested URL patterns need the full component structure intact — Nested and composed URL patterns (e.g. `include()`d resolvers) only produce correct `ResolverMatch.route` values when the parent pattern and `sub_match.route` are combined recursively. A flattened pre-joined string loses the structure callers rely on to reconstruct or inspect the full path, so `route_components` must stay structured and route composition must walk the full pattern chain.
  - Build `ResolverMatch.route` by recursively joining the parent pattern with nested `sub_match.route` — using only the immediate pattern drops prefix segments when resolvers are composed via `include()`
<!-- rule:4246 -->
- In `django/urls/resolvers.py`, put helper logic in overridable methods/static methods (e.g., `URLResolver._extend_tried`) rather than nested functions — subclasses like those in contrib apps can't override closures. — Nested functions are invisible to subclass overrides, so keeping resolver helpers as methods/staticmethods preserves the extension points that third-party and contrib apps rely on.
<!-- rule:2096 -->
- Prefer separate descriptor classes (`RegexPattern`, `RoutePattern`) over a single parametrized descriptor once their behavior diverges — a shared descriptor turns into a nest of conditionals that must be re-read for every pattern type. — Applies within `django/urls/resolvers.py`. The two halves of the rule are in tension and resolve in opposite directions: descriptor types get their own class when behavior differs, while shared behavior gets extracted and composed into `URLPattern`/`URLResolver`. Both avoid the same failure mode — logic that grows combinatorially with the number of pattern types or the number of class/behavior pairings.
  - Factor behavior common to `URLPattern` and `URLResolver` into a composed behavior class rather than subclassing — one subclass per behavior×class combination multiplies classes and duplicates logic.
<!-- rule:4533 -->
- In `ResolverMatch.__getstate__` (`django/urls/resolvers.py`), strip non-picklable internals from all matches, not only `is_class_based` ones — function-based matches (e.g. `tried` holding a `URLResolver` from an `include()`) can also become unpicklable depending on `urlpatterns` ordering, so gating on `is_class_based` leaves latent pickling failures for those. — Prevents latent `PicklingError` on function-based matches — the non-picklable `tried` list isn't class-specific, and `urlpatterns` ordering can trigger it for any match type.

### `django/utils/autoreload.py`

<!-- rule:5185 -->
- In `django/utils/autoreload.py`, guard every `module.__file__` read with `hasattr(module, "__file__")`, falling back to `""` — namespace packages and builtins have no `__file__`, so direct access raises `AttributeError` inside `iter_modules_and_files` and kills the autoreloader. — Namespace packages and builtin modules lack `__file__`; direct attribute access raises `AttributeError` inside `iter_modules_and_files` and crashes the autoreload loop.
  In the `__main__` special case of `django/utils/autoreload.py`, keep the `hasattr(module, '__file__')` guard adjacent to the append and `continue` — matching the fallback above so the loop skips cleanly instead of raising.
<!-- rule:5187 -->
- Use keyword-only args for public APIs — prevents breakage when adding parameters — Adding a positional parameter to a public API silently rebinds existing call arguments, breaking downstream callers without any error at the definition site.
<!-- rule:6400 -->
- In `django/utils/autoreload.py`, log a diagnostic warning when optional backends like `Watchman` report `is_available() == False` — name the missing tool and fallback (e.g., `Watchman client not available, watching for file changes with StatReloader`) so users can diagnose backend selection; emit once per process or gate behind `runserver` verbosity to avoid log spam in the reload cycle. — Without this warning, an optional backend such as Watchman failing `is_available()` silently falls back to `StatReloader`, leading users to misdiagnose backend selection or performance, while emitting it on every reload-cycle check would spam logs and bury that same diagnostic.

### `django/utils/cache.py`

<!-- rule:6347 -->
- Add 304 (`GET`/`HEAD`) and 412 (other methods) tests for `django/utils/cache.py` conditional responses — tests must fail if the `request.method` guard is removed. Without both branches, a broken method guard still passes CI, silently returning the wrong status for `If-Modified-Since`/`If-None-Match` preconditions. — Both branches of the `request.method` guard in `django/utils/cache.py` must be covered: `GET`/`HEAD` with failed preconditions return `304 Not Modified`, unsafe methods return `412 Precondition Failed`. If tests only cover one branch, removing the guard goes undetected and clients receive the wrong status for `If-Modified-Since`/`If-None-Match` preconditions.
<!-- rule:4622 -->
- In `_generate_cache_key` (`django/utils/cache.py`), encode each Vary header's name + value with a sentinel for absent headers — prevents equal values under different header names from colliding — Cache keys are derived from Vary header values; without headers names as part of the framing, `Accept: text/html` and `X-Foo: text/html` produce identical keys, causing responses to be served to the wrong clients. The sentinel ensures absent headers are still distinguishable.

### `django/utils/crypto.py`

<!-- rule:5377 -->
- Raise `InvalidAlgorithm` for invalid algorithm names in `django/utils/crypto.py` helpers — callers rely on catching a stable domain error, not generic `ValueError`/`AttributeError`. — Allows callers to differentiate invalid algorithm names from unrelated failures, keeping error handling stable across future changes to built-in exception behavior and refactors. Prevents silent breakage if underlying stdlib exception types change.

### `django/utils/datastructures.py`

<!-- rule:6346 -->
- Return caller-supplied defaults unchanged in `django/utils/datastructures.py` accessors (e.g., `MultiValueDict.get()`) — apply transformations like `list()` only to retrieved values. Copying or coercing the default mutates a value the caller owns, breaking sentinel checks and identity/type expectations. — Callers often pass a sentinel, a shared mutable object, or a value whose type they control, and rely on getting that exact object back when the key is missing. Transforming the default (e.g., `list(default)`) silently changes its type and identity, breaking `is` comparisons, sentinel detection, and shared-mutable semantics — while retrieved values legitimately need the container's normalization. Scoped to the public accessors in this file; don't generalize to unrelated modules.

### `django/utils/dateformat.py`

<!-- rule:401 -->
- Precompute per-type `set`/`dict`/`regex` validation in `django/utils/dateformat.py` — no per-token `hasattr()` — Resolving the per-type token validation once prevents repeated per-token `hasattr()` checks from letting one input type silently accept or reject format tokens that another type handles differently, which produced inconsistent formatting and masked missing-method errors in Django's date formatting.
    Resolve the format check once from the input object's type *before* iterating tokens, since per-token type checks and `hasattr()` introspection repeat identical work in the hot loop and let type-specific behavior drift.
<!-- rule:5259 -->
- Keep `self.data` read-only in `DateFormat` format-character methods — it's reused for every specifier in a format string, so assigning back to it leaks state into later characters and corrupts their output; convert into a local variable or copy instead. — In `django/utils/dateformat.py`, a single `DateFormat` instance walks through the entire format string, and each format-character method reads `self.data` as the current specifier's value. Mutating `self.data` inside one specifier's method (e.g. a per-character conversion) leaks that change into every subsequent specifier, silently producing wrong output for later format characters. Creating a local variable or copy for the converted value keeps each specifier isolated and preserves the read-only contract that the surrounding loop relies on.

### `django/utils/decorators.py`

<!-- rule:4531 -->
- In `method_decorator._wrapper`, mark a `@wraps`-wrapped `bound_method` instead of the bound method — `inspect.markcoroutinefunction` and similar markers delegate through `__func__`, leaking to the shared class-level function (`View.dispatch`) and affecting every subclass. — The rule targets `django/utils/decorators.py`, specifically the `_wrapper` inside `method_decorator`. Markers like `inspect.markcoroutinefunction` follow `__func__` on a bound method, so applying them directly would mutate the shared underlying function (e.g., `View.dispatch`) and silently affect all subclasses and instances, not just the decorated one. Introducing an interposing `@wraps`-wrapped `bound_method` isolates the marker to the instance-level wrapper.

### `django/utils/feedgenerator.py`

<!-- rule:2450 -->
- Normalize `mimetypes.guess_type()` results for known variants instead of trusting the platform's MIME database — in `django/utils/feedgenerator.py`, map `.xsl` guesses to `text/xsl` — `mimetypes.guess_type()` reads the OS MIME database, so the same Django app can emit different XML stylesheet MIME types on different machines; the explicit `text/xsl` override in `django/utils/feedgenerator.py` keeps feed XML output identical across platforms.

### `django/utils/functional.py`

<!-- rule:6071 -->
- In `flatten` (`django/utils/functional.py`), keep `str` atomic and thread `seqtypes` through every recursive call — dropping either silently changes which elements are emitted. — The hard constraints are behavioral: treating strings as iterables would explode them into characters, and failing to propagate `seqtypes` would make nested flattening ignore the caller's configured sequence types. The recursion strategy matters because real-world query/lookup inputs can nest arbitrarily deep, so the ~3-level unroll handles the common shallow case fast while an explicit stack prevents `RecursionError` on pathological input. The style preferences (positive branching, benchmarked fallback) exist so the fast path stays legible and the stack fallback isn't adopted on vibes.
  - Unroll ~3 shallow nesting levels in `flatten`, then fall back to an explicit stack — unbounded recursion overflows the C stack on deeply nested input.
  - In `flatten`, prefer positive branching over negated early-returns, and benchmark recursive-helper vs explicit-stack variants before committing the fallback — keeps the hot path readable and the chosen implementation justified by data.
<!-- rule:4767 -->
- In `django/utils/functional.py` `cached_property`, validate **both** the inferred name (`func.__name__`) and any explicit `name` arg against Python name-mangling rules — never short-circuit validation just because `name` was supplied, since overrides can still be mangled. — An explicit `name` is not a safe escape hatch — it can itself be name-mangled, so skipping validation lets a broken descriptor ship silently. The Python < 3.6 warning surfaces the mangling hazard at the only point where callers can react (by passing `name`) before lookup breaks at runtime.
  - On Python < 3.6, `warnings.warn` when an auto-detected name matches `__*` but not `__*__` in `cached_property` — signals callers they must pass an explicit `name` or the mangled name breaks descriptor lookup.

### `django/utils/hashable.py`

<!-- rule:4915 -->
- Test `django/utils/hashable.py`'s `try: hash(value) except TypeError` fallback with a minimal unhashable, non-iterable stub (`__hash__ = None`) and assert the original `TypeError` propagates — guards against the fallback silently swallowing errors or mis-handling types it can't iterate — The `except TypeError` branch in `django/utils/hashable.py` handles both genuinely non-hashable values and non-iterable ones; a stub exercising that path confirms the original `TypeError` surfaces instead of being masked. Use `__hash__ = None` (or a `__hash__` raising `TypeError`) to keep the fixture minimal and isolate the branch. Test lives in `tests/utils_tests/test_hashable.py` (path unconfirmed).

### `django/utils/html.py`

<!-- rule:2763 -->
- In `django/utils/html.py`, parse structured markup (e.g. Markdown links) with a dedicated parser or shared/extensible strategy, not format-specific regexes — Regexes on nested/structured markup invite ReDoS and invalid matches; if a regex is unavoidable, strictly constrain label and URL groups. — Markdown link syntax is too structured for regexes; they risk catastrophic backtracking (ReDoS) and mismatched output. If you must use a regex, bound label and URL groups tightly.

### `django/utils/http.py`

<!-- rule:2945 -->
- Prefer `email.utils.collapse_rfc2231_value()` for single RFC 2231 値 — no need to reimplement charset/percent decoding. — RFC 2231 continuations are easy to misparse: decoding segments individually breaks multi-byte charsets, and partial/malformed groups silently yield corrupt parameter values. Validating section numbering and rejecting whole groups on failure keeps parsed headers consistent and avoids leaking invalid state into downstream consumers.
  - For RFC 2231 continuations in `parse_header_parameters` (`django/utils/http.py`): take charset from section 0, concatenate raw encoded payloads, then decode once — decoding segments individually corrupts multi-byte output.
  - Accept only continuation groups starting at section 0 with contiguous decimal section numbers and no leading zeros — gaps or `01`-style sections indicate a malformed group.
  - If a continuation group is malformed or incomplete, discard the whole group and keep the directly supplied parameter value — prevents mixing partial corrupt data with valid values.
<!-- rule:6215 -->
- Add tests for malformed fields (`=value`, missing `=`, empty value) in `django/utils/http.py` query parsers like `limited_parse_qsl_py2`, covering both `strict_parsing` modes — these edge cases silently shift where names and values split. — Malformed query-string components (`=value`, missing `=`, empty value) can cause parsers to assign portions of input to the wrong field or drop data entirely, and behavior differs between `strict_parsing=True` and non-strict modes. Without targeted tests around `limited_parse_qsl_py2`, regressions in how field names and values are split go unnoticed.
<!-- rule:4287 -->
- Count consecutive preceding backslashes before toggling quote state in `split_header_words` (odd = escaped) — Checking only the immediately preceding char misreads `\\"` sequences and mis-splits header values. If `django/utils/http.py`'s target format has no escaped quotes, skip escape handling entirely rather than doing it wrong.

### `django/utils/inspect.py`

<!-- rule:2028 -->
- Use `func_accepts_var_args()` / `func_accepts_kwargs()` (`django/utils/inspect.py`) for variadic detection — they return `True` only for `inspect.Parameter.VAR_POSITIONAL` / `VAR_KEYWORD`, not `POSITIONAL_ONLY` / `KEYWORD_ONLY`; never guess from a param named `kwargs`. — These helpers expose a documented contract: `True` means the callable actually accepts `*args`/`**kwargs`, not just an adjacent parameter kind. Inferring from a name like `kwargs` is a convention, not a guarantee, so wrapped or renamed callables get misclassified. And a guard that only inspects positional args misses values passed by keyword, letting them slip through unchecked.
  - Decorators guarding all arguments must check both positional args and `kwargs.values()` — keyword-passed values are otherwise silently skipped.

### `django/utils/jslex.py`

<!-- rule:3913 -->
- Sync `django/utils/jslex.py` keyword/reserved tables with the MDN/ECMAScript grammar the lexer cites — a stale, hand-picked list (missing `async`, `await`, `static`, `from`, `yield`) lexes valid identifiers as keywords, mis-parsing surrounding JS. — Placement in `django/utils/jslex.py`: the rule governs the internal keyword/reserved-word tables of this single vendored lexer, so it belongs in the file itself rather than a broader directory or cross-file doc.

### `django/utils/log.py`

<!-- rule:6319 -->
- In `django/utils/log.py` helpers, make only core args (e.g., `response`) required positional; contextual args (e.g., `request`) keyword with default `None` — keeps `log_response` callable in tests and background jobs without a request, and lets Python handle required-arg validation. — The `response` must be present for the helper to work; the `request` often isn't available outside view code. Separating them this way matches caller reality.
<!-- rule:3885 -->
- Override `default_time_format` (and other `logging.Formatter` extension attrs) instead of injecting a `datefmt` in `__init__` — a non-`None` `datefmt` makes `Formatter.formatTime()` take the `strftime(datefmt)` branch and skip `default_msec_format`, silently dropping milliseconds from log output. When relying on `default_time_format`, keep `default_msec_format` a two-placeholder string (e.g. `'%s,%03d'`) so the msecs substitution still applies. — `logging.Formatter.formatTime()` only applies `default_msec_format` when `datefmt` is `None`; a subclass that injects a default `datefmt` via `__init__` therefore loses the milliseconds suffix and breaks any `default_msec_format` customization.

### `django/utils/text.py`

<!-- rule:692 -->
- Never raise on unmatched end tags like `foo</p>` in the HTML serializer — skip unmatched bookkeeping, emit the tag, or catch `ValueError` — HTML permits implied or omitted start tags, so raising from `django/utils/text.py` would crash the parser/serializer on input that is valid by spec.
<!-- rule:6370 -->
- Pass `mtime=0` to `GzipFile` in streaming helpers like `compress_sequence` (`django/utils/text.py`) — keeps gzip output consistent with other compression paths; don't test `mtime`, since streaming responses emit no ETags and the value is unobservable. — `mtime=0` matches the other compression paths in Django; the value is never observable in tests because streaming responses don't generate ETags, so asserting on it would only pin an implementation detail.
<!-- rule:697 -->
- Enforce the max-length contract in `django/utils/text.py` truncation helpers: never exceed the requested limit, return `""` (not the ellipsis/marker) when the limit is `0` or negative, and return input unchanged when its visible length is `<=` the limit. — Callers treat truncation helpers as hard length guarantees. Emitting an ellipsis when the limit is 0/negative (or at the exact-length boundary) violates that guarantee and can produce output longer than the requested limit, breaking fixed-width layouts and downstream assertions.
  Callers rely on these helpers as length guarantees — exceeding the limit corrupts fixed-width layouts, and emitting an ellipsis at zero/negative or exact-length boundaries produces output longer than the limit or adds a marker where none is warranted.

### `django/utils/timesince.py`

<!-- rule:4507 -->
- In `django/utils/timesince.py`, cap the day when comparing across months (use `min(now.day, days_in(target_month))`) and treat month-end → month-end as a full month — a raw `d.day > now.day` check misreports intervals at month-end and leap-year boundaries. — Raw day comparisons break at month-end and Feb 29: Jan 31 → Feb 28 looks like less than a month, and 31-day months falsely flip the delta. Capping to the target month's max length keeps `timesince`/`timeuntil` output correct across these edges.

### `django/views/debug.py`

<!-- rule:4027 -->
- In `django/views/debug.py` POST-reading filters, catch `UnreadablePostError` — not `OSError` — and treat unreadable POST as absent so the debug page still renders — Broad `OSError` swallows unrelated body-read failures and masks the real error; catching only `UnreadablePostError` narrows handling to framework signal, so a broken/oversized request body doesn't crash the 500/debug page itself.
<!-- rule:4581 -->
- In `django/views/debug.py`, call `_get_exception_group_data` once and recursively format its `type`/`message`/`children` dict to build both `exception_group_text` and the `exception_group` context value — avoids `TracebackException.format_exception_only(show_group=True)`, unavailable on Python 3.12 — `TracebackException.format_exception_only(show_group=True)` does not exist in Python 3.12, so relying on it breaks debug page rendering for exception groups on that version. Deriving both `exception_group_text` and `exception_group` from a single `_get_exception_group_data` call also keeps the formatted text and structured context consistent, and avoids walking the group twice.
<!-- rule:5101 -->
- Keep `HIDDEN_SETTINGS` limited to strong secret-signaling tokens — broad substrings like `URL` false-positive and hide useful debug settings — Overly broad entries mask legitimate values in the debug page, making Django's error views less useful during development.
<!-- rule:1879 -->
- Keep `django/views/debug.py` debug helpers and `ExceptionReporter` template paths on the stable public surface: use non-underscore module-level names (`builtin_template_path`, not `_builtin_template_path`) and expose `html_template_path`/`text_template_path` as class-level properties, not instance-only attributes — third-party code and tests reach them without instantiating the reporter. — Backward-compatible access to debug helpers and reporter template paths; avoids redundant state that can drift from `parser.origin`.
  Source template names via existing APIs like `parser.origin.template_name` rather than copying into redundant attributes — duplicated state drifts from the compiler's actual origin and breaks when Django's template machinery changes it.

### `django/views/generic/detail.py`

<!-- rule:2404 -->
- Place composite-PK lookup in `SingleObjectMixin.get_object()` after the existing pk/slug branch, gated on `pk_fields` (`len(pk_fields) > 1`, all attnames in `self.kwargs`) — keeps `pk_url_kwarg`/`slug_url_kwarg` authoritative for single-PK models and prevents the new branch from hijacking URL kwarg resolution into surprising lookups. — The composite branch must not shadow the existing single-PK resolution path. Requiring `pk_fields` with more than one attname and all `pk_fields` present in `self.kwargs` confines the new behavior to composite-PK models only, and placing it after the pk/slug lookup ensures `pk_url_kwarg`/`slug_url_kwarg` still win for single-PK models — otherwise unrelated detail views silently take the composite path and produce subtle lookup bugs.

### `django/views/i18n.py`

<!-- rule:6301 -->
- For `JavascriptCatalog` (`django/views/i18n.py`), cache `allowable_packages` from installed app configs instead of rebuilding per call — avoids repeated setup work on every view call — Together these keep the JS i18n endpoint cheap per request and correct: rebuilding `allowable_packages` each call wastes work, per-app views defeat caching and bloat URLconf, and listing packages without `djangojs` (e.g. `django.conf`) yields catalogs that look valid but silently omit strings.
  - Ship a single shared, cacheable `jsi18n` catalog view rather than per-app views — keeps URL wiring simple and lets HTTP caching work
  - Default `packages` to apps that actually ship the requested `djangojs` catalog (drop stale entries like `django.conf`) — prevents silently missing translations

<!-- /braindump -->