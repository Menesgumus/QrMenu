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
import { buildBootstrapThemeScript } from "@/lib/visitor-preferences";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin", "latin-ext"],
  weight: ["700", "800"],
  variable: "--font-barlow-condensed",
  display: "swap",
  preload: false,
});

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  weight: ["700", "800"],
  variable: "--font-lively-display",
  display: "swap",
  preload: false,
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
  preload: false,
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-visual-sans",
  display: "swap",
  preload: false,
});

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  weight: ["600"],
  variable: "--font-night-display",
  display: "swap",
  preload: false,
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ferah-sans",
  display: "swap",
  preload: false,
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-klasik-sans",
  display: "swap",
  preload: false,
});

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-vitrin-sans",
  display: "swap",
  preload: false,
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
      data-menu-theme="ozel"
      data-color-mode="light"
      suppressHydrationWarning
      className={`${barlowCondensed.variable} ${ibmPlexSans.variable} ${plusJakartaSans.variable} ${fraunces.variable} ${bricolageGrotesque.variable} ${inter.variable} ${dmSans.variable} ${outfit.variable} h-full`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: buildBootstrapThemeScript(),
          }}
        />
      </head>
      <body className="min-h-full bg-[var(--menu-bg)] text-[var(--menu-text)] font-sans selection:bg-[var(--menu-selection-bg)] selection:text-[var(--menu-selection-text)]">
        {children}
      </body>
    </html>
  );
}
