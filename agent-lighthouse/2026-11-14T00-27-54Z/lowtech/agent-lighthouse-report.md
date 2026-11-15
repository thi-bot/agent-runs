[![Agent Lighthouse](https://forkpoint.github.io/agent-lighthouse/brand/kit/icons/icon-64.png "Agent Lighthouse logo")](https://forkpoint.github.io/agent-lighthouse/)

### Agent Lighthouse — AI readiness report

**Target:** `https://solar.lowtechmagazine.com/`  
**Overall Score:** **`79/100`** *(partially-ready)*  
**Pages Audited:** `1` | **Duration:** `10.9s`

**Scan Conditions:**  
- **Page Type:** `homepage` (declared)
- **Origin Evidence:** `fresh` (version: `v2`, read at: `2026-11-14T00:29:39.822Z`)
- **Evidence Coverage:** `70.4 / 132.2` mass (53%) — page: `88.4`, origin: `43.8`, gated: `0`
- **Unscored Checks:** `135` (58 advisory, 0 gated)
- **Budget:** `11 s` of 180 s


| Category | Score | Breakdown |
| :--- | :---: | :--- |
| **Access & Crawl Control** | **100 / 100** | 🟢 25✓ 0! 0✗ |
| **Machine Discovery** | **83 / 100** | 🔵 12✓ 1! 2✗ (2 not scored) |
| **Agent Interfaces** | _Not assessed_ | ⚪ 0✓ 0! 1✗ (1 not scored) |
| **Agentic Commerce** | **50 / 100** | 🟡 1✓ 0! 1✗ |
| **Content Extraction** | **79 / 100** | 🔵 13✓ 1! 4✗ (2 not scored) |
| **Structured Data** | **0 / 100** | 🔴 0✓ 0! 3✗ |
| **Answer Readiness** | **55 / 100** | 🟡 8✓ 5! 6✗ (7 not scored) |
| **Agent Operability & Safety** | **74 / 100** | 🔵 10✓ 2! 4✗ (1 not scored) |

> 13 advisory checks ran. They are reported but never scored.

#### No AI vendor reads this

- **RSS feed content complete** — No search engine or AI vendor documents reading full article text from a feed. Documented consumers take URLs from feeds and fetch the article page itself. Instead: Keep the feed for URL discovery (machine-discovery/rss-feed). Excerpt feeds are valid. [Evidence](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- **Meta author tag (no AI reader)** — No AI vendor documents reading the meta author tag, and Google ignores meta tags it does not support, author among them. It does no harm. Instead: A visible byline and schema.org author markup on the article (structured-data/author-schema, answer-readiness/named-author). [Evidence](https://developers.google.com/search/docs/crawling-indexing/special-tags)

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
https://solar.lowtechmagazine.com/: homepage (declared, strong)
  Signals: declared:homepage
Fetch: https://solar.lowtechmagazine.com/ — read, HTTP 200; homepage (declared)</pre>

Input URLs are pages supplied to the audit. Results cover this sample. Origin evidence may also support a result. Each audit counts toward the score at most once.

<details><summary>Semantic list usage [content-extraction/semantic-lists]</summary>

<pre>all — FAIL — Primary result
1 of 1 content list(s) are div stacks or numbered prose rather than list markup.
Finding: 0 semantic list(s) vs 1 pseudo-list(s); 0 definition element(s); 0 step list(s)
Selected URLs: 
  https://solar.lowtechmagazine.com/
Input URLs: 
  https://solar.lowtechmagazine.com/
Unread URLs: none
Suggested fix: Lists built from styled divs, broken &lt;dl&gt; markup or manually numbered paragraphs lose their item boundaries when a page is converted to markdown or serialized into an accessibility tree, which is how extraction pipelines and browsing agents read it.</pre>
</details>
<details><summary>Machine-readable time markup [content-extraction/time-element]</summary>

<pre>all — FAIL — Advisory — not scored
No machine-readable time markup found on date-bearing pages.
Finding: 0/1 date-bearing pages have time markup
Selected URLs: 
  https://solar.lowtechmagazine.com/
Input URLs: 
  https://solar.lowtechmagazine.com/
Unread URLs: none
Suggested fix: Wrap all dates and times in &lt;time&gt; elements with a datetime attribute in ISO 8601 format (YYYY-MM-DD or YYYY-MM-DDThh:mm:ss). Include publication dates, event dates, and last-modified dates.</pre>
</details>
<details><summary>Lean token-to-content ratio [content-extraction/token-ratio]</summary>

<pre>all — FAIL — Primary result
Homepage is only 0.5% content by token weight — the page is almost entirely markup noise.
Finding: 0.5% content (36 of 7462 o200k tokens, extracted by readability)
Selected URLs: 
  https://solar.lowtechmagazine.com/
Input URLs: 
  https://solar.lowtechmagazine.com/
Unread URLs: none
Suggested fix: AI agents pay for every token of raw HTML they download, but only the visible text carries meaning. A content share under 5% means an agent parses more than 20 tokens of noise for every token of content, and the page may be truncated before the real content is read. Move inline assets to external files, remove unused boilerplate, and flatten markup.</pre>
</details>
<details><summary>Ghost content: CSS-hidden text ingested as visible [content-extraction/css-hidden-ghost-content]</summary>

<pre>all — WARN — Primary result
33 est. tokens (4.3% of page text) are hidden only by stylesheet rules, below the 15% and 1000-token thresholds but still ingested. Largest: &quot;#languages&quot; (display:none).
Finding: 33 est. tokens hidden by CSS class across 4 block(s), 4.3% of page text
Selected URLs: 
  https://solar.lowtechmagazine.com/
Input URLs: 
  https://solar.lowtechmagazine.com/
Unread URLs: none
Suggested fix: Find text that is hidden from human readers by an external stylesheet class but is invisible-as-hidden to every extractor an agent uses, and size it in tokens. Fail if class-hidden text exceeds 15% of the page&#039;s total text tokens or 1,000 tokens absolute; separately fail on near-duplicate hidden blocks (a mobile nav or tab-panel set duplicating visible content). Report contradiction risk when hidden text contains prices, availability, or dated claims.</pre>
</details>
<details><summary>What an agent reads from this page depends on which extractor it uses [content-extraction/extraction-determinism]</summary>

<pre>all — FAIL — Primary result
Readability extracted 158 characters, under its own 500-character threshold.
Finding: readability returned 158 characters, below the 500-character threshold at which it reports a document as readerable.
Selected URLs: 
  https://solar.lowtechmagazine.com/
Input URLs: 
  https://solar.lowtechmagazine.com/
Unread URLs: none
Suggested fix: Put the article in one container and keep chrome out of it.</pre>
</details>
<details><summary>Sitemap lastmod values contradict the pages they describe [machine-discovery/sitemap-lastmod-verifiability]</summary>

<pre>all — WARN — Primary result
4 of 6 read sample URLs (67%) publish no modification time at all, so their lastmod cannot be verified — add dateModified to the page&#039;s JSON-LD.
Finding: 6 sampled URL(s) of 472 with lastmod; 2 corroborated, 0 divergent, 4 unverifiable, 0 not read; 0 malformed; 0 future-dated
Selected URLs: 
  https://solar.lowtechmagazine.com/
Input URLs: 
  https://solar.lowtechmagazine.com/
Unread URLs: none
Suggested fix: Stamp lastmod from the content record, not from the build. Emit the timestamp of the last substantive edit to that document, and leave it alone when a deploy only rebuilds the page. Publish the same instant on the page — JSON-LD dateModified is the most widely read of the three signals — so the value is checkable; a lastmod nothing on the page supports is a lastmod the crawler drops. Never emit a future date, and use W3C Datetime (YYYY-MM-DD or a full RFC 3339 timestamp) for every value.</pre>
</details>
<details><summary>Every poll of this site’s discovery files downloads the whole file again [machine-discovery/conditional-request-support]</summary>

<pre>all — FAIL — Primary result
1 discovery surface problem(s): a crawler cannot ask this site what changed.
Finding: 6/7 surfaces revalidate
Selected URLs: 
  https://solar.lowtechmagazine.com/
Input URLs: 
  https://solar.lowtechmagazine.com/
Unread URLs: none
Suggested fix: Emit a content-derived ETag and a Last-Modified that moves with the content, and answer conditional requests with 304.</pre>
</details>
<details><summary>This site’s sitemap or feed trails what the site actually publishes [machine-discovery/three-way-freshness-lag]</summary>

<pre>all — FAIL — Primary result
The sitemap&#039;s newest lastmod is 2026-09-24, 51 days behind the newest page date 2026-11-14
Finding: 51 days behind
Selected URLs: 
  https://solar.lowtechmagazine.com/
Input URLs: 
  https://solar.lowtechmagazine.com/
Unread URLs: none
Suggested fix: Regenerate the sitemap and the feed when content changes, and stamp the feed build timestamp from its newest item.</pre>
</details>
<details><summary>JSON-LD present [structured-data/json-ld-present]</summary>

<pre>all — FAIL — Primary result
No JSON-LD structured data found on any page.
Finding: None
Selected URLs: 
  https://solar.lowtechmagazine.com/
Input URLs: 
  https://solar.lowtechmagazine.com/
Unread URLs: none
Suggested fix: AI agents rely on JSON-LD structured data to understand what your site offers, who runs it, and how to interact with it. Without any JSON-LD, agents like ChatGPT and Perplexity treat your site as unstructured text with no machine-readable identity. Add Organization and WebSite schemas to your homepage &lt;head&gt; as a starting point.</pre>
</details>
<details><summary>Schema validation [structured-data/schema-validation]</summary>

<pre>all — FAIL — Primary result
No JSON-LD blocks to validate.
Finding: No JSON-LD blocks found.
Selected URLs: 
  https://solar.lowtechmagazine.com/
Input URLs: 
  https://solar.lowtechmagazine.com/
Unread URLs: none
Suggested fix: AI agents parse @context and @type to determine the schema vocabulary and entity type. Without these properties, the JSON-LD block is meaningless to any machine reader. Ensure every JSON-LD block includes &quot;@context&quot;: &quot;https://schema.org&quot; and a valid @type.</pre>
</details>
<details><summary>Organization schema [structured-data/organization-schema]</summary>

<pre>declared — FAIL — Primary result
No Organization schema found.
Finding: None
Selected URLs: 
  https://solar.lowtechmagazine.com/
Input URLs: 
  https://solar.lowtechmagazine.com/
Unread URLs: none
Suggested fix: AI agents use Organization schema to identify your brand, logo, and contact info. Without it, agents cannot confidently attribute content to your organization or display your branding in AI-generated answers. Add this JSON-LD to your homepage &lt;head&gt;.</pre>
</details>
<details><summary>LocalBusiness/ProfessionalService schema [structured-data/local-business-schema]</summary>

<pre>declared — NA — Not assessed — not scored
No physical store signals detected (no PostalAddress block paired with a store-locator link).
Finding: No physical location indicators found.
Selected URLs: 
  https://solar.lowtechmagazine.com/
Input URLs: 
  https://solar.lowtechmagazine.com/
Unread URLs: none</pre>
</details>
<details><summary>Review/AggregateRating schema [structured-data/review-schema]</summary>

<pre>declared — NA — Not assessed — not scored
No review or testimonial content detected to evaluate.
Finding: No review components, star-rating widgets or review markup found.
Selected URLs: 
  https://solar.lowtechmagazine.com/
Input URLs: 
  https://solar.lowtechmagazine.com/
Unread URLs: none</pre>
</details>
<details><summary>Meta description quality [answer-readiness/meta-description]</summary>

<pre>all — WARN — Primary result
Meta description does not describe this page — it shares no term with the title or H1.
Finding: Description: &quot;This is a solar-powered website, which means it sometimes goes offline&quot; · Page subject: &quot;LOW←TECH MAGAZINE LOW←TECH MAGAZINE&quot;
Selected URLs: 
  https://solar.lowtechmagazine.com/
Input URLs: 
  https://solar.lowtechmagazine.com/
Unread URLs: none
Suggested fix: Google uses the meta description when it &quot;might give users a more accurate description of the page&quot;, and asks for page-specific descriptions rather than boilerplate. A description with no term in common with the page&#039;s own title or heading is describing something else.</pre>
</details>
<details><summary>og:image:alt present [answer-readiness/og-image-alt]</summary>

<pre>all — FAIL — Advisory — not scored
og:image is set but og:image:alt is missing.
Finding: Not found
Selected URLs: 
  https://solar.lowtechmagazine.com/
Input URLs: 
  https://solar.lowtechmagazine.com/
Unread URLs: none
Suggested fix: AI agents cannot process images directly and rely on og:image:alt text to understand your page&#039;s visual content. Without alt text, the OG image is invisible to text-based AI systems that generate answers and summaries about your page.</pre>
</details>
<details><summary>FAQ sections present [answer-readiness/faq-sections]</summary>

<pre>all — FAIL — Advisory — not scored
No FAQ sections found (headings, FAQPage JSON-LD, or accordions).
Finding: Not found
Selected URLs: 
  https://solar.lowtechmagazine.com/
Input URLs: 
  https://solar.lowtechmagazine.com/
Unread URLs: none
Suggested fix: FAQ sections with clear question headings are the highest-priority extraction target for AI-generated answers. Structure each Q&amp;A with a question heading followed by a direct answer paragraph.</pre>
</details>
<details><summary>Question-formatted headings [answer-readiness/question-headings]</summary>

<pre>all — WARN — Advisory — not scored
Only 1 question-formatted heading found out of 18 H2/H3 headings.
Finding: How to Build an Electrically Heated Table?
Selected URLs: 
  https://solar.lowtechmagazine.com/
Input URLs: 
  https://solar.lowtechmagazine.com/
Unread URLs: none
Suggested fix: Adding more question-formatted H2/H3 headings increases the number of user queries your content can match, boosting your visibility in AI-generated answers and &quot;People Also Ask&quot; results.</pre>
</details>
<details><summary>Specific numbers and data points [answer-readiness/specific-numbers]</summary>

<pre>all — FAIL — Primary result
No specific numbers, percentages, or dollar amounts found in content.
Finding: Not found
Selected URLs: 
  https://solar.lowtechmagazine.com/
Input URLs: 
  https://solar.lowtechmagazine.com/
Unread URLs: none
Suggested fix: AI answer engines strongly prefer content with concrete data points over vague claims. Pages with specific numbers, percentages, and metrics are ranked higher for data-driven queries because agents can cite exact figures in generated answers rather than paraphrasing vague language.</pre>
</details>
<details><summary>Trust and evidence signals on homepage [answer-readiness/trust-signals]</summary>

<pre>declared — WARN — Primary result
Homepage carries only 1 of the 2 GEO-measured trust factor(s).
Finding: evidence-backed claims (3 outbound citation host(s): www.notechmagazine.com, d69baa34.sibforms.com, www.patreon.com)
Selected URLs: 
  https://solar.lowtechmagazine.com/
Input URLs: 
  https://solar.lowtechmagazine.com/
Unread URLs: none
Suggested fix: Missing: quantified social proof (a rating, review count or customer count). These are the factors a 252,000-trial study measured as moving AI citation, and a pass needs every one still in scope here. Promotional adjectives are not among them.</pre>
</details>
<details><summary>Review/testimonial signals [answer-readiness/review-signals]</summary>

<pre>declared — FAIL — Primary result
No review or testimonial signals found.
Finding: Not found
Selected URLs: 
  https://solar.lowtechmagazine.com/
Input URLs: 
  https://solar.lowtechmagazine.com/
Unread URLs: none
Suggested fix: AI generative engines use reviews and testimonials as social proof when recommending your product or service. Attributed quotations and Review/AggregateRating schema make social proof machine-readable, giving agents concrete evidence to cite when users ask &quot;is X any good?&quot;.</pre>
</details>
<details><summary>Text-fragment citation addressability [answer-readiness/text-fragment-addressability]</summary>

<pre>all — WARN — Primary result
3 answer span(s) carry a normalization hazard — smart quote — which the matcher compares literally, so a fragment copied from rendered text can miss. Example: &quot;A pleasure to drive, Low-tech Magazine’s handcart demonstrates the advantages of slow, human-powered transportation.&quot;.
Finding: 15/15 answer span(s) addressable; e.g. https://solar.lowtechmagazine.com/#:~:text=The%20newest%20Low%2Dtech%20Magazine%20book%20collects%20twenty%20articles%20and%20guides%20published%20between%202022%20and%202026. https://solar.lowtechmagazine.com/#:~:text=A%20pleasure%20to%20drive%2C%20Low%2Dtech%20Magazine%E2%80%99s%20handcart%20demonstrates%20the%20advantages%20of%20slow%2C%20human%2Dpowered%20transportation. https://solar.lowtechmagazine.com/#:~:text=Low%2Dtech%20Magazine%E2%80%99s%20original%20book%20series%20is%20available%20again%2C%20redesigned%20and%20based%20on%20the%20edits%20made%20for%20the%20compressed%20edition.
Selected URLs: 
  https://solar.lowtechmagazine.com/
Input URLs: 
  https://solar.lowtechmagazine.com/
Unread URLs: none
Suggested fix: Determines whether a citing surface can construct a working `#:~:text=` deep link to the page&#039;s actual answer sentences. Hard-fails on the documented `Document-Policy: force-load-at-top` opt-out header, then simulates the spec&#039;s matching algorithm over the parsed DOM to prove each candidate answer span is (a) contained in a single block-level element, (b) unambiguous or disambiguable with a same-block prefix/suffix, and (c) free of characters that break normalization. Outputs the working fragment URLs as a fix artifact.</pre>
</details>
<details><summary>Sections stop making sense once retrieved on their own [answer-readiness/chunk-boundary-referent-integrity]</summary>

<pre>all — WARN — Primary result
2 of 13 sections lose their referent when retrieved alone.
Finding: 85% self-contained
Selected URLs: 
  https://solar.lowtechmagazine.com/
Input URLs: 
  https://solar.lowtechmagazine.com/
Unread URLs: none
Suggested fix: Name the subject in the sections flagged below.</pre>
</details>
<details><summary>Facts on this page do not survive the extractors that read it [answer-readiness/extractor-survival-recall]</summary>

<pre>all — FAIL — Primary result
14 of 16 key spans do not survive the extractors an agent uses.
Finding: 13% of facts survive
Selected URLs: 
  https://solar.lowtechmagazine.com/
Input URLs: 
  https://solar.lowtechmagazine.com/
Unread URLs: none
Suggested fix: Move the facts into the main content container, or repeat them in the prose.</pre>
</details>
<details><summary>Sections are longer than the window that will chunk them [answer-readiness/section-split-risk-profile]</summary>

<pre>all — FAIL — Primary result
The page has no headings to cut on, so every chunk after the first arrives without one.
Finding: 0% inside the window
Selected URLs: 
  https://solar.lowtechmagazine.com/
Input URLs: 
  https://solar.lowtechmagazine.com/
Unread URLs: none
Suggested fix: Add an h2 or h3 roughly every 400 tokens of prose.</pre>
</details>
<details><summary>AI Catalog exists [agent-interfaces/ai-catalog-exists]</summary>

<pre>all — FAIL — Advisory — not scored
Neither /.well-known/ard.json nor /.well-known/ai-catalog.json is served (/.well-known/ard.json: HTTP 404; /.well-known/ai-catalog.json: HTTP 404).
Finding: /.well-known/ard.json: HTTP 404; /.well-known/ai-catalog.json: HTTP 404
Selected URLs: 
  https://solar.lowtechmagazine.com/
Input URLs: 
  https://solar.lowtechmagazine.com/
Unread URLs: none
Suggested fix: The AI catalog is the ARD discovery manifest that tells AI agents which MCP servers, agent cards, skills and API descriptions your site offers. Hugging Face&#039;s hf-discover resolves it at /.well-known/ai-catalog.json and reads its entries; without it, agents must probe endpoints to work out what your site can do.</pre>
</details>
<details><summary>ACP link-surface completeness [agentic-commerce/acp-policy-link-surface]</summary>

<pre>all — FAIL — Primary result
A hard-gate policy link is unusable, so is_eligible_checkout cannot be set and the catalogue is excluded from Instant Checkout: terms_of_use has no link anywhere on the scanned pages.
Finding: 2/8 ACP link types resolve; privacy_policy=https://solar.lowtechmagazine.com/privacy/ about_us=https://solar.lowtechmagazine.com/about/
Selected URLs: 
  https://solar.lowtechmagazine.com/
Input URLs: 
  https://solar.lowtechmagazine.com/
Unread URLs: none
Suggested fix: Verifies the merchant can populate the `links` array that every ACP CheckoutSession response is required to carry, by resolving each of the 8 enum link types to a stable, HTTPS, no-JS-required, non-soft-404 URL, on any domain, as an HTML page or a PDF.</pre>
</details>
<details><summary>Contact/lead form endpoint [operability-safety/contact-form]</summary>

<pre>all — FAIL — Advisory — not scored
No contact/lead form or POST contact endpoint found.
Finding: No contact form detected
Selected URLs: 
  https://solar.lowtechmagazine.com/
Input URLs: 
  https://solar.lowtechmagazine.com/
Unread URLs: none
Suggested fix: AI agents increasingly handle tasks like &quot;contact this company for a quote&quot; on behalf of users. Without a machine-submittable contact form, agents cannot complete these requests, sending users to competitors who have one. Provide an HTML form or an API endpoint.</pre>
</details>
<details><summary>Duplicate landmarks without distinguishing labels [operability-safety/landmark-unique]</summary>

<pre>all — FAIL — Primary result
Duplicate landmarks without distinguishing labels — accessibility violations found.
Finding: Failing element(s): nav#menu
Selected URLs: 
  https://solar.lowtechmagazine.com/
Input URLs: 
  https://solar.lowtechmagazine.com/
Unread URLs: none
Suggested fix: AI browser agents traverse the accessibility tree and use a landmark’s role plus accessible name to target the right region. Two landmarks of the same role (e.g. a primary &lt;nav&gt; and a footer &lt;nav&gt;) without unique labels are indistinguishable, causing agents to act on the wrong region. A single unlabeled landmark is unambiguous and is not flagged.</pre>
</details>
<details><summary>Buttons or links without accessible names [operability-safety/accessible-names]</summary>

<pre>all — FAIL — Primary result
Buttons or links without accessible names — accessibility violations found.
Finding: Failing element(s): a; a; a; a; a
Selected URLs: 
  https://solar.lowtechmagazine.com/
Input URLs: 
  https://solar.lowtechmagazine.com/
Unread URLs: none
Suggested fix: AI browser agents identify clickable elements by their accessible name in the accessibility tree. Buttons and links (including icon-only controls) without text, aria-label, or aria-labelledby are invisible to agents, so they cannot navigate the site or trigger actions.</pre>
</details>
<details><summary>Ghost-clickable elements: click targets an agent cannot address [operability-safety/ghost-clickable-element-ratio]</summary>

<pre>all — WARN — Primary result
1 of 52 click target(s) never reach an agent&#039;s snapshot. The page stays above the 0.90 floor, but each ghost is a control no agent can click. First: &lt;div#lang-menu&gt; (no role).
Finding: ratio 0.98 — 1 ghost of 52 click target(s) (no role)
Selected URLs: 
  https://solar.lowtechmagazine.com/
Input URLs: 
  https://solar.lowtechmagazine.com/
Unread URLs: none
Suggested fix: Measures the share of on-page click targets that a DOM/accessibility-tree agent cannot address at all: elements that look and behave clickable to a human or a vision model but expose no native or ARIA role and no accessible name, so they never appear in a Playwright-MCP style snapshot. Reported as semantic / (semantic + ghost) over the served markup and its same-origin stylesheets, with the reason each ghost is unaddressable.</pre>
</details>
<details><summary>Hover-only navigation and content [operability-safety/hover-only-content-and-navigation]</summary>

<pre>all — WARN — Primary result
Navigation is reachable, but 3 piece(s) of information are drawn only on hover, so an agent never reads them. First: &quot;Power&quot;.
Finding: 3 title-only string(s)
Selected URLs: 
  https://solar.lowtechmagazine.com/
Input URLs: 
  https://solar.lowtechmagazine.com/
Unread URLs: none
Suggested fix: Detects navigation subtrees and information that exist in the DOM only while a pointer hovers — `:hover`-revealed submenus with no focus or `aria-expanded` equivalent, and content carried solely in `title` attributes or hover cards. Reports each destination URL an agent never discovers.</pre>
</details>
<details><summary>Third-party DOM-write blast radius [operability-safety/third-party-dom-write-blast-radius]</summary>

<pre>all — FAIL — Primary result
1 third-party origin(s) can write into the DOM an agent reads, with no Content-Security-Policy that constrains what runs and 1 of them unpinned by `integrity`: plausible.io. Each is a separate host, and a separate supply chain, with the site&#039;s own authority over what an agent believes.
Finding: 1 third-party script origin(s) [1-3]: plausible.io; CSP from none, not constraining; runtime-injected tags not counted
Selected URLs: 
  https://solar.lowtechmagazine.com/
Input URLs: 
  https://solar.lowtechmagazine.com/
Unread URLs: none
Suggested fix: Counts how many separate companies can write text into the DOM an agent reads: every registrable domain shipping a script or stylesheet into the page, judged against whether the Content-Security-Policy actually constrains what may run, and whether each resource is pinned with an `integrity` hash. Cross-origin frames with no `sandbox` are reported alongside. The origin list is the deliverable.</pre>
</details>
</details>


*Generated by [Agent Lighthouse](https://forkpoint.github.io/agent-lighthouse/) · Open-source website checks for AI readiness. [Apache-2.0](https://github.com/ForkPoint/agent-lighthouse)*
