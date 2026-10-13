# Frontend CSS and JavaScript Conventions

> CSS structure, visual/accessibility affordances, JavaScript DOM initialization, URLSearchParams usage, and browser-support cleanup.

**When to check**: When writing or modifying CSS, JavaScript, accessible browser UI, or browser-compatibility code.

## Rules

<!-- rule:390 -->
- Don't use `role="button"` on `<a>` tags to fix link styling — style with CSS instead — `role="button"` overrides an anchor's native link semantics, so screen readers announce it as a button and users lose link affordances (open in new tab, context menu, copy address). Use CSS (e.g. `text-decoration: none`) for visual changes, and reserve `role="button"` only for `<a>` elements that genuinely perform an in-page action rather than navigate.
<!-- rule:2966 -->
- Set dark-mode text colors (`--body-quiet-color`, `--body-medium-color`, `technical_500.html`, `dark_mode.css`) for WCAG AAA contrast — low-contrast grays like `#e0e0e0` are unreadable on dark backgrounds; use `#fff` or near-white for important content. — Light grays that look fine on light backgrounds fail WCAG AAA contrast against Django's dark-mode surfaces, making admin UI and error pages illegible for low-vision users.
<!-- rule:40 -->
- Use the exact `stat` constant for the permission class you mean (`stat.S_IRUSR` for owner-read, not `stat.S_IROTH` for other-read) — a wrong constant silently grants or denies the wrong user class — `stat.S_IROTH` and `stat.S_IRUSR` are both `0o004`/`0o400`-style bits with distinct meanings; picking the wrong one passes tests on a permissive umask but opens or blocks the wrong users in production.
<!-- rule:1037 -->
- Initialize DOM-dependent JS in `DOMContentLoaded` or `defer` `<head>` scripts — not immediately, `async`, or `window.load`. — Immediate or `async` execution runs before the DOM exists and throws null-reference errors; `window.load` waits on images and fonts, delaying init. `defer` and `DOMContentLoaded` guarantee the DOM is parsed without blocking the parser.
<!-- rule:3454 -->
- Always pair `mask` with a paint source like `background-color: currentColor` — a mask only reveals what's painted beneath it — Masks have no fill of their own; without a background, `currentColor`, or similar, the icon/separator renders invisible across Admin CSS and templates.
<!-- rule:2230 -->
- Prefer `URLSearchParams` (`get()`, `has()`) over manual `window.location.search` parsing in JS. — The native API handles encoding edge cases (e.g. `+`, `%20`) that hand-rolled splitting gets wrong, and `get()` already returns `null` for missing keys — so write `urlParams.get(key) || default` instead of a `has()` branch. This also matches the idiom already used across `django/contrib/admin/static/admin/js/`.
<!-- rule:4339 -->
- Group CSS selectors only when their declarations are identical; split when any diverges — an unmatched declaration in a shared block forces later overrides and obscures which rule actually wins in stylesheets like `django/contrib/admin/static/admin/css/changelists.css` and `docs/_theme/djangodocs/static/djangodocs.css`. — When selectors with differing declarations are grouped, the extra declarations silently apply to elements that never should have received them and force override hacks to undo the leakage, making the stylesheet's outcome depend on source order rather than intent.
  - Hoist shared declarations into one grouped selector and keep divergent ones in their own rule — duplicated declarations drift apart over edits, while grouped divergences silently apply styles to selectors that never intended them.
<!-- rule:5840 -->
- Position offscreen skip/focus links with `top: -999px` (or logical props like `inset-inline-start`), and use `margin` for spacing — physical horizontal offsets break RTL layouts; `padding` leaves a gap inside the focus outline — Left/right offsets and padding both assume LTR and physical box spacing. Vertical or logical positioning works in RTL, and `margin` (unlike `padding`) keeps the focus outline tight against the text so it stays fully visible.
<!-- rule:3448 -->
- For decorative CSS `content`, prefer Unicode text over emoji: use `content: '>' / '';` — not `content: url(...)` with explicit sizes — The `/ ''` alternate-text form hides the glyph from screen readers, and text glyphs render consistently across OSes, browsers, and installed fonts, whereas emoji and sized `url()` images vary by platform and bloat the CSS.
<!-- rule:3734 -->
- Focus with `querySelector(selector).focus()` instead of traversal loops or `setTimeout(..., 0)` — simpler targeting works across browsers and avoids timing races — Direct `querySelector(selector).focus()` is reliable across browsers, while manual traversal loops and `setTimeout(..., 0)` hacks add complexity and timing fragility. Clearing focus on mouseup prevents the visual focus ring from sticking after clicks without breaking keyboard accessibility.
  - Call `blur()` on mouseup to clear lingering focus rings — keeps `:focus` styles for keyboard users while suppressing them after mouse clicks
<!-- rule:1093 -->
- Keep browser-compat shims only while their target is in the documented support matrix — delete JS fallbacks, UA branches, legacy meta tags, and IE-era shims (e.g. in `django/contrib/admin/static/admin/js`) once the browser drops out, but keep workarounds like Opera detection in `admin/js/core.js` and JS feature-detection fallbacks while still supported. Stale shims bloat admin assets and obscure the real support boundary. — Ensures the admin frontend code matches what's actually supported — dead UA branches and IE-era fallbacks in static assets make the support matrix unclear and add maintenance weight.
