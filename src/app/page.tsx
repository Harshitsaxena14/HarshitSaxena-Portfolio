"use client";

import { useBoot } from "@/hooks/useBoot";
import BootScreen from "@/components/BootScreen";
import CinematicIntro from "@/components/CinematicIntro";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import JourneyTimeline from "@/components/JourneyTimeline";
import ProjectCaseStudy from "@/components/ProjectCaseStudy";
import LeetCodeSection from "@/components/leetcode/LeetCodeSection";
import TechStack from "@/components/TechStack";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  const { isBooting, showIntro, completeTerminalBoot, completeCinematicIntro } = useBoot();

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#030305] text-text-primary relative">
        {/* PHASE 1: TERMINAL BOOT OVERLAY */}
        {isBooting && <BootScreen onComplete={completeTerminalBoot} />}

        {/* PHASE 2 & 3: CINEMATIC INTRO & TRANSITION OVERLAY */}
        {showIntro && <CinematicIntro onComplete={completeCinematicIntro} />}

        {/* Floating Apple-inspired Navbar */}
        <Navbar isBooting={isBooting || showIntro} />

        {/* Main Vertically Progressive Continuous Visual Journey */}
        <main className="relative z-10">
          {/* PHASE 4: ACTUAL PORTFOLIO HERO */}
          <Hero isBooting={isBooting || showIntro} />

          {/* 03 ABOUT */}
          <About />

          {/* 04 JOURNEY */}
          <JourneyTimeline />

          {/* 05 PROJECTS */}
          <ProjectCaseStudy />

          {/* 06 DSA / LEETCODE */}
          <LeetCodeSection />

          {/* 07 TECH STACK */}
          <TechStack />

          {/* 08 CONTACT */}
          <Contact />
        </main>

        {/* 09 FOOTER */}
        <Footer />
      </div>
    </SmoothScroll>
  );
}


