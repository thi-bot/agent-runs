## Agentic Web Check: 70/100

**https://blog.google/** · behavioural verification, 3 tasks (baseline agent) · v0.1.0 · methodology v1

**2 of 3 behavioural tasks did not pass (2 FAIL)**

| Dimension | Score | Pass | Warn | Fail | Scored |
|---|---:|---:|---:|---:|---:|
| PERCEPTION | 62 | 3 | 5 | 1 | 9/9 |
| NAVIGATION | 100 | 6 | 0 | 0 | 6/7 |
| INTERACTION | 88 | 8 | 1 | 0 | 9/9 |
| MACHINE INTERFACES | 93 | 3 | 1 | 0 | 4/6 |
| RELIABILITY | 100 | 5 | 0 | 0 | 5/5 |
| SAFETY | 86 | 3 | 2 | 0 | 5/7 |
| TASK SUCCESS | 33 | 1 | 0 | 2 | 3/3 |

### ❌ Failures (1)
- **Control names are specific, not repeated or generic** (`ambiguous-control-names`, weight 3): 11 generic names and 0 names reused for different destinations.

### ⚠️ Warnings (9)
- **Interactive controls have accessible names** (`control-accessible-name`): 4 of 120 interactive controls (3%) have no accessible name.
- **Form fields have labels and names** (`form-fields-labelled`): 0 label violations and 1 unnamed fields (20%).
- **Clickable elements are real controls, not generic elements** (`fake-interactive-elements`): 14 clickable elements without a control role (10% of clickables).
- **Consequential actions require confirmation** (`consequential-actions-guarded`): 3 of 4 consequential actions execute without a visible confirmation step.
- **Headings form a usable outline** (`heading-structure`): 1 heading problems across 1 pages.
- **Images carry alternative text** (`image-alt`): 1 images without alternative text.
- **Accessibility snapshot fits an agent context budget** (`snapshot-budget`): Largest snapshot: 40,683 chars.
- **llms.txt is published and well-formed** (`llms-txt`): No llms.txt published.
- **Downloads and new windows are announced** (`download-and-popup-links`): 33 of 41 download/new-window links are not announced.

### Behavioural tests
| Task | Verdict | Steps | Reason |
|---|---|---:|---|
| Find the company's contact information (an email address or phone number). | FAIL | 3 | no control matched keywords [contact, contact us, get in touch, support, email, phone, contacto, address] on https://blo |
| Find the page describing the privacy policy or terms of service. | FAIL | 3 | page state unchanged after three actions (controls had no visible effect or opened new tabs) |
| Find a page that explains what the company or product does (about, help or documentation). | PASS | 6 | success criteria satisfied after 6 actions |

### Suggested fixes
1. **Control names are specific, not repeated or generic**: Make link and button text describe the destination or action ("Read the return policy", "Add Trail Bike to cart"). Avoid "Click here"/"Read more"; use aria-label to disambiguate when visual text must stay short.
2. **Interactive controls have accessible names**: Give every button, link and form control a visible text label or an aria-label/aria-labelledby. For icon buttons use aria-label; for inputs use <label for>.
3. **Form fields have labels and names**: Associate every input/select/textarea with a <label for>, give fields a name attribute, and use autocomplete tokens for common data.
4. **Clickable elements are real controls, not generic elements**: Use <button> or <a href> for actions and navigation. If a custom element must stay, add role="button", tabindex="0", a name and keyboard handlers.
5. **Consequential actions require confirmation**: Put consequential actions behind a confirmation dialog (aria-haspopup="dialog" + <dialog>) or a review step; never auto-submit them.
6. **Headings form a usable outline**: One h1 per page naming the page; nest h2/h3 without skipping levels; no empty headings.
7. **Images carry alternative text**: Add alt text to informative images (alt="" for decorative ones); name SVG icons with aria-label or <title>.
8. **Accessibility snapshot fits an agent context budget**: Reduce DOM size on key pages: paginate long lists, lazy-render off-screen sections, remove duplicated hidden menus.

<sub>1 pages · 60.3 s · 2026-11-14T00:31:01.155Z · [methodology](https://github.com/ericovirgy/agentic-web-check/blob/main/docs/SCORING.md)</sub>