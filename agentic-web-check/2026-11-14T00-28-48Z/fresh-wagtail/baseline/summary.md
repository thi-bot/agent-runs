## Agentic Web Check: 92/100

**https://wagtail.org/** · behavioural verification, 3 tasks (baseline agent) · v0.1.0 · methodology v1

| Dimension | Score | Pass | Warn | Fail | Scored |
|---|---:|---:|---:|---:|---:|
| PERCEPTION | 93 | 7 | 2 | 0 | 9/9 |
| NAVIGATION | 88 | 5 | 0 | 1 | 6/7 |
| INTERACTION | 100 | 9 | 0 | 0 | 9/9 |
| MACHINE INTERFACES | 100 | 4 | 0 | 0 | 4/6 |
| RELIABILITY | 95 | 4 | 1 | 0 | 5/5 |
| SAFETY | 65 | 2 | 0 | 1 | 3/7 |
| TASK SUCCESS | 100 | 3 | 0 | 0 | 3/3 |

### ❌ Failures (2)
- **Forms submit safely** (`forms-safe-transport`, weight 7): 1 forms or credential fields submit unsafely.
- **Menus do not depend on hover** (`hover-only-menus`, weight 3): 86 navigation links are only revealed on hover.

### ⚠️ Warnings (3)
- **No runtime errors during load** (`console-errors`): 2 runtime errors or failed scripts.
- **Control names are specific, not repeated or generic** (`ambiguous-control-names`): 0 generic names and 1 names reused for different destinations.
- **Headings form a usable outline** (`heading-structure`): 1 heading problems across 1 pages.

### Behavioural tests
| Task | Verdict | Steps | Reason |
|---|---|---:|---|
| Find the company's contact information (an email address or phone number). | PASS | 1 | success criteria satisfied after 1 actions |
| Find the page describing the privacy policy or terms of service. | PASS | 1 | success criteria satisfied after 1 actions |
| Find a page that explains what the company or product does (about, help or documentation). | PASS | 1 | success criteria satisfied after 1 actions |

### Suggested fixes
1. **Forms submit safely**: Serve pages over HTTPS, post forms to the same origin over HTTPS, and never send passwords with method="get".
2. **Menus do not depend on hover**: Expose submenus through a <button aria-expanded> toggle, or render submenu links in the page (footer sitemap) so they are reachable without hover.
3. **No runtime errors during load**: Fix uncaught exceptions and failed script requests reported during load.
4. **Control names are specific, not repeated or generic**: Make link and button text describe the destination or action ("Read the return policy", "Add Trail Bike to cart"). Avoid "Click here"/"Read more"; use aria-label to disambiguate when visual text must stay short.
5. **Headings form a usable outline**: One h1 per page naming the page; nest h2/h3 without skipping levels; no empty headings.

<sub>1 pages · 19.6 s · 2026-11-14T00:31:09.158Z · [methodology](https://github.com/ericovirgy/agentic-web-check/blob/main/docs/SCORING.md)</sub>