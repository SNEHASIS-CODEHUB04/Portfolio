import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import SkillsSection from "@/components/SkillsSection";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Works from "@/components/sections/Works";
import Contact from "@/components/sections/Contact";
import MiniGames from "@/components/sections/MiniGames";
import Footer from "@/components/sections/Footer";
import AiChat from "@/components/AiChat";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <SkillsSection />
      <Experience />
      <Education />
      <Works />
      <Contact />
      <MiniGames />
      <Footer />
      <AiChat />
    </main>
  );
}
