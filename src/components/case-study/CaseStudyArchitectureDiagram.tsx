"use client";

import { useState } from "react";
import { 
  Server, 
  Database, 
  Cpu, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Terminal, 
  Compass, 
  ShieldCheck,
  Radio,
  FileCode,
  Laptop
} from "lucide-react";
import { ArchitectureInfo } from "@/types/caseStudy";

interface DiagramProps {
  architecture: ArchitectureInfo;
  projectTitle: string;
}

export default function CaseStudyArchitectureDiagram({ architecture, projectTitle }: DiagramProps) {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const { diagramType } = architecture;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/[0.08]">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <Terminal size={14} />
          <span className="uppercase tracking-wider font-semibold">
            SYSTEM ARCHITECTURE DIAGRAM // {projectTitle}
          </span>
        </div>
        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
          INTERACTIVE COMPONENT FLOW
        </span>
      </div>

      {/* Main Diagram Canvas */}
      <div className="w-full bg-[#050508] border border-white/[0.08] rounded-xl p-5 sm:p-6 overflow-x-auto select-none">
        {diagramType === "codement" && (
          <div className="min-w-[680px] space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {/* Node 1: In-Context Extension */}
              <div 
                onMouseEnter={() => setActiveNode("ext")}
                onMouseLeave={() => setActiveNode(null)}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  activeNode === "ext"
                    ? "border-purple-400 bg-purple-950/30 shadow-[0_0_20px_rgba(168,85,247,0.25)]"
                    : "border-white/10 bg-white/[0.02]"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono text-purple-400 mb-2">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Laptop size={14} />
                    LEETCODE CONTEXT
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/20 border border-purple-500/30">
                    MV3 EXTENSION
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Manifest V3 Injected Content Script</h4>
                <p className="text-xs text-text-secondary leading-relaxed font-sans">
                  Monitors <code className="text-purple-300 font-mono text-[11px]">leetcode.com/problems/*</code> DOM mutations, captures problem slugs, and communicates via postMessage.
                </p>
              </div>

              {/* Node 2: Client SPA */}
              <div 
                onMouseEnter={() => setActiveNode("client")}
                onMouseLeave={() => setActiveNode(null)}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  activeNode === "client"
                    ? "border-emerald-400 bg-emerald-950/30 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
                    : "border-white/10 bg-white/[0.02]"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono text-emerald-400 mb-2">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Layers size={14} />
                    WEB CLIENT
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30">
                    REACT 19 + VITE
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Adaptive Curriculum Dashboard</h4>
                <p className="text-xs text-text-secondary leading-relaxed font-sans">
                  Renders 25+ topic unlock graph, mission revision scheduler, mock contests, and interactive Gemini AI mentor dialogue.
                </p>
              </div>

              {/* Node 3: Express Backend */}
              <div 
                onMouseEnter={() => setActiveNode("api")}
                onMouseLeave={() => setActiveNode(null)}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  activeNode === "api"
                    ? "border-cyan-400 bg-cyan-950/30 shadow-[0_0_20px_rgba(6,182,212,0.25)]"
                    : "border-white/10 bg-white/[0.02]"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-2">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Server size={14} />
                    REST API ENGINE
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 border border-cyan-500/30">
                    NODE + EXPRESS
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Auth &amp; Telemetry Controllers</h4>
                <p className="text-xs text-text-secondary leading-relaxed font-sans">
                  JWT authentication, problem unlock validation, spaced repetition scheduler, and Gemini prompt sanitization middleware.
                </p>
              </div>
            </div>

            {/* Connecting Flow Arrows */}
            <div className="flex items-center justify-between px-10 text-xs font-mono text-white/40">
              <div className="flex items-center gap-2 text-purple-400">
                <span>&larr; PostMessage / Local Storage Sync &rarr;</span>
              </div>
              <div className="flex items-center gap-2 text-cyan-400">
                <span>&larr; Axios REST / Bearer JWT &rarr;</span>
              </div>
            </div>

            {/* Sub-tier: Persistence & AI Services */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/[0.06]">
              {/* MongoDB Atlas */}
              <div 
                onMouseEnter={() => setActiveNode("db")}
                onMouseLeave={() => setActiveNode(null)}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  activeNode === "db"
                    ? "border-emerald-400 bg-emerald-950/30 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
                    : "border-white/10 bg-white/[0.02]"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono text-emerald-400 mb-2">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Database size={14} />
                    PERSISTENCE LAYER
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30">
                    MONGODB ATLAS
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Mongoose Data Schemas</h4>
                <p className="text-xs text-text-secondary leading-relaxed font-sans">
                  Users (JWT credentials), Problems (25+ topic tags), Progress (solve mastery &amp; spaced repetition timestamps), Contests.
                </p>
              </div>

              {/* Gemini AI */}
              <div 
                onMouseEnter={() => setActiveNode("gemini")}
                onMouseLeave={() => setActiveNode(null)}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  activeNode === "gemini"
                    ? "border-amber-400 bg-amber-950/30 shadow-[0_0_20px_rgba(251,191,36,0.25)]"
                    : "border-white/10 bg-white/[0.02]"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono text-amber-400 mb-2">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Cpu size={14} />
                    SOCRATIC AI ENGINE
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/30">
                    GOOGLE GEMINI 1.5
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Hint Laddering Pipeline</h4>
                <p className="text-xs text-text-secondary leading-relaxed font-sans">
                  System-prompt-constrained model producing progressive conceptual nudges (Intuition &rarr; Structure &rarr; Edge Cases) without code spoilers.
                </p>
              </div>
            </div>
          </div>
        )}

        {diagramType === "sahayak" && (
          <div className="min-w-[680px] space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {/* Citizen Front */}
              <div 
                onMouseEnter={() => setActiveNode("citizen")}
                onMouseLeave={() => setActiveNode(null)}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  activeNode === "citizen"
                    ? "border-blue-400 bg-blue-950/30 shadow-[0_0_20px_rgba(59,130,246,0.25)]"
                    : "border-white/10 bg-white/[0.02]"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono text-blue-400 mb-2">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Radio size={14} />
                    CITIZEN CLIENT (PILLARS 1 &amp; 2)
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/20 border border-blue-500/30">
                    VOICE + REACT 18
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Multilingual Speech &amp; Search Interface</h4>
                <p className="text-xs text-text-secondary leading-relaxed font-sans">
                  Web Speech API voice capture (Hindi/Hinglish/English), scheme discovery, eligibility assessment, and grievance ticket submission.
                </p>
              </div>

              {/* Officer Front */}
              <div 
                onMouseEnter={() => setActiveNode("officer")}
                onMouseLeave={() => setActiveNode(null)}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  activeNode === "officer"
                    ? "border-emerald-400 bg-emerald-950/30 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
                    : "border-white/10 bg-white/[0.02]"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono text-emerald-400 mb-2">
                  <span className="flex items-center gap-1.5 font-bold">
                    <ShieldCheck size={14} />
                    OFFICER PORTAL (/officer)
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30">
                    MANAGEMENT DASHBOARD
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Departmental Ticket Redressal Screen</h4>
                <p className="text-xs text-text-secondary leading-relaxed font-sans">
                  Inspect incoming grievances, filter by department and priority, update status (In Progress / Resolved), and record timestamped audit notes.
                </p>
              </div>
            </div>

            {/* Middle: Express Orchestrator */}
            <div 
              onMouseEnter={() => setActiveNode("sahayak-server")}
              onMouseLeave={() => setActiveNode(null)}
              className={`p-4 rounded-xl border transition-all duration-300 ${
                activeNode === "sahayak-server"
                  ? "border-cyan-400 bg-cyan-950/30 shadow-[0_0_20px_rgba(6,182,212,0.25)]"
                  : "border-white/10 bg-white/[0.02]"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-2">
                <span className="flex items-center gap-1.5 font-bold">
                  <Server size={14} />
                  EXPRESS BACKEND ROUTER (PORT 5000)
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 border border-cyan-500/30">
                  NODE.JS / COMMONJS
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
                <div className="p-2 rounded bg-white/[0.03] border border-white/[0.06] text-white/80">/api/schemes</div>
                <div className="p-2 rounded bg-white/[0.03] border border-white/[0.06] text-white/80">/api/ai/understand</div>
                <div className="p-2 rounded bg-white/[0.03] border border-white/[0.06] text-white/80">/api/grievances</div>
                <div className="p-2 rounded bg-white/[0.03] border border-white/[0.06] text-white/80">/api/officer</div>
              </div>
            </div>

            {/* Bottom: AI Engine & Dual Storage */}
            <div className="grid grid-cols-2 gap-4">
              {/* Groq / Gemini + Heuristics */}
              <div 
                onMouseEnter={() => setActiveNode("nlp")}
                onMouseLeave={() => setActiveNode(null)}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  activeNode === "nlp"
                    ? "border-amber-400 bg-amber-950/30 shadow-[0_0_20px_rgba(251,191,36,0.25)]"
                    : "border-white/10 bg-white/[0.02]"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono text-amber-400 mb-2">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Cpu size={14} />
                    AI ORCHESTRATION + HEURISTICS
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/30">
                    GROQ LLAMA 3 / REGEX
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">UNDERSTAND_SCHEMA Enforcer</h4>
                <p className="text-xs text-text-secondary leading-relaxed font-sans">
                  Rigid JSON schema slot filler extracting intent, language, category, and 10 demographic attributes, backed by offline regex fallback.
                </p>
              </div>

              {/* Dual-Tier Storage */}
              <div 
                onMouseEnter={() => setActiveNode("sahayak-db")}
                onMouseLeave={() => setActiveNode(null)}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  activeNode === "sahayak-db"
                    ? "border-emerald-400 bg-emerald-950/30 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
                    : "border-white/10 bg-white/[0.02]"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono text-emerald-400 mb-2">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Database size={14} />
                    DUAL-TIER PERSISTENCE
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30">
                    MONGO + JSON FALLBACK
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Authoritative Schemes &amp; Tickets</h4>
                <p className="text-xs text-text-secondary leading-relaxed font-sans">
                  Primary MongoDB database storing 7 seeded schemes, GRV tickets, and applications; falls back to schemes.json if disconnected.
                </p>
              </div>
            </div>
          </div>
        )}

        {diagramType === "harshitos" && (
          <div className="min-w-[640px] space-y-4">
            <div className="grid grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-lg border border-white/10 bg-white/[0.02] text-xs font-mono text-emerald-400">
                <div className="font-bold mb-1">CLIENT BROWSER</div>
                <span className="text-white/60 text-[11px]">Next.js 14 App Router</span>
              </div>
              <div className="p-3 rounded-lg border border-white/10 bg-white/[0.02] text-xs font-mono text-cyan-400">
                <div className="font-bold mb-1">INTERACTION LAYER</div>
                <span className="text-white/60 text-[11px]">Lenis + GSAP 3D Physics</span>
              </div>
              <div className="p-3 rounded-lg border border-white/10 bg-white/[0.02] text-xs font-mono text-purple-400">
                <div className="font-bold mb-1">KEYBOARD / MODAL</div>
                <span className="text-white/60 text-[11px]">Command Palette (⌘K)</span>
              </div>
              <div className="p-3 rounded-lg border border-white/10 bg-white/[0.02] text-xs font-mono text-amber-400">
                <div className="font-bold mb-1">API PROXY</div>
                <span className="text-white/60 text-[11px]">LeetCode GraphQL Route</span>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-950/20 text-xs text-text-secondary flex items-center justify-between">
              <span>Continuous 60 FPS viewport inertia scrolling paired with modal backdrop locking and focus trap management.</span>
              <span className="text-emerald-400 font-mono text-[10px] font-bold">100% HYDRATION CONSISTENCY</span>
            </div>
          </div>
        )}

        {(diagramType === "ml_pipeline" || diagramType === "geospatial") && (
          <div className="min-w-[640px] space-y-4">
            <div className="grid grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-lg border border-white/10 bg-white/[0.02] text-xs font-mono text-purple-400">
                <div className="font-bold mb-1">01 DATA INGESTION</div>
                <span className="text-white/60 text-[11px]">Raw Text / Spatial Tensors</span>
              </div>
              <div className="p-3 rounded-lg border border-white/10 bg-white/[0.02] text-xs font-mono text-cyan-400">
                <div className="font-bold mb-1">02 PREPROCESSING</div>
                <span className="text-white/60 text-[11px]">Tokenization &amp; Normalization</span>
              </div>
              <div className="p-3 rounded-lg border border-white/10 bg-white/[0.02] text-xs font-mono text-emerald-400">
                <div className="font-bold mb-1">03 MODEL / ENGINE</div>
                <span className="text-white/60 text-[11px]">TensorFlow / PostgreSQL</span>
              </div>
              <div className="p-3 rounded-lg border border-white/10 bg-white/[0.02] text-xs font-mono text-amber-400">
                <div className="font-bold mb-1">04 OUTPUT TELEMETRY</div>
                <span className="text-white/60 text-[11px]">Reactive UI / Dispatch Log</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <p className="text-xs text-text-secondary font-sans leading-relaxed pt-1">
        {architecture.summary}
      </p>
    </div>
  );
}
