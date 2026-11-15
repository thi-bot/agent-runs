[![Agent Lighthouse](https://forkpoint.github.io/agent-lighthouse/brand/kit/icons/icon-64.png "Agent Lighthouse logo")](https://forkpoint.github.io/agent-lighthouse/)

### Agent Lighthouse — AI readiness report

**Target:** `https://docs.wagtail.org/en/stable/`  
**Overall Score:** **`81/100`** *(partially-ready)*  
**Pages Audited:** `1` | **Duration:** `25.4s`

**Scan Conditions:**  
- **Page Type:** `homepage` (declared)
- **Origin Evidence:** `fresh` (version: `v2`, read at: `2026-11-14T00:30:14.356Z`)
- **Evidence Coverage:** `79.4 / 132.2` mass (60%) — page: `88.4`, origin: `43.8`, gated: `0`
- **Unscored Checks:** `126` (58 advisory, 0 gated)
- **Budget:** `25 s` of 180 s


| Category | Score | Breakdown |
| :--- | :---: | :--- |
| **Access & Crawl Control** | **100 / 100** | 🟢 25✓ 0! 0✗ |
| **Machine Discovery** | **95 / 100** | 🟢 18✓ 1! 0✗ (7 not scored) |
| **Agent Interfaces** | _Not assessed_ | ⚪ 0✓ 0! 1✗ (1 not scored) |
| **Agentic Commerce** | **50 / 100** | 🟡 1✓ 0! 1✗ |
| **Content Extraction** | **77 / 100** | 🔵 15✓ 1! 4✗ (1 not scored) |
| **Structured Data** | **0 / 100** | 🔴 0✓ 0! 4✗ |
| **Answer Readiness** | **34 / 100** | 🔴 5✓ 3! 10✗ (7 not scored) |
| **Agent Operability & Safety** | **91 / 100** | 🟢 20✓ 2! 1✗ (1 not scored) |

> 17 advisory checks ran. They are reported but never scored.

#### No AI vendor reads this

- **llms.txt exists** — No AI vendor documents reading llms.txt or llms-full.txt from a website. In a 137,210-domain study, 97% of llms.txt files received no requests in a month, and AI tools never requested a missing one. [Evidence](https://ahrefs.com/blog/llmstxt-study/)
- **llms.txt is well-formed** — No AI vendor documents reading llms.txt or llms-full.txt from a website. In a 137,210-domain study, 97% of llms.txt files received no requests in a month, and AI tools never requested a missing one. [Evidence](https://ahrefs.com/blog/llmstxt-study/)
- **llms.txt links include descriptions** — No AI vendor documents reading llms.txt or llms-full.txt from a website. In a 137,210-domain study, 97% of llms.txt files received no requests in a month, and AI tools never requested a missing one. [Evidence](https://ahrefs.com/blog/llmstxt-study/)
- **llms.txt links are valid** — No AI vendor documents reading llms.txt or llms-full.txt from a website. In a 137,210-domain study, 97% of llms.txt files received no requests in a month, and AI tools never requested a missing one. [Evidence](https://ahrefs.com/blog/llmstxt-study/)
- **llms-full.txt present** — No AI vendor documents reading llms.txt or llms-full.txt from a website. In a 137,210-domain study, 97% of llms.txt files received no requests in a month, and AI tools never requested a missing one. [Evidence](https://ahrefs.com/blog/llmstxt-study/)
- **CORS on AI files** — No AI crawler or assistant documents reading these files from a browser. They fetch them from servers, where CORS does not apply, so CORS headers on them are not needed. [Evidence](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS)

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
https://docs.wagtail.org/en/stable/: homepage (declared, strong)
  Signals: declared:homepage
Fetch: https://docs.wagtail.org/en/stable/ — read, HTTP 200; homepage (declared)</pre>

Input URLs are pages supplied to the audit. Results cover this sample. Origin evidence may also support a result. Each audit counts toward the score at most once.

<details><summary>The markdown alternate this site serves is not usable [content-extraction/markdown-alternate]</summary>

<pre>all — FAIL — Primary result
The alternate has drifted from the page: 84% of its prose and 0% of its headings survive.
Finding: Found via declared link. Missing headings: Welcome to Wagtail’s documentation¶ | Index¶. 7682 tokens against 34840 for the HTML — 78% fewer tokens.
Selected URLs: 
  https://docs.wagtail.org/en/stable/
Input URLs: 
  https://docs.wagtail.org/en/stable/
Unread URLs: none
Suggested fix: Generate the alternate from the same source as the HTML so the two cannot drift.</pre>
</details>
<details><summary>&lt;figure&gt; + &lt;figcaption&gt; usage [content-extraction/figure-figcaption]</summary>

<pre>all — WARN — Advisory — not scored
No &lt;figure&gt; elements found, but 1 image(s) exist that could benefit from &lt;figure&gt;/&lt;figcaption&gt;.
Finding: No &lt;figure&gt; elements
Selected URLs: 
  https://docs.wagtail.org/en/stable/
Input URLs: 
  https://docs.wagtail.org/en/stable/
Unread URLs: none
Suggested fix: AI agents use &lt;figcaption&gt; to understand the context and purpose of images beyond what alt text provides. Wrapping images in &lt;figure&gt; with &lt;figcaption&gt; gives agents a richer description that can be cited in AI-generated explanations.</pre>
</details>
<details><summary>Lean token-to-content ratio [content-extraction/token-ratio]</summary>

<pre>all — FAIL — Primary result
Homepage is only 0.1% content by token weight — the page is almost entirely markup noise.
Finding: 0.1% content (48 of 34840 o200k tokens, extracted by readability)
Selected URLs: 
  https://docs.wagtail.org/en/stable/
Input URLs: 
  https://docs.wagtail.org/en/stable/
Unread URLs: none
Suggested fix: AI agents pay for every token of raw HTML they download, but only the visible text carries meaning. A content share under 5% means an agent parses more than 20 tokens of noise for every token of content, and the page may be truncated before the real content is read. Move inline assets to external files, remove unused boilerplate, and flatten markup.</pre>
</details>
<details><summary>Ghost content: CSS-hidden text ingested as visible [content-extraction/css-hidden-ghost-content]</summary>

<pre>all — FAIL — Primary result
2572 est. tokens (51.2% of page text) are hidden only by stylesheet rules, which no non-rendering extractor evaluates. Largest: &quot;.collapse:not(.show)&quot; (display:none). 1 block(s) duplicate text that is already visible, so the agent reads the same copy twice. 1 block(s) carry prices, availability or dated claims that can contradict the visible copy.
Finding: 2572 est. tokens hidden by CSS class across 6 block(s), 51.2% of page text
Selected URLs: 
  https://docs.wagtail.org/en/stable/
Input URLs: 
  https://docs.wagtail.org/en/stable/
Unread URLs: none
Suggested fix: Find text that is hidden from human readers by an external stylesheet class but is invisible-as-hidden to every extractor an agent uses, and size it in tokens. Fail if class-hidden text exceeds 15% of the page&#039;s total text tokens or 1,000 tokens absolute; separately fail on near-duplicate hidden blocks (a mobile nav or tab-panel set duplicating visible content). Report contradiction risk when hidden text contains prices, availability, or dated claims.</pre>
</details>
<details><summary>What an agent reads from this page depends on which extractor it uses [content-extraction/extraction-determinism]</summary>

<pre>all — FAIL — Primary result
Readability extracted 180 characters, under its own 500-character threshold.
Finding: readability returned 180 characters, below the 500-character threshold at which it reports a document as readerable.
Selected URLs: 
  https://docs.wagtail.org/en/stable/
Input URLs: 
  https://docs.wagtail.org/en/stable/
Unread URLs: none
Suggested fix: Put the article in one container and keep chrome out of it.</pre>
</details>
<details><summary>No broken AI endpoints [machine-discovery/no-broken-ai-endpoints]</summary>

<pre>all — WARN — Primary result
No AI endpoint URLs found in ai-catalog.json, llms.txt, or navigation.json to validate.
Finding: No URLs to validate
Selected URLs: 
  https://docs.wagtail.org/en/stable/
Input URLs: 
  https://docs.wagtail.org/en/stable/
Unread URLs: none
Suggested fix: Audit all URLs referenced in your ai-catalog.json, llms.txt, and navigation.json files. Fix or remove any that return 404, 500, or connection errors. Set up monitoring to catch broken endpoints before AI agents do.</pre>
</details>
<details><summary>JSON-LD present [structured-data/json-ld-present]</summary>

<pre>all — FAIL — Primary result
No JSON-LD structured data found on any page.
Finding: None
Selected URLs: 
  https://docs.wagtail.org/en/stable/
Input URLs: 
  https://docs.wagtail.org/en/stable/
Unread URLs: none
Suggested fix: AI agents rely on JSON-LD structured data to understand what your site offers, who runs it, and how to interact with it. Without any JSON-LD, agents like ChatGPT and Perplexity treat your site as unstructured text with no machine-readable identity. Add Organization and WebSite schemas to your homepage &lt;head&gt; as a starting point.</pre>
</details>
<details><summary>Schema validation [structured-data/schema-validation]</summary>

<pre>all — FAIL — Primary result
No JSON-LD blocks to validate.
Finding: No JSON-LD blocks found.
Selected URLs: 
  https://docs.wagtail.org/en/stable/
Input URLs: 
  https://docs.wagtail.org/en/stable/
Unread URLs: none
Suggested fix: AI agents parse @context and @type to determine the schema vocabulary and entity type. Without these properties, the JSON-LD block is meaningless to any machine reader. Ensure every JSON-LD block includes &quot;@context&quot;: &quot;https://schema.org&quot; and a valid @type.</pre>
</details>
<details><summary>Organization schema [structured-data/organization-schema]</summary>

<pre>declared — FAIL — Primary result
No Organization schema found.
Finding: None
Selected URLs: 
  https://docs.wagtail.org/en/stable/
Input URLs: 
  https://docs.wagtail.org/en/stable/
Unread URLs: none
Suggested fix: AI agents use Organization schema to identify your brand, logo, and contact info. Without it, agents cannot confidently attribute content to your organization or display your branding in AI-generated answers. Add this JSON-LD to your homepage &lt;head&gt;.</pre>
</details>
<details><summary>BreadcrumbList schema [structured-data/breadcrumb-schema]</summary>

<pre>all — FAIL — Primary result
No BreadcrumbList markup found for observed breadcrumb trails.
Finding: 0/1 breadcrumb-bearing pages have BreadcrumbList
Selected URLs: 
  https://docs.wagtail.org/en/stable/
Input URLs: 
  https://docs.wagtail.org/en/stable/
Unread URLs: none
Suggested fix: Describe an existing breadcrumb trail with BreadcrumbList markup. Include position and name for each ListItem, plus item URLs except where Google allows omission for the final item. Do not invent a hierarchy from the URL.</pre>
</details>
<details><summary>LocalBusiness/ProfessionalService schema [structured-data/local-business-schema]</summary>

<pre>declared — NA — Not assessed — not scored
No physical store signals detected (no PostalAddress block paired with a store-locator link).
Finding: No physical location indicators found.
Selected URLs: 
  https://docs.wagtail.org/en/stable/
Input URLs: 
  https://docs.wagtail.org/en/stable/
Unread URLs: none</pre>
</details>
<details><summary>Review/AggregateRating schema [structured-data/review-schema]</summary>

<pre>declared — NA — Not assessed — not scored
No review or testimonial content detected to evaluate.
Finding: No review components, star-rating widgets or review markup found.
Selected URLs: 
  https://docs.wagtail.org/en/stable/
Input URLs: 
  https://docs.wagtail.org/en/stable/
Unread URLs: none</pre>
</details>
<details><summary>Meta description quality [answer-readiness/meta-description]</summary>

<pre>all — FAIL — Primary result
Meta description is missing.
Finding: Not found
Selected URLs: 
  https://docs.wagtail.org/en/stable/
Input URLs: 
  https://docs.wagtail.org/en/stable/
Unread URLs: none
Suggested fix: With no description tag, the snippet shown beside your page is written entirely from body text by whoever indexes it. Add a concise 50-300 character summary of the page.</pre>
</details>
<details><summary>Core Open Graph tags [answer-readiness/core-open-graph]</summary>

<pre>all — FAIL — Primary result
Missing OG tags: og:title, og:description, og:image, og:url.
Finding: None found
og:site_name: not found

Twitter Card tags (informational — not scored):
  twitter:card: absent — no og:type to fall back to
  twitter:title: absent — no og:title to fall back to
  twitter:description: absent — no og:description to fall back to
  twitter:image: absent — no og:image to fall back to
Selected URLs: 
  https://docs.wagtail.org/en/stable/
Input URLs: 
  https://docs.wagtail.org/en/stable/
Unread URLs: none
Suggested fix: Link-preview crawlers read the core Open Graph tags to build the card shown when your page is shared. Missing tags (og:title, og:description, og:image, og:url) mean the crawler falls back to guessing your title, text and image.</pre>
</details>
<details><summary>og:type set and appropriate [answer-readiness/og-type]</summary>

<pre>all — FAIL — Primary result
og:type is missing.
Finding: Not found
Selected URLs: 
  https://docs.wagtail.org/en/stable/
Input URLs: 
  https://docs.wagtail.org/en/stable/
Unread URLs: none
Suggested fix: AI agents use og:type to classify page content as either a website, article, product, or other entity type. Without it, agents default to treating the page as generic content, missing opportunities for type-specific handling like article freshness scoring.</pre>
</details>
<details><summary>og:image:alt present [answer-readiness/og-image-alt]</summary>

<pre>all — WARN — Advisory — not scored
No og:image found, so og:image:alt is not applicable.
Finding: No og:image
Selected URLs: 
  https://docs.wagtail.org/en/stable/
Input URLs: 
  https://docs.wagtail.org/en/stable/
Unread URLs: none
Suggested fix: AI agents cannot process images directly and rely on og:image:alt text to understand visual content. Without an og:image and alt text, agents have no visual context to reference when generating answers about your page.</pre>
</details>
<details><summary>FAQ sections present [answer-readiness/faq-sections]</summary>

<pre>all — FAIL — Advisory — not scored
No FAQ sections found (headings, FAQPage JSON-LD, or accordions).
Finding: Not found
Selected URLs: 
  https://docs.wagtail.org/en/stable/
Input URLs: 
  https://docs.wagtail.org/en/stable/
Unread URLs: none
Suggested fix: FAQ sections with clear question headings are the highest-priority extraction target for AI-generated answers. Structure each Q&amp;A with a question heading followed by a direct answer paragraph.</pre>
</details>
<details><summary>Question-formatted headings [answer-readiness/question-headings]</summary>

<pre>all — FAIL — Advisory — not scored
No question-formatted H2/H3 headings found across 1 page(s).
Finding: Not found
Selected URLs: 
  https://docs.wagtail.org/en/stable/
Input URLs: 
  https://docs.wagtail.org/en/stable/
Unread URLs: none
Suggested fix: Question-formatted headings (&quot;What is X?&quot;, &quot;How does Y work?&quot;) are the primary signal for identifying which section answers a query. Each question heading should be followed immediately by a direct answer paragraph.</pre>
</details>
<details><summary>Specific numbers and data points [answer-readiness/specific-numbers]</summary>

<pre>all — FAIL — Primary result
No specific numbers, percentages, or dollar amounts found in content.
Finding: Not found
Selected URLs: 
  https://docs.wagtail.org/en/stable/
Input URLs: 
  https://docs.wagtail.org/en/stable/
Unread URLs: none
Suggested fix: AI answer engines strongly prefer content with concrete data points over vague claims. Pages with specific numbers, percentages, and metrics are ranked higher for data-driven queries because agents can cite exact figures in generated answers rather than paraphrasing vague language.</pre>
</details>
<details><summary>About page with credentials [answer-readiness/about-credentials]</summary>

<pre>all — FAIL — Advisory — not scored
No about page found at /about/, /about-us/, /about, /pages/about, /pages/about-us, /pages/our-story, /our-story.
Finding: About page not found
Selected URLs: 
  https://docs.wagtail.org/en/stable/
Input URLs: 
  https://docs.wagtail.org/en/stable/
Unread URLs: none
Suggested fix: AI engines crawl your about page to build an organizational authority profile. Without an about page containing team credentials, expertise, and experience details, agents cannot assess your organization&#039;s authority, reducing your content&#039;s trust score in AI-generated recommendations.</pre>
</details>
<details><summary>Brand name in body text [answer-readiness/brand-name]</summary>

<pre>all — WARN — Advisory — not scored
No organization name found in JSON-LD or og:site_name to check against body text.
Finding: No org name in schema
Selected URLs: 
  https://docs.wagtail.org/en/stable/
Input URLs: 
  https://docs.wagtail.org/en/stable/
Unread URLs: none
Suggested fix: AI agents need to identify your brand to attribute content correctly. Without an Organization schema with your brand name, agents cannot connect your pages to your entity in AI knowledge graphs. Add Organization schema and mention your brand naturally in body text.</pre>
</details>
<details><summary>Trust and evidence signals on homepage [answer-readiness/trust-signals]</summary>

<pre>declared — WARN — Primary result
Homepage carries only 1 of the 2 GEO-measured trust factor(s).
Finding: evidence-backed claims (9 outbound citation host(s): github.com, www.python.org, www.djangoproject.com)
Selected URLs: 
  https://docs.wagtail.org/en/stable/
Input URLs: 
  https://docs.wagtail.org/en/stable/
Unread URLs: none
Suggested fix: Missing: quantified social proof (a rating, review count or customer count). These are the factors a 252,000-trial study measured as moving AI citation, and a pass needs every one still in scope here. Promotional adjectives are not among them.</pre>
</details>
<details><summary>Review/testimonial signals [answer-readiness/review-signals]</summary>

<pre>declared — FAIL — Primary result
No review or testimonial signals found.
Finding: Not found
Selected URLs: 
  https://docs.wagtail.org/en/stable/
Input URLs: 
  https://docs.wagtail.org/en/stable/
Unread URLs: none
Suggested fix: AI generative engines use reviews and testimonials as social proof when recommending your product or service. Attributed quotations and Review/AggregateRating schema make social proof machine-readable, giving agents concrete evidence to cite when users ask &quot;is X any good?&quot;.</pre>
</details>
<details><summary>Facts on this page do not survive the extractors that read it [answer-readiness/extractor-survival-recall]</summary>

<pre>all — FAIL — Primary result
1 of 2 key spans do not survive the extractors an agent uses.
Finding: 50% of facts survive
Selected URLs: 
  https://docs.wagtail.org/en/stable/
Input URLs: 
  https://docs.wagtail.org/en/stable/
Unread URLs: none
Suggested fix: Move the facts into the main content container, or repeat them in the prose.</pre>
</details>
<details><summary>Sections are longer than the window that will chunk them [answer-readiness/section-split-risk-profile]</summary>

<pre>all — FAIL — Primary result
The page has no headings to cut on, so every chunk after the first arrives without one.
Finding: 0% inside the window
Selected URLs: 
  https://docs.wagtail.org/en/stable/
Input URLs: 
  https://docs.wagtail.org/en/stable/
Unread URLs: none
Suggested fix: Add an h2 or h3 roughly every 400 tokens of prose.</pre>
</details>
<details><summary>AI Catalog exists [agent-interfaces/ai-catalog-exists]</summary>

<pre>all — FAIL — Advisory — not scored
Neither /.well-known/ard.json nor /.well-known/ai-catalog.json is served (/.well-known/ard.json: HTTP 404; /.well-known/ai-catalog.json: HTTP 404).
Finding: /.well-known/ard.json: HTTP 404; /.well-known/ai-catalog.json: HTTP 404
Selected URLs: 
  https://docs.wagtail.org/en/stable/
Input URLs: 
  https://docs.wagtail.org/en/stable/
Unread URLs: none
Suggested fix: The AI catalog is the ARD discovery manifest that tells AI agents which MCP servers, agent cards, skills and API descriptions your site offers. Hugging Face&#039;s hf-discover resolves it at /.well-known/ai-catalog.json and reads its entries; without it, agents must probe endpoints to work out what your site can do.</pre>
</details>
<details><summary>ACP link-surface completeness [agentic-commerce/acp-policy-link-surface]</summary>

<pre>all — FAIL — Primary result
A hard-gate policy link is unusable, so is_eligible_checkout cannot be set and the catalogue is excluded from Instant Checkout: terms_of_use has no link anywhere on the scanned pages.
Finding: 4/8 ACP link types resolve; privacy_policy=https://docs.wagtail.org/en/stable/advanced_topics/privacy.html contact_us=https://docs.wagtail.org/en/stable/tutorial/create_contact_page.html about_us=https://docs.wagtail.org/en/stable/advanced_topics/boundblocks_and_values.html support=https://docs.wagtail.org/en/stable/advanced_topics/images/animated_gifs.html
Selected URLs: 
  https://docs.wagtail.org/en/stable/
Input URLs: 
  https://docs.wagtail.org/en/stable/
Unread URLs: none
Suggested fix: Verifies the merchant can populate the `links` array that every ACP CheckoutSession response is required to carry, by resolving each of the 8 enum link types to a stable, HTTPS, no-JS-required, non-soft-404 URL, on any domain, as an HTML page or a PDF.</pre>
</details>
<details><summary>Duplicate landmarks without distinguishing labels [operability-safety/landmark-unique]</summary>

<pre>all — FAIL — Primary result
Duplicate landmarks without distinguishing labels — accessibility violations found.
Finding: Failing element(s): header.container-fluid.bg-primary
Selected URLs: 
  https://docs.wagtail.org/en/stable/
Input URLs: 
  https://docs.wagtail.org/en/stable/
Unread URLs: none
Suggested fix: AI browser agents traverse the accessibility tree and use a landmark’s role plus accessible name to target the right region. Two landmarks of the same role (e.g. a primary &lt;nav&gt; and a footer &lt;nav&gt;) without unique labels are indistinguishable, causing agents to act on the wrong region. A single unlabeled landmark is unambiguous and is not flagged.</pre>
</details>
<details><summary>Ghost-clickable elements: click targets an agent cannot address [operability-safety/ghost-clickable-element-ratio]</summary>

<pre>all — WARN — Primary result
2 of 771 click target(s) never reach an agent&#039;s snapshot. The page stays above the 0.90 floor, but each ghost is a control no agent can click. First: &lt;div#searchbox.searchbox.mb-6.px-1&gt; (no accessible name).
Finding: ratio 1.00 — 2 ghost of 771 click target(s) (no accessible name)
Selected URLs: 
  https://docs.wagtail.org/en/stable/
Input URLs: 
  https://docs.wagtail.org/en/stable/
Unread URLs: none
Suggested fix: Measures the share of on-page click targets that a DOM/accessibility-tree agent cannot address at all: elements that look and behave clickable to a human or a vision model but expose no native or ARIA role and no accessible name, so they never appear in a Playwright-MCP style snapshot. Reported as semantic / (semantic + ghost) over the served markup and its same-origin stylesheets, with the reason each ghost is unaddressable.</pre>
</details>
<details><summary>Hover-only navigation and content [operability-safety/hover-only-content-and-navigation]</summary>

<pre>all — WARN — Primary result
Navigation is reachable, but 3 piece(s) of information are drawn only on hover, so an agent never reads them. First: &quot;Link to this heading&quot;.
Finding: 3 title-only string(s)
Selected URLs: 
  https://docs.wagtail.org/en/stable/
Input URLs: 
  https://docs.wagtail.org/en/stable/
Unread URLs: none
Suggested fix: Detects navigation subtrees and information that exist in the DOM only while a pointer hovers — `:hover`-revealed submenus with no focus or `aria-expanded` equivalent, and content carried solely in `title` attributes or hover cards. Reports each destination URL an agent never discovers.</pre>
</details>
</details>


*Generated by [Agent Lighthouse](https://forkpoint.github.io/agent-lighthouse/) · Open-source website checks for AI readiness. [Apache-2.0](https://github.com/ForkPoint/agent-lighthouse)*
