import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { MobileCall } from "@/components/mobile-call";
import { NavigationProgress } from "@/components/navigation-progress";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { company } from "@/content/company";
import { homeSeo } from "@/content/home";
import { pageMetadata } from "@/lib/seo";
import { allowIndexing, siteUrl } from "@/lib/site";
import "./globals.css";

// Inter găzduit local de next/font (descărcat la build, fără cereri externe la runtime).
// latin-ext acoperă diacriticele românești (ș, ț, ă, î, â).
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-inter",
});

const googleVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...pageMetadata({ description: homeSeo.description, path: "/" }),
  // Titlul din tab-ul browserului: pe Acasă numele firmei primul (cerința utilizatorului, S18);
  // celelalte pagini dau doar partea specifică, șablonul adaugă brandul.
  title: {
    default: `${company.displayName} — ${homeSeo.title}`,
    template: `%s — ${company.displayName}`,
  },
  applicationName: company.displayName,
  creator: company.legalName,
  publisher: company.legalName,
  robots: allowIndexing
    ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } }
    : { index: false, follow: false },
  // Codul din Google Search Console (metoda „etichetă HTML”), setat doar pe producție.
  ...(googleVerification ? { verification: { google: googleVerification } } : {}),
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#101f3c",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={inter.variable} data-scroll-behavior="smooth">
      <body className="flex min-h-svh flex-col pb-[calc(64px+env(safe-area-inset-bottom))] font-sans md:pb-0">
        <a
          href="#continut"
          className="absolute -top-25 left-4 z-50 bg-paper px-4 py-3 focus:top-3"
        >
          Sari la conținut
        </a>
        <NavigationProgress />
        <SiteHeader />
        {/* flex-1: pe paginile scurte footer-ul coboară până jos, fără fundal deschis sub el (S20). */}
        <main id="continut" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <WhatsAppButton />
        <MobileCall />
      </body>
    </html>
  );
}
