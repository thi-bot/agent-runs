# Braindump on django/django — full-history run report

**Status: complete** — all seven stages finished, the artifact is written, and every pipeline defect
found along the way is fixed and verified. Evidence log: `data/django/_runs/notes.md`; artifact:
`data/django/_runs/deepseek/7-generate/`.

Run date: 2026-10-03 → 2026-10-05 · repo `django/django` · window `--since 2016-01-01` · model
`openai:deepseek-v4.1-flash` (Neuralwatt) · embeddings `openai:qwen3-embedding-8b` ·
provider-default reasoning · extract `--concurrency 10` · `--authors all` (bot-filtered by the pipeline).

## Funnel (measured)

| stage | output |
|---|---|
| download | 16,451 PRs (every PR since 2016), 59,589 review comments |
| extract | 59,534 comments (bot-filtered) → **39,255 actionable (66%)** → 54,522 potential rules |
| synthesize | 54,522 generalizations → 3,799 clusters (53,520 items; largest 2,466; 1,002 unclustered) → **6,444 rules** (avg coherence 0.81) |
| dedupe | 6,444 → **2,856 rules** (3,588 merged away; 11 consolidation reviews) |
| place | 2,856 input → 2,303 above the 0.5 score filter → **2,303 placed** (1,084 root `AGENTS.md`, 709 directory, 405 file, 105 cross-file) |
| group | 2,303 rules → **259 locations** (1,622 inline + 682 in topics; 2,303 distinct, plus 228 per-file locations aggregated) |
| generate | 2,303 rules rephrased → **79 files, 1.44 MB; 2,253 of 2,303 rules rendered** (the 50 missing are topic members whose topic doc lists the cluster, not every member) |

## Corpus scale (vs the Wagtail reference run)

| metric | wagtail | django |
|---|---|---|
| PRs | 7,549 | 16,451 |
| review comments | 17,499 | 59,589 |
| comments extracted | 17,411 (bot-filtered) | 59,534 |
| actionable | 10,948 (63%) | 39,255 (66%) |
| comments under 80 chars ("LGTM"/"thanks") | 4,875 (28%) | 21,704 (36%) |
| potential rules → generalizations | 17,233 → 16,023 | 54,522 |
| extract failures (last pass) | 0 | 126 (0.2%, treated as non-actionable) |

## Pipeline fixes made during this run

Seven defects surfaced during this run, the first four only at this corpus size; all were fixed without
changing stage contracts (thresholds, average-linkage, placement types are unchanged). Design,
alternatives measured, and validation numbers are in `data/django/_runs/notes.md`; summary:

1. **synthesize clustering** — the pair-sum dict needs ~300 GB of entries at 54,522 items (it OOM-crashed,
   rc=139, on the first attempt). Now: int16-quantized pair averages (5.9 GB resident) + per-cluster
   cached maxima instead of a pair heap. Fidelity vs the exact reference on three real 6,000-item
   samples: 99.66–100% co-membership recall, 99.94–100% precision. (A file-backed variant was tried
   first and abandoned: the per-merge column rewrite touches every matrix page, measured 175 GB of
   writeback in 45 min.)
2. **dedupe clustering** — per-pair Python cosine (128M calls at Wagtail's rule count, ~5× more here) →
   chunked float32 matmul + union-find over above-threshold pairs only. Reproduces the Wagtail run's
   recorded 256 pass-1 clusters exactly, in 0.57 s.
3. **synthesize unclustered accounting** — `item in cluster` per cluster (~3e9 comparisons) → `id()` set.
4. **group topic coverage** — `organize_location` trusted the clustering reply to enumerate every rule,
   and dropped any rule it neither clustered nor listed as unclustered. Wagtail's end-to-end loss was
   5.5% of rules (1,520 placed → 1,436 rendered); here this stage alone dropped 713 of 2,303 placements
   (614 root, 83 cross-file, 16 directory — 31% of the artifact; the root location's own 1,084
   placements were covered only 470 times). Now:
   cluster in batches of 120 (topics merged by `topic_name`, so each topic still renders as one file)
   and treat unmentioned ids as inline. Re-run: **2,303 of 2,303 placements organized, 0 missing**, 259
   locations (945 s).
5. **generate dropped file-level rules** — 405 placements were file-scoped, and 176 of them (in 127
   directories that `group` had rolled up, so they had no location of their own) rendered nowhere: the
   renderer attaches a `file:` location's rules to the containing directory's `AGENTS.md`, which only
   exists when that directory has rules of its own. Such rules now attach to the nearest ancestor that
   does render (verified on this run's data: all 228 file locations attach — 11 to the root, the rest
   to ancestors such as `django` (53 files / 88 rules) and `django/contrib/admin` (10 / 24)).
6. **generate cached empty rule texts** — 8 of the 2,303 rephrase replies came back with an empty
   `rule_text` (schema-valid, so cached as a success) and rendered as a bullet holding only the
   rationale. Same rate in the Wagtail run, where it was never noticed. An empty reply is now retried
   once, then falls back to the original rule text, so a bullet can never render without content.

Also: embeddings are held as a single float32 matrix per stage (5.4 GB → 0.9 GB at 54,522×4096) and
released before the LLM phase; `extract.filter_bots` no longer assumes `comment["user"]` is set.

Finally, inspecting the first complete render surfaced the defect the Wagtail run predicted from
metrics alone: rephrase rationales that describe the rewrite instead of the code ("Rewrite splits the
original multi-part rule into three scannable bullets…") or that talk about "the rule" itself. Two
attempts fixed it, and the first backfired: a wordy four-line instruction cut the leaks on a 297-rule
diagnostic re-pass (meta 178 → 23, empty 8 → 1) but, applied to all 2,303 rules, produced **200 meta
and 279 empty/ellipsis rationales** — the model echoed the instruction itself into the field. One
positive sentence ("write it for a reader who only ever sees the final text") brought the full-corpus
pass to 222 rejected of 2,303 (9.6%); the `fix_rationales.py` validation pass then re-rephrased only
the rejected rules, quoting each rejection back — 158 repaired in two rounds, 64 unresolved (2.8%,
mostly broad regex matches such as "scannable" about UI sections). Re-rendering from
`rephrase_cache.jsonl` is LLM-free (1 s); each full rephrase pass costs ≈ $1.5.

## Time and cost

Time: extract 40,789 s (pass 1) + 75,484 s (pass 2 + gap fills) + 209 s (final pass) = **≈ 32.4 h** ·
synthesize 7,309 s (2 h 01 m: ~5 min clustering for 54,522 items, then 3,799 cluster analyses) ·
dedupe 3,716 s (1 h 02 m) · place 1,786 s · group 618 s (945 s on the fixed re-run) · generate
**6,023 s over six runs** (1 h 40 m: 931 s first render; 23 s + 349 s targeted diagnostic re-phrases;
1,683 s + 1,686 s full re-phrases forced by the group fix and a prompt revert; 1 s final
cache-respecting re-render) plus ≈ 6 min of validation-pass repairs. **Total ≈ 38 h.**

Cost: extract ≈ **$55** (59,534 calls × 1,319 input / 1,221 output tokens measured on 4 Django comments →
78.5 M input → $11.8 at $0.15/M; 72.7 M output → $43.6 at $0.60/M). Downstream stages add ≈ **$10-15**
by the same method (3,799 synthesize + dedupe + 2,303 place + group calls) and generate ≈ **$1.5 per
full pass** (~$4.5 across the diagnostic, wordy, and final passes) plus ≈ $0.6 of repairs. **Total
≈ $70-80 for a 10-year, 59.6k-comment run** — 2.2× the Wagtail run's $30-45 at 3.4× the comments.

Caveat: `cost.json` per stage reports $0.00 — pydantic-ai has no price metadata for Neuralwatt models,
so figures are published prices × measured tokens (`data/_tools/usage_probe.py`).

## Quality (final rule text)

`rule_quality.py` over the final `rephrase_cache.jsonl` (2,303 rules): **0 empty, 106 meta (4.6%),
16 trivial (0.7%)**, median rule length 273 chars, 2,086 rules with backticks and 1,292 with file
paths; identifier retention against the original synthesized rules: **mean 0.86, median 1.00**
(5,017 kept / 993 dropped). Retention is the one metric the wordy prompt scored better on (0.92), but
it paid for that with 200 rewrite-talk rationales — the trade this run chose deliberately.

Verified on the artifact: 79 files, 2,253 of 2,303 placements rendered, 0 broken internal links
(80 checked), 0 refusal or rationale-only bullets, 1.44 MB. 37 rules mention pre-2020 conventions
(`legacy_scan.py`: Python 2, Django 1.x, `six`, `ugettext`) — 1.6% of the corpus, from 2016-2018
review comments.

## Artifacts

- **Generated guidelines: `data/django/_runs/deepseek/7-generate/`** — root `AGENTS.md` (index +
  global rules), 36 nested `AGENTS.md` files under `django/`, `docs/`, `tests/` and `.github/`, and
  topic docs in `agent_docs/` (31 at the root, 6 under `docs/`, 2 under `tests/`, plus per-directory
  ones). Copy any `AGENTS.md` (and its `agent_docs/`) into the matching directory of a django checkout
  to activate it there; nothing inside the django repo was modified.
- Evidence log `data/django/_runs/notes.md` · metrics `data/django/_runs/compare.txt` · source diff
  `data/django/_runs/braindump-fixes.patch` (12 files, +775/−307 vs HEAD, cumulative with the Wagtail
  run's changes since none were committed in between) · repair report
  `data/django/_runs/deepseek/7-generate/rationale_repairs.json`.
- Run tooling in `data/_tools/` (untracked): `run_stages.sh` (stage runner; passes `--fresh` unless
  `FRESH=0`), `django_chain_extract.sh`, `django_chain_downstream.sh`, `compare.sh`, `wa_metrics.py`,
  `rule_quality.py`, `legacy_scan.py`, `fix_rationales.py` (validation pass), `usage_probe.py`,
  `cluster_fidelity.py`, `graph_stats.py`, `extract_ab.py`.

## Open levers for a fork

- **Prefilter short comments.** 21,704 comments (36%) are under 80 chars ("LGTM", "thanks", "+1") and
  each still costs one extract call; extract is 32.4 h of this run's ~38 h (~85%). The cheapest
  high-yield change for repos with this comment culture.
- **Mega-cluster analysis.** The largest synthesize cluster holds 2,466 generalizations (top 8: 7,259),
  but the prompt shows only the first 15 — the rule is distilled from 0.6% of that cluster. A cluster
  size cap or diversity-sampled representatives would use those items' evidence.
- **Legacy conventions.** 2016–2018 review comments surface stale advice (Python 2, Django 1.x);
  `legacy_scan.py` quantifies it, and date-weighted scoring or an age cutoff is the fix.
- **Rule validation pass.** Used twice here, at two scales: a 297-rule diagnostic re-pass, then a full
  pass over the final cache (222 rejected → 158 repaired in two rounds → 64 unresolved). What is left:
  106 meta and 16 trivial rationales (most residual rejections are broad regex matches such as
  "scannable" about UI sections), and 837 rules whose `rule_text` carries its own list markers (the
  renderer turns those into sub-bullets). A tightened `rationale` schema (minimum length) or a third
  repair round would close most of the remainder at ~$0.3.
- **Provider price table.** `cost.json` records $0.00 for these models (no price metadata in
  pydantic-ai); wiring Neuralwatt's `/v1/models` prices in would give per-stage cost reporting.
