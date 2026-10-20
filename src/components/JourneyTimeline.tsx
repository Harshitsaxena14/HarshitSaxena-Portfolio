"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  useMotionValueEvent,
} from "framer-motion";
import {
  Terminal,
  Cpu,
  Rocket,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  LucideIcon,
} from "lucide-react";

// ─── Milestone Data Model ──────────────────────────────────────────────────────

export interface JourneyMilestone {
  id: string;
  period: string;
  domain: string;
  title: string;
  subtitle: string;
  status: "Completed" | "Active";
  statusColor: string;
  narrative: string;
  highlights: string[];
  techStack: string[];
  icon: LucideIcon;
  accentColor: string;
  actionLink?: {
    label: string;
    href: string;
  };
}

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    id: "milestone-2024",
    period: "2024",
    domain: "ACADEMIC FOUNDATIONS",
    title: "Starting My Computer Science Journey",
    subtitle: "Amity University Madhya Pradesh · B.Tech CSE (CGPA: 8.12)",
    status: "Completed",
    statusColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    narrative:
      "Started my B.Tech in Computer Science and Engineering at Amity University Madhya Pradesh. Began building my programming fundamentals, learning C++, and developing an understanding of how software works.",
    highlights: [
      "Enrolled in B.Tech Computer Science and Engineering at Amity University MP",
      "Built core programming and problem-solving fundamentals in C++",
      "Started exploring foundational data structures and algorithmic concepts",
    ],
    techStack: ["C++", "Programming Fundamentals", "Data Structures", "Git"],
    icon: Terminal,
    accentColor: "#38bdf8", // Sky Cyan
    actionLink: {
      label: "VIEW ACADEMIC CRAFT",
      href: "#about",
    },
  },
  {
    id: "milestone-2025",
    period: "2025",
    domain: "DSA, AI/ML & TECHNICAL EXPLORATION",
    title: "Exploring AI and Turning Learning into Practice",
    subtitle: "Machine Learning, Deep Learning Certifications & Algorithmic Practice",
    status: "Completed",
    statusColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    narrative:
      "Expanded my interests beyond programming fundamentals into Data Structures and Algorithms, Artificial Intelligence, Machine Learning, and Deep Learning. Began connecting coursework and certifications with practical implementation and software projects.",
    highlights: [
      "Maintained consistent DSA and LeetCode problem-solving practice",
      "Earned Infosys Springboard certifications in AI and Deep Learning",
      "Experimented with neural networks, computer vision, and applied NLP models",
      "Developed confidence turning algorithmic concepts into functional software",
    ],
    techStack: ["C++", "Python", "TensorFlow", "Deep Learning", "LeetCode"],
    icon: Cpu,
    accentColor: "#a855f7", // Amethyst Purple
    actionLink: {
      label: "VIEW DSA ANALYTICS",
      href: "#leetcode",
    },
  },
  {
    id: "milestone-2026",
    period: "2026",
    domain: "SOFTWARE ENGINEERING & CAREER GROWTH",
    title: "Building Real Projects and Preparing for Industry",
    subtitle: "Full-Stack Architecture, AI Systems & Internship Preparation",
    status: "Active",
    statusColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    narrative:
      "Focused on building more substantial software projects, improving full-stack and AI engineering skills, strengthening my portfolio, and preparing for internship opportunities while continuing my B.Tech.",
    highlights: [
      "Building and improving substantial software and full-stack applications",
      "Developing practical full-stack, backend, and applied AI engineering experience",
      "Continuing consistent DSA practice and technical interview preparation",
      "Refining portfolio, technical communication, and professional presence",
      "Actively pursuing relevant software engineering internship opportunities",
    ],
    techStack: ["Next.js", "TypeScript", "Python", "Full-Stack AI", "FastAPI"],
    icon: Rocket,
    accentColor: "#10b981", // Emerald Green
    actionLink: {
      label: "EXPLORE PROJECTS",
      href: "#projects",
    },
  },
];

// ─── Main Developer Journey Component ───────────────────────────────────────────

export default function JourneyTimeline() {
  const containerRef = useRef<HTMLElement>(null);
  const streamRef = useRef<HTMLDivElement>(null);
  const [activeMilestoneId, setActiveMilestoneId] = useState<string>(JOURNEY_MILESTONES[0].id);
  const prefersReducedMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Continuous scroll-linked progress calculation for central luminous spine
  const { scrollYProgress } = useScroll({
    target: streamRef,
    offset: ["start 65%", "end 50%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001,
  });

  const spineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  // Bidirectional active milestone tracking tied to scroll position
  const updateActiveMilestone = useCallback(() => {
    if (typeof window === "undefined") return;
    const viewportAnchor = window.innerHeight * 0.45;
    let closestId = JOURNEY_MILESTONES[0].id;
    let minDiff = Infinity;

    JOURNEY_MILESTONES.forEach((m) => {
      const el = document.getElementById(m.id);
      if (el) {
        const rect = el.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const diff = Math.abs(cardCenter - viewportAnchor);
        if (diff < minDiff) {
          minDiff = diff;
          closestId = m.id;
        }
      }
    });

    setActiveMilestoneId((prev) => (prev !== closestId ? closestId : prev));
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", updateActiveMilestone, { passive: true });
    updateActiveMilestone();

    return () => {
      window.removeEventListener("scroll", updateActiveMilestone);
    };
  }, [updateActiveMilestone]);

  useMotionValueEvent(scrollYProgress, "change", () => {
    updateActiveMilestone();
  });

  // Quick navigation hop to specific milestone
  const scrollToMilestone = (id: string) => {
    setActiveMilestoneId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "center",
      });
    }
  };

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative w-full py-20 md:py-32 bg-[#030305] border-b border-white/[0.06] overflow-hidden"
      aria-label="Development Journey"
    >
      {/* Anchor alias for #timeline */}
      <div id="timeline" className="absolute -top-20" aria-hidden="true" />

      {/* Background Ambient Radial Lighting */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none opacity-15 blur-[140px] rounded-full transition-colors duration-1000 -z-10"
        style={{
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, rgba(168, 85, 247, 0.15) 50%, transparent 75%)",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <Sparkles size={13} className="text-emerald-400 animate-pulse" />
            <span className="font-mono text-xs text-emerald-300 uppercase tracking-widest font-semibold">
              // 03. JOURNEY &middot; DEVELOPER CHRONOLOGY
            </span>
          </div>

          <h2
            id="experience-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter uppercase"
          >
            How I Got Here.
          </h2>

          <p className="text-sm sm:text-base text-text-secondary font-sans font-light leading-relaxed">
            A connected narrative tracing academic foundations, AI and deep learning exploration,
            and ongoing software engineering growth.
          </p>

          {/* Quick-Hop Navigation Ribbon */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {JOURNEY_MILESTONES.map((m, idx) => {
              const isActive = activeMilestoneId === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => scrollToMilestone(m.id)}
                  className={`px-3.5 py-1.5 rounded-lg font-mono text-[11px] transition-all duration-300 border cursor-pointer ${
                    isActive
                      ? "text-white font-bold shadow-lg"
                      : "text-white/50 hover:text-white/90 border-white/10 bg-white/[0.02]"
                  }`}
                  style={{
                    backgroundColor: isActive ? `${m.accentColor}20` : undefined,
                    borderColor: isActive ? `${m.accentColor}60` : undefined,
                    color: isActive ? "#ffffff" : undefined,
                  }}
                >
                  <span className="opacity-50 mr-1.5">0{idx + 1}.</span>
                  <span>{m.period}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── Timeline Stream ─── */}
        <div ref={streamRef} className="relative">

          {/* Central Connecting Track Spine (Desktop center, Mobile left-6) */}
          <div
            className="absolute top-8 bottom-8 left-6 md:left-1/2 md:-translate-x-1/2 w-[2px] pointer-events-none z-10"
            aria-hidden="true"
          >
            {/* Background static line track */}
            <div className="absolute inset-0 w-full bg-white/[0.08]" />

            {/* Scroll-Illuminated Glowing Spine */}
            <motion.div
              style={{
                height: spineHeight,
              }}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-400 via-purple-500 to-emerald-400 shadow-[0_0_15px_rgba(56,189,248,0.7)]"
            />
          </div>

          {/* Milestone Cards Stream */}
          <div className="space-y-12 md:space-y-20 relative">
            {JOURNEY_MILESTONES.map((milestone, index) => {
              const isEven = index % 2 === 0;
              const Icon = milestone.icon;
              const isActive = activeMilestoneId === milestone.id;

              return (
                <div
                  key={milestone.id}
                  id={milestone.id}
                  onClick={() => setActiveMilestoneId(milestone.id)}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Card Container (Takes 50% width on desktop) */}
                  <div className="w-full pl-14 md:pl-0 md:w-[calc(50%-40px)]">
                    <motion.div
                      initial={
                        isMounted && !prefersReducedMotion
                          ? { opacity: 0, y: 30, x: isEven ? 20 : -20 }
                          : { opacity: 1, y: 0, x: 0 }
                      }
                      whileInView={{ opacity: 1, y: 0, x: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className={`group rounded-2xl border transition-all duration-500 p-6 sm:p-7 relative overflow-hidden backdrop-blur-xl ${
                        isActive
                          ? "border-white/30 bg-[#09090e]/95 shadow-2xl scale-[1.01]"
                          : "border-white/[0.08] hover:border-white/20 bg-[#07070b]/90 hover:bg-[#09090e]/90"
                      }`}
                      style={{
                        boxShadow: isActive
                          ? `0 20px 45px rgba(0,0,0,0.8), 0 0 30px ${milestone.accentColor}18`
                          : undefined,
                      }}
                    >
                      {/* Ambient Accent Radial Glow */}
                      <div
                        className="absolute top-0 right-0 w-64 h-64 pointer-events-none opacity-10 group-hover:opacity-20 transition-opacity duration-500 blur-2xl -z-10"
                        style={{
                          background: `radial-gradient(circle at 80% 20%, ${milestone.accentColor}, transparent 70%)`,
                        }}
                      />

                      {/* Header Strip: Period, Domain & Status */}
                      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-4 mb-4 border-b border-white/[0.06] font-mono text-xs">
                        <div className="flex items-center gap-2">
                          <span
                            className="px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase border"
                            style={{
                              color: milestone.accentColor,
                              backgroundColor: `${milestone.accentColor}15`,
                              borderColor: `${milestone.accentColor}40`,
                            }}
                          >
                            {milestone.period}
                          </span>
                          <span className="text-white/30">&middot;</span>
                          <span className="text-[10px] text-white/50 uppercase tracking-wider font-medium truncate max-w-[150px] sm:max-w-none">
                            {milestone.domain}
                          </span>
                        </div>

                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded tracking-wider uppercase border ${milestone.statusColor}`}
                        >
                          {milestone.status}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <div className="space-y-1 mb-4">
                        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2.5 group-hover:text-emerald-300 transition-colors">
                          <Icon
                            size={18}
                            className="shrink-0 transition-transform group-hover:scale-110"
                            style={{ color: milestone.accentColor }}
                          />
                          <span>{milestone.title}</span>
                        </h3>
                        <p
                          className="font-mono text-xs tracking-wide font-medium"
                          style={{ color: milestone.accentColor }}
                        >
                          {milestone.subtitle}
                        </p>
                      </div>

                      {/* Narrative Paragraph */}
                      <p className="text-xs sm:text-sm text-white/70 font-sans font-light leading-relaxed mb-5">
                        {milestone.narrative}
                      </p>

                      {/* Key Deliverables Checklist */}
                      <div className="space-y-2 mb-5 pt-1">
                        <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block">
                          // VERIFIED HIGHLIGHTS
                        </span>
                        <ul className="space-y-1.5 font-sans">
                          {milestone.highlights.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-xs text-white/85 leading-normal"
                            >
                              <CheckCircle2
                                size={13}
                                className="text-emerald-400 shrink-0 mt-0.5"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Chips & Optional Context Link */}
                      <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3 font-mono text-[10px]">
                        <div className="flex flex-wrap gap-1.5">
                          {milestone.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="text-white/75 bg-white/[0.03] border border-white/10 px-2.5 py-0.5 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {milestone.actionLink && (
                          <a
                            href={milestone.actionLink.href}
                            className="inline-flex items-center gap-1 text-xs font-semibold transition-transform hover:translate-x-1"
                            style={{ color: milestone.accentColor }}
                          >
                            <span>{milestone.actionLink.label}</span>
                            <ChevronRight size={13} />
                          </a>
                        )}
                      </div>

                    </motion.div>
                  </div>

                  {/* Central Node Marker (On Spine) */}
                  <div
                    className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center top-6 md:top-1/2 md:-translate-y-1/2 z-20 cursor-pointer"
                    onClick={() => setActiveMilestoneId(milestone.id)}
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${milestone.title}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveMilestoneId(milestone.id);
                      }
                    }}
                  >
                    <div
                      className={`w-8 h-8 rounded-full border-2 bg-[#050508] flex items-center justify-center transition-all duration-300 shadow-xl ${
                        isActive
                          ? "scale-125 shadow-emerald-500/30"
                          : "hover:scale-110"
                      }`}
                      style={{
                        borderColor: milestone.accentColor,
                        boxShadow: isActive ? `0 0 16px ${milestone.accentColor}60` : undefined,
                      }}
                    >
                      <span
                        className={`w-2.5 h-2.5 rounded-full transition-transform duration-300 ${
                          isActive ? "scale-125" : ""
                        }`}
                        style={{ backgroundColor: milestone.accentColor }}
                      />
                    </div>

                    {/* Concentric Pulse Ring on Active Station */}
                    {isActive && (
                      <span
                        className="absolute inset-0 rounded-full animate-ping opacity-35 pointer-events-none"
                        style={{ backgroundColor: milestone.accentColor }}
                      />
                    )}
                  </div>

                  {/* Opposite Side Empty Spacer (For symmetrical 50/50 balance on desktop) */}
                  <div className="hidden md:block md:w-[calc(50%-40px)]" aria-hidden="true" />
                </div>
              );
            })}
          </div>

        </div>

        {/* Section Footer Route Summary */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-white/40">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>COMPLETED STATIONS</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>ACTIVE FOCUS</span>
            </div>
          </div>

          <div className="text-right">
            <span>HARSHIT SAXENA &middot; VERIFIED DEV CHRONOLOGY</span>
          </div>
        </div>

      </div>
    </section>
  );
}
