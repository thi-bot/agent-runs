# braindump-runs

Results of [braindump](https://github.com/pydantic/braindump) runs: coding-rule sets (`AGENTS.md` files) mined from the PR review history of Django and Wagtail repositories, plus the traceable data behind them.

**What braindump does**: extracts coding rules from PR review comments → generalizes them → clusters, dedupes, scores, and places them into per-directory `AGENTS.md` files. Pipeline: `download → extract → synthesize → dedupe → place → group → generate`. See the [README](https://github.com/pydantic/braindump) for the full description. The pipeline fixes made along the way live in [`thi-bot/braindump` branch `fork/pipeline-fixes`](https://github.com/thi-bot/braindump/tree/fork/pipeline-fixes).

## Runs

All runs: `--since 2016-01-01` (10-year window), all authors (bots filtered by the pipeline), model `openai:deepseek-v4.1-flash` (Neuralwatt) with `openai:qwen3-embedding-8b` embeddings.

| Repo | What it is | PRs | Comments | Rules (deduped → placed) | Output | Run date |
|---|---|---|---|---|---|---|
| [django/django](runs/django/django/) | Django web framework | 16,451 | 59,589 | 2,856 → 2,303 | 79 files, 1.44 MB | 2026-10-03 |
| [wagtail/wagtail](runs/wagtail/wagtail/) | Wagtail CMS | 7,549 | 17,499 | 1,874 → 1,520 | 22 files, 778 KB | 2026-10-02 |
| [django/djangoproject.com](runs/django/djangoproject.com/) | djangoproject.com site | 1,555 | 2,311 | 357 → 307 | 9 files, 178 KB | 2026-10-07 |
| [wagtail/wagtail.org](runs/wagtail/wagtail.org/) | wagtail.org site | 474 | 1,143 | 188 → 161 | 2 files, 92 KB | 2026-10-06 |
| [django/deps](runs/django/deps/) | Django Enhancement Proposals | 95 | 1,197 | 208 → 170 | 4 files, 108 KB | 2026-10-09 |
| [wagtail/wagtail-localize](runs/wagtail/wagtail-localize/) | translation plugin | 317 | 505 | 100 → 85 | 2 files, 49 KB | 2026-10-10 |
| [wagtail/rfcs](runs/wagtail/rfcs/) | Wagtail RFCs | 110 | 947 | 185 → 147 | 4 files, 87 KB | 2026-10-08 |
| [wagtail/guide](runs/wagtail/guide/) | Wagtail user guide content | 217 | 374 | 81 → 71 | 2 files, 39 KB | 2026-10-06 |
| [wagtail/bakerydemo](runs/wagtail/bakerydemo/) | demo site | 464 | 400 | 78 → 62 | 2 files, 23 KB | 2026-10-10 |
| [wagtail/draftjs_exporter](runs/wagtail/draftjs_exporter/) | Draft.js→HTML library | 127 | 129 | 29 → 26 | 1 file, 13 KB | 2026-10-10 |
| [wagtail/gsoc](runs/wagtail/gsoc/) | GSoC program coordination | 212 | 89 | 8 → 8 | 1 file, 4 KB | 2026-10-10 |

"Placed" = rules above the 0.5 score floor after the `place` stage. Only placed rules appear in the output files.

## What's in each run directory

| File | Contents |
|---|---|
| `agents-md/` | The generated `AGENTS.md` files, one per directory placement, plus `agent_docs/` topic files. **This is the deliverable** — drop into the matching repo directories to activate. |
| `rules.jsonl` | Every deduped rule: `rule_id`, `text`, `category`, `score`, `source_comments` (traceable to PRs), `source_prs`. Includes rules below the placement floor. |
| `extractions.jsonl.gz` | Per-comment extractions (actionable/non-actionable + generalizations) — the provenance chain between raw comments and rules. |

## Per-run metrics and reports

- [`runs/django/_meta/`](runs/django/_meta/) — full-history report for the django/django run (`django-run-report.md`), evidence log, stage metrics.
- [`runs/wagtail/_meta/`](runs/wagtail/_meta/) — report for the wagtail/wagtail run, plus per-repo `*-metrics.txt`/`*-status.txt` (stage-by-stage funnel counts).
- The headline example: **django/django**, 59,534 comments extracted in ~32 h, → 2,303 placed rules across 79 files for an estimated $30–45 of LLM spend. Full write-up in [`runs/django/_meta/django-run-report.md`](runs/django/_meta/django-run-report.md).

## How to reproduce

```bash
git clone https://github.com/pydantic/braindump
cd braindump && uv sync
export BRAINDUMP_MODEL=openai:deepseek-v4.1-flash
export BRAINDUMP_EMBEDDING_MODEL=openai:qwen3-embedding-8b
export BRAINDUMP_OPENAI_COMPAT_QUIRKS=1  # needed for Neuralwatt endpoints

uv run braindump --repo django/django run --since 2016-01-01 --resources review_comments
```

Details on model configuration and stage options in the [braindump README](https://github.com/pydantic/braindump#readme). The `fork/pipeline-fixes` branch referenced above is required for corpora of this size (the search-API PR-list cap, clustering memory, and per-call retry fixes).

## What's *not* here

- **Raw download data** (PR metadata, review comment bodies, diffs) — ~450 MB per large repo, regenerable with the `download` stage, and the comment bodies are only a `gh api` away.
- **Embedding caches** (`embeddings.npz`, up to 456 MB) — regenerable; keep them locally if you plan to re-run `synthesize`/`dedupe` frequently.
- **Intermediate stage outputs** (generalizations, clusters, placements, groupings) — derivable from `extractions.jsonl.gz` + `rules.jsonl` by re-running the pipeline from the cached embeddings.
