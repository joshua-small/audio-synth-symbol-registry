# Registry acceptance rubric

## Purpose

This rubric evaluates readiness of a registry record. It does not assert Unicode eligibility, grant a code point, or convert a visual treatment into a character.

Use this rubric with the evidence ledger and a dated assessment sidecar. Record observed fact, interpretation, counterevidence, and recommendation separately.

References:

- [JSON Schema specification](https://json-schema.org/specification)
- [W3C Data on the Web Best Practices](https://www.w3.org/TR/dwbp/)
- [Unicode Symbol and Emoji Subcommittee guidelines](https://sew.unicode.org/guidelines)
- [Unicode character proposal FAQ](https://www.unicode.org/faq/char_proposal.html)

## Terms

- Independent source: A source from a distinct publisher, author, product line, implementation, or community. Multiple manuals from one vendor count as one independence group unless they document independently developed use.
- Direct observation: What a cited source actually shows or states.
- Target representation: The compact audio or synthesis representation under review. A circuit-diagram symbol, a graph with axes, or a text label is adjacent evidence unless it is also used as the target representation.
- Material question: An unresolved question that could change semantic scope, canonical name, identifier, alias treatment, interchange behavior, or the conclusion that a target representation exists.
- Evidence score: A structured aid for review. It never overrides a hard blocker or a Human Review gate.

## Evidence hygiene

Every assessment must:

1. Cite ledger source IDs for every positive score.
2. Count source independence, not raw URL count.
3. Preserve counterexamples, divergent drawings, failed searches, and negative findings.
4. State what each source proves and what it does not prove.
5. Avoid treating product UI evidence as plain-text interchange evidence.
6. Avoid treating IEC, ISO, or other standards artwork as reusable artwork or direct proof of the target compact form.
7. Avoid copying, tracing, or importing third-party artwork.

## Scoring dimensions

The maximum score is 20.

| Dimension | Range | Score 0 | Midpoint evidence | Maximum evidence |
| --- | ---: | --- | --- | --- |
| Semantic stability and scope | 0-4 | No usable semantic definition. | 2: A defined concept with source support, but aliases or boundaries remain unclear. | 4: Canonical definition, scope, aliases, related terms, fallback, and speech label survive independent counterevidence review with no material ambiguity. |
| Independent usage evidence | 0-4 | No direct evidence. | 2: One documented implementation or actual use plus a separate semantic source. | 4: At least five independent sources across at least three evidence sectors, including at least two independently implemented or observed uses. |
| Text fallback and accessibility | 0-3 | No fallback or speech label. | 2: A source-grounded fallback and speech label are unambiguous, though broad plain-text use remains unproven. | 3: Independent prose, documentation, community, or interchange evidence shows the fallback or canonical term is used unambiguously outside one product UI. |
| Visual-variant convergence and divergence | 0-3 | No target representation evidence. | 2: At least two independent target renderings converge on the same primitive, and divergences are documented. | 3: At least three independent implementations converge; exclusions such as axes, parameter values, color, orientation, and interaction state are explicitly documented. |
| Existing-standard and Unicode overlap audit | 0-3 | No audit. | 2: Current Unicode and adjacent-standard references are checked, with a documented non-equivalence rationale. | 3: Reproducible audit covers semantic equivalents, likely visual confusables, character sequences, and relevant standards terminology or symbols. |
| Legal provenance for reference artwork | 0-3 | Artwork provenance or rights are unknown. | 2: All source material has rights notes and no third-party artwork is imported. | 3: Score 2, plus every published reference asset is original, neutral, editable SVG with its project license and review record. No published artwork also qualifies if no visual asset is claimed. |

### Semantic stability and scope

- 1: Draft definition only.
- 2: Definition and canonical name are source-supported, but a boundary, alias, or related-term issue remains.
- 3: Definition, scope, aliases, related terms, fallback, and speech label are documented; nonmaterial questions may remain.
- 4: Score 3 plus independent adverse review finds no material ambiguity.

### Independent usage evidence

- 1: One education, terminology, or standards source only.
- 2: One target implementation or observed use plus one independent semantic source.
- 3: At least three independent sources in at least two sectors, including at least two target implementations or observed uses.
- 4: At least five independent sources in at least three sectors, including at least two target implementations or observed uses.

Evidence sectors include vendor documentation, implementation or open-source project, education, independent trade media, standards, and user community. A source may support more than one claim but may count toward only one independence group.

### Text fallback and accessibility

- 1: Fallback and speech label are drafted but not yet source-grounded.
- 2: Fallback, canonical name, and speech label are source-grounded and distinguish the record from related terms.
- 3: Score 2 plus independent non-UI prose or interchange evidence shows unambiguous actual use.

### Visual-variant convergence and divergence

- 1: One target compact rendering is documented.
- 2: Two independent target compact renderings converge, and differences are described.
- 3: Three independent target compact renderings converge, and the record explicitly excludes axes, parameter values, slope, color, orientation, and interaction state unless independently evidenced as semantic.

### Existing-standard and Unicode overlap audit

- 1: A preliminary search is recorded.
- 2: Unicode and adjacent standards are checked, with direct citations and a non-equivalence explanation.
- 3: The audit is reproducible and records semantic candidates, visual confusables, sequences, standards terminology, and exclusions.

### Legal provenance for reference artwork

- 1: Sources are linked but rights or asset origin remains incomplete.
- 2: Sources carry rights notes and the repository imports no third-party artwork.
- 3: Score 2 plus every published asset is original neutral editable SVG with a license and review reference. This score also applies when no artwork is published or claimed.

## Status thresholds

### Evidence-collecting

A record may be evidence-collecting when it validates against the entry schema, has at least one ledger-linked direct observation, separates interpretation from observation, marks its identifier provisional, and preserves open questions and counterevidence. No score threshold applies.

### Registry-candidate

A record may be promoted to registry-candidate only when:

- Total score is at least 13 of 20.
- Semantic stability is at least 3.
- Independent usage evidence is at least 2.
- Text fallback and accessibility is at least 2.
- Visual convergence is at least 2.
- Existing-standard and Unicode audit is at least 2.
- Legal provenance is at least 2.
- No hard blocker or material question remains open.
- An independent agent review verifies the evidence references, score arithmetic, and threshold calculation.

This is a registry research status, not a Unicode proposal status. A provisional identifier remains provisional.

### Registry-accepted

A record may be promoted to registry-accepted only when:

- Total score is at least 18 of 20.
- Semantic stability is 4.
- Independent usage evidence is 4.
- Text fallback and accessibility is 3.
- Visual convergence is at least 2.
- Existing-standard and Unicode audit is at least 2.
- Legal provenance is 3.
- No hard blocker or material question remains open.
- A public review period of at least 14 days has been documented, unless a later durable decision changes this rule.
- An independent agent review has passed.
- Joshua has explicitly authorized promotion under the Human Review protocol in `AGENTS.md`.

On promotion, the `asr:` identifier becomes permanent under D-009. Acceptance does not itself authorize a public release, a new symbol family, external outreach, or standards action.

## Hard blockers

Do not promote a record while any of these applies:

- The record fails schema validation or does not link each claimed source to the ledger.
- Two records have materially overlapping semantics and lack a documented separation.
- A canonical name, identifier, alias, or related-term decision remains materially ambiguous.
- Claimed target glyph evidence is actually only a circuit diagram, graph, generic curve, vendor interaction state, or other non-equivalent representation.
- Evidence sources are derivative duplicates presented as independent corroboration.
- A visual difference carries undefined semantic information.
- Third-party artwork is copied, traced, imported, or represented as reusable without documented permission.
- A source materially contradicts the record and has no documented disposition.
- A claim of existing-standard, Unicode, or community support exceeds the cited source.
- Promotion would violate a Human Review gate in `AGENTS.md`.

## Counterevidence procedure

For each counterexample or conflict:

1. Add or update a ledger entry with a direct observation and rights note.
2. State whether it is semantic divergence, rendering divergence, terminology divergence, or a false match.
3. Link it from the assessment.
4. Either revise scope, create a separate record, retain it as a documented variant, or explain why it does not affect the record.
5. Leave it visible. Do not delete counterevidence merely because the record remains useful.

One unresolved material counterexample blocks promotion regardless of total score.

## Formal Unicode non-go condition

Do not begin a formal Unicode proposal for a record if any of the following is true:

- The record is not registry-accepted.
- Evidence supports only UI, diagram, font-icon, or illustration use rather than a stable plain-text communication need.
- There are fewer than three independently sourced examples where textual communication is ambiguous, lossy, or requires a custom-font, image, or improvised workaround.
- Existing Unicode characters, character sequences, or standardized notation have not received a reproducible non-duplication and confusability audit.
- The proposed semantic scope, glyph model, or distinction from adjacent records remains materially unresolved.
- No neutral original reference rendering and character-property rationale can be supplied without third-party artwork.
- Community use, review, and support evidence is insufficient for the Unicode Symbol and Emoji Subcommittee guidance.
- Joshua has not separately authorized the applicable external-standard action.

The correct outcome is to continue the open registry, evidence corpus, accessible fallbacks, and optional original artwork. It is not a project failure.

## Scope of these safeguards

The candidate threshold, accepted threshold, dimension floors, 14-day public-review period, and three-example text-workaround test are this project's governance safeguards. They are not asserted to be Unicode requirements, AES requirements, IEC requirements, or requirements of any other outside body. Any external submission must be evaluated against that body's current published rules and separately authorized under `AGENTS.md`.
