import type { Metadata, Viewport } from "next";
import { Funnel_Display, Funnel_Sans, Geist_Mono } from "next/font/google";
import { AnomalyProvider } from "@/lib/anomalies";
import SmoothScroll from "@/components/SmoothScroll";
import CaseFile from "@/components/CaseFile";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import NightDive from "@/components/NightDive";
import SectionPill from "@/components/SectionPill";
import Extras from "@/components/Extras";
import "./globals.css";

const display = Funnel_Display({
  subsets: ["latin"],
  variable: "--f-display",
  // Variable, so weight can be animated continuously (the contact wave).
  weight: "variable",
  display: "swap",
});

const sans = Funnel_Sans({
  subsets: ["latin"],
  variable: "--f-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});

// Only for real code and code points, never for decorative labels.
const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--f-mono",
  weight: ["400", "500"],
  display: "swap",
});

const description =
  "Kshitij Jha builds backends and the interfaces on top of them. Computer Science at the University of Kent. Two internships, two hackathon wins, and a habit of finding the bug nobody noticed.";

export const metadata: Metadata = {
  metadataBase: new URL("https://kshitijj.me"),
  title: "Kshitij Jha, software developer",
  description,
  openGraph: {
    title: "Kshitij Jha, software developer",
    description,
    type: "profile",
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image", title: "Kshitij Jha", description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e6ece8" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1522" },
  ],
};

// Before first paint: apply the saved theme, and decide whether the
// once-per-session preloader runs (never under reduced motion).
const headInit = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('kj-theme');if(t==='light'||t==='dark')d.dataset.theme=t;}catch(e){}try{if(!sessionStorage.getItem('kj-seen')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('is-loading');}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-GB"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: headInit }} />
      </head>
      <body>
        <AnomalyProvider>
          <SmoothScroll />
          <NightDive />
          {children}
          <SectionPill />
          <CaseFile />
          <Extras />
          <Cursor />
          <Preloader />
        </AnomalyProvider>
      </body>
    </html>
  );
}
