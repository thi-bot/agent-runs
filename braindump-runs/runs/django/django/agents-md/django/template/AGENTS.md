<!-- braindump: rules extracted from PR review patterns -->

# django/template/ Guidelines

## API Design

<!-- rule:5071 -->
- In `django/template/backends/*.py`, forward `stream` to the wrapped engine's `render()`, or raise if unsupported — never silently yield one chunk. See `dummy.py`. — Silently downgrading `stream=True` to a single chunk hides that the backend can't stream, so callers relying on incremental output get silent misbehavior instead of a clear error.
<!-- rule:1840 -->
- Extend the template loader API instead of type-checking loaders — add `get_dirs()` to `Cached_Loader` and call `loader.get_dirs()` in `django/contrib/admindocs/views.py`, not `isinstance(loader, Cached_Loader)` — Loaders are a polymorphic collection sharing one interface; `isinstance` checks against a concrete class in `django/contrib/admindocs/views.py` break as soon as another loader (`filesystem`, `app_directories`, third-party) reaches the caller, and they leak `Cached_Loader` internals into consumer code. Pushing the method down onto the loader API keeps every loader substitutable and lets consumers stay agnostic about which loader they were handed. When a method truly isn't guaranteed on all loaders, guard with `hasattr(loader, "get_dirs")` before calling it — that preserves backward compatibility for out-of-tree loaders that haven't adopted the new method yet, instead of raising `AttributeError` at runtime.
<!-- rule:5841 -->
- Coerce every rendered fragment with `str()` and join once with `''.join(...)` at render boundaries (e.g. `NodeList.render`, `ForNode`) — fragments may be strings *or* lists of strings, so assuming a string corrupts output. — The Django template `Node` API allows any render boundary to return either a string or a list of strings, so code that assumes a string fragment (e.g. `str.join` calls on uncoerced values) will mangle output. Coercing each fragment with `str()` before a single `''.join(...)` normalizes this contract. The split between `Node.render()`/`stream()` means subclasses only need to implement `stream()`; overriding `stream()` on nodes that already render a single value duplicates the join logic and breaks the shared default.
  - Implement the default `Node.render()` as `''.join(self.stream(context))` — subclasses then only define `stream()`, keeping fragment joining in one place.
  - Don't override `stream()` on single-value nodes like `VariableNode`/`TextNode` — they render directly and overriding risks double-joining.
<!-- rule:4571 -->
- In template tag `Node.render()`, pass context-derived output through `render_value_in_context(value, context)` — Direct returns skip autoescape and diverge from `{{ var }}` behavior; `asvar` output can stay raw since escaping happens at variable render time. For known strings, `conditional_escape(value)` guarded by `if context.autoescape` is equivalent.
<!-- rule:3983 -->
- Derive end-tag names from the opening token (`f"end{tokens[0]}"`) instead of hard-coding `endpartialdef` — hard-coded literals break when a tag is aliased or renamed. — Deriving the end-tag name keeps `partialdef`/`endpartialdef` (and any future alias) in sync, and self-nesting support is what lets templates build partials out of partials without parse errors.
  - Let paired tags nest inside themselves and cover it with a test — `partialdef` inside `partialdef` must parse, not terminate at the first end tag.

## Error Handling

<!-- rule:2206 -->
- In `django/template`, emit non-fatal authoring/config issues as warnings (`templates.W003`) and reserve errors for conditions that break rendering — sites can run with a misconfigured template instead of crashing. — The rationale explains why the rule matters in the codebase — the bug, incompatibility, or inconsistency it prevents.
  - Emit template warnings unconditionally, not gated behind `settings.DEBUG` — config problems still matter in production, where they're hardest to diagnose.
  - Surface template warnings through the template-context warning mechanism so name/line context is attached — a bare `warnings.warn` gives users no location to fix.
  - Document in release notes when exact template-name/path branching won't detect templates that extend or override the target — the silent miss otherwise looks like a bug.
<!-- rule:4572 -->
- Gate autoescape on `expr.is_var or expr.filters` for direct tag output — literal-rooted filters like `""|add:fmt` still resolve context vars, so `is_var` alone can emit unescaped output (see `NowNode.render`) — Rationale: A `FilterExpression` whose root is a literal (e.g. `""|add:fmt`) can still pull data from context, so checking only `FilterExpression.is_var` misclassifies it as safe and skips escaping — an XSS hole in template tags like `NowNode.render` that output the expression directly.

## General

<!-- rule:3982 -->
- Use the regex match object directly (`m["name"]`, `m.start()`, `m.end()`) in template partial/tag scan loops and return the matched slice inside the loop — unpacking all groups or accumulating intermediate span/result variables obscures intent for no benefit in these scanners

## File-Specific Rules

### `django/template/base.py`

<!-- rule:5856 -->
- Document `annotate_exception` as the contextmanager that adds debug line info to template rendering errors — it's the source of the line numbers users see when debugging `TemplateSyntaxError`s — These three docstrings form a coordinated contract in `django/template/base.py`: `annotate_exception` is where debug line-number context is injected into rendering failures, and `Node.render_annotated` / `Node.stream_annotated` (or their overrides) decide whether that annotation runs at all. Documenting each piece — including overrides that bypass the default handler — keeps the debug-info flow discoverable, so future changes don't accidentally strip line numbers from the errors users rely on to locate template bugs.
  - Keep `Node.render_annotated` / `Node.stream_annotated` docstrings focused on rendering/streaming and the debug context attached on error — other errors surface without this annotation
  - Note in `render_annotated` overrides when they return directly, opting out of the default exception annotation — an undocumented opt-out silently drops line context from user-visible errors
<!-- rule:5897 -->
- Replace `tag_re.split()` calls in `django/template/base.py` `Lexer`/`DebugLexer` with a helper named `split` implemented as a single `tag_re.finditer()` generator yielding `(token_string, (start, end))` — the matching name and one-pass shape keep it a drop-in for the regex it replaces, so call sites need no changes. — Mirrors the regex API it replaces, keeping it drop-in compatible
<!-- rule:5907 -->
- Don't add `Lexer.split()` in `django/template/base.py` just so `DebugLexer` can inherit `Lexer.tokenize()` — `DebugLexer` can afford to be slow, but the non-debug `Lexer.tokenize()` path runs on every template render and must stay fast. — Refactoring `Lexer.tokenize()` into a shared `Lexer.split()` helper for `DebugLexer`'s benefit risks adding overhead (extra calls, branching, allocations) to the hot path used by all normal template rendering. Debug tooling can absorb slowdowns; production lexing cannot.
<!-- rule:5906 -->
- Name per-token source strings `token_string` in `Lexer`/`DebugLexer` (`django/template/base.py`) — mirrors `create_token()`'s parameter and the `template_string` attribute, so the same string isn't referred to by an ambiguous name like `bit` across the lexer. — Consistent naming across `token_string`, `create_token()`'s parameter, and `template_string` makes the source-string roles in the lexer obvious at a glance; vague names like `bit` obscure which string is the raw token text.
<!-- rule:5855 -->
- Keep `Node.render()` as the public extension point in `django/template/base.py` — `render_annotated` overrides must delegate to `self.render()` so third-party subclasses keep working. If a fast path must bypass it, add benchmark evidence and an `__init_subclass__` guard that detects unchanged inherited optimized overrides, warns subclasses to supply their own, and falls back to `Node.render_annotated`; pair the optimization with class-level wins like `__slots__` rather than tuning the method in isolation. — Subclasses in the wild override `Node.render()`; bypassing it silently breaks their behavior. The `__init_subclass__` guard surfaces the incompatibility at class-definition time instead of in production, and class-level optimizations like `__slots__` often beat method-level tweaks without changing the extension contract.

<!-- /braindump -->