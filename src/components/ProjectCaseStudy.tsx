"use client";

import { useState, useCallback, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Github,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import CardFanCarousel from "@/components/ui/card-fan-carousel";
import CaseStudyWorkspace from "@/components/case-study/CaseStudyWorkspace";
import { Project } from "@/types/caseStudy";
import { PROJECTS } from "@/data/projectsData";

export type { Project };

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
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(project);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    onSelect(project);
                  }
                }}
                aria-label={`Explore Case Study for ${project.title}`}
                className="text-emerald-400 group-hover:text-emerald-300 group-hover:translate-x-1 transition-all inline-flex items-center gap-1.5 font-bold focus:outline-none focus:ring-1 focus:ring-emerald-400/60 rounded px-1 -mx-1 cursor-pointer"
              >
                <span>Explore Case Study</span>
                <span className="text-xs font-bold leading-none">&nearr;</span>
              </button>
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

        {/* Full-Screen Four-Tab Interactive Case Study Workspace Overlay */}
        <CaseStudyWorkspace
          project={selectedProject}
          projects={PROJECTS}
          onClose={handleCloseDetail}
          onSelectProject={handleSelectProject}
        />
      </div>
    </section>
  );
}

