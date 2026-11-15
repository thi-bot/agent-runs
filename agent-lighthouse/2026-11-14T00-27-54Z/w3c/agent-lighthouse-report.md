[![Agent Lighthouse](https://forkpoint.github.io/agent-lighthouse/brand/kit/icons/icon-64.png "Agent Lighthouse logo")](https://forkpoint.github.io/agent-lighthouse/)

### Agent Lighthouse — AI readiness report

**Target:** `https://www.w3.org/`  
**Overall Score:** **`82/100`** *(partially-ready)*  
**Pages Audited:** `1` | **Duration:** `6.0s`

**Scan Conditions:**  
- **Page Type:** `homepage` (declared)
- **Origin Evidence:** `fresh` (version: `v2`, read at: `2026-11-14T00:29:32.578Z`)
- **Evidence Coverage:** `69.4 / 132.2` mass (52%) — page: `88.4`, origin: `43.8`, gated: `0`
- **Unscored Checks:** `138` (58 advisory, 0 gated)
- **Budget:** `6 s` of 180 s


| Category | Score | Breakdown |
| :--- | :---: | :--- |
| **Access & Crawl Control** | **98 / 100** | 🟢 23✓ 1! 0✗ |
| **Machine Discovery** | **73 / 100** | 🔵 4✓ 1! 1✗ |
| **Agent Interfaces** | _Not assessed_ | ⚪ 0✓ 0! 1✗ (1 not scored) |
| **Agentic Commerce** | **25 / 100** | 🔴 0✓ 1! 1✗ |
| **Content Extraction** | **75 / 100** | 🔵 12✓ 3! 3✗ (1 not scored) |
| **Structured Data** | **0 / 100** | 🔴 0✓ 0! 3✗ |
| **Answer Readiness** | **73 / 100** | 🔵 9✓ 2! 6✗ (6 not scored) |
| **Agent Operability & Safety** | **94 / 100** | 🟢 17✓ 3! 0✗ |

> 8 advisory checks ran. They are reported but never scored.

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
https://www.w3.org/: homepage (declared, strong)
  Signals: declared:homepage
Fetch: https://www.w3.org/ — read, HTTP 200; homepage (declared)</pre>

Input URLs are pages supplied to the audit. Results cover this sample. Origin evidence may also support a result. Each audit counts toward the score at most once.

<details><summary>The edge answers differently when the User-Agent names an AI crawler robots.txt admits [access-crawl-control/ai-crawler-edge-parity]</summary>

<pre>all — WARN — Primary result
When the User-Agent names these crawlers, the edge answers differently: 1 crawler User-Agent(s) (OAI-SearchBot) at https://www.w3.org/: Cloudflare challenge (cf-mitigated: challenge). The scanner sends the crawler User-Agent from its own address, without the crawler&#039;s published IP range or Web Bot Auth signature, so a challenge, a 403, a 429 or another refusal can be the edge&#039;s defence against an unverified request naming the crawler, and the real crawler may be answered differently. Confirm against the edge logs before changing anything.
Finding: 1 URL(s) probed with 8 crawler UA(s) from the scanner&#039;s address; GPTBot: 0/1 answered differently; OAI-SearchBot: 1/1 answered differently; ChatGPT-User: 0/1 answered differently; ClaudeBot: 0/1 answered differently; Claude-User: 0/1 answered differently; PerplexityBot: 0/1 answered differently; Perplexity-User: 0/1 answered differently; MistralAI-User: 0/1 answered differently
Selected URLs: 
  https://www.w3.org/
Input URLs: 
  https://www.w3.org/
Unread URLs: none
Suggested fix: Decide the policy once, and make the edge say what robots.txt says. On Cloudflare, add the AI crawlers you admit to the verified-bot allowance (Security &gt; Bots) or a WAF skip rule so managed challenges, bot fight mode and rate limiting do not apply to them; on other CDNs, allowlist the published crawler IP ranges. Then verify from outside with curl -A using each published User-Agent, because the dashboard shows the rule, not the answer. Where you mean to block a crawler, say so in robots.txt too — a consistent no is a legitimate posture, and this audit scores it as one.</pre>
</details>
<details><summary>&lt;aside&gt; for supplementary content [content-extraction/aside-element]</summary>

<pre>all — WARN — Primary result
1 supplementary block(s) are not marked as complementary: &lt;div l-sidebar&gt;.
Finding: 1 marked, 1 unmarked — &lt;div l-sidebar&gt;
Selected URLs: 
  https://www.w3.org/
Input URLs: 
  https://www.w3.org/
Unread URLs: none
Suggested fix: Some sidebar/promo blocks are wrapped in &lt;aside&gt; and some are not. The unwrapped ones rely on extractor heuristics and may enter the main text. Wrap them in &lt;aside&gt; too — but keep citable facts out, because that subtree is discarded.</pre>
</details>
<details><summary>Sufficient content depth [content-extraction/content-depth]</summary>

<pre>all — FAIL — Primary result
0/1 page(s) have &gt;300 words. Lowest: 297 words.
Finding: 0/1 pages above threshold
Selected URLs: 
  https://www.w3.org/
Input URLs: 
  https://www.w3.org/
Unread URLs: none
Suggested fix: AI RAG systems need sufficient content depth to generate accurate, detailed answers. Pages with fewer than 300 words provide too little context for meaningful vector embeddings, causing your content to rank poorly in retrieval and be excluded from AI-generated responses.</pre>
</details>
<details><summary>Lean token-to-content ratio [content-extraction/token-ratio]</summary>

<pre>all — FAIL — Primary result
Homepage is only 2.5% content by token weight — the page is almost entirely markup noise.
Finding: 2.5% content (314 of 12441 o200k tokens, extracted by readability)
Selected URLs: 
  https://www.w3.org/
Input URLs: 
  https://www.w3.org/
Unread URLs: none
Suggested fix: AI agents pay for every token of raw HTML they download, but only the visible text carries meaning. A content share under 5% means an agent parses more than 20 tokens of noise for every token of content, and the page may be truncated before the real content is read. Move inline assets to external files, remove unused boilerplate, and flatten markup.</pre>
</details>
<details><summary>Ghost content: CSS-hidden text ingested as visible [content-extraction/css-hidden-ghost-content]</summary>

<pre>all — FAIL — Primary result
779 est. tokens (58.1% of page text) are hidden only by stylesheet rules, which no non-rendering extractor evaluates. Largest: &quot;.skip-link, .skip-to-comments, .skip-to-comment-form, #cookie-banner, [role=status], .banner, #lang-nav, .logo-link .visuallyhidden, .heading-anchor, [data-trigger], [data-toggle], #global-nav ul, #breadcrumb, .translations, .toc, .component--video, .calendar-link, .listing .lead, .listing .filters, .listing .browse, .listing form, .progress-list, .autocomplete__wrapper svg, .date-location img, .card--group dl, .card--group .l-cluster, .card--user .icon, .card--post .icon, .card--post .tag, .post .rss .icon, .comments, .pre-footer, .pagination, .crosslinks, .global-footer__links&quot; (display:none). 1 block(s) carry prices, availability or dated claims that can contradict the visible copy.
Finding: 779 est. tokens hidden by CSS class across 6 block(s), 58.1% of page text
Selected URLs: 
  https://www.w3.org/
Input URLs: 
  https://www.w3.org/
Unread URLs: none
Suggested fix: Find text that is hidden from human readers by an external stylesheet class but is invisible-as-hidden to every extractor an agent uses, and size it in tokens. Fail if class-hidden text exceeds 15% of the page&#039;s total text tokens or 1,000 tokens absolute; separately fail on near-duplicate hidden blocks (a mobile nav or tab-panel set duplicating visible content). Report contradiction risk when hidden text contains prices, availability, or dated claims.</pre>
</details>
<details><summary>The answer sits behind thousands of tokens of preamble [content-extraction/preamble-tax]</summary>

<pre>all — WARN — Primary result
An agent streams 9276 tokens before reaching your content.
Finding: 9276 tokens of preamble
Selected URLs: 
  https://www.w3.org/
Input URLs: 
  https://www.w3.org/
Unread URLs: none
Suggested fix: Move the heaviest inline block below the main content.</pre>
</details>
<details><summary>What an agent reads from this page depends on which extractor it uses [content-extraction/extraction-determinism]</summary>

<pre>all — WARN — Primary result
The extractors partly disagree about what this page says (0.79 overlap).
Finding: 0.79 worst-pair agreement
Selected URLs: 
  https://www.w3.org/
Input URLs: 
  https://www.w3.org/
Unread URLs: none
Suggested fix: Move chrome out of the main container so every extractor keeps the same text.</pre>
</details>
<details><summary>sitemap.xml exists [machine-discovery/sitemap-exists]</summary>

<pre>all — FAIL — Primary result
No XML sitemap found for this site in robots.txt or at the conventional sitemap paths.
Finding: No sitemap found for this site
Selected URLs: 
  https://www.w3.org/
Input URLs: 
  https://www.w3.org/
Unread URLs: none
Suggested fix: AI crawlers use your sitemap to discover all pages without following links. Without it, pages may never be indexed by AI search engines like Perplexity or ChatGPT Browse.</pre>
</details>
<details><summary>Pages are covered by a discovery index [machine-discovery/discovery-index-coverage]</summary>

<pre>all — WARN — Primary result
No sitemap URLs or llms.txt links to compare the scanned pages against.
Finding: No discovery index entries found
Selected URLs: 
  https://www.w3.org/
Input URLs: 
  https://www.w3.org/
Unread URLs: none
Suggested fix: Without a sitemap or an llms.txt link list, AI crawlers have no reference list of your pages and must rely entirely on the link graph. Publish at least one.</pre>
</details>
<details><summary>JSON-LD present [structured-data/json-ld-present]</summary>

<pre>all — FAIL — Primary result
No JSON-LD structured data found on any page.
Finding: None
Selected URLs: 
  https://www.w3.org/
Input URLs: 
  https://www.w3.org/
Unread URLs: none
Suggested fix: AI agents rely on JSON-LD structured data to understand what your site offers, who runs it, and how to interact with it. Without any JSON-LD, agents like ChatGPT and Perplexity treat your site as unstructured text with no machine-readable identity. Add Organization and WebSite schemas to your homepage &lt;head&gt; as a starting point.</pre>
</details>
<details><summary>Schema validation [structured-data/schema-validation]</summary>

<pre>all — FAIL — Primary result
No JSON-LD blocks to validate.
Finding: No JSON-LD blocks found.
Selected URLs: 
  https://www.w3.org/
Input URLs: 
  https://www.w3.org/
Unread URLs: none
Suggested fix: AI agents parse @context and @type to determine the schema vocabulary and entity type. Without these properties, the JSON-LD block is meaningless to any machine reader. Ensure every JSON-LD block includes &quot;@context&quot;: &quot;https://schema.org&quot; and a valid @type.</pre>
</details>
<details><summary>Organization schema [structured-data/organization-schema]</summary>

<pre>declared — FAIL — Primary result
No Organization schema found.
Finding: None
Selected URLs: 
  https://www.w3.org/
Input URLs: 
  https://www.w3.org/
Unread URLs: none
Suggested fix: AI agents use Organization schema to identify your brand, logo, and contact info. Without it, agents cannot confidently attribute content to your organization or display your branding in AI-generated answers. Add this JSON-LD to your homepage &lt;head&gt;.</pre>
</details>
<details><summary>LocalBusiness/ProfessionalService schema [structured-data/local-business-schema]</summary>

<pre>declared — NA — Not assessed — not scored
No physical store signals detected (no PostalAddress block paired with a store-locator link).
Finding: No physical location indicators found.
Selected URLs: 
  https://www.w3.org/
Input URLs: 
  https://www.w3.org/
Unread URLs: none</pre>
</details>
<details><summary>Review/AggregateRating schema [structured-data/review-schema]</summary>

<pre>declared — NA — Not assessed — not scored
No review or testimonial content detected to evaluate.
Finding: No review components, star-rating widgets or review markup found.
Selected URLs: 
  https://www.w3.org/
Input URLs: 
  https://www.w3.org/
Unread URLs: none</pre>
</details>
<details><summary>og:image:alt present [answer-readiness/og-image-alt]</summary>

<pre>all — FAIL — Advisory — not scored
og:image is set but og:image:alt is missing.
Finding: Not found
Selected URLs: 
  https://www.w3.org/
Input URLs: 
  https://www.w3.org/
Unread URLs: none
Suggested fix: AI agents cannot process images directly and rely on og:image:alt text to understand your page&#039;s visual content. Without alt text, the OG image is invisible to text-based AI systems that generate answers and summaries about your page.</pre>
</details>
<details><summary>FAQ sections present [answer-readiness/faq-sections]</summary>

<pre>all — FAIL — Advisory — not scored
No FAQ sections found (headings, FAQPage JSON-LD, or accordions).
Finding: Not found
Selected URLs: 
  https://www.w3.org/
Input URLs: 
  https://www.w3.org/
Unread URLs: none
Suggested fix: FAQ sections with clear question headings are the highest-priority extraction target for AI-generated answers. Structure each Q&amp;A with a question heading followed by a direct answer paragraph.</pre>
</details>
<details><summary>Question-formatted headings [answer-readiness/question-headings]</summary>

<pre>all — FAIL — Advisory — not scored
No question-formatted H2/H3 headings found across 1 page(s).
Finding: Not found
Selected URLs: 
  https://www.w3.org/
Input URLs: 
  https://www.w3.org/
Unread URLs: none
Suggested fix: Question-formatted headings (&quot;What is X?&quot;, &quot;How does Y work?&quot;) are the primary signal for identifying which section answers a query. Each question heading should be followed immediately by a direct answer paragraph.</pre>
</details>
<details><summary>Specific numbers and data points [answer-readiness/specific-numbers]</summary>

<pre>all — FAIL — Primary result
No specific numbers, percentages, or dollar amounts found in content.
Finding: Not found
Selected URLs: 
  https://www.w3.org/
Input URLs: 
  https://www.w3.org/
Unread URLs: none
Suggested fix: AI answer engines strongly prefer content with concrete data points over vague claims. Pages with specific numbers, percentages, and metrics are ranked higher for data-driven queries because agents can cite exact figures in generated answers rather than paraphrasing vague language.</pre>
</details>
<details><summary>About page with credentials [answer-readiness/about-credentials]</summary>

<pre>all — WARN — Advisory — not scored
About page found but has limited credential signals (only &quot;experience&quot;).
Finding: Keywords: experience
Selected URLs: 
  https://www.w3.org/
Input URLs: 
  https://www.w3.org/
Unread URLs: none
Suggested fix: AI engines scan about pages for credential keywords (team, experience, expertise, certified) to build authority profiles. A single keyword provides weak signal. Expand to include team backgrounds, years of experience, expertise areas, and certifications for stronger AI trust scoring.</pre>
</details>
<details><summary>Trust and evidence signals on homepage [answer-readiness/trust-signals]</summary>

<pre>declared — WARN — Primary result
Homepage carries only 1 of the 2 GEO-measured trust factor(s).
Finding: evidence-backed claims (3 outbound citation host(s): status.w3.org, w3c.social, github.com)
Selected URLs: 
  https://www.w3.org/
Input URLs: 
  https://www.w3.org/
Unread URLs: none
Suggested fix: Missing: quantified social proof (a rating, review count or customer count). These are the factors a 252,000-trial study measured as moving AI citation, and a pass needs every one still in scope here. Promotional adjectives are not among them.</pre>
</details>
<details><summary>Review/testimonial signals [answer-readiness/review-signals]</summary>

<pre>declared — FAIL — Primary result
No review or testimonial signals found.
Finding: Not found
Selected URLs: 
  https://www.w3.org/
Input URLs: 
  https://www.w3.org/
Unread URLs: none
Suggested fix: AI generative engines use reviews and testimonials as social proof when recommending your product or service. Attributed quotations and Review/AggregateRating schema make social proof machine-readable, giving agents concrete evidence to cite when users ask &quot;is X any good?&quot;.</pre>
</details>
<details><summary>Facts on this page do not survive the extractors that read it [answer-readiness/extractor-survival-recall]</summary>

<pre>all — FAIL — Primary result
6 of 10 key spans do not survive the extractors an agent uses.
Finding: 40% of facts survive
Selected URLs: 
  https://www.w3.org/
Input URLs: 
  https://www.w3.org/
Unread URLs: none
Suggested fix: Move the facts into the main content container, or repeat them in the prose.</pre>
</details>
<details><summary>AI Catalog exists [agent-interfaces/ai-catalog-exists]</summary>

<pre>all — FAIL — Advisory — not scored
Neither /.well-known/ard.json nor /.well-known/ai-catalog.json is served (/.well-known/ard.json: HTTP 404; /.well-known/ai-catalog.json: HTTP 404).
Finding: /.well-known/ard.json: HTTP 404; /.well-known/ai-catalog.json: HTTP 404
Selected URLs: 
  https://www.w3.org/
Input URLs: 
  https://www.w3.org/
Unread URLs: none
Suggested fix: The AI catalog is the ARD discovery manifest that tells AI agents which MCP servers, agent cards, skills and API descriptions your site offers. Hugging Face&#039;s hf-discover resolves it at /.well-known/ai-catalog.json and reads its entries; without it, agents must probe endpoints to work out what your site can do.</pre>
</details>
<details><summary>ACP link-surface completeness [agentic-commerce/acp-policy-link-surface]</summary>

<pre>all — FAIL — Primary result
A hard-gate policy link is unusable, so is_eligible_checkout cannot be set and the catalogue is excluded from Instant Checkout: terms_of_use has no link anywhere on the scanned pages.
Finding: 4/8 ACP link types resolve; privacy_policy=https://www.w3.org/mission/privacy/ contact_us=https://www.w3.org/contact/ about_us=https://www.w3.org/standards/about/ support=https://www.w3.org/support-us/
Selected URLs: 
  https://www.w3.org/
Input URLs: 
  https://www.w3.org/
Unread URLs: none
Suggested fix: Verifies the merchant can populate the `links` array that every ACP CheckoutSession response is required to carry, by resolving each of the 8 enum link types to a stable, HTTPS, no-JS-required, non-soft-404 URL, on any domain, as an HTML page or a PDF.</pre>
</details>
<details><summary>Commerce paths answer differently when the User-Agent names a shopping agent, or robots.txt turns it away [agentic-commerce/agent-ua-commerce-parity]</summary>

<pre>all — WARN — Primary result
A request naming OAI-SearchBot gets a Cloudflare challenge (cf-mitigated: challenge) at https://www.w3.org/; A request naming OAI-SearchBot gets a Cloudflare challenge (cf-mitigated: challenge) at https://www.w3.org/mission/privacy/. These probes come from the scanner&#039;s address, not OpenAI&#039;s published ranges, so they show how the site answers a request that names the agent, not what the real agent receives. A challenge, a 403, a 429 or another refusal can be the edge&#039;s defence against an unverified request naming the agent, and the real agent, from OpenAI&#039;s published ranges, may be answered differently. Confirm against the edge logs before changing anything. Allowlist the published address ranges from https://openai.com/searchbot.json and https://openai.com/chatgpt-user.json rather than trusting the User-Agent string.
Finding: 3 commerce target(s) probed from the scanner&#039;s address with the ChatGPT-User and OAI-SearchBot User-Agents; 4 comparable probe(s); 0 finding(s); 2 ambiguous refusal(s); 0 not assessed
Selected URLs: 
  https://www.w3.org/
Input URLs: 
  https://www.w3.org/
Unread URLs: none
Suggested fix: Separate the four OpenAI tokens instead of treating &#039;OpenAI&#039; as one switch: Disallow GPTBot if you do not want your catalogue in training, and keep OAI-SearchBot and ChatGPT-User allowed, since those two are what put your product in an answer and let the shopper&#039;s agent read the page. At the edge, allowlist the published address ranges from https://openai.com/searchbot.json and https://openai.com/chatgpt-user.json — UA-string rules are both spoofable and, when they misfire, invisible from the dashboard. Then verify from outside with curl -A on a product page, the cart and the policy pages, and check you get the whole page rather than a stub.</pre>
</details>
<details><summary>Invisible Instruction Payload Scan [operability-safety/invisible-instruction-scan]</summary>

<pre>all — WARN — Primary result
2 block(s) of text over 200 characters are hidden from a human by hidden ancestor and match no instruction pattern — an unexplained payload an agent still ingests.
Finding: 2 unexplained hidden payload(s)
Selected URLs: 
  https://www.w3.org/
Input URLs: 
  https://www.w3.org/
Unread URLs: none
Suggested fix: Detect text that is present in the byte stream or DOM but not perceivable by a human, and that reads like an instruction addressed to an AI. Covers CSS-hidden text (color ≈ background, font-size:0, opacity:0, off-screen absolute positioning, zero-size + overflow:hidden, visibility:hidden, display:none), plus channels that never render at all: HTML comments, &lt;noscript&gt;, &lt;template&gt;, oversized data-* attribute values, &lt;script type=&quot;text/plain&quot;&gt;/application/json blobs, non-standard &lt;meta name&gt; content, and inline &lt;svg&gt;&lt;text&gt; with fill-opacity:0 or display:none.</pre>
</details>
<details><summary>Ghost-clickable elements: click targets an agent cannot address [operability-safety/ghost-clickable-element-ratio]</summary>

<pre>all — WARN — Primary result
3 of 104 click target(s) never reach an agent&#039;s snapshot. The page stays above the 0.90 floor, but each ghost is a control no agent can click. First: &lt;span&gt; (no accessible name).
Finding: ratio 0.97 — 3 ghost of 104 click target(s) (no accessible name)
Selected URLs: 
  https://www.w3.org/
Input URLs: 
  https://www.w3.org/
Unread URLs: none
Suggested fix: Measures the share of on-page click targets that a DOM/accessibility-tree agent cannot address at all: elements that look and behave clickable to a human or a vision model but expose no native or ARIA role and no accessible name, so they never appear in a Playwright-MCP style snapshot. Reported as semantic / (semantic + ghost) over the served markup and its same-origin stylesheets, with the reason each ghost is unaddressable.</pre>
</details>
<details><summary>Hover-only navigation and content [operability-safety/hover-only-content-and-navigation]</summary>

<pre>all — WARN — Primary result
Navigation is reachable, but 1 piece(s) of information are drawn only on hover, so an agent never reads them. First: &quot;W3C Document License&quot;.
Finding: 1 title-only string(s)
Selected URLs: 
  https://www.w3.org/
Input URLs: 
  https://www.w3.org/
Unread URLs: none
Suggested fix: Detects navigation subtrees and information that exist in the DOM only while a pointer hovers — `:hover`-revealed submenus with no focus or `aria-expanded` equivalent, and content carried solely in `title` attributes or hover cards. Reports each destination URL an agent never discovers.</pre>
</details>
</details>


*Generated by [Agent Lighthouse](https://forkpoint.github.io/agent-lighthouse/) · Open-source website checks for AI readiness. [Apache-2.0](https://github.com/ForkPoint/agent-lighthouse)*
