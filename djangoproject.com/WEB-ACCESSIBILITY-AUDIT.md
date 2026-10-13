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

## Audit scope and limitations

| Field | Value |
|---|---|
| Target standard | WCAG 2.2 AA |
| Framework | Django |
| Method | Production runtime and local source review |
| Review depth | Deep dive |
| Production pages scanned | 100 |
| Starting URL | https://www.djangoproject.com/ |
| Runtime host | www.djangoproject.com |
| Source revision | 911575b3d8a6e3fb48d116ce6f42cdbcd7dae4bc |
| Browser | Chromium 152.0.7977.82 |
| Playwright | 1.58.2 |
| axe-core | 4.13.0 |
| axe tags | wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa |
| Baseline viewport/theme | 1440x1000, explicit light color scheme |
| Additional visual scenes | 7 URLs x 2 widths (1440/320) x 2 explicit themes = 28 |
| Behavioral testing | 4 URLs; keyboard, disclosure/menu state, custom donation amount and accessible names |
| Screenshots | Disabled as requested |
| Baseline comparison | No previous report supplied |
| Product changes | None |

- docs.djangoproject.com not included; source-only review of shared code is not documentation runtime coverage.
- Authenticated donor/account pages and payment/checkout submissions not runtime tested.
- No actual human screen-reader session was performed.
- HTTP429 responses during discovery were recorded and broad crawling stopped; key pages subsequently retrieved at a slower pace.
- Query URLs, non-HTML downloads, administrative/checklist routes and destructive/account-action paths excluded.
- Runtime production CSS and local source have observable differences; production measurements take precedence.
- No source fixes or CI changes applied.
- Heuristic scores are prioritization aids, not WCAG conformance certificates.

Source review covers shared and representative Django templates, form definitions, JavaScript and SCSS. The 100-page runtime sample is bounded; it does not establish site-wide conformance or exhaust historical/database content. Re-scan these URLs after deployment because the local source and deployed styles differ.

The renderer score is a findings-based heuristic: serious findings weigh 5, moderate 2, minor 1 and critical 10, scaled against reported checks, with confidence adjustments. Its grade uses A >= 90, B >= 80, C >= 70 and D >= 60. It is not a percentage of WCAG criteria met. Medium-confidence findings, including the reflow candidate and generic page titles, need human confirmation.

## Runtime scan summary

100 production pages were scanned at desktop width with an explicit light color scheme. 9,366 element-level violations were recorded, including 9,342 contrast violations grouped into ten shared remediation groups. Repeated nodes are not separate report findings.

| axe rule | Affected pages | Element instances |
|---|---:|---:|
| [color-contrast](https://dequeuniversity.com/rules/axe/4.13/color-contrast?application=axeAPI) | 100 | 9342 |
| [listitem](https://dequeuniversity.com/rules/axe/4.13/listitem?application=axeAPI) | 7 | 7 |
| [image-alt](https://dequeuniversity.com/rules/axe/4.13/image-alt?application=axeAPI) | 1 | 16 |
| [select-name](https://dequeuniversity.com/rules/axe/4.13/select-name?application=axeAPI) | 1 | 1 |

[Runtime page summary](ACCESSIBILITY-SCAN.md) and [scan index and violations](ACCESSIBILITY-SCAN.json) preserve the automated output. Full axe results, including incomplete checks, are retained as compressed JSON in `.a11y-history/20261002T185438Z/evidence/axe/`.

The separate default-browser axe CLI homepage scan returned no violations. Explicit light-theme scans found contrast failures, and explicit dark-theme checks found two additional contrast problems. Treat the default-browser result as limited to its environment and state.

## Detailed finding evidence

### 1. ALT-001

All 16 corporate membership badge previews lack text alternatives identifying the badge and visual variant.

- Criterion: 1.1.1 A. Severity: serious. Confidence: high.
- Location: `djangoproject/templates/members/corporate_member_badges.html:44`.
- Reviewed by: alt-text-headings, aria-specialist.

Evidence:

```text
Production /foundation/corporate-members/badges/: <img src="…/bronze.982734d94010.svg"> has no alt; visual inspection confirms text "django Bronze Member".
```

Remediation: Add alt text identifying the membership level and variant, for example "Django Bronze Member badge, full colour"; expose variant names in the data supplied to this template.

### 2. ARIA-PAGINATION-LIST

Pagination overrides the list role with navigation, leaving list items without a list parent.

- Criterion: 1.3.1 A. Severity: serious. Confidence: high.
- Location: `djangoproject/templates/blog/blog_pagination.html:5`.
- Reviewed by: aria-specialist.

Evidence:

```text
<ul class="nav-pagination" role="navigation">; axe listitem finds .nav-pagination > li on7pages. https://dequeuniversity.com/rules/axe/4.13/listitem?application=axeAPI
```

Remediation: Use <nav aria-label="Pagination"><ul class="nav-pagination">...</ul></nav> in blog and aggregator templates; put the Page x of y text outside the ul or in a li. Preserve native list semantics.

### 3. CONTRAST-ACTIVE-NAV

Current-page desktop navigation link fails normal-text contrast.

- Criterion: 1.4.3 AA. Severity: serious. Confidence: high.
- Location: `https://www.djangoproject.com/community/ | .active > a`.
- Reviewed by: cross-page-analyzer.

Evidence:

```text
98 mutually exclusive instances on 98/100 pages; example .active > a, #44b78b on #0c4b33=4.05:1; 1 measured color recipes; full raw evidence in evidence/axe.
```

Remediation: Use a lighter selected-navigation foreground with4.5:1 contrast in both themes; keep a non-color current-page indicator.

### 4. CONTRAST-DARK-BADGE-LINKS

Badge download links become nearly invisible on their fixed gray background in dark theme.

- Criterion: 1.4.3 AA. Severity: serious. Confidence: high.
- Location: `https://www.djangoproject.com/foundation/corporate-members/badges/ | dark theme .variant .links a`.
- Reviewed by: contrast-master.

Evidence:

```text
1440px and320px: #93d7b7 foreground on #cccccc background =1.03:1 at18px normal weight; expected4.5:1.
```

Remediation: Use theme-aware badge-panel background and link colors, or retain a sufficiently dark foreground on the #cccccc panel in both themes.

### 5. CONTRAST-DARK-BANNER-CTA

Dark-theme download call-to-action text fails minimum contrast.

- Criterion: 1.4.3 AA. Severity: serious. Confidence: high.
- Location: `https://www.djangoproject.com/start/ | dark theme .copy-banner .cta`.
- Reviewed by: contrast-master.

Evidence:

```text
1440px and 320px axe: #0e1117 on #187f58 = 3.79:1; expected4.5:1; .cta and its em.
```

Remediation: Set the dark-theme banner CTA text to a light foreground or give it a background that provides at least 4.5:1 for its 18px normal-weight text.

### 6. CONTRAST-EXPAND-CONTROLS

Expand-all and collapse-all labels fail text contrast.

- Criterion: 1.4.3 AA. Severity: serious. Confidence: high.
- Location: `https://www.djangoproject.com/community/ | .expandall`.
- Reviewed by: cross-page-analyzer.

Evidence:

```text
4 mutually exclusive instances on 2/100 pages; example .expandall, #cacfcd on #ffffff=1.57:1; 1 measured color recipes; full raw evidence in evidence/axe.
```

Remediation: Use a darker label foreground meeting4.5:1 and implement these controls as keyboard-accessible buttons.

### 7. CONTRAST-FOOTER-CREDITS

Footer credits and donor links fail text contrast.

- Criterion: 1.4.3 AA. Severity: serious. Confidence: high.
- Location: `https://www.djangoproject.com/ | .thanks > li:nth-child(1) > span`.
- Reviewed by: cross-page-analyzer.

Evidence:

```text
567 mutually exclusive instances on 100/100 pages; example .thanks > li:nth-child(1) > span, #2b8c67 on #0c4b33=2.43:1; 1 measured color recipes; full raw evidence in evidence/axe.
```

Remediation: Use a lighter footer-specific accent providing4.5:1 on the dark-green footer background.

### 8. CONTRAST-FOOTER-MAIN

Light-theme footer headings and navigation links fail text contrast.

- Criterion: 1.4.3 AA. Severity: serious. Confidence: high.
- Location: `https://www.djangoproject.com/ | .col-learn-more > h3`.
- Reviewed by: cross-page-analyzer.

Evidence:

```text
3000 mutually exclusive instances on 100/100 pages; example .col-learn-more > h3, #f1fff7 on #44b78b=2.42:1; 1 measured color recipes; full raw evidence in evidence/axe.
```

Remediation: Darken the footer background or use a dark text color providing4.5:1; preserve visible link focus.

### 9. CONTRAST-LIGHT-BANNER

Light-theme banner text fails large-text contrast.

- Criterion: 1.4.3 AA. Severity: serious. Confidence: high.
- Location: `https://www.djangoproject.com/community/ | section > .container > p`.
- Reviewed by: cross-page-analyzer.

Evidence:

```text
114 mutually exclusive instances on 99/100 pages; example section > .container > p, #c9f0dd on #44b78b=2.02:1; 2 measured color recipes; full raw evidence in evidence/axe.
```

Remediation: Darken banner background or change foreground so large text achieves3:1 and smaller text4.5:1.

### 10. CONTRAST-LIGHT-CTA

Light-theme CTA labels fail normal-text contrast.

- Criterion: 1.4.3 AA. Severity: serious. Confidence: high.
- Location: `https://www.djangoproject.com/ | p:nth-child(2) > .cta`.
- Reviewed by: cross-page-analyzer.

Evidence:

```text
14 mutually exclusive instances on 8/100 pages; example p:nth-child(2) > .cta, #ffffff on #44b78b=2.5:1; 2 measured color recipes; full raw evidence in evidence/axe.
```

Remediation: Use darker CTA background or dark labels meeting4.5:1; verify18px bold labels against normal-text threshold.

### 11. CONTRAST-LIGHT-LINKS

Light-theme green body and sidebar links fail text contrast.

- Criterion: 1.4.3 AA. Severity: serious. Confidence: high.
- Location: `https://www.djangoproject.com/ | .link-readmore:nth-child(3)`.
- Reviewed by: cross-page-analyzer.

Evidence:

```text
4574 mutually exclusive instances on 100/100 pages; example .link-readmore:nth-child(3), #20aa76 on #f8f8f8=2.79:1; 5 measured color recipes; full raw evidence in evidence/axe.
```

Remediation: Darken shared --link-color to meet4.5:1 on white, #f8f8f8, #f1fff7 and tinted table rows and gray badge panels; verify all interaction states.

### 12. CONTRAST-METADATA

Muted metadata and secondary text fail normal-text contrast.

- Criterion: 1.4.3 AA. Severity: serious. Confidence: high.
- Location: `https://www.djangoproject.com/ | .outline`.
- Reviewed by: cross-page-analyzer.

Evidence:

```text
812 mutually exclusive instances on 82/100 pages; example .outline, #859d94 on #ffffff=2.89:1; 4 measured color recipes; full raw evidence in evidence/axe.
```

Remediation: Darken light-theme metadata tokens to meet4.5:1 on white and sidebar backgrounds, including author and RSS links.

### 13. CONTRAST-OTHER-TEXT

Additional text colors fail minimum contrast outside the shared palette groups.

- Criterion: 1.4.3 AA. Severity: serious. Confidence: high.
- Location: `https://www.djangoproject.com/community/ | li:nth-child(1) > span`.
- Reviewed by: cross-page-analyzer.

Evidence:

```text
137 mutually exclusive instances on 33/100 pages; example li:nth-child(1) > span, #2b8c67 on #0c4b33=2.43:1; 5 measured color recipes; full raw evidence in evidence/axe.
```

Remediation: Review the remaining measured foreground/background pairs and change text or backgrounds to meet4.5:1 for normal text and3:1 for large text.

### 14. CONTRAST-SPONSOR-EYEBROW

Sponsor section eyebrows fail normal-text contrast.

- Criterion: 1.4.3 AA. Severity: serious. Confidence: high.
- Location: `https://www.djangoproject.com/sponsor/ | .sponsor-intro > .sponsor-eyebrow`.
- Reviewed by: cross-page-analyzer.

Evidence:

```text
22 mutually exclusive instances on 4/100 pages; example .sponsor-intro > .sponsor-eyebrow, #2b8c67 on #ffffff=4.15:1; 2 measured color recipes; full raw evidence in evidence/axe.
```

Remediation: Darken light-theme sponsor accent text to meet4.5:1 against white and #f8f8f8 backgrounds.

### 15. FORM-001

Choosing Other amount creates an unnamed donation amount input and removes the existing label target.

- Criterion: 4.1.2 A. Severity: serious. Confidence: high.
- Location: `djangoproject/static/js/djangoproject.js:206`.
- Reviewed by: forms-specialist.

Evidence:

```text
Production /fundraising/: Other amount creates <input type="number" name="amount"> with labels=[], aria-label=null, aria-labelledby=null; axe label failure. See evidence/behavior.json.
```

Remediation: Give the new input id=id_amount so the existing Donation amount label remains associated; associate the USD integer instruction using aria-describedby.

### 16. FORM-002

Donation management renders amount, interval and logo fields without associated labels.

- Criterion: 1.3.1 A. Severity: serious. Confidence: high.
- Location: `djangoproject/templates/fundraising/includes/_form.html:8`.
- Reviewed by: forms-specialist.

Evidence:

```text
The normal-field branch renders only {{ field }}. DonationForm subscription_amount and interval have no placeholder; DjangoHeroForm logo has no label.
```

Remediation: Render each normal field with as_field_group or label_tag; use fieldsets and legends for radio groups and associate help/error descriptions.

### 17. FORM-003

The corporate membership level select has no programmatic accessible name.

- Criterion: 4.1.2 A. Severity: serious. Confidence: high.
- Location: `djangoproject/templates/members/corporatemember_form.html:18`.
- Reviewed by: aria-specialist, forms-specialist.

Evidence:

```text
Production axe select-name flags #id_membership_level; template emits {{ field.label }} as plain text. https://dequeuniversity.com/rules/axe/4.13/select-name?application=axeAPI
```

Remediation: Render field.label_tag for membership level and other label_fields so the label for attribute refers to its widget ID; associate errors/help text separately.

### 18. KEYBOARD-001

Accordion headings and Expand All / Collapse All cannot be activated by keyboard.

- Criterion: 2.1.1 A. Severity: serious. Confidence: high.
- Location: `djangoproject/static/js/mod/list-collapsing.js:18`.
- Reviewed by: keyboard-navigator.

Evidence:

```text
Production /start/: focused heading Enter and Space leave li class unchanged; click changes class to active. Expand/Collapse All spans have tabIndex=-1. Source lines18-45. See evidence/behavior.json.
```

Remediation: Render native buttons inside headings and native Expand All / Collapse All buttons; retain click handling and expose aria-expanded on each disclosure.

### 19. ARIA-EXPANDED-001

The mobile navigation disclosure button does not expose whether the menu is expanded or collapsed.

- Criterion: 4.1.2 A. Severity: moderate. Confidence: high.
- Location: `djangoproject/templates/includes/header.html:9`.
- Reviewed by: aria-specialist, playwright-scanner.

Evidence:

```text
Production button is <button class="menu-button">…Menu…</button>; its click handler only toggles active classes on button and nav.
```

Remediation: Initialize aria-expanded="false" on the Menu button, give the controlled nav an id and connect aria-controls; update aria-expanded on every toggle in djangoproject.js.

### 20. FORM-004

The contact form does not expose autocomplete purposes for the user name and email.

- Criterion: 1.3.5 AA. Severity: moderate. Confidence: high.
- Location: `contact/forms.py:27`.
- Reviewed by: forms-specialist.

Evidence:

```text
BaseContactForm name/email widgets specify only class=required; accounts/forms.py:31-35 similarly sets only placeholder.
```

Remediation: Set autocomplete=name on name and autocomplete=email on email; add appropriate name/email tokens to profile and corporate contact fields.

### 21. KEYBOARD-002

Copy code controls are click-only spans excluded from keyboard navigation.

- Criterion: 2.1.1 A. Severity: moderate. Confidence: high.
- Location: `djangoproject/static/js/djangoproject.js:107`.
- Reviewed by: keyboard-navigator.

Evidence:

```text
document.createElement("span") creates .btn-clipboard; only a click handler is registered at line 130.
```

Remediation: Create button type=button with an accessible Copy code name and preserve the clipboard handler so Enter and Space work.

### 22. KEYBOARD-003

Message dismissal icons cannot be reached or activated by keyboard.

- Criterion: 2.1.1 A. Severity: moderate. Confidence: high.
- Location: `djangoproject/templates/base.html:83`.
- Reviewed by: keyboard-navigator.

Evidence:

```text
<i class="close icon icon-remove" title="close"></i>; djangoproject.js:16-23 attaches only click.
```

Remediation: Replace the close icon with button type=button named Dismiss message; hide its decorative icon and preserve click handling.

### 23. KEYBOARD-004

The global slash shortcut cannot be disabled, remapped, or restricted to a focused component.

- Criterion: 2.1.4 A. Severity: moderate. Confidence: high.
- Location: `djangoproject/static/js/djangoproject.js:84`.
- Reviewed by: keyboard-navigator.

Evidence:

```text
Production homepage: pressing / while logo is focused moves focus to #id_q. Source window handler supports unmodified / without disable/remap preference.
```

Remediation: Keep Ctrl/Command+K, and either remove the unmodified slash shortcut or provide a persistent disable/remap preference; ignore editable content.

### 24. MOTION-FUNDRAISING-HEART

Fundraising heart pixels pulse indefinitely without a pause or stop control.

- Criterion: 2.2.2 A. Severity: moderate. Confidence: high.
- Location: `djangoproject/scss/_style.scss:3386`.
- Reviewed by: contrast-master.

Evidence:

```text
Production fundraising is 47% funded with 15 faded rects; computed animation is pixel-pulse 3s infinite even with reducedMotion=reduce; control inventory contains menu, search, theme and donate, no pause.
```

Remediation: Make fundraising progress pixels static or stop pulsing within five seconds; respect prefers-reduced-motion. The percentage and static heart convey the progress without animation.

### 25. RUNTIME-REFLOW-001

The custom donation amount state creates horizontal page overflow at 320 CSS pixels.

- Criterion: 1.4.10 AA. Severity: moderate. Confidence: medium.
- Location: `https://www.djangoproject.com/fundraising/#donate`.
- Reviewed by: playwright-scanner.

Evidence:

```text
At320 viewport after Other amount: documentElement.scrollWidth=328; .description width300/right325 and input width303/right328. Other tested pages scrollWidth=320.
```

Remediation: Remove the fundraising description minimum width at narrow viewports and size the custom amount input within its container using width:100%, max-width:100%, and box-sizing:border-box.

### 26. STATUS-CARD-UPDATED

Successful payment-card updates are inserted without an assistive-technology status announcement.

- Criterion: 4.1.3 AA. Severity: moderate. Confidence: high.
- Location: `djangoproject/templates/fundraising/manage-donations.html:48`.
- Reviewed by: forms-specialist, live-region-controller.

Evidence:

```text
The callback sets .change-card-result.text("Card updated"); manage-donations.html:48 renders a plain span without role or aria-live.
```

Remediation: Give .change-card-result role=status before updates, keeping the visible Card updated text.

### 27. STATUS-CLIPBOARD

Clipboard success and error messages are inserted without a status or alert role.

- Criterion: 4.1.3 AA. Severity: moderate. Confidence: high.
- Location: `djangoproject/static/js/djangoproject.js:137`.
- Reviewed by: live-region-controller.

Evidence:

```text
Creates span.clipboard-success and sets innerText to Copied! or Could not copy!; no aria-live/role; fades after 1 or 5 seconds.
```

Remediation: Add an empty persistent role=status region before copying, update its text with success or failure, and preserve the message long enough to be perceived; keep keyboard focus on the copy button.

### 28. TITLE-001

Member directories, team directory and badge downloads share a generic foundation title that omits their specific purpose.

- Criterion: 2.4.2 A. Severity: moderate. Confidence: medium.
- Location: `djangoproject/templates/base_foundation.html:8`.
- Reviewed by: alt-text-headings.

Evidence:

```text
Production corporate-members/badges, corporate-members, individual-members and teams all have <title>Django Software Foundation | Django</title>.
```

Remediation: Override the title block in corporate_member_badges.html, corporatemember_list.html, individualmember_list.html and team_list.html with their page heading and the foundation name.

## Page metadata dashboard

| Property | Present | Missing |
|---|---:|---:|
| Page title | 100 | 0 |
| Document language | 100 | 0 |
| Viewport meta | 100 | 0 |
| Main landmark | 100 | 0 |
| Skip navigation link | 100 | 0 |

Presence does not establish quality: generic foundation titles are a separate finding.

## Automated page scorecard

This separate page score uses the Phase 9 risk formula: 100 minus 7 for each distinct serious rule or failing foreground/background pair, floored at zero. Repeated elements with the same pair count once. These scores cover desktop light-theme axe findings only; source-only, keyboard, dark-theme and manual findings are excluded. They are not conformance grades and use different thresholds from the package renderer.

| Page | Automated risk score | Risk grade | Failed rules | Element instances | Page title |
|---|---:|---|---:|---:|---|
| [/](https://www.djangoproject.com/) | 44 | D | 1 | 76 | The web framework for perfectionists with deadlines \| Django |
| [/community/](https://www.djangoproject.com/community/) | 58 | C | 1 | 64 | Django Community \| Django |
| [/conduct/](https://www.djangoproject.com/conduct/) | 58 | C | 1 | 54 | Django Code of Conduct \| Django |
| [/diversity/](https://www.djangoproject.com/diversity/) | 65 | C | 1 | 43 | Django Community Diversity Statement \| Django |
| [/download/](https://www.djangoproject.com/download/) | 51 | C | 1 | 136 | Download Django \| Django |
| [/foundation/](https://www.djangoproject.com/foundation/) | 51 | C | 1 | 104 | About the Django Software Foundation \| Django |
| [/fundraising/](https://www.djangoproject.com/fundraising/) | 37 | D | 1 | 205 | Support Django \| Django |
| [/sponsor/](https://www.djangoproject.com/sponsor/) | 37 | D | 1 | 79 | Sponsor Django \| Django |
| [/start/](https://www.djangoproject.com/start/) | 51 | C | 1 | 54 | Getting started with Django \| Django |
| [/contact/foundation/](https://www.djangoproject.com/contact/foundation/) | 44 | D | 1 | 69 | Contact the Django Software Foundation \| Django |
| [/weblog/2026/sep/24/dsf-member-of-the-month-ken-whitesell/](https://www.djangoproject.com/weblog/2026/sep/24/dsf-member-of-the-month-ken-whitesell/) | 58 | C | 1 | 85 | DSF member of the month - Ken Whitesell \| Weblog \| Django |
| [/foundation/corporate-members/](https://www.djangoproject.com/foundation/corporate-members/) | 51 | C | 1 | 104 | Django Software Foundation \| Django |
| [/foundation/donate/](https://www.djangoproject.com/foundation/donate/) | 51 | C | 1 | 85 | Support the Django Software Foundation \| Django |
| [/foundation/individual-members/](https://www.djangoproject.com/foundation/individual-members/) | 51 | C | 1 | 70 | Django Software Foundation \| Django |
| [/foundation/teams/](https://www.djangoproject.com/foundation/teams/) | 51 | C | 1 | 96 | Django Software Foundation \| Django |
| [/community/dsf/](https://www.djangoproject.com/community/dsf/) | 37 | D | 2 | 179 | Django Community \| Django |
| [/community/ecosystem/](https://www.djangoproject.com/community/ecosystem/) | 58 | C | 1 | 121 | Django Community \| Django |
| [/conduct/reporting/](https://www.djangoproject.com/conduct/reporting/) | 58 | C | 1 | 53 | Django Code of Conduct - Reporting Guide \| Django |
| [/sponsor/banner/](https://www.djangoproject.com/sponsor/banner/) | 51 | C | 1 | 53 | Sponsor Django's website and documentation \| Django |
| [/sponsor/plans/](https://www.djangoproject.com/sponsor/plans/) | 44 | D | 1 | 79 | How Investing in Django Makes a Difference \| Django |
| [/weblog/2007/](https://www.djangoproject.com/weblog/2007/) | 44 | D | 2 | 123 | 2007 \| Weblog \| Django |
| [/download/2028/roadmap/](https://www.djangoproject.com/download/2028/roadmap/) | 58 | C | 1 | 46 | Django 2028 Roadmap \| Django |
| [/weblog/2010/](https://www.djangoproject.com/weblog/2010/) | 44 | D | 2 | 123 | 2010 \| Weblog \| Django |
| [/download/6.2/roadmap/](https://www.djangoproject.com/download/6.2/roadmap/) | 58 | C | 1 | 46 | Django 6.2 Roadmap \| Django |
| [/community/local/](https://www.djangoproject.com/community/local/) | 58 | C | 1 | 119 | Django Community \| Django |
| [/weblog/2016/](https://www.djangoproject.com/weblog/2016/) | 44 | D | 2 | 123 | 2016 \| Weblog \| Django |
| [/sponsor/plans/diamond/](https://www.djangoproject.com/sponsor/plans/diamond/) | 37 | D | 1 | 65 | Diamond sponsorship \| Django |
| [/weblog/2017/](https://www.djangoproject.com/weblog/2017/) | 44 | D | 2 | 123 | 2017 \| Weblog \| Django |
| [/sponsor/plans/platinum/](https://www.djangoproject.com/sponsor/plans/platinum/) | 37 | D | 1 | 64 | Platinum sponsorship \| Django |
| [/foundation/corporate-membership/](https://www.djangoproject.com/foundation/corporate-membership/) | 51 | C | 1 | 89 | Corporate membership \| Django |
| [/weblog/2022/](https://www.djangoproject.com/weblog/2022/) | 44 | D | 2 | 123 | 2022 \| Weblog \| Django |
| [/foundation/minutes/](https://www.djangoproject.com/foundation/minutes/) | 51 | C | 1 | 73 | Django Software Foundation \| Django |
| [/weblog/2005/nov/](https://www.djangoproject.com/weblog/2005/nov/) | 44 | D | 2 | 123 | November 2005 \| Weblog \| Django |
| [/foundation/prizes/](https://www.djangoproject.com/foundation/prizes/) | 51 | C | 1 | 117 | Django Software Foundation Prizes \| Django |
| [/weblog/2006/apr/](https://www.djangoproject.com/weblog/2006/apr/) | 51 | C | 1 | 94 | April 2006 \| Weblog \| Django |
| [/weblog/2006/jan/](https://www.djangoproject.com/weblog/2006/jan/) | 51 | C | 1 | 94 | January 2006 \| Weblog \| Django |
| [/foundation/minutes/2025/apr/10/dsf-board-monthly-meeting/](https://www.djangoproject.com/foundation/minutes/2025/apr/10/dsf-board-monthly-meeting/) | 51 | C | 1 | 67 | Django Software Foundation \| Django |
| [/weblog/2006/may/](https://www.djangoproject.com/weblog/2006/may/) | 51 | C | 1 | 110 | May 2006 \| Weblog \| Django |
| [/weblog/2007/feb/](https://www.djangoproject.com/weblog/2007/feb/) | 51 | C | 1 | 86 | February 2007 \| Weblog \| Django |
| [/weblog/2007/mar/](https://www.djangoproject.com/weblog/2007/mar/) | 51 | C | 1 | 86 | March 2007 \| Weblog \| Django |
| [/weblog/2007/may/](https://www.djangoproject.com/weblog/2007/may/) | 51 | C | 1 | 90 | May 2007 \| Weblog \| Django |
| [/weblog/2008/aug/](https://www.djangoproject.com/weblog/2008/aug/) | 51 | C | 1 | 98 | August 2008 \| Weblog \| Django |
| [/weblog/2008/jul/](https://www.djangoproject.com/weblog/2008/jul/) | 51 | C | 1 | 116 | July 2008 \| Weblog \| Django |
| [/weblog/2008/nov/](https://www.djangoproject.com/weblog/2008/nov/) | 51 | C | 1 | 90 | November 2008 \| Weblog \| Django |
| [/weblog/2009/jul/](https://www.djangoproject.com/weblog/2009/jul/) | 51 | C | 1 | 99 | July 2009 \| Weblog \| Django |
| [/weblog/2009/may/](https://www.djangoproject.com/weblog/2009/may/) | 51 | C | 1 | 86 | May 2009 \| Weblog \| Django |
| [/weblog/2010/jan/](https://www.djangoproject.com/weblog/2010/jan/) | 51 | C | 1 | 91 | January 2010 \| Weblog \| Django |
| [/weblog/2010/mar/](https://www.djangoproject.com/weblog/2010/mar/) | 51 | C | 1 | 94 | March 2010 \| Weblog \| Django |
| [/weblog/2010/sep/](https://www.djangoproject.com/weblog/2010/sep/) | 51 | C | 1 | 94 | September 2010 \| Weblog \| Django |
| [/weblog/2011/jan/](https://www.djangoproject.com/weblog/2011/jan/) | 51 | C | 1 | 90 | January 2011 \| Weblog \| Django |
| [/weblog/2011/nov/](https://www.djangoproject.com/weblog/2011/nov/) | 51 | C | 1 | 86 | November 2011 \| Weblog \| Django |
| [/weblog/2012/aug/](https://www.djangoproject.com/weblog/2012/aug/) | 51 | C | 1 | 101 | August 2012 \| Weblog \| Django |
| [/weblog/2012/jul/](https://www.djangoproject.com/weblog/2012/jul/) | 51 | C | 1 | 102 | July 2012 \| Weblog \| Django |
| [/weblog/2012/may/](https://www.djangoproject.com/weblog/2012/may/) | 51 | C | 1 | 94 | May 2012 \| Weblog \| Django |
| [/weblog/2013/feb/](https://www.djangoproject.com/weblog/2013/feb/) | 51 | C | 1 | 102 | February 2013 \| Weblog \| Django |
| [/weblog/2013/jul/](https://www.djangoproject.com/weblog/2013/jul/) | 51 | C | 1 | 94 | July 2013 \| Weblog \| Django |
| [/weblog/2013/nov/](https://www.djangoproject.com/weblog/2013/nov/) | 51 | C | 1 | 90 | November 2013 \| Weblog \| Django |
| [/weblog/2013/oct/](https://www.djangoproject.com/weblog/2013/oct/) | 51 | C | 1 | 94 | October 2013 \| Weblog \| Django |
| [/weblog/2014/aug/](https://www.djangoproject.com/weblog/2014/aug/) | 51 | C | 1 | 106 | August 2014 \| Weblog \| Django |
| [/weblog/2014/jul/](https://www.djangoproject.com/weblog/2014/jul/) | 51 | C | 1 | 86 | July 2014 \| Weblog \| Django |
| [/weblog/2014/oct/](https://www.djangoproject.com/weblog/2014/oct/) | 51 | C | 1 | 114 | October 2014 \| Weblog \| Django |
| [/weblog/2015/feb/](https://www.djangoproject.com/weblog/2015/feb/) | 51 | C | 1 | 107 | February 2015 \| Weblog \| Django |
| [/weblog/2015/jul/](https://www.djangoproject.com/weblog/2015/jul/) | 51 | C | 1 | 90 | July 2015 \| Weblog \| Django |
| [/weblog/2015/may/](https://www.djangoproject.com/weblog/2015/may/) | 51 | C | 1 | 107 | May 2015 \| Weblog \| Django |
| [/weblog/2016/apr/](https://www.djangoproject.com/weblog/2016/apr/) | 51 | C | 1 | 94 | April 2016 \| Weblog \| Django |
| [/weblog/2016/jan/](https://www.djangoproject.com/weblog/2016/jan/) | 51 | C | 1 | 90 | January 2016 \| Weblog \| Django |
| [/weblog/2016/may/](https://www.djangoproject.com/weblog/2016/may/) | 51 | C | 1 | 90 | May 2016 \| Weblog \| Django |
| [/weblog/2016/sep/](https://www.djangoproject.com/weblog/2016/sep/) | 51 | C | 1 | 94 | September 2016 \| Weblog \| Django |
| [/weblog/2017/aug/](https://www.djangoproject.com/weblog/2017/aug/) | 51 | C | 1 | 90 | August 2017 \| Weblog \| Django |
| [/weblog/2017/may/](https://www.djangoproject.com/weblog/2017/may/) | 51 | C | 1 | 86 | May 2017 \| Weblog \| Django |
| [/weblog/2017/sep/](https://www.djangoproject.com/weblog/2017/sep/) | 51 | C | 1 | 90 | September 2017 \| Weblog \| Django |
| [/weblog/2018/dec/](https://www.djangoproject.com/weblog/2018/dec/) | 51 | C | 1 | 98 | December 2018 \| Weblog \| Django |
| [/weblog/2018/may/](https://www.djangoproject.com/weblog/2018/may/) | 51 | C | 1 | 99 | May 2018 \| Weblog \| Django |
| [/weblog/2018/oct/](https://www.djangoproject.com/weblog/2018/oct/) | 51 | C | 1 | 98 | October 2018 \| Weblog \| Django |
| [/weblog/2019/dec/](https://www.djangoproject.com/weblog/2019/dec/) | 51 | C | 1 | 102 | December 2019 \| Weblog \| Django |
| [/weblog/2019/mar/](https://www.djangoproject.com/weblog/2019/mar/) | 51 | C | 1 | 94 | March 2019 \| Weblog \| Django |
| [/weblog/2019/oct/](https://www.djangoproject.com/weblog/2019/oct/) | 51 | C | 1 | 98 | October 2019 \| Weblog \| Django |
| [/weblog/2020/feb/](https://www.djangoproject.com/weblog/2020/feb/) | 51 | C | 1 | 86 | February 2020 \| Weblog \| Django |
| [/weblog/2020/jul/](https://www.djangoproject.com/weblog/2020/jul/) | 51 | C | 1 | 94 | July 2020 \| Weblog \| Django |
| [/weblog/2020/oct/](https://www.djangoproject.com/weblog/2020/oct/) | 51 | C | 1 | 90 | October 2020 \| Weblog \| Django |
| [/weblog/2021/aug/](https://www.djangoproject.com/weblog/2021/aug/) | 51 | C | 1 | 90 | August 2021 \| Weblog \| Django |
| [/weblog/2021/jul/](https://www.djangoproject.com/weblog/2021/jul/) | 51 | C | 1 | 86 | July 2021 \| Weblog \| Django |
| [/weblog/2021/nov/](https://www.djangoproject.com/weblog/2021/nov/) | 51 | C | 1 | 98 | November 2021 \| Weblog \| Django |
| [/weblog/2022/apr/](https://www.djangoproject.com/weblog/2022/apr/) | 51 | C | 1 | 86 | April 2022 \| Weblog \| Django |
| [/weblog/2022/jul/](https://www.djangoproject.com/weblog/2022/jul/) | 51 | C | 1 | 90 | July 2022 \| Weblog \| Django |
| [/weblog/2022/nov/](https://www.djangoproject.com/weblog/2022/nov/) | 51 | C | 1 | 98 | November 2022 \| Weblog \| Django |
| [/weblog/2023/aug/](https://www.djangoproject.com/weblog/2023/aug/) | 51 | C | 1 | 86 | August 2023 \| Weblog \| Django |
| [/weblog/2023/jan/](https://www.djangoproject.com/weblog/2023/jan/) | 51 | C | 1 | 90 | January 2023 \| Weblog \| Django |
| [/weblog/2023/may/](https://www.djangoproject.com/weblog/2023/may/) | 51 | C | 1 | 98 | May 2023 \| Weblog \| Django |
| [/weblog/2023/sep/](https://www.djangoproject.com/weblog/2023/sep/) | 51 | C | 1 | 98 | September 2023 \| Weblog \| Django |
| [/weblog/2024/jan/](https://www.djangoproject.com/weblog/2024/jan/) | 51 | C | 1 | 110 | January 2024 \| Weblog \| Django |
| [/weblog/2024/jul/](https://www.djangoproject.com/weblog/2024/jul/) | 51 | C | 1 | 90 | July 2024 \| Weblog \| Django |
| [/weblog/2024/may/](https://www.djangoproject.com/weblog/2024/may/) | 51 | C | 1 | 110 | May 2024 \| Weblog \| Django |
| [/foundation/corporate-members/badges/](https://www.djangoproject.com/foundation/corporate-members/badges/) | 37 | D | 2 | 114 | Django Software Foundation \| Django |
| [/foundation/corporate-membership/join/](https://www.djangoproject.com/foundation/corporate-membership/join/) | 30 | D | 2 | 75 | Django Software Foundation \| Django |
| [/foundation/faq/](https://www.djangoproject.com/foundation/faq/) | 51 | C | 1 | 83 | Django Software Foundation FAQ \| Django |
| [/foundation/records/](https://www.djangoproject.com/foundation/records/) | 51 | C | 1 | 152 | Django Software Foundation Public Records \| Django |
| [/foundation/conferences/](https://www.djangoproject.com/foundation/conferences/) | 44 | D | 1 | 84 | So you want to hold a Django event? \| Django |
| [/conduct/faq/](https://www.djangoproject.com/conduct/faq/) | 58 | C | 1 | 55 | Django Code of Conduct - FAQ \| Django |
| [/start/overview/](https://www.djangoproject.com/start/overview/) | 58 | C | 1 | 56 | Django overview \| Django |

## Evidence and reproducibility

- [Crawl manifest](.a11y-history/20261002T185438Z/evidence/crawl-manifest.json).
- [Runtime environment and page summary](.a11y-history/20261002T185438Z/evidence/runtime-summary.json).
- [Exclusive contrast grouping](.a11y-history/20261002T185438Z/evidence/exclusive-contrast-groups.json).
- [Keyboard and dynamic state measurements](.a11y-history/20261002T185438Z/evidence/behavior.json).
- [Focus and skip-link follow-up](.a11y-history/20261002T185438Z/evidence/focus.json).
- [Theme, viewport and motion measurements](.a11y-history/20261002T185438Z/evidence/visual-runtime.json).
- [Audit metadata](.a11y-history/20261002T185438Z/evidence/audit-metadata.json).

Raw page HTML and full desktop axe results are compressed to keep the retained evidence compact; decompress with `gzip -dc FILE.gz`. Specialist findings JSON is retained at the top level of the timestamped history directory for re-rendering and comparison.

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
