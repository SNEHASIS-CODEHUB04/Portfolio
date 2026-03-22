"use client";
import { useEffect, useState } from "react";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

/* ── Live clock ── */
function useClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-IN", { hour12: true, timeZone: "Asia/Kolkata" }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

/* ── Typing logo ── */
function TypingLogo() {
  const text = "SNEHASIS-CODEHUB04";
  const [display, setDisplay] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplay(text.slice(0, i));
      if (i >= text.length) { clearInterval(id); setDone(true); }
    }, 80);
    return () => clearInterval(id);
  }, []);

  return (
    <h2
      className="font-mono font-black tracking-widest text-xl md:text-2xl glitch-hover select-none"
      style={{ color: "#00ffff", textShadow: "0 0 10px #00ffff, 0 0 20px #00ffff55" }}
    >
      {display}
      {!done && (
        <span
          className="inline-block w-[2px] h-5 ml-1 align-middle"
          style={{ background: "#00ffff", animation: "blink 0.8s step-end infinite" }}
        />
      )}
    </h2>
  );
}

const ASCII = `
 ███████╗███╗   ██╗███████╗██╗  ██╗ █████╗ ███████╗██╗███████╗
 ██╔════╝████╗  ██║██╔════╝██║  ██║██╔══██╗██╔════╝██║██╔════╝
 ███████╗██╔██╗ ██║█████╗  ███████║███████║███████╗██║███████╗
 ╚════██║██║╚██╗██║██╔══╝  ██╔══██║██╔══██║╚════██║██║╚════██║
 ███████║██║ ╚████║███████╗██║  ██║██║  ██║███████║██║███████║
 ╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝╚══════╝`.trim();

export default function Footer() {
  const clock = useClock();
  const [asciiVisible, setAsciiVisible] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setAsciiVisible(true), 400);
    return () => clearTimeout(id);
  }, []);

  return (
    <footer
      className="relative overflow-hidden border-t"
      style={{ borderColor: "rgba(0,255,255,0.15)", background: "#000" }}
    >
      {/* Hacker grid bg */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#00ffff 1px,transparent 1px),linear-gradient(90deg,#00ffff 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Top glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,#00ffff55,transparent)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 flex flex-col items-center gap-8 sm:gap-10">

        {/* ASCII art — hidden on small/medium screens */}
        <div
          className="hidden md:block w-full overflow-x-auto text-center transition-opacity duration-700"
          style={{ opacity: asciiVisible ? 1 : 0 }}
        >
          <pre
            className="inline-block text-[7px] sm:text-[9px] md:text-[11px] leading-tight font-mono text-left"
            style={{
              color: "#00ffff",
              textShadow: "0 0 8px #00ffff, 0 0 16px #00ffff44",
            }}
          >
            {ASCII}
          </pre>
        </div>

        {/* Typing logo */}
        <TypingLogo />

        {/* Divider */}
        <div className="w-full flex items-center gap-4">
          <div className="flex-1 h-px" style={{ background: "rgba(0,255,255,0.15)" }} />
          <span className="text-[10px] font-mono" style={{ color: "rgba(0,255,255,0.4)" }}>
            [ FULL STACK DEVELOPER ]
          </span>
          <div className="flex-1 h-px" style={{ background: "rgba(0,255,255,0.15)" }} />
        </div>

        {/* Social links */}
        <div className="flex items-center gap-6">
          {[
            { href: "https://github.com/SNEHASIS-CODEHUB04", icon: <Github className="w-5 h-5" />, label: "GitHub" },
            { href: "https://www.linkedin.com/in/snehasis-dutta-506115254", icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn" },
            { href: "https://x.com/SynnDutt04", icon: <Twitter className="w-5 h-5" />, label: "Twitter" },
            { href: "mailto:sdutta04.kir@gmail.com", icon: <Mail className="w-5 h-5" />, label: "Email" },
          ].map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2 rounded-lg border transition-all duration-200 group"
              style={{ borderColor: "rgba(0,255,255,0.15)", color: "rgba(0,255,255,0.5)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#00ffff";
                (e.currentTarget as HTMLElement).style.color = "#00ffff";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 12px #00ffff55";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,255,0.15)";
                (e.currentTarget as HTMLElement).style.color = "rgba(0,255,255,0.5)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {icon}
            </a>
          ))}
        </div>

        {/* Uptime + copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-[11px] font-mono text-center"
          style={{ color: "rgba(0,255,255,0.35)" }}>
          <span>© 2025 SNEHASIS-CODEHUB04. All rights reserved.</span>
          <span className="hidden sm:block" style={{ color: "rgba(0,255,255,0.2)" }}>|</span>
          <span>
            IST —{" "}
            <span style={{ color: "rgba(0,255,255,0.6)" }}>{clock}</span>
          </span>
        </div>

      </div>

      {/* Bottom glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-24 blur-3xl pointer-events-none"
        style={{ background: "rgba(0,255,255,0.04)" }}
      />
    </footer>
  );
}
