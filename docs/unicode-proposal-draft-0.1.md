# Draft 0.1: Proposal to Encode Audio Filter Response Symbols

**Status:** internal working draft; not submitted; not a request for action by Unicode, ISO/IEC, or any external body.  
**Prepared:** 2026-09-03  
**Scope:** six audio filter-response concepts only.  
**Repository status:** Unicode preparatory research is on HOLD.

## 1. Request

This draft explores a possible future request to encode six standalone symbols used to identify broad audio filter response types:

1. HIGH-PASS FILTER
2. LOW-PASS FILTER
3. BAND-PASS FILTER
4. BAND-STOP FILTER
5. LOW-SHELF FILTER
6. HIGH-SHELF FILTER

No code points, block, allocation, or formal repertoire are requested in this draft. The listed names are working names, not proposed Unicode character names. The project has not established that any of the six compact response drawings are Unicode characters rather than application icons or graphical conventions.

## 2. Executive assessment

The project has evidence for stable concepts across audio engineering, synthesis, product interfaces, education, and practitioner discourse. It has also developed original, provisional SVG candidates and an internal registry. This supports continued registry and icon-package work.

It does **not** yet demonstrate the three core SEW criteria for a Unicode submission: existing community use of the particular characters, a stable character repertoire, and need for public plain-text interchange. The strongest current negative result is that the observed public interchange methods are words, abbreviations, structured identifiers, API values, accessibility labels, graphs, screenshots, and vendor-local icon assets - not independently adopted portable response-symbol characters.

This document deliberately makes the argument and counterargument visible. It is a diagnostic draft: it should become easier to revise, narrow, or abandon after new evidence, rather than becoming a premature external submission.

## 3. Background and problem statement

Audio production, live sound, synthesis, DSP, and education routinely distinguish frequency-response categories. The concepts are semantically durable: high-pass and low-pass identify one-sided attenuation, band-pass and band-stop identify a middle region, and shelves identify a persistent offset affecting low or high frequencies.

Compact visual response shapes are common in product UIs, diagrams, and explanatory material. A shared registry might improve reusable iconography, documentation, keyboard-accessible labels, and structured tooling. Those benefits do not by themselves establish character encoding. Unicode's symbol criteria expressly distinguish semantic content from customary text communication with a symbol.

The open question is narrower: whether a stable, independently used, font-variable set of response symbols exists, and whether public plain-text interchange needs each identity to be encoded as a character.

## 4. Proposed repertoire and current registry status

| Working name | Registry ID | Registry score | Registry status | Unicode draft disposition |
| --- | --- | ---: | --- | --- |
| HIGH-PASS FILTER | `asr:filter.high-pass` | 20/20 | `registry-candidate` | Insufficient for character eligibility |
| LOW-PASS FILTER | `asr:filter.low-pass` | 20/20 | `registry-candidate` | Insufficient for character eligibility |
| BAND-PASS FILTER | `asr:filter.band-pass` | 20/20 | `registry-candidate` | Insufficient for character eligibility |
| BAND-STOP FILTER | `asr:filter.band-stop` | 18/20 | `registry-candidate` | Insufficient for character eligibility |
| LOW-SHELF FILTER | `asr:filter.low-shelf` | 19/20 | `evidence-collecting` | Insufficient; isolated recognition remains open |
| HIGH-SHELF FILTER | `asr:filter.high-shelf` | 19/20 | `evidence-collecting` | Insufficient; isolated recognition remains open |

Registry scores are local readiness diagnostics, not Unicode criteria or eligibility determinations. All registry IDs and artwork are provisional. No current record is `registry-accepted`.

## 5. Character identity versus glyph and icon design

### 5.1 Possible character hypothesis

A future case would need to establish that each item has an abstract identity that survives font variation; that users select and interchange that identity as text; and that a sender, receiver, search system, or parser must preserve the distinction. Under that hypothesis, an axis-free response symbol would identify a response *class*, while configuration such as cutoff frequency, gain, Q, slope, side, and boost/cut state would remain outside the character.

### 5.2 Current contrary evidence

The present corpus shows response curves mainly as interface graphics, explanatory plots, or vendor-controlled assets. They are usually adjacent to labels, controls, units, parameters, or configured curves. They are not shown in established character inventories, legacy text encodings, interoperable text protocols, or a common font mapping. That is consistent with icons/graphics, not characters.

A visual silhouette cannot establish character identity. Similar shapes can arise independently from the same frequency-response semantics. The project therefore makes no claim of an inherited canonical contour, IEC basis, or a universal community drawing.

### 5.3 What would change the assessment

The minimum positive evidence would be independently authored examples of the same discrete forms used inline in portable text across unrelated systems, plus evidence of text-specific requirements such as searching, copy/paste, indexing, serialization, or round-tripping. Counterexamples must be retained: successful prose, ASCII, structured IDs, and accessibility labels reduce the claimed need.

## 6. Usage, stability, and interchange

### 6.1 Usage

**Observed:** stable filter terms and response categories occur in multiple source families. High/low pass and band-pass have the strongest local semantic evidence. Band-stop has broad-class evidence with constrained Notch transfer. Both shelves have resolved terminology but a remaining isolated shelf/pass recognition question.

**Not established:** independent use of the target compact forms as characters. Vendor UI use does not by itself demonstrate character use or public interchange.

### 6.2 Stability

**Observed:** the six response concepts are stable enough for a reversible six-record registry. The source record distinguishes shelf affected-side identity from signed gain state and distinguishes band-stop from contextually narrower Notch use.

**Not established:** a stable Unicode repertoire, stable acceptable glyphic variation, a customary ordering, or a settled boundary against adjacent types such as all-pass, peak/bell, notch, resonant variants, and axis-bearing alternatives. The active six-concept scope is a project decision, not evidence that Unicode's appropriate repertoire is six.

### 6.3 Need for public plain-text interchange

**Observed:** people can encounter a compact drawing and need to explain it in text; reuse of original SVG and named registry records could solve practical workflow needs.

**Adverse evidence:** current search found prose, abbreviations, API/string identifiers, structured interchange, accessibility text, named icons, and images functioning as alternatives. No independently adopted portable target symbol was found for any of the six.

**Current conclusion:** no demonstrated public plain-text interchange need. The project must not assert that a Unicode scalar provides a universal LLM-token benefit; tokenization is model-specific and a Unicode scalar need not be one token.

## 7. Existing Unicode and non-Unicode representations

The project has examined existing Unicode repertoire conceptually and must complete a version-pinned code-chart and proposed-character-pipeline review before external submission. No existing Unicode character has been identified as an equivalent abstract identity for the six response classes. That absence is not sufficient to support encoding.

Existing alternatives include:

- prose: high-pass, low-pass, band-pass, band-stop, low-shelf, high-shelf;
- constrained aliases: Low Cut and High Cut at response-class level; Band-reject for broad band-stop; shelving forms for shelves;
- ASCII abbreviations and product-local labels;
- axis-bearing frequency-response graphs;
- vendor-local UI icons and named SVG assets;
- structured fields/enums/APIs;
- accessible text labels and descriptions;
- original SVG or icon-package assets.

A future proposal must compare each candidate to visually similar Unicode characters and explain why sequences or existing characters are not equivalent. It must also identify why the alternatives fail in actual public interchange cases rather than merely being less convenient.

## 8. Proposed character properties - provisional only

No property assignments are being requested. If, and only if, character eligibility is demonstrated, these are starting hypotheses to review against Unicode property guidance:

| Field | Working hypothesis | Open issue |
| --- | --- | --- |
| General_Category | `So` | Must follow accepted repertoire and UTC guidance |
| Bidi_Class | `ON` | Verify with property guidance |
| Canonical_Combining_Class | 0 | No combining behavior proposed |
| Decomposition | none | Must check all existing Unicode sequences |
| Numeric value | none | None intended |
| Case mapping | none | None intended |
| Line_Break | `AL` or other SEW-recommended value | Not evaluated |
| East_Asian_Width | `N` | Not evaluated |
| Joining/shaping | none | The candidates are standalone only |
| Normalization | no special behavior intended | Must be formally reviewed |
| Collation/order | a provisional six-item order only | No established user-community ordering |

The draft does not propose PUA mappings, variation selectors, ZWJ sequences, emoji presentation, aliases as character names, or compatibility decompositions.

## 9. Representative glyphs and font status

Original neutral SVG candidates exist privately in this repository. They are noncanonical, unaccepted, unlicensed for Unicode submission, and intentionally not reproduced here as a character chart. The project has demonstrated a private, unencoded font proof and non-PUA icon packaging, but neither demonstrates customary text use or supplies an appropriate Unicode submission font.

A future submission must include an appropriate licensed font before SEW can recommend it to UTC. Artwork acceptance and any canonical designation remain human-review decisions in this project.

## 10. Evidence gap matrix

| Requirement or question | Current state | What is missing | Disposition |
| --- | --- | --- | --- |
| Existing use by independent community | Semantic concepts supported | Independent character-form use | Blocked |
| Stable character repertoire | Six-record registry is reversible | Community-set repertoire and boundaries | Blocked |
| Public plain-text interchange need | Workflow intuition and registry use cases | Documented irreducible public interchange failures | Blocked |
| Character rather than icon/graphic | Hypothesis articulated | Text behavior and font-variable identity evidence | Blocked |
| Existing Unicode equivalence | Preliminary audit | Version-pinned exhaustive comparison | Open |
| Legacy encoding/migration | None found | Evidence of legacy character code use | Open |
| Names and ordering | Working names only | Community-established names and ordering | Open |
| Visual variation | Original candidate family only | Independent forms and acceptable variation analysis | Open |
| Font and rights | Private proof only | Submission-ready font and rights chain | Blocked |
| Formal form/administration | Scaffold only | Submitter, authors, CLA, form completion | Blocked |
| Shelf distinction | Terminology resolved | Isolated recognition between low shelf/high-pass and high shelf/low-pass | Open |
| Band-stop boundary | Broad class established locally | More independent use and target-form evidence | Open |

## 11. Research plan triggered by this draft

1. Seek portable, independently authored response-symbol text in source families not yet well represented, including non-English material, historical software/manuals, plain-text documentation, data interchange, and accessible technical workflows.
2. Create a strict evidence packet for each alleged interchange failure: source, audience, medium, exact failure, attempted alternatives, and why a character identity is required.
3. Complete existing-Unicode, proposed-pipeline, and nonapproval-notice review against a recorded Unicode version/date.
4. Maintain an explicit exclusion log for vendor-local icons, screenshots, axes/configured plots, product UI, labels, and third-party artwork.
5. Complete isolated private recognition preparation without recruiting or exposing the study to participants.
6. If independent character use emerges, revisit scope, canonical names, ordering, properties, rights, and font work before asking for any external authorization.

## 12. Submission posture and governance

The current posture is **do not submit**. This document neither creates a Unicode proposal nor authorizes a SEW account action, CLA, outreach, artwork publication, participant work, public release, or external contact.

Any later external submission requires a separate complete-package review and authorization under the repository's human-review policy. A decision to keep researching, revise the draft, narrow it, favor an open icon registry, or abandon Unicode remains valid.

## 13. Bibliography and project evidence

Authoritative process references:

1. Unicode Script Encoding Working Group, [Submission Guidelines and Process](https://sew.unicode.org/guidelines), accessed 2026-09-03.
2. Unicode Technical Committee, [Proposal Summary Form](https://www.unicode.org/L2/summary.html), accessed 2026-09-03.
3. Unicode, [Criteria for Encoding Symbols](https://www.unicode.org/pending/symbol-guidelines.html), accessed 2026-09-03.
4. Unicode, [Unicode Properties in Character Proposals](https://www.unicode.org/L2/props/), accessed 2026-09-03.
5. Unicode, [UAX #44: Unicode Character Database](https://www.unicode.org/reports/tr44/), accessed 2026-09-03.
6. Unicode, [Proposed New Characters](https://www.unicode.org/alloc/Pipeline.html), accessed 2026-09-03.
7. Unicode, [Archive of Nonapproval Notices](https://www.unicode.org/pending/), accessed 2026-09-03.
8. Unicode, [Font Submissions Policy](https://www.unicode.org/pending/font/), accessed 2026-09-03.

Project evidence and boundary documents:

- [Current Evidence Status](current-evidence-status.md)
- [Unicode Proposal Critical Path Audit](unicode-proposal-critical-path-audit.md)
- [Unicode Overlap Audit](unicode-overlap-audit.md)
- [Shelf Unicode and Standards Overlap Audit](shelf-unicode-standards-overlap-audit.md)
- [Character Properties and Font Strategy](character-properties-font-strategy.md)
- [Plain-text Workaround Search](plain-text-workaround-search.md)
- [Recognition Study Protocol](recognition-study-protocol.md)
- [Private Unencoded Font Proof](private-unencoded-font-proof-2026-08-31.md)

## Agent Report - 2026-09-02T19:31:42-07:00

- Scope: created an internal Unicode-shaped proposal scaffold for the active six-concept filter repertoire.
- Finding: semantic/registry evidence supports continued work, but no proposed item currently satisfies the demonstrated-use and public-interchange showing required for an external character submission.
- Evidence boundary: vendor UI, IEC references, convenience claims, and model-token claims are not treated as proof of character use or encoding need.
- Protected state: no live registry status, artwork, geometry, identifiers, licensing position, participant authorization, or external posture changed.
- Validation: headings and fields were checked against current SEW guidelines and the ISO/IEC summary-form requirement; repository-wide test execution was not run because this change adds documentation only and the working tree is connector-backed.
- Limitations: this is a self-critical scaffold, not a substitute for the official submission form, a font, a CLA, or independent evidence.
