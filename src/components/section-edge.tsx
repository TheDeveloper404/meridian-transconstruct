// Tranziție între secțiuni: margine oblică în culoarea secțiunii următoare, cu bandă de avertizare
// de șantier (dungi galben/negru) pe diagonală (S54, cerința utilizatorului; înlocuiește fâșia plină).
// `flip` inversează panta, ca tranzițiile succesive să alterneze. Spre footer nu se folosește (S20).
//
// Straturi HTML decupate cu `clip-path`, nu SVG: SVG-ul se întindea neuniform pe lățime
// (`preserveAspectRatio="none"`) și ar fi deformat dungile. Dungile vin din CSS (`.hazard-tape`),
// deci rămân la 45° și la aceeași lățime pe orice ecran.

type Tone = "ink" | "paper" | "surface";

const BG: Record<Tone, string> = { ink: "bg-ink", paper: "bg-paper", surface: "bg-surface" };

type SectionEdgeProps = {
  /** Culoarea secțiunii de deasupra; lipsește când marginea stă peste o imagine (hero). */
  from?: Tone;
  to: Tone;
  flip?: boolean;
  className?: string;
};

export function SectionEdge({ from, to, flip = false, className = "" }: SectionEdgeProps) {
  // --tape = grosimea benzii. Banda: între diagonala de sus și cea de jos; secțiunea următoare:
  // triunghiul de sub bandă. Banda coboară 1 px sub marginea secțiunii următoare (desenată peste),
  // ca antialiasing-ul să nu lase o linie între ele. `flip` oglindește orizontal.
  const left = flip ? "100%" : "0";
  const right = flip ? "0" : "100%";
  const band = `polygon(${left} 0, ${right} calc(100% - var(--tape)), ${right} 100%, ${left} calc(var(--tape) + 1px))`;
  const next = `polygon(${left} var(--tape), ${right} 100%, ${left} 100%)`;

  // -mb-px: marginea se suprapune 1 px peste secțiunea următoare; altfel, la înălțimi fracționare,
  // rămâne o linie deschisă la culoare între margine și secțiune.
  return (
    <div
      aria-hidden="true"
      className={`${from ? BG[from] : ""} -mb-px h-7 w-full [--tape:9px] md:h-14 md:[--tape:14px] ${className}`}
    >
      <div className="relative size-full">
        <div className="hazard-tape absolute inset-0" style={{ clipPath: band }} />
        <div className={`absolute inset-0 ${BG[to]}`} style={{ clipPath: next }} />
      </div>
    </div>
  );
}
