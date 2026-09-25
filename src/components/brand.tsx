import Link from "next/link";
import { company } from "@/content/company";

// Denumire în text până la primirea logo-ului (B-004).
export function Brand({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${company.displayName} — Acasă`}
      className={`block text-base leading-[1.2] font-bold no-underline md:text-xl md:tracking-[1px] ${className}`}
    >
      MERIDIAN
      <span className="mt-1 block text-sm font-normal tracking-[1px] md:tracking-[3px]">TRANSCONSTRUCT</span>
    </Link>
  );
}
