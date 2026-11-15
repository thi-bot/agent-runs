## Agentic Web Check: 80/100

**https://wagtail.github.io/draftjs_exporter/** · behavioural verification, 3 tasks (baseline agent) · v0.1.0 · methodology v1

**1 of 3 behavioural tasks did not pass (1 FAIL)**

| Dimension | Score | Pass | Warn | Fail | Scored |
|---|---:|---:|---:|---:|---:|
| PERCEPTION | 96 | 8 | 1 | 0 | 9/9 |
| NAVIGATION | 69 | 3 | 1 | 2 | 6/7 |
| INTERACTION | 77 | 8 | 0 | 1 | 9/9 |
| MACHINE INTERFACES | 78 | 2 | 1 | 1 | 4/6 |
| RELIABILITY | 100 | 5 | 0 | 0 | 5/5 |
| SAFETY | 86 | 3 | 2 | 0 | 5/7 |
| TASK SUCCESS | 67 | 2 | 0 | 1 | 3/3 |

### ❌ Failures (4)
- **Form fields have labels and names** (`form-fields-labelled`, weight 10): 0 label violations and 6 unnamed fields (86%).
- **Menus do not depend on hover** (`hover-only-menus`, weight 3): 7 navigation links are only revealed on hover.
- **A sitemap is published** (`sitemap`, weight 3): No sitemap.xml and no Sitemap directive in robots.txt.
- **Structured data (JSON-LD) describes the page** (`structured-data`, weight 3): No JSON-LD found.

### ⚠️ Warnings (5)
- **Consequential actions require confirmation** (`consequential-actions-guarded`): 1 of 1 consequential actions execute without a visible confirmation step.
- **Control names are specific, not repeated or generic** (`ambiguous-control-names`): 0 generic names and 2 names reused for different destinations.
- **Common destinations are discoverable from the start page** (`key-pages-discoverable`): Found help, search; missing contact, about, privacy, terms.
- **llms.txt is published and well-formed** (`llms-txt`): No llms.txt published.
- **Downloads and new windows are announced** (`download-and-popup-links`): 1 of 1 download/new-window links are not announced.

### Behavioural tests
| Task | Verdict | Steps | Reason |
|---|---|---:|---|
| Find the company's contact information (an email address or phone number). | PASS | 1 | success criteria satisfied after 1 actions |
| Find the page describing the privacy policy or terms of service. | FAIL | 5 | no control matched keywords [privacy, privacy policy, terms, legal, privacidade, policy, policies, conditions] on https: |
| Find a page that explains what the company or product does (about, help or documentation). | PASS | 2 | success criteria satisfied after 2 actions |

### Suggested fixes
1. **Form fields have labels and names**: Associate every input/select/textarea with a <label for>, give fields a name attribute, and use autocomplete tokens for common data.
2. **Menus do not depend on hover**: Expose submenus through a <button aria-expanded> toggle, or render submenu links in the page (footer sitemap) so they are reachable without hover.
3. **A sitemap is published**: Publish /sitemap.xml and reference it with a Sitemap: line in robots.txt.
4. **Structured data (JSON-LD) describes the page**: Add JSON-LD for Organization/WebSite on the home page and Product/Offer, FAQPage, ContactPoint or BreadcrumbList on inner pages.
5. **Consequential actions require confirmation**: Put consequential actions behind a confirmation dialog (aria-haspopup="dialog" + <dialog>) or a review step; never auto-submit them.
6. **Control names are specific, not repeated or generic**: Make link and button text describe the destination or action ("Read the return policy", "Add Trail Bike to cart"). Avoid "Click here"/"Read more"; use aria-label to disambiguate when visual text must stay short.
7. **Common destinations are discoverable from the start page**: Link contact, help/FAQ, privacy/terms, and search from the header or footer with their conventional names.
8. **llms.txt is published and well-formed**: Publish /llms.txt with an H1, a one-paragraph blockquote and H2 sections of markdown links to the most useful pages.

<sub>1 pages · 21.1 s · 2026-11-14T00:31:30.981Z · [methodology](https://github.com/ericovirgy/agentic-web-check/blob/main/docs/SCORING.md)</sub>