import type { Metadata, Viewport } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import { AnomalyProvider } from "@/lib/anomalies";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import PillNav from "@/components/PillNav";
import "./globals.css";
import "./demos.css";

// Inter with its optical-size axis, so large text gets the tighter Display cut.
const sans = Inter({
  subsets: ["latin"],
  variable: "--f-sans",
  axes: ["opsz"],
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
  "Kshitij Jha builds backends and the interfaces on top of them. Computer Science at the University of Kent, CEO and co-founder of Black Reef. Two internships, two hackathon awards, and a habit of finding the bug nobody noticed.";

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
  themeColor: "#fafafa",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${sans.variable} ${mono.variable}`}>
      {/* Extensions like Grammarly stamp attributes on <body> before hydration. */}
      <body suppressHydrationWarning>
        <AnomalyProvider>
          <SmoothScroll />
          <Header />
          {children}
          <PillNav />
        </AnomalyProvider>
      </body>
    </html>
  );
}
