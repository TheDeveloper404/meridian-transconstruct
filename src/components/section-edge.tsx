// Tranziție între secțiuni: un zid de cărămidă „în lucru” (cerința utilizatorului, S14) — două
// rânduri decalate de cărămizi în culoarea secțiunii următoare: jos aproape complet, sus doar câteva
// cărămizi sprijinite. Fără linii orizontale.
// Randat doar pe server (fără "use client"); modelul e determinist, deci identic la fiecare build.

type Tone = "ink" | "deep" | "paper" | "surface";

const BG: Record<Tone, string> = { ink: "bg-ink", deep: "bg-ink-deep", paper: "bg-paper", surface: "bg-surface" };
const FILL: Record<Tone, string> = {
  ink: "fill-ink",
  deep: "fill-ink-deep",
  paper: "fill-paper",
  surface: "fill-surface",
};

// Dimensiuni în unitățile viewBox-ului (1 unitate = 1 px la înălțimea de desktop).
// Rândurile stau direct unul pe altul (fără rosturi orizontale — ar forma linii pe toată lățimea);
// doar rosturi verticale între cărămizi.
const BRICK_W = 64;
const BRICK_H = 18;
const JOINT = 4;
const WIDTH = 2880; // acoperă și ecranele foarte late; surplusul e tăiat (slice)
const HEIGHT = BRICK_H * 2;

/** Pseudo-aleator determinist în [0, 1). */
function noise(n: number) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function wallPath(seed: number) {
  const step = BRICK_W + JOINT;
  const count = Math.ceil(WIDTH / step) + 2;
  const brick = (x: number, y: number) => `M${x} ${y}h${BRICK_W}v${BRICK_H}h${-BRICK_W}z`;

  // Rândul de jos (lipit de secțiunea următoare): ~85% din cărămizi.
  const bottom = Array.from({ length: count }, (_, i) => noise(seed + i) > 0.15);
  let d = bottom.map((keep, i) => (keep ? brick(i * step, BRICK_H) : "")).join("");

  // Rândul de sus, decalat cu o jumătate de cărămidă: ~35%, doar unde are sprijin pe ambele
  // cărămizi de dedesubt — nimic nu „plutește”.
  for (let i = 0; i < count - 1; i++) {
    const supported = bottom[i] && bottom[i + 1];
    if (supported && noise(seed + 500 + i) < 0.35) d += brick(i * step + step / 2, 0);
  }
  return d;
}

type SectionEdgeProps = {
  /** Culoarea secțiunii de deasupra; lipsește când zidul stă peste o imagine (hero). */
  from?: Tone;
  to: Tone;
  /** Alt model de zid, ca tranzițiile succesive să nu arate identic. */
  flip?: boolean;
  className?: string;
};

export function SectionEdge({ from, to, flip = false, className = "" }: SectionEdgeProps) {
  // -mb-px: zidul se suprapune 1 px peste secțiunea următoare, ca rotunjirile să nu lase o linie.
  return (
    <div aria-hidden="true" className={`${from ? BG[from] : ""} -mb-px h-6 w-full overflow-hidden md:h-9 ${className}`}>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="xMinYMax slice"
        className="block size-full"
      >
        <path d={wallPath(flip ? 7 : 1)} className={FILL[to]} />
      </svg>
    </div>
  );
}
