<!-- braindump: rules extracted from PR review patterns -->

# wagtail/tests/ Guidelines

## Testing

<!-- rule:2427 -->
- Keep `numchild` (and `path`/`depth`) in sync when editing pages in `wagtail/tests/testapp/fixtures/*.json` — stale tree metadata breaks `get_children()`/`get_descendants()` in tests — Wagtail's tree queries rely on denormalized `numchild`/`path`/`depth`; if a fixture's ancestor `numchild` doesn't match the pages actually present, tree traversal and `Page` relations silently return wrong results in tests. Scope: `wagtail/tests/testapp/fixtures/`. Category: testing.
<!-- rule:2827 -->
- One restriction combination per copy-behavior test, with a distinct source parent and destination parent — isolates which restriction actually blocks the copy — Reusing parents or combining restriction scenarios makes it impossible to tell which source-page, parent, or destination restriction caused the copy to succeed or fail, so a regression in one rule can be masked by another.
<!-- rule:892 -->
- To test `PROTECT`ed deletion/purge in management commands, add a test model with `ForeignKey(..., on_delete=models.PROTECT)` pointing at the target, then invoke the command. — Proves the command aborts on protected rows rather than silently cascading or crashing.
<!-- rule:1915 -->
- Combine layering flags (e.g. `for_specific_subqueries`) with `.specific()` in tests and assert which queryset receives the operation — flags can silently no-op on the unexercised layer. — Flags that toggle between the base queryset and the specific-subquery layer are easy to wire up wrong, so tests must cover each layer explicitly. Add these cases in `wagtail/tests/test_page_queryset.py` alongside existing layering tests.

## General

<!-- rule:2734 -->
- Add an inline comment for any non-obvious condition in `wagtail/tests` | ... — ...

<!-- /braindump -->