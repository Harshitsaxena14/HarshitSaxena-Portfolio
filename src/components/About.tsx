"use client";

import { FileText, ArrowDown, Terminal, Cpu, Layers } from "lucide-react";

export default function About() {
  return (
    <section
      id="about"
      className="relative w-full pt-20 pb-24 md:pt-32 md:pb-36 bg-[#030305] border-b border-white/[0.06] overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16 space-y-2">
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

        {/* Editorial Single-Column Content */}
        <div className="space-y-8 md:space-y-10">
          
          {/* Main Narrative Card */}
          <div className="space-y-5 p-8 sm:p-10 rounded-2xl border border-white/[0.08] bg-black/60 backdrop-blur-md shadow-2xl relative overflow-hidden">
            {/* Ambient accent radial glow */}
            <div
              className="absolute top-0 right-0 w-80 h-80 pointer-events-none opacity-10 blur-3xl -z-10"
              style={{
                background: "radial-gradient(circle at 80% 20%, #10b981, transparent 70%)",
              }}
            />
            <p className="text-xl sm:text-2xl text-white/95 leading-relaxed font-sans font-light">
              Computer Science undergraduate at Amity University Madhya Pradesh (CGPA: 8.12) with strong interests in Artificial Intelligence, Machine Learning, Deep Learning, and Software Development.
            </p>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-sans font-normal">
              Experienced in building AI-powered applications using Python and TensorFlow. Passionate about algorithmic problem-solving and continuous learning with 200+ LeetCode problems solved.
            </p>
          </div>

          {/* 3 Core Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 sm:p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-emerald-500/30 transition-colors space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold">
                <Terminal size={14} />
                <span>01 // EDUCATION</span>
              </div>
              <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
                Amity University MP &middot; B.Tech CSE (CGPA: 8.12, Grad: 2028).
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-cyan-500/30 transition-colors space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold">
                <Layers size={14} />
                <span>02 // AI / ML CRAFT</span>
              </div>
              <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
                Infosys Springboard Certified in AI &amp; Deep Learning (TensorFlow).
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-purple-500/30 transition-colors space-y-2">
              <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-semibold">
                <Cpu size={14} />
                <span>03 // ALGORITHMS</span>
              </div>
              <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
                200+ LeetCode problems solved in C++, Data Structures &amp; DP.
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-xs font-mono font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors tracking-wider shadow-lg shadow-emerald-950/40"
            >
              <span>GET IN TOUCH</span>
              <ArrowDown size={14} />
            </a>

            <a
              href="/Harshit_Saxena_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-xs font-mono font-semibold text-white/70 border border-white/10 hover:border-white/30 hover:text-white bg-white/[0.02] transition-colors tracking-wider"
            >
              <FileText size={14} />
              <span>VIEW RESUME</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
