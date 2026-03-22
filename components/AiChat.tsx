"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, RotateCcw } from "lucide-react";

type Message = { role: "user" | "bot"; text: string };

// ── Knowledge base ──────────────────────────────────────────────
const KB: { patterns: RegExp[]; answer: string }[] = [
  {
    patterns: [/who are you|about you|introduce|yourself|snehasis/i],
    answer: "I'm Snehasis Dutta — a Full Stack Developer from Kirnahar, West Bengal, India. 🚀 I'm currently pursuing B.Tech in CSE at Kalyani Government Engineering College (2022–2026) with a CGPA of 8.70, and interning at Vara Infrovate Pvt. Ltd. as a Full Stack Development Intern.",
  },
  {
    patterns: [/project|built|work|portfolio/i],
    answer: `Here are Snehasis's projects:\n\n🤖 GUIDEX AI — AI career guidance platform using Gemini AI, Next.js & Prisma (Final Year, Ongoing)\n📝 IdeaScape — Full-stack blog app with React + Appwrite\n🖥️ Collab Board — Real-time collaborative tutorial board (React, Node.js, MongoDB)\n🔍 AI Article Summarizer — Chrome extension for AI-powered summaries\n📊 Sorting Visualizer — Animated sorting algorithm visualizer\n🏦 Banker's Algorithm Simulator — OS deadlock avoidance simulator\n\n👉 github.com/SNEHASIS-CODEHUB04`,
  },
  {
    patterns: [/skill|tech|stack|language|framework|tool/i],
    answer: `Snehasis's tech stack:\n\n⚛️ Frontend: React, Next.js, TypeScript, Tailwind CSS\n🔧 Backend: Node.js, Express.js, NestJS, Kafka, Swagger\n🗄️ Database: MongoDB, MySQL, Prisma ORM, TypeORM\n🐳 DevOps: Docker, Git\n🧪 Testing: Manual Testing, Jira\n💻 Languages: Python, Java, C++, C`,
  },
  {
    patterns: [/education|college|school|degree|study|cgpa|academic/i],
    answer: `📚 Education:\n\n🎓 B.Tech — CSE @ Kalyani Government Engineering College (2022–2026) · CGPA: 8.70\n📖 Higher Secondary (WBCHSE) @ Kirnahar Shib Chandra High School (2021–2022) · 96.20%\n📖 Secondary (WBBSE) @ Kirnahar Shib Chandra High School (2019–2020) · 93.85%`,
  },
  {
    patterns: [/experience|intern|job|work|vara|company/i],
    answer: "💼 Snehasis is currently a Full Stack Development Intern at Vara Infrovate Pvt. Ltd. (On-Site) since January 2026. He's building and maintaining production-grade web applications using modern frameworks in agile workflows.",
  },
  {
    patterns: [/contact|email|reach|hire|connect/i],
    answer: "📬 You can reach Snehasis at:\n\n✉️ sdutta04.kir@gmail.com\n🐙 github.com/SNEHASIS-CODEHUB04\n💼 linkedin.com/in/snehasis-dutta-506115254\n🐦 x.com/SynnDutt04\n📍 Kirnahar, West Bengal, India",
  },
  {
    patterns: [/leetcode|codechef|competitive|programming|rating|dsa/i],
    answer: "🏆 Competitive Programming:\n\n⚡ LeetCode — 400+ problems solved · Max Rating: 1481\n🍴 CodeChef — Max Rating: 1366\n\nStrong in DSA, algorithms, and problem solving!",
  },
  {
    patterns: [/github|linkedin|twitter|social|link/i],
    answer: "🔗 Snehasis's social links:\n\n🐙 GitHub: github.com/SNEHASIS-CODEHUB04\n💼 LinkedIn: linkedin.com/in/snehasis-dutta-506115254\n🐦 Twitter/X: x.com/SynnDutt04\n✉️ Email: sdutta04.kir@gmail.com",
  },
  {
    patterns: [/location|where|city|state|india|west bengal|kirnahar/i],
    answer: "📍 Snehasis is based in Kirnahar, West Bengal, India.",
  },
  {
    patterns: [/resume|cv|download/i],
    answer: "📄 You can download Snehasis's resume from the Hero section of this portfolio — just click the 'Download CV' button!",
  },
  {
    patterns: [/guidex|ai.*career|career.*ai/i],
    answer: "🤖 GUIDEX AI is Snehasis's final year project — an AI-powered career guidance platform that analyzes user profiles and skills to generate personalized career paths, quizzes, and improvement recommendations using Gemini AI. Built with Next.js, Prisma ORM, and TypeScript.",
  },
  {
    patterns: [/ideascape|blog/i],
    answer: "📝 IdeaScape is a full-stack blog web application where users can create and manage blog posts. Built with React.js on the frontend and Appwrite as the backend/database provider.",
  },
  {
    patterns: [/collab|board|collaborative/i],
    answer: "🖥️ Collab Board is an interactive collaborative tutorial board for seamless learning and knowledge sharing — ideal for remote classrooms. Built with React, Node.js, MongoDB, and Tailwind CSS.",
  },
  {
    patterns: [/summarizer|chrome|extension/i],
    answer: "🔍 AI Article Summarizer is a Chrome Extension that uses AI to generate quick, accurate summaries of web content directly in your browser. Built with JavaScript, HTML, CSS, and an AI API.",
  },
  {
    patterns: [/sorting|visualizer|algorithm/i],
    answer: "📊 Sorting Visualizer is an educational tool that animates sorting algorithms — Bubble, Insertion, Selection, Merge, and Quick Sort — by visualizing bars representing array values step-by-step. Built with vanilla JS/HTML/CSS.",
  },
  {
    patterns: [/banker|deadlock|os|operating system/i],
    answer: "🏦 Banker's Algorithm Simulator simulates the Banker's Algorithm for deadlock avoidance in operating systems. Users can input processes and resources to visualize safe states and resource allocation. Built with JavaScript/HTML/CSS.",
  },
  {
    patterns: [/game|mini.?game|play|memory|snake|bug.?fix|typing.?speed|pattern.?recogni/i],
    answer: `🎮 There's a "Let's Play Some Games" section just above the footer with 5 mini games:\n\n🧠 Memory Game — Flip cards and match emoji pairs\n🐍 Snake Game — Classic snake, eat the cyan dot, avoid walls\n🐛 Bug Fix Game — Spot the bug in code snippets (developer style!)\n⌨️ Typing Speed Game — Type the sentence as fast as you can, get your WPM\n🔍 Pattern Recognition — Watch a number/shape sequence and find what comes next, with increasing difficulty\n\nScroll down to the bottom of the page to play!`,
  },
  {
    patterns: [/hello|hi|hey|sup|greet/i],
    answer: "Hey there! 👋 I'm Snehasis's portfolio assistant. Ask me about his skills, projects, education, experience, or how to contact him!",
  },
  {
    patterns: [/thank|thanks|great|awesome|cool/i],
    answer: "You're welcome! 😊 Feel free to ask anything else about Snehasis's portfolio.",
  },
  {
    patterns: [/help|what can|what do/i],
    answer: "I can tell you about:\n\n• 👤 About Snehasis\n• 🛠️ Skills & Tech Stack\n• 💼 Projects\n• 🎓 Education\n• 💼 Experience & Internship\n• 📬 Contact Info\n• 🏆 Competitive Programming\n• 🔗 Social Links\n• 🎮 Mini Games\n\nJust ask!",
  },
];

function getReply(input: string): string {
  const trimmed = input.trim();
  for (const entry of KB) {
    if (entry.patterns.some((p) => p.test(trimmed))) {
      return entry.answer;
    }
  }
  return "Hmm, I'm not sure about that. 🤔 Try asking about Snehasis's skills, projects, education, experience, or contact info!";
}

// ── Suggestions ─────────────────────────────────────────────────
const SUGGESTIONS = [
  "Tell me about Snehasis",
  "What are his skills?",
  "Show me his projects",
  "Education background",
  "Work experience",
  "How to contact him?",
  "Mini games?",
];

const cyan = "#00ffff";

export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [pulse, setPulse] = useState(true);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) {
      setPulse(false);
      setTimeout(() => inputRef.current?.focus(), 200);
      if (messages.length === 0) {
        setMessages([{ role: "bot", text: "Hey! 👋 I'm Snehasis's portfolio assistant. Ask me anything about his skills, projects, education, or experience!" }]);
      }
    }
  }, [open]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;
    setInput("");
    const userMsg: Message = { role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setTyping(true);
    // Simulate typing delay
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: getReply(trimmed) }]);
      setTyping(false);
    }, 600);
  };

  const reset = () => {
    setMessages([{ role: "bot", text: "Hey! 👋 I'm Snehasis's portfolio assistant. Ask me anything about his skills, projects, education, or experience!" }]);
  };

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-[200]">
        {pulse && !open && (
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ background: cyan }}
            animate={{ scale: [1, 1.9], opacity: [0.4, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          />
        )}
        <motion.button
          onClick={() => setOpen((v) => !v)}
          className="relative w-14 h-14 rounded-full flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #000 60%, #001a1a)",
            border: `2px solid ${cyan}`,
            boxShadow: `0 0 20px ${cyan}55`,
          }}
          whileHover={{ scale: 1.1, boxShadow: `0 0 30px ${cyan}88` }}
          whileTap={{ scale: 0.95 }}
        >
          <Sparkles className="w-6 h-6" style={{ color: cyan }} />
        </motion.button>
      </div>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed z-[199] flex flex-col rounded-2xl overflow-hidden
              bottom-0 left-0 right-0 rounded-b-none
              sm:bottom-24 sm:right-6 sm:left-auto sm:rounded-2xl sm:w-[360px]"
            style={{
              background: "#0a0a0a",
              border: `1px solid rgba(0,255,255,0.2)`,
              boxShadow: `0 0 40px rgba(0,255,255,0.08), 0 20px 60px rgba(0,0,0,0.8)`,
              height: "70vh",
              maxHeight: 520,
            }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 shrink-0"
              style={{ background: "#111", borderBottom: "1px solid rgba(0,255,255,0.1)" }}>
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-2 h-2 rounded-full"
                  style={{ background: cyan }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
                <span className="text-xs font-mono font-bold" style={{ color: cyan }}>Portfolio Assistant</span>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={reset} className="p-1.5 rounded-lg hover:bg-white/5 transition-colors" title="Reset" style={{ color: "rgba(0,255,255,0.4)" }}>
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-white/5 transition-colors" style={{ color: "rgba(0,255,255,0.4)" }}>
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-xs font-mono">
              {messages.map((msg, i) => (
                <motion.div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                  <div
                    className="max-w-[88%] px-3 py-2 rounded-xl leading-relaxed whitespace-pre-wrap"
                    style={msg.role === "user"
                      ? { background: cyan, color: "#000", borderRadius: "12px 12px 2px 12px" }
                      : { background: "rgba(0,255,255,0.06)", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(0,255,255,0.12)", borderRadius: "12px 12px 12px 2px" }
                    }
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <div className="flex justify-start">
                  <div className="px-3 py-2 rounded-xl" style={{ background: "rgba(0,255,255,0.06)", border: "1px solid rgba(0,255,255,0.12)" }}>
                    <div className="flex items-center gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: cyan }}
                          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                          transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.2 }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5 shrink-0">
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => send(s)}
                    className="text-[10px] font-mono px-2.5 py-1 rounded-full border transition-all hover:border-cyan-400 hover:text-cyan-400"
                    style={{ borderColor: "rgba(0,255,255,0.2)", color: "rgba(0,255,255,0.5)" }}>
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="flex items-center gap-2 px-3 py-3 shrink-0"
              style={{ borderTop: "1px solid rgba(0,255,255,0.1)" }}>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send(input)}
                placeholder="Ask about Snehasis..."
                className="flex-1 bg-transparent outline-none text-xs font-mono placeholder:text-white/20"
                style={{ color: "rgba(255,255,255,0.85)" }}
              />
              <button onClick={() => send(input)} disabled={!input.trim() || typing}
                className="p-2 rounded-lg transition-all disabled:opacity-30"
                style={{ background: input.trim() ? cyan : "transparent", color: input.trim() ? "#000" : cyan, border: `1px solid ${cyan}44` }}>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
