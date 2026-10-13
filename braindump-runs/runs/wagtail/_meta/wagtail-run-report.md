# Braindump on wagtail/wagtail — full-history run report

Run date: 2026-10-02/03 · repo `wagtail/wagtail` · window `--since 2016-01-01` · model
`openai:deepseek-v4.1-flash` (Neuralwatt) · embeddings `openai:qwen3-embedding-8b` ·
provider-default reasoning · extract `--concurrency 12` · `--authors all` (bot-filtered by the pipeline).

## Artifacts

- **Generated guidelines:** `data/wagtail/_runs/deepseek/7-generate/` — 44 markdown files, 1.7 MB.
  - `AGENTS.md` (48 KB) — root index + global rules, links to 21 directory-specific files
  - `agent_docs/*.md` (18 topic docs: api-design 107 KB, testing-patterns 48 KB, code-style-general 49 KB,
    user-facing-docs 33 KB, accessibility, css/scss, django-orm, django-templates, …)
  - per-directory `AGENTS.md` — `.github/workflows`, `client`, `client/scss{,/components}`, `client/src{,/components,/controllers}`,
    `docs{,/contributing,/releases}`, `docs/agent_docs/*`, `wagtail`, `wagtail/admin{,/templates,/views/generic}`,
    `wagtail/contrib/redirects`, `wagtail/core`, `wagtail/images`, `wagtail/models`, `wagtail/search/backends`,
    `wagtail/tests`, `wagtail/wagtailadmin`
- Append `AGENTS.md` inside a directory of the wagtail repo to activate it there.

## Funnel (measured)

| stage | output |
|---|---|
| download | 7,549 PRs (every PR since 2016), 17,499 review comments |
| extract | 17,411 comments (bot-filtered) → **10,948 actionable (63%)** → 17,233 potential rules |
| synthesize | 16,023 generalizations in 1,909 clusters (avg coherence 0.82) → **3,093 rules** |
| dedupe | → **1,874 rules** (1,219 merged away, −39%) |
| place | → **1,520 placed** (min-score 0.5; root 928, directory 424, file 136, cross-file 32) |
| group | 133 locations referencing **1,436 distinct rules** (571 inline + 865 via 22 topic clusters) |
| generate | → **44 files**, 1,436 rules rephrased |

Traceability is complete: 100% of synthesized rules carry `source_comments`; 60% are multi-PR rules
(median 2 source PRs). `braindump --repo wagtail/wagtail lookup <rule_id> -v` shows rule → category/scope/
confidence → placement rationale → source PRs (e.g. rule 73: 5 PRs across `wagtail/models`,
`wagtail/admin/views`, `wagtail/contrib/settings`, `wagtail/images`).

## Quality (final rule text, n=1,436)

| metric | value |
|---|---|
| empty rule text | 9 (0.6%) |
| multi-point rule texts | 380 (26%) — rendered as properly nested sub-bullets |
| rationale references "this rule/guideline" | 143 (10%) |
| trivially short rationale (<15 chars) | 61 (4%) |
| rules containing code spans / file paths | 1,261 (88%) / 724 (50%) |
| median rule length | 249 chars |
| identifier retention vs pre-rephrase | mean 0.84, median 1.00 (2,924 kept / 703 dropped) |
| rules mentioning pre-2020 conventions | 9 (0.6%, e.g. a `six.text_type` rule traceable to 2017) |

## Cost and time (measured)

Time: download 85 min · extract 36,177 s (10.05 h) + 265 s gap-fill · synthesize 10,421 s (2.9 h) ·
dedupe 6,176 s (1.72 h) · place 1,324 s · group 233 s · generate 1,334 s → **≈ 15.6 h of pipeline wall time**
(+ A/B and smoke work). Extract throughput ≈ 0.48 comments/s at concurrency 12 (provider-capped);
failures 0.7% (120/17,411), all recovered.

Cost: extract ≈ **$21** (measured 27.3 M input tokens → $4.1 at $0.15/M; 28.6 M output tokens → $17.2 at
$0.60/M; reasoning is ~1,540 of the ~1,644 output tokens per call — provider-default effort). Downstream
stages add ≈ **$10-20** by the same method (1,909 synthesize + ~1,900 dedupe + 1,874 place + 207 group +
1,436 generate calls). **Total ≈ $30-45 for a 10-year, 17.4k-comment run.**

Caveat: `cost.json` per stage reports $0.00 — pydantic-ai has no price metadata for Neuralwatt models, so
costs above are computed from published prices × measured tokens (`data/_tools/usage_probe.py`).

## Model choice (why deepseek-v4.1-flash)

| model | $/M in→out | tokens/call (extract) | extract cost | latency |
|---|---|---|---|---|
| **deepseek-v4.1-flash** | 0.15 → 0.60 | 1,567 / 1,644 | **$21** | 7.1 s |
| glm-5.3-flash | 0.15 → 0.50 | 1,490 / 1,690 | $19 | 8.9 s |
| kimi-k2.7-code | 0.95 → 4.00 | 1,478 / 521 | $61 | 3.4 s |
| kimi-k3 | 3.00 → 15.00 | 2,032 / 891 | **$350-600+** | 18.6 s (hard input) |

- Reasoning effort A/B (same 30 comments, deepseek): default 21 actionable / 30 rules; `low` 16/26; `none`
  15/22 → **default effort is worth it**; `none` loses ~29% of actionable comments for ~4× speed.
- kimi-k3 on identical inputs: 6.4× latency, 4.5× output tokens, 5.7× more rules per comment (171 vs 30 on
  the same 30 comments) → a full kimi run would cost ~17-30× deepseek and produce much more to synthesize.
- To compare later without re-downloading: the download is frozen and model-independent; extract is
  checkpointed. `--random --limit N` is deterministic (`--seed 42`), so both models can run the identical
  subsample: `EXTRACT_LIMIT=3000 EXTRACT_CONCURRENCY=12 bash data/_tools/run_stages.sh openai:kimi-k3 kimi extract synthesize dedupe place group generate`.

## Pipeline fixes made during this work

1. **download**: PR-list search cap — the GitHub search API returns ≤1,000 results, so wide windows are split
   recursively by date (`--since 2016` returned 1,000 PRs before this fix; 7,549 after).
2. **download**: `--resources` selection — only `review_comments` is read downstream, cutting API calls ~5×.
3. **extract**: per-comment failures are now visible (console + error count); before, comments were dropped
   silently. 120 failures → gap-fill (`EXTRACT_RESUME=1`) recovered 120/120.
4. **extract**: `--authors` only prompts when omitted (it previously prompted even when passed, aborting
   background runs).
5. **config**: retry transport for OpenAI-compatible providers, incl. `httpx.TransportError`
   (httpx connection errors were never retried: 10 → 5 failures per 40 at concurrency 24).
6. **config**: `run_agent_with_retry` — 6 attempts, 20 s→180 s jittered backoff around every stage's agent
   call, covering `ModelAPIError`/`HTTPStatusError`/`TransportError`/`ConnectionError`, console-visible.
7. **dedupe**: per-cluster/per-category failure fallback (keep rules unconsolidated, count `errors`) — one
   throttled call can no longer abort a 1.7 h stage. (The stage was killed by a 429 earlier; after the fix,
   `place` survived 5 live retries.)
8. **generate**: multi-line rule texts render as nested sub-bullets instead of `- - ...` (0 artifacts in the
   final files); re-rendered from `rephrase_cache.jsonl` at zero LLM cost.
9. **config** (earlier): `BRAINDUMP_OPENAI_COMPAT_QUIRKS` — native structured output + `service_tier`
   tolerance for OpenAI-compatible endpoints (removed the bullet-leak/validation failures seen on bakerydemo).
10. **run/status/README**: `--resources` plumbing, honest status counts, documented rate-limit behaviour and
    the OpenAI-compatible settings.

Source changes: `src/braindump/{config.py,commands/{download,extract,dedupe,place,group,generate,run,status}.py}`
+ `README.md` (`git diff` saved as `data/wagtail/_runs/braindump-fixes.patch`). Analysis tooling (untracked,
`data/_tools/`): `run_stages.sh` (stage driver with snapshots/timings), `compare.sh`, `wa_metrics.py`,
`rule_quality.py`, `legacy_scan.py`, `usage_probe.py`, `hard_call_probe.py`, `extract_ab.py`.

## Open levers for a fork

- 28% of comments are <80 chars ("LGTM"/"thanks") yet cost one LLM call each — a prefilter is the biggest
  cost/time lever for large repos.
- 9 empty rules, 61 trivial and 143 meta rationales: a validation/normalization pass after rephrasing.
- 9 legacy rules from 2016-2018: date-weighted scoring or an age cutoff for source comments.
- Per-stage cost reporting: add a provider price table (Neuralwatt publishes prices in `/v1/models`).
- Throughput is provider-capped (~0.5-0.65 comments/s at default reasoning); sampling or `none` effort are
  the runtime levers.
