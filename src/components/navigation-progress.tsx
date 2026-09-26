"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Bara de progres portocalie din capul paginii la navigarea între pagini (S23). Pornește la clic pe
// un link intern spre altă pagină și se termină când se schimbă adresa. Starea stă într-un atribut
// DOM (`data-state`), animația în CSS (`.nav-progress`, globals.css).
export function NavigationProgress() {
  const bar = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    let safety = 0;
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(link instanceof HTMLAnchorElement) || link.hasAttribute("download")) return;
      if (link.target && link.target !== "_self") return;
      const url = new URL(link.href, window.location.href);
      // Doar alte pagini de pe site; ancorele de pe aceeași pagină nu sunt navigări.
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;

      const element = bar.current;
      if (!element) return;
      element.dataset.state = "idle";
      void element.offsetWidth; // repornește tranziția de la zero
      element.dataset.state = "loading";
      // Dacă navigarea nu se încheie (anulată sau eșuată), bara nu rămâne blocată.
      window.clearTimeout(safety);
      safety = window.setTimeout(() => {
        if (element.dataset.state === "loading") element.dataset.state = "done";
      }, 10000);
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      window.clearTimeout(safety);
    };
  }, []);

  // Adresa nouă e afișată: bara se completează și dispare.
  useEffect(() => {
    const element = bar.current;
    if (!element || element.dataset.state !== "loading") return;
    element.dataset.state = "done";
    const reset = window.setTimeout(() => {
      if (element.dataset.state === "done") element.dataset.state = "idle";
    }, 700);
    return () => window.clearTimeout(reset);
  }, [pathname]);

  return <div ref={bar} aria-hidden="true" data-state="idle" className="nav-progress" />;
}
