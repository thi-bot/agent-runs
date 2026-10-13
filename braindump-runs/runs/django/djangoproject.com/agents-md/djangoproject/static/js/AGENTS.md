<!-- braindump: rules extracted from PR review patterns -->

# djangoproject/static/js/ Guidelines

## Code Style

<!-- rule:307 -->
- Prefer `for...of`/`.forEach()` over C-style `for` loops when index isn't needed — avoids off-by-one errors and aligns with JS collection semantics. For `document.querySelectorAll(...)` results, use `.forEach()`; convert non-iterables with `Array.from(...)`. — 
<!-- rule:243 -->
- Model markup variants as data-driven config entries (e.g. `{ selector, getContainer, getText }`) and update all matches together — hardcoding a single selector leaves duplicated or alternate variants unenhanced — DOM enhancement scripts in `djangoproject/static/js/djangoproject.js` often run against repeated or alternate markup; special-casing one selector skips the other instances, producing inconsistent UI. A config-array of `{ selector, getContainer, getText }` callbacks lets one pass cover every variant the same way.
<!-- rule:359 -->
- Define JS helpers inside the existing IIFE, handler, or module scope — no new top-level globals in `djangoproject/static/js/`; `djangoproject/static/js/` files are concatenated/loaded together, so globals collide and shadow each other across pages. — Static browser-only JS under `djangoproject/static/js/` shares one global scope, so a stray top-level `function` or `var` can silently override or be overridden by an identically named symbol in another file, causing hard-to-trace runtime bugs.

## General

<!-- rule:251 -->
- Guard `document.querySelector` calls for optional elements: pass `selector || null` and use `?.` before listeners/property access — empty-string selectors throw and missing nodes break page-level JS in `djangoproject/static/js/djangoproject.js`. — Elements aren't present on every page; `querySelector('')` throws a `SyntaxError` and `null` results crash subsequent `.addEventListener`/property access, taking down unrelated page scripts.
<!-- rule:197 -->
- Name DOM element variables `<purpose>_el` (e.g. `success_el`, `existing_success_el`, `button_el`, `highlight_el`) — generic names like `existing` obscure which element is referenced; drop comments that merely restate the name, since they go stale. — The `_el` suffix makes DOM references scannable across JS files, and purpose-based names like `existing_success_el` disambiguate elements that would otherwise collide when multiple similar ones exist on a page. Restating comments drift out of sync with the code they label, so the name itself should carry that weight.

<!-- /braindump -->