"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Terminal,
  Cpu,
  Rocket,
  Calendar,
  CheckCircle2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  GitCommit,
  Layers,
  ArrowRight,
  ListFilter,
  TrainTrack,
} from "lucide-react";

interface Milestone {
  year: string;
  stationCode: string;
  badge: string;
  title: string;
  role: string;
  location: string;
  description: string;
  highlights: string[];
  tech: string[];
  icon: typeof Terminal;
  accentColor: string;
  accentGradient: string;
  chapterNumber: string;
}

const MILESTONES: Milestone[] = [
  {
    year: "2024",
    stationCode: "STN-01",
    chapterNumber: "01 / 03",
    badge: "FOUNDATIONS & ALGORITHMIC RIGOR",
    title: "B.Tech CS Degree & Algorithmic Foundations",
    role: "Computer Science Undergraduate",
    location: "Amity University Madhya Pradesh (CGPA: 8.12)",
    description:
      "Enrolled in B.Tech Computer Science & Engineering. Mastered C++, core data structures, and algorithmic problem-solving patterns with dedicated competitive programming practice.",
    highlights: [
      "Enrolled in B.Tech CSE at Amity University MP (CGPA: 8.12)",
      "Solved 147+ LeetCode problems establishing continuous problem-solving rigor",
      "Mastered trees, graphs, heaps, and dynamic programming patterns in C++",
    ],
    tech: ["C++", "Python", "Data Structures", "Algorithms", "Git"],
    icon: Terminal,
    accentColor: "#38BDF8", // Cyan
    accentGradient: "from-cyan-500/20 via-cyan-500/5 to-transparent",
  },
  {
    year: "2025",
    stationCode: "STN-02",
    chapterNumber: "02 / 03",
    badge: "AI/ML CERTIFICATIONS & DEPLOYED SYSTEMS",
    title: "Infosys Springboard AI Certifications & MindLens",
    role: "AI/ML Developer & Student Researcher",
    location: "Infosys Springboard & Open Source",
    description:
      "Earned Infosys Springboard Professional Certifications in Artificial Intelligence and Deep Learning. Engineered and deployed MindLens (AI Student Wellbeing Platform) and Fashion-MNIST CNN.",
    highlights: [
      "Earned Infosys Springboard AI & Deep Learning Certifications",
      "Architected & deployed AI-powered MindLens platform with Streamlit & TensorFlow NLP",
      "Engineered Fashion-MNIST CNN model achieving 86% accuracy in 5 training epochs",
    ],
    tech: ["Python", "TensorFlow", "Deep Learning", "NLP", "Streamlit"],
    icon: Cpu,
    accentColor: "#A855F7", // Purple
    accentGradient: "from-purple-500/20 via-purple-500/5 to-transparent",
  },
  {
    year: "NOW",
    stationCode: "STN-03",
    chapterNumber: "03 / 03",
    badge: "HEALTHCARE TECH & SOFTWARE CRAFT",
    title: "MediFlow & HarshitOS Engineering Portfolio",
    role: "Full-Stack Software Engineer",
    location: "Gwalior, India & Remote",
    description:
      "Developing MediFlow healthcare medicine inventory platform with Emergency Mode. Engineering high-performance HarshitOS dark editorial portfolio while pursuing software engineering opportunities.",
    highlights: [
      "Engineering MediFlow medicine inventory & emergency hospital pharmacy discovery system",
      "Built dark editorial HarshitOS portfolio with Next.js 14, TypeScript & Framer Motion",
      "Actively pursuing Software Engineering & AI/ML opportunities (Graduation: 2028)",
    ],
    tech: ["Python", "Next.js 14", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    icon: Rocket,
    accentColor: "#10B981", // Emerald
    accentGradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
  },
];

export default function JourneyTimeline() {
  const [activeStationIndex, setActiveStationIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"circuit" | "stream">("circuit");
  const prefersReducedMotion = useReducedMotion();
  const stationTabsRef = useRef<HTMLDivElement>(null);

  const activeMilestone = MILESTONES[activeStationIndex];
  const Icon = activeMilestone.icon;

  // Keyboard navigation for stations (ArrowLeft / ArrowRight)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      setActiveStationIndex((prev) => (prev + 1) % MILESTONES.length);
    } else if (e.key === "ArrowLeft") {
      setActiveStationIndex((prev) => (prev - 1 + MILESTONES.length) % MILESTONES.length);
    }
  };

  return (
    <section
      id="experience"
      className="relative w-full py-20 md:py-32 bg-[#030305] text-white border-b border-white/[0.06] overflow-hidden"
      aria-label="Development Journey"
    >
      {/* Ambient background lighting */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] blur-[140px] pointer-events-none rounded-full opacity-20 transition-all duration-700"
        style={{ backgroundColor: activeMilestone.accentColor }}
      />

      <div className="max-w-[1240px] mx-auto px-6 relative z-10 space-y-12">
        {/* Section Header with View Mode Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-white/[0.08]">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
              <Sparkles size={12} className="text-emerald-400" />
              <span className="font-mono text-xs text-emerald-300 uppercase tracking-widest">
                // 03. JOURNEY &middot; STATION-TO-STATION CIRCUIT
              </span>
            </div>
            <h2
              id="experience-heading"
              className="text-3xl sm:text-5xl font-black text-white tracking-tighter uppercase"
            >
              How I Got Here.
            </h2>
            <p className="text-sm text-white/60 font-sans max-w-xl font-light">
              A navigable transit circuit tracking core algorithmic foundations, AI/ML specialization, and full-stack system projects.
            </p>
          </div>

          {/* View Switcher: Interactive Circuit vs Chronological Stream */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/10 self-start md:self-auto font-mono text-xs">
            <button
              onClick={() => setViewMode("circuit")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === "circuit"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold"
                  : "text-white/50 hover:text-white"
              }`}
              aria-pressed={viewMode === "circuit"}
            >
              <TrainTrack size={14} />
              <span>CIRCUIT VIEW</span>
            </button>
            <button
              onClick={() => setViewMode("stream")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === "stream"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold"
                  : "text-white/50 hover:text-white"
              }`}
              aria-pressed={viewMode === "stream"}
            >
              <ListFilter size={14} />
              <span>FULL STREAM</span>
            </button>
          </div>
        </div>

        {/* ── MODE 1: INTERACTIVE TRANSIT CIRCUIT ─────────────────────────── */}
        {viewMode === "circuit" ? (
          <div className="space-y-10">
            {/* Transit Line & Stations Bar */}
            <div
              ref={stationTabsRef}
              role="tablist"
              aria-label="Journey Stations"
              onKeyDown={handleKeyDown}
              className="relative p-6 rounded-2xl border border-white/[0.08] bg-black/40 backdrop-blur-md"
            >
              {/* Connecting Transit Track SVG Line */}
              <div className="hidden sm:block absolute top-[44px] left-[12%] right-[12%] h-[3px] bg-white/10 -z-0">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 transition-all duration-500"
                  style={{
                    width: `${(activeStationIndex / (MILESTONES.length - 1)) * 100}%`,
                  }}
                />
              </div>

              {/* Station Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
                {MILESTONES.map((milestone, idx) => {
                  const isSelected = idx === activeStationIndex;

                  return (
                    <button
                      key={milestone.stationCode}
                      role="tab"
                      aria-selected={isSelected}
                      aria-controls={`station-panel-${idx}`}
                      id={`station-tab-${idx}`}
                      tabIndex={isSelected ? 0 : -1}
                      onClick={() => setActiveStationIndex(idx)}
                      className={`group flex flex-col items-center text-center p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? "bg-white/[0.08] border-white/30 shadow-xl"
                          : "bg-black/30 border-white/[0.06] hover:border-white/20 hover:bg-white/[0.03]"
                      }`}
                    >
                      {/* Station Pulse Node */}
                      <div className="relative mb-3 flex items-center justify-center">
                        <div
                          className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                            isSelected ? "scale-110 shadow-lg" : "scale-100"
                          }`}
                          style={{
                            borderColor: isSelected ? milestone.accentColor : "rgba(255,255,255,0.2)",
                            backgroundColor: isSelected ? `${milestone.accentColor}25` : "#050508",
                          }}
                        >
                          <span
                            className="font-mono text-xs font-bold"
                            style={{ color: isSelected ? milestone.accentColor : "rgba(255,255,255,0.6)" }}
                          >
                            0{idx + 1}
                          </span>
                        </div>
                        {isSelected && (
                          <span
                            className="absolute -inset-1 rounded-full animate-ping opacity-40"
                            style={{ backgroundColor: milestone.accentColor }}
                          />
                        )}
                      </div>

                      {/* Station Info */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-center gap-2 font-mono text-[11px]">
                          <span className="text-white/40">{milestone.stationCode}</span>
                          <span className="text-white/20">&middot;</span>
                          <span
                            className="font-bold tracking-wider"
                            style={{ color: isSelected ? milestone.accentColor : "rgba(255,255,255,0.8)" }}
                          >
                            {milestone.year}
                          </span>
                        </div>
                        <span className="font-sans text-xs font-medium text-white/80 line-clamp-1 block">
                          {milestone.badge}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Station Stage Card */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeMilestone.stationCode}
                id={`station-panel-${activeStationIndex}`}
                role="tabpanel"
                aria-labelledby={`station-tab-${activeStationIndex}`}
                initial={false}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-2xl border border-white/10 bg-[#08080d]/95 p-7 sm:p-10 shadow-2xl backdrop-blur-xl overflow-hidden"
              >
                {/* Radial ambient glow */}
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none -z-10"
                  style={{
                    background: `radial-gradient(circle at 80% 20%, ${activeMilestone.accentColor}, transparent 65%)`,
                  }}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Station badge & description */}
                  <div className="lg:col-span-7 space-y-6">
                    {/* Chapter & Badge */}
                    <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                      <span className="text-white/40">{activeMilestone.chapterNumber}</span>
                      <span
                        className="px-3 py-1 rounded-full border text-[11px] font-bold tracking-wider uppercase"
                        style={{
                          color: activeMilestone.accentColor,
                          borderColor: `${activeMilestone.accentColor}40`,
                          backgroundColor: `${activeMilestone.accentColor}15`,
                        }}
                      >
                        {activeMilestone.badge}
                      </span>
                    </div>

                    {/* Title & Role */}
                    <div className="space-y-2">
                      <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
                        <Icon size={24} style={{ color: activeMilestone.accentColor }} className="shrink-0" />
                        <span>{activeMilestone.title}</span>
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-white/60">
                        <span className="text-emerald-400 font-medium">{activeMilestone.role}</span>
                        <span className="text-white/20">&middot;</span>
                        <span>{activeMilestone.location}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-white/80 font-sans leading-relaxed font-light">
                      {activeMilestone.description}
                    </p>

                    {/* Highlights List */}
                    <div className="space-y-2.5 pt-2">
                      <span className="font-mono text-xs text-white/40 uppercase tracking-widest block">
                        KEY ACHIEVEMENTS &amp; ARTIFACTS
                      </span>
                      <ul className="space-y-2 font-sans">
                        {activeMilestone.highlights.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/90">
                            <CheckCircle2
                              size={15}
                              className="shrink-0 mt-0.5"
                              style={{ color: activeMilestone.accentColor }}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column: Station Telemetry & Tech Matrix */}
                  <div className="lg:col-span-5 space-y-6 lg:border-l lg:border-white/[0.08] lg:pl-8">
                    {/* Station Telemetry Box */}
                    <div className="p-5 rounded-xl border border-white/[0.08] bg-black/50 space-y-3 font-mono">
                      <div className="flex items-center justify-between text-xs text-white/40 pb-2 border-b border-white/[0.06]">
                        <span>TRANSIT TELEMETRY</span>
                        <span>{activeMilestone.stationCode}</span>
                      </div>
                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-white/50">TIMELINE:</span>
                          <span className="text-white font-bold">{activeMilestone.year}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/50">STATUS:</span>
                          <span className="text-emerald-400 font-semibold">VERIFIED ARCHIVE</span>
                        </div>
                      </div>
                    </div>

                    {/* Tech Badges */}
                    <div className="space-y-2.5">
                      <span className="font-mono text-xs text-white/40 uppercase tracking-widest block">
                        TECHNOLOGIES APPLIED
                      </span>
                      <div className="flex flex-wrap gap-2 font-mono text-xs">
                        {activeMilestone.tech.map((t) => (
                          <span
                            key={t}
                            className="text-white/80 bg-white/[0.03] border border-white/10 px-3 py-1 rounded-lg"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Station Navigation Controls */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/[0.08] font-mono text-xs">
                      <button
                        onClick={() =>
                          setActiveStationIndex((prev) => (prev - 1 + MILESTONES.length) % MILESTONES.length)
                        }
                        className="inline-flex items-center gap-1.5 text-white/60 hover:text-white transition-colors cursor-pointer"
                        aria-label="Previous station"
                      >
                        <ChevronLeft size={16} />
                        <span>PREV STATION</span>
                      </button>

                      <span className="text-white/30">
                        0{activeStationIndex + 1} / 0{MILESTONES.length}
                      </span>

                      <button
                        onClick={() =>
                          setActiveStationIndex((prev) => (prev + 1) % MILESTONES.length)
                        }
                        className="inline-flex items-center gap-1.5 text-white/60 hover:text-white transition-colors cursor-pointer"
                        aria-label="Next station"
                      >
                        <span>NEXT STATION</span>
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          /* ── MODE 2: CHRONOLOGICAL STREAM FALLBACK ───────────────────────── */
          <div className="relative pl-6 sm:pl-10 space-y-12 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-cyan-400 before:via-purple-400 before:to-emerald-400">
            {MILESTONES.map((m, idx) => {
              const MilestoneIcon = m.icon;

              return (
                <div key={m.year} className="relative space-y-4">
                  {/* Timeline Station Point */}
                  <div
                    className="absolute -left-[31px] sm:-left-[35px] top-1.5 w-6 h-6 rounded-full border-2 bg-[#030305] flex items-center justify-center shadow-lg"
                    style={{ borderColor: m.accentColor }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: m.accentColor }} />
                  </div>

                  {/* Card Content */}
                  <div className="rounded-2xl border border-white/[0.08] bg-[#08080d]/90 p-6 sm:p-8 space-y-4 shadow-xl">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-3 font-mono text-xs">
                      <span className="font-extrabold text-white text-base flex items-center gap-2">
                        <Calendar size={14} style={{ color: m.accentColor }} />
                        <span>{m.year}</span>
                      </span>
                      <span
                        className="px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase border"
                        style={{
                          color: m.accentColor,
                          borderColor: `${m.accentColor}30`,
                          backgroundColor: `${m.accentColor}10`,
                        }}
                      >
                        {m.badge}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                      <MilestoneIcon size={18} style={{ color: m.accentColor }} />
                      <span>{m.title}</span>
                    </h3>

                    <p className="text-sm text-white/70 font-sans leading-relaxed font-light">
                      {m.description}
                    </p>

                    <ul className="space-y-2 pt-1 font-sans">
                      {m.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-white/85">
                          <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.06] font-mono text-[11px]">
                      {m.tech.map((t) => (
                        <span
                          key={t}
                          className="bg-black/60 border border-white/10 px-2.5 py-0.5 rounded text-white/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

