import Link from "next/link";
import { Brand } from "./brand";
import { HeaderShell } from "./header-shell";
import { DesktopNav, MobileNav } from "./navigation";

// Fără număr de telefon în header, la cererea utilizatorului (DESIGN.md › Componente).
// Lipit sus și semi-transparent la scroll (S11) — vezi HeaderShell.
export function SiteHeader() {
  return (
    <HeaderShell>
      <div className="wrap flex items-center justify-between gap-4 py-6 md:gap-6">
        <Brand />
        <DesktopNav />
        <Link href="/contact" className="button hidden xl:inline-flex">
          Cere o ofertă
        </Link>
        <MobileNav />
      </div>
    </HeaderShell>
  );
}
