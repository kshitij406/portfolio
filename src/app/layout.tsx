import type { Metadata } from 'next';
import Script from 'next/script';
import { Anton, Martian_Mono, Inter, Press_Start_2P } from 'next/font/google';
import Nav from '@/components/Nav';
import SmoothScroll from '@/components/SmoothScroll';
import TerminalGate from '@/components/TerminalGate';
import TabTitle from '@/components/TabTitle';
import ShakeCursor from '@/components/ShakeCursor';
import CardDragMode from '@/components/CardDragMode';
import { DemoProvider } from '@/components/DemoProvider';
import { PROFILE } from '@/data/site';
import './globals.css';

// Anton only ships weight 400; that's the whole point, it's a single-cut
// poster weight built to run huge.
const display = Anton({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400'],
  display: 'swap',
});

// Martian Mono over the more common JetBrains/Space/Fira/Plex picks: its
// stenciled, instrument-panel cut matches the labels and section numbering,
// rather than being "a mono font" for its own sake.
const mono = Martian_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
});

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
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
  'Kshitij Jha, software developer. Backends in C# and Go, interfaces in Next.js. Based in Canterbury, UK, studying at the University of Kent.';

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
    // suppressHydrationWarning: the inline script below stamps data-theme on
    // <html> before React hydrates, so the client markup legitimately differs
    // from the server's. Scoped to this element only, not its subtree.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${mono.variable} ${body.variable} ${pixel.variable}`}
    >
      <body>
        {/* Sets data-theme before first paint, from localStorage or OS preference,
            so there's no light/dark flash on load. */}
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.dataset.theme=t;}catch(e){}})();`}
        </Script>
        <SmoothScroll />
        <TabTitle />
        <ShakeCursor />
        <CardDragMode />
        <Nav />
        <DemoProvider>
          {children}
          <TerminalGate />
        </DemoProvider>
      </body>
    </html>
  );
}
