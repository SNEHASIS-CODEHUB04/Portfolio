"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";

export default function Works() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="works" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-16">
        <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-2">
          Logic meets Aesthetics, Seamlessly
        </p>
        <h2 className="text-3xl sm:text-4xl font-black leading-tight">WORKS</h2>
        <p className="text-muted-foreground mt-3 max-w-lg text-sm leading-relaxed">
          FEATURED PROJECTS CRAFTED WITH PASSION TO DRIVE RESULTS AND IMPACT.
        </p>
      </div>

      {/* Desktop: accordion list + floating image preview */}
      <div className="hidden md:flex gap-8 items-start">
        {/* Left — project list */}
        <div className="flex-1 border border-border rounded-xl overflow-hidden">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              className={`group cursor-pointer border-b border-border last:border-b-0 transition-colors duration-200 ${
                activeIdx === i ? "bg-muted/60" : "hover:bg-muted/30"
              }`}
              onClick={() => setActiveIdx(activeIdx === i ? null : i)}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Row header */}
              <div className="flex items-center justify-between px-6 py-5">
                <div className="flex items-center gap-5">
                  <span className="text-xs font-mono text-muted-foreground w-6">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-black text-lg group-hover:translate-x-1 transition-transform duration-200">
                    {project.title}
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  {/* Tags preview — visible on hover */}
                  <div className="hidden lg:flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-2 py-0.5 bg-background border border-border rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <motion.div
                    animate={{ rotate: activeIdx === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
                  </motion.div>
                </div>
              </div>

              {/* Expanded content */}
              <AnimatePresence initial={false}>
                {activeIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 grid grid-cols-2 gap-6">
                      {/* Image */}
                      <div className="relative h-48 rounded-lg overflow-hidden bg-muted">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      {/* Details */}
                      <div className="flex flex-col justify-between">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {project.description}
                        </p>
                        <div>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs font-mono px-2 py-1 bg-background border border-border rounded uppercase tracking-wide"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex gap-3">
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-2 text-xs font-semibold border border-border px-4 py-2 rounded-full hover:bg-background transition-colors"
                            >
                              <Github className="w-3.5 h-3.5" />
                              GitHub
                            </a>
                            {project.live && (
                              <a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-2 text-xs font-semibold bg-foreground text-background px-4 py-2 rounded-full hover:opacity-80 transition-opacity"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                Live
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Right — floating image preview on hover (when nothing is expanded) */}
        <div className="w-72 sticky top-24">
          <AnimatePresence mode="wait">
            {hoveredIdx !== null && activeIdx === null && (
              <motion.div
                key={hoveredIdx}
                className="relative h-52 rounded-xl overflow-hidden border border-border bg-muted"
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src={projects[hoveredIdx].image}
                  alt={projects[hoveredIdx].title}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white text-sm font-bold">{projects[hoveredIdx].title}</p>
                  <p className="text-white/70 text-xs mt-0.5">
                    {projects[hoveredIdx].tags.slice(0, 3).join(" · ")}
                  </p>
                </div>
              </motion.div>
            )}
            {(hoveredIdx === null || activeIdx !== null) && (
              <motion.div
                key="placeholder"
                className="h-52 rounded-xl border border-dashed border-border flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-xs font-mono text-muted-foreground">hover a project</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Project count */}
          <div className="mt-4 text-center">
            <span className="text-xs font-mono text-muted-foreground">
              {projects.length} projects
            </span>
          </div>
        </div>
      </div>

      {/* Mobile: card grid */}
      <div className="md:hidden grid grid-cols-1 gap-5">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            className="border border-border rounded-xl overflow-hidden bg-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
          >
            {/* Image */}
            <div className="relative h-44 bg-muted">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute top-3 left-3 bg-black/60 text-white text-xs font-mono px-2 py-0.5 rounded">
                {String(i + 1).padStart(2, "0")}
              </div>
            </div>
            {/* Content */}
            <div className="p-5">
              <h3 className="font-black text-base mb-2">{project.title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-2 py-0.5 bg-muted border border-border rounded uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold border border-border px-3 py-1.5 rounded-full hover:bg-muted transition-colors"
                >
                  <Github className="w-3 h-3" />
                  GitHub
                </a>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold bg-foreground text-background px-3 py-1.5 rounded-full"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Live
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
