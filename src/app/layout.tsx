import type { Metadata, Viewport } from "next";
import {
  Barlow_Condensed,
  Bricolage_Grotesque,
  DM_Sans,
  Fraunces,
  IBM_Plex_Sans,
  Inter,
  Outfit,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800"],
  variable: "--font-lively-display",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-visual-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-night-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ferah-sans",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-klasik-sans",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-vitrin-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lokal Fırın & Kahve — Menü",
  description:
    "Ekşi mayalı günlük ekmekler, taze kavrulmuş nitelikli kahveler ve mevsimlik tabaklar.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F6F4EE",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      className={`${barlowCondensed.variable} ${ibmPlexSans.variable} ${plusJakartaSans.variable} ${fraunces.variable} ${bricolageGrotesque.variable} ${inter.variable} ${dmSans.variable} ${outfit.variable} h-full`}
    >
      <body className="min-h-full bg-[#F6F4EE] text-[#171714] font-sans selection:bg-[#2448D8]/15 selection:text-[#171714]">
        {children}
      </body>
    </html>
  );
}
