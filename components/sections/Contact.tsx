"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Send, CheckCircle, AlertCircle, Terminal, Unlock, Lock } from "lucide-react";
import { sendEmail } from "@/app/actions/sendEmail";
import { social } from "@/lib/data";

/* ── Contact form schema ── */
const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  project: z.string().min(10, "Message must be at least 10 characters"),
});
type FormData = z.infer<typeof schema>;

/* ── Challenge steps ── */
type Step = {
  id: number;
  prompt: string;
  hint: string;
  check: (v: string) => boolean;
  success: string;
};

const STEPS: Step[] = [
  {
    id: 1,
    prompt: '> access_contact.exe\n> CHALLENGE 1/3 — Reverse this string:\n  "40BUHEDOC-SISAHENS"',
    hint: "hint: read it backwards",
    check: (v) => v.trim().toUpperCase() === "SNEHASIS-CODEHUB04",
    success: "✓ ACCESS LEVEL 1 GRANTED — Identity verified.",
  },
  {
    id: 2,
    prompt: '> CHALLENGE 2/3 — What does this evaluate to?\n  console.log(typeof null)',
    hint: 'hint: classic JS quirk',
    check: (v) => v.trim().toLowerCase() === "object",
    success: '✓ ACCESS LEVEL 2 GRANTED — JS knowledge confirmed.',
  },
  {
    id: 3,
    prompt: '> CHALLENGE 3/3 — Complete the Big-O:\n  Binary search runs in O(__) time',
    hint: "hint: log base 2",
    check: (v) => {
      const clean = v.trim().toLowerCase().replace(/\s/g, "");
      return clean === "log n" || clean === "o(logn)" || clean === "logn" || clean === "o(log n)";
    },
    success: "✓ ACCESS LEVEL 3 GRANTED — Algorithm skills verified.",
  },
];

/* ── Hire Me Challenge terminal ── */
function HireChallenge({ onUnlock }: { onUnlock: () => void }) {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<{ text: string; color?: string }[]>([
    { text: "┌─────────────────────────────────────────┐" },
    { text: "│     🔐  HIRE ME CHALLENGE  v1.0         │" },
    { text: "│  Solve 3 challenges to unlock contact   │" },
    { text: "└─────────────────────────────────────────┘" },
    { text: "" },
    { text: STEPS[0].prompt },
    { text: STEPS[0].hint, color: "rgba(0,255,255,0.4)" },
    { text: "" },
  ]);
  const [wrong, setWrong] = useState(false);
  const [done, setDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const submit = () => {
    const val = input.trim();
    if (!val) return;
    const current = STEPS[step];

    setLines((prev) => [...prev, { text: `$ ${val}`, color: "#fff" }]);
    setInput("");

    if (current.check(val)) {
      setWrong(false);
      const next = step + 1;
      if (next >= STEPS.length) {
        // All done
        setLines((prev) => [
          ...prev,
          { text: current.success, color: "#00ffff" },
          { text: "" },
          { text: "🎉 ALL CHALLENGES COMPLETE!", color: "#00ffff" },
          { text: "✓ Contact details unlocked. Scroll down!", color: "#00ff88" },
          { text: "" },
        ]);
        setDone(true);
        setTimeout(onUnlock, 800);
      } else {
        setLines((prev) => [
          ...prev,
          { text: current.success, color: "#00ffff" },
          { text: "" },
          { text: STEPS[next].prompt },
          { text: STEPS[next].hint, color: "rgba(0,255,255,0.4)" },
          { text: "" },
        ]);
        setStep(next);
      }
    } else {
      setWrong(true);
      setLines((prev) => [
        ...prev,
        { text: "✗ Wrong answer. Try again.", color: "#ff5555" },
        { text: "" },
      ]);
    }
  };

  return (
    <motion.div
      className="rounded-xl overflow-hidden mb-12"
      style={{
        background: "#0a0a0a",
        border: "1px solid rgba(0,255,255,0.2)",
        boxShadow: "0 0 40px rgba(0,255,255,0.06)",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2.5"
        style={{ background: "#111", borderBottom: "1px solid rgba(0,255,255,0.1)" }}>
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5" style={{ color: "#00ffff" }} />
          <span className="text-xs font-mono" style={{ color: "rgba(0,255,255,0.7)" }}>
            access_contact.exe
          </span>
        </div>
        <div className="flex items-center gap-2">
          {/* Progress pips */}
          {STEPS.map((s, i) => (
            <div key={s.id} className="w-2 h-2 rounded-full transition-all duration-300"
              style={{ background: i < step ? "#00ffff" : i === step && !done ? "rgba(0,255,255,0.4)" : done ? "#00ffff" : "rgba(255,255,255,0.1)" }} />
          ))}
          {done
            ? <Unlock className="w-3.5 h-3.5 ml-1" style={{ color: "#00ff88" }} />
            : <Lock className="w-3.5 h-3.5 ml-1" style={{ color: "rgba(255,255,255,0.3)" }} />
          }
        </div>
      </div>

      {/* Output */}
      <div className="px-3 sm:px-4 py-4 h-48 sm:h-56 overflow-y-auto font-mono text-xs leading-relaxed"
        onClick={() => inputRef.current?.focus()}>
        {lines.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap"
            style={{ color: line.color ?? "rgba(0,255,255,0.75)" }}>
            {line.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      {!done && (
        <motion.div
          className="flex items-center gap-2 px-4 py-3"
          style={{ borderTop: "1px solid rgba(0,255,255,0.08)" }}
          animate={wrong ? { x: [-4, 4, -4, 4, 0] } : { x: 0 }}
          transition={{ duration: 0.3 }}
          onAnimationComplete={() => setWrong(false)}
        >
          <span className="font-mono text-xs" style={{ color: wrong ? "#ff5555" : "#00ffff" }}>$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder={wrong ? "wrong answer, retry..." : "type your answer..."}
            className="flex-1 bg-transparent outline-none font-mono text-xs text-white placeholder:text-white/20"
            autoComplete="off"
            spellCheck={false}
          />
          <motion.button
            onClick={submit}
            disabled={!input.trim()}
            className="text-[10px] font-mono px-3 py-1 rounded border disabled:opacity-30 transition-all"
            style={{
              borderColor: wrong ? "#ff5555" : "rgba(0,255,255,0.3)",
              color: wrong ? "#ff5555" : "#00ffff",
            }}
            whileHover={{ boxShadow: wrong ? "0 0 8px #ff555555" : "0 0 8px #00ffff55" }}
            whileTap={{ scale: 0.95 }}
          >
            {wrong ? "RETRY" : "ENTER"}
          </motion.button>
        </motion.div>
      )}

      {/* Remove old wrong shake div — now handled inline above */}
    </motion.div>
  );
}

/* ── Main Contact section ── */
export default function Contact() {
  const [unlocked, setUnlocked] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("idle");
    const result = await sendEmail(data);
    if (result.success) { setStatus("success"); reset(); }
    else { setStatus("error"); setErrorMsg(result.error ?? "Something went wrong."); }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section header */}
      <motion.div className="mb-10"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-2">
          You dream it, I code it
        </p>
        <h2 className="text-3xl sm:text-4xl font-black leading-tight">CONTACT</h2>
      </motion.div>

      {/* ── Hire Me Challenge ── */}
      <HireChallenge onUnlock={() => setUnlocked(true)} />

      {/* ── Unlocked contact details banner ── */}
      <AnimatePresence>
        {unlocked && (
          <motion.div
            className="mb-10 p-3 sm:p-4 rounded-xl font-mono text-xs sm:text-sm flex flex-col sm:flex-row flex-wrap gap-x-6 gap-y-2"
            style={{
              background: "rgba(0,255,255,0.05)",
              border: "1px solid rgba(0,255,255,0.25)",
              boxShadow: "0 0 20px rgba(0,255,255,0.08)",
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
          >
            <span style={{ color: "#00ffff" }}>🔓 UNLOCKED</span>
            <span className="text-muted-foreground">📍 Kirnahar, West Bengal, India</span>
            {social.map((s) => (
              <a key={s.label} href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {s.label === "Email" ? "✉️" : s.label === "GitHub" ? "🐙" : s.label === "LinkedIn" ? "💼" : "🐦"}{" "}
                {s.href.replace("mailto:", "").replace("https://", "")}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Two-column: info+map | form ── */}
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
        {/* Left */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            WE&apos;D LOVE TO HEAR FROM YOU AND DISCUSS FURTHER!
          </p>

          {/* Google Map */}
          <motion.div className="rounded-xl overflow-hidden border border-border" style={{ height: 220 }}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.234!2d87.8765714!3d23.7643712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f99568ecef3897%3A0x4814e1893e4541ab!2sKirnahar%2C%20West%20Bengal%20731302!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%" height="220"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              title="Kirnahar, West Bengal"
            />
          </motion.div>
        </motion.div>

        {/* Right — form */}
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          {status === "success" && (
            <motion.div className="mb-5 flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg"
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
              <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
              <p className="text-sm font-mono text-green-500">Message sent! I&apos;ll get back to you soon.</p>
            </motion.div>
          )}
          {status === "error" && (
            <motion.div className="mb-5 flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <p className="text-sm font-mono text-red-500">{errorMsg}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input {...register("name")} placeholder="Name"
                className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-foreground transition-all" />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <input {...register("email")} placeholder="Email"
                className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-foreground transition-all" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <textarea {...register("project")} placeholder="Project / Message" rows={5}
                className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-foreground transition-all resize-none" />
              {errors.project && <p className="text-red-500 text-xs mt-1">{errors.project.message}</p>}
            </div>
            <button type="submit" disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 bg-foreground text-background py-3 rounded-lg text-sm font-semibold hover:opacity-80 transition-opacity disabled:opacity-40">
              {isSubmitting ? (
                <>
                  <motion.div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full"
                    animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }} />
                  Sending...
                </>
              ) : (
                <><Send className="w-4 h-4" />Send Message</>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
