"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryItem } from "@/content/projects";

export type GalleryTile = GalleryItem & { available: boolean };

// Așezare „bento” pe 12 coloane, repetată la fiecare 6 elemente: o fotografie mare + cinci mai mici
// în ritmuri diferite. Pe tabletă 2 coloane (prima pe toată lățimea), pe telefon o coloană.
const LAYOUT = [
  "md:col-span-2 md:row-span-2 lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
];

function tileSizes(index: number) {
  return index % 6 === 0
    ? "(min-width: 1024px) 840px, 100vw"
    : "(min-width: 1024px) 600px, (min-width: 768px) 50vw, 100vw";
}

export function Gallery({ tiles, placeholderLabel }: { tiles: GalleryTile[]; placeholderLabel: string }) {
  const viewable = tiles.filter((tile) => tile.available);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const refs = useRef(new Map<string, HTMLElement>());
  const lastTrigger = useRef<HTMLElement | null>(null);

  // Intrare la scroll: doar elementele încă sub ecran primesc `data-reveal="hidden"` la montare
  // (fără JS rămân vizibile; cele deja pe ecran nu clipesc), iar observer-ul îl scoate când intră
  // în ecran. `prefers-reduced-motion` dezactivează tranzițiile (globals.css).
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.removeAttribute("data-reveal");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    refs.current.forEach((element) => {
      if (element.getBoundingClientRect().top <= window.innerHeight) return;
      element.setAttribute("data-reveal", "hidden");
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  const open = (id: string, trigger: HTMLElement) => {
    lastTrigger.current = trigger;
    setOpenIndex(viewable.findIndex((tile) => tile.id === id));
  };

  const close = () => setOpenIndex(null);

  // Focusul revine pe imaginea din galerie după ce dialogul s-a închis (navigare din tastatură).
  useEffect(() => {
    if (openIndex !== null || !lastTrigger.current) return;
    lastTrigger.current.focus();
    lastTrigger.current = null;
  }, [openIndex]);

  return (
    <>
      <ul className="grid auto-rows-[260px] grid-cols-1 gap-4 md:auto-rows-[240px] md:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[250px]">
        {tiles.map((tile, index) => (
            <li
              key={tile.id}
              data-id={tile.id}
              ref={(element) => {
                if (element) refs.current.set(tile.id, element);
                else refs.current.delete(tile.id);
              }}
              style={{ transitionDelay: `${(index % 6) * 90}ms` }}
              className={`${LAYOUT[index % 6]} transition-[opacity,transform] duration-700 ease-out data-[reveal=hidden]:translate-y-8 data-[reveal=hidden]:opacity-0`}
            >
              {tile.available ? (
                <button
                  type="button"
                  onClick={(event) => open(tile.id, event.currentTarget)}
                  aria-label={`Mărește imaginea: ${tile.title ?? tile.category}`}
                  className="group relative block size-full cursor-zoom-in overflow-hidden rounded-sm bg-ink text-left"
                >
                  <Image
                    src={tile.image.src}
                    alt={tile.image.alt}
                    fill
                    sizes={tileSizes(index)}
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06] group-focus-visible:scale-[1.06]"
                  />
                  <TileCaption tile={tile} />
                  <span
                    aria-hidden="true"
                    className="absolute right-4 bottom-4 flex size-11 translate-y-2 items-center justify-center rounded-full bg-accent text-lg font-bold text-ink opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
                  >
                    ⤢
                  </span>
                </button>
              ) : (
                <div className="relative size-full overflow-hidden rounded-sm bg-ink bg-[repeating-linear-gradient(135deg,rgb(196_206_222/0.06)_0_1px,transparent_1px_22px)]">
                  <TileCaption tile={tile} note={placeholderLabel} />
                </div>
              )}
            </li>
        ))}
      </ul>

      {openIndex !== null && viewable[openIndex] && (
        <Lightbox
          tiles={viewable}
          index={openIndex}
          onIndexChange={setOpenIndex}
          onClose={close}
        />
      )}
    </>
  );
}

function TileCaption({ tile, note }: { tile: GalleryTile; note?: string }) {
  return (
    <>
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(0deg,rgb(8_22_47/0.9)_0%,rgb(8_22_47/0.35)_45%,transparent_75%)] transition-opacity duration-500 group-hover:opacity-100 md:opacity-80"
      />
      {tile.illustrative && (
        <span className="absolute top-4 left-4 bg-ink/80 px-2 py-1 text-xs font-bold tracking-[1px] text-inverse uppercase backdrop-blur-sm">
          Ilustrativ
        </span>
      )}
      <span className="absolute inset-x-5 bottom-5 block pr-14 transition-transform duration-500 ease-out md:translate-y-1 md:group-hover:translate-y-0">
        <span className="block text-xs font-bold tracking-[2px] text-accent uppercase">{tile.category}</span>
        {tile.title && <span className="mt-1 block text-xl leading-tight font-bold text-paper">{tile.title}</span>}
        {note && <span className="mt-1 block text-sm text-inverse">{note}</span>}
      </span>
    </>
  );
}

type LightboxProps = {
  tiles: GalleryTile[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
};

function Lightbox({ tiles, index, onIndexChange, onClose }: LightboxProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const tile = tiles[index];
  const count = tiles.length;
  const go = useCallback((step: number) => onIndexChange((index + step + count) % count), [index, count, onIndexChange]);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    element.showModal();
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
      if (element.open) element.close();
    };
  }, []);

  return (
    <dialog
      ref={dialog}
      aria-label={`Galerie: ${tile.title ?? tile.category}`}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") go(1);
        if (event.key === "ArrowLeft") go(-1);
      }}
      className="m-0 size-full max-h-none max-w-none bg-ink-deep/95 p-0 text-paper backdrop:bg-ink-deep/80"
    >
      <div className="flex size-full flex-col" onClick={(event) => event.target === event.currentTarget && onClose()}>
        <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">
          <p className="text-sm text-inverse">
            {index + 1} / {count}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="flex min-h-11 items-center gap-2 rounded-full border border-inverse/50 px-4 font-bold transition hover:border-accent hover:text-accent"
          >
            Închide <span aria-hidden="true">✕</span>
          </button>
        </div>

        <div className="relative min-h-0 flex-1 px-4 md:px-24">
          <Image
            key={tile.id}
            src={tile.image.src}
            alt={tile.image.alt}
            fill
            sizes="100vw"
            className="animate-[lightbox-in_300ms_ease-out] object-contain"
          />
          {count > 1 && (
            <>
              <LightboxArrow direction="prev" onClick={() => go(-1)} />
              <LightboxArrow direction="next" onClick={() => go(1)} />
            </>
          )}
        </div>

        <div className="px-4 py-5 md:px-8">
          <p className="text-xs font-bold tracking-[2px] text-accent uppercase">{tile.category}</p>
          {tile.title && <p className="mt-1 text-xl font-bold">{tile.title}</p>}
          {tile.illustrative && <p className="mt-1 text-sm text-inverse">Imagine ilustrativă, provizorie.</p>}
        </div>
      </div>
    </dialog>
  );
}

function LightboxArrow({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  const isNext = direction === "next";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isNext ? "Imaginea următoare" : "Imaginea anterioară"}
      className={`absolute top-1/2 ${isNext ? "right-3 md:right-8" : "left-3 md:left-8"} flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-ink/80 text-2xl text-paper transition hover:bg-accent hover:text-ink`}
    >
      <span aria-hidden="true">{isNext ? "→" : "←"}</span>
    </button>
  );
}
