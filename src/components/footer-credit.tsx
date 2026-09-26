"use client";

import { useState } from "react";
import { siteCredit } from "@/content/legal";

// Easter egg (S55): „Toate drepturile rezervate.” arată ca text obișnuit; la clic apare autorul
// site-ului, cu link. E un <button> (accesibil din tastatură), dar fără indicii vizuale.
export function FooterCredit() {
  const [shown, setShown] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setShown((value) => !value)}
        aria-expanded={shown}
        aria-controls="site-credit"
        className="cursor-default bg-transparent p-0 text-left text-inherit"
      >
        {siteCredit.rights}
      </button>
      <span id="site-credit" hidden={!shown} className="mt-1 block animate-[credit-in_400ms_ease-out]">
        {siteCredit.prefix}{" "}
        <a
          href={siteCredit.href}
          target="_blank"
          rel="noopener"
          className="font-bold text-accent no-underline hover:underline"
        >
          {siteCredit.name}
        </a>
      </span>
    </>
  );
}
