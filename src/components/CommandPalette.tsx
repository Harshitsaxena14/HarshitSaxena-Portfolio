"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Search, CornerDownLeft, Command, FileText, Code, Mail, Terminal, User, Calendar, Cpu, BookOpen, HelpCircle, RotateCcw } from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConsole?: () => void;
}

interface CommandItem {
  id: string;
  label: string;
  category: "Navigation" | "Links";
  icon: typeof Search;
  shortcut?: string;
  action: () => void;
}

export default function CommandPalette({ isOpen, onClose, onOpenConsole }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Focus the input when opened; restore focus to trigger when closed
  useEffect(() => {
    if (isOpen) {
      // Small timeout lets the AnimatePresence mount complete before focus
      const id = setTimeout(() => inputRef.current?.focus(), 10);
      return () => clearTimeout(id);
    }
  }, [isOpen]);

  // Focus trap: cycle focus within the dialog
  useEffect(() => {
    if (!isOpen) return;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusable = dialog.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleTab);
    return () => window.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  // Clear query when closed
  useEffect(() => {
    if (!isOpen) setQuery("");
  }, [isOpen]);

  const commands: CommandItem[] = [
    {
      id: "console",
      label: "Open HarshitOS Interactive Console",
      category: "Navigation",
      icon: Terminal,
      shortcut: "⌘ O",
      action: () => {
        onClose();
        if (onOpenConsole) {
          setTimeout(onOpenConsole, 100);
        }
      },
    },
    {
      id: "home",
      label: "Jump to Overview / Hero",
      category: "Navigation",
      icon: Terminal,
      shortcut: "G H",
      action: () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "about",
      label: "About & Engineering Philosophy",
      category: "Navigation",
      icon: User,
      shortcut: "G A",
      action: () => {
        const el = document.getElementById("about");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "experience",
      label: "Evolution & Journey Milestones",
      category: "Navigation",
      icon: Calendar,
      shortcut: "G E",
      action: () => {
        const el = document.getElementById("experience");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "projects",
      label: "Browse Selected Projects",
      category: "Navigation",
      icon: Code,
      shortcut: "G W",
      action: () => {
        const el = document.getElementById("projects");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "dsa",
      label: "LeetCode Dashboard & DSA Analytics",
      category: "Navigation",
      icon: BookOpen,
      shortcut: "G D",
      action: () => {
        const el = document.getElementById("leetcode");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "skills",
      label: "Tech Stack & Systems Tools",
      category: "Navigation",
      icon: Cpu,
      shortcut: "G S",
      action: () => {
        const el = document.getElementById("skills");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "contact",
      label: "Initiate Contact & Messaging",
      category: "Navigation",
      icon: Mail,
      shortcut: "G C",
      action: () => {
        const el = document.getElementById("contact");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "resume",
      label: "Download Official Resume (PDF)",
      category: "Links",
      icon: FileText,
      shortcut: "G R",
      action: () => {
        window.open("/Harshit_Saxena_Resume.pdf", "_blank", "noopener,noreferrer");
        onClose();
      },
    },
    {
      id: "github",
      label: "Open GitHub Profile",
      category: "Links",
      icon: Code,
      shortcut: "G G",
      action: () => {
        window.open("https://github.com/harshitsaxena", "_blank", "noopener,noreferrer");
        onClose();
      },
    },
    {
      id: "clear",
      label: "Clear Search Query",
      category: "Links",
      icon: RotateCcw,
      action: () => {
        setQuery("");
      },
    },
  ];

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(query.toLowerCase()) ||
      cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, scale: 0.98, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -8 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl bg-background-subtle border border-border-medium rounded-lg shadow-2xl overflow-hidden"
          >
            {/* Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-border-subtle gap-3">
              <Search className="w-4 h-4 text-text-muted shrink-0" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                aria-label="Search commands"
                className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none font-mono"
              />
              <span className="text-[11px] font-mono text-text-muted px-1.5 py-0.5 border border-border-subtle rounded" aria-hidden="true">
                ESC
              </span>
            </div>

            {/* Results List */}
            <ul
              className="max-h-80 overflow-y-auto p-2 space-y-1"
              role="list"
              aria-label="Commands"
            >
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd, i) => {
                  const Icon = cmd.icon;
                  const itemVariants = {
                    hidden: { opacity: 0, x: prefersReducedMotion ? 0 : -5 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: prefersReducedMotion ? 0.1 : 0.14,
                        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                        delay: prefersReducedMotion ? 0 : 0.05 + i * 0.025,
                      },
                    },
                  };
                  return (
                    <li key={cmd.id} role="listitem">
                      <motion.button
                        onClick={cmd.action}
                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-md hover:bg-surface-hover transition-colors text-left group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-text-muted group-hover:text-text-primary transition-colors" aria-hidden="true" />
                          <span className="text-xs font-sans text-text-primary font-medium">
                            {cmd.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {cmd.shortcut && (
                            <motion.span
                              className="text-[10px] font-mono text-text-muted tracking-wider"
                              aria-label={`Shortcut: ${cmd.shortcut}`}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{
                                duration: 0.1,
                                delay: prefersReducedMotion ? 0 : 0.05 + i * 0.025 + 0.02,
                              }}
                            >
                              {cmd.shortcut}
                            </motion.span>
                          )}
                          <CornerDownLeft className="w-3 h-3 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                        </div>
                      </motion.button>
                    </li>
                  );
                })
              ) : (
                <div className="py-8 text-center text-xs font-mono text-text-muted" role="status">
                  No matching commands found.
                </div>
              )}
            </ul>

            {/* Footer Status Bar */}
            <div className="px-4 py-2 border-t border-border-subtle bg-background-elevated flex items-center justify-between text-[11px] font-mono text-text-muted" aria-hidden="true">
              <span className="flex items-center gap-1.5">
                <Command className="w-3 h-3" />Navigation Palette
              </span>
              <span>
                Use <span className="text-text-secondary">↑</span> <span className="text-text-secondary">↓</span> to navigate
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
