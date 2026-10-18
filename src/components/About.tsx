"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { FileText, ArrowDown, Terminal, Cpu, Layers } from "lucide-react";
import AboutPhotoSlot from "@/components/AboutPhotoSlot";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [motionReady, setMotionReady] = useState(false);

  useEffect(() => {
    setMotionReady(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
  const textY = useTransform(
    smoothScroll,
    [0, 1],
    motionReady && prefersReducedMotion ? [0, 0] : [40, -40],
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full pt-20 pb-24 md:pt-32 md:pb-36 bg-[#030305] border-b border-white/[0.06] overflow-hidden"
    >
      <div className="max-w-[1140px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-16 space-y-2">
          <span className="font-mono text-xs text-emerald-400/90 tracking-widest uppercase block">
            // 02. ABOUT &middot; ENGINEERING CRAFT
          </span>
          <h2
            id="about-heading"
            className="text-3xl sm:text-5xl font-black text-white tracking-tighter uppercase"
          >
            Engineering &amp; Philosophy
          </h2>
        </div>

        {/* Editorial Overlapping Layout: Photo Anchor + Text Overlay */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Photo Anchor (5 Cols) */}
          <div className="lg:col-span-5 w-full">
            <AboutPhotoSlot />
          </div>

          {/* Editorial Content (7 Cols) */}
          <motion.div style={{ y: textY }} className="lg:col-span-7 space-y-10">
            
            {/* Main Narrative */}
            <div className="space-y-5 p-8 rounded-2xl border border-white/[0.08] bg-black/60 backdrop-blur-md shadow-2xl">
              <p className="text-lg sm:text-xl text-white/90 leading-relaxed font-sans font-light">
                Computer Science undergraduate at Amity University Madhya Pradesh (CGPA: 8.12) with strong interests in Artificial Intelligence, Machine Learning, Deep Learning, and Software Development.
              </p>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-sans font-normal">
                Experienced in building AI-powered applications using Python and TensorFlow. Passionate about algorithmic problem-solving and continuous learning with 200+ LeetCode problems solved.
              </p>
            </div>

            {/* 3 Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold">
                  <Terminal size={14} />
                  <span>01 // EDUCATION</span>
                </div>
                <p className="text-xs text-white/60 font-sans leading-relaxed">
                  Amity University MP &middot; B.Tech CSE (CGPA: 8.12, Grad: 2028).
                </p>
              </div>

              <div className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold">
                  <Layers size={14} />
                  <span>02 // AI / ML CRAFT</span>
                </div>
                <p className="text-xs text-white/60 font-sans leading-relaxed">
                  Infosys Springboard Certified in AI &amp; Deep Learning (TensorFlow).
                </p>
              </div>

              <div className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] space-y-2">
                <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-semibold">
                  <Cpu size={14} />
                  <span>03 // ALGORITHMS</span>
                </div>
                <p className="text-xs text-white/60 font-sans leading-relaxed">
                  200+ LeetCode problems solved in C++, Data Structures &amp; DP.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-xs font-mono font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors tracking-wider"
              >
                <span>GET IN TOUCH</span>
                <ArrowDown size={14} />
              </a>

              <a
                href="/Harshit_Saxena_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-xs font-mono font-semibold text-white/70 border border-white/10 hover:border-white/30 hover:text-white bg-white/[0.02] transition-colors tracking-wider"
              >
                <FileText size={14} />
                <span>VIEW RESUME</span>
              </a>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
