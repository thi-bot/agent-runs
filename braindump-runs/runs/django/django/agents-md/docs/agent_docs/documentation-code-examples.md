# Documentation Code Examples

> Writing correct, runnable, complete, and idiomatic code examples and shell/path snippets in docs.

**When to check**: When adding, editing, or reviewing code samples and command examples in documentation

## Rules

<!-- rule:2374 -->
- In `docs/` examples, mark outcomes with `✓`/`✗` and label snippets `# Good`/`# Bad`, with rationale as an inline comment — uniform annotations keep comparisons scannable across `docs/` — Readers jump between files like `docs/howto/composite-primary-key.txt` and `docs/topics/i18n/translation.txt`; reusing the same markers and `# Good`/`# Bad` labels makes good-vs-bad comparisons instantly recognizable, while inline rationale ties each label to its specific reason rather than a generic convention.
<!-- rule:2619 -->
- Show complete wiring in configuration examples — import primitives from their owning module, include relevant settings, and combine cooperating components — Readers copy examples verbatim; omitting imports or settings leaves them with non-reproducible config and hidden dependencies
<!-- rule:6118 -->
- Prefer idiomatic shorthand in `docs/` examples (e.g. `Count(Star())` over `Count(expression=Star())`) — reflects how users actually write the API, so copied examples work in practice — Documentation examples are copied verbatim by readers; verbose or overly explicit forms misrepresent idiomatic usage, while unexplained shorthand (like `0` for `0.0.0.0`) silently misleads anyone unfamiliar with the convention.
  - Add a brief note when shorthand is unfamiliar (e.g. `0` is `0.0.0.0`) — readers copying examples shouldn't have to reverse-engineer abbreviated values
<!-- rule:5243 -->
- Write doc `<script>` examples as external `<script src=...>` with no inline body — `django-csp` CSP blocks inline scripts, so mixed snippets fail in users' projects (e.g. `docs/ref/csrf.txt`). — Combining `src` with inline content produces an example that runs in previews but breaks under `django-csp`, teaching users a pattern that fails in the real stack.
<!-- rule:3013 -->
- Order docs examples using `Window`/`order_by` by a full date field or all granularity components (e.g. month+day, not just year) — a coarse period leaves row order nondeterministic, so the example may not match what readers actually see. — Keeps documented `Window`/`order_by` examples deterministic within the period being ordered by, so readers copying the snippet get reproducible results.
<!-- rule:3389 -->
- Use `/home/myuser` in docs examples, not `/root` — copy-pasted commands should work for non-privileged users — Examples with `/root` or environment-specific paths imply privileged access that most readers don't have, so commands fail when copied verbatim. Keep `/root` only when the example is explicitly about running as root. Applies throughout the `docs/` tree.
<!-- rule:4578 -->
- Document required workarounds (e.g., wrapping `Address` in `str()` until the underlying limitation is fixed) with a copy-pasteable example placed immediately after the explanatory paragraph — not as an end-of-section note or cross-reference. Readers copy the nearest code block at the point of need, so a workaround buried elsewhere gets missed and users hit the bug it exists to prevent. — Readers copy the nearest code block at the point of need; workarounds relegated to end notes or cross-references get skipped, so users hit the bug the workaround exists to prevent.
<!-- rule:4943 -->
- Comment in docs examples when a role/subsystem is deliberately omitted — signals scope limits to readers — Docs examples like `docs/topics/auth/customizing.txt` often simplify by skipping a major piece (e.g. a permission check or a backend); a short inline note ('out of scope here') stops readers from copying the snippet into production and hitting a missing-role bug.
<!-- rule:5205 -->
- Document backend customization with a complete, copy-paste example, not a partial step — Readers who copy only the features-class method override, or only the `DATABASES` `ENGINE`/`BACKEND` entry, get a non-working backend. Each customization needs all four pieces together: the features-class method override, the database-wrapper subclass, the custom backend's file placement (e.g. `my_backend/base.py`), and the `DATABASES` `ENGINE`/`BACKEND` setting that points to it.
<!-- rule:5926 -->
- In URL/query-string doc examples (e.g. custom list-filter separators/divider chars), avoid `%` — `%` is reserved for percent-encoding (e.g. `%25`), so using it as an example sep/divider misleads readers about escaping behavior — pick a neutral character instead.
<!-- rule:5018 -->
- In docs examples, use `datetime.date.today()` for the current date — `datetime.date.utcnow()` doesn't exist, so copied snippets crash. — Readers copy doc examples verbatim; an API that doesn't exist in `datetime.date` (only `datetime.datetime.utcnow()` exists) produces an `AttributeError` in real code. Since docs examples serve as de facto templates, they must run as written.
<!-- rule:6436 -->
- In docs examples, show binary strings in binary form (e.g., bytes literal) — not decoded text — Showing the decoded form as the example of a binary value misleads readers about what the API returns; label it `decoded` or `interpreted` when that's what you mean.
<!-- rule:5817 -->
- Mirror the operands of the SQL example in any documented cross-database emulation formula (e.g. in `docs/ref/models/querysets.txt`) — verify equivalence by substitution before committing. Differing operands make the docs assert an equivalence that doesn't actually hold, misleading readers about backend behavior. — The rule prevents docs from asserting cross-database equivalences that don't actually hold due to operand mismatches, which would mislead readers about backend-specific behavior.
<!-- rule:4390 -->
- In docs examples that close DB connections before `multiprocessing`/fork, call `.close()` on each connection, not `close_old_connections()` — `close_old_connections()` is gated by `CONN_MAX_AGE` and may skip young connections — which are exactly the ones typically open when a fork happens, so connections leak into the child process. Applies to examples like `docs/topics/db/queries.txt`.
<!-- rule:1537 -->
- For non-obvious implementation details (e.g., internal lifetime or weak-reference behavior), explain concisely in prose; add a short code example only when it shows a user-actionable pattern like limiting object lifetime with function scopes or `del` — examples that merely restate implementation trivia add noise without teaching readers anything actionable — Prose conveys implementation internals more efficiently than code, while code examples only earn their space when users can copy the pattern — like scoping objects to a function or calling `del` to release references. Examples that just mirror what an internal implementation does (e.g., re-demonstrating weak-ref mechanics) bloat docs without helping readers write better code.
