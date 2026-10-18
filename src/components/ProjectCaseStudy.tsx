"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Github,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Terminal,
  Layers,
  Cpu,
  CheckCircle2,
  X,
  Sparkles,
} from "lucide-react";
import CardFanCarousel from "@/components/ui/card-fan-carousel";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  architecture: string;
  features: string[];
  challenges: string;
  lessons: string;
  tech: string[];
  accentHue: number;
  liveUrl?: string;
  githubUrl?: string;
}

// ─── Real Authentic Project Data ──────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    id: "mindlens",
    title: "MindLens",
    tagline: "AI Student Wellbeing Analyzer (Deployed)",
    description:
      "Developed and deployed an AI-powered student wellbeing platform featuring sentiment analysis, mood detection, and burnout prediction with an interactive insights dashboard.",
    problem:
      "Students often experience unaddressed burnout and mental strain without early indicators or accessible wellbeing tracking tools.",
    architecture:
      "Streamlit dashboard interface integrated with TensorFlow NLP pipeline for real-time sentiment analysis, mood detection, and predictive burnout scoring.",
    features: [
      "Deployed AI-powered student wellbeing platform",
      "Sentiment analysis & mood detection NLP pipeline",
      "Burnout prediction & trend scoring",
      "Interactive Streamlit dashboard for real-time insights",
    ],
    challenges:
      "Fine-tuning sentiment classification models to accurately capture subtle emotional cues in student self-reported entries.",
    lessons:
      "Effective AI applications require accessible visual feedback. Combining Streamlit with TensorFlow enabled rapid deployment of actionable insights.",
    tech: ["Python", "TensorFlow", "NLP", "Streamlit"],
    accentHue: 160,
    githubUrl: "https://github.com/harshitsaxena",
  },
  {
    id: "harshitos-portfolio",
    title: "HarshitOS Portfolio",
    tagline: "Dark editorial interactive engineer profile",
    description:
      "A high-performance progressive web application showcasing systems engineering, algorithms, and real-time LeetCode profile metrics.",
    problem:
      "Standard template portfolios are static and fail to demonstrate real frontend engineering depth, systems craft, or interactive polish.",
    architecture:
      "Next.js 14 App Router, TypeScript, Framer Motion, and serverless API integration with LeetCode GraphQL API.",
    features: [
      "Terminal boot protocol with reduced motion support",
      "Apple-inspired floating dock navigation",
      "Live LeetCode GraphQL analytics & heatmaps",
      "Command Palette (⌘K) quick navigation",
    ],
    challenges:
      "Building smooth 60 FPS layout transitions while maintaining 100% hydration consistency and zero server-side rendering errors.",
    lessons:
      "Restraint is the hallmark of great design. 70% content hierarchy, 20% interaction motion, and 10% spatial depth creates a lasting impression.",
    tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "GraphQL"],
    accentHue: 45,
    githubUrl: "https://github.com/harshitsaxena",
  },
  {
    id: "sahayak",
    title: "SAHAYAK",
    tagline: "AI Assistance & Accessibility Platform",
    description:
      "An AI assistant platform designed to provide automated query resolution, task guidance, and intelligent workflow support using Natural Language Processing.",
    problem:
      "Users and students often struggle to find immediate, context-aware guidance for technical workflows and academic queries.",
    architecture:
      "Intelligent assistance web application built with Python backend, NLP query parser, and responsive web interface for instant task assistance.",
    features: [
      "AI-powered assistance & query response system",
      "Automated task guidance & workflow support",
      "Natural Language Processing (NLP) integration",
      "Responsive web user interface",
    ],
    challenges:
      "Handling ambiguous user prompts and mapping them efficiently to structured response workflows.",
    lessons:
      "Clear intent classification combined with conversational feedback creates an intuitive user assistance experience.",
    tech: ["Python", "AI/ML", "NLP", "Web Development"],
    accentHue: 210,
    githubUrl: "https://github.com/harshitsaxena",
  },
  {
    id: "mediflow",
    title: "MediFlow",
    tagline: "Medicine Inventory Management Platform (In Progress)",
    description:
      "Healthcare inventory management web application. Emergency Mode assists hospitals in discovering nearby pharmacies with required critical medicines in real time.",
    problem:
      "During critical medical emergencies, hospitals struggle to rapidly verify which nearby pharmacies stock urgent required medicines.",
    architecture:
      "Web application architecture backed by PostgreSQL database. Emergency procurement module matches inventory queries against geolocation data.",
    features: [
      "Real-time healthcare inventory management",
      "Emergency Mode for instant nearby pharmacy medicine discovery",
      "Streamlined hospital procurement workflow",
      "Relational database schema for medicine stock tracking",
    ],
    challenges:
      "Designing an efficient query pattern for rapid emergency lookup across pharmacy inventory databases.",
    lessons:
      "High-availability data design is critical in healthcare tech. Clear data modeling reduces latency when time is essential.",
    tech: ["Python", "Web Development", "Databases", "PostgreSQL"],
    accentHue: 200,
    githubUrl: "https://github.com/harshitsaxena",
  },
  {
    id: "fashion-mnist",
    title: "Fashion-MNIST Image Classifier",
    tagline: "CNN Deep Learning Model",
    description:
      "Built a Convolutional Neural Network (CNN) image classification model using TensorFlow, achieving 86% accuracy in 5 epochs with data preprocessing.",
    problem:
      "Demonstrating computer vision fundamentals and efficient neural network training on image datasets without overfitting.",
    architecture:
      "Multi-layer Convolutional Neural Network (CNN) built with TensorFlow/Keras, incorporating max-pooling, normalization, and Softmax classification.",
    features: [
      "CNN architecture engineered in TensorFlow",
      "86% classification accuracy achieved in 5 epochs",
      "Image normalization & tensor preprocessing pipeline",
      "Feature extraction and evaluation metrics",
    ],
    challenges:
      "Optimizing hyper-parameters and learning rate schedules to maximize accuracy within 5 training epochs.",
    lessons:
      "Data preprocessing and normalization directly impact deep learning model convergence speed and test accuracy.",
    tech: ["Python", "TensorFlow", "CNN", "Deep Learning"],
    accentHue: 270,
    githubUrl: "https://github.com/harshitsaxena",
  },
];

// ─── Spatial Card Position Configurations for Floating Field ─────────────────

const SPATIAL_CONFIGS = [
  {
    // Card 01: MindLens (Featured Hero Anchor Card)
    gridSpan: "lg:col-span-7",
    spatialOffset: "lg:-translate-y-4 lg:translate-x-0",
    floatDuration: 4.8,
    floatDelay: 0,
    depthZ: 15,
  },
  {
    // Card 02: HarshitOS Portfolio (Floating Upper Right Offset)
    gridSpan: "lg:col-span-5",
    spatialOffset: "lg:translate-y-6 lg:translate-x-2",
    floatDuration: 5.4,
    floatDelay: 0.8,
    depthZ: 5,
  },
  {
    // Card 03: SAHAYAK (Floating Mid Left Offset)
    gridSpan: "lg:col-span-5",
    spatialOffset: "lg:translate-y-4 lg:-translate-x-2",
    floatDuration: 4.6,
    floatDelay: 0.4,
    depthZ: -10,
  },
  {
    // Card 04: MediFlow (Wide Center Right Offset)
    gridSpan: "lg:col-span-7",
    spatialOffset: "lg:-translate-y-4 lg:translate-x-3",
    floatDuration: 5.2,
    floatDelay: 1.2,
    depthZ: 20,
  },
  {
    // Card 05: Fashion-MNIST Image Classifier (Full Width Bottom Anchor)
    gridSpan: "lg:col-span-12",
    spatialOffset: "lg:translate-y-4 lg:translate-x-0",
    floatDuration: 5.0,
    floatDelay: 0.6,
    depthZ: 0,
  },
];

// ─── Individual Floating 3D Tilt Card Component ─────────────────────────────

function FloatingSpatialCard({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: (p: Project) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
  const prefersReducedMotion = useReducedMotion();

  const config = SPATIAL_CONFIGS[index % SPATIAL_CONFIGS.length];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rX = ((y - centerY) / centerY) * -5.5; // Max 5.5 deg tilt
    const rY = ((x - centerX) / centerX) * 5.5;
    setRotateX(rX);
    setRotateY(rY);
    setCursorPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setCursorPos({ x: 50, y: 50 });
  };

  return (
    <motion.div
      initial={
        prefersReducedMotion
          ? { opacity: 1 }
          : {
              opacity: 0,
              scale: 0.9,
              y: 45,
            }
      }
      whileInView={
        prefersReducedMotion
          ? { opacity: 1 }
          : {
              opacity: 1,
              scale: 1,
              y: 0,
            }
      }
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.75,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`${config.gridSpan} ${config.spatialOffset} w-full`}
    >
      {/* Gentle Floating Ambient Drift Container */}
      <motion.div
        animate={
          prefersReducedMotion
            ? {}
            : {
                y: [0, -7, 0],
              }
        }
        transition={{
          duration: config.floatDuration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: config.floatDelay,
        }}
      >
        <motion.div
          ref={cardRef}
          layoutId={`project-card-${project.id}`}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => onSelect(project)}
          style={{
            transformStyle: "preserve-3d",
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${rotateX !== 0 ? 16 : config.depthZ}px)`,
          }}
          className="group relative rounded-2xl border border-white/[0.08] hover:border-emerald-500/40 bg-[#09090e]/90 p-7 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/15 backdrop-blur-md overflow-hidden"
        >
          {/* Dynamic Cursor Spotlight Radial Glow */}
          <div
            className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-md -z-10"
            style={{
              background: `radial-gradient(circle at ${cursorPos.x}% ${cursorPos.y}%, hsl(${project.accentHue}, 80%, 55%, 0.25), transparent 65%)`,
            }}
          />

          <div className="space-y-4">
            {/* Top Bar: Index badge & link icons */}
            <div className="flex items-center justify-between font-mono text-xs text-text-muted">
              <span className="text-white/40 group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
                0{index + 1} // SPATIAL NODE
              </span>
              <div className="flex items-center gap-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`GitHub repository for ${project.title}`}
                    className="p-1.5 rounded-md hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                  >
                    <Github size={14} />
                  </a>
                )}
                <span className="p-1.5 rounded-md text-emerald-400 group-hover:scale-110 transition-transform">
                  <ExternalLink size={14} />
                </span>
              </div>
            </div>

            {/* Project Title & Tagline */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: `hsl(${project.accentHue}, 75%, 55%)` }}
                />
                <span className="font-mono text-[11px] text-white/50 uppercase tracking-wider">
                  {project.tagline}
                </span>
              </div>
              <h3 className="text-2xl font-extrabold text-white tracking-tight group-hover:text-emerald-300 transition-colors">
                {project.title}
              </h3>
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans line-clamp-3 font-light">
              {project.description}
            </p>
          </div>

          {/* Tech Tags & Case Study CTA */}
          <div className="pt-6 mt-6 border-t border-white/[0.06] space-y-4">
            <div className="flex flex-wrap gap-1.5">
              {project.tech.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] text-text-muted bg-white/[0.03] border border-white/[0.06] px-2.5 py-0.5 rounded"
                >
                  {t}
                </span>
              ))}
              {project.tech.length > 4 && (
                <span className="font-mono text-[10px] text-emerald-400/90 bg-emerald-950/30 border border-emerald-500/30 px-2 py-0.5 rounded">
                  +{project.tech.length - 4}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between pt-1 font-mono text-[11px]">
              <span className="text-emerald-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1.5 font-semibold">
                <span>EXPLORE CASE STUDY</span>
                <span>&rarr;</span>
              </span>
              <span className="text-white/30 uppercase tracking-wider">CASE STUDY</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProjectCaseStudy() {
  const prefersReducedMotion = useReducedMotion();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
  const headerY = useTransform(smoothScroll, [0, 0.4], [30, 0]);

  const handleSelectProject = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const total = PROJECTS.length;

  const handleNextProject = useCallback(() => {
    if (!selectedProject) return;
    const currentIndex = PROJECTS.findIndex((p) => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % total;
    setSelectedProject(PROJECTS[nextIndex]);
  }, [selectedProject, total]);

  const handlePrevProject = useCallback(() => {
    if (!selectedProject) return;
    const currentIndex = PROJECTS.findIndex((p) => p.id === selectedProject.id);
    const prevIndex = (currentIndex - 1 + total) % total;
    setSelectedProject(PROJECTS[prevIndex]);
  }, [selectedProject, total]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full pt-16 pb-24 md:pt-24 md:pb-36 bg-[#030305] border-b border-white/[0.06] overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div style={{ y: headerY }} className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 text-center sm:text-left">
          <div className="space-y-2">
            <span className="font-mono text-xs text-text-muted tracking-widest block uppercase mb-2">
              // 04. PROJECTS &middot; SPATIAL CARD FAN FIELD
            </span>
            <h2
              id="projects-heading"
              className="text-3xl sm:text-5xl font-black text-white tracking-tighter uppercase"
            >
              Engineering &amp; Systems Showcase
            </h2>
          </div>

          <p className="font-mono text-[11px] text-emerald-400/90 tracking-widest uppercase flex items-center justify-center sm:justify-start gap-2 bg-emerald-950/30 border border-emerald-500/30 px-3 py-1.5 rounded-full shrink-0">
            <Sparkles size={12} className="animate-spin text-emerald-400" />
            HOVER &amp; CLICK ANY CARD FOR CASE STUDY
          </p>
        </motion.div>

        {/* Spatial Card Fan Carousel Component */}
        <CardFanCarousel projects={PROJECTS} onSelectProject={handleSelectProject} />

        {/* Case Study Spatial Focus Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              key="case-study-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-lg flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
              onClick={handleCloseDetail}
            >
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.94, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 24 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#09090e] border border-white/10 rounded-2xl p-6 sm:p-10 space-y-8 shadow-2xl relative select-text"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Top Nav inside modal */}
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-5 sticky top-0 bg-[#09090e]/95 backdrop-blur-md pt-1 z-10">
                  <button
                    onClick={handleCloseDetail}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 bg-emerald-950/30 transition-all cursor-pointer"
                  >
                    <ArrowLeft size={14} />
                    <span>BACK TO PROJECT FIELD</span>
                  </button>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={handlePrevProject}
                      aria-label="Previous project"
                      className="p-1.5 rounded-md border border-white/10 hover:bg-white/10 text-white/70 hover:text-white transition-all cursor-pointer"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className="font-mono text-xs text-text-muted">
                      0{PROJECTS.findIndex((p) => p.id === selectedProject.id) + 1} / 0{total}
                    </span>
                    <button
                      onClick={handleNextProject}
                      aria-label="Next project"
                      className="p-1.5 rounded-md border border-white/10 hover:bg-white/10 text-white/70 hover:text-white transition-all cursor-pointer"
                    >
                      <ChevronRight size={16} />
                    </button>
                    <button
                      onClick={handleCloseDetail}
                      className="p-1.5 rounded-md border border-white/10 hover:bg-white/10 text-white/50 hover:text-white transition-all cursor-pointer"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>

                {/* Header info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: `hsl(${selectedProject.accentHue}, 75%, 55%)` }}
                    />
                    <span className="font-mono text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                      {selectedProject.tagline}
                    </span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    {selectedProject.title}
                  </h3>
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-sans font-light">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Grid Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="p-6 rounded-xl border border-white/[0.08] bg-black/50 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold uppercase tracking-wider">
                      <Terminal size={14} />
                      <span>01 // THE PROBLEM</span>
                    </div>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans font-normal">
                      {selectedProject.problem}
                    </p>
                  </div>

                  <div className="p-6 rounded-xl border border-white/[0.08] bg-black/50 space-y-2">
                    <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider">
                      <Layers size={14} />
                      <span>02 // SYSTEM ARCHITECTURE</span>
                    </div>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans font-normal">
                      {selectedProject.architecture}
                    </p>
                  </div>
                </div>

                {/* Features List */}
                <div className="p-6 rounded-xl border border-white/[0.08] bg-black/50 space-y-4">
                  <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-semibold uppercase tracking-wider">
                    <Cpu size={14} />
                    <span>03 // KEY ENGINEERING FEATURES</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedProject.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-text-secondary font-sans">
                        <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Lessons & Challenges */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-xl border border-white/[0.08] bg-black/50 space-y-2">
                    <span className="font-mono text-xs font-semibold text-amber-400 uppercase tracking-wider block">
                      TECHNICAL CHALLENGES
                    </span>
                    <p className="text-xs text-text-secondary leading-relaxed font-sans">
                      {selectedProject.challenges}
                    </p>
                  </div>

                  <div className="p-5 rounded-xl border border-white/[0.08] bg-black/50 space-y-2">
                    <span className="font-mono text-xs font-semibold text-emerald-400 uppercase tracking-wider block">
                      KEY LESSONS LEARNED
                    </span>
                    <p className="text-xs text-text-secondary leading-relaxed font-sans">
                      {selectedProject.lessons}
                    </p>
                  </div>
                </div>

                {/* Tech Stack & Links */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/[0.08]">
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-xs text-text-secondary bg-white/[0.04] border border-white/10 px-2.5 py-1 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium text-white bg-white/10 hover:bg-white/20 transition-all"
                      >
                        <Github size={14} />
                        <span>SOURCE CODE</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

