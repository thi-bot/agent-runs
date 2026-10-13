# Python Code Style and Idioms

> Python-specific style and implementation idioms: side-effect-free helpers, boolean state, globals, short-circuiting, decorators, class collections, namedtuples, splitting, and shared subclass logic.

**When to check**: When writing or refactoring Python implementation code.

## Rules

<!-- rule:1151 -->
- Split collections with one partition pass using a positively named predicate helper — `django.utils.functional.partition()` or a single loop accumulating both groups — then assign outputs in matching order. — Ad-hoc comprehensions re-filter the same data twice, drift out of sync as predicates change, and a negated predicate (`not is_invalid`) inverts easily at call sites, so matching/non-matching subsets silently disagree.
<!-- rule:1405 -->
- Represent boolean state directly — derive flags from the authoritative domain value or sentinel in one expression, and store a plain `bool` when only presence matters. Inferring from aggregates, mutable toggles, or duplicated originals lets the flag drift out of sync with the value it claims to describe. — A flag computed from an aggregate, toggled manually, or copied from the original value can disagree with the source of truth once that value changes — deriving it in a single expression from the authoritative field or sentinel keeps the flag correct by construction.
<!-- rule:3752 -->
- Use `global` only when the function rebinds a module-level name — read-only access or in-place mutation (e.g. `list.append`, `dict.update`) doesn't need it. Fix Flake8 F824 by removing the declaration, not with `# NOQA`: suppressing hides a redundant `global` and lets the code drift from the actual rebinding behavior. — Redundant `global` declarations mislead readers into thinking a function reassigns the module-level name, and suppressing Flake8 F824 with `# NOQA` locks that confusion in. Removing the declaration keeps the code honest about what rebinds and what merely mutates.
<!-- rule:5005 -->
- Order compound guard conditions with the cheap/state check first — e.g., test `response.streaming` before `response.getvalue()` so short-circuit evaluation skips the expensive or unsafe call. — Evaluating `getvalue()` on a streaming `HttpResponse` fails or blocks; checking the flag first avoids the call entirely.
<!-- rule:5927 -->
- Inline request-path decorator checks at decoration time — per-request helpers in `django/views/decorators/http.py` and `debug.py` add overhead to every call — Request-path decorators wrap every incoming request, so a helper called per-request or a wasted attribute lookup is paid on each call; generating the correct sync/async wrapper once at decoration time with the check logic inlined keeps that cost out of the hot path. Outside that path, the clarity cost of inlining outweighs negligible gains.
  - Define only the wrapper variant and metadata the execution path uses — unused sync/async branches in `django/utils/functional.py` decorators add dead attributes and mislead readers
  - Prefer readability over micro-optimization off the request path — inlining only pays off where it is measurably hot
<!-- rule:5874 -->
- Declare class-level collections of unique names (`attrs`, `actions`, `options`) as `frozenset` and extend them in subclasses with `|`: `SubClass.attrs = BaseClass.attrs | frozenset([...])` — Using `|` instead of `+` or `.add()` keeps the base class's shared `frozenset` untouched, so extending in one subclass can't leak entries into siblings; subclass-specific names belong on the subclass, not the base.
<!-- rule:5085 -->
- Hoist identical method bodies from sibling subclasses (e.g. `SessionStorage`/`CookieStorage`/`FallbackStorage` sharing `__repr__` via `BaseStorage`) into their common base — avoids duplicated copies drifting apart once redundant differences are removed — Sibling subclasses that converge on the same implementation (WSGI/ASGI handlers, storage backends) should share one source of truth; leaving copies in each subclass means future fixes must be applied N times and easily diverge, while the base-class version stays consistent.
<!-- rule:1249 -->
- Keep trivial single-use logic inline; only extract a helper, method, or module-level variable when the logic is reused or genuinely complex — premature abstraction adds indirection and lets parallel copies drift. — Keeping one-off logic, formatting, include columns, and compression-format entries inline prevents the indirection and desynchronization that occur when parallel copies of values that must change together—such as a fields list and its include columns, formatting output and its source primitives, or a table entry and its mode—drift apart across separate helpers or module-level variables.
    - Keep formatting helpers to simple interpolation from existing primitives (e.g. `describe()`, `category`) rather than re-deriving or mapping values inline — re-derived values drift out of sync with their source.
    - Compute `include` column lists inline beside the `fields` list they parallel — a helper splits information that must change together.
    - Inline single-use values in `compression_formats` entries (e.g. `compression_formats['lzma'] = (lzma.open, {'format': lzma.FORMAT_ALONE}, mode)`) — module-level variables obscure the table's shape.
<!-- rule:4068 -->
- Use `()` not `[]` for `or` fallback empties when only unpacked or iterated — the empty tuple is a singleton, so it skips a list allocation on every call. — The empty tuple is a shared singleton, so it avoids allocating a new list object each time the fallback evaluates.
<!-- rule:549 -->
- Limit splits to the segment you need — `split(sep, 1)[0]` for the head, `str.partition(sep)` for head+rest, `rsplit(sep, 1)` for the tail, and `str.rfind(sub, 0, i)` (returns `-1` on miss) for backward scans — avoids full-string splitting and the index/`rindex`+try-except bookkeeping that invites off-by-one bugs — Splitting an entire delimited string just to slice out one piece does unnecessary work and forces error-prone index math; `partition`/`rsplit`/`rfind` express the intent directly and return sentinel values (`-1`, empty remainder) that are cheaper to test than exceptions.
<!-- rule:2713 -->
- Access `namedtuple` fields by name and build instances from explicit field values/helpers, not positional slicing or tuple concatenation — field additions/reorderings won't silently corrupt data — Positional slicing/concatenation and `_make()`-based construction couple call sites to field order and add per-call overhead; naming fields and using `_asdict()` keeps code robust to schema changes across Django modules like `db/models`, core management commands, and `db/backends`.
  - Use `_asdict()` for `namedtuple`→`dict` conversion — keeps dict keys in sync with the declared fields
  - In performance-sensitive construction, prefer direct `namedtuple` class instantiation or inlined construction over `_make()` — skip the intermediate iterable unpacking when benchmarks justify it
<!-- rule:2280 -->
- Delegate binary operator dunders to the equivalent named method — re-implementing logic risks divergence between `__add__` and `add()`. — Subclasses may override the named method; bypassing it silently ignores their behavior and forces duplicated logic to stay in sync.
<!-- rule:6361 -->
- Use keyword arguments for all `PathInfo(...)` constructor calls — the positional form is easy to misorder across call sites in `django/contrib/contenttypes/fields.py`, `django/db/models/fields/related.py`, and tests; the keyword form matches the canonical usage in `django/db/models/options.py` and keeps these sites consistent. — `PathInfo` takes multiple same-shaped arguments (target, parent, etc.), so positional calls risk silently swapping fields. Keyword args make intent explicit and align with the existing pattern in `django/db/models/options.py`.
