// Easter egg (S55): muncitor de șantier care face „OK” cu degetul mare, afișat după trimiterea
// reușită a formularului. Ilustrație decorativă (aria-hidden) — mesajul de succes rămâne textul.
// Animații în globals.css (worker-*); cu `prefers-reduced-motion` apare direct în poza finală.
// Culoarea pielii e specifică ilustrației, nu face parte din paleta site-ului.

const SKIN = "#f2c49b";

export function WorkerOk() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 140"
      className="h-28 w-24 shrink-0 animate-[worker-in_600ms_cubic-bezier(0.2,0.9,0.3,1.2)_both] md:h-32 md:w-28"
    >
      {/* umbră */}
      <ellipse cx="58" cy="136" rx="30" ry="4" className="fill-ink/15" />

      {/* picioare */}
      <rect x="42" y="108" width="12" height="28" rx="3" className="fill-ink-deep" />
      <rect x="60" y="108" width="12" height="28" rx="3" className="fill-ink-deep" />

      {/* brațul stâng, lăsat pe lângă corp */}
      <rect x="28" y="68" width="11" height="36" rx="5.5" className="fill-ink" />
      <circle cx="33.5" cy="104" r="6" fill={SKIN} />

      {/* corp: tricou + vestă reflectorizantă */}
      <rect x="35" y="62" width="46" height="50" rx="10" className="fill-ink" />
      <path d="M38 66 h14 l6 46 h-20 z M78 66 h-14 l-6 46 h20 z" className="fill-accent" />
      <rect x="36" y="84" width="44" height="4" className="fill-paper" />
      <rect x="36" y="96" width="44" height="4" className="fill-paper" />

      {/* brațul drept: pornește lăsat și se ridică din umăr (82, 70) */}
      <g className="animate-[worker-arm_1100ms_ease-out_200ms_both]" style={{ transformOrigin: "82px 70px" }}>
        <rect x="77" y="64" width="11" height="26" rx="5.5" transform="rotate(-60 82 70)" className="fill-ink" />
        <rect x="93" y="40" width="10" height="26" rx="5" className="fill-ink" />
        {/* pumn + degetul mare în sus */}
        <g className="animate-[worker-thumb_700ms_ease-in-out_1250ms_both]" style={{ transformOrigin: "98px 36px" }}>
          {/* degetul mare: scurt, gros, ușor înclinat spre spate */}
          <rect x="88" y="13" width="8" height="17" rx="4" transform="rotate(-14 92 28)" fill={SKIN} />
          {/* pumnul, cu degetele strânse schițate pe partea dreaptă */}
          <rect x="87" y="25" width="22" height="18" rx="6" fill={SKIN} />
          <path
            d="M98 30.5 h8 M98 34.5 h8 M98 38.5 h7"
            strokeWidth="1.4"
            strokeLinecap="round"
            className="stroke-ink/35"
          />
        </g>
      </g>

      {/* cap */}
      <rect x="53" y="54" width="10" height="10" fill={SKIN} />
      <circle cx="58" cy="42" r="16" fill={SKIN} />
      <circle cx="52.5" cy="42" r="1.8" className="fill-ink" />
      <circle cx="63.5" cy="42" r="1.8" className="fill-ink" />
      <path d="M51 48 q7 6 14 0" fill="none" strokeWidth="2" strokeLinecap="round" className="stroke-ink" />

      {/* cască de protecție */}
      <path d="M40 36 a18 17 0 0 1 36 0 z" className="fill-accent" />
      <rect x="36" y="34" width="44" height="5" rx="2.5" className="fill-accent" />
      <rect x="56" y="20" width="4" height="15" rx="2" className="fill-accent-strong" />
    </svg>
  );
}
