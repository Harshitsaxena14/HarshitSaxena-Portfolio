"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  motion,
  useReducedMotion,
  LayoutGroup,
  useMotionValue,
  animate,
} from "framer-motion";
import {
  Home,
  User,
  Milestone,
  FolderGit2,
  Trophy,
  Cpu,
  Send,
  LucideIcon,
} from "lucide-react";
import CommandPalette from "./CommandPalette";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
}

// ─── Nav items with Icons ──────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  { id: "home",       label: "Home",       href: "#",           icon: Home       },
  { id: "profile",    label: "About",      href: "#about",      icon: User       },
  { id: "experience", label: "Journey",    href: "#experience", icon: Milestone  },
  { id: "work",       label: "Projects",   href: "#projects",   icon: FolderGit2 },
  { id: "leetcode",   label: "DSA",        href: "#leetcode",   icon: Trophy     },
  { id: "skills",     label: "Stack",      href: "#skills",     icon: Cpu        },
  { id: "connect",    label: "Contact",    href: "#contact",    icon: Send       },
];

// ─── macOS Dock Proximity NavItem Component ───────────────────────────────────

interface NavItemProps {
  item: NavItem;
  isActive: boolean;
  mouseXRef: React.MutableRefObject<number>;
  onHoverStart: (el: HTMLElement) => void;
  onClick: (href: string) => void;
}

function DockNavItemButton({
  item,
  isActive,
  mouseXRef,
  onHoverStart,
  onClick,
}: NavItemProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const Icon = item.icon;

  // 60fps RAF lerp loop with direct DOM transform updates (zero React state overhead)
  useEffect(() => {
    let animFrameId: number;
    let currentScale = 1;
    let currentY = 0;
    let currentIconScale = 1;

    const render = () => {
      if (ref.current) {
        const mx = mouseXRef.current;
        let targetScale = 1;
        let targetY = 0;
        let targetIconScale = 1;
        let targetOpacity = isActive ? 1 : 0.65;

        if (mx !== Infinity) {
          const rect = ref.current.getBoundingClientRect();
          if (rect.width > 0) {
            const itemCenterX = rect.left + rect.width / 2;
            const dx = Math.abs(mx - itemCenterX);
            const radius = 145; // macOS Dock proximity influence radius

            if (dx < radius) {
              const rawInfluence = 1 - dx / radius;
              const influence = Math.pow(rawInfluence, 1.4); // Physical cosine curve

              targetScale = 1 + influence * 0.22; // 1.00 -> 1.22 max under cursor
              targetY = -influence * 4.5; // 0px -> -4.5px vertical lift
              targetIconScale = 1 + influence * 0.35; // Icon grows 15px -> 20.25px
              targetOpacity = isActive ? 1 : 0.65 + influence * 0.33;
            }
          }
        }

        // Physical spring lerp smoothing (stiffness: 0.22)
        currentScale += (targetScale - currentScale) * 0.22;
        currentY += (targetY - currentY) * 0.22;
        currentIconScale += (targetIconScale - currentIconScale) * 0.22;

        ref.current.style.transform = `translateY(${currentY.toFixed(2)}px) scale(${currentScale.toFixed(3)})`;
        ref.current.style.opacity = targetOpacity.toFixed(2);

        if (iconRef.current) {
          iconRef.current.style.transform = `scale(${currentIconScale.toFixed(3)})`;
        }
      }

      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animFrameId);
  }, [isActive, mouseXRef]);

  return (
    <a
      ref={ref}
      href={item.href}
      onClick={(e) => {
        e.preventDefault();
        onClick(item.href);
      }}
      onMouseEnter={() => {
        if (ref.current) onHoverStart(ref.current);
      }}
      style={{
        fontFamily: "var(--font-inter)",
        opacity: isActive ? 1 : 0.65,
        willChange: "transform, opacity",
      }}
      className="group relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent select-none shrink-0"
      aria-current={isActive ? "page" : undefined}
    >
      {/* Active sliding glass pill */}
      {isActive && (
        <motion.span
          layoutId="nav-active-pill"
          className="absolute inset-0 rounded-full bg-white/[0.12] border border-white/[0.10] shadow-[0_2px_12px_rgba(255,255,255,0.06)]"
          transition={{ type: "spring", stiffness: 400, damping: 32, mass: 0.7 }}
        />
      )}

      {/* Dock Magnifying Icon */}
      <span
        ref={iconRef}
        style={{ willChange: "transform" }}
        className="relative z-10 text-white/80 group-hover:text-white shrink-0 origin-center flex items-center justify-center"
      >
        <Icon size={15} />
      </span>

      {/* Label Text */}
      <span
        className={`relative z-10 transition-colors duration-150 ${
          isActive ? "text-white font-semibold" : "text-white/70 group-hover:text-white"
        }`}
      >
        {item.label}
      </span>
    </a>
  );
}

// ─── Main Navbar Component ───────────────────────────────────────────────────

export default function Navbar({ isBooting = false }: { isBooting?: boolean }) {
  const [isPaletteOpen, setIsPaletteOpen]   = useState(false);
  const [scrolled, setScrolled]             = useState(false);
  const [activeSection, setActiveSection]   = useState<string>("home");
  const prefersReducedMotion                = useReducedMotion();

  // Mouse ClientX ref for 60fps continuous Dock proximity field (zero React re-render overhead)
  const mouseXRef = useRef<number>(Infinity);
  const lightX = useMotionValue(0);
  const lightY = useMotionValue(0);
  const lightOpacity = useMotionValue(0);

  const navIslandRef = useRef<HTMLElement>(null);
  const navGroupRef = useRef<HTMLDivElement>(null);

  // Shared hover pill MotionValues
  const pillLeft    = useMotionValue(0);
  const pillWidth   = useMotionValue(0);
  const pillOpacity = useMotionValue(0);

  const handleHoverStart = useCallback((el: HTMLElement) => {
    const container = navGroupRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const itemRect      = el.getBoundingClientRect();
    const targetLeft    = itemRect.left - containerRect.left;
    const targetWidth   = itemRect.width;

    const isVisible = pillOpacity.get() > 0.01;

    if (!isVisible) {
      pillLeft.set(targetLeft);
      pillWidth.set(targetWidth);
      animate(pillOpacity, 1, { duration: 0.12, ease: "easeOut" });
    } else {
      animate(pillLeft,  targetLeft,  { type: "spring", stiffness: 380, damping: 30, mass: 0.7 });
      animate(pillWidth, targetWidth, { type: "spring", stiffness: 380, damping: 30, mass: 0.7 });
    }
  }, [pillLeft, pillWidth, pillOpacity]);

  const handleHoverEnd = useCallback(() => {
    animate(pillOpacity, 0, { duration: 0.2, ease: "easeOut" });
  }, [pillOpacity]);

  const handleClosePalette = useCallback(() => setIsPaletteOpen(false), []);

  // Global Pointer Tracking for macOS Dock Proximity Field
  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      if (e.clientY <= 250) {
        mouseXRef.current = e.clientX;
        if (navIslandRef.current) {
          const rect = navIslandRef.current.getBoundingClientRect();
          lightX.set(e.clientX - rect.left);
          lightY.set(e.clientY - rect.top);
          lightOpacity.set(1);
        }
      } else if (mouseXRef.current !== Infinity) {
        mouseXRef.current = Infinity;
        lightOpacity.set(0);
      }
    };

    const onPointerLeave = () => {
      mouseXRef.current = Infinity;
      lightOpacity.set(0);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [lightX, lightY, lightOpacity]);

  // Scroll detection for navbar background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Global ⌘K / Ctrl+K shortcut
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY < 80) setActiveSection("home");
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const sectionMap: Record<string, string> = {
      about:      "profile",
      experience: "experience",
      projects:   "work",
      leetcode:   "leetcode",
      skills:     "skills",
      contact:    "connect",
    };

    const observers: IntersectionObserver[] = [];

    Object.entries(sectionMap).forEach(([sectionId, navId]) => {
      const el = document.getElementById(sectionId);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(navId);
        },
        { rootMargin: "-80px 0px -45% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  const handleNavClick = useCallback((href: string) => {
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
      setActiveSection("home");
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
    }
  }, [prefersReducedMotion]);

  // Glassmorphism island styles
  const islandBase =
    "border border-white/[0.08] rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md";

  const islandBg = scrolled
    ? "bg-[rgba(12,12,12,0.88)]"
    : "bg-[rgba(12,12,12,0.72)]";

  return (
    <>
      {/* ── Floating island wrapper ─────────────────────────────────────── */}
      <motion.header
        className="fixed top-4 inset-x-0 z-50 flex justify-center pointer-events-none"
        role="banner"
        initial={{ y: 0, opacity: 1, scale: 1 }}
        animate={{
          y: isBooting ? -40 : 0,
          opacity: isBooting ? 0 : 1,
          scale: isBooting ? 0.96 : 1,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 26, mass: 0.8 }}
      >
        <motion.nav
          ref={navIslandRef}
          className={`pointer-events-auto relative flex items-center gap-1 px-3 py-1.5 ${islandBase} ${islandBg}`}
          aria-label="Primary navigation"
          initial={false}
          animate={{
            boxShadow: scrolled
              ? "0 8px 40px rgba(0,0,0,0.65), 0 0 0 0.5px rgba(255,255,255,0.04)"
              : "0 8px 32px rgba(0,0,0,0.45)",
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Subtle cursor-following radial spotlight light */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300 z-0 overflow-hidden"
            style={{
              background: `radial-gradient(130px circle at ${lightX.get()}px ${lightY.get()}px, rgba(255,255,255,0.07), transparent 75%)`,
              opacity: lightOpacity,
            }}
          />

          {/* ── Left: ◉ HarshitOS brand ─────────────────────────────────── */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); handleNavClick("#"); }}
            className="flex items-center gap-1.5 pl-1.5 pr-3 mr-1 border-r border-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent rounded-sm relative z-10"
            aria-label="HarshitOS — return to top"
          >
            <span
              className="text-[13px] text-white/40 leading-none select-none"
              aria-hidden="true"
            >
              ◉
            </span>
            <span
              className="text-[12px] font-semibold text-white/80 tracking-tight leading-none hover:text-white transition-colors"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              HarshitOS
            </span>
          </a>

          {/* ── Center: Nav items ────────────────────────────────────────── */}
          <div
            ref={navGroupRef}
            className="relative flex items-center gap-0.5 z-10"
            onMouseLeave={handleHoverEnd}
          >
            {/* Hover background highlight pill */}
            <motion.span
              aria-hidden="true"
              className="absolute inset-y-0 rounded-full bg-white/[0.06] border border-white/[0.04] backdrop-blur-sm pointer-events-none"
              style={{ left: pillLeft, width: pillWidth, opacity: pillOpacity }}
            />

            <LayoutGroup id="navbar-items">
              {NAV_ITEMS.map((item) => (
                <DockNavItemButton
                  key={item.id}
                  item={item}
                  isActive={activeSection === item.id}
                  mouseXRef={mouseXRef}
                  onHoverStart={handleHoverStart}
                  onClick={handleNavClick}
                />
              ))}
            </LayoutGroup>
          </div>

          {/* ── Right: ⌘K command button ─────────────────────────────────── */}
          <div className="ml-1 pl-3 border-l border-white/[0.07] relative z-10">
            <button
              onClick={() => setIsPaletteOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[11px] font-medium text-white/40 hover:text-white/85 hover:bg-white/[0.06] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent select-none"
              style={{ fontFamily: "var(--font-jetbrains)" }}
              aria-label="Open command palette (⌘K)"
            >
              <span className="hidden sm:inline">⌘K</span>
              <span className="sm:hidden" aria-hidden="true">⌘</span>
            </button>
          </div>
        </motion.nav>
      </motion.header>

      {/* ── Command Palette ──────────────────────────────────────────────── */}
      <CommandPalette isOpen={isPaletteOpen} onClose={handleClosePalette} />
    </>
  );
}
