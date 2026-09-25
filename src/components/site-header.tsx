import Link from "next/link";
import { Brand } from "./brand";
import { DesktopNav, MobileNav } from "./navigation";

// Fără număr de telefon în header, la cererea utilizatorului (DESIGN.md › Componente).
export function SiteHeader() {
  return (
    <header className="dark">
      <div className="wrap flex items-center justify-between gap-4 py-6 md:gap-6">
        <Brand />
        <DesktopNav />
        <Link href="/contact" className="button hidden lg:inline-flex xl:px-7 max-xl:px-4">
          Cere o ofertă
        </Link>
        <MobileNav />
      </div>
    </header>
  );
}
