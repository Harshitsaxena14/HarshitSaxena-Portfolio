"use client";

import { useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Code2, Layers, Database, Cpu, Sparkles, Terminal, ArrowUpRight } from "lucide-react";

interface TechItem {
  name: string;
  tag: string;
  detail: string;
}

interface TechCategory {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: typeof Code2;
  accentColor: string;
  skills: TechItem[];
}

const TECH_CATEGORIES: TechCategory[] = [
  {
    id: "languages",
    number: "01",
    title: "LANGUAGES",
    subtitle: "CORE SYSTEMS & LOGIC",
    description: "Low-level system programming, memory-safe data structures, and typed application logic.",
    icon: Terminal,
    accentColor: "#38BDF8", // Cyan
    skills: [
      { name: "C++", tag: "SYSTEMS", detail: "200+ LeetCode problems solved, STL algorithms, memory management & graphs" },
      { name: "Python", tag: "CORE", detail: "MindLens NLP sentiment engine, MediFlow web platform, TensorFlow pipelines" },
      { name: "TypeScript", tag: "TYPED", detail: "Strict typing, generics, HarshitOS portfolio components, zero runtime type errors" },
      { name: "JavaScript", tag: "ES6+", detail: "Modern ES6+, asynchronous promises, DOM manipulation & V8 optimization" },
    ],
  },
  {
    id: "frameworks",
    number: "02",
    title: "FRAMEWORKS & RUNTIME",
    subtitle: "APPLICATION ARCHITECTURE",
    description: "Modern server-rendered web frameworks, reactive state management, and high-throughput application backends.",
    icon: Layers,
    accentColor: "#A855F7", // Purple
    skills: [
      { name: "React 18", tag: "UI", detail: "Concurrent Mode, custom hooks, virtual DOM, and component composition" },
      { name: "Next.js 14", tag: "FULLSTACK", detail: "App Router, SSR, Server Components, and HarshitOS editorial architecture" },
      { name: "FastAPI", tag: "BACKEND", detail: "High-throughput asynchronous Python microservices with Pydantic validation" },
      { name: "Node.js", tag: "RUNTIME", detail: "Event loop execution, server-side APIs, and npm dependency workflows" },
      { name: "Tailwind CSS & Motion", tag: "STYLING", detail: "Utility design tokens, Framer Motion spring physics & 60fps animations" },
    ],
  },
  {
    id: "systems",
    number: "03",
    title: "SYSTEMS & DATA",
    subtitle: "DISTRIBUTED STORAGE & INFRA",
    description: "Reliable database schemas, emergency query indexing, and containerized deployment workflows.",
    icon: Database,
    accentColor: "#F59E0B", // Amber
    skills: [
      { name: "PostgreSQL", tag: "RELATIONAL", detail: "MediFlow medicine inventory relational schema, indexing, and emergency lookups" },
      { name: "REST APIs", tag: "API DESIGN", detail: "RESTful architecture, status codes, query pagination & schema validation" },
      { name: "Docker", tag: "CONTAINERS", detail: "Containerized application environments, Dockerfiles, and image isolation" },
      { name: "Linux & Git", tag: "DEVOPS", detail: "Bash command line, Git branching workflows, GitHub version control & CI/CD" },
    ],
  },
  {
    id: "aiml",
    number: "04",
    title: "AI / ML & TOOLING",
    subtitle: "INTELLIGENT PIPELINES & UTILS",
    description: "Machine learning model training, sentiment analysis pipelines, and deployed interactive intelligence dashboards.",
    icon: Cpu,
    accentColor: "#10B981", // Emerald
    skills: [
      { name: "TensorFlow", tag: "DEEP LEARNING", detail: "MindLens sentiment classification model & Fashion-MNIST CNN (86% accuracy)" },
      { name: "Infosys Springboard AI", tag: "CERTIFIED", detail: "Professional certification in Artificial Intelligence & Deep Learning principles" },
      { name: "NLP Pipelines", tag: "INTELLIGENCE", detail: "Sentiment analysis, mood scoring, and text preprocessing for student wellbeing" },
      { name: "Streamlit", tag: "DEPLOYMENT", detail: "Interactive cloud web application deployment for MindLens platform" },
      { name: "Scikit-Learn", tag: "ML CORE", detail: "Data preprocessing, classification algorithms, and feature evaluation metrics" },
    ],
  },
];

// ─── Individual Category Panel Component with Cursor Spotlight ───────────────

function TechnicalCategoryPanel({
  category,
  index,
}: {
  category: TechCategory;
  index: number;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isPanelHovered, setIsPanelHovered] = useState(false);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const Icon = category.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={panelRef}
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsPanelHovered(true)}
      onMouseLeave={() => {
        setIsPanelHovered(false);
        setHoveredTech(null);
      }}
      style={{
        transform: isPanelHovered && !prefersReducedMotion ? "translateY(-4px) scale(1.01)" : "translateY(0px) scale(1)",
        transition: "transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
      className="relative rounded-2xl border border-white/[0.08] hover:border-white/20 bg-[#08080d]/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl group overflow-hidden"
    >
      {/* Radial Pointer Spotlight Following Cursor */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
        style={{
          background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, ${category.accentColor}18, transparent 80%)`,
        }}
      />

      {/* Panel Top Header */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-5">
        <div className="flex items-center gap-3 font-mono">
          <span className="text-xs font-bold text-white/40 tracking-wider">
            {category.number} //
          </span>
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: category.accentColor }}>
            {category.subtitle}
          </span>
        </div>
        <div
          className="w-9 h-9 rounded-xl border flex items-center justify-center transition-colors duration-300"
          style={{
            borderColor: `${category.accentColor}30`,
            backgroundColor: `${category.accentColor}10`,
          }}
        >
          <Icon size={18} style={{ color: category.accentColor }} />
        </div>
      </div>

      {/* Category Title & Description */}
      <div className="space-y-1.5 mb-6">
        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2 group-hover:text-white transition-colors">
          <span>{category.title}</span>
        </h3>
        <p className="text-xs sm:text-sm text-white/60 font-sans leading-relaxed">
          {category.description}
        </p>
      </div>

      {/* Technology Items Matrix */}
      <div className="flex flex-wrap gap-2.5">
        {category.skills.map((skill) => {
          const isItemHovered = hoveredTech === skill.name;
          const isAnyItemHovered = hoveredTech !== null;

          return (
            <div
              key={skill.name}
              tabIndex={0}
              onMouseEnter={() => setHoveredTech(skill.name)}
              onMouseLeave={() => setHoveredTech(null)}
              onFocus={() => setHoveredTech(skill.name)}
              onBlur={() => setHoveredTech(null)}
              style={{
                transform: isItemHovered && !prefersReducedMotion ? "translateY(-2px) scale(1.02)" : "scale(1)",
                transition: "all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)",
              }}
              className={`relative cursor-pointer rounded-xl border px-3.5 py-2 flex items-center gap-2 font-mono text-xs select-none transition-all duration-200 outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 ${
                isItemHovered
                  ? "bg-white/[0.12] border-white/40 text-white shadow-lg z-20"
                  : isAnyItemHovered
                  ? "bg-black/40 border-white/[0.05] text-white/40"
                  : "bg-black/50 border-white/[0.08] text-white/80 hover:border-white/20"
              }`}
            >
              {/* Glowing Indicator Dot */}
              <span
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  isItemHovered ? "bg-emerald-400 scale-125 shadow-[0_0_8px_rgba(52,211,153,0.8)]" : "bg-white/20"
                }`}
              />
              <span className="font-semibold">{skill.name}</span>
              <span className="text-[9px] text-white/40 uppercase tracking-wider ml-1 px-1.5 py-0.5 rounded bg-white/[0.04]">
                {skill.tag}
              </span>
            </div>
          );
        })}
      </div>

      {/* Bottom Sub-Detail Card on Skill Hover */}
      <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between font-mono text-[11px] text-white/40 min-h-8">
        {hoveredTech ? (
          <motion.div
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-emerald-300 font-medium"
          >
            <Sparkles size={12} className="text-emerald-400 shrink-0" />
            <span className="line-clamp-1">
              {category.skills.find((s) => s.name === hoveredTech)?.detail}
            </span>
          </motion.div>
        ) : (
          <div className="flex items-center justify-between w-full text-white/30 text-[10px] uppercase tracking-wider">
            <span>HOVER OR FOCUS TECH FOR APPLIED CONTEXT</span>
            <ArrowUpRight size={12} />
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main Technical Arsenal Component ────────────────────────────────────────

export default function TechStack() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredCategories =
    activeFilter === "all"
      ? TECH_CATEGORIES
      : TECH_CATEGORIES.filter((c) => c.id === activeFilter);

  return (
    <section
      id="skills"
      className="relative w-full py-24 sm:py-32 bg-[#030305] text-white border-b border-white/[0.06] overflow-hidden"
    >
      {/* Background Ambient Radial Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-500/5 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[400px] bg-emerald-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-[1240px] mx-auto px-6 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-white/[0.08]">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs text-emerald-300 uppercase tracking-widest">
                // 06. TECH STACK &middot; TECHNICAL ARSENAL
              </span>
            </div>

            <h2
              id="skills-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase leading-none"
            >
              What I Build With.
            </h2>

            <p className="text-sm sm:text-base text-white/60 font-sans leading-relaxed pt-1 max-w-2xl font-light">
              A practical engineering stack built around algorithmic problem solving, high-throughput systems, real-time application architecture, and machine learning pipelines.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/10 font-mono text-xs self-start md:self-auto">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeFilter === "all"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold"
                  : "text-white/50 hover:text-white"
              }`}
            >
              ALL DOMAINS
            </button>
            {TECH_CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveFilter(c.id)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeFilter === c.id
                    ? "bg-white/15 text-white border border-white/25 font-semibold"
                    : "text-white/40 hover:text-white"
                }`}
              >
                {c.number} {c.title.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Asymmetric Editorial Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {filteredCategories.map((category, index) => (
            <TechnicalCategoryPanel key={category.id} category={category} index={index} />
          ))}
        </div>

        {/* Footer Technical Summary Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-xl border border-white/[0.06] bg-black/40 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-white/50"
        >
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold tracking-wider uppercase">
              PRODUCTION STACK
            </span>
            <span>VERIFIED CAPABILITIES ACROSS 4 CORE SYSTEMS DOMAINS</span>
          </div>
          <div className="flex items-center gap-6 text-[11px] text-white/40">
            <span>C++ &amp; PYTHON</span>
            <span>&middot;</span>
            <span>NEXT.JS 14</span>
            <span>&middot;</span>
            <span>POSTGRESQL</span>
            <span>&middot;</span>
            <span>TENSORFLOW</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
