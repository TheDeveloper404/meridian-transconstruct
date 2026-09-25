import { primaryPhone } from "@/content/company";

// Buton telefonic persistent pe mobil (< 768 px), în partea de jos. Corpul paginii are padding
// inferior corespunzător (layout.tsx), ca butonul să nu acopere ultimele elemente.
export function MobileCall() {
  return (
    <a
      href={primaryPhone.href}
      className="fixed inset-x-0 bottom-0 z-40 flex min-h-16 items-center justify-center border-t border-ink bg-accent px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] font-bold text-ink no-underline md:hidden"
    >
      Sună: {primaryPhone.display}
    </a>
  );
}
