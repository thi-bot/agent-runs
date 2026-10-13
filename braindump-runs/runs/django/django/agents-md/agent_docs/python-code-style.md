# Python Code Style and Refactoring

> Python implementation style, control flow, helper extraction, iteration, regex handling, logging levels, and refactoring hygiene.

**When to check**: When writing or refactoring Python control flow, helpers, CLI code, regexes, logging, or module-level utilities.

## Rules

<!-- rule:5141 -->
- notes — Recording notes at the point of change keeps the reasoning, constraints, and open questions attached to the code, so later maintainers don't silently drop deliberate decisions or re-litigate them without context.
<!-- rule:3312 -->
- Test raw label values (`fieldset.name`, label vars), not `str(label)` or slugified versions — `str(None)` is truthy (`"None"`) and non-ASCII slugifies to `""`, so presence checks misfire and headings/fallbacks silently break. — `str(None)` yields truthy `"None"`, and slugifying non-ASCII labels yields `""` — both make presence checks misfire on `fieldset.name`/label vars, dropping headings or triggering wrong fallbacks.
<!-- rule:3545 -->
- Compare `len(parts) > len(other) + 1` directly instead of slicing to `parts[:-1]` just to call `len()` — slicing allocates a full copy, while `len()` is O(1) and states the boundary check plainly — Boundary checks like "does `parts` have extra elements beyond a known prefix" are common in query/AST handling (e.g. `django/db/models/sql/query.py`). Writing them as a slice plus `len()` copies the sequence for no reason and obscures that an off-by-one comparison is intended; comparing lengths against an adjusted bound is allocation-free and makes the boundary explicit.
<!-- rule:3950 -->
- Pass iterables straight to `sorted()`; don't wrap in `list()` — the intermediate copy is redundant — `sorted()` already accepts any iterable (generator expressions, `dict.items()`, etc.), so materializing first just adds an allocation and a needless copy.
<!-- rule:4651 -->
- Group CLI options by feature; place the selector flag before its modifiers — keeps help output scannable and flags discoverable in tests and CI invocations — When options are scattered or modifiers appear before the flag they affect, users can't tell which flags belong together or depend on which. Grouping by feature and ordering selector-first makes `--help` output and workflow invocations self-explanatory, and keeps test-runner and CI flag sets consistent as they grow.
<!-- rule:5057 -->
- Make stateless recursive helpers `@classmethod` and pass needed context (`alias`, `target`) as explicit params — Keeps `self` out of helpers that don't use it and makes each recursive call's real dependencies visible — as done in `django/db/models/sql`.
<!-- rule:3996 -->
- Put generic data-structure helpers (dict wrappers, `Mapping`s) in `django.utils.datastructures`, not in feature modules like `django.template.utils`. — Shared helpers under `django.utils.datastructures` stay importable from any feature module without creating cross-feature dependencies or circular imports, and users expect to find reusable structures there rather than buried in e.g. `django.template.utils`. Names that track the stdlib ABC they implement (`Mapping`) avoid promising immutability the class doesn't actually enforce, so callers don't rely on guarantees that aren't there.
  - Name such classes after their actual semantics — `CaseInsensitiveMapping`, not `ImmutableCaseInsensitiveDict` for a read-only-convention `Mapping`.
<!-- rule:5987 -->
- Call hoisted callables through their local binding, not the original attribute lookup — e.g. use the local `__getattribute__` instead of `super().__getattribute__`, or bind `prepare_value = super().prepare_value` before a comprehension and call `prepare_value(v)` inside it. Repeating the attribute lookup is slower and risks diverging from the binding you already resolved. — hoisting a bound method is only worth it if every call site uses the local; otherwise the code pays for the lookup anyway and can silently drift onto a different target (e.g. mixing `super()` and local `__getattribute__`).
<!-- rule:3222 -->
- Use stdlib `logging` constants (`logging.DEBUG`/`INFO`/`ERROR`) for severity in APIs, config, and thresholds instead of local constants or raw integer verbosity — keeps levels interoperable with `logging`'s own filters, handlers, and `isEnabledFor` comparisons across modules. — Local severity constants and raw integers that duplicate `logging.DEBUG`/`INFO`/`ERROR` silently drift from the stdlib's values, so log records set up by one module (see `django/test/runner.py`, `django/core/checks/messages.py`, `django/contrib/messages/constants.py`) may be filtered or displayed at the wrong level by handlers configured elsewhere. Reusing the stdlib constants guarantees the numeric levels agree everywhere.
<!-- rule:5520 -->
- Anchor regexes with `^...$`/`\A...\Z` or `re.fullmatch` even when using `re.match` — `re.match` only anchors the start, so unanchored patterns silently accept partial or trailing-garbage matches. — `re.match` only checks the beginning of the string, so a pattern like `re.match(r'\d+', s)` will happily match `"123abc"`. Requiring full-string anchoring (`^...$`, `\A...\Z`, or `re.fullmatch`) prevents partial matches and trailing garbage from slipping through validation and parsing logic.
<!-- rule:6258 -->
- Centralize manager copying/creation in `Options.managers` (`django/db/models/options.py`) — keeps one authoritative source for a model's manager instances — Manager resolution in Django is coordinated across `django/db/models/options.py` and `django/db/models/manager.py`. Several mechanisms — `Options.managers` (via `Model._meta`), the descriptor protocol in `ManagerDescriptor`, and per-access resolution in `Manager.__get__` — are involved in materializing managers. Centralizing copying/creation in `Options.managers` and having `ManagerDescriptor` reuse the stored manager (or a cached resolution) prevents divergence between what managers exist and what descriptors return, and avoids re-copying/rescanning the MRO/model `__dict__` on every attribute access (a hot path for model class and instance lookups). When descriptor access would otherwise repeat the same resolution, cache it.
  - Make `ManagerDescriptor` (`django/db/models/manager.py`) reuse the stored manager from `_meta.managers` instead of re-copying it or rescanning the MRO/model `__dict__` on each access — avoids repeated work on every attribute lookup
  - Cache manager resolution wherever repeated access would otherwise duplicate the lookup
<!-- rule:757 -->
- Clean up residual formatting after removing or de-indenting code: de-indent orphaned blocks (e.g. a dangling `else`), delete leftover blank lines, and reflow wrapped expressions so no lone identifier sits on a line — half-formatted edits look like bugs and muddy the diff. — Prevents reviewers from mistaking leftover indentation and stranded lines for actual logic changes.
<!-- rule:253 -->
- Handle escaped backslashes in regex transforms with `(?<!\)`, not naive substitution. — A backreference-carrying alternation can reinsert a captured adjacent metacharacter, silently corrupting the simplified pattern. Prefer one general escape-aware transform over per-input special cases, which drift apart and miss escapes — see `django/contrib/admindocs/views.py` and `django/contrib/staticfiles/storage.py` for the pattern.
<!-- rule:3664 -->
- Iterate the current batch (e.g., `batch_objs`) inside batched ops, not the full input — avoids re-processing the whole collection per chunk (quadratic blowup) — Looping over the full input inside a per-batch loop makes each chunk redo work over the entire collection; describing atomicity, performance, and iteration in per-batch/per-chunk terms (not vague phrases like 'each time' or whole-collection scope) keeps docs matching the actual unit of work.
<!-- rule:5975 -->
- Return tuples as `return a, b` — omit parens for simple values; parenthesize and one-per-line when elements span lines or are complex. — Re-tupling a callee’s return value duplicates its shape, so a later change to that shape silently drops, reorders, or mismatches values instead of propagating the real result, while consistent tuple formatting keeps such multi-value returns easy to scan and diff.
  - Return a call result directly if the method only unpacks and re-tuples it — avoids intermediate variables and drift between the unpack and return.
<!-- rule:2811 -->
- One check per capability: `and`/`or`-combine related guards, positive early return + `else` fallback, sibling `elif is_<backend>` for exclusive cases, parens-wrapped multi-line booleans — Duplicated returns and stacked negated variant checks drift out of sync across `django/db/backends/*` and `django/contrib/gis/db/backends/*`, obscuring which backend hits which branch
<!-- rule:5980 -->
- Resolve delimited field lookup paths iteratively, extracting non-trivial logic into module-level `_`-prefixed helpers — recursion overflows on deep paths, and opaque `reduce`/`getattr` chains (as in `django/db/models` and `django/contrib/admindocs`) hide bugs; comment each step and test invalid path components — Covers why: recursion overflow on deep paths, hidden bugs in opaque chains. Splitting preserves the rule under 100 chars per bullet while keeping rationale intact.
  Split across bullets if needed:
  - Traverse field lookup paths iteratively, not recursively — deep paths raise `RecursionError`
  - Extract non-trivial path resolution into module-level `_`-prefixed helpers, composed by the main helper — keeps each traversal step readable and testable vs. opaque `reduce`/`getattr` chains
  - Comment non-obvious traversal steps and define/test behavior for invalid path components — silent bad lookups are the common failure mode in `django/db/models` and `django/contrib/admindocs` resolution code
  Category: code_style
  Scope: global
  Placement rationale: This is a general code_style rule about how to structure path-resolution/traversal helpers (prefer iteration over recursion, extract logic into named helpers, document non-obvious traversal, test invalid inputs). The evidence spans two distinct directories (django/contrib/admindocs and django/db/models), so it is not scoped to a single module. The rule describes a broadly applicable behavioral/style convention rather than a relationship between two specific files (so cross_file is inappropriate)
  Example of bad code: None
  Example of good code: None
  Figured split into three bullets is cleaner. Here's the single-bullet option if you want it kept together:
  - Keep delimited field-path helpers (e.g. `django/db/models` lookups) iterative via module-level `_`-prefixed helpers, not recursion or inline `reduce`/`getattr` chains — deep paths overflow and hidden traversal steps escape review; comment them and test invalid components
