"use client";

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Journey from "@/components/Journey";
import ProjectGallery from "@/components/ProjectGallery";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import VisionBoard from "@/components/VisionBoard";
import AiChat from "@/components/AiChat";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";
import { useTheme } from "@/context/ThemeContext";

export default function Home() {
  const { isCreative } = useTheme();

  return (
    <div className="min-h-screen noise-overlay bg-bg-primary">
      <CustomCursor />
      <Navigation />
      <main>
        <Hero />
        {isCreative && <div className="section-divider" />}
        <Journey />
        {isCreative && <div className="section-divider" />}
        <ProjectGallery />
        {isCreative && <div className="section-divider" />}
        <Skills />
        {isCreative && <div className="section-divider" />}
        <Experience />
        {isCreative && <div className="section-divider" />}
        <VisionBoard />
        {isCreative && <div className="section-divider" />}
        <Contact />
      </main>
      <AiChat />
    </div>
  );
}
