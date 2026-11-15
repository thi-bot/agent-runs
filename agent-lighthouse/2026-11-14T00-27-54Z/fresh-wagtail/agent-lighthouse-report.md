[![Agent Lighthouse](https://forkpoint.github.io/agent-lighthouse/brand/kit/icons/icon-64.png "Agent Lighthouse logo")](https://forkpoint.github.io/agent-lighthouse/)

### Agent Lighthouse — AI readiness report

**Target:** `https://wagtail.org/`  
**Overall Score:** **`86/100`** *(partially-ready)*  
**Pages Audited:** `1` | **Duration:** `20.4s`

**Scan Conditions:**  
- **Page Type:** `homepage` (declared)
- **Origin Evidence:** `fresh` (version: `v2`, read at: `2026-11-14T00:29:56.915Z`)
- **Evidence Coverage:** `83 / 132.2` mass (63%) — page: `88.4`, origin: `43.8`, gated: `0`
- **Unscored Checks:** `122` (58 advisory, 0 gated)
- **Budget:** `20 s` of 180 s


| Category | Score | Breakdown |
| :--- | :---: | :--- |
| **Access & Crawl Control** | **100 / 100** | 🟢 26✓ 0! 0✗ |
| **Machine Discovery** | **100 / 100** | 🟢 21✓ 0! 0✗ (7 not scored) |
| **Agent Interfaces** | _Not assessed_ | ⚪ 0✓ 0! 1✗ (1 not scored) |
| **Agentic Commerce** | **50 / 100** | 🟡 1✓ 0! 1✗ |
| **Content Extraction** | **72 / 100** | 🔵 12✓ 3! 5✗ (3 not scored) |
| **Structured Data** | **100 / 100** | 🟢 3✓ 0! 0✗ |
| **Answer Readiness** | **70 / 100** | 🔵 13✓ 1! 6✗ (8 not scored) |
| **Agent Operability & Safety** | **79 / 100** | 🔵 21✓ 3! 4✗ (3 not scored) |

> 22 advisory checks ran. They are reported but never scored.

#### No AI vendor reads this

- **llms.txt exists** — No AI vendor documents reading llms.txt or llms-full.txt from a website. In a 137,210-domain study, 97% of llms.txt files received no requests in a month, and AI tools never requested a missing one. [Evidence](https://ahrefs.com/blog/llmstxt-study/)
- **llms.txt is well-formed** — No AI vendor documents reading llms.txt or llms-full.txt from a website. In a 137,210-domain study, 97% of llms.txt files received no requests in a month, and AI tools never requested a missing one. [Evidence](https://ahrefs.com/blog/llmstxt-study/)
- **llms.txt links include descriptions** — No AI vendor documents reading llms.txt or llms-full.txt from a website. In a 137,210-domain study, 97% of llms.txt files received no requests in a month, and AI tools never requested a missing one. [Evidence](https://ahrefs.com/blog/llmstxt-study/)
- **llms.txt links are valid** — No AI vendor documents reading llms.txt or llms-full.txt from a website. In a 137,210-domain study, 97% of llms.txt files received no requests in a month, and AI tools never requested a missing one. [Evidence](https://ahrefs.com/blog/llmstxt-study/)
- **RSS feed content complete** — No search engine or AI vendor documents reading full article text from a feed. Documented consumers take URLs from feeds and fetch the article page itself. Instead: Keep the feed for URL discovery (machine-discovery/rss-feed). Excerpt feeds are valid. [Evidence](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
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
https://wagtail.org/: homepage (declared, strong)
  Signals: declared:homepage
Fetch: https://wagtail.org/ — read, HTTP 200; homepage (declared)</pre>

Input URLs are pages supplied to the audit. Results cover this sample. Origin evidence may also support a result. Each audit counts toward the score at most once.

<details><summary>Semantic list usage [content-extraction/semantic-lists]</summary>

<pre>all — WARN — Primary result
2 of 6 content list(s) are div stacks or numbered prose rather than list markup.
Finding: 4 semantic list(s) vs 2 pseudo-list(s); 0 definition element(s); 0 step list(s)
Selected URLs: 
  https://wagtail.org/
Input URLs: 
  https://wagtail.org/
Unread URLs: none
Suggested fix: Lists built from styled divs, broken &lt;dl&gt; markup or manually numbered paragraphs lose their item boundaries when a page is converted to markdown or serialized into an accessibility tree, which is how extraction pipelines and browsing agents read it.</pre>
</details>
<details><summary>Machine-readable time markup [content-extraction/time-element]</summary>

<pre>all — FAIL — Advisory — not scored
No machine-readable time markup found on date-bearing pages.
Finding: 0/1 date-bearing pages have time markup
Selected URLs: 
  https://wagtail.org/
Input URLs: 
  https://wagtail.org/
Unread URLs: none
Suggested fix: Wrap all dates and times in &lt;time&gt; elements with a datetime attribute in ISO 8601 format (YYYY-MM-DD or YYYY-MM-DDThh:mm:ss). Include publication dates, event dates, and last-modified dates.</pre>
</details>
<details><summary>&lt;figure&gt; + &lt;figcaption&gt; usage [content-extraction/figure-figcaption]</summary>

<pre>all — WARN — Advisory — not scored
No &lt;figure&gt; elements found, but 21 image(s) exist that could benefit from &lt;figure&gt;/&lt;figcaption&gt;.
Finding: No &lt;figure&gt; elements
Selected URLs: 
  https://wagtail.org/
Input URLs: 
  https://wagtail.org/
Unread URLs: none
Suggested fix: AI agents use &lt;figcaption&gt; to understand the context and purpose of images beyond what alt text provides. Wrapping images in &lt;figure&gt; with &lt;figcaption&gt; gives agents a richer description that can be cited in AI-generated explanations.</pre>
</details>
<details><summary>Large inline SVGs bloating agent context [content-extraction/svg-bloat]</summary>

<pre>all — FAIL — Primary result
267 SVG(s) total, 195 unhidden, 89.5KB unhidden bytes across 1 page(s). Severe SVG context bloat detected — largest unhidden SVG is 67.9KB.
Finding: 267 SVG(s) total, 195 unhidden, 89.5KB unhidden bytes across 1 page(s). Top offenders:
67.9KB at https://wagtail.org/: &lt;svg xmlns=&quot;http://www.w3.org/2000/svg&quot; style=&quot;display: none;&quot;&gt; &lt;symbol id=&quot;arrow&quot; fill=&quot;currentColor&quot; viewBox=&quot;0 0 256 ...
Selected URLs: 
  https://wagtail.org/
Input URLs: 
  https://wagtail.org/
Unread URLs: none
Suggested fix: Large unhidden inline SVGs are inlined as path-data tokens when an LLM reads your page, consuming thousands of tokens of agent context. Mark decorative SVGs aria-hidden=&quot;true&quot;, simplify paths with SVGO, or move complex graphics to external files.</pre>
</details>
<details><summary>Lean token-to-content ratio [content-extraction/token-ratio]</summary>

<pre>all — FAIL — Primary result
Homepage is only 0.8% content by token weight — the page is almost entirely markup noise.
Finding: 0.8% content (586 of 77951 o200k tokens, extracted by readability)
Selected URLs: 
  https://wagtail.org/
Input URLs: 
  https://wagtail.org/
Unread URLs: none
Suggested fix: AI agents pay for every token of raw HTML they download, but only the visible text carries meaning. A content share under 5% means an agent parses more than 20 tokens of noise for every token of content, and the page may be truncated before the real content is read. Move inline assets to external files, remove unused boilerplate, and flatten markup.</pre>
</details>
<details><summary>Fake headings detected [content-extraction/fake-headings]</summary>

<pre>all — FAIL — Primary result
Found 9 fake heading(s) — generic elements styled to look like headings instead of &lt;h1&gt;-&lt;h6&gt; tags.
Finding: https://wagtail.org/: &lt;p class=&quot;hero__subheading intro-big&quot;&gt; &quot;Wagtail is the leading open-source Python CMS&quot;; https://wagtail.org/: &lt;p class=&quot;headline__subheading intro-big&quot;&gt; &quot;A CMS trusted by organisations you know&quot;; https://wagtail.org/: &lt;p class=&quot;headline__subheading intro-big&quot;&gt; &quot;Make your editors happy. And your developers too.&quot;; https://wagtail.org/: &lt;span class=&quot;highlight__meta-text heading-four&quot;&gt; &quot;StreamField&quot;; https://wagtail.org/: &lt;p class=&quot;headline__subheading intro-big&quot;&gt; &quot;Wagtail helps your whole team do their best work&quot;
Selected URLs: 
  https://wagtail.org/
Input URLs: 
  https://wagtail.org/
Unread URLs: none
Suggested fix: AI agents chunk and outline page content by reading real &lt;h1&gt;–&lt;h6&gt; tags. Elements styled to look like headings are invisible to that outline, so sections cannot be navigated, summarized, or cited correctly. Replace styled generic elements with the appropriate heading level.</pre>
</details>
<details><summary>Ghost content: CSS-hidden text ingested as visible [content-extraction/css-hidden-ghost-content]</summary>

<pre>all — FAIL — Primary result
1499 est. tokens (55.3% of page text) are hidden only by stylesheet rules, which no non-rendering extractor evaluates. Largest: &quot;.header__nav--mobile&quot; (display:none). 1 block(s) duplicate text that is already visible, so the agent reads the same copy twice.
Finding: 1499 est. tokens hidden by CSS class across 29 block(s), 55.3% of page text
Selected URLs: 
  https://wagtail.org/
Input URLs: 
  https://wagtail.org/
Unread URLs: none
Suggested fix: Find text that is hidden from human readers by an external stylesheet class but is invisible-as-hidden to every extractor an agent uses, and size it in tokens. Fail if class-hidden text exceeds 15% of the page&#039;s total text tokens or 1,000 tokens absolute; separately fail on near-duplicate hidden blocks (a mobile nav or tab-panel set duplicating visible content). Report contradiction risk when hidden text contains prices, availability, or dated claims.</pre>
</details>
<details><summary>What an agent reads from this page depends on which extractor it uses [content-extraction/extraction-determinism]</summary>

<pre>all — WARN — Primary result
The extractors partly disagree about what this page says (0.66 overlap).
Finding: 0.66 worst-pair agreement
Selected URLs: 
  https://wagtail.org/
Input URLs: 
  https://wagtail.org/
Unread URLs: none
Suggested fix: Move chrome out of the main container so every extractor keeps the same text.</pre>
</details>
<details><summary>Organization schema [structured-data/organization-schema]</summary>

<pre>declared — PASS — Primary result
Organization schema found with name, url, and logo.
Finding: Complete Organization schema
Selected URLs: 
  https://wagtail.org/
Input URLs: 
  https://wagtail.org/
Unread URLs: none</pre>
</details>
<details><summary>LocalBusiness/ProfessionalService schema [structured-data/local-business-schema]</summary>

<pre>declared — NA — Not assessed — not scored
No physical store signals detected (no PostalAddress block paired with a store-locator link).
Finding: No physical location indicators found.
Selected URLs: 
  https://wagtail.org/
Input URLs: 
  https://wagtail.org/
Unread URLs: none</pre>
</details>
<details><summary>Review/AggregateRating schema [structured-data/review-schema]</summary>

<pre>declared — NA — Not assessed — not scored
No review or testimonial content detected to evaluate.
Finding: No review components, star-rating widgets or review markup found.
Selected URLs: 
  https://wagtail.org/
Input URLs: 
  https://wagtail.org/
Unread URLs: none</pre>
</details>
<details><summary>og:image:alt present [answer-readiness/og-image-alt]</summary>

<pre>all — FAIL — Advisory — not scored
og:image is set but og:image:alt is missing.
Finding: Not found
Selected URLs: 
  https://wagtail.org/
Input URLs: 
  https://wagtail.org/
Unread URLs: none
Suggested fix: AI agents cannot process images directly and rely on og:image:alt text to understand your page&#039;s visual content. Without alt text, the OG image is invisible to text-based AI systems that generate answers and summaries about your page.</pre>
</details>
<details><summary>Comparison tables present [answer-readiness/comparison-tables]</summary>

<pre>all — FAIL — Advisory — not scored
No data tables found on comparison pages.
Finding: 0/1 comparison pages have data tables
Selected URLs: 
  https://wagtail.org/
Input URLs: 
  https://wagtail.org/
Unread URLs: none
Suggested fix: Add HTML &lt;table&gt; elements with proper &lt;thead&gt; and &lt;th&gt; headers for any comparative content on your pages. Ensure each column has a descriptive header.</pre>
</details>
<details><summary>About page with credentials [answer-readiness/about-credentials]</summary>

<pre>all — FAIL — Advisory — not scored
No about page found at /about/, /about-us/, /about, /pages/about, /pages/about-us, /pages/our-story, /our-story.
Finding: About page not found
Selected URLs: 
  https://wagtail.org/
Input URLs: 
  https://wagtail.org/
Unread URLs: none
Suggested fix: AI engines crawl your about page to build an organizational authority profile. Without an about page containing team credentials, expertise, and experience details, agents cannot assess your organization&#039;s authority, reducing your content&#039;s trust score in AI-generated recommendations.</pre>
</details>
<details><summary>Trust and evidence signals on homepage [answer-readiness/trust-signals]</summary>

<pre>declared — WARN — Primary result
Homepage carries only 1 of the 2 GEO-measured trust factor(s).
Finding: evidence-backed claims (4 outbound citation host(s): docs.wagtail.org, github.com, guide.wagtail.org)
Selected URLs: 
  https://wagtail.org/
Input URLs: 
  https://wagtail.org/
Unread URLs: none
Suggested fix: Missing: quantified social proof (a rating, review count or customer count). These are the factors a 252,000-trial study measured as moving AI citation, and a pass needs every one still in scope here. Promotional adjectives are not among them.</pre>
</details>
<details><summary>Review/testimonial signals [answer-readiness/review-signals]</summary>

<pre>declared — FAIL — Primary result
No review or testimonial signals found. Attribution is what separates a testimonial from decoration.
Finding: 2 unattributed pull-quote(s), no attribution
Selected URLs: 
  https://wagtail.org/
Input URLs: 
  https://wagtail.org/
Unread URLs: none
Suggested fix: AI generative engines use reviews and testimonials as social proof when recommending your product or service. Attributed quotations and Review/AggregateRating schema make social proof machine-readable, giving agents concrete evidence to cite when users ask &quot;is X any good?&quot;.</pre>
</details>
<details><summary>Text-fragment citation addressability [answer-readiness/text-fragment-addressability]</summary>

<pre>all — FAIL — Primary result
3 of 25 answer span(s) cannot be reached by a text fragment, so a citation link degrades to page-top. Example — first sentence after &quot;Give Wagtail a go&quot;: the span occurs more than once and its block offers no prefix or suffix to disambiguate it: &quot;You can deploy a working Wagtail site in as little as 15 minutes.&quot;.
Finding: 22/25 answer span(s) addressable; e.g. https://wagtail.org/#:~:text=Read%20the%20docs.,-Learn%20the%20code. https://wagtail.org/#:~:text=A%20CMS%20trusted%20by%20organisations%20you%20know https://wagtail.org/#:~:text=Meet%20Nicolas%20Leung%20from%20M%2B%20in%20Hong%20Kong%20and%20discover%20how%20they%20used%20headless%20Wagtail%20to%20build%20a%20solid%20digital%20foundation%20for%20their%20museum.
Selected URLs: 
  https://wagtail.org/
Input URLs: 
  https://wagtail.org/
Unread URLs: none
Suggested fix: Determines whether a citing surface can construct a working `#:~:text=` deep link to the page&#039;s actual answer sentences. Hard-fails on the documented `Document-Policy: force-load-at-top` opt-out header, then simulates the spec&#039;s matching algorithm over the parsed DOM to prove each candidate answer span is (a) contained in a single block-level element, (b) unambiguous or disambiguable with a same-block prefix/suffix, and (c) free of characters that break normalization. Outputs the working fragment URLs as a fix artifact.</pre>
</details>
<details><summary>Facts on this page do not survive the extractors that read it [answer-readiness/extractor-survival-recall]</summary>

<pre>all — FAIL — Primary result
56 of 75 key spans do not survive the extractors an agent uses.
Finding: 25% of facts survive
Selected URLs: 
  https://wagtail.org/
Input URLs: 
  https://wagtail.org/
Unread URLs: none
Suggested fix: Move the facts into the main content container, or repeat them in the prose.</pre>
</details>
<details><summary>AI Catalog exists [agent-interfaces/ai-catalog-exists]</summary>

<pre>all — FAIL — Advisory — not scored
Neither /.well-known/ard.json nor /.well-known/ai-catalog.json is served (/.well-known/ard.json: HTTP 404; /.well-known/ai-catalog.json: HTTP 404).
Finding: /.well-known/ard.json: HTTP 404; /.well-known/ai-catalog.json: HTTP 404
Selected URLs: 
  https://wagtail.org/
Input URLs: 
  https://wagtail.org/
Unread URLs: none
Suggested fix: The AI catalog is the ARD discovery manifest that tells AI agents which MCP servers, agent cards, skills and API descriptions your site offers. Hugging Face&#039;s hf-discover resolves it at /.well-known/ai-catalog.json and reads its entries; without it, agents must probe endpoints to work out what your site can do.</pre>
</details>
<details><summary>ACP link-surface completeness [agentic-commerce/acp-policy-link-surface]</summary>

<pre>all — FAIL — Primary result
A hard-gate policy link is unusable, so is_eligible_checkout cannot be set and the catalogue is excluded from Instant Checkout: terms_of_use has no link anywhere on the scanned pages.
Finding: 5/8 ACP link types resolve; privacy_policy=https://wagtail.org/privacy/ contact_us=https://wagtail.org/contact/ about_us=https://wagtail.org/about-wagtail/ faq=https://wagtail.org/faqs/ support=https://wagtail.org/sponsor/
Selected URLs: 
  https://wagtail.org/
Input URLs: 
  https://wagtail.org/
Unread URLs: none
Suggested fix: Verifies the merchant can populate the `links` array that every ACP CheckoutSession response is required to carry, by resolving each of the 8 enum link types to a stable, HTTPS, no-JS-required, non-soft-404 URL, on any domain, as an HTML page or a PDF.</pre>
</details>
<details><summary>Form backend actionability [operability-safety/form-actionability]</summary>

<pre>all — WARN — Primary result
2/3 form fields are fully actionable — agents will struggle with the rest.
Finding: 2/3 fields actionable (67%). Non-actionable: form #0 input[name=&quot;query&quot; type=&quot;search&quot;]: missing autocomplete (identity field, expected token like &quot;tel&quot;)
Selected URLs: 
  https://wagtail.org/
Input URLs: 
  https://wagtail.org/
Unread URLs: none
Suggested fix: Use native input/select/textarea elements (never divs with role=&quot;textbox&quot; or contenteditable), give every field a name attribute, associate it with a &lt;label for=&quot;id&quot;&gt;, wrapping &lt;label&gt;, aria-label, or aria-labelledby, and add standard autocomplete tokens (email, tel, name, street-address, postal-code, country-name) to identity fields. A declarative WebMCP form (&lt;form toolname=…&gt;) takes each control name as a property of its generated tool input schema, so a nameless control is not callable.</pre>
</details>
<details><summary>Duplicate landmarks without distinguishing labels [operability-safety/landmark-unique]</summary>

<pre>all — FAIL — Primary result
Duplicate landmarks without distinguishing labels — accessibility violations found.
Finding: Failing element(s): nav.primary-nav
Selected URLs: 
  https://wagtail.org/
Input URLs: 
  https://wagtail.org/
Unread URLs: none
Suggested fix: AI browser agents traverse the accessibility tree and use a landmark’s role plus accessible name to target the right region. Two landmarks of the same role (e.g. a primary &lt;nav&gt; and a footer &lt;nav&gt;) without unique labels are indistinguishable, causing agents to act on the wrong region. A single unlabeled landmark is unambiguous and is not flagged.</pre>
</details>
<details><summary>Form fields wired to their validation messages [operability-safety/form-error-messages]</summary>

<pre>all — FAIL — Primary result
None of the 1 required field(s) carry a resolvable aria-errormessage or aria-describedby, so an agent has no way to read why a submission was rejected.
Finding: 0 of 1 required field(s) reference a message element
Selected URLs: 
  https://wagtail.org/
Input URLs: 
  https://wagtail.org/
Unread URLs: none
Suggested fix: An agent filling a form reads the accessibility tree, where a message is attached to a field by aria-errormessage or aria-describedby. Fields the server rendered as aria-invalid are checked directly; where a page carries no invalid state — the normal case on a GET, since error markup is injected after a failed submit — the required fields are checked instead, because those are the ones that can fail.</pre>
</details>
<details><summary>Accessibility-Layer Injection Scan [operability-safety/aria-layer-injection-scan]</summary>

<pre>all — WARN — Primary result
1 aria-label(s) share under 30% of their element&#039;s own visible tokens. Neither matches an instruction pattern, but both are the slot a payload is smuggled in and both are already accessibility defects.
Finding: 1 anomalous value(s) across 216 scanned
Selected URLs: 
  https://wagtail.org/
Input URLs: 
  https://wagtail.org/
Unread URLs: none
Suggested fix: Audit the text that reaches an agent through the accessibility tree and non-visual attributes rather than through body copy: alt, aria-label, aria-labelledby targets, aria-description, title, placeholder, hidden input values, &lt;option&gt; labels, document title and og:* metadata. Flag instruction-shaped content, anomalously long values, and aria-label/visible-text divergence.</pre>
</details>
<details><summary>Ghost-clickable elements: click targets an agent cannot address [operability-safety/ghost-clickable-element-ratio]</summary>

<pre>all — WARN — Primary result
5 of 213 click target(s) never reach an agent&#039;s snapshot. The page stays above the 0.90 floor, but each ghost is a control no agent can click. First: &lt;div.headline__button-wrap&gt; (no role).
Finding: ratio 0.98 — 5 ghost of 213 click target(s) (no role)
Selected URLs: 
  https://wagtail.org/
Input URLs: 
  https://wagtail.org/
Unread URLs: none
Suggested fix: Measures the share of on-page click targets that a DOM/accessibility-tree agent cannot address at all: elements that look and behave clickable to a human or a vision model but expose no native or ARIA role and no accessible name, so they never appear in a Playwright-MCP style snapshot. Reported as semantic / (semantic + ghost) over the served markup and its same-origin stylesheets, with the reason each ghost is unaddressable.</pre>
</details>
<details><summary>Stateful controls: current state readable by an agent [operability-safety/stateful-control-introspectability]</summary>

<pre>all — FAIL — Primary result
1 of 7 state-bearing control(s) hold their state where no snapshot can read it, so an agent cannot verify that its click did anything. Missing: aria-expanded. First: &lt;button.header__button.header__button--search.u-desktop-only&gt;.
Finding: ratio 0.86 — 1 opaque of 7 state-bearing control(s)
Selected URLs: 
  https://wagtail.org/
Input URLs: 
  https://wagtail.org/
Unread URLs: none
Suggested fix: Checks that every control whose purpose is to hold a state — toggles, switches, checkboxes, radio groups, tabs, accordions, disclosure triggers, sort direction, filter chips — exposes that state through a machine-readable attribute rather than a CSS class alone. Reports the count of state-bearing controls whose current value an agent cannot read, each with the class that carries the state instead.</pre>
</details>
<details><summary>Third-party DOM-write blast radius [operability-safety/third-party-dom-write-blast-radius]</summary>

<pre>all — FAIL — Primary result
1 third-party origin(s) can write into the DOM an agent reads, with no Content-Security-Policy that constrains what runs and 1 of them unpinned by `integrity`: plausible.io. Each is a separate host, and a separate supply chain, with the site&#039;s own authority over what an agent believes.
Finding: 1 third-party script origin(s) [1-3]: plausible.io; CSP from none, not constraining; runtime-injected tags not counted
Selected URLs: 
  https://wagtail.org/
Input URLs: 
  https://wagtail.org/
Unread URLs: none
Suggested fix: Counts how many separate companies can write text into the DOM an agent reads: every registrable domain shipping a script or stylesheet into the page, judged against whether the Content-Security-Policy actually constrains what may run, and whether each resource is pinned with an `integrity` hash. Cross-origin frames with no `sandbox` are reported alongside. The origin list is the deliverable.</pre>
</details>
</details>


*Generated by [Agent Lighthouse](https://forkpoint.github.io/agent-lighthouse/) · Open-source website checks for AI readiness. [Apache-2.0](https://github.com/ForkPoint/agent-lighthouse)*
