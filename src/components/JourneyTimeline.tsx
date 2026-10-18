"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Terminal,
  Cpu,
  Activity,
  Zap,
  ShieldCheck,
  Rocket,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Compass,
  Sparkles,
  ExternalLink,
  ChevronRight,
  LucideIcon,
} from "lucide-react";

// ─── Station Definition & Verified Authentic Milestone Data ───────────────────

export interface TransitStation {
  id: string;
  code: string;
  lineName: string;
  lineColor: string;
  period: string;
  title: string;
  subtitle: string;
  status: "Completed" | "Active" | "Horizon";
  statusColor: string;
  summary: string;
  narrative: string;
  icon: LucideIcon;
  metrics: { label: string; value: string }[];
  highlights: string[];
  techStack: string[];
  actionLink?: {
    label: string;
    href: string;
  };
}

const TRANSIT_STATIONS: TransitStation[] = [
  {
    id: "stn-01",
    code: "STN-01",
    lineName: "FOUNDATIONS & RIGOR",
    lineColor: "#38bdf8", // Sky Cyan
    period: "2024",
    title: "Academic Onboarding & Algorithmic Rigor",
    subtitle: "Amity University MP · B.Tech CSE (CGPA: 8.12)",
    status: "Completed",
    statusColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    summary:
      "Began Computer Science degree, establishing core algorithmic and C++ foundations with 200+ solved problems.",
    narrative:
      "Enrolled in the B.Tech Computer Science and Engineering program at Amity University Madhya Pradesh, maintaining a cumulative 8.12 CGPA. Established disciplined problem-solving rigor through deep study of Data Structures & Algorithms in C++, mastering trees, graphs, heaps, and dynamic programming patterns while building strong fundamentals in memory management and systems thinking.",
    icon: Terminal,
    metrics: [
      { label: "ACADEMIC CGPA", value: "8.12" },
      { label: "LEETCODE SOLVED", value: "200+" },
      { label: "CORE SYSTEMS", value: "C++ / STL" },
    ],
    highlights: [
      "Maintained 8.12 CGPA in Computer Science & Engineering curriculum",
      "Mastered trees, graph traversals, heaps, and dynamic programming patterns",
      "Built daily problem-solving consistency across competitive programming platforms",
    ],
    techStack: ["C++", "Data Structures", "Algorithms", "Git", "Linux"],
    actionLink: {
      label: "VIEW DSA ANALYTICS",
      href: "#leetcode",
    },
  },
  {
    id: "stn-02",
    code: "STN-02",
    lineName: "INTELLIGENCE LINE",
    lineColor: "#a855f7", // Amethyst Purple
    period: "Early 2025",
    title: "Infosys Springboard AI Certifications & Neural Networks",
    subtitle: "Deep Learning & Computer Vision Foundations",
    status: "Completed",
    statusColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    summary:
      "Earned professional certifications in AI & Deep Learning; trained and evaluated Fashion-MNIST CNN.",
    narrative:
      "Earned industry-recognized certifications in Artificial Intelligence and Deep Learning through Infosys Springboard. Applied core theoretical concepts by engineering a multi-layer Convolutional Neural Network (CNN) on the Fashion-MNIST image dataset using TensorFlow and Keras. Developed tensor preprocessing pipelines and optimized hyper-parameters, reaching 86% test accuracy in just 5 epochs.",
    icon: Cpu,
    metrics: [
      { label: "CREDENTIAL", value: "Infosys AI/DL" },
      { label: "MODEL ACCURACY", value: "86% Test" },
      { label: "CONVERGENCE", value: "5 Epochs" },
    ],
    highlights: [
      "Completed verified Infosys Springboard AI and Deep Learning certification programs",
      "Engineered multi-layer CNN with convolutional kernels, max-pooling, and Softmax",
      "Constructed robust tensor normalization pipelines to avoid gradient saturation",
    ],
    techStack: ["Python", "TensorFlow", "Keras", "CNN", "NumPy", "Computer Vision"],
    actionLink: {
      label: "INSPECT CNN CLASSIFIER",
      href: "#projects",
    },
  },
  {
    id: "stn-03",
    code: "STN-03",
    lineName: "DEPLOYMENT LINE",
    lineColor: "#10b981", // Emerald Green
    period: "Mid 2025",
    title: "MindLens: AI Student Wellbeing Analyzer",
    subtitle: "NLP Sentiment Analysis & Live Cloud Deployment",
    status: "Completed",
    statusColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    summary:
      "Developed and launched a deployed AI application analyzing student mental health indicators and burnout.",
    narrative:
      "Architected and deployed MindLens, an AI-powered student mental wellbeing tracking platform published on Streamlit Cloud. Integrated Natural Language Processing (NLP) models to analyze journal reflections and self-reported text, detecting sentiment valence, mood indicators, and potential burnout risks. Designed an interactive dashboard offering students real-time visual insights and proactive wellness suggestions.",
    icon: Activity,
    metrics: [
      { label: "DEPLOYMENT", value: "Streamlit Cloud" },
      { label: "PIPELINE", value: "TensorFlow NLP" },
      { label: "DOMAIN", value: "Student Health" },
    ],
    highlights: [
      "Deployed live cloud web app accessible to student test communities",
      "Implemented real-time sentiment extraction and emotional valence scoring",
      "Built interactive telemetry dashboards for mood tracking and burnout prevention",
    ],
    techStack: ["Python", "TensorFlow", "NLP", "Streamlit", "Pandas", "Matplotlib"],
    actionLink: {
      label: "VIEW MINDLENS CASE STUDY",
      href: "#projects",
    },
  },
  {
    id: "stn-04",
    code: "STN-04",
    lineName: "SYSTEMS LINE",
    lineColor: "#06b6d4", // Cyan
    period: "Late 2025",
    title: "SAHAYAK: Intelligent Task & Query Assistant",
    subtitle: "Automated Workflow Support & Natural Language Parsing",
    status: "Completed",
    statusColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    summary:
      "Created an AI assistant platform providing automated guidance for technical workflows and academic queries.",
    narrative:
      "Engineered SAHAYAK, an automated technical assistance web application designed to eliminate workflow friction for students and developers. Implemented Natural Language Processing algorithms to parse unstructured technical queries, classify user intent, and deliver guided resolution pathways through a responsive web user interface.",
    icon: Zap,
    metrics: [
      { label: "SYSTEM ROLE", value: "Task Guidance" },
      { label: "PARSER", value: "Intent NLP" },
      { label: "INTERFACE", value: "Responsive Web" },
    ],
    highlights: [
      "Created structured query parser handling ambiguous user prompts",
      "Automated step-by-step guidance for technical problem-solving workflows",
      "Engineered modular Python backend with extensible intent classification",
    ],
    techStack: ["Python", "NLP", "AI Workflows", "Web UI", "Information Retrieval"],
    actionLink: {
      label: "VIEW SAHAYAK DETAILS",
      href: "#projects",
    },
  },
  {
    id: "stn-05",
    code: "STN-05",
    lineName: "APPLICATION LINE",
    lineColor: "#f59e0b", // Amber Gold
    period: "2025 — Present",
    title: "MediFlow: High-Availability Healthcare Inventory",
    subtitle: "Critical Emergency Pharmacy Stock Discovery Platform",
    status: "Active",
    statusColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    summary:
      "Developing critical healthcare web app with Emergency Mode for discovering nearby stocked medicines.",
    narrative:
      "Actively engineering MediFlow, a full-stack medicine inventory management platform built to solve urgent stock availability challenges in healthcare. Designed an Emergency Mode module that enables hospital procurement staff and patients to discover nearby pharmacies stocking critical medicines in real time. Designed relational database schemas in PostgreSQL optimized for rapid geolocation and inventory lookups.",
    icon: ShieldCheck,
    metrics: [
      { label: "MODULE", value: "Emergency Mode" },
      { label: "DATABASE", value: "PostgreSQL" },
      { label: "DOMAIN", value: "Healthcare Tech" },
    ],
    highlights: [
      "Designed high-availability medicine inventory and replenishment workflows",
      "Engineered emergency pharmacy matching system for life-critical medicine shortages",
      "Implemented normalized relational database schemas with indexed queries",
    ],
    techStack: ["Python", "PostgreSQL", "Database Schema", "Web APIs", "Healthcare Systems"],
    actionLink: {
      label: "INSPECT MEDIFLOW SPECS",
      href: "#projects",
    },
  },
  {
    id: "stn-06",
    code: "STN-06",
    lineName: "HORIZON TERMINAL",
    lineColor: "#10b981", // Emerald
    period: "Present — 2028",
    title: "HarshitOS & Software Engineering Horizon",
    subtitle: "Next.js 14, Systems Engineering & Industry Readiness",
    status: "Horizon",
    statusColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    summary:
      "Shipped production HarshitOS portfolio; preparing for software engineering and AI/ML internship roles.",
    narrative:
      "Architected and shipped HarshitOS, a dark editorial developer portfolio built with Next.js 14 App Router, TypeScript, and live LeetCode GraphQL data fetching. Balancing academic coursework at Amity University (Class of 2028) with intensive open-source building, systems programming in C++ and Go, and preparing for software engineering internships.",
    icon: Rocket,
    metrics: [
      { label: "FRAMEWORK", value: "Next.js 14" },
      { label: "GRADUATION", value: "Class of 2028" },
      { label: "FOCUS", value: "SWE & AI/ML" },
    ],
    highlights: [
      "Engineered responsive, accessible dark editorial portfolio with zero hydration errors",
      "Integrated live LeetCode GraphQL statistics with contest and submission heatmaps",
      "Actively seeking Software Engineering & Machine Learning internship opportunities",
    ],
    techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "GraphQL", "Go"],
    actionLink: {
      label: "EXPLORE TECH STACK",
      href: "#skills",
    },
  },
];

// ─── Component Implementation ─────────────────────────────────────────────────

export default function JourneyTimeline() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const stationTabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  const activeStation = TRANSIT_STATIONS[selectedIndex];
  const Icon = activeStation.icon;

  const handlePrevStation = useCallback(() => {
    setSelectedIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNextStation = useCallback(() => {
    setSelectedIndex((prev) => Math.min(TRANSIT_STATIONS.length - 1, prev + 1));
  }, []);

  // Keyboard navigation across stations (ArrowLeft, ArrowRight, Home, End)
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextIdx = (index + 1) % TRANSIT_STATIONS.length;
      setSelectedIndex(nextIdx);
      stationTabsRef.current[nextIdx]?.focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIdx = (index - 1 + TRANSIT_STATIONS.length) % TRANSIT_STATIONS.length;
      setSelectedIndex(prevIdx);
      stationTabsRef.current[prevIdx]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      setSelectedIndex(0);
      stationTabsRef.current[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      setSelectedIndex(TRANSIT_STATIONS.length - 1);
      stationTabsRef.current[TRANSIT_STATIONS.length - 1]?.focus();
    }
  };

  // Restrained transition variants respecting reduced-motion
  const transitionVariants = {
    initial: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 12,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.05 : 0.28,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : -8,
      transition: {
        duration: prefersReducedMotion ? 0.05 : 0.18,
      },
    },
  };

  return (
    <section
      id="experience"
      className="relative w-full pt-20 pb-24 md:pt-32 md:pb-36 bg-[#030305] border-b border-white/[0.06] overflow-hidden"
    >
      {/* Background Ambient Radial Accents */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] pointer-events-none opacity-20 blur-[120px] transition-colors duration-700 -z-10"
        style={{
          background: `radial-gradient(circle, ${activeStation.lineColor} 0%, transparent 70%)`,
        }}
      />

      <div className="max-w-[1140px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-14 sm:mb-16 space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-emerald-400/90 tracking-widest uppercase">
              // 03. JOURNEY &middot; CONNECTED MILESTONES
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2
                id="experience-heading"
                className="text-3xl sm:text-5xl font-black text-white tracking-tighter uppercase"
              >
                Development Journey.
              </h2>
              <p className="text-sm sm:text-base text-text-secondary font-sans font-light mt-2 max-w-2xl leading-relaxed">
                A station-by-station progression through academic foundations, applied AI systems,
                and production software engineering. Select any station to view its technical dossier.
              </p>
            </div>

            {/* Stepper Navigation Buttons */}
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-white/40 mr-2 text-[11px]">
                {String(selectedIndex + 1).padStart(2, "0")} /{" "}
                {String(TRANSIT_STATIONS.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={handlePrevStation}
                disabled={selectedIndex === 0}
                aria-label="Previous milestone station"
                className="p-2.5 rounded-lg border border-white/10 bg-white/[0.03] text-white/70 hover:text-white hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ArrowLeft size={14} />
              </button>
              <button
                type="button"
                onClick={handleNextStation}
                disabled={selectedIndex === TRANSIT_STATIONS.length - 1}
                aria-label="Next milestone station"
                className="p-2.5 rounded-lg border border-white/10 bg-white/[0.03] text-white/70 hover:text-white hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* ─── DESKTOP SCHEMATIC TRANSIT ROUTE (Horizontal on lg screens) ─── */}
        <div className="hidden lg:block mb-12">
          <div
            role="tablist"
            aria-label="Developer Journey Stations"
            className="relative pt-6 pb-4"
          >
            {/* The SVG Route Rail Line */}
            <div className="absolute top-[38px] left-[40px] right-[40px] h-[3px] bg-white/[0.08] rounded-full z-0 pointer-events-none">
              {/* Dynamic Illuminated Progress Track */}
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${(selectedIndex / (TRANSIT_STATIONS.length - 1)) * 100}%`,
                  background: `linear-gradient(90deg, #38bdf8 0%, ${activeStation.lineColor} 100%)`,
                  boxShadow: `0 0 12px ${activeStation.lineColor}60`,
                }}
              />
            </div>

            {/* 6 Stations Placed Along the Route */}
            <div className="relative z-10 grid grid-cols-6 gap-3">
              {TRANSIT_STATIONS.map((station, index) => {
                const isSelected = selectedIndex === index;
                const isPassed = index <= selectedIndex;

                return (
                  <button
                    key={station.id}
                    ref={(el) => {
                      stationTabsRef.current[index] = el;
                    }}
                    role="tab"
                    id={`station-tab-${station.id}`}
                    aria-selected={isSelected}
                    aria-controls={`station-panel-${station.id}`}
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => setSelectedIndex(index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="flex flex-col items-center text-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-xl p-2 transition-all cursor-pointer"
                  >
                    {/* Station Node Indicator Dot */}
                    <div className="relative mb-3 flex items-center justify-center">
                      <div
                        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          isSelected
                            ? "scale-110 shadow-lg"
                            : isPassed
                            ? "bg-[#09090e] border-white/40 hover:border-white/80"
                            : "bg-[#050508] border-white/20 hover:border-white/50"
                        }`}
                        style={{
                          borderColor: isSelected ? station.lineColor : undefined,
                          backgroundColor: isSelected ? "#09090d" : undefined,
                          boxShadow: isSelected ? `0 0 16px ${station.lineColor}80` : undefined,
                        }}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                          style={{
                            backgroundColor: isSelected
                              ? station.lineColor
                              : isPassed
                              ? "#ffffff"
                              : "rgba(255,255,255,0.3)",
                          }}
                        />
                      </div>

                      {/* Concentric Ping on Active Station */}
                      {isSelected && (
                        <span
                          className="absolute inset-0 rounded-full animate-ping opacity-40 pointer-events-none"
                          style={{ backgroundColor: station.lineColor }}
                        />
                      )}
                    </div>

                    {/* Period & Code Badge */}
                    <div className="space-y-1">
                      <span
                        className="font-mono text-[10px] font-bold tracking-wider block transition-colors"
                        style={{
                          color: isSelected ? station.lineColor : "rgba(255,255,255,0.4)",
                        }}
                      >
                        {station.period}
                      </span>
                      <span
                        className={`font-sans text-xs font-semibold block transition-colors leading-tight ${
                          isSelected ? "text-white" : "text-white/60 group-hover:text-white/90"
                        }`}
                      >
                        {station.code}
                      </span>
                      <span
                        className="font-mono text-[9px] text-white/40 block truncate max-w-[130px]"
                        title={station.title}
                      >
                        {station.lineName}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─── MOBILE & TABLET ROUTE SWITCHER (Horizontal Pill Ribbon on < lg screens) ─── */}
        <div className="block lg:hidden mb-8">
          <div
            role="tablist"
            aria-label="Developer Journey Stations"
            className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none no-scrollbar"
          >
            {TRANSIT_STATIONS.map((station, index) => {
              const isSelected = selectedIndex === index;

              return (
                <button
                  key={station.id}
                  role="tab"
                  id={`mobile-tab-${station.id}`}
                  aria-selected={isSelected}
                  aria-controls={`station-panel-${station.id}`}
                  onClick={() => setSelectedIndex(index)}
                  className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl font-mono text-xs border transition-all ${
                    isSelected
                      ? "border-emerald-500/50 bg-emerald-500/10 text-white shadow-lg"
                      : "border-white/10 bg-white/[0.02] text-white/60 hover:text-white hover:border-white/20"
                  }`}
                  style={{
                    borderColor: isSelected ? station.lineColor : undefined,
                    backgroundColor: isSelected ? `${station.lineColor}15` : undefined,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{
                      backgroundColor: isSelected ? station.lineColor : "rgba(255,255,255,0.3)",
                    }}
                  />
                  <span className="font-bold">{station.period}</span>
                  <span className="text-[10px] text-white/40">·</span>
                  <span className="text-[10px] text-white/70">{station.code}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── ACTIVE STATION TECHNICAL DOSSIER CARD ─── */}
        <div className="relative">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeStation.id}
              role="tabpanel"
              id={`station-panel-${activeStation.id}`}
              aria-labelledby={`station-tab-${activeStation.id}`}
              variants={transitionVariants}
              initial={false}
              animate="animate"
              exit="exit"
              suppressHydrationWarning
              className="rounded-2xl border border-white/10 bg-[#08080d]/95 p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden"
            >
              {/* Subtle Ambient Spotlight inside Dossier */}
              <div
                className="absolute top-0 right-0 w-[450px] h-[300px] pointer-events-none opacity-10 blur-3xl -z-10"
                style={{
                  background: `radial-gradient(circle at 80% 20%, ${activeStation.lineColor}, transparent 75%)`,
                }}
              />

              {/* Dossier Header: Transit Line & Metadata */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-5 mb-6 font-mono text-xs">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{
                      backgroundColor: activeStation.lineColor,
                      boxShadow: `0 0 10px ${activeStation.lineColor}80`,
                    }}
                  />
                  <span className="font-extrabold text-white tracking-wider">
                    {activeStation.code} // {activeStation.lineName}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="text-white/40">{activeStation.period}</span>
                  <span className="text-white/20">&middot;</span>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded tracking-wider uppercase border ${activeStation.statusColor}`}
                  >
                    STATUS: {activeStation.status.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Main Station Title & Subtitle */}
              <div className="space-y-2 mb-6">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight flex items-center gap-3">
                  <Icon
                    size={24}
                    className="shrink-0"
                    style={{ color: activeStation.lineColor }}
                  />
                  <span>{activeStation.title}</span>
                </h3>
                <p
                  className="font-mono text-xs sm:text-sm tracking-wide font-medium"
                  style={{ color: activeStation.lineColor }}
                >
                  {activeStation.subtitle}
                </p>
              </div>

              {/* Verified Metrics Strip (3 Punchy Indicators) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                {activeStation.metrics.map((metric, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl border border-white/[0.06] bg-black/40 backdrop-blur-sm space-y-1"
                  >
                    <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest block">
                      {metric.label}
                    </span>
                    <span className="font-mono text-lg sm:text-xl font-bold text-white tracking-tight block">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Verified Narrative Section */}
              <div className="space-y-4 mb-8">
                <p className="text-sm sm:text-base text-white/80 leading-relaxed font-sans font-normal">
                  {activeStation.narrative}
                </p>
              </div>

              {/* Key Technical Highlights Checklist */}
              <div className="space-y-3 mb-8">
                <span className="font-mono text-xs text-white/40 uppercase tracking-widest block">
                  // VERIFIED MILESTONE DELIVERABLES
                </span>
                <ul className="space-y-2.5 font-sans">
                  {activeStation.highlights.map((highlight, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-white/90"
                    >
                      <CheckCircle2
                        size={15}
                        className="text-emerald-400 shrink-0 mt-0.5"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Stack Badges & Action Link */}
              <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                  <span className="text-white/40 mr-1 text-[10px] uppercase tracking-wider">
                    STACK:
                  </span>
                  {activeStation.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-white/80 bg-white/[0.03] border border-white/10 px-2.5 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Contextual Deep Link Button */}
                {activeStation.actionLink && (
                  <a
                    href={activeStation.actionLink.href}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-mono font-semibold text-white transition-all duration-300 border shadow-md hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      backgroundColor: `${activeStation.lineColor}18`,
                      borderColor: `${activeStation.lineColor}45`,
                      color: "#ffffff",
                    }}
                  >
                    <span>{activeStation.actionLink.label}</span>
                    <ChevronRight size={14} style={{ color: activeStation.lineColor }} />
                  </a>
                )}
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Section Bottom Route Legend & Status */}
        <div className="mt-8 pt-4 border-t border-white/[0.04] flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-white/40">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>COMPLETED MILESTONE</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>ACTIVE DEVELOPMENT</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>HORIZON TARGET</span>
            </div>
          </div>

          <div className="text-right">
            <span>HARSHIT SAXENA &middot; DEVELOPER ROUTE CIRCUIT</span>
          </div>
        </div>

      </div>
    </section>
  );
}
