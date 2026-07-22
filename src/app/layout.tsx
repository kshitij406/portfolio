import type { Metadata } from 'next';
import { Instrument_Serif, IBM_Plex_Mono, IBM_Plex_Sans, Press_Start_2P } from 'next/font/google';
import Nav from '@/components/Nav';
import SmoothScroll from '@/components/SmoothScroll';
import DepthRuler from '@/components/DepthRuler';
import { PROFILE } from '@/data/site';
import './globals.css';

const display = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
});

const body = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500'],
  display: 'swap',
});

// Used only inside the retro demo window chrome.
const pixel = Press_Start_2P({
  subsets: ['latin'],
  variable: '--font-pixel',
  weight: ['400'],
  display: 'swap',
});

const description =
  'Kshitij Jha, software developer. Backends in C# and Go, interfaces in Next.js. Based in Dar es Salaam, moving to Canterbury.';

export const metadata: Metadata = {
  metadataBase: new URL('https://kshitijj.me'),
  title: {
    default: `${PROFILE.name}, Software Developer`,
    template: `%s | ${PROFILE.name}`,
  },
  description,
  openGraph: {
    title: `${PROFILE.name}, Software Developer`,
    description,
    type: 'profile',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PROFILE.name}, Software Developer`,
    description,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${mono.variable} ${body.variable} ${pixel.variable}`}
    >
      <body>
        <SmoothScroll />
        <DepthRuler />
        <Nav />
        {children}
      </body>
    </html>
  );
}
