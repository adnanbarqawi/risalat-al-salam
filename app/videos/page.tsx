import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import VideoLibrary from "@/components/VideoLibrary";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video Library | رسالة السلام",
  description:
    "Watch teachings, reflections, and insights on peace, forgiveness, and love.",
};

export default function VideosPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <VideoLibrary videos={[]} />
      </main>
      <Footer />
    </>
  );
}
