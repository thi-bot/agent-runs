# Web Accessibility Audit

Publication copy: includes the 20 individually referenced, optimized screenshots. [Run context and scope](README.md) · [Browse screenshots](SCREENSHOTS.md). Other historical evidence paths refer to the original audit workspace and are not included in this subset.

Combined audit: 708 distinct successful web pages, 14 distinct error-page destinations, representative browser interactions, local source review, and all 11 pages of the product strategy PDF.

**17 confirmed WCAG findings and 2 separate technical findings.** Target: WCAG 2.2 AA. The score and severity threshold below are renderer heuristics, not a conformance claim; any confirmed WCAG failure still requires remediation.

Related reports: [DOCUMENT-ACCESSIBILITY-AUDIT.md](DOCUMENT-ACCESSIBILITY-AUDIT.md) · [ACCESSIBILITY-SCAN.md](ACCESSIBILITY-SCAN.md). [Findings CSV](ACCESSIBILITY-FINDINGS.csv).

[Page coverage](evidence/page-coverage.csv) · [Raw axe instances](evidence/axe-instances.csv) · [Checks needing review](evidence/axe-needs-review.csv) · [Screenshot index](evidence/screenshot-index.csv)

An audit of web content, run on 2026-10-16. Read the executive summary for the verdict, the priorities section for what to do first, and the findings tables for detail.

## Metadata

What was audited, with what, and under which settings.

| Field | Value |
|---|---|
| Date | 2026-10-16 |
| Scope | 777 items |
| Skills run | alt-text-headings, aria-specialist, audit-context, axe-runtime-scan, contrast-master, forms-specialist, keyboard-navigator, link-checker, live-region-controller, modal-specialist, pdf-accessibility, tables-data-specialist, testing-coach, web-component-specialist |
| Tooling | node v26.8.1, a11y-mcp-server 7.0.3; axe-core 4.14.0; Playwright 1.64.1; Chromium 152.0.7977.82 |
| Scan configuration | defaults, no config file found |
| Checks counted | 83 |

Audited:

- `.a11y-history/2026-10-16/*.json`
- `.a11y-history/2026-10-16/documents/Wagtail_Product_Strategy_2026_v1.0.pdf — all 11 pages`
- `.a11y-history/2026-10-16/evidence/crawl.json`
- `.a11y-history/2026-10-16/html/*.html`
- `.a11y-history/2026-10-16/raw/*.json`
- `.a11y-history/2026-10-16/raw/6ae48cc006d4f66e.json`
- `.github/workflows/ci.yml`
- `https://media.wagtail.org/documents/Wagtail_Product_Strategy_2026_v1.0.pdf`
- `https://wagtail.org/`
- `https://wagtail.org/about-wagtail/`
- `https://wagtail.org/accessibility/`
- `https://wagtail.org/accessibility/testing/`
- `https://wagtail.org/agencies/`
- `https://wagtail.org/ai/`
- `https://wagtail.org/ai/agent-skills-for-developers/`
- `https://wagtail.org/ai/agentic-engineering-recommendations/`
- `https://wagtail.org/ai/ai-guiding-principles/`
- `https://wagtail.org/blog/`
- `https://wagtail.org/blog/10-underrated-django-packages/`
- `https://wagtail.org/blog/10-years/`
- `https://wagtail.org/blog/20000-django-packages/`
- `https://wagtail.org/blog/2023-wagtail-deployment-survey/`
- `https://wagtail.org/blog/2024-headless-survey/`
- `https://wagtail.org/blog/2026-ai-dx-survey/`
- `https://wagtail.org/blog/40-smaller-images-same-quality/`
- `https://wagtail.org/blog/5-simple-ways-anyone-can-contribute-to-wagtail/`
- `https://wagtail.org/blog/5-terabytes-for-30-seconds-of-homepage-video/`
- `https://wagtail.org/blog/7-tips-for-applying-to-google-summer-of-code/`
- `https://wagtail.org/blog/?author=Aaron+MacGillivary`
- `https://wagtail.org/blog/?author=Ahmed+Olaitan`
- `https://wagtail.org/blog/?author=Aimee+Maroney`
- `https://wagtail.org/blog/?author=Albina+Starykova`
- `https://wagtail.org/blog/?author=Alex+Morega`
- `https://wagtail.org/blog/?author=Anuja+Raj+Verma`
- `https://wagtail.org/blog/?author=Ben+Enright`
- `https://wagtail.org/blog/?author=Bertrand+Bordage`
- `https://wagtail.org/blog/?author=Brent+Clark`
- `https://wagtail.org/blog/?author=Cameron+Lamb`
- `https://wagtail.org/blog/?author=Chiemezuo`
- `https://wagtail.org/blog/?author=Chris+Rogers`
- `https://wagtail.org/blog/?author=Chrissy+Wainwright`
- `https://wagtail.org/blog/?author=Coen+van+der+Kamp`
- `https://wagtail.org/blog/?author=Damilola+Oladele`
- `https://wagtail.org/blog/?author=Dan+Braghi%C8%99`
- `https://wagtail.org/blog/?author=Doug+Harris`
- `https://wagtail.org/blog/?author=Glenn+Barr`
- `https://wagtail.org/blog/?author=Helen+Chapman`
- `https://wagtail.org/blog/?author=Hitansh+Shah`
- `https://wagtail.org/blog/?author=Ian+Bellchambers`
- `https://wagtail.org/blog/?author=Jake+Howard`
- and 727 more

## Executive summary

Severity threshold failed: critical or serious findings require remediation.

The headline numbers for this run.

| Measure | Value |
|---|---|
| Score | 85 out of 100 |
| Grade | B |
| Findings | 19 |
| Blocking (critical plus serious) | 9 |
| Severity threshold | Fail |

## Severity breakdown

Counts by severity, highest impact first.

| Severity | Count | What it means |
|---|---:|---|
| critical | 0 | Blocks a person from completing the task |
| serious | 9 | Major barrier with a difficult workaround |
| moderate | 9 | Real friction, workaround exists |
| minor | 1 | Noticeable but rarely blocking |

## Findings

19 findings, ordered by severity then by rule.

### Serious (9)

Each row names the rule, the criterion it fails, where it is, and what to change.

| Rule | WCAG | Location | Problem | Fix |
|---|---|---|---|---|
| `color-contrast` | 1.4.3 AA | https://wagtail.org/blog/wagtail-10b2/ .codehilite .nv | Syntax-highlighted variables have insufficient text contrast against the code background. | Update syntax token colors in wagtailio/static/sass/vendor/_code-highlighting.scss (including .nv at line 58 and .vc/.vg/.vi at lines 77–79) to reach 4.5:1 against their actual light and dark code backgrounds; verify all token classes. |
| `frame-title` | 4.1.2 A | https://wagtail.org/blog/why-pay-for-open-source/ iframe | Embedded media frames lack accessible names on multiple blog pages. | Give every embedded iframe a concise title naming its content, for example title="Why pay for open source? — video". Review stored Wagtail embed HTML and the embed/video StreamField rendering; refresh cached embeds where necessary. Keep each title specific to its content. |
| `HTML-LANG-001` | 3.1.1 A | wagtailio/newsletter/templates/newsletter/newsletter_page.html:3 | Archived newsletter pages do not declare their primary language, preventing reliable screen-reader pronunciation. | Add lang="en" to the standalone newsletter template's html element (and xml:lang="en" if retaining XHTML serialization). Verify archived issues and email output after rendering. |
| `KEYBOARD-001` | 2.1.1 A | wagtailio/static/js/components/mobile-menu.js:38 | The mobile navigation toggle cannot be activated with Enter or Space. | Handle the native button's click event instead of pointerup so pointer, keyboard, and assistive-technology activation all toggle the menu. Verify Enter and Space open and close the menu at mobile widths. |
| `KEYBOARD-002` | 2.4.11 AA | wagtailio/static/js/components/mobile-sub-menu.js:47 | Mobile submenu panels completely obscure focused parent-navigation controls that remain in the tab sequence. | Move focus into an opened submenu and exclude the covered parent controls from sequential focus while it is open. Restore focus to the submenu trigger on Back. Ensure Tab and Shift+Tab cannot focus controls behind the panel. |
| `link-in-text-block` | 1.4.1 A | https://wagtail.org/packages/ .overview__description-link | Inline package-directory links rely on a low-contrast color difference to distinguish them from surrounding text. | Restore a persistent underline to .overview__description-link in wagtailio/static/sass/components/_overview.scss:54–61; retain clear hover and keyboard focus indicators. Apply the change to every package category description. |
| `link-name` | 2.4.4 A | https://wagtail.org/this-week-in-wagtail/?page=7 .blog-post--small; https://wagtail.org/this-week-in-wagtail/?page=11 .blog-post--small | Three newsletter listing cards expose focusable links with no accessible name. | Review card rendering in wagtailio/newsletter/templates/newsletter/newsletter_index_page.html:56 and the affected newsletter content; ensure each resulting anchor contains the issue title. Avoid nested links in card content and provide a reliable title fallback. Verify issues 106, 105 and 83 in the rendered DOM. |
| `link-name` | 2.4.4 A | https://wagtail.org/this-week-in-wagtail/issue-3/ p:nth-child(10) > a | Empty links in two archived newsletter issues have no accessible name. | Remove the unintended empty anchors from issues 3 and 6. If any link is intended to remain, supply meaningful visible link text describing the destination and verify its focus appearance. Do not retain invisible links solely by adding an aria-label. |
| `SHADOW-FAVORITE-NAME-001` | 4.1.2 A | https://wagtail.org/wagtail-space-2026/schedule/ — pretalx-schedule shadow root button.btn-fav-container | Schedule favorite buttons have no accessible name or exposed selected state. | In the pretalx widget renderer, give each favorite button a name including its session title and expose toggle state with aria-pressed, or update its action name between Add and Remove favorite. Hide the star SVG from assistive technology. Provide an accessible schedule alternative while awaiting an upstream fix. |

### Moderate (9)

Each row names the rule, the criterion it fails, where it is, and what to change.

| Rule | WCAG | Location | Problem | Fix |
|---|---|---|---|---|
| `ALT-CONTENT-001` | 1.1.1 A | https://wagtail.org/blog/getting-started-wagtail-newcomers-perspective/ | Some published images expose filenames or timestamps instead of meaningful text alternatives. | Replace the screenshot alt with a description of the Wagtail editor showing image, caption, attribution and rich-text blocks. Review filename-like alternatives across the image library. For decorative author portraits with adjacent names, render alt=""; for informative images use contextual descriptions. |
| `ARIA-DIALOG-NAME-001` | 4.1.2 A | wagtailio/project_styleguide/templates/patterns/includes/search-modal.html:3 | The open desktop search dialog has no accessible name, so its purpose is not announced when users enter it. | Give the role=dialog container an accessible name: add a Search heading with a unique id and reference it with aria-labelledby, or add aria-label="Search". Keep the existing input and close-button labels, and verify the opened dialog in the accessibility tree. |
| `KEYBOARD-003` | 2.4.11 AA | https://wagtail.org/ — .cookie.active and [data-mobile-menu] a[href='/core-team/'] | The cookie banner completely covers a focused mobile submenu link. | Coordinate cookie-banner and mobile-menu layout so focused links remain visible. Reserve space for the banner or place the open navigation above it, and verify first-visit keyboard navigation before cookie dismissal. Review _cookie-message.scss and mobile-menu.js together. |
| `KEYBOARD-004` | 3.2.2 A | wagtailio/static/js/components/filter-form.js:18 | Changing a blog category checkbox immediately navigates to another page without advance warning. | Expose an Apply filters submit button with JavaScript enabled and submit only on explicit activation, or update results in place while preserving focus and announcing the update. The existing submit button is restricted to noscript in blog_index_page.html:12. |
| `PDF-TAGS-001` | 1.3.1 A | .a11y-history/2026-10-16/documents/Wagtail_Product_Strategy_2026_v1.0.pdf — page 1, version/date header | The meaningful version and publication date are omitted from the PDF's tagged reading structure. | In Acrobat Pro, open Accessibility Tags and Reading Order, select 'Version 1.0, June 2026', and tag it as a paragraph before the title. Verify it appears in the tag reading order. Preserve this information in the source document's main content before future exports. |
| `PDFUA-LIST-001` | n/a | .a11y-history/2026-10-16/documents/Wagtail_Product_Strategy_2026_v1.0.pdf — lists on pages 3–10 | PDF/UA technical check: list item labels and bodies are not represented with the expected Lbl and LBody structure. | In Acrobat Pro's Accessibility Tags panel, organize each list item as LI containing Lbl for its number or bullet and LBody for its content; preserve continuation content across pages. Then validate with veraPDF and test list navigation in a screen reader. Repair the source export process for future editions. |
| `SHADOW-AVATAR-ALT-001` | 1.1.1 A | https://wagtail.org/wagtail-space-2026/schedule/ — pretalx-schedule shadow root .avatars img | Speaker portrait images in embedded schedules lack alt attributes, creating unnamed graphics among session details. | Render these portraits with alt="" when the adjacent speaker name already identifies the person. Supply meaningful alt only when the portrait conveys additional information. Apply the fix inside the widget renderer or provide an accessible schedule alternative. |
| `SHADOW-TAB-RELATION-001` | 4.1.2 A | https://wagtail.org/wagtail-space-2026/schedule/ — pretalx-schedule shadow root [role=tab] | Schedule date tabs reference nonexistent panels, while the exposed tabpanel is empty. | If these controls navigate to dates in one continuous schedule, use labelled anchor links to actual day sections instead of tab roles. Otherwise implement real labelled tabpanels in the same shadow root and connect each tab to its panel with valid IDs and consistent selection states. |
| `SHADOW-TIMEZONE-LABEL-001` | 4.1.2 A | https://wagtail.org/wagtail-space-2025/schedule/ — pretalx-schedule shadow root input[name=timezone] | The 2025 schedule timezone field has no accessible name. | Add a visible Time zone label with a matching input id inside the same shadow root, or provide aria-label="Time zone". Keep the current timezone value separate from the field name and verify selection semantics. |

### Minor (1)

Each row names the rule, the criterion it fails, where it is, and what to change.

| Rule | WCAG | Location | Problem | Fix |
|---|---|---|---|---|
| `PDFUA-LANG-001` | n/a | .a11y-history/2026-10-16/documents/Wagtail_Product_Strategy_2026_v1.0.pdf — document catalog /Lang | PDF technical check: the document language uses an underscore instead of a valid hyphenated language tag. | In Acrobat Pro, open Document Properties > Advanced > Reading Options and set Language to English (United Kingdom); verify the saved catalog uses en-GB. Confirm pronunciation with a screen reader and validate the language entry with veraPDF. |

## Remediation priorities

Prioritize components with multiple findings. Shared-template repairs can address repeated instances; distinct findings may require separate changes.

| Component | Instances | Worst severity | Rules |
|---|---:|---|---|
| External pretalx schedule widget | 4 | serious | `SHADOW-AVATAR-ALT-001`, `SHADOW-FAVORITE-NAME-001`, `SHADOW-TAB-RELATION-001`, `SHADOW-TIMEZONE-LABEL-001` |
| Product strategy PDF | 3 | moderate | `PDF-TAGS-001`, `PDFUA-LANG-001`, `PDFUA-LIST-001` |

Then the 9 remaining blocking findings, in this order:

1. `color-contrast` at https://wagtail.org/blog/wagtail-10b2/ .codehilite .nv. Update syntax token colors in wagtailio/static/sass/vendor/_code-highlighting.scss (including .nv at line 58 and .vc/.vg/.vi at lines 77–79) to reach 4.5:1 against their actual light and dark code backgrounds; verify all token classes.
2. `frame-title` at https://wagtail.org/blog/why-pay-for-open-source/ iframe. Give every embedded iframe a concise title naming its content, for example title="Why pay for open source? — video". Review stored Wagtail embed HTML and the embed/video StreamField rendering; refresh cached embeds where necessary. Keep each title specific to its content.
3. `HTML-LANG-001` at wagtailio/newsletter/templates/newsletter/newsletter_page.html:3. Add lang="en" to the standalone newsletter template's html element (and xml:lang="en" if retaining XHTML serialization). Verify archived issues and email output after rendering.
4. `KEYBOARD-001` at wagtailio/static/js/components/mobile-menu.js:38. Handle the native button's click event instead of pointerup so pointer, keyboard, and assistive-technology activation all toggle the menu. Verify Enter and Space open and close the menu at mobile widths.
5. `KEYBOARD-002` at wagtailio/static/js/components/mobile-sub-menu.js:47. Move focus into an opened submenu and exclude the covered parent controls from sequential focus while it is open. Restore focus to the submenu trigger on Back. Ensure Tab and Shift+Tab cannot focus controls behind the panel.
6. `link-in-text-block` at https://wagtail.org/packages/ .overview__description-link. Restore a persistent underline to .overview__description-link in wagtailio/static/sass/components/_overview.scss:54–61; retain clear hover and keyboard focus indicators. Apply the change to every package category description.
7. `link-name` at https://wagtail.org/this-week-in-wagtail/?page=7 .blog-post--small; https://wagtail.org/this-week-in-wagtail/?page=11 .blog-post--small. Review card rendering in wagtailio/newsletter/templates/newsletter/newsletter_index_page.html:56 and the affected newsletter content; ensure each resulting anchor contains the issue title. Avoid nested links in card content and provide a reliable title fallback. Verify issues 106, 105 and 83 in the rendered DOM.
8. `link-name` at https://wagtail.org/this-week-in-wagtail/issue-3/ p:nth-child(10) > a. Remove the unintended empty anchors from issues 3 and 6. If any link is intended to remain, supply meaningful visible link text describing the destination and verify its focus appearance. Do not retain invisible links solely by adding an aria-label.
9. `SHADOW-FAVORITE-NAME-001` at https://wagtail.org/wagtail-space-2026/schedule/ — pretalx-schedule shadow root button.btn-fav-container. In the pretalx widget renderer, give each favorite button a name including its session title and expose toggle state with aria-pressed, or update its action name between Add and Remove favorite. Hide the star SVG from assistive technology. Provide an accessible schedule alternative while awaiting an upstream fix.

The remaining 10 moderate and minor findings can follow in normal work.

## What passed

64 checks ran and found nothing.

- A meaningful document title is set and ViewerPreferences DisplayDocTitle is true.
- After pointer-assisted opening, Escape closes mobile navigation and restores focus to its trigger.
- All 11 pages contain selectable, extractable text; this is not an image-only PDF.
- All 753 captured HTML files were checked for img elements without an alt attribute; none found. This presence check does not establish appropriate alternative text.
- All four fonts are embedded and have Unicode mappings; Poppler and PyMuPDF extract readable prose.
- Blog category checkboxes use associated labels and a fieldset with legend.
- Both comparison pages use native table, thead, tbody, tr and td elements, with two scoped column headers and ten scoped row headers each. The empty top-left corner is a td, not an empty heading.
- Comparison data retains its row and column relationships at a 390px viewport; it scrolls in a separate horizontal container rather than replacing native table semantics.
- Contact page has no separate contact form; only shared search and newsletter controls were present.
- Cookie preference buttons dismiss the notice; no visible success/error status message exists whose semantics are missing.
- Desktop navigation disclosure buttons open with Enter and their links are reachable with Tab; Escape closes the open submenu.
- Desktop search opens with keyboard activation, places focus in its input, cycles focus within the dialog, and returns focus to its trigger on Escape.
- Desktop search: Enter opens the overlay, focus enters the search input, eight consecutive Tab presses remain within it, Escape closes and restores trigger focus, and the visible close button also restores trigger focus.
- Empty and malformed newsletter input invoke native validation, focus the invalid email input, and present actionable validation text. No subscription was submitted.
- Every page sets Tabs to S, using structure order for annotation navigation.
- Existing evidence covers deployed Chromium keyboard behavior, accessibility-tree checks, automated scans, representative visual states, and structural/rendered review of all 11 strategy PDF pages.
- Favorite controls respond to Space; their missing names/state are distinct from keyboard activation.
- Feature-index filtering uses labelled native checkboxes and updates their checked states. The Accessibility selection displays its group; no separate visible result-count, progress or completion message was found that lacks status semantics.
- Feature-index filters are labelled native checkboxes. Pressing Space on Accessibility selects it, clears All, and displays only the accessibility group.
- Fifteen hierarchical bookmarks match the document's headings and destinations.
- Full captured-HTML inventory identified 138 same-origin pages containing 1,770 table elements: two comparison tables and 1,768 nested layout tables across 136 newsletter issues. No data tables were found on the captured same-origin blog pages.
- Get started opens with keyboard activation, cycles focus within the dialog, and restores trigger focus on Escape.
- Get started: Enter opens the overlay, focus enters its first action link, eight consecutive Tab presses remain within it, Escape closes and restores trigger focus, and the close button also restores trigger focus.
- Get-started dialog source supplies aria-labelledby to its visible configured heading; the published heading exists.
- Homepage copy success was exercised with Enter. Clipboard contained pip install wagtail, and the visible confirmation appeared in Chromium accessibility snapshot as alert: Copied!, without moving focus from the copy button.
- Homepage promotional video does not autoplay and exposes native controls.
- Live keyboard testing on both comparison pages: Tab from the preceding link focuses the scroll container; seven ArrowRight presses move scrollLeft from 0 to 280px. Modern Chromium's native scroll-container focus behavior makes these tables operable despite absent tabindex.
- Live newsletter email fields have accessible names, type=email, required and autocomplete=email.
- Main navigation and footer navigation have distinguishing labels; previous/next blog navigation also has an explicit label.
- Mobile footer disclosure updates aria-expanded from false to true and its label from Open the Project menu to Close the Project menu; aria-controls resolves to project-menu.
- Mobile navigation opened by pointer can be dismissed with Escape, returning focus to its trigger.
- Mobile search updates aria-expanded from false to true and its label to Close the search; aria-controls resolves to mobile-search-form.
- Newsletter tables are layout structures, not data tables. They contain no misleading th or caption markup, and Chromium's accessibility tree classifies them as LayoutTable rather than data table.
- No figures, images, tables, form fields, encryption, or JavaScript were found; figure alternatives, table headers and form labeling are not applicable.
- No sorting, row selection, editable data grids or table pagination were found in the same-origin table implementations reviewed.
- Opened search dialog has correctly named close and submit buttons and a labelled search input; targeted axe found no button-name or label violations within it.
- Opened-state axe checks with WCAG 2 A/AA, 2.1 A/AA and 2.2 AA tags found no additional violations in search, Get started or mobile navigation states. Explicit aria-dialog-name check found the already reported unnamed search dialog only.
- Product strategy PDF link is labeled “as a PDF” within a paragraph identifying the strategy and linking its Markdown version, providing adequate link purpose in context.
- Rendered all pages and visually reviewed the complete document; its single-column sequence, headings, lists and page continuations are coherent.
- Repeated newsletter “here” links identify the RFC process in the same paragraph; not counted as 2.4.4 failures.
- Representative main-site pages declare lang=en and meaningful page titles; their shared base template supplies a single main landmark.
- Reviewed comparison-table template uses th scope=col and th scope=row for relationships.
- Reviewed interactive source uses native buttons and inputs for the tested menu, search, copying and filter controls.
- Reviewed the completed specialist findings and their verification limits without rerunning tests or adding speculative defects.
- Sampled generic blog links identify their target in the containing paragraph; their wording alone does not establish a WCAG A failure.
- Schedule data settled and rendered session titles, speaker names and session links on both 2025 and 2026 pages. These findings are not loading placeholders.
- Search controls have associated labels, native search inputs, and explicitly activated submit buttons.
- Session links have descriptive text, and the Filter button has an accessible name.
- Shared menu source updates disclosure aria-expanded states when opening and closing. Keyboard-specific failures are reported separately by keyboard-navigator.
- Showcase filter has an accessible name, native select options, a visible CSS-generated Sector label, and a Filter submit button. Selecting an option leaves the page unchanged until Filter is activated; submitted GET retains the selected value.
- Showcase uses a labelled native select and explicit Filter submit button with full document navigation; its results are not an in-place status-message update.
- Source review: rocket hover/focus animation is disabled under prefers-reduced-motion; blog scroll animation is gated on no-preference.
- Ten representative pages checked at 320 CSS pixels: no confirmed reflow failures; comparison table remains in its own horizontal scroll region.
- Ten representative pages had no axe color-contrast violations in either light or dark mode after waiting for theme transitions to settle. The older code example was separately verified as a failure.
- Text colors measured against the white background pass AA: #484848 is 9.15:1; #1155CC links are 6.57:1 and also underlined.
- The Get started dialog has role=dialog, aria-modal=true and a valid aria-labelledby referencing its visible heading.
- The deployed /sitewide_alert/ endpoint returned an empty JSON object during this review, and no fetched banner was inserted.
- The document has StructTreeRoot, MarkInfo Marked=true and semantic paragraph, heading, list and link tags.
- The five link annotations are represented by five Link tags with descriptive text: WCAG, ATAG, Web Sustainability Guidelines, Zen of Wagtail, and OWASP Top 10.
- The homepage copy button responds to Enter and copies 'pip install wagtail' to the clipboard.
- The homepage skip link is the first tab stop, becomes visible on focus, and Enter followed by Tab reaches the main-content copy button in Chromium.
- Verified the existing CI runs lint, production build, Django system checks, migration checks and Django tests; package.json has no browser accessibility test command.
- Visually inspected the image-check success-rate chart in /blog/leaner-images-lower-footprint-at-scale/; the nearby text supplies its three numerical comparisons (31–38%, 87–92%, 48–65%).
- WCAG text-spacing overrides applied at 1280px and 320px on ten representative pages: no confirmed text loss; raw overflow candidates include decorative graphics and screen-reader-only text.

## Needs a human

Items a skill could not decide, or could not check automatically.

- **alt-text-headings**: Source review was read-only; CMS values were reviewed against captured live HTML. Local source and deployed content can differ.
- **alt-text-headings**: Heading-level skips on /features/ and search results are recommendations for clearer outlines, not automatically WCAG failures. card_block.html:4 hardcodes h4 under h2 sections; search_results.html:56 uses h3 without a results h2. Core-team content also marks one peer (Vince Salvino) as h3 among h2 peers; correct the editorial outline.
- **alt-text-headings**: Homepage video requires an audio review before a conformance determination: its 37.94-second MP4 contains audio and informative UI demonstrations (writing experience, block splitting, dark mode). Live markup and home_page.html:54–59 provide only 'Promotional homepage video', with no caption track or transcript link. Frames were inspected, but audio could not be listened to with available tools; do not treat this as a confirmed 1.2.2 or 1.2.5 failure yet.
- **alt-text-headings**: Video templates video_block.html and space_video_block.html likewise have no caption-track fields/rendering. Add a supported caption/transcript workflow for informative uploads, then review actual audio and visual content for each asset.
- **alt-text-headings**: Newsletter tables are presentational layouts without role=presentation, and newsletter archives lack main/h1 structure; these are improvement recommendations, not scored failures without evidence of an incorrect reading order or relationship.
- **alt-text-headings**: Evidence images are saved under .a11y-history/2026-10-16/evidence/structure-*.png. Native assistive-technology reading and every image's visual equivalence were not tested.
- **alt-text-headings**: The image-alt presence pass covers serialized server HTML only. The JavaScript-rendered pretalx shadow-root portraits are separately confirmed failures in web-component-specialist.json.
- **aria-specialist**: Feature-index advisory: feature_block.html:6 sets aria-controls from lowercased heading text on passive content divs. For example "dark mode-feature" refers to nonexistent tokens dark and mode-feature. Remove the attribute: this content does not control another element. Runtime found 42 such passive containers; the captured axe run flags 39 visible nodes as critical. No lost operation or necessary relationship was demonstrated, so do not classify these as critical WCAG failures or include them in confirmed-failure counts.
- **aria-specialist**: The ARIA specification defines aria-controls as identifying elements whose contents or presence are controlled by the current element: https://www.w3.org/TR/wai-aria-1.2/#aria-controls. The native feature-filter checkboxes perform the actual filtering.
- **aria-specialist**: The mobile navigation trigger uses aria-haspopup=true although its popup is ordinary navigation rather than an ARIA menu. Remove that attribute for a disclosure pattern; retain aria-expanded. This semantics improvement is not separately scored here.
- **aria-specialist**: Get-started dialog labelling is conditional on an optional heading in menu_get_started.html:7. Keep a default accessible name if editors can remove that heading; this is a source risk rather than a confirmed deployed failure.
- **aria-specialist**: Search-dialog naming guidance: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/. Severity is moderate after review because the dialog loses context, but its labelled input and controls remain usable.
- **aria-specialist**: Runtime evidence: .a11y-history/2026-10-16/evidence/aria-runtime.json. Tests used isolated headless Chromium at 1440×1000 and 390×844; no source was changed.
- **aria-specialist**: Live-region behavior, native screen-reader announcements and every third-party embedded widget were not exhaustively tested.
- **audit-context**: Coverage: sitemap plus recursive same-host links discovered 755 URLs. Rendered axe scans completed for 735 same-site URL requests, covering 708 distinct HTTP-200 HTML destinations and 14 distinct HTTP-404 destinations. 192 successful pages triggered at least one raw axe rule; this includes reviewed technical warnings and is not a count of confirmed WCAG-failing pages.
- **audit-context**: Full crawl means every discovered same-host HTML URL was fetched and scanned, including reachable pagination/filter URLs. It does not mean every content image, media alternative, dynamic state, theme, viewport or screen-reader combination received manual review. Manual interaction/visual reviews sampled representative shared components and templates; source review covered the Django/Wagtail templates, JavaScript components and Sass.
- **audit-context**: Boundary: external redirect destinations were inventoried but excluded from wagtail.org finding totals; public /admin paths and assets were not crawled as pages. The specifically requested product strategy PDF was audited across all 11 pages. Other linked PDFs and external documentation sites were not included in the document audit.
- **audit-context**: Source baseline: git commit 9fa65385f27c15b83c86a4f6e0e3ac18d4784609 (2026-10-14). No previous audit or scan configuration was found. Local source can differ from deployed code; findings distinguish deployed evidence from source-only recommendations. No application code or PDFs were changed.
- **audit-context**: Scoring interpretation: the bundled renderer score and Pass/Fail label summarize finding severity and passed-check counts. They are not a WCAG conformance percentage or certification. A moderate WCAG failure still prevents a conformance claim. PDF/UA technical findings marked n/a are not presented as confirmed WCAG failures.
- **audit-context**: Evidence index: .a11y-history/2026-10-16/evidence/page-coverage.csv lists every browser scan; axe-instances.csv lists every raw violation with selector and screenshot; axe-needs-review.csv lists incomplete checks; crawl.json lists discovery, redirects and HTTP statuses. Specialist JSON includes reproduction evidence, fixes, limitations and source locations.
- **audit-context**: Priorities: repair shared mobile navigation and obscured focus, then named dialogs/embedded controls; fix the shared newsletter language and code colors; correct CMS link/image content. For the strategy PDF, tag the version/date and address the separately identified PDF/UA structure/language issues before validation. Verify fixes in a pull request and re-scan after deployment.
- **audit-context**: Product strategy PDF snapshot SHA-256: fac3a3d67c7faa858b8250b7804a7c059f53557e0b46cb83a133f5633919e3c1. Downloaded directly from the public media.wagtail.org link during this audit.
- **axe-runtime-scan**: Full rendered-page scan used axe-core 4.14.0, Playwright 1.64.1 and Chromium 152.0.7977.82; tags wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa. Initial desktop viewport 1440×1000, reduced motion enabled, public fresh browser contexts. Analytics/tracking requests were blocked. Native embeds were allowed.
- **axe-runtime-scan**: Automated findings covered by source specialists are counted once: newsletter language, syntax highlighting contrast, package-directory link styling, newsletter index cards and schedule widget defects. Raw node-level results retain every occurrence; the report counts shared causes rather than every affected DOM node.
- **axe-runtime-scan**: All 39 invalid aria-controls references on passive feature-index containers are retained in raw results as technical warnings, but excluded from scored WCAG findings after specialist review. Remove these unnecessary attributes; no essential relationship or operation was demonstrated to fail.
- **axe-runtime-scan**: The Cloudflare-generated /cdn-cgi/l/email-protection error response has a link-in-text-block warning. This edge-generated diagnostic is recorded in raw evidence as a vendor/error-page concern, separately from the package-directory fix.
- **axe-runtime-scan**: Every URL with an automated violation has a full-page screenshot indexed in evidence/axe-instances.csv and evidence/page-coverage.csv. Additional state-specific screenshots and PDF renders are under screenshots/audit-2026-10-16/.
- **axe-runtime-scan**: Automated incomplete checks, principally contrast obscured or indeterminate in the tested state, remain review items in evidence/axe-needs-review.csv. They are neither confirmed failures nor passes. Frame names were checked; full cross-origin embedded-player interaction and media alternatives were not exhaustively audited.
- **axe-runtime-scan**: axe rule documentation: https://dequeuniversity.com/rules/axe/4.14/frame-title and https://dequeuniversity.com/rules/axe/4.14/link-name. Normative target: https://www.w3.org/TR/WCAG22/.
- **contrast-master**: Manual visual and state checks are representative samples, not an assertion that all crawled pages pass every visual criterion. Browser: isolated Chromium via Playwright.
- **contrast-master**: Advisory: at 200% text-only resizing (root font 20px to 40px, 1280px viewport), roadmap five-column cards clip long headings and labels; screenshot screenshots/audit-2026-10-16/roadmap-200-percent-text.png. Use auto-fitting columns and wrapping labels. This is not counted as an AA failure because WCAG 1.4.4 permits any one supported resizing mechanism and narrow layout/full-page zoom is available. Reference: https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html.
- **contrast-master**: Brief modal animations lack reduced-motion overrides, an optional motion improvement; interaction animation is not automatically a WCAG AA failure.
- **contrast-master**: Discarded transient contrast results taken while theme color transitions were active; stable rescans after 600ms were clean on the ten-page sample.
- **contrast-master**: Full-site runtime corroboration: color-contrast failures affect 515 syntax-token nodes across 36 distinct blog pages. Exact selectors, measured ratios and screenshots are listed in evidence/axe-instances.csv. This shared stylesheet cause is counted once.
- **forms-specialist**: Blog filter auto-submission/context change is already reported by keyboard specialist; not duplicated here.
- **forms-specialist**: Legacy newsletter_index_page.html:36 lacks autocomplete=email, but that template is not the observed live /newsletter/ form. Add it before reusing the legacy template; not counted as a confirmed live failure.
- **forms-specialist**: Shared signup template repeats id=email when included twice; its controls use aria-label, so no broken label association was observed. Unique IDs are a maintenance improvement, not automatically a WCAG 2.2 failure.
- **forms-specialist**: Third-party Mailchimp subscription success, server validation, confirmation emails, and any CAPTCHA remain untested. Empty/malformed native validation was tested with all POST requests blocked as an additional safeguard.
- **forms-specialist**: Screenshots: [newsletter-form-validation.png](screenshots/audit-2026-10-16/newsletter-form-validation.png) and screenshots/audit-2026-10-16/showcase-filter-label.png. Raw control inventories and validation evidence are in forms-evidence/.
- **keyboard-navigator**: Behavioral verification used isolated headless Chromium from /usr/bin/chromium through Playwright, at desktop 1440×1000 and mobile 390×844; no shared user browser was attached.
- **keyboard-navigator**: The four reported defects were verified on deployed pages, with source reviewed to identify causes or remediation locations. Shared-component reach is inferred from templates; these behavioral checks were not repeated on every crawled URL.
- **keyboard-navigator**: Raw runtime evidence is saved in .a11y-history/2026-10-16/evidence/keyboard-deep.log and keyboard-final.log.
- **keyboard-navigator**: Desktop Escape and mobile submenu Back can leave document.activeElement on BODY after hiding the focused submenu item. Subsequent Tab remained usable in the tested Chromium flows; this is recorded as a focus-management improvement rather than an additional scored WCAG failure.
- **keyboard-navigator**: Opening a mobile submenu also leaves focus on its fully covered triggering button; additional screenshot: screenshots/audit-2026-10-16/keyboard-mobile-submenu-focus-covered.png.
- **keyboard-navigator**: Mobile-menu descendant tests used pointer activation solely to get past the independently reported keyboard activation failure.
- **keyboard-navigator**: No application files were edited.
- **link-checker**: Full captured-HTML candidate inventory found 116 generic-text links, 25 absent/empty-href anchors, 11 apparently empty anchors and one strategy PDF link. These are triage candidates, not failure counts; external redirects, hidden anchors, title-based names and contextual names require exclusion. Inventory retained at links-evidence/link-candidates.json.
- **link-checker**: Confirmed empty links in newsletter issues 3 and 6 match existing axe link-name findings and should remain in the automated aggregation; not duplicated here.
- **link-checker**: Existing link-in-text-block axe results on /packages/ duplicate the source-verified finding above; merge them as one root cause.
- **link-checker**: Advisory content maintenance: /packages/ contains empty href values on named package links; /privacy/ and /blog/state-of-wagtail-accessibility/ contain intended links rendered as anchors without href. Repair destinations or render ordinary text; these were not automatically classified as WCAG failures.
- **link-checker**: Optional improvements: make generic link text meaningful without context and include download sizes where useful. Standalone purpose is AAA, and missing file size is not automatically an AA failure.
- **link-checker**: Newsletter index empty links are a separate root cause from empty inline anchors inside issues 3 and 6. The rendered defect is confirmed; the precise CMS content or template parsing cause remains unverified.
- **link-checker**: /cdn-cgi/l/email-protection returns a Cloudflare-generated diagnostic page with its own link-in-text-block warning (#0051c3 versus #404040, 1.46:1). Treat as an edge-provider diagnostic/advisory, not the package-directory stylesheet defect; raw evidence 02eff82886ede699.json.
- **live-region-controller**: No confirmed WCAG 4.1.3 failure was identified in these reviewed states. This is not a claim of complete screen-reader interoperability.
- **live-region-controller**: The W3C status-messages guidance distinguishes status messages from ordinary changed results/content, and does not require authors to invent new messages: https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html. Feature-filter content changes and full-page showcase results were therefore not automatically flagged.
- **live-region-controller**: Copy feedback recommendation: home_page.html:33 uses role=alert for routine success. Prefer a persistent role=status region with polite announcements, update its text, and keep confirmation available longer than the current 1250 ms timeout. Chromium exposes the current alert correctly, but repeated announcement behavior and interruption of speech require native screen-reader testing.
- **live-region-controller**: Copy error recommendation: copy-code-snippet.js:17 attaches only a success handler. A controlled browser-side simulation rejecting clipboard.writeText produced an unhandled NotAllowedError and no visible or accessible failure feedback. Catch errors and supply a polite, persistent message with a manual-copy alternative. This simulation is not a spontaneously observed production failure, and absent feedback for all users is not automatically a 4.1.3 violation.
- **live-region-controller**: Sitewide-banner source inserts an ordinary aside after fetch, without live-region semantics. No live banner was present to assess. Decide whether actual future content is an urgent warning, a status update, or ordinary promotional content before choosing alert/status semantics; do not make every promotion assertive.
- **live-region-controller**: Cookie dismissal leaves document.activeElement on BODY; focus management is an improvement to assess in keyboard testing, not an additional missing-status-message failure.
- **live-region-controller**: Evidence: .a11y-history/2026-10-16/evidence/live-region-runtime.json; screenshots/audit-2026-10-16/live-copy-success.png. The feature-filter behavior is also recorded in evidence/aria-runtime.json.
- **live-region-controller**: Testing used isolated headless Chromium at 1440×1000, DOM/source inspection and accessibility snapshots. Native screen-reader speech, external newsletter submission and third-party embedded systems were not tested. No application source files were edited.
- **modal-specialist**: Duplicate defects remain in their owning reports: ARIA-DIALOG-NAME-001 (unnamed search); KEYBOARD-001 through KEYBOARD-003 (mobile activation and covered focus). They are not counted again here.
- **modal-specialist**: No new confirmed WCAG failures were identified. The native dialog element would simplify focus and inertness behavior, but a div with correct ARIA and behavior is not automatically a WCAG failure.
- **modal-specialist**: Background inertness is incomplete at implementation level: no inert attribute is set, and the cookie notice is above the modal backdrop and pointer-hit-testable while search or Get started is open. Keyboard focus remained trapped in tests; native screen-reader background navigation and effects of interacting with the cookie notice during an open modal require follow-up. Consider putting cookie interaction behind a truly modal dialog.
- **modal-specialist**: The cookie notice is nonmodal and does not need a dialog role or focus trap merely because it overlays content. Its verified mobile focus-obscuring behavior is already in the keyboard report.
- **modal-specialist**: Evidence: .a11y-history/2026-10-16/evidence/modal-runtime.json; [modal-search-open.png](screenshots/audit-2026-10-16/modal-search-open.png), [modal-getStarted-open.png](screenshots/audit-2026-10-16/modal-getStarted-open.png) and modal-mobile-nav-open.png.
- **modal-specialist**: Tests used isolated headless Chromium at 1440×1000 and 390×844. Native screen-reader traversal was not tested. No application code changed.
- **pdf-accessibility**: Reviewed on 2026-10-16 using Poppler pdfinfo/pdftotext/pdffonts, pypdf, PyMuPDF and the accessibility-agents baseline PDF scanner. No PDF scan configuration was present. The document is 11 pages, PDF 1.4, produced by Skia/PDF m151 Google Docs Renderer.
- **pdf-accessibility**: The baseline MCP scanner incorrectly reported no text content. That finding was rejected because two independent extractors and direct content-stream inspection demonstrate real text on every page. Do not recommend OCR for this file.
- **pdf-accessibility**: Poppler's pdfinfo -struct-text output truncates some paragraphs and list items after nested ActualText spans. Direct content-stream inspection shows the surrounding MCID remains present; these extraction limitations were not misreported as omitted body content.
- **pdf-accessibility**: WCAG findings and PDF/UA technical observations are explicitly separated using wcag=n/a for the latter. No claim of PDF/UA conformance is made. There is no XMP metadata or PDF/UA identification entry; adding a conformance identifier alone would not establish conformance.
- **pdf-accessibility**: veraPDF and Java were unavailable. Run veraPDF PDF/UA-1 validation after repairs and conduct an Acrobat/Reader screen-reader reading and list-navigation test; those checks remain outstanding.
- **pdf-accessibility**: Evidence files: .a11y-history/2026-10-16/evidence/product-strategy.txt, product-strategy-tags.txt, product-strategy-structure.json, and pdf-page-1-content.txt. All page renders are saved as [product-strategy-page-01.png](screenshots/audit-2026-10-16/product-strategy-page-01.png) through product-strategy-page-11.png.
- **pdf-accessibility**: List-structure reference: [PDF Association Tagged PDF Best Practice Guide](https://pdfa.org/wp-content/uploads/2023/07/Tagged-PDF-Best-Practice-Guide.pdf). Language syntax reference: [RFC 3066](https://www.rfc-editor.org/rfc/rfc3066.html). WCAG language context: [W3C Understanding 3.1.1](https://www.w3.org/WAI/WCAG21/Understanding/language-of-page).
- **pdf-accessibility**: The PDF and application source were not modified.
- **tables-data-specialist**: No confirmed WCAG 2.2 AA table-domain failures were found in these checks. This is limited to the audited markup and Chromium behavior, not a universal screen-reader/browser conformance claim.
- **tables-data-specialist**: The comparison tables have no captions or explicit accessible names. Their surrounding page context and scoped headers make the data relationships clear; missing captions alone were not scored as WCAG failures. Adding concise captions would improve table discovery.
- **tables-data-specialist**: Adding tabindex=0 and an accessible name to the comparison scroll regions would make focus behavior explicit across browsers. The absent attribute was not reported as a failure because the tested live keyboard interaction succeeds.
- **tables-data-specialist**: Newsletter layout tables lack role=presentation. Replacing them with CSS layout for the web archive, or explicitly removing layout-table semantics, would reduce dependence on browser heuristics. No incorrect data relationship was demonstrated, so this is advice rather than a scored finding.
- **tables-data-specialist**: Five crawl URLs redirect off-origin: /accessibility/acr/, /accessibility/atag-audit/, /gsoc, /skills-upgrade-wagtail/, and /sustainability/sustainability-roadmap/. Their destination tables were inspected for scope classification and excluded from wagtail.org findings.
- **tables-data-specialist**: The separately audited Wagtail Space schedule widget is handled by the structure specialist, avoiding duplicate findings.
- **tables-data-specialist**: Evidence saved in .a11y-history/2026-10-16/evidence/tables-inventory.json, tables-runtime.json, and tables-keyboard.json. No application source was changed.
- **testing-coach**: CI recommendation: add a separate Playwright plus @axe-core/playwright job against a built Django/Wagtail test instance with deterministic fixtures for representative templates. Scan initial pages and opened menus/dialogs after content and transitions settle; include mobile and desktop widths and both themes. Preserve raw results and traces as artifacts. Use explicit, reviewed fingerprints for accepted existing issues rather than disabling whole rules. [Playwright accessibility testing](https://playwright.dev/docs/accessibility-testing).
- **testing-coach**: CI scope: include homepage, features, blog filters, a syntax-highlighted blog post, a newsletter archive, a comparison table, an embedded video and the Space schedule. Select WCAG 2.0/2.1/2.2 A/AA tags supported by the pinned axe version. Treat incomplete checks as review items. Run the broader same-origin content crawl periodically to catch CMS changes; do not mistake redirected external sites for same-origin coverage.
- **testing-coach**: Mobile navigation regression: at 390px and narrow zoomed layouts, use only Tab, Shift+Tab, Enter, Space and Escape. Both activation keys must open the burger; submenu focus must enter visible content; Back must restore its trigger; no Tab stop may fall behind a submenu. Repeat with the cookie banner present and dismissed. Criteria: 2.1.1 and 2.4.11.
- **testing-coach**: Dialogs regression: open search and Get started by keyboard, verify a meaningful accessible dialog name, initial focus, forward/reverse focus containment, Escape and close-button behavior, then trigger-focus restoration. Test the search dialog after its naming repair and the optional-heading Get started state. Criteria: 4.1.2, 2.4.3 and 2.1.2.
- **testing-coach**: Color regression: remeasure syntax tokens after theme transitions finish, against their actual code background in both themes; normal-size code must reach 4.5:1 under 1.4.3. Check package-directory inline links retain a non-color distinguishing cue under 1.4.1. Inspect focus and hover states separately.
- **testing-coach**: Content regression: confirm the shared newsletter root has a valid English lang value across all archive issues (3.1.1); review repaired image alternatives for their actual purpose (1.1.1). Check every embedded iframe has a meaningful accessible name, then enter, operate and leave its controls by keyboard; frame naming does not establish accessibility of third-party frame contents.
- **testing-coach**: Schedule regression: wait for the pretalx widget's shadow-root content before scanning. Exercise date/view selectors, session links, expansion and any detail dialogs with keyboard and a screen reader. Check control names/states, ordered announcements, focus restoration, text contrast and narrow-screen access. Preserve independent evidence for the embedded widget and escalate vendor-owned defects with reproducible steps.
- **testing-coach**: Forms and feedback regression: changing a blog checkbox must not unexpectedly navigate before an explicit Apply action unless an appropriate alternative is implemented (3.2.2). Test signup invalid-input messages and a controlled staging success path. Confirm repeated copy successes are announced and a clipboard rejection provides useful feedback without losing focus; current Chromium role exposure does not prove spoken announcements.
- **testing-coach**: PDF regression: verify the version/date is in logical tag order; repair list label/body structure and language syntax; rerun veraPDF against PDF/UA-1 separately from WCAG review. Read the repaired PDF in Adobe Acrobat Reader with NVDA, navigating headings, lists, bookmarks and links. Confirm all content, including page continuations, is read once in order. Do not apply OCR to this text-based document.
- **testing-coach**: Outstanding native assistive-technology coverage: test NVDA with Firefox and Chromium on Windows, VoiceOver with Safari on macOS/iOS, and mobile navigation with TalkBack where supported. Record actual announcements and browser/AT versions. This audit's browser automation and accessibility-tree inspection do not substitute for those speech and interaction checks. Automated tools alone cannot determine conformance: [W3C tool-selection guidance](https://www.w3.org/WAI/test-evaluate/tools/selecting/).
- **testing-coach**: Outstanding manual content review: listen to homepage video audio and assess captions, meaningful audio descriptions and transcript needs before deciding 1.2.2/1.2.5 conformance. Third-party signup completion, server-side validation, confirmation emails and any CAPTCHA were not exercised in this audit.
- **testing-coach**: Recheck each fix in its pull request, rerun the affected template/content family after deployment, and close findings only with recorded passing evidence. Complete the remaining screen-reader, media and PDF validation before making any WCAG conformance claim. No CI files, application source or scheduled jobs were changed.
- **web-component-specialist**: Reviewed severity replaces automated impact labels: unnamed favorite controls are serious; portrait alternatives, date relationships and timezone naming are moderate. None of these observations demonstrates a total critical site blocker.
- **web-component-specialist**: The widget is supplied by https://pretalx.com/wagtail-space-2026/widgets/schedule.js and its 2025 equivalent. The repository embeds it at space_schedule_page.html:14–15; template fixes outside the shadow root alone will not repair its controls. No upstream messages were sent.
- **web-component-specialist**: The 2026 page displayed a static UTC label, while 2025 exposed the unnamed timezone textbox. The timezone finding is limited to the verified 2025 control.
- **web-component-specialist**: Pressing ArrowRight on the first date tab did not move focus or selection on either widget. All session content remained in the accessibility tree, so this limited test is recorded for further keyboard-pattern review rather than an additional confirmed keyboard failure.
- **web-component-specialist**: The site currently provides its external schedule fallback link only inside noscript. Consider an always-visible accessible schedule alternative; accessibility of the external destination itself was not verified.
- **web-component-specialist**: Evidence: .a11y-history/2026-10-16/evidence/widget-runtime.json and widget-2025-runtime.json; [widget-schedule.png](screenshots/audit-2026-10-16/widget-schedule.png) and widget-2025-schedule.png. Automated raw files: raw/0ba3b8a111efca54.json and raw/105c68e50a4c5cd4.json.
- **web-component-specialist**: Browser tests used isolated headless Chromium at 1440×1000 and waited for visible favorite controls plus an additional 1.8 seconds. Native screen-reader speech and all filter/session-detail overlay states were not exhaustively tested.
- **web-component-specialist**: No link-in-text-block violation was present in the supplied raw 2025 schedule file at the time of inspection; no additional link-color finding was inferred.

## Next steps

1. Fix the 9 blocking findings above, starting with any repeated component.
2. Re-run this audit and check the delta section for regressions.
3. Wire the scan into continuous integration so the next regression is caught before review.

Automated checks find a minority of accessibility barriers. A passing score is a floor, not a guarantee.

## Evidence by finding

Evidence retained from the specialist review; full screenshots and measurements are linked in the evidence index.

| # | Rule | Location | Observed evidence |
|---:|---|---|---|
| 1 | color-contrast | https://wagtail.org/blog/wagtail-10b2/ .codehilite .nv | Rendered .nv text “wagtail”: #bb60d5 on #f5f5f5, 3.35:1, normal 17px. Screenshot: screenshots/audit-2026-10-16/syntax-code-contrast.png. Source: wagtailio/static/sass/vendor/_code-highlighting.scss:58. |
| 2 | frame-title | https://wagtail.org/blog/why-pay-for-open-source/ iframe | axe-core found 19 unnamed frames across 16 pages. The representative YouTube iframe has no title, aria-label or aria-labelledby. All URLs, selectors and screenshots are indexed in .a11y-history/2026-10-16/evidence/axe-instances.csv. |
| 3 | HTML-LANG-001 | wagtailio/newsletter/templates/newsletter/newsletter_page.html:3 | Live /this-week-in-wagtail/issue-1/ renders &lt;html xmlns="http://www.w3.org/1999/xhtml"&gt; without lang. Rendered axe scans confirm the omission on all 136 distinct newsletter issue pages; earlier source inventory counted 138 URL variants. |
| 4 | KEYBOARD-001 | wagtailio/static/js/components/mobile-menu.js:38 | Verified live homepage at 390×844: focus [data-mobile-menu-toggle], press Enter and Space; aria-expanded remains false. Pointer click changes it to true. Source registers only pointerup. Screenshot: screenshots/audit-2026-10-16/keyboard-mobile-menu-enter-fails.png. |
| 5 | KEYBOARD-002 | wagtailio/static/js/components/mobile-sub-menu.js:47 | Live 390×844 homepage: open mobile menu with pointer, activate Project, then Tab 11 times. Focus reaches Explore at x20,y141,w350,h18 behind the Project panel; Developers, Community, Support and Get started follow while covered. Repeated after cookie dismissal. Screenshot: screenshots/audit-2026-10-16/keyboard-mobile-tab-behind-submenu.png. |
| 6 | link-in-text-block | https://wagtail.org/packages/ .overview__description-link | Runtime: link #262626, surrounding text #5c5c5c, contrast 2.26:1; both font-weight 400; text-decoration:none; no pseudo-element cues. Screenshot: screenshots/audit-2026-10-16/packages-link-distinction.png. |
| 7 | link-name | https://wagtail.org/this-week-in-wagtail/?page=7 .blog-post--small; https://wagtail.org/this-week-in-wagtail/?page=11 .blog-post--small | Browser axe confirms empty .blog-post.blog-post--small anchors to issues 106 and 105 on page=7 and issue 83 on page=11. Raw: 02f3fcf6749b5d84.json and f6af1208408930a7.json; corresponding screenshot basenames [02f3fcf6749b5d84.jpg](screenshots/audit-2026-10-16/02f3fcf6749b5d84.jpg) and f6af1208408930a7.jpg. |
| 8 | link-name | https://wagtail.org/this-week-in-wagtail/issue-3/ p:nth-child(10) &gt; a | 4 empty href-bearing anchors on 2 pages: two in issue 3 and two in issue 6. Captured markup has no text, images, title or ARIA name. See axe-instances.csv for selectors and screenshots. |
| 9 | SHADOW-FAVORITE-NAME-001 | https://wagtail.org/wagtail-space-2026/schedule/ — pretalx-schedule shadow root button.btn-fav-container | Settled widgets contain 28 unnamed favorite buttons in 2026 and 31 in 2025. Chromium snapshot exposes only button &gt; img. Space activates the first star and changes its SVG class, but no name or pressed state is exposed. |
| 10 | ALT-CONTENT-001 | https://wagtail.org/blog/getting-started-wagtail-newcomers-perspective/ | The main image has alt="Screenshot 2022-08-15 at 11.27.22" but visually shows Wagtail editing controls. Other examples include alt="avatar square 2017 960.jpg" on /blog/wordpress-to-wagtail-migration-kit/ and "wagtail-developer-training-image" on /services/. |
| 11 | ARIA-DIALOG-NAME-001 | wagtailio/project_styleguide/templates/patterns/includes/search-modal.html:3 | Live homepage: activate [data-site-search-desktop]. Chromium snapshot begins "- dialog:" with no name; markup is &lt;div class="modal__container" role="dialog" aria-modal="true"&gt;. Targeted axe reports aria-dialog-name. Screenshot: screenshots/audit-2026-10-16/aria-unnamed-search-dialog.png. |
| 12 | KEYBOARD-003 | https://wagtail.org/ — .cookie.active and [data-mobile-menu] a[href='/core-team/'] | Fresh session at 390×844: open mobile menu, activate Project and Tab nine times to Core team. Focus rectangle x21,y641,w348,h45 is fully covered by the cookie rectangle x10,y640.44,w390,h203.56. Screenshot: screenshots/audit-2026-10-16/keyboard-cookie-covers-menu-link.png. |
| 13 | KEYBOARD-004 | wagtailio/static/js/components/filter-form.js:18 | Live /blog/: focus #category-accessibility and press Space. Browser immediately navigates to /blog/?category=44 and activeElement becomes BODY. The form says only 'Filter posts by category'; no warning describes navigation. Source calls this.node.submit() on change. |
| 14 | PDF-TAGS-001 | .a11y-history/2026-10-16/documents/Wagtail_Product_Strategy_2026_v1.0.pdf — page 1, version/date header | Page 1 visibly says 'Version 1.0, June 2026'. Content-stream inspection decodes this text outside every marked-content sequence; the tag tree starts with the title. Evidence: product-strategy-structure.json; screenshot: screenshots/audit-2026-10-16/product-strategy-page-01.png. |
| 15 | PDFUA-LIST-001 | .a11y-history/2026-10-16/documents/Wagtail_Product_Strategy_2026_v1.0.pdf — lists on pages 3–10 | Structure traversal finds 10 L elements and 37 LI elements, but zero Lbl and only one LBody. For example, page 3's first LI directly references MCID 4 instead of containing label/body elements. PDF/UA technical issue; no separate WCAG failure or screen-reader omission is inferred. |
| 16 | SHADOW-AVATAR-ALT-001 | https://wagtail.org/wagtail-space-2026/schedule/ — pretalx-schedule shadow root .avatars img | 26 missing-alt portrait images in the 2026 schedule and 29 in 2025 remain after loading. Example: &lt;img src="https://pretalx.com/media/avatars/NWSRRS_mfIrUuC_thumbnail_tiny.webp"&gt; beside Thibaud Colas. Snapshot exposes img despite the adjacent name. |
| 17 | SHADOW-TAB-RELATION-001 | https://wagtail.org/wagtail-space-2026/schedule/ — pretalx-schedule shadow root [role=tab] | All three aria-controls date IDs are absent from the shadow root on both schedules. The only role=tabpanel is an empty &lt;div class="bunt-tabs-body" role="tabpanel" tabindex="0"&gt;&lt;/div&gt;; sessions appear outside it. |
| 18 | SHADOW-TIMEZONE-LABEL-001 | https://wagtail.org/wagtail-space-2025/schedule/ — pretalx-schedule shadow root input[name=timezone] | Settled snapshot exposes textbox: UTC without a name. Markup is &lt;input type="text" name="timezone" autocomplete="off"&gt;; adjacent &lt;label for="timezone"&gt;&lt;/label&gt; is empty and the input has no id. |
| 19 | PDFUA-LANG-001 | .a11y-history/2026-10-16/documents/Wagtail_Product_Strategy_2026_v1.0.pdf — document catalog /Lang | The catalog contains /Lang (en_GB); RFC language-tag syntax uses hyphens, so the expected value is en-GB. No structure element supplies an alternate language. Reader-specific speech consequences were not tested, so this is recorded as a technical issue rather than a confirmed WCAG 3.1.1 failure. |

## Findings data

The merged findings, embedded so the next run can compute a delta without parsing this document.

```json a11y-findings
{
  "skills": [
    "alt-text-headings",
    "aria-specialist",
    "audit-context",
    "axe-runtime-scan",
    "contrast-master",
    "forms-specialist",
    "keyboard-navigator",
    "link-checker",
    "live-region-controller",
    "modal-specialist",
    "pdf-accessibility",
    "tables-data-specialist",
    "testing-coach",
    "web-component-specialist"
  ],
  "scope": [
    ".a11y-history/2026-10-16/*.json",
    ".a11y-history/2026-10-16/documents/Wagtail_Product_Strategy_2026_v1.0.pdf — all 11 pages",
    ".a11y-history/2026-10-16/evidence/crawl.json",
    ".a11y-history/2026-10-16/html/*.html",
    ".a11y-history/2026-10-16/raw/*.json",
    ".a11y-history/2026-10-16/raw/6ae48cc006d4f66e.json",
    ".github/workflows/ci.yml",
    "https://media.wagtail.org/documents/Wagtail_Product_Strategy_2026_v1.0.pdf",
    "https://wagtail.org/",
    "https://wagtail.org/about-wagtail/",
    "https://wagtail.org/accessibility/",
    "https://wagtail.org/accessibility/testing/",
    "https://wagtail.org/agencies/",
    "https://wagtail.org/ai/",
    "https://wagtail.org/ai/agent-skills-for-developers/",
    "https://wagtail.org/ai/agentic-engineering-recommendations/",
    "https://wagtail.org/ai/ai-guiding-principles/",
    "https://wagtail.org/blog/",
    "https://wagtail.org/blog/10-underrated-django-packages/",
    "https://wagtail.org/blog/10-years/",
    "https://wagtail.org/blog/20000-django-packages/",
    "https://wagtail.org/blog/2023-wagtail-deployment-survey/",
    "https://wagtail.org/blog/2024-headless-survey/",
    "https://wagtail.org/blog/2026-ai-dx-survey/",
    "https://wagtail.org/blog/40-smaller-images-same-quality/",
    "https://wagtail.org/blog/5-simple-ways-anyone-can-contribute-to-wagtail/",
    "https://wagtail.org/blog/5-terabytes-for-30-seconds-of-homepage-video/",
    "https://wagtail.org/blog/7-tips-for-applying-to-google-summer-of-code/",
    "https://wagtail.org/blog/?author=Aaron+MacGillivary",
    "https://wagtail.org/blog/?author=Ahmed+Olaitan",
    "https://wagtail.org/blog/?author=Aimee+Maroney",
    "https://wagtail.org/blog/?author=Albina+Starykova",
    "https://wagtail.org/blog/?author=Alex+Morega",
    "https://wagtail.org/blog/?author=Anuja+Raj+Verma",
    "https://wagtail.org/blog/?author=Ben+Enright",
    "https://wagtail.org/blog/?author=Bertrand+Bordage",
    "https://wagtail.org/blog/?author=Brent+Clark",
    "https://wagtail.org/blog/?author=Cameron+Lamb",
    "https://wagtail.org/blog/?author=Chiemezuo",
    "https://wagtail.org/blog/?author=Chris+Rogers",
    "https://wagtail.org/blog/?author=Chrissy+Wainwright",
    "https://wagtail.org/blog/?author=Coen+van+der+Kamp",
    "https://wagtail.org/blog/?author=Damilola+Oladele",
    "https://wagtail.org/blog/?author=Dan+Braghi%C8%99",
    "https://wagtail.org/blog/?author=Doug+Harris",
    "https://wagtail.org/blog/?author=Glenn+Barr",
    "https://wagtail.org/blog/?author=Helen+Chapman",
    "https://wagtail.org/blog/?author=Hitansh+Shah",
    "https://wagtail.org/blog/?author=Ian+Bellchambers",
    "https://wagtail.org/blog/?author=Jake+Howard",
    "https://wagtail.org/blog/?author=Jane+Hughes",
    "https://wagtail.org/blog/?author=Joel+William",
    "https://wagtail.org/blog/?author=John+Abdulla",
    "https://wagtail.org/blog/?author=Joshua+Munn",
    "https://wagtail.org/blog/?author=Kalob+Taulien",
    "https://wagtail.org/blog/?author=Karl+Hobley",
    "https://wagtail.org/blog/?author=Kate+Statton+Harman",
    "https://wagtail.org/blog/?author=Kevin+Howbrook",
    "https://wagtail.org/blog/?author=Kyle+Bayliss",
    "https://wagtail.org/blog/?author=Kyle+Rutten",
    "https://wagtail.org/blog/?author=LB",
    "https://wagtail.org/blog/?author=Lisa+Ballam",
    "https://wagtail.org/blog/?author=Loveth+Omokaro",
    "https://wagtail.org/blog/?author=Maarten+Kling",
    "https://wagtail.org/blog/?author=Marko+Kruijer",
    "https://wagtail.org/blog/?author=Matt+Westcott",
    "https://wagtail.org/blog/?author=Matthew+Newton",
    "https://wagtail.org/blog/?author=Meagen+Voss",
    "https://wagtail.org/blog/?author=Meagen+Voss&page=1",
    "https://wagtail.org/blog/?author=Meagen+Voss&page=2",
    "https://wagtail.org/blog/?author=Meagen+Voss&page=3",
    "https://wagtail.org/blog/?author=Meagen+Voss&page=4",
    "https://wagtail.org/blog/?author=Meagen+Voss&page=5",
    "https://wagtail.org/blog/?author=Meagen+Voss&page=6",
    "https://wagtail.org/blog/?author=Meagen+Voss&page=7",
    "https://wagtail.org/blog/?author=Meagen+Voss&page=8",
    "https://wagtail.org/blog/?author=Meagen+Voss&page=9",
    "https://wagtail.org/blog/?author=Michael+Frost",
    "https://wagtail.org/blog/?author=Michael+Yin",
    "https://wagtail.org/blog/?author=Nick+Smith",
    "https://wagtail.org/blog/?author=Nicolas+Leung",
    "https://wagtail.org/blog/?author=Oliver+Sartun",
    "https://wagtail.org/blog/?author=Olly+Willans",
    "https://wagtail.org/blog/?author=Paarth+Agarwal",
    "https://wagtail.org/blog/?author=Pawel+Prochot%E2%80%8B",
    "https://wagtail.org/blog/?author=Phil+Dexter",
    "https://wagtail.org/blog/?author=Raghad+Dahi",
    "https://wagtail.org/blog/?author=Raphael+Stolt",
    "https://wagtail.org/blog/?author=Rohit+Sharma",
    "https://wagtail.org/blog/?author=Sage+Abdullah",
    "https://wagtail.org/blog/?author=Sandil+Ranisinghe",
    "https://wagtail.org/blog/?author=Shakhrizoda+Yusupova",
    "https://wagtail.org/blog/?author=Stephanie+Brown",
    "https://wagtail.org/blog/?author=Storm+Heg",
    "https://wagtail.org/blog/?author=Team",
    "https://wagtail.org/blog/?author=Team&page=1",
    "https://wagtail.org/blog/?author=Team&page=2",
    "https://wagtail.org/blog/?author=Thibaud+Colas",
    "https://wagtail.org/blog/?author=Thibaud+Colas&page=1",
    "https://wagtail.org/blog/?author=Thibaud+Colas&page=2",
    "https://wagtail.org/blog/?author=Thibaud+Colas&page=3",
    "https://wagtail.org/blog/?author=Thibaud+Colas&page=4",
    "https://wagtail.org/blog/?author=Thibaud+Colas&page=5",
    "https://wagtail.org/blog/?author=Thibaud+Colas&page=6",
    "https://wagtail.org/blog/?author=Thibaud+Colas&page=7",
    "https://wagtail.org/blog/?author=Thibaud+Colas&page=8",
    "https://wagtail.org/blog/?author=Thibaud+Colas&page=9",
    "https://wagtail.org/blog/?author=Tim+White",
    "https://wagtail.org/blog/?author=Tom+Dyson",
    "https://wagtail.org/blog/?author=Tom+Dyson&page=1",
    "https://wagtail.org/blog/?author=Tom+Dyson&page=2",
    "https://wagtail.org/blog/?author=Tom+Dyson&page=3",
    "https://wagtail.org/blog/?author=Will+Heinemann",
    "https://wagtail.org/blog/?category=1",
    "https://wagtail.org/blog/?category=1&page=1",
    "https://wagtail.org/blog/?category=1&page=10",
    "https://wagtail.org/blog/?category=1&page=11",
    "https://wagtail.org/blog/?category=1&page=12",
    "https://wagtail.org/blog/?category=1&page=2",
    "https://wagtail.org/blog/?category=1&page=3",
    "https://wagtail.org/blog/?category=1&page=4",
    "https://wagtail.org/blog/?category=1&page=5",
    "https://wagtail.org/blog/?category=1&page=6",
    "https://wagtail.org/blog/?category=1&page=7",
    "https://wagtail.org/blog/?category=1&page=8",
    "https://wagtail.org/blog/?category=1&page=9",
    "https://wagtail.org/blog/?category=10",
    "https://wagtail.org/blog/?category=10&page=1",
    "https://wagtail.org/blog/?category=10&page=2",
    "https://wagtail.org/blog/?category=10&page=3",
    "https://wagtail.org/blog/?category=10&page=4",
    "https://wagtail.org/blog/?category=10&page=5",
    "https://wagtail.org/blog/?category=2",
    "https://wagtail.org/blog/?category=2&page=1",
    "https://wagtail.org/blog/?category=2&page=2",
    "https://wagtail.org/blog/?category=2&page=3",
    "https://wagtail.org/blog/?category=2&page=4",
    "https://wagtail.org/blog/?category=3",
    "https://wagtail.org/blog/?category=4",
    "https://wagtail.org/blog/?category=4&page=1",
    "https://wagtail.org/blog/?category=4&page=2",
    "https://wagtail.org/blog/?category=44",
    "https://wagtail.org/blog/?category=44&page=1",
    "https://wagtail.org/blog/?category=44&page=2",
    "https://wagtail.org/blog/?category=5",
    "https://wagtail.org/blog/?category=5&page=1",
    "https://wagtail.org/blog/?category=5&page=2",
    "https://wagtail.org/blog/?category=6",
    "https://wagtail.org/blog/?category=6&page=1",
    "https://wagtail.org/blog/?category=6&page=2",
    "https://wagtail.org/blog/?category=7",
    "https://wagtail.org/blog/?category=7&page=1",
    "https://wagtail.org/blog/?category=7&page=2",
    "https://wagtail.org/blog/?category=8",
    "https://wagtail.org/blog/?category=8&page=1",
    "https://wagtail.org/blog/?category=8&page=2",
    "https://wagtail.org/blog/?category=9",
    "https://wagtail.org/blog/?page=1",
    "https://wagtail.org/blog/?page=10",
    "https://wagtail.org/blog/?page=11",
    "https://wagtail.org/blog/?page=12",
    "https://wagtail.org/blog/?page=13",
    "https://wagtail.org/blog/?page=14",
    "https://wagtail.org/blog/?page=15",
    "https://wagtail.org/blog/?page=16",
    "https://wagtail.org/blog/?page=17",
    "https://wagtail.org/blog/?page=18",
    "https://wagtail.org/blog/?page=19",
    "https://wagtail.org/blog/?page=2",
    "https://wagtail.org/blog/?page=20",
    "https://wagtail.org/blog/?page=21",
    "https://wagtail.org/blog/?page=22",
    "https://wagtail.org/blog/?page=23",
    "https://wagtail.org/blog/?page=24",
    "https://wagtail.org/blog/?page=25",
    "https://wagtail.org/blog/?page=26",
    "https://wagtail.org/blog/?page=27",
    "https://wagtail.org/blog/?page=28",
    "https://wagtail.org/blog/?page=29",
    "https://wagtail.org/blog/?page=3",
    "https://wagtail.org/blog/?page=30",
    "https://wagtail.org/blog/?page=31",
    "https://wagtail.org/blog/?page=4",
    "https://wagtail.org/blog/?page=5",
    "https://wagtail.org/blog/?page=6",
    "https://wagtail.org/blog/?page=7",
    "https://wagtail.org/blog/?page=8",
    "https://wagtail.org/blog/?page=9",
    "https://wagtail.org/blog/a-new-tutorial-series-for-the-new-year/",
    "https://wagtail.org/blog/a-plate-of-snow/",
    "https://wagtail.org/blog/a-tale-of-digging-into-wagtails-page-tree-internals/",
    "https://wagtail.org/blog/accessibility-conformance-report-wagtail-7-4/",
    "https://wagtail.org/blog/accessibility-team-reloaded/",
    "https://wagtail.org/blog/add-wagtail-blog-to-django-app/",
    "https://wagtail.org/blog/ai-and-developer-experience-wagtail-community-survey/",
    "https://wagtail.org/blog/ai-in-the-cms-steering-the-ecosystem/",
    "https://wagtail.org/blog/ai-saved-me-10-minutes-on-a-blog-post-was-it-worth-it/",
    "https://wagtail.org/blog/amazon-s3-for-media-files/",
    "https://wagtail.org/blog/an-agent-heavy-roadmap-for-2026/",
    "https://wagtail.org/blog/an-agent-skill-to-upgrade-your-wagtail-site/",
    "https://wagtail.org/blog/announcing-wagtail-sub-teams/",
    "https://wagtail.org/blog/api-support-in-wagtail-2024-headless-survey/",
    "https://wagtail.org/blog/aria-label-is-a-letdown/",
    "https://wagtail.org/blog/ashia-zawaduk/",
    "https://wagtail.org/blog/azure-ad-authentication/",
    "https://wagtail.org/blog/benchmarking-wagtail-51/",
    "https://wagtail.org/blog/bring-your-ux-feature-requests-to-wagtail-space-community-day/",
    "https://wagtail.org/blog/bristol-2017/",
    "https://wagtail.org/blog/bristol-sprint-2020/",
    "https://wagtail.org/blog/build-dynamic-campaign-landing-pages-in-wagtail/",
    "https://wagtail.org/blog/build-update-on-new-page-editor/",
    "https://wagtail.org/blog/building-a-wagtail-starter-template/",
    "https://wagtail.org/blog/caltech/",
    "https://wagtail.org/blog/cape-town-retrospective/",
    "https://wagtail.org/blog/check-yourself-vibe-coding/",
    "https://wagtail.org/blog/closing-the-gap-strict-csp-compatibility/",
    "https://wagtail.org/blog/cms-with-ai-not-ai-cms-wagtail-80s-new-api/",
    "https://wagtail.org/blog/collaborating-with-other-maintainers-at-the-gsoc-mentor-summit/",
    "https://wagtail.org/blog/coming-soonish-adding-custom-templates-with-wagtail-start/",
    "https://wagtail.org/blog/community-spotlight-cynthia-kiser/",
    "https://wagtail.org/blog/community-spotlight-lb/",
    "https://wagtail.org/blog/community-spotlight-sage-abdullah/",
    "https://wagtail.org/blog/community-spotlight-vince-salvino/",
    "https://wagtail.org/blog/comparing-open-weight-ai-models-and-providers/",
    "https://wagtail.org/blog/contributors-for-google-summer-of-code-2026/",
    "https://wagtail.org/blog/contributors-webinar-plans-for-stimulus-in-wagtail/",
    "https://wagtail.org/blog/core-team-expansion-part-2/",
    "https://wagtail.org/blog/core-team-expansion/",
    "https://wagtail.org/blog/cuh-foundation/",
    "https://wagtail.org/blog/cve-2025-45388/",
    "https://wagtail.org/blog/delete-your-stuff/",
    "https://wagtail.org/blog/deploying-wagtail-heroku/",
    "https://wagtail.org/blog/development-updates-13th-may-2015/",
    "https://wagtail.org/blog/digital-carbon-ratings-in-practice/",
    "https://wagtail.org/blog/divio-wagtail-starter-kit/",
    "https://wagtail.org/blog/django-security-releases-relevant-to-wagtail-sites/",
    "https://wagtail.org/blog/djangocon-europe-2024-birds-eye-view/",
    "https://wagtail.org/blog/djangocon-europe-2025-vibes-and-photos/",
    "https://wagtail.org/blog/djangocon-us-2023/",
    "https://wagtail.org/blog/djangocon-us-2024/",
    "https://wagtail.org/blog/documentation-sprint-2021/",
    "https://wagtail.org/blog/estimating-wagtail-websites-emissions/",
    "https://wagtail.org/blog/experiments-with-mcp-in-wagtail/",
    "https://wagtail.org/blog/five-sustainable-ways-to-build-habits-for-learning-wagtail-in-2026/",
    "https://wagtail.org/blog/fix-a-common-wagtail-ux-issue-in-two-lines/",
    "https://wagtail.org/blog/fixing-youtubes-oembed-implementation-custom-finder-class/",
    "https://wagtail.org/blog/four-contributors-for-gsoc-2025/",
    "https://wagtail.org/blog/free-talk-ideas-for-wagtail-space-2026/",
    "https://wagtail.org/blog/front-end-architecture-fundamentals/",
    "https://wagtail.org/blog/get-your-best-work-done-with-wagtail-3/",
    "https://wagtail.org/blog/getting-started-wagtail-newcomers-perspective/",
    "https://wagtail.org/blog/getting-started-with-wagtail-and-graphql/",
    "https://wagtail.org/blog/gitpod/",
    "https://wagtail.org/blog/going-green-with-google-summer-of-code/",
    "https://wagtail.org/blog/google-season-of-docs-creating-wagtail-developer-onboarding-tutorials/",
    "https://wagtail.org/blog/google-summer-of-code-2022-wagtail-midterm/",
    "https://wagtail.org/blog/google-summer-of-code-high-contrast-themes/",
    "https://wagtail.org/blog/google-summer-of-code-toolkit-for-streamfield-data-migrations-in-wagtail/",
    "https://wagtail.org/blog/google-summer-of-code-wagtail-editor-guide/",
    "https://wagtail.org/blog/graphql-with-streamfield/",
    "https://wagtail.org/blog/greener-images-with-webp/",
    "https://wagtail.org/blog/grid-aware-websites-journey-via-gsoc-2025/",
    "https://wagtail.org/blog/gsoc-2021-wrapup/",
    "https://wagtail.org/blog/gsoc-2021/",
    "https://wagtail.org/blog/gsoc-2026-guide-website-revamp-report/",
    "https://wagtail.org/blog/guidance-for-ai-led-contributions/",
    "https://wagtail.org/blog/help-us-improve-windows-high-contrast-mode-support-in-wagtail/",
    "https://wagtail.org/blog/here-are-our-talks-for-wagtail-space-2025/",
    "https://wagtail.org/blog/highlights-of-wagtail-2-15/",
    "https://wagtail.org/blog/hot-takes-are-making-the-planet-hotter-and-we-can-do-something-about-it/",
    "https://wagtail.org/blog/how-and-why-the-wagtail-page-editor-is-evolving/",
    "https://wagtail.org/blog/how-the-wagtail-newsletter-package-came-to-be/",
    "https://wagtail.org/blog/how-to-use-the-wagtail-slash-command/",
    "https://wagtail.org/blog/how-to-use-wagtail-ai-part-1/",
    "https://wagtail.org/blog/how-to-use-wagtail-live-preview/",
    "https://wagtail.org/blog/how-to-use-wagtail-within-a-mach-architecture/",
    "https://wagtail.org/blog/how-to-use-wagtail-within-a-mach-architecture/decoupled%20CMS",
    "https://wagtail.org/blog/how-we-added-svg-support-to-wagtail-50/",
    "https://wagtail.org/blog/how-we-created-the-new-wagtailorg/",
    "https://wagtail.org/blog/how-we-used-wagtail-to-streamline-crisis-response-for-veiligheidsregio-utrecht/",
    "https://wagtail.org/blog/how-you-can-use-wagtail-to-optimize-your-images/",
    "https://wagtail.org/blog/htmx-accessibility-gaps-data-and-recommendations/",
    "https://wagtail.org/blog/independent-security-audit-findings-and-next-steps/",
    "https://wagtail.org/blog/introducing-admin-api/",
    "https://wagtail.org/blog/introducing-the-wagtail-roadmap/",
    "https://wagtail.org/blog/introducing-wagtails-new-accessibility-checker/",
    "https://wagtail.org/blog/join-us-for-socials-and-wagtail-community-day-at-wagtail-space/",
    "https://wagtail.org/blog/keeping-up-with-upcoming-changes-in-wagtail/",
    "https://wagtail.org/blog/leaner-images-lower-footprint-at-scale/",
    "https://wagtail.org/blog/llmstxt-preparing-wagtail-docs-for-ai-tools/",
    "https://wagtail.org/blog/log4j-statement/",
    "https://wagtail.org/blog/looking-for-sponsorship-accessibility-checks-for-site-administrators/",
    "https://wagtail.org/blog/looking-for-sponsorship-seo-power-tools/",
    "https://wagtail.org/blog/m-plus-museum/",
    "https://wagtail.org/blog/making-the-web-more-accessible-an-update-on-wagtails-accessibility-checker/",
    "https://wagtail.org/blog/making-wagtail-accessible/",
    "https://wagtail.org/blog/making-wagtailorg-more-accessible/",
    "https://wagtail.org/blog/media-listings-ux-improvements-via-gsoc-2025/",
    "https://wagtail.org/blog/meet-wagtail-torchboxs-new-cms/",
    "https://wagtail.org/blog/mozilla-wagtail-global-giving-platform/",
    "https://wagtail.org/blog/multi-site-wagtail/",
    "https://wagtail.org/blog/new-security-announcements-channel/",
    "https://wagtail.org/blog/new-starter-kit-for-wagtail-cms/",
    "https://wagtail.org/blog/nhs-picks-wagtail/",
    "https://wagtail.org/blog/no-gsoc-on-wagtail-core-in-2027/",
    "https://wagtail.org/blog/nypr-on-wagtail/",
    "https://wagtail.org/blog/oled-and-dark-websites-lower-footprint/",
    "https://wagtail.org/blog/one-month-on-glm-53-flash/",
    "https://wagtail.org/blog/online-conference-footprint-wagtail-space-2025/",
    "https://wagtail.org/blog/open-models-only-adoption-challenge/",
    "https://wagtail.org/blog/open-source-ai-we-use-to-work-on-wagtail/",
    "https://wagtail.org/blog/open-source-carbon-footprints/",
    "https://wagtail.org/blog/open-source-internship-ux-unification/",
    "https://wagtail.org/blog/open-source-maintenance-new-contributors-and-ai-agents/",
    "https://wagtail.org/blog/our-agent-skills-for-wagtail-developers/",
    "https://wagtail.org/blog/our-djangoconus-2026-photo-album/",
    "https://wagtail.org/blog/our-first-google-season-of-docs-2023/",
    "https://wagtail.org/blog/our-new-product-strategy-for-wagtail/",
    "https://wagtail.org/blog/our-outreachy-projects-in-2023/",
    "https://wagtail.org/blog/our-projects-for-gsoc-2026/",
    "https://wagtail.org/blog/our-roadmap-for-collaborative-content-management/",
    "https://wagtail.org/blog/our-roadmap-for-the-next-6-months/",
    "https://wagtail.org/blog/our-updated-accessibility-conformance-report/",
    "https://wagtail.org/blog/our-very-first-outreachy-interns/",
    "https://wagtail.org/blog/outreachy-2023/",
    "https://wagtail.org/blog/outreachy-welcoming-new-contributors-to-open-source/",
    "https://wagtail.org/blog/oxfam-americas-storytelling-platform-built-on-wagtail-cms/",
    "https://wagtail.org/blog/package-spotlight-wagtail-ai/",
    "https://wagtail.org/blog/package-spotlight-wagtailcharts/",
    "https://wagtail.org/blog/partnerships-and-community-manager/",
    "https://wagtail.org/blog/pathorg-a-wordpress-to-wagtail-migration-story-for-a-leader-in-global-health/",
    "https://wagtail.org/blog/pick-out-packages/",
    "https://wagtail.org/blog/progress-report-on-the-google-season-of-docs-for-the-month-of-june/",
    "https://wagtail.org/blog/prototyping-a-cli-for-wagtail/",
    "https://wagtail.org/blog/pycon-2024/",
    "https://wagtail.org/blog/pycon-us-2025-building-low-carbon-websites/",
    "https://wagtail.org/blog/pyconus-2025/",
    "https://wagtail.org/blog/recovering-deleted-pages-and-models/",
    "https://wagtail.org/blog/reduce-your-wagtail-and-django-carbon-footprint-for-earth-day/",
    "https://wagtail.org/blog/reflections-on-grid-aware-websites/",
    "https://wagtail.org/blog/resuming-wagtail-ui-team/",
    "https://wagtail.org/blog/rethinking-rich-text-pipelines-with-draft-js/",
    "https://wagtail.org/blog/reykjavik-2017/",
    "https://wagtail.org/blog/search-with-algolia/",
    "https://wagtail.org/blog/security-releases-272-and-281/",
    "https://wagtail.org/blog/speakers-for-wagtail-space-2026/",
    "https://wagtail.org/blog/state-of-wagtail-accessibility/",
    "https://wagtail.org/blog/streamfield-quick-demo/",
    "https://wagtail.org/blog/supported-versions-django-vs-fastapi-vs-laravel/",
    "https://wagtail.org/blog/syracuse-university-wordpress-to-wagtail-migration/",
    "https://wagtail.org/blog/take-look-wagtail-launch-event/",
    "https://wagtail.org/blog/team-meeting-notes-13th-january/",
    "https://wagtail.org/blog/team-meeting-notes-17th-february/",
    "https://wagtail.org/blog/team-meeting-notes-20th-january/",
    "https://wagtail.org/blog/team-meeting-notes-27th-january/",
    "https://wagtail.org/blog/team-meeting-notes-2nd-december/",
    "https://wagtail.org/blog/team-meeting-notes-3rd-february/",
    "https://wagtail.org/blog/team-meeting-notes-3rd-mar-2015/",
    "https://wagtail.org/blog/team-meeting-notes-6th-january/",
    "https://wagtail.org/blog/team-meeting-notes-9th-december/",
    "https://wagtail.org/blog/telepath/",
    "https://wagtail.org/blog/ten-tasty-ingredients-for-a-delicious-pull-request/",
    "https://wagtail.org/blog/the-1000-most-popular-django-packages/",
    "https://wagtail.org/blog/the-2025-state-of-djangos-top-packages/",
    "https://wagtail.org/blog/the-carbon-footprint-of-wagtail-ai/",
    "https://wagtail.org/blog/the-future-of-editing-in-wagtail/",
    "https://wagtail.org/blog/the-lessons-i-learned-during-my-google-season-of-docs-program/",
    "https://wagtail.org/blog/the-motley-fool/",
    "https://wagtail.org/blog/things-i-learned-during-my-outreachy-internship/",
    "https://wagtail.org/blog/to-wagtail-space-and-beyond-a-month-of-live-wagtail-events/",
    "https://wagtail.org/blog/towards-strict-csp-support-via-gsoc-2025/",
    "https://wagtail.org/blog/try-wagtail-without-coding/",
    "https://wagtail.org/blog/two-contributors-join-wagtail-for-google-summer-of-code-2024/",
    "https://wagtail.org/blog/two-years-of-the-wagtail-public-roadmap/",
    "https://wagtail.org/blog/up-next-on-the-roadmap/",
    "https://wagtail.org/blog/upgrading-to-wagtail-2/",
    "https://wagtail.org/blog/upgrading-wagtail/",
    "https://wagtail.org/blog/user-testing-for-wagtail-40/",
    "https://wagtail.org/blog/using-gatsby-wagtail-build-case-study/",
    "https://wagtail.org/blog/using-uv-for-installing-wagtail/",
    "https://wagtail.org/blog/uv-overtakes-pip-in-ci/",
    "https://wagtail.org/blog/uv-overtakes-poetry/",
    "https://wagtail.org/blog/wagtail-03-say-hello-edit-bird/",
    "https://wagtail.org/blog/wagtail-04/",
    "https://wagtail.org/blog/wagtail-05/",
    "https://wagtail.org/blog/wagtail-06-07-08and-counting/",
    "https://wagtail.org/blog/wagtail-1-2/",
    "https://wagtail.org/blog/wagtail-1-5/",
    "https://wagtail.org/blog/wagtail-1-7/",
    "https://wagtail.org/blog/wagtail-10-beta1/",
    "https://wagtail.org/blog/wagtail-10/",
    "https://wagtail.org/blog/wagtail-10b2/",
    "https://wagtail.org/blog/wagtail-2-4/",
    "https://wagtail.org/blog/wagtail-2-5/",
    "https://wagtail.org/blog/wagtail-2-7/",
    "https://wagtail.org/blog/wagtail-2-9/",
    "https://wagtail.org/blog/wagtail-2/",
    "https://wagtail.org/blog/wagtail-2024-carbon-footprint/",
    "https://wagtail.org/blog/wagtail-211-internationalisation-and-more/",
    "https://wagtail.org/blog/wagtail-216-and-upcoming-breaking-changes/",
    "https://wagtail.org/blog/wagtail-40/",
    "https://wagtail.org/blog/wagtail-42/",
    "https://wagtail.org/blog/wagtail-50/",
    "https://wagtail.org/blog/wagtail-51/",
    "https://wagtail.org/blog/wagtail-52/",
    "https://wagtail.org/blog/wagtail-6-0/",
    "https://wagtail.org/blog/wagtail-61/",
    "https://wagtail.org/blog/wagtail-62/",
    "https://wagtail.org/blog/wagtail-63/",
    "https://wagtail.org/blog/wagtail-64/",
    "https://wagtail.org/blog/wagtail-70/",
    "https://wagtail.org/blog/wagtail-71/",
    "https://wagtail.org/blog/wagtail-72/",
    "https://wagtail.org/blog/wagtail-73/",
    "https://wagtail.org/blog/wagtail-74/",
    "https://wagtail.org/blog/wagtail-80/",
    "https://wagtail.org/blog/wagtail-accessibility-in-2023-and-beyond/",
    "https://wagtail.org/blog/wagtail-accessibility-statistics-for-gaad-2023/",
    "https://wagtail.org/blog/wagtail-accessibility-statistics-for-gaad-2024/",
    "https://wagtail.org/blog/wagtail-accessibility-statistics-for-gaad-2025/",
    "https://wagtail.org/blog/wagtail-accessibility-statistics-for-gaad-2026/",
    "https://wagtail.org/blog/wagtail-ai-webinar/",
    "https://wagtail.org/blog/wagtail-api-how-customize-detail-url/",
    "https://wagtail.org/blog/wagtail-api-in-action-content-ops-with-deepseek-harness/",
    "https://wagtail.org/blog/wagtail-at-berkeley/",
    "https://wagtail.org/blog/wagtail-cms-accessibility-webinar/",
    "https://wagtail.org/blog/wagtail-cms-projects-for-google-summer-of-code-2022/",
    "https://wagtail.org/blog/wagtail-cms-projects-for-google-summer-of-code-2023/",
    "https://wagtail.org/blog/wagtail-developer-jobs-where-to-look/",
    "https://wagtail.org/blog/wagtail-has-over-20000-stars-now-on-github/",
    "https://wagtail.org/blog/wagtail-heroku-2017/",
    "https://wagtail.org/blog/wagtail-in-space/",
    "https://wagtail.org/blog/wagtail-in-the-windy-city/",
    "https://wagtail.org/blog/wagtail-nominated-for-two-cms-critic-awards/",
    "https://wagtail.org/blog/wagtail-package-maintainers-2025/",
    "https://wagtail.org/blog/wagtail-packages/",
    "https://wagtail.org/blog/wagtail-people-tim-heap/",
    "https://wagtail.org/blog/wagtail-security-gpgectomy/",
    "https://wagtail.org/blog/wagtail-space-2025-a-stellar-journey/",
    "https://wagtail.org/blog/wagtail-space-2025-is-a-go/",
    "https://wagtail.org/blog/wagtail-space-2026-cfp/",
    "https://wagtail.org/blog/wagtail-space-cleveland-2022/",
    "https://wagtail.org/blog/wagtail-space-minsk/",
    "https://wagtail.org/blog/wagtail-space-nl-2022-you-are-invited/",
    "https://wagtail.org/blog/wagtail-space-nl-2024-recap-productive-and-fun/",
    "https://wagtail.org/blog/wagtail-space-nl-2026-vibes-and-photos/",
    "https://wagtail.org/blog/wagtail-space-nl-2026/",
    "https://wagtail.org/blog/wagtail-space-nl-prep/",
    "https://wagtail.org/blog/wagtail-space-talk-ideas-2025/",
    "https://wagtail.org/blog/wagtail-space-talks-wed-love-to-see-in-2024/",
    "https://wagtail.org/blog/wagtail-space-us-2022/",
    "https://wagtail.org/blog/wagtail-space-us-2024-recap/",
    "https://wagtail.org/blog/wagtail-space-usa/",
    "https://wagtail.org/blog/wagtail-statement-on-webp-vulnerability/",
    "https://wagtail.org/blog/wagtail-tailwind-typography/",
    "https://wagtail.org/blog/wagtail-user-testers-wanted/",
    "https://wagtail.org/blog/wagtail-vision/",
    "https://wagtail.org/blog/wagtail-webinar-may-2025-highlights/",
    "https://wagtail.org/blog/wagtail-wrapped-2023/",
    "https://wagtail.org/blog/wagtail-wrapped-2024/",
    "https://wagtail.org/blog/wagtail-wrapped-2025/",
    "https://wagtail.org/blog/wagtailers-flocked-to-scotland-for-djangocon-europe-2023/",
    "https://wagtail.org/blog/wagtails-2025-carbon-footprint/",
    "https://wagtail.org/blog/wagtails-domain-migration/",
    "https://wagtail.org/blog/wagtails-first-hatch-backers/",
    "https://wagtail.org/blog/wagtails-new-developer-relations-team/",
    "https://wagtail.org/blog/what-ai-tools-get-right-and-wrong-with-wagtail/",
    "https://wagtail.org/blog/what-i-learned-from-two-days-of-hanging-out-with-ai-experts/",
    "https://wagtail.org/blog/what-our-ai-guiding-principles-actually-mean/",
    "https://wagtail.org/blog/what-we-can-learn-from-python-docs-analytics/",
    "https://wagtail.org/blog/whats-it-like-for-a-developer-moving-to-wagtail-from-drupal/",
    "https://wagtail.org/blog/whats-new-in-wagtail-cms-march-2024/",
    "https://wagtail.org/blog/whats-new-in-wagtail-episode-3/",
    "https://wagtail.org/blog/whats-new-in-wagtail-episode-4/",
    "https://wagtail.org/blog/whats-new-in-wagtail-episode-5/",
    "https://wagtail.org/blog/whats-new-in-wagtail-february-2026/",
    "https://wagtail.org/blog/whats-new-in-wagtail-is-back/",
    "https://wagtail.org/blog/whats-new-in-wagtail-march-2023/",
    "https://wagtail.org/blog/whats-new-in-wagtail-may-2022/",
    "https://wagtail.org/blog/whats-new-in-wagtail-may-2025/",
    "https://wagtail.org/blog/whats-new-in-wagtail-may-2026/",
    "https://wagtail.org/blog/whats-new-in-wagtail-oct-2024/",
    "https://wagtail.org/blog/whats-new-in-wagtail-sept-2023/",
    "https://wagtail.org/blog/where-were-at-for-google-summer-of-code-2022/",
    "https://wagtail.org/blog/why-pay-for-open-source/",
    "https://wagtail.org/blog/why-wagtail-new-editor-is-built-with-draft-js/",
    "https://wagtail.org/blog/why-were-tackling-technical-debt-in-wagtail-50/",
    "https://wagtail.org/blog/wordpress-to-wagtail-migration-kit/",
    "https://wagtail.org/blog/yougov/",
    "https://wagtail.org/business/",
    "https://wagtail.org/cdn-cgi/l/email-protection",
    "https://wagtail.org/charities-and-nonprofits/",
    "https://wagtail.org/code-of-conduct/",
    "https://wagtail.org/community-resources/",
    "https://wagtail.org/contact/",
    "https://wagtail.org/content-personalization/",
    "https://wagtail.org/cookie-policy/",
    "https://wagtail.org/core-team/",
    "https://wagtail.org/cultural-institutions/",
    "https://wagtail.org/digital-emissions/",
    "https://wagtail.org/education/",
    "https://wagtail.org/events/",
    "https://wagtail.org/faqs/",
    "https://wagtail.org/feature-index/",
    "https://wagtail.org/features/",
    "https://wagtail.org/get-help/",
    "https://wagtail.org/get-started/",
    "https://wagtail.org/government/",
    "https://wagtail.org/headless/",
    "https://wagtail.org/newsletter/",
    "https://wagtail.org/packages/",
    "https://wagtail.org/privacy/",
    "https://wagtail.org/product-strategy/",
    "https://wagtail.org/roadmap/",
    "https://wagtail.org/search/",
    "https://wagtail.org/search/?query=wagtail",
    "https://wagtail.org/security/",
    "https://wagtail.org/services/",
    "https://wagtail.org/showcase/",
    "https://wagtail.org/showcase/?page=1&sector=All",
    "https://wagtail.org/showcase/?page=1&sector=Charities+and+nonprofits",
    "https://wagtail.org/showcase/?page=1&sector=Government+agencies",
    "https://wagtail.org/showcase/?page=2&sector=All",
    "https://wagtail.org/showcase/?page=2&sector=Charities+and+nonprofits",
    "https://wagtail.org/showcase/?page=2&sector=Government+agencies",
    "https://wagtail.org/showcase/?page=3&sector=All",
    "https://wagtail.org/showcase/?page=4&sector=All",
    "https://wagtail.org/showcase/?page=5&sector=All",
    "https://wagtail.org/showcase/?page=6&sector=All",
    "https://wagtail.org/showcase/?sector=Charities+and+nonprofits",
    "https://wagtail.org/showcase/?sector=Government+agencies",
    "https://wagtail.org/sitewide_alert/",
    "https://wagtail.org/sponsor/",
    "https://wagtail.org/sustainability/",
    "https://wagtail.org/this-week-in-wagtail/",
    "https://wagtail.org/this-week-in-wagtail/?page=10",
    "https://wagtail.org/this-week-in-wagtail/?page=11",
    "https://wagtail.org/this-week-in-wagtail/?page=12",
    "https://wagtail.org/this-week-in-wagtail/?page=13",
    "https://wagtail.org/this-week-in-wagtail/?page=14",
    "https://wagtail.org/this-week-in-wagtail/?page=15",
    "https://wagtail.org/this-week-in-wagtail/?page=16",
    "https://wagtail.org/this-week-in-wagtail/?page=17",
    "https://wagtail.org/this-week-in-wagtail/?page=18",
    "https://wagtail.org/this-week-in-wagtail/?page=19",
    "https://wagtail.org/this-week-in-wagtail/?page=2",
    "https://wagtail.org/this-week-in-wagtail/?page=20",
    "https://wagtail.org/this-week-in-wagtail/?page=21",
    "https://wagtail.org/this-week-in-wagtail/?page=22",
    "https://wagtail.org/this-week-in-wagtail/?page=23",
    "https://wagtail.org/this-week-in-wagtail/?page=24",
    "https://wagtail.org/this-week-in-wagtail/?page=25",
    "https://wagtail.org/this-week-in-wagtail/?page=26",
    "https://wagtail.org/this-week-in-wagtail/?page=27",
    "https://wagtail.org/this-week-in-wagtail/?page=28",
    "https://wagtail.org/this-week-in-wagtail/?page=3",
    "https://wagtail.org/this-week-in-wagtail/?page=4",
    "https://wagtail.org/this-week-in-wagtail/?page=5",
    "https://wagtail.org/this-week-in-wagtail/?page=6",
    "https://wagtail.org/this-week-in-wagtail/?page=7",
    "https://wagtail.org/this-week-in-wagtail/?page=8",
    "https://wagtail.org/this-week-in-wagtail/?page=9",
    "https://wagtail.org/this-week-in-wagtail/issue-1/",
    "https://wagtail.org/this-week-in-wagtail/issue-10/",
    "https://wagtail.org/this-week-in-wagtail/issue-100/",
    "https://wagtail.org/this-week-in-wagtail/issue-101/",
    "https://wagtail.org/this-week-in-wagtail/issue-102/",
    "https://wagtail.org/this-week-in-wagtail/issue-103/",
    "https://wagtail.org/this-week-in-wagtail/issue-104/",
    "https://wagtail.org/this-week-in-wagtail/issue-105/",
    "https://wagtail.org/this-week-in-wagtail/issue-106/",
    "https://wagtail.org/this-week-in-wagtail/issue-107/",
    "https://wagtail.org/this-week-in-wagtail/issue-108/",
    "https://wagtail.org/this-week-in-wagtail/issue-109/",
    "https://wagtail.org/this-week-in-wagtail/issue-11/",
    "https://wagtail.org/this-week-in-wagtail/issue-110/",
    "https://wagtail.org/this-week-in-wagtail/issue-111/",
    "https://wagtail.org/this-week-in-wagtail/issue-112/",
    "https://wagtail.org/this-week-in-wagtail/issue-113/",
    "https://wagtail.org/this-week-in-wagtail/issue-114/",
    "https://wagtail.org/this-week-in-wagtail/issue-115/",
    "https://wagtail.org/this-week-in-wagtail/issue-116/",
    "https://wagtail.org/this-week-in-wagtail/issue-117/",
    "https://wagtail.org/this-week-in-wagtail/issue-118/",
    "https://wagtail.org/this-week-in-wagtail/issue-119/",
    "https://wagtail.org/this-week-in-wagtail/issue-12/",
    "https://wagtail.org/this-week-in-wagtail/issue-120/",
    "https://wagtail.org/this-week-in-wagtail/issue-121/",
    "https://wagtail.org/this-week-in-wagtail/issue-122/",
    "https://wagtail.org/this-week-in-wagtail/issue-123/",
    "https://wagtail.org/this-week-in-wagtail/issue-124/",
    "https://wagtail.org/this-week-in-wagtail/issue-125/",
    "https://wagtail.org/this-week-in-wagtail/issue-126/",
    "https://wagtail.org/this-week-in-wagtail/issue-127/",
    "https://wagtail.org/this-week-in-wagtail/issue-128/",
    "https://wagtail.org/this-week-in-wagtail/issue-129/",
    "https://wagtail.org/this-week-in-wagtail/issue-13/",
    "https://wagtail.org/this-week-in-wagtail/issue-130/",
    "https://wagtail.org/this-week-in-wagtail/issue-131/",
    "https://wagtail.org/this-week-in-wagtail/issue-132/",
    "https://wagtail.org/this-week-in-wagtail/issue-133/",
    "https://wagtail.org/this-week-in-wagtail/issue-134/",
    "https://wagtail.org/this-week-in-wagtail/issue-135/",
    "https://wagtail.org/this-week-in-wagtail/issue-136/",
    "https://wagtail.org/this-week-in-wagtail/issue-14/",
    "https://wagtail.org/this-week-in-wagtail/issue-15/",
    "https://wagtail.org/this-week-in-wagtail/issue-16/",
    "https://wagtail.org/this-week-in-wagtail/issue-17/",
    "https://wagtail.org/this-week-in-wagtail/issue-18/",
    "https://wagtail.org/this-week-in-wagtail/issue-19/",
    "https://wagtail.org/this-week-in-wagtail/issue-2/",
    "https://wagtail.org/this-week-in-wagtail/issue-20/",
    "https://wagtail.org/this-week-in-wagtail/issue-21/",
    "https://wagtail.org/this-week-in-wagtail/issue-22/",
    "https://wagtail.org/this-week-in-wagtail/issue-23/",
    "https://wagtail.org/this-week-in-wagtail/issue-24/",
    "https://wagtail.org/this-week-in-wagtail/issue-25/",
    "https://wagtail.org/this-week-in-wagtail/issue-26/",
    "https://wagtail.org/this-week-in-wagtail/issue-27/",
    "https://wagtail.org/this-week-in-wagtail/issue-28/",
    "https://wagtail.org/this-week-in-wagtail/issue-29/",
    "https://wagtail.org/this-week-in-wagtail/issue-3/",
    "https://wagtail.org/this-week-in-wagtail/issue-30/",
    "https://wagtail.org/this-week-in-wagtail/issue-31/",
    "https://wagtail.org/this-week-in-wagtail/issue-32/",
    "https://wagtail.org/this-week-in-wagtail/issue-33/",
    "https://wagtail.org/this-week-in-wagtail/issue-34/",
    "https://wagtail.org/this-week-in-wagtail/issue-35/",
    "https://wagtail.org/this-week-in-wagtail/issue-36/",
    "https://wagtail.org/this-week-in-wagtail/issue-37/",
    "https://wagtail.org/this-week-in-wagtail/issue-38/",
    "https://wagtail.org/this-week-in-wagtail/issue-39/",
    "https://wagtail.org/this-week-in-wagtail/issue-4/",
    "https://wagtail.org/this-week-in-wagtail/issue-40/",
    "https://wagtail.org/this-week-in-wagtail/issue-41/",
    "https://wagtail.org/this-week-in-wagtail/issue-42/",
    "https://wagtail.org/this-week-in-wagtail/issue-43/",
    "https://wagtail.org/this-week-in-wagtail/issue-44/",
    "https://wagtail.org/this-week-in-wagtail/issue-45/",
    "https://wagtail.org/this-week-in-wagtail/issue-46/",
    "https://wagtail.org/this-week-in-wagtail/issue-47/",
    "https://wagtail.org/this-week-in-wagtail/issue-48/",
    "https://wagtail.org/this-week-in-wagtail/issue-49/",
    "https://wagtail.org/this-week-in-wagtail/issue-5/",
    "https://wagtail.org/this-week-in-wagtail/issue-50/",
    "https://wagtail.org/this-week-in-wagtail/issue-51/",
    "https://wagtail.org/this-week-in-wagtail/issue-52/",
    "https://wagtail.org/this-week-in-wagtail/issue-53/",
    "https://wagtail.org/this-week-in-wagtail/issue-54/",
    "https://wagtail.org/this-week-in-wagtail/issue-55/",
    "https://wagtail.org/this-week-in-wagtail/issue-56/",
    "https://wagtail.org/this-week-in-wagtail/issue-57/",
    "https://wagtail.org/this-week-in-wagtail/issue-58/",
    "https://wagtail.org/this-week-in-wagtail/issue-59/",
    "https://wagtail.org/this-week-in-wagtail/issue-6/",
    "https://wagtail.org/this-week-in-wagtail/issue-60/",
    "https://wagtail.org/this-week-in-wagtail/issue-61/",
    "https://wagtail.org/this-week-in-wagtail/issue-62/",
    "https://wagtail.org/this-week-in-wagtail/issue-63/",
    "https://wagtail.org/this-week-in-wagtail/issue-64/",
    "https://wagtail.org/this-week-in-wagtail/issue-65/",
    "https://wagtail.org/this-week-in-wagtail/issue-66/",
    "https://wagtail.org/this-week-in-wagtail/issue-67/",
    "https://wagtail.org/this-week-in-wagtail/issue-68/",
    "https://wagtail.org/this-week-in-wagtail/issue-69/",
    "https://wagtail.org/this-week-in-wagtail/issue-7/",
    "https://wagtail.org/this-week-in-wagtail/issue-70/",
    "https://wagtail.org/this-week-in-wagtail/issue-71/",
    "https://wagtail.org/this-week-in-wagtail/issue-72/",
    "https://wagtail.org/this-week-in-wagtail/issue-73/",
    "https://wagtail.org/this-week-in-wagtail/issue-74/",
    "https://wagtail.org/this-week-in-wagtail/issue-75/",
    "https://wagtail.org/this-week-in-wagtail/issue-76/",
    "https://wagtail.org/this-week-in-wagtail/issue-77/",
    "https://wagtail.org/this-week-in-wagtail/issue-78/",
    "https://wagtail.org/this-week-in-wagtail/issue-79/",
    "https://wagtail.org/this-week-in-wagtail/issue-8/",
    "https://wagtail.org/this-week-in-wagtail/issue-80/",
    "https://wagtail.org/this-week-in-wagtail/issue-81/",
    "https://wagtail.org/this-week-in-wagtail/issue-82/",
    "https://wagtail.org/this-week-in-wagtail/issue-83/",
    "https://wagtail.org/this-week-in-wagtail/issue-84/",
    "https://wagtail.org/this-week-in-wagtail/issue-85/",
    "https://wagtail.org/this-week-in-wagtail/issue-86/",
    "https://wagtail.org/this-week-in-wagtail/issue-87/",
    "https://wagtail.org/this-week-in-wagtail/issue-88/",
    "https://wagtail.org/this-week-in-wagtail/issue-89/",
    "https://wagtail.org/this-week-in-wagtail/issue-9/",
    "https://wagtail.org/this-week-in-wagtail/issue-90/",
    "https://wagtail.org/this-week-in-wagtail/issue-91/",
    "https://wagtail.org/this-week-in-wagtail/issue-92/",
    "https://wagtail.org/this-week-in-wagtail/issue-93/",
    "https://wagtail.org/this-week-in-wagtail/issue-94/",
    "https://wagtail.org/this-week-in-wagtail/issue-95/",
    "https://wagtail.org/this-week-in-wagtail/issue-96/",
    "https://wagtail.org/this-week-in-wagtail/issue-97/",
    "https://wagtail.org/this-week-in-wagtail/issue-98/",
    "https://wagtail.org/this-week-in-wagtail/issue-99/",
    "https://wagtail.org/wagtail-ai/",
    "https://wagtail.org/wagtail-localize/",
    "https://wagtail.org/wagtail-newsletter/",
    "https://wagtail.org/wagtail-space-2025/",
    "https://wagtail.org/wagtail-space-2025/about-wagtail-space-2025/",
    "https://wagtail.org/wagtail-space-2025/about-wagtail-space-2025/index.html/",
    "https://wagtail.org/wagtail-space-2025/code-of-conduct/",
    "https://wagtail.org/wagtail-space-2025/code-of-conduct/index.html/",
    "https://wagtail.org/wagtail-space-2025/faq/",
    "https://wagtail.org/wagtail-space-2025/faq/index.html/",
    "https://wagtail.org/wagtail-space-2025/index.html/",
    "https://wagtail.org/wagtail-space-2025/schedule/",
    "https://wagtail.org/wagtail-space-2025/schedule/index.html/",
    "https://wagtail.org/wagtail-space-2025/speakers/",
    "https://wagtail.org/wagtail-space-2025/speakers/index.html/",
    "https://wagtail.org/wagtail-space-2025/speaking/",
    "https://wagtail.org/wagtail-space-2025/speaking/index.html/",
    "https://wagtail.org/wagtail-space-2025/sponsors/",
    "https://wagtail.org/wagtail-space-2025/sponsors/index.html/",
    "https://wagtail.org/wagtail-space-2025/sponsorship-opportunities/",
    "https://wagtail.org/wagtail-space-2025/sponsorship-opportunities/index.html/",
    "https://wagtail.org/wagtail-space-2025/terms-and-conditions/",
    "https://wagtail.org/wagtail-space-2025/terms-and-conditions/index.html/",
    "https://wagtail.org/wagtail-space-2026/",
    "https://wagtail.org/wagtail-space-2026/about-wagtail-space-2026/",
    "https://wagtail.org/wagtail-space-2026/code-of-conduct/",
    "https://wagtail.org/wagtail-space-2026/faq/",
    "https://wagtail.org/wagtail-space-2026/schedule/",
    "https://wagtail.org/wagtail-space-2026/speakers/",
    "https://wagtail.org/wagtail-space-2026/sponsors/",
    "https://wagtail.org/wagtail-space-2026/sponsorship-opportunities/",
    "https://wagtail.org/wagtail-space-2026/terms-and-conditions/",
    "https://wagtail.org/wagtail-vs-drupal/",
    "https://wagtail.org/wagtail-vs-wordpress/",
    "https://wagtail.org/who-uses-wagtail/",
    "package.json",
    "wagtailio/**/*.html",
    "wagtailio/core/blocks.py",
    "wagtailio/images/models.py",
    "wagtailio/newsletter/templates/newsletter/newsletter_index_page.html",
    "wagtailio/newsletter/templates/newsletter/newsletter_page.html",
    "wagtailio/project_styleguide/templates/patterns/components/filters/filters.html",
    "wagtailio/project_styleguide/templates/patterns/components/sign_up_form/base_form.html",
    "wagtailio/project_styleguide/templates/patterns/components/streamfields/comparison_table_block/comparison_table_block.html",
    "wagtailio/project_styleguide/templates/patterns/components/streamfields/features/*.html",
    "wagtailio/project_styleguide/templates/patterns/includes/*.html",
    "wagtailio/project_styleguide/templates/patterns/includes/cookie_message.html",
    "wagtailio/project_styleguide/templates/patterns/includes/menu_get_started.html",
    "wagtailio/project_styleguide/templates/patterns/includes/search-form.html",
    "wagtailio/project_styleguide/templates/patterns/includes/search-modal.html",
    "wagtailio/project_styleguide/templates/patterns/pages/blog/blog_index_page.html",
    "wagtailio/project_styleguide/templates/patterns/pages/home/home_page.html",
    "wagtailio/project_styleguide/templates/patterns/pages/search_results/search_results.html",
    "wagtailio/project_styleguide/templates/patterns/pages/showcase_page/showcase_page.html",
    "wagtailio/project_styleguide/templates/patterns/pages/space_schedule_page/space_schedule_page.html:14",
    "wagtailio/static/js/components/*.js",
    "wagtailio/static/js/components/cookie-message.js",
    "wagtailio/static/js/components/copy-code-snippet.js",
    "wagtailio/static/js/components/feature-index.js",
    "wagtailio/static/js/components/filter-form.js",
    "wagtailio/static/js/components/get-started-menu.js",
    "wagtailio/static/js/components/mobile-menu.js",
    "wagtailio/static/js/components/site-search-desktop.js",
    "wagtailio/static/js/components/site-wide-alert.js",
    "wagtailio/static/sass/abstracts/_variables.scss",
    "wagtailio/static/sass/base/_typography.scss",
    "wagtailio/static/sass/components/_code-snippet.scss",
    "wagtailio/static/sass/components/_comparison-table.scss",
    "wagtailio/static/sass/components/_cookie-message.scss",
    "wagtailio/static/sass/components/_grid.scss",
    "wagtailio/static/sass/components/_milestone-item.scss",
    "wagtailio/static/sass/components/_milestones.scss",
    "wagtailio/static/sass/components/_modal.scss",
    "wagtailio/static/sass/components/_overview.scss",
    "wagtailio/static/sass/components/_sign-up-form.scss",
    "wagtailio/static/sass/components/_sub-nav.scss",
    "wagtailio/static/sass/layout/_space-logo.scss",
    "wagtailio/static/sass/vendor/_code-highlighting.scss",
    "wagtailio/wagtailspace/templates/wagtailspace/wagtail-space-2025/schedule/index.html:434"
  ],
  "findings": [
    {
      "rule": "color-contrast",
      "wcag": "1.4.3 AA",
      "severity": "serious",
      "location": "https://wagtail.org/blog/wagtail-10b2/ .codehilite .nv",
      "summary": "Syntax-highlighted variables have insufficient text contrast against the code background.",
      "fix": "Update syntax token colors in wagtailio/static/sass/vendor/_code-highlighting.scss (including .nv at line 58 and .vc/.vg/.vi at lines 77–79) to reach 4.5:1 against their actual light and dark code backgrounds; verify all token classes.",
      "evidence": "Rendered .nv text “wagtail”: #bb60d5 on #f5f5f5, 3.35:1, normal 17px. Screenshot: screenshots/audit-2026-10-16/syntax-code-contrast.png. Source: wagtailio/static/sass/vendor/_code-highlighting.scss:58.",
      "component": "Syntax-highlighted code blocks",
      "foundBy": [
        "contrast-master"
      ]
    },
    {
      "rule": "frame-title",
      "wcag": "4.1.2 A",
      "severity": "serious",
      "confidence": "high",
      "location": "https://wagtail.org/blog/why-pay-for-open-source/ iframe",
      "summary": "Embedded media frames lack accessible names on multiple blog pages.",
      "fix": "Give every embedded iframe a concise title naming its content, for example title=\"Why pay for open source? — video\". Review stored Wagtail embed HTML and the embed/video StreamField rendering; refresh cached embeds where necessary. Keep each title specific to its content.",
      "evidence": "axe-core found 19 unnamed frames across 16 pages. The representative YouTube iframe has no title, aria-label or aria-labelledby. All URLs, selectors and screenshots are indexed in .a11y-history/2026-10-16/evidence/axe-instances.csv.",
      "component": "Embedded media",
      "foundBy": [
        "axe-runtime-scan"
      ]
    },
    {
      "rule": "HTML-LANG-001",
      "wcag": "3.1.1 A",
      "severity": "serious",
      "location": "wagtailio/newsletter/templates/newsletter/newsletter_page.html:3",
      "summary": "Archived newsletter pages do not declare their primary language, preventing reliable screen-reader pronunciation.",
      "fix": "Add lang=\"en\" to the standalone newsletter template's html element (and xml:lang=\"en\" if retaining XHTML serialization). Verify archived issues and email output after rendering.",
      "evidence": "Live /this-week-in-wagtail/issue-1/ renders <html xmlns=\"http://www.w3.org/1999/xhtml\"> without lang. Rendered axe scans confirm the omission on all 136 distinct newsletter issue pages; earlier source inventory counted 138 URL variants.",
      "component": "Archived newsletter template",
      "foundBy": [
        "alt-text-headings"
      ]
    },
    {
      "rule": "KEYBOARD-001",
      "wcag": "2.1.1 A",
      "severity": "serious",
      "location": "wagtailio/static/js/components/mobile-menu.js:38",
      "summary": "The mobile navigation toggle cannot be activated with Enter or Space.",
      "fix": "Handle the native button's click event instead of pointerup so pointer, keyboard, and assistive-technology activation all toggle the menu. Verify Enter and Space open and close the menu at mobile widths.",
      "evidence": "Verified live homepage at 390×844: focus [data-mobile-menu-toggle], press Enter and Space; aria-expanded remains false. Pointer click changes it to true. Source registers only pointerup. Screenshot: screenshots/audit-2026-10-16/keyboard-mobile-menu-enter-fails.png.",
      "component": "Shared mobile navigation",
      "foundBy": [
        "keyboard-navigator"
      ]
    },
    {
      "rule": "KEYBOARD-002",
      "wcag": "2.4.11 AA",
      "severity": "serious",
      "location": "wagtailio/static/js/components/mobile-sub-menu.js:47",
      "summary": "Mobile submenu panels completely obscure focused parent-navigation controls that remain in the tab sequence.",
      "fix": "Move focus into an opened submenu and exclude the covered parent controls from sequential focus while it is open. Restore focus to the submenu trigger on Back. Ensure Tab and Shift+Tab cannot focus controls behind the panel.",
      "evidence": "Live 390×844 homepage: open mobile menu with pointer, activate Project, then Tab 11 times. Focus reaches Explore at x20,y141,w350,h18 behind the Project panel; Developers, Community, Support and Get started follow while covered. Repeated after cookie dismissal. Screenshot: screenshots/audit-2026-10-16/keyboard-mobile-tab-behind-submenu.png.",
      "component": "Shared mobile submenu",
      "foundBy": [
        "keyboard-navigator"
      ]
    },
    {
      "rule": "link-in-text-block",
      "wcag": "1.4.1 A",
      "severity": "serious",
      "location": "https://wagtail.org/packages/ .overview__description-link",
      "summary": "Inline package-directory links rely on a low-contrast color difference to distinguish them from surrounding text.",
      "fix": "Restore a persistent underline to .overview__description-link in wagtailio/static/sass/components/_overview.scss:54–61; retain clear hover and keyboard focus indicators. Apply the change to every package category description.",
      "evidence": "Runtime: link #262626, surrounding text #5c5c5c, contrast 2.26:1; both font-weight 400; text-decoration:none; no pseudo-element cues. Screenshot: screenshots/audit-2026-10-16/packages-link-distinction.png.",
      "component": "Package directory overview descriptions",
      "foundBy": [
        "link-checker"
      ]
    },
    {
      "rule": "link-name",
      "wcag": "2.4.4 A",
      "severity": "serious",
      "location": "https://wagtail.org/this-week-in-wagtail/?page=7 .blog-post--small; https://wagtail.org/this-week-in-wagtail/?page=11 .blog-post--small",
      "summary": "Three newsletter listing cards expose focusable links with no accessible name.",
      "fix": "Review card rendering in wagtailio/newsletter/templates/newsletter/newsletter_index_page.html:56 and the affected newsletter content; ensure each resulting anchor contains the issue title. Avoid nested links in card content and provide a reliable title fallback. Verify issues 106, 105 and 83 in the rendered DOM.",
      "evidence": "Browser axe confirms empty .blog-post.blog-post--small anchors to issues 106 and 105 on page=7 and issue 83 on page=11. Raw: 02f3fcf6749b5d84.json and f6af1208408930a7.json; corresponding screenshot basenames 02f3fcf6749b5d84.jpg and f6af1208408930a7.jpg.",
      "component": "Newsletter index cards",
      "foundBy": [
        "link-checker"
      ]
    },
    {
      "rule": "link-name",
      "wcag": "2.4.4 A",
      "severity": "serious",
      "confidence": "high",
      "location": "https://wagtail.org/this-week-in-wagtail/issue-3/ p:nth-child(10) > a",
      "summary": "Empty links in two archived newsletter issues have no accessible name.",
      "fix": "Remove the unintended empty anchors from issues 3 and 6. If any link is intended to remain, supply meaningful visible link text describing the destination and verify its focus appearance. Do not retain invisible links solely by adding an aria-label.",
      "evidence": "4 empty href-bearing anchors on 2 pages: two in issue 3 and two in issue 6. Captured markup has no text, images, title or ARIA name. See axe-instances.csv for selectors and screenshots.",
      "component": "Archived newsletter editorial HTML",
      "foundBy": [
        "axe-runtime-scan"
      ]
    },
    {
      "rule": "SHADOW-FAVORITE-NAME-001",
      "wcag": "4.1.2 A",
      "severity": "serious",
      "location": "https://wagtail.org/wagtail-space-2026/schedule/ — pretalx-schedule shadow root button.btn-fav-container",
      "summary": "Schedule favorite buttons have no accessible name or exposed selected state.",
      "fix": "In the pretalx widget renderer, give each favorite button a name including its session title and expose toggle state with aria-pressed, or update its action name between Add and Remove favorite. Hide the star SVG from assistive technology. Provide an accessible schedule alternative while awaiting an upstream fix.",
      "evidence": "Settled widgets contain 28 unnamed favorite buttons in 2026 and 31 in 2025. Chromium snapshot exposes only button > img. Space activates the first star and changes its SVG class, but no name or pressed state is exposed.",
      "component": "External pretalx schedule widget",
      "foundBy": [
        "web-component-specialist"
      ]
    },
    {
      "rule": "ALT-CONTENT-001",
      "wcag": "1.1.1 A",
      "severity": "moderate",
      "location": "https://wagtail.org/blog/getting-started-wagtail-newcomers-perspective/",
      "summary": "Some published images expose filenames or timestamps instead of meaningful text alternatives.",
      "fix": "Replace the screenshot alt with a description of the Wagtail editor showing image, caption, attribution and rich-text blocks. Review filename-like alternatives across the image library. For decorative author portraits with adjacent names, render alt=\"\"; for informative images use contextual descriptions.",
      "evidence": "The main image has alt=\"Screenshot 2022-08-15 at 11.27.22\" but visually shows Wagtail editing controls. Other examples include alt=\"avatar square 2017 960.jpg\" on /blog/wordpress-to-wagtail-migration-kit/ and \"wagtail-developer-training-image\" on /services/.",
      "component": "CMS image content; blog_page.html:38; authors/authors.html:8",
      "foundBy": [
        "alt-text-headings"
      ]
    },
    {
      "rule": "ARIA-DIALOG-NAME-001",
      "wcag": "4.1.2 A",
      "severity": "moderate",
      "location": "wagtailio/project_styleguide/templates/patterns/includes/search-modal.html:3",
      "summary": "The open desktop search dialog has no accessible name, so its purpose is not announced when users enter it.",
      "fix": "Give the role=dialog container an accessible name: add a Search heading with a unique id and reference it with aria-labelledby, or add aria-label=\"Search\". Keep the existing input and close-button labels, and verify the opened dialog in the accessibility tree.",
      "evidence": "Live homepage: activate [data-site-search-desktop]. Chromium snapshot begins \"- dialog:\" with no name; markup is <div class=\"modal__container\" role=\"dialog\" aria-modal=\"true\">. Targeted axe reports aria-dialog-name. Screenshot: screenshots/audit-2026-10-16/aria-unnamed-search-dialog.png.",
      "component": "Shared desktop search dialog",
      "foundBy": [
        "aria-specialist"
      ]
    },
    {
      "rule": "KEYBOARD-003",
      "wcag": "2.4.11 AA",
      "severity": "moderate",
      "location": "https://wagtail.org/ — .cookie.active and [data-mobile-menu] a[href='/core-team/']",
      "summary": "The cookie banner completely covers a focused mobile submenu link.",
      "fix": "Coordinate cookie-banner and mobile-menu layout so focused links remain visible. Reserve space for the banner or place the open navigation above it, and verify first-visit keyboard navigation before cookie dismissal. Review _cookie-message.scss and mobile-menu.js together.",
      "evidence": "Fresh session at 390×844: open mobile menu, activate Project and Tab nine times to Core team. Focus rectangle x21,y641,w348,h45 is fully covered by the cookie rectangle x10,y640.44,w390,h203.56. Screenshot: screenshots/audit-2026-10-16/keyboard-cookie-covers-menu-link.png.",
      "component": "Cookie notice and mobile navigation interaction",
      "foundBy": [
        "keyboard-navigator"
      ]
    },
    {
      "rule": "KEYBOARD-004",
      "wcag": "3.2.2 A",
      "severity": "moderate",
      "location": "wagtailio/static/js/components/filter-form.js:18",
      "summary": "Changing a blog category checkbox immediately navigates to another page without advance warning.",
      "fix": "Expose an Apply filters submit button with JavaScript enabled and submit only on explicit activation, or update results in place while preserving focus and announcing the update. The existing submit button is restricted to noscript in blog_index_page.html:12.",
      "evidence": "Live /blog/: focus #category-accessibility and press Space. Browser immediately navigates to /blog/?category=44 and activeElement becomes BODY. The form says only 'Filter posts by category'; no warning describes navigation. Source calls this.node.submit() on change.",
      "component": "Blog category filters",
      "foundBy": [
        "keyboard-navigator"
      ]
    },
    {
      "rule": "PDF-TAGS-001",
      "wcag": "1.3.1 A",
      "severity": "moderate",
      "location": ".a11y-history/2026-10-16/documents/Wagtail_Product_Strategy_2026_v1.0.pdf — page 1, version/date header",
      "summary": "The meaningful version and publication date are omitted from the PDF's tagged reading structure.",
      "fix": "In Acrobat Pro, open Accessibility Tags and Reading Order, select 'Version 1.0, June 2026', and tag it as a paragraph before the title. Verify it appears in the tag reading order. Preserve this information in the source document's main content before future exports.",
      "evidence": "Page 1 visibly says 'Version 1.0, June 2026'. Content-stream inspection decodes this text outside every marked-content sequence; the tag tree starts with the title. Evidence: product-strategy-structure.json; screenshot: screenshots/audit-2026-10-16/product-strategy-page-01.png.",
      "component": "Product strategy PDF",
      "foundBy": [
        "pdf-accessibility"
      ]
    },
    {
      "rule": "PDFUA-LIST-001",
      "wcag": "n/a",
      "severity": "moderate",
      "location": ".a11y-history/2026-10-16/documents/Wagtail_Product_Strategy_2026_v1.0.pdf — lists on pages 3–10",
      "summary": "PDF/UA technical check: list item labels and bodies are not represented with the expected Lbl and LBody structure.",
      "fix": "In Acrobat Pro's Accessibility Tags panel, organize each list item as LI containing Lbl for its number or bullet and LBody for its content; preserve continuation content across pages. Then validate with veraPDF and test list navigation in a screen reader. Repair the source export process for future editions.",
      "evidence": "Structure traversal finds 10 L elements and 37 LI elements, but zero Lbl and only one LBody. For example, page 3's first LI directly references MCID 4 instead of containing label/body elements. PDF/UA technical issue; no separate WCAG failure or screen-reader omission is inferred.",
      "component": "Product strategy PDF",
      "foundBy": [
        "pdf-accessibility"
      ]
    },
    {
      "rule": "SHADOW-AVATAR-ALT-001",
      "wcag": "1.1.1 A",
      "severity": "moderate",
      "location": "https://wagtail.org/wagtail-space-2026/schedule/ — pretalx-schedule shadow root .avatars img",
      "summary": "Speaker portrait images in embedded schedules lack alt attributes, creating unnamed graphics among session details.",
      "fix": "Render these portraits with alt=\"\" when the adjacent speaker name already identifies the person. Supply meaningful alt only when the portrait conveys additional information. Apply the fix inside the widget renderer or provide an accessible schedule alternative.",
      "evidence": "26 missing-alt portrait images in the 2026 schedule and 29 in 2025 remain after loading. Example: <img src=\"https://pretalx.com/media/avatars/NWSRRS_mfIrUuC_thumbnail_tiny.webp\"> beside Thibaud Colas. Snapshot exposes img despite the adjacent name.",
      "component": "External pretalx schedule widget",
      "foundBy": [
        "web-component-specialist"
      ]
    },
    {
      "rule": "SHADOW-TAB-RELATION-001",
      "wcag": "4.1.2 A",
      "severity": "moderate",
      "location": "https://wagtail.org/wagtail-space-2026/schedule/ — pretalx-schedule shadow root [role=tab]",
      "summary": "Schedule date tabs reference nonexistent panels, while the exposed tabpanel is empty.",
      "fix": "If these controls navigate to dates in one continuous schedule, use labelled anchor links to actual day sections instead of tab roles. Otherwise implement real labelled tabpanels in the same shadow root and connect each tab to its panel with valid IDs and consistent selection states.",
      "evidence": "All three aria-controls date IDs are absent from the shadow root on both schedules. The only role=tabpanel is an empty <div class=\"bunt-tabs-body\" role=\"tabpanel\" tabindex=\"0\"></div>; sessions appear outside it.",
      "component": "External pretalx schedule widget",
      "foundBy": [
        "web-component-specialist"
      ]
    },
    {
      "rule": "SHADOW-TIMEZONE-LABEL-001",
      "wcag": "4.1.2 A",
      "severity": "moderate",
      "location": "https://wagtail.org/wagtail-space-2025/schedule/ — pretalx-schedule shadow root input[name=timezone]",
      "summary": "The 2025 schedule timezone field has no accessible name.",
      "fix": "Add a visible Time zone label with a matching input id inside the same shadow root, or provide aria-label=\"Time zone\". Keep the current timezone value separate from the field name and verify selection semantics.",
      "evidence": "Settled snapshot exposes textbox: UTC without a name. Markup is <input type=\"text\" name=\"timezone\" autocomplete=\"off\">; adjacent <label for=\"timezone\"></label> is empty and the input has no id.",
      "component": "External pretalx schedule widget",
      "foundBy": [
        "web-component-specialist"
      ]
    },
    {
      "rule": "PDFUA-LANG-001",
      "wcag": "n/a",
      "severity": "minor",
      "location": ".a11y-history/2026-10-16/documents/Wagtail_Product_Strategy_2026_v1.0.pdf — document catalog /Lang",
      "summary": "PDF technical check: the document language uses an underscore instead of a valid hyphenated language tag.",
      "fix": "In Acrobat Pro, open Document Properties > Advanced > Reading Options and set Language to English (United Kingdom); verify the saved catalog uses en-GB. Confirm pronunciation with a screen reader and validate the language entry with veraPDF.",
      "evidence": "The catalog contains /Lang (en_GB); RFC language-tag syntax uses hyphens, so the expected value is en-GB. No structure element supplies an alternate language. Reader-specific speech consequences were not tested, so this is recorded as a technical issue rather than a confirmed WCAG 3.1.1 failure.",
      "component": "Product strategy PDF",
      "foundBy": [
        "pdf-accessibility"
      ]
    }
  ],
  "passed": [
    "A meaningful document title is set and ViewerPreferences DisplayDocTitle is true.",
    "After pointer-assisted opening, Escape closes mobile navigation and restores focus to its trigger.",
    "All 11 pages contain selectable, extractable text; this is not an image-only PDF.",
    "All 753 captured HTML files were checked for img elements without an alt attribute; none found. This presence check does not establish appropriate alternative text.",
    "All four fonts are embedded and have Unicode mappings; Poppler and PyMuPDF extract readable prose.",
    "Blog category checkboxes use associated labels and a fieldset with legend.",
    "Both comparison pages use native table, thead, tbody, tr and td elements, with two scoped column headers and ten scoped row headers each. The empty top-left corner is a td, not an empty heading.",
    "Comparison data retains its row and column relationships at a 390px viewport; it scrolls in a separate horizontal container rather than replacing native table semantics.",
    "Contact page has no separate contact form; only shared search and newsletter controls were present.",
    "Cookie preference buttons dismiss the notice; no visible success/error status message exists whose semantics are missing.",
    "Desktop navigation disclosure buttons open with Enter and their links are reachable with Tab; Escape closes the open submenu.",
    "Desktop search opens with keyboard activation, places focus in its input, cycles focus within the dialog, and returns focus to its trigger on Escape.",
    "Desktop search: Enter opens the overlay, focus enters the search input, eight consecutive Tab presses remain within it, Escape closes and restores trigger focus, and the visible close button also restores trigger focus.",
    "Empty and malformed newsletter input invoke native validation, focus the invalid email input, and present actionable validation text. No subscription was submitted.",
    "Every page sets Tabs to S, using structure order for annotation navigation.",
    "Existing evidence covers deployed Chromium keyboard behavior, accessibility-tree checks, automated scans, representative visual states, and structural/rendered review of all 11 strategy PDF pages.",
    "Favorite controls respond to Space; their missing names/state are distinct from keyboard activation.",
    "Feature-index filtering uses labelled native checkboxes and updates their checked states. The Accessibility selection displays its group; no separate visible result-count, progress or completion message was found that lacks status semantics.",
    "Feature-index filters are labelled native checkboxes. Pressing Space on Accessibility selects it, clears All, and displays only the accessibility group.",
    "Fifteen hierarchical bookmarks match the document's headings and destinations.",
    "Full captured-HTML inventory identified 138 same-origin pages containing 1,770 table elements: two comparison tables and 1,768 nested layout tables across 136 newsletter issues. No data tables were found on the captured same-origin blog pages.",
    "Get started opens with keyboard activation, cycles focus within the dialog, and restores trigger focus on Escape.",
    "Get started: Enter opens the overlay, focus enters its first action link, eight consecutive Tab presses remain within it, Escape closes and restores trigger focus, and the close button also restores trigger focus.",
    "Get-started dialog source supplies aria-labelledby to its visible configured heading; the published heading exists.",
    "Homepage copy success was exercised with Enter. Clipboard contained pip install wagtail, and the visible confirmation appeared in Chromium accessibility snapshot as alert: Copied!, without moving focus from the copy button.",
    "Homepage promotional video does not autoplay and exposes native controls.",
    "Live keyboard testing on both comparison pages: Tab from the preceding link focuses the scroll container; seven ArrowRight presses move scrollLeft from 0 to 280px. Modern Chromium's native scroll-container focus behavior makes these tables operable despite absent tabindex.",
    "Live newsletter email fields have accessible names, type=email, required and autocomplete=email.",
    "Main navigation and footer navigation have distinguishing labels; previous/next blog navigation also has an explicit label.",
    "Mobile footer disclosure updates aria-expanded from false to true and its label from Open the Project menu to Close the Project menu; aria-controls resolves to project-menu.",
    "Mobile navigation opened by pointer can be dismissed with Escape, returning focus to its trigger.",
    "Mobile search updates aria-expanded from false to true and its label to Close the search; aria-controls resolves to mobile-search-form.",
    "Newsletter tables are layout structures, not data tables. They contain no misleading th or caption markup, and Chromium's accessibility tree classifies them as LayoutTable rather than data table.",
    "No figures, images, tables, form fields, encryption, or JavaScript were found; figure alternatives, table headers and form labeling are not applicable.",
    "No sorting, row selection, editable data grids or table pagination were found in the same-origin table implementations reviewed.",
    "Opened search dialog has correctly named close and submit buttons and a labelled search input; targeted axe found no button-name or label violations within it.",
    "Opened-state axe checks with WCAG 2 A/AA, 2.1 A/AA and 2.2 AA tags found no additional violations in search, Get started or mobile navigation states. Explicit aria-dialog-name check found the already reported unnamed search dialog only.",
    "Product strategy PDF link is labeled “as a PDF” within a paragraph identifying the strategy and linking its Markdown version, providing adequate link purpose in context.",
    "Rendered all pages and visually reviewed the complete document; its single-column sequence, headings, lists and page continuations are coherent.",
    "Repeated newsletter “here” links identify the RFC process in the same paragraph; not counted as 2.4.4 failures.",
    "Representative main-site pages declare lang=en and meaningful page titles; their shared base template supplies a single main landmark.",
    "Reviewed comparison-table template uses th scope=col and th scope=row for relationships.",
    "Reviewed interactive source uses native buttons and inputs for the tested menu, search, copying and filter controls.",
    "Reviewed the completed specialist findings and their verification limits without rerunning tests or adding speculative defects.",
    "Sampled generic blog links identify their target in the containing paragraph; their wording alone does not establish a WCAG A failure.",
    "Schedule data settled and rendered session titles, speaker names and session links on both 2025 and 2026 pages. These findings are not loading placeholders.",
    "Search controls have associated labels, native search inputs, and explicitly activated submit buttons.",
    "Session links have descriptive text, and the Filter button has an accessible name.",
    "Shared menu source updates disclosure aria-expanded states when opening and closing. Keyboard-specific failures are reported separately by keyboard-navigator.",
    "Showcase filter has an accessible name, native select options, a visible CSS-generated Sector label, and a Filter submit button. Selecting an option leaves the page unchanged until Filter is activated; submitted GET retains the selected value.",
    "Showcase uses a labelled native select and explicit Filter submit button with full document navigation; its results are not an in-place status-message update.",
    "Source review: rocket hover/focus animation is disabled under prefers-reduced-motion; blog scroll animation is gated on no-preference.",
    "Ten representative pages checked at 320 CSS pixels: no confirmed reflow failures; comparison table remains in its own horizontal scroll region.",
    "Ten representative pages had no axe color-contrast violations in either light or dark mode after waiting for theme transitions to settle. The older code example was separately verified as a failure.",
    "Text colors measured against the white background pass AA: #484848 is 9.15:1; #1155CC links are 6.57:1 and also underlined.",
    "The Get started dialog has role=dialog, aria-modal=true and a valid aria-labelledby referencing its visible heading.",
    "The deployed /sitewide_alert/ endpoint returned an empty JSON object during this review, and no fetched banner was inserted.",
    "The document has StructTreeRoot, MarkInfo Marked=true and semantic paragraph, heading, list and link tags.",
    "The five link annotations are represented by five Link tags with descriptive text: WCAG, ATAG, Web Sustainability Guidelines, Zen of Wagtail, and OWASP Top 10.",
    "The homepage copy button responds to Enter and copies 'pip install wagtail' to the clipboard.",
    "The homepage skip link is the first tab stop, becomes visible on focus, and Enter followed by Tab reaches the main-content copy button in Chromium.",
    "Verified the existing CI runs lint, production build, Django system checks, migration checks and Django tests; package.json has no browser accessibility test command.",
    "Visually inspected the image-check success-rate chart in /blog/leaner-images-lower-footprint-at-scale/; the nearby text supplies its three numerical comparisons (31–38%, 87–92%, 48–65%).",
    "WCAG text-spacing overrides applied at 1280px and 320px on ten representative pages: no confirmed text loss; raw overflow candidates include decorative graphics and screen-reader-only text."
  ],
  "notes": [
    {
      "skill": "alt-text-headings",
      "note": "Source review was read-only; CMS values were reviewed against captured live HTML. Local source and deployed content can differ."
    },
    {
      "skill": "alt-text-headings",
      "note": "Heading-level skips on /features/ and search results are recommendations for clearer outlines, not automatically WCAG failures. card_block.html:4 hardcodes h4 under h2 sections; search_results.html:56 uses h3 without a results h2. Core-team content also marks one peer (Vince Salvino) as h3 among h2 peers; correct the editorial outline."
    },
    {
      "skill": "alt-text-headings",
      "note": "Homepage video requires an audio review before a conformance determination: its 37.94-second MP4 contains audio and informative UI demonstrations (writing experience, block splitting, dark mode). Live markup and home_page.html:54–59 provide only 'Promotional homepage video', with no caption track or transcript link. Frames were inspected, but audio could not be listened to with available tools; do not treat this as a confirmed 1.2.2 or 1.2.5 failure yet."
    },
    {
      "skill": "alt-text-headings",
      "note": "Video templates video_block.html and space_video_block.html likewise have no caption-track fields/rendering. Add a supported caption/transcript workflow for informative uploads, then review actual audio and visual content for each asset."
    },
    {
      "skill": "alt-text-headings",
      "note": "Newsletter tables are presentational layouts without role=presentation, and newsletter archives lack main/h1 structure; these are improvement recommendations, not scored failures without evidence of an incorrect reading order or relationship."
    },
    {
      "skill": "alt-text-headings",
      "note": "Evidence images are saved under .a11y-history/2026-10-16/evidence/structure-*.png. Native assistive-technology reading and every image's visual equivalence were not tested."
    },
    {
      "skill": "alt-text-headings",
      "note": "The image-alt presence pass covers serialized server HTML only. The JavaScript-rendered pretalx shadow-root portraits are separately confirmed failures in web-component-specialist.json."
    },
    {
      "skill": "aria-specialist",
      "note": "Feature-index advisory: feature_block.html:6 sets aria-controls from lowercased heading text on passive content divs. For example \"dark mode-feature\" refers to nonexistent tokens dark and mode-feature. Remove the attribute: this content does not control another element. Runtime found 42 such passive containers; the captured axe run flags 39 visible nodes as critical. No lost operation or necessary relationship was demonstrated, so do not classify these as critical WCAG failures or include them in confirmed-failure counts."
    },
    {
      "skill": "aria-specialist",
      "note": "The ARIA specification defines aria-controls as identifying elements whose contents or presence are controlled by the current element: https://www.w3.org/TR/wai-aria-1.2/#aria-controls. The native feature-filter checkboxes perform the actual filtering."
    },
    {
      "skill": "aria-specialist",
      "note": "The mobile navigation trigger uses aria-haspopup=true although its popup is ordinary navigation rather than an ARIA menu. Remove that attribute for a disclosure pattern; retain aria-expanded. This semantics improvement is not separately scored here."
    },
    {
      "skill": "aria-specialist",
      "note": "Get-started dialog labelling is conditional on an optional heading in menu_get_started.html:7. Keep a default accessible name if editors can remove that heading; this is a source risk rather than a confirmed deployed failure."
    },
    {
      "skill": "aria-specialist",
      "note": "Search-dialog naming guidance: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/. Severity is moderate after review because the dialog loses context, but its labelled input and controls remain usable."
    },
    {
      "skill": "aria-specialist",
      "note": "Runtime evidence: .a11y-history/2026-10-16/evidence/aria-runtime.json. Tests used isolated headless Chromium at 1440×1000 and 390×844; no source was changed."
    },
    {
      "skill": "aria-specialist",
      "note": "Live-region behavior, native screen-reader announcements and every third-party embedded widget were not exhaustively tested."
    },
    {
      "skill": "audit-context",
      "note": "Coverage: sitemap plus recursive same-host links discovered 755 URLs. Rendered axe scans completed for 735 same-site URL requests, covering 708 distinct HTTP-200 HTML destinations and 14 distinct HTTP-404 destinations. 192 successful pages triggered at least one raw axe rule; this includes reviewed technical warnings and is not a count of confirmed WCAG-failing pages."
    },
    {
      "skill": "audit-context",
      "note": "Full crawl means every discovered same-host HTML URL was fetched and scanned, including reachable pagination/filter URLs. It does not mean every content image, media alternative, dynamic state, theme, viewport or screen-reader combination received manual review. Manual interaction/visual reviews sampled representative shared components and templates; source review covered the Django/Wagtail templates, JavaScript components and Sass."
    },
    {
      "skill": "audit-context",
      "note": "Boundary: external redirect destinations were inventoried but excluded from wagtail.org finding totals; public /admin paths and assets were not crawled as pages. The specifically requested product strategy PDF was audited across all 11 pages. Other linked PDFs and external documentation sites were not included in the document audit."
    },
    {
      "skill": "audit-context",
      "note": "Source baseline: git commit 9fa65385f27c15b83c86a4f6e0e3ac18d4784609 (2026-10-14). No previous audit or scan configuration was found. Local source can differ from deployed code; findings distinguish deployed evidence from source-only recommendations. No application code or PDFs were changed."
    },
    {
      "skill": "audit-context",
      "note": "Scoring interpretation: the bundled renderer score and Pass/Fail label summarize finding severity and passed-check counts. They are not a WCAG conformance percentage or certification. A moderate WCAG failure still prevents a conformance claim. PDF/UA technical findings marked n/a are not presented as confirmed WCAG failures."
    },
    {
      "skill": "audit-context",
      "note": "Evidence index: .a11y-history/2026-10-16/evidence/page-coverage.csv lists every browser scan; axe-instances.csv lists every raw violation with selector and screenshot; axe-needs-review.csv lists incomplete checks; crawl.json lists discovery, redirects and HTTP statuses. Specialist JSON includes reproduction evidence, fixes, limitations and source locations."
    },
    {
      "skill": "audit-context",
      "note": "Priorities: repair shared mobile navigation and obscured focus, then named dialogs/embedded controls; fix the shared newsletter language and code colors; correct CMS link/image content. For the strategy PDF, tag the version/date and address the separately identified PDF/UA structure/language issues before validation. Verify fixes in a pull request and re-scan after deployment."
    },
    {
      "skill": "audit-context",
      "note": "Product strategy PDF snapshot SHA-256: fac3a3d67c7faa858b8250b7804a7c059f53557e0b46cb83a133f5633919e3c1. Downloaded directly from the public media.wagtail.org link during this audit."
    },
    {
      "skill": "axe-runtime-scan",
      "note": "Full rendered-page scan used axe-core 4.14.0, Playwright 1.64.1 and Chromium 152.0.7977.82; tags wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa. Initial desktop viewport 1440×1000, reduced motion enabled, public fresh browser contexts. Analytics/tracking requests were blocked. Native embeds were allowed."
    },
    {
      "skill": "axe-runtime-scan",
      "note": "Automated findings covered by source specialists are counted once: newsletter language, syntax highlighting contrast, package-directory link styling, newsletter index cards and schedule widget defects. Raw node-level results retain every occurrence; the report counts shared causes rather than every affected DOM node."
    },
    {
      "skill": "axe-runtime-scan",
      "note": "All 39 invalid aria-controls references on passive feature-index containers are retained in raw results as technical warnings, but excluded from scored WCAG findings after specialist review. Remove these unnecessary attributes; no essential relationship or operation was demonstrated to fail."
    },
    {
      "skill": "axe-runtime-scan",
      "note": "The Cloudflare-generated /cdn-cgi/l/email-protection error response has a link-in-text-block warning. This edge-generated diagnostic is recorded in raw evidence as a vendor/error-page concern, separately from the package-directory fix."
    },
    {
      "skill": "axe-runtime-scan",
      "note": "Every URL with an automated violation has a full-page screenshot indexed in evidence/axe-instances.csv and evidence/page-coverage.csv. Additional state-specific screenshots and PDF renders are under screenshots/audit-2026-10-16/."
    },
    {
      "skill": "axe-runtime-scan",
      "note": "Automated incomplete checks, principally contrast obscured or indeterminate in the tested state, remain review items in evidence/axe-needs-review.csv. They are neither confirmed failures nor passes. Frame names were checked; full cross-origin embedded-player interaction and media alternatives were not exhaustively audited."
    },
    {
      "skill": "axe-runtime-scan",
      "note": "axe rule documentation: https://dequeuniversity.com/rules/axe/4.14/frame-title and https://dequeuniversity.com/rules/axe/4.14/link-name. Normative target: https://www.w3.org/TR/WCAG22/."
    },
    {
      "skill": "contrast-master",
      "note": "Manual visual and state checks are representative samples, not an assertion that all crawled pages pass every visual criterion. Browser: isolated Chromium via Playwright."
    },
    {
      "skill": "contrast-master",
      "note": "Advisory: at 200% text-only resizing (root font 20px to 40px, 1280px viewport), roadmap five-column cards clip long headings and labels; screenshot screenshots/audit-2026-10-16/roadmap-200-percent-text.png. Use auto-fitting columns and wrapping labels. This is not counted as an AA failure because WCAG 1.4.4 permits any one supported resizing mechanism and narrow layout/full-page zoom is available. Reference: https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html."
    },
    {
      "skill": "contrast-master",
      "note": "Brief modal animations lack reduced-motion overrides, an optional motion improvement; interaction animation is not automatically a WCAG AA failure."
    },
    {
      "skill": "contrast-master",
      "note": "Discarded transient contrast results taken while theme color transitions were active; stable rescans after 600ms were clean on the ten-page sample."
    },
    {
      "skill": "contrast-master",
      "note": "Full-site runtime corroboration: color-contrast failures affect 515 syntax-token nodes across 36 distinct blog pages. Exact selectors, measured ratios and screenshots are listed in evidence/axe-instances.csv. This shared stylesheet cause is counted once."
    },
    {
      "skill": "forms-specialist",
      "note": "Blog filter auto-submission/context change is already reported by keyboard specialist; not duplicated here."
    },
    {
      "skill": "forms-specialist",
      "note": "Legacy newsletter_index_page.html:36 lacks autocomplete=email, but that template is not the observed live /newsletter/ form. Add it before reusing the legacy template; not counted as a confirmed live failure."
    },
    {
      "skill": "forms-specialist",
      "note": "Shared signup template repeats id=email when included twice; its controls use aria-label, so no broken label association was observed. Unique IDs are a maintenance improvement, not automatically a WCAG 2.2 failure."
    },
    {
      "skill": "forms-specialist",
      "note": "Third-party Mailchimp subscription success, server validation, confirmation emails, and any CAPTCHA remain untested. Empty/malformed native validation was tested with all POST requests blocked as an additional safeguard."
    },
    {
      "skill": "forms-specialist",
      "note": "Screenshots: screenshots/audit-2026-10-16/newsletter-form-validation.png and screenshots/audit-2026-10-16/showcase-filter-label.png. Raw control inventories and validation evidence are in forms-evidence/."
    },
    {
      "skill": "keyboard-navigator",
      "note": "Behavioral verification used isolated headless Chromium from /usr/bin/chromium through Playwright, at desktop 1440×1000 and mobile 390×844; no shared user browser was attached."
    },
    {
      "skill": "keyboard-navigator",
      "note": "The four reported defects were verified on deployed pages, with source reviewed to identify causes or remediation locations. Shared-component reach is inferred from templates; these behavioral checks were not repeated on every crawled URL."
    },
    {
      "skill": "keyboard-navigator",
      "note": "Raw runtime evidence is saved in .a11y-history/2026-10-16/evidence/keyboard-deep.log and keyboard-final.log."
    },
    {
      "skill": "keyboard-navigator",
      "note": "Desktop Escape and mobile submenu Back can leave document.activeElement on BODY after hiding the focused submenu item. Subsequent Tab remained usable in the tested Chromium flows; this is recorded as a focus-management improvement rather than an additional scored WCAG failure."
    },
    {
      "skill": "keyboard-navigator",
      "note": "Opening a mobile submenu also leaves focus on its fully covered triggering button; additional screenshot: screenshots/audit-2026-10-16/keyboard-mobile-submenu-focus-covered.png."
    },
    {
      "skill": "keyboard-navigator",
      "note": "Mobile-menu descendant tests used pointer activation solely to get past the independently reported keyboard activation failure."
    },
    {
      "skill": "keyboard-navigator",
      "note": "No application files were edited."
    },
    {
      "skill": "link-checker",
      "note": "Full captured-HTML candidate inventory found 116 generic-text links, 25 absent/empty-href anchors, 11 apparently empty anchors and one strategy PDF link. These are triage candidates, not failure counts; external redirects, hidden anchors, title-based names and contextual names require exclusion. Inventory retained at links-evidence/link-candidates.json."
    },
    {
      "skill": "link-checker",
      "note": "Confirmed empty links in newsletter issues 3 and 6 match existing axe link-name findings and should remain in the automated aggregation; not duplicated here."
    },
    {
      "skill": "link-checker",
      "note": "Existing link-in-text-block axe results on /packages/ duplicate the source-verified finding above; merge them as one root cause."
    },
    {
      "skill": "link-checker",
      "note": "Advisory content maintenance: /packages/ contains empty href values on named package links; /privacy/ and /blog/state-of-wagtail-accessibility/ contain intended links rendered as anchors without href. Repair destinations or render ordinary text; these were not automatically classified as WCAG failures."
    },
    {
      "skill": "link-checker",
      "note": "Optional improvements: make generic link text meaningful without context and include download sizes where useful. Standalone purpose is AAA, and missing file size is not automatically an AA failure."
    },
    {
      "skill": "link-checker",
      "note": "Newsletter index empty links are a separate root cause from empty inline anchors inside issues 3 and 6. The rendered defect is confirmed; the precise CMS content or template parsing cause remains unverified."
    },
    {
      "skill": "link-checker",
      "note": "/cdn-cgi/l/email-protection returns a Cloudflare-generated diagnostic page with its own link-in-text-block warning (#0051c3 versus #404040, 1.46:1). Treat as an edge-provider diagnostic/advisory, not the package-directory stylesheet defect; raw evidence 02eff82886ede699.json."
    },
    {
      "skill": "live-region-controller",
      "note": "No confirmed WCAG 4.1.3 failure was identified in these reviewed states. This is not a claim of complete screen-reader interoperability."
    },
    {
      "skill": "live-region-controller",
      "note": "The W3C status-messages guidance distinguishes status messages from ordinary changed results/content, and does not require authors to invent new messages: https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html. Feature-filter content changes and full-page showcase results were therefore not automatically flagged."
    },
    {
      "skill": "live-region-controller",
      "note": "Copy feedback recommendation: home_page.html:33 uses role=alert for routine success. Prefer a persistent role=status region with polite announcements, update its text, and keep confirmation available longer than the current 1250 ms timeout. Chromium exposes the current alert correctly, but repeated announcement behavior and interruption of speech require native screen-reader testing."
    },
    {
      "skill": "live-region-controller",
      "note": "Copy error recommendation: copy-code-snippet.js:17 attaches only a success handler. A controlled browser-side simulation rejecting clipboard.writeText produced an unhandled NotAllowedError and no visible or accessible failure feedback. Catch errors and supply a polite, persistent message with a manual-copy alternative. This simulation is not a spontaneously observed production failure, and absent feedback for all users is not automatically a 4.1.3 violation."
    },
    {
      "skill": "live-region-controller",
      "note": "Sitewide-banner source inserts an ordinary aside after fetch, without live-region semantics. No live banner was present to assess. Decide whether actual future content is an urgent warning, a status update, or ordinary promotional content before choosing alert/status semantics; do not make every promotion assertive."
    },
    {
      "skill": "live-region-controller",
      "note": "Cookie dismissal leaves document.activeElement on BODY; focus management is an improvement to assess in keyboard testing, not an additional missing-status-message failure."
    },
    {
      "skill": "live-region-controller",
      "note": "Evidence: .a11y-history/2026-10-16/evidence/live-region-runtime.json; screenshots/audit-2026-10-16/live-copy-success.png. The feature-filter behavior is also recorded in evidence/aria-runtime.json."
    },
    {
      "skill": "live-region-controller",
      "note": "Testing used isolated headless Chromium at 1440×1000, DOM/source inspection and accessibility snapshots. Native screen-reader speech, external newsletter submission and third-party embedded systems were not tested. No application source files were edited."
    },
    {
      "skill": "modal-specialist",
      "note": "Duplicate defects remain in their owning reports: ARIA-DIALOG-NAME-001 (unnamed search); KEYBOARD-001 through KEYBOARD-003 (mobile activation and covered focus). They are not counted again here."
    },
    {
      "skill": "modal-specialist",
      "note": "No new confirmed WCAG failures were identified. The native dialog element would simplify focus and inertness behavior, but a div with correct ARIA and behavior is not automatically a WCAG failure."
    },
    {
      "skill": "modal-specialist",
      "note": "Background inertness is incomplete at implementation level: no inert attribute is set, and the cookie notice is above the modal backdrop and pointer-hit-testable while search or Get started is open. Keyboard focus remained trapped in tests; native screen-reader background navigation and effects of interacting with the cookie notice during an open modal require follow-up. Consider putting cookie interaction behind a truly modal dialog."
    },
    {
      "skill": "modal-specialist",
      "note": "The cookie notice is nonmodal and does not need a dialog role or focus trap merely because it overlays content. Its verified mobile focus-obscuring behavior is already in the keyboard report."
    },
    {
      "skill": "modal-specialist",
      "note": "Evidence: .a11y-history/2026-10-16/evidence/modal-runtime.json; screenshots/audit-2026-10-16/modal-search-open.png, modal-getStarted-open.png and modal-mobile-nav-open.png."
    },
    {
      "skill": "modal-specialist",
      "note": "Tests used isolated headless Chromium at 1440×1000 and 390×844. Native screen-reader traversal was not tested. No application code changed."
    },
    {
      "skill": "pdf-accessibility",
      "note": "Reviewed on 2026-10-16 using Poppler pdfinfo/pdftotext/pdffonts, pypdf, PyMuPDF and the accessibility-agents baseline PDF scanner. No PDF scan configuration was present. The document is 11 pages, PDF 1.4, produced by Skia/PDF m151 Google Docs Renderer."
    },
    {
      "skill": "pdf-accessibility",
      "note": "The baseline MCP scanner incorrectly reported no text content. That finding was rejected because two independent extractors and direct content-stream inspection demonstrate real text on every page. Do not recommend OCR for this file."
    },
    {
      "skill": "pdf-accessibility",
      "note": "Poppler's pdfinfo -struct-text output truncates some paragraphs and list items after nested ActualText spans. Direct content-stream inspection shows the surrounding MCID remains present; these extraction limitations were not misreported as omitted body content."
    },
    {
      "skill": "pdf-accessibility",
      "note": "WCAG findings and PDF/UA technical observations are explicitly separated using wcag=n/a for the latter. No claim of PDF/UA conformance is made. There is no XMP metadata or PDF/UA identification entry; adding a conformance identifier alone would not establish conformance."
    },
    {
      "skill": "pdf-accessibility",
      "note": "veraPDF and Java were unavailable. Run veraPDF PDF/UA-1 validation after repairs and conduct an Acrobat/Reader screen-reader reading and list-navigation test; those checks remain outstanding."
    },
    {
      "skill": "pdf-accessibility",
      "note": "Evidence files: .a11y-history/2026-10-16/evidence/product-strategy.txt, product-strategy-tags.txt, product-strategy-structure.json, and pdf-page-1-content.txt. All page renders are saved as screenshots/audit-2026-10-16/product-strategy-page-01.png through product-strategy-page-11.png."
    },
    {
      "skill": "pdf-accessibility",
      "note": "List-structure reference: [PDF Association Tagged PDF Best Practice Guide](https://pdfa.org/wp-content/uploads/2023/07/Tagged-PDF-Best-Practice-Guide.pdf). Language syntax reference: [RFC 3066](https://www.rfc-editor.org/rfc/rfc3066.html). WCAG language context: [W3C Understanding 3.1.1](https://www.w3.org/WAI/WCAG21/Understanding/language-of-page)."
    },
    {
      "skill": "pdf-accessibility",
      "note": "The PDF and application source were not modified."
    },
    {
      "skill": "tables-data-specialist",
      "note": "No confirmed WCAG 2.2 AA table-domain failures were found in these checks. This is limited to the audited markup and Chromium behavior, not a universal screen-reader/browser conformance claim."
    },
    {
      "skill": "tables-data-specialist",
      "note": "The comparison tables have no captions or explicit accessible names. Their surrounding page context and scoped headers make the data relationships clear; missing captions alone were not scored as WCAG failures. Adding concise captions would improve table discovery."
    },
    {
      "skill": "tables-data-specialist",
      "note": "Adding tabindex=0 and an accessible name to the comparison scroll regions would make focus behavior explicit across browsers. The absent attribute was not reported as a failure because the tested live keyboard interaction succeeds."
    },
    {
      "skill": "tables-data-specialist",
      "note": "Newsletter layout tables lack role=presentation. Replacing them with CSS layout for the web archive, or explicitly removing layout-table semantics, would reduce dependence on browser heuristics. No incorrect data relationship was demonstrated, so this is advice rather than a scored finding."
    },
    {
      "skill": "tables-data-specialist",
      "note": "Five crawl URLs redirect off-origin: /accessibility/acr/, /accessibility/atag-audit/, /gsoc, /skills-upgrade-wagtail/, and /sustainability/sustainability-roadmap/. Their destination tables were inspected for scope classification and excluded from wagtail.org findings."
    },
    {
      "skill": "tables-data-specialist",
      "note": "The separately audited Wagtail Space schedule widget is handled by the structure specialist, avoiding duplicate findings."
    },
    {
      "skill": "tables-data-specialist",
      "note": "Evidence saved in .a11y-history/2026-10-16/evidence/tables-inventory.json, tables-runtime.json, and tables-keyboard.json. No application source was changed."
    },
    {
      "skill": "testing-coach",
      "note": "CI recommendation: add a separate Playwright plus @axe-core/playwright job against a built Django/Wagtail test instance with deterministic fixtures for representative templates. Scan initial pages and opened menus/dialogs after content and transitions settle; include mobile and desktop widths and both themes. Preserve raw results and traces as artifacts. Use explicit, reviewed fingerprints for accepted existing issues rather than disabling whole rules. [Playwright accessibility testing](https://playwright.dev/docs/accessibility-testing)."
    },
    {
      "skill": "testing-coach",
      "note": "CI scope: include homepage, features, blog filters, a syntax-highlighted blog post, a newsletter archive, a comparison table, an embedded video and the Space schedule. Select WCAG 2.0/2.1/2.2 A/AA tags supported by the pinned axe version. Treat incomplete checks as review items. Run the broader same-origin content crawl periodically to catch CMS changes; do not mistake redirected external sites for same-origin coverage."
    },
    {
      "skill": "testing-coach",
      "note": "Mobile navigation regression: at 390px and narrow zoomed layouts, use only Tab, Shift+Tab, Enter, Space and Escape. Both activation keys must open the burger; submenu focus must enter visible content; Back must restore its trigger; no Tab stop may fall behind a submenu. Repeat with the cookie banner present and dismissed. Criteria: 2.1.1 and 2.4.11."
    },
    {
      "skill": "testing-coach",
      "note": "Dialogs regression: open search and Get started by keyboard, verify a meaningful accessible dialog name, initial focus, forward/reverse focus containment, Escape and close-button behavior, then trigger-focus restoration. Test the search dialog after its naming repair and the optional-heading Get started state. Criteria: 4.1.2, 2.4.3 and 2.1.2."
    },
    {
      "skill": "testing-coach",
      "note": "Color regression: remeasure syntax tokens after theme transitions finish, against their actual code background in both themes; normal-size code must reach 4.5:1 under 1.4.3. Check package-directory inline links retain a non-color distinguishing cue under 1.4.1. Inspect focus and hover states separately."
    },
    {
      "skill": "testing-coach",
      "note": "Content regression: confirm the shared newsletter root has a valid English lang value across all archive issues (3.1.1); review repaired image alternatives for their actual purpose (1.1.1). Check every embedded iframe has a meaningful accessible name, then enter, operate and leave its controls by keyboard; frame naming does not establish accessibility of third-party frame contents."
    },
    {
      "skill": "testing-coach",
      "note": "Schedule regression: wait for the pretalx widget's shadow-root content before scanning. Exercise date/view selectors, session links, expansion and any detail dialogs with keyboard and a screen reader. Check control names/states, ordered announcements, focus restoration, text contrast and narrow-screen access. Preserve independent evidence for the embedded widget and escalate vendor-owned defects with reproducible steps."
    },
    {
      "skill": "testing-coach",
      "note": "Forms and feedback regression: changing a blog checkbox must not unexpectedly navigate before an explicit Apply action unless an appropriate alternative is implemented (3.2.2). Test signup invalid-input messages and a controlled staging success path. Confirm repeated copy successes are announced and a clipboard rejection provides useful feedback without losing focus; current Chromium role exposure does not prove spoken announcements."
    },
    {
      "skill": "testing-coach",
      "note": "PDF regression: verify the version/date is in logical tag order; repair list label/body structure and language syntax; rerun veraPDF against PDF/UA-1 separately from WCAG review. Read the repaired PDF in Adobe Acrobat Reader with NVDA, navigating headings, lists, bookmarks and links. Confirm all content, including page continuations, is read once in order. Do not apply OCR to this text-based document."
    },
    {
      "skill": "testing-coach",
      "note": "Outstanding native assistive-technology coverage: test NVDA with Firefox and Chromium on Windows, VoiceOver with Safari on macOS/iOS, and mobile navigation with TalkBack where supported. Record actual announcements and browser/AT versions. This audit's browser automation and accessibility-tree inspection do not substitute for those speech and interaction checks. Automated tools alone cannot determine conformance: [W3C tool-selection guidance](https://www.w3.org/WAI/test-evaluate/tools/selecting/)."
    },
    {
      "skill": "testing-coach",
      "note": "Outstanding manual content review: listen to homepage video audio and assess captions, meaningful audio descriptions and transcript needs before deciding 1.2.2/1.2.5 conformance. Third-party signup completion, server-side validation, confirmation emails and any CAPTCHA were not exercised in this audit."
    },
    {
      "skill": "testing-coach",
      "note": "Recheck each fix in its pull request, rerun the affected template/content family after deployment, and close findings only with recorded passing evidence. Complete the remaining screen-reader, media and PDF validation before making any WCAG conformance claim. No CI files, application source or scheduled jobs were changed."
    },
    {
      "skill": "web-component-specialist",
      "note": "Reviewed severity replaces automated impact labels: unnamed favorite controls are serious; portrait alternatives, date relationships and timezone naming are moderate. None of these observations demonstrates a total critical site blocker."
    },
    {
      "skill": "web-component-specialist",
      "note": "The widget is supplied by https://pretalx.com/wagtail-space-2026/widgets/schedule.js and its 2025 equivalent. The repository embeds it at space_schedule_page.html:14–15; template fixes outside the shadow root alone will not repair its controls. No upstream messages were sent."
    },
    {
      "skill": "web-component-specialist",
      "note": "The 2026 page displayed a static UTC label, while 2025 exposed the unnamed timezone textbox. The timezone finding is limited to the verified 2025 control."
    },
    {
      "skill": "web-component-specialist",
      "note": "Pressing ArrowRight on the first date tab did not move focus or selection on either widget. All session content remained in the accessibility tree, so this limited test is recorded for further keyboard-pattern review rather than an additional confirmed keyboard failure."
    },
    {
      "skill": "web-component-specialist",
      "note": "The site currently provides its external schedule fallback link only inside noscript. Consider an always-visible accessible schedule alternative; accessibility of the external destination itself was not verified."
    },
    {
      "skill": "web-component-specialist",
      "note": "Evidence: .a11y-history/2026-10-16/evidence/widget-runtime.json and widget-2025-runtime.json; screenshots/audit-2026-10-16/widget-schedule.png and widget-2025-schedule.png. Automated raw files: raw/0ba3b8a111efca54.json and raw/105c68e50a4c5cd4.json."
    },
    {
      "skill": "web-component-specialist",
      "note": "Browser tests used isolated headless Chromium at 1440×1000 and waited for visible favorite controls plus an additional 1.8 seconds. Native screen-reader speech and all filter/session-detail overlay states were not exhaustively tested."
    },
    {
      "skill": "web-component-specialist",
      "note": "No link-in-text-block violation was present in the supplied raw 2025 schedule file at the time of inspection; no additional link-color finding was inferred."
    }
  ],
  "counts": {
    "critical": 0,
    "serious": 9,
    "moderate": 9,
    "minor": 1
  },
  "components": [
    {
      "component": "External pretalx schedule widget",
      "count": 4,
      "worst": "serious",
      "rules": [
        "SHADOW-AVATAR-ALT-001",
        "SHADOW-FAVORITE-NAME-001",
        "SHADOW-TAB-RELATION-001",
        "SHADOW-TIMEZONE-LABEL-001"
      ]
    },
    {
      "component": "Product strategy PDF",
      "count": 3,
      "worst": "moderate",
      "rules": [
        "PDF-TAGS-001",
        "PDFUA-LANG-001",
        "PDFUA-LIST-001"
      ]
    }
  ],
  "score": 85,
  "grade": "B",
  "penalty": 64,
  "checks": 83,
  "generated": "2026-10-16",
  "template": "web"
}
```
