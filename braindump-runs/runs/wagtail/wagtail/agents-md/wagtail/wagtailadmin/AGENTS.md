<!-- braindump: rules extracted from PR review patterns -->

# wagtail/wagtailadmin/ Guidelines

## API Design

<!-- rule:1617 -->
- In `AdminPageChooser` (`wagtail/wagtailadmin/widgets.py`), when the chooser is restricted to a page type, pre-open the page tree at the common path prefix of existing pages of that type — lands editors near relevant content instead of the tree root. — Purely a UX/locality concern: choosers restricted to a page type are almost always about picking from an existing section, so starting at root forces redundant navigation. Deriving the prefix from existing pages (rather than hardcoding) keeps the behavior correct as site structure evolves.
<!-- rule:844 -->
- Use an exact-type mapping for overrides meant only for the exact field type — prevents subclass fields from silently inheriting it — Made the rule actionable by splitting it into two imperative bullets covering the two distinct behaviors (exact-type mapping vs. super call), each with a why: subclass leakage and lost base setup. Preserved the project-specific references (`edit_handlers.py`, `create_{type}_field`) which are the most valuable anchors for AI assistants working in `wagtail/wagtailadmin/`. Added a short scope note to prevent over-generalizing the pattern beyond the module where it applies.
  - In overridden `create_{type}_field` methods, call `super().create_{type}_field()` for the same type — keeps base field creation and setup intact
  - Scope: `wagtail/wagtailadmin/edit_handlers.py` field override logic; other modules should not copy this pattern blindly

## Code Style

<!-- rule:2458 -->
- Match `col#` class tokens with `re.search(r'\bcol\d+\b', classname)`, not a `col1`–`col12` range — survives column-count changes — Range-enumerating regexes must be updated whenever the available column count changes; the generic token shape stays correct and avoids brittle range validation. Relevant in `wagtail/wagtailadmin/edit_handlers.py`.
<!-- rule:2584 -->
- Center icon-only controls with flexbox or symmetric padding in Wagtail admin SCSS — asymmetric padding misaligns buttons when the `::before` icon is absent. — Icon-optional controls (e.g. streamfield block picker buttons) render inconsistently if their alignment relies on `::before` existing; flex centering keeps the clickable area stable across icon states.

## General

<!-- rule:2492 -->
- Add and maintain tests for navigation and breadcrumb helpers that exercise permission edge cases, such as a user with no page permissions or a site with only a single top-level page, to prevent regressions in menu and root-page behavior. — The rule emphasizes the importance of testing edge cases related to permissions in navigation helpers to prevent regressions. This is critical for maintaining the reliability and correctness of menu and breadcrumb behavior in Wagtail admin.
<!-- rule:2502 -->
- Keep capability/requirement messages (e.g., `<noscript>` "JavaScript is required to use Wagtail") at application scope in shared templates like the admin `skeleton.html` — don't soften to section-scoped phrasing like "for full functionality of this section" — Shared skeletons render across every admin page, so section-scoped wording misrepresents a global dependency and confuses users about what actually breaks.

## File-Specific Rules

### `wagtail/wagtailadmin/edit_handlers.py`

<!-- rule:2491 -->
- Implement `html_declarations` in edit handler classes by delegating to `cls.get_child_edit_handler_class().html_declarations()` rather than traversing `related_model._meta.fields` to collect `stream_block` declarations — delegation picks up related-model `StreamField` declarations that manual walks silently miss; add tests asserting those declarations are included. — Hand-rolled `_meta.fields` traversal duplicates logic and diverges from the child handler's own declaration set, so nested `StreamField` declarations get dropped. Delegating keeps edit handler behavior consistent with the child class and tests lock in coverage for related-model fields.

<!-- /braindump -->