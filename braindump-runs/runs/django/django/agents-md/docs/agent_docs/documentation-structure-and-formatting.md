# Documentation Structure & Formatting

> reST markup conventions, link lists, unit formatting, file-extension literals, lexer names, reminders, and preserving wording when restructuring.

**When to check**: When formatting documentation (reST markup, lists, units, cross-references) or restructuring existing docs

## Rules

<!-- rule:2457 -->
- Render file extensions in `docs/` as ReST inline literals with a leading dot (``.po``), not bare text (`po`). Use current, correct extension/format names — `.xsl`, `.tar.xz`/"XZ archive" — not `.xls` or legacy names like "LZMA". — Bare `po` reads as prose rather than a filename, and doubled literals keep extension mentions rendering consistently across the docs tree; renamed formats (LZMA → XZ, xls → xsl) leave readers chasing formats the project no longer uses.
<!-- rule:4190 -->
- Mirror headings, examples, and "is preferable to" blocks across parallel bulk-method docs (e.g. `bulk_create` vs `bulk_update`) — readers diff these sections side-by-side, so mismatched structure hides real differences. — Parallel bulk-method docs are read side-by-side, so mismatched headings, examples, and prose caveats make readers assume behavior is identical when it differs or miss niche edge cases entirely, turning the documentation into a source of silent misuse of `bulk_create` and `bulk_update`.
  - Keep niche bulk-method caveats as bullet points, not prose — edge cases in `docs/ref/models/querysets.txt` and `docs/topics/db/optimization.txt` need to stay scannable.
<!-- rule:4428 -->
- Strip LLM artifacts like `[cite: ...]` and use valid reStructuredText roles/directives for real references — bogus markup breaks the docs build and renders as garbage — LLM-generated docs frequently contain `[cite: ...]` markers and invented markup that Sphinx can't parse, causing build failures and broken output. Isolating AI/model authorship notes in their own section keeps contributor instructions focused and unambiguous.
  - Keep AI authorship/model-name guidance in a dedicated section, not mixed into unrelated contributor instructions — readers of `docs/` need to know which part is policy vs. task instructions
<!-- rule:3681 -->
- Format data sizes with a space before the unit (`100 KB`, `2.5 MB`), not concatenated (`100K bytes`, `8K bytes`) — keeps unit notation consistent across docs. — Docs are written in reStructuredText (e.g. `docs/internals/security.txt`); consistent data-size notation avoids ad-hoc formats like `8K bytes`, and underlines shorter than their headings break the Sphinx build.
  When editing a reStructuredText heading, resize its section underline to match the heading text — mismatched underlines trigger Sphinx build warnings/errors.
<!-- rule:3809 -->
- Preserve wording, qualifiers, and domain terms when reformatting docs into tables/lists — paraphrasing silently drops meaning reviewers rely on — Reformatting docs into tables/lists without preserving exact wording, qualifiers, and domain terms silently alters `docs/` meaning, so reviewers may rely on inaccurate, unsearchable, or inconsistent guidance that no longer matches the codebase's actual rules.
<!-- rule:6377 -->
- Use registered Pygments lexer names in `.. code-block::` directives — unknown names silently break syntax highlighting or trigger docs build warnings — Verify the lexer against the Pygments lexer list rather than assuming the language or framework name is registered; unregistered names degrade rendered docs and can fail the Sphinx build.
<!-- rule:1175 -->
- In `docs/` bullet lists, format standards/tools as `` `Full Name (ACRONYM) version` — one-line scope `` and link the project how-to — bare names/link labels force readers off-page to decode context — Opaque acronyms, versions, and bare links in `docs/internals/contributing/` (e.g. accessibility pages) leave readers guessing what each item covers; naming it fully, stating its scope, and pointing at a project-authored how-to keeps them reading in place.
<!-- rule:1922 -->
- Use `packages = find:` (not `:find`) in `setup.cfg` examples — readers copy-paste docs into real configs, so the inverted form spreads broken setuptools directives. — The rule concerns documentation/config examples and evidence is scoped to the docs directory. It is not a cross-file synchronization rule and is broader than a single file, so a directory-scoped AGENTS.md in docs/ is the best match. This makes the rule discoverable for anyone editing documentation examples under docs/ without incorrectly globalizing it to the whole repository.
<!-- rule:2268 -->
- Add removal-reminder comments above temporary doc sections, listing sections to delete and anchors/references to update — stops orphaned links when cleanup finally happens — A section flagged for future removal is easy to delete and easy to leave dangling cross-references behind. Anchoring the reminder to the section heading (rather than a separate TODO file or tracker) keeps the instruction visible to whoever edits that section next, and naming both the sections to delete and the anchors/references to update turns the removal into a complete checklist instead of a half-done edit.
<!-- rule:4496 -->
- Match the file's existing `|` delimiter convention in reStructuredText link lists: `docs/index.txt`-style tutorial index lists end every `:doc:` line with a trailing `|`, while inline link lists use `|` only between items (no trailing separator) — mixing conventions renders lists inconsistently and makes diffs noisy. — Tutorial index lists and inline link lists use different `|` placements; following the surrounding file's pattern keeps rendered output and diffs consistent.
