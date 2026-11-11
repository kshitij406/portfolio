import Stack from "@/components/Stack";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="hero">
      <h1 className="hero-intro">
        I&rsquo;m Kshitij, a software developer. I build backends and the screens that sit on top of them, start to finish.
      </h1>
      <Stack />
      <p className="hero-meta">
        I study CS at Kent and run Black Reef.
        <br />
        Looking for a placement from summer 2027.
      </p>
      <Footer className="foot-hero" />
    </main>
  );
}
