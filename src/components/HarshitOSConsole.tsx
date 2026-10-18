"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Activity,
  FileText,
  X,
  Minus,
  Maximize2,
  ExternalLink,
  Download,
  Copy,
  Check,
  Sparkles,
  Send,
  CornerDownLeft,
} from "lucide-react";

interface HarshitOSConsoleProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandLog {
  command: string;
  output: React.ReactNode;
  time: string;
}

export default function HarshitOSConsole({ isOpen, onClose }: HarshitOSConsoleProps) {
  const [activeTab, setActiveTab] = useState<"terminal" | "telemetry" | "resume">("terminal");
  const [inputCommand, setInputCommand] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const initialLogs: CommandLog[] = [
    {
      command: "harshitos --version",
      output: (
        <div className="text-white/70 space-y-1">
          <p className="text-emerald-400 font-bold">HarshitOS Applied Intelligence Terminal v2.4.0 (x86_64-nextjs)</p>
          <p className="text-xs text-white/50">Type &apos;help&apos; to view all available commands, or click the quick action chips below.</p>
        </div>
      ),
      time: "00:01",
    },
  ];

  const [logs, setLogs] = useState<CommandLog[]>(initialLogs);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Handle keyboard shortcut ESC to close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const executeCommand = (cmdText: string) => {
    const raw = cmdText.trim().toLowerCase();
    if (!raw) return;

    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    let output: React.ReactNode;

    switch (raw) {
      case "help":
        output = (
          <div className="space-y-1.5 text-xs text-white/70">
            <p className="text-emerald-300 font-semibold">// AVAILABLE SYSTEM COMMANDS:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pt-1 font-mono">
              <div><span className="text-cyan-400 font-bold">about</span> : Developer bio &amp; credentials</div>
              <div><span className="text-cyan-400 font-bold">projects</span> : Verified project registry</div>
              <div><span className="text-cyan-400 font-bold">skills</span> : Core technical arsenal</div>
              <div><span className="text-cyan-400 font-bold">dsa</span> : LeetCode &amp; problem-solving stats</div>
              <div><span className="text-cyan-400 font-bold">resume</span> : View / download resume</div>
              <div><span className="text-cyan-400 font-bold">contact</span> : Communication channels</div>
              <div><span className="text-cyan-400 font-bold">clear</span> : Clear terminal history</div>
            </div>
          </div>
        );
        break;

      case "about":
        output = (
          <div className="space-y-1 text-xs text-white/80">
            <p className="text-white font-bold">HARSHIT SAXENA &middot; COMPUTER SCIENCE ENGINEER</p>
            <p className="text-white/60">Institution: Amity University Madhya Pradesh (B.Tech CSE &middot; CGPA: 8.12)</p>
            <p className="text-white/60">Class: 2024 &ndash; 2028 | Location: Gwalior, MP, India (UTC +5:30)</p>
            <p className="text-emerald-400 pt-1">Specialization: Applied AI/ML Systems, Deep Learning, and Full-Stack Engineering.</p>
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-2 text-xs">
            <p className="text-white/50 font-bold">// VERIFIED ENGINEERING PORTFOLIO:</p>
            <div className="space-y-1.5 pl-2 border-l border-white/10">
              <div>
                <span className="text-emerald-400 font-bold">01. MindLens</span>: AI Student Wellbeing Analyzer (Streamlit, TensorFlow NLP, Deployed)
              </div>
              <div>
                <span className="text-cyan-400 font-bold">02. HarshitOS</span>: High-Performance Dark Editorial Portfolio (Next.js 14, TypeScript)
              </div>
              <div>
                <span className="text-purple-400 font-bold">03. MediFlow</span>: Healthcare Medicine Inventory with Emergency Mode (PostgreSQL)
              </div>
              <div>
                <span className="text-blue-400 font-bold">04. SAHAYAK</span>: AI Assistance &amp; Workflow Platform (Python, NLP)
              </div>
              <div>
                <span className="text-amber-400 font-bold">05. Fashion-MNIST</span>: CNN Image Classifier (TensorFlow, 86% Test Accuracy)
              </div>
            </div>
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="space-y-1.5 text-xs text-white/80">
            <p><span className="text-cyan-400 font-bold">Languages:</span> C++, Python, TypeScript, JavaScript</p>
            <p><span className="text-purple-400 font-bold">Frameworks:</span> Next.js 14, React 18, FastAPI, Tailwind CSS, Framer Motion</p>
            <p><span className="text-amber-400 font-bold">Systems &amp; Data:</span> PostgreSQL, REST APIs, Docker, Linux, Git</p>
            <p><span className="text-emerald-400 font-bold">AI / ML:</span> TensorFlow, NLP Pipelines, Deep Learning, Streamlit</p>
          </div>
        );
        break;

      case "dsa":
        output = (
          <div className="space-y-1 text-xs text-white/80">
            <p className="text-emerald-400 font-bold">LEETCODE COMPETITIVE METRICS:</p>
            <p>Username: <a href="https://leetcode.com/harshit_saxena14" target="_blank" rel="noreferrer" className="text-cyan-400 underline">@harshit_saxena14</a></p>
            <p>Problems Solved: 200+ (Mastering Trees, Heaps, Graphs, Dynamic Programming in C++)</p>
            <p>Status: Continuous active problem solver &amp; contest competitor</p>
          </div>
        );
        break;

      case "resume":
        output = (
          <div className="space-y-2 text-xs">
            <p className="text-emerald-400 font-bold">RESUME ARTIFACT VERIFIED:</p>
            <p className="text-white/70">Harshit_Saxena_Resume.pdf (Latest Engineering Profile)</p>
            <a
              href="/Harshit_Saxena_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-white font-mono"
            >
              <Download size={13} />
              <span>DOWNLOAD RESUME PDF</span>
            </a>
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="space-y-1 text-xs text-white/80">
            <p>Email: <a href="mailto:harshitacademics@gmail.com" className="text-emerald-400 underline">harshitacademics@gmail.com</a></p>
            <p>LinkedIn: <a href="https://linkedin.com/in/harshitsaxena" target="_blank" rel="noreferrer" className="text-cyan-400 underline">linkedin.com/in/harshitsaxena</a></p>
            <p>GitHub: <a href="https://github.com/harshitsaxena" target="_blank" rel="noreferrer" className="text-white underline">github.com/harshitsaxena</a></p>
          </div>
        );
        break;

      case "clear":
        setLogs([]);
        setInputCommand("");
        return;

      default:
        output = (
          <p className="text-red-400/90 text-xs">
            Command not recognized: &quot;{raw}&quot;. Type &apos;help&apos; for list of commands.
          </p>
        );
        break;
    }

    setLogs((prev) => [...prev, { command: cmdText, output, time }]);
    setInputCommand("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputCommand);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("harshitacademics@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="harshitos-console-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className={`w-full bg-[#0a0a10] border border-white/15 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
              isMaximized ? "max-w-[96vw] h-[92vh]" : "max-w-3xl h-[620px] max-h-[90vh]"
            }`}
          >
            {/* macOS Window Header Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#0d0d16] border-b border-white/[0.08] select-none shrink-0 font-mono text-xs">
              {/* Traffic Light Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  aria-label="Close HarshitOS Console"
                  className="w-3 h-3 rounded-full bg-[#FF5F56] hover:brightness-110 flex items-center justify-center cursor-pointer group"
                >
                  <X size={8} className="text-black opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <button
                  onClick={() => setIsMaximized(false)}
                  aria-label="Minimize Window"
                  className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:brightness-110 flex items-center justify-center cursor-pointer group"
                >
                  <Minus size={8} className="text-black opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <button
                  onClick={() => setIsMaximized((prev) => !prev)}
                  aria-label="Toggle Fullscreen"
                  className="w-3 h-3 rounded-full bg-[#27C93F] hover:brightness-110 flex items-center justify-center cursor-pointer group"
                >
                  <Maximize2 size={8} className="text-black opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>

              {/* Title & Host Identifier */}
              <div className="flex items-center gap-2 text-white/70 font-semibold text-[11px]">
                <Terminal size={13} className="text-emerald-400" />
                <span>harshitos@system: ~ (bash)</span>
              </div>

              {/* Status Pill */}
              <div className="flex items-center gap-2 text-[10px] text-white/40">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>GWALIOR UTC+5:30</span>
              </div>
            </div>

            {/* Navigation Tabs Bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-black/40 border-b border-white/[0.06] shrink-0 font-mono text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab("terminal")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all cursor-pointer ${
                    activeTab === "terminal"
                      ? "bg-white/10 text-emerald-400 font-bold border border-white/15"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  <Terminal size={12} />
                  <span>TERMINAL CLI</span>
                </button>
                <button
                  onClick={() => setActiveTab("telemetry")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all cursor-pointer ${
                    activeTab === "telemetry"
                      ? "bg-white/10 text-cyan-400 font-bold border border-white/15"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  <Activity size={12} />
                  <span>SYSTEM TELEMETRY</span>
                </button>
                <button
                  onClick={() => setActiveTab("resume")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all cursor-pointer ${
                    activeTab === "resume"
                      ? "bg-white/10 text-purple-400 font-bold border border-white/15"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  <FileText size={12} />
                  <span>RESUME QUICKVIEW</span>
                </button>
              </div>

              <span className="text-[10px] text-white/30 hidden sm:inline">
                PRESS ESC TO EXIT
              </span>
            </div>

            {/* TAB 1: TERMINAL CLI VIEW */}
            {activeTab === "terminal" && (
              <div className="flex-1 flex flex-col min-h-0 bg-[#06060a] p-4 sm:p-5 font-mono text-xs">
                {/* Scrollable Command Log Area */}
                <div className="flex-1 overflow-y-auto space-y-4 pr-2 select-text">
                  {logs.map((log, index) => (
                    <div key={index} className="space-y-1.5">
                      <div className="flex items-center gap-2 text-white/40 text-[11px]">
                        <span className="text-emerald-400 font-bold">&gt;</span>
                        <span className="text-white font-semibold">{log.command}</span>
                        <span className="ml-auto text-[10px] text-white/20">{log.time}</span>
                      </div>
                      <div className="pl-4">{log.output}</div>
                    </div>
                  ))}
                  <div ref={terminalEndRef} />
                </div>

                {/* Quick Action Suggestion Chips */}
                <div className="py-2.5 flex flex-wrap items-center gap-1.5 border-t border-white/[0.06] text-[11px] shrink-0">
                  <span className="text-white/30 mr-1 text-[10px] uppercase">Quick Run:</span>
                  {["help", "about", "projects", "skills", "dsa", "resume", "contact", "clear"].map((chip) => (
                    <button
                      key={chip}
                      onClick={() => executeCommand(chip)}
                      className="px-2 py-0.5 rounded bg-white/[0.04] hover:bg-emerald-500/20 text-white/60 hover:text-emerald-300 border border-white/[0.08] hover:border-emerald-500/30 transition-all cursor-pointer"
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                {/* Active Command Input Line */}
                <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-2 border-t border-white/[0.08] shrink-0">
                  <span className="text-emerald-400 font-bold text-sm select-none">&gt;</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputCommand}
                    onChange={(e) => setInputCommand(e.target.value)}
                    placeholder="Type a command (try 'projects' or 'skills')..."
                    className="flex-1 bg-transparent text-white font-mono text-xs outline-none placeholder:text-white/20"
                  />
                  <button
                    type="submit"
                    className="p-1 rounded bg-white/[0.06] hover:bg-white/[0.12] text-white/60 hover:text-white transition-colors cursor-pointer"
                    aria-label="Submit command"
                  >
                    <CornerDownLeft size={13} />
                  </button>
                </form>
              </div>
            )}

            {/* TAB 2: SYSTEM TELEMETRY VIEW */}
            {activeTab === "telemetry" && (
              <div className="flex-1 overflow-y-auto p-6 space-y-6 font-mono text-xs bg-[#06060a]">
                <div className="flex items-center gap-2 text-cyan-400 pb-2 border-b border-white/[0.08] font-bold">
                  <Activity size={14} />
                  <span>HARSHITOS KERNEL &middot; LIVE ENVIRONMENT STATUS</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-white/[0.08] bg-black/40 space-y-2">
                    <span className="text-white/40 uppercase tracking-wider text-[10px] block">ENGINEERING CORE</span>
                    <p className="text-white font-bold text-sm">Harshit Saxena</p>
                    <p className="text-white/60">B.Tech Computer Science &amp; Engineering</p>
                    <p className="text-emerald-400">CGPA: 8.12 / 10.0 &middot; Amity University MP</p>
                    <p className="text-white/40">Expected Graduation: June 2028</p>
                  </div>

                  <div className="p-4 rounded-xl border border-white/[0.08] bg-black/40 space-y-2">
                    <span className="text-white/40 uppercase tracking-wider text-[10px] block">RUNTIME &amp; ARCHITECTURE</span>
                    <p className="text-white font-bold text-sm">Next.js 14.2 App Router</p>
                    <p className="text-white/60">React 18 &middot; TypeScript &middot; Tailwind CSS</p>
                    <p className="text-cyan-400">Lenis 1.3 Smooth Scroll &middot; Framer Motion 11</p>
                    <p className="text-white/40">Zero Hydration Errors &middot; 60fps RAF Lerp Loop</p>
                  </div>

                  <div className="p-4 rounded-xl border border-white/[0.08] bg-black/40 space-y-2">
                    <span className="text-white/40 uppercase tracking-wider text-[10px] block">ALGORITHMIC RIGOR</span>
                    <p className="text-white font-bold text-sm">200+ LeetCode Solutions</p>
                    <p className="text-white/60">Primary Language: C++ (STL, Trees, Graphs, DP)</p>
                    <p className="text-purple-400">Contest Participation &amp; Problem Solving</p>
                    <p className="text-white/40">Profile: @harshit_saxena14</p>
                  </div>

                  <div className="p-4 rounded-xl border border-white/[0.08] bg-black/40 space-y-2">
                    <span className="text-white/40 uppercase tracking-wider text-[10px] block">INDUSTRY CERTIFICATIONS</span>
                    <p className="text-white font-bold text-sm">Infosys Springboard AI &amp; DL</p>
                    <p className="text-white/60">Artificial Intelligence Specialization</p>
                    <p className="text-amber-400">Deep Learning &amp; Neural Network Training</p>
                    <p className="text-white/40">Verified Industry Credentials</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-emerald-300">
                  <div className="flex items-center gap-2">
                    <Sparkles size={14} className="text-emerald-400" />
                    <span>Open for Software Engineering Internships &amp; Full-Stack AI Roles</span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="px-3 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedEmail ? <Check size={12} /> : <Copy size={12} />}
                    <span>{copiedEmail ? "COPIED" : "COPY EMAIL"}</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: RESUME QUICKVIEW */}
            {activeTab === "resume" && (
              <div className="flex-1 overflow-y-auto p-6 space-y-6 font-mono text-xs bg-[#06060a]">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2 text-purple-400 font-bold">
                    <FileText size={14} />
                    <span>CURRICULUM VITAE &middot; HARSHIT SAXENA</span>
                  </div>
                  <a
                    href="/Harshit_Saxena_Resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-bold transition-all"
                  >
                    <Download size={12} />
                    <span>DOWNLOAD PDF</span>
                  </a>
                </div>

                <div className="p-6 rounded-2xl border border-white/10 bg-black/60 space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-white">Harshit Saxena</h3>
                    <p className="text-white/60">Gwalior, Madhya Pradesh, India | harshitacademics@gmail.com</p>
                    <p className="text-emerald-400 text-[11px]">B.Tech Computer Science &amp; Engineering (2024 &ndash; 2028)</p>
                  </div>

                  <div className="pt-2 space-y-1.5">
                    <p className="text-white/40 uppercase tracking-widest text-[10px]">CORE PROJECTS</p>
                    <p><strong className="text-white">MindLens</strong>: AI Student Wellbeing Analyzer deployed on Streamlit with sentiment &amp; mood analysis.</p>
                    <p><strong className="text-white">MediFlow</strong>: Healthcare medicine inventory platform featuring emergency pharmacy discovery mode.</p>
                    <p><strong className="text-white">Fashion-MNIST</strong>: Convolutional Neural Network image classifier built with TensorFlow (86% test accuracy).</p>
                  </div>

                  <div className="pt-2 space-y-1.5">
                    <p className="text-white/40 uppercase tracking-widest text-[10px]">SKILLS &amp; TECHNOLOGIES</p>
                    <p className="text-white/80">C++, Python, TypeScript, React 18, Next.js 14, PostgreSQL, Docker, TensorFlow, NLP</p>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Footer Action Bar */}
            <div className="px-4 py-2.5 bg-[#090910] border-t border-white/[0.06] flex items-center justify-between font-mono text-[11px] text-white/40 shrink-0 select-none">
              <div className="flex items-center gap-4">
                <span>HARSHITOS v2.4</span>
                <span>&middot;</span>
                <span className="text-emerald-400">READY</span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/harshitsaxena"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>GITHUB</span>
                  <ExternalLink size={10} />
                </a>
                <span>&middot;</span>
                <a
                  href="https://linkedin.com/in/harshitsaxena"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>LINKEDIN</span>
                  <ExternalLink size={10} />
                </a>
              </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
