# Current Evidence Status

Status as of 2026-09-01T00:19:18-07:00. This synthesis supersedes the historical [0.2.17 status synthesis](current-evidence-status-0.2.17.md). It preserves the merged six-record reassessment and shelf/shelving terminology dossier, then adds the evidence-only Band-stop text-use and third-render disposition from DA-023 without changing any live semantic record, assessment, score, or status.

## Current artifacts

| Artifact | Version | Current authority |
| --- | --- | --- |
| Registry and evidence ledger | 0.3.3 | `registry/registry-metadata.json` and `evidence/ledger.json` |
| Schema | 0.4.0 | `registry/registry-metadata.json` |
| Assessments | 0.3.4, format 0.2.0 | `registry/assessments/registry-0.3.1-2026-08-31.json` |
| Derived analyses | 0.2.18, format 0.1.0 | `evidence/derived-analyses.json` |
| Tooling | 0.8.0 | `package.json` |

## Current records

High-pass, low-pass, band-pass, and band-stop are reversible `registry-candidate` records. Both shelves remain `evidence-collecting`:

| ID | Score | Status and principal boundary |
| --- | ---: | --- |
| `asr:filter.high-pass` | 20/20 | `registry-candidate`; `Low Cut` is a bounded response-class alias, not implementation equivalence |
| `asr:filter.low-pass` | 20/20 | `registry-candidate`; `High Cut` is a bounded response-class alias, not implementation equivalence |
| `asr:filter.band-pass` | 20/20 | `registry-candidate`; unchanged score and status |
| `asr:filter.band-stop` | 16/20 | `registry-candidate`; Notch remains related-only under controlled polysemy and source-local transfer |
| `asr:filter.low-shelf` | 19/20 | `evidence-collecting`; shelving-term disposition and isolated distinction from high pass remain material |
| `asr:filter.high-shelf` | 19/20 | `evidence-collecting`; shelving-term disposition and isolated distinction from low pass remain material |

Scores are readiness diagnostics, not Unicode eligibility. Candidate status is reversible, and every `asr:` identifier remains provisional. Promotion to `registry-accepted` remains a Human Review gate and is not implied by a high score.

## Assessment disposition

DA-018 and DA-021 resolve the former pass/cut material questions only for audio filter response-class lookup. Parameters, presets, algorithms, slope, Q, resonance, phase, cutoff convention, arbitrary prose, and product-specific nonclassic operations do not transfer. When product documentation explicitly assigns a different or nonclassic operation, that documentation overrides alias lookup. This bounded rule raises high-pass and low-pass semantic stability from 2 to 4 without changing their alias arrays or canonical fields.

DA-020 and DA-021 resolve the Band-stop/Notch material blocker through controlled polysemy. Band-stop and Band-reject remain the broad class. Notch is context-dependent and commonly narrower, but some sources use it as an exact local synonym, response feature, low-Q behavior, or implementation-local mode. Notch remains outside exact aliases, and Notch-only evidence does not transfer unless the source explicitly maps or contrasts it with the broad record. The contradiction remains visible as nonmaterial interoperability caution. Band-stop semantic stability rises from 2 to 3; usage 3, text/accessibility 2, visual convergence 2, overlap 3, and legal provenance 3 remain unchanged.

DA-019 and DA-021 establish three independent implementations of the axis-free, sign-agnostic, affected-side two-prong shelf topology. Affected-side orientation is semantic: low shelf forks left and high shelf forks right. Arbitrary rotation or mirroring that changes the forked side is not equivalent. Axes, baselines, color, parameter values, slope, interaction state, exact proportions, path curvature, whitespace, line weight, and endpoint placement remain excluded from semantic identity. Shelf visual convergence rises from 1 to 3, but exact shelving-term treatment and isolated six-way shelf/pass recognition remain material, so both records remain `evidence-collecting` at 19/20.

DA-022 finds that `low shelving filter` and `high shelving filter` are established exact response-class aliases for `Low-shelf filter` and `High-shelf filter`. Apple and MathWorks each provide direct within-document equivalence; Steinberg and immutable FFmpeg documentation independently corroborate the morphology, and W3C supports the underlying lowShelf/highShelf taxonomy. The finding is bounded: it carries no gain-sign, parameter, topology, implementation, or glyph equivalence, and it excludes plain `shelving filter`, shorter grammatical fragments, broad bass/treble terms, pass-colliding product enums, and abbreviations. This evidence-only publication does not mutate either shelf record or resolve its live open question; a separate exact-head semantic disposition is required.

DA-023 establishes a third independent explicit axis-less broad-class Band-reject rendering in Bitwig Phase-4, alongside Image-Line EV-100 and Ardour EV-120. Enriched EV-032 directly uses the full canonical Band-Stop name in non-UI KVR prose; EV-201 corroborates Band-reject and source-local contextual BR within the same KVR group. Sound On Sound EV-202 and EV-203 form one independent trade-media group using Band-reject and locally expanded BR, with Apple EV-204 as vendor-documentation corroboration. The evidence supports a later mechanical recommendation to raise Band-stop text/accessibility from 2 to 3 and visual convergence from 2 to 3, producing 18/20, but this evidence-only publication does not apply those scores. The current immutable assessment remains 16/20 and `registry-candidate`. BR and BRF remain context-dependent observations outside unrestricted aliases; BSF, the speech label, and the DA-020 Notch transfer rule remain unchanged. No reviewed source uses the response glyph as portable text.

All assessment claims preserve the counterevidence and exclusions in DA-018 through DA-023. Derived analyses organize direct ledger evidence but are not counted as additional independent sources.

## Current position

- Registry and ASCII interchange work: `GO`.
- Internal six-member evidence and recognition preparation: `GO` within existing gates.
- Artwork remains unpublished and noncanonical; the exact locked SVG bytes and geometry are unchanged.
- Participant recruitment, external outreach, publication, release, and external submission: not authorized.
- Formal Unicode proposal: `HOLD`. No submission has been made.

## Next work

1. Complete exact-head independent adverse review of DA-023, its source captures, independence accounting, negative searches, DA-020 admission rule, and registered digest.
2. After approval, perform a separate mechanical Band-stop reassessment of the recommended text 3 and visual 3 scores without mutating fallbacks, aliases, semantics, or Notch transfer rules.
3. Perform the separately scoped semantic disposition for the two full shelving-filter aliases, then mechanically reassess the shelf terminology blocker without conflating it with isolated recognition.
4. Continue private isolated six-way recognition validation; lexical evidence and topology convergence do not satisfy that blocker.
5. Preserve the `registry-accepted` Human Review gate and batch it with review of a complete external submission package if that stage is reached.
6. Keep Unicode `HOLD` until every formal non-go condition in the acceptance rubric is cleared and the owner separately authorizes external action.

## Agent Report - 2026-09-01T00:19:18-07:00

- Report status: Band-stop evidence dossier serialized for exact-head independent adverse review; its score recommendation is not applied.
- Scope: add EV-200 through EV-204, enrich existing EV-032 without duplicating its source, and register DA-023 under the controlling DA-020 admission rule.
- Result: Bitwig supplies the third independent broad-class axis-less render; KVR and Sound On Sound supply independent non-UI audio prose, and Apple corroborates explicit BR labeling.
- Recommendation only: later Band-stop text/accessibility 2 -> 3, visual convergence 2 -> 3, and total 16 -> 18. The immutable current assessment remains 16/20 and `registry-candidate`.
- Negative result: no portable response-glyph text use, common audio-chat BSF corpus, independent drawing-required Band-stop case, or qualifying SIR/EasyEffects third form was established.
- Preserved state: scores remain 20, 20, 20, 16, 19, and 19; statuses, records, DA-020, aliases, BSF fallback, speech, artwork, geometry, font, PUA, Unicode `HOLD`, and external posture remain unchanged.
- Versions: registry/evidence 0.3.3 and derived analyses 0.2.18; assessments remain 0.3.4 with format 0.2.0, schema 0.4.0, and tooling 0.8.0.
- Validation: `npm test` passed 117/117 after validating six records, eight assessment sets, 119 evidence sources, registry 0.3.3, assessments 0.3.4, schema 0.4.0, tooling 0.8.0, registered source and derived-artifact digests, documentation drift, protected study/font boundaries, and Agent Report hygiene. `git diff --check` and explicit capture/protected-path checks passed.
- Independent review: corrected exact head `ce13a95e6758af79cff1c7e5deb88d0018e5ef80` received `APPROVE` with no remaining blocker after exact text-provenance, publisher-collapse, hash, and protected-boundary review. This approval annotation changes no reviewed substance.
