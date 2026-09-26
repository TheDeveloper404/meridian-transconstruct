"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useSyncExternalStore, type ComponentProps, type MouseEvent } from "react";
import { mainNav, sectionAliases, type NavItem } from "@/content/navigation";

// Ancora se schimbă și prin navigările Next (`history.pushState`, ex. „Acasă” de pe /#despre),
// care nu emit `hashchange`. Navigation API le semnalează direct; fără el, recitim ancora după
// fiecare clic (useSyncExternalStore re-randează doar dacă valoarea s-a schimbat).
type NavigationLike = EventTarget;

function subscribeToHash(onChange: () => void) {
  const navigation = (window as Window & { navigation?: NavigationLike }).navigation;
  const timers: number[] = [];
  const afterClick = () => {
    timers.push(window.setTimeout(onChange, 0), window.setTimeout(onChange, 150));
  };
  // Next face `pushState`/`replaceState` în `useInsertionEffect`, iar `currententrychange` e emis
  // sincron — o actualizare React chiar atunci dă „useInsertionEffect must not schedule updates”.
  const onEntryChange = () => queueMicrotask(onChange);

  window.addEventListener("hashchange", onChange);
  window.addEventListener("popstate", onChange);
  if (navigation) navigation.addEventListener("currententrychange", onEntryChange);
  else document.addEventListener("click", afterClick);

  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener("popstate", onChange);
    if (navigation) navigation.removeEventListener("currententrychange", onEntryChange);
    else document.removeEventListener("click", afterClick);
    timers.forEach((timer) => window.clearTimeout(timer));
  };
}

/** Intrarea activă: pagina curentă sau, pe Acasă, secțiunea din ancoră (ca în macheta finală). */
function useActiveItem(): NavItem {
  const pathname = usePathname();
  const hash = useSyncExternalStore(
    subscribeToHash,
    () => window.location.hash.slice(1),
    () => "",
  );

  const page = mainNav.find(
    (item) => !item.section && (item.href === pathname || (item.href !== "/" && pathname.startsWith(`${item.href}/`))),
  );
  if (pathname !== "/") return page ?? mainNav[0];

  const section = sectionAliases[hash] ?? hash;
  return mainNav.find((item) => item.section === section) ?? mainNav[0];
}

// Un link spre Acasă apăsat chiar pe Acasă nu ducea în capul paginii (raportat în S18): urcăm
// explicit și scoatem ancora din adresă. De pe alte pagini rămâne navigarea Next obișnuită.
// Folosit de „Acasă” din meniu și de denumirea firmei (Brand).
function useHomeClick(onNavigate?: () => void) {
  const pathname = usePathname();
  return (event: MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();
    if (pathname !== "/") return;
    event.preventDefault();
    window.scrollTo({ top: 0 });
    if (window.location.hash) window.history.replaceState(null, "", "/");
  };
}

export function HomeLink(props: Omit<ComponentProps<typeof Link>, "href" | "onClick">) {
  return <Link {...props} href="/" onClick={useHomeClick()} />;
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const active = useActiveItem();
  const toTop = useHomeClick(onNavigate);

  return mainNav.map((item) => {
    const current = item === active ? (item.section ? "location" : "page") : undefined;
    // Ancorele de pe Acasă sunt linkuri native (derulare și `hashchange` standard);
    // paginile folosesc navigarea Next.
    return item.section ? (
      <a key={item.href} className="nav-link" href={item.href} aria-current={current} onClick={onNavigate}>
        {item.label}
      </a>
    ) : (
      <Link
        key={item.href}
        className="nav-link"
        href={item.href}
        aria-current={current}
        onClick={item.href === "/" ? toTop : onNavigate}
      >
        {item.label}
      </Link>
    );
  });
}

export function DesktopNav() {
  return (
    <nav aria-label="Navigare principală" className="hidden items-center xl:flex">
      <NavLinks />
    </nav>
  );
}

export function MobileNav() {
  const details = useRef<HTMLDetailsElement>(null);
  const close = () => {
    if (details.current) details.current.open = false;
  };

  return (
    <details
      ref={details}
      className="relative xl:hidden"
      onKeyDown={(event) => {
        if (event.key === "Escape" && details.current?.open) {
          close();
          details.current.querySelector("summary")?.focus();
        }
      }}
    >
      <summary className="flex min-h-12 cursor-pointer items-center rounded-(--radius-field) border border-inverse px-4 py-3">
        Meniu
      </summary>
      <nav
        aria-label="Navigare mobilă"
        className="absolute top-15 right-0 z-30 w-55 border border-inverse bg-ink p-3"
      >
        <NavLinks onNavigate={close} />
      </nav>
    </details>
  );
}
