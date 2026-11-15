## Agentic Web Check: 91/100

**https://www.w3.org/** · behavioural verification, 3 tasks (baseline agent) · v0.1.0 · methodology v1

| Dimension | Score | Pass | Warn | Fail | Scored |
|---|---:|---:|---:|---:|---:|
| PERCEPTION | 80 | 7 | 2 | 0 | 9/9 |
| NAVIGATION | 58 | 2 | 2 | 2 | 6/7 |
| INTERACTION | 100 | 7 | 0 | 0 | 7/9 |
| MACHINE INTERFACES | 78 | 2 | 1 | 1 | 4/6 |
| RELIABILITY | 100 | 5 | 0 | 0 | 5/5 |
| SAFETY | 100 | 2 | 0 | 0 | 2/7 |
| TASK SUCCESS | 100 | 3 | 0 | 0 | 3/3 |

### ❌ Failures (3)
- **Menus do not depend on hover** (`hover-only-menus`, weight 3): 53 navigation links are only revealed on hover.
- **A sitemap is published** (`sitemap`, weight 3): No sitemap.xml and no Sitemap directive in robots.txt.
- **Structured data (JSON-LD) describes the page** (`structured-data`, weight 3): No JSON-LD found.

### ⚠️ Warnings (5)
- **Interactive controls have accessible names** (`control-accessible-name`): 1 of 48 interactive controls (2%) have no accessible name.
- **Clickable elements are real controls, not generic elements** (`fake-interactive-elements`): 8 clickable elements without a control role (14% of clickables).
- **Navigation links are named and resolvable** (`navigation-links-usable`): 1 of 5 navigation links are unnamed or have no real URL.
- **llms.txt is published and well-formed** (`llms-txt`): No llms.txt published.
- **Site search is exposed** (`search-available`): No search control or SearchAction found on the start page.

### Behavioural tests
| Task | Verdict | Steps | Reason |
|---|---|---:|---|
| Find the company's contact information (an email address or phone number). | PASS | 1 | success criteria satisfied after 1 actions |
| Find the page describing the privacy policy or terms of service. | PASS | 1 | success criteria satisfied after 1 actions |
| Find a page that explains what the company or product does (about, help or documentation). | PASS | 2 | success criteria satisfied after 2 actions |

### Suggested fixes
1. **Menus do not depend on hover**: Expose submenus through a <button aria-expanded> toggle, or render submenu links in the page (footer sitemap) so they are reachable without hover.
2. **A sitemap is published**: Publish /sitemap.xml and reference it with a Sitemap: line in robots.txt.
3. **Structured data (JSON-LD) describes the page**: Add JSON-LD for Organization/WebSite on the home page and Product/Offer, FAQPage, ContactPoint or BreadcrumbList on inner pages.
4. **Interactive controls have accessible names**: Give every button, link and form control a visible text label or an aria-label/aria-labelledby. For icon buttons use aria-label; for inputs use <label for>.
5. **Clickable elements are real controls, not generic elements**: Use <button> or <a href> for actions and navigation. If a custom element must stay, add role="button", tabindex="0", a name and keyboard handlers.
6. **Navigation links are named and resolvable**: Use real URLs in href for navigation items; name every nav link; if JavaScript handles navigation, keep a working href as fallback.
7. **llms.txt is published and well-formed**: Publish /llms.txt with an H1, a one-paragraph blockquote and H2 sections of markdown links to the most useful pages.
8. **Site search is exposed**: Expose search as <form role="search"> with a labelled <input type="search">, and declare a SearchAction in WebSite JSON-LD.

<sub>1 pages · 16.1 s · 2026-11-14T00:30:20.783Z · [methodology](https://github.com/ericovirgy/agentic-web-check/blob/main/docs/SCORING.md)</sub>