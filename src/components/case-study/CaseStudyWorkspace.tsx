"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Github,
  ExternalLink,
  Share2,
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  Terminal,
  Layers,
  Cpu,
  CheckCircle2,
  Sparkles,
  ShieldAlert,
  ListChecks,
  Milestone,
  UserCheck,
  Workflow,
  Code2,
  Database,
  ArrowUpRight,
  Radio,
  FileCode,
  AlertCircle,
  Server
} from "lucide-react";
import { Project } from "@/types/caseStudy";
import CaseStudyArchitectureDiagram from "./CaseStudyArchitectureDiagram";

interface CaseStudyWorkspaceProps {
  project: Project | null;
  projects: Project[];
  onClose: () => void;
  onSelectProject: (p: Project) => void;
}

type TabKey = "overview" | "architecture" | "contributions" | "challenges";

interface TabItem {
  key: TabKey;
  number: string;
  label: string;
  icon: typeof Workflow;
}

const TABS: TabItem[] = [
  { key: "overview", number: "01", label: "Overview & Workflow", icon: Workflow },
  { key: "architecture", number: "02", label: "Architecture & Tech Stack", icon: Layers },
  { key: "contributions", number: "03", label: "Contributions & Features", icon: ListChecks },
  { key: "challenges", number: "04", label: "Challenges & Roadmap", icon: Milestone },
];

export default function CaseStudyWorkspace({
  project,
  projects,
  onClose,
  onSelectProject,
}: CaseStudyWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const workspaceRef = useRef<HTMLDivElement>(null);
  const contentScrollRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset tab to "overview" whenever project changes
  useEffect(() => {
    setActiveTab("overview");
    if (contentScrollRef.current) {
      contentScrollRef.current.scrollTop = 0;
    }
  }, [project?.id]);

  // Lock background scroll and pause Lenis smoothly
  useEffect(() => {
    if (!project) return;

    // Pause Lenis smooth scroll
    const win = window as unknown as { __lenis?: { stop: () => void; start: () => void } };
    win.__lenis?.stop();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      win.__lenis?.start();
    };
  }, [project]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Keyboard navigation between tabs (ArrowLeft / ArrowRight)
  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextTab = TABS[(index + 1) % TABS.length].key;
      setActiveTab(nextTab);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevTab = TABS[(index - 1 + TABS.length) % TABS.length].key;
      setActiveTab(prevTab);
    }
  };

  // Share action with native share & clipboard fallback
  const handleShare = useCallback(async () => {
    if (!project) return;
    const shareData = {
      title: `${project.title} — Technical Case Study | Harshit Saxena`,
      text: project.caseStudy.summary,
      url: typeof window !== "undefined" ? window.location.href : "",
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Fallback to clipboard if cancelled or unsupported
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        const textToCopy = `${project.title} — Technical Case Study by Harshit Saxena\n${project.caseStudy.summary}\n${project.githubUrl || window.location.href}`;
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (err) {
        console.error("Clipboard write failed", err);
      }
    }
  }, [project]);

  if (!mounted || !project) return null;

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const total = projects.length;

  const handleNextProject = () => {
    const nextIndex = (currentIndex + 1) % total;
    onSelectProject(projects[nextIndex]);
  };

  const handlePrevProject = () => {
    const prevIndex = (currentIndex - 1 + total) % total;
    onSelectProject(projects[prevIndex]);
  };

  const cs = project.caseStudy;
  const accentColor = `hsl(${project.accentHue}, 80%, 55%)`;

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="case-study-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden select-text"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
      >
        {/* Main Workspace Frame */}
        <motion.div
          ref={workspaceRef}
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-[1400px] h-[96vh] md:h-[94vh] bg-[#07070a] border border-white/[0.12] rounded-2xl flex flex-col shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden relative"
        >
          {/* Subtle Ambient Radial Glow */}
          <div
            className="absolute top-0 right-0 w-[500px] h-[300px] pointer-events-none opacity-15 blur-3xl -z-10"
            style={{
              background: `radial-gradient(circle at 80% 20%, ${accentColor}, transparent 70%)`,
            }}
          />

          {/* ─── WORKSPACE HEADER ──────────────────────────────────────────────── */}
          <header className="border-b border-white/[0.08] bg-[#09090e]/95 backdrop-blur-md px-5 sm:px-8 py-4 shrink-0 space-y-4">
            {/* Top Control Bar: Identifier, Category, Badges, and Action Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-mono text-xs text-white/50 tracking-wider flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: accentColor }}
                  />
                  0{currentIndex + 1} // CASE STUDY
                </span>

                <span className="text-white/20">&bull;</span>

                <span className="font-mono text-[11px] text-emerald-400 font-medium uppercase tracking-wider">
                  {cs.category}
                </span>

                {cs.badge && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-purple-500/15 border border-purple-500/35 text-purple-300">
                    <Sparkles size={10} className="text-purple-300" />
                    <span>{cs.badge}</span>
                  </span>
                )}
              </div>

              {/* Action Buttons: Share, Source Code, Live Demo, and Close */}
              <div className="flex items-center gap-2 sm:gap-2.5 ml-auto">
                {/* Share Button */}
                <button
                  type="button"
                  onClick={handleShare}
                  aria-label="Share case study"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border border-white/10 bg-white/[0.03] text-white/70 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check size={13} className="text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">LINK COPIED</span>
                    </>
                  ) : (
                    <>
                      <Share2 size={13} />
                      <span className="hidden sm:inline">SHARE</span>
                    </>
                  )}
                </button>

                {/* Verified GitHub Repository */}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border border-white/10 bg-white/[0.03] text-white/70 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer"
                  >
                    <Github size={13} />
                    <span className="hidden sm:inline">SOURCE REPO</span>
                    <ArrowUpRight size={11} className="text-white/40" />
                  </a>
                )}

                {/* Verified Live Demo if available */}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 hover:bg-emerald-900/40 transition-all cursor-pointer"
                  >
                    <ExternalLink size={13} />
                    <span>LIVE DEMO</span>
                  </a>
                )}

                {/* Prominent Close Button */}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close case study workspace"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono text-white/60 hover:text-white border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                >
                  <X size={15} />
                  <span className="hidden md:inline text-[11px] text-white/40 font-mono">ESC</span>
                </button>
              </div>
            </div>

            {/* Title and High-Level Executive Summary */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pt-1">
              <div className="space-y-1 max-w-3xl">
                <h1
                  id="case-study-title"
                  className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight"
                >
                  {project.title}
                </h1>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans font-light">
                  {cs.summary}
                </p>
              </div>

              {/* Verified Telemetry Strip for CodeMent / Sahayak */}
              {project.verifiedModules && (
                <div className="flex flex-wrap gap-2 shrink-0 pt-1 md:pt-0">
                  {project.verifiedModules.map((m, idx) => (
                    <div
                      key={idx}
                      className="px-2.5 py-1 rounded-md border border-white/[0.08] bg-black/40 font-mono text-[10px]"
                    >
                      <span className="text-white/40 block text-[9px] uppercase tracking-wider">
                        {m.label}
                      </span>
                      <span className="text-emerald-300 font-semibold">{m.detail}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </header>

          {/* ─── FOUR-TAB NAVIGATION BAR ─────────────────────────────────────── */}
          <nav
            role="tablist"
            aria-label="Case Study Sections"
            className="border-b border-white/[0.08] bg-[#07070b] px-4 sm:px-8 flex items-center gap-1 overflow-x-auto scrollbar-none shrink-0"
          >
            {TABS.map((tab, idx) => {
              const isActive = activeTab === tab.key;
              const Icon = tab.icon;

              return (
                <button
                  key={tab.key}
                  role="tab"
                  id={`tab-${tab.key}`}
                  aria-selected={isActive}
                  aria-controls={`tabpanel-${tab.key}`}
                  tabIndex={isActive ? 0 : -1}
                  onKeyDown={(e) => handleTabKeyDown(e, idx)}
                  onClick={() => setActiveTab(tab.key)}
                  className={`group relative flex items-center gap-2 py-3.5 px-4 font-mono text-xs tracking-wider transition-all cursor-pointer whitespace-nowrap outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 rounded-t-lg ${
                    isActive
                      ? "text-emerald-400 font-bold bg-white/[0.03]"
                      : "text-white/50 hover:text-white/90 hover:bg-white/[0.015]"
                  }`}
                >
                  <span
                    className={`text-[10px] px-1 rounded ${
                      isActive ? "bg-emerald-500/20 text-emerald-300" : "text-white/30"
                    }`}
                  >
                    {tab.number}
                  </span>
                  <Icon size={13} className={isActive ? "text-emerald-400" : "text-white/40"} />
                  <span>{tab.label}</span>

                  {/* Active Underline Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="active-tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.8)]"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* ─── DEDICATED SCROLLABLE CONTENT REGION ─────────────────────────── */}
          <main
            ref={contentScrollRef}
            id={`tabpanel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            tabIndex={0}
            className="flex-1 overflow-y-auto px-5 sm:px-8 py-6 space-y-8 focus:outline-none"
          >
            {/* ─── TAB 1: OVERVIEW & WORKFLOW ─────────────────────────────────── */}
            {activeTab === "overview" && (
              <div className="space-y-8 animate-fadeIn">
                {/* 1. The Engineering Problem Block */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                    <Terminal size={14} />
                    <span>01 // THE ENGINEERING PROBLEM</span>
                  </div>
                  <div className="p-6 rounded-xl border border-white/[0.08] bg-[#0b0b10] space-y-4">
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {cs.problemStatement.headline}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed font-sans">
                      {cs.problemStatement.context}
                    </p>

                    {/* Core Frictions Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      {cs.problemStatement.coreFrictions.map((fric, i) => (
                        <div
                          key={i}
                          className="p-3.5 rounded-lg border border-red-500/15 bg-red-950/10 flex items-start gap-2.5 text-xs text-text-secondary"
                        >
                          <AlertCircle size={14} className="text-red-400 shrink-0 mt-0.5" />
                          <span>{fric}</span>
                        </div>
                      ))}
                    </div>

                    {cs.problemStatement.technicalConstraints && (
                      <div className="p-3 rounded-lg border border-amber-500/20 bg-amber-950/15 text-xs text-amber-200/90 font-mono">
                        <span className="font-bold text-amber-300 uppercase tracking-wider block mb-1">
                          TECHNICAL CONSTRAINTS:
                        </span>
                        <span>{cs.problemStatement.technicalConstraints}</span>
                      </div>
                    )}
                  </div>
                </section>

                {/* 2. Target Audience & Context */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-semibold uppercase tracking-wider">
                    <UserCheck size={14} />
                    <span>02 // TARGET AUDIENCE &amp; CONTEXT</span>
                  </div>
                  <div className="p-5 rounded-xl border border-white/[0.08] bg-[#0b0b10] flex items-start gap-3">
                    <Radio size={16} className="text-blue-400 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">Primary Intended Users</h4>
                      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans">
                        {cs.targetAudience}
                      </p>
                    </div>
                  </div>
                </section>

                {/* 3. Proposed Solution */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-semibold uppercase tracking-wider">
                    <Sparkles size={14} />
                    <span>03 // PROPOSED SOLUTION</span>
                  </div>
                  <div className="p-6 rounded-xl border border-white/[0.08] bg-[#0b0b10] space-y-4">
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {cs.solution.headline}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed font-sans">
                      {cs.solution.summary}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      {cs.solution.components.map((comp, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] space-y-1.5"
                        >
                          <div className="flex items-center gap-2 text-xs font-bold text-white font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                            {comp.title}
                          </div>
                          <p className="text-xs text-text-secondary leading-relaxed font-sans">
                            {comp.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* 4. Interactive Step-by-Step Workflow */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                    <Workflow size={14} />
                    <span>04 // SYSTEM WORKFLOW SEQUENCE</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {cs.workflow.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-xl border border-white/[0.08] bg-[#0b0b10] space-y-2 relative flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between font-mono text-xs mb-2">
                            <span className="text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/30">
                              STEP {step.stepNumber}
                            </span>
                            <span className="text-[10px] text-white/40 uppercase">
                              {step.actor}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-white mb-1.5">{step.title}</h4>
                          <p className="text-xs text-text-secondary leading-relaxed font-sans">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 5. Key Highlights Grid */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold uppercase tracking-wider">
                    <CheckCircle2 size={14} />
                    <span>05 // VERIFIED CAPABILITIES &amp; HIGHLIGHTS</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {cs.keyHighlights.map((hl, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-xl border border-white/[0.06] bg-black/40 flex items-start gap-2.5 text-xs text-text-secondary"
                      >
                        <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* ─── TAB 2: ARCHITECTURE & TECH STACK ─────────────────────────── */}
            {activeTab === "architecture" && (
              <div className="space-y-8 animate-fadeIn">
                {/* 1. Visual System Architecture Diagram */}
                <section>
                  <CaseStudyArchitectureDiagram
                    architecture={cs.architecture}
                    projectTitle={project.title}
                  />
                </section>

                {/* 2. Subsystem Deep-Dive */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Frontend Architecture */}
                  <div className="p-6 rounded-xl border border-white/[0.08] bg-[#0b0b10] space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                      <span className="flex items-center gap-2 font-bold uppercase tracking-wider">
                        <Layers size={14} />
                        FRONTEND ARCHITECTURE
                      </span>
                      <span className="text-[10px] text-white/40">{cs.architecture.frontend.framework}</span>
                    </div>
                    <ul className="space-y-2 text-xs text-text-secondary font-sans">
                      {cs.architecture.frontend.details.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-400 mt-0.5 font-mono">&rsaquo;</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Backend Architecture */}
                  <div className="p-6 rounded-xl border border-white/[0.08] bg-[#0b0b10] space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                      <span className="flex items-center gap-2 font-bold uppercase tracking-wider">
                        <Server size={14} />
                        BACKEND ARCHITECTURE
                      </span>
                      <span className="text-[10px] text-white/40">{cs.architecture.backend.runtime}</span>
                    </div>
                    <ul className="space-y-2 text-xs text-text-secondary font-sans">
                      {cs.architecture.backend.details.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-cyan-400 mt-0.5 font-mono">&rsaquo;</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Data Layer */}
                  <div className="p-6 rounded-xl border border-white/[0.08] bg-[#0b0b10] space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-purple-400">
                      <span className="flex items-center gap-2 font-bold uppercase tracking-wider">
                        <Database size={14} />
                        DATA LAYER &amp; PERSISTENCE
                      </span>
                      <span className="text-[10px] text-white/40">{cs.architecture.dataLayer.storage}</span>
                    </div>
                    <ul className="space-y-2 text-xs text-text-secondary font-sans">
                      {cs.architecture.dataLayer.details.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-purple-400 mt-0.5 font-mono">&rsaquo;</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* AI & External Integrations */}
                  <div className="p-6 rounded-xl border border-white/[0.08] bg-[#0b0b10] space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-amber-400">
                      <span className="flex items-center gap-2 font-bold uppercase tracking-wider">
                        <Cpu size={14} />
                        AI &amp; EXTERNAL INTEGRATIONS
                      </span>
                      <span className="text-[10px] text-white/40">CONFIGURED SERVICES</span>
                    </div>
                    <div className="space-y-3">
                      {cs.architecture.integrations.map((integ, idx) => (
                        <div key={idx} className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.015] space-y-1">
                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="font-bold text-white">{integ.name}</span>
                            <span className="text-[10px] text-amber-300/80">{integ.purpose}</span>
                          </div>
                          <p className="text-xs text-text-secondary font-sans leading-relaxed">
                            {integ.details}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* 3. Verified API Endpoints (when applicable) */}
                {cs.architecture.backend.endpoints && cs.architecture.backend.endpoints.length > 0 && (
                  <section className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-white/60 font-semibold uppercase tracking-wider">
                      <Code2 size={14} className="text-emerald-400" />
                      <span>VERIFIED REST ENDPOINTS</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {cs.architecture.backend.endpoints.map((ep, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-lg border border-white/[0.06] bg-black/40 font-mono text-xs space-y-1"
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                                ep.method === "GET"
                                  ? "bg-blue-500/20 text-blue-300"
                                  : ep.method === "POST"
                                  ? "bg-emerald-500/20 text-emerald-300"
                                  : "bg-amber-500/20 text-amber-300"
                              }`}
                            >
                              {ep.method}
                            </span>
                            <span className="text-white/80 font-bold truncate">{ep.path}</span>
                          </div>
                          <p className="text-[11px] text-text-secondary font-sans line-clamp-2">
                            {ep.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* 4. Categorized Technology Badges */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                    <CheckCircle2 size={14} />
                    <span>VERIFIED REPOSITORY TECHNOLOGY STACK</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {cs.techCategories.map((cat, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl border border-white/[0.08] bg-[#0b0b10] space-y-2.5"
                      >
                        <span className="font-mono text-[11px] text-white/40 uppercase tracking-widest block font-bold">
                          {cat.category}
                        </span>
                        <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                          {cat.items.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-white/80"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* ─── TAB 3: CONTRIBUTIONS & FEATURES ──────────────────────────── */}
            {activeTab === "contributions" && (
              <div className="space-y-8 animate-fadeIn">
                {/* 1. Verified Role & Collaboration */}
                <section className="p-6 rounded-xl border border-white/[0.08] bg-[#0b0b10] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/[0.06]">
                    <div>
                      <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-wider block font-bold">
                        VERIFIED ENGINEERING ROLE
                      </span>
                      <h3 className="text-lg font-bold text-white tracking-tight">
                        {cs.contributions.role}
                      </h3>
                    </div>
                    <span className="font-mono text-xs text-white/50 bg-white/[0.03] border border-white/10 px-3 py-1 rounded-full shrink-0">
                      {cs.contributions.collaboration}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <span className="font-mono text-xs text-white/40 uppercase tracking-wider block">
                      CORE ARCHITECTURAL DELIVERABLES:
                    </span>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-text-secondary font-sans">
                      {cs.contributions.keyDeliverables.map((deliv, i) => (
                        <li key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-black/40 border border-white/[0.04]">
                          <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>

                {/* 2. Organized Feature Groups */}
                <section className="space-y-6">
                  <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-semibold uppercase tracking-wider">
                    <ListChecks size={14} />
                    <span>IMPLEMENTED FEATURE GROUPS</span>
                  </div>

                  <div className="space-y-5">
                    {cs.featureGroups.map((group, gIdx) => (
                      <div
                        key={gIdx}
                        className="p-6 rounded-xl border border-white/[0.08] bg-[#0b0b10] space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-purple-400" />
                            {group.groupTitle}
                          </h4>
                          {group.badge && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/35">
                              {group.badge}
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {group.features.map((feat, fIdx) => (
                            <div
                              key={fIdx}
                              className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] space-y-2 flex flex-col justify-between"
                            >
                              <div className="space-y-1">
                                <div className="flex items-center justify-between gap-2">
                                  <h5 className="text-xs font-bold text-white font-mono">
                                    {feat.name}
                                  </h5>
                                  <span
                                    className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${
                                      feat.status === "production"
                                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                        : feat.status === "functional"
                                        ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                        : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                    }`}
                                  >
                                    {feat.status.replace("_", " ")}
                                  </span>
                                </div>
                                <p className="text-xs text-text-secondary font-sans leading-relaxed">
                                  {feat.description}
                                </p>
                              </div>

                              {feat.implementationDetail && (
                                <div className="pt-2 border-t border-white/[0.04] text-[11px] font-mono text-purple-300/80">
                                  <span className="text-white/30 text-[9px] block uppercase">
                                    IMPLEMENTATION LOGIC:
                                  </span>
                                  {feat.implementationDetail}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 3. Verified Visual Assets / Previews */}
                {cs.visualAssets && cs.visualAssets.length > 0 && (
                  <section className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                      <Sparkles size={14} />
                      <span>AUTHENTIC REPOSITORY ASSETS &amp; VISUALS</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {cs.visualAssets.map((asset, idx) => (
                        <div
                          key={idx}
                          className="p-5 rounded-xl border border-white/[0.08] bg-[#0b0b10] space-y-3"
                        >
                          <div className="flex items-center justify-between font-mono text-[10px] text-white/40 pb-2 border-b border-white/[0.06]">
                            <span className="text-white/80 font-bold">{asset.title}</span>
                            {asset.attribution && (
                              <span className="text-purple-400 truncate max-w-[200px]">
                                {asset.attribution}
                              </span>
                            )}
                          </div>

                          {asset.src && (
                            <div className="flex items-center justify-center p-6 bg-black/60 rounded-lg border border-white/[0.04] min-h-[160px]">
                              <Image
                                src={asset.src}
                                alt={asset.title}
                                width={320}
                                height={200}
                                className="max-h-44 w-auto object-contain rounded drop-shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                              />
                            </div>
                          )}

                          <p className="text-xs text-text-secondary font-sans">{asset.caption}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}

            {/* ─── TAB 4: CHALLENGES & ROADMAP ───────────────────────────────── */}
            {activeTab === "challenges" && (
              <div className="space-y-8 animate-fadeIn">
                {/* 1. Documented Engineering Challenges & Decisions */}
                <section className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold uppercase tracking-wider">
                    <ShieldAlert size={14} />
                    <span>01 // DOCUMENTED TECHNICAL CHALLENGES</span>
                  </div>

                  <div className="space-y-4">
                    {cs.challenges.map((ch, idx) => (
                      <div
                        key={idx}
                        className="p-6 rounded-xl border border-white/[0.08] bg-[#0b0b10] space-y-4"
                      >
                        <h4 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                          <span className="font-mono text-xs text-amber-400 font-bold px-1.5 py-0.5 rounded bg-amber-950/40 border border-amber-500/30">
                            0{idx + 1}
                          </span>
                          {ch.title}
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                          <div className="p-4 rounded-lg border border-red-500/15 bg-red-950/10 space-y-1.5">
                            <span className="font-mono text-[10px] text-red-400 uppercase tracking-wider font-bold block">
                              TECHNICAL PROBLEM &amp; CONSTRAINT
                            </span>
                            <p className="text-text-secondary leading-relaxed">{ch.problem}</p>
                          </div>

                          <div className="p-4 rounded-lg border border-emerald-500/15 bg-emerald-950/10 space-y-1.5">
                            <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-wider font-bold block">
                              ENGINEERED SOLUTION &amp; PATTERN
                            </span>
                            <p className="text-text-secondary leading-relaxed">{ch.solution}</p>
                          </div>
                        </div>

                        {ch.compromiseOrLesson && (
                          <div className="p-3 rounded-lg border border-white/[0.06] bg-black/40 text-xs font-mono text-white/70">
                            <span className="text-white/40 text-[9px] uppercase tracking-wider block">
                              TRADE-OFF / KEY TAKEAWAY:
                            </span>
                            <span>{ch.compromiseOrLesson}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>

                {/* 2. Current Known Limitations */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-red-400 font-semibold uppercase tracking-wider">
                    <AlertCircle size={14} />
                    <span>02 // CURRENT LIMITATIONS &amp; KNOWN COMPROMISES</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cs.currentLimitations.map((lim, i) => (
                      <div
                        key={i}
                        className="p-5 rounded-xl border border-white/[0.08] bg-[#0b0b10] space-y-2"
                      >
                        <span className="font-mono text-[10px] text-red-400 uppercase tracking-widest block font-bold">
                          {lim.area}
                        </span>
                        <h5 className="text-sm font-bold text-white">{lim.limitation}</h5>
                        <p className="text-xs text-text-secondary font-sans leading-relaxed pt-1">
                          {lim.reason}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 3. Prioritized Engineering Roadmap */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                    <Milestone size={14} />
                    <span>03 // PRIORITIZED ENGINEERING ROADMAP</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {cs.roadmap.map((item, i) => (
                      <div
                        key={i}
                        className="p-5 rounded-xl border border-white/[0.08] bg-[#0b0b10] space-y-3 flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between font-mono text-xs">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                item.priority === "P0"
                                  ? "bg-red-500/20 text-red-300 border border-red-500/35"
                                  : item.priority === "P1"
                                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/35"
                                  : "bg-blue-500/20 text-blue-300 border border-blue-500/35"
                              }`}
                            >
                              {item.priority} PRIORITY
                            </span>
                            <span className="text-[10px] text-white/40 uppercase">
                              {item.status.replace("_", " ")}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-white">{item.title}</h4>
                          <p className="text-xs text-text-secondary font-sans leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}
          </main>

          {/* ─── COMPACT WORKSPACE FOOTER ────────────────────────────────────── */}
          <footer className="border-t border-white/[0.08] bg-[#09090e]/95 backdrop-blur-md px-5 sm:px-8 py-3.5 shrink-0 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            {/* Prev / Next Project Switcher */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevProject}
                aria-label="Previous Project"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] text-white/70 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer"
              >
                <ChevronLeft size={14} />
                <span className="hidden sm:inline">PREV</span>
              </button>

              <span className="text-white/40 px-1 font-semibold">
                0{currentIndex + 1} / 0{total}
              </span>

              <button
                type="button"
                onClick={handleNextProject}
                aria-label="Next Project"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] text-white/70 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer"
              >
                <span className="hidden sm:inline">NEXT</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Verified Project Status */}
            <div className="hidden md:flex items-center gap-2 text-white/40 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>AUTHENTIC LOCAL &amp; REPO DATA VERIFIED</span>
            </div>

            {/* Direct Shortcuts */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleShare}
                className="text-white/50 hover:text-white transition-colors cursor-pointer"
              >
                {copied ? "COPIED" : "SHARE CASE STUDY"}
              </button>

              <span className="text-white/20">&bull;</span>

              <button
                type="button"
                onClick={onClose}
                className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors cursor-pointer"
              >
                CLOSE WORKSPACE [ESC]
              </button>
            </div>
          </footer>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
