[![Agent Lighthouse](https://forkpoint.github.io/agent-lighthouse/brand/kit/icons/icon-64.png "Agent Lighthouse logo")](https://forkpoint.github.io/agent-lighthouse/)

### Agent Lighthouse — AI readiness report

**Target:** `https://www.tate.org.uk/`  
**Overall Score:** **`80/100`** *(partially-ready)*  
**Pages Audited:** `1` | **Duration:** `79.4s`

**Scan Conditions:**  
- **Page Type:** `homepage` (declared)
- **Origin Evidence:** `fresh` (version: `v2`, read at: `2026-11-14T00:29:16.720Z`)
- **Evidence Coverage:** `81.8 / 132.2` mass (62%) — page: `88.4`, origin: `43.8`, gated: `0`
- **Unscored Checks:** `126` (58 advisory, 0 gated)
- **Budget:** `79 s` of 180 s


| Category | Score | Breakdown |
| :--- | :---: | :--- |
| **Access & Crawl Control** | **98 / 100** | 🟢 26✓ 1! 0✗ |
| **Machine Discovery** | **86 / 100** | 🔵 8✓ 1! 1✗ (1 not scored) |
| **Agent Interfaces** | _Not assessed_ | ⚪ 0✓ 0! 1✗ (1 not scored) |
| **Agentic Commerce** | **50 / 100** | 🟡 0✓ 2! 0✗ |
| **Content Extraction** | **74 / 100** | 🔵 10✓ 2! 5✗ (2 not scored) |
| **Structured Data** | **50 / 100** | 🟡 1✓ 1! 1✗ |
| **Answer Readiness** | **69 / 100** | 🟡 11✓ 0! 7✗ (7 not scored) |
| **Agent Operability & Safety** | **73 / 100** | 🔵 22✓ 4! 6✗ (4 not scored) |

> 15 advisory checks ran. They are reported but never scored.

#### No AI vendor reads this

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
https://www.tate.org.uk/: homepage (declared, strong)
  Signals: declared:homepage
Fetch: https://www.tate.org.uk/ — read, HTTP 200; homepage (declared)</pre>

Input URLs are pages supplied to the audit. Results cover this sample. Origin evidence may also support a result. Each audit counts toward the score at most once.

<details><summary>The edge answers differently when the User-Agent names an AI crawler robots.txt admits [access-crawl-control/ai-crawler-edge-parity]</summary>

<pre>all — WARN — Primary result
When the User-Agent names these crawlers, the edge answers differently: 3 crawler User-Agent(s) (GPTBot, OAI-SearchBot, ChatGPT-User) at https://www.tate.org.uk/: opaque-403 (HTTP 403 with no challenge header); 3 crawler User-Agent(s) (GPTBot, OAI-SearchBot, ChatGPT-User) at https://www.tate.org.uk/about-us: opaque-403 (HTTP 403 with no challenge header); 3 crawler User-Agent(s) (GPTBot, OAI-SearchBot, ChatGPT-User) at https://www.tate.org.uk/about-us/projects/transforming-artist-books/five-artist-book-summaries/edward-ruscha-twentysix-gasoline-stations-1963: opaque-403 (HTTP 403 with no challenge header). The scanner sends the crawler User-Agent from its own address, without the crawler&#039;s published IP range or Web Bot Auth signature, so a challenge, a 403, a 429 or another refusal can be the edge&#039;s defence against an unverified request naming the crawler, and the real crawler may be answered differently. Confirm against the edge logs before changing anything.
Finding: 3 URL(s) probed with 8 crawler UA(s) from the scanner&#039;s address; GPTBot: 3/3 answered differently; OAI-SearchBot: 3/3 answered differently; ChatGPT-User: 3/3 answered differently; ClaudeBot: 0/3 answered differently; Claude-User: 0/3 answered differently; PerplexityBot: 0/3 answered differently; Perplexity-User: 0/3 answered differently; MistralAI-User: 0/3 answered differently
Selected URLs: 
  https://www.tate.org.uk/
Input URLs: 
  https://www.tate.org.uk/
Unread URLs: none
Suggested fix: Decide the policy once, and make the edge say what robots.txt says. On Cloudflare, add the AI crawlers you admit to the verified-bot allowance (Security &gt; Bots) or a WAF skip rule so managed challenges, bot fight mode and rate limiting do not apply to them; on other CDNs, allowlist the published crawler IP ranges. Then verify from outside with curl -A using each published User-Agent, because the dashboard shows the rule, not the answer. Where you mean to block a crawler, say so in robots.txt too — a consistent no is a legitimate posture, and this audit scores it as one.</pre>
</details>
<details><summary>Sequential heading hierarchy [content-extraction/sequential-headings]</summary>

<pre>all — FAIL — Primary result
1/1 page(s) have heading level skips.
Finding: https://www.tate.org.uk/: h2 -&gt; h5 (skipped h3)
Selected URLs: 
  https://www.tate.org.uk/
Input URLs: 
  https://www.tate.org.uk/
Unread URLs: none
Suggested fix: AI systems build content outlines from headings to understand document structure. Skipped levels (e.g., h1 to h3 without h2) break the hierarchy, causing agents to misinterpret section nesting and produce inaccurate content summaries. Fix heading levels to follow a sequential order.</pre>
</details>
<details><summary>Semantic list usage [content-extraction/semantic-lists]</summary>

<pre>all — FAIL — Primary result
1 of 1 content list(s) are div stacks or numbered prose rather than list markup.
Finding: 0 semantic list(s) vs 1 pseudo-list(s); 0 definition element(s); 0 step list(s)
Selected URLs: 
  https://www.tate.org.uk/
Input URLs: 
  https://www.tate.org.uk/
Unread URLs: none
Suggested fix: Lists built from styled divs, broken &lt;dl&gt; markup or manually numbered paragraphs lose their item boundaries when a page is converted to markdown or serialized into an accessibility tree, which is how extraction pipelines and browsing agents read it.</pre>
</details>
<details><summary>Machine-readable time markup [content-extraction/time-element]</summary>

<pre>all — FAIL — Advisory — not scored
No machine-readable time markup found on date-bearing pages.
Finding: 0/1 date-bearing pages have time markup
Selected URLs: 
  https://www.tate.org.uk/
Input URLs: 
  https://www.tate.org.uk/
Unread URLs: none
Suggested fix: Wrap all dates and times in &lt;time&gt; elements with a datetime attribute in ISO 8601 format (YYYY-MM-DD or YYYY-MM-DDThh:mm:ss). Include publication dates, event dates, and last-modified dates.</pre>
</details>
<details><summary>Images with no text alternative [content-extraction/image-alt-text]</summary>

<pre>all — WARN — Primary result
13/14 image(s) that need a text alternative have one (93%).
Finding: 13/14 images with a text alternative (93%) — worst: https://www.tate.org.uk/ (13/14)
Selected URLs: 
  https://www.tate.org.uk/
Input URLs: 
  https://www.tate.org.uk/
Unread URLs: none
Suggested fix: Give every image that carries meaning a text alternative: `alt` on the `&lt;img&gt;`, or `aria-label` / `aria-labelledby` where the name already exists elsewhere on the page. Mark a genuinely decorative image `alt=&quot;&quot;` or `role=&quot;presentation&quot;`, and use `aria-hidden=&quot;true&quot;` only for an image that should be hidden from assistive technology altogether.</pre>
</details>
<details><summary>&lt;figure&gt; + &lt;figcaption&gt; usage [content-extraction/figure-figcaption]</summary>

<pre>all — WARN — Advisory — not scored
No &lt;figure&gt; elements found, but 26 image(s) exist that could benefit from &lt;figure&gt;/&lt;figcaption&gt;.
Finding: No &lt;figure&gt; elements
Selected URLs: 
  https://www.tate.org.uk/
Input URLs: 
  https://www.tate.org.uk/
Unread URLs: none
Suggested fix: AI agents use &lt;figcaption&gt; to understand the context and purpose of images beyond what alt text provides. Wrapping images in &lt;figure&gt; with &lt;figcaption&gt; gives agents a richer description that can be cited in AI-generated explanations.</pre>
</details>
<details><summary>Lean token-to-content ratio [content-extraction/token-ratio]</summary>

<pre>all — FAIL — Primary result
Homepage is only 0.4% content by token weight — the page is almost entirely markup noise.
Finding: 0.4% content (100 of 25256 o200k tokens, extracted by readability)
Selected URLs: 
  https://www.tate.org.uk/
Input URLs: 
  https://www.tate.org.uk/
Unread URLs: none
Suggested fix: AI agents pay for every token of raw HTML they download, but only the visible text carries meaning. A content share under 5% means an agent parses more than 20 tokens of noise for every token of content, and the page may be truncated before the real content is read. Move inline assets to external files, remove unused boilerplate, and flatten markup.</pre>
</details>
<details><summary>What an agent reads from this page depends on which extractor it uses [content-extraction/extraction-determinism]</summary>

<pre>all — FAIL — Primary result
Two extractors read this page as different articles (0.20 overlap).
Finding: 0.20 worst-pair agreement
Selected URLs: 
  https://www.tate.org.uk/
Input URLs: 
  https://www.tate.org.uk/
Unread URLs: none
Suggested fix: Put the article in one container and keep link-heavy blocks out of it.</pre>
</details>
<details><summary>Sitemap lastmod values contradict the pages they describe [machine-discovery/sitemap-lastmod-verifiability]</summary>

<pre>all — WARN — Primary result
6 of 6 read sample URLs (100%) publish no modification time at all, so their lastmod cannot be verified — add dateModified to the page&#039;s JSON-LD.
Finding: 6 sampled URL(s) of 499 with lastmod; 0 corroborated, 0 divergent, 6 unverifiable, 0 not read; 0 malformed; 0 future-dated
Selected URLs: 
  https://www.tate.org.uk/
Input URLs: 
  https://www.tate.org.uk/
Unread URLs: none
Suggested fix: Stamp lastmod from the content record, not from the build. Emit the timestamp of the last substantive edit to that document, and leave it alone when a deploy only rebuilds the page. Publish the same instant on the page — JSON-LD dateModified is the most widely read of the three signals — so the value is checkable; a lastmod nothing on the page supports is a lastmod the crawler drops. Never emit a future date, and use W3C Datetime (YYYY-MM-DD or a full RFC 3339 timestamp) for every value.</pre>
</details>
<details><summary>Every poll of this site’s discovery files downloads the whole file again [machine-discovery/conditional-request-support]</summary>

<pre>all — FAIL — Primary result
4 discovery surface problem(s): a crawler cannot ask this site what changed.
Finding: 1/5 surfaces revalidate
Selected URLs: 
  https://www.tate.org.uk/
Input URLs: 
  https://www.tate.org.uk/
Unread URLs: none
Suggested fix: Emit a content-derived ETag and a Last-Modified that moves with the content, and answer conditional requests with 304.</pre>
</details>
<details><summary>JSON-LD present [structured-data/json-ld-present]</summary>

<pre>all — FAIL — Primary result
No JSON-LD structured data found on any page.
Finding: None
Selected URLs: 
  https://www.tate.org.uk/
Input URLs: 
  https://www.tate.org.uk/
Unread URLs: none
Suggested fix: AI agents rely on JSON-LD structured data to understand what your site offers, who runs it, and how to interact with it. Without any JSON-LD, agents like ChatGPT and Perplexity treat your site as unstructured text with no machine-readable identity. Add Organization and WebSite schemas to your homepage &lt;head&gt; as a starting point.</pre>
</details>
<details><summary>Organization schema [structured-data/organization-schema]</summary>

<pre>declared — WARN — Primary result
Organization schema found but missing: name, logo.
Finding: Organization schema missing name, logo
Selected URLs: 
  https://www.tate.org.uk/
Input URLs: 
  https://www.tate.org.uk/
Unread URLs: none
Suggested fix: AI agents use Organization schema properties to identify your brand, display your logo, and link to your site. Missing properties (name, logo) reduce your organization&#039;s visibility in AI-generated answers. Add them to your existing Organization schema.</pre>
</details>
<details><summary>LocalBusiness/ProfessionalService schema [structured-data/local-business-schema]</summary>

<pre>declared — NA — Not assessed — not scored
No physical store signals detected (no PostalAddress block paired with a store-locator link).
Finding: No physical location indicators found.
Selected URLs: 
  https://www.tate.org.uk/
Input URLs: 
  https://www.tate.org.uk/
Unread URLs: none</pre>
</details>
<details><summary>Review/AggregateRating schema [structured-data/review-schema]</summary>

<pre>declared — NA — Not assessed — not scored
No review or testimonial content detected to evaluate.
Finding: No review components, star-rating widgets or review markup found.
Selected URLs: 
  https://www.tate.org.uk/
Input URLs: 
  https://www.tate.org.uk/
Unread URLs: none</pre>
</details>
<details><summary>og:type set and appropriate [answer-readiness/og-type]</summary>

<pre>all — FAIL — Primary result
og:type is missing.
Finding: Not found
Selected URLs: 
  https://www.tate.org.uk/
Input URLs: 
  https://www.tate.org.uk/
Unread URLs: none
Suggested fix: AI agents use og:type to classify page content as either a website, article, product, or other entity type. Without it, agents default to treating the page as generic content, missing opportunities for type-specific handling like article freshness scoring.</pre>
</details>
<details><summary>og:image:alt present [answer-readiness/og-image-alt]</summary>

<pre>all — FAIL — Advisory — not scored
og:image is set but og:image:alt is missing.
Finding: Not found
Selected URLs: 
  https://www.tate.org.uk/
Input URLs: 
  https://www.tate.org.uk/
Unread URLs: none
Suggested fix: AI agents cannot process images directly and rely on og:image:alt text to understand your page&#039;s visual content. Without alt text, the OG image is invisible to text-based AI systems that generate answers and summaries about your page.</pre>
</details>
<details><summary>FAQ sections present [answer-readiness/faq-sections]</summary>

<pre>all — FAIL — Advisory — not scored
No FAQ sections found (headings, FAQPage JSON-LD, or accordions).
Finding: Not found
Selected URLs: 
  https://www.tate.org.uk/
Input URLs: 
  https://www.tate.org.uk/
Unread URLs: none
Suggested fix: FAQ sections with clear question headings are the highest-priority extraction target for AI-generated answers. Structure each Q&amp;A with a question heading followed by a direct answer paragraph.</pre>
</details>
<details><summary>Question-formatted headings [answer-readiness/question-headings]</summary>

<pre>all — FAIL — Advisory — not scored
No question-formatted H2/H3 headings found across 1 page(s).
Finding: Not found
Selected URLs: 
  https://www.tate.org.uk/
Input URLs: 
  https://www.tate.org.uk/
Unread URLs: none
Suggested fix: Question-formatted headings (&quot;What is X?&quot;, &quot;How does Y work?&quot;) are the primary signal for identifying which section answers a query. Each question heading should be followed immediately by a direct answer paragraph.</pre>
</details>
<details><summary>Trust and evidence signals on homepage [answer-readiness/trust-signals]</summary>

<pre>declared — FAIL — Primary result
Homepage carries neither of the GEO-measured trust factors.
Finding: None found
Selected URLs: 
  https://www.tate.org.uk/
Input URLs: 
  https://www.tate.org.uk/
Unread URLs: none
Suggested fix: Missing: quantified social proof (a rating, review count or customer count); evidence-backed claims (outbound citations or attributed sources). A 252,000-trial controlled study across six LLMs measured both as shifting which source an answer engine cites. Quantify your social proof and cite evidence for factual claims. Comparison content is reported separately and unscored by answer-readiness/comparison-tables.</pre>
</details>
<details><summary>Review/testimonial signals [answer-readiness/review-signals]</summary>

<pre>declared — FAIL — Primary result
No review or testimonial signals found.
Finding: Not found
Selected URLs: 
  https://www.tate.org.uk/
Input URLs: 
  https://www.tate.org.uk/
Unread URLs: none
Suggested fix: AI generative engines use reviews and testimonials as social proof when recommending your product or service. Attributed quotations and Review/AggregateRating schema make social proof machine-readable, giving agents concrete evidence to cite when users ask &quot;is X any good?&quot;.</pre>
</details>
<details><summary>Facts on this page do not survive the extractors that read it [answer-readiness/extractor-survival-recall]</summary>

<pre>all — FAIL — Primary result
22 of 25 key spans do not survive the extractors an agent uses.
Finding: 20% of facts survive
Selected URLs: 
  https://www.tate.org.uk/
Input URLs: 
  https://www.tate.org.uk/
Unread URLs: none
Suggested fix: Move the facts into the main content container, or repeat them in the prose.</pre>
</details>
<details><summary>AI Catalog exists [agent-interfaces/ai-catalog-exists]</summary>

<pre>all — FAIL — Advisory — not scored
Neither /.well-known/ard.json nor /.well-known/ai-catalog.json is served (/.well-known/ard.json: HTTP 404; /.well-known/ai-catalog.json: HTTP 404).
Finding: /.well-known/ard.json: HTTP 404; /.well-known/ai-catalog.json: HTTP 404
Selected URLs: 
  https://www.tate.org.uk/
Input URLs: 
  https://www.tate.org.uk/
Unread URLs: none
Suggested fix: The AI catalog is the ARD discovery manifest that tells AI agents which MCP servers, agent cards, skills and API descriptions your site offers. Hugging Face&#039;s hf-discover resolves it at /.well-known/ai-catalog.json and reads its entries; without it, agents must probe endpoints to work out what your site can do.</pre>
</details>
<details><summary>ACP link-surface completeness [agentic-commerce/acp-policy-link-surface]</summary>

<pre>all — WARN — Primary result
5 of 8 ACP link types resolve. Both hard gates are satisfied, so checkout eligibility is intact, but the CheckoutSession response cannot carry a complete links array: return_policy has no link anywhere on the scanned pages; shipping_policy has no link anywhere on the scanned pages; faq has no link anywhere on the scanned pages.
Finding: 5/8 ACP link types resolve; terms_of_use=https://www.tate.org.uk/about-us/policies-and-procedures privacy_policy=https://www.tate.org.uk/about-us/policies-and-procedures/tate-privacy-notice contact_us=https://www.tate.org.uk/about-us/contact-us about_us=https://www.tate.org.uk/art/stories support=https://www.tate.org.uk/join-support/support-tate-liverpool
Selected URLs: 
  https://www.tate.org.uk/
Input URLs: 
  https://www.tate.org.uk/
Unread URLs: none
Suggested fix: Verifies the merchant can populate the `links` array that every ACP CheckoutSession response is required to carry, by resolving each of the 8 enum link types to a stable, HTTPS, no-JS-required, non-soft-404 URL, on any domain, as an HTML page or a PDF.</pre>
</details>
<details><summary>Commerce paths answer differently when the User-Agent names a shopping agent, or robots.txt turns it away [agentic-commerce/agent-ua-commerce-parity]</summary>

<pre>all — WARN — Primary result
A request naming ChatGPT-User gets HTTP 403 where a browser got 200 at https://www.tate.org.uk/; A request naming OAI-SearchBot gets HTTP 403 where a browser got 200 at https://www.tate.org.uk/; A request naming ChatGPT-User gets HTTP 403 where a browser got 200 at https://www.tate.org.uk/about-us/policies-and-procedures; A request naming OAI-SearchBot gets HTTP 403 where a browser got 200 at https://www.tate.org.uk/about-us/policies-and-procedures (2 more). These probes come from the scanner&#039;s address, not OpenAI&#039;s published ranges, so they show how the site answers a request that names the agent, not what the real agent receives. A challenge, a 403, a 429 or another refusal can be the edge&#039;s defence against an unverified request naming the agent, and the real agent, from OpenAI&#039;s published ranges, may be answered differently. Confirm against the edge logs before changing anything. Allowlist the published address ranges from https://openai.com/searchbot.json and https://openai.com/chatgpt-user.json rather than trusting the User-Agent string.
Finding: 4 commerce target(s) probed from the scanner&#039;s address with the ChatGPT-User and OAI-SearchBot User-Agents; 6 comparable probe(s); 0 finding(s); 6 ambiguous refusal(s); 0 not assessed
Selected URLs: 
  https://www.tate.org.uk/
Input URLs: 
  https://www.tate.org.uk/
Unread URLs: none
Suggested fix: Separate the four OpenAI tokens instead of treating &#039;OpenAI&#039; as one switch: Disallow GPTBot if you do not want your catalogue in training, and keep OAI-SearchBot and ChatGPT-User allowed, since those two are what put your product in an answer and let the shopper&#039;s agent read the page. At the edge, allowlist the published address ranges from https://openai.com/searchbot.json and https://openai.com/chatgpt-user.json — UA-string rules are both spoofable and, when they misfire, invisible from the dashboard. Then verify from outside with curl -A on a product page, the cart and the policy pages, and check you get the whole page rather than a stub.</pre>
</details>
<details><summary>Forms don&#039;t use blocking CAPTCHA [operability-safety/no-blocking-captcha]</summary>

<pre>all — WARN — Primary result
Blocking CAPTCHA detected: recaptcha. This may prevent AI agents from submitting forms.
Finding: CAPTCHA: recaptcha on https://www.tate.org.uk/
Selected URLs: 
  https://www.tate.org.uk/
Input URLs: 
  https://www.tate.org.uk/
Unread URLs: none
Suggested fix: Blocking CAPTCHAs like reCAPTCHA and hCaptcha prevent AI agents from completing forms on behalf of users. When someone asks an AI assistant to &quot;fill out the contact form on Example.com,&quot; the CAPTCHA blocks the action entirely. Use honeypot fields or invisible server-side validation instead.</pre>
</details>
<details><summary>Form fields wired to their validation messages [operability-safety/form-error-messages]</summary>

<pre>all — FAIL — Primary result
None of the 1 required field(s) carry a resolvable aria-errormessage or aria-describedby, so an agent has no way to read why a submission was rejected.
Finding: 0 of 1 required field(s) reference a message element
Selected URLs: 
  https://www.tate.org.uk/
Input URLs: 
  https://www.tate.org.uk/
Unread URLs: none
Suggested fix: An agent filling a form reads the accessibility tree, where a message is attached to a field by aria-errormessage or aria-describedby. Fields the server rendered as aria-invalid are checked directly; where a page carries no invalid state — the normal case on a GET, since error markup is injected after a failed submit — the required fields are checked instead, because those are the ones that can fail.</pre>
</details>
<details><summary>Dialogs without accessible names [operability-safety/dialog-name]</summary>

<pre>all — FAIL — Primary result
Dialogs without accessible names — accessibility violations found.
Finding: Failing element(s): div.Tate-lightbox__strip.TateUI-lightbox; div.Tate-lightbox__strip.TateUI-lightbox; div.Tate-lightbox__strip.TateUI-lightbox; div.Tate-lightbox__strip.TateUI-lightbox; div#Tate-lightbox
Selected URLs: 
  https://www.tate.org.uk/
Input URLs: 
  https://www.tate.org.uk/
Unread URLs: none
Suggested fix: AI browser agents detect modals via role=&quot;dialog&quot;/&quot;alertdialog&quot; and need an accessible name to understand the dialog’s purpose. Unlabeled dialogs trap agents in unknown UI states, blocking confirmations, forms, or cookie-consent flows.</pre>
</details>
<details><summary>Incomplete ARIA role relationships [operability-safety/aria-relationships]</summary>

<pre>all — FAIL — Primary result
Incomplete ARIA role relationships — accessibility violations found.
Finding: Failing element(s): div#site-menu__dropdown-nav--3; div#site-menu__dropdown-nav--4; a; a; a
Selected URLs: 
  https://www.tate.org.uk/
Input URLs: 
  https://www.tate.org.uk/
Unread URLs: none
Suggested fix: Composite widgets (menus, listboxes, tabs, grids) require specific child/parent roles and attributes. Missing pieces break the structure agents traverse.</pre>
</details>
<details><summary>Native Control Substitution Index [operability-safety/native-control-substitution]</summary>

<pre>all — FAIL — Primary result
2 of 2 custom control(s) replace a native element without a usable contract: the widget declares no aria-expanded, so an agent cannot tell whether its list is open. An agent has no single-call primitive for the control and no reliable way to open and read its options.
Finding: 2 substituted control(s), weighted index 2; 0 native
Selected URLs: 
  https://www.tate.org.uk/
Input URLs: 
  https://www.tate.org.uk/
Unread URLs: none
Suggested fix: Counts choice, date and file-input controls built as custom widgets instead of the native HTML elements, weighted by whether they sit on a conversion path (checkout, cart, signup, booking, order, search). Reports the weighted substitution index, and fails a custom widget that lacks a usable ARIA combobox contract or a drop zone with no file input.</pre>
</details>
<details><summary>Accessibility-Layer Injection Scan [operability-safety/aria-layer-injection-scan]</summary>

<pre>all — WARN — Primary result
14 aria-label(s) share under 30% of their element&#039;s own visible tokens. Neither matches an instruction pattern, but both are the slot a payload is smuggled in and both are already accessibility defects.
Finding: 14 anomalous value(s) across 150 scanned
Selected URLs: 
  https://www.tate.org.uk/
Input URLs: 
  https://www.tate.org.uk/
Unread URLs: none
Suggested fix: Audit the text that reaches an agent through the accessibility tree and non-visual attributes rather than through body copy: alt, aria-label, aria-labelledby targets, aria-description, title, placeholder, hidden input values, &lt;option&gt; labels, document title and og:* metadata. Flag instruction-shaped content, anomalously long values, and aria-label/visible-text divergence.</pre>
</details>
<details><summary>Ghost-clickable elements: click targets an agent cannot address [operability-safety/ghost-clickable-element-ratio]</summary>

<pre>all — WARN — Primary result
7 of 122 click target(s) never reach an agent&#039;s snapshot. The page stays above the 0.90 floor, but each ghost is a control no agent can click. First: &lt;div.Tate-lightbox__strip.TateUI-lightbox.container__fullvh&gt; (no accessible name).
Finding: ratio 0.94 — 7 ghost of 122 click target(s) (no accessible name; no role)
Selected URLs: 
  https://www.tate.org.uk/
Input URLs: 
  https://www.tate.org.uk/
Unread URLs: none
Suggested fix: Measures the share of on-page click targets that a DOM/accessibility-tree agent cannot address at all: elements that look and behave clickable to a human or a vision model but expose no native or ARIA role and no accessible name, so they never appear in a Playwright-MCP style snapshot. Reported as semantic / (semantic + ghost) over the served markup and its same-origin stylesheets, with the reason each ghost is unaddressable.</pre>
</details>
<details><summary>Hover-only navigation and content [operability-safety/hover-only-content-and-navigation]</summary>

<pre>all — WARN — Primary result
Navigation is reachable, but 5 piece(s) of information are drawn only on hover, so an agent never reads them. First: &quot;Skip to main content&quot;.
Finding: 5 title-only string(s)
Selected URLs: 
  https://www.tate.org.uk/
Input URLs: 
  https://www.tate.org.uk/
Unread URLs: none
Suggested fix: Detects navigation subtrees and information that exist in the DOM only while a pointer hovers — `:hover`-revealed submenus with no focus or `aria-expanded` equivalent, and content carried solely in `title` attributes or hover cards. Reports each destination URL an agent never discovers.</pre>
</details>
<details><summary>Third-party DOM-write blast radius [operability-safety/third-party-dom-write-blast-radius]</summary>

<pre>all — FAIL — Primary result
2 third-party origin(s) can write into the DOM an agent reads, with no Content-Security-Policy that constrains what runs and 2 of them unpinned by `integrity`: abtasty.com, google.com. Each is a separate host, and a separate supply chain, with the site&#039;s own authority over what an agent believes.
Finding: 2 third-party script origin(s) [1-3]: abtasty.com, google.com; CSP from none, not constraining; runtime-injected tags not counted
Selected URLs: 
  https://www.tate.org.uk/
Input URLs: 
  https://www.tate.org.uk/
Unread URLs: none
Suggested fix: Counts how many separate companies can write text into the DOM an agent reads: every registrable domain shipping a script or stylesheet into the page, judged against whether the Content-Security-Policy actually constrains what may run, and whether each resource is pinned with an `integrity` hash. Cross-origin frames with no `sandbox` are reported alongside. The origin list is the deliverable.</pre>
</details>
<details><summary>URL input is reflected into fields agents read as the page speaking [operability-safety/reflected-parameter-injection-canary]</summary>

<pre>all — FAIL — Primary result
URL input is reflected into the rendered text of an indexable page.
Finding: Reflected into rendered text across 5 probes; no angle bracket from the canary reached the response
Selected URLs: 
  https://www.tate.org.uk/
Input URLs: 
  https://www.tate.org.uk/
Unread URLs: none
Suggested fix: Escape the echoed query and mark the reflecting page `noindex`.</pre>
</details>
</details>


*Generated by [Agent Lighthouse](https://forkpoint.github.io/agent-lighthouse/) · Open-source website checks for AI readiness. [Apache-2.0](https://github.com/ForkPoint/agent-lighthouse)*
