# ISO/IEC 10646 Proposal Summary Form Workbook - Draft 0.1

**Status:** internal worksheet only. It is not the official form, not complete, and not authorized for submission.  
**Related document:** [Draft 0.1 Unicode proposal scaffold](unicode-proposal-draft-0.1.md)  
**Prepared:** 2026-09-03

The current SEW process requires proposal submissions to include the ISO/IEC JTC 1/SC 2/WG 2 Proposal Summary Form or equivalent information. This worksheet mirrors the major information areas so missing facts stay visible. It does not replace the current [official form](https://www.unicode.org/L2/summary.html).

## A. Administrative

| Field | Draft entry | State |
| --- | --- | --- |
| Title | Proposal to encode audio filter response symbols | Working title only |
| Request type | New characters | Hypothetical only |
| Submitter | Not designated | Do not infer |
| Author(s) | Not designated | Do not infer |
| Sponsor / national body | None | None |
| Date | 2026-09-03 | Draft date |
| Reference documents | No prior proposal document identified | Recheck current document register before any submission |
| Unicode version reviewed | Not version-pinned in this worksheet | Open |
| Contact information | Not supplied | Not applicable until authorized |
| CLA status | No action taken | Blocked pending any actual submission decision |
| Font submission | None | Blocked |
| IP claimant identification | Not completed | Blocked |

## B. General

| Form question | Draft answer | Evidence and limitation |
| --- | --- | --- |
| Name of proposed character(s) | HIGH-PASS FILTER, LOW-PASS FILTER, BAND-PASS FILTER, BAND-STOP FILTER, LOW-SHELF FILTER, HIGH-SHELF FILTER | Working descriptive labels only; not official Unicode names |
| Number of characters | Six | Active registry scope, not an established Unicode repertoire |
| Proposed code position | None | No allocation request |
| Proposed category | Symbol, Other (`So`) is a working hypothesis | Must be reviewed under current property guidance |
| Proposed presentation | Text only if eligible | No emoji, VS, PUA, or rich-text fallback proposal |
| Proposed font | None supplied | Private proof is not a submission font |
| References and drawings | Repository candidates are original and provisional | No canonical artwork or publishing authorization |
| Similar existing characters | Preliminary audit only | Requires version-pinned exhaustive analysis |

## C. Justification

### C1. Has the character been requested before?

Unknown. Current pipeline and nonapproval archives must be reviewed and recorded immediately before any external submission.

### C2. Does it satisfy a demonstrated-use criterion?

Not currently. The project has demonstrated that the named audio concepts occur in real practice. It has not demonstrated independent community use of the proposed compact forms as characters in portable text.

### C3. Is it in current use by a user community?

The audio/synth community uses the *concepts*. Current evidence does not establish a user community that uses the proposed target forms as encoded text characters.

### C4. Is it used in public interchange?

Not established. The current evidence is adverse: prose, abbreviations, structured IDs, APIs, accessibility labels, screenshots, graphs, and vendor-local icons carry the relevant information in observed workflows.

### C5. Is there a need for plain-text interchange?

Not established. There are plausible reasons to want a registry or reusable icon vocabulary, but convenience and semantic usefulness are not enough. A future claim must document public interchange failures for which images, words, existing text sequences, structured fields, and accessible labels cannot preserve required identity.

### C6. Is the proposed repertoire stable?

Partly. The response concepts are stable enough for a reversible internal registry, but there is no evidence that a six-member character repertoire is customary, complete, or settled. Adjacent concepts and axes/configured variants remain boundary questions. Shelves retain isolated-recognition gaps.

### C7. Are the characters distinct?

The local candidate family has distinguishable intended meanings. This does not establish that the forms are independently recognizable or that each is a character rather than a glyph/icon. The low-shelf/high-pass and high-shelf/low-pass distinctions are specifically unresolved in isolation.

### C8. Can the proposed characters be represented by existing Unicode characters or sequences?

No equivalent has been identified in the preliminary project audit. This answer is not complete until a version-pinned Unicode code-chart, pipeline, and nonapproval review is performed. Non-equivalence also would not establish eligibility.

### C9. Are there similar characters?

Potentially, including general line, angle, box-drawing, mathematical, musical, and electrotechnical forms. A future proposal must include visual comparison and explain semantic, identity, and interchange distinctions. Resemblance alone is not a reason to encode.

### C10. Are there legacy encodings?

None found. No migration case has been established.

### C11. Are there special properties, behavior, sorting, or rendering requirements?

None proposed. The concept candidates are standalone symbols with no intended joining, combining, shaping, numeric, case, emoji, or bidirectional special behavior. Line-break, East Asian width, and collation decisions remain unreviewed.

### C12. Does a new block or allocation need to be requested?

No. This draft does not request code points, a block, or placement. Placement is premature until character eligibility and repertoire are established.

## D. Per-item worksheet

| Working name | Abstract response-class meaning | Key exclusions | Registry evidence status | Unicode blockers |
| --- | --- | --- | --- | --- |
| HIGH-PASS FILTER | Attenuates lower frequencies relative to higher frequencies | cutoff, slope, resonance, configured graph | 20/20 candidate | character use; interchange; repertoire; font |
| LOW-PASS FILTER | Attenuates higher frequencies relative to lower frequencies | cutoff, slope, resonance, configured graph | 20/20 candidate | character use; interchange; repertoire; font |
| BAND-PASS FILTER | Passes a middle band relative to lower and higher regions | center, bandwidth/Q, configured graph | 20/20 candidate | character use; interchange; repertoire; font |
| BAND-STOP FILTER | Attenuates a middle band relative to lower and higher regions | Notch-only assumptions, center, Q, configured graph | 18/20 candidate | character use; interchange; wider independent evidence; font |
| LOW-SHELF FILTER | Sustained gain offset on lower-frequency side | signed gain, frequency, slope, configured graph | 19/20 collecting | character use; interchange; isolated low shelf/high-pass recognition; font |
| HIGH-SHELF FILTER | Sustained gain offset on higher-frequency side | signed gain, frequency, slope, configured graph | 19/20 collecting | character use; interchange; isolated high shelf/low-pass recognition; font |

## E. Evidence package checklist

- [ ] Independent text-form examples for each proposed item
- [ ] Source capture, dates, rights-safe quotations, and reproducible citations
- [ ] At least two unrelated communities/systems using the same identity
- [ ] Public plain-text interchange case studies with failed alternatives
- [ ] Existing Unicode comparison, current pipeline check, nonapproval check
- [ ] Stable repertoire/rationale and explicit exclusions
- [ ] Community-established names and ordering
- [ ] Glyph-variation study from independent forms, not only project drawings
- [ ] Appropriate submission font and rights documentation
- [ ] Author, sponsor, IP claimant, and CLA information
- [ ] Official current summary form completed
- [ ] Human authorization of the complete external package

## Agent Report - 2026-09-02T19:31:42-07:00

- Scope: translated the official summary-form requirement into a non-submittable completeness worksheet.
- Finding: administrative, usage, plain-text-interchange, repertoire, comparison, property, font, and rights fields are materially incomplete.
- Recommendation: retain this worksheet as the gate checklist while evidence work proceeds; do not turn its working values into submission claims.
