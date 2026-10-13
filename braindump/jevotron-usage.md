# Jevotron QA over braindump rule sets

What, why, and how: running [Jevotron](https://cmungall.github.io/jevotron/) (Jev-based
anomaly scanning) over the [braindump-runs](https://github.com/thi-bot/braindump-runs)
coding-rule collections to catch low-quality rules that the pipeline's own scores miss.

## Why

The braindump pipeline's failure modes were measured across 11 runs (~80k comments,
5,300 placed rules): empty rule texts, meta-referencing rationales ("merges the
cluster's…"), vague truisms, and legacy conventions survive the pipeline's score
thresholds because they score fine on confidence×support but read poorly as guidance.
`rule_quality.py` heuristics catch some post-hoc. Jevotron replaces pattern-matching
QA with a typed judgment: every rule's `text` and `rationale` are scored for
ANOMALY vs NORMAL against written guidance, with probabilities.

## Setup

```bash
# tool + key
uv tool install jevotron   # or: pipx install jevotron
export TYPESAFE_API_KEY="..."   # from console.typesafe.ai
```

## Inputs

Per run: a flat JSONL of one entry per rule (`rule_id`, `rule_text`, `rationale`,
`category`, `unique_pr_count`, `pipeline_score`), built from the run's
`rules.jsonl`. Guidance document encoding the quality bar (see
`guidance.md` alongside this file):

```bash
jevotron scan rules_flat.jsonl \
  --guidance-file guidance.md \
  --field /rule_text --field /rationale \
  --sort-score -o results.jsonl
```

- Fields are JSON Pointers; repeat `--field` to score several.
- `--sort-score` emits highest anomaly first; `--threshold 0.5` (default) marks warnings.
- Results cache by content hash in SQLite: reruns with unchanged input are free and
  instant (measured: 185/185 cached, 0.27 s). Threshold sweeps and guidance tweaks
  only re-bill changed entries.

## Validation (planted ground truth)

5 synthetic bad rules (vague truism, empty text, Python-2 legacy, meta-reference,
generic filler) planted into the wagtail/gsoc corpus (8 real rules):

- **5/5 planted flagged, 0/8 real rules flagged — precision 1.00, recall 1.00.**
- Anomaly scores for planted: 0.93–1.00; for real rules: 0.00–0.14. Wide separation.

## Results on real corpora

- wagtail/rfcs (185 rules): 10 flagged (5.4%). django/deps (208): 10 (4.8%).
- Flags do NOT duplicate the `rule_quality.py` heuristic classes (0 overlap on
  meta/trivial on rfcs) and are uncorrelated with `pipeline_score` (flagged median
  0.55 vs unflagged 0.54) — an orthogonal second reviewer.
- The dominant real flag: **over-consolidated mega-rules** from the dedupe stage's
  merge pass — several sub-rules bundled into one un-actionable bullet, often with a
  rationale narrating the merge ("This merges the positive/negative framings…").
  This class was invisible to all prior QA.

## Remediation policy (applied in the PR)

Flagged rules ≥ 0.7 in `agents-md/` outputs get one of:
- **split** — when the text bundles 2+ independent checkable instructions, split
  into separate bullets;
- **tighten** — when salvageable, rewrite to a single checkable instruction and a
  standalone rationale (no process narration);
- **drop** — when vague/legacy/meta with nothing checkable to salvage.

Flags in `rules.jsonl` below the placement floor need no edit (not rendered).

## Cost

~1,225 input + ~70 output tokens per rule (two fields). Full 11-run scan
(~5,300 rules) ≈ 6.5M input tokens; trivially cheap, and cached thereafter.
