## Agentic Web Check: 97/100

**https://docs.wagtail.org/en/stable/** · behavioural verification, 3 tasks (baseline agent) · v0.1.0 · methodology v1

| Dimension | Score | Pass | Warn | Fail | Scored |
|---|---:|---:|---:|---:|---:|
| PERCEPTION | 93 | 7 | 2 | 0 | 9/9 |
| NAVIGATION | 86 | 6 | 1 | 0 | 7/7 |
| INTERACTION | 100 | 9 | 0 | 0 | 9/9 |
| MACHINE INTERFACES | 85 | 3 | 0 | 1 | 4/6 |
| RELIABILITY | 100 | 5 | 0 | 0 | 5/5 |
| SAFETY | 100 | 3 | 0 | 0 | 3/7 |
| TASK SUCCESS | 100 | 3 | 0 | 0 | 3/3 |

### ❌ Failures (1)
- **Structured data (JSON-LD) describes the page** (`structured-data`, weight 3): No JSON-LD found.

### ⚠️ Warnings (3)
- **Navigation links are named and resolvable** (`navigation-links-usable`): 1 of 20 navigation links are unnamed or have no real URL.
- **Control names are specific, not repeated or generic** (`ambiguous-control-names`): 0 generic names and 2 names reused for different destinations.
- **Accessibility snapshot fits an agent context budget** (`snapshot-budget`): Largest snapshot: 71,976 chars.

### Behavioural tests
| Task | Verdict | Steps | Reason |
|---|---|---:|---|
| Find the company's contact information (an email address or phone number). | PASS | 1 | success criteria satisfied after 1 actions |
| Find the page describing the privacy policy or terms of service. | PASS | 2 | success criteria satisfied after 2 actions |
| Find a page that explains what the company or product does (about, help or documentation). | PASS | 1 | success criteria satisfied after 1 actions |

### Suggested fixes
1. **Structured data (JSON-LD) describes the page**: Add JSON-LD for Organization/WebSite on the home page and Product/Offer, FAQPage, ContactPoint or BreadcrumbList on inner pages.
2. **Navigation links are named and resolvable**: Use real URLs in href for navigation items; name every nav link; if JavaScript handles navigation, keep a working href as fallback.
3. **Control names are specific, not repeated or generic**: Make link and button text describe the destination or action ("Read the return policy", "Add Trail Bike to cart"). Avoid "Click here"/"Read more"; use aria-label to disambiguate when visual text must stay short.
4. **Accessibility snapshot fits an agent context budget**: Reduce DOM size on key pages: paginate long lists, lazy-render off-screen sections, remove duplicated hidden menus.

<sub>1 pages · 17.9 s · 2026-11-14T00:31:20.073Z · [methodology](https://github.com/ericovirgy/agentic-web-check/blob/main/docs/SCORING.md)</sub>