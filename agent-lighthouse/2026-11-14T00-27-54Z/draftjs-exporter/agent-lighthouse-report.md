[![Agent Lighthouse](https://forkpoint.github.io/agent-lighthouse/brand/kit/icons/icon-64.png "Agent Lighthouse logo")](https://forkpoint.github.io/agent-lighthouse/)

### Agent Lighthouse — AI readiness report

**Target:** `https://wagtail.github.io/draftjs_exporter/`  
**Overall Score:** **`79/100`** *(partially-ready)*  
**Pages Audited:** `1` | **Duration:** `10.0s`

**Scan Conditions:**  
- **Page Type:** `homepage` (declared)
- **Origin Evidence:** `fresh` (version: `v2`, read at: `2026-11-14T00:30:19.622Z`)
- **Evidence Coverage:** `68 / 132.2` mass (51%) — page: `88.4`, origin: `43.8`, gated: `0`
- **Unscored Checks:** `139` (58 advisory, 0 gated)
- **Budget:** `10 s` of 180 s


| Category | Score | Breakdown |
| :--- | :---: | :--- |
| **Access & Crawl Control** | **96 / 100** | 🟢 8✓ 1! 0✗ |
| **Machine Discovery** | **90 / 100** | 🟢 8✓ 2! 0✗ |
| **Agent Interfaces** | _Not assessed_ | ⚪ 0✓ 0! 1✗ (1 not scored) |
| **Agentic Commerce** | **50 / 100** | 🟡 1✓ 0! 1✗ |
| **Content Extraction** | **82 / 100** | 🔵 15✓ 3! 2✗ (1 not scored) |
| **Structured Data** | **0 / 100** | 🔴 0✓ 0! 3✗ |
| **Answer Readiness** | **79 / 100** | 🔵 12✓ 2! 5✗ (7 not scored) |
| **Agent Operability & Safety** | **79 / 100** | 🔵 22✓ 1! 6✗ (2 not scored) |

> 11 advisory checks ran. They are reported but never scored.

#### Optional guidance (not scored)

**Content Signals choices and optional setup**

No Content Signals preferences declared. Setup is optional.

**declarations**

<pre>search: Not declared — indexing, links and short excerpts; excludes AI-generated search summaries</pre>
<pre>ai-input: Not declared — model input for answers, including retrieval and grounding</pre>
<pre>ai-train: Not declared — training or fine-tuning; declining this does not decline search or AI input</pre>

**decision Notes**

<pre>Policy comments alone are not declarations. There is no score penalty for omission.</pre>
<pre>Edit the system that serves robots.txt; this scan cannot identify its CMS or owner.</pre>

**verification**

<pre>Publish the change in the system that serves robots.txt, reload the public robots.txt, and rescan. A scan checks served syntax, bot/path scope and observed conflicts. It cannot prove external bots obeyed the policy or that a firewall enforces it. Compliance is voluntary.</pre>

Optional examples, not defaults: to permit search and AI answers but decline training, use Content-Signal: search=yes, ai-input=yes, ai-train=no. To permit search only, use Content-Signal: search=yes, ai-input=no, ai-train=no. Choose each purpose independently; yes and no are both valid. Keep the intended bot group and path. Preserve all access rules. Publish the change in the system that serves robots.txt, reload the public robots.txt, and rescan. A scan checks served syntax, bot/path scope and observed conflicts. It cannot prove external bots obeyed the policy or that a firewall enforces it. Compliance is voluntary.

<details><summary>Page scope and coverage</summary>

<pre>Page scope
Detected page types express uncertainty. Type-specific findings on detected pages are advisory.
https://wagtail.github.io/draftjs_exporter/: homepage (declared, strong)
  Signals: declared:homepage
Fetch: https://wagtail.github.io/draftjs_exporter/ — read, HTTP 200; homepage (declared)</pre>

Input URLs are pages supplied to the audit. Results cover this sample. Origin evidence may also support a result. Each audit counts toward the score at most once.

<details><summary>No blanket AI block [access-crawl-control/no-blanket-block]</summary>

<pre>all — WARN — Primary result
No robots.txt found — cannot verify crawler permissions.
Finding: No robots.txt found
Selected URLs: 
  https://wagtail.github.io/draftjs_exporter/
Input URLs: 
  https://wagtail.github.io/draftjs_exporter/
Unread URLs: none
Suggested fix: Without a robots.txt file, there is no way to verify whether crawler permissions are correctly configured. Create a robots.txt file with explicit rules for AI crawlers.</pre>
</details>
<details><summary>The markdown alternate this site serves is not usable [content-extraction/markdown-alternate]</summary>

<pre>all — FAIL — Primary result
The alternate has drifted from the page: 88% of its prose and 0% of its headings survive.
Finding: Found via declared link. Missing headings: Draft.js exporter¶ | Features¶ | When to use the exporter¶ | Where to go next¶ | Contributing¶ | Credits¶. 1022 tokens against 9169 for the HTML — 89% fewer tokens.
Selected URLs: 
  https://wagtail.github.io/draftjs_exporter/
Input URLs: 
  https://wagtail.github.io/draftjs_exporter/
Unread URLs: none
Suggested fix: Generate the alternate from the same source as the HTML so the two cannot drift.</pre>
</details>
<details><summary>&lt;aside&gt; for supplementary content [content-extraction/aside-element]</summary>

<pre>all — WARN — Primary result
2 supplementary block(s) are not marked as complementary: &lt;div md-sidebar&gt;.
Finding: 1 marked, 2 unmarked — &lt;div md-sidebar&gt;
Selected URLs: 
  https://wagtail.github.io/draftjs_exporter/
Input URLs: 
  https://wagtail.github.io/draftjs_exporter/
Unread URLs: none
Suggested fix: Some sidebar/promo blocks are wrapped in &lt;aside&gt; and some are not. The unwrapped ones rely on extractor heuristics and may enter the main text. Wrap them in &lt;aside&gt; too — but keep citable facts out, because that subtree is discarded.</pre>
</details>
<details><summary>&lt;figure&gt; + &lt;figcaption&gt; usage [content-extraction/figure-figcaption]</summary>

<pre>all — WARN — Advisory — not scored
No &lt;figure&gt; elements found, but 2 image(s) exist that could benefit from &lt;figure&gt;/&lt;figcaption&gt;.
Finding: No &lt;figure&gt; elements
Selected URLs: 
  https://wagtail.github.io/draftjs_exporter/
Input URLs: 
  https://wagtail.github.io/draftjs_exporter/
Unread URLs: none
Suggested fix: AI agents use &lt;figcaption&gt; to understand the context and purpose of images beyond what alt text provides. Wrapping images in &lt;figure&gt; with &lt;figcaption&gt; gives agents a richer description that can be cited in AI-generated explanations.</pre>
</details>
<details><summary>Lean token-to-content ratio [content-extraction/token-ratio]</summary>

<pre>all — WARN — Primary result
Homepage is only 5.9% content by token weight — agents spend most of their context on markup noise.
Finding: 5.9% content (538 of 9169 o200k tokens, extracted by readability)
Selected URLs: 
  https://wagtail.github.io/draftjs_exporter/
Input URLs: 
  https://wagtail.github.io/draftjs_exporter/
Unread URLs: none
Suggested fix: AI agents pay for every token of raw HTML they download, but only the visible text carries meaning. A content share under 15% means most of the context window is consumed by scripts, styles, and wrapper markup instead of your actual content. Move inline assets to external files, remove unused boilerplate, and flatten markup.</pre>
</details>
<details><summary>Ghost content: CSS-hidden text ingested as visible [content-extraction/css-hidden-ghost-content]</summary>

<pre>all — FAIL — Primary result
169 est. tokens (15.7% of page text) are hidden only by stylesheet rules, which no non-rendering extractor evaluates. Largest: &quot;.md-search__inner,.md-search__scrollwrap,.md-sidebar__scrollwrap&quot; (visibility:hidden).
Finding: 169 est. tokens hidden by CSS class across 4 block(s), 15.7% of page text
Selected URLs: 
  https://wagtail.github.io/draftjs_exporter/
Input URLs: 
  https://wagtail.github.io/draftjs_exporter/
Unread URLs: none
Suggested fix: Find text that is hidden from human readers by an external stylesheet class but is invisible-as-hidden to every extractor an agent uses, and size it in tokens. Fail if class-hidden text exceeds 15% of the page&#039;s total text tokens or 1,000 tokens absolute; separately fail on near-duplicate hidden blocks (a mobile nav or tab-panel set duplicating visible content). Report contradiction risk when hidden text contains prices, availability, or dated claims.</pre>
</details>
<details><summary>Sitemap lastmod values contradict the pages they describe [machine-discovery/sitemap-lastmod-verifiability]</summary>

<pre>all — WARN — Primary result
6 of 6 read sample URLs (100%) publish no modification time at all, so their lastmod cannot be verified — add dateModified to the page&#039;s JSON-LD.
Finding: 6 sampled URL(s) of 24 with lastmod; 0 corroborated, 0 divergent, 6 unverifiable, 0 not read; 0 malformed; 0 future-dated
Selected URLs: 
  https://wagtail.github.io/draftjs_exporter/
Input URLs: 
  https://wagtail.github.io/draftjs_exporter/
Unread URLs: none
Suggested fix: Stamp lastmod from the content record, not from the build. Emit the timestamp of the last substantive edit to that document, and leave it alone when a deploy only rebuilds the page. Publish the same instant on the page — JSON-LD dateModified is the most widely read of the three signals — so the value is checkable; a lastmod nothing on the page supports is a lastmod the crawler drops. Never emit a future date, and use W3C Datetime (YYYY-MM-DD or a full RFC 3339 timestamp) for every value.</pre>
</details>
<details><summary>This origin answers 200 for root .txt paths that do not exist [machine-discovery/root-text-file-resolution-integrity]</summary>

<pre>all — WARN — Primary result
The random .txt probes resolved correctly, but /robots.txt answered HTTP 404, so the positive control did not run.
Finding: Probes unreliable
Selected URLs: 
  https://wagtail.github.io/draftjs_exporter/
Input URLs: 
  https://wagtail.github.io/draftjs_exporter/
Unread URLs: none
Suggested fix: Serve a robots.txt as text/plain so the discovery namespace has a positive control.</pre>
</details>
<details><summary>JSON-LD present [structured-data/json-ld-present]</summary>

<pre>all — FAIL — Primary result
No JSON-LD structured data found on any page.
Finding: None
Selected URLs: 
  https://wagtail.github.io/draftjs_exporter/
Input URLs: 
  https://wagtail.github.io/draftjs_exporter/
Unread URLs: none
Suggested fix: AI agents rely on JSON-LD structured data to understand what your site offers, who runs it, and how to interact with it. Without any JSON-LD, agents like ChatGPT and Perplexity treat your site as unstructured text with no machine-readable identity. Add Organization and WebSite schemas to your homepage &lt;head&gt; as a starting point.</pre>
</details>
<details><summary>Schema validation [structured-data/schema-validation]</summary>

<pre>all — FAIL — Primary result
No JSON-LD blocks to validate.
Finding: No JSON-LD blocks found.
Selected URLs: 
  https://wagtail.github.io/draftjs_exporter/
Input URLs: 
  https://wagtail.github.io/draftjs_exporter/
Unread URLs: none
Suggested fix: AI agents parse @context and @type to determine the schema vocabulary and entity type. Without these properties, the JSON-LD block is meaningless to any machine reader. Ensure every JSON-LD block includes &quot;@context&quot;: &quot;https://schema.org&quot; and a valid @type.</pre>
</details>
<details><summary>Organization schema [structured-data/organization-schema]</summary>

<pre>declared — FAIL — Primary result
No Organization schema found.
Finding: None
Selected URLs: 
  https://wagtail.github.io/draftjs_exporter/
Input URLs: 
  https://wagtail.github.io/draftjs_exporter/
Unread URLs: none
Suggested fix: AI agents use Organization schema to identify your brand, logo, and contact info. Without it, agents cannot confidently attribute content to your organization or display your branding in AI-generated answers. Add this JSON-LD to your homepage &lt;head&gt;.</pre>
</details>
<details><summary>LocalBusiness/ProfessionalService schema [structured-data/local-business-schema]</summary>

<pre>declared — NA — Not assessed — not scored
No physical store signals detected (no PostalAddress block paired with a store-locator link).
Finding: No physical location indicators found.
Selected URLs: 
  https://wagtail.github.io/draftjs_exporter/
Input URLs: 
  https://wagtail.github.io/draftjs_exporter/
Unread URLs: none</pre>
</details>
<details><summary>Review/AggregateRating schema [structured-data/review-schema]</summary>

<pre>declared — NA — Not assessed — not scored
No review or testimonial content detected to evaluate.
Finding: No review components, star-rating widgets or review markup found.
Selected URLs: 
  https://wagtail.github.io/draftjs_exporter/
Input URLs: 
  https://wagtail.github.io/draftjs_exporter/
Unread URLs: none</pre>
</details>
<details><summary>FAQ sections present [answer-readiness/faq-sections]</summary>

<pre>all — FAIL — Advisory — not scored
No FAQ sections found (headings, FAQPage JSON-LD, or accordions).
Finding: Not found
Selected URLs: 
  https://wagtail.github.io/draftjs_exporter/
Input URLs: 
  https://wagtail.github.io/draftjs_exporter/
Unread URLs: none
Suggested fix: FAQ sections with clear question headings are the highest-priority extraction target for AI-generated answers. Structure each Q&amp;A with a question heading followed by a direct answer paragraph.</pre>
</details>
<details><summary>Question-formatted headings [answer-readiness/question-headings]</summary>

<pre>all — FAIL — Advisory — not scored
No question-formatted H2/H3 headings found across 1 page(s).
Finding: Not found
Selected URLs: 
  https://wagtail.github.io/draftjs_exporter/
Input URLs: 
  https://wagtail.github.io/draftjs_exporter/
Unread URLs: none
Suggested fix: Question-formatted headings (&quot;What is X?&quot;, &quot;How does Y work?&quot;) are the primary signal for identifying which section answers a query. Each question heading should be followed immediately by a direct answer paragraph.</pre>
</details>
<details><summary>Specific numbers and data points [answer-readiness/specific-numbers]</summary>

<pre>all — FAIL — Primary result
No specific numbers, percentages, or dollar amounts found in content.
Finding: Not found
Selected URLs: 
  https://wagtail.github.io/draftjs_exporter/
Input URLs: 
  https://wagtail.github.io/draftjs_exporter/
Unread URLs: none
Suggested fix: AI answer engines strongly prefer content with concrete data points over vague claims. Pages with specific numbers, percentages, and metrics are ranked higher for data-driven queries because agents can cite exact figures in generated answers rather than paraphrasing vague language.</pre>
</details>
<details><summary>About page with credentials [answer-readiness/about-credentials]</summary>

<pre>all — FAIL — Advisory — not scored
No about page found at /about/, /about-us/, /about, /pages/about, /pages/about-us, /pages/our-story, /our-story.
Finding: About page not found
Selected URLs: 
  https://wagtail.github.io/draftjs_exporter/
Input URLs: 
  https://wagtail.github.io/draftjs_exporter/
Unread URLs: none
Suggested fix: AI engines crawl your about page to build an organizational authority profile. Without an about page containing team credentials, expertise, and experience details, agents cannot assess your organization&#039;s authority, reducing your content&#039;s trust score in AI-generated recommendations.</pre>
</details>
<details><summary>Trust and evidence signals on homepage [answer-readiness/trust-signals]</summary>

<pre>declared — WARN — Primary result
Homepage carries only 1 of the 2 GEO-measured trust factor(s).
Finding: evidence-backed claims (10 outbound citation host(s): github.com, pypi.org, semver.org)
Selected URLs: 
  https://wagtail.github.io/draftjs_exporter/
Input URLs: 
  https://wagtail.github.io/draftjs_exporter/
Unread URLs: none
Suggested fix: Missing: quantified social proof (a rating, review count or customer count). These are the factors a 252,000-trial study measured as moving AI citation, and a pass needs every one still in scope here. Promotional adjectives are not among them.</pre>
</details>
<details><summary>Review/testimonial signals [answer-readiness/review-signals]</summary>

<pre>declared — FAIL — Primary result
No review or testimonial signals found. Attribution is what separates a testimonial from decoration.
Finding: 1 unattributed pull-quote(s), no attribution
Selected URLs: 
  https://wagtail.github.io/draftjs_exporter/
Input URLs: 
  https://wagtail.github.io/draftjs_exporter/
Unread URLs: none
Suggested fix: AI generative engines use reviews and testimonials as social proof when recommending your product or service. Attributed quotations and Review/AggregateRating schema make social proof machine-readable, giving agents concrete evidence to cite when users ask &quot;is X any good?&quot;.</pre>
</details>
<details><summary>Sections stop making sense once retrieved on their own [answer-readiness/chunk-boundary-referent-integrity]</summary>

<pre>all — WARN — Primary result
1 of 5 sections lose their referent when retrieved alone.
Finding: 80% self-contained
Selected URLs: 
  https://wagtail.github.io/draftjs_exporter/
Input URLs: 
  https://wagtail.github.io/draftjs_exporter/
Unread URLs: none
Suggested fix: Name the subject in the sections flagged below.</pre>
</details>
<details><summary>AI Catalog exists [agent-interfaces/ai-catalog-exists]</summary>

<pre>all — FAIL — Advisory — not scored
Neither /.well-known/ard.json nor /.well-known/ai-catalog.json is served (/.well-known/ard.json: HTTP 404; /.well-known/ai-catalog.json: HTTP 404).
Finding: /.well-known/ard.json: HTTP 404; /.well-known/ai-catalog.json: HTTP 404
Selected URLs: 
  https://wagtail.github.io/draftjs_exporter/
Input URLs: 
  https://wagtail.github.io/draftjs_exporter/
Unread URLs: none
Suggested fix: The AI catalog is the ARD discovery manifest that tells AI agents which MCP servers, agent cards, skills and API descriptions your site offers. Hugging Face&#039;s hf-discover resolves it at /.well-known/ai-catalog.json and reads its entries; without it, agents must probe endpoints to work out what your site can do.</pre>
</details>
<details><summary>ACP link-surface completeness [agentic-commerce/acp-policy-link-surface]</summary>

<pre>all — FAIL — Primary result
A hard-gate policy link is unusable, so is_eligible_checkout cannot be set and the catalogue is excluded from Instant Checkout: terms_of_use has no link anywhere on the scanned pages; privacy_policy has no link anywhere on the scanned pages.
Finding: 1/8 ACP link types resolve; support=https://wagtail.github.io/draftjs_exporter/markdown/
Selected URLs: 
  https://wagtail.github.io/draftjs_exporter/
Input URLs: 
  https://wagtail.github.io/draftjs_exporter/
Unread URLs: none
Suggested fix: Verifies the merchant can populate the `links` array that every ACP CheckoutSession response is required to carry, by resolving each of the 8 enum link types to a stable, HTTPS, no-JS-required, non-soft-404 URL, on any domain, as an HTML page or a PDF.</pre>
</details>
<details><summary>Forms work without JavaScript [operability-safety/forms-no-js]</summary>

<pre>all — FAIL — Advisory — not scored
None of the 1 form(s) have an action attribute — they require JavaScript to submit.
Finding: 0/1 forms with action
Selected URLs: 
  https://wagtail.github.io/draftjs_exporter/
Input URLs: 
  https://wagtail.github.io/draftjs_exporter/
Unread URLs: none
Suggested fix: Many AI agents do not execute JavaScript, so forms that rely on JS for submission are invisible to them. Adding standard HTML action and method attributes ensures forms work via simple HTTP requests, making them accessible to all AI agents.</pre>
</details>
<details><summary>Duplicate landmarks without distinguishing labels [operability-safety/landmark-unique]</summary>

<pre>all — FAIL — Primary result
Duplicate landmarks without distinguishing labels — accessibility violations found.
Finding: Failing element(s): nav.md-nav.md-nav--secondary
Selected URLs: 
  https://wagtail.github.io/draftjs_exporter/
Input URLs: 
  https://wagtail.github.io/draftjs_exporter/
Unread URLs: none
Suggested fix: AI browser agents traverse the accessibility tree and use a landmark’s role plus accessible name to target the right region. Two landmarks of the same role (e.g. a primary &lt;nav&gt; and a footer &lt;nav&gt;) without unique labels are indistinguishable, causing agents to act on the wrong region. A single unlabeled landmark is unambiguous and is not flagged.</pre>
</details>
<details><summary>Form inputs lack associated labels [operability-safety/label]</summary>

<pre>all — FAIL — Primary result
Form inputs lack associated labels — accessibility violations found.
Finding: Failing element(s): input#__search
Selected URLs: 
  https://wagtail.github.io/draftjs_exporter/
Input URLs: 
  https://wagtail.github.io/draftjs_exporter/
Unread URLs: none
Suggested fix: AI agents filling forms identify fields by their accessible name (label, aria-label, or aria-labelledby). Unlabeled inputs are invisible to form-filling agents, so automated workflows like &quot;sign me up&quot; or &quot;submit a contact request&quot; fail.</pre>
</details>
<details><summary>Form fields wired to their validation messages [operability-safety/form-error-messages]</summary>

<pre>all — FAIL — Primary result
None of the 1 required field(s) carry a resolvable aria-errormessage or aria-describedby, so an agent has no way to read why a submission was rejected.
Finding: 0 of 1 required field(s) reference a message element
Selected URLs: 
  https://wagtail.github.io/draftjs_exporter/
Input URLs: 
  https://wagtail.github.io/draftjs_exporter/
Unread URLs: none
Suggested fix: An agent filling a form reads the accessibility tree, where a message is attached to a field by aria-errormessage or aria-describedby. Fields the server rendered as aria-invalid are checked directly; where a page carries no invalid state — the normal case on a GET, since error markup is injected after a failed submit — the required fields are checked instead, because those are the ones that can fail.</pre>
</details>
<details><summary>Dialogs without accessible names [operability-safety/dialog-name]</summary>

<pre>all — FAIL — Primary result
Dialogs without accessible names — accessibility violations found.
Finding: Failing element(s): div.md-search
Selected URLs: 
  https://wagtail.github.io/draftjs_exporter/
Input URLs: 
  https://wagtail.github.io/draftjs_exporter/
Unread URLs: none
Suggested fix: AI browser agents detect modals via role=&quot;dialog&quot;/&quot;alertdialog&quot; and need an accessible name to understand the dialog’s purpose. Unlabeled dialogs trap agents in unknown UI states, blocking confirmations, forms, or cookie-consent flows.</pre>
</details>
<details><summary>Stateful controls: current state readable by an agent [operability-safety/stateful-control-introspectability]</summary>

<pre>all — FAIL — Primary result
2 of 8 state-bearing control(s) hold their state where no snapshot can read it, so an agent cannot verify that its click did anything. Missing: aria-pressed, aria-checked, aria-selected or aria-current. First: &lt;label.md-nav__link.md-nav__link--active&gt;.
Finding: ratio 0.75 — 2 opaque of 8 state-bearing control(s) (state in class &quot;md-nav__link--active&quot; only)
Selected URLs: 
  https://wagtail.github.io/draftjs_exporter/
Input URLs: 
  https://wagtail.github.io/draftjs_exporter/
Unread URLs: none
Suggested fix: Checks that every control whose purpose is to hold a state — toggles, switches, checkboxes, radio groups, tabs, accordions, disclosure triggers, sort direction, filter chips — exposes that state through a machine-readable attribute rather than a CSS class alone. Reports the count of state-bearing controls whose current value an agent cannot read, each with the class that carries the state instead.</pre>
</details>
<details><summary>Hover-only navigation and content [operability-safety/hover-only-content-and-navigation]</summary>

<pre>all — WARN — Primary result
Navigation is reachable, but 12 piece(s) of information are drawn only on hover, so an agent never reads them. First: &quot;Go to repository&quot;.
Finding: 12 title-only string(s)
Selected URLs: 
  https://wagtail.github.io/draftjs_exporter/
Input URLs: 
  https://wagtail.github.io/draftjs_exporter/
Unread URLs: none
Suggested fix: Detects navigation subtrees and information that exist in the DOM only while a pointer hovers — `:hover`-revealed submenus with no focus or `aria-expanded` equivalent, and content carried solely in `title` attributes or hover cards. Reports each destination URL an agent never discovers.</pre>
</details>
</details>


*Generated by [Agent Lighthouse](https://forkpoint.github.io/agent-lighthouse/) · Open-source website checks for AI readiness. [Apache-2.0](https://github.com/ForkPoint/agent-lighthouse)*
