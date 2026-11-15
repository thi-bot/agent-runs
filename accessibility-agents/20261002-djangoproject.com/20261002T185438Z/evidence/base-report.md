# Web Accessibility Audit

An audit of web content, run on 2026-10-02. Read the executive summary for the verdict, the priorities section for what to do first, and the findings tables for detail.

## Metadata

What was audited, with what, and under which settings.

| Field | Value |
|---|---|
| Date | 2026-10-02 |
| Scope | 135 items |
| Skills run | alt-text-headings, aria-specialist, cognitive-accessibility, contrast-master, cross-page-analyzer, forms-specialist, keyboard-navigator, link-checker, live-region-controller, modal-specialist, playwright-scanner, tables-data-specialist, testing-coach |
| Tooling | node v26.8.1, a11y-mcp-server 7.0.3 |
| Scan configuration | defaults, no config file found |
| Checks counted | 68 |

Audited:

- `.a11y-history/20261002T185438Z/evidence/runtime-groups.json`
- `.github/workflows/tests.yml`
- `accounts/forms.py`
- `checklists/templates/**/*.html`
- `contact/forms.py`
- `djangoproject/scss/_dark-mode.scss`
- `djangoproject/scss/_style.scss`
- `djangoproject/scss/_utils.scss`
- `djangoproject/static/js/djangoproject.js`
- `djangoproject/static/js/main.js`
- `djangoproject/static/js/mod/list-collapsing.js`
- `djangoproject/static/js/mod/stripe-change-card.js`
- `djangoproject/static/js/mod/stripe-donation.js`
- `djangoproject/templates/**/*.html`
- `djangoproject/templates/accounts/edit_profile.html`
- `djangoproject/templates/aggregator/feeditem_list.html`
- `djangoproject/templates/blog/blog_pagination.html`
- `djangoproject/templates/blog/news_summary.html`
- `djangoproject/templates/contact/foundation.html`
- `djangoproject/templates/foundation/meeting_snippet.html`
- `djangoproject/templates/fundraising/includes/_form.html`
- `djangoproject/templates/fundraising/includes/donation_form_with_heart.html`
- `djangoproject/templates/fundraising/manage-donations.html`
- `djangoproject/templates/homepage.html`
- `djangoproject/templates/members/corporate_member_badges.html`
- `djangoproject/templates/members/corporatemember_form.html`
- `djangoproject/templates/registration/*.html`
- `djangoproject/templates/registration/login.html`
- `djangoproject/templates/registration/registration_form.html`
- `djangoproject/templates/start.html`
- `djangoproject/test_runner.py`
- `djangoproject/tests.py`
- `fundraising/forms.py`
- `https://www.djangoproject.com/`
- `https://www.djangoproject.com/community/`
- `https://www.djangoproject.com/community/dsf/`
- `https://www.djangoproject.com/community/ecosystem/`
- `https://www.djangoproject.com/community/local/`
- `https://www.djangoproject.com/conduct/`
- `https://www.djangoproject.com/conduct/faq/`
- `https://www.djangoproject.com/conduct/reporting/`
- `https://www.djangoproject.com/contact/foundation/`
- `https://www.djangoproject.com/diversity/`
- `https://www.djangoproject.com/download/`
- `https://www.djangoproject.com/download/2028/roadmap/`
- `https://www.djangoproject.com/download/6.2/roadmap/`
- `https://www.djangoproject.com/foundation/`
- `https://www.djangoproject.com/foundation/conferences/`
- `https://www.djangoproject.com/foundation/corporate-members/`
- `https://www.djangoproject.com/foundation/corporate-members/badges/`
- and 85 more

## Executive summary

Fail. Critical or serious findings must be fixed before this ships.

The headline numbers for this run.

| Measure | Value |
|---|---|
| Score | 68 out of 100 |
| Grade | D |
| Findings | 28 |
| Blocking (critical plus serious) | 18 |
| Verdict | Fail |

## Severity breakdown

Counts by severity, highest impact first.

| Severity | Count | What it means |
|---|---:|---|
| critical | 0 | Blocks a person from completing the task |
| serious | 18 | Major barrier with a difficult workaround |
| moderate | 10 | Real friction, workaround exists |
| minor | 0 | Noticeable but rarely blocking |

## Findings

28 findings, ordered by severity then by rule.

### Serious (18)

Each row names the rule, the criterion it fails, where it is, and what to change.

| Rule | WCAG | Location | Problem | Fix |
|---|---|---|---|---|
| `ALT-001` | 1.1.1 A | djangoproject/templates/members/corporate_member_badges.html:44 | All 16 corporate membership badge previews lack text alternatives identifying the badge and visual variant. | Add alt text identifying the membership level and variant, for example "Django Bronze Member badge, full colour"; expose variant names in the data supplied to this template. |
| `ARIA-PAGINATION-LIST` | 1.3.1 A | djangoproject/templates/blog/blog_pagination.html:5 | Pagination overrides the list role with navigation, leaving list items without a list parent. | Use <nav aria-label="Pagination"><ul class="nav-pagination">...</ul></nav> in blog and aggregator templates; put the Page x of y text outside the ul or in a li. Preserve native list semantics. |
| `CONTRAST-ACTIVE-NAV` | 1.4.3 AA | https://www.djangoproject.com/community/ \| .active > a | Current-page desktop navigation link fails normal-text contrast. | Use a lighter selected-navigation foreground with4.5:1 contrast in both themes; keep a non-color current-page indicator. |
| `CONTRAST-DARK-BADGE-LINKS` | 1.4.3 AA | https://www.djangoproject.com/foundation/corporate-members/badges/ \| dark theme .variant .links a | Badge download links become nearly invisible on their fixed gray background in dark theme. | Use theme-aware badge-panel background and link colors, or retain a sufficiently dark foreground on the #cccccc panel in both themes. |
| `CONTRAST-DARK-BANNER-CTA` | 1.4.3 AA | https://www.djangoproject.com/start/ \| dark theme .copy-banner .cta | Dark-theme download call-to-action text fails minimum contrast. | Set the dark-theme banner CTA text to a light foreground or give it a background that provides at least 4.5:1 for its 18px normal-weight text. |
| `CONTRAST-EXPAND-CONTROLS` | 1.4.3 AA | https://www.djangoproject.com/community/ \| .expandall | Expand-all and collapse-all labels fail text contrast. | Use a darker label foreground meeting4.5:1 and implement these controls as keyboard-accessible buttons. |
| `CONTRAST-FOOTER-CREDITS` | 1.4.3 AA | https://www.djangoproject.com/ \| .thanks > li:nth-child(1) > span | Footer credits and donor links fail text contrast. | Use a lighter footer-specific accent providing4.5:1 on the dark-green footer background. |
| `CONTRAST-FOOTER-MAIN` | 1.4.3 AA | https://www.djangoproject.com/ \| .col-learn-more > h3 | Light-theme footer headings and navigation links fail text contrast. | Darken the footer background or use a dark text color providing4.5:1; preserve visible link focus. |
| `CONTRAST-LIGHT-BANNER` | 1.4.3 AA | https://www.djangoproject.com/community/ \| section > .container > p | Light-theme banner text fails large-text contrast. | Darken banner background or change foreground so large text achieves3:1 and smaller text4.5:1. |
| `CONTRAST-LIGHT-CTA` | 1.4.3 AA | https://www.djangoproject.com/ \| p:nth-child(2) > .cta | Light-theme CTA labels fail normal-text contrast. | Use darker CTA background or dark labels meeting4.5:1; verify18px bold labels against normal-text threshold. |
| `CONTRAST-LIGHT-LINKS` | 1.4.3 AA | https://www.djangoproject.com/ \| .link-readmore:nth-child(3) | Light-theme green body and sidebar links fail text contrast. | Darken shared --link-color to meet4.5:1 on white, #f8f8f8, #f1fff7 and tinted table rows and gray badge panels; verify all interaction states. |
| `CONTRAST-METADATA` | 1.4.3 AA | https://www.djangoproject.com/ \| .outline | Muted metadata and secondary text fail normal-text contrast. | Darken light-theme metadata tokens to meet4.5:1 on white and sidebar backgrounds, including author and RSS links. |
| `CONTRAST-OTHER-TEXT` | 1.4.3 AA | https://www.djangoproject.com/community/ \| li:nth-child(1) > span | Additional text colors fail minimum contrast outside the shared palette groups. | Review the remaining measured foreground/background pairs and change text or backgrounds to meet4.5:1 for normal text and3:1 for large text. |
| `CONTRAST-SPONSOR-EYEBROW` | 1.4.3 AA | https://www.djangoproject.com/sponsor/ \| .sponsor-intro > .sponsor-eyebrow | Sponsor section eyebrows fail normal-text contrast. | Darken light-theme sponsor accent text to meet4.5:1 against white and #f8f8f8 backgrounds. |
| `FORM-001` | 4.1.2 A | djangoproject/static/js/djangoproject.js:206 | Choosing Other amount creates an unnamed donation amount input and removes the existing label target. | Give the new input id=id_amount so the existing Donation amount label remains associated; associate the USD integer instruction using aria-describedby. |
| `FORM-002` | 1.3.1 A | djangoproject/templates/fundraising/includes/_form.html:8 | Donation management renders amount, interval and logo fields without associated labels. | Render each normal field with as_field_group or label_tag; use fieldsets and legends for radio groups and associate help/error descriptions. |
| `FORM-003` | 4.1.2 A | djangoproject/templates/members/corporatemember_form.html:18 | The corporate membership level select has no programmatic accessible name. | Render field.label_tag for membership level and other label_fields so the label for attribute refers to its widget ID; associate errors/help text separately. |
| `KEYBOARD-001` | 2.1.1 A | djangoproject/static/js/mod/list-collapsing.js:18 | Accordion headings and Expand All / Collapse All cannot be activated by keyboard. | Render native buttons inside headings and native Expand All / Collapse All buttons; retain click handling and expose aria-expanded on each disclosure. |

### Moderate (10)

Each row names the rule, the criterion it fails, where it is, and what to change.

| Rule | WCAG | Location | Problem | Fix |
|---|---|---|---|---|
| `ARIA-EXPANDED-001` | 4.1.2 A | djangoproject/templates/includes/header.html:9 | The mobile navigation disclosure button does not expose whether the menu is expanded or collapsed. | Initialize aria-expanded="false" on the Menu button, give the controlled nav an id and connect aria-controls; update aria-expanded on every toggle in djangoproject.js. |
| `FORM-004` | 1.3.5 AA | contact/forms.py:27 | The contact form does not expose autocomplete purposes for the user name and email. | Set autocomplete=name on name and autocomplete=email on email; add appropriate name/email tokens to profile and corporate contact fields. |
| `KEYBOARD-002` | 2.1.1 A | djangoproject/static/js/djangoproject.js:107 | Copy code controls are click-only spans excluded from keyboard navigation. | Create button type=button with an accessible Copy code name and preserve the clipboard handler so Enter and Space work. |
| `KEYBOARD-003` | 2.1.1 A | djangoproject/templates/base.html:83 | Message dismissal icons cannot be reached or activated by keyboard. | Replace the close icon with button type=button named Dismiss message; hide its decorative icon and preserve click handling. |
| `KEYBOARD-004` | 2.1.4 A | djangoproject/static/js/djangoproject.js:84 | The global slash shortcut cannot be disabled, remapped, or restricted to a focused component. | Keep Ctrl/Command+K, and either remove the unmodified slash shortcut or provide a persistent disable/remap preference; ignore editable content. |
| `MOTION-FUNDRAISING-HEART` | 2.2.2 A | djangoproject/scss/_style.scss:3386 | Fundraising heart pixels pulse indefinitely without a pause or stop control. | Make fundraising progress pixels static or stop pulsing within five seconds; respect prefers-reduced-motion. The percentage and static heart convey the progress without animation. |
| `RUNTIME-REFLOW-001` | 1.4.10 AA | https://www.djangoproject.com/fundraising/#donate | The custom donation amount state creates horizontal page overflow at 320 CSS pixels. | Remove the fundraising description minimum width at narrow viewports and size the custom amount input within its container using width:100%, max-width:100%, and box-sizing:border-box. |
| `STATUS-CARD-UPDATED` | 4.1.3 AA | djangoproject/templates/fundraising/manage-donations.html:48 | Successful payment-card updates are inserted without an assistive-technology status announcement. | Give .change-card-result role=status before updates, keeping the visible Card updated text. |
| `STATUS-CLIPBOARD` | 4.1.3 AA | djangoproject/static/js/djangoproject.js:137 | Clipboard success and error messages are inserted without a status or alert role. | Add an empty persistent role=status region before copying, update its text with success or failure, and preserve the message long enough to be perceived; keep keyboard focus on the copy button. |
| `TITLE-001` | 2.4.2 A | djangoproject/templates/base_foundation.html:8 | Member directories, team directory and badge downloads share a generic foundation title that omits their specific purpose. | Override the title block in corporate_member_badges.html, corporatemember_list.html, individualmember_list.html and team_list.html with their page heading and the foundation name. |

## Remediation priorities

Then the 18 remaining blocking findings, in this order:

1. `ALT-001` at djangoproject/templates/members/corporate_member_badges.html:44. Add alt text identifying the membership level and variant, for example "Django Bronze Member badge, full colour"; expose variant names in the data supplied to this template.
2. `ARIA-PAGINATION-LIST` at djangoproject/templates/blog/blog_pagination.html:5. Use <nav aria-label="Pagination"><ul class="nav-pagination">...</ul></nav> in blog and aggregator templates; put the Page x of y text outside the ul or in a li. Preserve native list semantics.
3. `CONTRAST-ACTIVE-NAV` at https://www.djangoproject.com/community/ | .active > a. Use a lighter selected-navigation foreground with4.5:1 contrast in both themes; keep a non-color current-page indicator.
4. `CONTRAST-DARK-BADGE-LINKS` at https://www.djangoproject.com/foundation/corporate-members/badges/ | dark theme .variant .links a. Use theme-aware badge-panel background and link colors, or retain a sufficiently dark foreground on the #cccccc panel in both themes.
5. `CONTRAST-DARK-BANNER-CTA` at https://www.djangoproject.com/start/ | dark theme .copy-banner .cta. Set the dark-theme banner CTA text to a light foreground or give it a background that provides at least 4.5:1 for its 18px normal-weight text.
6. `CONTRAST-EXPAND-CONTROLS` at https://www.djangoproject.com/community/ | .expandall. Use a darker label foreground meeting4.5:1 and implement these controls as keyboard-accessible buttons.
7. `CONTRAST-FOOTER-CREDITS` at https://www.djangoproject.com/ | .thanks > li:nth-child(1) > span. Use a lighter footer-specific accent providing4.5:1 on the dark-green footer background.
8. `CONTRAST-FOOTER-MAIN` at https://www.djangoproject.com/ | .col-learn-more > h3. Darken the footer background or use a dark text color providing4.5:1; preserve visible link focus.
9. `CONTRAST-LIGHT-BANNER` at https://www.djangoproject.com/community/ | section > .container > p. Darken banner background or change foreground so large text achieves3:1 and smaller text4.5:1.
10. `CONTRAST-LIGHT-CTA` at https://www.djangoproject.com/ | p:nth-child(2) > .cta. Use darker CTA background or dark labels meeting4.5:1; verify18px bold labels against normal-text threshold.
11. `CONTRAST-LIGHT-LINKS` at https://www.djangoproject.com/ | .link-readmore:nth-child(3). Darken shared --link-color to meet4.5:1 on white, #f8f8f8, #f1fff7 and tinted table rows and gray badge panels; verify all interaction states.
12. `CONTRAST-METADATA` at https://www.djangoproject.com/ | .outline. Darken light-theme metadata tokens to meet4.5:1 on white and sidebar backgrounds, including author and RSS links.
13. `CONTRAST-OTHER-TEXT` at https://www.djangoproject.com/community/ | li:nth-child(1) > span. Review the remaining measured foreground/background pairs and change text or backgrounds to meet4.5:1 for normal text and3:1 for large text.
14. `CONTRAST-SPONSOR-EYEBROW` at https://www.djangoproject.com/sponsor/ | .sponsor-intro > .sponsor-eyebrow. Darken light-theme sponsor accent text to meet4.5:1 against white and #f8f8f8 backgrounds.
15. `FORM-001` at djangoproject/static/js/djangoproject.js:206. Give the new input id=id_amount so the existing Donation amount label remains associated; associate the USD integer instruction using aria-describedby.
16. `FORM-002` at djangoproject/templates/fundraising/includes/_form.html:8. Render each normal field with as_field_group or label_tag; use fieldsets and legends for radio groups and associate help/error descriptions.
17. `FORM-003` at djangoproject/templates/members/corporatemember_form.html:18. Render field.label_tag for membership level and other label_fields so the label for attribute refers to its widget ID; associate errors/help text separately.
18. `KEYBOARD-001` at djangoproject/static/js/mod/list-collapsing.js:18. Render native buttons inside headings and native Expand All / Collapse All buttons; retain click handling and expose aria-expanded on each disclosure.

The remaining 10 moderate and minor findings can follow in normal work.

## What passed

40 checks ran and found nothing.

- Base template contains a skip link to main-content.
- Blog and foundation meeting Read more links share a list item with the descriptive linked heading, providing contextual purpose under 2.4.4.
- Both automatic prefers-color-scheme and explicit light/dark theme variants exist.
- CI already installs Chromium and Firefox via Playwright and runs make ci with both browser flags.
- Commented historical homepage placeholders are excluded from findings.
- Corporate sponsor logos have organization-name alternatives; sponsor plan logos are decorative next to text.
- Dark normal-content links pass contrast on reviewed pages outside badge-panel exception.
- Dark-theme link-green foreground #93D7B7 against #0e1117 is above 4.5:1; muted text is lightened for dark theme.
- Documentation search input has a visually hidden associated label and named submit button.
- Donation errors use native alert() rather than an untrapped custom overlay.
- Donation frequency and preset amount selects have associated visible labels.
- Donation setup error is displayed using a native alert dialog rather than an unannounced visual toast.
- Download page tables use native th column headers with straightforward one-row header relationships.
- Foundation contact form uses Django as_field_group rendering.
- Fundraising progress SVG has a descriptive accessible name including funded percentage.
- Getting started content is divided into descriptive sections and code examples.
- Global anchors and buttons have focus outlines, subject to local overrides.
- Homepage primary call-to-action links have descriptive text.
- Login includes username/password labels and a password-reset route.
- Main navigation menu toggle uses a native button.
- Measured mobile Menu, search submit and theme buttons exceed24px in both dimensions.
- Mobile Menu button activates with Enter and has a visible 2px solid focus outline.
- No bespoke modal/dialog implementation was found in the reviewed marketing/foundation templates and JavaScript.
- No document horizontal overflow at320px on homepage, start, selected blog article, corporate badge page and sponsor plans in either theme.
- No grid, treegrid or sortable table widgets were found in scoped source.
- No horizontal page overflow on homepage, start or corporate join at widths320,768,1024,1440.
- No positive tabindex values found in reviewed templates.
- No source-level paste prevention or memory-only authentication puzzle found in reviewed first-party scripts.
- Production skip link sets the sequential navigation starting point inside main: the next Tab reaches Learn more about Django, even though activeElement is body.
- Production social media reach table uses scoped column and row headers.
- Production sponsorship comparison uses scoped column, row and rowgroup headers; table is labeled by an existing heading.
- Project has a shared StaticLiveServerTestCase/Playwright browser test harness in djangoproject/tests.py.
- Registration and login templates provide explicitly associated visible username/password/email labels.
- Release schedule source uses scope="col" for Date and Milestone.
- Representative production pages have lang="en" and a main landmark.
- Search and navigation landmarks have accessible labels.
- Theme and search icon glyphs are hidden from assistive technology.
- Theme control meets45x45px source dimensions.
- Theme toggle is explicitly 45 by 45 CSS pixels.
- aria-labelledby/describedby/controls references resolve on homepage, download, sponsor plans, badge downloads and ecosystem pages.

## Needs a human

Items a skill could not decide, or could not check automatically.

- **alt-text-headings**: Skipped heading levels alone are not reported as WCAG failures.
- **alt-text-headings**: Release-roadmap graphic is accompanied by supported/future/unsupported release data tables; its generic short alternative alone is not treated as a failure.
- **alt-text-headings**: Flatpage and blog database content beyond representative runtime pages is outside this source-only review.
- **aria-specialist**: ALT-001 and FORM-003 intentionally correlate existing source specialist findings; parent must deduplicate by rule and source location rather than score twice.
- **aria-specialist**: Native navigation landmark should wrap native list rather than replacing its role.
- **aria-specialist**: Final100pages: pagination7nodes across7pages, image alternatives16nodes on1page, select name1node on1page.
- **aria-specialist**: Click-only copy controls and conditional message-dismiss controls were shared with the keyboard specialist for deduplication.
- **aria-specialist**: Redundant landmark roles and region naming preferences are not treated as WCAG failures.
- **cognitive-accessibility**: Accessible authentication cannot be fully established without checking actual rendered password-manager support and external reCAPTCHA/Stripe flows.
- **cognitive-accessibility**: Technical Django terminology fits developer documentation; jargon alone is not an AA failure.
- **cognitive-accessibility**: No multi-step redundant-entry or timeout failure confirmed within reviewed source.
- **cognitive-accessibility**: Clipboard status timing is captured by live-region-controller rather than duplicated here.
- **contrast-master**: No blanket failure assigned for absent reduced-motion media query: short transitions alone do not fail WCAG AA.
- **contrast-master**: Target-size assessment for other components needs runtime geometry and spacing exceptions.
- **contrast-master**: Best practices: short smooth scrolling and transition effects do not adapt to reduced motion; no standalone AA failure assigned.
- **contrast-master**: Source color recipes verified in production and consolidated into cross-page-analyzer findings; production main background is #ffffff rather than source $white #F1FFF7. Search-filter focus candidate not runtime confirmed and removed from scored findings.
- **contrast-master**: Production motion finding verified by reduced-motion computed styles and complete visible control inventory; all palette defects are emitted only by cross-page-analyzer to avoid duplicates.
- **cross-page-analyzer**: CONTRAST-LIGHT-CTA: shared-template, 8/100 pages, 14 distinct nodes.
- **cross-page-analyzer**: CONTRAST-METADATA: shared-template, 82/100 pages, 812 distinct nodes.
- **cross-page-analyzer**: CONTRAST-LIGHT-LINKS: systemic, 100/100 pages, 4574 distinct nodes.
- **cross-page-analyzer**: CONTRAST-FOOTER-MAIN: systemic, 100/100 pages, 3000 distinct nodes.
- **cross-page-analyzer**: CONTRAST-FOOTER-CREDITS: systemic, 100/100 pages, 567 distinct nodes.
- **cross-page-analyzer**: CONTRAST-ACTIVE-NAV: shared-template, 98/100 pages, 98 distinct nodes.
- **cross-page-analyzer**: CONTRAST-LIGHT-BANNER: shared-template, 99/100 pages, 114 distinct nodes.
- **cross-page-analyzer**: CONTRAST-EXPAND-CONTROLS: shared-template, 2/100 pages, 4 distinct nodes.
- **cross-page-analyzer**: CONTRAST-OTHER-TEXT: shared-template, 33/100 pages, 137 distinct nodes.
- **cross-page-analyzer**: CONTRAST-SPONSOR-EYEBROW: shared-template, 4/100 pages, 22 distinct nodes.
- **cross-page-analyzer**: 100 completed desktoplight files; 9342 color-contrast nodes partitioned without overlap. Components classified by selector first, then shared recipe when selector lacks an ancestor; ambiguous leftovers kept separate.
- **cross-page-analyzer**: Risk scores are remediation prioritization, not WCAG conformance evidence.
- **cross-page-analyzer**: No baseline, full accessibility-tree diff or keyboard-flow comparison supplied.
- **forms-specialist**: No forms submitted, accounts modified, payments made, or third-party checkout opened.
- **forms-specialist**: Custom paragraph errors/help text in older templates do not supply IDs even though modern Django may auto-generate aria-describedby references; verify rendered invalid forms locally before recording an additional failure.
- **forms-specialist**: Profile and several corporate/donor text fields rely on placeholders; persistent labels are recommended, but placeholder presence alone is not recorded as an unequivocal missing accessible-name failure.
- **forms-specialist**: Source defects in authenticated donation-management/profile views are recorded as source-only coverage, not verified production behavior.
- **keyboard-navigator**: Runtime keyboard testing and focus contrast measurements are handled by the parent audit.
- **keyboard-navigator**: Documentation console tabs use display:none radio controls in scss/_console-tabs.scss:11-13; generated production markup requires runtime confirmation.
- **keyboard-navigator**: Placeholder-only labels and missing aria-expanded are handled in forms or ARIA findings.
- **link-checker**: Read more links in start.html benefit from preceding descriptive headings and explanatory content; individual link names could be more useful in a screen-reader links list (AAA/advisory).
- **link-checker**: New-tab warning, raw URL text, and file size indicators are not automatic WCAG AA failures.
- **link-checker**: Runtime accessible-name and destination checks remain with parent browser review.
- **live-region-controller**: Read-only audit did not execute payment or saved-card mutations.
- **live-region-controller**: Collapsing content needs expanded state and keyboard semantics rather than blanket live regions.
- **live-region-controller**: Static server-rendered form responses do not inherently require live regions.
- **modal-specialist**: Card change invokes externally hosted StripeCheckout; focus trapping, dismissal, return and accessible naming require authorized account/payment runtime coverage and were not tested.
- **modal-specialist**: The mobile navigation is a non-modal disclosure; modal focus trapping is not required. Its expanded-state semantics belong in the ARIA review.
- **playwright-scanner**: Runtime corroboration of KEYBOARD-001, KEYBOARD-004, FORM-001 and FORM-003 was added to their existing specialist payloads to avoid duplicate findings.
- **playwright-scanner**: Raw behavior evidence is .a11y-history/20261002T185438Z/evidence/behavior.json; skip/focus follow-up is evidence/focus.json.
- **playwright-scanner**: Chrome system Chromium via Playwright; no screenshots, form submissions, payments, account changes or checkout openings.
- **playwright-scanner**: State axe output includes color contrast results for parent aggregation; duplicate baseline contrast findings are not emitted here.
- **playwright-scanner**: Accordion focus changes its text color and suppresses the outline; color difference needs non-text contrast assessment. Search submit focus also suppresses outline; a before/after computed-style comparison is still needed to prove a missing visible indicator.
- **playwright-scanner**: Behavior tests do not constitute a full screen-reader test or proof of WCAG conformance.
- **playwright-scanner**: Reflow candidate: measured 325px default/328px custom amount document width at320px; verify whether clipped controls require two-dimensional scrolling or cause loss of information/function before treating this as a confirmed1.4.10 failure.
- **playwright-scanner**: Completed 100 successful production desktop light-theme axe scans; 9366 element-level violations, of which 9342 are contrast violations partitioned into ten shared remediation groups.
- **playwright-scanner**: Chromium 152.0.7977.82, Playwright 1.58.2, axe-core 4.13.0; tags wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa; viewport1440x1000; no disabled rules.
- **playwright-scanner**: No findings repeated here: runtime corroboration is preserved in ARIA, forms, contrast and cross-page specialist payloads. Complete raw results, including incomplete checks, are retained in evidence/axe/*.json.gz.
- **tables-data-specialist**: Missing captions or scope attributes alone on simple tables are not WCAG failures.
- **tables-data-specialist**: Runtime review covered five tables on download and sponsor plans; other database-backed tables need the parent crawl to confirm coverage.
- **testing-coach**: Add meaningful accessibility regressions to the existing browser harness: Tab to /start/ disclosure buttons, press Enter and Space, assert content visibility and aria-expanded; assert both bulk controls work by keyboard.
- **testing-coach**: At320 viewport open/close the mobile Menu with Enter, assert aria-expanded changes with visible navigation, then Tab through links and back out; retain an obvious focus indicator.
- **testing-coach**: Select Other amount on /fundraising/ without submitting: assert the numeric input accessible name is Donation amount, instruction is associated, focus moves to it, and document scrollWidth does not exceed clientWidth.
- **testing-coach**: Scan representative locally rendered pages and revealed states with pinned axe-core, including wcag2a,wcag2aa,wcag21a,wcag21aa,wcag22aa tags; save violations and incomplete checks as CI artifacts; use fake Stripe/captcha data rather than contacting real payment APIs.
- **testing-coach**: Test invalid forms locally with synthetic data: verify each error is linked to its field and correction guidance is announced; test corporate member select/file accessible names and contact name/email autocomplete tokens.
- **testing-coach**: Assert every main page has a useful unique title and that template variables do not appear escaped or unresolved in titles; inspect document titles with a screen reader.
- **testing-coach**: Check badge images manually: informative badge text needs equivalent alt; purely decorative badges use empty alt; linked badges need the link purpose expressed in their accessible name.
- **testing-coach**: Before sign-off, run NVDA with Firefox or Chrome on Windows and VoiceOver with Safari on macOS/iOS: navigate landmarks/headings, activate disclosures/menu, hear donation amount name/instructions and corporate fields, review error announcements and badge alternatives; record actual announcements and versions.
- **testing-coach**: The report score and grade are heuristic prioritization measures, not WCAG conformance proof. Automated checks, limited browser states and source inspection leave screen-reader behavior and third-party checkout unverified.
- **testing-coach**: Re-scan affected pages after each fix; run the representative browser/axe regression set for every PR touching templates, JavaScript or styles, and repeat the scoped production crawl following deployment.
- **contrast-master**: 28 scenes tested:7URLs,1440/320px, explicitlight/dark, WCAG2A/AA,2.1A/AA,2.2AA axe tags.
- **contrast-master**: Light-theme findings consolidated into cross-page-analyzer; image-alt findings left to image specialist/parent.
- **contrast-master**: Download page reaches365px document width due release tables; tabular content may qualify for1.4.10 two-dimensional layout exception, recommend local horizontal scroll to contain overflow.
- **contrast-master**: Fundraising document width325px at320px from description width100% plus5% margin; minor horizontal overflow observed but no confirmed loss of content/function, so not scored as AA failure.
- **contrast-master**: Reflow tested with320CSSpixel viewport equivalent to1280px at400%; no screen-reader visual verification performed.
- **contrast-master**: Source and production CSS differ:14px bold .link-readmore in production versus source14px normal; white main background versus #F1FFF7 source token. Raw measured colors take precedence.

## Next steps

1. Fix the 18 blocking findings above, starting with any repeated component.
2. Re-run this audit and check the delta section for regressions.
3. Wire the scan into continuous integration so the next regression is caught before review.

Automated checks find a minority of accessibility barriers. A passing score is a floor, not a guarantee.

## Findings data

The merged findings, embedded so the next run can compute a delta without parsing this document.

```json a11y-findings
{
  "skills": [
    "alt-text-headings",
    "aria-specialist",
    "cognitive-accessibility",
    "contrast-master",
    "cross-page-analyzer",
    "forms-specialist",
    "keyboard-navigator",
    "link-checker",
    "live-region-controller",
    "modal-specialist",
    "playwright-scanner",
    "tables-data-specialist",
    "testing-coach"
  ],
  "scope": [
    ".a11y-history/20261002T185438Z/evidence/runtime-groups.json",
    ".github/workflows/tests.yml",
    "accounts/forms.py",
    "checklists/templates/**/*.html",
    "contact/forms.py",
    "djangoproject/scss/_dark-mode.scss",
    "djangoproject/scss/_style.scss",
    "djangoproject/scss/_utils.scss",
    "djangoproject/static/js/djangoproject.js",
    "djangoproject/static/js/main.js",
    "djangoproject/static/js/mod/list-collapsing.js",
    "djangoproject/static/js/mod/stripe-change-card.js",
    "djangoproject/static/js/mod/stripe-donation.js",
    "djangoproject/templates/**/*.html",
    "djangoproject/templates/accounts/edit_profile.html",
    "djangoproject/templates/aggregator/feeditem_list.html",
    "djangoproject/templates/blog/blog_pagination.html",
    "djangoproject/templates/blog/news_summary.html",
    "djangoproject/templates/contact/foundation.html",
    "djangoproject/templates/foundation/meeting_snippet.html",
    "djangoproject/templates/fundraising/includes/_form.html",
    "djangoproject/templates/fundraising/includes/donation_form_with_heart.html",
    "djangoproject/templates/fundraising/manage-donations.html",
    "djangoproject/templates/homepage.html",
    "djangoproject/templates/members/corporate_member_badges.html",
    "djangoproject/templates/members/corporatemember_form.html",
    "djangoproject/templates/registration/*.html",
    "djangoproject/templates/registration/login.html",
    "djangoproject/templates/registration/registration_form.html",
    "djangoproject/templates/start.html",
    "djangoproject/test_runner.py",
    "djangoproject/tests.py",
    "fundraising/forms.py",
    "https://www.djangoproject.com/",
    "https://www.djangoproject.com/community/",
    "https://www.djangoproject.com/community/dsf/",
    "https://www.djangoproject.com/community/ecosystem/",
    "https://www.djangoproject.com/community/local/",
    "https://www.djangoproject.com/conduct/",
    "https://www.djangoproject.com/conduct/faq/",
    "https://www.djangoproject.com/conduct/reporting/",
    "https://www.djangoproject.com/contact/foundation/",
    "https://www.djangoproject.com/diversity/",
    "https://www.djangoproject.com/download/",
    "https://www.djangoproject.com/download/2028/roadmap/",
    "https://www.djangoproject.com/download/6.2/roadmap/",
    "https://www.djangoproject.com/foundation/",
    "https://www.djangoproject.com/foundation/conferences/",
    "https://www.djangoproject.com/foundation/corporate-members/",
    "https://www.djangoproject.com/foundation/corporate-members/badges/",
    "https://www.djangoproject.com/foundation/corporate-membership/",
    "https://www.djangoproject.com/foundation/corporate-membership/join/",
    "https://www.djangoproject.com/foundation/donate/",
    "https://www.djangoproject.com/foundation/faq/",
    "https://www.djangoproject.com/foundation/individual-members/",
    "https://www.djangoproject.com/foundation/minutes/",
    "https://www.djangoproject.com/foundation/minutes/2025/apr/10/dsf-board-monthly-meeting/",
    "https://www.djangoproject.com/foundation/prizes/",
    "https://www.djangoproject.com/foundation/records/",
    "https://www.djangoproject.com/foundation/teams/",
    "https://www.djangoproject.com/fundraising/",
    "https://www.djangoproject.com/sponsor/",
    "https://www.djangoproject.com/sponsor/banner/",
    "https://www.djangoproject.com/sponsor/plans/",
    "https://www.djangoproject.com/sponsor/plans/diamond/",
    "https://www.djangoproject.com/sponsor/plans/platinum/",
    "https://www.djangoproject.com/start/",
    "https://www.djangoproject.com/start/overview/",
    "https://www.djangoproject.com/weblog/2005/nov/",
    "https://www.djangoproject.com/weblog/2006/apr/",
    "https://www.djangoproject.com/weblog/2006/jan/",
    "https://www.djangoproject.com/weblog/2006/may/",
    "https://www.djangoproject.com/weblog/2007/",
    "https://www.djangoproject.com/weblog/2007/feb/",
    "https://www.djangoproject.com/weblog/2007/mar/",
    "https://www.djangoproject.com/weblog/2007/may/",
    "https://www.djangoproject.com/weblog/2008/aug/",
    "https://www.djangoproject.com/weblog/2008/jul/",
    "https://www.djangoproject.com/weblog/2008/nov/",
    "https://www.djangoproject.com/weblog/2009/jul/",
    "https://www.djangoproject.com/weblog/2009/may/",
    "https://www.djangoproject.com/weblog/2010/",
    "https://www.djangoproject.com/weblog/2010/jan/",
    "https://www.djangoproject.com/weblog/2010/mar/",
    "https://www.djangoproject.com/weblog/2010/sep/",
    "https://www.djangoproject.com/weblog/2011/jan/",
    "https://www.djangoproject.com/weblog/2011/nov/",
    "https://www.djangoproject.com/weblog/2012/aug/",
    "https://www.djangoproject.com/weblog/2012/jul/",
    "https://www.djangoproject.com/weblog/2012/may/",
    "https://www.djangoproject.com/weblog/2013/feb/",
    "https://www.djangoproject.com/weblog/2013/jul/",
    "https://www.djangoproject.com/weblog/2013/nov/",
    "https://www.djangoproject.com/weblog/2013/oct/",
    "https://www.djangoproject.com/weblog/2014/aug/",
    "https://www.djangoproject.com/weblog/2014/jul/",
    "https://www.djangoproject.com/weblog/2014/oct/",
    "https://www.djangoproject.com/weblog/2015/feb/",
    "https://www.djangoproject.com/weblog/2015/jul/",
    "https://www.djangoproject.com/weblog/2015/may/",
    "https://www.djangoproject.com/weblog/2016/",
    "https://www.djangoproject.com/weblog/2016/apr/",
    "https://www.djangoproject.com/weblog/2016/jan/",
    "https://www.djangoproject.com/weblog/2016/may/",
    "https://www.djangoproject.com/weblog/2016/sep/",
    "https://www.djangoproject.com/weblog/2017/",
    "https://www.djangoproject.com/weblog/2017/aug/",
    "https://www.djangoproject.com/weblog/2017/may/",
    "https://www.djangoproject.com/weblog/2017/sep/",
    "https://www.djangoproject.com/weblog/2018/dec/",
    "https://www.djangoproject.com/weblog/2018/may/",
    "https://www.djangoproject.com/weblog/2018/oct/",
    "https://www.djangoproject.com/weblog/2019/dec/",
    "https://www.djangoproject.com/weblog/2019/mar/",
    "https://www.djangoproject.com/weblog/2019/oct/",
    "https://www.djangoproject.com/weblog/2020/feb/",
    "https://www.djangoproject.com/weblog/2020/jul/",
    "https://www.djangoproject.com/weblog/2020/oct/",
    "https://www.djangoproject.com/weblog/2021/aug/",
    "https://www.djangoproject.com/weblog/2021/jul/",
    "https://www.djangoproject.com/weblog/2021/nov/",
    "https://www.djangoproject.com/weblog/2022/",
    "https://www.djangoproject.com/weblog/2022/apr/",
    "https://www.djangoproject.com/weblog/2022/jul/",
    "https://www.djangoproject.com/weblog/2022/nov/",
    "https://www.djangoproject.com/weblog/2023/aug/",
    "https://www.djangoproject.com/weblog/2023/jan/",
    "https://www.djangoproject.com/weblog/2023/may/",
    "https://www.djangoproject.com/weblog/2023/sep/",
    "https://www.djangoproject.com/weblog/2024/jan/",
    "https://www.djangoproject.com/weblog/2024/jul/",
    "https://www.djangoproject.com/weblog/2024/may/",
    "https://www.djangoproject.com/weblog/2026/sep/24/dsf-member-of-the-month-ken-whitesell/",
    "members/forms.py",
    "pyproject.toml"
  ],
  "findings": [
    {
      "rule": "ALT-001",
      "wcag": "1.1.1 A",
      "severity": "serious",
      "location": "djangoproject/templates/members/corporate_member_badges.html:44",
      "summary": "All 16 corporate membership badge previews lack text alternatives identifying the badge and visual variant.",
      "fix": "Add alt text identifying the membership level and variant, for example \"Django Bronze Member badge, full colour\"; expose variant names in the data supplied to this template.",
      "evidence": "Production /foundation/corporate-members/badges/: <img src=\"…/bronze.982734d94010.svg\"> has no alt; visual inspection confirms text \"django Bronze Member\".",
      "component": "Corporate member badges",
      "foundBy": [
        "alt-text-headings",
        "aria-specialist"
      ]
    },
    {
      "rule": "ARIA-PAGINATION-LIST",
      "wcag": "1.3.1 A",
      "severity": "serious",
      "location": "djangoproject/templates/blog/blog_pagination.html:5",
      "summary": "Pagination overrides the list role with navigation, leaving list items without a list parent.",
      "fix": "Use <nav aria-label=\"Pagination\"><ul class=\"nav-pagination\">...</ul></nav> in blog and aggregator templates; put the Page x of y text outside the ul or in a li. Preserve native list semantics.",
      "evidence": "<ul class=\"nav-pagination\" role=\"navigation\">; axe listitem finds .nav-pagination > li on7pages. https://dequeuniversity.com/rules/axe/4.13/listitem?application=axeAPI",
      "component": "Blog and community pagination",
      "foundBy": [
        "aria-specialist"
      ]
    },
    {
      "rule": "CONTRAST-ACTIVE-NAV",
      "wcag": "1.4.3 AA",
      "severity": "serious",
      "location": "https://www.djangoproject.com/community/ | .active > a",
      "summary": "Current-page desktop navigation link fails normal-text contrast.",
      "fix": "Use a lighter selected-navigation foreground with4.5:1 contrast in both themes; keep a non-color current-page indicator.",
      "evidence": "98 mutually exclusive instances on 98/100 pages; example .active > a, #44b78b on #0c4b33=4.05:1; 1 measured color recipes; full raw evidence in evidence/axe.",
      "component": "#top nav .active > a",
      "foundBy": [
        "cross-page-analyzer"
      ]
    },
    {
      "rule": "CONTRAST-DARK-BADGE-LINKS",
      "wcag": "1.4.3 AA",
      "severity": "serious",
      "location": "https://www.djangoproject.com/foundation/corporate-members/badges/ | dark theme .variant .links a",
      "summary": "Badge download links become nearly invisible on their fixed gray background in dark theme.",
      "fix": "Use theme-aware badge-panel background and link colors, or retain a sufficiently dark foreground on the #cccccc panel in both themes.",
      "evidence": "1440px and320px: #93d7b7 foreground on #cccccc background =1.03:1 at18px normal weight; expected4.5:1.",
      "component": "Corporate membership badge downloads",
      "foundBy": [
        "contrast-master"
      ]
    },
    {
      "rule": "CONTRAST-DARK-BANNER-CTA",
      "wcag": "1.4.3 AA",
      "severity": "serious",
      "location": "https://www.djangoproject.com/start/ | dark theme .copy-banner .cta",
      "summary": "Dark-theme download call-to-action text fails minimum contrast.",
      "fix": "Set the dark-theme banner CTA text to a light foreground or give it a background that provides at least 4.5:1 for its 18px normal-weight text.",
      "evidence": "1440px and 320px axe: #0e1117 on #187f58 = 3.79:1; expected4.5:1; .cta and its em.",
      "component": "Getting started banner CTA",
      "foundBy": [
        "contrast-master"
      ]
    },
    {
      "rule": "CONTRAST-EXPAND-CONTROLS",
      "wcag": "1.4.3 AA",
      "severity": "serious",
      "location": "https://www.djangoproject.com/community/ | .expandall",
      "summary": "Expand-all and collapse-all labels fail text contrast.",
      "fix": "Use a darker label foreground meeting4.5:1 and implement these controls as keyboard-accessible buttons.",
      "evidence": "4 mutually exclusive instances on 2/100 pages; example .expandall, #cacfcd on #ffffff=1.57:1; 1 measured color recipes; full raw evidence in evidence/axe.",
      "component": ".expandall, .collapseall",
      "foundBy": [
        "cross-page-analyzer"
      ]
    },
    {
      "rule": "CONTRAST-FOOTER-CREDITS",
      "wcag": "1.4.3 AA",
      "severity": "serious",
      "location": "https://www.djangoproject.com/ | .thanks > li:nth-child(1) > span",
      "summary": "Footer credits and donor links fail text contrast.",
      "fix": "Use a lighter footer-specific accent providing4.5:1 on the dark-green footer background.",
      "evidence": "567 mutually exclusive instances on 100/100 pages; example .thanks > li:nth-child(1) > span, #2b8c67 on #0c4b33=2.43:1; 1 measured color recipes; full raw evidence in evidence/axe.",
      "component": "footer .thanks, footer .in-kind-donors",
      "foundBy": [
        "cross-page-analyzer"
      ]
    },
    {
      "rule": "CONTRAST-FOOTER-MAIN",
      "wcag": "1.4.3 AA",
      "severity": "serious",
      "location": "https://www.djangoproject.com/ | .col-learn-more > h3",
      "summary": "Light-theme footer headings and navigation links fail text contrast.",
      "fix": "Darken the footer background or use a dark text color providing4.5:1; preserve visible link focus.",
      "evidence": "3000 mutually exclusive instances on 100/100 pages; example .col-learn-more > h3, #f1fff7 on #44b78b=2.42:1; 1 measured color recipes; full raw evidence in evidence/axe.",
      "component": "footer .col-learn-more a",
      "foundBy": [
        "cross-page-analyzer"
      ]
    },
    {
      "rule": "CONTRAST-LIGHT-BANNER",
      "wcag": "1.4.3 AA",
      "severity": "serious",
      "location": "https://www.djangoproject.com/community/ | section > .container > p",
      "summary": "Light-theme banner text fails large-text contrast.",
      "fix": "Darken banner background or change foreground so large text achieves3:1 and smaller text4.5:1.",
      "evidence": "114 mutually exclusive instances on 99/100 pages; example section > .container > p, #c9f0dd on #44b78b=2.02:1; 2 measured color recipes; full raw evidence in evidence/axe.",
      "component": ".copy-banner p, .copy-banner em",
      "foundBy": [
        "cross-page-analyzer"
      ]
    },
    {
      "rule": "CONTRAST-LIGHT-CTA",
      "wcag": "1.4.3 AA",
      "severity": "serious",
      "location": "https://www.djangoproject.com/ | p:nth-child(2) > .cta",
      "summary": "Light-theme CTA labels fail normal-text contrast.",
      "fix": "Use darker CTA background or dark labels meeting4.5:1; verify18px bold labels against normal-text threshold.",
      "evidence": "14 mutually exclusive instances on 8/100 pages; example p:nth-child(2) > .cta, #ffffff on #44b78b=2.5:1; 2 measured color recipes; full raw evidence in evidence/axe.",
      "component": ".cta",
      "foundBy": [
        "cross-page-analyzer"
      ]
    },
    {
      "rule": "CONTRAST-LIGHT-LINKS",
      "wcag": "1.4.3 AA",
      "severity": "serious",
      "location": "https://www.djangoproject.com/ | .link-readmore:nth-child(3)",
      "summary": "Light-theme green body and sidebar links fail text contrast.",
      "fix": "Darken shared --link-color to meet4.5:1 on white, #f8f8f8, #f1fff7 and tinted table rows and gray badge panels; verify all interaction states.",
      "evidence": "4574 mutually exclusive instances on 100/100 pages; example .link-readmore:nth-child(3), #20aa76 on #f8f8f8=2.79:1; 5 measured color recipes; full raw evidence in evidence/axe.",
      "component": ".link-readmore and main/sidebar a",
      "foundBy": [
        "cross-page-analyzer"
      ]
    },
    {
      "rule": "CONTRAST-METADATA",
      "wcag": "1.4.3 AA",
      "severity": "serious",
      "location": "https://www.djangoproject.com/ | .outline",
      "summary": "Muted metadata and secondary text fail normal-text contrast.",
      "fix": "Darken light-theme metadata tokens to meet4.5:1 on white and sidebar backgrounds, including author and RSS links.",
      "evidence": "812 mutually exclusive instances on 82/100 pages; example .outline, #859d94 on #ffffff=2.89:1; 4 measured color recipes; full raw evidence in evidence/axe.",
      "component": ".list-news .meta, .footnote, .outline",
      "foundBy": [
        "cross-page-analyzer"
      ]
    },
    {
      "rule": "CONTRAST-OTHER-TEXT",
      "wcag": "1.4.3 AA",
      "severity": "serious",
      "summary": "Additional text colors fail minimum contrast outside the shared palette groups.",
      "fix": "Review the remaining measured foreground/background pairs and change text or backgrounds to meet4.5:1 for normal text and3:1 for large text.",
      "component": "Remaining contrast instances",
      "location": "https://www.djangoproject.com/community/ | li:nth-child(1) > span",
      "evidence": "137 mutually exclusive instances on 33/100 pages; example li:nth-child(1) > span, #2b8c67 on #0c4b33=2.43:1; 5 measured color recipes; full raw evidence in evidence/axe.",
      "foundBy": [
        "cross-page-analyzer"
      ]
    },
    {
      "rule": "CONTRAST-SPONSOR-EYEBROW",
      "wcag": "1.4.3 AA",
      "severity": "serious",
      "location": "https://www.djangoproject.com/sponsor/ | .sponsor-intro > .sponsor-eyebrow",
      "summary": "Sponsor section eyebrows fail normal-text contrast.",
      "fix": "Darken light-theme sponsor accent text to meet4.5:1 against white and #f8f8f8 backgrounds.",
      "evidence": "22 mutually exclusive instances on 4/100 pages; example .sponsor-intro > .sponsor-eyebrow, #2b8c67 on #ffffff=4.15:1; 2 measured color recipes; full raw evidence in evidence/axe.",
      "component": ".sponsor-eyebrow",
      "foundBy": [
        "cross-page-analyzer"
      ]
    },
    {
      "rule": "FORM-001",
      "wcag": "4.1.2 A",
      "severity": "serious",
      "location": "djangoproject/static/js/djangoproject.js:206",
      "summary": "Choosing Other amount creates an unnamed donation amount input and removes the existing label target.",
      "fix": "Give the new input id=id_amount so the existing Donation amount label remains associated; associate the USD integer instruction using aria-describedby.",
      "evidence": "Production /fundraising/: Other amount creates <input type=\"number\" name=\"amount\"> with labels=[], aria-label=null, aria-labelledby=null; axe label failure. See evidence/behavior.json.",
      "component": "Donation custom amount",
      "foundBy": [
        "forms-specialist"
      ]
    },
    {
      "rule": "FORM-002",
      "wcag": "1.3.1 A",
      "severity": "serious",
      "location": "djangoproject/templates/fundraising/includes/_form.html:8",
      "summary": "Donation management renders amount, interval and logo fields without associated labels.",
      "fix": "Render each normal field with as_field_group or label_tag; use fieldsets and legends for radio groups and associate help/error descriptions.",
      "evidence": "The normal-field branch renders only {{ field }}. DonationForm subscription_amount and interval have no placeholder; DjangoHeroForm logo has no label.",
      "component": "Donation management form",
      "foundBy": [
        "forms-specialist"
      ]
    },
    {
      "rule": "FORM-003",
      "wcag": "4.1.2 A",
      "severity": "serious",
      "location": "djangoproject/templates/members/corporatemember_form.html:18",
      "summary": "The corporate membership level select has no programmatic accessible name.",
      "fix": "Render field.label_tag for membership level and other label_fields so the label for attribute refers to its widget ID; associate errors/help text separately.",
      "evidence": "Production axe select-name flags #id_membership_level; template emits {{ field.label }} as plain text. https://dequeuniversity.com/rules/axe/4.13/select-name?application=axeAPI",
      "component": "Corporate membership join form",
      "foundBy": [
        "aria-specialist",
        "forms-specialist"
      ]
    },
    {
      "rule": "KEYBOARD-001",
      "wcag": "2.1.1 A",
      "severity": "serious",
      "location": "djangoproject/static/js/mod/list-collapsing.js:18",
      "summary": "Accordion headings and Expand All / Collapse All cannot be activated by keyboard.",
      "fix": "Render native buttons inside headings and native Expand All / Collapse All buttons; retain click handling and expose aria-expanded on each disclosure.",
      "evidence": "Production /start/: focused heading Enter and Space leave li class unchanged; click changes class to active. Expand/Collapse All spans have tabIndex=-1. Source lines18-45. See evidence/behavior.json.",
      "component": "Collapsing lists",
      "foundBy": [
        "keyboard-navigator"
      ]
    },
    {
      "rule": "ARIA-EXPANDED-001",
      "wcag": "4.1.2 A",
      "severity": "moderate",
      "location": "djangoproject/templates/includes/header.html:9",
      "summary": "The mobile navigation disclosure button does not expose whether the menu is expanded or collapsed.",
      "fix": "Initialize aria-expanded=\"false\" on the Menu button, give the controlled nav an id and connect aria-controls; update aria-expanded on every toggle in djangoproject.js.",
      "evidence": "Production button is <button class=\"menu-button\">…Menu…</button>; its click handler only toggles active classes on button and nav.",
      "component": "Shared mobile navigation",
      "foundBy": [
        "aria-specialist",
        "playwright-scanner"
      ]
    },
    {
      "rule": "FORM-004",
      "wcag": "1.3.5 AA",
      "severity": "moderate",
      "location": "contact/forms.py:27",
      "summary": "The contact form does not expose autocomplete purposes for the user name and email.",
      "fix": "Set autocomplete=name on name and autocomplete=email on email; add appropriate name/email tokens to profile and corporate contact fields.",
      "evidence": "BaseContactForm name/email widgets specify only class=required; accounts/forms.py:31-35 similarly sets only placeholder.",
      "component": "Personal information forms",
      "foundBy": [
        "forms-specialist"
      ]
    },
    {
      "rule": "KEYBOARD-002",
      "wcag": "2.1.1 A",
      "severity": "moderate",
      "location": "djangoproject/static/js/djangoproject.js:107",
      "summary": "Copy code controls are click-only spans excluded from keyboard navigation.",
      "fix": "Create button type=button with an accessible Copy code name and preserve the clipboard handler so Enter and Space work.",
      "evidence": "document.createElement(\"span\") creates .btn-clipboard; only a click handler is registered at line 130.",
      "component": "Code clipboard",
      "foundBy": [
        "keyboard-navigator"
      ]
    },
    {
      "rule": "KEYBOARD-003",
      "wcag": "2.1.1 A",
      "severity": "moderate",
      "location": "djangoproject/templates/base.html:83",
      "summary": "Message dismissal icons cannot be reached or activated by keyboard.",
      "fix": "Replace the close icon with button type=button named Dismiss message; hide its decorative icon and preserve click handling.",
      "evidence": "<i class=\"close icon icon-remove\" title=\"close\"></i>; djangoproject.js:16-23 attaches only click.",
      "component": "Messages",
      "foundBy": [
        "keyboard-navigator"
      ]
    },
    {
      "rule": "KEYBOARD-004",
      "wcag": "2.1.4 A",
      "severity": "moderate",
      "location": "djangoproject/static/js/djangoproject.js:84",
      "summary": "The global slash shortcut cannot be disabled, remapped, or restricted to a focused component.",
      "fix": "Keep Ctrl/Command+K, and either remove the unmodified slash shortcut or provide a persistent disable/remap preference; ignore editable content.",
      "evidence": "Production homepage: pressing / while logo is focused moves focus to #id_q. Source window handler supports unmodified / without disable/remap preference.",
      "component": "Search keyboard shortcut",
      "foundBy": [
        "keyboard-navigator"
      ]
    },
    {
      "rule": "MOTION-FUNDRAISING-HEART",
      "wcag": "2.2.2 A",
      "severity": "moderate",
      "location": "djangoproject/scss/_style.scss:3386",
      "summary": "Fundraising heart pixels pulse indefinitely without a pause or stop control.",
      "fix": "Make fundraising progress pixels static or stop pulsing within five seconds; respect prefers-reduced-motion. The percentage and static heart convey the progress without animation.",
      "evidence": "Production fundraising is 47% funded with 15 faded rects; computed animation is pixel-pulse 3s infinite even with reducedMotion=reduce; control inventory contains menu, search, theme and donate, no pause.",
      "component": "Fundraising progress heart",
      "foundBy": [
        "contrast-master"
      ]
    },
    {
      "rule": "RUNTIME-REFLOW-001",
      "wcag": "1.4.10 AA",
      "severity": "moderate",
      "location": "https://www.djangoproject.com/fundraising/#donate",
      "summary": "The custom donation amount state creates horizontal page overflow at 320 CSS pixels.",
      "fix": "Remove the fundraising description minimum width at narrow viewports and size the custom amount input within its container using width:100%, max-width:100%, and box-sizing:border-box.",
      "evidence": "At320 viewport after Other amount: documentElement.scrollWidth=328; .description width300/right325 and input width303/right328. Other tested pages scrollWidth=320.",
      "component": "Donation form",
      "confidence": "medium",
      "foundBy": [
        "playwright-scanner"
      ]
    },
    {
      "rule": "STATUS-CARD-UPDATED",
      "wcag": "4.1.3 AA",
      "severity": "moderate",
      "location": "djangoproject/templates/fundraising/manage-donations.html:48",
      "summary": "Successful payment-card updates are inserted without an assistive-technology status announcement.",
      "fix": "Give .change-card-result role=status before updates, keeping the visible Card updated text.",
      "evidence": "The callback sets .change-card-result.text(\"Card updated\"); manage-donations.html:48 renders a plain span without role or aria-live.",
      "component": "Manage donations card update",
      "foundBy": [
        "forms-specialist",
        "live-region-controller"
      ]
    },
    {
      "rule": "STATUS-CLIPBOARD",
      "wcag": "4.1.3 AA",
      "severity": "moderate",
      "location": "djangoproject/static/js/djangoproject.js:137",
      "summary": "Clipboard success and error messages are inserted without a status or alert role.",
      "fix": "Add an empty persistent role=status region before copying, update its text with success or failure, and preserve the message long enough to be perceived; keep keyboard focus on the copy button.",
      "evidence": "Creates span.clipboard-success and sets innerText to Copied! or Could not copy!; no aria-live/role; fades after 1 or 5 seconds.",
      "component": "Code clipboard feedback",
      "foundBy": [
        "live-region-controller"
      ]
    },
    {
      "rule": "TITLE-001",
      "wcag": "2.4.2 A",
      "severity": "moderate",
      "confidence": "medium",
      "location": "djangoproject/templates/base_foundation.html:8",
      "summary": "Member directories, team directory and badge downloads share a generic foundation title that omits their specific purpose.",
      "fix": "Override the title block in corporate_member_badges.html, corporatemember_list.html, individualmember_list.html and team_list.html with their page heading and the foundation name.",
      "evidence": "Production corporate-members/badges, corporate-members, individual-members and teams all have <title>Django Software Foundation | Django</title>.",
      "component": "Foundation child page titles",
      "foundBy": [
        "alt-text-headings"
      ]
    }
  ],
  "passed": [
    "Base template contains a skip link to main-content.",
    "Blog and foundation meeting Read more links share a list item with the descriptive linked heading, providing contextual purpose under 2.4.4.",
    "Both automatic prefers-color-scheme and explicit light/dark theme variants exist.",
    "CI already installs Chromium and Firefox via Playwright and runs make ci with both browser flags.",
    "Commented historical homepage placeholders are excluded from findings.",
    "Corporate sponsor logos have organization-name alternatives; sponsor plan logos are decorative next to text.",
    "Dark normal-content links pass contrast on reviewed pages outside badge-panel exception.",
    "Dark-theme link-green foreground #93D7B7 against #0e1117 is above 4.5:1; muted text is lightened for dark theme.",
    "Documentation search input has a visually hidden associated label and named submit button.",
    "Donation errors use native alert() rather than an untrapped custom overlay.",
    "Donation frequency and preset amount selects have associated visible labels.",
    "Donation setup error is displayed using a native alert dialog rather than an unannounced visual toast.",
    "Download page tables use native th column headers with straightforward one-row header relationships.",
    "Foundation contact form uses Django as_field_group rendering.",
    "Fundraising progress SVG has a descriptive accessible name including funded percentage.",
    "Getting started content is divided into descriptive sections and code examples.",
    "Global anchors and buttons have focus outlines, subject to local overrides.",
    "Homepage primary call-to-action links have descriptive text.",
    "Login includes username/password labels and a password-reset route.",
    "Main navigation menu toggle uses a native button.",
    "Measured mobile Menu, search submit and theme buttons exceed24px in both dimensions.",
    "Mobile Menu button activates with Enter and has a visible 2px solid focus outline.",
    "No bespoke modal/dialog implementation was found in the reviewed marketing/foundation templates and JavaScript.",
    "No document horizontal overflow at320px on homepage, start, selected blog article, corporate badge page and sponsor plans in either theme.",
    "No grid, treegrid or sortable table widgets were found in scoped source.",
    "No horizontal page overflow on homepage, start or corporate join at widths320,768,1024,1440.",
    "No positive tabindex values found in reviewed templates.",
    "No source-level paste prevention or memory-only authentication puzzle found in reviewed first-party scripts.",
    "Production skip link sets the sequential navigation starting point inside main: the next Tab reaches Learn more about Django, even though activeElement is body.",
    "Production social media reach table uses scoped column and row headers.",
    "Production sponsorship comparison uses scoped column, row and rowgroup headers; table is labeled by an existing heading.",
    "Project has a shared StaticLiveServerTestCase/Playwright browser test harness in djangoproject/tests.py.",
    "Registration and login templates provide explicitly associated visible username/password/email labels.",
    "Release schedule source uses scope=\"col\" for Date and Milestone.",
    "Representative production pages have lang=\"en\" and a main landmark.",
    "Search and navigation landmarks have accessible labels.",
    "Theme and search icon glyphs are hidden from assistive technology.",
    "Theme control meets45x45px source dimensions.",
    "Theme toggle is explicitly 45 by 45 CSS pixels.",
    "aria-labelledby/describedby/controls references resolve on homepage, download, sponsor plans, badge downloads and ecosystem pages."
  ],
  "notes": [
    {
      "skill": "alt-text-headings",
      "note": "Skipped heading levels alone are not reported as WCAG failures."
    },
    {
      "skill": "alt-text-headings",
      "note": "Release-roadmap graphic is accompanied by supported/future/unsupported release data tables; its generic short alternative alone is not treated as a failure."
    },
    {
      "skill": "alt-text-headings",
      "note": "Flatpage and blog database content beyond representative runtime pages is outside this source-only review."
    },
    {
      "skill": "aria-specialist",
      "note": "ALT-001 and FORM-003 intentionally correlate existing source specialist findings; parent must deduplicate by rule and source location rather than score twice."
    },
    {
      "skill": "aria-specialist",
      "note": "Native navigation landmark should wrap native list rather than replacing its role."
    },
    {
      "skill": "aria-specialist",
      "note": "Final100pages: pagination7nodes across7pages, image alternatives16nodes on1page, select name1node on1page."
    },
    {
      "skill": "aria-specialist",
      "note": "Click-only copy controls and conditional message-dismiss controls were shared with the keyboard specialist for deduplication."
    },
    {
      "skill": "aria-specialist",
      "note": "Redundant landmark roles and region naming preferences are not treated as WCAG failures."
    },
    {
      "skill": "cognitive-accessibility",
      "note": "Accessible authentication cannot be fully established without checking actual rendered password-manager support and external reCAPTCHA/Stripe flows."
    },
    {
      "skill": "cognitive-accessibility",
      "note": "Technical Django terminology fits developer documentation; jargon alone is not an AA failure."
    },
    {
      "skill": "cognitive-accessibility",
      "note": "No multi-step redundant-entry or timeout failure confirmed within reviewed source."
    },
    {
      "skill": "cognitive-accessibility",
      "note": "Clipboard status timing is captured by live-region-controller rather than duplicated here."
    },
    {
      "skill": "contrast-master",
      "note": "No blanket failure assigned for absent reduced-motion media query: short transitions alone do not fail WCAG AA."
    },
    {
      "skill": "contrast-master",
      "note": "Target-size assessment for other components needs runtime geometry and spacing exceptions."
    },
    {
      "skill": "contrast-master",
      "note": "Best practices: short smooth scrolling and transition effects do not adapt to reduced motion; no standalone AA failure assigned."
    },
    {
      "skill": "contrast-master",
      "note": "Source color recipes verified in production and consolidated into cross-page-analyzer findings; production main background is #ffffff rather than source $white #F1FFF7. Search-filter focus candidate not runtime confirmed and removed from scored findings."
    },
    {
      "skill": "contrast-master",
      "note": "Production motion finding verified by reduced-motion computed styles and complete visible control inventory; all palette defects are emitted only by cross-page-analyzer to avoid duplicates."
    },
    {
      "skill": "cross-page-analyzer",
      "note": "CONTRAST-LIGHT-CTA: shared-template, 8/100 pages, 14 distinct nodes."
    },
    {
      "skill": "cross-page-analyzer",
      "note": "CONTRAST-METADATA: shared-template, 82/100 pages, 812 distinct nodes."
    },
    {
      "skill": "cross-page-analyzer",
      "note": "CONTRAST-LIGHT-LINKS: systemic, 100/100 pages, 4574 distinct nodes."
    },
    {
      "skill": "cross-page-analyzer",
      "note": "CONTRAST-FOOTER-MAIN: systemic, 100/100 pages, 3000 distinct nodes."
    },
    {
      "skill": "cross-page-analyzer",
      "note": "CONTRAST-FOOTER-CREDITS: systemic, 100/100 pages, 567 distinct nodes."
    },
    {
      "skill": "cross-page-analyzer",
      "note": "CONTRAST-ACTIVE-NAV: shared-template, 98/100 pages, 98 distinct nodes."
    },
    {
      "skill": "cross-page-analyzer",
      "note": "CONTRAST-LIGHT-BANNER: shared-template, 99/100 pages, 114 distinct nodes."
    },
    {
      "skill": "cross-page-analyzer",
      "note": "CONTRAST-EXPAND-CONTROLS: shared-template, 2/100 pages, 4 distinct nodes."
    },
    {
      "skill": "cross-page-analyzer",
      "note": "CONTRAST-OTHER-TEXT: shared-template, 33/100 pages, 137 distinct nodes."
    },
    {
      "skill": "cross-page-analyzer",
      "note": "CONTRAST-SPONSOR-EYEBROW: shared-template, 4/100 pages, 22 distinct nodes."
    },
    {
      "skill": "cross-page-analyzer",
      "note": "100 completed desktoplight files; 9342 color-contrast nodes partitioned without overlap. Components classified by selector first, then shared recipe when selector lacks an ancestor; ambiguous leftovers kept separate."
    },
    {
      "skill": "cross-page-analyzer",
      "note": "Risk scores are remediation prioritization, not WCAG conformance evidence."
    },
    {
      "skill": "cross-page-analyzer",
      "note": "No baseline, full accessibility-tree diff or keyboard-flow comparison supplied."
    },
    {
      "skill": "forms-specialist",
      "note": "No forms submitted, accounts modified, payments made, or third-party checkout opened."
    },
    {
      "skill": "forms-specialist",
      "note": "Custom paragraph errors/help text in older templates do not supply IDs even though modern Django may auto-generate aria-describedby references; verify rendered invalid forms locally before recording an additional failure."
    },
    {
      "skill": "forms-specialist",
      "note": "Profile and several corporate/donor text fields rely on placeholders; persistent labels are recommended, but placeholder presence alone is not recorded as an unequivocal missing accessible-name failure."
    },
    {
      "skill": "forms-specialist",
      "note": "Source defects in authenticated donation-management/profile views are recorded as source-only coverage, not verified production behavior."
    },
    {
      "skill": "keyboard-navigator",
      "note": "Runtime keyboard testing and focus contrast measurements are handled by the parent audit."
    },
    {
      "skill": "keyboard-navigator",
      "note": "Documentation console tabs use display:none radio controls in scss/_console-tabs.scss:11-13; generated production markup requires runtime confirmation."
    },
    {
      "skill": "keyboard-navigator",
      "note": "Placeholder-only labels and missing aria-expanded are handled in forms or ARIA findings."
    },
    {
      "skill": "link-checker",
      "note": "Read more links in start.html benefit from preceding descriptive headings and explanatory content; individual link names could be more useful in a screen-reader links list (AAA/advisory)."
    },
    {
      "skill": "link-checker",
      "note": "New-tab warning, raw URL text, and file size indicators are not automatic WCAG AA failures."
    },
    {
      "skill": "link-checker",
      "note": "Runtime accessible-name and destination checks remain with parent browser review."
    },
    {
      "skill": "live-region-controller",
      "note": "Read-only audit did not execute payment or saved-card mutations."
    },
    {
      "skill": "live-region-controller",
      "note": "Collapsing content needs expanded state and keyboard semantics rather than blanket live regions."
    },
    {
      "skill": "live-region-controller",
      "note": "Static server-rendered form responses do not inherently require live regions."
    },
    {
      "skill": "modal-specialist",
      "note": "Card change invokes externally hosted StripeCheckout; focus trapping, dismissal, return and accessible naming require authorized account/payment runtime coverage and were not tested."
    },
    {
      "skill": "modal-specialist",
      "note": "The mobile navigation is a non-modal disclosure; modal focus trapping is not required. Its expanded-state semantics belong in the ARIA review."
    },
    {
      "skill": "playwright-scanner",
      "note": "Runtime corroboration of KEYBOARD-001, KEYBOARD-004, FORM-001 and FORM-003 was added to their existing specialist payloads to avoid duplicate findings."
    },
    {
      "skill": "playwright-scanner",
      "note": "Raw behavior evidence is .a11y-history/20261002T185438Z/evidence/behavior.json; skip/focus follow-up is evidence/focus.json."
    },
    {
      "skill": "playwright-scanner",
      "note": "Chrome system Chromium via Playwright; no screenshots, form submissions, payments, account changes or checkout openings."
    },
    {
      "skill": "playwright-scanner",
      "note": "State axe output includes color contrast results for parent aggregation; duplicate baseline contrast findings are not emitted here."
    },
    {
      "skill": "playwright-scanner",
      "note": "Accordion focus changes its text color and suppresses the outline; color difference needs non-text contrast assessment. Search submit focus also suppresses outline; a before/after computed-style comparison is still needed to prove a missing visible indicator."
    },
    {
      "skill": "playwright-scanner",
      "note": "Behavior tests do not constitute a full screen-reader test or proof of WCAG conformance."
    },
    {
      "skill": "playwright-scanner",
      "note": "Reflow candidate: measured 325px default/328px custom amount document width at320px; verify whether clipped controls require two-dimensional scrolling or cause loss of information/function before treating this as a confirmed1.4.10 failure."
    },
    {
      "skill": "playwright-scanner",
      "note": "Completed 100 successful production desktop light-theme axe scans; 9366 element-level violations, of which 9342 are contrast violations partitioned into ten shared remediation groups."
    },
    {
      "skill": "playwright-scanner",
      "note": "Chromium 152.0.7977.82, Playwright 1.58.2, axe-core 4.13.0; tags wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa; viewport1440x1000; no disabled rules."
    },
    {
      "skill": "playwright-scanner",
      "note": "No findings repeated here: runtime corroboration is preserved in ARIA, forms, contrast and cross-page specialist payloads. Complete raw results, including incomplete checks, are retained in evidence/axe/*.json.gz."
    },
    {
      "skill": "tables-data-specialist",
      "note": "Missing captions or scope attributes alone on simple tables are not WCAG failures."
    },
    {
      "skill": "tables-data-specialist",
      "note": "Runtime review covered five tables on download and sponsor plans; other database-backed tables need the parent crawl to confirm coverage."
    },
    {
      "skill": "testing-coach",
      "note": "Add meaningful accessibility regressions to the existing browser harness: Tab to /start/ disclosure buttons, press Enter and Space, assert content visibility and aria-expanded; assert both bulk controls work by keyboard."
    },
    {
      "skill": "testing-coach",
      "note": "At320 viewport open/close the mobile Menu with Enter, assert aria-expanded changes with visible navigation, then Tab through links and back out; retain an obvious focus indicator."
    },
    {
      "skill": "testing-coach",
      "note": "Select Other amount on /fundraising/ without submitting: assert the numeric input accessible name is Donation amount, instruction is associated, focus moves to it, and document scrollWidth does not exceed clientWidth."
    },
    {
      "skill": "testing-coach",
      "note": "Scan representative locally rendered pages and revealed states with pinned axe-core, including wcag2a,wcag2aa,wcag21a,wcag21aa,wcag22aa tags; save violations and incomplete checks as CI artifacts; use fake Stripe/captcha data rather than contacting real payment APIs."
    },
    {
      "skill": "testing-coach",
      "note": "Test invalid forms locally with synthetic data: verify each error is linked to its field and correction guidance is announced; test corporate member select/file accessible names and contact name/email autocomplete tokens."
    },
    {
      "skill": "testing-coach",
      "note": "Assert every main page has a useful unique title and that template variables do not appear escaped or unresolved in titles; inspect document titles with a screen reader."
    },
    {
      "skill": "testing-coach",
      "note": "Check badge images manually: informative badge text needs equivalent alt; purely decorative badges use empty alt; linked badges need the link purpose expressed in their accessible name."
    },
    {
      "skill": "testing-coach",
      "note": "Before sign-off, run NVDA with Firefox or Chrome on Windows and VoiceOver with Safari on macOS/iOS: navigate landmarks/headings, activate disclosures/menu, hear donation amount name/instructions and corporate fields, review error announcements and badge alternatives; record actual announcements and versions."
    },
    {
      "skill": "testing-coach",
      "note": "The report score and grade are heuristic prioritization measures, not WCAG conformance proof. Automated checks, limited browser states and source inspection leave screen-reader behavior and third-party checkout unverified."
    },
    {
      "skill": "testing-coach",
      "note": "Re-scan affected pages after each fix; run the representative browser/axe regression set for every PR touching templates, JavaScript or styles, and repeat the scoped production crawl following deployment."
    },
    {
      "skill": "contrast-master",
      "note": "28 scenes tested:7URLs,1440/320px, explicitlight/dark, WCAG2A/AA,2.1A/AA,2.2AA axe tags."
    },
    {
      "skill": "contrast-master",
      "note": "Light-theme findings consolidated into cross-page-analyzer; image-alt findings left to image specialist/parent."
    },
    {
      "skill": "contrast-master",
      "note": "Download page reaches365px document width due release tables; tabular content may qualify for1.4.10 two-dimensional layout exception, recommend local horizontal scroll to contain overflow."
    },
    {
      "skill": "contrast-master",
      "note": "Fundraising document width325px at320px from description width100% plus5% margin; minor horizontal overflow observed but no confirmed loss of content/function, so not scored as AA failure."
    },
    {
      "skill": "contrast-master",
      "note": "Reflow tested with320CSSpixel viewport equivalent to1280px at400%; no screen-reader visual verification performed."
    },
    {
      "skill": "contrast-master",
      "note": "Source and production CSS differ:14px bold .link-readmore in production versus source14px normal; white main background versus #F1FFF7 source token. Raw measured colors take precedence."
    }
  ],
  "counts": {
    "critical": 0,
    "serious": 18,
    "moderate": 10,
    "minor": 0
  },
  "components": [],
  "score": 68,
  "grade": "D",
  "penalty": 108.8,
  "checks": 68,
  "generated": "2026-10-02",
  "template": "web"
}
```
