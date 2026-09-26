// Tranziție între secțiuni (S12b, readusă în S19): margine oblică în culoarea secțiunii următoare,
// cu o fâșie galbenă subțire pe diagonală — în locul liniilor orizontale. `flip` inversează panta,
// ca tranzițiile succesive să alterneze. Spre footer nu se folosește (S20): secțiunea se termină drept.

type Tone = "ink" | "paper" | "surface";

const BG: Record<Tone, string> = { ink: "bg-ink", paper: "bg-paper", surface: "bg-surface" };
const FILL: Record<Tone, string> = {
  ink: "fill-ink",
  paper: "fill-paper",
  surface: "fill-surface",
};

type SectionEdgeProps = {
  /** Culoarea secțiunii de deasupra; lipsește când marginea stă peste o imagine (hero). */
  from?: Tone;
  to: Tone;
  flip?: boolean;
  className?: string;
};

export function SectionEdge({ from, to, flip = false, className = "" }: SectionEdgeProps) {
  // viewBox 100×10: secțiunea următoare ocupă triunghiul de sub diagonală; fâșia galbenă (grosime
  // B) stă chiar deasupra diagonalei. `flip` oglindește orizontal.
  const B = 1.1;
  const x = (value: number) => (flip ? 100 - value : value);
  const next = [[0, B], [100, 10], [0, 10]];
  const band = [[0, 0], [100, 10 - B], [100, 10], [0, B]];
  const points = (list: number[][]) => list.map(([px, py]) => `${x(px)},${py}`).join(" ");
  // -mb-px: marginea se suprapune 1 px peste secțiunea următoare; altfel, la înălțimi fracționare,
  // rămâne o linie deschisă la culoare între SVG și secțiune.
  return (
    <div aria-hidden="true" className={`${from ? BG[from] : ""} -mb-px h-7 w-full md:h-14 ${className}`}>
      <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="block size-full">
        <polygon points={points(band)} className="fill-accent" />
        <polygon points={points(next)} className={FILL[to]} />
      </svg>
    </div>
  );
}
