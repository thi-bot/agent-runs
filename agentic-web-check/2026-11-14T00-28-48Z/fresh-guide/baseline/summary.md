## Agentic Web Check: 88/100

**https://guide.wagtail.org/en/** · behavioural verification, 3 tasks (baseline agent) · v0.1.0 · methodology v1

**1 of 3 behavioural tasks did not pass (1 FAIL)**

| Dimension | Score | Pass | Warn | Fail | Scored |
|---|---:|---:|---:|---:|---:|
| PERCEPTION | 100 | 9 | 0 | 0 | 9/9 |
| NAVIGATION | 92 | 4 | 2 | 0 | 6/7 |
| INTERACTION | 100 | 9 | 0 | 0 | 9/9 |
| MACHINE INTERFACES | 100 | 5 | 0 | 0 | 5/6 |
| RELIABILITY | 100 | 5 | 0 | 0 | 5/5 |
| SAFETY | 92 | 3 | 2 | 0 | 5/7 |
| TASK SUCCESS | 67 | 2 | 0 | 1 | 3/3 |

### ⚠️ Warnings (4)
- **Menus do not depend on hover** (`hover-only-menus`): 3 navigation links are only revealed on hover.
- **WebMCP tools declare safety annotations** (`webmcp-tool-annotations`): 1 of 5 WebMCP tools lack safety annotations.
- **Site search is exposed** (`search-available`): No search control or SearchAction found on the start page.
- **Downloads and new windows are announced** (`download-and-popup-links`): 6 of 6 download/new-window links are not announced.

### Behavioural tests
| Task | Verdict | Steps | Reason |
|---|---|---:|---|
| Find the company's contact information (an email address or phone number). | FAIL | 1 | no control matched keywords [contact, contact us, get in touch, support, email, phone, contacto, address] on https://gui |
| Find the page describing the privacy policy or terms of service. | PASS | 1 | success criteria satisfied after 1 actions |
| Find a page that explains what the company or product does (about, help or documentation). | PASS | 1 | success criteria satisfied after 1 actions |

### Suggested fixes
1. **Menus do not depend on hover**: Expose submenus through a <button aria-expanded> toggle, or render submenu links in the page (footer sitemap) so they are reachable without hover.
2. **WebMCP tools declare safety annotations**: Add annotations: { readOnlyHint: true } for read tools and { consequentialHint: true } for mutating tools; do not use toolautosubmit on consequential forms.
3. **Site search is exposed**: Expose search as <form role="search"> with a labelled <input type="search">, and declare a SearchAction in WebSite JSON-LD.
4. **Downloads and new windows are announced**: Say "(PDF)", "(download)" or "(opens in new tab)" in the link text or aria-label.

<sub>1 pages · 10.8 s · 2026-11-14T00:30:48.880Z · [methodology](https://github.com/ericovirgy/agentic-web-check/blob/main/docs/SCORING.md)</sub>