# django/django run — evidence log

**Artifact: `data/django/_runs/deepseek/7-generate/` — 79 files (root + nested `AGENTS.md` and topic
docs), 1.44 MB, 2,253 of 2,303 rules rendered; see `REPORT.md` for the final summary. Source-fix diff:
`data/django/_runs/braindump-fixes.patch`
(cumulative uncommitted pipeline changes, Wagtail run + this run: 12 files, +775/−307).**

## Scope
- `--since 2016-01-01` (10-year cut-off, per user request).
- Model `openai:deepseek-v4.1-flash` (Neuralwatt), embeddings `openai:qwen3-embedding-8b`.
- Data dir `data/django/django/`; snapshots `data/django/_runs/deepseek/`; scripts `data/_tools/`.
- Corpus: 16,451 PRs (`1-download/pr_list.json`), 59,534 review comments extracted → 39,255
  actionable → **54,522 generalizations** (vs Wagtail's 16,023 = 3.4x). 126 comments (0.2%)
  failed the last extract pass and are treated as non-actionable.

## Extract timeline (`chain.log`)
- 2026-10-03 12:37 pass 1 crashed after 4s: `filter_bots` assumed `comment["user"]` is non-null
  (fixed in `extract.py`).
- pass 1 40,789s · pass 2 + gap fills 75,484s · final pass 209s → complete 2026-10-04 21:01.

## Defects found and fixed during this run
Five defects surfaced: three O(n²) assumptions that stop fitting at Django's corpus size, the group
stage's unvalidated coverage, and a rephrase-prompt leak. None of the fixes alter the documented
pipeline semantics (thresholds, average-linkage, placement types are unchanged).

### 1. `synthesize` clustering (was: OOM crash, rc=139 at 21:36)
The pair-sum dict formulation needs n²/2 Python dict entries: ~300 GB worth of `(i, j) -> sum`
at n=54,522 (the float32 matrix alternative would be 11.9 GB, the float64 one 23.8 GB). Options
measured before rewriting:

| Approach | Fidelity vs exact average-linkage | Verdict |
| --- | --- | --- |
| k-means blocking, block 8,000 (k=7) | 79.0% of ≥0.65 pairs kept in one block; at k=2 (6k sample) co-membership recall 86.9%, precision 95.1%, clusters 1,064 → 1,142 | rejected |
| k-means blocking, block 4,000 (k=14) | 69.8% of ≥0.65 pairs kept (94.2% for ≥0.85 pairs, 62.8% for 0.65–0.70) | rejected |
| connected components of the ≥0.65 graph | one component holds 54,445 of 54,522 items, so no exact decomposition | rejected (`graph_stats.py`) |
| **quantized int16 matrix + per-row maxima** | 1,065 vs 1,064 clusters, recall 99.66%, precision 99.94% on a 6,000-item sample (2s vs 39s for the reference) | **shipped** |

Shipped design (`synthesize._cluster_matrix`): cluster-pair averages stored as int16 (resolution
1/30000 ≈ 3e-5, 2 bytes/pair → 5.9 GB at n=54,522), memory-mapped to an unlinked scratch file
above 1 GiB so the kernel can evict it; selection of the globally most similar pair uses one
cached upper bound per cluster (merge averages are non-increasing, so a cached bound is always
valid and a fresh one is exact) instead of a heap entry per pair. Measured against the exact
reference on three real 6,000-item samples: Django items 0–6,000 → 1,065 vs 1,064 clusters,
recall 99.66%, precision 99.94%; Wagtail items 0–6,000 → 1,295 vs 1,294, 99.99%/100.00%;
Wagtail items 10,000–16,000 → 1,257 vs 1,257, 100.00%/100.00%. Remaining differences are int16
quantization flipping merges between pairs whose averages differ by less than 3e-5.

Follow-up (22:50): the first shipped version file-backed the matrix above 1 GiB with the reasoning that
the kernel could evict it instead of holding 5.9 GB resident. That is pathological for this access
pattern: the merge loop rewrites one row *and one column* per merge, and a column of a row-major matrix
touches every page of the file, so each merge forces writeback plus re-read of the whole file. Measured
on the real corpus: 175 GB written and 16.7 GB read in 45 minutes at 44% CPU, with no visible progress,
versus the 6,000-item samples where the same loop takes 3s. Matrix is now allocated resident
(`np.zeros`, MemoryError falls back to the scratch file), and the merge loop logs every 1,000 merges
(`Clustering merges ... rate_per_s`).

Result on the real corpus (22:52→00:54, 2 h 01 m): 54,522 items →
**3,799 clusters** holding 53,520 items (largest 2,466; 873 pairs; 1,010 clusters of 10+), **1,002
unclustered** (1.8%; `unclustered.json` records only the first 200), avg cluster coherence 0.81, and
**6,444 rules** from 3,768/3,799 clusters (31 clusters produced no rule). Clustering itself took ~5 min
of that. Django's rule set is denser than Wagtail's: 7.0% clusters-per-item vs 11.9% (16,023 → 1,909,
680 unclustered), and distilled 1.7 rules/cluster vs Wagtail's 1.6.

Recovery note: the crashed run (21:36) had already paid for the 54,522 embeddings, but
`run_stages.sh` passes `--fresh` to every non-extract stage, so the 22:03 rerun wiped the
embeddings cache and re-embedded the corpus (~30 min) before clustering. A rerun that should
reuse the cache must invoke `braindump synthesize` without `--fresh`; `run_stages.sh` now supports
`FRESH=0` for that (default remains fresh stages).

### 2. `dedupe` clustering (was: ~5–8h of Python at Django's rule count)
`find_similar_clusters` called a per-pair Python `cosine_similarity` for every i<j (128M calls at
Wagtail's 16,023 rules, ~5x more at Django scale). Now: chunked float32 matmul + union-find over
pairs above the threshold only. Validation on the Wagtail run's rule embeddings (3,093 rules):
256 multi-rule clusters, the exact count recorded in `_runs/deepseek/4-dedupe/merge_log.json`
(256 `embedding_cluster` entries), in 0.57s instead of ~8–16 min. Threshold decisions changed by
float32 rounding: measured 2 of 227,280 above-threshold pairs (0.0009%) — the pair loop itself is
O(above-threshold pairs), 227k instead of 128M.

### 3. `synthesize` unclustered accounting (was: O(n²) Python)
`[item for item in items if not any(item in c for c in clusters)]` scanned every cluster per item
(~3e9 comparisons at 54k items). Now an `id()` set difference.

Also: embeddings are held as one float32 numpy matrix per stage (Python lists of np.float32
scalars were 5.4 GB at 54k x 4096 → 0.9 GB), and the per-item rows are released once the
clustering matrix is built so the LLM phase does not hold the corpus in memory.

### 4. Rephrase meta-rationales (was: 178 of 1,590 rationales about "the rule" itself)
The Wagtail run's lever list flagged meta rationales from metrics alone; the first Django render made
them concrete — 51 rules shipped text like "Rewrite splits the original multi-part rule into three
scannable bullets …". Fix: `get_rephrase_agent`'s instructions and the `RephrasedRule.rationale` field
description now forbid describing the rewrite/wording/bullets/length at all. Re-rephrased the 297 rules
matching the union of defect classes (178 meta per `rule_quality.META_RE`, 53 trivial, 8 empty, 51
explicit rewrite-speak; list in `_runs/rephrase_flagged.jsonl`) by deleting only those entries from
`7-generate/rephrase_cache.jsonl` and re-running `generate` without `--fresh` (`FRESH=0
django_chain_downstream.sh generate`): 297 calls ≈ $0.2, re-render of all 67 files is LLM-free.
Result: meta 178 → 23, empty 8 → 1, rewrite-speak 36 matches remain (mostly legitimate: "scannable"
about UI, "rewrite" about SQL rows); retention unchanged (0.86 mean / 1.00 median).

Follow-up (final state): the same wordy instruction, applied to all 2,303 rules, produced **200 meta +
279 empty/ellipsis rationales** — the model echoed the instruction list into the field (rule 472's
rationale *was* the instruction). Replaced with one positive sentence ("write it for a reader who only
ever sees the final text"); the full pass then rejected 222 of 2,303 and `fix_rationales.py` repaired
158 in two rounds (64 unresolved). Final artifact: 0 empty, 106 meta, 16 trivial, 79 files, 2,253
rules rendered; retention 0.86 mean / 1.00 median — the wordy variant's 0.92 was the price of its 200
leaked rationales, so the run kept the clean prompt.

### 5. `group` silently dropped 31% of placements (no coverage check on the clustering reply)
`organize_location` sent a whole location's placements in one topic-clustering call and trusted the
reply: a rule the reply neither clustered nor listed in `unclustered_rule_ids` vanished. Wagtail's
end-to-end loss was 5.5% of rules (1,520 placed → 1,436 rendered); here the group stage alone lost 31% —
2,303 placements in, 1,590 organized, 713 (614 root, 83 cross-file, 16 dir) absent from
`organized_rules.json`. Fix: `TOPIC_BATCH_SIZE = 120` rules per call,
topics merged by `topic_name.strip().casefold()` (each topic still renders as one file), plus a
completeness repair that sends any id the model never mentioned to inline. Local stub test: 3 batches
(120/120/60) → one merged topic + 270 inline, all 300 ids covered, no duplicate ids. Re-run 03:49→04:05
(945s): **2,303 of 2,303 organized, 0 missing**, 259 locations. The stage's own `stats.totals` also
under-counted (1,217 + 682 = 1,899 of 2,303: it skipped `file:*` locations) — fixed after the run, so
the artifact's `stats.totals` predates the fix (new code reports totals over every location plus a
`file_level` aggregate; replica on this data: 1,622 + 682 = 2,304, file_level = 228 locations / 405
rules). Audit coverage against `organized_rules.json`, not the stats.

### 6. `generate` dropped file-level rules (orphaned by the group rollup)
405 placements are file-scoped (`file:<path>` locations). `generate` attaches those rules to the
*containing directory*'s `AGENTS.md` (as `file_specific_rules`) and writes no file of its own for
them — but a directory only gets an `AGENTS.md` when it has inline rules or topics of its own. 127
directories (176 of the 405 rules) had been rolled up by `group` (no location left), so their
file-level rules rendered nowhere. Fix: `render_target()` walks `file:` locations' directories up to
the nearest ancestor present in `locations` (rolled-up dirs are absent by construction) and falls back
to the root; verified on this run's data: all 228 file locations attach, 11 → root (14 rules) and the
rest to ancestors like `django` (53 files / 88 rules) and `django/contrib/admin` (10 / 24). Applied
before the final re-render, so the artifact includes them. Wagtail's 84 missing rules (5.5%) were
mostly this same defect, never diagnosed there.

### 7. `generate` cached empty rule texts (8 of 2,303 — also in the Wagtail run)
The rephrase reply schema allows an empty `rule_text`, and 8 replies came back empty (ids 59, 65, 3791,
3861, 5303, 5341, 5342, 6301) and were cached as successes; `format_rule_line` then rendered those
rules as a bullet holding only the rationale (one of which, for id 59, was my repair tool's own
complaint: it had been fed the empty text and refused). Fixed in `rephrase_one`: empty → retry once →
fall back to the original rule text. The 8 cache entries were deleted so the stage's own path redid
them on the next run (verified in the final audit: no refusal or rationale-only bullets remain). The
same 8-of-1,520 rate happened on Wagtail and was never noticed; `format_rule_line`'s rationale-only
branch remains as a last resort for pre-existing caches.

## Quality metrics tooling for this run
- `data/_tools/wa_metrics.py <snapshot>` · `rule_quality.py <snapshot> <label>`
- `data/_tools/legacy_scan.py <snapshot> django` (pre-2020 conventions: Python 2, Django 1.x, six,
  ugettext, ...)
- `RUNS_DIR=data/django/_runs LEGACY_SET=django bash data/_tools/compare.sh deepseek`
- `data/_tools/cluster_fidelity.py` (clustering fidelity, see above)
- `data/_tools/graph_stats.py <embeddings.npz> [threshold]` (similarity-graph shape)
- `data/_tools/fix_rationales.py [cache] --rounds 2` (validation pass: re-rephrase rationales that are
  empty, trivial, or about the rewriting; writes `rationale_repairs.json` next to the cache)

## Stage timings (label `deepseek`)
| stage | wall time | notes |
| --- | --- | --- |
| extract | 40,789s + 75,484s + 209s | 3 passes + gap fills, 2026-10-03 12:39 → 10-04 21:01 |
| synthesize | 7,309s | 10-04 22:52 → 10-05 00:54 rc=0. Embeddings resumed from cache (the 22:03 run's 29-min embedding pass); clustering 5 min; 3,799 cluster analyses → 6,444 rules (3,768 clusters yielded a rule, 31 none); 69 transient `ModelAPIError`s retried, 1 exhausted |
| dedupe | 3,716s | 10-05 00:54 → 01:56 rc=0. 6,444 → 2,856 rules (3,588 merged); clustering + category reviews + 11 consolidation reviews |
| place | 1,786s | 10-05 01:56 → 02:26 rc=0. 2,856 rules → 2,303 placed (score ≥ 0.5): 1,084 root AGENTS.md, 709 dir, 405 file, 105 cross-file |
| group | 618s + 945s | 10-05 02:26 → 02:36 rc=0, then 03:49 → 04:05 after the coverage fix. Final: 2,303 rules → 259 locations (1,622 inline, 682 topic-referenced, 228 per-file locations aggregated) |
| generate | 931s + 23s + 349s + 1,683s + 1,686s + 1s | 10-05 02:36 → 06:15, six runs, all rc=0: first render; two targeted diagnostic re-phrases; two full re-phrases (after the group fix and after reverting the prompt change); one cache-respecting re-render. Plus ≈6 min of `fix_rationales.py` validation-pass calls. Final: 79 files, 1.44 MB, 2,253/2,303 rules rendered |
| **total** | **≈38 h** | 2026-10-03 12:37 → 2026-10-05 06:15 |

## Run completion
- Final artifact `data/django/_runs/deepseek/7-generate/`: 79 files, 1,474,034 bytes, 2,253 of 2,303
  placements rendered, 0 broken links (80 checked), 0 refusal/rationale-only bullets, cache 2,303
  entries / 0 empty texts. Snapshots refreshed by `run_stages.sh` after each stage.
- Gotcha for anyone re-running: `run_stages.sh` passes `--fresh` **unless `FRESH=0`** is set, so
  re-running `generate` discards the rephrase cache and re-calls the model for all 2,303 rules
  (~20 min, ~$1.5). `FRESH=0` re-renders from the cache in 1 s — that is how the repaired rationales
  reached the artifact.
- Quality gate on the final cache (`rule_quality.py`): 0 empty, 106 meta (4.6%), 16 trivial (0.7%),
  837 bullets in text, retention mean 0.86 / median 1.00. Legacy scan: 37 rules (1.6%).
