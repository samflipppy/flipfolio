"use client";

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Journey from "@/components/Journey";
import ProjectGallery from "@/components/ProjectGallery";
import Experience from "@/components/Experience";
import VisionBoard from "@/components/VisionBoard";
import AiChat from "@/components/AiChat";
import Contact from "@/components/Contact";
import { useTheme } from "@/context/ThemeContext";

export default function Home() {
  const { isCreative } = useTheme();

  return (
    <div className={`min-h-screen noise-overlay ${isCreative ? "bg-bg-primary" : "bg-bg-primary"}`}>
      <Navigation />
      <main>
        <Hero />
        <div className="section-divider" />
        <Journey />
        <div className="section-divider" />
        <ProjectGallery />
        <div className="section-divider" />
        <Experience />
        <div className="section-divider" />
        <VisionBoard />
        <div className="section-divider" />
        <Contact />
      </main>
      <AiChat />
    </div>
  );
}
