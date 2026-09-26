import Image from "next/image";
import { company } from "@/content/company";
import { HomeLink } from "./navigation";

// Logo-ul firmei (B-004), în header și footer. `public/images/logo-inverse.png` e derivat din logo-ul
// primit: fundal alb eliminat (transparent), „M”-ul din casă rămâne alb, textul recolorat în alb
// pentru fundalurile închise (S28); decupat la conținut.
export function Brand({ className = "" }: { className?: string }) {
  return (
    <HomeLink aria-label={`${company.displayName} — Acasă`} className={`inline-flex shrink-0 ${className}`}>
      {/* Dimensiunile reale ale fișierului; mărimea afișată vine din CSS (48/56 px înălțime). Cu 200 × 56
          declarate, la 56 px doar lățimea diferea (199 px) și Next avertiza în consolă (S52). */}
      <Image
        src="/images/logo-inverse.png"
        alt=""
        width={854}
        height={240}
        sizes="200px"
        className="h-12 w-auto md:h-14"
      />
    </HomeLink>
  );
}
