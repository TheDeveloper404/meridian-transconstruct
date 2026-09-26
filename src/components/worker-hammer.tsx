// Easter egg (S56, înlocuiește muncitorul „OK” din S55): la trimiterea formularului, un muncitor intră
// din dreapta, lovește butonul cu ciocanul, apoi cererea pleacă. Stă lipit de marginea dreaptă a
// butonului (-ml-3), cu fața spre el; ciocanul iese în afara desenului (overflow vizibil) și cade pe
// capătul butonului.
// Durata totală: HAMMER_MS (sincronizată cu keyframes `hammer-*` din globals.css). Decorativ.

/** Durata animației până la trimiterea cererii (ms). Impactul are loc la ~70%. */
export const HAMMER_MS = 1300;

// Culoarea pielii e specifică ilustrației, nu face parte din paleta site-ului.
const SKIN = "#f2c49b";

export function WorkerHammer() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 90 120"
      overflow="visible"
      className="pointer-events-none absolute bottom-0 left-full -ml-3 h-24 w-18 animate-[hammer-walk_500ms_ease-out_both] md:h-28 md:w-21"
    >
      {/* umbră */}
      <ellipse cx="50" cy="117" rx="24" ry="3.5" className="fill-ink/15" />

      {/* picioare */}
      <rect x="38" y="88" width="10" height="29" rx="3" className="fill-ink-deep" />
      <rect x="53" y="88" width="10" height="29" rx="3" className="fill-ink-deep" />

      {/* corp: tricou + vestă reflectorizantă */}
      <rect x="32" y="46" width="38" height="46" rx="9" className="fill-ink" />
      <path d="M35 50 h11 l5 42 h-16 z M67 50 h-11 l-5 42 h16 z" className="fill-accent" />
      <rect x="33" y="68" width="36" height="3.5" className="fill-paper" />
      <rect x="33" y="79" width="36" height="3.5" className="fill-paper" />

      {/* cap, privind spre stânga (spre buton) */}
      <rect x="45" y="38" width="9" height="9" fill={SKIN} />
      <circle cx="50" cy="27" r="13.5" fill={SKIN} />
      <circle cx="44" cy="26" r="1.7" className="fill-ink" />
      <path d="M41 32.5 q4 3.5 8 0.5" fill="none" strokeWidth="1.8" strokeLinecap="round" className="stroke-ink" />
      {/* cască */}
      <path d="M35 22 a15 14 0 0 1 30 0 z" className="fill-accent" />
      <rect x="31" y="20.5" width="36" height="4.5" rx="2.2" className="fill-accent" />
      <rect x="48.5" y="8.5" width="3.5" height="13" rx="1.7" className="fill-accent-strong" />

      {/* brațul cu ciocanul, desenat orizontal spre stânga din umăr (38, 52); toate unghiurile vin din
          animație (hammer-swing): ridicat peste umăr, apoi lovitura la −30° (stânga-jos, pe buton). */}
      <g className="animate-[hammer-swing_1300ms_ease-in_both]" style={{ transformOrigin: "38px 52px" }}>
        <rect x="16" y="48" width="24" height="8" rx="4" className="fill-ink" />
        <circle cx="16" cy="52" r="5" fill={SKIN} />
        {/* coadă + cap de ciocan */}
        <rect x="-10" y="49.5" width="27" height="5" rx="2.5" className="fill-accent-strong" />
        <rect x="-17" y="42" width="9" height="20" rx="2" className="fill-ink-deep" />
      </g>
    </svg>
  );
}
