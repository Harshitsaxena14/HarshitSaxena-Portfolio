"use client";

import { useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import { User, Camera, ShieldCheck } from "lucide-react";

interface InteractivePortraitCardProps {
  photoUrl?: string;
  className?: string;
}

export default function InteractivePortraitCard({
  photoUrl = "/harshit_photo.jpg",
  className = "",
}: InteractivePortraitCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Normalized motion coordinates (-1 to 1)
  const normX = useMotionValue(0);
  const normY = useMotionValue(0);

  // Hover state motion value (0 = rest, 1 = hovered) for smooth spring interpolation
  const hoverVal = useMotionValue(0);

  // Pixel coordinates relative to card container for cursor spotlight reflection
  const lightPxX = useMotionValue(200);
  const lightPxY = useMotionValue(250);

  // Master Spring Physics configuration (stiffness: 220, damping: 24, mass: 0.35)
  const springConfig = { stiffness: 220, damping: 24, mass: 0.35 };

  // ─── Layer 1: Technical Outer Frame Transforms ──────────────────────────────
  // Top (normY = -1) -> rotateX: +3deg; Bottom (normY = +1) -> rotateX: -3deg
  const frameRotateXRaw = useTransform(normY, [-1, 1], [3, -3]);
  // Left (normX = -1) -> rotateY: -4deg; Right (normX = +1) -> rotateY: +4deg
  const frameRotateYRaw = useTransform(normX, [-1, 1], [-4, 4]);

  const frameRotateX = useSpring(frameRotateXRaw, springConfig);
  const frameRotateY = useSpring(frameRotateYRaw, springConfig);
  const frameTranslateZ = useSpring(useTransform(hoverVal, [0, 1], [0, 10]), springConfig);

  // ─── Layer 2: Main Photo Transforms ───────────────────────────────────────
  // Top (normY = -1) -> rotateX: +7deg, translateY: -10px
  // Bottom (normY = +1) -> rotateX: -7deg, translateY: +10px
  const photoRotateXRaw = useTransform(normY, [-1, 1], [7, -7]);
  const photoTranslateYRaw = useTransform(normY, [-1, 1], [-10, 10]);

  // Left (normX = -1) -> rotateY: -9deg, translateX: -14px
  // Right (normX = +1) -> rotateY: +9deg, translateX: +14px
  const photoRotateYRaw = useTransform(normX, [-1, 1], [-9, 9]);
  const photoTranslateXRaw = useTransform(normX, [-1, 1], [-14, 14]);

  const photoRotateX = useSpring(photoRotateXRaw, springConfig);
  const photoRotateY = useSpring(photoRotateYRaw, springConfig);
  const photoTranslateX = useSpring(photoTranslateXRaw, springConfig);
  const photoTranslateY = useSpring(photoTranslateYRaw, springConfig);

  // Scale: 1.00 at rest -> 1.06 on hover
  const photoScale = useSpring(useTransform(hoverVal, [0, 1], [1.0, 1.06]), springConfig);
  // Depth Z: 15px at rest -> 25px on hover
  const photoTranslateZ = useSpring(useTransform(hoverVal, [0, 1], [15, 25]), springConfig);

  // ─── Layer 3: Light Reflection Radial Gradient ────────────────────────────
  // Continuous MotionTemplate background without React state re-renders
  const lightBg = useMotionTemplate`radial-gradient(circle 300px at ${lightPxX}px ${lightPxY}px, rgba(255, 255, 255, 0.14), transparent 75%)`;
  const lightOpacity = useSpring(useTransform(hoverVal, [0, 1], [0, 1]), springConfig);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current || e.pointerType === "touch") return;
    const rect = containerRef.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const nx = Math.max(-1, Math.min(1, (px / rect.width - 0.5) * 2));
    const ny = Math.max(-1, Math.min(1, (py / rect.height - 0.5) * 2));

    normX.set(nx);
    normY.set(ny);
    lightPxX.set(px);
    lightPxY.set(py);

    if (!isHovered) {
      setIsHovered(true);
      hoverVal.set(1);
    }
  };

  const handlePointerLeave = () => {
    normX.set(0);
    normY.set(0);
    hoverVal.set(0);
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative w-full max-w-[360px] sm:max-w-[400px] lg:max-w-[440px] select-none group cursor-pointer [perspective:1200px] ${className}`}
    >
      {/* Soft Background Ambient Glow */}
      <div className="absolute -inset-6 bg-gradient-to-tr from-emerald-600/20 via-indigo-600/15 to-purple-600/20 rounded-3xl blur-3xl pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-700" />

      {/* LAYER 1: Technical Outer Frame (No overflow-hidden to allow 3D depth pop out) */}
      <motion.div
        style={{
          rotateX: frameRotateX,
          rotateY: frameRotateY,
          z: frameTranslateZ,
          transformStyle: "preserve-3d",
        }}
        className="relative rounded-2xl border border-white/15 bg-[#09090d]/95 p-3.5 shadow-2xl backdrop-blur-xl transition-colors duration-300 group-hover:border-emerald-500/40"
      >
        {/* Corner Technical Crosshairs */}
        <span className="absolute top-2.5 left-2.5 font-mono text-[9px] text-white/30 pointer-events-none">+</span>
        <span className="absolute top-2.5 right-2.5 font-mono text-[9px] text-white/30 pointer-events-none">+</span>
        <span className="absolute bottom-2.5 left-2.5 font-mono text-[9px] text-white/30 pointer-events-none">+</span>
        <span className="absolute bottom-2.5 right-2.5 font-mono text-[9px] text-white/30 pointer-events-none">+</span>

        {/* Top Metadata Inspector Bar */}
        <div className="relative z-10 bg-black/90 rounded-t-xl border border-white/[0.08] overflow-hidden" style={{ transformStyle: "preserve-3d" }}>
          <div className="flex items-center justify-between px-3.5 py-2 bg-[#0d0d12] border-b border-white/[0.06] font-mono text-[10px]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/90 font-semibold tracking-wider uppercase">PORTRAIT // ARCHIVE</span>
            </div>
            <div className="flex items-center gap-2 text-white/40">
              <span className="text-emerald-400 font-bold">001</span>
              <span>[1080 &times; 1350]</span>
            </div>
          </div>

          {/* LAYER 2: Photo Container Frame */}
          <div
            className="relative w-full aspect-[4/5] overflow-hidden bg-[#050508] border-x border-b border-white/[0.08] flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            {!imageError ? (
              <motion.img
                src={photoUrl}
                alt="Harshit Saxena — Interactive 3D Editorial Portrait"
                onError={() => setImageError(true)}
                style={{
                  rotateX: photoRotateX,
                  rotateY: photoRotateY,
                  x: photoTranslateX,
                  y: photoTranslateY,
                  z: photoTranslateZ,
                  scale: photoScale,
                  transformStyle: "preserve-3d",
                }}
                className="w-full h-full object-cover object-center filter grayscale-[0.7] contrast-105 group-hover:grayscale-[0.15] transition-all duration-500"
              />
            ) : (
              /* Fallback Blueprint Frame */
              <motion.div
                style={{
                  rotateX: photoRotateX,
                  rotateY: photoRotateY,
                  x: photoTranslateX,
                  y: photoTranslateY,
                  z: photoTranslateZ,
                  transformStyle: "preserve-3d",
                }}
                className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#0c0c14] via-[#050508] to-black"
              >
                <div className="w-20 h-20 rounded-2xl border border-white/15 bg-white/[0.04] flex items-center justify-center mx-auto mb-3 shadow-inner">
                  <User className="w-10 h-10 text-emerald-400" />
                </div>
                <span className="font-mono text-xs font-bold text-white tracking-widest uppercase block">
                  HARSHIT SAXENA
                </span>
                <span className="text-[11px] text-emerald-400 font-mono pt-1 block uppercase">
                  AI/ML ENTHUSIAST &middot; GWALIOR, MP
                </span>
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] font-mono text-[9px] text-white/50">
                  <Camera className="w-3 h-3 text-cyan-400" />
                  <span>TARGET: /public/harshit_photo.jpg</span>
                </div>
              </motion.div>
            )}

            {/* LAYER 3: Soft Cursor Light Reflection Overlay */}
            <motion.div
              style={{
                background: lightBg,
                opacity: lightOpacity,
                z: 35,
                transformStyle: "preserve-3d",
              }}
              className="absolute inset-0 pointer-events-none z-20"
            />

            {/* Side Floating Inspector Metadata Badges */}
            <div className="absolute right-3 top-3 z-30 space-y-1.5 text-right font-mono text-[9px] pointer-events-none">
              <span className="block px-2 py-0.5 rounded bg-black/80 border border-white/10 text-emerald-400 font-semibold shadow-md uppercase">
                ROLE: AI/ML ENTHUSIAST
              </span>
              <span className="block px-2 py-0.5 rounded bg-black/80 border border-white/10 text-white/70 shadow-md uppercase">
                FOCUS: AI/ML &middot; SOFTWARE
              </span>
              <span className="block px-2 py-0.5 rounded bg-black/80 border border-white/10 text-cyan-400 shadow-md uppercase">
                STATUS: BUILDING
              </span>
            </div>

            {/* Gradient Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none z-10" />
          </div>

          {/* Bottom Metadata Anchor */}
          <div className="p-3 bg-[#09090e] border-t border-white/[0.08] flex flex-col gap-0.5 text-left font-mono">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white tracking-wider uppercase flex items-center gap-1.5">
                <ShieldCheck size={12} className="text-emerald-400" />
                HARSHIT SAXENA
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <span className="text-[10px] font-semibold text-emerald-400/90 tracking-tight uppercase">
              AI/ML ENTHUSIAST &middot; COMPUTER SCIENCE UNDERGRADUATE
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
