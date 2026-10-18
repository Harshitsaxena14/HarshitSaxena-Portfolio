"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { Github, ExternalLink, Sparkles, ArrowRight } from "lucide-react";
import { Project } from "@/components/ProjectCaseStudy";

interface CardFanCarouselProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

const MAX_VISIBLE = 7;
const HALF = 3;

const FAN_POSITIONS = [
  { rot: -21, scale: 0.7756, x: -30, y: 7.3, zIndex: 1 },
  { rot: -14, scale: 0.8498, x: -22, y: 4.0, zIndex: 2 },
  { rot: -7,  scale: 0.9346, x: -11, y: 1.3, zIndex: 3 },
  { rot: 0,   scale: 1.0,    x: 0,   y: 0.0, zIndex: 10 },
  { rot: 7,   scale: 0.9346, x: 11,  y: 1.3, zIndex: 3 },
  { rot: 14,  scale: 0.8498, x: 22,  y: 4.0, zIndex: 2 },
  { rot: 21,  scale: 0.7756, x: 30,  y: 7.3, zIndex: 1 },
];

function getResponsiveMultiplier(width: number) {
  if (width < 480) return 0.28;
  if (width < 640) return 0.38;
  if (width < 768) return 0.52;
  if (width < 1024) return 0.76;
  return 1.0;
}

function getHeightMultiplier(width: number) {
  let idealPx: number;
  if (width < 480) idealPx = 22 * 16;
  else if (width < 640) idealPx = 26 * 16;
  else if (width < 768) idealPx = 28 * 16;
  else if (width < 1024) idealPx = 34 * 16;
  else idealPx = 38 * 16;

  if (typeof window === "undefined") return 1;
  const available = window.innerHeight * 0.7;
  if (available >= idealPx) return 1;
  return Math.max(0.65, available / idealPx);
}

function getSlotConfig(totalCards: number, slot: number) {
  if (totalCards >= MAX_VISIBLE) return FAN_POSITIONS[slot];
  const center = totalCards >> 1;
  const distance = totalCards > 1 ? (slot - center) / center : 0;
  const absDistance = Math.abs(distance);
  return {
    rot: distance * 21,
    scale: 1.0 - 0.2244 * absDistance * absDistance,
    x: distance * 30,
    y: absDistance * absDistance * 7.3,
    zIndex: 10 - Math.abs(slot - center),
  };
}

const ARROW_CLASSES =
  "relative flex items-center justify-center rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-white/60 cursor-pointer shrink-0 z-30 outline-none shadow-2xl hover:border-emerald-500/50 hover:text-emerald-400 active:scale-95 transition-all duration-300";

export default function CardFanCarousel({ projects, onSelectProject }: CardFanCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const hasEntered = useRef(false);
  const directionRef = useRef<"left" | "right" | null>(null);
  const prevVisible = useRef<Set<number>>(new Set());

  const totalCards = projects.length;
  const needsPagination = totalCards > MAX_VISIBLE;
  const featuredIndex = projects.findIndex((p) => p.isFeatured);
  const [centerIndex, setCenterIndex] = useState(
    featuredIndex !== -1 ? featuredIndex : needsPagination ? HALF : totalCards >> 1
  );

  const getVisibleMap = useCallback(
    (center: number) => {
      const map = new Map<number, number>();
      if (!needsPagination) {
        projects.forEach((_, i) => map.set(i, i));
        return map;
      }
      for (let slot = 0; slot < MAX_VISIBLE; slot++) {
        map.set(((center + slot - HALF) % totalCards + totalCards) % totalCards, slot);
      }
      return map;
    },
    [totalCards, needsPagination, projects]
  );

  const cycle = useCallback(
    (direction: "left" | "right") => {
      if (isAnimating.current || !needsPagination) return;
      isAnimating.current = true;
      directionRef.current = direction;
      setCenterIndex((prev) =>
        direction === "right" ? (prev + 1) % totalCards : (prev - 1 + totalCards) % totalCards
      );
    },
    [totalCards, needsPagination]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !totalCards) return;

    const cardElements = Array.from(container.querySelectorAll<HTMLElement>(".fan-card"));
    if (!cardElements.length) return;

    const visibleMap = getVisibleMap(centerIndex);
    const previouslyVisible = prevVisible.current;
    const direction = directionRef.current;
    const isFirstMount = !hasEntered.current;
    const multiplier = getResponsiveMultiplier(window.innerWidth);
    const hMult = getHeightMultiplier(window.innerWidth);
    const slotCount = needsPagination ? MAX_VISIBLE : totalCards;
    const config = (slot: number) => getSlotConfig(slotCount, slot);

    if (isFirstMount) isAnimating.current = true;

    let completedCount = 0;
    const visibleCount = visibleMap.size;
    const onCardDone = () => {
      if (++completedCount >= visibleCount) {
        isAnimating.current = false;
        if (isFirstMount) hasEntered.current = true;
      }
    };

    cardElements.forEach((card, cardIndex) => {
      const slot = visibleMap.get(cardIndex);
      const wasVisible = previouslyVisible.has(cardIndex);

      if (slot !== undefined) {
        const { x, y, rot, scale, zIndex } = config(slot);
        const target = {
          x: `${x * multiplier}rem`,
          y: `${y * hMult}rem`,
          rotation: rot,
          scale,
          opacity: 1,
          zIndex,
        };

        if (isFirstMount) {
          gsap.set(card, { x: 0, y: `${12 * hMult}rem`, rotation: 0, scale: 0.5, opacity: 0 });
          gsap.to(card, {
            ...target,
            duration: 1.2,
            ease: "elastic.out(1.05, .78)",
            delay: 0.15 + slot * 0.07,
            onComplete: onCardDone,
          });
        } else if (!wasVisible) {
          const enterX = direction === "right" ? 40 : -40;
          gsap.set(card, {
            x: `${enterX}rem`,
            y: `${y * hMult}rem`,
            rotation: direction === "right" ? 30 : -30,
            scale: 0.5,
            opacity: 0,
          });
          gsap.to(card, { ...target, duration: 0.6, ease: "power2.out", onComplete: onCardDone });
        } else {
          gsap.to(card, { ...target, duration: 0.5, ease: "power2.out", onComplete: onCardDone });
        }
      } else if (wasVisible) {
        const exitX = direction === "right" ? -40 : 40;
        gsap.to(card, {
          x: `${exitX}rem`,
          opacity: 0,
          scale: 0.5,
          rotation: direction === "right" ? -30 : 30,
          duration: 0.4,
          ease: "power2.in",
          zIndex: 0,
        });
      } else if (isFirstMount) {
        gsap.set(card, { opacity: 0, scale: 0.3, x: 0, y: 0, zIndex: 0 });
      }
    });

    prevVisible.current = new Set(visibleMap.keys());

    // Hover interactions & Neighbor displacement
    const visibleEntries: { el: HTMLElement; slot: number }[] = [];
    cardElements.forEach((el, i) => {
      const slot = visibleMap.get(i);
      if (slot !== undefined) visibleEntries.push({ el, slot });
    });
    visibleEntries.sort((a, b) => a.slot - b.slot);

    let activeSlot: number | null = null;
    let leaveTimer: NodeJS.Timeout | null = null;
    const centerSlot = visibleEntries.length >> 1;

    const updateHoverLayout = (hoveredSlot: number | null) => {
      const mult = getResponsiveMultiplier(window.innerWidth);
      const hM = getHeightMultiplier(window.innerWidth);

      visibleEntries.forEach(({ el, slot }) => {
        const base = config(slot);
        let targetX = base.x * mult;
        let targetY = base.y * hM;
        let targetRot = base.rot;
        let targetScale = base.scale;
        let delay = 0;

        if (hoveredSlot !== null) {
          const distance = Math.abs(slot - hoveredSlot);
          delay = distance * 0.02;

          if (slot === hoveredSlot) {
            targetY -= 2.5 * hM;
            targetScale *= 1.08;
          } else {
            const normalized = centerSlot > 0 ? (slot - centerSlot) / centerSlot : 0;
            const pushStrength =
              8 * (1 - Math.abs(normalized)) * (1 + 0.2 * Math.max(0, 3 - distance));

            if (slot < hoveredSlot) {
              targetX -= pushStrength * mult;
              targetRot -= 3 / (distance + 1);
            } else {
              targetX += pushStrength * mult;
              targetRot += 3 / (distance + 1);
            }

            if (slot === visibleEntries.length - 1 && hoveredSlot < centerSlot) targetY -= 1 * hM;
            if (slot === 0 && hoveredSlot > centerSlot) targetY -= 1 * hM;
          }
        } else {
          delay = Math.abs(slot - centerSlot) * 0.02;
        }

        gsap.to(el, {
          x: `${targetX}rem`,
          y: `${targetY}rem`,
          rotation: targetRot,
          scale: targetScale,
          duration: 0.5,
          delay,
          ease: "elastic.out(1, .75)",
          overwrite: "auto",
        });
        gsap.set(el, { zIndex: hoveredSlot === slot ? 25 : base.zIndex });
      });
    };

    const enterHandlers = visibleEntries.map(({ el, slot }) => {
      const handler = () => {
        if (isAnimating.current) return;
        if (leaveTimer) {
          clearTimeout(leaveTimer);
          leaveTimer = null;
        }
        if (activeSlot !== slot) {
          activeSlot = slot;
          updateHoverLayout(slot);
        }
      };
      el.addEventListener("mouseenter", handler);
      return { el, handler };
    });

    const onMouseLeave = () => {
      if (isAnimating.current) return;
      if (leaveTimer) clearTimeout(leaveTimer);
      leaveTimer = setTimeout(() => {
        activeSlot = null;
        updateHoverLayout(null);
      }, 50);
    };
    container.addEventListener("mouseleave", onMouseLeave);

    const onResize = () => {
      if (!isAnimating.current) updateHoverLayout(activeSlot);
    };
    window.addEventListener("resize", onResize);

    return () => {
      enterHandlers.forEach(({ el, handler }) => el.removeEventListener("mouseenter", handler));
      container.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
      if (leaveTimer) clearTimeout(leaveTimer);
    };
  }, [centerIndex, totalCards, getVisibleMap, needsPagination]);

  // Pointer-driven 3D Tilt calculation
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rX = ((y - centerY) / centerY) * -4.5;
    const rY = ((x - centerX) / centerX) * 4.5;
    gsap.to(card, {
      rotateX: rX,
      rotateY: rY,
      duration: 0.2,
      ease: "power1.out",
    });
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  if (!totalCards) return null;

  const chevron = (direction: "left" | "right") => (
    <svg
      className="relative z-[2] w-4 h-4 md:w-5 md:h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points={direction === "left" ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
    </svg>
  );

  return (
    <section className="flex flex-col items-center w-full py-6 lg:py-12 px-4 md:px-8 relative z-20 overflow-visible">
      <div className="flex items-center justify-center w-full max-w-[90rem]">
        <div
          ref={containerRef}
          className="fan-layout flex relative justify-center items-center w-full min-h-[440px] sm:min-h-[500px] md:min-h-[560px] perspective-[1200px]"
        >
          {projects.map((project, index) => {
            const accentColor = `hsl(${project.accentHue}, 80%, 55%)`;

            return (
              <div
                key={project.id}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                onClick={() => onSelectProject(project)}
                className={`fan-card absolute w-[290px] sm:w-[340px] md:w-[380px] rounded-2xl border ${
                  project.isFeatured
                    ? "border-purple-500/50 hover:border-purple-400 bg-[#0c0914]/95 shadow-[0_0_35px_rgba(168,85,247,0.25)]"
                    : "border-white/10 hover:border-emerald-500/50 bg-[#09090e]/95"
                } p-6 sm:p-7 flex flex-col justify-between cursor-pointer transition-colors duration-300 shadow-2xl backdrop-blur-xl group select-none overflow-hidden`}
                style={{
                  transformStyle: "preserve-3d",
                  boxShadow: project.isFeatured
                    ? `0 24px 60px rgba(0,0,0,0.8), 0 0 40px rgba(168,85,247,0.3)`
                    : `0 20px 50px rgba(0,0,0,0.7), 0 0 30px ${accentColor}15`,
                }}
              >
                {/* Background Ambient Radial Glow */}
                <div
                  className="absolute inset-0 opacity-15 group-hover:opacity-35 transition-opacity duration-500 pointer-events-none -z-10"
                  style={{
                    background: `radial-gradient(circle at 50% 20%, ${accentColor}, transparent 70%)`,
                  }}
                />

                <div className="space-y-4">
                  {/* Top Bar: Index badge, Featured tag & links */}
                  <div className="flex items-center justify-between font-mono text-xs">
                    <div className="flex items-center gap-2">
                      {project.isFeatured && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center gap-1 shadow-sm">
                          <Sparkles size={9} className="text-purple-300 animate-pulse" />
                          FLAGSHIP
                        </span>
                      )}
                      <span className="text-white/40 group-hover:text-emerald-400 transition-colors flex items-center gap-1.5 font-semibold">
                        <span
                          className="w-2 h-2 rounded-full animate-pulse"
                          style={{ backgroundColor: accentColor }}
                        />
                        0{index + 1} // PROJECT
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`GitHub repository for ${project.title}`}
                          className="p-1.5 rounded-md hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                        >
                          <Github size={14} />
                        </a>
                      )}
                      <span className="p-1.5 rounded-md text-emerald-400 group-hover:scale-110 transition-transform">
                        <ExternalLink size={14} />
                      </span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div className="space-y-1.5">
                    <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest block">
                      {project.tagline}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight group-hover:text-emerald-300 transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-text-secondary leading-relaxed font-sans line-clamp-3 font-light">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack & Action CTA */}
                <div className="pt-5 mt-5 border-t border-white/[0.08] space-y-4">
                  <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                    {project.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="text-white/70 bg-black/60 border border-white/10 px-2.5 py-0.5 rounded"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded font-semibold">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between font-mono text-[11px] pt-1">
                    <span className="text-emerald-400 group-hover:translate-x-1.5 transition-transform inline-flex items-center gap-1.5 font-bold">
                      <span>CASE STUDY</span>
                      <ArrowRight size={12} />
                    </span>
                    <span className="text-white/30 uppercase tracking-wider text-[9px] flex items-center gap-1">
                      <Sparkles size={10} className="text-emerald-400" />
                      INTERACTIVE
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {needsPagination && (
        <div className="flex items-center justify-center gap-4 mt-8 z-30">
          <button
            className={`${ARROW_CLASSES} w-10 h-10 md:w-12 md:h-12`}
            onClick={() => cycle("left")}
            aria-label="Previous Project"
          >
            {chevron("left")}
          </button>
          <div className="flex items-center gap-2">
            {projects.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === centerIndex
                    ? "bg-emerald-400 scale-[1.4] shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                    : "bg-white/20"
                }`}
              />
            ))}
          </div>
          <button
            className={`${ARROW_CLASSES} w-10 h-10 md:w-12 md:h-12`}
            onClick={() => cycle("right")}
            aria-label="Next Project"
          >
            {chevron("right")}
          </button>
        </div>
      )}
    </section>
  );
}
