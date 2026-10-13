<!-- braindump: rules extracted from PR review patterns -->

# Coding Guidelines

## Code Style

<!-- rule:9 -->
- When a review comment establishes a convention, apply it to every affected occurrence in the PR, not just the flagged line — prevents the same style drift recurring across files. — Conventions agreed in review apply to the whole PR; partial fixes leave inconsistencies (e.g. mismatched changes across `composite_decorators.py` and `dom.py`) that reviewers will flag again.
<!-- rule:28 -->
- Use `''.join(...)` over `+=` in loops; pass a generator, not a list (`''.join(x for x in xs)`) — `+=` copies the full string every iteration, and the bracketless form skips building a throwaway list. — 
<!-- rule:27 -->
- Use a `set` for constant membership-test collections, defined with literals (`{a, b, c}`) — `set` lookups are O(1) vs O(n) list scans, and set literals avoid allocating the throwaway `list` in `set([...])`.
<!-- rule:20 -->
- Bind repeated dict-key and class/static-method/attribute lookups to locals in rendering/loop hot paths — avoids per-iteration lookup overhead across every rendered element or child — Hot paths run once per rendered element or child, so attribute and subscript lookups compound into measurable render cost; hoisting them to locals is cheap and keeps the exporter fast as tree size grows.
<!-- rule:22 -->
- Order mutually exclusive branches in hot dispatch code by expected match frequency — the hottest case first. — In renderers and dispatch code like `draftjs_exporter/engines/string.py`, each conditional check costs time on every call. Putting the most frequently matched branch first cuts the average number of comparisons per dispatch, which compounds across large documents.
<!-- rule:14 -->
- Prefer `%`-style interpolation (`'%s' % value`) over `str.format()` — measurably faster in hot rendering/HTML construction paths like `draftjs_exporter` — `%`-style formatting avoids the attribute lookup and parsing overhead of `str.format()`, which compounds in tight loops such as `draftjs_exporter` HTML building; keeping one style repo-wide also avoids mixed-formatting churn in diffs.
<!-- rule:18 -->
- Put each engine in `draftjs_exporter/engines/{engine}.py`; keep `engines/__init__.py` empty and shared interfaces in `engines/base.py` — isolates backends and avoids import cycles — Keeping `__init__.py` empty and the shared interface in `base.py` means engines don't depend on each other, so adding or swapping a backend can't introduce import cycles or break unrelated engines.
<!-- rule:7 -->
- Group items with `collections.defaultdict(list)` instead of `dict.get(key, [])` + append + reassign — fewer lines, no missed-reassignment bugs — The manual idiom is easy to get wrong: forgetting to reassign the list back into the dict silently drops the appended item. `defaultdict` makes the grouping intent obvious and eliminates that bug class. However, when grouped-key iteration order affects behavior and Python <3.7 support is required, make the ordering explicit (`OrderedDict`, sorted keys, or a separate insertion-order list) — pre-3.7 dict iteration order is unspecified. Benchmark before adopting in performance-critical code, since the idiomatic form is not always the fastest.
<!-- rule:25 -->
- Keep rendered attribute strings space-free; join them with a single space and put the tag-name-to-attribute separator in the tag template (e.g. `DOM_STRING.render()`), not in each attribute. — Attributes are produced independently of the tag that hosts them; if each attribute carries its own leading or trailing space, joining them yields doubled spaces (or none, if the separator is forgotten). Keeping attributes space-free and centralizing the separator in the tag template (like `DOM_STRING.render()`) makes serialized output predictable and lets the same attribute be reused across different tags without per-call adjustments. Placed in `draftjs_exporter/AGENTS.md` since the convention is scoped to the exporter's HTML/XML serialization code.
  - Rationale: attributes stay composable and reusable across tags without risking doubled or missing spaces in serialized HTML/XML.

## API Design

<!-- rule:0 -->
- Build and manipulate HTML in `draftjs_exporter` only through `DOM` helpers (`create_element`, `create_document_fragment`, `create_text_node`, `append_child`) — never string interpolation/concatenation or HTML-string parsing. Expose new `DOM` methods for operations callers need (e.g. parsing a fragment into child nodes) instead of reaching into `BeautifulSoup` internals like `.body.children` or `textnode`, and don't replicate the helper's dispatch (e.g. `hasattr(tag, 'render')` checks). `DOM` already dispatches renderable tags and owns the parsing internals, so duplicating that logic or coupling to Soup specifics means every internal change silently breaks callers across `composite_decorators.py`, `style_state.py`, and `wrapper_state.py`. — Building markup as strings or bypassing `DOM` re-implements renderable-tag dispatch and ties callers to `BeautifulSoup` representations (`.body.children`, `textnode`). When those internals change, every call site in `composite_decorators.py`, `style_state.py`, and `wrapper_state.py` breaks; routing through `DOM` keeps a single seam to update and lets the helper add new operations (like fragment→child-node parsing) without touching callers.
<!-- rule:30 -->
- Default optional params to `None` so callers can omit them — no `None` placeholders at call sites — Falsy values such as `0`, empty strings, and `False` are legitimate argument values in `draftjs_exporter` (see `draftjs_exporter/dom.py`, `draftjs_exporter/engines/string.py`), so a truthiness check makes the API drop them without warning and behave differently from what callers expect.
  - Test defaults with `is None`, not `if param:` — truthiness guards silently skip valid falsy values like `0`, `''`, `False`; reject falsy inputs explicitly instead
<!-- rule:12 -->
- Keep example/demo code out of the shipped library — put illustrative modules in `tests/` or `docs/` so demos don't leak into the public API. — Exposing example modules as importable public API commits you to maintaining them and invites users to depend on code that was never meant to be stable. Sibling example files (e.g. alongside `draftjs_exporter/entities.py`) ship in the package and become de facto API.
<!-- rule:24 -->
- Normalize collection constructor args (e.g. `children`) to `[]`, not `None` — keeps `self.children` a real list so callers can call `.append()`/`.extend()` without guard clauses. Encapsulate the special-casing in a factory method if it gets awkward. — A `None` default silently breaks the mutable-list contract; downstream code assuming a list will crash or need defensive checks.
<!-- rule:4 -->
- Implement validation and whitelisting once at the exporter level, not inside individual entity classes — centralizing it prevents validation gaps and duplication as entities are added; see `draftjs_exporter/entities.py`. — Scattering validation across entity classes means every new entity re-implements or forgets checks, and whitelisting rules drift out of sync. Keeping them in the exporter gives a single enforcement point that all entities inherit.

## Dependencies

<!-- rule:5 -->
- Declare shared deps as bounded ranges mirroring upstream in `setup.py` — pins or `>=`-only constraints break resolution — Exact pins and lower-bound-only constraints prevent downstream resolvers from finding a compatible set with the upstream framework; document the supported range in `docs/README.md` and have the CI test matrix exercise both the lower and upper bounds.
<!-- rule:11 -->
- Declare optional backends as named extras in `extras_require` (e.g. `package[html5lib]`, `package[lxml]`), and document `pip install {package}` as the default install with extras listed under an advanced-usage section — keeps version constraints in one place, so docs can't drift from packaging metadata. — Duplicating version constraints in user-facing install commands makes README and `setup.py`/`pyproject.toml` drift apart, so users hit resolver errors from stale pins. Extras put the constraint in exactly one place, and keeping the base `pip install {package}` as the documented default means the common path stays dependency-light while power users opt in via `pip install {package}[{extra}]`.
<!-- rule:10 -->
- If a cleanup or change depends on another pending PR landing first, file a follow-up instead of resolving it here — cross-PR dependencies create merge-order races and block your PR on work that may never merge. — Merging a dependent change before its prerequisite lands produces conflicts or broken state; a follow-up keeps each PR independently mergeable.

## Config

<!-- rule:13 -->
- Dispatch polymorphic config values with `inspect.isclass` first, then `collections.abc.Mapping` — checking `Mapping` first matches mapping *instances* as classes and constructs the wrong exporter. — Config values in `draftjs_exporter/options.py` are polymorphic: a class means "use this exporter", a `Mapping` means "configure this exporter". The dispatch order determines which interpretation wins, and the failure mode determines whether bad config is loud or silent.
  - Raise the project's configuration exception for unsupported value types instead of falling through to default object construction — silent fallbacks in `draftjs_exporter/options.py` hide typos and invalid config instead of surfacing them.
<!-- rule:1 -->
- Make `make` clean/removal steps tolerant of missing paths with `2>/dev/null` and `|| true` (or `rm -rf`) — ...
<!-- rule:15 -->
- Keep lint config in-repo (`.editorconfig`, `setup.cfg`, tool configs) and obey it, not disable it — Shared config keeps formatting consistent across contributors and prevents style noise from bloating diffs

## General

<!-- rule:21 -->
- Accept dotted import-path strings (via `import_string`) as engine/backend selectors, not just class objects — settings files and env vars can't hold class references — Pluggable engine/backend abstraction modules (e.g. in `draftjs_exporter` and any future equivalents) need to be configurable from text sources like settings or env vars, so they must accept dotted paths resolvable with `import_string` in addition to class objects. Lazy, branch-local imports keep optional backends from loading until actually selected, so installing the package or importing a module doesn't drag in deps the user never asked for. Suppressing `ImportError` would hide the exact signal that tells a user their dependency is missing or their path is wrong.
  - Import the chosen backend lazily inside the selecting branch, not at module/class definition time — avoids forcing unused optional deps on every importer
  - Let `ImportError` propagate from backend resolution — missing deps and typo'd paths fail immediately and clearly instead of silently
<!-- rule:29 -->
- Add a `CHANGELOG.md` entry with migration guidance when removing/changing public APIs — users need a path to equivalent behavior, not a silent upgrade break — Without migration guidance, users hitting a removed or changed public API have no documented way to reach equivalent behavior with the new API, forcing them to reverse-engineer the replacement or pin to an old version.
<!-- rule:19 -->
- Name `draftjs_exporter/engines/` classes `DOM` + PascalCase (`DOMString`), not `DOM_STRING`-style — matches PEP 8 class naming and separates class identifiers from the all-caps config strings they map to — The uppercase underscore forms (`DOM_STRING`, `DOM_HTML5LIB`) are config-key spelling; using them as class names conflates the two, so an assistant editing engine modules can't tell at a glance whether a symbol is a class or a config string, and new engines drift from the naming of the existing ones.
<!-- rule:3 -->
- Compare rendered/serialized HTML against the renderer's exact serialized output, not a `str(...)` stand-in — `DOM.create_element` emits `"true"`/`"false"`, and `str()` would produce `"True"`/`"False"`, silently disagreeing with the real output. — Tests that assert HTML by re-serializing with Python's `str()` will pass on the wrong string and fail on real renderer output (e.g. boolean casing differs). Deterministic/sorted attribute emission — as in `draftjs_exporter/engines/string.py` — makes exact string comparison safe without an HTML-aware helper, which `unittest` does not provide.
  - Keep attribute output deterministic (sorted) or normalize before comparing, and don't rely on `assertHTMLEqual` — vanilla `unittest` has no HTML-aware assert, so attribute ordering would cause spurious diffs.

## File-Specific Rules

### `**/Makefile`

<!-- rule:17 -->
- In `**/Makefile`, combine commands that must always run together into one target — separate targets let callers run half the logical outcome, producing broken build state. — ...

### `Makefile`

<!-- rule:16 -->
- Choose `&&` vs `;` in Makefile recipes based on failure intent — `|| true &&` masks errors — `&&` stops the chain when an earlier command fails, while `;` runs subsequent commands regardless of exit status; `|| true &&` is an unclear equivalent of `;` that obscures which behavior is intended.

<!-- /braindump -->