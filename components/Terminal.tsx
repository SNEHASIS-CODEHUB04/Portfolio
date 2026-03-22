"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Square, Settings } from "lucide-react";

/* ── portfolio data ── */
const INFO = {
  user: "Snehasis Dutta",
  role: "Full Stack Developer",
  experience: "Intern @ Vara Infrovate Pvt. Ltd.",
  skills: "React · Next.js · Node.js · TypeScript · Tailwind · NestJS · Docker",
  projects: "6 Active Projects",
  shell: "snehasis-sh",
  terminal: "portfolio-tty",
  cpu: "Snehasis @ 100% Focus",
  memory: "Infinite Learning Cap",
  email: "sdutta04.kir@gmail.com",
  github: "github.com/SNEHASIS-CODEHUB04",
  linkedin: "linkedin.com/in/snehasis-dutta-506115254",
  location: "West Bengal, India",
};

const ASCII = `
        .  .  .
      .  \\|/  .
    . --( S )-- .
      .  /|\\  .
        .  .  .
`;

const NEOFETCH = `
<cyan>snehasis@portfolio</cyan>
<dim>------------------</dim>
<label>User:</label>       ${INFO.user}
<label>Role:</label>       ${INFO.role}
<label>Experience:</label> ${INFO.experience}
<label>Skills:</label>     ${INFO.skills}
<label>Projects:</label>   ${INFO.projects}
<label>Shell:</label>      ${INFO.shell}
<label>Terminal:</label>   ${INFO.terminal}
<label>CPU:</label>        ${INFO.cpu}
<label>Memory:</label>     ${INFO.memory}
`;

type Line = { type: "input" | "output" | "error" | "info"; text: string };

const COMMANDS: Record<string, () => Line[]> = {
  help: () => [
    { type: "info", text: "Available commands:" },
    { type: "output", text: "  <label>about</label>       — Who I am" },
    { type: "output", text: "  <label>whoami</label>      — Quick identity" },
    { type: "output", text: "  <label>skills</label>      — Tech stack" },
    { type: "output", text: "  <label>projects</label>    — My work" },
    { type: "output", text: "  <label>experience</label>  — Work history" },
    { type: "output", text: "  <label>education</label>   — Academic background" },
    { type: "output", text: "  <label>contact</label>     — Get in touch" },
    { type: "output", text: "  <label>games</label>       — Mini games section" },
    { type: "output", text: "  <label>ls</label>          — List sections" },
    { type: "output", text: "  <label>pwd</label>         — Current path" },
    { type: "output", text: "  <label>cat about.txt</label>  — Read about file" },
    { type: "output", text: "  <label>git log</label>     — Commit history" },
    { type: "output", text: "  <label>sudo hire me</label>— 😄" },
    { type: "output", text: "  <label>clear</label>       — Clear terminal" },
    { type: "output", text: "  <label>exit</label>        — Close terminal" },
  ],
  about: () => [
    { type: "output", text: NEOFETCH },
    { type: "output", text: "" },
    { type: "output", text: `Hi, I'm <cyan>${INFO.user}</cyan>, a ${INFO.role}.` },
    { type: "output", text: "I build scalable full-stack web apps with modern tech." },
    { type: "output", text: "Currently interning at Vara Infrovate Pvt. Ltd. (On-Site)." },
    { type: "output", text: "Solved 400+ problems on LeetCode · CodeChef Max: 1366." },
  ],
  whoami: () => [
    { type: "output", text: `<cyan>${INFO.user}</cyan> — ${INFO.role}` },
    { type: "output", text: `📍 ${INFO.location}` },
    { type: "output", text: `✉️  ${INFO.email}` },
  ],
  skills: () => [
    { type: "info", text: "[ skill_matrix.json ]" },
    { type: "output", text: "<label>Frontend:</label>      HTML · CSS · JS · TS · React · Next.js · Tailwind" },
    { type: "output", text: "<label>Backend:</label>       Node.js · Express · NestJS · Swagger · Kafka" },
    { type: "output", text: "<label>Database:</label>      MongoDB · MySQL · Prisma ORM · TypeORM" },
    { type: "output", text: "<label>DevOps:</label>        Docker · Git" },
    { type: "output", text: "<label>Testing:</label>       Manual Testing · Jira" },
    { type: "output", text: "<label>Languages:</label>     Python · Java · C++ · C" },
  ],
  projects: () => [
    { type: "info", text: "[ projects/ ]" },
    { type: "output", text: "<cyan>GUIDEX AI</cyan>         — AI career guidance platform (Final Year, Ongoing)" },
    { type: "output", text: "<cyan>IdeaScape</cyan>         — Full-stack blog app with Appwrite backend" },
    { type: "output", text: "<cyan>Collab Board</cyan>      — Real-time collaborative tutorial board" },
    { type: "output", text: "<cyan>AI Summarizer</cyan>     — Chrome extension for AI article summaries" },
    { type: "output", text: "<cyan>Sorting Visualizer</cyan>— Animated sorting algorithm visualizer" },
    { type: "output", text: "<cyan>Banker's Algorithm</cyan>— OS deadlock avoidance simulator" },
    { type: "output", text: "" },
    { type: "output", text: "→ github.com/SNEHASIS-CODEHUB04" },
  ],
  experience: () => [
    { type: "info", text: "[ experience/ ]" },
    { type: "output", text: "<cyan>Full Stack Development Intern</cyan>" },
    { type: "output", text: "  Vara Infrovate Pvt. Ltd. · On-Site" },
    { type: "output", text: "  Jan 2026 – Present" },
    { type: "output", text: "  Building production-grade web apps in agile workflows." },
  ],
  education: () => [
    { type: "info", text: "[ education/ ]" },
    { type: "output", text: "<cyan>B.Tech — CSE</cyan>  Kalyani Govt. Engineering College  2022–2026  CGPA: 8.70" },
    { type: "output", text: "<cyan>Higher Secondary</cyan>  Kirnahar Shib Chandra HS  2021–2022  96.20%" },
    { type: "output", text: "<cyan>Secondary</cyan>         Kirnahar Shib Chandra HS  2019–2020  93.85%" },
  ],
  contact: () => [
    { type: "info", text: "[ contact.json ]" },
    { type: "output", text: `<label>Email:</label>    ${INFO.email}` },
    { type: "output", text: `<label>GitHub:</label>   ${INFO.github}` },
    { type: "output", text: `<label>LinkedIn:</label> ${INFO.linkedin}` },
    { type: "output", text: `<label>Location:</label> ${INFO.location}` },
  ],
  ls: () => [
    { type: "output", text: "<cyan>about/</cyan>  <cyan>skills/</cyan>  <cyan>projects/</cyan>  <cyan>experience/</cyan>  <cyan>education/</cyan>  <cyan>contact/</cyan>  <cyan>games/</cyan>" },
    { type: "output", text: "about.txt  skills.json  projects.json  games.json  resume.pdf" },
  ],
  pwd: () => [{ type: "output", text: "/home/snehasis/portfolio" }],
  "cat about.txt": () => COMMANDS["about"](),
  "cat skills.json": () => COMMANDS["skills"](),
  "cat projects.json": () => COMMANDS["projects"](),
  "git log": () => [
    { type: "info", text: "commit history" },
    { type: "output", text: "<cyan>a1b2c3d</cyan> feat: add GUIDEX AI final year project" },
    { type: "output", text: "<cyan>e4f5g6h</cyan> feat: full-stack internship @ Vara Infrovate" },
    { type: "output", text: "<cyan>i7j8k9l</cyan> feat: collab board with real-time sync" },
    { type: "output", text: "<cyan>m1n2o3p</cyan> feat: AI article summarizer chrome extension" },
    { type: "output", text: "<cyan>q4r5s6t</cyan> init: portfolio v2 with Next.js + Tailwind" },
  ],
  "git status": () => [
    { type: "output", text: "On branch main" },
    { type: "output", text: "Your branch is up to date with 'origin/main'." },
    { type: "output", text: "" },
    { type: "output", text: "nothing to commit, working tree clean ✓" },
  ],
  "sudo hire me": () => [
    { type: "output", text: "[sudo] password for snehasis: ••••••••" },
    { type: "output", text: "" },
    { type: "output", text: "✅ <cyan>Access granted.</cyan> Hiring process initiated..." },
    { type: "output", text: "📧 Send an email to <label>${INFO.email}</label> to proceed." },
  ],
  games: () => [
    { type: "info", text: "[ games.json ]" },
    { type: "output", text: "🎮 Mini Games — scroll to the bottom of the portfolio to play!" },
    { type: "output", text: "" },
    { type: "output", text: "<cyan>🧠 Memory Game</cyan>       — Match emoji card pairs" },
    { type: "output", text: "<cyan>🐍 Snake Game</cyan>        — Classic snake, eat the cyan dot" },
    { type: "output", text: "<cyan>🐛 Bug Fix Game</cyan>      — Spot the bug in code snippets" },
    { type: "output", text: "<cyan>⌨️  Typing Speed Game</cyan> — Type fast, get your WPM score" },
    { type: "output", text: "<cyan>🔍 Pattern Recognition</cyan>— Find the next in the sequence" },
    { type: "output", text: "" },
    { type: "output", text: "→ Scroll down to <label>LET'S PLAY SOME GAMES 🎮</label> section" },
  ],
  dotsatya: () => [{ type: "error", text: "command not found: dotsatya. Try 'whoami' instead 😄" }],
};

const WELCOME: Line[] = [
  { type: "output", text: ASCII },
  { type: "output", text: `Hi, I'm <cyan>${INFO.user}</cyan>, a ${INFO.role}.` },
  { type: "output", text: "" },
  { type: "output", text: "Welcome to my interactive portfolio terminal!" },
  { type: "output", text: "Type <label>help</label> to see available commands." },
  { type: "output", text: "" },
];

const QUICK_CMDS = ["help", "about", "projects", "skills", "experience", "contact", "education", "games", "sudo hire me", "ls", "pwd", "clear", "whoami", "git log", "exit"];

function renderLine(text: string) {
  return text
    .replace(/<cyan>(.*?)<\/cyan>/g, '<span style="color:#00ffff">$1</span>')
    .replace(/<label>(.*?)<\/label>/g, '<span style="color:#00ffff99">$1</span>')
    .replace(/<dim>(.*?)<\/dim>/g, '<span style="color:#444">$1</span>');
}

interface TerminalProps {
  open: boolean;
  onClose: () => void;
}

export default function Terminal({ open, onClose }: TerminalProps) {
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const run = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    const inputLine: Line = { type: "input", text: trimmed };

    if (trimmed === "clear") {
      setLines([]);
      return;
    }
    if (trimmed === "exit") {
      onClose();
      return;
    }

    const handler = COMMANDS[trimmed];
    const result: Line[] = handler
      ? handler()
      : [{ type: "error", text: `command not found: ${trimmed}. Type 'help' for commands.` }];

    setLines((prev) => [...prev, inputLine, ...result, { type: "output", text: "" }]);
    setHistory((prev) => [trimmed, ...prev.slice(0, 49)]);
    setHistIdx(-1);
  }, [onClose]);

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const idx = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(idx);
      setInput(history[idx] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const idx = Math.max(histIdx - 1, -1);
      setHistIdx(idx);
      setInput(idx === -1 ? "" : history[idx]);
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Terminal window */}
          <motion.div
            className="relative w-full max-w-3xl flex flex-col rounded-xl overflow-hidden shadow-2xl
              h-[100dvh] sm:h-[580px]"
            style={{
              background: "#0d0d0d",
              border: "1px solid rgba(0,255,255,0.2)",
              boxShadow: "0 0 60px rgba(0,255,255,0.08), 0 25px 50px rgba(0,0,0,0.8)",
            }}
            initial={{ scale: 0.92, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
          >
            {/* Title bar */}
            <div
              className="flex items-center justify-between px-4 py-3 shrink-0"
              style={{ background: "#161616", borderBottom: "1px solid rgba(0,255,255,0.1)" }}
            >
              <span className="text-xs font-mono" style={{ color: "rgba(0,255,255,0.6)" }}>
                &gt;_ bash — snehasis.portfolio
              </span>
              <div className="flex items-center gap-2">
                <Settings className="w-3.5 h-3.5" style={{ color: "rgba(255,255,255,0.2)" }} />
                <div className="w-3 h-3 rounded-full bg-yellow-400 cursor-pointer hover:opacity-80" />
                <div className="w-3 h-3 rounded-full bg-green-400 cursor-pointer hover:opacity-80" />
                <div
                  className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:opacity-80"
                  onClick={onClose}
                />
              </div>
            </div>

            {/* Quick command tabs */}
            <div
              className="flex items-center gap-1 px-3 py-2 overflow-x-auto shrink-0 scrollbar-none"
              style={{ background: "#111", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
            >
              {QUICK_CMDS.map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => run(cmd)}
                  className="shrink-0 px-3 py-1 text-[11px] font-mono rounded border transition-all hover:border-cyan-400/50 hover:text-cyan-400 cursor-pointer"
                  style={{
                    color: "rgba(255,255,255,0.45)",
                    borderColor: "rgba(255,255,255,0.1)",
                    background: "transparent",
                  }}
                >
                  {cmd}
                </button>
              ))}
            </div>

            {/* Output area */}
            <div
              className="flex-1 overflow-y-auto px-4 py-3 font-mono text-xs leading-relaxed"
              style={{ color: "rgba(255,255,255,0.75)" }}
              onClick={() => inputRef.current?.focus()}
            >
              {lines.map((line, i) => (
                <div key={i} className="whitespace-pre-wrap">
                  {line.type === "input" ? (
                    <span>
                      <span style={{ color: "#00ffff" }}>
                        ┌─(<span style={{ color: "#00ffff", fontWeight: "bold" }}>snehasis.portfolio</span>)-[~]
                        {"\n"}└─$ </span>
                      <span style={{ color: "#fff" }}>{line.text}</span>
                    </span>
                  ) : line.type === "error" ? (
                    <span style={{ color: "#ff5555" }}>{line.text}</span>
                  ) : line.type === "info" ? (
                    <span style={{ color: "rgba(0,255,255,0.5)" }}>{line.text}</span>
                  ) : (
                    <span dangerouslySetInnerHTML={{ __html: renderLine(line.text) }} />
                  )}
                </div>
              ))}

              {/* Active prompt */}
              <div className="flex items-start gap-0 mt-1">
                <span style={{ color: "#00ffff" }} className="whitespace-pre">
                  {`┌─(snehasis.portfolio)-[~]\n└─$ `}
                </span>
                <div className="flex items-center flex-1">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKey}
                    className="flex-1 bg-transparent outline-none text-white font-mono text-xs caret-cyan-400"
                    spellCheck={false}
                    autoComplete="off"
                    autoCapitalize="off"
                  />
                  {/* Blinking cursor */}
                  <motion.span
                    className="inline-block w-2 h-3.5 ml-0.5"
                    style={{ background: "#00ffff" }}
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  />
                </div>
              </div>
              <div ref={bottomRef} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
