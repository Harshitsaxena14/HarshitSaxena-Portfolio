"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { RevealSection, StaggerContainer, StaggerItem, FadeUp } from "@/components/ui/motion";
import {
  User,
  Mail,
  Tag,
  MessageSquare,
  Send,
  MapPin,
  CheckCircle2,
  ExternalLink,
  Github,
  Linkedin,
  Clock,
  Copy,
  Check,
} from "lucide-react";

// ─── Custom LeetCode SVG ──────────────────────────────────────────────────────
// Lucide does not ship a LeetCode icon; this is an accurate single-path trace
// of the official mark at 24×24 viewBox.

function LeetCodeIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width={size}
      height={size}
      aria-hidden="true"
    >
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

type FormStatus = "idle" | "submitting" | "success" | "error";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const EMPTY_FORM: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

// ─── Shared input class ───────────────────────────────────────────────────────

const INPUT_BASE = [
  "w-full",
  "bg-black/25",
  "border border-white/[0.07]",
  "rounded-lg",
  "text-[13px] text-white/75",
  "pl-10 pr-4 py-2.5",
  "placeholder:text-white/20",
  "focus:outline-none",
  "focus:ring-1 focus:ring-blue-500/50",
  "focus:border-blue-500/30",
  "shadow-[inset_0_1px_4px_rgba(0,0,0,0.45)]",
  "transition-all duration-150",
].join(" ");

// ─── FieldWrapper ─────────────────────────────────────────────────────────────

function FieldWrapper({
  id,
  label,
  icon,
  isTextarea = false,
  children,
}: {
  id: string;
  label: string;
  icon: React.ReactNode;
  isTextarea?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-[10px] font-semibold text-white/30 uppercase tracking-widest font-mono"
      >
        {label}
      </label>
      <div className="relative">
        <span
          className={[
            "absolute left-3.5 pointer-events-none flex items-center text-white/30",
            isTextarea ? "top-3" : "top-1/2 -translate-y-1/2",
          ].join(" ")}
          aria-hidden="true"
        >
          {icon}
        </span>
        {children}
      </div>
    </div>
  );
}

// ─── SubmitButton ─────────────────────────────────────────────────────────────

function SubmitButton({ status }: { status: FormStatus }) {
  const isLoading = status === "submitting";

  return (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-white text-black text-[13px] font-semibold rounded-lg hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
      aria-live="polite"
    >
      {isLoading ? (
        <>
          <span
            className="inline-block w-3.5 h-3.5 border-2 border-black/20 border-t-black rounded-full animate-spin"
            aria-hidden="true"
          />
          Sending&hellip;
        </>
      ) : (
        <>
          Send Message
          <Send size={13} aria-hidden="true" />
        </>
      )}
    </button>
  );
}

// ─── SuccessState ─────────────────────────────────────────────────────────────

function SuccessState({ onReset }: { onReset: () => void }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? undefined : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="py-14 flex flex-col items-center justify-center text-center gap-3"
      role="status"
      aria-live="polite"
    >
      <CheckCircle2 size={36} className="text-emerald-400/60" strokeWidth={1.5} />
      <div className="space-y-1">
        <p className="text-sm font-semibold text-white/80">Message sent!</p>
        <p className="text-xs text-white/35 leading-relaxed">
          I&apos;ll get back to you within 1&ndash;2 business days.
        </p>
      </div>
      <button
        onClick={onReset}
        className="mt-2 text-[11px] text-white/25 hover:text-white/45 transition-colors underline underline-offset-2"
      >
        Send another message
      </button>
    </motion.div>
  );
}

// ─── InfoRow ──────────────────────────────────────────────────────────────────

function InfoRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <span className="font-mono text-[10px] text-white/25 tracking-widest uppercase block">
        {label}
      </span>
      {children}
    </div>
  );
}

// ─── LinkRow ──────────────────────────────────────────────────────────────────

function LinkRow({
  href,
  icon,
  ariaLabel,
  display,
  external = false,
  showCopy = false,
}: {
  href: string;
  icon: React.ReactNode;
  ariaLabel: string;
  display: string;
  external?: boolean;
  showCopy?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const cleanEmail = display.replace(/^mailto:/, "");
    navigator.clipboard.writeText(cleanEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="flex items-center justify-between -mx-2 px-2 py-2 rounded-md hover:bg-white/[0.03] transition-all group">
      <a
        href={href}
        aria-label={ariaLabel}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="flex items-center gap-3 text-white/40 group-hover:text-white/65 transition-colors truncate"
      >
        <span
          className="text-white/25 group-hover:text-white/40 transition-colors shrink-0"
          aria-hidden="true"
        >
          {icon}
        </span>
        <span className="truncate font-mono text-[11px]">{display}</span>
        {external && (
          <ExternalLink
            size={10}
            className="shrink-0 opacity-0 group-hover:opacity-50 transition-opacity"
            aria-hidden="true"
          />
        )}
      </a>

      {showCopy && (
        <button
          onClick={handleCopy}
          aria-label="Copy email address to clipboard"
          className="ml-2 px-1.5 py-1 text-[10px] font-mono text-white/30 hover:text-white/70 bg-white/[0.04] hover:bg-white/[0.08] rounded border border-white/[0.05] transition-all flex items-center gap-1 shrink-0"
        >
          {copied ? (
            <>
              <Check size={10} className="text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy size={10} />
              <span>Copy</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Contact() {
  const reducedMotion = useReducedMotion();
  const [form, setForm] = useState<ContactFormData>(EMPTY_FORM);
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    await new Promise<void>((resolve) => setTimeout(resolve, 1400));
    setStatus("success");
  };

  const handleReset = () => {
    setForm(EMPTY_FORM);
    setStatus("idle");
  };

  return (
    <RevealSection
      id="contact"
      className="relative w-full pt-16 pb-24 md:pt-24 md:pb-32 bg-black"
    >
      <div className="max-w-[1080px] mx-auto px-6">

        {/* ── Section marker ─────────────────────────────────────────────── */}
        <FadeUp className="mb-10">
          <span className="font-mono text-xs text-emerald-400 tracking-widest block uppercase">
            // 07. CONNECT &middot; GET IN TOUCH
          </span>
        </FadeUp>

        {/* ── Two-column grid ────────────────────────────────────────────── */}
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

          {/* ── LEFT: Form card ──────────────────────────────────────────── */}
          <StaggerItem className="lg:col-span-7">
            <motion.div
              whileHover={
                reducedMotion
                  ? undefined
                  : {
                      scale: 1.015,
                      boxShadow:
                        "0 0 0 1px rgba(255,255,255,0.07), 0 28px 72px rgba(0,0,0,0.65), 0 8px 24px rgba(0,0,0,0.4)",
                    }
              }
              transition={{ type: "spring", stiffness: 280, damping: 30, mass: 0.9 }}
            >
            <div className="rounded-2xl border border-white/[0.06] bg-[rgba(255,255,255,0.02)] shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_20px_60px_rgba(0,0,0,0.5),0_4px_16px_rgba(0,0,0,0.3)] p-7 sm:p-9">

              {/* Card header with progressive line-by-line scroll unmasking reveal */}
              <div className="mb-8 space-y-3 select-none">
                <div className="font-mono text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter leading-[0.92] uppercase space-y-1">
                  <motion.div
                    initial={{ opacity: 0, y: 30, clipPath: "inset(100% 0 0 0)" }}
                    whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    LET&apos;S
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 30, clipPath: "inset(100% 0 0 0)" }}
                    whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    BUILD
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 30, clipPath: "inset(100% 0 0 0)" }}
                    whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="text-emerald-400"
                  >
                    SOMETHING
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 30, clipPath: "inset(100% 0 0 0)" }}
                    whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  >
                    GREAT.
                  </motion.div>
                </div>
                <p className="text-xs sm:text-sm text-white/50 leading-relaxed max-w-md pt-2 font-sans font-light">
                  Whether it&apos;s AI systems, full-stack architecture, open source, or an exciting software engineering role&mdash;I&apos;d love to connect.
                </p>
              </div>

              {/* Form / success state */}
              {status === "success" ? (
                <SuccessState onReset={handleReset} />
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-4"
                  aria-label="Contact form"
                >
                  {/* Full Name */}
                  <FieldWrapper
                    id="contact-name"
                    label="Full Name"
                    icon={<User size={14} />}
                  >
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      placeholder="Harshit Saxena"
                      value={form.name}
                      onChange={handleChange}
                      className={INPUT_BASE}
                    />
                  </FieldWrapper>

                  {/* Email Address */}
                  <FieldWrapper
                    id="contact-email"
                    label="Email Address"
                    icon={<Mail size={14} />}
                  >
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      className={INPUT_BASE}
                    />
                  </FieldWrapper>

                  {/* Subject */}
                  <FieldWrapper
                    id="contact-subject"
                    label="Subject"
                    icon={<Tag size={14} />}
                  >
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      required
                      placeholder="Internship / Collaboration / Open Source"
                      value={form.subject}
                      onChange={handleChange}
                      className={INPUT_BASE}
                    />
                  </FieldWrapper>

                  {/* Message */}
                  <FieldWrapper
                    id="contact-message"
                    label="Message"
                    icon={<MessageSquare size={14} />}
                    isTextarea
                  >
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell me about your project or what you have in mind&hellip;"
                      value={form.message}
                      onChange={handleChange}
                      className={`${INPUT_BASE} resize-none`}
                    />
                  </FieldWrapper>

                  {/* Submit button */}
                  <div className="pt-2">
                    <SubmitButton status={status} />
                  </div>
                </form>
              )}

            </div>
          </motion.div>
        </StaggerItem>

        {/* ── RIGHT: Info panel ─────────────────────────────────────────── */}
        <StaggerItem className="lg:col-span-5 flex flex-col gap-5">
          <aside
            className="w-full flex flex-col gap-5"
            aria-label="Contact information"
          >

            {/* Info card */}
            <div className="rounded-2xl border border-white/[0.05] bg-[rgba(255,255,255,0.015)] shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_8px_32px_rgba(0,0,0,0.35)] p-6 space-y-6">

              {/* Location */}
              <InfoRow label="Location">
                <div className="flex items-center gap-2">
                  <MapPin size={13} className="text-white/25 shrink-0" aria-hidden="true" />
                  <span className="text-[13px] text-white/55">
                    Gwalior, Madhya Pradesh, India
                  </span>
                </div>
              </InfoRow>

              {/* Availability */}
              <InfoRow label="Availability">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"
                    role="img"
                    aria-label="Currently available"
                  />
                  <span className="text-[13px] text-emerald-400/70 font-medium">
                    Open for Internships
                  </span>
                </div>
              </InfoRow>

              {/* Response time */}
              <InfoRow label="Response Time">
                <div className="flex items-center gap-2">
                  <Clock size={13} className="text-white/25 shrink-0" aria-hidden="true" />
                  <span className="text-[13px] text-white/45">
                    1&ndash;2 business days
                  </span>
                </div>
              </InfoRow>

              {/* Divider */}
              <div className="border-t border-white/[0.05]" aria-hidden="true" />

              {/* Online profiles */}
              <div>
                <span className="font-mono text-[10px] text-white/20 tracking-widest uppercase block mb-1">
                  Find me online
                </span>
                <nav aria-label="Social profile links">
                  <LinkRow
                    href="mailto:harshitacademics@gmail.com"
                    icon={<Mail size={13} />}
                    ariaLabel="Send an email to Harshit"
                    display="harshitacademics@gmail.com"
                    showCopy
                  />
                  <LinkRow
                    href="https://github.com/harshitsaxena"
                    icon={<Github size={13} />}
                    ariaLabel="GitHub profile (opens in new tab)"
                    display="github.com/harshitsaxena"
                    external
                  />
                  <LinkRow
                    href="https://linkedin.com/in/harshitsaxena"
                    icon={<Linkedin size={13} />}
                    ariaLabel="LinkedIn profile (opens in new tab)"
                    display="linkedin.com/in/harshitsaxena"
                    external
                  />
                  <LinkRow
                    href="https://leetcode.com/harshit_saxena14"
                    icon={<LeetCodeIcon size={13} />}
                    ariaLabel="LeetCode profile (opens in new tab)"
                    display="leetcode.com/harshit_saxena14"
                    external
                  />
                </nav>
              </div>

            </div>

            {/* Quote */}
            <blockquote aria-label="Personal quote">
              <div className="border-l-2 border-white/[0.07] pl-4">
                <p className="text-[13px] text-white/30 leading-relaxed italic">
                  &ldquo;I enjoy building products that solve real-world
                  problems.&rdquo;
                </p>
              </div>
            </blockquote>

          </aside>
        </StaggerItem>

        </StaggerContainer>
      </div>
    </RevealSection>
  );
}
