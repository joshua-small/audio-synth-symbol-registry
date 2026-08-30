# Evidence status

## Purpose and snapshot

This page is a concise, dated synthesis of the current evidence. It separates what the corpus supports from what it does not support. It does not change record status, select artwork, or authorize standards outreach.

Snapshot basis:

- Published evidence ledger v0.1.1: [`evidence/ledger.json`](../evidence/ledger.json)
- Research reports: [vendor corpus](../evidence/reports/2026-08-29-vendor-corpus.md), [historical corpus](../evidence/reports/2026-08-29-historical-corpus.md), and [publishing, education, and community text-use corpus](../evidence/reports/2026-08-29-text-use-corpus.md)
- Bootstrap assessment: [`registry/assessments/bootstrap-2026-08-29.json`](../registry/assessments/bootstrap-2026-08-29.json)
- Governing rubric: [`docs/acceptance-rubric.md`](acceptance-rubric.md)

## What the evidence supports

- The four initial response semantics - high-pass, low-pass, band-pass, and band-stop - are long-lived engineering and audio concepts. Education, historical material, and current vendor documentation support that conclusion (EV-002, EV-003, EV-006 through EV-018). The [vendor report](../evidence/reports/2026-08-29-vendor-corpus.md) and [historical report](../evidence/reports/2026-08-29-historical-corpus.md) distinguish semantic continuity from visual continuity.
- A recognizable family of visual response controls exists in product UI and teaching material. That is evidence for a registry that can document forms, variants, accessibility names, and evidence boundaries (EV-002, EV-007, EV-018 through EV-020).
- Users sometimes have difficulty identifying or describing these controls in text conversations (EV-021 through EV-024). Custom icon fonts also demonstrate an implementation need for visual controls, without providing portable interchange (EV-005 and EV-025).
- The project can responsibly continue as an open, evidence-led registry. This follows the registry-first decision in [D-003](decision-log.md#d-003-registry-first-standards-path) and preserves the distinction between source observation and project interpretation.

## What the evidence does not support

- It does not show one compact, axis-less response glyph that is independently standardized or consistently shared across vendors. Vendors also use labels, abbreviations, interactive displays, and axis-bearing explanatory graphs (EV-006 through EV-018).
- It does not show established use of any compact response glyph as a portable plain-text character. The text-use corpus found UI images and dedicated icon fonts, but no positive ordinary-text interchange example (EV-005, EV-019 through EV-025).
- It does not show a continuous visual-glyph lineage from early synthesis through current products. The historical record supports concepts while remaining under-sampled for the 1980s and 1990s, and several examples are graphs or labels rather than target glyphs (EV-014 through EV-018).
- It does not resolve the semantic boundaries between High-pass and Low Cut, Low-pass and High Cut, or Band-stop and Notch. The last is a hard blocker in the bootstrap assessment.
- It does not complete a reproducible Unicode and adjacent-standard overlap/confusability audit. The preliminary Unicode NamesList search is useful negative evidence, not a complete non-duplication analysis (EV-001; [Unicode NamesList](https://www.unicode.org/Public/17.0.0/ucd/NamesList.txt)).

## Current status

| Surface | Status | Meaning |
| --- | --- | --- |
| Registry program | Active, evidence collection | The registry can publish and organize provisional records, fallbacks, and neutral future artwork under the adopted policies. |
| Initial records | Four `evidence-collecting` records | No record is `registry-candidate` or `registry-accepted`. |
| Unicode | HOLD - preparatory research only | No proposal, submission, or external outreach is authorized. The formal non-go conditions remain unmet. |
| IEC / other standards | Context only | Adjacent standards may be audited as evidence, but their artwork is neither the target form nor reusable project artwork. |
| Artwork / study | Policy adopted; no asset or study executed | Any artwork or participant recruitment remains subject to its separate approval rules. |

The Unicode HOLD is substantive rather than procedural. The [Unicode character proposal FAQ](https://www.unicode.org/faq/char_proposal.html) and [Unicode Symbol and Emoji Subcommittee guidelines](https://sew.unicode.org/guidelines) should be consulted only after the project meets its own documented non-go safeguards in the [acceptance rubric](acceptance-rubric.md#formal-unicode-non-go-condition).

## Bootstrap assessment

The scores below are a baseline from `bootstrap-2026-08-29.json`. That file explicitly assesses ledger v0.1.0, while the published ledger is now v0.1.1. It therefore does not score the newer EV-006 through EV-025 corpus and must be refreshed before any promotion discussion.

| Record | Score | Status recommendation | Principal limitations |
| --- | ---: | --- | --- |
| `asr:filter.high-pass` | 10/20 | evidence-collecting | Low Cut alias unresolved; only one compact target rendering; no independent plain-text use; preliminary overlap audit only. |
| `asr:filter.low-pass` | 10/20 | evidence-collecting | High Cut alias unresolved; only one compact target rendering; no independent plain-text use; preliminary overlap audit only. |
| `asr:filter.band-pass` | 8/20 | evidence-collecting | No documented compact target rendering or implementation; material target-representation question remains. |
| `asr:filter.band-stop` | 8/20 | evidence-collecting | Band-stop/Notch boundary is unresolved and is a hard blocker; no compact target rendering or independent plain-text use. |

These are not Unicode readiness scores. The [rubric](acceptance-rubric.md) requires, among other safeguards, a score of at least 13/20 with dimension floors and no material question before `registry-candidate`; `registry-accepted` requires at least 18/20, public review, independent review, and explicit human authorization.

## Prioritized next work

1. Refresh the four assessments against ledger v0.1.1 without changing record statuses. Recalculate only from documented evidence and retain the existing counterevidence.
2. Run a bounded positive-search study for dated, independently authored portable-text artifacts. Target at least three clear cases where a response form is needed in ordinary text and users resort to an image, custom font, or lossy workaround. If no such cases are found, publish the negative finding as an objection to Unicode encoding rather than burying it.
3. Build a representation corpus that records compact response forms separately from axes, parameter values, color, interaction state, and circuit-diagram notation. This should seek independent target renderings, document divergence, and not reproduce or trace vendor artwork.
4. Resolve material terminology boundaries with source-backed examples: High-pass/Low Cut, Low-pass/High Cut, and especially Band-stop/Notch. Keep Notch a related term until the evidence supports an alias or a distinct record.
5. Complete a reproducible overlap audit: semantic Unicode candidates, character sequences, visual confusables, and relevant adjacent-standard terminology. This is desk research, not outreach or a proposal.
6. Fill the historical gap with at least two 1980s and two 1990s primary manuals or UI drawings, then compare one documented rendering specimen per decade without inferring a lineage from labels alone.
7. Only after the preceding evidence is stronger, design a small registry or original-font pilot that tests semantic IDs, text fallbacks, and accessible neutral artwork. Treat it as a separate project path, not proof of Unicode demand; obtain any required approval before artwork publication, recruitment, or external engagement.

## Reference boundaries

- The IEC graphical-symbols database is adjacent terminology/circuit context, not validation of the compact audio-community target: [IEC 60617](https://std.iec.ch/iec60617) (EV-004).
- Custom-font implementations can demonstrate local UI utility but do not establish interoperable text: [DSSSP mapping](https://github.com/NumberOneBot/dsssp/blob/main/src/icons/font.css) (EV-005) and [FontAudio](https://github.com/fefanto/fontaudio) (EV-025).
- Direct observations, rights notes, and source URLs remain authoritative in [the ledger](../evidence/ledger.json); this page makes no stronger claim than those entries.

