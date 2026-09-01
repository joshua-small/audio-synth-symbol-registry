#!/usr/bin/env python3
"""Build a deterministic, private, cmap-free font proof from locked ASR SVGs."""

from __future__ import annotations

import argparse
import hashlib
import json
import math
import platform
import re
import sys
from pathlib import Path
from xml.etree import ElementTree

import fontTools
from fontTools.fontBuilder import FontBuilder
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.recordingPen import RecordingPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.ttLib import TTFont


TOOL_VERSION = "0.1.0"
REQUIRED_FONTTOOLS = "4.61.1"
UPM = 1536
SOURCE_GRID = 24
SCALE = UPM // SOURCE_GRID
STROKE_WIDTH = 2.25
RADIUS = STROKE_WIDTH * SCALE / 2
CURVE_STEPS = 96
CIRCLE_STEPS = 32
ALLOWED_TABLES = {"GlyphOrder", "OS/2", "glyf", "head", "hhea", "hmtx", "loca", "maxp", "name", "post"}
TOKEN_RE = re.compile(r"[A-Za-z]|[-+]?(?:\d+(?:\.\d*)?|\.\d+)")


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def glyph_name(record_id: str) -> str:
    return record_id.replace("-", "_").replace(":", ".")


def ensure_private_output(root: Path, output: Path) -> None:
    root = root.resolve()
    output = output.resolve()
    if output == root or root in output.parents:
        raise ValueError("private proof output must be outside the repository")
    if output.exists():
        raise ValueError("private proof output directory already exists")
    output.mkdir(parents=True)


def cubic_point(p0, p1, p2, p3, t):
    mt = 1 - t
    return (
        mt**3 * p0[0] + 3 * mt**2 * t * p1[0] + 3 * mt * t**2 * p2[0] + t**3 * p3[0],
        mt**3 * p0[1] + 3 * mt**2 * t * p1[1] + 3 * mt * t**2 * p2[1] + t**3 * p3[1],
    )


def parse_centerlines(path_data: str):
    tokens = TOKEN_RE.findall(path_data)
    i = 0
    current = None
    lines = []
    active = None
    while i < len(tokens):
        command = tokens[i]
        i += 1
        if command == "M":
            current = (float(tokens[i]), float(tokens[i + 1]))
            i += 2
            active = [current]
            lines.append(active)
        elif command == "H":
            if current is None:
                raise ValueError("H command before M")
            current = (float(tokens[i]), current[1])
            i += 1
            active.append(current)
        elif command == "C":
            if current is None:
                raise ValueError("C command before M")
            p1 = (float(tokens[i]), float(tokens[i + 1]))
            p2 = (float(tokens[i + 2]), float(tokens[i + 3]))
            p3 = (float(tokens[i + 4]), float(tokens[i + 5]))
            i += 6
            p0 = current
            for step in range(1, CURVE_STEPS + 1):
                active.append(cubic_point(p0, p1, p2, p3, step / CURVE_STEPS))
            current = p3
        else:
            raise ValueError(f"unsupported SVG path command: {command}")
    if not lines or any(len(line) < 2 for line in lines):
        raise ValueError("path contains no usable open centerline")
    return lines


def font_point(point):
    return (round(point[0] * SCALE), round((SOURCE_GRID - point[1]) * SCALE))


def clockwise(points):
    area2 = sum(
        points[index][0] * points[(index + 1) % len(points)][1]
        - points[(index + 1) % len(points)][0] * points[index][1]
        for index in range(len(points))
    )
    return list(reversed(points)) if area2 > 0 else points


def add_contour(pen: TTGlyphPen, points):
    points = clockwise([(round(x), round(y)) for x, y in points])
    pen.moveTo(points[0])
    for point in points[1:]:
        pen.lineTo(point)
    pen.closePath()


def stroked_glyph(centerlines):
    pen = TTGlyphPen(None)
    contour_count = 0
    for source_line in centerlines:
        line = [font_point(point) for point in source_line]
        for p0, p1 in zip(line, line[1:]):
            dx, dy = p1[0] - p0[0], p1[1] - p0[1]
            length = math.hypot(dx, dy)
            if not length:
                continue
            nx, ny = -dy / length * RADIUS, dx / length * RADIUS
            add_contour(pen, [
                (p0[0] + nx, p0[1] + ny),
                (p1[0] + nx, p1[1] + ny),
                (p1[0] - nx, p1[1] - ny),
                (p0[0] - nx, p0[1] - ny),
            ])
            contour_count += 1
        for cx, cy in line:
            points = [
                (
                    cx + RADIUS * math.cos(2 * math.pi * index / CIRCLE_STEPS),
                    cy + RADIUS * math.sin(2 * math.pi * index / CIRCLE_STEPS),
                )
                for index in range(CIRCLE_STEPS)
            ]
            add_contour(pen, points)
            contour_count += 1
    return pen.glyph(), contour_count


def read_locked_sources(root: Path):
    lock_path = root / "artwork/study-locks/six-member-compact-a.json"
    lock_bytes = lock_path.read_bytes()
    lock = json.loads(lock_bytes)
    sources = []
    for asset in lock["assets"]:
        source_path = root / asset["path"]
        source_bytes = source_path.read_bytes()
        actual_hash = sha256(source_bytes)
        if actual_hash != asset["sha256"]:
            raise ValueError(f"locked source hash mismatch: {asset['path']}")
        svg = ElementTree.fromstring(source_bytes)
        if svg.attrib.get("viewBox") != "0 0 24 24":
            raise ValueError(f"unexpected viewBox: {asset['path']}")
        paths = svg.findall("{http://www.w3.org/2000/svg}path")
        if len(paths) != 1:
            raise ValueError(f"expected one path: {asset['path']}")
        path = paths[0]
        if path.attrib.get("stroke-width") != "2.25":
            raise ValueError(f"unexpected stroke width: {asset['path']}")
        if path.attrib.get("stroke-linecap") != "round" or path.attrib.get("stroke-linejoin") != "round":
            raise ValueError(f"unexpected cap or join: {asset['path']}")
        sources.append({
            **asset,
            "glyph_name": glyph_name(asset["record_id"]),
            "source_bytes": source_bytes,
            "centerlines": parse_centerlines(path.attrib["d"]),
        })
    return lock_path, lock_bytes, lock, sources


def build_font(sources):
    glyph_order = [".notdef", *[source["glyph_name"] for source in sources]]
    glyphs = {}
    metrics = {}
    empty_pen = TTGlyphPen(None)
    glyphs[".notdef"] = empty_pen.glyph()
    metrics[".notdef"] = (UPM, 0)
    contour_counts = {}
    for source in sources:
        glyph, contour_count = stroked_glyph(source["centerlines"])
        glyph.recalcBounds(None)
        glyphs[source["glyph_name"]] = glyph
        metrics[source["glyph_name"]] = (UPM, glyph.xMin)
        contour_counts[source["glyph_name"]] = contour_count

    builder = FontBuilder(UPM, isTTF=True)
    builder.setupGlyphOrder(glyph_order)
    builder.setupGlyf(glyphs, calcGlyphBounds=True)
    builder.setupHorizontalMetrics(metrics)
    builder.setupHorizontalHeader(ascent=UPM, descent=0, lineGap=0)
    # FontBuilder consults cmap while deriving OS/2 defaults. Supply an empty
    # construction table, then remove it before serialization.
    builder.setupCharacterMap({})
    builder.setupOS2(
        sTypoAscender=UPM,
        sTypoDescender=0,
        sTypoLineGap=0,
        usWinAscent=UPM,
        usWinDescent=0,
        fsSelection=0x40,
    )
    builder.setupNameTable({
        "familyName": "ASR Private Unencoded Proof",
        "styleName": "Regular",
        "uniqueFontIdentifier": "ASR Private Unencoded Proof 0.1.0",
        "fullName": "ASR Private Unencoded Proof Regular",
        "psName": "ASRPrivateUnencodedProof-Regular",
        "version": "Version 0.1.0",
        "copyright": "Source glyph artwork dedicated CC0-1.0; private generated font has no publication license selected.",
        "designer": "Audio Synth Symbol Registry project",
        "description": "Private cmap-free rendering proof. Not a Unicode assignment, proposal font, or release.",
        "licenseDescription": "Private internal validation only. No redistribution license selected for this generated font.",
    })
    builder.setupPost(keepGlyphNames=True)
    builder.setupMaxp()
    font = builder.font
    del font["cmap"]
    font.recalcTimestamp = False
    # 1970-01-01 in OpenType's 1904 epoch: deterministic and accepted by TTX.
    font["head"].created = 2082844800
    font["head"].modified = 2082844800
    return font, glyph_order, contour_counts


def serialized_glyph_inspection(font: TTFont, sources):
    glyph_set = font.getGlyphSet()
    inspections = []
    for gid, source in enumerate(sources, start=1):
        resolved_name = font.getGlyphName(gid)
        roundtrip_gid = font.getGlyphID(resolved_name)
        pen = RecordingPen()
        glyph_set[resolved_name].draw(pen)
        recording = [
            [operation, [[point[0], point[1]] for point in points]]
            for operation, points in pen.value
        ]
        recording_bytes = json.dumps(recording, separators=(",", ":")).encode()
        advance_width, left_side_bearing = font["hmtx"].metrics[resolved_name]
        inspections.append({
            "requested_gid": gid,
            "resolved_name": resolved_name,
            "roundtrip_gid": roundtrip_gid,
            "outline_recording_sha256": sha256(recording_bytes),
            "outline_operation_count": len(recording),
            "advance_width": advance_width,
            "left_side_bearing": left_side_bearing,
            "matches_expected_name": resolved_name == source["glyph_name"],
        })
    return inspections


def write_proof_svgs(font: TTFont, output: Path, sources, inspections):
    proof_dir = output / "glyphs"
    proof_dir.mkdir()
    glyph_set = font.getGlyphSet()
    results = []
    for source, inspection in zip(sources, inspections):
        name = inspection["resolved_name"]
        pen = SVGPathPen(glyph_set)
        glyph_set[name].draw(pen)
        commands = pen.getCommands()
        svg = (
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {UPM} {UPM}">'
            f'<g transform="translate(0 {UPM}) scale(1 -1)"><path d="{commands}" fill="currentColor"/></g></svg>\n'
        ).encode()
        path = proof_dir / f"{name}.svg"
        path.write_bytes(svg)
        results.append({"glyph_name": name, "path": str(path.relative_to(output)), "sha256": sha256(svg)})
    return results


def build(root: Path, output: Path):
    if fontTools.__version__ != REQUIRED_FONTTOOLS:
        raise RuntimeError(f"fontTools {REQUIRED_FONTTOOLS} required; found {fontTools.__version__}")
    ensure_private_output(root, output)
    lock_path, lock_bytes, lock, sources = read_locked_sources(root)
    font, glyph_order, contour_counts = build_font(sources)
    font_path = output / "asr-private-unencoded-proof.ttf"
    font.save(font_path, reorderTables=False)

    inspected = TTFont(font_path, recalcTimestamp=False)
    tables = sorted(inspected.keys())
    if set(tables) != ALLOWED_TABLES:
        raise RuntimeError(f"unexpected proof-font table inventory: {tables}")
    if inspected.getGlyphOrder() != glyph_order:
        raise RuntimeError("glyph order changed during serialization")
    for name in glyph_order:
        glyph = inspected["glyf"][name]
        if glyph.isComposite():
            raise RuntimeError(f"composite glyph is not allowed: {name}")
        bytecode = glyph.program.getBytecode() if hasattr(glyph, "program") else b""
        if bytecode:
            raise RuntimeError(f"glyph instructions are not allowed: {name}")
    if inspected["maxp"].maxSizeOfInstructions != 0:
        raise RuntimeError("maxp reports unexpected glyph instructions")

    ttx_path = output / "asr-private-unencoded-proof.ttx"
    inspected.saveXML(ttx_path, tables=tables, splitTables=False)
    inspections = serialized_glyph_inspection(inspected, sources)
    if any(
        not inspection["matches_expected_name"]
        or inspection["requested_gid"] != inspection["roundtrip_gid"]
        or inspection["advance_width"] != UPM
        for inspection in inspections
    ):
        raise RuntimeError("serialized glyph-name/GID/metric inspection failed")
    proof_svgs = write_proof_svgs(inspected, output, sources, inspections)
    glyph_set = inspected.getGlyphSet()
    glyph_records = []
    for gid, (source, inspection) in enumerate(zip(sources, inspections), start=1):
        glyph = glyph_set[source["glyph_name"]]
        bounds_pen = BoundsPen(glyph_set)
        glyph.draw(bounds_pen)
        glyph_records.append({
            "record_id": source["record_id"],
            "glyph_name": source["glyph_name"],
            "glyph_id": gid,
            "source_path": source["path"],
            "source_sha256": source["sha256"],
            "advance_width": glyph.width,
            "bounds": list(bounds_pen.bounds),
            "contour_count": contour_counts[source["glyph_name"]],
            "serialized_lookup": inspection,
        })

    font_bytes = font_path.read_bytes()
    ttx_bytes = ttx_path.read_bytes()
    manifest = {
        "proof_schema_version": "0.1.0",
        "tool_version": TOOL_VERSION,
        "status": "private-unencoded-proof",
        "source_lock": {
            "path": str(lock_path.relative_to(root)),
            "lock_id": lock["lock_id"],
            "sha256": sha256(lock_bytes),
        },
        "environment": {
            "python": platform.python_version(),
            "fonttools": fontTools.__version__,
            "platform": platform.platform(),
        },
        "font": {
            "path": font_path.name,
            "sha256": sha256(font_bytes),
            "size_bytes": len(font_bytes),
            "units_per_em": UPM,
            "tables": tables,
            "glyph_order": glyph_order,
            "code_points": [],
            "has_cmap": False,
            "glyph_instructions_present": False,
            "maximum_instruction_bytes": inspected["maxp"].maxSizeOfInstructions,
            "ttx_path": ttx_path.name,
            "ttx_sha256": sha256(ttx_bytes),
        },
        "conversion": {
            "source_grid": SOURCE_GRID,
            "scale": SCALE,
            "stroke_width_source_units": STROKE_WIDTH,
            "stroke_radius_font_units": RADIUS,
            "curve_steps_per_cubic": CURVE_STEPS,
            "round_disc_segments": CIRCLE_STEPS,
            "overlap_policy": "same-direction nonzero-fill union of segment rectangles and round discs; overlaps retained",
            "hinting": "none",
        },
        "glyphs": glyph_records,
        "proof_svgs": proof_svgs,
        "licensing": {
            "source_artwork": "CC0-1.0 per repository D-004 and provenance records",
            "generator": "Apache-2.0 repository tooling",
            "generated_font": "private validation artifact; no publication or redistribution license selected",
            "third_party_outlines_imported": False,
        },
        "boundaries": {
            "published": False,
            "unicode_code_points_assigned": False,
            "pua_used": False,
            "proposal_font": False,
            "canonical_artwork": False,
            "external_outreach": False,
        },
    }
    (output / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    return manifest


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", default=Path(__file__).resolve().parents[2], type=Path)
    parser.add_argument("--out", required=True, type=Path)
    args = parser.parse_args()
    manifest = build(args.root, args.out)
    print(json.dumps({
        "status": manifest["status"],
        "font_sha256": manifest["font"]["sha256"],
        "glyph_count": len(manifest["glyphs"]),
        "output": str(args.out.resolve()),
    }))


if __name__ == "__main__":
    try:
        main()
    except Exception as error:
        print(str(error), file=sys.stderr)
        sys.exit(1)
