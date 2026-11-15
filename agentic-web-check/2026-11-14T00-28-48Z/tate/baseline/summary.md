## Agentic Web Check: 52/100

**https://www.tate.org.uk/** · behavioural verification, 3 tasks (baseline agent) · v0.1.0 · methodology v1

**3 of 3 behavioural tasks did not pass (3 BLOCKED)**

| Dimension | Score | Pass | Warn | Fail | Scored |
|---|---:|---:|---:|---:|---:|
| PERCEPTION | 77 | 5 | 3 | 1 | 9/9 |
| NAVIGATION | 73 | 4 | 1 | 1 | 6/7 |
| INTERACTION | 65 | 6 | 2 | 1 | 9/9 |
| MACHINE INTERFACES | 78 | 2 | 1 | 1 | 4/6 |
| RELIABILITY | 65 | 3 | 1 | 1 | 5/5 |
| SAFETY | 87 | 3 | 1 | 0 | 4/7 |
| TASK SUCCESS | 0 | 0 | 0 | 3 | 3/3 |

### ❌ Failures (5)
- **No bot challenge blocks automated browsers** (`challenge-or-bot-wall`, weight 10): The browser hit a bot challenge or access denial.
- **No overlay blocks the page at load** (`overlay-interference`, weight 10): 1 overlays block the page without an accessible dismiss control.
- **Visible labels are part of accessible names** (`label-in-name`, weight 3): 15 controls whose accessible name does not contain their visible label.
- **Menus do not depend on hover** (`hover-only-menus`, weight 3): 31 navigation links are only revealed on hover.
- **Structured data (JSON-LD) describes the page** (`structured-data`, weight 3): No JSON-LD found.

### ⚠️ Warnings (9)
- **Clickable elements are real controls, not generic elements** (`fake-interactive-elements`): 5 clickable elements without a control role (8% of clickables).
- **Navigation links are named and resolvable** (`navigation-links-usable`): 2 of 23 navigation links are unnamed or have no real URL.
- **Controls are native or complete ARIA widgets** (`native-controls`): 2 custom ARIA widgets and 0 drag-only elements.
- **Consequential actions require confirmation** (`consequential-actions-guarded`): 1 of 1 consequential actions execute without a visible confirmation step.
- **No runtime errors during load** (`console-errors`): 1 runtime errors or failed scripts.
- **Pages have a descriptive title and a language** (`document-title-lang`): 1 title/language problems across 1 pages.
- **Headings form a usable outline** (`heading-structure`): 1 heading problems across 1 pages.
- **Controls are keyboard operable** (`keyboard-operability`): 2 keyboard operability problems.
- **llms.txt is published and well-formed** (`llms-txt`): No llms.txt published.

### Behavioural tests
| Task | Verdict | Steps | Reason |
|---|---|---:|---|
| Find the company's contact information (an email address or phone number). | BLOCKED | 0 | captcha: g-recaptcha, recaptcha |
| Find the page describing the privacy policy or terms of service. | BLOCKED | 0 | captcha: g-recaptcha, recaptcha |
| Find a page that explains what the company or product does (about, help or documentation). | BLOCKED | 0 | captcha: g-recaptcha, recaptcha |

### Suggested fixes
1. **No bot challenge blocks automated browsers**: Exempt well-behaved agents (honest UA, Web Bot Auth signatures) from challenges on public pages, or serve a machine-readable alternative.
2. **No overlay blocks the page at load**: Avoid full-page overlays at load; if a consent dialog is required, make it a role="dialog" with a clearly named Accept/Reject button and let the rest of the page work beneath it.
3. **Visible labels are part of accessible names**: Ensure the accessible name (aria-label) contains the visible text of the control.
4. **Menus do not depend on hover**: Expose submenus through a <button aria-expanded> toggle, or render submenu links in the page (footer sitemap) so they are reachable without hover.
5. **Structured data (JSON-LD) describes the page**: Add JSON-LD for Organization/WebSite on the home page and Product/Offer, FAQPage, ContactPoint or BreadcrumbList on inner pages.
6. **Clickable elements are real controls, not generic elements**: Use <button> or <a href> for actions and navigation. If a custom element must stay, add role="button", tabindex="0", a name and keyboard handlers.
7. **Navigation links are named and resolvable**: Use real URLs in href for navigation items; name every nav link; if JavaScript handles navigation, keep a working href as fallback.
8. **Controls are native or complete ARIA widgets**: Prefer native <select>, <input type="date|range|number">; when custom widgets are unavoidable, implement the full ARIA pattern (roles, states such as aria-valuenow/aria-expanded, keyboard support).

<sub>1 pages · 20.7 s · 2026-11-14T00:30:03.691Z · [methodology](https://github.com/ericovirgy/agentic-web-check/blob/main/docs/SCORING.md)</sub>