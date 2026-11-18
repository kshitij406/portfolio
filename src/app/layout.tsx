import type { Metadata, Viewport } from "next";
import { Mona_Sans, Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import { AnomalyProvider } from "@/lib/anomalies";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Dock from "@/components/Dock";
import Reveal from "@/components/Reveal";
import "./globals.css";
import "./demos.css";

// Headlines: Mona Sans, heavy and stretched wide on its width axis.
const display = Mona_Sans({
  subsets: ["latin"],
  variable: "--f-display",
  axes: ["wdth"],
  display: "swap",
});

// Everything else.
const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--f-sans",
  display: "swap",
});

// Only for real code, never for decorative labels.
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--f-mono",
  weight: ["400", "500"],
  display: "swap",
});

const description =
  "Kshitij Jha builds things people actually use. Computer Science at the University of Kent, CEO and co-founder of Black Reef. Two internships, three hackathon awards, and a habit of finding the bug nobody noticed.";

export const metadata: Metadata = {
  metadataBase: new URL("https://kshitijj.me"),
  title: { default: "Kshitij Jha, software developer", template: "%s | Kshitij Jha" },
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
  themeColor: "#f5f3ea",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      {/* Extensions like Grammarly stamp attributes on <body> before hydration. */}
      <body suppressHydrationWarning>
        <AnomalyProvider>
          <SmoothScroll />
          <Header />
          {children}
          <Dock />
          <Reveal />
        </AnomalyProvider>
      </body>
    </html>
  );
}
