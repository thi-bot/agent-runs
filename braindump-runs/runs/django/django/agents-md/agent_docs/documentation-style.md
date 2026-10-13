# Documentation Style and General Prose

> General documentation prose, reference wording, precision, licensing statements, module synopses, and spec-deviation notes.

**When to check**: When writing reference docs, docstrings, module documentation, release-facing prose, or user-facing documentation.

## Rules

<!-- rule:828 -->
- Avoid line-number references in comments and docs — use stable identifiers (module, view, symbol names) instead; line numbers go stale as code moves. — Comments and docs citing line numbers break silently when code shifts, misleading readers about what's actually being described.
<!-- rule:2738 -->
- State temporal semantics explicitly in date/time docs (`django/db/models/functions/datetime.py` docstrings, `docs/ref/models/database-functions.txt`): label values as absolute timestamps vs relative durations, note ISO-8601 use — readers can't infer intent from bare values. — Bare date/time values are ambiguous (is `2024-01-01` a timestamp or a one-day duration?); inconsistent precision across side-by-side examples implies a semantic difference that isn't there. Both cause readers to misread API behavior.
  - Use minimal, consistent precision in date/time examples (`django/contrib/messages/restrictions.py`): omit unused time components and align fractional-second digits across comparable examples — stray precision reads as an intentional difference.
<!-- rule:2635 -->
- `docs/` reference pages and settings docs (e.g. `global_settings.py`) for APIs taking externally defined constants or enums: inline the common values plus a short example, and link the authoritative spec only for exhaustive/evolving details. — Readers shouldn't have to chase a single external link (or parse a vague 'listed below') to use a setting — links rot and off-site specs drift out of sync with this repo. Inline the values readers actually need so the page stands alone.
<!-- rule:43 -->
- State the max bound for every variant, not just the largest, and use the matching term (`longest` for length, not `largest`) — users otherwise assume one limit covers all variants and misread context-dependent maxima like `52 or 53`. — Documents in `docs/ref/`, docstrings, and CLI help often cover families of related options (encodings, field lengths, etc.). Stating only the largest bound, or a single fixed number for a value that varies by context, leaves readers assuming the same limit applies everywhere — leading to incorrect code that overflows or errors at runtime. Wrong terminology (`largest` for a length) obscures which quantity the bound actually constrains.
<!-- rule:3796 -->
- Document imports by restriction, not usage: `available only on Windows`, `can be imported from \`module\``, `module-level` (not `in modules`) — restated usage and ticket cites go stale, and vague scope terms mislead readers in `docs`, `tests`, and `django`. — Inline comments that restate where an import is used or cite ticket numbers rot as code changes, while ambiguous phrases like "in modules" leave readers unsure whether behavior is per-module or module-level. Stating availability limits directly (e.g. "available only on Windows"), using consistent release-note phrasing like "can be imported from `module`" instead of example blocks, and writing "module-level" keeps import documentation accurate and unambiguous across the repo.
<!-- rule:6296 -->
- Document spec deviations inline with section refs and assumptions — readers shouldn't need the RFC open to understand behavior — Spec-based algorithms in the codebase (e.g., RFC encoders) often omit or simplify steps; without inline notes, maintainers can't tell whether behavior is intentional or a bug, and security-relevant omissions go unnoticed.
<!-- rule:6140 -->
- In docs prose: use 'especially' (not 'specially') for emphasis, and reserve 'in particular' for non-exhaustive subsets — otherwise use 'in fact', 'indeed', or no transition. Misuse alters the logical scope of a claim (e.g., 'in particular' implies examples, not the whole case), misleading readers about what is being asserted. — Precise transitions preserve the logical relationship between statements: 'specially' means 'for a specific purpose' rather than 'to a notable degree', and 'in particular' signals that the following statement is one instance among others. Using it before a full consequence falsely narrows the claim, so readers infer a restricted scope that the author did not intend.
<!-- rule:1210 -->
- Reference licenses by canonical identifier (`CC-BY-4.0`, not `CC BY 4.0`); for multi-variant families, name the exact variant or use the indefinite article (`the 3-clause BSD license`, `a BSD license`). — Canonical IDs stay machine-parseable and match SPDX tooling; a definite "the BSD license" misstates legal terms since the family spans several licenses. Applies repo-wide, e.g. `docs/faq/general.txt` and `django/contrib/admin/static/admin/img/README.txt`.
<!-- rule:4889 -->
- Write module docstrings and Sphinx `:synopsis:` as noun phrases naming the module's purpose, not its current single class — those docs outlive the class they were written for — Module docs get read after the module grows beyond its original implementation, so naming one class or leading with an article-led implementation detail goes stale and misleads readers about what the module actually provides.
<!-- rule:4544 -->
- Prefer a single-sentence caveat, comment, or docstring over a lengthy warning block — keeps divergence notes scannable and maintainable. — Long warning blocks enumerating fragile edge cases age poorly and bury the actual reason for the divergence; a one-liner preserves discoverability without bloating Django's utils/test and docs with speculative caveats.
<!-- rule:4159 -->
- State preconditions and assumptions in the docstring — prose may add context, but docstrings stay attached to copied code — Docstrings travel with the function when code is read, copied, or reused; preconditions stated only in surrounding prose get lost, leading to callers violating implicit contracts.
