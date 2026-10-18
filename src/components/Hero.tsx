"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { ArrowDown, Code2, Terminal, Cpu, Sparkles } from "lucide-react";
import { UiverseButton } from "@/components/ui/UiverseButton";
import InteractivePortraitCard from "@/components/InteractivePortraitCard";

export default function Hero({ isBooting = false }: { isBooting?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 20, restDelta: 0.001 });

  // Continuous Spatial Camera Transforms on Scroll into About
  const heroScale = useTransform(smoothScroll, [0, 0.5, 1], [1, 0.88, 0.76]);
  const heroY = useTransform(smoothScroll, [0, 0.5, 1], [0, -80, -180]);
  const heroRotateX = useTransform(smoothScroll, [0, 0.6, 1], [0, 8, 18]);
  const heroTranslateZ = useTransform(smoothScroll, [0, 0.6, 1], [0, -160, -320]);
  const heroOpacity = useTransform(smoothScroll, [0, 0.55, 0.95], [1, 0.5, 0]);

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: isBooting ? 0 : 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full min-h-[95vh] flex flex-col justify-between pt-24 pb-12 md:pt-32 md:pb-16 border-b border-white/[0.06] overflow-hidden bg-[#030305] perspective-[1200px]"
    >
      {/* Background Ambient Atmospheric Lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-purple-900/10 to-transparent" />

      {/* Main 2-Column Desktop Grid / Stacked Mobile Composition */}
      <div className="max-w-[1240px] mx-auto px-6 w-full relative z-10 my-auto">
        <motion.div
          style={
            mounted && !prefersReducedMotion
              ? {
                  scale: heroScale,
                  y: heroY,
                  rotateX: heroRotateX,
                  translateZ: heroTranslateZ,
                  opacity: heroOpacity,
                  transformStyle: "preserve-3d",
                }
              : undefined
          }
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center origin-top-left py-4"
        >
          {/* LEFT COLUMN: Editorial Identity */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Tagline */}
            <div className="space-y-1">
              <span className="font-mono text-xs text-emerald-400/90 tracking-widest uppercase block flex items-center gap-2">
                <Sparkles size={12} className="text-emerald-400" />
                // 01. IDENTITY &middot; SYSTEM ARCHITECTURE &amp; ALGORITHMS
              </span>

              {/* Oversized Editorial Name */}
              <h1 className="text-6xl sm:text-8xl lg:text-[108px] font-black text-white tracking-tighter leading-[0.88] uppercase select-none">
                HARSHIT
                <br />
                <span className="text-white/95">SAXENA</span>
              </h1>
            </div>

            {/* Three Identity Pillars */}
            <div className="font-mono text-base sm:text-xl lg:text-2xl text-emerald-400/90 font-bold tracking-tight uppercase flex flex-wrap items-center gap-x-3 gap-y-1 pt-1">
              <span>ENGINEER.</span>
              <span className="text-white/30">&middot;</span>
              <span>PROBLEM SOLVER.</span>
              <span className="text-white/30">&middot;</span>
              <span className="text-cyan-400/90">BUILDER.</span>
            </div>

            {/* Short Professional Description */}
            <p className="text-base sm:text-lg text-white/70 leading-relaxed font-sans font-light max-w-xl pt-1">
              Computer Science undergraduate at <strong className="text-white font-medium">Amity University Madhya Pradesh</strong> with strong interests in Artificial Intelligence, Machine Learning, Deep Learning, and Software Development.
            </p>

            {/* Status & Location Badges */}
            <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] pt-1">
              <span className="px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/30 text-emerald-400 font-semibold">
                STATUS: B.TECH CSE (CLASS OF 2028)
              </span>
              <span className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-white/60">
                GWALIOR, MP, INDIA // UTC +5:30
              </span>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/[0.08]">
              <UiverseButton href="#projects">
                EXPLORE PROJECTS
              </UiverseButton>

              <a
                href="mailto:harshitacademics@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-mono font-semibold text-white/80 border border-white/10 hover:border-emerald-500/50 hover:text-white bg-white/[0.02] hover:bg-white/[0.06] transition-all tracking-wider"
              >
                <span>GET IN TOUCH</span>
              </a>
            </div>

            {/* Tech Badges */}
            <div className="flex items-center gap-3 font-mono text-[11px] text-white/40 pt-2">
              <span className="flex items-center gap-1.5 bg-white/[0.03] border border-white/[0.06] px-3 py-1 rounded-full">
                <Code2 size={13} className="text-cyan-400" />
                <span>Next.js 14</span>
              </span>
              <span className="flex items-center gap-1.5 bg-white/[0.03] border border-white/[0.06] px-3 py-1 rounded-full">
                <Terminal size={13} className="text-emerald-400" />
                <span>C++ &amp; Go</span>
              </span>
              <span className="flex items-center gap-1.5 bg-white/[0.03] border border-white/[0.06] px-3 py-1 rounded-full">
                <Cpu size={13} className="text-purple-400" />
                <span>FastAPI &amp; ML</span>
              </span>
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive Editorial Portrait Frame (/harshit_photo.jpg) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <InteractivePortraitCard photoUrl="/harshit_photo.jpg" />
          </div>

        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="max-w-[1240px] mx-auto px-6 w-full flex items-center justify-between text-white/30 font-mono text-[11px] tracking-widest uppercase relative z-10 pt-4">
        <div className="flex items-center gap-2">
          <ArrowDown size={13} className="animate-bounce text-emerald-400" />
          <span>// SCROLL TO EXPLORE</span>
        </div>
        <span>01 / 07</span>
      </div>
    </motion.section>
  );
}
