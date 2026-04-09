import type { Metadata } from "next";
import { Syne, DM_Mono, DM_Sans, Caveat } from "next/font/google";
import Nav from "@/components/Nav";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["300", "400", "500"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500"],
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Kshitij Jha",
  description: "CS student, backend engineer, allegedly.",
  openGraph: {
    title: "Kshitij Jha",
    description: "CS student, backend engineer, allegedly.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${syne.variable} ${dmMono.variable} ${dmSans.variable} ${caveat.variable}`}
        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}
