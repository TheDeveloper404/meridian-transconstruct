import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { MobileCall } from "@/components/mobile-call";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { company } from "@/content/company";
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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `Firmă de construcții în Petroșani — ${company.displayName}`,
    template: `%s — ${company.displayName}`,
  },
  description:
    "Construcții de case la roșu, la gri și la cheie, clădiri rezidențiale și nerezidențiale, construcții civile și renovări în Petroșani și Valea Jiului.",
  applicationName: company.displayName,
  openGraph: {
    type: "website",
    locale: "ro_RO",
    siteName: company.displayName,
  },
  robots: allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#101f3c",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={inter.variable}>
      <body className="pb-[calc(64px+env(safe-area-inset-bottom))] font-sans md:pb-0">
        <a
          href="#continut"
          className="absolute -top-25 left-4 z-50 bg-paper px-4 py-3 focus:top-3"
        >
          Sari la conținut
        </a>
        <SiteHeader />
        <main id="continut">{children}</main>
        <SiteFooter />
        <MobileCall />
      </body>
    </html>
  );
}
