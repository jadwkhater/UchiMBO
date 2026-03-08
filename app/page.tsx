'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// ═══════════════════════════════════════════════════════════════════════
//  MUSIC ENGRAVING ENGINE — pure SVG geometry, no glyph hacks
//
//  STAFF MODEL:
//    5 lines, spaced SPACE px apart.
//    Line indices: L1(top)=0, L2=1, L3=2(middle), L4=3, L5=4
//    Pitch positions are in "slots" measured from L1:
//      slot 0 = L1, slot 1 = space above L2, slot 2 = L2, …
//      slot 4 = L3 (middle line), slot 8 = L5 (bottom)
//      slot -1 = one step above L1, slot -2 = ledger line above, etc.
//      slot 9 = one step below L5, slot 10 = ledger below, etc.
//    y(slot, staffTop) = staffTop + slot * HALF_SPACE
//
//  STEM RULE: slot < 4 → stem DOWN (head on right, stem left, goes down)
//             slot >= 4 → stem UP  (head on right, stem right, goes up)
//  Wait — standard convention:
//    Notes ABOVE middle line (slot < 4) → stem DOWN
//    Notes ON or BELOW middle line (slot >= 4) → stem UP
//
//  TREBLE CLEF drawn as SVG path scaled to staff.
//  Each note/rest/clef is a self-contained SVG group placed at (cx, staffTop).
// ═══════════════════════════════════════════════════════════════════════

const SPACE       = 10;          // px between staff lines
const HALF        = SPACE / 2;   // px per pitch slot
const STAFF_H     = SPACE * 4;   // line1→line5
const INK         = '#800000';
const PAGE        = '#F5F1E8';
const SW          = 1.0;         // staff line stroke width
const NSW         = 1.2;         // note stroke width

// y of a pitch slot relative to staffTop
const slotY = (staffTop: number, slot: number) => staffTop + slot * HALF;

// Stem direction: UP (-1 in y) when slot >= 4 (on/below middle line)
// DOWN (+1 in y) when slot < 4 (above middle line)
const stemDir = (slot: number): 'up' | 'down' => slot >= 4 ? 'up' : 'down';

// ── Notehead ────────────────────────────────────────────────────────────
// cx,cy = center of notehead
// filled: quarter/eighth; open: half; whole: special
function Notehead({
  cx, cy, type,
}: {
  cx: number; cy: number;
  type: 'filled' | 'open' | 'whole';
}) {
  const rx = 5.0, ry = 3.4;
  const angle = -18;
  if (type === 'whole') {
    return (
      <g>
        <ellipse cx={cx} cy={cy} rx={rx + 0.8} ry={ry + 0.4} fill={INK} />
        {/* hollow centre rotated to make it look right */}
        <ellipse cx={cx} cy={cy} rx={2.2} ry={ry + 0.4}
          fill={PAGE} transform={`rotate(${angle}, ${cx}, ${cy})`} />
      </g>
    );
  }
  if (type === 'open') {
    return (
      <g>
        <ellipse cx={cx} cy={cy} rx={rx} ry={ry}
          fill={INK} transform={`rotate(${angle}, ${cx}, ${cy})`} />
        <ellipse cx={cx} cy={cy} rx={2.4} ry={ry}
          fill={PAGE} transform={`rotate(${angle}, ${cx}, ${cy})`} />
      </g>
    );
  }
  return (
    <ellipse cx={cx} cy={cy} rx={rx} ry={ry}
      fill={INK} transform={`rotate(${angle}, ${cx}, ${cy})`} />
  );
}

// ── Stem ─────────────────────────────────────────────────────────────
function Stem({
  cx, cy, dir, tipY,
}: {
  cx: number; cy: number; dir: 'up' | 'down'; tipY: number;
}) {
  // Stem attaches right side of head when going up, left side when going down
  const x = dir === 'up' ? cx + 4.8 : cx - 4.8;
  return <line x1={x} y1={cy} x2={x} y2={tipY} stroke={INK} strokeWidth={NSW} />;
}

// ── Eighth flag (single, unbeamed) ──────────────────────────────────
function Flag({ cx, dir, tipY }: { cx:number; dir:'up'|'down'; tipY:number }) {
  const x = dir === 'up' ? cx + 4.8 : cx - 4.8;
  if (dir === 'up') {
    return <path d={`M${x},${tipY} C${x+12},${tipY+4} ${x+10},${tipY+12} ${x+1},${tipY+16}`}
      fill="none" stroke={INK} strokeWidth={NSW} />;
  }
  return <path d={`M${x},${tipY} C${x+12},${tipY-4} ${x+10},${tipY-12} ${x+1},${tipY-16}`}
    fill="none" stroke={INK} strokeWidth={NSW} />;
}

// ── Ledger lines ─────────────────────────────────────────────────────
function Ledgers({ cx, slot, staffTop }: { cx:number; slot:number; staffTop:number }) {
  const lines: React.ReactElement[] = [];
  // above staff: even slots <= -2  (slot -2 = ledger line, -1 = space above it)
  for (let s = -2; s >= slot - 1; s -= 2) {
    if (s >= slot - 1) {
      const y = slotY(staffTop, s);
      lines.push(<line key={`u${s}`} x1={cx - 8} y1={y} x2={cx + 8} y2={y}
        stroke={INK} strokeWidth={SW} />);
    }
  }
  // below staff: even slots >= 10
  for (let s = 10; s <= slot + 1; s += 2) {
    if (s <= slot + 1) {
      const y = slotY(staffTop, s);
      lines.push(<line key={`d${s}`} x1={cx - 8} y1={y} x2={cx + 8} y2={y}
        stroke={INK} strokeWidth={SW} />);
    }
  }
  return <>{lines}</>;
}

// ── Accidental ───────────────────────────────────────────────────────
// Drawn as SVG paths, not unicode glyphs
function Sharp({ cx, cy }: { cx:number; cy:number }) {
  // Two vertical lines + two diagonal crossbars
  return (
    <g transform={`translate(${cx - 12}, ${cy - 7})`}>
      <line x1={3} y1={0} x2={3} y2={14} stroke={INK} strokeWidth={1} />
      <line x1={7} y1={0} x2={7} y2={14} stroke={INK} strokeWidth={1} />
      <line x1={1} y1={4}  x2={9} y2={2.5}  stroke={INK} strokeWidth={1.4} />
      <line x1={1} y1={9}  x2={9} y2={7.5}  stroke={INK} strokeWidth={1.4} />
    </g>
  );
}

function Flat({ cx, cy }: { cx:number; cy:number }) {
  return (
    <g transform={`translate(${cx - 11}, ${cy - 10})`}>
      <line x1={3} y1={0} x2={3} y2={15} stroke={INK} strokeWidth={1} />
      <path d={`M3,7 Q12,7 12,11 Q12,15 3,15`}
        fill={INK} stroke={INK} strokeWidth={0.5} />
    </g>
  );
}

// ── Rests ────────────────────────────────────────────────────────────
function WholeRest({ cx, staffTop }: { cx:number; staffTop:number }) {
  // Solid rectangle hanging below line 2 (slot 2)
  const y = slotY(staffTop, 2);
  return <rect x={cx - 7} y={y} width={14} height={HALF} fill={INK} />;
}
function HalfRest({ cx, staffTop }: { cx:number; staffTop:number }) {
  // Solid rectangle sitting ON top of line 3 (slot 4)
  const y = slotY(staffTop, 4);
  return <rect x={cx - 7} y={y - HALF} width={14} height={HALF} fill={INK} />;
}
function QuarterRest({ cx, staffTop }: { cx:number; staffTop:number }) {
  // Stylised quarter rest as SVG path centred on middle of staff
  const x = cx, y = slotY(staffTop, 3);
  return (
    <path
      d={`M${x-2},${y} Q${x+5},${y+2} ${x+1},${y+4} Q${x-4},${y+6} ${x+2},${y+8}
          L${x+2},${y+10} Q${x-3},${y+8} ${x+1},${y+6} Q${x+5},${y+4} ${x-2},${y+2} Z`}
      fill={INK}
    />
  );
}

// ── Treble Clef — drawn as SVG path ─────────────────────────────────
// The treble clef curls around line 2 (slot 2 = G4 in treble).
// It extends from about 2 slots above L1 to 2 slots below L5.
// We define it in a local coordinate system then transform it.
// ═══════════════════════════════════════════════════════════════════════
interface NoteData {
  slot: number;       // pitch slot (0=L1 top … 8=L5 bottom; neg=above; >8=below)
  dur: number;        // duration in quarter-note beats (4=whole,2=half,1=q,0.5=e)
  acc?: 'sharp' | 'flat';
  dot?: boolean;
  rest?: 'whole' | 'half' | 'quarter';
  beamRole?: 'start' | 'mid' | 'end'; // beam grouping for eighths
}

// Shorthand constructors
const N = (slot: number, dur: number, acc?: 'sharp'|'flat', dot?: boolean): NoteData =>
  ({ slot, dur, acc, dot });
const BS = (slot: number, acc?: 'sharp'|'flat'): NoteData => ({ slot, dur: 0.5, beamRole: 'start', acc });
const BM = (slot: number, acc?: 'sharp'|'flat'): NoteData => ({ slot, dur: 0.5, beamRole: 'mid', acc });
const BE = (slot: number, acc?: 'sharp'|'flat'): NoteData => ({ slot, dur: 0.5, beamRole: 'end', acc });

// ── RACHMANINOFF SYMPHONY NO. 2, MVMT II ────────────────────────────
// Famous Adagio violin melody, A major, 4/4
// Treble clef slot mapping:
//   slot -4 = C6 (two ledger lines above)
//   slot -2 = B5 (one ledger above)
//   slot -1 = A5 (space above staff)
//   slot  0 = F5 (line 1)
//   slot  1 = E5
//   slot  2 = D5 (line 2)
//   slot  3 = C5
//   slot  4 = B4 (line 3, middle)
//   slot  5 = A4
//   slot  6 = G4 (line 4)
//   slot  7 = F4 (F♯4 with key sig)
//   slot  8 = E4 (line 5)
//   slot  9 = D4
//   slot 10 = C4 (middle C, ledger below)
const MELODY: NoteData[] = [
  // Bar 1 pickup (1 beat)
  N(5, 1),              // A4

  // Bar 2
  N(3, 2),              // C5 half
  N(5, 1),              // A4
  N(4, 1),              // B4

  // Bar 3
  N(2, 2),              // D5 half
  N(5, 1),              // A4
  N(4, 1),              // B4

  // Bar 4
  N(3, 2),              // C5 half
  N(5, 1),              // A4
  N(6, 1),              // G4

  // Bar 5
  N(5, 2),              // A4 half
  N(3, 1),              // C5
  N(2, 1),              // D5

  // Bar 6
  N(1, 2),              // E5 half
  N(3, 1),              // C5
  N(5, 1),              // A4

  // Bar 7
  N(6, 1, 'sharp'),     // G♯4
  N(5, 1),              // A4
  N(4, 1),              // B4
  N(3, 1),              // C5

  // Bar 8
  N(2, 2),              // D5 half
  N(0, 2),              // F5 half (high)

  // Bar 9
  N(1, 2, undefined, true), // E5 dotted-half
  N(2, 1),              // D5

  // Bar 10
  N(3, 2),              // C5 half
  N(5, 1),              // A4
  N(4, 1),              // B4

  // Bar 11
  N(2, 2, undefined, true), // D5 dotted-half
  N(3, 1),              // C5

  // Bar 12
  N(1, 2),              // E5 half
  N(3, 1),              // C5
  N(5, 1),              // A4

  // Bar 13
  N(6, 1, 'sharp'),     // G♯4
  N(5, 1),              // A4
  N(4, 1),              // B4
  N(3, 1),              // C5

  // Bar 14
  N(2, 2),              // D5 half
  N(9, 2),              // D4 half (low)

  // Bar 15
  N(8, 2),              // E4 half
  N(5, 1),              // A4
  N(4, 1),              // B4

  // Bar 16
  N(3, 4),              // C5 whole

  // Bar 17
  N(5, 2),              // A4 half
  N(3, 1),              // C5
  N(2, 1),              // D5

  // Bar 18
  N(1, 2),              // E5 half
  BS(3), BE(2),         // C5-D5 beamed eighths
  N(1, 1),              // E5

  // Bar 19
  N(0, 2),              // F5 half (climax)
  N(1, 1),              // E5
  N(2, 1),              // D5

  // Bar 20
  N(3, 2),              // C5 half
  N(5, 1),              // A4
  N(6, 1, 'sharp'),     // G♯4

  // Bar 21
  N(5, 2),              // A4 half
  N(4, 1),              // B4
  N(3, 1),              // C5

  // Bar 22
  N(2, 2),              // D5 half
  N(3, 1),              // C5
  N(5, 1),              // A4

  // Bar 23
  N(4, 2),              // B4 half
  BS(3), BM(5), BE(4),  // C5-A4-B4 beamed

  // Bar 24
  N(5, 4),              // A4 whole — resolution

  // Bar 25
  N(5, 1), N(4, 1), N(3, 2),  // A4 B4 C5-half

  // Bar 26
  N(2, 1), N(3, 1), N(5, 2),  // D5 C5 A4-half

  // Bar 27
  N(6, 1, 'sharp'), N(5, 1), N(4, 2), // G♯4 A4 B4-half

  // Bar 28
  N(3, 4),              // C5 whole

  // Bar 29
  N(2, 2),
  BS(3), BM(2), BE(1),  // C5-D5-E5 beamed

  // Bar 30
  N(0, 2), N(1, 1), N(2, 1),  // F5 E5 D5

  // Bar 31
  N(3, 1), N(5, 1), N(6, 1, 'sharp'), N(5, 1), // C5 A4 G♯4 A4

  // Bar 32
  N(5, 4),              // A4 whole
];

// ═══════════════════════════════════════════════════════════════════════
//  LAYOUT ENGINE
// ═══════════════════════════════════════════════════════════════════════
const PX_PER_BEAT   = 26;
const MIN_NOTE_W    = 18;
const STAFF_W       = 1440;
const NOTES_START   = 12;
const NOTES_END     = STAFF_W - 12;

interface PlacedNote extends NoteData {
  cx: number;   // notehead center x
}

function layoutMelody(notes: NoteData[]): PlacedNote[][] {
  const rows: PlacedNote[][] = [];
  let row: PlacedNote[] = [];
  let x = NOTES_START;

  for (const n of notes) {
    const w = Math.max(n.dur * PX_PER_BEAT, MIN_NOTE_W);
    if (x + w > NOTES_END && row.length > 0) {
      rows.push(row);
      row = [];
      x = NOTES_START;
    }
    row.push({ ...n, cx: x + w / 2 });
    x += w;
  }
  if (row.length > 0) rows.push(row);
  return rows;
}

const ROWS = layoutMelody(MELODY);

// ═══════════════════════════════════════════════════════════════════════
//  RENDER ONE NOTE
// ═══════════════════════════════════════════════════════════════════════
const STEM_HEIGHT = SPACE * 3.2;  // standard stem length

function RenderNote({
  note, staffTop, beamTipY,
}: {
  note: PlacedNote;
  staffTop: number;
  beamTipY?: number;
}) {
  if (note.rest) {
    if (note.rest === 'whole')   return <WholeRest   cx={note.cx} staffTop={staffTop} />;
    if (note.rest === 'half')    return <HalfRest    cx={note.cx} staffTop={staffTop} />;
    return                              <QuarterRest cx={note.cx} staffTop={staffTop} />;
  }

  const cy    = slotY(staffTop, note.slot);
  const dir   = stemDir(note.slot);
  const hasStem = note.dur < 4;
  const isFilled = note.dur < 2;
  const isBeamed = !!note.beamRole;

  // Tip of stem
  const tipY  = beamTipY !== undefined
    ? beamTipY
    : dir === 'up'
      ? cy - STEM_HEIGHT
      : cy + STEM_HEIGHT;

  const headType: 'filled'|'open'|'whole' =
    note.dur >= 4 ? 'whole' : note.dur >= 2 ? 'open' : 'filled';

  return (
    <g>
      <Ledgers cx={note.cx} slot={note.slot} staffTop={staffTop} />
      {note.acc === 'sharp' && <Sharp cx={note.cx} cy={cy} />}
      {note.acc === 'flat'  && <Flat  cx={note.cx} cy={cy} />}
      <Notehead cx={note.cx} cy={cy} type={headType} />
      {note.dot && <circle cx={note.cx + 8} cy={cy} r={1.8} fill={INK} />}
      {hasStem && (
        <Stem cx={note.cx} cy={cy} dir={dir} tipY={tipY} />
      )}
      {/* Flag for solo unbeamed eighth */}
      {isFilled && !isBeamed && note.dur <= 0.5 && (
        <Flag cx={note.cx} dir={dir} tipY={tipY} />
      )}
    </g>
  );
}

// ═══════════════════════════════════════════════════════════════════════
//  RENDER ONE STAFF ROW
// ═══════════════════════════════════════════════════════════════════════
function StaffRow({
  notes, staffTop,
}: {
  notes: PlacedNote[];
  staffTop: number;
}) {
  // ── Collect beam groups ──────────────────────────────────────────
  type BeamGroup = { notes: PlacedNote[]; dir: 'up' | 'down' };
  const beamGroups: BeamGroup[] = [];
  let cur: PlacedNote[] | null = null;

  for (const n of notes) {
    if (n.beamRole === 'start') {
      cur = [n];
    } else if ((n.beamRole === 'mid' || n.beamRole === 'end') && cur) {
      cur.push(n);
      if (n.beamRole === 'end') {
        const avgSlot = cur.reduce((s, x) => s + x.slot, 0) / cur.length;
        beamGroups.push({ notes: cur, dir: stemDir(avgSlot) });
        cur = null;
      }
    }
  }

  // ── Compute beam tip y for each beamed note ──────────────────────
  // Beam tip = same y for all notes in group (flat beam)
  const tipMap = new Map<number, number>(); // cx → tipY
  for (const { notes: bn, dir } of beamGroups) {
    // Use the extreme notehead as anchor, then add/subtract stem height
    const ys = bn.map(n => slotY(staffTop, n.slot));
    const tipY = dir === 'up'
      ? Math.min(...ys) - STEM_HEIGHT
      : Math.max(...ys) + STEM_HEIGHT;
    bn.forEach(n => tipMap.set(n.cx, tipY));
  }

  return (
    <g opacity={0.075}>
      {/* ── 5 staff lines ── */}
      {[0, 1, 2, 3, 4].map(i => (
        <line key={i}
          x1={0}        y1={staffTop + i * SPACE}
          x2={STAFF_W}  y2={staffTop + i * SPACE}
          stroke={INK}  strokeWidth={SW}
        />
      ))}



      {/* ── Notes ── */}
      {notes.map((n, i) => (
        <RenderNote
          key={i}
          note={n}
          staffTop={staffTop}
          beamTipY={tipMap.get(n.cx)}
        />
      ))}

      {/* ── Beams ── */}
      {beamGroups.map(({ notes: bn, dir }, gi) => {
        const tipY = tipMap.get(bn[0].cx)!;
        // x coords: attach to stem side
        const x1 = dir === 'up' ? bn[0].cx + 4.8                : bn[0].cx - 4.8;
        const x2 = dir === 'up' ? bn[bn.length-1].cx + 4.8      : bn[bn.length-1].cx - 4.8;
        return (
          <line key={gi}
            x1={x1} y1={tipY}
            x2={x2} y2={tipY}
            stroke={INK} strokeWidth={3.5}
          />
        );
      })}

      {/* ── Final barline ── */}
      <line
        x1={STAFF_W - 2} y1={staffTop}
        x2={STAFF_W - 2} y2={staffTop + STAFF_H}
        stroke={INK} strokeWidth={1.1}
      />
    </g>
  );
}

// ═══════════════════════════════════════════════════════════════════════
//  MUSIC BACKGROUND — tile rows to fill any screen
// ═══════════════════════════════════════════════════════════════════════
const STAVE_STRIDE  = 86;   // top-of-staff to top-of-next-staff (px in viewBox)
const STAVE_MARGIN  = 32;   // first staff top
const VB_W          = 1440;
const VB_H          = 2400;

function MusicBackground() {
  const count = Math.ceil(VB_H / STAVE_STRIDE) + 1;
  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      {Array.from({ length: count }, (_item, i) => (
        <StaffRow
          key={i}
          notes={ROWS[i % ROWS.length]}
          staffTop={STAVE_MARGIN + i * STAVE_STRIDE}
        />
      ))}
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════
//  PAGE
// ═══════════════════════════════════════════════════════════════════════
export default function ComingSoon() {
  const [email, setEmail]         = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);

  const LOGO_SRC = '/UChicagoONLYLOGOR.png';

  useEffect(() => {
    const l = document.createElement('link');
    l.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=DM+Sans:wght@300;400;500&display=swap';
    l.rel  = 'stylesheet';
    document.head.appendChild(l);

    // Set favicon
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/png';
    favicon.href = '/logo.png';
    document.head.appendChild(favicon);

    // Set page title and meta
    document.title = 'UChicago Music Business — Coming Soon';
    const meta = document.createElement('meta');
    meta.name = 'description';
    meta.content = 'UChicago Music Business is a pre-professional student organization at the University of Chicago. Serious about the business. Obsessed with the music. Coming Spring 2026.';
    document.head.appendChild(meta);
  }, []);

  const FORM_ID  = '1FAIpQLSftqrgb3SlpsN1S3t2ugCYKvdMxsfx0vuCskY9n9tTMZzWeKw';
  const ENTRY_ID = 'entry.666096683';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      // Google Forms accepts cross-origin POSTs via no-cors.
      // We won't get a response body back, but the data lands in the sheet.
      await fetch(
        `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`,
        {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `${ENTRY_ID}=${encodeURIComponent(email)}`,
        }
      );
    } catch {
      // no-cors always throws — the submission still goes through
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { height: 100%; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: none; }
        }

        .l1 { animation: fadeUp  0.9s cubic-bezier(.22,.68,0,1.2) 0.10s both; }
        .l2 { animation: fadeUp  0.9s cubic-bezier(.22,.68,0,1.2) 0.30s both; }
        .dv { animation: fadeIn  1.0s ease                         0.55s both; }
        .fa { animation: fadeUp  0.9s cubic-bezier(.22,.68,0,1.2) 0.65s both; }
        .wm { animation: fadeIn  0.8s ease                         0.05s both; }
        .ct { animation: fadeIn  0.8s ease                         0.80s both; }

        .ei {
          width: 100%; background: transparent; border: none;
          border-bottom: 1.5px solid rgba(28,28,28,0.22);
          padding: 11px 0;
          font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 300;
          color: #1C1C1C; outline: none;
          transition: border-color 0.2s; letter-spacing: 0.02em;
        }
        .ei::placeholder { color: rgba(28,28,28,0.32); }
        .ei:focus { border-bottom-color: #800000; }

        .sb {
          width: 100%; background: #800000; color: #F5F1E8; border: none;
          padding: 14px 24px;
          font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase;
          cursor: pointer; border-radius: 4px;
          transition: background 0.2s, transform 0.15s; margin-top: 18px;
        }
        .sb:hover  { background: #A6192E; transform: translateY(-1px); }
        .sb:active { transform: none; }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: PAGE,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '48px 0',
        position: 'relative', overflow: 'hidden',
      }}>

        <MusicBackground />

        {/* Frosted content card */}
        <div style={{
          position: 'relative', zIndex: 1,
          width: '100%', maxWidth: 500,
          textAlign: 'center',
          padding: '50px 44px',
          background: 'rgba(245,241,232,0.85)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderRadius: 4,
          boxShadow: '0 2px 48px rgba(28,28,28,0.09)',
          border: '1px solid rgba(128,0,0,0.1)',
        }}>

          {/* Logo */}
          <div className="wm" style={{ marginBottom: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <Image
              src={LOGO_SRC}
              alt="UChicago Music Business"
              width={72}
              height={72}
              style={{ objectFit: 'contain' }}
            />
            <div style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 13, fontWeight: 700,
              color: '#1C1C1C', letterSpacing: '0.06em',
            }}>UChicago</div>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 10, fontWeight: 600,
              color: '#800000', letterSpacing: '0.26em',
              textTransform: 'uppercase', marginTop: -4,
            }}>Music Business</div>
          </div>

          <h1 className="l1" style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(30px, 5.5vw, 60px)',
            fontWeight: 900, color: '#1C1C1C',
            lineHeight: 1.08, letterSpacing: '-0.025em', marginBottom: 6,
          }}>
            Serious about<br />the business.
          </h1>
          <h1 className="l2" style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(30px, 5.5vw, 60px)',
            fontWeight: 900, fontStyle: 'italic', color: '#800000',
            lineHeight: 1.08, letterSpacing: '-0.025em', marginBottom: 34,
          }}>
            Obsessed with<br />the music.
          </h1>

          {/* Divider */}
          <div className="dv" style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(28,28,28,0.14)' }} />
            <div style={{ display: 'flex', gap: 6 }}>
              {['#800000', '#006D6F', '#A6192E'].map(col => (
                <div key={col} style={{ width: 5, height: 5, borderRadius: '50%', background: col, opacity: 0.7 }} />
              ))}
            </div>
            <div style={{ flex: 1, height: 1, background: 'rgba(28,28,28,0.14)' }} />
          </div>

          {/* Form */}
          <div className="fa">
            {!submitted ? (
              <>
                <p style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 14, fontWeight: 300,
                  color: '#1C1C1C', opacity: 0.55,
                  letterSpacing: '0.02em', marginBottom: 22, lineHeight: 1.6,
                }}>
                  Something&apos;s coming. Be the first to know.
                </p>
                <form onSubmit={handleSubmit}>
                  <input
                    className="ei"
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                  <button className="sb" type="submit" disabled={loading}>
                    {loading ? 'Submitting…' : 'Join Our Listhost!'}
                  </button>
                </form>
              </>
            ) : (
              <div style={{ animation: 'scaleIn 0.5s cubic-bezier(.22,.68,0,1.2) both' }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  background: 'rgba(0,109,111,0.1)',
                  border: '1px solid rgba(0,109,111,0.3)',
                  borderRadius: 6, padding: '14px 24px', marginBottom: 12,
                }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8l3.5 3.5L13 5" stroke="#006D6F" strokeWidth="1.8"
                      strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 500, color: '#006D6F' }}>
                    You&apos;re on the list.
                  </span>
                </div>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: '#1C1C1C', opacity: 0.45 }}>
                  We&apos;ll be in touch soon.
                </p>
              </div>
            )}
          </div>

          <div className="ct" style={{ marginTop: 40 }}>
            <span style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 10, fontWeight: 600,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: '#1C1C1C', opacity: 0.25,
            }}>
              Coming — Spring 2026
            </span>
          </div>
        </div>
      </div>
    </>
  );
}