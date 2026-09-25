import type { ReactNode } from "react";

type SectionHeadProps = {
  id: string;
  kicker: string;
  title: ReactNode;
  intro: string;
};

export function SectionHead({ id, kicker, title, intro }: SectionHeadProps) {
  return (
    <div className="mb-8 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between md:gap-8">
      <div>
        <p className="kicker">{kicker}</p>
        <h2 id={id}>{title}</h2>
      </div>
      <p className="max-w-115 text-muted">{intro}</p>
    </div>
  );
}

/** Rânduri de titlu cu rupere intenționată, ca în machetă. */
export function Lines({ lines }: { lines: readonly string[] }) {
  return lines.map((line, index) => (
    <span key={line}>
      {index > 0 && <br />}
      {line}
    </span>
  ));
}
