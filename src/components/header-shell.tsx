"use client";

import { useEffect, useState, type ReactNode } from "react";

// Header lipit sus; după primii pixeli de scroll devine semi-transparent, cu estompare pe fundal.
// Nu complet transparent: textul alb al meniului trebuie să rămână lizibil peste secțiunile deschise.
export function HeaderShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      data-scrolled={scrolled}
      className="dark sticky top-0 z-40 transition-[background-color,backdrop-filter] duration-200 data-[scrolled=true]:bg-ink/75 data-[scrolled=true]:backdrop-blur-md"
    >
      {children}
    </header>
  );
}
