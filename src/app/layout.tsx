import type { Metadata, Viewport } from "next";
import { Funnel_Display, Funnel_Sans, Geist_Mono } from "next/font/google";
import { AnomalyProvider } from "@/lib/anomalies";
import SmoothScroll from "@/components/SmoothScroll";
import CaseFile from "@/components/CaseFile";
import "./globals.css";

const display = Funnel_Display({
  subsets: ["latin"],
  variable: "--f-display",
  weight: ["300", "400", "600", "800"],
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

const themeInit = `(function(){try{var t=localStorage.getItem('kj-theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t;}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-GB"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <AnomalyProvider>
          <SmoothScroll />
          {children}
          <CaseFile />
        </AnomalyProvider>
      </body>
    </html>
  );
}
