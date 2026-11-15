## Confirmed findings and follow-up work

Two agent-readiness scanners were run against https://guide.wagtail.org/en/ on 2026-11-14, followed by a review of the saved evidence, fresh HTTP probes, keyboard interaction in Chromium 153, selected axe-core checks, and the repository source. The actionable findings below are separated from scanner false positives and context-dependent suggestions. The original reports are preserved in full in the collapsed sections at the end; their unreviewed claims and recommendations are not all endorsed.

Related work: #502 (agent-readiness benchmark), #545 (page-specific content in the header cache), #538 (API documentation), and #498 (non-HTML caching).

### 1. Mobile “View page Markdown” can point to a different page

**Confirmed live; found while reviewing the reports' duplicate copy-menu links.** At a 390 × 844 viewport on `/en/`, opening the mobile navigation and its “Toggle options” dropdown exposes “View page Markdown” pointing to `/en/concepts/wagtail-api/markdown/`. The document's head alternate and desktop copy menu correctly point to `/en/markdown/`.

Reproduction:

1. Open the guide homepage with a mobile viewport.
2. Open “Mobile menu toggle”, then “Toggle options”. Both can be opened with the keyboard.
3. Inspect or follow “View page Markdown” and compare its destination with the current page's Markdown alternate.

The particular wrong destination is cache-dependent. The header is cached by language, while the mobile copy widget inside it depends on the current page. This is an additional affected feature of #545, rather than a separate cache mechanism. Changing the cache key or moving page-specific controls outside the cached fragment should cover the copy controls as well as the language selector. Check both the “View page Markdown” link and the adjacent “Copy Markdown link” behaviour after fixing it.

Source: [header cache](https://github.com/wagtail/guide/blob/348b3cd863d98dc0531dad34d02c4ee2c48511aa/apps/core/templates/base.html#L96-L99), [copy widget inside navigation](https://github.com/wagtail/guide/blob/348b3cd863d98dc0531dad34d02c4ee2c48511aa/apps/core/templates/components/navigation.html#L3-L9), [page-dependent Markdown link](https://github.com/wagtail/guide/blob/348b3cd863d98dc0531dad34d02c4ee2c48511aa/apps/core/templates/components/copy_button.html#L10).

### 2. The skip-link navigation and primary navigation are indistinguishable landmarks

**Confirmed in the live DOM, accessibility tree, source, and a fresh `landmark-unique` axe check.** Both `nav.skip-link` and `nav.primary-nav` are exposed at desktop size without `aria-label` or `aria-labelledby`; axe reports `.skip-link`.

Consider using a non-landmark wrapper for the single skip link, or give the navigation landmarks distinct useful names. Verify the resulting landmark list at desktop and mobile sizes. This is a specific landmark issue, not a claim that navigation or keyboard use is generally broken.

Source: [skip-link wrapper](https://github.com/wagtail/guide/blob/348b3cd863d98dc0531dad34d02c4ee2c48511aa/apps/core/templates/components/skip_link.html#L3-L5), [primary navigation](https://github.com/wagtail/guide/blob/348b3cd863d98dc0531dad34d02c4ee2c48511aa/apps/core/templates/components/navigation.html#L3).

The fresh axe check also found the desktop theme labels and content-copy group outside a landmark (`region`). Agentic Web Check had already retained similar evidence while still passing its aggregate landmark check. Consider the placement of `.page-tools` during the same review; this is an additional structural observation, not a new claim of WCAG conformance failure.

### 3. Most OpenAPI operations and parameters have no descriptions

**Confirmed from the current [`/api/v3-preview/openapi.json`](https://guide.wagtail.org/api/v3-preview/openapi.json).** Of 67 operations and 141 operation parameters, 206 of the 208 entries have no `description`; two have a description longer than the scanner's threshold. For example, `GET /api/v3-preview/pages/` has the summary “List pages”, but its operation and parameters such as `search`, `ancestor_of`, and `locale` lack descriptions explaining their meaning.

Improve the documentation of useful public endpoints and parameters: purpose, valid values, filtering behaviour, defaults, and examples. The important gap is missing semantics, not meeting an arbitrary 15-character length threshold. The guide imports upstream `wagtail.api.v3`, so some documentation/schema-generation changes may belong in Wagtail itself; see [route integration](https://github.com/wagtail/guide/blob/348b3cd863d98dc0531dad34d02c4ee2c48511aa/apps/guide/urls.py#L9). This complements #538. It does not imply that all endpoints should be exposed as agent tools or that the API is nonfunctional.

Recheck the served OpenAPI document after documentation/schema-generation changes, including a representative list/search operation. The raw report's separate “missing request/response schemas” warning is rejected below.

### 4. The MCP catalog entry lacks a description

**Confirmed in the live `/.well-known/ai-catalog.json` and current source.** The entry `urn:air:guide.wagtail.org:mcp:wagtail-guide` has an identifier/type/endpoint and tags, but no descriptive text explaining what the server does. The live catalog now has five entries; the original report observed three, so its denominator is historical.

Add a concise description of the actual search/read capabilities and their intended use. This is a discovery-metadata improvement, not evidence that the endpoint cannot be used. Verify the served catalog and keep its description aligned with the server's actual tools.

Source: [MCP catalog entry](https://github.com/wagtail/guide/blob/348b3cd863d98dc0531dad34d02c4ee2c48511aa/public/.well-known/ai-catalog.json#L38-L45).

### 5. Copy-menu links open new tabs without announcing it

**Confirmed in rendered markup and source.** “View page Markdown”, “View llms.txt”, and “View llms-full.txt” use `target="_blank"` without a visible or accessible-name indication that they open a new tab. The scanner counts six elements because the widget occurs in mobile and desktop markup: these are three link purposes in two UI instances.

Either keep navigation in the same tab or communicate the new-tab behaviour in the link text/accessibility treatment. Verify both instances after changing the shared component. This is a usability recommendation for people and browser agents, not by itself a blanket WCAG 2.2 AA failure.

Source: [new-tab links](https://github.com/wagtail/guide/blob/348b3cd863d98dc0531dad34d02c4ee2c48511aa/apps/core/templates/components/copy_button.html#L10-L12).

## Findings that should not become site fixes as reported

### MCP reachability and version downgrade: scanner request defects

The original report labels the MCP endpoint unusable. This is not supported by a correctly formed request:

| Fresh probe to `/mcp` | Observed result |
| --- | --- |
| `server/discover` without a matching `MCP-Method` header | HTTP 400, JSON-RPC `-32020`, method-header mismatch |
| Same discovery request with `MCP-Method: server/discover` | HTTP 200, `supportedVersions: ["2026-07-28"]` |
| `tools/list` with the matching method header | HTTP 200 and actual tool definitions |
| Unsupported version `1900-01-01`, with the correct method header | HTTP 400, `-32022`, with `data.supported` |

The missing header causes validation to fail before the version test can exercise downgrade handling. The successful corrected probes rule out both reported failures; they do not claim that every MCP operation has been tested. No mutating tool was called. Do not implement the report's suggested protocol changes merely to accommodate a malformed scanner probe.

### Browser navigation: search and the copy menu work with the keyboard

- **“No search control”: false positive as a claim that search is absent.** The accessibility tree contains “Toggle the search form”. Focus it and press Enter: a dialog opens with a labelled Search textbox. Typing `images` and pressing Enter reaches `/en/search/?query=images`. The initial hidden input is not a permanently missing search capability. Adding `role="search"`/`type="search"` may improve semantics, but that is distinct from making a nonexistent search work.
- **“Hover-only” copy links: false positive.** At desktop and mobile widths, the “Toggle options” button opens the menu by keyboard, updates `aria-expanded` to `true`, and ArrowDown moves focus into its options. The scanner did not recognise the existing disclosure. Do not replace it on the assumption that hover is required.
- **“Ghost-clickable” theme labels: false positive for the cited elements.** The Dark/Light spans are static labels with computed cursor `auto`; the actual control is a named button. The source attaches theme-toggle handling to that button, not the labels.
- **CSS-hidden primary navigation:** the source intentionally hides it at mobile widths and shows it at desktop widths or when the mobile menu opens. Both states were checked. Static CSS evidence does not establish contradictory/inaccessible primary content. Extra navigation text in non-rendering extraction can still be measured, but is not the same defect.

### Markdown and extraction: landing-page assumptions and parser limitations

The homepage Markdown is served as Markdown and includes linked headings and descriptions for Getting started, How-to guides, Concepts, and Reference. The report calls several of these headings missing because its heading comparison does not normalise `[label](URL)` Markdown and also compares page-chrome/footer headings with the content-only alternate. “How-to” versus “How-to guides” is a wording difference. The reported 13% heading recall is not a reliable measure of missing homepage content.

The low Readability output, token/content ratio, 300-word minimum, pseudo-list detection, and extractor “fact survival” are not independently established user-task failures. This page is a documentation index, not an article. Some metrics are real outputs of that extraction strategy, but they do not justify padding the homepage, duplicating navigation in its prose, or treating its Markdown as unusable. Evaluate extraction with representative documentation tasks before changing the content structure. This review does not assert complete equivalence of every HTML and Markdown detail.

### OpenAPI schema coverage: legitimate no-body cases

The reported 8 missing response schemas are `DELETE` responses with status `204 No Content`. The 10 missing request schemas are bodyless action POSTs, such as publish/convert-alias/workflow actions. These are not missing schemas for data that is actually exchanged. Do not invent request or response bodies to satisfy the check.

### Applicability, optional metadata, and unresolved observations

- **ACP checkout-policy links:** inapplicable to the guide's documentation purpose. Do not add merchant checkout policies.
- **Testimonials, quantified social proof, specific numerical data, FAQ/question headings, or a lead-generation form:** not requirements for this documentation landing page. Their absence does not establish poor agent usability.
- **WebMCP `submit_page_feedback` annotation:** the source does not supply `annotations`, so the narrow metadata observation is correct. However, the [current WebMCP draft](https://webmachinelearning.github.io/webmcp/#dictdef-toolannotations) makes annotations optional and describes `consequentialHint` for significant real-world or non-reversible effects. A feedback mutation alone does not prove a missing mandatory safeguard. Review the intended feedback/confirmation policy, and consider explicit `readOnlyHint` metadata for read tools; do not report a confirmed security vulnerability or automatically require purchase-level confirmation for feedback. No feedback was submitted in this review. [Tool source](https://github.com/wagtail/guide/blob/348b3cd863d98dc0531dad34d02c4ee2c48511aa/apps/frontend/static_src/js/webmcp/index.js#L63).
- **MCP registry listing:** the original scanner found none. This review has not independently established exhaustive registry absence or that listing is necessary for the guide's consumers. Keep as an unconfirmed discovery suggestion, not a reachability defect.
- **OpenAPI caching advisory:** the fresh response has `Last-Modified` and `CF-Cache-Status: HIT`, so the report's claim that no caching metadata exists is not confirmed now. Conditional revalidation was not tested. Relate caching policy work to #498 rather than opening a duplicate workstream.
- **API CORS advisory:** missing CORS headers are not inherently a defect for server-side MCP clients. Establish an intended cross-origin browser consumer before changing access policy.
- **Missing `og:image:alt`:** retained as an unscored report observation, not independently adjudicated here. The scanner's assertion that AI agents cannot process images is not an accepted rationale.
- **Web Check “no agent manifests”:** its evidence probes `/ai-catalog.json`, which returned 404. A catalog exists at `/.well-known/ai-catalog.json`; the narrow probe must not be interpreted as no discovery metadata anywhere.

## Scope and results

| Run | Result | Scope |
| --- | --- | --- |
| Agent Lighthouse 10.6.0, `6f8097bb883ab2c9af6e3e4c1b0c64502c262603` | 85/100; 85 scored passes, 15 failures, 4 warnings, 59 not applicable | Entry homepage plus HTTP/discovery/API probes; no rendered-browser capture or LLM journey |
| Agentic Web Check 0.1.0, `35ec1e1e61f1ca962228846d13a855eaa74f9876` | 97/100 checks-only (derived), 88/100 with tasks; 35 checks passed, 4 warned, none failed, 3 not applicable, 1 informational | One rendered entry page and three built-in read-only tasks using the deterministic baseline agent |

The Web Check tasks reached the privacy policy and About page in one click each. The contact-information task failed after one scroll because no control matched its keyword list. That is a baseline-agent/task-design limitation on this sample, not proof that a reasoning agent cannot find an appropriate support route. The task objectives were generic rather than tailored to documentation users.

Neither original run used an LLM to navigate or judge task completion. The 97 checks-only score is recomputed from the same captured checks with tasks excluded, not a separate scan. Scores use different rubrics and are not comparable measures of task success or conformance. The review does not claim a whole-site audit, full WCAG assessment, or exhaustive API validation.

Source references are pinned to GitHub main `348b3cd863d98dc0531dad34d02c4ee2c48511aa` as inspected on 2026-11-14; this does not assert the deployed site's exact revision. Live observations and source explanations are identified separately. The original reports below are from approximately 00:29–00:31 UTC; follow-up HTTP/browser verification took place later the same day, so changed catalog counts are recorded rather than silently reconciled.

This issue was prepared with AI assistance. The review combined the original deterministic scanner outputs with fresh read-only HTTP probes, Playwright keyboard interaction, selected axe-core rules, and source inspection. No site code was changed and no feedback, account, or transactional action was submitted.

## Full original reports

These are the complete original Markdown reports, preserved verbatim. They include false positives, speculative recommendations, and broad claims corrected above. Expand them for audit provenance; use the reviewed findings above to decide on work.
