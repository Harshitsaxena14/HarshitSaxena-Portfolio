"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Terminal, Code2, Cpu, Rocket, Calendar, CheckCircle2, Sparkles } from "lucide-react";
import gsap from "gsap";

interface Milestone {
  year: string;
  badge: string;
  title: string;
  description: string;
  highlights: string[];
  tech: string[];
  icon: typeof Terminal;
  accentColor: string;
  chapterNumber: string;
}

const MILESTONES: Milestone[] = [
  {
    year: "2024",
    chapterNumber: "01 / 03",
    badge: "FOUNDATIONS & ALGORITHMIC RIGOR",
    title: "B.Tech CS Degree & Algorithmic Foundations",
    description:
      "Enrolled in B.Tech Computer Science & Engineering at Amity University Madhya Pradesh (CGPA: 8.12). Mastered C++, data structures, and algorithmic problem-solving patterns.",
    highlights: [
      "Enrolled in B.Tech CSE at Amity University MP (CGPA: 8.12)",
      "Solved 147+ LeetCode problems establishing problem-solving consistency",
      "Mastered trees, graphs, heaps, and dynamic programming in C++",
    ],
    tech: ["C++", "Python", "Data Structures", "Algorithms", "Git"],
    icon: Terminal,
    accentColor: "#38BDF8", // Cyan
  },
  {
    year: "2025",
    chapterNumber: "02 / 03",
    badge: "AI/ML CERTIFICATIONS & DEPLOYED PROJECTS",
    title: "Infosys Springboard AI Certifications & MindLens",
    description:
      "Earned Infosys Springboard Certifications in Artificial Intelligence and Deep Learning. Built & deployed MindLens (AI Student Wellbeing Analyzer) and Fashion-MNIST CNN Classifier.",
    highlights: [
      "Earned Infosys Springboard AI & Deep Learning Certifications",
      "Built and deployed AI-powered MindLens platform on Streamlit",
      "Engineered Fashion-MNIST CNN model achieving 86% accuracy in 5 epochs",
    ],
    tech: ["Python", "TensorFlow", "Deep Learning", "NLP", "Streamlit"],
    icon: Cpu,
    accentColor: "#A855F7", // Purple
  },
  {
    year: "NOW",
    chapterNumber: "03 / 03",
    badge: "HEALTHCARE TECH & SOFTWARE DEVELOPMENT",
    title: "MediFlow & HarshitOS Engineering Portfolio",
    description:
      "Developing MediFlow healthcare medicine inventory platform with Emergency Mode. Engineering dark editorial HarshitOS portfolio while advancing software development craft.",
    highlights: [
      "Engineering MediFlow medicine inventory & emergency hospital web app",
      "Built dark editorial HarshitOS portfolio with Next.js 14 & TypeScript",
      "Pursuing software engineering & AI/ML opportunities (Graduation: 2028)",
    ],
    tech: ["Python", "Next.js 14", "TypeScript", "PostgreSQL", "Web Development"],
    icon: Rocket,
    accentColor: "#10B981", // Emerald
  },
];

// Helper piecewise interpolation function
function interpolate(p: number, input: number[], output: number[]): number {
  if (p <= input[0]) return output[0];
  if (p >= input[input.length - 1]) return output[output.length - 1];

  for (let i = 0; i < input.length - 1; i++) {
    if (p >= input[i] && p <= input[i + 1]) {
      const t = (p - input[i]) / (input[i + 1] - input[i]);
      return output[i] + t * (output[i + 1] - output[i]);
    }
  }
  return output[0];
}

// ─── Spatial Milestone Card Component ─────────────────────────────────────────

function SpatialJourneyCard({ item }: { item: Milestone }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const Icon = item.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rX = ((e.clientY - cy) / (rect.height / 2)) * -3;
    const rY = ((e.clientX - cx) / (rect.width / 2)) * 3;

    gsap.to(cardRef.current, {
      rotateX: rX,
      rotateY: rY,
      translateZ: 15,
      scale: 1.015,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      translateZ: 0,
      scale: 1,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
      className="rounded-2xl border border-white/10 hover:border-emerald-500/40 bg-[#08080d]/95 p-6 sm:p-7 space-y-4 shadow-2xl backdrop-blur-xl group transition-colors duration-300 select-none overflow-hidden"
    >
      {/* Background Ambient Spot */}
      <div
        className="absolute inset-0 opacity-15 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none -z-10"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${item.accentColor}, transparent 70%)`,
        }}
      />

      {/* Header: Year & Chapter Badge */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 font-mono">
        <span className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2.5">
          <Calendar size={16} style={{ color: item.accentColor }} />
          <span className="tracking-tight">{item.year}</span>
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-white/40">{item.chapterNumber}</span>
          <span
            className="text-[9px] sm:text-[10px] font-bold px-2.5 py-0.5 rounded tracking-wider uppercase border"
            style={{
              color: item.accentColor,
              backgroundColor: `${item.accentColor}18`,
              borderColor: `${item.accentColor}45`,
            }}
          >
            {item.badge}
          </span>
        </div>
      </div>

      {/* Title & Description */}
      <div className="space-y-2">
        <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2.5 group-hover:text-emerald-300 transition-colors">
          <Icon size={18} style={{ color: item.accentColor }} className="shrink-0" />
          <span>{item.title}</span>
        </h3>
        <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans font-light">
          {item.description}
        </p>
      </div>

      {/* Key Highlights List */}
      <ul className="space-y-2 pt-1 font-sans">
        {item.highlights.map((h, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-white/80">
            <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      {/* Tech Stack Badges */}
      <div className="pt-3 border-t border-white/[0.08] flex flex-wrap gap-1.5 font-mono text-[10px]">
        {item.tech.map((t) => (
          <span
            key={t}
            className="text-white/80 bg-black/60 border border-white/10 px-2.5 py-0.5 rounded"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Main JourneyTimeline Component (Single-Chapter Model) ───────────────────

export default function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);

  // Measure container scroll progress (0.0 to 1.0) on every scroll event
  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      const p = Math.min(1, Math.max(0, -rect.top / scrollable));
      setProgress(p);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Section Header Reveal
  const titleY = interpolate(progress, [0.0, 0.05], [40, 0]);
  const titleOpacity = interpolate(progress, [0.0, 0.05], [0, 1]);

  // Dynamic Central Spine Growth (0% -> 100%)
  const lineScaleY = prefersReducedMotion ? 1 : interpolate(progress, [0.03, 0.97], [0, 1]);

  // Milestone Node Illuminations
  const node1Scale = interpolate(progress, [0.04, 0.15, 0.28, 0.35], [0.8, 1.4, 1.4, 0.9]);
  const node2Scale = interpolate(progress, [0.35, 0.45, 0.60, 0.68], [0.8, 1.4, 1.4, 0.9]);
  const node3Scale = interpolate(progress, [0.68, 0.78, 1.0], [0.8, 1.4, 1.2]);

  const activeYearLabel =
    progress < 0.36
      ? "2024"
      : progress < 0.68
      ? "2025"
      : "NOW";

  // ─── SINGLE-CHAPTER SCROLL TRANSFORM DEFINITIONS (ZERO OVERLAP) ─────────────

  // Chapter 1 (2024): [0.05 -> 0.36] — Card enters Left, holds, exits Left
  const m1Opacity = interpolate(progress, [0.05, 0.12, 0.28, 0.35], [0, 1, 1, 0]);
  const m1X = prefersReducedMotion ? 0 : interpolate(progress, [0.05, 0.12, 0.28, 0.35], [-120, 0, 0, -80]);
  const m1Scale = prefersReducedMotion ? 1 : interpolate(progress, [0.05, 0.12, 0.28, 0.35], [0.92, 1.0, 1.0, 0.92]);
  const m1RotateY = prefersReducedMotion ? 0 : interpolate(progress, [0.05, 0.12, 0.28, 0.35], [-8, 0, 0, 0]);

  // Chapter 2 (2025): [0.36 -> 0.68] — Card enters Right, holds, exits Right
  const m2Opacity = interpolate(progress, [0.36, 0.44, 0.59, 0.67], [0, 1, 1, 0]);
  const m2X = prefersReducedMotion ? 0 : interpolate(progress, [0.36, 0.44, 0.59, 0.67], [120, 0, 0, 80]);
  const m2Scale = prefersReducedMotion ? 1 : interpolate(progress, [0.36, 0.44, 0.59, 0.67], [0.92, 1.0, 1.0, 0.92]);
  const m2RotateY = prefersReducedMotion ? 0 : interpolate(progress, [0.36, 0.44, 0.59, 0.67], [8, 0, 0, 0]);

  // Chapter 3 (NOW): [0.68 -> 1.00] — Climax Card emerges from Depth
  const m3Opacity = interpolate(progress, [0.68, 0.76, 1.0], [0, 1, 1]);
  const m3Scale = prefersReducedMotion ? 1 : interpolate(progress, [0.68, 0.76, 1.0], [0.85, 1.05, 1.05]);
  const m3Z = prefersReducedMotion ? 0 : interpolate(progress, [0.68, 0.76, 1.0], [-200, 20, 20]);

  const chapterStates = [
    { opacity: m1Opacity, x: m1X, scale: m1Scale, rotateY: m1RotateY, rotateX: 0, z: 0 },
    { opacity: m2Opacity, x: m2X, scale: m2Scale, rotateY: m2RotateY, rotateX: 0, z: 0 },
    { opacity: m3Opacity, x: 0, scale: m3Scale, rotateY: 0, rotateX: 0, z: m3Z },
  ];

  return (
    <div
      ref={containerRef}
      id="experience"
      className="relative w-full h-[450vh] bg-[#030305] border-b border-white/[0.06]"
    >
      {/* Sticky Pinned Viewport Stage (100vh) */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden py-8 z-10">
        <div className="max-w-[1240px] mx-auto px-6 w-full h-full relative flex flex-col justify-between">
          
          {/* Section Header */}
          <motion.div
            style={{ y: `${titleY}px`, opacity: titleOpacity }}
            className="text-center space-y-1 z-20 shrink-0 pt-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md mb-1">
              <Sparkles size={12} className="text-emerald-400 animate-pulse" />
              <span className="font-mono text-[10px] text-emerald-300 uppercase tracking-widest">
                // 03. JOURNEY &middot; CHAPTER {activeYearLabel}
              </span>
            </div>
            <h2
              id="experience-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tighter uppercase"
            >
              HOW I GOT HERE.
            </h2>
          </motion.div>

          {/* Single-Chapter Stage Container */}
          <div className="relative w-full flex-1 my-auto max-h-[560px] flex items-center justify-center">
            
            {/* Background Track Spine Line */}
            <div className="absolute left-1/2 top-4 bottom-4 w-[2px] bg-white/[0.08] -translate-x-1/2 pointer-events-none z-0" />

            {/* Scroll-Illuminated Active Spine Line */}
            <motion.div
              style={{ scaleY: lineScaleY, transformOrigin: "top" }}
              className="absolute left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-cyan-400 via-purple-500 to-emerald-400 -translate-x-1/2 origin-top pointer-events-none shadow-[0_0_18px_rgba(16,185,129,0.7)] z-0"
            />

            {/* Active Year Spine Node Indicator */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center pointer-events-none">
              <motion.div
                style={{
                  scale:
                    progress < 0.36
                      ? node1Scale
                      : progress < 0.68
                      ? node2Scale
                      : node3Scale,
                  borderColor:
                    progress < 0.36
                      ? "#38BDF8"
                      : progress < 0.68
                      ? "#A855F7"
                      : "#10B981",
                }}
                className="w-12 h-12 rounded-full border-2 bg-[#050508] flex items-center justify-center shadow-2xl transition-colors duration-300"
              >
                <span className="font-mono text-xs font-bold text-white">{activeYearLabel}</span>
              </motion.div>
            </div>

            {/* 3 Single-Chapter Milestone Cards (ONLY ONE VISIBLE AT A TIME) */}
            {MILESTONES.map((item, index) => {
              const state = chapterStates[index];
              const isDominant = state.opacity > 0.05;

              return (
                <motion.div
                  key={item.year}
                  style={{
                    opacity: state.opacity,
                    scale: state.scale,
                    x: `${state.x}px`,
                    rotateY: `${state.rotateY}deg`,
                    rotateX: `${state.rotateX}deg`,
                    z: `${state.z}px`,
                    visibility: isDominant ? "visible" : "hidden",
                    pointerEvents: isDominant ? "auto" : "none",
                  }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[540px] px-4 perspective-[1200px] z-30"
                >
                  <SpatialJourneyCard item={item} />
                </motion.div>
              );
            })}

          </div>

          {/* Footer Chapter Progress Meter */}
          <div className="shrink-0 pb-2 flex items-center justify-center gap-6 font-mono text-xs text-white/50 z-20">
            {MILESTONES.map((m, i) => {
              const active =
                (i === 0 && progress < 0.36) ||
                (i === 1 && progress >= 0.36 && progress < 0.68) ||
                (i === 2 && progress >= 0.68);

              return (
                <div
                  key={m.year}
                  className={`flex items-center gap-1.5 transition-colors duration-300 ${
                    active ? "text-white font-bold" : "text-white/30"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      active ? "scale-125" : ""
                    }`}
                    style={{ backgroundColor: active ? m.accentColor : "rgba(255,255,255,0.2)" }}
                  />
                  <span>{m.year}</span>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}
