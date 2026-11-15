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


<details>
<summary>Full Agent Lighthouse report — guide.wagtail.org (85/100)</summary>

[![Agent Lighthouse](https://forkpoint.github.io/agent-lighthouse/brand/kit/icons/icon-64.png "Agent Lighthouse logo")](https://forkpoint.github.io/agent-lighthouse/)

### Agent Lighthouse — AI readiness report

**Target:** `https://guide.wagtail.org/en/`  
**Overall Score:** **`85/100`** *(partially-ready)*  
**Pages Audited:** `1` | **Duration:** `18.7s`

**Scan Conditions:**  
- **Page Type:** `homepage` (declared)
- **Origin Evidence:** `fresh` (version: `v2`, read at: `2026-11-14T00:29:53.686Z`)
- **Evidence Coverage:** `86 / 132.2` mass (65%) — page: `88.4`, origin: `43.8`, gated: `0`
- **Unscored Checks:** `117` (58 advisory, 0 gated)
- **Budget:** `19 s` of 180 s


| Category | Score | Breakdown |
| :--- | :---: | :--- |
| **Access & Crawl Control** | **100 / 100** | 🟢 28✓ 0! 0✗ (1 not scored) |
| **Machine Discovery** | **100 / 100** | 🟢 18✓ 1! 0✗ (7 not scored) |
| **Agent Interfaces** | **50 / 100** | 🟡 9✓ 3! 4✗ (4 not scored) |
| **Agentic Commerce** | **50 / 100** | 🟡 1✓ 0! 1✗ |
| **Content Extraction** | **62 / 100** | 🟡 12✓ 0! 6✗ (2 not scored) |
| **Structured Data** | **100 / 100** | 🟢 3✓ 0! 0✗ |
| **Answer Readiness** | **73 / 100** | 🔵 10✓ 2! 6✗ (7 not scored) |
| **Agent Operability & Safety** | **93 / 100** | 🟢 20✓ 1! 2✗ (2 not scored) |

> 23 advisory checks ran. They are reported but never scored.

#### No AI vendor reads this

- **llms.txt exists** — No AI vendor documents reading llms.txt or llms-full.txt from a website. In a 137,210-domain study, 97% of llms.txt files received no requests in a month, and AI tools never requested a missing one. [Evidence](https://ahrefs.com/blog/llmstxt-study/)
- **llms.txt is well-formed** — No AI vendor documents reading llms.txt or llms-full.txt from a website. In a 137,210-domain study, 97% of llms.txt files received no requests in a month, and AI tools never requested a missing one. [Evidence](https://ahrefs.com/blog/llmstxt-study/)
- **llms.txt links include descriptions** — No AI vendor documents reading llms.txt or llms-full.txt from a website. In a 137,210-domain study, 97% of llms.txt files received no requests in a month, and AI tools never requested a missing one. [Evidence](https://ahrefs.com/blog/llmstxt-study/)
- **llms.txt links are valid** — No AI vendor documents reading llms.txt or llms-full.txt from a website. In a 137,210-domain study, 97% of llms.txt files received no requests in a month, and AI tools never requested a missing one. [Evidence](https://ahrefs.com/blog/llmstxt-study/)
- **llms-full.txt present** — No AI vendor documents reading llms.txt or llms-full.txt from a website. In a 137,210-domain study, 97% of llms.txt files received no requests in a month, and AI tools never requested a missing one. [Evidence](https://ahrefs.com/blog/llmstxt-study/)
- **CORS on AI files** — No AI crawler or assistant documents reading these files from a browser. They fetch them from servers, where CORS does not apply, so CORS headers on them are not needed. [Evidence](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS)

#### Optional guidance (not scored)

**Content Signals choices and optional setup**

Content Signals choices are readable (unscored).

**report Limits**

<pre>Evidence text is limited to 1000 characters per item and 20000 characters in total. Shortened excerpts carry a label. Further items or complete edits may be omitted; inspect the full robots.txt before editing.</pre>

**declarations**

<pre>search: Allowed (yes) — indexing, links and short excerpts; excludes AI-generated search summaries; bot *, path /, https://guide.wagtail.org/robots.txt, line 3. Declared line: Content-Signal: ai-train=yes, search=yes, ai-input=yes</pre>
<pre>ai-input: Allowed (yes) — model input for answers, including retrieval and grounding; bot *, path /, https://guide.wagtail.org/robots.txt, line 3. Declared line: Content-Signal: ai-train=yes, search=yes, ai-input=yes</pre>
<pre>ai-train: Allowed (yes) — training or fine-tuning; declining this does not decline search or AI input; bot *, path /, https://guide.wagtail.org/robots.txt, line 3. Declared line: Content-Signal: ai-train=yes, search=yes, ai-input=yes</pre>

**syntax Errors**



**repeated Declarations**



**decision Notes**

<pre>Declared values are shown separately; no effective precedence is inferred. Both yes and no are valid choices. There is no completeness target.</pre>
<pre>Edit the system that serves robots.txt; this scan cannot identify its CMS or owner from line order or headers.</pre>

**conditional Edits**



**verification**

<pre>Publish the change in the system that serves robots.txt, reload the public robots.txt, and rescan. A scan checks served syntax, bot/path scope and observed conflicts. It cannot prove external bots obeyed the policy or that a firewall enforces it. Compliance is voluntary.</pre>

Optional examples, not defaults: to permit search and AI answers but decline training, use Content-Signal: search=yes, ai-input=yes, ai-train=no. To permit search only, use Content-Signal: search=yes, ai-input=no, ai-train=no. Choose each purpose independently; yes and no are both valid. Keep the intended bot group and path. Preserve all access rules. Publish the change in the system that serves robots.txt, reload the public robots.txt, and rescan. A scan checks served syntax, bot/path scope and observed conflicts. It cannot prove external bots obeyed the policy or that a firewall enforces it. Compliance is voluntary.

<details><summary>Page scope and coverage</summary>

<pre>Page scope
Detected page types express uncertainty. Type-specific findings on detected pages are advisory.
https://guide.wagtail.org/en/: homepage (declared, strong)
  Signals: declared:homepage
Fetch: https://guide.wagtail.org/en/ — read, HTTP 200; homepage (declared)</pre>

Input URLs are pages supplied to the audit. Results cover this sample. Origin evidence may also support a result. Each audit counts toward the score at most once.

<details><summary>The markdown alternate this site serves is not usable [content-extraction/markdown-alternate]</summary>

<pre>all — FAIL — Primary result
The alternate has drifted from the page: 38% of its prose and 13% of its headings survive.
Finding: Found via declared link. Missing headings: Getting started | How-to | Concepts | Reference | About this guide | Help improve this guide | Wagtail. 358 tokens against 28926 for the HTML — 99% fewer tokens.
Selected URLs: 
  https://guide.wagtail.org/en/
Input URLs: 
  https://guide.wagtail.org/en/
Unread URLs: none
Suggested fix: Generate the alternate from the same source as the HTML so the two cannot drift.</pre>
</details>
<details><summary>Semantic list usage [content-extraction/semantic-lists]</summary>

<pre>all — FAIL — Primary result
1 of 1 content list(s) are div stacks or numbered prose rather than list markup.
Finding: 0 semantic list(s) vs 1 pseudo-list(s); 0 definition element(s); 0 step list(s)
Selected URLs: 
  https://guide.wagtail.org/en/
Input URLs: 
  https://guide.wagtail.org/en/
Unread URLs: none
Suggested fix: Lists built from styled divs, broken &lt;dl&gt; markup or manually numbered paragraphs lose their item boundaries when a page is converted to markdown or serialized into an accessibility tree, which is how extraction pipelines and browsing agents read it.</pre>
</details>
<details><summary>Sufficient content depth [content-extraction/content-depth]</summary>

<pre>all — FAIL — Primary result
0/1 page(s) have &gt;300 words. Lowest: 129 words.
Finding: 0/1 pages above threshold
Selected URLs: 
  https://guide.wagtail.org/en/
Input URLs: 
  https://guide.wagtail.org/en/
Unread URLs: none
Suggested fix: AI RAG systems need sufficient content depth to generate accurate, detailed answers. Pages with fewer than 300 words provide too little context for meaningful vector embeddings, causing your content to rank poorly in retrieval and be excluded from AI-generated responses.</pre>
</details>
<details><summary>Lean token-to-content ratio [content-extraction/token-ratio]</summary>

<pre>all — FAIL — Primary result
Homepage is only 0.2% content by token weight — the page is almost entirely markup noise.
Finding: 0.2% content (63 of 28926 o200k tokens, extracted by readability)
Selected URLs: 
  https://guide.wagtail.org/en/
Input URLs: 
  https://guide.wagtail.org/en/
Unread URLs: none
Suggested fix: AI agents pay for every token of raw HTML they download, but only the visible text carries meaning. A content share under 5% means an agent parses more than 20 tokens of noise for every token of content, and the page may be truncated before the real content is read. Move inline assets to external files, remove unused boilerplate, and flatten markup.</pre>
</details>
<details><summary>Ghost content: CSS-hidden text ingested as visible [content-extraction/css-hidden-ghost-content]</summary>

<pre>all — FAIL — Primary result
295 est. tokens (51.4% of page text) are hidden only by stylesheet rules, which no non-rendering extractor evaluates. Largest: &quot;.primary-nav&quot; (display:none).
Finding: 295 est. tokens hidden by CSS class across 2 block(s), 51.4% of page text
Selected URLs: 
  https://guide.wagtail.org/en/
Input URLs: 
  https://guide.wagtail.org/en/
Unread URLs: none
Suggested fix: Find text that is hidden from human readers by an external stylesheet class but is invisible-as-hidden to every extractor an agent uses, and size it in tokens. Fail if class-hidden text exceeds 15% of the page&#039;s total text tokens or 1,000 tokens absolute; separately fail on near-duplicate hidden blocks (a mobile nav or tab-panel set duplicating visible content). Report contradiction risk when hidden text contains prices, availability, or dated claims.</pre>
</details>
<details><summary>What an agent reads from this page depends on which extractor it uses [content-extraction/extraction-determinism]</summary>

<pre>all — FAIL — Primary result
Readability extracted 270 characters, under its own 500-character threshold.
Finding: readability returned 270 characters, below the 500-character threshold at which it reports a document as readerable.
Selected URLs: 
  https://guide.wagtail.org/en/
Input URLs: 
  https://guide.wagtail.org/en/
Unread URLs: none
Suggested fix: Put the article in one container and keep chrome out of it.</pre>
</details>
<details><summary>AI files are delivered correctly [machine-discovery/ai-file-delivery]</summary>

<pre>all — WARN — Advisory — not scored
Content-Types are correct, but some AI files have no caching headers: openapi.json
Finding: Correct: llms.txt, ai-catalog.json, openapi.json, sitemap.xml; no caching headers on: openapi.json
Selected URLs: 
  https://guide.wagtail.org/en/
Input URLs: 
  https://guide.wagtail.org/en/
Unread URLs: none
Suggested fix: Without a cache-control max-age or an ETag / Last-Modified validator, every agent request re-downloads the whole file instead of revalidating it. Google documents honouring both conditional-request mechanisms.</pre>
</details>
<details><summary>Organization schema [structured-data/organization-schema]</summary>

<pre>declared — PASS — Primary result
Organization schema found with name, url, and logo.
Finding: Complete Organization schema
Selected URLs: 
  https://guide.wagtail.org/en/
Input URLs: 
  https://guide.wagtail.org/en/
Unread URLs: none</pre>
</details>
<details><summary>LocalBusiness/ProfessionalService schema [structured-data/local-business-schema]</summary>

<pre>declared — NA — Not assessed — not scored
No physical store signals detected (no PostalAddress block paired with a store-locator link).
Finding: No physical location indicators found.
Selected URLs: 
  https://guide.wagtail.org/en/
Input URLs: 
  https://guide.wagtail.org/en/
Unread URLs: none</pre>
</details>
<details><summary>Review/AggregateRating schema [structured-data/review-schema]</summary>

<pre>declared — NA — Not assessed — not scored
No review or testimonial content detected to evaluate.
Finding: No review components, star-rating widgets or review markup found.
Selected URLs: 
  https://guide.wagtail.org/en/
Input URLs: 
  https://guide.wagtail.org/en/
Unread URLs: none</pre>
</details>
<details><summary>og:image:alt present [answer-readiness/og-image-alt]</summary>

<pre>all — FAIL — Advisory — not scored
og:image is set but og:image:alt is missing.
Finding: Not found
Selected URLs: 
  https://guide.wagtail.org/en/
Input URLs: 
  https://guide.wagtail.org/en/
Unread URLs: none
Suggested fix: AI agents cannot process images directly and rely on og:image:alt text to understand your page&#039;s visual content. Without alt text, the OG image is invisible to text-based AI systems that generate answers and summaries about your page.</pre>
</details>
<details><summary>FAQ sections present [answer-readiness/faq-sections]</summary>

<pre>all — FAIL — Advisory — not scored
No FAQ sections found (headings, FAQPage JSON-LD, or accordions).
Finding: Not found
Selected URLs: 
  https://guide.wagtail.org/en/
Input URLs: 
  https://guide.wagtail.org/en/
Unread URLs: none
Suggested fix: FAQ sections with clear question headings are the highest-priority extraction target for AI-generated answers. Structure each Q&amp;A with a question heading followed by a direct answer paragraph.</pre>
</details>
<details><summary>Question-formatted headings [answer-readiness/question-headings]</summary>

<pre>all — FAIL — Advisory — not scored
No question-formatted H2/H3 headings found across 1 page(s).
Finding: Not found
Selected URLs: 
  https://guide.wagtail.org/en/
Input URLs: 
  https://guide.wagtail.org/en/
Unread URLs: none
Suggested fix: Question-formatted headings (&quot;What is X?&quot;, &quot;How does Y work?&quot;) are the primary signal for identifying which section answers a query. Each question heading should be followed immediately by a direct answer paragraph.</pre>
</details>
<details><summary>Specific numbers and data points [answer-readiness/specific-numbers]</summary>

<pre>all — FAIL — Primary result
No specific numbers, percentages, or dollar amounts found in content.
Finding: Not found
Selected URLs: 
  https://guide.wagtail.org/en/
Input URLs: 
  https://guide.wagtail.org/en/
Unread URLs: none
Suggested fix: AI answer engines strongly prefer content with concrete data points over vague claims. Pages with specific numbers, percentages, and metrics are ranked higher for data-driven queries because agents can cite exact figures in generated answers rather than paraphrasing vague language.</pre>
</details>
<details><summary>About page with credentials [answer-readiness/about-credentials]</summary>

<pre>all — WARN — Advisory — not scored
About page exists but lacks credential keywords (team, experience, expertise).
Finding: No credential keywords found
Selected URLs: 
  https://guide.wagtail.org/en/
Input URLs: 
  https://guide.wagtail.org/en/
Unread URLs: none
Suggested fix: AI engines scan about pages for credential keywords to build authority profiles but found none on yours. Add credential-rich content: team backgrounds with named experts, years of industry experience, expertise areas, and professional certifications. These signals directly influence AI trust scoring.</pre>
</details>
<details><summary>Trust and evidence signals on homepage [answer-readiness/trust-signals]</summary>

<pre>declared — WARN — Primary result
Homepage carries only 1 of the 2 GEO-measured trust factor(s).
Finding: evidence-backed claims (3 outbound citation host(s): wagtail.org, github.com, creativecommons.org)
Selected URLs: 
  https://guide.wagtail.org/en/
Input URLs: 
  https://guide.wagtail.org/en/
Unread URLs: none
Suggested fix: Missing: quantified social proof (a rating, review count or customer count). These are the factors a 252,000-trial study measured as moving AI citation, and a pass needs every one still in scope here. Promotional adjectives are not among them.</pre>
</details>
<details><summary>Review/testimonial signals [answer-readiness/review-signals]</summary>

<pre>declared — FAIL — Primary result
No review or testimonial signals found.
Finding: Not found
Selected URLs: 
  https://guide.wagtail.org/en/
Input URLs: 
  https://guide.wagtail.org/en/
Unread URLs: none
Suggested fix: AI generative engines use reviews and testimonials as social proof when recommending your product or service. Attributed quotations and Review/AggregateRating schema make social proof machine-readable, giving agents concrete evidence to cite when users ask &quot;is X any good?&quot;.</pre>
</details>
<details><summary>Facts on this page do not survive the extractors that read it [answer-readiness/extractor-survival-recall]</summary>

<pre>all — FAIL — Primary result
7 of 8 key spans do not survive the extractors an agent uses.
Finding: 13% of facts survive
Selected URLs: 
  https://guide.wagtail.org/en/
Input URLs: 
  https://guide.wagtail.org/en/
Unread URLs: none
Suggested fix: Move the facts into the main content container, or repeat them in the prose.</pre>
</details>
<details><summary>OpenAPI request/response schemas [agent-interfaces/openapi-schemas]</summary>

<pre>all — WARN — Primary result
Partial schema coverage: 59/67 response schemas, 24/34 request schemas.
Finding: 59/67 response, 24/34 request
Selected URLs: 
  https://guide.wagtail.org/en/
Input URLs: 
  https://guide.wagtail.org/en/
Unread URLs: none
Suggested fix: Without request/response schemas, AI agents must guess the data format for your endpoints. This leads to malformed requests and failed API calls. Define JSON schemas for all request bodies and responses.</pre>
</details>
<details><summary>AI Catalog complete metadata [agent-interfaces/ai-catalog-metadata]</summary>

<pre>all — WARN — Primary result
1 of 3 catalog entries are too thin for a consumer to match on: urn:air:guide.wagtail.org:mcp:wagtail-guide.
Finding: 2/3 entries carry description + tags/capabilities/representativeQueries; 1/3 entries with updatedAt, trustManifest
Selected URLs: 
  https://guide.wagtail.org/en/
Input URLs: 
  https://guide.wagtail.org/en/
Unread URLs: none
Suggested fix: Consumers rank AI catalog entries on their metadata: Hugging Face&#039;s hf-discover builds its match text from each entry&#039;s description, tags, capabilities and representativeQueries. An entry with only an identifier and a type is legal ARD but is nearly unmatchable, so agents searching for what you offer will not surface it.</pre>
</details>
<details><summary>OpenAPI descriptions too thin for tool-calling [agent-interfaces/openapi-description-quality]</summary>

<pre>all — FAIL — Primary result
Only 2/208 operation/parameter description(s) are verbose enough: GET /api/v3-preview/pages/ (operation); GET /api/v3-preview/pages/ param &#039;type&#039;; GET /api/v3-preview/pages/ param &#039;ancestor_of&#039;; GET /api/v3-preview/pages/ param &#039;child_of&#039;; GET /api/v3-preview/pages/ param &#039;descendant_of&#039;; GET /api/v3-preview/pages/ param &#039;translation_of&#039;; GET /api/v3-preview/pages/ param &#039;locale&#039;; GET /api/v3-preview/pages/ param &#039;site&#039;; GET /api/v3-preview/pages/ param &#039;order&#039;; GET /api/v3-preview/pages/ param &#039;search&#039;; ... and 196 more
Finding: 2/208 described (1%)
Selected URLs: 
  https://guide.wagtail.org/en/
Input URLs: 
  https://guide.wagtail.org/en/
Unread URLs: none
Suggested fix: When an AI agent converts your OpenAPI spec into callable tools, the description fields become the prompt the LLM uses to decide when and how to call each function. A one-word description like &quot;search&quot; tells the model nothing about what the endpoint does, what the parameter means, or what values are valid — so the agent guesses, calls the wrong tool, or fills parameters with hallucinated values. Every operation and every parameter needs a verbose description (more than 15 characters) that explains purpose, expected input, and behavior.</pre>
</details>
<details><summary>CORS on declared API routes [agent-interfaces/cors-api-routes]</summary>

<pre>all — WARN — Advisory — not scored
No endpoint declared by the OpenAPI document answers with an Access-Control-Allow-Origin header, so agent code running inside a browser origin cannot call this API. Server-side crawlers and MCP clients are unaffected.
Finding: 2 of 2 endpoint(s) answered, none with Access-Control-Allow-Origin
Selected URLs: 
  https://guide.wagtail.org/en/
Input URLs: 
  https://guide.wagtail.org/en/
Unread URLs: none
Suggested fix: CORS matters for one class of AI consumer: agent code running inside a browser origin, such as an MCP App or an OpenAI Apps SDK widget in an isolated iframe under a strict CSP. Server-side crawlers and MCP clients are not browsers and are unaffected. This audit reads the endpoints out of your published OpenAPI document and probes those, and applies only to sites that publish one.</pre>
</details>
<details><summary>Modern-Era Reachability Probe (server/discover) [agent-interfaces/mcp-modern-era-reachability]</summary>

<pre>all — FAIL — Primary result
https://guide.wagtail.org/mcp answered neither a modern server/discover (HTTP 400: JSON-RPC error -32020: mcp-method header does not match the request body&#039;s method) nor a legacy `initialize` handshake, so no MCP client of any era can use it.
Finding: https://guide.wagtail.org/mcp (declared in ai-catalog); era=unusable
Selected URLs: 
  https://guide.wagtail.org/en/
Input URLs: 
  https://guide.wagtail.org/en/
Unread URLs: none
Suggested fix: Implement `server/discover` and answer it without authentication, returning `supportedVersions` that include 2026-07-28, your real `capabilities`, an `instructions` string and `serverInfo`. Read the protocol revision from the `MCP-Protocol-Version` header and from `params._meta`, and reject an unsupported one with JSON-RPC error -32022 carrying `data.supported`, rather than with a bare 400 or a demand for `initialize`. Retire the 2024-11-05 HTTP+SSE transport: a GET that opens a stream with an `endpoint` event has been deprecated since 2025-03-26. On a Streamable HTTP endpoint, GET and DELETE answer 405 and no `Mcp-Session-Id` is minted.</pre>
</details>
<details><summary>Version Downgrade Recoverability [agent-interfaces/mcp-version-downgrade]</summary>

<pre>all — FAIL — Primary result
The downgrade path is broken: it rejected `1900-01-01` with HTTP 400 and JSON-RPC -32020 rather than -32022, which leaves the client nothing to downgrade to.
Finding: https://guide.wagtail.org/mcp; probe A HTTP 400 / -32020; probe B HTTP 400; probe C HTTP 200; supported not advertised in the rejection
Selected URLs: 
  https://guide.wagtail.org/en/
Input URLs: 
  https://guide.wagtail.org/en/
Unread URLs: none
Suggested fix: Reject an unsupported protocol version with HTTP 400 and JSON-RPC error -32022, and put `data.supported` — every revision you accept, as `YYYY-MM-DD` strings — and `data.requested` in the error, so the client can pick a common revision and retry instead of failing permanently. Keep that list identical to the `supportedVersions` your `server/discover` result advertises. Validate the `MCP-Protocol-Version` header against `params._meta` on every request and reject a disagreement with -32020, rather than silently trusting one of them. When the header is absent, treat the request as 2025-03-26 as the spec says, or reject it — do not answer it as if it were the current revision.</pre>
</details>
<details><summary>This site’s MCP server is missing from the registry, or listed under a namespace it does not own [agent-interfaces/mcp-registry-listing-ownership]</summary>

<pre>all — FAIL — Primary result
No registry listing names a server on wagtail.org, so a client resolving &quot;the MCP server for wagtail.org&quot; finds nothing
Finding: 0 first-party listing(s)
Selected URLs: 
  https://guide.wagtail.org/en/
Input URLs: 
  https://guide.wagtail.org/en/
Unread URLs: none
Suggested fix: Register the server under your own reverse-DNS namespace, proving domain control by DNS TXT record or /.well-known/mcp-registry-auth.</pre>
</details>
<details><summary>ACP link-surface completeness [agentic-commerce/acp-policy-link-surface]</summary>

<pre>all — FAIL — Primary result
A hard-gate policy link is unusable, so is_eligible_checkout cannot be set and the catalogue is excluded from Instant Checkout: terms_of_use has no link anywhere on the scanned pages.
Finding: 3/8 ACP link types resolve; privacy_policy=https://guide.wagtail.org/en/about/privacy-policy/ about_us=https://guide.wagtail.org/en/about/ support=https://guide.wagtail.org/en/getting-started/
Selected URLs: 
  https://guide.wagtail.org/en/
Input URLs: 
  https://guide.wagtail.org/en/
Unread URLs: none
Suggested fix: Verifies the merchant can populate the `links` array that every ACP CheckoutSession response is required to carry, by resolving each of the 8 enum link types to a stable, HTTPS, no-JS-required, non-soft-404 URL, on any domain, as an HTML page or a PDF.</pre>
</details>
<details><summary>Contact/lead form endpoint [operability-safety/contact-form]</summary>

<pre>all — FAIL — Advisory — not scored
No contact/lead form or POST contact endpoint found.
Finding: No contact form detected
Selected URLs: 
  https://guide.wagtail.org/en/
Input URLs: 
  https://guide.wagtail.org/en/
Unread URLs: none
Suggested fix: AI agents increasingly handle tasks like &quot;contact this company for a quote&quot; on behalf of users. Without a machine-submittable contact form, agents cannot complete these requests, sending users to competitors who have one. Provide an HTML form or an API endpoint.</pre>
</details>
<details><summary>Duplicate landmarks without distinguishing labels [operability-safety/landmark-unique]</summary>

<pre>all — FAIL — Primary result
Duplicate landmarks without distinguishing labels — accessibility violations found.
Finding: Failing element(s): nav.skip-link
Selected URLs: 
  https://guide.wagtail.org/en/
Input URLs: 
  https://guide.wagtail.org/en/
Unread URLs: none
Suggested fix: AI browser agents traverse the accessibility tree and use a landmark’s role plus accessible name to target the right region. Two landmarks of the same role (e.g. a primary &lt;nav&gt; and a footer &lt;nav&gt;) without unique labels are indistinguishable, causing agents to act on the wrong region. A single unlabeled landmark is unambiguous and is not flagged.</pre>
</details>
<details><summary>Ghost-clickable elements: click targets an agent cannot address [operability-safety/ghost-clickable-element-ratio]</summary>

<pre>all — WARN — Primary result
4 of 94 click target(s) never reach an agent&#039;s snapshot. The page stays above the 0.90 floor, but each ghost is a control no agent can click. First: &lt;span.theme-toggle__label&gt; (no role).
Finding: ratio 0.96 — 4 ghost of 94 click target(s) (no role)
Selected URLs: 
  https://guide.wagtail.org/en/
Input URLs: 
  https://guide.wagtail.org/en/
Unread URLs: none
Suggested fix: Measures the share of on-page click targets that a DOM/accessibility-tree agent cannot address at all: elements that look and behave clickable to a human or a vision model but expose no native or ARIA role and no accessible name, so they never appear in a Playwright-MCP style snapshot. Reported as semantic / (semantic + ghost) over the served markup and its same-origin stylesheets, with the reason each ghost is unaddressable.</pre>
</details>
</details>


*Generated by [Agent Lighthouse](https://forkpoint.github.io/agent-lighthouse/) · Open-source website checks for AI readiness. [Apache-2.0](https://github.com/ForkPoint/agent-lighthouse)*


</details>

<details>
<summary>Full Agentic Web Check report — guide.wagtail.org (88/100 including baseline tasks)</summary>

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

</details>
