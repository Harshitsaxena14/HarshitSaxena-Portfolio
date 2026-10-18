"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import {
  Terminal,
  Cpu,
  Activity,
  Zap,
  ShieldCheck,
  Rocket,
  CheckCircle2,
  Calendar,
  Sparkles,
  ChevronRight,
  ExternalLink,
  LucideIcon,
} from "lucide-react";

// â”€â”€â”€ Milestone Data Model â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export interface JourneyMilestone {
  id: string;
  period: string;
  domain: string;
  title: string;
  subtitle: string;
  status: "Completed" | "Active" | "Horizon";
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
    domain: "FOUNDATIONS & ALGORITHMIC RIGOR",
    title: "Academic Onboarding & Algorithmic Foundations",
    subtitle: "Amity University Madhya Pradesh Â· B.Tech CSE (CGPA: 8.12)",
    status: "Completed",
    statusColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    narrative:
      "Began Computer Science degree, establishing core algorithmic and C++ foundations with dedicated competitive programming. Mastered trees, graphs, heaps, dynamic programming patterns, and memory management with 200+ LeetCode problems solved.",
    highlights: [
      "Maintained 8.12 CGPA in Computer Science & Engineering curriculum",
      "Solved 200+ LeetCode problems establishing continuous problem-solving consistency",
      "Mastered tree traversals, graph algorithms, and dynamic programming in C++",
    ],
    techStack: ["C++", "Data Structures", "Algorithms", "Git", "Linux"],
    icon: Terminal,
    accentColor: "#38bdf8", // Sky Cyan
    actionLink: {
      label: "VIEW DSA ANALYTICS",
      href: "#leetcode",
    },
  },
  {
    id: "milestone-early-2025",
    period: "Early 2025",
    domain: "INTELLIGENCE & COMPUTER VISION",
    title: "Infosys Springboard AI Certifications & Neural Networks",
    subtitle: "Deep Learning & Computer Vision Foundations",
    status: "Completed",
    statusColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    narrative:
      "Earned professional certifications in AI & Deep Learning via Infosys Springboard. Applied core theoretical concepts by engineering a multi-layer Convolutional Neural Network (CNN) on Fashion-MNIST with TensorFlow/Keras, achieving 86% test accuracy in 5 epochs.",
    highlights: [
      "Completed verified Infosys Springboard AI & Deep Learning certifications",
      "Engineered multi-layer CNN with convolutional kernels, max-pooling, and Softmax",
      "Constructed robust tensor normalization pipelines to avoid gradient saturation",
    ],
    techStack: ["Python", "TensorFlow", "Keras", "CNN", "NumPy"],
    icon: Cpu,
    accentColor: "#a855f7", // Amethyst Purple
    actionLink: {
      label: "INSPECT CNN CLASSIFIER",
      href: "#projects",
    },
  },
  {
    id: "milestone-mid-2025",
    period: "Mid 2025",
    domain: "APPLIED AI & DEPLOYED SYSTEMS",
    title: "MindLens: AI Student Wellbeing Analyzer",
    subtitle: "NLP Sentiment Analysis & Live Cloud Deployment",
    status: "Completed",
    statusColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    narrative:
      "Architected and deployed MindLens, an AI-powered student mental wellbeing platform published on Streamlit Cloud. Integrated NLP models to analyze journal reflections and detect sentiment valence, mood indicators, and potential burnout risks.",
    highlights: [
      "Deployed live cloud web app accessible to student test communities",
      "Implemented real-time sentiment extraction and emotional valence scoring",
      "Built interactive telemetry dashboards for mood tracking and burnout prevention",
    ],
    techStack: ["Python", "TensorFlow", "NLP", "Streamlit", "Pandas"],
    icon: Activity,
    accentColor: "#10b981", // Emerald Green
    actionLink: {
      label: "VIEW MINDLENS CASE STUDY",
      href: "#projects",
    },
  },
  {
    id: "milestone-late-2025",
    period: "Late 2025",
    domain: "INTELLIGENT WORKFLOWS & NLP",
    title: "SAHAYAK: Intelligent Task & Query Assistant",
    subtitle: "Automated Workflow Support & Natural Language Parsing",
    status: "Completed",
    statusColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    narrative:
      "Engineered SAHAYAK, an automated technical assistance web application designed to eliminate workflow friction for students and developers. Implemented Natural Language Processing algorithms to parse unstructured technical queries and deliver guided resolution pathways.",
    highlights: [
      "Created structured query parser handling ambiguous user prompts",
      "Automated step-by-step guidance for technical problem-solving workflows",
      "Engineered modular Python backend with extensible intent classification",
    ],
    techStack: ["Python", "NLP", "AI Workflows", "Web UI", "Information Retrieval"],
    icon: Zap,
    accentColor: "#06b6d4", // Cyan
    actionLink: {
      label: "VIEW SAHAYAK DETAILS",
      href: "#projects",
    },
  },
  {
    id: "milestone-2025-present",
    period: "2025 â€” Present",
    domain: "HEALTHCARE TECH & EMERGENCY SYSTEMS",
    title: "MediFlow: High-Availability Healthcare Inventory",
    subtitle: "Critical Emergency Pharmacy Stock Discovery Platform",
    status: "Active",
    statusColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    narrative:
      "Actively engineering MediFlow, a full-stack medicine inventory platform built to solve urgent stock availability in healthcare. Designed an Emergency Mode module that enables hospital procurement staff and patients to discover nearby pharmacies stocking critical medicines in real time.",
    highlights: [
      "Designed high-availability medicine inventory and replenishment workflows",
      "Engineered emergency pharmacy matching system for life-critical medicine shortages",
      "Implemented normalized PostgreSQL schemas optimized for rapid geolocation queries",
    ],
    techStack: ["Python", "PostgreSQL", "Database Schema", "Web APIs", "Healthcare Systems"],
    icon: ShieldCheck,
    accentColor: "#f59e0b", // Amber Gold
    actionLink: {
      label: "INSPECT MEDIFLOW SPECS",
      href: "#projects",
    },
  },
  {
    id: "milestone-horizon-2028",
    period: "Present â€” 2028",
    domain: "SYSTEMS CRAFT & HORIZON TERMINAL",
    title: "HarshitOS & Software Engineering Horizon",
    subtitle: "Next.js 14, Systems Engineering & Industry Readiness",
    status: "Horizon",
    statusColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    narrative:
      "Architected and shipped HarshitOS, a dark editorial developer portfolio built with Next.js 14 App Router, TypeScript, and live LeetCode GraphQL data fetching. Balancing academic coursework at Amity University (Class of 2028) with intensive open-source building, systems programming in C++ and Go, and preparing for software engineering internships.",
    highlights: [
      "Engineered responsive, accessible dark editorial portfolio with zero hydration errors",
      "Integrated live LeetCode GraphQL statistics with contest and submission heatmaps",
      "Actively seeking Software Engineering & Machine Learning internship opportunities",
    ],
    techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "GraphQL", "Go"],
    icon: Rocket,
    accentColor: "#10b981", // Emerald
    actionLink: {
      label: "EXPLORE TECH STACK",
      href: "#skills",
    },
  },
];

// â”€â”€â”€ Main Dribbble-Inspired Developer Journey Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export default function JourneyTimeline() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeMilestoneId, setActiveMilestoneId] = useState<string>(JOURNEY_MILESTONES[0].id);
  const prefersReducedMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Smooth scroll progression calculation for central luminous spine
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 30%", "end 80%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  });

  const spineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

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
            A connected narrative tracing foundational algorithmic rigor, deep learning certifications,
            applied AI deployments, and scalable software systems craft.
          </p>

          {/* Quick-Hop Navigation Ribbon */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {JOURNEY_MILESTONES.map((m, idx) => {
              const isActive = activeMilestoneId === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => scrollToMilestone(m.id)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-[11px] transition-all duration-300 border cursor-pointer ${
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

        {/* â”€â”€â”€ Dribbble Material Timeline Stream â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="relative">

          {/* Central Connecting Track Line (Desktop center, Mobile left-6) */}
          <div
            className="absolute top-8 bottom-8 left-6 md:left-1/2 md:-translate-x-1/2 w-[2px] bg-white/[0.08] pointer-events-none"
            aria-hidden="true"
          />

          {/* Scroll-Illuminated Glowing Spine */}
          <motion.div
            style={{ height: isMounted && !prefersReducedMotion ? spineHeight : "100%" }}
            className="absolute top-8 left-6 md:left-1/2 md:-translate-x-1/2 w-[2px] bg-gradient-to-b from-cyan-400 via-purple-500 to-emerald-400 origin-top pointer-events-none shadow-[0_0_15px_rgba(56,189,248,0.7)]"
            aria-hidden="true"
          />

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
                          // VERIFIED DELIVERABLES
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
                        boxShadow: `0 0 16px ${milestone.accentColor}60`,
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
              <span>ACTIVE SYSTEM</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>HORIZON TARGET</span>
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
