"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { GraduationCap } from "lucide-react";
import { education } from "@/lib/data";

export default function Education() {
  return (
    <section id="education" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-2">
          Academic background
        </p>
        <h2 className="text-3xl sm:text-4xl font-black leading-tight">EDUCATION</h2>
      </motion.div>

      {/* Timeline */}
      <div className="relative ml-4 sm:ml-6 md:ml-8">
        {/* Vertical line */}
        <motion.div
          className="absolute left-0 top-2 bottom-2 w-px bg-border"
          initial={{ scaleY: 0, originY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />

        <div className="space-y-10">
          {education.map((item, i) => (
            <motion.div
              key={i}
              className="relative pl-8 sm:pl-10 md:pl-14"              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              {/* Timeline dot */}
              <motion.div
                className="absolute left-0 top-6 -translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 border-foreground z-10"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + 0.2, type: "spring", stiffness: 300 }}
              >
                {/* Inner pulse dot */}
                <span className="absolute inset-1 rounded-full bg-foreground" />
              </motion.div>

              {/* Card */}
              <motion.div
                className="group border border-border rounded-2xl p-6 bg-card hover:border-foreground/40 hover:shadow-lg transition-all duration-300"
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
                  {/* Logo */}
                  <div className="shrink-0 w-14 h-14 rounded-xl border border-border bg-muted flex items-center justify-center overflow-hidden">
                    {item.logo ? (
                      <Image
                        src={item.logo}
                        alt={item.institution}
                        width={48}
                        height={48}
                        className="object-contain p-1"
                        unoptimized
                      />
                    ) : (
                      <GraduationCap className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    {/* Top row */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                      <div>
                        <h3 className="font-black text-base sm:text-lg leading-tight">
                          {item.degree}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-0.5 font-medium">
                          {item.institution}
                        </p>
                      </div>

                      {/* Badges */}
                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        <span className="text-xs font-mono bg-muted border border-border px-3 py-1 rounded-full whitespace-nowrap">
                          {item.period}
                        </span>
                        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-foreground text-background whitespace-nowrap">
                          {item.detail}
                        </span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-border my-3" />

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
