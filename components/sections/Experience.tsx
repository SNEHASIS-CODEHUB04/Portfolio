"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Briefcase, MapPin } from "lucide-react";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-2">
          Where I've worked
        </p>
        <h2 className="text-3xl sm:text-4xl font-black leading-tight">EXPERIENCE</h2>
      </motion.div>

      <div className="space-y-4">
        {experience.map((item, i) => (
          <motion.div
            key={i}
            className="group border border-border rounded-xl p-6 bg-card hover:border-foreground/30 transition-colors duration-300"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
              {/* Logo */}
              <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl border border-border bg-muted flex items-center justify-center overflow-hidden">
                {item.logo ? (
                  <Image
                    src={item.logo}
                    alt={item.company}
                    width={48}
                    height={48}
                    className="object-contain p-1"
                  />
                ) : (
                  <Briefcase className="w-6 h-6 text-muted-foreground" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                  <div>
                    <h3 className="font-black text-lg leading-tight">{item.role}</h3>
                    <p className="text-sm font-semibold text-muted-foreground mt-0.5">
                      {item.company}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-xs font-mono bg-muted border border-border px-2.5 py-1 rounded-full">
                      {item.period}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {item.type}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  {item.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
