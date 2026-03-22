"use client";
import { motion } from "framer-motion";
import { services } from "@/lib/data";

export default function Services() {
  return (
    <section id="services" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section label */}
      <div className="flex items-center gap-4 mb-4">
        <span className="text-xs font-mono text-muted-foreground tracking-widest uppercase">
          Behind the scene, Beyond the screen
        </span>
      </div>

      <div className="mb-16">
        <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-2">
          Service
        </p>
        <h2 className="text-3xl sm:text-4xl font-black leading-tight max-w-xl">
          I BUILD SECURE, HIGH-PERFORMANCE FULL-STACK APPS
          <br />
          <span className="text-muted-foreground">WITH SMOOTH UX TO DRIVE GROWTH</span>
          <br />
          NOT HEADACHES.
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-0 border border-border rounded-xl overflow-hidden">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            className={`p-6 sm:p-8 ${
              i < services.length - 1
                ? "border-b sm:border-b-0 sm:border-r border-border last:border-b-0"
                : ""
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <h3 className="font-bold text-lg mb-3">{service.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              {service.description}
            </p>
            <ul className="space-y-2">
              {service.items.map((item) => (
                <li key={item} className="text-sm font-mono text-muted-foreground">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
