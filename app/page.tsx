import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Topics from "@/components/Topics";
import VideoLibrary from "@/components/VideoLibrary";
import About from "@/components/About";
import Connect from "@/components/Connect";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Topics />
        <VideoLibrary videos={[]} />
        <About />
        <Connect />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
