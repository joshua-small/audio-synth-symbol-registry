# Unicode and adjacent-standards overlap audit

Status as of 2026-08-29. This audit covers the four current `filter-response` records. It does not change their semantics, names, aliases, identifiers, scores, or status, and it does not authorize a Unicode or other standards proposal.

## Result

No existing Unicode 17.0 character was found with the semantics of a high-pass, low-pass, band-pass, or band-stop filter response. Several existing characters can resemble isolated strokes of a response curve in some fonts, but their encoded meanings are mathematical operators, delimiters, arrows, technical marks, or box-drawing pieces. None is a semantic equivalent.

ASCII labels remain the least ambiguous portable interchange for the current records: `HPF`, `LPF`, `BPF`, and `BSF`, or their canonical `asr:` identifiers. Shape-like character sequences can be useful informal sketches, but they are font-dependent, visually incomplete, and do not form an established notation identified by this audit.

IEC 60617 contains entries named High-pass filter, Low-pass filter, Band-pass filter, and Band-stop filter. Those entries are authoritative adjacent terminology for electrotechnical diagrams. They do not establish that their graphical symbols are encoded characters or that they are the target axis-less audio response representations.

## Method and reproducibility

The audit used the Unicode 17.0 NamesList as the character-name and annotation index, then checked the relevant Unicode code charts to avoid relying on rendered glyphs from an arbitrary local font.

Run from a shell with `curl` and `rg`:

```sh
curl -fsSLo NamesList-17.0.0.txt \
  https://www.unicode.org/Public/17.0.0/ucd/NamesList.txt

rg -ni 'high[- ]?pass|low[- ]?pass|band[- ]?pass|band[- ]?stop|band[- ]?reject|low cut|high cut|filter' \
  NamesList-17.0.0.txt

rg -n '^(2197|2198|221A|2229|222A|2312|2322|2323|23DC|23DD|256D|256E|256F|2570|2934|2935)\b' \
  NamesList-17.0.0.txt
```

The first search produced no semantic character-name or annotation match for the filter terms. The second retrieves the candidate characters below by code point. A future Unicode version must be audited against that version's own NamesList and charts rather than assuming this result remains current.

Primary sources:

- [Unicode 17.0 NamesList](https://www.unicode.org/Public/17.0.0/ucd/NamesList.txt)
- [Unicode 17.0 Mathematical Operators chart](https://www.unicode.org/charts/PDF/U2200.pdf)
- [Unicode 17.0 Miscellaneous Technical chart](https://www.unicode.org/charts/PDF/U2300.pdf)
- [Unicode 17.0 Box Drawing chart](https://www.unicode.org/charts/PDF/U2500.pdf)
- [Unicode 17.0 Supplemental Arrows-B chart](https://www.unicode.org/charts/PDF/U2900.pdf)
- [Unicode Technical Standard #39: Unicode Security Mechanisms](https://www.unicode.org/reports/tr39/), for the scope of Unicode confusable detection
- [IEC 60617 official database preview](https://webstore.iec.ch/en/iec_catalog/product/preview/?id=L3B1Yi9wZGYvcHJldmlldy9pbmZvX2llYzYwNjE3e2VkMS4wfWIucGRm)

## Semantic candidate search

| Registry record | Unicode semantic equivalent found | Closest portable text | Conclusion |
| --- | --- | --- | --- |
| `asr:filter.high-pass` | None | `HPF`; canonical ID `asr:filter.high-pass` | No existing Unicode character names or annotations identify a high-pass or low-cut filter response. |
| `asr:filter.low-pass` | None | `LPF`; canonical ID `asr:filter.low-pass` | No existing Unicode character names or annotations identify a low-pass or high-cut filter response. |
| `asr:filter.band-pass` | None | `BPF`; canonical ID `asr:filter.band-pass` | No existing Unicode character names or annotations identify a band-pass filter response. |
| `asr:filter.band-stop` | None | `BSF`; canonical ID `asr:filter.band-stop` | No existing Unicode character names or annotations identify a band-stop or band-reject filter response. The separate notch boundary evidence remains controlling. |

This is a non-duplication finding only. Absence of an equivalent does not establish character demand, plain-text use, or proposal readiness.

## Visual-confusable audit

Here, "visual confusable" means a character that a reader might mistake for part of a proposed response curve in at least some rendering. It does not mean the character is listed as a Unicode security confusable. UTS #39 compares encoded strings; it cannot list an unencoded registry concept as a formal confusable target.

| Candidate | Encoded meaning and source annotation | Records most exposed | Why it is not equivalent |
| --- | --- | --- | --- |
| `√` U+221A SQUARE ROOT | Mathematical radical sign | High-pass | Its radical hook and rising stroke can resemble a high-pass sketch, but it encodes a mathematical operation and lacks the response's passband/stopband model. |
| `∩` U+2229 INTERSECTION | Mathematical intersection; NamesList alias `cap` | Band-pass | Some fonts resemble a rounded band-pass hump. It remains a set operator, with no frequency or filtering semantics. |
| `∪` U+222A UNION | Mathematical union; NamesList alias `cup` | Band-stop | Some fonts resemble a band-stop valley. It remains a set operator, with no frequency or filtering semantics. |
| `⌒` U+2312 ARC | Technical mark; NamesList annotation `position of any line` | Band-pass | It supplies only a generic arc and omits the side plateaus and response semantics. |
| `⌢` U+2322 FROWN and `⌣` U+2323 SMILE | Miscellaneous technical characters | Band-pass, band-stop | They can resemble a peak or valley, but encode frown/smile technical marks and not filter behavior. |
| `⏜` U+23DC TOP PARENTHESIS and `⏝` U+23DD BOTTOM PARENTHESIS | Extensible horizontal mathematical brackets | Band-pass, band-stop | Unicode specifies them for bracketing mathematical expressions, not as independent response curves. Their width can change with layout. |
| `↗` U+2197 NORTH EAST ARROW and `↘` U+2198 SOUTH EAST ARROW | Directional arrows | High-pass, low-pass | The arrowhead adds movement or direction semantics, and a diagonal alone omits the response plateaus. |
| `⤴` U+2934 and `⤵` U+2935 | Rightward arrows curving upward or downward | High-pass, low-pass | These explicitly encode arrows and their route, not magnitude over frequency. |
| `╭` `╮` `╯` `╰` U+256D-U+2570 | Box-drawing character-cell arcs | All four | These are layout pieces intended to join cell borders. Any assembled curve depends on a monospaced grid and line joining. |

The confusable risk is asymmetric: an unfamiliar filter glyph could be read as one of these established characters, while substituting one of these characters would falsely import its existing semantics. A future artwork study should test these candidates explicitly rather than merely testing recognition among the four proposed shapes.

## Plausible character sequences

| Record | Plausible sketch or label | What it communicates | Limitation |
| --- | --- | --- | --- |
| High-pass | `HPF`, `↗`, `__/‾‾` | Name or rough rising response | `HPF` is unambiguous but not pictorial; the sketches vary with font and imply neither calibrated axes nor a standardized glyph. |
| Low-pass | `LPF`, `↘`, `‾‾\__` | Name or rough falling response | Same limitations; arrow direction can be misread as change over time. |
| Band-pass | `BPF`, `∩`, `/\` | Name or rough central pass region | `∩` already means intersection; `/\` has no side plateaus and changes spacing by font. |
| Band-stop | `BSF`, `∪`, `\/` | Name or rough central rejection region | `∪` already means union; `\/` cannot communicate bandwidth or distinguish the open notch question. |

None of the shape sequences is recommended as canonical interchange. They are included because the overlap rubric requires plausible sequences to be considered, including sequences that fail. The existing ASCII labels and `asr:` identifiers remain the registry's documented interchange path.

## Adjacent standards terminology

The official IEC 60617 database preview describes IEC 60617 as a pictorial language for electrotechnical diagrams and lists:

| IEC 60617 identity | IEC title | Registry relation |
| --- | --- | --- |
| S01247 | High-pass filter | Same broad filter function terminology; different documentation and representation domain. |
| S01248 | Low-pass filter | Same broad filter function terminology; different documentation and representation domain. |
| S01249 | Band-pass filter | Same broad filter function terminology; different documentation and representation domain. |
| S01250 | Band-stop filter | Same broad filter function terminology; different documentation and representation domain. |

IEC says its symbols are intended for diagram classes including overview, function, and circuit diagrams, and that entries contain a symbol identity, name, graphical representation, and application metadata. The registry records instead describe compact axis-less audio/synthesis response concepts. The shared terminology is material semantic adjacency, but it does not make the IEC database objects Unicode characters or prove that IEC artwork and the registry target are visually interchangeable.

The IEC preview also lists ISO/IEC 10646 among its normative references. That linkage does not imply that every IEC 60617 graphical symbol has a UCS code point. The Unicode 17 search above independently found no character for these four filter-response concepts.

No IEC artwork is reproduced, traced, or used to select a contour. This audit cites only the official database description, identifiers, and titles. IEC 60417 and ISO 7000 are not claimed as audited here; expanding into equipment-control and public-information symbols would be a separate bounded audit.

## Per-record disposition

### High-pass

- Semantic equivalent: none found.
- Primary visual risks: U+221A, rising arrows, and joined box-drawing strokes.
- Sequence disposition: retain `HPF` and `asr:filter.high-pass`; reject arrow or radical substitution as semantic interchange.
- Standards disposition: IEC S01247 is adjacent terminology and diagram-symbol context, not an encoded substitute.

### Low-pass

- Semantic equivalent: none found.
- Primary visual risks: falling arrows and joined box-drawing strokes.
- Sequence disposition: retain `LPF` and `asr:filter.low-pass`; reject arrow substitution as semantic interchange.
- Standards disposition: IEC S01248 is adjacent terminology and diagram-symbol context, not an encoded substitute.

### Band-pass

- Semantic equivalent: none found.
- Primary visual risks: U+2229, U+2312, U+2322, U+23DC, and assembled diagonals/arcs.
- Sequence disposition: retain `BPF` and `asr:filter.band-pass`; reject intersection, bracket, or arc substitution as semantic interchange.
- Standards disposition: IEC S01249 is adjacent terminology and diagram-symbol context, not an encoded substitute.

### Band-stop

- Semantic equivalent: none found.
- Primary visual risks: U+222A, U+2323, U+23DD, and assembled diagonals/arcs.
- Sequence disposition: retain `BSF` and `asr:filter.band-stop`; reject union, bracket, or smile substitution as semantic interchange.
- Standards disposition: IEC S01250 is adjacent terminology and diagram-symbol context, not an encoded substitute. This audit does not resolve or alter the separately documented band-stop/notch boundary.

## Consequences for current work

1. The overlap-audit dimension now has a reproducible source-backed artifact for all four records.
2. The audit does not by itself change an assessment score. Any reassessment must apply the adopted rubric in a separate immutable snapshot and preserve other blockers.
3. The Unicode non-go condition remains active because overlap is only one requirement; portable plain-text demand, community support, neutral artwork, and accepted registry status remain unresolved.
4. Recognition-study stimuli should include the strongest visual confusables above as negative controls.
5. A future Unicode-version refresh should rerun the exact term and code-point checks and record additions or changed annotations.

## Agent Report - 2026-08-29T21:33:31-07:00

- Scope: audited Unicode semantic candidates, visual confusables, plausible character sequences, and adjacent standards terminology for the four current records.
- Evidence: used Unicode 17.0 NamesList and official code charts, UTS #39 for confusable terminology, and the official IEC 60617 database preview and identity list.
- Outcome: found no Unicode semantic equivalent; documented non-equivalent visual candidates and failed sequence substitutes; mapped IEC S01247-S01250 as adjacent diagram-symbol terminology.
- Guardrails: made no record, semantic, property, alias, identifier, artwork, score, status, outreach, or external-position change; reproduced no standards artwork.
- Validation: exact repository validation and independent review are required before merge.
- Limitations: did not audit later Unicode versions, restricted IEC subscriber-only data sheets, IEC 60417, ISO 7000, or font-by-font rendering behavior.
