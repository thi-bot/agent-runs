[![Agent Lighthouse](https://forkpoint.github.io/agent-lighthouse/brand/kit/icons/icon-64.png "Agent Lighthouse logo")](https://forkpoint.github.io/agent-lighthouse/)

### Agent Lighthouse — AI readiness report

**Target:** `https://www.nhs.uk/`  
**Overall Score:** **`89/100`** *(partially-ready)*  
**Pages Audited:** `1` | **Duration:** `16.3s`

**Scan Conditions:**  
- **Page Type:** `homepage` (declared)
- **Origin Evidence:** `fresh` (version: `v2`, read at: `2026-11-14T00:29:14.763Z`)
- **Evidence Coverage:** `77.6 / 132.2` mass (59%) — page: `88.4`, origin: `43.8`, gated: `0`
- **Unscored Checks:** `129` (58 advisory, 0 gated)
- **Budget:** `16 s` of 180 s


| Category | Score | Breakdown |
| :--- | :---: | :--- |
| **Access & Crawl Control** | **100 / 100** | 🟢 27✓ 0! 0✗ (1 not scored) |
| **Machine Discovery** | **93 / 100** | 🟢 10✓ 0! 1✗ (1 not scored) |
| **Agent Interfaces** | _Not assessed_ | ⚪ 0✓ 0! 1✗ (1 not scored) |
| **Agentic Commerce** | **50 / 100** | 🟡 1✓ 0! 1✗ |
| **Content Extraction** | **90 / 100** | 🟢 15✓ 2! 2✗ (2 not scored) |
| **Structured Data** | **0 / 100** | 🔴 0✓ 0! 3✗ |
| **Answer Readiness** | **73 / 100** | 🔵 10✓ 2! 5✗ (6 not scored) |
| **Agent Operability & Safety** | **97 / 100** | 🟢 24✓ 0! 1✗ (2 not scored) |

> 13 advisory checks ran. They are reported but never scored.

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
https://www.nhs.uk/: homepage (declared, strong)
  Signals: declared:homepage
Fetch: https://www.nhs.uk/ — read, HTTP 200; homepage (declared)</pre>

Input URLs are pages supplied to the audit. Results cover this sample. Origin evidence may also support a result. Each audit counts toward the score at most once.

<details><summary>Machine-readable time markup [content-extraction/time-element]</summary>

<pre>all — FAIL — Advisory — not scored
No machine-readable time markup found on date-bearing pages.
Finding: 0/1 date-bearing pages have time markup
Selected URLs: 
  https://www.nhs.uk/
Input URLs: 
  https://www.nhs.uk/
Unread URLs: none
Suggested fix: Wrap all dates and times in &lt;time&gt; elements with a datetime attribute in ISO 8601 format (YYYY-MM-DD or YYYY-MM-DDThh:mm:ss). Include publication dates, event dates, and last-modified dates.</pre>
</details>
<details><summary>Lean token-to-content ratio [content-extraction/token-ratio]</summary>

<pre>all — FAIL — Primary result
Homepage is only 2.7% content by token weight — the page is almost entirely markup noise.
Finding: 2.7% content (261 of 9800 o200k tokens, extracted by readability)
Selected URLs: 
  https://www.nhs.uk/
Input URLs: 
  https://www.nhs.uk/
Unread URLs: none
Suggested fix: AI agents pay for every token of raw HTML they download, but only the visible text carries meaning. A content share under 5% means an agent parses more than 20 tokens of noise for every token of content, and the page may be truncated before the real content is read. Move inline assets to external files, remove unused boilerplate, and flatten markup.</pre>
</details>
<details><summary>The answer sits behind thousands of tokens of preamble [content-extraction/preamble-tax]</summary>

<pre>all — WARN — Primary result
An agent streams 3338 tokens before reaching your content.
Finding: 3338 tokens of preamble
Selected URLs: 
  https://www.nhs.uk/
Input URLs: 
  https://www.nhs.uk/
Unread URLs: none
Suggested fix: Move the heaviest inline block below the main content.</pre>
</details>
<details><summary>What an agent reads from this page depends on which extractor it uses [content-extraction/extraction-determinism]</summary>

<pre>all — WARN — Primary result
The extractors partly disagree about what this page says (0.61 overlap).
Finding: 0.61 worst-pair agreement
Selected URLs: 
  https://www.nhs.uk/
Input URLs: 
  https://www.nhs.uk/
Unread URLs: none
Suggested fix: Move chrome out of the main container so every extractor keeps the same text.</pre>
</details>
<details><summary>Every poll of this site’s discovery files downloads the whole file again [machine-discovery/conditional-request-support]</summary>

<pre>all — FAIL — Primary result
4 discovery surface problem(s): a crawler cannot ask this site what changed.
Finding: 4/4 surfaces revalidate
Selected URLs: 
  https://www.nhs.uk/
Input URLs: 
  https://www.nhs.uk/
Unread URLs: none
Suggested fix: Emit a content-derived ETag and a Last-Modified that moves with the content, and answer conditional requests with 304.</pre>
</details>
<details><summary>JSON-LD present [structured-data/json-ld-present]</summary>

<pre>all — FAIL — Primary result
No JSON-LD structured data found on any page.
Finding: None
Selected URLs: 
  https://www.nhs.uk/
Input URLs: 
  https://www.nhs.uk/
Unread URLs: none
Suggested fix: AI agents rely on JSON-LD structured data to understand what your site offers, who runs it, and how to interact with it. Without any JSON-LD, agents like ChatGPT and Perplexity treat your site as unstructured text with no machine-readable identity. Add Organization and WebSite schemas to your homepage &lt;head&gt; as a starting point.</pre>
</details>
<details><summary>Schema validation [structured-data/schema-validation]</summary>

<pre>all — FAIL — Primary result
No JSON-LD blocks to validate.
Finding: No JSON-LD blocks found.
Selected URLs: 
  https://www.nhs.uk/
Input URLs: 
  https://www.nhs.uk/
Unread URLs: none
Suggested fix: AI agents parse @context and @type to determine the schema vocabulary and entity type. Without these properties, the JSON-LD block is meaningless to any machine reader. Ensure every JSON-LD block includes &quot;@context&quot;: &quot;https://schema.org&quot; and a valid @type.</pre>
</details>
<details><summary>Organization schema [structured-data/organization-schema]</summary>

<pre>declared — FAIL — Primary result
No Organization schema found.
Finding: None
Selected URLs: 
  https://www.nhs.uk/
Input URLs: 
  https://www.nhs.uk/
Unread URLs: none
Suggested fix: AI agents use Organization schema to identify your brand, logo, and contact info. Without it, agents cannot confidently attribute content to your organization or display your branding in AI-generated answers. Add this JSON-LD to your homepage &lt;head&gt;.</pre>
</details>
<details><summary>LocalBusiness/ProfessionalService schema [structured-data/local-business-schema]</summary>

<pre>declared — NA — Not assessed — not scored
No physical store signals detected (no PostalAddress block paired with a store-locator link).
Finding: No physical location indicators found.
Selected URLs: 
  https://www.nhs.uk/
Input URLs: 
  https://www.nhs.uk/
Unread URLs: none</pre>
</details>
<details><summary>Review/AggregateRating schema [structured-data/review-schema]</summary>

<pre>declared — NA — Not assessed — not scored
No review or testimonial content detected to evaluate.
Finding: No review components, star-rating widgets or review markup found.
Selected URLs: 
  https://www.nhs.uk/
Input URLs: 
  https://www.nhs.uk/
Unread URLs: none</pre>
</details>
<details><summary>FAQ sections present [answer-readiness/faq-sections]</summary>

<pre>all — FAIL — Advisory — not scored
No FAQ sections found (headings, FAQPage JSON-LD, or accordions).
Finding: Not found
Selected URLs: 
  https://www.nhs.uk/
Input URLs: 
  https://www.nhs.uk/
Unread URLs: none
Suggested fix: FAQ sections with clear question headings are the highest-priority extraction target for AI-generated answers. Structure each Q&amp;A with a question heading followed by a direct answer paragraph.</pre>
</details>
<details><summary>Question-formatted headings [answer-readiness/question-headings]</summary>

<pre>all — FAIL — Advisory — not scored
No question-formatted H2/H3 headings found across 1 page(s).
Finding: Not found
Selected URLs: 
  https://www.nhs.uk/
Input URLs: 
  https://www.nhs.uk/
Unread URLs: none
Suggested fix: Question-formatted headings (&quot;What is X?&quot;, &quot;How does Y work?&quot;) are the primary signal for identifying which section answers a query. Each question heading should be followed immediately by a direct answer paragraph.</pre>
</details>
<details><summary>About page with credentials [answer-readiness/about-credentials]</summary>

<pre>all — WARN — Advisory — not scored
About page exists but lacks credential keywords (team, experience, expertise).
Finding: No credential keywords found
Selected URLs: 
  https://www.nhs.uk/
Input URLs: 
  https://www.nhs.uk/
Unread URLs: none
Suggested fix: AI engines scan about pages for credential keywords to build authority profiles but found none on yours. Add credential-rich content: team backgrounds with named experts, years of industry experience, expertise areas, and professional certifications. These signals directly influence AI trust scoring.</pre>
</details>
<details><summary>Trust and evidence signals on homepage [answer-readiness/trust-signals]</summary>

<pre>declared — FAIL — Primary result
Homepage carries neither of the GEO-measured trust factors.
Finding: None found
Selected URLs: 
  https://www.nhs.uk/
Input URLs: 
  https://www.nhs.uk/
Unread URLs: none
Suggested fix: Missing: quantified social proof (a rating, review count or customer count); evidence-backed claims (outbound citations or attributed sources). A 252,000-trial controlled study across six LLMs measured both as shifting which source an answer engine cites. Quantify your social proof and cite evidence for factual claims. Comparison content is reported separately and unscored by answer-readiness/comparison-tables.</pre>
</details>
<details><summary>Review/testimonial signals [answer-readiness/review-signals]</summary>

<pre>declared — FAIL — Primary result
No review or testimonial signals found.
Finding: Not found
Selected URLs: 
  https://www.nhs.uk/
Input URLs: 
  https://www.nhs.uk/
Unread URLs: none
Suggested fix: AI generative engines use reviews and testimonials as social proof when recommending your product or service. Attributed quotations and Review/AggregateRating schema make social proof machine-readable, giving agents concrete evidence to cite when users ask &quot;is X any good?&quot;.</pre>
</details>
<details><summary>Sections stop making sense once retrieved on their own [answer-readiness/chunk-boundary-referent-integrity]</summary>

<pre>all — WARN — Primary result
1 of 17 sections lose their referent when retrieved alone.
Finding: 94% self-contained
Selected URLs: 
  https://www.nhs.uk/
Input URLs: 
  https://www.nhs.uk/
Unread URLs: none
Suggested fix: Name the subject in the sections flagged below.</pre>
</details>
<details><summary>Facts on this page do not survive the extractors that read it [answer-readiness/extractor-survival-recall]</summary>

<pre>all — FAIL — Primary result
5 of 17 key spans do not survive the extractors an agent uses.
Finding: 71% of facts survive
Selected URLs: 
  https://www.nhs.uk/
Input URLs: 
  https://www.nhs.uk/
Unread URLs: none
Suggested fix: Move the facts into the main content container, or repeat them in the prose.</pre>
</details>
<details><summary>AI Catalog exists [agent-interfaces/ai-catalog-exists]</summary>

<pre>all — FAIL — Advisory — not scored
Neither /.well-known/ard.json nor /.well-known/ai-catalog.json is served (/.well-known/ard.json: HTTP 404; /.well-known/ai-catalog.json: HTTP 404).
Finding: /.well-known/ard.json: HTTP 404; /.well-known/ai-catalog.json: HTTP 404
Selected URLs: 
  https://www.nhs.uk/
Input URLs: 
  https://www.nhs.uk/
Unread URLs: none
Suggested fix: The AI catalog is the ARD discovery manifest that tells AI agents which MCP servers, agent cards, skills and API descriptions your site offers. Hugging Face&#039;s hf-discover resolves it at /.well-known/ai-catalog.json and reads its entries; without it, agents must probe endpoints to work out what your site can do.</pre>
</details>
<details><summary>ACP link-surface completeness [agentic-commerce/acp-policy-link-surface]</summary>

<pre>all — FAIL — Primary result
A hard-gate policy link is unusable, so is_eligible_checkout cannot be set and the catalogue is excluded from Instant Checkout: terms_of_use has no link anywhere on the scanned pages; privacy_policy has no link anywhere on the scanned pages.
Finding: 2/8 ACP link types resolve; about_us=https://www.nhs.uk/using-the-nhs/about-the-nhs/ support=https://www.nhs.uk/social-care-and-support/
Selected URLs: 
  https://www.nhs.uk/
Input URLs: 
  https://www.nhs.uk/
Unread URLs: none
Suggested fix: Verifies the merchant can populate the `links` array that every ACP CheckoutSession response is required to carry, by resolving each of the 8 enum link types to a stable, HTTPS, no-JS-required, non-soft-404 URL, on any domain, as an HTML page or a PDF.</pre>
</details>
<details><summary>Third-party DOM-write blast radius [operability-safety/third-party-dom-write-blast-radius]</summary>

<pre>all — FAIL — Primary result
1 third-party origin(s) can write into the DOM an agent reads, with no Content-Security-Policy that constrains what runs and 1 of them unpinned by `integrity`: adobedtm.com. Each is a separate host, and a separate supply chain, with the site&#039;s own authority over what an agent believes.
Finding: 1 third-party script origin(s) [1-3]: adobedtm.com; CSP from none, not constraining; runtime-injected tags not counted
Selected URLs: 
  https://www.nhs.uk/
Input URLs: 
  https://www.nhs.uk/
Unread URLs: none
Suggested fix: Counts how many separate companies can write text into the DOM an agent reads: every registrable domain shipping a script or stylesheet into the page, judged against whether the Content-Security-Policy actually constrains what may run, and whether each resource is pinned with an `integrity` hash. Cross-origin frames with no `sandbox` are reported alongside. The origin list is the deliverable.</pre>
</details>
</details>


*Generated by [Agent Lighthouse](https://forkpoint.github.io/agent-lighthouse/) · Open-source website checks for AI readiness. [Apache-2.0](https://github.com/ForkPoint/agent-lighthouse)*
