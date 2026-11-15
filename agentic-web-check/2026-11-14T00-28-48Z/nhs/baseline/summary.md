## Agentic Web Check: 85/100

**https://www.nhs.uk/** · behavioural verification, 3 tasks (baseline agent) · v0.1.0 · methodology v1

**1 of 3 behavioural tasks did not pass (1 BLOCKED)**

| Dimension | Score | Pass | Warn | Fail | Scored |
|---|---:|---:|---:|---:|---:|
| PERCEPTION | 100 | 9 | 0 | 0 | 9/9 |
| NAVIGATION | 100 | 6 | 0 | 0 | 6/7 |
| INTERACTION | 92 | 8 | 1 | 0 | 9/9 |
| MACHINE INTERFACES | 78 | 2 | 1 | 1 | 4/6 |
| RELIABILITY | 79 | 4 | 0 | 1 | 5/5 |
| SAFETY | 100 | 3 | 0 | 0 | 3/7 |
| TASK SUCCESS | 67 | 2 | 0 | 1 | 3/3 |

### ❌ Failures (2)
- **The DOM settles after load** (`dom-stability`, weight 7): Worst page: 0 late mutations, CLS 0.257.
- **Structured data (JSON-LD) describes the page** (`structured-data`, weight 3): No JSON-LD found.

### ⚠️ Warnings (2)
- **Controls are native or complete ARIA widgets** (`native-controls`): 1 custom ARIA widgets and 0 drag-only elements.
- **llms.txt is published and well-formed** (`llms-txt`): No llms.txt published.

### Behavioural tests
| Task | Verdict | Steps | Reason |
|---|---|---:|---|
| Find the company's contact information (an email address or phone number). | BLOCKED | 7 | captcha: g-recaptcha, recaptcha |
| Find the page describing the privacy policy or terms of service. | PASS | 2 | success criteria satisfied after 2 actions |
| Find a page that explains what the company or product does (about, help or documentation). | PASS | 1 | success criteria satisfied after 1 actions |

### Suggested fixes
1. **The DOM settles after load**: Finish rendering before load, avoid late-inserted banners/ads, reserve space for async content, stop polling updates when idle.
2. **Structured data (JSON-LD) describes the page**: Add JSON-LD for Organization/WebSite on the home page and Product/Offer, FAQPage, ContactPoint or BreadcrumbList on inner pages.
3. **Controls are native or complete ARIA widgets**: Prefer native <select>, <input type="date|range|number">; when custom widgets are unavoidable, implement the full ARIA pattern (roles, states such as aria-valuenow/aria-expanded, keyboard support).
4. **llms.txt is published and well-formed**: Publish /llms.txt with an H1, a one-paragraph blockquote and H2 sections of markdown links to the most useful pages.

<sub>1 pages · 16.9 s · 2026-11-14T00:29:59.839Z · [methodology](https://github.com/ericovirgy/agentic-web-check/blob/main/docs/SCORING.md)</sub>