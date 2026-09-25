import Link from "next/link";
import { company } from "@/content/company";

// Denumire în text până la primirea logo-ului (B-004). „MERIDIAN” se întinde exact pe lățimea
// lui „TRANSCONSTRUCT” (cerința utilizatorului, S12): containerul ia lățimea rândului de jos, iar
// literele rândului de sus sunt distribuite pe toată lățimea lui. Mărimile sunt alese ca „MERIDIAN”
// să aibă natural ~92% din lățime, deci spațierea rămâne mică (măsurat: 170/185 px și 140/153 px).
const TOP = "MERIDIAN";
const BOTTOM = "TRANSCONSTRUCT";

export function Brand({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${company.displayName} — Acasă`}
      className={`inline-flex w-max flex-col leading-none no-underline ${className}`}
    >
      <span aria-hidden="true" className="flex justify-between text-[28px] font-bold md:text-[34px]">
        {[...TOP].map((letter, index) => (
          <span key={index}>{letter}</span>
        ))}
      </span>
      {/* Marginea negativă anulează spațierea de după ultima literă, ca marginile să coincidă exact. */}
      <span
        aria-hidden="true"
        className="mt-1.5 -mr-[2px] text-[13px] font-medium tracking-[2px] md:-mr-[3px] md:text-[15px] md:tracking-[3px]"
      >
        {BOTTOM}
      </span>
    </Link>
  );
}
