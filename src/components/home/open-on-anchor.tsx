"use client";

import { useEffect } from "react";

// Deschide panoul unui serviciu (`<details id=…>`) când se ajunge la el prin ancoră: clic pe o
// plachetă din hero (și repetat, când adresa nu se mai schimbă) sau o adresă cu #serviciu.
// Clicul e prins înainte ca browserul să deruleze, deci panoul e deja deschis la sosire.
function openDetails(id: string) {
  const element = id ? document.getElementById(decodeURIComponent(id)) : null;
  if (element instanceof HTMLDetailsElement) element.open = true;
}

export function OpenOnAnchor() {
  useEffect(() => {
    const fromHash = () => openDetails(window.location.hash.slice(1));
    const onClick = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest('a[href^="#"]') : null;
      if (link) openDetails(link.getAttribute("href")?.slice(1) ?? "");
    };

    fromHash();
    window.addEventListener("hashchange", fromHash);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", fromHash);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
