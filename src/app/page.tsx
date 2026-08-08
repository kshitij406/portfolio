'use client';

import Hero from '@/components/Hero';
import Log from '@/components/sections/Log';
import Work from '@/components/sections/Work';
import Education from '@/components/sections/Education';
import Built from '@/components/sections/Built';
import Stack from '@/components/sections/Stack';
import Surface from '@/components/sections/Surface';
import Status from '@/components/sections/Status';
import Elsewhere from '@/components/sections/Elsewhere';
import SiteFooter from '@/components/SiteFooter';
import Desktop from '@/components/Desktop';
import { useTheme } from '@/lib/theme';

export default function Home() {
  // Third theme, third top-level branch: desktop mode replaces the
  // scrolling page outright rather than reusing the section components.
  // Starts on the editorial page (useTheme's SSR-safe default) even for a
  // returning desktop-mode visitor, then swaps in on mount; see theme.ts.
  const theme = useTheme();

  if (theme === 'desktop') return <Desktop />;

  return (
    <main>
      <Hero />
      <Log />
      <Work />
      <Education />
      <Built />
      <Stack />
      <Surface />
      <Status />
      <Elsewhere />
      <SiteFooter />
    </main>
  );
}
