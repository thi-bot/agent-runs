# Web Accessibility Audit

An audit of web content, run on 2026-10-06. Read the executive summary for the verdict, the priorities section for what to do first, and the findings tables for detail.

## Metadata

What was audited, with what, and under which settings.

| Field | Value |
|---|---|
| Date | 2026-10-06 |
| Scope | 239 items |
| Skills run | alt-text-headings, aria-specialist, contrast-master, forms-specialist, keyboard-navigator, link-checker, live-region-controller, modal-specialist, playwright-scanner, tables-data-specialist, testing-coach |
| Tooling | node v26.8.1 |
| Scan configuration | defaults, no config file found |
| Checks counted | 79 |

Audited:

- `.a 11 y-history/2026-10-06-production/*.json`
- `.a 11 y-history/2026-10-06-production/raw/**`
- `.a 11 y-history/2026-10-06-production/raw/*.html`
- `.a 11 y-history/2026-10-06-production/raw/crawl.json`
- `.a11y-history/2026-10-06-production/raw/crawl.json`
- `.a11y-history/2026-10-06-production/raw/states.json`
- `.github/workflows/ci.yml`
- `All 149 successful public content paths across en/is/fr/pt-br/ar; 153 successful HTML URLs including four version-query aliases`
- `All 43 discovered HTML 404 addresses`
- `Final 196 distinct HTML addresses:153 successful plus 43 errors`
- `Production English article/search runtime and Chromium accessibility tree`
- `Production search blank/results/empty states`
- `apps/core/blocks.py`
- `apps/core/templates/**`
- `apps/core/templates/base.html`
- `apps/core/templates/components/**`
- `apps/core/templates/components/copy_button.html`
- `apps/core/templates/components/feedback.html`
- `apps/core/templates/components/header.html`
- `apps/core/templates/components/navigation.html`
- `apps/core/templates/components/search_modal.html`
- `apps/core/templatetags/core_tags.py`
- `apps/core/tests/**`
- `apps/custom_media/**`
- `apps/custom_media/image_formats.py`
- `apps/frontend/static_src/js/**`
- `apps/frontend/static_src/js/**/*.test.js`
- `apps/frontend/static_src/js/copy-button.js`
- `apps/frontend/static_src/js/feedback/**`
- `apps/frontend/static_src/js/feedback/index.js`
- `apps/frontend/static_src/js/main.js`
- `apps/frontend/static_src/js/mobile-menu/index.js`
- `apps/frontend/static_src/scss/**`
- `apps/richtext/**`
- `apps/search/templates/**`
- `apps/search/templates/search/search.html`
- `apps/search/views.py`
- `content/**`
- `https://guide.wagtail.org/ar/`
- `https://guide.wagtail.org/ar/about/`
- `https://guide.wagtail.org/ar/about/None/`
- `https://guide.wagtail.org/en/`
- `https://guide.wagtail.org/en/about/`
- `https://guide.wagtail.org/en/concepts/`
- `https://guide.wagtail.org/en/concepts/accessibility-features/`
- `https://guide.wagtail.org/en/concepts/page-status/`
- `https://guide.wagtail.org/en/concepts/page-status/?target_version=latest`
- `https://guide.wagtail.org/en/concepts/pages/`
- `https://guide.wagtail.org/en/concepts/pages/None/`
- `https://guide.wagtail.org/en/concepts/reports/`
- and 189 more

## Executive summary

Fail. Critical or serious findings must be fixed before this ships.

The headline numbers for this run.

| Measure | Value |
|---|---|
| Score | 84 out of 100 |
| Grade | B |
| Findings | 21 |
| Blocking (critical plus serious) | 8 |
| Verdict | Fail |

## Severity breakdown

Counts by severity, highest impact first.

| Severity | Count | What it means |
|---|---:|---|
| critical | 0 | Blocks a person from completing the task |
| serious | 8 | Major barrier with a difficult workaround |
| moderate | 9 | Real friction, workaround exists |
| minor | 4 | Noticeable but rarely blocking |

## Findings

21 findings, ordered by severity then by rule.

### Serious (8)

Each row names the rule, the criterion it fails, where it is, and what to change.

| Rule | WCAG | Location | Problem | Fix |
|---|---|---|---|---|
| `CONTRAST-001` | 1.4.3 AA | apps/frontend/static_src/scss/components/version-badge.scss:21 | Added-version badges have insufficient text contrast in the light theme. | Use a darker teal foreground or lighter badge background that reaches at least 4.5:1 for the 14.4px badge text; verify all badge variants in both themes. |
| `CONTRAST-002` | 1.4.3 AA | apps/frontend/static_src/scss/components/alert.scss:38 | Links inside light-theme note and warning panels fail the 4.5:1 text contrast requirement. | Give alert-content links a darker foreground that reaches 4.5:1 against both #e0eff0 and #e6e3f1, while retaining an underline and distinct hover/focus states. |
| `KEYBOARD-MOBILE-OVERLAY-FOCUS` | 2.4.11 AA | apps/frontend/static_src/js/mobile-menu/index.js:42 | The open mobile navigation lets Tab move to background controls that the menu completely covers. | Close the mobile navigation when focus moves outside its toggle and navigation, or implement an accessible modal menu with background inertness, focus containment, Escape dismissal and focus restoration. Keep the toggle available to close the menu. |
| `LANG-SHARED-001` | 3.1.1 A | apps/core/templates/base.html:7 | Search and 404 pages have an empty document language. | Use the active Django LANGUAGE_CODE as a fallback when self.locale.language_code is absent, and verify blank/results/empty search pages and nonexistent URLs in English and translated locales. |
| `LANG-UNTRANSLATED-PARTS-001` | 3.1.2 AA | https://guide.wagtail.org/fr/ | Substantial English fallback content inherits the translated page language without a language override. | Translate fallback content, or explicitly mark English introductions/article blocks and other English passages lang=en while retaining the correct language for translated UI. Track the actual language of CMS translation segments so templates can render accurate language attributes. |
| `LIVE-001` | 4.1.3 AA | apps/core/templates/components/search_modal.html:13 | Asynchronous search result counts and no-results messages are not exposed as status messages. | Give the persistent count container role="status" and aria-atomic="true"; update a stable text node after the latest search finishes, announce loading for prolonged requests, and avoid making the entire result list live. |
| `LIVE-003` | 4.1.3 AA | apps/frontend/static_src/js/feedback/index.js:44 | The visible feedback-rating acknowledgement lacks status semantics. | Add a persistent status region outside replaceable feedback/form content; announce rating receipt and successful comment submission after checked successful responses, and expose failures with an accessible retry path. |
| `REFLOW-001` | 1.4.10 AA | apps/frontend/static_src/scss/components/page-tools.scss:4 | The Icelandic page-tools row overflows the 320px viewport and pushes the language control offscreen. | Allow the shared page-tools flex row to wrap or stack at narrow widths; ensure each control can shrink or wrap translated text and remain fully operable within 320 CSS px. Verify long translations with text spacing and enlarged text. |

### Moderate (9)

Each row names the rule, the criterion it fails, where it is, and what to change.

| Rule | WCAG | Location | Problem | Fix |
|---|---|---|---|---|
| `ARIA-MOBILE-POPUP-001` | 4.1.2 A | apps/core/templates/components/header.html:26 | The mobile navigation toggle advertises an ARIA menu popup although its content is ordinary navigation. | Remove aria-haspopup=true from this disclosure button; retain the updated aria-expanded state and optionally add aria-controls pointing to an ID on the navigation container. Keep native navigation links instead of adding menu roles. |
| `ARIA-NAV-CURRENT-001` | 1.3.1 A | apps/frontend/static_src/js/active-nav-item/index.js:5 | The visually highlighted current navigation page is not identified programmatically. | When matching the current pathname, set aria-current=page on that link alongside the active class. Ensure exactly the current page link is marked. |
| `ARIA-THEME-STATE-001` | 4.1.2 A | apps/core/templates/components/theme_toggle.html:5 | The light/dark toggle exposes neither its selected state nor a changing action name. | Use a native checkbox or button role=switch with aria-checked, or a toggle button with aria-pressed and stable Dark mode name; synchronize initial and changed state in blocking.js. Alternatively announce the next action with a changing button name. |
| `CONTRAST-003` | 1.4.11 AA | apps/frontend/static_src/scss/components/theme-toggle.scss:16 | The theme switch becomes visually indistinguishable from its background in forced-colors mode. | Add a forced-colors style using system colors and a visible border or system-color icon so the switch and its state remain discernible; retain native color adjustment where possible. |
| `FORM-SEARCH-DUPLICATE-LABEL-TARGET` | 1.3.1 A | apps/search/templates/search/search.html:11 | On full search pages, the modal Search label is associated with the main-page input instead of its own input. | Use distinct ids such as page-search and modal-search, updating each label for attribute to match its respective input. Preserve the modal data-search-input selector and search query field name. |
| `LINK-001` | n/a | apps/core/templatetags/core_tags.py:78 | The language selector offers Arabic translations whose unresolved URLs become relative None links and return 404. | Restrict language-selector translations to public, routable pages and resolve each URL before rendering; omit unavailable translations or link explicitly to a valid locale landing page. Reuse the existing hreflangs URL-validation approach. |
| `LIVE-002` | 4.1.3 AA | apps/frontend/static_src/js/copy-button.js:67 | Copy-link and copy-prompt success changes a different control’s label without an announced status. | Keep copy control names stable and update a persistent role="status" aria-atomic="true" element with a concise translated success message for each copy action; retain focus on the invoking control. |
| `MODAL-ACCESSIBLE-NAME` | 4.1.2 A | apps/core/templates/components/search_modal.html:3 | The open search dialog has no accessible name, so assistive technology cannot identify its purpose as a dialog. | Give the dialog an accessible name with a translated aria-label="Search", or add a visible Search heading and reference its id with aria-labelledby. Retain the separate Search label for the input. |
| `TOOLTIP-FEEDBACK-NOT-HOVERABLE` | 1.4.13 AA | apps/core/templates/components/feedback.html:8 | Feedback tooltips disappear when the pointer moves from their button onto the tooltip content. | Keep the tooltip visible while the pointer is over either its trigger or tooltip and provide Escape dismissal; consider visible helpful/not helpful labels that remove the need for explanatory hover content. |

### Minor (4)

Each row names the rule, the criterion it fails, where it is, and what to change.

| Rule | WCAG | Location | Problem | Fix |
|---|---|---|---|---|
| `HEADINGS-RELEASE-001` | n/a | content/en/releases/new-in-wagtail-6-4.md:12 | Wagtail 6.4 release topics use H3 for top-level article sections. | Change the five release topic headings from H3 to H2 in CMS content and the corresponding export; these topics are siblings of the contents panel, rather than subsections of its On this page heading. |
| `LANDMARK-NAMES-001` | n/a | apps/core/templates/components/navigation.html:3 | Repeated navigation landmarks have no distinct accessible names. | Label primary navigation and previous/next navigation distinctly; remove the unnecessary nav wrapper around the standalone skip link or give it a distinct name. Verify landmark navigation exposes clear purposes. |
| `LINK-002` | n/a | content/en/how-to-guides/find-your-way-around.md:62 | The current-status reference link leads to a removed English URL and returns 404. | Update the CMS source and exported Markdown link to the current page-status reference location, and provide a redirect from /en/reference/page-status-definitions/ where practical. |
| `LINK-003` | n/a | https://guide.wagtail.org/fr/ | The French homepage Guides pratiques card leads to a missing French section and returns 404. | Publish the French how-to section or update the CMS card to a valid translated destination; suppress links to unavailable sections until a usable landing page exists. |

## Remediation priorities

Fix these components first. Each one carries the same defect in several places, so one fix clears every instance.

| Component | Instances | Worst severity | Rules |
|---|---:|---|---|
| Search modal | 2 | serious | `LIVE-001`, `MODAL-ACCESSIBLE-NAME` |
| Theme toggle | 2 | moderate | `ARIA-THEME-STATE-001`, `CONTRAST-003` |

Then the 8 remaining blocking findings, in this order:

1. `CONTRAST-001` at apps/frontend/static_src/scss/components/version-badge.scss:21. Use a darker teal foreground or lighter badge background that reaches at least 4.5:1 for the 14.4px badge text; verify all badge variants in both themes.
2. `CONTRAST-002` at apps/frontend/static_src/scss/components/alert.scss:38. Give alert-content links a darker foreground that reaches 4.5:1 against both #e0eff0 and #e6e3f1, while retaining an underline and distinct hover/focus states.
3. `KEYBOARD-MOBILE-OVERLAY-FOCUS` at apps/frontend/static_src/js/mobile-menu/index.js:42. Close the mobile navigation when focus moves outside its toggle and navigation, or implement an accessible modal menu with background inertness, focus containment, Escape dismissal and focus restoration. Keep the toggle available to close the menu.
4. `LANG-SHARED-001` at apps/core/templates/base.html:7. Use the active Django LANGUAGE_CODE as a fallback when self.locale.language_code is absent, and verify blank/results/empty search pages and nonexistent URLs in English and translated locales.
5. `LANG-UNTRANSLATED-PARTS-001` at https://guide.wagtail.org/fr/. Translate fallback content, or explicitly mark English introductions/article blocks and other English passages lang=en while retaining the correct language for translated UI. Track the actual language of CMS translation segments so templates can render accurate language attributes.
6. `LIVE-001` at apps/core/templates/components/search_modal.html:13. Give the persistent count container role="status" and aria-atomic="true"; update a stable text node after the latest search finishes, announce loading for prolonged requests, and avoid making the entire result list live.
7. `LIVE-003` at apps/frontend/static_src/js/feedback/index.js:44. Add a persistent status region outside replaceable feedback/form content; announce rating receipt and successful comment submission after checked successful responses, and expose failures with an accessible retry path.
8. `REFLOW-001` at apps/frontend/static_src/scss/components/page-tools.scss:4. Allow the shared page-tools flex row to wrap or stack at narrow widths; ensure each control can shrink or wrap translated text and remain fully operable within 320 CSS px. Verify long translations with text spacing and enlarged text.

The remaining 13 moderate and minor findings can follow in normal work.

## What passed

58 checks ran and found nothing.

- 200% text resize through root font-size enlargement on homepage, overview and manage-pages retained content without horizontal scrolling or clipped visible text.
- Across 425 rendered image instances on distinct successful URLs, all images have an alt attribute; 393 are nonempty and 32 are empty. English sitemap images have nonempty alternatives.
- All 153 successful HTML URLs have one H1 and one main landmark; all 149 successful content paths were inspected across five locales.
- All internal fragment targets referencing crawled pages resolve to recorded heading IDs; #main-content is handled by the skip-link audit.
- All successful HTML pages have nonempty document language appropriate to the selected locale; search/404 absence and untranslated passages are reported separately.
- All successful HTML titles identify their page topic; duplicate English titles across locale copies identify the same topic and were not treated as independent title failures.
- Arabic home and article pages have dir=rtl; Icelandic, French and Brazilian Portuguese successful pages declare their respective language codes.
- Bootstrap adds role="dialog" and aria-modal="true" and removes aria-hidden="true" when opening the production search modal; missing static role is not a runtime defect.
- Both feedback buttons are reachable in sequence by Tab without submitting feedback.
- Content-copy controls correctly use buttons for copying and anchors for navigating to Markdown resources.
- Copy and language dropdown triggers initialize aria-expanded=false; Bootstrap dropdown owns state transitions.
- Copy options and language dropdowns open with Enter, ArrowDown reaches their first item, and Escape closes and restores focus to their trigger.
- Copy page activates with Enter, preserves focus, displays Copied!, and writes the expected page Markdown to the clipboard (16,140 characters on Manage pages).
- Crawled link inventory has no empty links without an aria-label, and no standalone click here/read more/learn more links.
- Escape dismissal and backdrop dismissal both close the search modal and restore focus to the search trigger.
- Existing CI runs frontend build/lint/Vitest and Django checks/backend coverage with PostgreSQL; mobile-menu tests assert aria-expanded changes.
- Feedback reveal and completion were exercised with every POST intercepted and fulfilled locally; no production feedback was submitted. After the initial buttons are removed, the next Tab reaches the newly revealed textarea; after Submit is removed, the next Tab reaches the following footer link.
- Feedback textarea has a programmatically associated Your feedback label; happy and unhappy native buttons expose names within the visible Was this page helpful context.
- Final inventory inspected 196 distinct HTML addresses (153 successful,43 errors): no data tables or interactive grid/treegrid elements, and no table/list/grid axe violations recorded.
- Generated pilcrow section links are inside their corresponding heading and inherit programmatically determined heading context; ambiguous standalone names alone do not fail 2.4.4 AA.
- Global 2px focus outline overrides theme-toggle outline removal via !important.
- Home SectionGridBlock renders heading-and-description cards with CSS layout, not tabular data requiring row/column header associations.
- Independent modal search with query page returns 3 results and retains input focus; status-region absence corroborates LIVE-001.
- Main body, shared navigation, footer and native search input retain readable foreground/background combinations in sampled light and dark states.
- Main-page search input and Search submit button are native keyboard-operable controls with accessible names.
- Manage pages table-of-contents links activate with Enter; the next Tab advances within the destination section.
- Markdown and llms text links describe the resource format in their visible names.
- Mobile navigation expanded state is updated on open and close in source and captured runtime.
- Navigation, copy-options and language-options templates use native ul/li list markup; page search results use native ul/li markup.
- No additional broken heading relationships were asserted solely from heading-level changes; Wagtail 6.4 section hierarchy remains an advisory finding.
- No authored broken aria-labelledby/aria-describedby/aria-controls references were found in scoped templates.
- No iframe/video/audio elements were found in successful guide pages.
- No personal-information fields, authentication, required user-data fields or multi-step repeated-entry process were found in these forms; autocomplete and redundant-entry requirements are not applicable to the search query or free-text comment.
- No public authentication, drag-only interaction, checkout, multi-step repeated-entry process, user-facing time limit, or audio/video embed was identified in inspected public guide flows; Wagtail admin features described by documentation are outside the guide website interaction scope.
- Parsed all available saved page and state HTML for actual table elements and role=table/grid/treegrid: none found. JavaScript strings inside injected axe scripts were excluded from markup interpretation.
- Representative homepage, section, overview, manage-pages and 404 layouts fit 320 CSS px without horizontal scrolling.
- Responsive dark-desktop/320px-light scans reviewed for 153 URLs; all repeated findings are consolidated by source cause.
- Runtime inventory reviewed for 196 actual HTML URLs (153 successful, 43 404), excluding synthetic plaintext wrappers.
- Search dialog opening moves focus to the labelled search input.
- Search error handling uses a native alert rather than a silent console-only branch; error dialog behavior was reviewed in source only.
- Search result links are keyboard reachable and dropdown options support ArrowDown and Escape with focus restoration.
- Search trigger keyboard activation focuses the Search input; Shift+Tab in the empty dialog returns to that input without reaching background controls.
- Search updates are debounced by 150ms rather than firing a request for every immediate keyboard event.
- Server-rendered full search pages are navigation results and do not require their initial counts to be live regions.
- Shared controls use native buttons, links and text inputs rather than custom div roles.
- Shared decorative icons use aria-hidden=true with parent text or accessible names.
- Shared logo, section illustrations, alert icons, footer icons and feedback emoji use aria-hidden=true with adjacent text or named parent links/buttons.
- Shared navigation, table-of-contents, section cards and article cross-links use descriptive destination names.
- Source review found no positive tabindex or non-native click-only interactive elements in the scoped components; inspected keyboard targets receive a 2px solid focus outline.
- Source templates and content block definitions contain no data-table, interactive-grid, treegrid, sortable-table or table-pagination implementation.
- Tests cover locale behavior, header content, 404 responses, content rendering and heading fragment-link generation.
- The mobile menu opens with Enter and Space, updates aria-expanded, and its native navigation links are keyboard reachable; closed navigation is display:none and excluded from Tab order.
- The modal Search input is explicitly labelled on pages without a competing full-page search form.
- The search trigger opens with Enter, focuses the input, makes search result links keyboard reachable, and Escape closes the modal and restores trigger focus.
- The skip link is the first Tab stop, becomes visible, and Enter followed by Tab reaches a main-content link in production Chromium.
- Theme toggle and sampled standalone controls meet 24 CSS px target size; short inline content links use the inline-text exception.
- This audit includes source review, production HTML/axe scans, keyboard interaction, Chromium accessibility-tree inspection, mocked feedback submissions, and responsive/theme/accessibility preference checks documented in raw evidence.
- WCAG text-spacing override (line height 1.5, letter spacing .12em, word spacing .16em, paragraph spacing 2em) on homepage, overview, manage-pages and reference layouts caused no main-content overflow.

## Needs a human

Items a skill could not decide, or could not check automatically.

- **alt-text-headings**: Coverage: crawl completed 238 navigations resulting in 197 unique final addresses: 153 successful HTML URLs (149 content paths plus four query aliases), 43 HTML 404 addresses and one plaintext .md resource. The synthetic browser wrapper for .well-known/agent-skills/wagtail-guide-support/SKILL.md was excluded from HTML structure checks.
- **alt-text-headings**: Heading levels and landmark labels reported as n/a are structural improvements, not independently proven WCAG AA failures.
- **alt-text-headings**: No screenshots were captured or inspected. Image alternatives were reviewed textually and against surrounding instructional prose; pixel-level equivalence and screenshot transcription completeness were not established.
- **alt-text-headings**: 32 empty-alt instructional image instances occur on 15 Icelandic/Brazilian Portuguese paths. Many have adjacent prose explaining the same action, so empty alt alone was not asserted as WCAG 1.1.1 failure. Editors should verify equivalent information: /is/releases/new-in-wagtail-4-1/ explicitly refers to looking at the preceding snippets screenshot; /is/how-to/finding-your-way-around/ and /pt-br/how-to-guides/find-your-way-around/ have seven and five empty-alt screenshots respectively; /is/tutorials/getting-started/ and /pt-br/getting-started/overview/ omit sign-in image descriptions.
- **alt-text-headings**: Short alternatives such as Pin toolbar and page history replace current draft merit contextual editorial review, but no unsupported alternative-text inadequacy failure was asserted.
- **alt-text-headings**: The language-of-parts finding concerns clearly English sentences/paragraphs, not single-word language names, product names, code or technical terms exempted by 3.1.2. Additional English fallback navigation/footer/control strings should be covered by the same translation remediation.
- **alt-text-headings**: content/en/index.md contains an external Wagtail developer-documentation HTML export unlike the production guide home. Its markup was not used as production home evidence.
- **alt-text-headings**: Detailed runtime evidence is raw/crawl.json and raw/page-46.html (French home), raw/page-70.html (Portuguese forms), raw/page-100.html (Icelandic content checks), raw/page-155.html (Arabic about). raw/structure-crawl.json provides the initial 45-English-page inventory.
- **aria-specialist**: Search modal dialog name/focus behavior and live-region behavior are owned by separate domain specialists and are not duplicated here.
- **aria-specialist**: Duplicate search IDs do not produce an absent Chromium accessible name: placeholder fallback names the modal field. The finding concerns the demonstrably broken explicit label relationship under 1.3.1, not removed WCAG 4.1.1.
- **aria-specialist**: Language names in the selector use hreflang but no lang; adding lang to each localized label improves pronunciation. Single-word language names are not asserted as a clear 3.1.2 failure because that criterion has exceptions for proper names and indeterminate words.
- **aria-specialist**: On-page contents are ordinary native fragment links; no custom tree, tab or menu semantics are needed.
- **aria-specialist**: No screenshots captured or inspected; runtime evidence consists of DOM and Chromium accessibility-tree data.
- **aria-specialist**: Broken modal search label relationship is confirmed in raw/aria-runtime.json and reported by forms-specialist, avoiding duplicate issue counts.
- **contrast-master**: No screenshots were taken. Runtime evidence is saved in raw/visual-runtime.json, raw/visual-extra.json and raw/visual-zoom-search.json.
- **contrast-master**: prefers-reduced-motion: reduce leaves the theme-switch .25s transition active. This is an enhancement opportunity, not an asserted WCAG AA failure for this brief user-triggered transition.
- **contrast-master**: 200% resize was tested with doubled root text size, not manual browser zoom.
- **contrast-master**: Search input was inspected in both themes; autocomplete result styling should be corroborated by the dedicated search interaction audit.
- **forms-specialist**: Duplicate ids are reported for their confirmed label-association consequence under 1.3.1; WCAG 2.2 removed 4.1.1, and the modal textbox still has a placeholder-derived name, so it is not reported as nameless under 4.1.2.
- **forms-specialist**: Feedback controls are removed while focused, causing document.activeElement to become BODY; Chromium preserves the next sequential Tab location. Explicit focus on the newly revealed textarea or a completion message would improve continuity, but this test does not establish a separate 2.4.3 failure.
- **forms-specialist**: Dynamic feedback and search-result announcements are handled by live-region-controller and are not duplicated here.
- **forms-specialist**: Feedback JS catches network errors by logging to the console, and updateFeedback does not inspect HTTP response.ok before deleting the comment interface. Production server validation/error responses were not induced; error identification and recovery remain source-review limitations.
- **forms-specialist**: No screenshots captured. Runtime evidence is saved to raw/forms-runtime.json, including both intercepted mock POST bodies.
- **keyboard-navigator**: No screenshots were captured. Runtime evidence is in raw/keyboard-runtime.json, raw/keyboard-mobile.json and raw/keyboard-widgets.json.
- **keyboard-navigator**: Feedback buttons were not activated because they POST to the production site; post-submission focus handling was reviewed in source only.
- **keyboard-navigator**: Missing Escape dismissal alone is not treated as an independent WCAG failure for a non-modal navigation disclosure; it contributes to the confirmed obscured-focus defect.
- **keyboard-navigator**: Search Tab traversal can briefly reach browser chrome (document.activeElement becomes BODY) before re-entering the input; no background page control was reached in the inspected modal sequence.
- **keyboard-navigator**: Focus geometry and event behavior were checked with Chromium; this does not establish cross-browser or screen-reader conformance.
- **link-checker**: Broken links are functional defects reported as n/a, not automatic WCAG 2.4.4 failures; their visible text still conveys intended purpose.
- **link-checker**: The None links are language-selector links, not image wrappers. apps/custom_media/image_formats.py only changes the fullwidth rendition filter.
- **link-checker**: Language names lack lang attributes despite hreflang on their destinations. Adding lang to each autonym can improve pronunciation; native language names may fall under the proper-name exception, so no unqualified 3.1.2 failure is asserted.
- **link-checker**: Shared Markdown-view links open new tabs without warning. Add a consistent visible/accessible new-tab cue as usability guidance; target=_blank alone does not establish an AA violation.
- **link-checker**: External destinations, private accounts and GitHub were not fetched.
- **link-checker**: Source and crawl inspection establish programmatic link context; native screen-reader link-list output was not tested.
- **link-checker**: Final completed crawl and successful-page link inventory reviewed: no unresolved internal heading fragments or standalone click here/read more/learn more/here links found.
- **link-checker**: French section link is an additional functional broken destination, separate from unresolved language-selector None URLs.
- **link-checker**: Supplemental feedback-tooltip behavior was explicitly requested with this link pass and is included here; it is a pointer-hover content failure under 1.4.13, independent of any missing Escape issue. No feedback request was sent during tooltip tests.
- **link-checker**: Happy/Unhappy accessible button names are interpretable with the preceding Was this page helpful question, but matching the explicit tooltip purpose (This page was helpful / This page could be improved) in visible labels and accessible names would reduce ambiguity. This is usability guidance, not a separately scored naming failure.
- **live-region-controller**: Runtime feedback evidence uses browser-routed mocked responses; no production feedback was submitted.
- **live-region-controller**: Native screen reader speech was not tested; findings establish absent required status semantics rather than measured output from a particular screen reader.
- **live-region-controller**: Clipboard and feedback catch branches log errors without user-visible outcomes. Clipboard failure and backend feedback errors were not exercised; add visible accessible error messages and verify error recovery.
- **live-region-controller**: Source search requests have neither cancellation nor a latest-request check; a late response can restore stale counts/results after another query, blanking input, or closing the dialog. Address this alongside status announcements; no standalone WCAG failure is asserted without a reproduced user impact.
- **live-region-controller**: Search loading is a CSS is-loading class with no status text/aria-busy. Include prolonged-loading messaging in the search-status remediation.
- **modal-specialist**: Confirmed mobile focus-obscuring failure is already recorded in keyboard-navigator.json as KEYBOARD-MOBILE-OVERLAY-FOCUS; it is not duplicated here.
- **modal-specialist**: axe-core 4.11.1 aria-dialog-name tags are cat.aria and best-practice, without WCAG tags. A WCAG-tag-only scan therefore omits it; the 4.1.2 mapping here is a manual assessment of the unnamed dialog interface.
- **modal-specialist**: Normative naming requirement: WAI-ARIA dialog role requires an author-provided accessible name: https://www.w3.org/TR/wai-aria-1.2/#dialog ; WCAG name/role/value context: https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html .
- **modal-specialist**: No visible close button is supplied; Escape and backdrop dismissal work. A visible Close control would improve discoverability and touch/screen-reader operation, but its absence is not scored as an independent failure here.
- **modal-specialist**: Mobile toggle aria-haspopup="true" describes a menu popup although the disclosed content is ordinary navigation links; remove aria-haspopup for a navigation disclosure and consider aria-controls. This recommendation is not scored independently.
- **modal-specialist**: No screenshots captured. Targeted runtime and axe evidence is saved to raw/modal-specialist-runtime.json; CSP bypass was enabled only in the isolated audit browser to inject axe.
- **playwright-scanner**: Full raw URL/node incidence retained in raw/runtime-inventory.json; do not score each repeated node separately.
- **playwright-scanner**: Text-spacing-only horizontal overflow is retained as supporting responsive evidence rather than automatically labelled a separate 1.4.12 failure.
- **playwright-scanner**: No screenshots and no production feedback submissions were used.
- **playwright-scanner**: Browser automation and axe cannot establish complete WCAG conformance or replace native screen-reader testing.
- **tables-data-specialist**: Table captions, header scope/headers, merged cells, responsive data-table relationships, selection, sorting and virtual-grid keyboard operation are not applicable to the inspected production content.
- **tables-data-specialist**: Default RichTextBlock and AnnotatedTextBlock are available to editors, but no table block or custom richtext table feature was found; source capability alone does not establish inaccessible live tables.
- **tables-data-specialist**: Screenshots of Wagtail administrative listings embedded in documentation are images, not live data tables on this site; image accessibility is covered by the relevant specialist.
- **testing-coach**: Coverage is a site-wide deep inspection of discovered public routes and shared components, not proof of WCAG conformance. Report exact completed crawl and responsive counts from final raw artifacts; do not report discovered, failed or pending addresses as successfully audited.
- **testing-coach**: The generated numerical score grades this finding set. It is not a percentage of WCAG criteria satisfied, certification, or evidence that unflagged content conforms. List advisory n/a findings separately from conformance failures.
- **testing-coach**: Native screen-reader speech was not tested. Chromium accessibility-tree output supports role/name/state evidence but cannot establish actual NVDA, JAWS, VoiceOver or TalkBack announcements. Screenshots were explicitly excluded.
- **testing-coach**: Before closing remediation, test NVDA with Firefox and Chrome on Windows, VoiceOver with Safari on macOS/iOS, and TalkBack with Chrome on Android. Start with home, long Manage pages article, forms guide, a translated article, Arabic RTL home, search results and a translated 404.
- **testing-coach**: Native screen-reader checklist: announce page title/language and browse headings/landmarks; follow skip link; identify current navigation page; confirm theme checked state; open mobile navigation and search; traverse overlays both directions; close and verify focus return; open search on a full search page; announce search results/no results; activate Copy page/link/prompt and verify success/failure; rate helpfulness, enter feedback and submit; verify outcome announcements and useful focus after removed controls.
- **testing-coach**: Localization checklist: verify speech switches for real translated passages, RTL reading/focus order, translated control names/error messages, fallback routes and search/404 html lang. Review instructional image alternatives against source screenshots with an editor when visual inspection is permitted. Textual alt presence alone does not establish equivalent information.
- **testing-coach**: Responsive checks at 320 CSS pixels approximate the reflow width associated with 400% desktop zoom, but do not replace actual browser zoom or 200% text-only zoom. Complete Firefox text-only enlargement and Chromium/Safari 200%/400% zoom checks; also test physical portrait/landscape, mobile browser zoom, focus indicators and target size/spacing.
- **testing-coach**: Emulated forced-colors and reduced-motion preferences identify rendering differences but do not replace native Windows High Contrast and device tests. No flashing or required time-based task was found; animations and preference support still require review where new content is added.
- **testing-coach**: Add Django assertions that normal/search/404 HTML has a valid locale language and distinct search-input IDs with correctly associated labels. Extend Vitest behavior tests to theme initial/toggled accessibility state and aria-current, alongside existing menu expanded-state assertions.
- **testing-coach**: Add Playwright with @axe-core/playwright against a local Django fixture server in CI, after frontend build and database setup. Include WCAG 2.2 AA tags plus supplemental aria-dialog-name; scan initial and open states across home/article/search/404, light/dark and narrow/wide widths. Inject axe using its library with CSP handled explicitly; initial failed script injections are tooling errors, not site accessibility failures.
- **testing-coach**: Add browser behavioral regressions for keyboard overlay traversal/focus visibility, modal opening on search pages, named dialogs, live count announcements, clipboard success/failure and feedback success/failure. Intercept feedback POSTs so CI and production smoke tests never create genuine feedback records.
- **testing-coach**: Unit tests alone cannot measure real CSS visibility, overlap, contrast, reflow or accessibility-tree behavior. Browser assertions should verify user-observable outcomes, not just mirror class changes.
- **testing-coach**: Run a focused re-audit after each remediation group, then repeat the complete discovered-route crawl and state matrix before release. Run shared-component smoke tests on each pull request and full production content scans periodically and after major CMS content/template changes; establish persistent finding IDs for future deltas.
- **testing-coach**: Applicability requires continued review: WCAG 2.5.7 Dragging Movements, 3.3.7 Redundant Entry and 3.3.8 Accessible Authentication currently have no identified public-guide trigger, rather than being proved universally inapplicable. Public accessibility of admin authentication is a separate scope.
- **testing-coach**: Cognitive review should emphasize clear labels and instructions under 2.4.6/3.3.2, consistent shared navigation/help under 3.2.3/3.2.6 and understandable feedback/errors. Reading level under 3.1.5 is AAA and should not be presented as an AA failure.
- **testing-coach**: Clipboard Copy page name mutations may be announced by some assistive technology when focused; the strongest unannounced success evidence is Copy link/prompt changing a different control. Feedback comment success removes the form without visible confirmation: distinguish that absence and focus loss from an existing visible unannounced status message.
- **testing-coach**: Full criterion-by-criterion coverage matrix saved in raw/wcag-coverage.json: all 55 WCAG 2.2 A/AA criteria, excluding removed 4.1.1. Status distinguishes confirmed failures, no issue found in tested scope, inapplicable public flow, and human verification still required.
- **testing-coach**: Final validated scope:149 content paths/153 successful HTML addresses,43 HTML errors; dark desktop and 320 px mobile sweep completed for all 153 successful HTML addresses, excluding the plaintext synthetic wrapper.

## Next steps

1. Fix the 8 blocking findings above, starting with any repeated component.
2. Re-run this audit and check the delta section for regressions.
3. Wire the scan into continuous integration so the next regression is caught before review.

Automated checks find a minority of accessibility barriers. A passing score is a floor, not a guarantee.

## Audit scope and methodology

| Field | Value |
| --- | --- |
| Target | WCAG 2.2 AA |
| Production | https://guide.wagtail.org |
| Source revision | 31a4547eb1f6de55baea84269723313784f6b544 |
| Tool versions | Chromium 152.0.7977.82; Playwright 1.58.2; axe-core 4.11.1 (full crawl and state sweeps); axe CLI 4.13.0 (homepage cross-check) |
| Crawl | 238 navigations; 196 unique final HTML addresses; 153 successful addresses (149 distinct content paths, plus version aliases); 43 linked error addresses |
| Languages | English, Icelandic, French, Brazilian Portuguese, Arabic |
| Axe tags | wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa |
| Additional states | 11 baseline/search/copy/feedback snapshots; keyboard, AX and tooltip checks stored separately |
| Full sweep | 153 successful HTML addresses tested in dark theme, at 320 CSS px, and with WCAG text-spacing overrides |
| Screenshots | None captured or inspected |
| Production writes | Production POST requests intercepted and fulfilled locally for all feedback-state testing |
| Scan configuration | No .a11y-web-config.json found; default rule coverage expanded to WCAG 2.2 AA and crawl limit lifted for explicitly requested full site |
| Excluded | Authenticated /admin/; API/JSON endpoints; raw Markdown and other non-HTML downloads; external destinations |

Discovery followed the sitemap and every same-origin public HTML link found, including translated navigation, version redirects and broken destinations. Fragments were checked against heading IDs. Query-driven search and interaction states were tested separately. Non-HTML Markdown resources were excluded from WCAG HTML findings, including one synthetic browser document generated for a plaintext SKILL.md response. Source review used the local revision above; the deployed revision was not independently identified.

16 findings identify WCAG A/AA failures; 5 findings are explicitly marked n/a and are usability, content or structural recommendations. Repeated instances are grouped by root cause, so fixing one shared component can address many pages. The generated headline score is the skill renderer’s finding-set score, not a percentage of WCAG criteria met or a conformance certificate.

The shipped scorer uses weights critical=10, serious=5, moderate=2 and minor=1, adjusted by confidence, and normalizes against findings plus named passed checks. Its grade thresholds are A≥90, B≥80, C≥70, D≥60, otherwise F. This implementation differs from the prose scoring example in the wizard reference; this report consistently uses the required renderer implementation.

Evidence and reproducibility: [audit history](.a11y-history/2026-10-06-production/), [raw crawl](.a11y-history/2026-10-06-production/raw/crawl.json), [responsive sweep](.a11y-history/2026-10-06-production/raw/responsive.json), [interaction states](.a11y-history/2026-10-06-production/raw/states.json), [runtime inventory](.a11y-history/2026-10-06-production/raw/runtime-inventory.json). Reproduction scripts and settings are saved beside the raw evidence.

## Findings evidence and verification

The source excerpts below show the reviewed implementation. Apply the adjacent remediation in the findings table, then use the verification step to check the result. Content findings require editing the published CMS content as well as any exported source.

### 1. CONTRAST-001: Added-version badges have insufficient text contrast in the light theme.

**serious; 1.4.3 AA; confidence high** — apps/frontend/static_src/scss/components/version-badge.scss:21

**Evidence:** Production manage-pages, reports, content-checks and account-settings: foreground #007d7e on #e0eff0 = 4.19:1; text is 14.4px. axe-core 4.11.1 confirms the failure.

Reviewed source excerpt:

```scss
    );
    color: light-dark($color--teal, $color--light-teal);
  }

```

**Remediation:** Use a darker teal foreground or lighter badge background that reaches at least 4.5:1 for the 14.4px badge text; verify all badge variants in both themes.

**Verify:** Repeat computed contrast and axe checks in light/dark themes and forced-colors mode as applicable.

### 2. CONTRAST-002: Links inside light-theme note and warning panels fail the 4.5:1 text contrast requirement.

**serious; 1.4.3 AA; confidence high** — apps/frontend/static_src/scss/components/alert.scss:38

**Evidence:** Production manage-users-and-roles and promote-search-results: #007d7e on #e0eff0 = 4.19:1. manage-snippets warning link: #007d7e on #e6e3f1 = 3.92:1. Text is 18px normal, requiring 4.5:1.

Reviewed source excerpt:

```scss

    #{$root}__content {
      background-color: light-dark($color--extra-light-teal, $color--black);
    }
```

**Remediation:** Give alert-content links a darker foreground that reaches 4.5:1 against both #e0eff0 and #e6e3f1, while retaining an underline and distinct hover/focus states.

**Verify:** Repeat computed contrast and axe checks in light/dark themes and forced-colors mode as applicable.

### 3. KEYBOARD-MOBILE-OVERLAY-FOCUS: The open mobile navigation lets Tab move to background controls that the menu completely covers.

**serious; 2.4.11 AA; confidence high** — apps/frontend/static_src/js/mobile-menu/index.js:42

**Evidence:** Live Chromium at 390×844: Space opens the menu; after 44 navigation links, Tab focuses Light mode, Copy page, copy options and English behind nav.primary-nav.is-visible. Their centres hit the opaque menu, while aria-expanded stays true. Escape leaves the menu open. See raw/keyboard-mobile.json.

Reviewed source excerpt:

```javascript
    this.node.classList.add('is-open');
    this.node.setAttribute('aria-expanded', 'true');
    this.body.classList.add('no-scroll');
    this.mobileMenu.classList.add('is-visible');
```

**Remediation:** Close the mobile navigation when focus moves outside its toggle and navigation, or implement an accessible modal menu with background inertness, focus containment, Escape dismissal and focus restoration. Keep the toggle available to close the menu.

**Verify:** Use Tab, Shift+Tab, Enter/Space and Escape on desktop/mobile; confirm names/state and that no focused control is obscured.

### 4. LANG-SHARED-001: Search and 404 pages have an empty document language.

**serious; 3.1.1 A; confidence high** — apps/core/templates/base.html:7

**Evidence:** 404 GET /en/a11y-audit-nonexistent-page/ renders <html lang="">; root browser evidence raw/states.json confirms empty document language in blank/results/empty search pages too. These views lack a page instance.

Reviewed source excerpt:

```html
<!DOCTYPE html>
<html lang="{% block lang %}{{ self.locale.language_code }}{% endblock %}" dir="{% if LANGUAGE_BIDI %}rtl{% else %}ltr{% endif %}" class="no-js">
    <head>
        <meta charset="utf-8" />
```

**Remediation:** Use the active Django LANGUAGE_CODE as a fallback when self.locale.language_code is absent, and verify blank/results/empty search pages and nonexistent URLs in English and translated locales.

Example remediation (adapt translations and component wiring):

```html
<html lang="{{ self.locale.language_code|default:LANGUAGE_CODE }}">
```

**Verify:** Inspect the HTML lang attributes and verify pronunciation with a screen reader on the affected locales/search/error pages.

### 5. LANG-UNTRANSLATED-PARTS-001: Substantial English fallback content inherits the translated page language without a language override.

**serious; 3.1.2 AA; confidence high** — https://guide.wagtail.org/fr/

**Evidence:** /fr/ lang=fr: introduction begins Welcome to the Wagtail user guide; /is/reference/content-checks/ lang=is: English Content quality checks are present in the CMS paragraph; /pt-br/how-to-guides/manage-forms/ lang=pt-br: English Wagtail provides a flexible form builder paragraph; /ar/about/ lang=ar: English The User Guide is a website paragraph. None has lang=en ancestors.

**Remediation:** Translate fallback content, or explicitly mark English introductions/article blocks and other English passages lang=en while retaining the correct language for translated UI. Track the actual language of CMS translation segments so templates can render accurate language attributes.

Example remediation (adapt translations and component wiring):

```html
<!-- Keep the page language correct and mark each untranslated English region. -->
<div lang="en">…English source content…</div>
```

**Verify:** Inspect the HTML lang attributes and verify pronunciation with a screen reader on the affected locales/search/error pages.

### 6. LIVE-001: Asynchronous search result counts and no-results messages are not exposed as status messages.

**serious; 4.1.3 AA; confidence high** — apps/core/templates/components/search_modal.html:13

**Evidence:** Independent production query page returns 3 results found and 3 anchors; focus stays on #search and live regions are empty. Zero-result states likewise use a plain heading. main.js:28–43 updates counts without status semantics.

Reviewed source excerpt:

```html
            <div class="autocomplete">
                <div data-results-count-container></div>
                <div class="autocomplete__container" data-results></div>
            </div>
```

**Remediation:** Give the persistent count container role="status" and aria-atomic="true"; update a stable text node after the latest search finishes, announce loading for prolonged requests, and avoid making the entire result list live.

Example remediation (adapt translations and component wiring):

```html
<div data-results-count-container role="status" aria-atomic="true"></div>
```

**Verify:** Verify success, empty and error outcomes with NVDA and VoiceOver while focus remains on the invoking control; intercept feedback POSTs.

### 7. LIVE-003: The visible feedback-rating acknowledgement lacks status semantics.

**serious; 4.1.3 AA; confidence high** — apps/frontend/static_src/js/feedback/index.js:44

**Evidence:** Mocked rating-success runtime confirms a plain Thanks for your feedback! span and no live regions. Source comment submission removes its form at line 67 without a confirmation; this separate outcome omission is a usability concern.

Reviewed source excerpt:

```javascript
      });
      feedbackContainer.innerHTML = `<span dir="auto">${gettext(
        'Thanks for your feedback!',
      )}</span>`;
```

**Remediation:** Add a persistent status region outside replaceable feedback/form content; announce rating receipt and successful comment submission after checked successful responses, and expose failures with an accessible retry path.

Example remediation (adapt translations and component wiring):

```html
<p data-feedback-status role="status" aria-atomic="true"></p>
<!-- Keep this node outside containers whose children are removed. -->
```

**Verify:** Verify success, empty and error outcomes with NVDA and VoiceOver while focus remains on the invoking control; intercept feedback POSTs.

### 8. REFLOW-001: The Icelandic page-tools row overflows the 320px viewport and pushes the language control offscreen.

**serious; 1.4.10 AA; confidence high** — apps/frontend/static_src/scss/components/page-tools.scss:4

**Evidence:** Independent production verification: /is/ document scrollWidth 347 at viewport320, increasing to414 with WCAG text spacing; /is/how-to/finding-your-way-around/ 323→395. The overflowing element is the Íslenska language-selector toggle.

Reviewed source excerpt:

```scss
  z-index: 4;
  display: flex;
  justify-content: flex-end;
  margin-bottom: ($gutter * 2);
```

**Remediation:** Allow the shared page-tools flex row to wrap or stack at narrow widths; ensure each control can shrink or wrap translated text and remain fully operable within 320 CSS px. Verify long translations with text spacing and enlarged text.

Example remediation (adapt translations and component wiring):

```css
.page-tools { flex-wrap: wrap; }
.language-selector { min-inline-size: 0; }
.language-selector__toggle { white-space: normal; overflow-wrap: anywhere; }
```

**Verify:** At 320 CSS px and 400% desktop zoom, confirm all page tools and text remain available without two-dimensional scrolling; repeat text-spacing overrides.

### 9. ARIA-MOBILE-POPUP-001: The mobile navigation toggle advertises an ARIA menu popup although its content is ordinary navigation.

**moderate; 4.1.2 A; confidence high** — apps/core/templates/components/header.html:26

**Evidence:** The toggle has aria-haspopup=true (equivalent to menu), but opens <nav class=primary-nav><ul> with ordinary links rather than a menu widget. mobile-menu/index.js correctly updates aria-expanded.

Reviewed source excerpt:

```html
            <div class="header__burger">
                <button class="burger" data-mobile-menu-toggle aria-haspopup="true" aria-expanded="false" aria-label="{% trans 'Mobile menu toggle' %}">
                    <span class="burger__line"></span>
                    <span class="burger__line"></span>
```

**Remediation:** Remove aria-haspopup=true from this disclosure button; retain the updated aria-expanded state and optionally add aria-controls pointing to an ID on the navigation container. Keep native navigation links instead of adding menu roles.

Example remediation (adapt translations and component wiring):

```html
<button aria-expanded="false" aria-controls="primary-navigation">…</button>
<nav id="primary-navigation">…</nav>
```

**Verify:** Use Tab, Shift+Tab, Enter/Space and Escape on desktop/mobile; confirm names/state and that no focused control is obscured.

### 10. ARIA-NAV-CURRENT-001: The visually highlighted current navigation page is not identified programmatically.

**moderate; 1.3.1 A; confidence high** — apps/frontend/static_src/js/active-nav-item/index.js:5

**Evidence:** On /en/how-to-guides/manage-pages/ the link has class navigation__link active; CSS changes its background and foreground. Its Chromium AX properties contain URL/focusable only, with no current state.

Reviewed source excerpt:

```javascript
    if (new URL(link.href).pathname === window.location.pathname) {
      link.classList.add('active');
    }
  });
```

**Remediation:** When matching the current pathname, set aria-current=page on that link alongside the active class. Ensure exactly the current page link is marked.

Example remediation (adapt translations and component wiring):

```html
currentLink.classList.add("active");
currentLink.setAttribute("aria-current", "page");
```

**Verify:** Navigate to multiple articles and confirm only the current link exposes aria-current=page.

### 11. ARIA-THEME-STATE-001: The light/dark toggle exposes neither its selected state nor a changing action name.

**moderate; 4.1.2 A; confidence high** — apps/core/templates/components/theme_toggle.html:5

**Evidence:** Chromium AX tree before/after click exposes the same button name Toggle between dark and light theme and no checked/pressed state; body.theme-dark changes false to true. aria-label overrides the CSS-switched inner Light mode/Dark mode text.

Reviewed source excerpt:

```html
    <span class="theme-toggle__label">{% trans 'Dark' %}</span>
    <button id="wagtail-theme" class="theme-toggle__button" type="button" aria-label="{% trans 'Toggle between dark and light theme' %}">
        <span class="dark-only u-sr-only">{% trans 'Light mode' %}</span>
        <span class="light-only u-sr-only">{% trans 'Dark mode' %}</span>
```

**Remediation:** Use a native checkbox or button role=switch with aria-checked, or a toggle button with aria-pressed and stable Dark mode name; synchronize initial and changed state in blocking.js. Alternatively announce the next action with a changing button name.

Example remediation (adapt translations and component wiring):

```html
<button aria-label="Dark mode" aria-pressed="false">…</button>
// Synchronize at initialization and after theme changes.
button.setAttribute("aria-pressed", String(isDark));
```

**Verify:** Toggle with Enter/Space and confirm the accessibility tree and screen reader expose the correct selected state after initial load and each change.

### 12. CONTRAST-003: The theme switch becomes visually indistinguishable from its background in forced-colors mode.

**moderate; 1.4.11 AA; confidence high** — apps/frontend/static_src/scss/components/theme-toggle.scss:16

**Evidence:** Chromium forcedColors: active on production homepage: switch background, ::before and ::after all rgb(255,255,255), border 0px none; no visible switch boundary or thumb remains.

Reviewed source excerpt:

```scss

  &__button {
    padding: 0;
    width: 48px;
```

**Remediation:** Add a forced-colors style using system colors and a visible border or system-color icon so the switch and its state remain discernible; retain native color adjustment where possible.

**Verify:** Repeat computed contrast and axe checks in light/dark themes and forced-colors mode as applicable.

### 13. FORM-SEARCH-DUPLICATE-LABEL-TARGET: On full search pages, the modal Search label is associated with the main-page input instead of its own input.

**moderate; 1.3.1 A; confidence high** — apps/search/templates/search/search.html:11

**Evidence:** Live /en/search/?query=pages contains two input#search elements. The main input.labels contains both Search labels; modal input.labels is empty. Opening the modal exposes textbox "Search…" from its placeholder instead of its explicit label. See raw/forms-runtime.json.

Reviewed source excerpt:

```html
    <label for="search" class="u-sr-only">Search</label>
    <input type="text" id="search" name="query" toolparamdescription="Search query."{% if search_query %} value="{{ search_query }}"{% endif %}>
    <button class="button">
        {% trans 'Search' %}
```

**Remediation:** Use distinct ids such as page-search and modal-search, updating each label for attribute to match its respective input. Preserve the modal data-search-input selector and search query field name.

Example remediation (adapt translations and component wiring):

```html
<label for="page-search">Search</label>
<input id="page-search" name="query">
<!-- Modal has its own unique id. -->
<label for="modal-search">Search</label>
<input id="modal-search" name="query" data-search-input>
```

**Verify:** Open search from the full search page and confirm input.labels and accessibility-tree names point to each corresponding field.

### 14. LINK-001: The language selector offers Arabic translations whose unresolved URLs become relative None links and return 404.

**moderate; n/a; confidence high** — apps/core/templatetags/core_tags.py:78

**Evidence:** 43 distinct crawled successful pages expose an Arabic link with href="None", across English, Icelandic, French and Portuguese. The crawl confirms /en/getting-started/overview/None/ returns 404.

Reviewed source excerpt:

```python
        "request": context.get("request"),
        "translations": translations,
        "LANGUAGE_CODE": get_language(),
    }
```

**Remediation:** Restrict language-selector translations to public, routable pages and resolve each URL before rendering; omit unavailable translations or link explicitly to a valid locale landing page. Reuse the existing hreflangs URL-validation approach.

**Verify:** Follow each affected link from its source page and confirm a public translated destination returns HTTP 200.

### 15. LIVE-002: Copy-link and copy-prompt success changes a different control’s label without an announced status.

**moderate; 4.1.3 AA; confidence high** — apps/frontend/static_src/js/copy-button.js:67

**Evidence:** copy-success runtime confirms Copied! appears without live regions. Source handleCopyLink and handleCopyPrompt call showFeedback(this.copyPage), changing a different button from the invoking control for 2000ms.

Reviewed source excerpt:

```javascript

  showFeedback(btn) {
    const btnText = btn.textContent;

```

**Remediation:** Keep copy control names stable and update a persistent role="status" aria-atomic="true" element with a concise translated success message for each copy action; retain focus on the invoking control.

Example remediation (adapt translations and component wiring):

```html
<span data-copy-status role="status" aria-atomic="true"></span>
// After a successful clipboard write, update this persistent region.
status.textContent = translatedCopiedMessage;
```

**Verify:** Verify success, empty and error outcomes with NVDA and VoiceOver while focus remains on the invoking control; intercept feedback POSTs.

### 16. MODAL-ACCESSIBLE-NAME: The open search dialog has no accessible name, so assistive technology cannot identify its purpose as a dialog.

**moderate; 4.1.2 A; confidence high** — apps/core/templates/components/search_modal.html:3

**Evidence:** Production open state: <div id="search-modal" tabindex="-1" aria-modal="true" role="dialog"> has no aria-label or aria-labelledby. Chromium accessibility snapshot begins "- dialog:" with no name; textbox alone is named Search. Explicit axe aria-dialog-name run fails.

Reviewed source excerpt:

```html

<div class="search modal fade" id="search-modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
```

**Remediation:** Give the dialog an accessible name with a translated aria-label="Search", or add a visible Search heading and reference its id with aria-labelledby. Retain the separate Search label for the input.

Example remediation (adapt translations and component wiring):

```html
<div id="search-modal" class="search modal fade" tabindex="-1"
     aria-label="{% trans 'Search' %}" aria-hidden="true">…</div>
```

**Verify:** Use Tab, Shift+Tab, Enter/Space and Escape on desktop/mobile; confirm names/state and that no focused control is obscured.

### 17. TOOLTIP-FEEDBACK-NOT-HOVERABLE: Feedback tooltips disappear when the pointer moves from their button onto the tooltip content.

**moderate; 1.4.13 AA; confidence high** — apps/core/templates/components/feedback.html:8

**Evidence:** Live Manage pages: hovering Happy displays This page was helpful. Moving the pointer into the tooltip rectangle (691,387;170×33) removes it within 500ms; Escape while hovering leaves it visible. Keyboard focus alone does not reveal it. See raw/tooltip-runtime.json.

Reviewed source excerpt:

```html
        <div class="feedback__options">
            <button class="feedback__button" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="{% trans 'This page was helpful' %}" data-bs-trigger="hover" data-happy-button aria-label="{% trans 'Happy' %}">
                {% include "./svg/happy.svg" %}
            </button>
```

**Remediation:** Keep the tooltip visible while the pointer is over either its trigger or tooltip and provide Escape dismissal; consider visible helpful/not helpful labels that remove the need for explanatory hover content.

Example remediation (adapt translations and component wiring):

```html
<!-- One option: replace hover-only explanations with visible action labels. -->
<button type="button">{% trans 'This page was helpful' %}</button>
```

**Verify:** Move the pointer onto the tooltip and press Escape; content should persist while hovered and be dismissible when required.

### 18. HEADINGS-RELEASE-001: Wagtail 6.4 release topics use H3 for top-level article sections.

**minor; n/a; confidence high** — content/en/releases/new-in-wagtail-6-4.md:12

**Evidence:** The page uses H1 New in Wagtail 6.4, H2 On this page, then H3 Previews for StreamField Blocks, Alt text management enhancements, Drag-and-drop reordering for StreamField, Search terms report, Additional user interface improvements.

Reviewed source excerpt:

```html

### Previews for StreamField Blocks

![Block chooser in StreamField, with a block being previewed](https://guide-media.wagtail.org/images/block_chooser_and_preview_focus.width-900.png)
```

**Remediation:** Change the five release topic headings from H3 to H2 in CMS content and the corresponding export; these topics are siblings of the contents panel, rather than subsections of its On this page heading.

**Verify:** Recheck the affected component/content after the proposed remediation.

### 19. LANDMARK-NAMES-001: Repeated navigation landmarks have no distinct accessible names.

**minor; n/a; confidence high** — apps/core/templates/components/navigation.html:3

**Evidence:** English home has <nav class="skip-link"> and <nav class="primary-nav" data-mobile-menu>; content pages also have <nav class="nav-buttons">. None has aria-label or aria-labelledby.

Reviewed source excerpt:

```html

<nav class="primary-nav" data-mobile-menu>
    {% for item, info in annotated_list %}
        {% if info.open %}
```

**Remediation:** Label primary navigation and previous/next navigation distinctly; remove the unnecessary nav wrapper around the standalone skip link or give it a distinct name. Verify landmark navigation exposes clear purposes.

**Verify:** Recheck the affected component/content after the proposed remediation.

### 20. LINK-002: The current-status reference link leads to a removed English URL and returns 404.

**minor; n/a; confidence high** — content/en/how-to-guides/find-your-way-around.md:62

**Evidence:** Production /en/how-to-guides/find-your-way-around/ links current status of the page to /en/reference/page-status-definitions/; the crawl records status 404 for that URL.

Reviewed source excerpt:

```html

The panel also shows the date that you last edited the pages as well as the [current status of the page](/en/reference/page-status-definitions/)s.

#### Your locked pages
```

**Remediation:** Update the CMS source and exported Markdown link to the current page-status reference location, and provide a redirect from /en/reference/page-status-definitions/ where practical.

**Verify:** Follow each affected link from its source page and confirm a public translated destination returns HTTP 200.

### 21. LINK-003: The French homepage Guides pratiques card leads to a missing French section and returns 404.

**minor; n/a; confidence high** — https://guide.wagtail.org/fr/

**Evidence:** Production /fr/ exposes a Guides pratiques card linking to https://guide.wagtail.org/fr/how-to-guides/; the live crawl records HTTP 404 for that destination.

**Remediation:** Publish the French how-to section or update the CMS card to a valid translated destination; suppress links to unavailable sections until a usable landing page exists.

**Verify:** Follow each affected link from its source page and confirm a public translated destination returns HTTP 200.

## Axe-core scan results

See [ACCESSIBILITY-SCAN.md](ACCESSIBILITY-SCAN.md) for the complete automated state matrix and [ACCESSIBILITY-SCAN.json](ACCESSIBILITY-SCAN.json) for machine-readable results.

The complete scan is stored as JSON. The scorecard below covers initial rendered HTML; interaction and manual findings above can fail even when this baseline has zero axe violations. Each row uses the shipped scorer with failed rule types and the number of passing axe rules; its score is diagnostic only.

| Final HTML address | HTTP | Baseline score | Axe failing rules (nodes) | Passed rules | Manual-review rules | 320px document width |
| --- | --- | --- | --- | --- | --- | --- |
| [/ar/](https://guide.wagtail.org/ar/) | 200 | 100 (A) | 0 | 24 | 0 | 320 |
| [/ar/about/](https://guide.wagtail.org/ar/about/) | 200 | 100 (A) | 0 | 24 | 0 | 320 |
| [/ar/about/None/](https://guide.wagtail.org/ar/about/None/) | 404 | 95 (A) | html-has-lang (1) | 19 | 0 | — |
| [/en/](https://guide.wagtail.org/en/) | 200 | 100 (A) | 0 | 25 | 1 | 320 |
| [/en/about/](https://guide.wagtail.org/en/about/) | 200 | 100 (A) | 0 | 25 | 0 | 320 |
| [/en/concepts/](https://guide.wagtail.org/en/concepts/) | 200 | 100 (A) | 0 | 25 | 1 | 320 |
| [/en/concepts/accessibility-features/](https://guide.wagtail.org/en/concepts/accessibility-features/) | 200 | 100 (A) | 0 | 26 | 1 | 320 |
| [/en/concepts/page-status/](https://guide.wagtail.org/en/concepts/page-status/) | 200 | 100 (A) | 0 | 25 | 0 | 320 |
| [/en/concepts/page-status/?target_version=latest](https://guide.wagtail.org/en/concepts/page-status/?target_version=latest) | 200 | 100 (A) | 0 | 25 | 0 | 320 |
| [/en/concepts/pages/](https://guide.wagtail.org/en/concepts/pages/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/en/concepts/pages/None/](https://guide.wagtail.org/en/concepts/pages/None/) | 404 | 95 (A) | html-has-lang (1) | 20 | 1 | — |
| [/en/concepts/reports/](https://guide.wagtail.org/en/concepts/reports/) | 200 | 96 (A) | color-contrast (2) | 25 | 0 | 320 |
| [/en/concepts/reports/None/](https://guide.wagtail.org/en/concepts/reports/None/) | 404 | 95 (A) | html-has-lang (1) | 20 | 1 | — |
| [/en/concepts/scheduled-publishing/](https://guide.wagtail.org/en/concepts/scheduled-publishing/) | 200 | 100 (A) | 0 | 25 | 0 | 320 |
| [/en/concepts/users-status/](https://guide.wagtail.org/en/concepts/users-status/) | 200 | 100 (A) | 0 | 25 | 0 | 320 |
| [/en/concepts/users-status/None/](https://guide.wagtail.org/en/concepts/users-status/None/) | 404 | 95 (A) | html-has-lang (1) | 20 | 1 | — |
| [/en/concepts/wagtail-interfaces/](https://guide.wagtail.org/en/concepts/wagtail-interfaces/) | 200 | 100 (A) | 0 | 25 | 0 | 320 |
| [/en/concepts/wagtail-interfaces/?target_version=latest](https://guide.wagtail.org/en/concepts/wagtail-interfaces/?target_version=latest) | 200 | 100 (A) | 0 | 25 | 0 | 320 |
| [/en/concepts/wagtail-interfaces/None/](https://guide.wagtail.org/en/concepts/wagtail-interfaces/None/) | 404 | 95 (A) | html-has-lang (1) | 20 | 1 | — |
| [/en/getting-started/](https://guide.wagtail.org/en/getting-started/) | 200 | 100 (A) | 0 | 25 | 1 | 320 |
| [/en/getting-started/overview/](https://guide.wagtail.org/en/getting-started/overview/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/en/getting-started/overview/None/](https://guide.wagtail.org/en/getting-started/overview/None/) | 404 | 95 (A) | html-has-lang (1) | 20 | 1 | — |
| [/en/how-to-guides/](https://guide.wagtail.org/en/how-to-guides/) | 200 | 100 (A) | 0 | 25 | 1 | 320 |
| [/en/how-to-guides/configure-workflows-for-moderation/](https://guide.wagtail.org/en/how-to-guides/configure-workflows-for-moderation/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/en/how-to-guides/find-your-way-around/](https://guide.wagtail.org/en/how-to-guides/find-your-way-around/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/en/how-to-guides/find-your-way-around/?target_version=latest](https://guide.wagtail.org/en/how-to-guides/find-your-way-around/?target_version=latest) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/en/how-to-guides/find-your-way-around/None/](https://guide.wagtail.org/en/how-to-guides/find-your-way-around/None/) | 404 | 95 (A) | html-has-lang (1) | 20 | 1 | — |
| [/en/how-to-guides/manage-collections/](https://guide.wagtail.org/en/how-to-guides/manage-collections/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/en/how-to-guides/manage-documents/](https://guide.wagtail.org/en/how-to-guides/manage-documents/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/en/how-to-guides/manage-documents/None/](https://guide.wagtail.org/en/how-to-guides/manage-documents/None/) | 404 | 95 (A) | html-has-lang (1) | 20 | 1 | — |
| [/en/how-to-guides/manage-forms/](https://guide.wagtail.org/en/how-to-guides/manage-forms/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/en/how-to-guides/manage-images/](https://guide.wagtail.org/en/how-to-guides/manage-images/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/en/how-to-guides/manage-images/None/](https://guide.wagtail.org/en/how-to-guides/manage-images/None/) | 404 | 95 (A) | html-has-lang (1) | 20 | 1 | — |
| [/en/how-to-guides/manage-pages/](https://guide.wagtail.org/en/how-to-guides/manage-pages/) | 200 | 96 (A) | color-contrast (2) | 26 | 0 | 320 |
| [/en/how-to-guides/manage-pages/None/](https://guide.wagtail.org/en/how-to-guides/manage-pages/None/) | 404 | 95 (A) | html-has-lang (1) | 20 | 1 | — |
| [/en/how-to-guides/manage-redirects/](https://guide.wagtail.org/en/how-to-guides/manage-redirects/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/en/how-to-guides/manage-snippets/](https://guide.wagtail.org/en/how-to-guides/manage-snippets/) | 200 | 96 (A) | color-contrast (1) | 26 | 0 | 320 |
| [/en/how-to-guides/manage-users-and-roles/](https://guide.wagtail.org/en/how-to-guides/manage-users-and-roles/) | 200 | 96 (A) | color-contrast (1) | 26 | 0 | 320 |
| [/en/how-to-guides/promote-search-results/](https://guide.wagtail.org/en/how-to-guides/promote-search-results/) | 200 | 96 (A) | color-contrast (1) | 26 | 0 | 320 |
| [/en/how-to-guides/promote-search-results/?target_version=latest](https://guide.wagtail.org/en/how-to-guides/promote-search-results/?target_version=latest) | 200 | 96 (A) | color-contrast (1) | 26 | 0 | 320 |
| [/en/reference/](https://guide.wagtail.org/en/reference/) | 200 | 100 (A) | 0 | 25 | 1 | 320 |
| [/en/reference/account-settings/](https://guide.wagtail.org/en/reference/account-settings/) | 200 | 96 (A) | color-contrast (1) | 26 | 0 | 320 |
| [/en/reference/browser-compatibility/](https://guide.wagtail.org/en/reference/browser-compatibility/) | 200 | 100 (A) | 0 | 25 | 0 | 320 |
| [/en/reference/browser-compatibility/None/](https://guide.wagtail.org/en/reference/browser-compatibility/None/) | 404 | 95 (A) | html-has-lang (1) | 20 | 1 | — |
| [/en/reference/content-checks/](https://guide.wagtail.org/en/reference/content-checks/) | 200 | 96 (A) | color-contrast (2) | 26 | 0 | 320 |
| [/en/reference/page-status-definitions/](https://guide.wagtail.org/en/reference/page-status-definitions/) | 404 | 95 (A) | html-has-lang (1) | 20 | 1 | — |
| [/en/releases/](https://guide.wagtail.org/en/releases/) | 200 | 100 (A) | 0 | 25 | 0 | 320 |
| [/en/releases/new-in-wagtail-4-1/](https://guide.wagtail.org/en/releases/new-in-wagtail-4-1/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/en/releases/new-in-wagtail-4-2/](https://guide.wagtail.org/en/releases/new-in-wagtail-4-2/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/en/releases/new-in-wagtail-5-0/](https://guide.wagtail.org/en/releases/new-in-wagtail-5-0/) | 200 | 100 (A) | 0 | 25 | 0 | 320 |
| [/en/releases/new-in-wagtail-5-1/](https://guide.wagtail.org/en/releases/new-in-wagtail-5-1/) | 200 | 100 (A) | 0 | 25 | 0 | 320 |
| [/en/releases/new-in-wagtail-5-2/](https://guide.wagtail.org/en/releases/new-in-wagtail-5-2/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/en/releases/new-in-wagtail-6-0/](https://guide.wagtail.org/en/releases/new-in-wagtail-6-0/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/en/releases/new-in-wagtail-6-1/](https://guide.wagtail.org/en/releases/new-in-wagtail-6-1/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/en/releases/new-in-wagtail-6-2/](https://guide.wagtail.org/en/releases/new-in-wagtail-6-2/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/en/releases/new-in-wagtail-6-3/](https://guide.wagtail.org/en/releases/new-in-wagtail-6-3/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/en/releases/new-in-wagtail-6-3/None/](https://guide.wagtail.org/en/releases/new-in-wagtail-6-3/None/) | 404 | 95 (A) | html-has-lang (1) | 20 | 1 | — |
| [/en/releases/new-in-wagtail-6-4/](https://guide.wagtail.org/en/releases/new-in-wagtail-6-4/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/en/releases/new-in-wagtail-6-4/None/](https://guide.wagtail.org/en/releases/new-in-wagtail-6-4/None/) | 404 | 95 (A) | html-has-lang (1) | 20 | 1 | — |
| [/en/releases/new-in-wagtail-7-0/](https://guide.wagtail.org/en/releases/new-in-wagtail-7-0/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/en/releases/new-in-wagtail-7-0/None/](https://guide.wagtail.org/en/releases/new-in-wagtail-7-0/None/) | 404 | 95 (A) | html-has-lang (1) | 20 | 1 | — |
| [/en/releases/new-in-wagtail-7-1/](https://guide.wagtail.org/en/releases/new-in-wagtail-7-1/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/en/releases/new-in-wagtail-7-1/None/](https://guide.wagtail.org/en/releases/new-in-wagtail-7-1/None/) | 404 | 95 (A) | html-has-lang (1) | 20 | 1 | — |
| [/en/releases/new-in-wagtail-7-2/](https://guide.wagtail.org/en/releases/new-in-wagtail-7-2/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/en/releases/new-in-wagtail-7-3/](https://guide.wagtail.org/en/releases/new-in-wagtail-7-3/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/en/releases/new-in-wagtail-7-4/](https://guide.wagtail.org/en/releases/new-in-wagtail-7-4/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/en/releases/new-in-wagtail-8-0/](https://guide.wagtail.org/en/releases/new-in-wagtail-8-0/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/fr/](https://guide.wagtail.org/fr/) | 200 | 100 (A) | 0 | 24 | 0 | 320 |
| [/fr/commencement/](https://guide.wagtail.org/fr/commencement/) | 200 | 100 (A) | 0 | 24 | 0 | 320 |
| [/fr/concepts/scheduled-publishing/](https://guide.wagtail.org/fr/concepts/scheduled-publishing/) | 200 | 100 (A) | 0 | 24 | 0 | 320 |
| [/fr/fonctionnalites-d-accessibilite/](https://guide.wagtail.org/fr/fonctionnalites-d-accessibilite/) | 200 | 100 (A) | 0 | 25 | 1 | 320 |
| [/fr/how-to-guides/](https://guide.wagtail.org/fr/how-to-guides/) | 404 | 95 (A) | html-has-lang (1) | 19 | 0 | — |
| [/fr/how-to-guides/manage-forms/](https://guide.wagtail.org/fr/how-to-guides/manage-forms/) | 200 | 100 (A) | 0 | 25 | 0 | 320 |
| [/fr/reference/account-settings/](https://guide.wagtail.org/fr/reference/account-settings/) | 200 | 96 (A) | color-contrast (1) | 25 | 0 | 320 |
| [/fr/reference/content-checks/](https://guide.wagtail.org/fr/reference/content-checks/) | 200 | 96 (A) | color-contrast (2) | 25 | 0 | 320 |
| [/fr/releases/](https://guide.wagtail.org/fr/releases/) | 200 | 100 (A) | 0 | 24 | 0 | 320 |
| [/fr/releases/new-in-wagtail-5-1/](https://guide.wagtail.org/fr/releases/new-in-wagtail-5-1/) | 200 | 100 (A) | 0 | 24 | 0 | 320 |
| [/fr/releases/new-in-wagtail-5-2/](https://guide.wagtail.org/fr/releases/new-in-wagtail-5-2/) | 200 | 100 (A) | 0 | 25 | 0 | 320 |
| [/fr/releases/new-in-wagtail-6-1/](https://guide.wagtail.org/fr/releases/new-in-wagtail-6-1/) | 200 | 100 (A) | 0 | 25 | 0 | 320 |
| [/fr/releases/new-in-wagtail-6-3/](https://guide.wagtail.org/fr/releases/new-in-wagtail-6-3/) | 200 | 100 (A) | 0 | 25 | 0 | 320 |
| [/fr/releases/new-in-wagtail-6-3/None/](https://guide.wagtail.org/fr/releases/new-in-wagtail-6-3/None/) | 404 | 95 (A) | html-has-lang (1) | 19 | 0 | — |
| [/fr/releases/new-in-wagtail-6-4/](https://guide.wagtail.org/fr/releases/new-in-wagtail-6-4/) | 200 | 100 (A) | 0 | 25 | 0 | 320 |
| [/fr/releases/new-in-wagtail-6-4/None/](https://guide.wagtail.org/fr/releases/new-in-wagtail-6-4/None/) | 404 | 95 (A) | html-has-lang (1) | 19 | 0 | — |
| [/fr/releases/new-in-wagtail-60/](https://guide.wagtail.org/fr/releases/new-in-wagtail-60/) | 200 | 100 (A) | 0 | 25 | 0 | 320 |
| [/fr/releases/new-in-wagtail-62/](https://guide.wagtail.org/fr/releases/new-in-wagtail-62/) | 200 | 100 (A) | 0 | 25 | 0 | 320 |
| [/fr/releases/new-in-wagtail-7-0/](https://guide.wagtail.org/fr/releases/new-in-wagtail-7-0/) | 200 | 100 (A) | 0 | 25 | 0 | 320 |
| [/fr/releases/new-in-wagtail-7-0/None/](https://guide.wagtail.org/fr/releases/new-in-wagtail-7-0/None/) | 404 | 95 (A) | html-has-lang (1) | 19 | 0 | — |
| [/fr/releases/new-in-wagtail-7-1/](https://guide.wagtail.org/fr/releases/new-in-wagtail-7-1/) | 200 | 100 (A) | 0 | 25 | 0 | 320 |
| [/fr/releases/new-in-wagtail-7-1/None/](https://guide.wagtail.org/fr/releases/new-in-wagtail-7-1/None/) | 404 | 95 (A) | html-has-lang (1) | 19 | 0 | — |
| [/fr/releases/new-in-wagtail-7-2/](https://guide.wagtail.org/fr/releases/new-in-wagtail-7-2/) | 200 | 100 (A) | 0 | 25 | 0 | 320 |
| [/fr/releases/new-in-wagtail-7-3/](https://guide.wagtail.org/fr/releases/new-in-wagtail-7-3/) | 200 | 100 (A) | 0 | 25 | 0 | 320 |
| [/fr/releases/new-in-wagtail-7-4/](https://guide.wagtail.org/fr/releases/new-in-wagtail-7-4/) | 200 | 100 (A) | 0 | 25 | 0 | 320 |
| [/is/](https://guide.wagtail.org/is/) | 200 | 100 (A) | 0 | 25 | 1 | 347 |
| [/is/about/](https://guide.wagtail.org/is/about/) | 200 | 100 (A) | 0 | 25 | 0 | 352 |
| [/is/accessibility-features/](https://guide.wagtail.org/is/accessibility-features/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/is/accessibility-features/browser-level-user-interface-settings/](https://guide.wagtail.org/is/accessibility-features/browser-level-user-interface-settings/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/is/accessibility-features/global-navigation/](https://guide.wagtail.org/is/accessibility-features/global-navigation/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/is/accessibility-features/user-account-preferences/](https://guide.wagtail.org/is/accessibility-features/user-account-preferences/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/is/concepts/](https://guide.wagtail.org/is/concepts/) | 200 | 100 (A) | 0 | 25 | 1 | 320 |
| [/is/concepts/page-status/](https://guide.wagtail.org/is/concepts/page-status/) | 200 | 100 (A) | 0 | 25 | 0 | 320 |
| [/is/concepts/pages/](https://guide.wagtail.org/is/concepts/pages/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/is/concepts/pages/None/](https://guide.wagtail.org/is/concepts/pages/None/) | 404 | 95 (A) | html-has-lang (1) | 20 | 1 | — |
| [/is/concepts/reports/](https://guide.wagtail.org/is/concepts/reports/) | 200 | 100 (A) | 0 | 25 | 0 | 320 |
| [/is/concepts/reports/None/](https://guide.wagtail.org/is/concepts/reports/None/) | 404 | 95 (A) | html-has-lang (1) | 20 | 1 | — |
| [/is/concepts/scheduled-publishing/](https://guide.wagtail.org/is/concepts/scheduled-publishing/) | 200 | 100 (A) | 0 | 25 | 0 | 320 |
| [/is/concepts/users-status/](https://guide.wagtail.org/is/concepts/users-status/) | 200 | 100 (A) | 0 | 25 | 1 | 320 |
| [/is/concepts/users-status/None/](https://guide.wagtail.org/is/concepts/users-status/None/) | 404 | 95 (A) | html-has-lang (1) | 20 | 1 | — |
| [/is/concepts/wagtail-interfaces/](https://guide.wagtail.org/is/concepts/wagtail-interfaces/) | 200 | 100 (A) | 0 | 25 | 0 | 320 |
| [/is/concepts/wagtail-interfaces/None/](https://guide.wagtail.org/is/concepts/wagtail-interfaces/None/) | 404 | 95 (A) | html-has-lang (1) | 20 | 1 | — |
| [/is/contributing/](https://guide.wagtail.org/is/contributing/) | 200 | 100 (A) | 0 | 25 | 0 | 320 |
| [/is/how-to/](https://guide.wagtail.org/is/how-to/) | 200 | 100 (A) | 0 | 25 | 1 | 320 |
| [/is/how-to/configuring-moderation-workflows/](https://guide.wagtail.org/is/how-to/configuring-moderation-workflows/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/is/how-to/copying-and-aliasing-pages/](https://guide.wagtail.org/is/how-to/copying-and-aliasing-pages/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/is/how-to/creating-and-editing-pages/](https://guide.wagtail.org/is/how-to/creating-and-editing-pages/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/is/how-to/creating-and-editing-pages/None/](https://guide.wagtail.org/is/how-to/creating-and-editing-pages/None/) | 404 | 95 (A) | html-has-lang (1) | 20 | 1 | — |
| [/is/how-to/finding-your-way-around/](https://guide.wagtail.org/is/how-to/finding-your-way-around/) | 200 | 100 (A) | 0 | 26 | 1 | 323 |
| [/is/how-to/finding-your-way-around/None/](https://guide.wagtail.org/is/how-to/finding-your-way-around/None/) | 404 | 95 (A) | html-has-lang (1) | 20 | 1 | — |
| [/is/how-to/how-to-promote-search-results/](https://guide.wagtail.org/is/how-to/how-to-promote-search-results/) | 200 | 96 (A) | color-contrast (1) | 26 | 0 | 320 |
| [/is/how-to/manage-forms/](https://guide.wagtail.org/is/how-to/manage-forms/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/is/how-to/managing-collections/](https://guide.wagtail.org/is/how-to/managing-collections/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/is/how-to/managing-documents/](https://guide.wagtail.org/is/how-to/managing-documents/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/is/how-to/managing-documents/None/](https://guide.wagtail.org/is/how-to/managing-documents/None/) | 404 | 95 (A) | html-has-lang (1) | 20 | 1 | — |
| [/is/how-to/managing-images/](https://guide.wagtail.org/is/how-to/managing-images/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/is/how-to/managing-images/None/](https://guide.wagtail.org/is/how-to/managing-images/None/) | 404 | 95 (A) | html-has-lang (1) | 20 | 1 | — |
| [/is/how-to/managing-redirects/](https://guide.wagtail.org/is/how-to/managing-redirects/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/is/how-to/managing-snippets/](https://guide.wagtail.org/is/how-to/managing-snippets/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/is/how-to/managing-users-and-roles/](https://guide.wagtail.org/is/how-to/managing-users-and-roles/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/is/reference/](https://guide.wagtail.org/is/reference/) | 200 | 100 (A) | 0 | 25 | 1 | 320 |
| [/is/reference/account-settings/](https://guide.wagtail.org/is/reference/account-settings/) | 200 | 96 (A) | color-contrast (1) | 26 | 0 | 320 |
| [/is/reference/browser-issues/](https://guide.wagtail.org/is/reference/browser-issues/) | 200 | 100 (A) | 0 | 25 | 0 | 320 |
| [/is/reference/browser-issues/None/](https://guide.wagtail.org/is/reference/browser-issues/None/) | 404 | 95 (A) | html-has-lang (1) | 20 | 1 | — |
| [/is/reference/content-checks/](https://guide.wagtail.org/is/reference/content-checks/) | 200 | 96 (A) | color-contrast (2) | 26 | 0 | 320 |
| [/is/reference/wagtail-page-status-definitions/](https://guide.wagtail.org/is/reference/wagtail-page-status-definitions/) | 200 | 100 (A) | 0 | 25 | 1 | 320 |
| [/is/releases/](https://guide.wagtail.org/is/releases/) | 200 | 100 (A) | 0 | 25 | 1 | 320 |
| [/is/releases/new-in-wagtail-4-1/](https://guide.wagtail.org/is/releases/new-in-wagtail-4-1/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/is/releases/new-in-wagtail-4-2/](https://guide.wagtail.org/is/releases/new-in-wagtail-4-2/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/is/releases/new-in-wagtail-5-0/](https://guide.wagtail.org/is/releases/new-in-wagtail-5-0/) | 200 | 100 (A) | 0 | 25 | 0 | 320 |
| [/is/releases/new-in-wagtail-5-1/](https://guide.wagtail.org/is/releases/new-in-wagtail-5-1/) | 200 | 100 (A) | 0 | 25 | 0 | 320 |
| [/is/releases/new-in-wagtail-5-2/](https://guide.wagtail.org/is/releases/new-in-wagtail-5-2/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/is/releases/new-in-wagtail-6-0/](https://guide.wagtail.org/is/releases/new-in-wagtail-6-0/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/is/releases/new-in-wagtail-6-1/](https://guide.wagtail.org/is/releases/new-in-wagtail-6-1/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/is/releases/new-in-wagtail-6-3/](https://guide.wagtail.org/is/releases/new-in-wagtail-6-3/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/is/releases/new-in-wagtail-6-3/None/](https://guide.wagtail.org/is/releases/new-in-wagtail-6-3/None/) | 404 | 95 (A) | html-has-lang (1) | 20 | 1 | — |
| [/is/releases/new-in-wagtail-6-4/](https://guide.wagtail.org/is/releases/new-in-wagtail-6-4/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/is/releases/new-in-wagtail-6-4/None/](https://guide.wagtail.org/is/releases/new-in-wagtail-6-4/None/) | 404 | 95 (A) | html-has-lang (1) | 20 | 1 | — |
| [/is/releases/new-in-wagtail-62/](https://guide.wagtail.org/is/releases/new-in-wagtail-62/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/is/releases/new-in-wagtail-7-0/](https://guide.wagtail.org/is/releases/new-in-wagtail-7-0/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/is/releases/new-in-wagtail-7-0/None/](https://guide.wagtail.org/is/releases/new-in-wagtail-7-0/None/) | 404 | 95 (A) | html-has-lang (1) | 20 | 1 | — |
| [/is/releases/new-in-wagtail-7-1/](https://guide.wagtail.org/is/releases/new-in-wagtail-7-1/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/is/releases/new-in-wagtail-7-1/None/](https://guide.wagtail.org/is/releases/new-in-wagtail-7-1/None/) | 404 | 95 (A) | html-has-lang (1) | 20 | 1 | — |
| [/is/releases/new-in-wagtail-7-2/](https://guide.wagtail.org/is/releases/new-in-wagtail-7-2/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/is/releases/new-in-wagtail-7-3/](https://guide.wagtail.org/is/releases/new-in-wagtail-7-3/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/is/releases/new-in-wagtail-7-4/](https://guide.wagtail.org/is/releases/new-in-wagtail-7-4/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/is/tutorials/](https://guide.wagtail.org/is/tutorials/) | 200 | 100 (A) | 0 | 25 | 1 | 320 |
| [/is/tutorials/getting-started/](https://guide.wagtail.org/is/tutorials/getting-started/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/is/tutorials/getting-started/None/](https://guide.wagtail.org/is/tutorials/getting-started/None/) | 404 | 95 (A) | html-has-lang (1) | 20 | 1 | — |
| [/pt-br/](https://guide.wagtail.org/pt-br/) | 200 | 100 (A) | 0 | 25 | 0 | 320 |
| [/pt-br/about/](https://guide.wagtail.org/pt-br/about/) | 200 | 100 (A) | 0 | 25 | 0 | 320 |
| [/pt-br/accessibility-features/](https://guide.wagtail.org/pt-br/accessibility-features/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/pt-br/accessibility-features/browser-level-user-interface-settings/](https://guide.wagtail.org/pt-br/accessibility-features/browser-level-user-interface-settings/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/pt-br/accessibility-features/global-navigation/](https://guide.wagtail.org/pt-br/accessibility-features/global-navigation/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/pt-br/accessibility-features/user-account-preferences/](https://guide.wagtail.org/pt-br/accessibility-features/user-account-preferences/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/pt-br/concepts/](https://guide.wagtail.org/pt-br/concepts/) | 200 | 100 (A) | 0 | 25 | 0 | 320 |
| [/pt-br/concepts/scheduled-publishing/](https://guide.wagtail.org/pt-br/concepts/scheduled-publishing/) | 200 | 100 (A) | 0 | 25 | 0 | 320 |
| [/pt-br/concepts/wagtail-interfaces/](https://guide.wagtail.org/pt-br/concepts/wagtail-interfaces/) | 200 | 100 (A) | 0 | 25 | 0 | 320 |
| [/pt-br/concepts/wagtail-interfaces/None/](https://guide.wagtail.org/pt-br/concepts/wagtail-interfaces/None/) | 404 | 95 (A) | html-has-lang (1) | 20 | 1 | — |
| [/pt-br/contributing/](https://guide.wagtail.org/pt-br/contributing/) | 200 | 100 (A) | 0 | 25 | 0 | 320 |
| [/pt-br/getting-started/](https://guide.wagtail.org/pt-br/getting-started/) | 200 | 100 (A) | 0 | 25 | 1 | 320 |
| [/pt-br/getting-started/overview/](https://guide.wagtail.org/pt-br/getting-started/overview/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/pt-br/getting-started/overview/None/](https://guide.wagtail.org/pt-br/getting-started/overview/None/) | 404 | 95 (A) | html-has-lang (1) | 20 | 1 | — |
| [/pt-br/how-to-guides/](https://guide.wagtail.org/pt-br/how-to-guides/) | 200 | 100 (A) | 0 | 25 | 0 | 320 |
| [/pt-br/how-to-guides/find-your-way-around/](https://guide.wagtail.org/pt-br/how-to-guides/find-your-way-around/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/pt-br/how-to-guides/find-your-way-around/None/](https://guide.wagtail.org/pt-br/how-to-guides/find-your-way-around/None/) | 404 | 95 (A) | html-has-lang (1) | 20 | 1 | — |
| [/pt-br/how-to-guides/manage-forms/](https://guide.wagtail.org/pt-br/how-to-guides/manage-forms/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/pt-br/reference/](https://guide.wagtail.org/pt-br/reference/) | 200 | 100 (A) | 0 | 25 | 0 | 320 |
| [/pt-br/reference/account-settings/](https://guide.wagtail.org/pt-br/reference/account-settings/) | 200 | 96 (A) | color-contrast (1) | 26 | 0 | 320 |
| [/pt-br/reference/browser-compatibility/](https://guide.wagtail.org/pt-br/reference/browser-compatibility/) | 200 | 100 (A) | 0 | 25 | 0 | 320 |
| [/pt-br/reference/browser-compatibility/None/](https://guide.wagtail.org/pt-br/reference/browser-compatibility/None/) | 404 | 95 (A) | html-has-lang (1) | 20 | 1 | — |
| [/pt-br/reference/content-checks/](https://guide.wagtail.org/pt-br/reference/content-checks/) | 200 | 96 (A) | color-contrast (2) | 26 | 0 | 320 |
| [/pt-br/releases/](https://guide.wagtail.org/pt-br/releases/) | 200 | 100 (A) | 0 | 25 | 0 | 320 |
| [/pt-br/releases/new-in-wagtail-5-1/](https://guide.wagtail.org/pt-br/releases/new-in-wagtail-5-1/) | 200 | 100 (A) | 0 | 25 | 0 | 320 |
| [/pt-br/releases/new-in-wagtail-5-2/](https://guide.wagtail.org/pt-br/releases/new-in-wagtail-5-2/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/pt-br/releases/new-in-wagtail-6-1/](https://guide.wagtail.org/pt-br/releases/new-in-wagtail-6-1/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/pt-br/releases/new-in-wagtail-6-3/](https://guide.wagtail.org/pt-br/releases/new-in-wagtail-6-3/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/pt-br/releases/new-in-wagtail-6-3/None/](https://guide.wagtail.org/pt-br/releases/new-in-wagtail-6-3/None/) | 404 | 95 (A) | html-has-lang (1) | 20 | 1 | — |
| [/pt-br/releases/new-in-wagtail-6-4/](https://guide.wagtail.org/pt-br/releases/new-in-wagtail-6-4/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/pt-br/releases/new-in-wagtail-6-4/None/](https://guide.wagtail.org/pt-br/releases/new-in-wagtail-6-4/None/) | 404 | 95 (A) | html-has-lang (1) | 20 | 1 | — |
| [/pt-br/releases/new-in-wagtail-60/](https://guide.wagtail.org/pt-br/releases/new-in-wagtail-60/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/pt-br/releases/new-in-wagtail-62/](https://guide.wagtail.org/pt-br/releases/new-in-wagtail-62/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/pt-br/releases/new-in-wagtail-7-0/](https://guide.wagtail.org/pt-br/releases/new-in-wagtail-7-0/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/pt-br/releases/new-in-wagtail-7-0/None/](https://guide.wagtail.org/pt-br/releases/new-in-wagtail-7-0/None/) | 404 | 95 (A) | html-has-lang (1) | 20 | 1 | — |
| [/pt-br/releases/new-in-wagtail-7-1/](https://guide.wagtail.org/pt-br/releases/new-in-wagtail-7-1/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/pt-br/releases/new-in-wagtail-7-1/None/](https://guide.wagtail.org/pt-br/releases/new-in-wagtail-7-1/None/) | 404 | 95 (A) | html-has-lang (1) | 20 | 1 | — |
| [/pt-br/releases/new-in-wagtail-7-2/](https://guide.wagtail.org/pt-br/releases/new-in-wagtail-7-2/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/pt-br/releases/new-in-wagtail-7-3/](https://guide.wagtail.org/pt-br/releases/new-in-wagtail-7-3/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |
| [/pt-br/releases/new-in-wagtail-7-4/](https://guide.wagtail.org/pt-br/releases/new-in-wagtail-7-4/) | 200 | 100 (A) | 0 | 26 | 0 | 320 |

### Rule cross-reference

| Axe rule | Scan-state occurrences | Node occurrences | Reference |
| --- | --- | --- | --- |
| html-has-lang | 47 | 47 | [Rule help](https://dequeuniversity.com/rules/axe/4.11/html-has-lang?application=axeAPI) |
| color-contrast | 37 | 56 | [Rule help](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=axeAPI) |

Counts across states deliberately include the same defect recurring in different views. The findings list counts distinct remediation causes once. The explicit aria-dialog-name check is a separately targeted best-practice rule, manually assessed against ARIA naming requirements; it is absent from the WCAG-tag baseline.

## WCAG 2.2 A/AA coverage

Status reflects the tests performed and the limitations recorded; no issue found is not a conformance claim.

| Criterion | Name | Status | Evidence / limitation |
| --- | --- | --- | --- |
| 1.1.1 | Non-text Content | requires human verification | 425 image instances have alt attributes;32 empty alternatives require contextual equivalence review. No pixel-level inspection; see alt-text-headings notes. |
| 1.2.1 | Audio-only and Video-only (Prerecorded) | not applicable | Final HTML inventory contains no audio/video/embed content; administrative screenshots are images. |
| 1.2.2 | Captions (Prerecorded) | not applicable | No prerecorded synchronized media found. |
| 1.2.3 | Audio Description or Media Alternative (Prerecorded) | not applicable | No prerecorded synchronized media found. |
| 1.2.4 | Captions (Live) | not applicable | No live synchronized media found. |
| 1.2.5 | Audio Description (Prerecorded) | not applicable | No prerecorded video found. |
| 1.3.1 | Info and Relationships | confirmed failure | FORM-SEARCH-DUPLICATE-LABEL-TARGET; ARIA-NAV-CURRENT-001. Browser label associations and accessibility-tree properties verified. |
| 1.3.2 | Meaningful Sequence | no issue found in tested scope | Source and rendered heading/main/list order reviewed across 149 content paths; no visual reorder defect identified. Native RTL screen-reader reading remains recommended. |
| 1.3.3 | Sensory Characteristics | no issue found in tested scope | Source/content instructions and shared control text inspected; no instruction relying only on shape, position, colour or sound was established. |
| 1.3.4 | Orientation | requires human verification | Narrow/wide viewport inspection completed; physical device rotation/orientation restrictions were not explicitly verified. |
| 1.3.5 | Identify Input Purpose | not applicable | Public inputs are search queries and free-text feedback, not fields collecting enumerated personal-information purposes. |
| 1.4.1 | Use of Color | requires human verification | Contrast and state styling reviewed; current navigation information is already captured under 1.3.1. Comprehensive independent colour-only content review remains required. |
| 1.4.2 | Audio Control | not applicable | No automatically playing audio found. |
| 1.4.3 | Contrast (Minimum) | confirmed failure | CONTRAST-001 and CONTRAST-002: measured light-theme version-badge/panel link contrast below 4.5:1; light/dark axe sweeps complete. |
| 1.4.4 | Resize Text | requires human verification | Responsive viewport inspection is not actual 200% text-only enlargement/browser zoom; native zoom remains pending. |
| 1.4.5 | Images of Text | requires human verification | Instructional CMS screenshots depict the interface under discussion; no nonessential images-of-text failure established, but pixel-level/content-equivalence review excluded. |
| 1.4.10 | Reflow | confirmed failure | REFLOW-001: long unbreakable translated release heading causes horizontal scrolling at 320 CSSpx. See playwright-scanner responsive evidence. |
| 1.4.11 | Non-text Contrast | confirmed failure | CONTRAST-003: theme switch boundary/thumb disappear in Chromium forced-colors emulation; native Windows High Contrast follow-up required. |
| 1.4.12 | Text Spacing | requires human verification | Text-spacing override sweep completed on 153 successful HTML addresses. Overflow retained as supporting reflow evidence; clipping/content-loss interpretation and native browser confirmation remain required. |
| 1.4.13 | Content on Hover or Focus | confirmed failure | TOOLTIP-FEEDBACK-NOT-HOVERABLE: pointer cannot move into feedback tooltip without its dismissal; runtime pointer sequence confirmed. |
| 2.1.1 | Keyboard | no issue found in tested scope | Keyboard navigator exercised skip link, navigation, theme, copy/language dropdowns, search, contents links and feedback controls. No keyboard-inoperable control found in tested sequences. |
| 2.1.2 | No Keyboard Trap | no issue found in tested scope | Native links and dropdowns remain escapable; search Escape exits and restores trigger. Mobile overlay obscures focus but does not create an inescapable keyboard trap. |
| 2.1.4 | Character Key Shortcuts | not applicable | No global single-character guide-site shortcuts found; shortcuts described in documentation belong to the Wagtail admin, outside this website flow. |
| 2.2.1 | Timing Adjustable | not applicable | No public task time limit found; debounce and result-animation delays do not impose a user completion deadline. |
| 2.2.2 | Pause, Stop, Hide | not applicable | No identified automatically moving/blinking/scrolling content continuing beyond five seconds or recurring automatic updates requiring controls. |
| 2.3.1 | Three Flashes or Below Threshold | no issue found in tested scope | Scoped source and interactive preference checks identified no flashing content; no flash-frequency measurement was necessary for identified content. |
| 2.4.1 | Bypass Blocks | no issue found in tested scope | First Tab exposes skip link; activating it and pressing Tab proceeds to main-content link in Chromium. |
| 2.4.2 | Page Titled | no issue found in tested scope | All 153 successful HTML URLs have descriptive topic titles; localized copies sharing a topic title are not automatically failures. Search/404 titles also identify purpose. |
| 2.4.3 | Focus Order | no issue found in tested scope | Keyboard and mocked feedback sequences preserve useful next sequential destinations; removal temporarily puts activeElement onBODY but a separate order failure was not established. |
| 2.4.4 | Link Purpose (In Context) | no issue found in tested scope | Final link inventory reviewed; contents/heading context supplies section-link purpose. Broken destinations are functional advisory findings, not automatic purpose failures. |
| 2.4.5 | Multiple Ways | no issue found in tested scope | Public documentation is discoverable through shared navigation, section listings, search and article cross-links. |
| 2.4.6 | Headings and Labels | no issue found in tested scope | Topics/headings and form/control names identify their purpose; skip levels or Happy/Unhappy wording were not automatically classified as AA failures. |
| 2.4.7 | Focus Visible | no issue found in tested scope | Inspected keyboard targets receive 2 px solid focus outlines. Mobile focus obscuration is separately confirmed under 2.4.11. |
| 2.4.11 | Focus Not Obscured (Minimum) | confirmed failure | KEYBOARD-MOBILE-OVERLAY-FOCUS: open mobile navigation completely covers focused background theme/copy/language controls. |
| 2.5.1 | Pointer Gestures | not applicable | No multipoint/path-based gesture needed for guide-site tasks. |
| 2.5.2 | Pointer Cancellation | no issue found in tested scope | Scoped source uses native click activation for links/buttons; no essential action triggered solely on pointerdown was found. |
| 2.5.3 | Label in Name | no issue found in tested scope | Native text buttons/links derive names from labels; image-only feedback/search buttons have names. No definite visible-text/name mismatch identified. |
| 2.5.4 | Motion Actuation | not applicable | No guide-site feature requires device or user motion. |
| 2.5.7 | Dragging Movements | not applicable | No drag operation required in public guide controls; dragging instructions concern separate Wagtail admin functionality. |
| 2.5.8 | Target Size (Minimum) | requires human verification | Full 320 px axe sweep found no target-size violation, but every target/spacing and exception was not manually measured; automated absence alone is insufficient. |
| 3.1.1 | Language of Page | confirmed failure | LANG-SHARED-001: search and discovered 404 documents render empty lang because page locale is unavailable. |
| 3.1.2 | Language of Parts | confirmed failure | LANG-UNTRANSLATED-PARTS-001: substantial English fallback paragraphs inherit French/Icelandic/Portuguese/Arabic document language without lang=en. |
| 3.2.1 | On Focus | no issue found in tested scope | Inspected focus sequences do not navigate/submit/change context merely on focus. |
| 3.2.2 | On Input | no issue found in tested scope | Typing search updates local results; submission uses Enter/button. Theme state changes do not navigate to another context. |
| 3.2.3 | Consistent Navigation | no issue found in tested scope | Shared header/navigation source and cross-page inventory retain recurring navigation relative order within each locale. |
| 3.2.4 | Consistent Identification | no issue found in tested scope | Recurring search, copy, theme and feedback functions use shared templates and naming within locales. |
| 3.2.6 | Consistent Help | no issue found in tested scope | Shared footer help/improvement resources and feedback appear in consistent relative positions on applicable pages. |
| 3.3.1 | Error Identification | requires human verification | Feedback success mocked safely; production validation/error responses not induced. JS console-only catches and unchecked HTTP response need failure-path verification. |
| 3.3.2 | Labels or Instructions | no issue found in tested scope | Search/feedback expose purpose labels; no additional required-field instructions identified. Broken explicit label association is already reported under 1.3.1. |
| 3.3.3 | Error Suggestion | requires human verification | Search/feedback error recovery and actionable suggestions need controlled failure-path tests; production failures were not deliberately induced. |
| 3.3.4 | Error Prevention (Legal, Financial, Data) | not applicable | No legal/financial commitment, test submission or exposed deletion/modification of previously stored personal user data found in public flows. |
| 3.3.7 | Redundant Entry | not applicable | No multistep process requiring repeat entry of previously supplied information identified. |
| 3.3.8 | Accessible Authentication (Minimum) | not applicable | No public guide authentication flow included; admin authentication requires a separately scoped audit. |
| 4.1.2 | Name, Role, Value | confirmed failure | MODAL-ACCESSIBLE-NAME; ARIA-THEME-STATE-001; ARIA-MOBILE-POPUP-001. DOM and Chromium accessibility-tree evidence support missing/misleading semantics. |
| 4.1.3 | Status Messages | confirmed failure | LIVE-001, LIVE-002 and LIVE-003: search counts, clipboard options success and feedback acknowledgement lack status semantics; native spoken announcements remain untested. |

## Cross-page patterns and remediation order

| Priority | Shared cause | Reach | Action |
| --- | --- | --- | --- |
| 1 | Content language and informative image alternatives | Translated content; search and all linked 404 pages | Correct page/region language and informative alternatives; coordinate with translation/CMS editors. |
| 1 | Mobile navigation and page-tool layout | Shared navigation; Icelandic mobile pages | Ensure focused controls remain visible and allow page tools to wrap. |
| 1 | Status announcements | Search and feedback shared flows | Use persistent status regions; test rating, query and error paths. |
| 2 | Badge and alert colors | Affected English and translated articles | Change the shared color styles once; confirm contrast in both themes. |
| 2 | Names, relationships and state | Theme, primary nav, mobile menu and search modal | Expose selected/current states and unique input label relationships. |
| 3 | Functional/content recommendations | Unavailable locale links and specific content pages | Repair broken destinations and structural recommendations; keep n/a findings distinct from WCAG failures. |

No source fixes were applied during this audit. No CI workflow or scan configuration was installed.

## Page metadata dashboard

| Check | Successful HTML pages present | Missing / needs review |
| --- | --- | --- |
| Document title | 153 | 0 |
| Document language | 153 | 0 |
| Viewport meta | 153 | 0 |
| Main landmark | 153 | 0 |
| Image alt attribute | 425 | 0 |
| Empty image alt | 0 | 32 |

An alt attribute being present does not prove its content is equivalent. Empty alternatives are appropriate for decorative/redundant imagery; informative localized examples and manual-review items are identified in the findings/evidence. Search and error views are tracked separately and fail document-language checks.

## Testing coverage, limitations and next verification

- No native screen-reader speech testing
- No visual screenshot or pixel-level image-equivalence review
- 200% text enlargement used root font-size; native browser zoom and Firefox text-only mode remain human checks
- No production feedback data was created; backend failure paths not exercised
- Computed styles, viewport and forced-colors emulation are not native device/OS testing
- Non-English content language assessed from textual evidence; idiomatic translations need native-language review

No tables, interactive grids, audio, video, iframes, public authentication flows, drag-only tasks, repeated-entry process or user-facing session timeout were found in the audited public content. Criteria specific to those features are not applicable within this scope. Backend validation, unavailable network/clipboard outcomes and native assistive-technology/device behavior still need targeted tests.

Before a conformance claim, run NVDA with Firefox and Chrome, VoiceOver with Safari on macOS/iOS, and TalkBack with Chrome on Android. Verify navigation landmark distinction, document/region pronunciation, menu focus visibility, dialog names, both search labels, result announcements, selected theme/current page, clipboard outcomes and feedback outcomes. Use a test environment or intercept feedback POSTs. Repeat native 400% zoom, Firefox text enlargement, orientation and operating-system high-contrast checks.

For regression coverage, extend Django tests for language fallback and unique search IDs, Vitest checks for theme/current-page state, and Playwright/axe tests for initial and open states across light/dark themes and mobile widths. Include an Icelandic home page, English full search, a contrast-affected article and a missing URL. Fail on confirmed A/AA violations rather than trusting a normalized score. Re-run each remediation group immediately; perform a full route/state re-audit before release and repeat content scans periodically.

Authoritative references: [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/), [Focus Not Obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html), [Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html).

## Findings data

The merged findings, embedded so the next run can compute a delta without parsing this document.

```json a11y-findings
{
  "skills": [
    "alt-text-headings",
    "aria-specialist",
    "contrast-master",
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
    ".a 11 y-history/2026-10-06-production/*.json",
    ".a 11 y-history/2026-10-06-production/raw/**",
    ".a 11 y-history/2026-10-06-production/raw/*.html",
    ".a 11 y-history/2026-10-06-production/raw/crawl.json",
    ".a11y-history/2026-10-06-production/raw/crawl.json",
    ".a11y-history/2026-10-06-production/raw/states.json",
    ".github/workflows/ci.yml",
    "All 149 successful public content paths across en/is/fr/pt-br/ar; 153 successful HTML URLs including four version-query aliases",
    "All 43 discovered HTML 404 addresses",
    "Final 196 distinct HTML addresses:153 successful plus 43 errors",
    "Production English article/search runtime and Chromium accessibility tree",
    "Production search blank/results/empty states",
    "apps/core/blocks.py",
    "apps/core/templates/**",
    "apps/core/templates/base.html",
    "apps/core/templates/components/**",
    "apps/core/templates/components/copy_button.html",
    "apps/core/templates/components/feedback.html",
    "apps/core/templates/components/header.html",
    "apps/core/templates/components/navigation.html",
    "apps/core/templates/components/search_modal.html",
    "apps/core/templatetags/core_tags.py",
    "apps/core/tests/**",
    "apps/custom_media/**",
    "apps/custom_media/image_formats.py",
    "apps/frontend/static_src/js/**",
    "apps/frontend/static_src/js/**/*.test.js",
    "apps/frontend/static_src/js/copy-button.js",
    "apps/frontend/static_src/js/feedback/**",
    "apps/frontend/static_src/js/feedback/index.js",
    "apps/frontend/static_src/js/main.js",
    "apps/frontend/static_src/js/mobile-menu/index.js",
    "apps/frontend/static_src/scss/**",
    "apps/richtext/**",
    "apps/search/templates/**",
    "apps/search/templates/search/search.html",
    "apps/search/views.py",
    "content/**",
    "https://guide.wagtail.org/ar/",
    "https://guide.wagtail.org/ar/about/",
    "https://guide.wagtail.org/ar/about/None/",
    "https://guide.wagtail.org/en/",
    "https://guide.wagtail.org/en/about/",
    "https://guide.wagtail.org/en/concepts/",
    "https://guide.wagtail.org/en/concepts/accessibility-features/",
    "https://guide.wagtail.org/en/concepts/page-status/",
    "https://guide.wagtail.org/en/concepts/page-status/?target_version=latest",
    "https://guide.wagtail.org/en/concepts/pages/",
    "https://guide.wagtail.org/en/concepts/pages/None/",
    "https://guide.wagtail.org/en/concepts/reports/",
    "https://guide.wagtail.org/en/concepts/reports/None/",
    "https://guide.wagtail.org/en/concepts/scheduled-publishing/",
    "https://guide.wagtail.org/en/concepts/users-status/",
    "https://guide.wagtail.org/en/concepts/users-status/None/",
    "https://guide.wagtail.org/en/concepts/wagtail-interfaces/",
    "https://guide.wagtail.org/en/concepts/wagtail-interfaces/?target_version=latest",
    "https://guide.wagtail.org/en/concepts/wagtail-interfaces/None/",
    "https://guide.wagtail.org/en/getting-started/",
    "https://guide.wagtail.org/en/getting-started/overview/",
    "https://guide.wagtail.org/en/getting-started/overview/None/",
    "https://guide.wagtail.org/en/how-to-guides/",
    "https://guide.wagtail.org/en/how-to-guides/configure-workflows-for-moderation/",
    "https://guide.wagtail.org/en/how-to-guides/find-your-way-around/",
    "https://guide.wagtail.org/en/how-to-guides/find-your-way-around/?target_version=latest",
    "https://guide.wagtail.org/en/how-to-guides/find-your-way-around/None/",
    "https://guide.wagtail.org/en/how-to-guides/manage-collections/",
    "https://guide.wagtail.org/en/how-to-guides/manage-documents/",
    "https://guide.wagtail.org/en/how-to-guides/manage-documents/None/",
    "https://guide.wagtail.org/en/how-to-guides/manage-forms/",
    "https://guide.wagtail.org/en/how-to-guides/manage-images/",
    "https://guide.wagtail.org/en/how-to-guides/manage-images/None/",
    "https://guide.wagtail.org/en/how-to-guides/manage-pages/",
    "https://guide.wagtail.org/en/how-to-guides/manage-pages/None/",
    "https://guide.wagtail.org/en/how-to-guides/manage-redirects/",
    "https://guide.wagtail.org/en/how-to-guides/manage-snippets/",
    "https://guide.wagtail.org/en/how-to-guides/manage-users-and-roles/",
    "https://guide.wagtail.org/en/how-to-guides/promote-search-results/",
    "https://guide.wagtail.org/en/how-to-guides/promote-search-results/?target_version=latest",
    "https://guide.wagtail.org/en/reference/",
    "https://guide.wagtail.org/en/reference/account-settings/",
    "https://guide.wagtail.org/en/reference/browser-compatibility/",
    "https://guide.wagtail.org/en/reference/browser-compatibility/None/",
    "https://guide.wagtail.org/en/reference/content-checks/",
    "https://guide.wagtail.org/en/reference/page-status-definitions/",
    "https://guide.wagtail.org/en/releases/",
    "https://guide.wagtail.org/en/releases/new-in-wagtail-4-1/",
    "https://guide.wagtail.org/en/releases/new-in-wagtail-4-2/",
    "https://guide.wagtail.org/en/releases/new-in-wagtail-5-0/",
    "https://guide.wagtail.org/en/releases/new-in-wagtail-5-1/",
    "https://guide.wagtail.org/en/releases/new-in-wagtail-5-2/",
    "https://guide.wagtail.org/en/releases/new-in-wagtail-6-0/",
    "https://guide.wagtail.org/en/releases/new-in-wagtail-6-1/",
    "https://guide.wagtail.org/en/releases/new-in-wagtail-6-2/",
    "https://guide.wagtail.org/en/releases/new-in-wagtail-6-3/",
    "https://guide.wagtail.org/en/releases/new-in-wagtail-6-3/None/",
    "https://guide.wagtail.org/en/releases/new-in-wagtail-6-4/",
    "https://guide.wagtail.org/en/releases/new-in-wagtail-6-4/None/",
    "https://guide.wagtail.org/en/releases/new-in-wagtail-7-0/",
    "https://guide.wagtail.org/en/releases/new-in-wagtail-7-0/None/",
    "https://guide.wagtail.org/en/releases/new-in-wagtail-7-1/",
    "https://guide.wagtail.org/en/releases/new-in-wagtail-7-1/None/",
    "https://guide.wagtail.org/en/releases/new-in-wagtail-7-2/",
    "https://guide.wagtail.org/en/releases/new-in-wagtail-7-3/",
    "https://guide.wagtail.org/en/releases/new-in-wagtail-7-4/",
    "https://guide.wagtail.org/en/releases/new-in-wagtail-8-0/",
    "https://guide.wagtail.org/en/search/?query=pages",
    "https://guide.wagtail.org/fr/",
    "https://guide.wagtail.org/fr/commencement/",
    "https://guide.wagtail.org/fr/concepts/scheduled-publishing/",
    "https://guide.wagtail.org/fr/fonctionnalites-d-accessibilite/",
    "https://guide.wagtail.org/fr/how-to-guides/",
    "https://guide.wagtail.org/fr/how-to-guides/manage-forms/",
    "https://guide.wagtail.org/fr/reference/account-settings/",
    "https://guide.wagtail.org/fr/reference/content-checks/",
    "https://guide.wagtail.org/fr/releases/",
    "https://guide.wagtail.org/fr/releases/new-in-wagtail-5-1/",
    "https://guide.wagtail.org/fr/releases/new-in-wagtail-5-2/",
    "https://guide.wagtail.org/fr/releases/new-in-wagtail-6-1/",
    "https://guide.wagtail.org/fr/releases/new-in-wagtail-6-3/",
    "https://guide.wagtail.org/fr/releases/new-in-wagtail-6-3/None/",
    "https://guide.wagtail.org/fr/releases/new-in-wagtail-6-4/",
    "https://guide.wagtail.org/fr/releases/new-in-wagtail-6-4/None/",
    "https://guide.wagtail.org/fr/releases/new-in-wagtail-60/",
    "https://guide.wagtail.org/fr/releases/new-in-wagtail-62/",
    "https://guide.wagtail.org/fr/releases/new-in-wagtail-7-0/",
    "https://guide.wagtail.org/fr/releases/new-in-wagtail-7-0/None/",
    "https://guide.wagtail.org/fr/releases/new-in-wagtail-7-1/",
    "https://guide.wagtail.org/fr/releases/new-in-wagtail-7-1/None/",
    "https://guide.wagtail.org/fr/releases/new-in-wagtail-7-2/",
    "https://guide.wagtail.org/fr/releases/new-in-wagtail-7-3/",
    "https://guide.wagtail.org/fr/releases/new-in-wagtail-7-4/",
    "https://guide.wagtail.org/is/",
    "https://guide.wagtail.org/is/about/",
    "https://guide.wagtail.org/is/accessibility-features/",
    "https://guide.wagtail.org/is/accessibility-features/browser-level-user-interface-settings/",
    "https://guide.wagtail.org/is/accessibility-features/global-navigation/",
    "https://guide.wagtail.org/is/accessibility-features/user-account-preferences/",
    "https://guide.wagtail.org/is/concepts/",
    "https://guide.wagtail.org/is/concepts/page-status/",
    "https://guide.wagtail.org/is/concepts/pages/",
    "https://guide.wagtail.org/is/concepts/pages/None/",
    "https://guide.wagtail.org/is/concepts/reports/",
    "https://guide.wagtail.org/is/concepts/reports/None/",
    "https://guide.wagtail.org/is/concepts/scheduled-publishing/",
    "https://guide.wagtail.org/is/concepts/users-status/",
    "https://guide.wagtail.org/is/concepts/users-status/None/",
    "https://guide.wagtail.org/is/concepts/wagtail-interfaces/",
    "https://guide.wagtail.org/is/concepts/wagtail-interfaces/None/",
    "https://guide.wagtail.org/is/contributing/",
    "https://guide.wagtail.org/is/how-to/",
    "https://guide.wagtail.org/is/how-to/configuring-moderation-workflows/",
    "https://guide.wagtail.org/is/how-to/copying-and-aliasing-pages/",
    "https://guide.wagtail.org/is/how-to/creating-and-editing-pages/",
    "https://guide.wagtail.org/is/how-to/creating-and-editing-pages/None/",
    "https://guide.wagtail.org/is/how-to/finding-your-way-around/",
    "https://guide.wagtail.org/is/how-to/finding-your-way-around/None/",
    "https://guide.wagtail.org/is/how-to/how-to-promote-search-results/",
    "https://guide.wagtail.org/is/how-to/manage-forms/",
    "https://guide.wagtail.org/is/how-to/managing-collections/",
    "https://guide.wagtail.org/is/how-to/managing-documents/",
    "https://guide.wagtail.org/is/how-to/managing-documents/None/",
    "https://guide.wagtail.org/is/how-to/managing-images/",
    "https://guide.wagtail.org/is/how-to/managing-images/None/",
    "https://guide.wagtail.org/is/how-to/managing-redirects/",
    "https://guide.wagtail.org/is/how-to/managing-snippets/",
    "https://guide.wagtail.org/is/how-to/managing-users-and-roles/",
    "https://guide.wagtail.org/is/reference/",
    "https://guide.wagtail.org/is/reference/account-settings/",
    "https://guide.wagtail.org/is/reference/browser-issues/",
    "https://guide.wagtail.org/is/reference/browser-issues/None/",
    "https://guide.wagtail.org/is/reference/content-checks/",
    "https://guide.wagtail.org/is/reference/wagtail-page-status-definitions/",
    "https://guide.wagtail.org/is/releases/",
    "https://guide.wagtail.org/is/releases/new-in-wagtail-4-1/",
    "https://guide.wagtail.org/is/releases/new-in-wagtail-4-2/",
    "https://guide.wagtail.org/is/releases/new-in-wagtail-5-0/",
    "https://guide.wagtail.org/is/releases/new-in-wagtail-5-1/",
    "https://guide.wagtail.org/is/releases/new-in-wagtail-5-2/",
    "https://guide.wagtail.org/is/releases/new-in-wagtail-6-0/",
    "https://guide.wagtail.org/is/releases/new-in-wagtail-6-1/",
    "https://guide.wagtail.org/is/releases/new-in-wagtail-6-3/",
    "https://guide.wagtail.org/is/releases/new-in-wagtail-6-3/None/",
    "https://guide.wagtail.org/is/releases/new-in-wagtail-6-4/",
    "https://guide.wagtail.org/is/releases/new-in-wagtail-6-4/None/",
    "https://guide.wagtail.org/is/releases/new-in-wagtail-62/",
    "https://guide.wagtail.org/is/releases/new-in-wagtail-7-0/",
    "https://guide.wagtail.org/is/releases/new-in-wagtail-7-0/None/",
    "https://guide.wagtail.org/is/releases/new-in-wagtail-7-1/",
    "https://guide.wagtail.org/is/releases/new-in-wagtail-7-1/None/",
    "https://guide.wagtail.org/is/releases/new-in-wagtail-7-2/",
    "https://guide.wagtail.org/is/releases/new-in-wagtail-7-3/",
    "https://guide.wagtail.org/is/releases/new-in-wagtail-7-4/",
    "https://guide.wagtail.org/is/tutorials/",
    "https://guide.wagtail.org/is/tutorials/getting-started/",
    "https://guide.wagtail.org/is/tutorials/getting-started/None/",
    "https://guide.wagtail.org/pt-br/",
    "https://guide.wagtail.org/pt-br/about/",
    "https://guide.wagtail.org/pt-br/accessibility-features/",
    "https://guide.wagtail.org/pt-br/accessibility-features/browser-level-user-interface-settings/",
    "https://guide.wagtail.org/pt-br/accessibility-features/global-navigation/",
    "https://guide.wagtail.org/pt-br/accessibility-features/user-account-preferences/",
    "https://guide.wagtail.org/pt-br/concepts/",
    "https://guide.wagtail.org/pt-br/concepts/scheduled-publishing/",
    "https://guide.wagtail.org/pt-br/concepts/wagtail-interfaces/",
    "https://guide.wagtail.org/pt-br/concepts/wagtail-interfaces/None/",
    "https://guide.wagtail.org/pt-br/contributing/",
    "https://guide.wagtail.org/pt-br/getting-started/",
    "https://guide.wagtail.org/pt-br/getting-started/overview/",
    "https://guide.wagtail.org/pt-br/getting-started/overview/None/",
    "https://guide.wagtail.org/pt-br/how-to-guides/",
    "https://guide.wagtail.org/pt-br/how-to-guides/find-your-way-around/",
    "https://guide.wagtail.org/pt-br/how-to-guides/find-your-way-around/None/",
    "https://guide.wagtail.org/pt-br/how-to-guides/manage-forms/",
    "https://guide.wagtail.org/pt-br/reference/",
    "https://guide.wagtail.org/pt-br/reference/account-settings/",
    "https://guide.wagtail.org/pt-br/reference/browser-compatibility/",
    "https://guide.wagtail.org/pt-br/reference/browser-compatibility/None/",
    "https://guide.wagtail.org/pt-br/reference/content-checks/",
    "https://guide.wagtail.org/pt-br/releases/",
    "https://guide.wagtail.org/pt-br/releases/new-in-wagtail-5-1/",
    "https://guide.wagtail.org/pt-br/releases/new-in-wagtail-5-2/",
    "https://guide.wagtail.org/pt-br/releases/new-in-wagtail-6-1/",
    "https://guide.wagtail.org/pt-br/releases/new-in-wagtail-6-3/",
    "https://guide.wagtail.org/pt-br/releases/new-in-wagtail-6-3/None/",
    "https://guide.wagtail.org/pt-br/releases/new-in-wagtail-6-4/",
    "https://guide.wagtail.org/pt-br/releases/new-in-wagtail-6-4/None/",
    "https://guide.wagtail.org/pt-br/releases/new-in-wagtail-60/",
    "https://guide.wagtail.org/pt-br/releases/new-in-wagtail-62/",
    "https://guide.wagtail.org/pt-br/releases/new-in-wagtail-7-0/",
    "https://guide.wagtail.org/pt-br/releases/new-in-wagtail-7-0/None/",
    "https://guide.wagtail.org/pt-br/releases/new-in-wagtail-7-1/",
    "https://guide.wagtail.org/pt-br/releases/new-in-wagtail-7-1/None/",
    "https://guide.wagtail.org/pt-br/releases/new-in-wagtail-7-2/",
    "https://guide.wagtail.org/pt-br/releases/new-in-wagtail-7-3/",
    "https://guide.wagtail.org/pt-br/releases/new-in-wagtail-7-4/",
    "package.json",
    "pyproject.toml",
    "raw/crawl.json (84 pages at review time)",
    "raw/states.json"
  ],
  "findings": [
    {
      "rule": "CONTRAST-001",
      "wcag": "1.4.3 AA",
      "severity": "serious",
      "location": "apps/frontend/static_src/scss/components/version-badge.scss:21",
      "summary": "Added-version badges have insufficient text contrast in the light theme.",
      "fix": "Use a darker teal foreground or lighter badge background that reaches at least 4.5:1 for the 14.4px badge text; verify all badge variants in both themes.",
      "evidence": "Production manage-pages, reports, content-checks and account-settings: foreground #007d7e on #e0eff0 = 4.19:1; text is 14.4px. axe-core 4.11.1 confirms the failure.",
      "component": "Version badge",
      "foundBy": [
        "contrast-master",
        "playwright-scanner"
      ]
    },
    {
      "rule": "CONTRAST-002",
      "wcag": "1.4.3 AA",
      "severity": "serious",
      "location": "apps/frontend/static_src/scss/components/alert.scss:38",
      "summary": "Links inside light-theme note and warning panels fail the 4.5:1 text contrast requirement.",
      "fix": "Give alert-content links a darker foreground that reaches 4.5:1 against both #e0eff0 and #e6e3f1, while retaining an underline and distinct hover/focus states.",
      "evidence": "Production manage-users-and-roles and promote-search-results: #007d7e on #e0eff0 = 4.19:1. manage-snippets warning link: #007d7e on #e6e3f1 = 3.92:1. Text is 18px normal, requiring 4.5:1.",
      "component": "Alert content links",
      "foundBy": [
        "contrast-master",
        "playwright-scanner"
      ]
    },
    {
      "rule": "KEYBOARD-MOBILE-OVERLAY-FOCUS",
      "wcag": "2.4.11 AA",
      "severity": "serious",
      "location": "apps/frontend/static_src/js/mobile-menu/index.js:42",
      "summary": "The open mobile navigation lets Tab move to background controls that the menu completely covers.",
      "fix": "Close the mobile navigation when focus moves outside its toggle and navigation, or implement an accessible modal menu with background inertness, focus containment, Escape dismissal and focus restoration. Keep the toggle available to close the menu.",
      "evidence": "Live Chromium at 390×844: Space opens the menu; after 44 navigation links, Tab focuses Light mode, Copy page, copy options and English behind nav.primary-nav.is-visible. Their centres hit the opaque menu, while aria-expanded stays true. Escape leaves the menu open. See raw/keyboard-mobile.json.",
      "component": "Mobile navigation",
      "foundBy": [
        "keyboard-navigator"
      ]
    },
    {
      "rule": "LANG-SHARED-001",
      "wcag": "3.1.1 A",
      "severity": "serious",
      "location": "apps/core/templates/base.html:7",
      "summary": "Search and 404 pages have an empty document language.",
      "fix": "Use the active Django LANGUAGE_CODE as a fallback when self.locale.language_code is absent, and verify blank/results/empty search pages and nonexistent URLs in English and translated locales.",
      "evidence": "404 GET /en/a11y-audit-nonexistent-page/ renders <html lang=\"\">; root browser evidence raw/states.json confirms empty document language in blank/results/empty search pages too. These views lack a page instance.",
      "component": "Shared base template / search and 404 views",
      "foundBy": [
        "alt-text-headings",
        "playwright-scanner"
      ]
    },
    {
      "rule": "LANG-UNTRANSLATED-PARTS-001",
      "wcag": "3.1.2 AA",
      "severity": "serious",
      "location": "https://guide.wagtail.org/fr/",
      "summary": "Substantial English fallback content inherits the translated page language without a language override.",
      "fix": "Translate fallback content, or explicitly mark English introductions/article blocks and other English passages lang=en while retaining the correct language for translated UI. Track the actual language of CMS translation segments so templates can render accurate language attributes.",
      "evidence": "/fr/ lang=fr: introduction begins Welcome to the Wagtail user guide; /is/reference/content-checks/ lang=is: English Content quality checks are present in the CMS paragraph; /pt-br/how-to-guides/manage-forms/ lang=pt-br: English Wagtail provides a flexible form builder paragraph; /ar/about/ lang=ar: English The User Guide is a website paragraph. None has lang=en ancestors.",
      "component": "Untranslated CMS segments / multilingual fallback content",
      "foundBy": [
        "alt-text-headings"
      ]
    },
    {
      "rule": "LIVE-001",
      "wcag": "4.1.3 AA",
      "severity": "serious",
      "location": "apps/core/templates/components/search_modal.html:13",
      "summary": "Asynchronous search result counts and no-results messages are not exposed as status messages.",
      "fix": "Give the persistent count container role=\"status\" and aria-atomic=\"true\"; update a stable text node after the latest search finishes, announce loading for prolonged requests, and avoid making the entire result list live.",
      "evidence": "Independent production query page returns 3 results found and 3 anchors; focus stays on #search and live regions are empty. Zero-result states likewise use a plain heading. main.js:28–43 updates counts without status semantics.",
      "component": "Search modal",
      "foundBy": [
        "live-region-controller"
      ]
    },
    {
      "rule": "LIVE-003",
      "wcag": "4.1.3 AA",
      "severity": "serious",
      "location": "apps/frontend/static_src/js/feedback/index.js:44",
      "summary": "The visible feedback-rating acknowledgement lacks status semantics.",
      "fix": "Add a persistent status region outside replaceable feedback/form content; announce rating receipt and successful comment submission after checked successful responses, and expose failures with an accessible retry path.",
      "evidence": "Mocked rating-success runtime confirms a plain Thanks for your feedback! span and no live regions. Source comment submission removes its form at line 67 without a confirmation; this separate outcome omission is a usability concern.",
      "component": "Page feedback",
      "foundBy": [
        "live-region-controller"
      ]
    },
    {
      "rule": "REFLOW-001",
      "wcag": "1.4.10 AA",
      "severity": "serious",
      "location": "apps/frontend/static_src/scss/components/page-tools.scss:4",
      "summary": "The Icelandic page-tools row overflows the 320px viewport and pushes the language control offscreen.",
      "fix": "Allow the shared page-tools flex row to wrap or stack at narrow widths; ensure each control can shrink or wrap translated text and remain fully operable within 320 CSS px. Verify long translations with text spacing and enlarged text.",
      "evidence": "Independent production verification: /is/ document scrollWidth 347 at viewport320, increasing to414 with WCAG text spacing; /is/how-to/finding-your-way-around/ 323→395. The overflowing element is the Íslenska language-selector toggle.",
      "component": "Page tools",
      "foundBy": [
        "playwright-scanner"
      ]
    },
    {
      "rule": "ARIA-MOBILE-POPUP-001",
      "wcag": "4.1.2 A",
      "severity": "moderate",
      "location": "apps/core/templates/components/header.html:26",
      "summary": "The mobile navigation toggle advertises an ARIA menu popup although its content is ordinary navigation.",
      "fix": "Remove aria-haspopup=true from this disclosure button; retain the updated aria-expanded state and optionally add aria-controls pointing to an ID on the navigation container. Keep native navigation links instead of adding menu roles.",
      "evidence": "The toggle has aria-haspopup=true (equivalent to menu), but opens <nav class=primary-nav><ul> with ordinary links rather than a menu widget. mobile-menu/index.js correctly updates aria-expanded.",
      "component": "Mobile navigation disclosure",
      "foundBy": [
        "aria-specialist"
      ]
    },
    {
      "rule": "ARIA-NAV-CURRENT-001",
      "wcag": "1.3.1 A",
      "severity": "moderate",
      "location": "apps/frontend/static_src/js/active-nav-item/index.js:5",
      "summary": "The visually highlighted current navigation page is not identified programmatically.",
      "fix": "When matching the current pathname, set aria-current=page on that link alongside the active class. Ensure exactly the current page link is marked.",
      "evidence": "On /en/how-to-guides/manage-pages/ the link has class navigation__link active; CSS changes its background and foreground. Its Chromium AX properties contain URL/focusable only, with no current state.",
      "component": "Primary navigation",
      "foundBy": [
        "aria-specialist"
      ]
    },
    {
      "rule": "ARIA-THEME-STATE-001",
      "wcag": "4.1.2 A",
      "severity": "moderate",
      "location": "apps/core/templates/components/theme_toggle.html:5",
      "summary": "The light/dark toggle exposes neither its selected state nor a changing action name.",
      "fix": "Use a native checkbox or button role=switch with aria-checked, or a toggle button with aria-pressed and stable Dark mode name; synchronize initial and changed state in blocking.js. Alternatively announce the next action with a changing button name.",
      "evidence": "Chromium AX tree before/after click exposes the same button name Toggle between dark and light theme and no checked/pressed state; body.theme-dark changes false to true. aria-label overrides the CSS-switched inner Light mode/Dark mode text.",
      "component": "Theme toggle",
      "foundBy": [
        "aria-specialist"
      ]
    },
    {
      "rule": "CONTRAST-003",
      "wcag": "1.4.11 AA",
      "severity": "moderate",
      "location": "apps/frontend/static_src/scss/components/theme-toggle.scss:16",
      "summary": "The theme switch becomes visually indistinguishable from its background in forced-colors mode.",
      "fix": "Add a forced-colors style using system colors and a visible border or system-color icon so the switch and its state remain discernible; retain native color adjustment where possible.",
      "evidence": "Chromium forcedColors: active on production homepage: switch background, ::before and ::after all rgb(255,255,255), border 0px none; no visible switch boundary or thumb remains.",
      "component": "Theme toggle",
      "foundBy": [
        "contrast-master"
      ]
    },
    {
      "rule": "FORM-SEARCH-DUPLICATE-LABEL-TARGET",
      "wcag": "1.3.1 A",
      "severity": "moderate",
      "location": "apps/search/templates/search/search.html:11",
      "summary": "On full search pages, the modal Search label is associated with the main-page input instead of its own input.",
      "fix": "Use distinct ids such as page-search and modal-search, updating each label for attribute to match its respective input. Preserve the modal data-search-input selector and search query field name.",
      "evidence": "Live /en/search/?query=pages contains two input#search elements. The main input.labels contains both Search labels; modal input.labels is empty. Opening the modal exposes textbox \"Search…\" from its placeholder instead of its explicit label. See raw/forms-runtime.json.",
      "component": "Full search page and search modal",
      "foundBy": [
        "forms-specialist"
      ]
    },
    {
      "rule": "LINK-001",
      "wcag": "n/a",
      "severity": "moderate",
      "location": "apps/core/templatetags/core_tags.py:78",
      "summary": "The language selector offers Arabic translations whose unresolved URLs become relative None links and return 404.",
      "fix": "Restrict language-selector translations to public, routable pages and resolve each URL before rendering; omit unavailable translations or link explicitly to a valid locale landing page. Reuse the existing hreflangs URL-validation approach.",
      "evidence": "43 distinct crawled successful pages expose an Arabic link with href=\"None\", across English, Icelandic, French and Portuguese. The crawl confirms /en/getting-started/overview/None/ returns 404.",
      "component": "Language selector",
      "foundBy": [
        "link-checker"
      ]
    },
    {
      "rule": "LIVE-002",
      "wcag": "4.1.3 AA",
      "severity": "moderate",
      "location": "apps/frontend/static_src/js/copy-button.js:67",
      "summary": "Copy-link and copy-prompt success changes a different control’s label without an announced status.",
      "fix": "Keep copy control names stable and update a persistent role=\"status\" aria-atomic=\"true\" element with a concise translated success message for each copy action; retain focus on the invoking control.",
      "evidence": "copy-success runtime confirms Copied! appears without live regions. Source handleCopyLink and handleCopyPrompt call showFeedback(this.copyPage), changing a different button from the invoking control for 2000ms.",
      "component": "Content copy tools",
      "foundBy": [
        "live-region-controller"
      ]
    },
    {
      "rule": "MODAL-ACCESSIBLE-NAME",
      "wcag": "4.1.2 A",
      "severity": "moderate",
      "location": "apps/core/templates/components/search_modal.html:3",
      "summary": "The open search dialog has no accessible name, so assistive technology cannot identify its purpose as a dialog.",
      "fix": "Give the dialog an accessible name with a translated aria-label=\"Search\", or add a visible Search heading and reference its id with aria-labelledby. Retain the separate Search label for the input.",
      "evidence": "Production open state: <div id=\"search-modal\" tabindex=\"-1\" aria-modal=\"true\" role=\"dialog\"> has no aria-label or aria-labelledby. Chromium accessibility snapshot begins \"- dialog:\" with no name; textbox alone is named Search. Explicit axe aria-dialog-name run fails.",
      "component": "Search modal",
      "foundBy": [
        "modal-specialist"
      ]
    },
    {
      "rule": "TOOLTIP-FEEDBACK-NOT-HOVERABLE",
      "wcag": "1.4.13 AA",
      "severity": "moderate",
      "location": "apps/core/templates/components/feedback.html:8",
      "summary": "Feedback tooltips disappear when the pointer moves from their button onto the tooltip content.",
      "fix": "Keep the tooltip visible while the pointer is over either its trigger or tooltip and provide Escape dismissal; consider visible helpful/not helpful labels that remove the need for explanatory hover content.",
      "evidence": "Live Manage pages: hovering Happy displays This page was helpful. Moving the pointer into the tooltip rectangle (691,387;170×33) removes it within 500ms; Escape while hovering leaves it visible. Keyboard focus alone does not reveal it. See raw/tooltip-runtime.json.",
      "component": "Feedback tooltips",
      "foundBy": [
        "link-checker"
      ]
    },
    {
      "rule": "HEADINGS-RELEASE-001",
      "wcag": "n/a",
      "severity": "minor",
      "location": "content/en/releases/new-in-wagtail-6-4.md:12",
      "summary": "Wagtail 6.4 release topics use H3 for top-level article sections.",
      "fix": "Change the five release topic headings from H3 to H2 in CMS content and the corresponding export; these topics are siblings of the contents panel, rather than subsections of its On this page heading.",
      "evidence": "The page uses H1 New in Wagtail 6.4, H2 On this page, then H3 Previews for StreamField Blocks, Alt text management enhancements, Drag-and-drop reordering for StreamField, Search terms report, Additional user interface improvements.",
      "component": "Wagtail 6.4 release article",
      "foundBy": [
        "alt-text-headings"
      ]
    },
    {
      "rule": "LANDMARK-NAMES-001",
      "wcag": "n/a",
      "severity": "minor",
      "location": "apps/core/templates/components/navigation.html:3",
      "summary": "Repeated navigation landmarks have no distinct accessible names.",
      "fix": "Label primary navigation and previous/next navigation distinctly; remove the unnecessary nav wrapper around the standalone skip link or give it a distinct name. Verify landmark navigation exposes clear purposes.",
      "evidence": "English home has <nav class=\"skip-link\"> and <nav class=\"primary-nav\" data-mobile-menu>; content pages also have <nav class=\"nav-buttons\">. None has aria-label or aria-labelledby.",
      "component": "Shared navigation templates",
      "foundBy": [
        "alt-text-headings"
      ]
    },
    {
      "rule": "LINK-002",
      "wcag": "n/a",
      "severity": "minor",
      "location": "content/en/how-to-guides/find-your-way-around.md:62",
      "summary": "The current-status reference link leads to a removed English URL and returns 404.",
      "fix": "Update the CMS source and exported Markdown link to the current page-status reference location, and provide a redirect from /en/reference/page-status-definitions/ where practical.",
      "evidence": "Production /en/how-to-guides/find-your-way-around/ links current status of the page to /en/reference/page-status-definitions/; the crawl records status 404 for that URL.",
      "component": "Find your way around content",
      "foundBy": [
        "link-checker"
      ]
    },
    {
      "rule": "LINK-003",
      "wcag": "n/a",
      "severity": "minor",
      "location": "https://guide.wagtail.org/fr/",
      "summary": "The French homepage Guides pratiques card leads to a missing French section and returns 404.",
      "fix": "Publish the French how-to section or update the CMS card to a valid translated destination; suppress links to unavailable sections until a usable landing page exists.",
      "evidence": "Production /fr/ exposes a Guides pratiques card linking to https://guide.wagtail.org/fr/how-to-guides/; the live crawl records HTTP 404 for that destination.",
      "component": "French homepage section card",
      "foundBy": [
        "link-checker"
      ]
    }
  ],
  "passed": [
    "200% text resize through root font-size enlargement on homepage, overview and manage-pages retained content without horizontal scrolling or clipped visible text.",
    "Across 425 rendered image instances on distinct successful URLs, all images have an alt attribute; 393 are nonempty and 32 are empty. English sitemap images have nonempty alternatives.",
    "All 153 successful HTML URLs have one H1 and one main landmark; all 149 successful content paths were inspected across five locales.",
    "All internal fragment targets referencing crawled pages resolve to recorded heading IDs; #main-content is handled by the skip-link audit.",
    "All successful HTML pages have nonempty document language appropriate to the selected locale; search/404 absence and untranslated passages are reported separately.",
    "All successful HTML titles identify their page topic; duplicate English titles across locale copies identify the same topic and were not treated as independent title failures.",
    "Arabic home and article pages have dir=rtl; Icelandic, French and Brazilian Portuguese successful pages declare their respective language codes.",
    "Bootstrap adds role=\"dialog\" and aria-modal=\"true\" and removes aria-hidden=\"true\" when opening the production search modal; missing static role is not a runtime defect.",
    "Both feedback buttons are reachable in sequence by Tab without submitting feedback.",
    "Content-copy controls correctly use buttons for copying and anchors for navigating to Markdown resources.",
    "Copy and language dropdown triggers initialize aria-expanded=false; Bootstrap dropdown owns state transitions.",
    "Copy options and language dropdowns open with Enter, ArrowDown reaches their first item, and Escape closes and restores focus to their trigger.",
    "Copy page activates with Enter, preserves focus, displays Copied!, and writes the expected page Markdown to the clipboard (16,140 characters on Manage pages).",
    "Crawled link inventory has no empty links without an aria-label, and no standalone click here/read more/learn more links.",
    "Escape dismissal and backdrop dismissal both close the search modal and restore focus to the search trigger.",
    "Existing CI runs frontend build/lint/Vitest and Django checks/backend coverage with PostgreSQL; mobile-menu tests assert aria-expanded changes.",
    "Feedback reveal and completion were exercised with every POST intercepted and fulfilled locally; no production feedback was submitted. After the initial buttons are removed, the next Tab reaches the newly revealed textarea; after Submit is removed, the next Tab reaches the following footer link.",
    "Feedback textarea has a programmatically associated Your feedback label; happy and unhappy native buttons expose names within the visible Was this page helpful context.",
    "Final inventory inspected 196 distinct HTML addresses (153 successful,43 errors): no data tables or interactive grid/treegrid elements, and no table/list/grid axe violations recorded.",
    "Generated pilcrow section links are inside their corresponding heading and inherit programmatically determined heading context; ambiguous standalone names alone do not fail 2.4.4 AA.",
    "Global 2px focus outline overrides theme-toggle outline removal via !important.",
    "Home SectionGridBlock renders heading-and-description cards with CSS layout, not tabular data requiring row/column header associations.",
    "Independent modal search with query page returns 3 results and retains input focus; status-region absence corroborates LIVE-001.",
    "Main body, shared navigation, footer and native search input retain readable foreground/background combinations in sampled light and dark states.",
    "Main-page search input and Search submit button are native keyboard-operable controls with accessible names.",
    "Manage pages table-of-contents links activate with Enter; the next Tab advances within the destination section.",
    "Markdown and llms text links describe the resource format in their visible names.",
    "Mobile navigation expanded state is updated on open and close in source and captured runtime.",
    "Navigation, copy-options and language-options templates use native ul/li list markup; page search results use native ul/li markup.",
    "No additional broken heading relationships were asserted solely from heading-level changes; Wagtail 6.4 section hierarchy remains an advisory finding.",
    "No authored broken aria-labelledby/aria-describedby/aria-controls references were found in scoped templates.",
    "No iframe/video/audio elements were found in successful guide pages.",
    "No personal-information fields, authentication, required user-data fields or multi-step repeated-entry process were found in these forms; autocomplete and redundant-entry requirements are not applicable to the search query or free-text comment.",
    "No public authentication, drag-only interaction, checkout, multi-step repeated-entry process, user-facing time limit, or audio/video embed was identified in inspected public guide flows; Wagtail admin features described by documentation are outside the guide website interaction scope.",
    "Parsed all available saved page and state HTML for actual table elements and role=table/grid/treegrid: none found. JavaScript strings inside injected axe scripts were excluded from markup interpretation.",
    "Representative homepage, section, overview, manage-pages and 404 layouts fit 320 CSS px without horizontal scrolling.",
    "Responsive dark-desktop/320px-light scans reviewed for 153 URLs; all repeated findings are consolidated by source cause.",
    "Runtime inventory reviewed for 196 actual HTML URLs (153 successful, 43 404), excluding synthetic plaintext wrappers.",
    "Search dialog opening moves focus to the labelled search input.",
    "Search error handling uses a native alert rather than a silent console-only branch; error dialog behavior was reviewed in source only.",
    "Search result links are keyboard reachable and dropdown options support ArrowDown and Escape with focus restoration.",
    "Search trigger keyboard activation focuses the Search input; Shift+Tab in the empty dialog returns to that input without reaching background controls.",
    "Search updates are debounced by 150ms rather than firing a request for every immediate keyboard event.",
    "Server-rendered full search pages are navigation results and do not require their initial counts to be live regions.",
    "Shared controls use native buttons, links and text inputs rather than custom div roles.",
    "Shared decorative icons use aria-hidden=true with parent text or accessible names.",
    "Shared logo, section illustrations, alert icons, footer icons and feedback emoji use aria-hidden=true with adjacent text or named parent links/buttons.",
    "Shared navigation, table-of-contents, section cards and article cross-links use descriptive destination names.",
    "Source review found no positive tabindex or non-native click-only interactive elements in the scoped components; inspected keyboard targets receive a 2px solid focus outline.",
    "Source templates and content block definitions contain no data-table, interactive-grid, treegrid, sortable-table or table-pagination implementation.",
    "Tests cover locale behavior, header content, 404 responses, content rendering and heading fragment-link generation.",
    "The mobile menu opens with Enter and Space, updates aria-expanded, and its native navigation links are keyboard reachable; closed navigation is display:none and excluded from Tab order.",
    "The modal Search input is explicitly labelled on pages without a competing full-page search form.",
    "The search trigger opens with Enter, focuses the input, makes search result links keyboard reachable, and Escape closes the modal and restores trigger focus.",
    "The skip link is the first Tab stop, becomes visible, and Enter followed by Tab reaches a main-content link in production Chromium.",
    "Theme toggle and sampled standalone controls meet 24 CSS px target size; short inline content links use the inline-text exception.",
    "This audit includes source review, production HTML/axe scans, keyboard interaction, Chromium accessibility-tree inspection, mocked feedback submissions, and responsive/theme/accessibility preference checks documented in raw evidence.",
    "WCAG text-spacing override (line height 1.5, letter spacing .12em, word spacing .16em, paragraph spacing 2em) on homepage, overview, manage-pages and reference layouts caused no main-content overflow."
  ],
  "notes": [
    {
      "skill": "alt-text-headings",
      "note": "Coverage: crawl completed 238 navigations resulting in 197 unique final addresses: 153 successful HTML URLs (149 content paths plus four query aliases), 43 HTML 404 addresses and one plaintext .md resource. The synthetic browser wrapper for .well-known/agent-skills/wagtail-guide-support/SKILL.md was excluded from HTML structure checks."
    },
    {
      "skill": "alt-text-headings",
      "note": "Heading levels and landmark labels reported as n/a are structural improvements, not independently proven WCAG AA failures."
    },
    {
      "skill": "alt-text-headings",
      "note": "No screenshots were captured or inspected. Image alternatives were reviewed textually and against surrounding instructional prose; pixel-level equivalence and screenshot transcription completeness were not established."
    },
    {
      "skill": "alt-text-headings",
      "note": "32 empty-alt instructional image instances occur on 15 Icelandic/Brazilian Portuguese paths. Many have adjacent prose explaining the same action, so empty alt alone was not asserted as WCAG 1.1.1 failure. Editors should verify equivalent information: /is/releases/new-in-wagtail-4-1/ explicitly refers to looking at the preceding snippets screenshot; /is/how-to/finding-your-way-around/ and /pt-br/how-to-guides/find-your-way-around/ have seven and five empty-alt screenshots respectively; /is/tutorials/getting-started/ and /pt-br/getting-started/overview/ omit sign-in image descriptions."
    },
    {
      "skill": "alt-text-headings",
      "note": "Short alternatives such as Pin toolbar and page history replace current draft merit contextual editorial review, but no unsupported alternative-text inadequacy failure was asserted."
    },
    {
      "skill": "alt-text-headings",
      "note": "The language-of-parts finding concerns clearly English sentences/paragraphs, not single-word language names, product names, code or technical terms exempted by 3.1.2. Additional English fallback navigation/footer/control strings should be covered by the same translation remediation."
    },
    {
      "skill": "alt-text-headings",
      "note": "content/en/index.md contains an external Wagtail developer-documentation HTML export unlike the production guide home. Its markup was not used as production home evidence."
    },
    {
      "skill": "alt-text-headings",
      "note": "Detailed runtime evidence is raw/crawl.json and raw/page-46.html (French home), raw/page-70.html (Portuguese forms), raw/page-100.html (Icelandic content checks), raw/page-155.html (Arabic about). raw/structure-crawl.json provides the initial 45-English-page inventory."
    },
    {
      "skill": "aria-specialist",
      "note": "Search modal dialog name/focus behavior and live-region behavior are owned by separate domain specialists and are not duplicated here."
    },
    {
      "skill": "aria-specialist",
      "note": "Duplicate search IDs do not produce an absent Chromium accessible name: placeholder fallback names the modal field. The finding concerns the demonstrably broken explicit label relationship under 1.3.1, not removed WCAG 4.1.1."
    },
    {
      "skill": "aria-specialist",
      "note": "Language names in the selector use hreflang but no lang; adding lang to each localized label improves pronunciation. Single-word language names are not asserted as a clear 3.1.2 failure because that criterion has exceptions for proper names and indeterminate words."
    },
    {
      "skill": "aria-specialist",
      "note": "On-page contents are ordinary native fragment links; no custom tree, tab or menu semantics are needed."
    },
    {
      "skill": "aria-specialist",
      "note": "No screenshots captured or inspected; runtime evidence consists of DOM and Chromium accessibility-tree data."
    },
    {
      "skill": "aria-specialist",
      "note": "Broken modal search label relationship is confirmed in raw/aria-runtime.json and reported by forms-specialist, avoiding duplicate issue counts."
    },
    {
      "skill": "contrast-master",
      "note": "No screenshots were taken. Runtime evidence is saved in raw/visual-runtime.json, raw/visual-extra.json and raw/visual-zoom-search.json."
    },
    {
      "skill": "contrast-master",
      "note": "prefers-reduced-motion: reduce leaves the theme-switch .25s transition active. This is an enhancement opportunity, not an asserted WCAG AA failure for this brief user-triggered transition."
    },
    {
      "skill": "contrast-master",
      "note": "200% resize was tested with doubled root text size, not manual browser zoom."
    },
    {
      "skill": "contrast-master",
      "note": "Search input was inspected in both themes; autocomplete result styling should be corroborated by the dedicated search interaction audit."
    },
    {
      "skill": "forms-specialist",
      "note": "Duplicate ids are reported for their confirmed label-association consequence under 1.3.1; WCAG 2.2 removed 4.1.1, and the modal textbox still has a placeholder-derived name, so it is not reported as nameless under 4.1.2."
    },
    {
      "skill": "forms-specialist",
      "note": "Feedback controls are removed while focused, causing document.activeElement to become BODY; Chromium preserves the next sequential Tab location. Explicit focus on the newly revealed textarea or a completion message would improve continuity, but this test does not establish a separate 2.4.3 failure."
    },
    {
      "skill": "forms-specialist",
      "note": "Dynamic feedback and search-result announcements are handled by live-region-controller and are not duplicated here."
    },
    {
      "skill": "forms-specialist",
      "note": "Feedback JS catches network errors by logging to the console, and updateFeedback does not inspect HTTP response.ok before deleting the comment interface. Production server validation/error responses were not induced; error identification and recovery remain source-review limitations."
    },
    {
      "skill": "forms-specialist",
      "note": "No screenshots captured. Runtime evidence is saved to raw/forms-runtime.json, including both intercepted mock POST bodies."
    },
    {
      "skill": "keyboard-navigator",
      "note": "No screenshots were captured. Runtime evidence is in raw/keyboard-runtime.json, raw/keyboard-mobile.json and raw/keyboard-widgets.json."
    },
    {
      "skill": "keyboard-navigator",
      "note": "Feedback buttons were not activated because they POST to the production site; post-submission focus handling was reviewed in source only."
    },
    {
      "skill": "keyboard-navigator",
      "note": "Missing Escape dismissal alone is not treated as an independent WCAG failure for a non-modal navigation disclosure; it contributes to the confirmed obscured-focus defect."
    },
    {
      "skill": "keyboard-navigator",
      "note": "Search Tab traversal can briefly reach browser chrome (document.activeElement becomes BODY) before re-entering the input; no background page control was reached in the inspected modal sequence."
    },
    {
      "skill": "keyboard-navigator",
      "note": "Focus geometry and event behavior were checked with Chromium; this does not establish cross-browser or screen-reader conformance."
    },
    {
      "skill": "link-checker",
      "note": "Broken links are functional defects reported as n/a, not automatic WCAG 2.4.4 failures; their visible text still conveys intended purpose."
    },
    {
      "skill": "link-checker",
      "note": "The None links are language-selector links, not image wrappers. apps/custom_media/image_formats.py only changes the fullwidth rendition filter."
    },
    {
      "skill": "link-checker",
      "note": "Language names lack lang attributes despite hreflang on their destinations. Adding lang to each autonym can improve pronunciation; native language names may fall under the proper-name exception, so no unqualified 3.1.2 failure is asserted."
    },
    {
      "skill": "link-checker",
      "note": "Shared Markdown-view links open new tabs without warning. Add a consistent visible/accessible new-tab cue as usability guidance; target=_blank alone does not establish an AA violation."
    },
    {
      "skill": "link-checker",
      "note": "External destinations, private accounts and GitHub were not fetched."
    },
    {
      "skill": "link-checker",
      "note": "Source and crawl inspection establish programmatic link context; native screen-reader link-list output was not tested."
    },
    {
      "skill": "link-checker",
      "note": "Final completed crawl and successful-page link inventory reviewed: no unresolved internal heading fragments or standalone click here/read more/learn more/here links found."
    },
    {
      "skill": "link-checker",
      "note": "French section link is an additional functional broken destination, separate from unresolved language-selector None URLs."
    },
    {
      "skill": "link-checker",
      "note": "Supplemental feedback-tooltip behavior was explicitly requested with this link pass and is included here; it is a pointer-hover content failure under 1.4.13, independent of any missing Escape issue. No feedback request was sent during tooltip tests."
    },
    {
      "skill": "link-checker",
      "note": "Happy/Unhappy accessible button names are interpretable with the preceding Was this page helpful question, but matching the explicit tooltip purpose (This page was helpful / This page could be improved) in visible labels and accessible names would reduce ambiguity. This is usability guidance, not a separately scored naming failure."
    },
    {
      "skill": "live-region-controller",
      "note": "Runtime feedback evidence uses browser-routed mocked responses; no production feedback was submitted."
    },
    {
      "skill": "live-region-controller",
      "note": "Native screen reader speech was not tested; findings establish absent required status semantics rather than measured output from a particular screen reader."
    },
    {
      "skill": "live-region-controller",
      "note": "Clipboard and feedback catch branches log errors without user-visible outcomes. Clipboard failure and backend feedback errors were not exercised; add visible accessible error messages and verify error recovery."
    },
    {
      "skill": "live-region-controller",
      "note": "Source search requests have neither cancellation nor a latest-request check; a late response can restore stale counts/results after another query, blanking input, or closing the dialog. Address this alongside status announcements; no standalone WCAG failure is asserted without a reproduced user impact."
    },
    {
      "skill": "live-region-controller",
      "note": "Search loading is a CSS is-loading class with no status text/aria-busy. Include prolonged-loading messaging in the search-status remediation."
    },
    {
      "skill": "modal-specialist",
      "note": "Confirmed mobile focus-obscuring failure is already recorded in keyboard-navigator.json as KEYBOARD-MOBILE-OVERLAY-FOCUS; it is not duplicated here."
    },
    {
      "skill": "modal-specialist",
      "note": "axe-core 4.11.1 aria-dialog-name tags are cat.aria and best-practice, without WCAG tags. A WCAG-tag-only scan therefore omits it; the 4.1.2 mapping here is a manual assessment of the unnamed dialog interface."
    },
    {
      "skill": "modal-specialist",
      "note": "Normative naming requirement: WAI-ARIA dialog role requires an author-provided accessible name: https://www.w3.org/TR/wai-aria-1.2/#dialog ; WCAG name/role/value context: https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html ."
    },
    {
      "skill": "modal-specialist",
      "note": "No visible close button is supplied; Escape and backdrop dismissal work. A visible Close control would improve discoverability and touch/screen-reader operation, but its absence is not scored as an independent failure here."
    },
    {
      "skill": "modal-specialist",
      "note": "Mobile toggle aria-haspopup=\"true\" describes a menu popup although the disclosed content is ordinary navigation links; remove aria-haspopup for a navigation disclosure and consider aria-controls. This recommendation is not scored independently."
    },
    {
      "skill": "modal-specialist",
      "note": "No screenshots captured. Targeted runtime and axe evidence is saved to raw/modal-specialist-runtime.json; CSP bypass was enabled only in the isolated audit browser to inject axe."
    },
    {
      "skill": "playwright-scanner",
      "note": "Full raw URL/node incidence retained in raw/runtime-inventory.json; do not score each repeated node separately."
    },
    {
      "skill": "playwright-scanner",
      "note": "Text-spacing-only horizontal overflow is retained as supporting responsive evidence rather than automatically labelled a separate 1.4.12 failure."
    },
    {
      "skill": "playwright-scanner",
      "note": "No screenshots and no production feedback submissions were used."
    },
    {
      "skill": "playwright-scanner",
      "note": "Browser automation and axe cannot establish complete WCAG conformance or replace native screen-reader testing."
    },
    {
      "skill": "tables-data-specialist",
      "note": "Table captions, header scope/headers, merged cells, responsive data-table relationships, selection, sorting and virtual-grid keyboard operation are not applicable to the inspected production content."
    },
    {
      "skill": "tables-data-specialist",
      "note": "Default RichTextBlock and AnnotatedTextBlock are available to editors, but no table block or custom richtext table feature was found; source capability alone does not establish inaccessible live tables."
    },
    {
      "skill": "tables-data-specialist",
      "note": "Screenshots of Wagtail administrative listings embedded in documentation are images, not live data tables on this site; image accessibility is covered by the relevant specialist."
    },
    {
      "skill": "testing-coach",
      "note": "Coverage is a site-wide deep inspection of discovered public routes and shared components, not proof of WCAG conformance. Report exact completed crawl and responsive counts from final raw artifacts; do not report discovered, failed or pending addresses as successfully audited."
    },
    {
      "skill": "testing-coach",
      "note": "The generated numerical score grades this finding set. It is not a percentage of WCAG criteria satisfied, certification, or evidence that unflagged content conforms. List advisory n/a findings separately from conformance failures."
    },
    {
      "skill": "testing-coach",
      "note": "Native screen-reader speech was not tested. Chromium accessibility-tree output supports role/name/state evidence but cannot establish actual NVDA, JAWS, VoiceOver or TalkBack announcements. Screenshots were explicitly excluded."
    },
    {
      "skill": "testing-coach",
      "note": "Before closing remediation, test NVDA with Firefox and Chrome on Windows, VoiceOver with Safari on macOS/iOS, and TalkBack with Chrome on Android. Start with home, long Manage pages article, forms guide, a translated article, Arabic RTL home, search results and a translated 404."
    },
    {
      "skill": "testing-coach",
      "note": "Native screen-reader checklist: announce page title/language and browse headings/landmarks; follow skip link; identify current navigation page; confirm theme checked state; open mobile navigation and search; traverse overlays both directions; close and verify focus return; open search on a full search page; announce search results/no results; activate Copy page/link/prompt and verify success/failure; rate helpfulness, enter feedback and submit; verify outcome announcements and useful focus after removed controls."
    },
    {
      "skill": "testing-coach",
      "note": "Localization checklist: verify speech switches for real translated passages, RTL reading/focus order, translated control names/error messages, fallback routes and search/404 html lang. Review instructional image alternatives against source screenshots with an editor when visual inspection is permitted. Textual alt presence alone does not establish equivalent information."
    },
    {
      "skill": "testing-coach",
      "note": "Responsive checks at 320 CSS pixels approximate the reflow width associated with 400% desktop zoom, but do not replace actual browser zoom or 200% text-only zoom. Complete Firefox text-only enlargement and Chromium/Safari 200%/400% zoom checks; also test physical portrait/landscape, mobile browser zoom, focus indicators and target size/spacing."
    },
    {
      "skill": "testing-coach",
      "note": "Emulated forced-colors and reduced-motion preferences identify rendering differences but do not replace native Windows High Contrast and device tests. No flashing or required time-based task was found; animations and preference support still require review where new content is added."
    },
    {
      "skill": "testing-coach",
      "note": "Add Django assertions that normal/search/404 HTML has a valid locale language and distinct search-input IDs with correctly associated labels. Extend Vitest behavior tests to theme initial/toggled accessibility state and aria-current, alongside existing menu expanded-state assertions."
    },
    {
      "skill": "testing-coach",
      "note": "Add Playwright with @axe-core/playwright against a local Django fixture server in CI, after frontend build and database setup. Include WCAG 2.2 AA tags plus supplemental aria-dialog-name; scan initial and open states across home/article/search/404, light/dark and narrow/wide widths. Inject axe using its library with CSP handled explicitly; initial failed script injections are tooling errors, not site accessibility failures."
    },
    {
      "skill": "testing-coach",
      "note": "Add browser behavioral regressions for keyboard overlay traversal/focus visibility, modal opening on search pages, named dialogs, live count announcements, clipboard success/failure and feedback success/failure. Intercept feedback POSTs so CI and production smoke tests never create genuine feedback records."
    },
    {
      "skill": "testing-coach",
      "note": "Unit tests alone cannot measure real CSS visibility, overlap, contrast, reflow or accessibility-tree behavior. Browser assertions should verify user-observable outcomes, not just mirror class changes."
    },
    {
      "skill": "testing-coach",
      "note": "Run a focused re-audit after each remediation group, then repeat the complete discovered-route crawl and state matrix before release. Run shared-component smoke tests on each pull request and full production content scans periodically and after major CMS content/template changes; establish persistent finding IDs for future deltas."
    },
    {
      "skill": "testing-coach",
      "note": "Applicability requires continued review: WCAG 2.5.7 Dragging Movements, 3.3.7 Redundant Entry and 3.3.8 Accessible Authentication currently have no identified public-guide trigger, rather than being proved universally inapplicable. Public accessibility of admin authentication is a separate scope."
    },
    {
      "skill": "testing-coach",
      "note": "Cognitive review should emphasize clear labels and instructions under 2.4.6/3.3.2, consistent shared navigation/help under 3.2.3/3.2.6 and understandable feedback/errors. Reading level under 3.1.5 is AAA and should not be presented as an AA failure."
    },
    {
      "skill": "testing-coach",
      "note": "Clipboard Copy page name mutations may be announced by some assistive technology when focused; the strongest unannounced success evidence is Copy link/prompt changing a different control. Feedback comment success removes the form without visible confirmation: distinguish that absence and focus loss from an existing visible unannounced status message."
    },
    {
      "skill": "testing-coach",
      "note": "Full criterion-by-criterion coverage matrix saved in raw/wcag-coverage.json: all 55 WCAG 2.2 A/AA criteria, excluding removed 4.1.1. Status distinguishes confirmed failures, no issue found in tested scope, inapplicable public flow, and human verification still required."
    },
    {
      "skill": "testing-coach",
      "note": "Final validated scope:149 content paths/153 successful HTML addresses,43 HTML errors; dark desktop and 320 px mobile sweep completed for all 153 successful HTML addresses, excluding the plaintext synthetic wrapper."
    }
  ],
  "counts": {
    "critical": 0,
    "serious": 8,
    "moderate": 9,
    "minor": 4
  },
  "components": [
    {
      "component": "Search modal",
      "count": 2,
      "worst": "serious",
      "rules": [
        "LIVE-001",
        "MODAL-ACCESSIBLE-NAME"
      ]
    },
    {
      "component": "Theme toggle",
      "count": 2,
      "worst": "moderate",
      "rules": [
        "ARIA-THEME-STATE-001",
        "CONTRAST-003"
      ]
    }
  ],
  "score": 84,
  "grade": "B",
  "penalty": 62,
  "checks": 79,
  "generated": "2026-10-06",
  "template": "web"
}
```
