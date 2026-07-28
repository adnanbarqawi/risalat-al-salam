import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Topics from "@/components/Topics";
import VideoLibrary from "@/components/VideoLibrary";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Topics />
        <VideoLibrary videos={[]} />
      </main>
      <Footer />
    </>
  );
}
