"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import { ArrowRight, User, Camera, ShieldCheck, Sparkles } from "lucide-react";

interface CinematicIntroProps {
  onComplete: () => void;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const prefersReducedMotion = useReducedMotion();
  const introContainerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  const [imageError, setImageError] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleButtonMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.35;
    const dy = (e.clientY - cy) * 0.35;
    const rX = ((e.clientY - cy) / (rect.height / 2)) * -6;
    const rY = ((e.clientX - cx) / (rect.width / 2)) * 6;

    gsap.to(buttonRef.current, {
      x: dx,
      y: dy,
      rotateX: rX,
      rotateY: rY,
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleButtonMouseLeave = () => {
    if (!buttonRef.current) return;
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)",
    });
  };

  // Spatial Portrait Mouse Tilt
  const handlePortraitMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !portraitRef.current) return;
    const rect = portraitRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rX = ((e.clientY - cy) / (rect.height / 2)) * -5;
    const rY = ((e.clientX - cx) / (rect.width / 2)) * 5;

    gsap.to(portraitRef.current, {
      rotateX: rX,
      rotateY: rY,
      duration: 0.4,
      ease: "power1.out",
    });
  };

  const handlePortraitMouseLeave = () => {
    if (!portraitRef.current) return;
    gsap.to(portraitRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  // Trigger Phase 3 Camera Fly-through Transition into Hero
  const handleEnter = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const container = introContainerRef.current;
    if (container) {
      gsap.to(container, {
        scale: 0.92,
        opacity: 0,
        y: -60,
        duration: 0.8,
        ease: "power3.inOut",
        onComplete: () => {
          onComplete();
        },
      });
    } else {
      onComplete();
    }
  }, [isTransitioning, onComplete, prefersReducedMotion]);

  // Optional keypress (Enter / Space) or wheel scroll to enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        handleEnter();
      }
    };
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 20) {
        handleEnter();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [handleEnter]);

  return (
    <div
      ref={introContainerRef}
      className="fixed inset-0 z-[90] bg-[#030305] text-white flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden select-none"
    >
      {/* Ambient Background Radial Glow & Technical Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(circle at 75% 30%, rgba(16, 185, 129, 0.15), transparent 50%), radial-gradient(circle at 25% 75%, rgba(56, 189, 248, 0.12), transparent 50%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Top Bar: Identity & Status Pills */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-white font-bold tracking-widest uppercase">
            HARSHIT SAXENA &middot; CINEMATIC EXPERIENCE
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-white/70 font-mono text-[11px]">
            GWALIOR [UTC +5:30]
          </span>
          <span className="px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/30 text-emerald-400 font-mono text-[11px] font-semibold">
            STATUS: OPEN FOR INTERNSHIPS
          </span>
        </div>
      </div>

      {/* Center Layout: Giant Editorial Headline Left + Spatial Portrait Right */}
      <div className="relative z-10 my-auto max-w-[1240px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-6">
        
        {/* Left Column: Giant Editorial Typography & Pillars */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="font-mono text-xs text-emerald-400 tracking-widest uppercase block flex items-center gap-2">
              <Sparkles size={12} className="text-emerald-400" />
              // INTRODUCING THE DEVELOPER
            </span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl sm:text-8xl lg:text-[110px] font-black text-white tracking-tighter leading-[0.85] uppercase"
            >
              HARSHIT
              <br />
              <span className="text-emerald-400">SAXENA</span>
            </motion.h1>
          </div>

          {/* Identity Pillars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-sm sm:text-lg lg:text-xl font-extrabold text-white/90 tracking-tight uppercase flex flex-wrap items-center gap-x-3 gap-y-1.5"
          >
            <span className="text-emerald-400">SOFTWARE ENGINEERING STUDENT</span>
            <span className="text-white/20">&middot;</span>
            <span>PROBLEM SOLVER</span>
            <span className="text-white/20">&middot;</span>
            <span className="text-cyan-400">BUILDER</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xs sm:text-sm text-text-secondary max-w-xl font-sans leading-relaxed font-light"
          >
            Architecting MindLens (AI Wellbeing Analyzer), MediFlow (Emergency Healthcare Platform), and solving 200+ LeetCode algorithms. Computer Science &amp; Engineering Class of 2028.
          </motion.p>

          {/* Magnetic Primary Action Button: ENTER EXPERIENCE → */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="pt-2"
          >
            <button
              ref={buttonRef}
              onMouseMove={handleButtonMouseMove}
              onMouseLeave={handleButtonMouseLeave}
              onClick={handleEnter}
              className="relative inline-flex items-center gap-4 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-mono text-sm font-black tracking-wider uppercase shadow-[0_0_40px_rgba(16,185,129,0.4)] hover:shadow-[0_0_60px_rgba(16,185,129,0.7)] transition-shadow cursor-pointer group"
              style={{ transformStyle: "preserve-3d" }}
            >
              <span>ENTER EXPERIENCE</span>
              <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Right Column: Spatial Editorial Portrait Frame (/harshit_photo.jpg) */}
        <div className="lg:col-span-5 flex justify-center">
          <div
            ref={portraitRef}
            onMouseMove={handlePortraitMouseMove}
            onMouseLeave={handlePortraitMouseLeave}
            className="relative w-full max-w-[340px] sm:max-w-[380px] perspective-[1000px]"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Ambient Background Glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/25 via-cyan-500/20 to-purple-500/25 rounded-3xl blur-2xl pointer-events-none opacity-80" />

            {/* Outer Technical Glass Frame */}
            <div className="relative rounded-2xl border border-white/15 bg-[#09090d]/95 p-3 shadow-2xl overflow-hidden group backdrop-blur-xl">
              
              {/* Header Inspector */}
              <div className="flex items-center justify-between px-3.5 py-2 bg-black/90 rounded-t-xl border border-white/[0.08] font-mono text-[10px] text-text-muted">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white font-semibold tracking-wider">PORTRAIT // ARCHIVE</span>
                </div>
                <span className="text-white/40">[1080 &times; 1350]</span>
              </div>

              {/* Photo Reveal Slot */}
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#050508] rounded-b-xl border-x border-b border-white/[0.08] flex items-center justify-center">
                {!imageError ? (
                  <Image
                    src="/harshit_photo.jpg"
                    alt="Harshit Saxena — Professional Portrait"
                    fill
                    sizes="(max-width: 768px) 100vw, 380px"
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover object-center filter grayscale contrast-105 group-hover:grayscale-0 transition-all duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#0c0c14] to-black">
                    <div className="w-20 h-20 rounded-2xl border border-white/15 bg-white/[0.04] flex items-center justify-center mx-auto mb-3">
                      <User className="w-10 h-10 text-emerald-400" />
                    </div>
                    <span className="font-mono text-xs font-bold text-white tracking-widest uppercase block">
                      HARSHIT SAXENA
                    </span>
                    <span className="text-[11px] text-emerald-400 font-mono pt-1">
                      CS ENGINEER &middot; GWALIOR
                    </span>
                  </div>
                )}

                {/* Subtle Gradient Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
              </div>

              {/* Bottom Metadata Caption */}
              <div className="p-3 bg-[#0a0a0f] border-t border-white/[0.06] flex items-center justify-between font-mono text-[10px] text-text-muted mt-2 rounded-xl">
                <span className="text-white/70 flex items-center gap-1.5">
                  <ShieldCheck size={12} className="text-emerald-400" />
                  HARSHIT SAXENA
                </span>
                <span className="text-white/40">CS &middot; CLASS OF &apos;28</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Footer Indicator Bar */}
      <div className="relative z-10 flex items-center justify-between border-t border-white/[0.08] pt-4 font-mono text-[11px] text-white/40 tracking-widest uppercase">
        <div className="flex items-center gap-2">
          <span className="text-emerald-400">&darr;</span>
          <span>CLICK ENTER OR SCROLL TO FLY THROUGH TO PORTFOLIO</span>
        </div>
        <span>PHASE 02 // 04</span>
      </div>
    </div>
  );
}
