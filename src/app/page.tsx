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

export default function Home() {
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
