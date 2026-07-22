import Hero from '@/components/Hero';
import Log from '@/components/sections/Log';
import Work from '@/components/sections/Work';
import Built from '@/components/sections/Built';
import Stack from '@/components/sections/Stack';
import Surface from '@/components/sections/Surface';
import Contact from '@/components/sections/Contact';
import SiteFooter from '@/components/SiteFooter';

export default function Home() {
  return (
    <main>
      <Hero />
      <Log />
      <Work />
      <Built />
      <Stack />
      <Surface />
      <Contact />
      <SiteFooter />
    </main>
  );
}
