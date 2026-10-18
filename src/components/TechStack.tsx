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
      { name: "C++", tag: "SYSTEMS", detail: "STL, Memory Management, Graph Algorithms" },
      { name: "Python", tag: "CORE", detail: "FastAPI, PyTorch, Async IO, Data Science" },
      { name: "TypeScript", tag: "TYPED", detail: "Strict Typing, Generics, Node/Browser" },
      { name: "JavaScript", tag: "ES6+", detail: "V8 Engine, Asynchronous Patterns, DOM" },
      { name: "Go", tag: "CONCURRENCY", detail: "Goroutines, Channels, CLI Tools, etcd" },
    ],
  },
  {
    id: "frameworks",
    number: "02",
    title: "FRAMEWORKS & RUNTIME",
    subtitle: "APPLICATION ARCHITECTURE",
    description: "Modern server-rendered web frameworks, reactive state management, and high-throughput microservices.",
    icon: Layers,
    accentColor: "#A855F7", // Purple
    skills: [
      { name: "React 18", tag: "UI", detail: "Concurrent Mode, Custom Hooks, Virtual DOM" },
      { name: "Next.js 14", tag: "FULLSTACK", detail: "App Router, SSR, Server Actions, Dynamic Routing" },
      { name: "FastAPI", tag: "BACKEND", detail: "Async Python, Pydantic, OpenAPI Specs" },
      { name: "Node.js", tag: "RUNTIME", detail: "Event Loop, Stream Processing, REST APIs" },
      { name: "Tailwind CSS & Motion", tag: "STYLING", detail: "Utility Design, Framer Motion Physics, Layouts" },
    ],
  },
  {
    id: "systems",
    number: "03",
    title: "SYSTEMS & DATA",
    subtitle: "DISTRIBUTED STORAGE & INFRA",
    description: "Reliable database systems, in-memory caching, binary CRDTs, and container orchestration.",
    icon: Database,
    accentColor: "#F59E0B", // Amber
    skills: [
      { name: "PostgreSQL", tag: "RELATIONAL", detail: "ACID Transactions, Indexing, Complex Queries" },
      { name: "Redis", tag: "CACHE", detail: "Pub/Sub Queues, Key-Value Caching, Memory Store" },
      { name: "WebSockets & Yjs", tag: "REAL-TIME", detail: "Binary CRDT Sync, Bi-directional Streaming" },
      { name: "REST & GraphQL", tag: "API DESIGN", detail: "Schema Validation, Rate Limiting, Query Parsing" },
      { name: "Docker", tag: "CONTAINERS", detail: "Multi-stage Builds, Compose, Isolation" },
      { name: "Linux & Git", tag: "DEVOPS", detail: "Bash Scripting, CI/CD Workflows, Version Control" },
    ],
  },
  {
    id: "aiml",
    number: "04",
    title: "AI / ML & TOOLING",
    subtitle: "INTELLIGENT PIPELINES & UTILS",
    description: "Machine learning model deployment, automated LLM review tools, and visual pipeline DAG builders.",
    icon: Cpu,
    accentColor: "#10B981", // Emerald
    skills: [
      { name: "Gemini API", tag: "LLM INTEGRATION", detail: "Structured Prompting, Streaming Tokens, Code Analysis" },
      { name: "PyTorch & TensorFlow", tag: "DEEP LEARNING", detail: "Neural Net Inference, Model Pipeline Training" },
      { name: "MLflow", tag: "MLOPS", detail: "Experiment Tracking, Artifact Registry, Run Metrics" },
      { name: "Scikit-Learn", tag: "ML CORE", detail: "Regression, Clustering, Classification Pipeline" },
      { name: "OpenCV", tag: "VISION", detail: "Image Processing, Feature Extraction, Filtering" },
      { name: "React Flow", tag: "DAG UI", detail: "Visual Pipeline Graphs, Node Execution State" },
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
      viewport={{ once: false, margin: "-80px" }}
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
              onMouseEnter={() => setHoveredTech(skill.name)}
              onMouseLeave={() => setHoveredTech(null)}
              style={{
                transform: isItemHovered && !prefersReducedMotion ? "translateY(-2px) scale(1.02)" : "scale(1)",
                transition: "all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)",
              }}
              className={`relative cursor-pointer rounded-xl border px-3.5 py-2 flex items-center gap-2 font-mono text-xs select-none transition-all duration-200 ${
                isItemHovered
                  ? "bg-white/[0.12] border-white/40 text-white shadow-lg z-20"
                  : isAnyItemHovered
                  ? "bg-black/40 border-white/[0.05] text-white/40"
                  : "bg-black/50 border-white/[0.08] text-white/80 hover:border-white/20"
              }`}
            >
              {/* Glowing Emerald Dot on Hover */}
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
      <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between font-mono text-[11px] text-white/40 h-7">
        {hoveredTech ? (
          <motion.div
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-emerald-300 font-medium"
          >
            <Sparkles size={12} className="text-emerald-400" />
            <span>
              {category.skills.find((s) => s.name === hoveredTech)?.detail}
            </span>
          </motion.div>
        ) : (
          <div className="flex items-center justify-between w-full text-white/30 text-[10px] uppercase tracking-wider">
            <span>HOVER TECH TO INSPECT SPECIALIZED CAPABILITIES</span>
            <ArrowUpRight size={12} />
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main Technical Arsenal Component ────────────────────────────────────────

export default function TechStack() {
  return (
    <section
      id="skills"
      className="relative w-full py-24 sm:py-32 bg-[#030305] text-white border-b border-white/[0.06] overflow-hidden"
    >
      {/* Background Ambient Radial Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-500/5 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[400px] bg-emerald-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-[1240px] mx-auto px-6 relative z-10 space-y-16">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="space-y-3 max-w-3xl"
        >
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
            WHAT I BUILD WITH.
          </h2>

          <p className="text-sm sm:text-base text-white/60 font-sans leading-relaxed pt-1 max-w-2xl">
            A practical engineering stack built around memory safety, high-throughput systems, real-time application architecture, and machine learning pipelines.
          </p>
        </motion.div>

        {/* 2-Column Asymmetric Editorial Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {TECH_CATEGORIES.map((category, index) => (
            <TechnicalCategoryPanel key={category.id} category={category} index={index} />
          ))}
        </div>

        {/* Footer Technical Summary Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="rounded-xl border border-white/[0.06] bg-black/40 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-white/50"
        >
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold tracking-wider uppercase">
              PRODUCTION STACK
            </span>
            <span>24 VERIFIED TECHNOLOGIES ACROSS 4 CORE DOMAINS</span>
          </div>
          <div className="flex items-center gap-6 text-[11px] text-white/40">
            <span>LANGUAGES</span>
            <span>&middot;</span>
            <span>FRAMEWORKS</span>
            <span>&middot;</span>
            <span>SYSTEMS</span>
            <span>&middot;</span>
            <span>AI / ML</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
