# Python Idioms & Code Organization

> General Python implementation idioms: letting native machinery error, decorator-attribute scanning, stateless probability checks, shared constant sections, consolidating helpers, avoiding duplicated branches, and signal/logging conventions.

**When to check**: When refactoring Python implementation code, consolidating helpers, or applying control-flow and logging idioms.

## Rules

<!-- rule:207 -->
- Default optional `metaclass` to `type` (e.g. `self.metaclass or type`) when creating classes dynamically; let Python's class-creation machinery raise the native error for incompatible bases — hand-rolled `TypeError` pre-checks drift from Python's real metaclass rules and can reject valid base combinations. — Python's own metaclass conflict error is authoritative and stays correct across versions; manual validation duplicates it imperfectly and risks blocking class definitions that Python would accept.
<!-- rule:3830 -->
- Check decorator-set attributes (e.g. `hasattr(fn, 'screenshot')`) when scanning class members for decorated methods, not extra type guards — the attribute only exists on decorated methods, so guards are dead code that can mask mismatches. — Guard code can never fire on undecorated members, and if the decorator changes its marker name the guard silently swallows the failure instead of surfacing it.
<!-- rule:4331 -->
- Use a stateless `random.random() < probability` check with a constant `p` for culling/sampling decisions (as in `django.core.cache.backends.db`'s `cull`) — stateful rotation handlers and ranged-counter comparisons introduce mutable state and drift, making cull rates hard to reason about and test. — Stateful rotation/counter approaches introduce mutable state and drift over time, so the effective cull rate becomes hard to predict or test. A direct, stateless probability check keeps behavior deterministic in expectation and independent of prior calls.
<!-- rule:5044 -->
- Merge ordered lists with `stable_topological_sort` — hand-rolled order dicts/counters drift and break relative-order determinism. — Reusing `stable_topological_sort` keeps relative-order merging deterministic and avoids bespoke dependency-graph bugs; explicitly seeding dependency-free nodes in a `defaultdict` graph prevents them from being silently dropped from the first output set.
  - Register dependency-free nodes (e.g. each input list's first item) in its graph even with `defaultdict` — nodes must exist to land in the first output set; add a comment saying so.
<!-- rule:652 -->
- Route all IDNA/Punycode encoding through `django.utils.encoding` — one helper, no parallel encode/error-handling in `django/utils/html.py`, `django/core/validators.py`, `django/core/mail/utils.py`. — Parallel IDNA implementations drift on edge cases and error handling; a single canonical helper in `django.utils.encoding` keeps encoding behavior and error semantics consistent across every call site.
<!-- rule:705 -->
- Search for an existing `HTMLParser` subclass before adding new parser logic — prevents divergent parsing behavior across `django.utils.text` and `django.test.html`. — HTML parsing appears in both test helpers and production utilities in Django. Duplicated subclasses mean truncation/limit guards silently diverge, producing inconsistent parsing and latent bugs in `TruncateHTMLParser` callers.
  - Extract shared parsing behavior into a common base class/mixin in a module importable by both test and non-test code (e.g., `django.utils.text`, `django.test.html`).
  - Keep boundary/limit/truncation guards in the base `TruncateHTMLParser.feed()` and override only behavior hooks like `process()` in subclasses — duplicating `feed()` drifts the safety limits out of sync.
<!-- rule:700 -->
- Keep `Deprecated` entries out of main spec-derived constant sets; group them under a separate `# Deprecated` section — prevents dead/non-standard values from being treated as current — Mixing `Deprecated` entries into the main spec-derived constant sets makes code that consumes them — enumerations, validation, form choices, or generated lookups — treat dead, non-standard values as still current, so keeping them in a separate `# Deprecated` section preserves the main set as an accurate reflection of the live spec.
<!-- rule:5894 -->
- Add explicit `\n` when replacing `print()` with `write()` on plain streams, but omit it for wrappers like Django's `OutputWrapper` that already append line endings — prevents doubled or missing newlines in CLI output. — `print()` always appends a newline, but `write()` on file-like objects does not; `OutputWrapper` (Django's `self.stdout`/`self.stderr` in management commands) does, so adding `\n` there produces blank-line artifacts.
<!-- rule:5924 -->
- Restructure to avoid pre-transform values; if intentional, comment why — prevents stale duplicates. — Restructure to avoid pre-transform values; if intentional, comment why — prevents stale duplicates.
<!-- rule:6030 -->
- In branch-heavy `formfield()` overrides, select the branch object and `defaults`, then make one `obj.formfield()` call with `{**defaults, **kwargs}` — prevents branches from duplicating `super().formfield()` calls or diverging in their returns — Consolidating the merge into a single `obj.formfield()` call keeps every branch using the same call shape, so adding a parameter or fixing a default only needs one edit and branches can't silently drift apart.
<!-- rule:3945 -->
- Use `asgiref.local.Local` instead of `threading.local` for context-local storage (see `django/utils/translation/trans_real.py`) — `threading.local` is thread-scoped only, so state bleeds across async tasks and requests — `threading.local` keys storage by OS thread, but Django runs multiple async tasks on one thread, so values leak between requests/tasks. `asgiref.local.Local` is context-local and behaves correctly under both sync and async execution; `django/utils/translation/trans_real.py` is the canonical in-repo example.
<!-- rule:6389 -->
- Ignore signals with `signal.SIG_IGN`, not a no-op handler like `lambda sig, frame: None` — the OS-level disposition avoids per-signal Python callbacks — Two related conventions for signal handling: `SIG_IGN` delegates ignoring to the OS/kernel, so no Python frame runs per signal, while a no-op handler installs a callable that must be invoked; tests should check the disposition via `signal.getsignal()` rather than calling the handler, which would pass even if the wrong handler were installed.
  - Assert `signal.getsignal(sig) is signal.SIG_IGN` in tests instead of invoking the handler — verifies the installed disposition, not its (absent) behavior
<!-- rule:1275 -->
- Put elapsed duration first in timing lines (`0.50s call test_this.py::TestCase::test_method`) — leading durations align vertically for easier scanning — Placing durations at the start of each line keeps timing output visually aligned, so scanning a run for slow tests/records doesn't require reading past variable-length identifiers on every line.
<!-- rule:5896 -->
- Log computed config values once, after all adjustments — the log should show the effective value users actually get, not an intermediate one — Emitting the log mid-computation or before later adjustments produces misleading output: users read the log as the effective configuration, so any subsequent override or reset makes the earlier message stale and wrong. Logging each change where it happens keeps the trail accurate without duplicating the initial computation.
  - Log overrides or resets at the point they occur — keeps the logged value in sync with what is actually in effect
