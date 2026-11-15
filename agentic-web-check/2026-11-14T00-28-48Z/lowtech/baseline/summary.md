## Agentic Web Check: 84/100

**https://solar.lowtechmagazine.com/** · behavioural verification, 3 tasks (baseline agent) · v0.1.0 · methodology v1

**1 of 3 behavioural tasks did not pass (1 FAIL)**

| Dimension | Score | Pass | Warn | Fail | Scored |
|---|---:|---:|---:|---:|---:|
| PERCEPTION | 96 | 8 | 1 | 0 | 9/9 |
| NAVIGATION | 79 | 3 | 2 | 1 | 6/7 |
| INTERACTION | 97 | 6 | 0 | 1 | 7/9 |
| MACHINE INTERFACES | 78 | 2 | 1 | 1 | 4/6 |
| RELIABILITY | 95 | 4 | 1 | 0 | 5/5 |
| SAFETY | 96 | 2 | 1 | 0 | 3/7 |
| TASK SUCCESS | 67 | 2 | 0 | 1 | 3/3 |

### ❌ Failures (3)
- **Menus do not depend on hover** (`hover-only-menus`, weight 3): 12 navigation links are only revealed on hover.
- **Structured data (JSON-LD) describes the page** (`structured-data`, weight 3): No JSON-LD found.
- **Targets are large enough** (`target-size`, weight 1): 8 undersized targets.

### ⚠️ Warnings (6)
- **No runtime errors during load** (`console-errors`): 1 runtime errors or failed scripts.
- **Control names are specific, not repeated or generic** (`ambiguous-control-names`): 0 generic names and 2 names reused for different destinations.
- **Common destinations are discoverable from the start page** (`key-pages-discoverable`): Found about, privacy; missing contact, help, terms, search.
- **llms.txt is published and well-formed** (`llms-txt`): No llms.txt published.
- **Site search is exposed** (`search-available`): No search control or SearchAction found on the start page.
- **Downloads and new windows are announced** (`download-and-popup-links`): 8 of 8 download/new-window links are not announced.

### Behavioural tests
| Task | Verdict | Steps | Reason |
|---|---|---:|---|
| Find the company's contact information (an email address or phone number). | FAIL | 1 | no control matched keywords [contact, contact us, get in touch, support, email, phone, contacto, address] on https://sol |
| Find the page describing the privacy policy or terms of service. | PASS | 1 | success criteria satisfied after 1 actions |
| Find a page that explains what the company or product does (about, help or documentation). | PASS | 1 | success criteria satisfied after 1 actions |

### Suggested fixes
1. **Menus do not depend on hover**: Expose submenus through a <button aria-expanded> toggle, or render submenu links in the page (footer sitemap) so they are reachable without hover.
2. **Structured data (JSON-LD) describes the page**: Add JSON-LD for Organization/WebSite on the home page and Product/Offer, FAQPage, ContactPoint or BreadcrumbList on inner pages.
3. **Targets are large enough**: Make interactive targets at least 24×24 CSS px with spacing.
4. **No runtime errors during load**: Fix uncaught exceptions and failed script requests reported during load.
5. **Control names are specific, not repeated or generic**: Make link and button text describe the destination or action ("Read the return policy", "Add Trail Bike to cart"). Avoid "Click here"/"Read more"; use aria-label to disambiguate when visual text must stay short.
6. **Common destinations are discoverable from the start page**: Link contact, help/FAQ, privacy/terms, and search from the header or footer with their conventional names.
7. **llms.txt is published and well-formed**: Publish /llms.txt with an H1, a one-paragraph blockquote and H2 sections of markdown links to the most useful pages.
8. **Site search is exposed**: Expose search as <form role="search"> with a labelled <input type="search">, and declare a SearchAction in WebSite JSON-LD.

<sub>1 pages · 14.7 s · 2026-11-14T00:30:36.715Z · [methodology](https://github.com/ericovirgy/agentic-web-check/blob/main/docs/SCORING.md)</sub>