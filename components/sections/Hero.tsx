"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import Image from "next/image";
import { roles, social } from "@/lib/data";

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIdx]);

  const scrollDown = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center px-4 sm:px-6 pt-20 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-muted-foreground text-xs sm:text-sm font-mono mb-3 sm:mb-4 tracking-widest uppercase">
            Hello, Myself
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-none mb-3 sm:mb-4">
            SNEHASIS
            <br />
            DUTTA
          </h1>
          <div className="flex items-center gap-2 mb-4 sm:mb-6 h-7 sm:h-8">
            <span className="text-base sm:text-xl font-mono text-muted-foreground">
              {displayed}
            </span>
            <span className="w-0.5 h-5 sm:h-6 bg-foreground animate-blink" />
          </div>
          <p className="text-muted-foreground text-sm max-w-md leading-relaxed mb-6 sm:mb-8">
            I&apos;m a passionate Full Stack Web Developer who loves building dynamic, responsive
            web applications with a focus on clean code and great user experience.
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <a
              href="mailto:sdutta04.kir@gmail.com"
              className="inline-flex items-center gap-2 bg-foreground text-background px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm font-semibold hover:opacity-80 transition-opacity"
            >
              <Mail className="w-4 h-4" />
              Say Hello
            </a>
            <a
              href="/SnehasisDutta_CV.pdf"
              download
              className="inline-flex items-center gap-2 border border-border px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm font-semibold hover:bg-muted transition-colors"
            >
              Download CV
            </a>
          </div>

          {/* Social links */}
          <div className="flex flex-wrap gap-3 sm:gap-4 mt-6 sm:mt-8">
            {social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors border-b border-transparent hover:border-foreground pb-0.5"
              >
                {s.label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right — profile image */}
        <motion.div
          className="flex justify-center md:justify-end order-first md:order-last"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
            <div className="absolute inset-0 rounded-2xl bg-muted" />
            <Image
              src="/pf-dp.jpg"
              alt="Snehasis Dutta"
              fill
              className="object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-500"
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollDown}
        className="mt-10 sm:mt-16 flex items-center gap-2 text-muted-foreground text-sm hover:text-foreground transition-colors mx-auto md:mx-0"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ArrowDown className="w-4 h-4" />
        Scroll Down
      </motion.button>
    </section>
  );
}
