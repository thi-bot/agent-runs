[![Agent Lighthouse](https://forkpoint.github.io/agent-lighthouse/brand/kit/icons/icon-64.png "Agent Lighthouse logo")](https://forkpoint.github.io/agent-lighthouse/)

### Agent Lighthouse — AI readiness report

**Target:** `https://blog.google/`  
**Overall Score:** **`84/100`** *(partially-ready)*  
**Pages Audited:** `1` | **Duration:** `39.7s`

**Scan Conditions:**  
- **Page Type:** `homepage` (declared)
- **Origin Evidence:** `fresh` (version: `v2`, read at: `2026-11-14T00:29:17.057Z`)
- **Evidence Coverage:** `82 / 132.2` mass (62%) — page: `88.4`, origin: `43.8`, gated: `0`
- **Unscored Checks:** `123` (58 advisory, 0 gated)
- **Budget:** `40 s` of 180 s


| Category | Score | Breakdown |
| :--- | :---: | :--- |
| **Access & Crawl Control** | **100 / 100** | 🟢 26✓ 0! 0✗ |
| **Machine Discovery** | **93 / 100** | 🟢 9✓ 1! 1✗ (1 not scored) |
| **Agent Interfaces** | _Not assessed_ | ⚪ 0✓ 0! 1✗ (1 not scored) |
| **Agentic Commerce** | **50 / 100** | 🟡 1✓ 0! 1✗ |
| **Content Extraction** | **71 / 100** | 🔵 14✓ 1! 8✗ (3 not scored) |
| **Structured Data** | **67 / 100** | 🟡 2✓ 0! 1✗ |
| **Answer Readiness** | **60 / 100** | 🟡 9✓ 3! 7✗ (7 not scored) |
| **Agent Operability & Safety** | **85 / 100** | 🔵 20✓ 3! 4✗ (2 not scored) |

> 14 advisory checks ran. They are reported but never scored.

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
https://blog.google/: homepage (declared, strong)
  Signals: declared:homepage
Fetch: https://blog.google/ — read, HTTP 200; homepage (declared)</pre>

Input URLs are pages supplied to the audit. Results cover this sample. Origin evidence may also support a result. Each audit counts toward the score at most once.

<details><summary>Single h1 per page [content-extraction/single-h1]</summary>

<pre>all — FAIL — Primary result
Page has 6 &lt;h1&gt; element(s); expected exactly 1.
Finding: 0/1 pages with exactly one &lt;h1&gt;. Affected pages: https://blog.google/: 6 &lt;h1&gt; element(s)
Selected URLs: 
  https://blog.google/
Input URLs: 
  https://blog.google/
Unread URLs: none
Suggested fix: AI agents use the single &lt;h1&gt; as the authoritative title of the page. Multiple &lt;h1&gt; elements create ambiguity about the page&#039;s primary topic, causing agents to misidentify or conflate subjects when generating answers. Ensure exactly one &lt;h1&gt; per page.</pre>
</details>
<details><summary>Sequential heading hierarchy [content-extraction/sequential-headings]</summary>

<pre>all — FAIL — Primary result
1/1 page(s) have heading level skips.
Finding: https://blog.google/: h1 -&gt; h3 (skipped h2)
Selected URLs: 
  https://blog.google/
Input URLs: 
  https://blog.google/
Unread URLs: none
Suggested fix: AI systems build content outlines from headings to understand document structure. Skipped levels (e.g., h1 to h3 without h2) break the hierarchy, causing agents to misinterpret section nesting and produce inaccurate content summaries. Fix heading levels to follow a sequential order.</pre>
</details>
<details><summary>&lt;aside&gt; for supplementary content [content-extraction/aside-element]</summary>

<pre>all — FAIL — Primary result
1 supplementary block(s) are in bare containers with no &lt;aside&gt; or role=&quot;complementary&quot; anywhere: &lt;section uni-landing-newsletter&gt;.
Finding: 0 marked, 1 unmarked — &lt;section uni-landing-newsletter&gt;
Selected URLs: 
  https://blog.google/
Input URLs: 
  https://blog.google/
Unread URLs: none
Suggested fix: Likely sidebar, promo and related-links containers lack explicit complementary landmarks. Readability and trafilatura may remove them through other heuristics, but the markup does not identify their supplementary role. Confirm that each block is supplementary before changing it; keep primary content outside &lt;aside&gt;.</pre>
</details>
<details><summary>&lt;section&gt; elements have headings or labels [content-extraction/section-headings]</summary>

<pre>all — FAIL — Primary result
8/20 &lt;section&gt; element(s) have a heading or label.
Finding: 8/20 labeled sections; 1 empty section(s) skipped
Selected URLs: 
  https://blog.google/
Input URLs: 
  https://blog.google/
Unread URLs: none
Suggested fix: AI agents use section headings to build a topic map of your page for retrieval-augmented generation (RAG). Unlabeled sections are opaque to AI systems that chunk content by semantic boundaries, reducing the quality of retrieved context for answer generation.</pre>
</details>
<details><summary>Machine-readable time markup [content-extraction/time-element]</summary>

<pre>all — FAIL — Advisory — not scored
No machine-readable time markup found on date-bearing pages.
Finding: 0/1 date-bearing pages have time markup
Selected URLs: 
  https://blog.google/
Input URLs: 
  https://blog.google/
Unread URLs: none
Suggested fix: Wrap all dates and times in &lt;time&gt; elements with a datetime attribute in ISO 8601 format (YYYY-MM-DD or YYYY-MM-DDThh:mm:ss). Include publication dates, event dates, and last-modified dates.</pre>
</details>
<details><summary>&lt;figure&gt; + &lt;figcaption&gt; usage [content-extraction/figure-figcaption]</summary>

<pre>all — WARN — Advisory — not scored
No &lt;figure&gt; elements found, but 10 image(s) exist that could benefit from &lt;figure&gt;/&lt;figcaption&gt;.
Finding: No &lt;figure&gt; elements
Selected URLs: 
  https://blog.google/
Input URLs: 
  https://blog.google/
Unread URLs: none
Suggested fix: AI agents use &lt;figcaption&gt; to understand the context and purpose of images beyond what alt text provides. Wrapping images in &lt;figure&gt; with &lt;figcaption&gt; gives agents a richer description that can be cited in AI-generated explanations.</pre>
</details>
<details><summary>Large inline SVGs bloating agent context [content-extraction/svg-bloat]</summary>

<pre>all — FAIL — Primary result
86 SVG(s) total, 1 unhidden, 165B unhidden bytes across 1 page(s). 31 inlined base64 payload(s) cost 20377 tokens (largest: image/svg+xml); a real URL plus alt text costs about 15. Inlined base64 assets alone cost 20377 tokens of agent context.
Finding: 86 SVG(s) total, 1 unhidden, 165B unhidden bytes across 1 page(s). 31 inlined base64 payload(s) cost 20377 tokens (largest: image/svg+xml); a real URL plus alt text costs about 15.
Selected URLs: 
  https://blog.google/
Input URLs: 
  https://blog.google/
Unread URLs: none
Suggested fix: Base64 data URIs are inlined verbatim into whatever an agent reads, and base64 tokenizes far worse per byte than prose. Move the asset to a real URL and give it descriptive alt text: a URL plus alt costs about 15 tokens and tells a model strictly more than 4,000 tokens of base64 ever will.</pre>
</details>
<details><summary>Lean token-to-content ratio [content-extraction/token-ratio]</summary>

<pre>all — FAIL — Primary result
Homepage is only 1.2% content by token weight — the page is almost entirely markup noise.
Finding: 1.2% content (1373 of 118394 o200k tokens, extracted by readability)
Selected URLs: 
  https://blog.google/
Input URLs: 
  https://blog.google/
Unread URLs: none
Suggested fix: AI agents pay for every token of raw HTML they download, but only the visible text carries meaning. A content share under 5% means an agent parses more than 20 tokens of noise for every token of content, and the page may be truncated before the real content is read. Move inline assets to external files, remove unused boilerplate, and flatten markup.</pre>
</details>
<details><summary>The answer sits behind thousands of tokens of preamble [content-extraction/preamble-tax]</summary>

<pre>all — FAIL — Primary result
An agent streams 94243 tokens before reaching your content.
Finding: 94243 tokens of preamble
Selected URLs: 
  https://blog.google/
Input URLs: 
  https://blog.google/
Unread URLs: none
Suggested fix: Move inline style and script blocks below the main content or into external files.</pre>
</details>
<details><summary>AI files are delivered correctly [machine-discovery/ai-file-delivery]</summary>

<pre>all — WARN — Advisory — not scored
Content-Types are correct, but some AI files have no caching headers: sitemap.xml
Finding: Correct: sitemap.xml; no caching headers on: sitemap.xml
Selected URLs: 
  https://blog.google/
Input URLs: 
  https://blog.google/
Unread URLs: none
Suggested fix: Without a cache-control max-age or an ETag / Last-Modified validator, every agent request re-downloads the whole file instead of revalidating it. Google documents honouring both conditional-request mechanisms.</pre>
</details>
<details><summary>Every poll of this site’s discovery files downloads the whole file again [machine-discovery/conditional-request-support]</summary>

<pre>all — FAIL — Primary result
4 discovery surface problem(s): a crawler cannot ask this site what changed.
Finding: 0/4 surfaces revalidate
Selected URLs: 
  https://blog.google/
Input URLs: 
  https://blog.google/
Unread URLs: none
Suggested fix: Emit a content-derived ETag and a Last-Modified that moves with the content, and answer conditional requests with 304.</pre>
</details>
<details><summary>Organization schema [structured-data/organization-schema]</summary>

<pre>declared — FAIL — Primary result
No Organization schema found.
Finding: None
Selected URLs: 
  https://blog.google/
Input URLs: 
  https://blog.google/
Unread URLs: none
Suggested fix: AI agents use Organization schema to identify your brand, logo, and contact info. Without it, agents cannot confidently attribute content to your organization or display your branding in AI-generated answers. Add this JSON-LD to your homepage &lt;head&gt;.</pre>
</details>
<details><summary>LocalBusiness/ProfessionalService schema [structured-data/local-business-schema]</summary>

<pre>declared — NA — Not assessed — not scored
No physical store signals detected (no PostalAddress block paired with a store-locator link).
Finding: No physical location indicators found.
Selected URLs: 
  https://blog.google/
Input URLs: 
  https://blog.google/
Unread URLs: none</pre>
</details>
<details><summary>Review/AggregateRating schema [structured-data/review-schema]</summary>

<pre>declared — NA — Not assessed — not scored
No review or testimonial content detected to evaluate.
Finding: No review components, star-rating widgets or review markup found.
Selected URLs: 
  https://blog.google/
Input URLs: 
  https://blog.google/
Unread URLs: none</pre>
</details>
<details><summary>og:type set and appropriate [answer-readiness/og-type]</summary>

<pre>all — WARN — Primary result
Blog page has og:type=&quot;website&quot; instead of &quot;article&quot;.
Finding: website
Selected URLs: 
  https://blog.google/
Input URLs: 
  https://blog.google/
Unread URLs: none
Suggested fix: AI agents use og:type &quot;article&quot; to apply content-specific handling like freshness scoring and author attribution. Blog pages with og:type &quot;website&quot; are treated as static pages instead of time-sensitive content, reducing their prominence in recency-weighted AI answers.</pre>
</details>
<details><summary>og:image:alt present [answer-readiness/og-image-alt]</summary>

<pre>all — FAIL — Advisory — not scored
og:image is set but og:image:alt is missing.
Finding: Not found
Selected URLs: 
  https://blog.google/
Input URLs: 
  https://blog.google/
Unread URLs: none
Suggested fix: AI agents cannot process images directly and rely on og:image:alt text to understand your page&#039;s visual content. Without alt text, the OG image is invisible to text-based AI systems that generate answers and summaries about your page.</pre>
</details>
<details><summary>FAQ sections present [answer-readiness/faq-sections]</summary>

<pre>all — FAIL — Advisory — not scored
No FAQ sections found (headings, FAQPage JSON-LD, or accordions).
Finding: Not found
Selected URLs: 
  https://blog.google/
Input URLs: 
  https://blog.google/
Unread URLs: none
Suggested fix: FAQ sections with clear question headings are the highest-priority extraction target for AI-generated answers. Structure each Q&amp;A with a question heading followed by a direct answer paragraph.</pre>
</details>
<details><summary>Question-formatted headings [answer-readiness/question-headings]</summary>

<pre>all — FAIL — Advisory — not scored
No question-formatted H2/H3 headings found across 1 page(s).
Finding: Not found
Selected URLs: 
  https://blog.google/
Input URLs: 
  https://blog.google/
Unread URLs: none
Suggested fix: Question-formatted headings (&quot;What is X?&quot;, &quot;How does Y work?&quot;) are the primary signal for identifying which section answers a query. Each question heading should be followed immediately by a direct answer paragraph.</pre>
</details>
<details><summary>About page with credentials [answer-readiness/about-credentials]</summary>

<pre>all — WARN — Advisory — not scored
About page found but has limited credential signals (only &quot;background&quot;).
Finding: Keywords: background
Selected URLs: 
  https://blog.google/
Input URLs: 
  https://blog.google/
Unread URLs: none
Suggested fix: AI engines scan about pages for credential keywords (team, experience, expertise, certified) to build authority profiles. A single keyword provides weak signal. Expand to include team backgrounds, years of experience, expertise areas, and certifications for stronger AI trust scoring.</pre>
</details>
<details><summary>Trust and evidence signals on homepage [answer-readiness/trust-signals]</summary>

<pre>declared — WARN — Primary result
Homepage carries only 1 of the 2 GEO-measured trust factor(s).
Finding: evidence-backed claims (10 outbound citation host(s): deepmind.google, research.google, developers.googleblog.com)
Selected URLs: 
  https://blog.google/
Input URLs: 
  https://blog.google/
Unread URLs: none
Suggested fix: Missing: quantified social proof (a rating, review count or customer count). These are the factors a 252,000-trial study measured as moving AI citation, and a pass needs every one still in scope here. Promotional adjectives are not among them.</pre>
</details>
<details><summary>Review/testimonial signals [answer-readiness/review-signals]</summary>

<pre>declared — FAIL — Primary result
No review or testimonial signals found.
Finding: Not found
Selected URLs: 
  https://blog.google/
Input URLs: 
  https://blog.google/
Unread URLs: none
Suggested fix: AI generative engines use reviews and testimonials as social proof when recommending your product or service. Attributed quotations and Review/AggregateRating schema make social proof machine-readable, giving agents concrete evidence to cite when users ask &quot;is X any good?&quot;.</pre>
</details>
<details><summary>Text-fragment citation addressability [answer-readiness/text-fragment-addressability]</summary>

<pre>all — FAIL — Primary result
4 of 14 answer span(s) cannot be reached by a text fragment, so a citation link degrades to page-top. Example — first sentence after &quot;Innovation &amp; AI&quot;: the span occurs more than once and its block offers no prefix or suffix to disambiguate it: &quot;See all in Innovation &amp; AI&quot;.
Finding: 10/14 answer span(s) addressable; e.g. https://blog.google/#:~:text=Sign%20up%20for%20our%20newsletters%20with%20product%20updates%2C%20event%20information%2C%20special%20offers%2C%20and%20more. https://blog.google/#:~:text=Use%20Gemini%20in%20Chrome%20to%20get%20the%20answers%20you%20need%20without%20opening%20another%20tab. https://blog.google/#:~:text=Meet%20TPU%208tx%20and%20TPU%208i%20Max.
Selected URLs: 
  https://blog.google/
Input URLs: 
  https://blog.google/
Unread URLs: none
Suggested fix: Determines whether a citing surface can construct a working `#:~:text=` deep link to the page&#039;s actual answer sentences. Hard-fails on the documented `Document-Policy: force-load-at-top` opt-out header, then simulates the spec&#039;s matching algorithm over the parsed DOM to prove each candidate answer span is (a) contained in a single block-level element, (b) unambiguous or disambiguable with a same-block prefix/suffix, and (c) free of characters that break normalization. Outputs the working fragment URLs as a fix artifact.</pre>
</details>
<details><summary>Sections stop making sense once retrieved on their own [answer-readiness/chunk-boundary-referent-integrity]</summary>

<pre>all — FAIL — Primary result
6 of 12 sections do not stand on their own when retrieved.
Finding: 50% self-contained
Selected URLs: 
  https://blog.google/
Input URLs: 
  https://blog.google/
Unread URLs: none
Suggested fix: Open each section with its subject and name the topic once per section.</pre>
</details>
<details><summary>Sections are longer than the window that will chunk them [answer-readiness/section-split-risk-profile]</summary>

<pre>all — FAIL — Primary result
49% of this page&#039;s text will arrive as chunks with no heading.
Finding: 51% inside the window
Selected URLs: 
  https://blog.google/
Input URLs: 
  https://blog.google/
Unread URLs: none
Suggested fix: Add an h2 or h3 roughly every 400 tokens of prose.</pre>
</details>
<details><summary>AI Catalog exists [agent-interfaces/ai-catalog-exists]</summary>

<pre>all — FAIL — Advisory — not scored
Neither /.well-known/ard.json nor /.well-known/ai-catalog.json is served (/.well-known/ard.json: HTTP 404; /.well-known/ai-catalog.json: HTTP 404).
Finding: /.well-known/ard.json: HTTP 404; /.well-known/ai-catalog.json: HTTP 404
Selected URLs: 
  https://blog.google/
Input URLs: 
  https://blog.google/
Unread URLs: none
Suggested fix: The AI catalog is the ARD discovery manifest that tells AI agents which MCP servers, agent cards, skills and API descriptions your site offers. Hugging Face&#039;s hf-discover resolves it at /.well-known/ai-catalog.json and reads its entries; without it, agents must probe endpoints to work out what your site can do.</pre>
</details>
<details><summary>ACP link-surface completeness [agentic-commerce/acp-policy-link-surface]</summary>

<pre>all — FAIL — Primary result
A hard-gate policy link is unusable, so is_eligible_checkout cannot be set and the catalogue is excluded from Instant Checkout: terms_of_use has no link anywhere on the scanned pages.
Finding: 2/8 ACP link types resolve; privacy_policy=https://policies.google.com/privacy support=https://support.google.com/mail
Selected URLs: 
  https://blog.google/
Input URLs: 
  https://blog.google/
Unread URLs: none
Suggested fix: Verifies the merchant can populate the `links` array that every ACP CheckoutSession response is required to carry, by resolving each of the 8 enum link types to a stable, HTTPS, no-JS-required, non-soft-404 URL, on any domain, as an HTML page or a PDF.</pre>
</details>
<details><summary>Contact/lead form endpoint [operability-safety/contact-form]</summary>

<pre>all — FAIL — Advisory — not scored
No contact/lead form or POST contact endpoint found.
Finding: No contact form detected
Selected URLs: 
  https://blog.google/
Input URLs: 
  https://blog.google/
Unread URLs: none
Suggested fix: AI agents increasingly handle tasks like &quot;contact this company for a quote&quot; on behalf of users. Without a machine-submittable contact form, agents cannot complete these requests, sending users to competitors who have one. Provide an HTML form or an API endpoint.</pre>
</details>
<details><summary>Invalid ARIA attributes or values [operability-safety/aria-attributes]</summary>

<pre>all — FAIL — Primary result
Invalid ARIA attributes or values — accessibility violations found.
Finding: Failing element(s): uni-cta; uni-cta; uni-cta; uni-cta; uni-cta
Selected URLs: 
  https://blog.google/
Input URLs: 
  https://blog.google/
Unread URLs: none
Suggested fix: ARIA states and properties carry the machine-readable state agents act on (expanded, checked, disabled, labels). Invalid attributes or values corrupt that state.</pre>
</details>
<details><summary>Accessibility-Layer Injection Scan [operability-safety/aria-layer-injection-scan]</summary>

<pre>all — WARN — Primary result
2 aria-label(s) share under 30% of their element&#039;s own visible tokens. Neither matches an instruction pattern, but both are the slot a payload is smuggled in and both are already accessibility defects.
Finding: 2 anomalous value(s) across 285 scanned
Selected URLs: 
  https://blog.google/
Input URLs: 
  https://blog.google/
Unread URLs: none
Suggested fix: Audit the text that reaches an agent through the accessibility tree and non-visual attributes rather than through body copy: alt, aria-label, aria-labelledby targets, aria-description, title, placeholder, hidden input values, &lt;option&gt; labels, document title and og:* metadata. Flag instruction-shaped content, anomalously long values, and aria-label/visible-text divergence.</pre>
</details>
<details><summary>Ghost-clickable elements: click targets an agent cannot address [operability-safety/ghost-clickable-element-ratio]</summary>

<pre>all — WARN — Primary result
13 of 235 click target(s) never reach an agent&#039;s snapshot. The page stays above the 0.90 floor, but each ghost is a control no agent can click. First: &lt;svg&gt; (no accessible name).
Finding: ratio 0.94 — 13 ghost of 235 click target(s) (no accessible name; no role)
Selected URLs: 
  https://blog.google/
Input URLs: 
  https://blog.google/
Unread URLs: none
Suggested fix: Measures the share of on-page click targets that a DOM/accessibility-tree agent cannot address at all: elements that look and behave clickable to a human or a vision model but expose no native or ARIA role and no accessible name, so they never appear in a Playwright-MCP style snapshot. Reported as semantic / (semantic + ghost) over the served markup and its same-origin stylesheets, with the reason each ghost is unaddressable.</pre>
</details>
<details><summary>Stateful controls: current state readable by an agent [operability-safety/stateful-control-introspectability]</summary>

<pre>all — FAIL — Primary result
10 of 27 state-bearing control(s) hold their state where no snapshot can read it, so an agent cannot verify that its click did anything. Missing: aria-expanded. First: &lt;button.uni-nav-link.uni-nav-link--expand.uni-nav-link--full-width.uni-nav-mobile-subnav__sublist-trigger.font-body-xl&gt;.
Finding: ratio 0.63 — 10 opaque of 27 state-bearing control(s)
Selected URLs: 
  https://blog.google/
Input URLs: 
  https://blog.google/
Unread URLs: none
Suggested fix: Checks that every control whose purpose is to hold a state — toggles, switches, checkboxes, radio groups, tabs, accordions, disclosure triggers, sort direction, filter chips — exposes that state through a machine-readable attribute rather than a CSS class alone. Reports the count of state-bearing controls whose current value an agent cannot read, each with the class that carries the state instead.</pre>
</details>
<details><summary>Hover-only navigation and content [operability-safety/hover-only-content-and-navigation]</summary>

<pre>all — WARN — Primary result
Navigation is reachable, but 10 piece(s) of information are drawn only on hover, so an agent never reads them. First: &quot;See all Models &amp; Research articles&quot;.
Finding: 10 title-only string(s)
Selected URLs: 
  https://blog.google/
Input URLs: 
  https://blog.google/
Unread URLs: none
Suggested fix: Detects navigation subtrees and information that exist in the DOM only while a pointer hovers — `:hover`-revealed submenus with no focus or `aria-expanded` equivalent, and content carried solely in `title` attributes or hover cards. Reports each destination URL an agent never discovers.</pre>
</details>
<details><summary>URL input is reflected into fields agents read as the page speaking [operability-safety/reflected-parameter-injection-canary]</summary>

<pre>all — FAIL — Primary result
URL input is reflected into the rendered text of an indexable page.
Finding: Reflected into rendered text across 5 probes; no angle bracket from the canary reached the response
Selected URLs: 
  https://blog.google/
Input URLs: 
  https://blog.google/
Unread URLs: none
Suggested fix: Escape the echoed query and mark the reflecting page `noindex`.</pre>
</details>
</details>


*Generated by [Agent Lighthouse](https://forkpoint.github.io/agent-lighthouse/) · Open-source website checks for AI readiness. [Apache-2.0](https://github.com/ForkPoint/agent-lighthouse)*
