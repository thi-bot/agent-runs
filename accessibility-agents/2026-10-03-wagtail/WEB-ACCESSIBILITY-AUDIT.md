# Web Accessibility Audit

An audit of web content, run on 2026-10-03. Read the executive summary for the verdict, the priorities section for what to do first, and the findings tables for detail.

## Metadata

What was audited, with what, and under which settings.

| Field | Value |
|---|---|
| Date | 2026-10-03 |
| Scope | 202 items |
| Skills run | alt-text-headings, aria-specialist, cognitive-accessibility, contrast-master, cross-page-analyzer, forms-specialist, keyboard-navigator, link-checker, live-region-controller, modal-specialist, playwright-scanner, tables-data-specialist, testing-coach |
| Tooling | node v26.8.1, a11y-mcp-server 7.0.3 |
| Scan configuration | defaults, no config file found |
| Checks counted | 87 |

Audited:

- `.a11y-history/20261003T105725Z/raw/*.html`
- `.a11y-history/20261003T105725Z/raw/measure-*.json`
- `.a11y-history/20261003T105725Z/raw/states-*.json`
- `.a11y-history/20261003T105725Z/raw/states-000.json`
- `.a11y-history/20261003T105725Z/runtime/*.json`
- `.circleci/config.yml`
- `.github/workflows/test.yml`
- `client/scss/components/_button.scss`
- `client/scss/components/_listing.scss`
- `client/scss/components/_status-tag.scss`
- `client/scss/components/forms/_input-base.scss`
- `client/src/components/ChooserWidget/index.js`
- `client/src/components/ComboBox/ComboBox.tsx`
- `client/src/components/CommentApp/components/Comment/index.tsx`
- `client/src/components/CommentApp/components/CommentHeader/index.tsx`
- `client/src/components/Draftail/index.js`
- `client/src/components/Icon/Icon.tsx`
- `client/src/components/InlinePanel/index.js`
- `client/src/components/PageExplorer/PageExplorerItem.tsx`
- `client/src/components/PageExplorer/PageExplorerPanel.tsx`
- `client/src/components/Sidebar/menu/PageExplorerMenuItem.tsx`
- `client/src/components/Sidebar/menu/SubMenuItem.tsx`
- `client/src/components/Sidebar/modules/MainMenu.tsx`
- `client/src/components/StreamField/blocks/BaseSequenceBlock.js`
- `client/src/components/StreamField/blocks/FieldBlock.js`
- `client/src/controllers/BulkController.ts`
- `client/src/controllers/CloneController.ts`
- `client/src/controllers/DialogController.ts`
- `client/src/controllers/DrilldownController.ts`
- `client/src/controllers/DropdownController.ts`
- `client/src/controllers/KeyboardController.ts`
- `client/src/controllers/OrderableController.ts`
- `client/src/controllers/SwapController.ts`
- `client/src/controllers/TabsController.ts`
- `client/src/controllers/TagController.ts`
- `client/src/controllers/TooltipController.ts`
- `client/src/controllers/UnsavedController.ts`
- `client/src/entrypoints/admin/modal-workflow.js`
- `client/src/entrypoints/admin/privacy-switch.js`
- `client/src/includes/bulk-actions.js`
- `client/src/includes/chooserModal.js`
- `client/src/tokens/colorThemes.js`
- `client/tests/integration/PlaywrightEnvironment.js`
- `client/tests/integration/documents-upload.test.js`
- `client/tests/integration/editor.test.js`
- `client/tests/integration/expect-axe.js`
- `client/tests/integration/images-upload.test.js`
- `client/tests/integration/jest.config.js`
- `client/tests/integration/listing.test.js`
- `docs/contributing/developing.md`
- and 152 more

## Executive summary

Fail. Critical or serious findings must be fixed before this ships.

The headline numbers for this run.

| Measure | Value |
|---|---|
| Score | 85 out of 100 |
| Grade | B |
| Findings | 22 |
| Blocking (critical plus serious) | 8 |
| Verdict | Fail |

## Severity breakdown

Counts by severity, highest impact first.

| Severity | Count | What it means |
|---|---:|---|
| critical | 0 | Blocks a person from completing the task |
| serious | 8 | Major barrier with a difficult workaround |
| moderate | 13 | Real friction, workaround exists |
| minor | 1 | Noticeable but rarely blocking |

## Findings

22 findings, ordered by severity then by rule.

### Serious (8)

Each row names the rule, the criterion it fails, where it is, and what to change.

| Rule | WCAG | Location | Problem | Fix |
|---|---|---|---|---|
| `ARIA-004` | 4.1.2 A | client/src/components/Draftail/blocks/MediaBlock.js:110 | Rich text image and embed preview buttons have no accessible name when a thumbnail is present. | Give MediaBlock an explicit localized accessible label identifying its image/embed and action, supplied by ImageBlock/EmbedBlock (for example “Edit image: [alt text]” or “Edit embed: [title]”). Preserve decorative thumbnail alt="" without relying on it for the button name. |
| `FORM-DRAFTAIL-NAME` | 4.1.2 A | client/src/components/Draftail/index.js:213 | Draftail rich-text textboxes have no accessible name, including fifteen fields on the recipe editor. | Give each visible contenteditable textbox aria-labelledby pointing to its field or block label, or an equivalent translated aria-label; propagate this through Draftail options for both ordinary fields and StreamField widgets. |
| `FORM-MULTIUPLOAD-NAME` | 4.1.2 A | wagtail/images/templates/wagtailimages/multiple/add.html:26 | Multiple image and document upload file inputs have no accessible name. | Use an associated label for #fileupload in both upload templates; retain the visible “Or choose from your computer” text as the input name. Associate accepted-format and size instructions with aria-describedby. |
| `FORM-SUBMISSION-CHECKBOX-NAME` | 4.1.2 A | wagtail/contrib/forms/templates/wagtailforms/list_submissions.html:12 | Form-submission selection checkboxes have no names, so screen-reader users cannot identify the select-all control or selected record. | Label the header checkbox “Select all submissions” and label each row checkbox “Select submission …” with a meaningful row identifier, using labels or aria-label. |
| `FORM-TAG-INPUT-NAME` | 4.1.2 A | client/src/controllers/TagController.ts:63 | Tag-it replaces the labeled tag field with an unnamed text input. | After tag-it initializes, give its generated input an ID and associate the existing Tags label with it, or copy the field label through aria-labelledby; also preserve relevant descriptions and invalid state. |
| `KEYBOARD-FOCAL-CREATE` | 2.1.1 A; 2.5.7 AA | wagtail/images/static_src/wagtailimages/js/focal-point-chooser.js:4 | Image focal areas cannot be created or resized using the keyboard. | Expose labelled coordinate and size inputs or implement a focusable crop widget with keyboard create, move and resize actions; keep hidden model fields synchronized and provide a single-pointer alternative to dragging. |
| `LIVE-UPLOAD-OUTCOME` | 4.1.3 AA | wagtail/images/templates/wagtailimages/multiple/add.html:75 | Multiple-upload success and failure messages appear without announcements or focus changes. | Create a persistent upload status region before operations start; update it with the file name and completion, duplicate-warning or failure message. Route urgent errors through an existing alert region and batch multiple-file updates to prevent flooding. |
| `MODAL-001` | 4.1.2 A | client/src/entrypoints/admin/modal-workflow.js:66 | Legacy chooser dialogs lack an accessible name and do not expose their modal state, leaving background content exposed to assistive technology. | Give the chooser dialog aria-labelledby pointing to its loaded heading (with a unique stable ID) and aria-modal="true", updating the relationship on workflow body replacement. Prefer migrating this Bootstrap branch to the existing labelled a11y-dialog component or native showModal dialog. |

### Moderate (13)

Each row names the rule, the criterion it fails, where it is, and what to change.

| Rule | WCAG | Location | Problem | Fix |
|---|---|---|---|---|
| `ARIA-001` | 1.3.1 A | wagtail/admin/templates/wagtailadmin/workflows/includes/workflow_tasks_cell.html:5 | Workflow task links wrap list items, breaking the task list structure exposed to assistive technology. | Make each li a direct child of ul and place the task link inside its li; move the card styling to the link as needed to preserve its click area. Keep the extra-count li as another direct child. |
| `ARIA-002` | 4.1.2 A | wagtail/users/templates/wagtailusers/users/create.html:44 | The Roles shortcut in user creation and copying is exposed as a tab outside any tablist. | Remove role="tab" from the in-panel shortcut and use a link or native button to activate the Roles panel. In TabsController, write aria-selected only on actual tablist tabs, rather than every trigger; retain aria-controls and move focus appropriately. |
| `ARIA-003` | 4.1.2 A | client/src/components/Sidebar/menu/SubMenuItem.tsx:106 | Sidebar navigation and account disclosures announce a menu popup although their opened content has ordinary list/link semantics. | Remove aria-haspopup="menu" from SubMenuItem and the account button in MainMenu.tsx:279; retain the accurate aria-expanded disclosure state. Optionally add aria-controls with a stable panel ID. Keep native navigation lists and links. |
| `CONTRAST-FIELD-BOUNDARY` | 1.4.11 AA | client/scss/components/forms/_input-base.scss:12 | Empty form controls have low-contrast boundaries in both light and dark themes. | Increase border-field-default to at least 3:1 against field and surrounding page surfaces in both themes; retain separate inactive styling. Apply to controls whose empty editable extent is identified by their border. |
| `FORM-DRAFTAIL-DESCRIPTION-PROPAGATION` | 1.3.1 A | client/src/components/Draftail/index.js:161 | Draftail does not propagate field instructions and validation descriptions from its hidden backing field to the interactive textbox. | Read and preserve the backing field aria-describedby tokens and pass them to Draftail ariaDescribedBy, adding the length counter rather than replacing them; propagate aria-invalid to the visible textbox as validation changes. |
| `FORM-STREAMFIELD-ERROR-ASSOCIATION` | 1.3.1 A | client/src/components/StreamField/blocks/FieldBlock.js:153 | StreamField field errors are displayed beside inputs but are not programmatically associated with those inputs. | Include the existing ${prefix}-errors container in the widget aria-describedby tokens when invalid, preserving help-text tokens, and remove the error token when clear. Ensure custom widgets propagate the association to their interactive control. |
| `KEYBOARD-FOCAL-VISIBLE` | 2.4.7 AA | wagtail/images/static_src/wagtailimages/js/vendor/jquery.Jcrop.min.js:20 | The focal-point chooser receives keyboard focus in an offscreen radio input with no visible focus indicator. | Provide a visible, focusable focal-area control and draw an obvious focus indicator on the displayed image/widget when keyboard focus enters. |
| `LIVE-BULK-SELECTION-COUNT` | 4.1.3 AA | wagtail/admin/templates/wagtailadmin/bulk_actions/footer.html:7 | Bulk-selection totals change visually without a programmatic status announcement. | Maintain a persistent polite status region outside the initially hidden footer and update it with the selected-item total, including deselection to zero. Preserve checkbox focus and avoid announcing every row in a select-all operation. |
| `LIVE-LISTING-ZERO-RESULTS` | 4.1.3 AA | wagtail/admin/templates/wagtailadmin/generic/listing_results.html:37 | Generic AJAX search and filter zero-result messages lack status semantics, leaving users uninformed when no matches remain. | Announce zero matches through a persistent role=status region updated after the results swap, or provide equivalent status semantics to the empty-result message; use polite announcements for routine search feedback. |
| `LIVE-UPLOAD-PROGRESS-SEMANTICS` | 4.1.2 A | wagtail/images/templates/wagtailimages/multiple/add.html:55 | Upload progress indicators set aria-valuenow on unnamed generic divs without a progressbar role. | Use native progress elements with accessible names, or add role=progressbar, labels and min/max/current values to aggregate and per-file indicators. Give per-file indicators names containing the file name; announce completion separately. |
| `MODAL-002` | 2.4.3 A | wagtail/admin/static_src/wagtailadmin/js/vendor/bootstrap-modal.js:116 | Tab past the last chooser control moves focus outside the modal, where Escape no longer dismisses it. | Implement explicit Tab and Shift+Tab wrapping between the first and last focusable controls, including document-boundary cases, and handle Escape while the dialog is open. Migrating the shell to the existing a11y-dialog implementation or a native modal dialog can provide these behaviors. |
| `REFLOW-EDITOR-STATUS-TOOLBAR` | 1.4.10 AA | wagtail/admin/templates/wagtailadmin/shared/headers/slim_header.html:110 | The editor header requires horizontal scrolling to reach the Live-page control at 320 CSS pixels. | Allow the header status/action strip to wrap or move secondary actions into an accessible disclosure at narrow widths, so all controls fit within320px without horizontal scrolling. |
| `TABLE-001` | 1.3.1 A | wagtail/admin/templates/wagtailadmin/tables/column_header.html:2 | Sortable listings and form submissions expose the current sort column and direction only through visual classes and arrows. | Set aria-sort="ascending" or "descending" on the currently sorted th based on is_ascending/is_descending; clear it on other headers. Do the same using heading.order in wagtailforms/list_submissions.html. Preserve link titles describing the next action. |

### Minor (1)

Each row names the rule, the criterion it fails, where it is, and what to change.

| Rule | WCAG | Location | Problem | Fix |
|---|---|---|---|---|
| `CONTRAST-DISABLED-METADATA` | 1.4.3 AA | client/scss/components/_listing.scss:181 | The disabled-row style also dims ordinary table metadata to 1.65:1 contrast. | Restrict opacity changes to genuinely inactive controls; keep informational table cell text at 4.5:1. Review disabled chooser/listing rows so unavailable choices do not make their identifying metadata unreadable. |

## Remediation priorities

Fix these components first. Each one carries the same defect in several places, so one fix clears every instance.

| Component | Instances | Worst severity | Rules |
|---|---:|---|---|
| Image focal-point chooser | 2 | serious | `KEYBOARD-FOCAL-CREATE`, `KEYBOARD-FOCAL-VISIBLE` |

Then the 8 remaining blocking findings, in this order:

1. `ARIA-004` at client/src/components/Draftail/blocks/MediaBlock.js:110. Give MediaBlock an explicit localized accessible label identifying its image/embed and action, supplied by ImageBlock/EmbedBlock (for example “Edit image: [alt text]” or “Edit embed: [title]”). Preserve decorative thumbnail alt="" without relying on it for the button name.
2. `FORM-DRAFTAIL-NAME` at client/src/components/Draftail/index.js:213. Give each visible contenteditable textbox aria-labelledby pointing to its field or block label, or an equivalent translated aria-label; propagate this through Draftail options for both ordinary fields and StreamField widgets.
3. `FORM-MULTIUPLOAD-NAME` at wagtail/images/templates/wagtailimages/multiple/add.html:26. Use an associated label for #fileupload in both upload templates; retain the visible “Or choose from your computer” text as the input name. Associate accepted-format and size instructions with aria-describedby.
4. `FORM-SUBMISSION-CHECKBOX-NAME` at wagtail/contrib/forms/templates/wagtailforms/list_submissions.html:12. Label the header checkbox “Select all submissions” and label each row checkbox “Select submission …” with a meaningful row identifier, using labels or aria-label.
5. `FORM-TAG-INPUT-NAME` at client/src/controllers/TagController.ts:63. After tag-it initializes, give its generated input an ID and associate the existing Tags label with it, or copy the field label through aria-labelledby; also preserve relevant descriptions and invalid state.
6. `KEYBOARD-FOCAL-CREATE` at wagtail/images/static_src/wagtailimages/js/focal-point-chooser.js:4. Expose labelled coordinate and size inputs or implement a focusable crop widget with keyboard create, move and resize actions; keep hidden model fields synchronized and provide a single-pointer alternative to dragging.
7. `LIVE-UPLOAD-OUTCOME` at wagtail/images/templates/wagtailimages/multiple/add.html:75. Create a persistent upload status region before operations start; update it with the file name and completion, duplicate-warning or failure message. Route urgent errors through an existing alert region and batch multiple-file updates to prevent flooding.
8. `MODAL-001` at client/src/entrypoints/admin/modal-workflow.js:66. Give the chooser dialog aria-labelledby pointing to its loaded heading (with a unique stable ID) and aria-modal="true", updating the relationship on workflow body replacement. Prefer migrating this Bootstrap branch to the existing labelled a11y-dialog component or native showModal dialog.

The remaining 14 moderate and minor findings can follow in normal work.

## What passed

65 checks ran and found nothing.

- 25 pages underwent41 expanded tab/dropdown-state scans; overlap-induced dashboard target-size candidates were reviewed and excluded.
- All 100 runtime documents have nonempty descriptive page titles and lang=en-us; axe document-title/html-has-lang/html-lang-valid report no violations. Repeated titles such as New: Person describe equivalent creation/copy purposes and are not automatically failures.
- All100 pages have first25Tab samples and320px/text-spacing measurements; these are bounded observations, not complete keyboard or responsive conformance tests.
- All100 sampled admin pages returned HTTP200 and completed axe-core4.13 WCAG A/AA scans in Chromium152.
- All100 sampled pages underwent light-theme axe contrast checks; only styleguide disabled-row text was flagged.
- Base admin template maintains a role=status messages container before dynamic messages are appended; CloneController appends updates inside the existing region.
- Captured HTML of all 100 pages contains exactly one main landmark and one Skip to main content link whose #main target exists. Source skeleton.html:36 connects skip navigation to w-focus; base.html:9 supplies main.
- Chooser Edit this item links include aria-describedby pointing to the selected item title. Placeholder links are hidden until a real choice exists.
- Chooser choose/clear controls use native buttons; decorative SVG icons in sidebar markup are hidden from assistive technology.
- Collection permission option checkboxes have visually hidden associated labels.
- Comment editor uses focus-trap and initialFocus for active comments; no general claim that every local comment mutation requires a separate live announcement.
- Confirmed existing axe matcher, Jest+Playwright integration configuration and CircleCI UI execution; no duplicate framework installation recommended.
- Confirmed project documentation explicitly lists NVDA+Firefox ESR and VoiceOver+Safari accessibility targets.
- Dark-theme color-contrast axe checks pass on users/new, pages69edit, site-history and account after removing light-theme class and allowing transitions to settle.
- Dashboard expanded-dropdown target-size flags concern date rectangles partly covered by popup; visible portion still has24px-circle spacing, so no confirmed2.5.8 failure was recorded.
- Dashboard expanded-menu target-size results were manually triaged in contrast review; popup overlap artifact was excluded rather than treating every sub24px target as nonconforming.
- Dashboard first Tab reaches visible skip link; Enter transfers focus to #main.
- Desktop800px focus-obscuration candidates in user creation and workflow editor were rechecked with600ms-perTab: target controls remained visible above footer after settling. Initial fastTab geometry was not treated as a confirmed2.4.11 failure.
- Document download/source links use filenames conveying target identity and extension.
- DrilldownController updates aria-expanded on matching submenu toggles.
- Escape dismisses legacy chooser while focus remains inside; its Close button is named.
- Form submissions table is enclosed in a local w-overflow-auto form rather than assuming all horizontal table scrolling is a reflow failure.
- Image URL preview scroll container is reached by Tab in Chromium 152 through implicit scroll-container focusability; axe missing-tabindex result is not a confirmed Chromium keyboard failure.
- Image source review confirms chooser thumbnails deliberately use empty alt because the chosen image title is adjacent; listing thumbnails accompany named image links; meaningful image edit/inspect previews provide descriptive text alternatives.
- Image, page and document chooser fragments load within the production ModalWorkflow shell and focus initially lands on its dialog container.
- InlinePanel.initialFocus moves focus to newly created forms; StreamField sequence additions support focusing the inserted block. Live-region announcements are not required for every mutation where meaningful focus movement conveys context.
- KeyboardController respects user setting disabling shortcuts.
- Legacy chooser close reenables and attempts to return focus to the triggering element; verified source callbacks and visible account-trigger probe.
- Measured first25 Tab focus outlines throughout100 pages use visible3px green outlines; green #00a885 on white is3.03:1. Separate focal-point offscreen focus defect is owned by keyboard-navigator.
- Native table/thead/tbody/th structure supports column associations across inspected listings, reports, history, usage, and dashboard tables; absence of scope/caption alone was not treated as failure.
- No click-here/read-more/learn-more ambiguity found in scoped admin link-source search.
- No image-alt, svg-img-alt, role-img-alt or input-image-alt axe violations across all 100 documents.
- No table header association violations were returned by the available WCAG-tagged axe scans across 100 runtime pages.
- Nonzero generic search/filter counts and chooser search results have explicit announcement semantics; no missing-announcement finding asserted for those states.
- OrderableController provides ArrowUp/ArrowDown reordering and explicitly restores handle focus.
- OrderableController sends a success message through w-messages:add after a successful reorder request.
- Page explorer declares aria-haspopup="dialog" and opens a labelled role="dialog" component; this relationship is consistent in source.
- Page-list explorer icon links carry specific aria-label values naming their target page. History icon links have explicit translated names.
- PageExplorer icon links are named by the translated title prop rendered as adjacent visually hidden text by Icon.tsx; the SVG itself is correctly hidden.
- Pagination has a named navigation landmark, page counts and aria-current=page on the current link; unavailable previous/next links omit href.
- Pagination links sit within a named Pagination landmark; numbered links identify page targets and current page has aria-current=page. Disabled Previous/Next without href are inert indicators, not inaccessible actionable links.
- Permission matrices provide per-checkbox names including their object/action; native table semantics and fieldset/legend grouping retained.
- Privacy dialog uses role=dialog, aria-modal=true and aria-labelledby=title-set-privacy, and closes on Escape in runtime.
- Rechecked chooser text-spacing candidates using glyph Range bounds: labels remained inside controls; apparent scrollHeight clipping did not remove text.
- Repeated row actions such as Edit and live have programmatically determinable table-row context identifying the affected page or object. AA2.4.4 does not require every link to be unique in an isolated link list.
- Representative page editor landmarks are distinguishably named Main menu, Breadcrumb, Actions, Minimap, Side panels and Actions (footer).
- Representative200% text-size checks used doubled precomputed font sizes on user creation, form-page editor, site-history and account; no verified content loss.
- Reviewed 5,191 anchor elements in 100 captured rendered documents; no link-name or label-content-name-mismatch axe violations across initial100 documents or41 expanded tab/dropdown states.
- Runtime heading inventories identify meaningful report/list/form headings. Sidebar section H2 headings precede main H1 in DOM but represent separate landmark sections; no information-loss finding is asserted solely from that order.
- Settled320px tests reproduce document/body widths320 on suspect site-history, history and form-editor pages; excess table width stays inside table scrollers and was not counted as reflow failure.
- Shared dialog template provides a labelled heading and named close button; DialogController delegates focus management to a11y-dialog.
- Shared formatted fields render associated labels, separately identified help and error containers. FieldPanel passes aria-describedby and aria-invalid for ordinary supported widgets.
- Shared icon template hides decorative SVG icons using aria-hidden=true. Captured HTML confirms rendered icon SVGs are hidden; the remaining inline SVG consists of sprite definitions.
- Sidebar expansion state follows React isOpen/accountSettingsOpen state.
- Sidebar page explorer is a labelled nonmodal dialog; runtime opens with focus in the explorer and Escape clears its trigger aria-expanded state.
- Source review: UnsavedController warns before leaving forms with pending changes.
- Source review: consistent Help submenu is registered centrally and sidebar components repeat across sampled admin pages.
- Source review: default login uses normal text/password inputs and no paste-blocking handler was found. No CAPTCHA or puzzle appears in the reviewed default authentication template.
- Source review: generic, page, image and user deletion present explicit confirmation and cancellation before mutation; page deletion also describes affected descendants/translations and offers unpublishing.
- Source review: password creation exposes password-validator instructions and mismatch errors; confirmation passwords use autocomplete=new-password. Security confirmation is an exception to redundant-entry requirements.
- StreamField and InlinePanel provide native up/down buttons as alternatives to sorting by drag.
- TabsController validates tab panel IDs and supplies aria-controls, selected-tab tabindex and keyboard navigation handlers.
- Targeted runtime tests verified dashboard skip link, existing drag-reordering alternatives, chooser Escape within dialogs, shared privacy dialog name/modality and sidebar PageExplorer dismissal.
- User creation password fields explicitly set autocomplete=new-password.
- WCAG-tagged axe checked applicable ARIA validity, permitted attributes, roles and relationships; native form/link/button naming, list structure and table associations. Confirmed exceptions are correlated to canonical findings.

## Needs a human

Items a skill could not decide, or could not check automatically.

- **alt-text-headings**: Six snippet create/edit/copy documents have no H1 and use H2 for the object title and field headings. A top-level H1 would improve navigation consistency, but the document title and named section structure convey purpose; absence of H1 alone is not asserted as a WCAG failure.
- **alt-text-headings**: No screenshots were captured. Alternative-text review assessed markup, names and context; fidelity of descriptive image prose to all original media pixels was not independently established.
- **alt-text-headings**: User-generated rich-text content, future uploads and third-party media require authoring review; this audit covers the archived sample state.
- **alt-text-headings**: Icon-only control accessible-name defects are covered by the ARIA specialist to avoid duplicate findings.
- **aria-specialist**: Draftail accessible-name failures on page 82 edit and styleguide were corroborated in runtime; they are assigned to the forms specialist to avoid duplicate findings.
- **aria-specialist**: Reviewed archived captured DOM and available runtime axe results alongside source; did not independently drive browser interaction or screen readers.
- **aria-specialist**: Static archive cannot validate server-side validation and chooser selection responses.
- **aria-specialist**: ComboBox command-palette mode disables its own search input and delegates typing to the editor; active-descendant announcements and preview-button navigation need interactive screen-reader verification, and are not asserted as confirmed failures here.
- **cognitive-accessibility**: Authentication was source-reviewed only: no login/password reset/MFA, session timeout, password-manager autofill or successful server authentication was exercised. Login form autocomplete=off is a usability improvement candidate; it alone does not prove3.3.8 failure while password paste remains available.
- **cognitive-accessibility**: Redundant-entry checks are limited to visible forms and source; no complete backend multi-step workflow was executed. No verified3.3.7 failure was found.
- **cognitive-accessibility**: No timed session or timeout warning was exercised; do not claim2.2.1 compliance from this static archive.
- **cognitive-accessibility**: Plain-language recommendations are unscored: consider expanding technical terms such as redirect permanence, rendition filters and workflow tasks in inline help for occasional administrators. No reading-level/COGA advice was counted as a WCAGAA defect.
- **cognitive-accessibility**: Fast sequential-tab geometry at320px included smooth-scroll transition snapshots and intentionally offscreen collapsed minimap content; these candidates were not asserted as failures without settled visibility verification.
- **contrast-master**: Source includes forced-colors and increased-contrast adaptations, plus reduced-motion safeguards for selected components; interactive animations were not exhaustively measured and lack of a global reduction rule alone is not an AA failure.
- **contrast-master**: The editor toolbar reflow finding concerns non-table controls; data-table horizontal scrolling is an allowed two-dimensional-layout exception.
- **contrast-master**: Automatic text-spacing and overflow candidates were manually triaged using DOM geometry without screenshots.
- **cross-page-analyzer**: Mechanical consolidation: 22 unique component defects, 41 accepted initial axe nodes from 43 raw candidates; no additional findings invented.
- **cross-page-analyzer**: Source-only unexercised states are distinguished from verified URL/node mappings in raw/cross-page-analysis.json.
- **cross-page-analyzer**: Official scoring module used consistently: weights10/5/2/1, confidence scaling, normalized denominator and grades90/80/70/60; alternative skill-reference formula not used.
- **cross-page-analyzer**: Scores measure bounded evidence and applicability; no score establishes WCAG conformance.
- **cross-page-analyzer**: Component-level fix jobs, all100 page scorecard rows, observed/source applicability and exclusion records are saved in raw/cross-page-analysis.json.
- **cross-page-analyzer**: No baseline or complete accessibility-tree snapshots available; remediation delta and structural consistency score are unavailable.
- **cross-page-analyzer**: This mechanical payload adds no passed statements, preserving the renderer's meaningful-check denominator.
- **forms-specialist**: Archive POST validation, upload completion and server-side error responses were not exercised; these require a live writable test environment.
- **forms-specialist**: StreamField error association and Draftail validation-description propagation are source-confirmed findings; interactive invalid-state runtime testing is pending.
- **forms-specialist**: No missing autocomplete finding is asserted for editing another user’s information; WCAG 1.3.5 concerns information about the person using the form.
- **keyboard-navigator**: Runtime tests used isolated Chromium and real Tab/Enter/Escape key events; no persisted writes.
- **keyboard-navigator**: Archive cannot validate successful uploads, server validation redirects or successful saves. Full screen-reader behaviour and Firefox/Safari scroll-container behaviour remain untested.
- **keyboard-navigator**: Focus restoration improvement: StreamField/InlinePanel deletion and Escape from dropdown/sidebar leave activeElement BODY, but subsequent Tab resumes logically (Insert block, Add author, listing Search and following Help trigger respectively); not recorded as confirmed 2.4.3 failures.
- **link-checker**: New-tab warnings and file size disclosure can improve usability but are not universally required by WCAG2.2AA; their omission is not reported as an automatic failure.
- **link-checker**: Equivalent neighboring image/text links and repeated names with adequate table context are not automatically AA failures.
- **link-checker**: Archive route availability and HTTP errors were not treated as link-purpose defects.
- **link-checker**: Populated tag-it widgets have nonfocusable remove anchors, but keyboard removal has an alternate Backspace/Delete path; keyboard specialist owns that interaction assessment.
- **link-checker**: Expanded-state artifacts contain rule results rather than full accessibility snapshots; their link-name and label-content-name-mismatch results were reviewed.
- **live-region-controller**: Bulk checkbox/count runtime probe stored in raw/live-region-runtime.json. It verifies DOM semantics rather than audible output from a physical screen reader.
- **live-region-controller**: Real uploads, save outcomes and true empty query responses cannot be validated end to end against this static archive. Their reported omissions are established from source paths rather than archive network failures.
- **live-region-controller**: Search result counts commonly use role=alert, which is assertive. Polite status feedback would be less disruptive, but assertiveness alone is not reported as a WCAG failure.
- **live-region-controller**: Counter updates and selection states were assessed as status messages only when they provide operation-result information; not every DOM change is treated as requiring a live region.
- **modal-specialist**: Runtime evidence saved as raw/modal-runtime.json and raw/modal-focus.json; no screenshots taken.
- **modal-specialist**: Chooser probes invoked the production ModalWorkflow API against actual archived image/page/document fragments, without POST requests or fabricated backend responses.
- **modal-specialist**: Initial page 68 chooser controls and privacy triggers were hidden in the default archived panel state, so chooser opening was probed through its actual JavaScript API; hidden-trigger focus return from that probe is not reported as a defect.
- **modal-specialist**: The focus-boundary probe used a visible sidebar account button as the ModalWorkflow trigger to separate chooser-shell behavior from hidden editor panels.
- **modal-specialist**: Privacy dialog opening was probed using its production show event; server-backed privacy submission, validation, nested workflow replacement, and screen-reader virtual cursor behavior remain unverified.
- **modal-specialist**: No failure is asserted merely because the existing implementation uses div rather than native dialog.
- **playwright-scanner**: Scored runtime findings reuse the exact canonical rule and file:line so rendering can deduplicate them; source-only defects are deliberately absent.
- **playwright-scanner**: 43 initial node candidates remain preserved in raw/runtime-correlation.json and individual runtime files. Multiple nodes can share one component finding.
- **playwright-scanner**: Image URL scroll-container axe warning was disproved by actual Tab focus in Chromium152; Firefox/Safari behavior remains untested.
- **playwright-scanner**: Inactive chooser title contrast is excluded; ordinary disabled-row metadata contrast is retained separately.
- **playwright-scanner**: Expanded dashboard target-size failures were popup-overlap artifacts and are not scored.
- **playwright-scanner**: Settled suspect table/report widths stay in local scrollers; no data-table reflow failure inferred. Editor non-table toolbar overflow is separately confirmed.
- **playwright-scanner**: No screenshots, screen-reader audible-output tests, persisted writes, successful POST flows or full100-page keyboard journeys were performed.
- **playwright-scanner**: Static archive coverage limits include missing Handsontable and fileupload validation assets and unavailable editing-session pings.
- **playwright-scanner**: raw/runtime-correlation.json maps each initial axe node to its accepted canonical finding or exclusion reason and records aggregate passing rule IDs.
- **tables-data-specialist**: Reflow candidates /reports/aging-pages/ and /reports/site-history/ are assigned to the contrast/visual specialist to avoid duplicate reporting.
- **tables-data-specialist**: Workflow task list structure and form submission checkbox names are handled by aria-specialist and forms-specialist.
- **tables-data-specialist**: Workflow-history task matrix uses ordinary td revision labels; consider th scope=row for stronger revision associations when multiple revisions are present. Archived examples contain only Initial Revision, so this enhancement is not scored as a confirmed defect.
- **tables-data-specialist**: BulkController represents partial selection as unchecked rather than indeterminate; no misleading visual mixed state was established, so this is an enhancement rather than a scored failure.
- **tables-data-specialist**: Handsontable JS on page 82 is unavailable in the archive (404), so dynamic TableBlock grid keyboard/header behavior could not be verified.
- **tables-data-specialist**: Review included source templates and captured runtime/table markup, plus parent-generated viewport measurements; no screen-reader table navigation or backend pagination/sort response was tested.
- **testing-coach**: Existing Jest/Playwright axe integration is already present; extend client/tests/integration and existing CircleCI UI tests. GitHub test.yml is the backend matrix.
- **testing-coach**: Run npm run test:unit for focused component/controller tests; run TEST_ORIGIN=http://localhost:8000 npm run test:integration -- --runInBand against disposable writable Django UI fixtures, following docs/contributing/developing.md.
- **testing-coach**: After fixing Draftail names, remove editor.test.js placeholder exclusion; re-enable chooser tests and remove modal blanket exclusion as chooser fixes land. Do not add broad exclusions to hide findings.
- **testing-coach**: Manual matrix: NVDA+Firefox ESR on Windows and VoiceOver+Safari on macOS. Record actual announcements, browser/AT versions, exact steps and expected/actual behavior. No audible screen-reader testing was performed in this audit.
- **testing-coach**: Draftail labels and validation: Extend editor.test.js with a page containing ordinary rich text plus nested/list/StreamField rich text. Assert getByRole(textbox,{name:fieldLabel}) uniquely resolves the visible contenteditable; assert aria-describedby resolves all help/error/counter IDs. Trigger a required/max-length validation error and inspect aria-invalid on the interactive textbox. After fixes remove the global placeholder selector exclusion and rerun axe. With NVDA+Firefox ESR and VoiceOver+Safari, navigate by form controls; each editor announces its label, help, required/error state and error message without navigating to the hidden backing input.
- **testing-coach**: Tags and submissions: Add a populated tag fixture to image/document/page editors, assert the generated tag-entry textbox has the visible field name. On a submissions listing assert each row checkbox has a meaningful unique name and the select-all checkbox is named. Run axe before and after adding/removing a tag. Enter, select and remove a tag without a pointer; verify label/selection/removal context. Select a submission by its announced record identifier.
- **testing-coach**: Uploads and status: Extend existing images-upload.test.js and documents-upload.test.js: use getByLabel for file input, assert progress role/name/value during a deliberately delayed upload, inspect a persistent status region for success and invalid-size/type/server failure text. Keep existing didPost=false validation assertion. On a writable disposable backend upload valid and invalid fixtures with NVDA/Firefox and VoiceOver/Safari. Record actual speech for filename/progress/completion/errors; do not require every percentage change to interrupt speech.
- **testing-coach**: Chooser boundary and name: Re-enable skipped image/page/embed chooser tests in editor.test.js after fixes; include modal content in axe. Assert role=dialog has an accessible name and aria-modal=true, Tab/Shift+Tab stay within it, Escape dismisses from every focus position, focus returns to original chooser trigger. Open and close each chooser with keyboard and screen reader; verify dialog title, background is unavailable, result selection works, final Tab and Shift+Tab never escape.
- **testing-coach**: Image focal area: Extend image editor coverage with keyboard-only create/move/resize of a focal area and assert resulting coordinates; verify every focused control has a visible rendered indicator. Exercise a pointer alternative that does not require dragging. Create/move/resize/reset focal area without mouse; repeat at zoom and Windows Contrast themes. Check offscreen native radio does not consume focus without a visible indicator.
- **testing-coach**: Sort and bulk results: Extend listing.test.js and submission fixtures: activate each sortable header, assert current column aria-sort and direction update. Select one/all/zero items and assert a persistent polite status region receives accurate counts. Search an impossible term and verify a zero-result status update. On screen reader, identify current sort and direction from header navigation; operate sort, selection and empty search while focus stays on the initiating control and hear one concise result announcement.
- **testing-coach**: Field boundaries and metadata contrast: Retest computed field border/background combinations in light/dark modes and enabled/disabled-row metadata states. Assert at least 3:1 for necessary enabled-control boundaries and 4.5:1 for normal informational text; preserve disabled-control exemption. Review empty inputs against surrounding surfaces in light/dark themes and Windows Contrast themes, including controls without placeholder text.
- **testing-coach**: Editor narrow layout and spacing: Repeat editor toolbar at320 CSS pixels and text-spacing override (line-height1.5, paragraph2em, letter.12em, word.16em). Assert essential Live-page control is reachable without page/container horizontal scrolling where no exception applies. At400% browser zoom, use keyboard to reach all header/actions/side panels; check focus is visible and not obscured by sticky furniture.
- **testing-coach**: Table blocks and static-asset gaps: Run writable-backend editor fixture containing actual table and typed-table blocks; ensure Handsontable assets load and run keyboard insertion/editing, row/column changes and axe in expanded editors. Verify fileupload validation assets load before upload assertions. Do not interpret static-archive404s as component WCAG failures. Retest unloaded widgets with their real assets and report any residual inability to navigate/edit tables.
- **testing-coach**: The documented project target is WCAG2.1AA; this requested audit uses2.2AA including dragging alternatives and focus-not-obscured.
- **testing-coach**: Automated checks and DOM state probes do not verify actual speech or establish complete conformance.
- **testing-coach**: Use disposable test data on a live backend for saves/uploads/invalid POSTs; no real production mutations were performed.

## Next steps

1. Fix the 8 blocking findings above, starting with any repeated component.
2. Re-run this audit and check the delta section for regressions.
3. Wire the scan into continuous integration so the next regression is caught before review.

Automated checks find a minority of accessibility barriers. A passing score is a floor, not a guarantee.

## Audit coverage

This is a sampled deep review of **100 full admin documents** against [WCAG 2.2 AA](https://www.w3.org/TR/WCAG22/), combining source review, axe, and targeted browser interaction. [Full selected URL manifest](.a11y-history/20261003T105725Z/raw/scope.json) and [discovered routes](.a11y-history/20261003T105725Z/raw/discovery.json) record selection. Sprites, block previews, preview pages, and pagination beyond page 1 were excluded. Chooser fragments were additionally tested inside their actual dialog shells.

| Check | Coverage |
|---|---|
| Initial axe | 100/100 successful HTTP 200 scans; 16 documents with raw candidate violations |
| Candidate nodes | 43 raw; 41 accepted after review; 2 excluded |
| Expanded states | 41 tab/dropdown scans on 25 documents |
| Keyboard sampling | First 25 Tab stops on all 100 documents, plus targeted editor, focal area, and chooser interactions |
| Reflow and text spacing | 320 CSS-pixel and spacing measurements on all 100; candidates rechecked after layout settled |
| Additional theme/text-size checks | Representative dark-theme and 200% text-size checks; see contrast payload |
| Tools | Chromium 152.0.7977.82; Playwright 1.63.0; axe-core 4.13.0 |
| Axe tags | wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa |
| Source | Current checkout ae4a16d; operator confirmed accessibility/UX equivalence to deployed 7.4 |
| Screen readers | DOM semantics checked; audible NVDA/VoiceOver sessions were not performed |
| Source modifications | None; no persisted backend writes or screenshots |

The headline score and grade are the skill renderer's heuristic, **not a WCAG conformance percentage**. It uses critical/serious/moderate/minor weights 10/5/2/1, confidence factors 1/0.7/0.4, and normalizes against findings plus named passing checks. The grade thresholds are A 90, B 80, C 70, D 60, F below 60. The failing verdict is driven by the confirmed serious barriers, irrespective of a high numerical grade.

The static archive cannot establish successful saves, uploads, validation redirects, real search responses, collaboration-session behavior, or authentication flows. Source-only findings retain that status. 2 static JS assets were unavailable and were not counted as accessibility failures:

- https://static-wagtail-v7-4.netlify.app/static/table_block/js/vendor/handsontable-6.2.2.full.min.js?v=ddc5feba
- https://static-wagtail-v7-4.netlify.app/static/wagtailadmin/js/vendor/jquery.fileupload-validate.js?v=ddc5feba

## Runtime rule cross-reference

Full raw output is retained per document under [runtime evidence](.a11y-history/20261003T105725Z/runtime). [Candidate dispositions and canonical rule mappings](.a11y-history/20261003T105725Z/raw/runtime-correlation.json) preserve axe selectors and help links.

| Axe rule | Candidate nodes | Accepted nodes | Canonical findings |
|---|---:|---:|---|
| [list](https://dequeuniversity.com/rules/axe/4.13/list) | 1 | 1 | ARIA-001 |
| [listitem](https://dequeuniversity.com/rules/axe/4.13/listitem) | 1 | 1 | ARIA-001 |
| [aria-input-field-name](https://dequeuniversity.com/rules/axe/4.13/aria-input-field-name) | 26 | 26 | FORM-DRAFTAIL-NAME |
| [color-contrast](https://dequeuniversity.com/rules/axe/4.13/color-contrast) | 3 | 2 | CONTRAST-DISABLED-METADATA |
| [label](https://dequeuniversity.com/rules/axe/4.13/label) | 8 | 8 | FORM-SUBMISSION-CHECKBOX-NAME, FORM-MULTIUPLOAD-NAME, FORM-TAG-INPUT-NAME |
| [aria-required-parent](https://dequeuniversity.com/rules/axe/4.13/aria-required-parent) | 2 | 2 | ARIA-002 |
| [scrollable-region-focusable](https://dequeuniversity.com/rules/axe/4.13/scrollable-region-focusable) | 1 | 0 | Excluded after review |
| [button-name](https://dequeuniversity.com/rules/axe/4.13/button-name) | 1 | 1 | ARIA-004 |

## Initial axe-only page scorecard

These scores summarize only accepted initial axe candidates, using the same scoring function as the headline renderer. Source-only and interaction findings are listed in the main findings and evidence sections; a 100 here does not establish that the page is accessible. Each raw candidate node counts once for this table; shared source defects count once in the main report.

| Page | Title | Axe-only score | Grade | Accepted nodes | Raw evidence |
|---|---|---:|---|---:|---|
| [/admin/](https://static-wagtail-v7-4.netlify.app/admin/) | Dashboard - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/000.json) |
| [/admin/account/](https://static-wagtail-v7-4.netlify.app/admin/account/) | Account - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/001.json) |
| [/admin/pages/search/](https://static-wagtail-v7-4.netlify.app/admin/pages/search/) | Search - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/002.json) |
| [/admin/reports/locked/](https://static-wagtail-v7-4.netlify.app/admin/reports/locked/) | Locked pages - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/003.json) |
| [/admin/reports/workflow/](https://static-wagtail-v7-4.netlify.app/admin/reports/workflow/) | Workflows - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/004.json) |
| [/admin/reports/workflow_tasks/](https://static-wagtail-v7-4.netlify.app/admin/reports/workflow_tasks/) | Workflow tasks - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/005.json) |
| [/admin/reports/site-history/](https://static-wagtail-v7-4.netlify.app/admin/reports/site-history/) | Site history - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/006.json) |
| [/admin/reports/aging-pages/](https://static-wagtail-v7-4.netlify.app/admin/reports/aging-pages/) | Aging pages - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/007.json) |
| [/admin/reports/page-types-usage/](https://static-wagtail-v7-4.netlify.app/admin/reports/page-types-usage/) | Page types usage - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/008.json) |
| [/admin/searchpicks/reports/search-terms/](https://static-wagtail-v7-4.netlify.app/admin/searchpicks/reports/search-terms/) | Search terms - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/009.json) |
| [/admin/forms/](https://static-wagtail-v7-4.netlify.app/admin/forms/) | Forms - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/010.json) |
| [/admin/workflows/list/](https://static-wagtail-v7-4.netlify.app/admin/workflows/list/) | Workflows - Wagtail | 97 | A | 2 | [JSON](.a11y-history/20261003T105725Z/runtime/011.json) |
| [/admin/workflows/edit/1/](https://static-wagtail-v7-4.netlify.app/admin/workflows/edit/1/) | Editing workflow: Moderators approval - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/012.json) |
| [/admin/workflows/disable/1/](https://static-wagtail-v7-4.netlify.app/admin/workflows/disable/1/) | Disable workflow: Moderators approval - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/013.json) |
| [/admin/workflows/tasks/index/](https://static-wagtail-v7-4.netlify.app/admin/workflows/tasks/index/) | Workflow tasks - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/014.json) |
| [/admin/workflows/tasks/add/wagtailcore/groupapprovaltask/](https://static-wagtail-v7-4.netlify.app/admin/workflows/tasks/add/wagtailcore/groupapprovaltask/) | New workflow task: Group approval task - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/015.json) |
| [/admin/workflows/tasks/edit/1/](https://static-wagtail-v7-4.netlify.app/admin/workflows/tasks/edit/1/) | Editing Group approval task: Moderators approval - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/016.json) |
| [/admin/workflows/tasks/disable/1/](https://static-wagtail-v7-4.netlify.app/admin/workflows/tasks/disable/1/) | Disable task: Moderators approval - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/017.json) |
| [/admin/users/](https://static-wagtail-v7-4.netlify.app/admin/users/) | Users - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/018.json) |
| [/admin/groups/](https://static-wagtail-v7-4.netlify.app/admin/groups/) | Groups - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/019.json) |
| [/admin/locales/](https://static-wagtail-v7-4.netlify.app/admin/locales/) | Locales - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/020.json) |
| [/admin/collections/](https://static-wagtail-v7-4.netlify.app/admin/collections/) | Collections - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/021.json) |
| [/admin/redirects/](https://static-wagtail-v7-4.netlify.app/admin/redirects/) | Redirects - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/022.json) |
| [/admin/searchpicks/](https://static-wagtail-v7-4.netlify.app/admin/searchpicks/) | Promoted search results - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/023.json) |
| [/admin/sites/](https://static-wagtail-v7-4.netlify.app/admin/sites/) | Sites - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/024.json) |
| [/admin/settings/base/genericsettings/1/](https://static-wagtail-v7-4.netlify.app/admin/settings/base/genericsettings/1/) | Editing: Generic settings - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/025.json) |
| [/admin/settings/base/sitesettings/2/](https://static-wagtail-v7-4.netlify.app/admin/settings/base/sitesettings/2/) | Editing: Site settings - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/026.json) |
| [/admin/styleguide/](https://static-wagtail-v7-4.netlify.app/admin/styleguide/) | Styleguide - Wagtail | 96 | A | 3 | [JSON](.a11y-history/20261003T105725Z/runtime/027.json) |
| [/admin/images/](https://static-wagtail-v7-4.netlify.app/admin/images/) | Images - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/028.json) |
| [/admin/documents/](https://static-wagtail-v7-4.netlify.app/admin/documents/) | Documents - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/029.json) |
| [/admin/pages/](https://static-wagtail-v7-4.netlify.app/admin/pages/) | Exploring: Root - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/030.json) |
| [/admin/collections/add/](https://static-wagtail-v7-4.netlify.app/admin/collections/add/) | Add collection: Collection - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/031.json) |
| [/admin/redirects/add/](https://static-wagtail-v7-4.netlify.app/admin/redirects/add/) | New: Redirect - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/032.json) |
| [/admin/searchpicks/add/](https://static-wagtail-v7-4.netlify.app/admin/searchpicks/add/) | New: Promoted search result - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/033.json) |
| [/admin/pages/60/](https://static-wagtail-v7-4.netlify.app/admin/pages/60/) | Exploring: Welcome to the Wagtail Bakery! - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/034.json) |
| [/admin/pages/82/edit/](https://static-wagtail-v7-4.netlify.app/admin/pages/82/edit/) | Editing Recipe page: Southern Cornbread - Wagtail | 68 | D | 15 | [JSON](.a11y-history/20261003T105725Z/runtime/035.json) |
| [/admin/snippets/base/person/edit/4/](https://static-wagtail-v7-4.netlify.app/admin/snippets/base/person/edit/4/) | Editing: Muddy Waters - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/036.json) |
| [/admin/pages/60/move/](https://static-wagtail-v7-4.netlify.app/admin/pages/60/move/) | Move Welcome to the Wagtail Bakery! - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/037.json) |
| [/admin/translation/submit/page/60/](https://static-wagtail-v7-4.netlify.app/admin/translation/submit/page/60/) | Translate page Welcome to the Wagtail Bakery! - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/038.json) |
| [/admin/pages/66/add_subpage/](https://static-wagtail-v7-4.netlify.app/admin/pages/66/add_subpage/) | Create a page in Vik - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/039.json) |
| [/admin/pages/82/workflow_history/detail/4/](https://static-wagtail-v7-4.netlify.app/admin/pages/82/workflow_history/detail/4/) | Workflow progress: Southern Cornbread - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/040.json) |
| [/admin/snippets/base/person/workflow_history/4/detail/3/](https://static-wagtail-v7-4.netlify.app/admin/snippets/base/person/workflow_history/4/detail/3/) | Workflow progress: Muddy Waters - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/041.json) |
| [/admin/groups/edit/2/](https://static-wagtail-v7-4.netlify.app/admin/groups/edit/2/) | Editing: Editors - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/042.json) |
| [/admin/forms/submissions/69/](https://static-wagtail-v7-4.netlify.app/admin/forms/submissions/69/) | Submissions of Contact Us - Wagtail | 93 | A | 2 | [JSON](.a11y-history/20261003T105725Z/runtime/043.json) |
| [/admin/users/new/](https://static-wagtail-v7-4.netlify.app/admin/users/new/) | Add user: User - Wagtail | 99 | A | 1 | [JSON](.a11y-history/20261003T105725Z/runtime/044.json) |
| [/admin/users/edit/7/](https://static-wagtail-v7-4.netlify.app/admin/users/edit/7/) | Editing: Friedrich Wilhelm von Braunenberg - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/045.json) |
| [/admin/users/delete/7/](https://static-wagtail-v7-4.netlify.app/admin/users/delete/7/) | Delete user: german - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/046.json) |
| [/admin/groups/new/](https://static-wagtail-v7-4.netlify.app/admin/groups/new/) | Add group: Group - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/047.json) |
| [/admin/locales/edit/1/](https://static-wagtail-v7-4.netlify.app/admin/locales/edit/1/) | Editing: English - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/048.json) |
| [/admin/collections/2/](https://static-wagtail-v7-4.netlify.app/admin/collections/2/) | Editing: Bakeries - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/049.json) |
| [/admin/redirects/import/](https://static-wagtail-v7-4.netlify.app/admin/redirects/import/) | Redirects - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/050.json) |
| [/admin/redirects/29/](https://static-wagtail-v7-4.netlify.app/admin/redirects/29/) | Editing: /breads/parisian-baguette - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/051.json) |
| [/admin/searchpicks/5/](https://static-wagtail-v7-4.netlify.app/admin/searchpicks/5/) | Editing: hoppers - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/052.json) |
| [/admin/sites/new/](https://static-wagtail-v7-4.netlify.app/admin/sites/new/) | Add site: Site - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/053.json) |
| [/admin/sites/edit/2/](https://static-wagtail-v7-4.netlify.app/admin/sites/edit/2/) | Editing: Wagtail Bakery [default] - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/054.json) |
| [/admin/images/multiple/add/](https://static-wagtail-v7-4.netlify.app/admin/images/multiple/add/) | Add multiple images - Wagtail | 96 | A | 1 | [JSON](.a11y-history/20261003T105725Z/runtime/055.json) |
| [/admin/documents/multiple/add/](https://static-wagtail-v7-4.netlify.app/admin/documents/multiple/add/) | Add multiple documents - Wagtail | 96 | A | 1 | [JSON](.a11y-history/20261003T105725Z/runtime/056.json) |
| [/admin/pages/60/workflow_history/](https://static-wagtail-v7-4.netlify.app/admin/pages/60/workflow_history/) | Workflow history: Welcome to the Wagtail Bakery! - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/057.json) |
| [/admin/snippets/base/person/](https://static-wagtail-v7-4.netlify.app/admin/snippets/base/person/) | People - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/058.json) |
| [/admin/snippets/base/person/delete/4/](https://static-wagtail-v7-4.netlify.app/admin/snippets/base/person/delete/4/) | Delete: Muddy Waters - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/059.json) |
| [/admin/snippets/base/person/workflow_history/4/](https://static-wagtail-v7-4.netlify.app/admin/snippets/base/person/workflow_history/4/) | Workflow history: Muddy Waters - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/060.json) |
| [/admin/images/51/](https://static-wagtail-v7-4.netlify.app/admin/images/51/) | Editing: Muddy Waters - Wagtail | 97 | A | 1 | [JSON](.a11y-history/20261003T105725Z/runtime/061.json) |
| [/admin/snippets/base/person/unpublish/4/](https://static-wagtail-v7-4.netlify.app/admin/snippets/base/person/unpublish/4/) | Unpublish: Muddy Waters - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/062.json) |
| [/admin/groups/delete/2/](https://static-wagtail-v7-4.netlify.app/admin/groups/delete/2/) | Delete group: Editors - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/063.json) |
| [/admin/locales/delete/1/](https://static-wagtail-v7-4.netlify.app/admin/locales/delete/1/) | Delete locale: English - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/064.json) |
| [/admin/sites/delete/2/](https://static-wagtail-v7-4.netlify.app/admin/sites/delete/2/) | Delete site: Wagtail Bakery [default] - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/065.json) |
| [/admin/documents/edit/2/](https://static-wagtail-v7-4.netlify.app/admin/documents/edit/2/) | Editing: Cookbook: Skillet Cornbread - Wagtail | 97 | A | 1 | [JSON](.a11y-history/20261003T105725Z/runtime/066.json) |
| [/admin/snippets/base/person/add/](https://static-wagtail-v7-4.netlify.app/admin/snippets/base/person/add/) | New: Person - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/067.json) |
| [/admin/images/51/generate_url/](https://static-wagtail-v7-4.netlify.app/admin/images/51/generate_url/) | Generate URL: Muddy Waters - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/068.json) |
| [/admin/collections/2/delete/](https://static-wagtail-v7-4.netlify.app/admin/collections/2/delete/) | Delete collection: Bakeries - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/069.json) |
| [/admin/redirects/29/delete/](https://static-wagtail-v7-4.netlify.app/admin/redirects/29/delete/) | Delete redirect /breads/parisian-baguette - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/070.json) |
| [/admin/searchpicks/5/delete/](https://static-wagtail-v7-4.netlify.app/admin/searchpicks/5/delete/) | Delete hoppers - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/071.json) |
| [/admin/images/51/delete/](https://static-wagtail-v7-4.netlify.app/admin/images/51/delete/) | Delete image: Muddy Waters - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/072.json) |
| [/admin/users/copy/7/](https://static-wagtail-v7-4.netlify.app/admin/users/copy/7/) | New: User - Wagtail | 99 | A | 1 | [JSON](.a11y-history/20261003T105725Z/runtime/073.json) |
| [/admin/snippets/base/person/copy/4/](https://static-wagtail-v7-4.netlify.app/admin/snippets/base/person/copy/4/) | New: Person - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/074.json) |
| [/admin/sites/copy/2/](https://static-wagtail-v7-4.netlify.app/admin/sites/copy/2/) | New: Site - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/075.json) |
| [/admin/pages/60/history/](https://static-wagtail-v7-4.netlify.app/admin/pages/60/history/) | History: Welcome to the Wagtail Bakery! - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/076.json) |
| [/admin/snippets/base/person/history/4/](https://static-wagtail-v7-4.netlify.app/admin/snippets/base/person/history/4/) | History: Muddy Waters - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/077.json) |
| [/admin/groups/history/2/](https://static-wagtail-v7-4.netlify.app/admin/groups/history/2/) | History: Editors - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/078.json) |
| [/admin/users/history/7/](https://static-wagtail-v7-4.netlify.app/admin/users/history/7/) | History: Friedrich Wilhelm von Braunenberg - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/079.json) |
| [/admin/workflows/usage/1/](https://static-wagtail-v7-4.netlify.app/admin/workflows/usage/1/) | Usage: Moderators approval - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/080.json) |
| [/admin/documents/usage/2/](https://static-wagtail-v7-4.netlify.app/admin/documents/usage/2/) | Usage: Cookbook: Skillet Cornbread - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/081.json) |
| [/admin/pages/60/usage/](https://static-wagtail-v7-4.netlify.app/admin/pages/60/usage/) | Usage: Welcome to the Wagtail Bakery! - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/082.json) |
| [/admin/snippets/base/person/history/4/revisions/compare/live...109/](https://static-wagtail-v7-4.netlify.app/admin/snippets/base/person/history/4/revisions/compare/live...109/) | Compare: Muddy Waters - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/083.json) |
| [/admin/pages/82/revisions/compare/live...110/](https://static-wagtail-v7-4.netlify.app/admin/pages/82/revisions/compare/live...110/) | Compare: Southern Cornbread - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/084.json) |
| [/admin/pages/60/revisions/2/revert/](https://static-wagtail-v7-4.netlify.app/admin/pages/60/revisions/2/revert/) | Editing Home page: Welcome to the Wagtail Bakery! - Wagtail | 94 | A | 2 | [JSON](.a11y-history/20261003T105725Z/runtime/085.json) |
| [/admin/snippets/breads/breadingredient/](https://static-wagtail-v7-4.netlify.app/admin/snippets/breads/breadingredient/) | Bread ingredients - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/086.json) |
| [/admin/snippets/breads/breadtype/](https://static-wagtail-v7-4.netlify.app/admin/snippets/breads/breadtype/) | Bread types - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/087.json) |
| [/admin/country/](https://static-wagtail-v7-4.netlify.app/admin/country/) | Countries of origin - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/088.json) |
| [/admin/snippets/base/footertext/](https://static-wagtail-v7-4.netlify.app/admin/snippets/base/footertext/) | Footer text - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/089.json) |
| [/admin/snippets/breads/breadingredient/add/](https://static-wagtail-v7-4.netlify.app/admin/snippets/breads/breadingredient/add/) | New: Bread ingredient - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/090.json) |
| [/admin/snippets/breads/breadingredient/edit/1/](https://static-wagtail-v7-4.netlify.app/admin/snippets/breads/breadingredient/edit/1/) | Editing: Yeast - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/091.json) |
| [/admin/snippets/breads/breadingredient/inspect/1/](https://static-wagtail-v7-4.netlify.app/admin/snippets/breads/breadingredient/inspect/1/) | Inspect: Yeast - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/092.json) |
| [/admin/snippets/breads/breadingredient/delete/1/](https://static-wagtail-v7-4.netlify.app/admin/snippets/breads/breadingredient/delete/1/) | Delete: Yeast - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/093.json) |
| [/admin/snippets/breads/breadtype/add/](https://static-wagtail-v7-4.netlify.app/admin/snippets/breads/breadtype/add/) | New: Bread type - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/094.json) |
| [/admin/pages/60/edit/](https://static-wagtail-v7-4.netlify.app/admin/pages/60/edit/) | Editing Home page: Welcome to the Wagtail Bakery! - Wagtail | 94 | A | 2 | [JSON](.a11y-history/20261003T105725Z/runtime/095.json) |
| [/admin/pages/68/edit/](https://static-wagtail-v7-4.netlify.app/admin/pages/68/edit/) | Editing Blog page: Bread and Circuses - Wagtail | 91 | A | 3 | [JSON](.a11y-history/20261003T105725Z/runtime/096.json) |
| [/admin/pages/69/edit/](https://static-wagtail-v7-4.netlify.app/admin/pages/69/edit/) | Editing Form page: Contact Us - Wagtail | 94 | A | 2 | [JSON](.a11y-history/20261003T105725Z/runtime/097.json) |
| [/admin/pages/80/edit/](https://static-wagtail-v7-4.netlify.app/admin/pages/80/edit/) | Editing Recipe index page: Recipes - Wagtail | 100 | A | 0 | [JSON](.a11y-history/20261003T105725Z/runtime/098.json) |
| [/admin/pages/77/edit/](https://static-wagtail-v7-4.netlify.app/admin/pages/77/edit/) | Editing Blog page: Desserts with Benefits - Wagtail | 89 | B | 4 | [JSON](.a11y-history/20261003T105725Z/runtime/099.json) |

## Finding evidence and verification status

The numbered entries below are generated from the merged specialist payloads. Locations, measurements and suggested changes remain tied to their original evidence.

### 1. ARIA-004: Rich text image and embed preview buttons have no accessible name when a thumbnail is present.

- Severity: **serious**. WCAG: **4.1.2 A**. Confidence: **high**.
- Source: `client/src/components/Draftail/blocks/MediaBlock.js:110`. Component: Draftail MediaBlock.
- Evidence sources: aria-specialist, playwright-scanner.

Runtime 099 /admin/pages/77/edit/: axe button-name on button.MediaBlock. ImageBlock passes alt=""; EmbedBlock also passes alt="". MediaBlock hides its icon and renders no fallback text when src is present.

**Remediation:** Give MediaBlock an explicit localized accessible label identifying its image/embed and action, supplied by ImageBlock/EmbedBlock (for example “Edit image: [alt text]” or “Edit embed: [title]”). Preserve decorative thumbnail alt="" without relying on it for the button name.

Initial axe support: 1 accepted nodes on 1 sampled pages.

- [/admin/pages/77/edit/](https://static-wagtail-v7-4.netlify.app/admin/pages/77/edit/)

Current source excerpt (client/src/components/Draftail/blocks/MediaBlock.js, starting at line 109):

```
    return (
      <button
        type="button"
        tabIndex={-1}
        className="MediaBlock"
        onClick={this.onClick}
        data-draftail-trigger
```

### 2. FORM-DRAFTAIL-NAME: Draftail rich-text textboxes have no accessible name, including fifteen fields on the recipe editor.

- Severity: **serious**. WCAG: **4.1.2 A**. Confidence: **high**.
- Source: `client/src/components/Draftail/index.js:213`. Component: Draftail rich-text widget.
- Evidence sources: forms-specialist, playwright-scanner.

Runtime /admin/pages/82/edit/: axe aria-input-field-name finds 15 role=textbox contenteditables without aria-label or aria-labelledby. A label targeting the hidden backing input does not name the visible editor.

**Remediation:** Give each visible contenteditable textbox aria-labelledby pointing to its field or block label, or an equivalent translated aria-label; propagate this through Draftail options for both ordinary fields and StreamField widgets.

Initial axe support: 26 accepted nodes on 7 sampled pages.

- [/admin/styleguide/](https://static-wagtail-v7-4.netlify.app/admin/styleguide/)
- [/admin/pages/82/edit/](https://static-wagtail-v7-4.netlify.app/admin/pages/82/edit/)
- [/admin/pages/60/revisions/2/revert/](https://static-wagtail-v7-4.netlify.app/admin/pages/60/revisions/2/revert/)
- [/admin/pages/60/edit/](https://static-wagtail-v7-4.netlify.app/admin/pages/60/edit/)
- [/admin/pages/68/edit/](https://static-wagtail-v7-4.netlify.app/admin/pages/68/edit/)
- [/admin/pages/69/edit/](https://static-wagtail-v7-4.netlify.app/admin/pages/69/edit/)
- [/admin/pages/77/edit/](https://static-wagtail-v7-4.netlify.app/admin/pages/77/edit/)

Current source excerpt (client/src/components/Draftail/index.js, starting at line 212):

```

    return {
      rawContentState: rawContentState,
      onSave: serialiseInputValue,
      placeholder: gettext('Write something or type ‘/’ to insert a block'),
      spellCheck: true,
      enableLineBreak: {
```

### 3. FORM-MULTIUPLOAD-NAME: Multiple image and document upload file inputs have no accessible name.

- Severity: **serious**. WCAG: **4.1.2 A**. Confidence: **high**.
- Source: `wagtail/images/templates/wagtailimages/multiple/add.html:26`. Component: Multiple image/document upload.
- Evidence sources: forms-specialist, playwright-scanner.

Runtime /admin/images/multiple/add/ and /admin/documents/multiple/add/: axe label flags #fileupload. Adjacent button text is not programmatically associated. Document template also has the input at line 26.

**Remediation:** Use an associated label for #fileupload in both upload templates; retain the visible “Or choose from your computer” text as the input name. Associate accepted-format and size instructions with aria-describedby.

Initial axe support: 2 accepted nodes on 2 sampled pages.

- [/admin/images/multiple/add/](https://static-wagtail-v7-4.netlify.app/admin/images/multiple/add/)
- [/admin/documents/multiple/add/](https://static-wagtail-v7-4.netlify.app/admin/documents/multiple/add/)

Current source excerpt (wagtail/images/templates/wagtailimages/multiple/add.html, starting at line 25):

```
                <button class="button bicolor button--icon">{% icon name="plus" wrapped=1 %}{% trans "Or choose from your computer" %}</button>
                <input
                    id="fileupload"
                    multiple
                    accept="{{accept_attributes}}"
                    name="files[]"
                    type="file"
```

### 4. FORM-SUBMISSION-CHECKBOX-NAME: Form-submission selection checkboxes have no names, so screen-reader users cannot identify the select-all control or selected record.

- Severity: **serious**. WCAG: **4.1.2 A**. Confidence: **high**.
- Source: `wagtail/contrib/forms/templates/wagtailforms/list_submissions.html:12`. Component: Form submissions listing.
- Evidence sources: forms-specialist, playwright-scanner.

Runtime /admin/forms/submissions/69/: axe label flags header checkbox data-w-bulk-target=all and row checkbox name=selected-submissions; source lines 12 and 24 contain no labels.

**Remediation:** Label the header checkbox “Select all submissions” and label each row checkbox “Select submission …” with a meaningful row identifier, using labels or aria-label.

Initial axe support: 2 accepted nodes on 1 sampled pages.

- [/admin/forms/submissions/69/](https://static-wagtail-v7-4.netlify.app/admin/forms/submissions/69/)

Current source excerpt (wagtail/contrib/forms/templates/wagtailforms/list_submissions.html, starting at line 11):

```
                <tr>
                    <th><input type="checkbox" data-action="w-bulk#toggleAll" data-w-bulk-target="all" /></th>
                    {% for heading in data_headings %}
                        <th id="{{ heading.name }}" class="{% if heading.order %}ordered icon {% if heading.order == 'ascending' %}icon-arrow-up-after{% else %}icon-arrow-down-after{% endif %}{% endif %}">
                            {% if heading.order %}<a href="?order_by={% if heading.order == 'ascending' %}-{% endif %}{{ heading.name }}">{{ heading.label }}</a>{% else %}{{ heading.label }}{% endif %}
                        </th>
                    {% endfor %}
```

### 5. FORM-TAG-INPUT-NAME: Tag-it replaces the labeled tag field with an unnamed text input.

- Severity: **serious**. WCAG: **4.1.2 A**. Confidence: **high**.
- Source: `client/src/controllers/TagController.ts:63`. Component: Tag widget.
- Evidence sources: forms-specialist, playwright-scanner.

Runtime /admin/images/51/, /admin/documents/edit/2/, /admin/pages/68/edit/ and /admin/pages/77/edit/: axe label flags .ui-autocomplete-input. vendor/tag-it.js:130 creates <input type=text> without an ID/name association; TagController.connect does not supply one.

**Remediation:** After tag-it initializes, give its generated input an ID and associate the existing Tags label with it, or copy the field label through aria-labelledby; also preserve relevant descriptions and invalid state.

Initial axe support: 4 accepted nodes on 4 sampled pages.

- [/admin/images/51/](https://static-wagtail-v7-4.netlify.app/admin/images/51/)
- [/admin/documents/edit/2/](https://static-wagtail-v7-4.netlify.app/admin/documents/edit/2/)
- [/admin/pages/68/edit/](https://static-wagtail-v7-4.netlify.app/admin/pages/68/edit/)
- [/admin/pages/77/edit/](https://static-wagtail-v7-4.netlify.app/admin/pages/77/edit/)

Current source excerpt (client/src/controllers/TagController.ts, starting at line 62):

```

    $(this.element).tagit({
      autocomplete,
      preprocessTag,
      ...this.optionsValue,
    });
  }
```

### 6. KEYBOARD-FOCAL-CREATE: Image focal areas cannot be created or resized using the keyboard.

- Severity: **serious**. WCAG: **2.1.1 A; 2.5.7 AA**. Confidence: **high**.
- Source: `wagtail/images/static_src/wagtailimages/js/focal-point-chooser.js:4`. Component: Image focal-point chooser.
- Evidence sources: keyboard-navigator, playwright-scanner.

At /admin/images/51/, focus .jcrop-keymgr and press ArrowRight, ArrowDown, Space, Enter: all four hidden coordinates remain empty, selection w/h remain 0. Jcrop keyboard handler only moves an existing rectangle; no resize/create keys.

**Remediation:** Expose labelled coordinate and size inputs or implement a focusable crop widget with keyboard create, move and resize actions; keep hidden model fields synchronized and provide a single-pointer alternative to dragging.

Current source excerpt (wagtail/images/static_src/wagtailimages/js/focal-point-chooser.js, starting at line 3):

```
function setupJcrop(image, original, focalPointOriginal, fields) {
  image.Jcrop(
    {
      trueSize: [original.width, original.height],
      bgColor: 'rgb(192, 192, 192)',
      onSelect: function (box) {
        var x = Math.floor((box.x + box.x2) / 2);
```

### 7. LIVE-UPLOAD-OUTCOME: Multiple-upload success and failure messages appear without announcements or focus changes.

- Severity: **serious**. WCAG: **4.1.3 AA**. Confidence: **high**.
- Source: `wagtail/images/templates/wagtailimages/multiple/add.html:75`. Component: Multiple image/document upload results.
- Evidence sources: live-region-controller.

Source: image template75–86/document template69–72 plain status-msg/error_messages p elements; add-multiple.js image157–172/document120–132 reveals outcomes by classes and appends errors without live semantics or focus. CSS _add-multiple.scss111–155 toggles visibility.

**Remediation:** Create a persistent upload status region before operations start; update it with the file name and completion, duplicate-warning or failure message. Route urgent errors through an existing alert region and batch multiple-file updates to prevent flooding.

Current source excerpt (wagtail/images/templates/wagtailimages/multiple/add.html, starting at line 74):

```
                <p class="error-message">{% trans "Please provide an image description to comply with best practices for accessibility." %}</p>
                <p class="status-msg success">{% trans "Upload successful. Please update this image with a more appropriate title, if necessary. You may also delete the image completely if the upload wasn't required." %}</p>
                <p class="status-msg warning">
                    {% trans "Upload successful. However, your new image seems to be a duplicate of this existing image. You may delete it if it wasn't required." %}
                </p>
                <p class="status-msg failure">{% trans "Sorry, upload failed." %}</p>
                <p class="status-msg server-error">
```

### 8. MODAL-001: Legacy chooser dialogs lack an accessible name and do not expose their modal state, leaving background content exposed to assistive technology.

- Severity: **serious**. WCAG: **4.1.2 A**. Confidence: **high**.
- Source: `client/src/entrypoints/admin/modal-workflow.js:66`. Component: Legacy ModalWorkflow chooser shell.
- Evidence sources: modal-specialist, playwright-scanner.

Chromium image/page/document chooser probes: role="dialog", aria-hidden="false", aria-label=null, aria-labelledby=null, aria-modal=null, headings #header-title present. No background aria-hidden or inert. raw/modal-runtime.json.

**Remediation:** Give the chooser dialog aria-labelledby pointing to its loaded heading (with a unique stable ID) and aria-modal="true", updating the relationship on workflow body replacement. Prefer migrating this Bootstrap branch to the existing labelled a11y-dialog component or native showModal dialog.

Current source excerpt (client/src/entrypoints/admin/modal-workflow.js, starting at line 65):

```
    // disabled by adding a `data-force-disabled` attribute; this mechanism is necessary to accommodate
    // response handlers that disable the trigger to prevent it from reopening
    self.container.on('hide.bs.modal', () => {
      if (!self.triggerElement.hasAttribute('data-force-disabled')) {
        self.triggerElement.removeAttribute('disabled');
        // support w-progress controller reset if activated on the button's click
        self.triggerElement.removeAttribute('data-w-progress-loading-value');
```

### 9. ARIA-001: Workflow task links wrap list items, breaking the task list structure exposed to assistive technology.

- Severity: **moderate**. WCAG: **1.3.1 A**. Confidence: **high**.
- Source: `wagtail/admin/templates/wagtailadmin/workflows/includes/workflow_tasks_cell.html:5`. Component: Workflow task summary cards.
- Evidence sources: aria-specialist, playwright-scanner.

Runtime 011: axe list and listitem failures on /admin/workflows/list/. Source: <ul class="workflow-tasks"><a href="..."><li class="workflow-tasks__task">...</li></a></ul>.

**Remediation:** Make each li a direct child of ul and place the task link inside its li; move the card styling to the link as needed to preserve its click area. Keep the extra-count li as another direct child.

Initial axe support: 2 accepted nodes on 1 sampled pages.

- [/admin/workflows/list/](https://static-wagtail-v7-4.netlify.app/admin/workflows/list/)

Current source excerpt (wagtail/admin/templates/wagtailadmin/workflows/includes/workflow_tasks_cell.html, starting at line 4):

```
        {% for task in tasks %}
            <a href="{% url 'wagtailadmin_workflows:edit_task' task.task_id %}">
                <li class="workflow-tasks__task" data-controller="w-tooltip" data-w-tooltip-content-value="{% blocktrans trimmed with forloop.counter|intcomma as step_number %}Step {{ step_number }}{% endblocktrans %}: {{ task.task.name }}">
                    <div class="workflow-tasks__step">{% blocktrans trimmed with forloop.counter|intcomma as step_number %}Step {{ step_number }}{% endblocktrans %}</div>
                    <h4 class="workflow-tasks__name">{{ task.task.name }}</h4>
                </li>
            </a>
```

### 10. ARIA-002: The Roles shortcut in user creation and copying is exposed as a tab outside any tablist.

- Severity: **moderate**. WCAG: **4.1.2 A**. Confidence: **high**.
- Source: `wagtail/users/templates/wagtailusers/users/create.html:44`. Component: User create/copy Roles shortcut.
- Evidence sources: aria-specialist, playwright-scanner.

Runtime 044 and 073: aria-required-parent on a.w-w-fit, role="tab" outside tablist. TabsController:186–193 updates aria-selected on all triggerTargets, including this shortcut.

**Remediation:** Remove role="tab" from the in-panel shortcut and use a link or native button to activate the Roles panel. In TabsController, write aria-selected only on actual tablist tabs, rather than every trigger; retain aria-controls and move focus appropriately.

Initial axe support: 2 accepted nodes on 2 sampled pages.

- [/admin/users/new/](https://static-wagtail-v7-4.netlify.app/admin/users/new/)
- [/admin/users/copy/7/](https://static-wagtail-v7-4.netlify.app/admin/users/copy/7/)

Current source excerpt (wagtail/users/templates/wagtailusers/users/create.html, starting at line 43):

```
                    <li>
                        <a href="#tab-roles" class="button w-flex w-items-center w-w-fit w-mb-8" role="tab" data-action="w-tabs#select:prevent" data-w-tabs-target="trigger">
                            {% trans "Roles" %}
                            {% icon name="arrow-right" classname="default" %}
                        </a>
                    </li>
                </ul>
```

### 11. ARIA-003: Sidebar navigation and account disclosures announce a menu popup although their opened content has ordinary list/link semantics.

- Severity: **moderate**. WCAG: **4.1.2 A**. Confidence: **high**.
- Source: `client/src/components/Sidebar/menu/SubMenuItem.tsx:106`. Component: Sidebar submenu and account disclosures.
- Evidence sources: aria-specialist, playwright-scanner.

Captured admin DOM: Settings/Reports/Help buttons have aria-haspopup="menu"; panels contain h2 and ul > li > a without role="menu". Account button likewise opens ul containing ordinary links.

**Remediation:** Remove aria-haspopup="menu" from SubMenuItem and the account button in MainMenu.tsx:279; retain the accurate aria-expanded disclosure state. Optionally add aria-controls with a stable panel ID. Keep native navigation lists and links.

Current source excerpt (client/src/components/Sidebar/menu/SubMenuItem.tsx, starting at line 105):

```
          className={`sidebar-menu-item__link ${item.classNames}`}
          aria-haspopup="menu"
          aria-expanded={isOpen ? 'true' : 'false'}
          type="button"
        >
          {item.iconName && (
            <Icon name={item.iconName} className="icon--menuitem" />
```

### 12. CONTRAST-FIELD-BOUNDARY: Empty form controls have low-contrast boundaries in both light and dark themes.

- Severity: **moderate**. WCAG: **1.4.11 AA**. Confidence: **high**.
- Source: `client/scss/components/forms/_input-base.scss:12`. Component: Default text-input and password boundaries.
- Evidence sources: contrast-master, playwright-scanner.

On /admin/users/new/ username, first/last name and password fields: light border #c8c8c8 against white field/content =1.67:1; dark border #5c5c5c against #262626 field/content =2.26:1. Empty fields have no contrasting fill or other extent indicator.

**Remediation:** Increase border-field-default to at least 3:1 against field and surrounding page surfaces in both themes; retain separate inactive styling. Apply to controls whose empty editable extent is identified by their border.

Current source excerpt (client/scss/components/forms/_input-base.scss, starting at line 11):

```
  background-color: theme('colors.surface-field');
  border: 1px solid theme('colors.border-field-default');

  @include more-contrast-interactive();

  &:hover {
    border-color: theme('colors.border-field-hover');
```

### 13. FORM-DRAFTAIL-DESCRIPTION-PROPAGATION: Draftail does not propagate field instructions and validation descriptions from its hidden backing field to the interactive textbox.

- Severity: **moderate**. WCAG: **1.3.1 A**. Confidence: **high**.
- Source: `client/src/components/Draftail/index.js:161`. Component: Draftail field help and validation.
- Evidence sources: forms-specialist.

initEditor sets ariaDescribedBy=null, only substitutes the length-counter ID at 199, and passes it at 251; BoundDraftailWidget.setInvalid only changes the hidden input at 343. Field help/error IDs supplied by FieldPanel are not used.

**Remediation:** Read and preserve the backing field aria-describedby tokens and pass them to Draftail ariaDescribedBy, adding the length counter rather than replacing them; propagate aria-invalid to the visible textbox as validation changes.

Current source excerpt (client/src/components/Draftail/index.js, starting at line 160):

```

  const getSharedPropsFromOptions = (newOptions) => {
    let ariaDescribedBy = null;
    const enableHorizontalRule = newOptions.enableHorizontalRule
      ? {
          description: gettext('Horizontal line'),
          icon: HR_ICON,
```

### 14. FORM-STREAMFIELD-ERROR-ASSOCIATION: StreamField field errors are displayed beside inputs but are not programmatically associated with those inputs.

- Severity: **moderate**. WCAG: **1.3.1 A**. Confidence: **high**.
- Source: `client/src/components/StreamField/blocks/FieldBlock.js:153`. Component: StreamField FieldBlock validation.
- Evidence sources: forms-specialist.

Source: error container has id=${prefix}-errors (line 24); setError appends text and sets invalid state (123–146); getAttributes only describes ${prefix}-helptext (160–161). No error ID is passed to the widget.

**Remediation:** Include the existing ${prefix}-errors container in the widget aria-describedby tokens when invalid, preserving help-text tokens, and remove the error token when clear. Ensure custom widgets propagate the association to their interactive control.

Current source excerpt (client/src/components/StreamField/blocks/FieldBlock.js, starting at line 152):

```

  getAttributes() {
    const prefix = this.prefix;
    const attributes = {};

    // If the block has help text, we should associate this with the input rendered by the widget.
    // To accomplish this, we must tell the widget to render an aria-describedby attribute referring
```

### 15. KEYBOARD-FOCAL-VISIBLE: The focal-point chooser receives keyboard focus in an offscreen radio input with no visible focus indicator.

- Severity: **moderate**. WCAG: **2.4.7 AA**. Confidence: **high**.
- Source: `wagtail/images/static_src/wagtailimages/js/vendor/jquery.Jcrop.min.js:20`. Component: Image focal-point chooser.
- Evidence sources: keyboard-navigator, playwright-scanner.

Runtime .jcrop-keymgr is type=radio with position:fixed;left:-120px;width:12px. Keyboard focus stays on this offscreen input after arrow keys and there is no visible selection for images without a focal area.

**Remediation:** Provide a visible, focusable focal-area control and draw an obvious focus indicator on the displayed image/widget when keyboard focus enters.

### 16. LIVE-BULK-SELECTION-COUNT: Bulk-selection totals change visually without a programmatic status announcement.

- Severity: **moderate**. WCAG: **4.1.3 AA**. Confidence: **high**.
- Source: `wagtail/admin/templates/wagtailadmin/bulk_actions/footer.html:7`. Component: Bulk actions selection count.
- Evidence sources: live-region-controller, playwright-scanner.

Browser: /admin/images/, /admin/users/, /admin/pages/60/ first-checkbox selection changes span[data-bulk-action-num-objects] to “1 image/user/page selected”. Only live region is unrelated empty .messages. includes/bulk-actions.js:158 changes plain span textContent.

**Remediation:** Maintain a persistent polite status region outside the initially hidden footer and update it with the selected-item total, including deselection to zero. Preserve checkbox focus and avoid announcing every row in a select-all operation.

Current source excerpt (wagtail/admin/templates/wagtailadmin/bulk_actions/footer.html, starting at line 6):

```
        <ul class="bulk-actions-buttons">{% bulk_action_choices app_label model_name %}</ul>
        <span data-bulk-action-num-objects class="num-objects"></span>
        {% if objects.has_other_pages %}
            <button type="button" data-bulk-action-num-objects-in-listing class="num-objects-in-listing w-hidden">{{ select_all_obj_text }}</button>
        {% endif %}
    </div>
</section>
```

### 17. LIVE-LISTING-ZERO-RESULTS: Generic AJAX search and filter zero-result messages lack status semantics, leaving users uninformed when no matches remain.

- Severity: **moderate**. WCAG: **4.1.3 AA**. Confidence: **high**.
- Source: `wagtail/admin/templates/wagtailadmin/generic/listing_results.html:37`. Component: Generic listing search/filter.
- Evidence sources: live-region-controller.

Source: lines8–10 skip the role=alert match-count branch for empty object_list; line37 emits a plain p. generic/listing.html:15 has a plain #listing-results wrapper and no live ancestor. Static archive does not support true query-result verification.

**Remediation:** Announce zero matches through a persistent role=status region updated after the results swap, or provide equivalent status semantics to the empty-result message; use polite announcements for routine search feedback.

Current source excerpt (wagtail/admin/templates/wagtailadmin/generic/listing_results.html, starting at line 36):

```
        {% block no_results_message %}
            <p>{{ no_results_message|capfirst }}</p>
        {% endblock %}
    </div>
{% endif %}

```

### 18. LIVE-UPLOAD-PROGRESS-SEMANTICS: Upload progress indicators set aria-valuenow on unnamed generic divs without a progressbar role.

- Severity: **moderate**. WCAG: **4.1.2 A**. Confidence: **high**.
- Source: `wagtail/images/templates/wagtailimages/multiple/add.html:55`. Component: Multiple-upload progress.
- Evidence sources: live-region-controller.

Image template55/68 and document template53/63 render generic div.progress. Image JS74/85 and document JS62/73 set aria-valuenow but never role, name or min/max. This is source-confirmed; real upload traffic was not exercised.

**Remediation:** Use native progress elements with accessible names, or add role=progressbar, labels and min/max/current values to aggregate and per-file indicators. Give per-file indicators names containing the file name; announce completion separately.

Current source excerpt (wagtail/images/templates/wagtailimages/multiple/add.html, starting at line 54):

```

    <div id="overall-progress" class="progress progress-secondary">
        <div class="bar w-w-0">0%</div>
    </div>

    <ul id="upload-list" class="upload-list multiple"></ul>

```

### 19. MODAL-002: Tab past the last chooser control moves focus outside the modal, where Escape no longer dismisses it.

- Severity: **moderate**. WCAG: **2.4.3 A**. Confidence: **high**.
- Source: `wagtail/admin/static_src/wagtailadmin/js/vendor/bootstrap-modal.js:116`. Component: Legacy Bootstrap chooser focus trap.
- Evidence sources: modal-specialist, playwright-scanner.

Chromium image chooser: focus final visible button/input/select/textarea/a; Tab gives document.activeElement=body outside .modal. Escape then leaves .modal.in open. Bootstrap enforces only focusin and binds keyup Escape to .modal. raw/modal-focus.json.

**Remediation:** Implement explicit Tab and Shift+Tab wrapping between the first and last focusable controls, including document-boundary cases, and handle Escape while the dialog is open. Migrating the shell to the existing a11y-dialog implementation or a native modal dialog can provide these behaviors.

Current source excerpt (wagtail/admin/static_src/wagtailadmin/js/vendor/bootstrap-modal.js, starting at line 115):

```
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
```

### 20. REFLOW-EDITOR-STATUS-TOOLBAR: The editor header requires horizontal scrolling to reach the Live-page control at 320 CSS pixels.

- Severity: **moderate**. WCAG: **1.4.10 AA**. Confidence: **high**.
- Source: `wagtail/admin/templates/wagtailadmin/shared/headers/slim_header.html:110`. Component: Editor slim header status/action strip.
- Evidence sources: contrast-master, playwright-scanner.

Settled desktop-to320px resize on /admin/pages/69/edit/: status/action strip clientWidth320,scrollWidth368; Live-page link x306,right360.45. Its text and right edge are outside the viewport until the strip scrolls; document also requires vertical scrolling.

**Remediation:** Allow the header status/action strip to wrap or move secondary actions into an accessible disclosure at narrow widths, so all controls fit within320px without horizontal scrolling.

Current source excerpt (wagtail/admin/templates/wagtailadmin/shared/headers/slim_header.html, starting at line 109):

```

            <div class="w-w-full w-overflow-auto sm:w-w-min w-flex sm:w-flex-nowrap sm:w-flex-row w-items-center w-p-0 sm:w-py-0 w-px-2 sm:w-pr-4 sm:w-justify-end">
                {% block autosave_indicator %}
                    {% if autosave_indicator %}
                        {% component autosave_indicator %}
                    {% endif %}
                {% endblock %}
```

### 21. TABLE-001: Sortable listings and form submissions expose the current sort column and direction only through visual classes and arrows.

- Severity: **moderate**. WCAG: **1.3.1 A**. Confidence: **high**.
- Source: `wagtail/admin/templates/wagtailadmin/tables/column_header.html:2`. Component: Shared sortable table column headers and form submissions.
- Evidence sources: playwright-scanner, tables-data-specialist.

20 archived table pages contain active teal/ordered arrow classes and no aria-sort. /admin/sites/: ascending Site class icon-arrow-up-after, title says “Sort by Site in descending order” (next action). Form submissions: ordered icon-arrow-down-after only.

**Remediation:** Set aria-sort="ascending" or "descending" on the currently sorted th based on is_ascending/is_descending; clear it on other headers. Do the same using heading.order in wagtailforms/list_submissions.html. Preserve link titles describing the next action.

Current source excerpt (wagtail/admin/templates/wagtailadmin/tables/column_header.html, starting at line 1):

```
{% load wagtailadmin_tags %}
<th {% if column.classname %}class="{{ column.classname }}"{% endif %}>
    {% if is_orderable %}
        {% if is_ascending %}
            <a href="{{ table.base_url }}{% querystring p=None ordering='-'|add:column.sort_key %}" {% if descending_title_text %}title="{{ descending_title_text }}"{% endif %} class="icon icon-arrow-up-after teal label">
                {{ column.label }}
            </a>
```

### 22. CONTRAST-DISABLED-METADATA: The disabled-row style also dims ordinary table metadata to 1.65:1 contrast.

- Severity: **minor**. WCAG: **1.4.3 AA**. Confidence: **high**.
- Source: `client/scss/components/_listing.scss:181`. Component: Disabled listing row metadata.
- Evidence sources: contrast-master, playwright-scanner.

/admin/styleguide/: .disabled > td:nth-child(2) and td:nth-child(3) contain static "Standard TD", not inactive controls. opacity:.25 yields #c9c9c9 on white (axe1.65:1,12.92px). Inactive choice title is not used as the basis of this finding.

**Remediation:** Restrict opacity changes to genuinely inactive controls; keep informational table cell text at 4.5:1. Review disabled chooser/listing rows so unavailable choices do not make their identifying metadata unreadable.

Initial axe support: 2 accepted nodes on 1 sampled pages.

- [/admin/styleguide/](https://static-wagtail-v7-4.netlify.app/admin/styleguide/)

Current source excerpt (client/scss/components/_listing.scss, starting at line 180):

```

    tbody tr.disabled td {
      opacity: 0.25;
    }

    tbody tr.disabled td.children {
      opacity: 1;
```

## Verification plan

Extend the existing Jest/Playwright axe integration and CircleCI UI job. The backend GitHub Actions matrix is separate; no new CI workflow was added.

Existing exclusions and skips: editor.test.js currently excludes [aria-describedby^="placeholder-"]; chooser cases are it.skip and exclude .modal. Remove narrowly as defects are fixed, rather than silencing new findings.

Integration command from the documented disposable test setup: `TEST_ORIGIN=http://localhost:8000 npm run test:integration -- --runInBand`.

### 1. Draftail labels and validation

1. Extend editor.test.js with a page containing ordinary rich text plus nested/list/StreamField rich text. Assert getByRole(textbox,{name:fieldLabel}) uniquely resolves the visible contenteditable; assert aria-describedby resolves all help/error/counter IDs. Trigger a required/max-length validation error and inspect aria-invalid on the interactive textbox. After fixes remove the global placeholder selector exclusion and rerun axe.
2. With NVDA+Firefox ESR and VoiceOver+Safari, navigate by form controls; each editor announces its label, help, required/error state and error message without navigating to the hidden backing input.

Relevant files: `client/tests/integration/editor.test.js`, `client/src/components/Draftail/index.js`, `client/src/components/StreamField/blocks/FieldBlock.js`.

### 2. Tags and submissions

1. Add a populated tag fixture to image/document/page editors, assert the generated tag-entry textbox has the visible field name. On a submissions listing assert each row checkbox has a meaningful unique name and the select-all checkbox is named. Run axe before and after adding/removing a tag.
2. Enter, select and remove a tag without a pointer; verify label/selection/removal context. Select a submission by its announced record identifier.

Relevant files: `client/tests/integration/editor.test.js`, `client/src/controllers/TagController.ts`, `wagtail/contrib/forms/templates/wagtailforms/list_submissions.html`.

### 3. Uploads and status

1. Extend existing images-upload.test.js and documents-upload.test.js: use getByLabel for file input, assert progress role/name/value during a deliberately delayed upload, inspect a persistent status region for success and invalid-size/type/server failure text. Keep existing didPost=false validation assertion.
2. On a writable disposable backend upload valid and invalid fixtures with NVDA/Firefox and VoiceOver/Safari. Record actual speech for filename/progress/completion/errors; do not require every percentage change to interrupt speech.

Relevant files: `client/tests/integration/images-upload.test.js`, `client/tests/integration/documents-upload.test.js`.

### 4. Chooser boundary and name

1. Re-enable skipped image/page/embed chooser tests in editor.test.js after fixes; include modal content in axe. Assert role=dialog has an accessible name and aria-modal=true, Tab/Shift+Tab stay within it, Escape dismisses from every focus position, focus returns to original chooser trigger.
2. Open and close each chooser with keyboard and screen reader; verify dialog title, background is unavailable, result selection works, final Tab and Shift+Tab never escape.

Relevant files: `client/tests/integration/editor.test.js`.

### 5. Image focal area

1. Extend image editor coverage with keyboard-only create/move/resize of a focal area and assert resulting coordinates; verify every focused control has a visible rendered indicator. Exercise a pointer alternative that does not require dragging.
2. Create/move/resize/reset focal area without mouse; repeat at zoom and Windows Contrast themes. Check offscreen native radio does not consume focus without a visible indicator.

Relevant files: `client/tests/integration/images-upload.test.js`, `wagtail/images/templates/wagtailimages/images/edit.html`.

### 6. Sort and bulk results

1. Extend listing.test.js and submission fixtures: activate each sortable header, assert current column aria-sort and direction update. Select one/all/zero items and assert a persistent polite status region receives accurate counts. Search an impossible term and verify a zero-result status update.
2. On screen reader, identify current sort and direction from header navigation; operate sort, selection and empty search while focus stays on the initiating control and hear one concise result announcement.

Relevant files: `client/tests/integration/listing.test.js`, `wagtail/admin/templates/wagtailadmin/generic/listing_results.html`.

### 7. Field boundaries and metadata contrast

1. Retest computed field border/background combinations in light/dark modes and enabled/disabled-row metadata states. Assert at least 3:1 for necessary enabled-control boundaries and 4.5:1 for normal informational text; preserve disabled-control exemption.
2. Review empty inputs against surrounding surfaces in light/dark themes and Windows Contrast themes, including controls without placeholder text.

Relevant files: `client/scss/components/forms/_input-base.scss`, `client/scss/components/_listing.scss`.

### 8. Editor narrow layout and spacing

1. Repeat editor toolbar at320 CSS pixels and text-spacing override (line-height1.5, paragraph2em, letter.12em, word.16em). Assert essential Live-page control is reachable without page/container horizontal scrolling where no exception applies.
2. At400% browser zoom, use keyboard to reach all header/actions/side panels; check focus is visible and not obscured by sticky furniture.

Relevant files: `client/tests/integration/editor.test.js`.

### 9. Table blocks and static-asset gaps

1. Run writable-backend editor fixture containing actual table and typed-table blocks; ensure Handsontable assets load and run keyboard insertion/editing, row/column changes and axe in expanded editors. Verify fileupload validation assets load before upload assertions.
2. Do not interpret static-archive404s as component WCAG failures. Retest unloaded widgets with their real assets and report any residual inability to navigate/edit tables.

Relevant files: `client/tests/integration/editor.test.js`.

Re-scan the affected components after each fix; repeat the full selected manifest after the serious issues are resolved. Confirm the interaction results with NVDA/Firefox ESR and VoiceOver/Safari on a writable test backend.

## Evidence and reproducibility

- [Runtime-correlated scan report](ACCESSIBILITY-SCAN.md). Its score is calculated from the runtime subset and its own passing-check count; it is not comparable to the combined audit score.
- [alt-text-headings.json](.a11y-history/20261003T105725Z/alt-text-headings.json)
- [aria-specialist.json](.a11y-history/20261003T105725Z/aria-specialist.json)
- [cognitive-accessibility.json](.a11y-history/20261003T105725Z/cognitive-accessibility.json)
- [contrast-master.json](.a11y-history/20261003T105725Z/contrast-master.json)
- [cross-page-analyzer.json](.a11y-history/20261003T105725Z/cross-page-analyzer.json)
- [forms-specialist.json](.a11y-history/20261003T105725Z/forms-specialist.json)
- [keyboard-navigator.json](.a11y-history/20261003T105725Z/keyboard-navigator.json)
- [link-checker.json](.a11y-history/20261003T105725Z/link-checker.json)
- [live-region-controller.json](.a11y-history/20261003T105725Z/live-region-controller.json)
- [modal-specialist.json](.a11y-history/20261003T105725Z/modal-specialist.json)
- [playwright-scanner.json](.a11y-history/20261003T105725Z/playwright-scanner.json)
- [tables-data-specialist.json](.a11y-history/20261003T105725Z/tables-data-specialist.json)
- [testing-coach.json](.a11y-history/20261003T105725Z/testing-coach.json)
- [audit-summary.json](.a11y-history/20261003T105725Z/raw/audit-summary.json)
- [cross-page-analysis.json](.a11y-history/20261003T105725Z/raw/cross-page-analysis.json)
- [testing-plan.json](.a11y-history/20261003T105725Z/raw/testing-plan.json)
- [100-page axe runner](.a11y-history/20261003T105725Z/raw/scan.cjs)
- [Keyboard, reflow and spacing measurements](.a11y-history/20261003T105725Z/raw/measure.cjs)
- [Expanded-state runner](.a11y-history/20261003T105725Z/raw/states.cjs)

The runners were executed using temporary tooling in /tmp/wagtail-a11y-tools. Dependencies were not installed into the repository. Recreate that isolated directory with the recorded Playwright and axe versions, set /tmp/wagtail-a11y-run to this history directory, then invoke the runners. The official renderer and supplement paths record the plugin version used.

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
    ".a11y-history/20261003T105725Z/raw/*.html",
    ".a11y-history/20261003T105725Z/raw/measure-*.json",
    ".a11y-history/20261003T105725Z/raw/states-*.json",
    ".a11y-history/20261003T105725Z/raw/states-000.json",
    ".a11y-history/20261003T105725Z/runtime/*.json",
    ".circleci/config.yml",
    ".github/workflows/test.yml",
    "client/scss/components/_button.scss",
    "client/scss/components/_listing.scss",
    "client/scss/components/_status-tag.scss",
    "client/scss/components/forms/_input-base.scss",
    "client/src/components/ChooserWidget/index.js",
    "client/src/components/ComboBox/ComboBox.tsx",
    "client/src/components/CommentApp/components/Comment/index.tsx",
    "client/src/components/CommentApp/components/CommentHeader/index.tsx",
    "client/src/components/Draftail/index.js",
    "client/src/components/Icon/Icon.tsx",
    "client/src/components/InlinePanel/index.js",
    "client/src/components/PageExplorer/PageExplorerItem.tsx",
    "client/src/components/PageExplorer/PageExplorerPanel.tsx",
    "client/src/components/Sidebar/menu/PageExplorerMenuItem.tsx",
    "client/src/components/Sidebar/menu/SubMenuItem.tsx",
    "client/src/components/Sidebar/modules/MainMenu.tsx",
    "client/src/components/StreamField/blocks/BaseSequenceBlock.js",
    "client/src/components/StreamField/blocks/FieldBlock.js",
    "client/src/controllers/BulkController.ts",
    "client/src/controllers/CloneController.ts",
    "client/src/controllers/DialogController.ts",
    "client/src/controllers/DrilldownController.ts",
    "client/src/controllers/DropdownController.ts",
    "client/src/controllers/KeyboardController.ts",
    "client/src/controllers/OrderableController.ts",
    "client/src/controllers/SwapController.ts",
    "client/src/controllers/TabsController.ts",
    "client/src/controllers/TagController.ts",
    "client/src/controllers/TooltipController.ts",
    "client/src/controllers/UnsavedController.ts",
    "client/src/entrypoints/admin/modal-workflow.js",
    "client/src/entrypoints/admin/privacy-switch.js",
    "client/src/includes/bulk-actions.js",
    "client/src/includes/chooserModal.js",
    "client/src/tokens/colorThemes.js",
    "client/tests/integration/PlaywrightEnvironment.js",
    "client/tests/integration/documents-upload.test.js",
    "client/tests/integration/editor.test.js",
    "client/tests/integration/expect-axe.js",
    "client/tests/integration/images-upload.test.js",
    "client/tests/integration/jest.config.js",
    "client/tests/integration/listing.test.js",
    "docs/contributing/developing.md",
    "docs/contributing/ui_guidelines.md",
    "https://static-wagtail-v7-4.netlify.app/admin/",
    "https://static-wagtail-v7-4.netlify.app/admin/account/",
    "https://static-wagtail-v7-4.netlify.app/admin/choose-page/",
    "https://static-wagtail-v7-4.netlify.app/admin/collections/",
    "https://static-wagtail-v7-4.netlify.app/admin/collections/2/",
    "https://static-wagtail-v7-4.netlify.app/admin/collections/2/delete/",
    "https://static-wagtail-v7-4.netlify.app/admin/collections/add/",
    "https://static-wagtail-v7-4.netlify.app/admin/country/",
    "https://static-wagtail-v7-4.netlify.app/admin/documents/",
    "https://static-wagtail-v7-4.netlify.app/admin/documents/chooser/",
    "https://static-wagtail-v7-4.netlify.app/admin/documents/edit/2/",
    "https://static-wagtail-v7-4.netlify.app/admin/documents/multiple/add/",
    "https://static-wagtail-v7-4.netlify.app/admin/documents/usage/2/",
    "https://static-wagtail-v7-4.netlify.app/admin/forms/",
    "https://static-wagtail-v7-4.netlify.app/admin/forms/submissions/69/",
    "https://static-wagtail-v7-4.netlify.app/admin/groups/",
    "https://static-wagtail-v7-4.netlify.app/admin/groups/delete/2/",
    "https://static-wagtail-v7-4.netlify.app/admin/groups/edit/2/",
    "https://static-wagtail-v7-4.netlify.app/admin/groups/history/2/",
    "https://static-wagtail-v7-4.netlify.app/admin/groups/new/",
    "https://static-wagtail-v7-4.netlify.app/admin/images/",
    "https://static-wagtail-v7-4.netlify.app/admin/images/51/",
    "https://static-wagtail-v7-4.netlify.app/admin/images/51/delete/",
    "https://static-wagtail-v7-4.netlify.app/admin/images/51/generate_url/",
    "https://static-wagtail-v7-4.netlify.app/admin/images/chooser/",
    "https://static-wagtail-v7-4.netlify.app/admin/images/multiple/add/",
    "https://static-wagtail-v7-4.netlify.app/admin/locales/",
    "https://static-wagtail-v7-4.netlify.app/admin/locales/delete/1/",
    "https://static-wagtail-v7-4.netlify.app/admin/locales/edit/1/",
    "https://static-wagtail-v7-4.netlify.app/admin/pages/",
    "https://static-wagtail-v7-4.netlify.app/admin/pages/60/",
    "https://static-wagtail-v7-4.netlify.app/admin/pages/60/edit/",
    "https://static-wagtail-v7-4.netlify.app/admin/pages/60/history/",
    "https://static-wagtail-v7-4.netlify.app/admin/pages/60/move/",
    "https://static-wagtail-v7-4.netlify.app/admin/pages/60/revisions/2/revert/",
    "https://static-wagtail-v7-4.netlify.app/admin/pages/60/usage/",
    "https://static-wagtail-v7-4.netlify.app/admin/pages/60/workflow_history/",
    "https://static-wagtail-v7-4.netlify.app/admin/pages/66/add_subpage/",
    "https://static-wagtail-v7-4.netlify.app/admin/pages/68/edit/",
    "https://static-wagtail-v7-4.netlify.app/admin/pages/69/edit/",
    "https://static-wagtail-v7-4.netlify.app/admin/pages/77/edit/",
    "https://static-wagtail-v7-4.netlify.app/admin/pages/80/edit/",
    "https://static-wagtail-v7-4.netlify.app/admin/pages/82/edit/",
    "https://static-wagtail-v7-4.netlify.app/admin/pages/82/revisions/compare/live...110/",
    "https://static-wagtail-v7-4.netlify.app/admin/pages/82/workflow_history/detail/4/",
    "https://static-wagtail-v7-4.netlify.app/admin/pages/search/",
    "https://static-wagtail-v7-4.netlify.app/admin/redirects/",
    "https://static-wagtail-v7-4.netlify.app/admin/redirects/29/",
    "https://static-wagtail-v7-4.netlify.app/admin/redirects/29/delete/",
    "https://static-wagtail-v7-4.netlify.app/admin/redirects/add/",
    "https://static-wagtail-v7-4.netlify.app/admin/redirects/import/",
    "https://static-wagtail-v7-4.netlify.app/admin/reports/aging-pages/",
    "https://static-wagtail-v7-4.netlify.app/admin/reports/locked/",
    "https://static-wagtail-v7-4.netlify.app/admin/reports/page-types-usage/",
    "https://static-wagtail-v7-4.netlify.app/admin/reports/site-history/",
    "https://static-wagtail-v7-4.netlify.app/admin/reports/workflow/",
    "https://static-wagtail-v7-4.netlify.app/admin/reports/workflow_tasks/",
    "https://static-wagtail-v7-4.netlify.app/admin/searchpicks/",
    "https://static-wagtail-v7-4.netlify.app/admin/searchpicks/5/",
    "https://static-wagtail-v7-4.netlify.app/admin/searchpicks/5/delete/",
    "https://static-wagtail-v7-4.netlify.app/admin/searchpicks/add/",
    "https://static-wagtail-v7-4.netlify.app/admin/searchpicks/reports/search-terms/",
    "https://static-wagtail-v7-4.netlify.app/admin/settings/base/genericsettings/1/",
    "https://static-wagtail-v7-4.netlify.app/admin/settings/base/sitesettings/2/",
    "https://static-wagtail-v7-4.netlify.app/admin/sites/",
    "https://static-wagtail-v7-4.netlify.app/admin/sites/copy/2/",
    "https://static-wagtail-v7-4.netlify.app/admin/sites/delete/2/",
    "https://static-wagtail-v7-4.netlify.app/admin/sites/edit/2/",
    "https://static-wagtail-v7-4.netlify.app/admin/sites/new/",
    "https://static-wagtail-v7-4.netlify.app/admin/snippets/base/footertext/",
    "https://static-wagtail-v7-4.netlify.app/admin/snippets/base/person/",
    "https://static-wagtail-v7-4.netlify.app/admin/snippets/base/person/add/",
    "https://static-wagtail-v7-4.netlify.app/admin/snippets/base/person/copy/4/",
    "https://static-wagtail-v7-4.netlify.app/admin/snippets/base/person/delete/4/",
    "https://static-wagtail-v7-4.netlify.app/admin/snippets/base/person/edit/4/",
    "https://static-wagtail-v7-4.netlify.app/admin/snippets/base/person/history/4/",
    "https://static-wagtail-v7-4.netlify.app/admin/snippets/base/person/history/4/revisions/compare/live...109/",
    "https://static-wagtail-v7-4.netlify.app/admin/snippets/base/person/unpublish/4/",
    "https://static-wagtail-v7-4.netlify.app/admin/snippets/base/person/workflow_history/4/",
    "https://static-wagtail-v7-4.netlify.app/admin/snippets/base/person/workflow_history/4/detail/3/",
    "https://static-wagtail-v7-4.netlify.app/admin/snippets/breads/breadingredient/",
    "https://static-wagtail-v7-4.netlify.app/admin/snippets/breads/breadingredient/add/",
    "https://static-wagtail-v7-4.netlify.app/admin/snippets/breads/breadingredient/delete/1/",
    "https://static-wagtail-v7-4.netlify.app/admin/snippets/breads/breadingredient/edit/1/",
    "https://static-wagtail-v7-4.netlify.app/admin/snippets/breads/breadingredient/inspect/1/",
    "https://static-wagtail-v7-4.netlify.app/admin/snippets/breads/breadtype/",
    "https://static-wagtail-v7-4.netlify.app/admin/snippets/breads/breadtype/add/",
    "https://static-wagtail-v7-4.netlify.app/admin/styleguide/",
    "https://static-wagtail-v7-4.netlify.app/admin/translation/submit/page/60/",
    "https://static-wagtail-v7-4.netlify.app/admin/users/",
    "https://static-wagtail-v7-4.netlify.app/admin/users/copy/7/",
    "https://static-wagtail-v7-4.netlify.app/admin/users/delete/7/",
    "https://static-wagtail-v7-4.netlify.app/admin/users/edit/7/",
    "https://static-wagtail-v7-4.netlify.app/admin/users/history/7/",
    "https://static-wagtail-v7-4.netlify.app/admin/users/new/",
    "https://static-wagtail-v7-4.netlify.app/admin/workflows/disable/1/",
    "https://static-wagtail-v7-4.netlify.app/admin/workflows/edit/1/",
    "https://static-wagtail-v7-4.netlify.app/admin/workflows/list/",
    "https://static-wagtail-v7-4.netlify.app/admin/workflows/tasks/add/wagtailcore/groupapprovaltask/",
    "https://static-wagtail-v7-4.netlify.app/admin/workflows/tasks/disable/1/",
    "https://static-wagtail-v7-4.netlify.app/admin/workflows/tasks/edit/1/",
    "https://static-wagtail-v7-4.netlify.app/admin/workflows/tasks/index/",
    "https://static-wagtail-v7-4.netlify.app/admin/workflows/usage/1/",
    "package.json",
    "wagtail/admin/forms/auth.py",
    "wagtail/admin/panels/field_panel.py",
    "wagtail/admin/static_src/wagtailadmin/js/vendor/bootstrap-modal.js",
    "wagtail/admin/templates/wagtailadmin/base.html",
    "wagtail/admin/templates/wagtailadmin/bulk_actions/footer.html",
    "wagtail/admin/templates/wagtailadmin/generic/confirm_delete.html",
    "wagtail/admin/templates/wagtailadmin/generic/listing.html",
    "wagtail/admin/templates/wagtailadmin/generic/listing_results.html",
    "wagtail/admin/templates/wagtailadmin/login.html",
    "wagtail/admin/templates/wagtailadmin/pages/confirm_delete.html",
    "wagtail/admin/templates/wagtailadmin/pages/listing/_navigation_explore.html",
    "wagtail/admin/templates/wagtailadmin/pages/listing/_page_title_explore.html",
    "wagtail/admin/templates/wagtailadmin/shared/dialog/dialog.html",
    "wagtail/admin/templates/wagtailadmin/shared/formatted_field.html",
    "wagtail/admin/templates/wagtailadmin/shared/headers/_history_icon_link.html",
    "wagtail/admin/templates/wagtailadmin/shared/headers/slim_header.html",
    "wagtail/admin/templates/wagtailadmin/shared/icon.html",
    "wagtail/admin/templates/wagtailadmin/shared/pagination_nav.html",
    "wagtail/admin/templates/wagtailadmin/shared/panel.html",
    "wagtail/admin/templates/wagtailadmin/shared/workflow_history/detail.html",
    "wagtail/admin/templates/wagtailadmin/skeleton.html",
    "wagtail/admin/templates/wagtailadmin/tables/column_header.html",
    "wagtail/admin/templates/wagtailadmin/tables/ordering_header.html",
    "wagtail/admin/templates/wagtailadmin/tables/title_cell.html",
    "wagtail/admin/templates/wagtailadmin/widgets/chooser.html",
    "wagtail/admin/templates/wagtailadmin/workflows/includes/workflow_tasks_cell.html",
    "wagtail/admin/views/generic/models.py",
    "wagtail/admin/wagtail_hooks.py",
    "wagtail/contrib/forms/templates/wagtailforms/list_submissions.html",
    "wagtail/contrib/styleguide/templates/wagtailstyleguide/base.html",
    "wagtail/documents/static_src/wagtaildocs/js/add-multiple.js",
    "wagtail/documents/templates/wagtaildocs/documents/_file_field.html",
    "wagtail/documents/templates/wagtaildocs/multiple/add.html",
    "wagtail/images/static_src/wagtailimages/js/add-multiple.js",
    "wagtail/images/static_src/wagtailimages/js/focal-point-chooser.js",
    "wagtail/images/static_src/wagtailimages/js/vendor/jquery.Jcrop.min.js",
    "wagtail/images/templates/wagtailimages/images/confirm_delete.html",
    "wagtail/images/templates/wagtailimages/images/edit.html",
    "wagtail/images/templates/wagtailimages/images/image_preview_column_cell.html",
    "wagtail/images/templates/wagtailimages/images/results_image.html",
    "wagtail/images/templates/wagtailimages/multiple/add.html",
    "wagtail/images/templates/wagtailimages/widgets/image_chooser.html",
    "wagtail/users/forms.py",
    "wagtail/users/templates/wagtailusers/groups/includes/formatted_permissions.html",
    "wagtail/users/templates/wagtailusers/groups/includes/page_permissions_formset.html",
    "wagtail/users/templates/wagtailusers/users/confirm_delete.html",
    "wagtail/users/templates/wagtailusers/users/create.html"
  ],
  "findings": [
    {
      "rule": "ARIA-004",
      "wcag": "4.1.2 A",
      "severity": "serious",
      "location": "client/src/components/Draftail/blocks/MediaBlock.js:110",
      "summary": "Rich text image and embed preview buttons have no accessible name when a thumbnail is present.",
      "fix": "Give MediaBlock an explicit localized accessible label identifying its image/embed and action, supplied by ImageBlock/EmbedBlock (for example “Edit image: [alt text]” or “Edit embed: [title]”). Preserve decorative thumbnail alt=\"\" without relying on it for the button name.",
      "evidence": "Runtime 099 /admin/pages/77/edit/: axe button-name on button.MediaBlock. ImageBlock passes alt=\"\"; EmbedBlock also passes alt=\"\". MediaBlock hides its icon and renders no fallback text when src is present.",
      "component": "Draftail MediaBlock",
      "foundBy": [
        "aria-specialist",
        "playwright-scanner"
      ]
    },
    {
      "rule": "FORM-DRAFTAIL-NAME",
      "wcag": "4.1.2 A",
      "severity": "serious",
      "location": "client/src/components/Draftail/index.js:213",
      "summary": "Draftail rich-text textboxes have no accessible name, including fifteen fields on the recipe editor.",
      "fix": "Give each visible contenteditable textbox aria-labelledby pointing to its field or block label, or an equivalent translated aria-label; propagate this through Draftail options for both ordinary fields and StreamField widgets.",
      "evidence": "Runtime /admin/pages/82/edit/: axe aria-input-field-name finds 15 role=textbox contenteditables without aria-label or aria-labelledby. A label targeting the hidden backing input does not name the visible editor.",
      "component": "Draftail rich-text widget",
      "foundBy": [
        "forms-specialist",
        "playwright-scanner"
      ]
    },
    {
      "rule": "FORM-MULTIUPLOAD-NAME",
      "wcag": "4.1.2 A",
      "severity": "serious",
      "location": "wagtail/images/templates/wagtailimages/multiple/add.html:26",
      "summary": "Multiple image and document upload file inputs have no accessible name.",
      "fix": "Use an associated label for #fileupload in both upload templates; retain the visible “Or choose from your computer” text as the input name. Associate accepted-format and size instructions with aria-describedby.",
      "evidence": "Runtime /admin/images/multiple/add/ and /admin/documents/multiple/add/: axe label flags #fileupload. Adjacent button text is not programmatically associated. Document template also has the input at line 26.",
      "component": "Multiple image/document upload",
      "foundBy": [
        "forms-specialist",
        "playwright-scanner"
      ]
    },
    {
      "rule": "FORM-SUBMISSION-CHECKBOX-NAME",
      "wcag": "4.1.2 A",
      "severity": "serious",
      "location": "wagtail/contrib/forms/templates/wagtailforms/list_submissions.html:12",
      "summary": "Form-submission selection checkboxes have no names, so screen-reader users cannot identify the select-all control or selected record.",
      "fix": "Label the header checkbox “Select all submissions” and label each row checkbox “Select submission …” with a meaningful row identifier, using labels or aria-label.",
      "evidence": "Runtime /admin/forms/submissions/69/: axe label flags header checkbox data-w-bulk-target=all and row checkbox name=selected-submissions; source lines 12 and 24 contain no labels.",
      "component": "Form submissions listing",
      "foundBy": [
        "forms-specialist",
        "playwright-scanner"
      ]
    },
    {
      "rule": "FORM-TAG-INPUT-NAME",
      "wcag": "4.1.2 A",
      "severity": "serious",
      "location": "client/src/controllers/TagController.ts:63",
      "summary": "Tag-it replaces the labeled tag field with an unnamed text input.",
      "fix": "After tag-it initializes, give its generated input an ID and associate the existing Tags label with it, or copy the field label through aria-labelledby; also preserve relevant descriptions and invalid state.",
      "evidence": "Runtime /admin/images/51/, /admin/documents/edit/2/, /admin/pages/68/edit/ and /admin/pages/77/edit/: axe label flags .ui-autocomplete-input. vendor/tag-it.js:130 creates <input type=text> without an ID/name association; TagController.connect does not supply one.",
      "component": "Tag widget",
      "foundBy": [
        "forms-specialist",
        "playwright-scanner"
      ]
    },
    {
      "rule": "KEYBOARD-FOCAL-CREATE",
      "wcag": "2.1.1 A; 2.5.7 AA",
      "severity": "serious",
      "location": "wagtail/images/static_src/wagtailimages/js/focal-point-chooser.js:4",
      "summary": "Image focal areas cannot be created or resized using the keyboard.",
      "fix": "Expose labelled coordinate and size inputs or implement a focusable crop widget with keyboard create, move and resize actions; keep hidden model fields synchronized and provide a single-pointer alternative to dragging.",
      "evidence": "At /admin/images/51/, focus .jcrop-keymgr and press ArrowRight, ArrowDown, Space, Enter: all four hidden coordinates remain empty, selection w/h remain 0. Jcrop keyboard handler only moves an existing rectangle; no resize/create keys.",
      "component": "Image focal-point chooser",
      "foundBy": [
        "keyboard-navigator",
        "playwright-scanner"
      ]
    },
    {
      "rule": "LIVE-UPLOAD-OUTCOME",
      "wcag": "4.1.3 AA",
      "severity": "serious",
      "location": "wagtail/images/templates/wagtailimages/multiple/add.html:75",
      "summary": "Multiple-upload success and failure messages appear without announcements or focus changes.",
      "fix": "Create a persistent upload status region before operations start; update it with the file name and completion, duplicate-warning or failure message. Route urgent errors through an existing alert region and batch multiple-file updates to prevent flooding.",
      "evidence": "Source: image template75–86/document template69–72 plain status-msg/error_messages p elements; add-multiple.js image157–172/document120–132 reveals outcomes by classes and appends errors without live semantics or focus. CSS _add-multiple.scss111–155 toggles visibility.",
      "component": "Multiple image/document upload results",
      "foundBy": [
        "live-region-controller"
      ]
    },
    {
      "rule": "MODAL-001",
      "wcag": "4.1.2 A",
      "severity": "serious",
      "location": "client/src/entrypoints/admin/modal-workflow.js:66",
      "summary": "Legacy chooser dialogs lack an accessible name and do not expose their modal state, leaving background content exposed to assistive technology.",
      "fix": "Give the chooser dialog aria-labelledby pointing to its loaded heading (with a unique stable ID) and aria-modal=\"true\", updating the relationship on workflow body replacement. Prefer migrating this Bootstrap branch to the existing labelled a11y-dialog component or native showModal dialog.",
      "evidence": "Chromium image/page/document chooser probes: role=\"dialog\", aria-hidden=\"false\", aria-label=null, aria-labelledby=null, aria-modal=null, headings #header-title present. No background aria-hidden or inert. raw/modal-runtime.json.",
      "component": "Legacy ModalWorkflow chooser shell",
      "foundBy": [
        "modal-specialist",
        "playwright-scanner"
      ]
    },
    {
      "rule": "ARIA-001",
      "wcag": "1.3.1 A",
      "severity": "moderate",
      "location": "wagtail/admin/templates/wagtailadmin/workflows/includes/workflow_tasks_cell.html:5",
      "summary": "Workflow task links wrap list items, breaking the task list structure exposed to assistive technology.",
      "fix": "Make each li a direct child of ul and place the task link inside its li; move the card styling to the link as needed to preserve its click area. Keep the extra-count li as another direct child.",
      "evidence": "Runtime 011: axe list and listitem failures on /admin/workflows/list/. Source: <ul class=\"workflow-tasks\"><a href=\"...\"><li class=\"workflow-tasks__task\">...</li></a></ul>.",
      "component": "Workflow task summary cards",
      "foundBy": [
        "aria-specialist",
        "playwright-scanner"
      ]
    },
    {
      "rule": "ARIA-002",
      "wcag": "4.1.2 A",
      "severity": "moderate",
      "location": "wagtail/users/templates/wagtailusers/users/create.html:44",
      "summary": "The Roles shortcut in user creation and copying is exposed as a tab outside any tablist.",
      "fix": "Remove role=\"tab\" from the in-panel shortcut and use a link or native button to activate the Roles panel. In TabsController, write aria-selected only on actual tablist tabs, rather than every trigger; retain aria-controls and move focus appropriately.",
      "evidence": "Runtime 044 and 073: aria-required-parent on a.w-w-fit, role=\"tab\" outside tablist. TabsController:186–193 updates aria-selected on all triggerTargets, including this shortcut.",
      "component": "User create/copy Roles shortcut",
      "foundBy": [
        "aria-specialist",
        "playwright-scanner"
      ]
    },
    {
      "rule": "ARIA-003",
      "wcag": "4.1.2 A",
      "severity": "moderate",
      "location": "client/src/components/Sidebar/menu/SubMenuItem.tsx:106",
      "summary": "Sidebar navigation and account disclosures announce a menu popup although their opened content has ordinary list/link semantics.",
      "fix": "Remove aria-haspopup=\"menu\" from SubMenuItem and the account button in MainMenu.tsx:279; retain the accurate aria-expanded disclosure state. Optionally add aria-controls with a stable panel ID. Keep native navigation lists and links.",
      "evidence": "Captured admin DOM: Settings/Reports/Help buttons have aria-haspopup=\"menu\"; panels contain h2 and ul > li > a without role=\"menu\". Account button likewise opens ul containing ordinary links.",
      "component": "Sidebar submenu and account disclosures",
      "foundBy": [
        "aria-specialist",
        "playwright-scanner"
      ]
    },
    {
      "rule": "CONTRAST-FIELD-BOUNDARY",
      "wcag": "1.4.11 AA",
      "severity": "moderate",
      "location": "client/scss/components/forms/_input-base.scss:12",
      "summary": "Empty form controls have low-contrast boundaries in both light and dark themes.",
      "fix": "Increase border-field-default to at least 3:1 against field and surrounding page surfaces in both themes; retain separate inactive styling. Apply to controls whose empty editable extent is identified by their border.",
      "evidence": "On /admin/users/new/ username, first/last name and password fields: light border #c8c8c8 against white field/content =1.67:1; dark border #5c5c5c against #262626 field/content =2.26:1. Empty fields have no contrasting fill or other extent indicator.",
      "component": "Default text-input and password boundaries",
      "foundBy": [
        "contrast-master",
        "playwright-scanner"
      ]
    },
    {
      "rule": "FORM-DRAFTAIL-DESCRIPTION-PROPAGATION",
      "wcag": "1.3.1 A",
      "severity": "moderate",
      "location": "client/src/components/Draftail/index.js:161",
      "summary": "Draftail does not propagate field instructions and validation descriptions from its hidden backing field to the interactive textbox.",
      "fix": "Read and preserve the backing field aria-describedby tokens and pass them to Draftail ariaDescribedBy, adding the length counter rather than replacing them; propagate aria-invalid to the visible textbox as validation changes.",
      "evidence": "initEditor sets ariaDescribedBy=null, only substitutes the length-counter ID at 199, and passes it at 251; BoundDraftailWidget.setInvalid only changes the hidden input at 343. Field help/error IDs supplied by FieldPanel are not used.",
      "component": "Draftail field help and validation",
      "foundBy": [
        "forms-specialist"
      ]
    },
    {
      "rule": "FORM-STREAMFIELD-ERROR-ASSOCIATION",
      "wcag": "1.3.1 A",
      "severity": "moderate",
      "location": "client/src/components/StreamField/blocks/FieldBlock.js:153",
      "summary": "StreamField field errors are displayed beside inputs but are not programmatically associated with those inputs.",
      "fix": "Include the existing ${prefix}-errors container in the widget aria-describedby tokens when invalid, preserving help-text tokens, and remove the error token when clear. Ensure custom widgets propagate the association to their interactive control.",
      "evidence": "Source: error container has id=${prefix}-errors (line 24); setError appends text and sets invalid state (123–146); getAttributes only describes ${prefix}-helptext (160–161). No error ID is passed to the widget.",
      "component": "StreamField FieldBlock validation",
      "foundBy": [
        "forms-specialist"
      ]
    },
    {
      "rule": "KEYBOARD-FOCAL-VISIBLE",
      "wcag": "2.4.7 AA",
      "severity": "moderate",
      "location": "wagtail/images/static_src/wagtailimages/js/vendor/jquery.Jcrop.min.js:20",
      "summary": "The focal-point chooser receives keyboard focus in an offscreen radio input with no visible focus indicator.",
      "fix": "Provide a visible, focusable focal-area control and draw an obvious focus indicator on the displayed image/widget when keyboard focus enters.",
      "evidence": "Runtime .jcrop-keymgr is type=radio with position:fixed;left:-120px;width:12px. Keyboard focus stays on this offscreen input after arrow keys and there is no visible selection for images without a focal area.",
      "component": "Image focal-point chooser",
      "foundBy": [
        "keyboard-navigator",
        "playwright-scanner"
      ]
    },
    {
      "rule": "LIVE-BULK-SELECTION-COUNT",
      "wcag": "4.1.3 AA",
      "severity": "moderate",
      "location": "wagtail/admin/templates/wagtailadmin/bulk_actions/footer.html:7",
      "summary": "Bulk-selection totals change visually without a programmatic status announcement.",
      "fix": "Maintain a persistent polite status region outside the initially hidden footer and update it with the selected-item total, including deselection to zero. Preserve checkbox focus and avoid announcing every row in a select-all operation.",
      "evidence": "Browser: /admin/images/, /admin/users/, /admin/pages/60/ first-checkbox selection changes span[data-bulk-action-num-objects] to “1 image/user/page selected”. Only live region is unrelated empty .messages. includes/bulk-actions.js:158 changes plain span textContent.",
      "component": "Bulk actions selection count",
      "foundBy": [
        "live-region-controller",
        "playwright-scanner"
      ]
    },
    {
      "rule": "LIVE-LISTING-ZERO-RESULTS",
      "wcag": "4.1.3 AA",
      "severity": "moderate",
      "location": "wagtail/admin/templates/wagtailadmin/generic/listing_results.html:37",
      "summary": "Generic AJAX search and filter zero-result messages lack status semantics, leaving users uninformed when no matches remain.",
      "fix": "Announce zero matches through a persistent role=status region updated after the results swap, or provide equivalent status semantics to the empty-result message; use polite announcements for routine search feedback.",
      "evidence": "Source: lines8–10 skip the role=alert match-count branch for empty object_list; line37 emits a plain p. generic/listing.html:15 has a plain #listing-results wrapper and no live ancestor. Static archive does not support true query-result verification.",
      "component": "Generic listing search/filter",
      "foundBy": [
        "live-region-controller"
      ]
    },
    {
      "rule": "LIVE-UPLOAD-PROGRESS-SEMANTICS",
      "wcag": "4.1.2 A",
      "severity": "moderate",
      "location": "wagtail/images/templates/wagtailimages/multiple/add.html:55",
      "summary": "Upload progress indicators set aria-valuenow on unnamed generic divs without a progressbar role.",
      "fix": "Use native progress elements with accessible names, or add role=progressbar, labels and min/max/current values to aggregate and per-file indicators. Give per-file indicators names containing the file name; announce completion separately.",
      "evidence": "Image template55/68 and document template53/63 render generic div.progress. Image JS74/85 and document JS62/73 set aria-valuenow but never role, name or min/max. This is source-confirmed; real upload traffic was not exercised.",
      "component": "Multiple-upload progress",
      "foundBy": [
        "live-region-controller"
      ]
    },
    {
      "rule": "MODAL-002",
      "wcag": "2.4.3 A",
      "severity": "moderate",
      "location": "wagtail/admin/static_src/wagtailadmin/js/vendor/bootstrap-modal.js:116",
      "summary": "Tab past the last chooser control moves focus outside the modal, where Escape no longer dismisses it.",
      "fix": "Implement explicit Tab and Shift+Tab wrapping between the first and last focusable controls, including document-boundary cases, and handle Escape while the dialog is open. Migrating the shell to the existing a11y-dialog implementation or a native modal dialog can provide these behaviors.",
      "evidence": "Chromium image chooser: focus final visible button/input/select/textarea/a; Tab gives document.activeElement=body outside .modal. Escape then leaves .modal.in open. Bootstrap enforces only focusin and binds keyup Escape to .modal. raw/modal-focus.json.",
      "component": "Legacy Bootstrap chooser focus trap",
      "foundBy": [
        "modal-specialist",
        "playwright-scanner"
      ]
    },
    {
      "rule": "REFLOW-EDITOR-STATUS-TOOLBAR",
      "wcag": "1.4.10 AA",
      "severity": "moderate",
      "location": "wagtail/admin/templates/wagtailadmin/shared/headers/slim_header.html:110",
      "summary": "The editor header requires horizontal scrolling to reach the Live-page control at 320 CSS pixels.",
      "fix": "Allow the header status/action strip to wrap or move secondary actions into an accessible disclosure at narrow widths, so all controls fit within320px without horizontal scrolling.",
      "evidence": "Settled desktop-to320px resize on /admin/pages/69/edit/: status/action strip clientWidth320,scrollWidth368; Live-page link x306,right360.45. Its text and right edge are outside the viewport until the strip scrolls; document also requires vertical scrolling.",
      "component": "Editor slim header status/action strip",
      "foundBy": [
        "contrast-master",
        "playwright-scanner"
      ]
    },
    {
      "rule": "TABLE-001",
      "wcag": "1.3.1 A",
      "severity": "moderate",
      "location": "wagtail/admin/templates/wagtailadmin/tables/column_header.html:2",
      "summary": "Sortable listings and form submissions expose the current sort column and direction only through visual classes and arrows.",
      "fix": "Set aria-sort=\"ascending\" or \"descending\" on the currently sorted th based on is_ascending/is_descending; clear it on other headers. Do the same using heading.order in wagtailforms/list_submissions.html. Preserve link titles describing the next action.",
      "evidence": "20 archived table pages contain active teal/ordered arrow classes and no aria-sort. /admin/sites/: ascending Site class icon-arrow-up-after, title says “Sort by Site in descending order” (next action). Form submissions: ordered icon-arrow-down-after only.",
      "component": "Shared sortable table column headers and form submissions",
      "confidence": "high",
      "foundBy": [
        "playwright-scanner",
        "tables-data-specialist"
      ]
    },
    {
      "rule": "CONTRAST-DISABLED-METADATA",
      "wcag": "1.4.3 AA",
      "severity": "minor",
      "location": "client/scss/components/_listing.scss:181",
      "summary": "The disabled-row style also dims ordinary table metadata to 1.65:1 contrast.",
      "fix": "Restrict opacity changes to genuinely inactive controls; keep informational table cell text at 4.5:1. Review disabled chooser/listing rows so unavailable choices do not make their identifying metadata unreadable.",
      "evidence": "/admin/styleguide/: .disabled > td:nth-child(2) and td:nth-child(3) contain static \"Standard TD\", not inactive controls. opacity:.25 yields #c9c9c9 on white (axe1.65:1,12.92px). Inactive choice title is not used as the basis of this finding.",
      "component": "Disabled listing row metadata",
      "foundBy": [
        "contrast-master",
        "playwright-scanner"
      ]
    }
  ],
  "passed": [
    "25 pages underwent41 expanded tab/dropdown-state scans; overlap-induced dashboard target-size candidates were reviewed and excluded.",
    "All 100 runtime documents have nonempty descriptive page titles and lang=en-us; axe document-title/html-has-lang/html-lang-valid report no violations. Repeated titles such as New: Person describe equivalent creation/copy purposes and are not automatically failures.",
    "All100 pages have first25Tab samples and320px/text-spacing measurements; these are bounded observations, not complete keyboard or responsive conformance tests.",
    "All100 sampled admin pages returned HTTP200 and completed axe-core4.13 WCAG A/AA scans in Chromium152.",
    "All100 sampled pages underwent light-theme axe contrast checks; only styleguide disabled-row text was flagged.",
    "Base admin template maintains a role=status messages container before dynamic messages are appended; CloneController appends updates inside the existing region.",
    "Captured HTML of all 100 pages contains exactly one main landmark and one Skip to main content link whose #main target exists. Source skeleton.html:36 connects skip navigation to w-focus; base.html:9 supplies main.",
    "Chooser Edit this item links include aria-describedby pointing to the selected item title. Placeholder links are hidden until a real choice exists.",
    "Chooser choose/clear controls use native buttons; decorative SVG icons in sidebar markup are hidden from assistive technology.",
    "Collection permission option checkboxes have visually hidden associated labels.",
    "Comment editor uses focus-trap and initialFocus for active comments; no general claim that every local comment mutation requires a separate live announcement.",
    "Confirmed existing axe matcher, Jest+Playwright integration configuration and CircleCI UI execution; no duplicate framework installation recommended.",
    "Confirmed project documentation explicitly lists NVDA+Firefox ESR and VoiceOver+Safari accessibility targets.",
    "Dark-theme color-contrast axe checks pass on users/new, pages69edit, site-history and account after removing light-theme class and allowing transitions to settle.",
    "Dashboard expanded-dropdown target-size flags concern date rectangles partly covered by popup; visible portion still has24px-circle spacing, so no confirmed2.5.8 failure was recorded.",
    "Dashboard expanded-menu target-size results were manually triaged in contrast review; popup overlap artifact was excluded rather than treating every sub24px target as nonconforming.",
    "Dashboard first Tab reaches visible skip link; Enter transfers focus to #main.",
    "Desktop800px focus-obscuration candidates in user creation and workflow editor were rechecked with600ms-perTab: target controls remained visible above footer after settling. Initial fastTab geometry was not treated as a confirmed2.4.11 failure.",
    "Document download/source links use filenames conveying target identity and extension.",
    "DrilldownController updates aria-expanded on matching submenu toggles.",
    "Escape dismisses legacy chooser while focus remains inside; its Close button is named.",
    "Form submissions table is enclosed in a local w-overflow-auto form rather than assuming all horizontal table scrolling is a reflow failure.",
    "Image URL preview scroll container is reached by Tab in Chromium 152 through implicit scroll-container focusability; axe missing-tabindex result is not a confirmed Chromium keyboard failure.",
    "Image source review confirms chooser thumbnails deliberately use empty alt because the chosen image title is adjacent; listing thumbnails accompany named image links; meaningful image edit/inspect previews provide descriptive text alternatives.",
    "Image, page and document chooser fragments load within the production ModalWorkflow shell and focus initially lands on its dialog container.",
    "InlinePanel.initialFocus moves focus to newly created forms; StreamField sequence additions support focusing the inserted block. Live-region announcements are not required for every mutation where meaningful focus movement conveys context.",
    "KeyboardController respects user setting disabling shortcuts.",
    "Legacy chooser close reenables and attempts to return focus to the triggering element; verified source callbacks and visible account-trigger probe.",
    "Measured first25 Tab focus outlines throughout100 pages use visible3px green outlines; green #00a885 on white is3.03:1. Separate focal-point offscreen focus defect is owned by keyboard-navigator.",
    "Native table/thead/tbody/th structure supports column associations across inspected listings, reports, history, usage, and dashboard tables; absence of scope/caption alone was not treated as failure.",
    "No click-here/read-more/learn-more ambiguity found in scoped admin link-source search.",
    "No image-alt, svg-img-alt, role-img-alt or input-image-alt axe violations across all 100 documents.",
    "No table header association violations were returned by the available WCAG-tagged axe scans across 100 runtime pages.",
    "Nonzero generic search/filter counts and chooser search results have explicit announcement semantics; no missing-announcement finding asserted for those states.",
    "OrderableController provides ArrowUp/ArrowDown reordering and explicitly restores handle focus.",
    "OrderableController sends a success message through w-messages:add after a successful reorder request.",
    "Page explorer declares aria-haspopup=\"dialog\" and opens a labelled role=\"dialog\" component; this relationship is consistent in source.",
    "Page-list explorer icon links carry specific aria-label values naming their target page. History icon links have explicit translated names.",
    "PageExplorer icon links are named by the translated title prop rendered as adjacent visually hidden text by Icon.tsx; the SVG itself is correctly hidden.",
    "Pagination has a named navigation landmark, page counts and aria-current=page on the current link; unavailable previous/next links omit href.",
    "Pagination links sit within a named Pagination landmark; numbered links identify page targets and current page has aria-current=page. Disabled Previous/Next without href are inert indicators, not inaccessible actionable links.",
    "Permission matrices provide per-checkbox names including their object/action; native table semantics and fieldset/legend grouping retained.",
    "Privacy dialog uses role=dialog, aria-modal=true and aria-labelledby=title-set-privacy, and closes on Escape in runtime.",
    "Rechecked chooser text-spacing candidates using glyph Range bounds: labels remained inside controls; apparent scrollHeight clipping did not remove text.",
    "Repeated row actions such as Edit and live have programmatically determinable table-row context identifying the affected page or object. AA2.4.4 does not require every link to be unique in an isolated link list.",
    "Representative page editor landmarks are distinguishably named Main menu, Breadcrumb, Actions, Minimap, Side panels and Actions (footer).",
    "Representative200% text-size checks used doubled precomputed font sizes on user creation, form-page editor, site-history and account; no verified content loss.",
    "Reviewed 5,191 anchor elements in 100 captured rendered documents; no link-name or label-content-name-mismatch axe violations across initial100 documents or41 expanded tab/dropdown states.",
    "Runtime heading inventories identify meaningful report/list/form headings. Sidebar section H2 headings precede main H1 in DOM but represent separate landmark sections; no information-loss finding is asserted solely from that order.",
    "Settled320px tests reproduce document/body widths320 on suspect site-history, history and form-editor pages; excess table width stays inside table scrollers and was not counted as reflow failure.",
    "Shared dialog template provides a labelled heading and named close button; DialogController delegates focus management to a11y-dialog.",
    "Shared formatted fields render associated labels, separately identified help and error containers. FieldPanel passes aria-describedby and aria-invalid for ordinary supported widgets.",
    "Shared icon template hides decorative SVG icons using aria-hidden=true. Captured HTML confirms rendered icon SVGs are hidden; the remaining inline SVG consists of sprite definitions.",
    "Sidebar expansion state follows React isOpen/accountSettingsOpen state.",
    "Sidebar page explorer is a labelled nonmodal dialog; runtime opens with focus in the explorer and Escape clears its trigger aria-expanded state.",
    "Source review: UnsavedController warns before leaving forms with pending changes.",
    "Source review: consistent Help submenu is registered centrally and sidebar components repeat across sampled admin pages.",
    "Source review: default login uses normal text/password inputs and no paste-blocking handler was found. No CAPTCHA or puzzle appears in the reviewed default authentication template.",
    "Source review: generic, page, image and user deletion present explicit confirmation and cancellation before mutation; page deletion also describes affected descendants/translations and offers unpublishing.",
    "Source review: password creation exposes password-validator instructions and mismatch errors; confirmation passwords use autocomplete=new-password. Security confirmation is an exception to redundant-entry requirements.",
    "StreamField and InlinePanel provide native up/down buttons as alternatives to sorting by drag.",
    "TabsController validates tab panel IDs and supplies aria-controls, selected-tab tabindex and keyboard navigation handlers.",
    "Targeted runtime tests verified dashboard skip link, existing drag-reordering alternatives, chooser Escape within dialogs, shared privacy dialog name/modality and sidebar PageExplorer dismissal.",
    "User creation password fields explicitly set autocomplete=new-password.",
    "WCAG-tagged axe checked applicable ARIA validity, permitted attributes, roles and relationships; native form/link/button naming, list structure and table associations. Confirmed exceptions are correlated to canonical findings."
  ],
  "notes": [
    {
      "skill": "alt-text-headings",
      "note": "Six snippet create/edit/copy documents have no H1 and use H2 for the object title and field headings. A top-level H1 would improve navigation consistency, but the document title and named section structure convey purpose; absence of H1 alone is not asserted as a WCAG failure."
    },
    {
      "skill": "alt-text-headings",
      "note": "No screenshots were captured. Alternative-text review assessed markup, names and context; fidelity of descriptive image prose to all original media pixels was not independently established."
    },
    {
      "skill": "alt-text-headings",
      "note": "User-generated rich-text content, future uploads and third-party media require authoring review; this audit covers the archived sample state."
    },
    {
      "skill": "alt-text-headings",
      "note": "Icon-only control accessible-name defects are covered by the ARIA specialist to avoid duplicate findings."
    },
    {
      "skill": "aria-specialist",
      "note": "Draftail accessible-name failures on page 82 edit and styleguide were corroborated in runtime; they are assigned to the forms specialist to avoid duplicate findings."
    },
    {
      "skill": "aria-specialist",
      "note": "Reviewed archived captured DOM and available runtime axe results alongside source; did not independently drive browser interaction or screen readers."
    },
    {
      "skill": "aria-specialist",
      "note": "Static archive cannot validate server-side validation and chooser selection responses."
    },
    {
      "skill": "aria-specialist",
      "note": "ComboBox command-palette mode disables its own search input and delegates typing to the editor; active-descendant announcements and preview-button navigation need interactive screen-reader verification, and are not asserted as confirmed failures here."
    },
    {
      "skill": "cognitive-accessibility",
      "note": "Authentication was source-reviewed only: no login/password reset/MFA, session timeout, password-manager autofill or successful server authentication was exercised. Login form autocomplete=off is a usability improvement candidate; it alone does not prove3.3.8 failure while password paste remains available."
    },
    {
      "skill": "cognitive-accessibility",
      "note": "Redundant-entry checks are limited to visible forms and source; no complete backend multi-step workflow was executed. No verified3.3.7 failure was found."
    },
    {
      "skill": "cognitive-accessibility",
      "note": "No timed session or timeout warning was exercised; do not claim2.2.1 compliance from this static archive."
    },
    {
      "skill": "cognitive-accessibility",
      "note": "Plain-language recommendations are unscored: consider expanding technical terms such as redirect permanence, rendition filters and workflow tasks in inline help for occasional administrators. No reading-level/COGA advice was counted as a WCAGAA defect."
    },
    {
      "skill": "cognitive-accessibility",
      "note": "Fast sequential-tab geometry at320px included smooth-scroll transition snapshots and intentionally offscreen collapsed minimap content; these candidates were not asserted as failures without settled visibility verification."
    },
    {
      "skill": "contrast-master",
      "note": "Source includes forced-colors and increased-contrast adaptations, plus reduced-motion safeguards for selected components; interactive animations were not exhaustively measured and lack of a global reduction rule alone is not an AA failure."
    },
    {
      "skill": "contrast-master",
      "note": "The editor toolbar reflow finding concerns non-table controls; data-table horizontal scrolling is an allowed two-dimensional-layout exception."
    },
    {
      "skill": "contrast-master",
      "note": "Automatic text-spacing and overflow candidates were manually triaged using DOM geometry without screenshots."
    },
    {
      "skill": "cross-page-analyzer",
      "note": "Mechanical consolidation: 22 unique component defects, 41 accepted initial axe nodes from 43 raw candidates; no additional findings invented."
    },
    {
      "skill": "cross-page-analyzer",
      "note": "Source-only unexercised states are distinguished from verified URL/node mappings in raw/cross-page-analysis.json."
    },
    {
      "skill": "cross-page-analyzer",
      "note": "Official scoring module used consistently: weights10/5/2/1, confidence scaling, normalized denominator and grades90/80/70/60; alternative skill-reference formula not used."
    },
    {
      "skill": "cross-page-analyzer",
      "note": "Scores measure bounded evidence and applicability; no score establishes WCAG conformance."
    },
    {
      "skill": "cross-page-analyzer",
      "note": "Component-level fix jobs, all100 page scorecard rows, observed/source applicability and exclusion records are saved in raw/cross-page-analysis.json."
    },
    {
      "skill": "cross-page-analyzer",
      "note": "No baseline or complete accessibility-tree snapshots available; remediation delta and structural consistency score are unavailable."
    },
    {
      "skill": "cross-page-analyzer",
      "note": "This mechanical payload adds no passed statements, preserving the renderer's meaningful-check denominator."
    },
    {
      "skill": "forms-specialist",
      "note": "Archive POST validation, upload completion and server-side error responses were not exercised; these require a live writable test environment."
    },
    {
      "skill": "forms-specialist",
      "note": "StreamField error association and Draftail validation-description propagation are source-confirmed findings; interactive invalid-state runtime testing is pending."
    },
    {
      "skill": "forms-specialist",
      "note": "No missing autocomplete finding is asserted for editing another user’s information; WCAG 1.3.5 concerns information about the person using the form."
    },
    {
      "skill": "keyboard-navigator",
      "note": "Runtime tests used isolated Chromium and real Tab/Enter/Escape key events; no persisted writes."
    },
    {
      "skill": "keyboard-navigator",
      "note": "Archive cannot validate successful uploads, server validation redirects or successful saves. Full screen-reader behaviour and Firefox/Safari scroll-container behaviour remain untested."
    },
    {
      "skill": "keyboard-navigator",
      "note": "Focus restoration improvement: StreamField/InlinePanel deletion and Escape from dropdown/sidebar leave activeElement BODY, but subsequent Tab resumes logically (Insert block, Add author, listing Search and following Help trigger respectively); not recorded as confirmed 2.4.3 failures."
    },
    {
      "skill": "link-checker",
      "note": "New-tab warnings and file size disclosure can improve usability but are not universally required by WCAG2.2AA; their omission is not reported as an automatic failure."
    },
    {
      "skill": "link-checker",
      "note": "Equivalent neighboring image/text links and repeated names with adequate table context are not automatically AA failures."
    },
    {
      "skill": "link-checker",
      "note": "Archive route availability and HTTP errors were not treated as link-purpose defects."
    },
    {
      "skill": "link-checker",
      "note": "Populated tag-it widgets have nonfocusable remove anchors, but keyboard removal has an alternate Backspace/Delete path; keyboard specialist owns that interaction assessment."
    },
    {
      "skill": "link-checker",
      "note": "Expanded-state artifacts contain rule results rather than full accessibility snapshots; their link-name and label-content-name-mismatch results were reviewed."
    },
    {
      "skill": "live-region-controller",
      "note": "Bulk checkbox/count runtime probe stored in raw/live-region-runtime.json. It verifies DOM semantics rather than audible output from a physical screen reader."
    },
    {
      "skill": "live-region-controller",
      "note": "Real uploads, save outcomes and true empty query responses cannot be validated end to end against this static archive. Their reported omissions are established from source paths rather than archive network failures."
    },
    {
      "skill": "live-region-controller",
      "note": "Search result counts commonly use role=alert, which is assertive. Polite status feedback would be less disruptive, but assertiveness alone is not reported as a WCAG failure."
    },
    {
      "skill": "live-region-controller",
      "note": "Counter updates and selection states were assessed as status messages only when they provide operation-result information; not every DOM change is treated as requiring a live region."
    },
    {
      "skill": "modal-specialist",
      "note": "Runtime evidence saved as raw/modal-runtime.json and raw/modal-focus.json; no screenshots taken."
    },
    {
      "skill": "modal-specialist",
      "note": "Chooser probes invoked the production ModalWorkflow API against actual archived image/page/document fragments, without POST requests or fabricated backend responses."
    },
    {
      "skill": "modal-specialist",
      "note": "Initial page 68 chooser controls and privacy triggers were hidden in the default archived panel state, so chooser opening was probed through its actual JavaScript API; hidden-trigger focus return from that probe is not reported as a defect."
    },
    {
      "skill": "modal-specialist",
      "note": "The focus-boundary probe used a visible sidebar account button as the ModalWorkflow trigger to separate chooser-shell behavior from hidden editor panels."
    },
    {
      "skill": "modal-specialist",
      "note": "Privacy dialog opening was probed using its production show event; server-backed privacy submission, validation, nested workflow replacement, and screen-reader virtual cursor behavior remain unverified."
    },
    {
      "skill": "modal-specialist",
      "note": "No failure is asserted merely because the existing implementation uses div rather than native dialog."
    },
    {
      "skill": "playwright-scanner",
      "note": "Scored runtime findings reuse the exact canonical rule and file:line so rendering can deduplicate them; source-only defects are deliberately absent."
    },
    {
      "skill": "playwright-scanner",
      "note": "43 initial node candidates remain preserved in raw/runtime-correlation.json and individual runtime files. Multiple nodes can share one component finding."
    },
    {
      "skill": "playwright-scanner",
      "note": "Image URL scroll-container axe warning was disproved by actual Tab focus in Chromium152; Firefox/Safari behavior remains untested."
    },
    {
      "skill": "playwright-scanner",
      "note": "Inactive chooser title contrast is excluded; ordinary disabled-row metadata contrast is retained separately."
    },
    {
      "skill": "playwright-scanner",
      "note": "Expanded dashboard target-size failures were popup-overlap artifacts and are not scored."
    },
    {
      "skill": "playwright-scanner",
      "note": "Settled suspect table/report widths stay in local scrollers; no data-table reflow failure inferred. Editor non-table toolbar overflow is separately confirmed."
    },
    {
      "skill": "playwright-scanner",
      "note": "No screenshots, screen-reader audible-output tests, persisted writes, successful POST flows or full100-page keyboard journeys were performed."
    },
    {
      "skill": "playwright-scanner",
      "note": "Static archive coverage limits include missing Handsontable and fileupload validation assets and unavailable editing-session pings."
    },
    {
      "skill": "playwright-scanner",
      "note": "raw/runtime-correlation.json maps each initial axe node to its accepted canonical finding or exclusion reason and records aggregate passing rule IDs."
    },
    {
      "skill": "tables-data-specialist",
      "note": "Reflow candidates /reports/aging-pages/ and /reports/site-history/ are assigned to the contrast/visual specialist to avoid duplicate reporting."
    },
    {
      "skill": "tables-data-specialist",
      "note": "Workflow task list structure and form submission checkbox names are handled by aria-specialist and forms-specialist."
    },
    {
      "skill": "tables-data-specialist",
      "note": "Workflow-history task matrix uses ordinary td revision labels; consider th scope=row for stronger revision associations when multiple revisions are present. Archived examples contain only Initial Revision, so this enhancement is not scored as a confirmed defect."
    },
    {
      "skill": "tables-data-specialist",
      "note": "BulkController represents partial selection as unchecked rather than indeterminate; no misleading visual mixed state was established, so this is an enhancement rather than a scored failure."
    },
    {
      "skill": "tables-data-specialist",
      "note": "Handsontable JS on page 82 is unavailable in the archive (404), so dynamic TableBlock grid keyboard/header behavior could not be verified."
    },
    {
      "skill": "tables-data-specialist",
      "note": "Review included source templates and captured runtime/table markup, plus parent-generated viewport measurements; no screen-reader table navigation or backend pagination/sort response was tested."
    },
    {
      "skill": "testing-coach",
      "note": "Existing Jest/Playwright axe integration is already present; extend client/tests/integration and existing CircleCI UI tests. GitHub test.yml is the backend matrix."
    },
    {
      "skill": "testing-coach",
      "note": "Run npm run test:unit for focused component/controller tests; run TEST_ORIGIN=http://localhost:8000 npm run test:integration -- --runInBand against disposable writable Django UI fixtures, following docs/contributing/developing.md."
    },
    {
      "skill": "testing-coach",
      "note": "After fixing Draftail names, remove editor.test.js placeholder exclusion; re-enable chooser tests and remove modal blanket exclusion as chooser fixes land. Do not add broad exclusions to hide findings."
    },
    {
      "skill": "testing-coach",
      "note": "Manual matrix: NVDA+Firefox ESR on Windows and VoiceOver+Safari on macOS. Record actual announcements, browser/AT versions, exact steps and expected/actual behavior. No audible screen-reader testing was performed in this audit."
    },
    {
      "skill": "testing-coach",
      "note": "Draftail labels and validation: Extend editor.test.js with a page containing ordinary rich text plus nested/list/StreamField rich text. Assert getByRole(textbox,{name:fieldLabel}) uniquely resolves the visible contenteditable; assert aria-describedby resolves all help/error/counter IDs. Trigger a required/max-length validation error and inspect aria-invalid on the interactive textbox. After fixes remove the global placeholder selector exclusion and rerun axe. With NVDA+Firefox ESR and VoiceOver+Safari, navigate by form controls; each editor announces its label, help, required/error state and error message without navigating to the hidden backing input."
    },
    {
      "skill": "testing-coach",
      "note": "Tags and submissions: Add a populated tag fixture to image/document/page editors, assert the generated tag-entry textbox has the visible field name. On a submissions listing assert each row checkbox has a meaningful unique name and the select-all checkbox is named. Run axe before and after adding/removing a tag. Enter, select and remove a tag without a pointer; verify label/selection/removal context. Select a submission by its announced record identifier."
    },
    {
      "skill": "testing-coach",
      "note": "Uploads and status: Extend existing images-upload.test.js and documents-upload.test.js: use getByLabel for file input, assert progress role/name/value during a deliberately delayed upload, inspect a persistent status region for success and invalid-size/type/server failure text. Keep existing didPost=false validation assertion. On a writable disposable backend upload valid and invalid fixtures with NVDA/Firefox and VoiceOver/Safari. Record actual speech for filename/progress/completion/errors; do not require every percentage change to interrupt speech."
    },
    {
      "skill": "testing-coach",
      "note": "Chooser boundary and name: Re-enable skipped image/page/embed chooser tests in editor.test.js after fixes; include modal content in axe. Assert role=dialog has an accessible name and aria-modal=true, Tab/Shift+Tab stay within it, Escape dismisses from every focus position, focus returns to original chooser trigger. Open and close each chooser with keyboard and screen reader; verify dialog title, background is unavailable, result selection works, final Tab and Shift+Tab never escape."
    },
    {
      "skill": "testing-coach",
      "note": "Image focal area: Extend image editor coverage with keyboard-only create/move/resize of a focal area and assert resulting coordinates; verify every focused control has a visible rendered indicator. Exercise a pointer alternative that does not require dragging. Create/move/resize/reset focal area without mouse; repeat at zoom and Windows Contrast themes. Check offscreen native radio does not consume focus without a visible indicator."
    },
    {
      "skill": "testing-coach",
      "note": "Sort and bulk results: Extend listing.test.js and submission fixtures: activate each sortable header, assert current column aria-sort and direction update. Select one/all/zero items and assert a persistent polite status region receives accurate counts. Search an impossible term and verify a zero-result status update. On screen reader, identify current sort and direction from header navigation; operate sort, selection and empty search while focus stays on the initiating control and hear one concise result announcement."
    },
    {
      "skill": "testing-coach",
      "note": "Field boundaries and metadata contrast: Retest computed field border/background combinations in light/dark modes and enabled/disabled-row metadata states. Assert at least 3:1 for necessary enabled-control boundaries and 4.5:1 for normal informational text; preserve disabled-control exemption. Review empty inputs against surrounding surfaces in light/dark themes and Windows Contrast themes, including controls without placeholder text."
    },
    {
      "skill": "testing-coach",
      "note": "Editor narrow layout and spacing: Repeat editor toolbar at320 CSS pixels and text-spacing override (line-height1.5, paragraph2em, letter.12em, word.16em). Assert essential Live-page control is reachable without page/container horizontal scrolling where no exception applies. At400% browser zoom, use keyboard to reach all header/actions/side panels; check focus is visible and not obscured by sticky furniture."
    },
    {
      "skill": "testing-coach",
      "note": "Table blocks and static-asset gaps: Run writable-backend editor fixture containing actual table and typed-table blocks; ensure Handsontable assets load and run keyboard insertion/editing, row/column changes and axe in expanded editors. Verify fileupload validation assets load before upload assertions. Do not interpret static-archive404s as component WCAG failures. Retest unloaded widgets with their real assets and report any residual inability to navigate/edit tables."
    },
    {
      "skill": "testing-coach",
      "note": "The documented project target is WCAG2.1AA; this requested audit uses2.2AA including dragging alternatives and focus-not-obscured."
    },
    {
      "skill": "testing-coach",
      "note": "Automated checks and DOM state probes do not verify actual speech or establish complete conformance."
    },
    {
      "skill": "testing-coach",
      "note": "Use disposable test data on a live backend for saves/uploads/invalid POSTs; no real production mutations were performed."
    }
  ],
  "counts": {
    "critical": 0,
    "serious": 8,
    "moderate": 13,
    "minor": 1
  },
  "components": [
    {
      "component": "Image focal-point chooser",
      "count": 2,
      "worst": "serious",
      "rules": [
        "KEYBOARD-FOCAL-CREATE",
        "KEYBOARD-FOCAL-VISIBLE"
      ]
    }
  ],
  "score": 85,
  "grade": "B",
  "penalty": 67,
  "checks": 87,
  "generated": "2026-10-03",
  "template": "web"
}
```
