"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";
import { skills, type SkillCategory } from "@/lib/data";

const categories: ("All" | SkillCategory)[] = [
  "All",
  "Frontend",
  "Backend",
  "Database",
  "DevOps & Tools",
  "Testing",
  "Languages",
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.7, y: 16 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 280, damping: 22 },
  },
  exit: { opacity: 0, scale: 0.6, transition: { duration: 0.12 } },
};

export default function SkillsSection() {
  const [active, setActive] = useState<"All" | SkillCategory>("All");
  const [hovered, setHovered] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  // Avoid hydration mismatch — theme is unknown until client mounts
  useEffect(() => setMounted(true), []);
  const dark = mounted ? resolvedTheme === "dark" : true; // default dark matches defaultTheme

  const filtered = active === "All" ? skills : skills.filter((s) => s.category === active);

  /* theme-aware color tokens */
  const cyan = dark ? "#00ffff" : "#0891b2";
  const cyanFaint = dark ? "rgba(0,255,255,0.07)" : "rgba(8,145,178,0.06)";
  const cyanBorder = dark ? "rgba(0,255,255,0.15)" : "rgba(8,145,178,0.2)";
  const cyanBorderHover = dark ? "rgba(0,255,255,0.6)" : "rgba(8,145,178,0.7)";
  const cyanGlow = dark ? "0 0 18px rgba(0,255,255,0.25), inset 0 0 12px rgba(0,255,255,0.05)"
                        : "0 0 14px rgba(8,145,178,0.15)";
  const textMuted = dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)";

  return (
    <section
      id="skills"
      className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden transition-colors duration-300"
      style={{ background: dark ? "#000" : "#f8fafc" }}
    >
      {/* ── Hacker grid (dark only) ── */}
      {dark && (
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#00ffff 1px, transparent 1px), linear-gradient(90deg, #00ffff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      )}

      {/* ── Radial glow ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px]"
          style={{ background: dark ? "rgba(0,255,255,0.08)" : "rgba(8,145,178,0.06)" }}
        />
      </div>

      {/* ── Lightning pulse (dark only) ── */}
      {dark && (
        <motion.div
          className="absolute inset-0 blur-3xl pointer-events-none"
          style={{ background: "rgba(0,255,255,0.04)" }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        />
      )}

      <div className="relative max-w-7xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p
            className="text-xs font-mono tracking-widest uppercase mb-3"
            style={{ color: `${cyan}99` }}
          >
            {dark ? "> initializing skill_matrix..." : "What I work with"}
          </p>
          <h2
            className="text-3xl sm:text-4xl font-black leading-tight"
            style={{
              color: dark ? "#fff" : "#0a0a0a",
              textShadow: dark ? "0 0 12px rgba(0,255,255,0.3)" : "none",
            }}
          >
            SKILLS
          </h2>
          <p className="mt-3 text-xs font-mono" style={{ color: `${cyan}60` }}>
            {skills.length} technologies &nbsp;·&nbsp; {categories.length - 1} categories
          </p>
        </motion.div>

        {/* ── Filter tabs ── */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="relative px-4 py-1.5 text-xs font-mono rounded-full border transition-all duration-200"
              style={{
                borderColor: active === cat ? cyan : cyanBorder,
                color: active === cat ? (dark ? "#000" : "#fff") : `${cyan}99`,
              }}
            >
              {active === cat && (
                <motion.span
                  layoutId="pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: cyan }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </motion.div>

        {/* ── Skills grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            {filtered.map((skill) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                onMouseEnter={() => setHovered(skill.name)}
                onMouseLeave={() => setHovered(null)}
                className="group relative flex flex-col items-center gap-2.5 p-4 rounded-xl cursor-default overflow-hidden"
                style={{
                  background: hovered === skill.name ? cyanFaint : (dark ? "rgba(255,255,255,0.02)" : "#fff"),
                  border: `1px solid ${hovered === skill.name ? cyanBorderHover : cyanBorder}`,
                  boxShadow: hovered === skill.name ? cyanGlow : "none",
                  transition: "border 0.2s, box-shadow 0.2s, background 0.2s",
                }}
                whileHover={{ y: -5, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
              >
                {/* Scan line on hover */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-px pointer-events-none"
                  style={{ background: `${cyan}50` }}
                  animate={hovered === skill.name ? { x: ["-100%", "100%"] } : { x: "-100%" }}
                  transition={{ duration: 0.6, ease: "linear" }}
                />

                {/* Icon — slow spin on hover */}
                <motion.div
                  className="relative w-8 h-8"
                  animate={hovered === skill.name ? { rotate: 360 } : { rotate: 0 }}
                  transition={
                    hovered === skill.name
                      ? { repeat: Infinity, duration: 6, ease: "linear" }
                      : { duration: 0.3 }
                  }
                >
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </motion.div>

                <span
                  className="text-[10px] font-mono text-center leading-tight line-clamp-2 transition-colors duration-200"
                  style={{ color: hovered === skill.name ? cyan : textMuted }}
                >
                  {skill.name}
                </span>

                {/* Tooltip */}
                <AnimatePresence>
                  {hovered === skill.name && (
                    <motion.div
                      className="absolute -top-9 left-1/2 -translate-x-1/2 text-[10px] font-mono px-2 py-1 rounded whitespace-nowrap z-20 pointer-events-none"
                      style={{
                        background: cyan,
                        color: dark ? "#000" : "#fff",
                        boxShadow: `0 0 10px ${cyan}`,
                      }}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.15 }}
                    >
                      {skill.category}
                      <span
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-4 border-transparent"
                        style={{ borderTopColor: cyan }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom status bar ── */}
        <motion.div
          className="mt-10 flex items-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex-1 h-px" style={{ background: `${cyan}25` }} />
          <span className="text-[10px] font-mono" style={{ color: `${cyan}60` }}>
            [ {filtered.length}/{skills.length} loaded ]
          </span>
          <div className="flex-1 h-px" style={{ background: `${cyan}25` }} />
        </motion.div>

      </div>
    </section>
  );
}
