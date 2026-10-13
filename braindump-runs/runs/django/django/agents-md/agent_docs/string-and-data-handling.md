# String & Data Manipulation

> Correct manipulation of strings, byte sequences, and numeric/collection data: memoryview slicing, sign-aware formatting, str.join casting, math base functions, printability filters, keyed lookups, and Decimal precision.

**When to check**: When slicing bytes, formatting numeric strings, converting formatting calls, filtering characters, or manipulating collections/decimals.

## Rules

<!-- rule:635 -->
- Use `memoryview` for `bytes`/`bytearray` slicing — eliminates intermediate copies — Each slice of `bytes` or `bytearray` allocates a new object; slicing a `memoryview` does not. When slicing the same object repeatedly, create the `memoryview` once and slice the view each time, since view objects are cheap but creating one per slice defeats the purpose.
<!-- rule:1999 -->
- Handle optional signs explicitly in numeral-formatting regex — anchor patterns like `re.sub(r"^(-?),", r"\1", value)` for separator removal and `(?!-?$)` in reversed-string lookaheads for insertion. Unanchored edge operations strand signs in the wrong place and emit malformed output such as `-,333,123`. — Unanchored regex substitutions on formatted numeral strings can match separators next to the sign, producing malformed results like `-,333,123`. The optional-sign anchor keeps sign and digits coherent.
<!-- rule:3435 -->
- Avoid positional index arithmetic or magic offsets to slice lists; split distinct data (e.g., `primary-key` vs. `value` columns) into explicit structures. — Explicit structures stay correct when list layout changes, while index math breaks silently; document any unavoidable offset with an inline comment on the underlying protocol/semantics.
<!-- rule:4118 -->
- Derive filter sets from the full lookup output (e.g. `find_formatters()`) instead of hardcoded entries — keeps filters like `PATH` complete and their names truthful as the lookup grows — Hardcoding a single known entry makes the filter silently incomplete and its name misleading once the lookup returns new values.
<!-- rule:4395 -->
- Call the underlying utility directly when mapping over a collection — don't delegate through a wrapper filter. Going through a higher-level wrapper adds a function call per element, so `map(escape, values)` beats `map(some_wrapper_filter, values)` when the wrapper only forwards to `escape`. — Each extra call is multiplied by the collection size, so wrapper delegation turns a linear map into a linear map with extra overhead per element; direct calls keep the per-element cost at the utility's own cost and make the dependency explicit.
<!-- rule:5386 -->
- Cast elements with `str()` when replacing `%s` formatting with `str.join()` (or keep `%` formatting) — `str.join()` raises `TypeError` on non-strings that `%s` silently coerced, so a naive refactor breaks callers passing ints or objects. — A naive `%s` → `str.join()` refactor breaks callers passing ints or objects: `%s` silently coerces with `str()`, but `str.join()` raises `TypeError` on any non-`str` element.
<!-- rule:5423 -->
- Use `math.log2(x)` / `math.log10(x)` over `math.log(x, 2)` / `math.log(x, 10)` — The dedicated functions are more numerically accurate than the general two-arg `math.log`.
<!-- rule:5976 -->
- Use `str.isprintable()` to filter non-printable chars, not `char in string.printable` — the latter is ASCII-only and strips valid Unicode (e.g. accented letters). — Filters used for filename sanitization and similar tasks must not corrupt Unicode input. `string.printable` contains only ASCII, so membership tests silently drop printable non-ASCII characters. Only fall back to `char in string.printable` when ASCII-only semantics are acceptable and the minor speed gain is justified.
<!-- rule:6420 -->
- Build concatenated messages with a self-contained base (ending punctuation included) — put separators like leading spaces on optional fragments, not as trailing separators on the base. — Prevents stray trailing spaces when optional fragments are absent, and keeps the base a valid standalone message. Also avoids double-separators or missing separators as fragments are conditionally included.
<!-- rule:3097 -->
- Key collections by the attribute callers filter on (e.g. `scheme`) as a `dict` — `dict.get(key, ())` and `any(...)` beat rescanning every entry on each call — Repeated scans across a collection are O(n) per call and obscure intent; a `dict` keyed by the discriminating attribute (e.g. `scheme → values`) lets callers use direct `dict.get(key, ())` lookups and return/`any(...)` expressions instead of iterating every entry.
<!-- rule:4153 -->
- Clear mutable collections (`deque`, `list`) before appending when replacing contents — plain `append()`/`appendleft()` accumulates onto existing elements and leaves stale values behind instead of performing the intended swap. — This matters because a replacement operation that appends to a non-empty deque or list silently retains the old contents, so consumers see duplicated or outdated elements and the collection grows without bound instead of reflecting the intended new state.
<!-- rule:6429 -->
- Use `Decimal(1).scaleb(n)` for `10**n` in hot paths — `Decimal(10).scaleb(n)` scales the coefficient 10 as well, yielding `10**(n+1)`. Keep a separate `n == 0` fast path only when benchmarks show it pays off. — `Decimal.scaleb(n)` multiplies the coefficient by `10**n`, so a `Decimal(10)` base produces `10 * 10**n` — off by a factor of ten and a silent correctness bug in any code computing decimal powers of ten (e.g. rounding/precision helpers like `django/template/defaultfilters.py`). A `Decimal(1)` base makes the coefficient identity, so only the exponent matters. The zero-exponent fast path is optional because it duplicates logic for a case `scaleb(0)` already handles cheaply.
<!-- rule:5224 -->
- Branch on `isinstance(value, str)` when a setting takes a string or iterable of HTTP header values — pass strings through verbatim and only `join` iterables, since splitting/rejoining or stripping whitespace corrupts headers like `Content-Security-Policy` that embed commas in a single value. — HTTP header values may contain commas or significant whitespace (e.g. `Content-Security-Policy` source lists, `Date`, `Accept` parameters), so normalizing a string form mangles valid values; branching on `isinstance(value, str)` in settings like those consumed in `django/middleware/security.py` preserves the caller's exact string while still supporting list/tuple inputs.
<!-- rule:6392 -->
- Use the locale's legal calendar for year numbering in date format/parse, not just name translation — Thai `th` dates need Buddhist Era years (Gregorian + 543), which requires Thai-specific formatter/parser logic beyond editing `django/conf/locale/th/formats.py`; add the offset when formatting and subtract it when parsing, or every Thai year round-trips wrong. — Translating month/day names without adjusting year numbering breaks round-trips and produces wrong years for locales whose legal calendar uses a fixed offset from Gregorian (e.g. Thai Buddhist Era = Gregorian + 543).
