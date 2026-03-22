"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const TRAIL_COUNT = 10;
const cyan = "#00ffff";

/* ── Trail dot ── */
function TrailDot({
  index,
  targetX,
  targetY,
}: {
  index: number;
  targetX: ReturnType<typeof useMotionValue<number>>;
  targetY: ReturnType<typeof useMotionValue<number>>;
}) {
  const stiff = Math.max(30, 120 - index * 11);
  const damp = 16 + index * 2;
  const x = useSpring(targetX, { stiffness: stiff, damping: damp });
  const y = useSpring(targetY, { stiffness: stiff, damping: damp });
  const size = Math.max(2, 10 - index);
  const opacity = ((TRAIL_COUNT - index) / TRAIL_COUNT) * 0.5;

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9997]"
      style={{
        width: size,
        height: size,
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        background: cyan,
        opacity,
        boxShadow: `0 0 ${6 - index * 0.5}px ${cyan}`,
      }}
    />
  );
}

/* ── Electric spark particle ── */
type Spark = { id: number; x: number; y: number; angle: number; dist: number };

function SparkParticle({ spark }: { spark: Spark }) {
  const tx = Math.cos(spark.angle) * spark.dist;
  const ty = Math.sin(spark.angle) * spark.dist;
  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998]"
      style={{
        width: 3,
        height: 3,
        left: spark.x,
        top: spark.y,
        background: cyan,
        boxShadow: `0 0 6px ${cyan}, 0 0 12px ${cyan}`,
      }}
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{ x: tx, y: ty, opacity: 0, scale: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    />
  );
}

/* ── Magnetic hook ── */
function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLElement | null>(null);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      const els = document.querySelectorAll<HTMLElement>("button, a");
      els.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const threshold = Math.max(rect.width, rect.height) * 0.9;

        if (dist < threshold) {
          const pull = (1 - dist / threshold) * strength;
          el.style.transform = `translate(${dx * pull}px, ${dy * pull}px)`;
          el.style.transition = "transform 0.1s ease";
        } else {
          el.style.transform = "";
          el.style.transition = "transform 0.3s ease";
        }
      });
    },
    [strength]
  );

  const onMouseLeave = useCallback(() => {
    document.querySelectorAll<HTMLElement>("button, a").forEach((el) => {
      el.style.transform = "";
      el.style.transition = "transform 0.4s ease";
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [onMouseMove, onMouseLeave]);

  return ref;
}

/* ── Main cursor ── */
export default function SpiderCursor() {
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const sparkId = useRef(0);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const springX = useSpring(mouseX, { stiffness: 800, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 800, damping: 40 });

  useMagnetic(0.3);

  useEffect(() => {
    setMounted(true);
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onHover = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setHovering(
        el.tagName === "BUTTON" ||
        el.tagName === "A" ||
        !!el.closest("button") ||
        !!el.closest("a") ||
        window.getComputedStyle(el).cursor === "pointer"
      );
    };

    const onDown = (e: MouseEvent) => {
      setClicking(true);
      // Spawn electric sparks
      const count = 10 + Math.floor(Math.random() * 6);
      const newSparks: Spark[] = Array.from({ length: count }, (_, i) => ({
        id: sparkId.current++,
        x: e.clientX,
        y: e.clientY,
        angle: (i / count) * Math.PI * 2 + Math.random() * 0.5,
        dist: 30 + Math.random() * 50,
      }));
      setSparks((prev) => [...prev, ...newSparks]);
      // Clean up after animation
      setTimeout(() => {
        setSparks((prev) => prev.filter((s) => !newSparks.find((n) => n.id === s.id)));
      }, 600);
    };

    const onUp = () => setClicking(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousemove", onHover);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", onHover);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <>
      {/* Trail */}
      {Array.from({ length: TRAIL_COUNT }, (_, i) => (
        <TrailDot key={i} index={i} targetX={mouseX} targetY={mouseY} />
      ))}

      {/* Electric sparks on click */}
      <AnimatePresence>
        {sparks.map((spark) => (
          <SparkParticle key={spark.id} spark={spark} />
        ))}
      </AnimatePresence>

      {/* Click shockwave */}
      <AnimatePresence>
        {clicking && (
          <motion.div
            key="shockwave"
            className="fixed top-0 left-0 rounded-full pointer-events-none z-[9996] border"
            style={{
              x: springX,
              y: springY,
              translateX: "-50%",
              translateY: "-50%",
              borderColor: cyan,
            }}
            initial={{ width: 10, height: 10, opacity: 0.8 }}
            animate={{ width: 80, height: 80, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] border"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: cyan,
        }}
        animate={{
          width: hovering ? 48 : clicking ? 16 : 30,
          height: hovering ? 48 : clicking ? 16 : 30,
          boxShadow: hovering
            ? `0 0 18px ${cyan}, 0 0 36px ${cyan}55, inset 0 0 10px ${cyan}22`
            : clicking
            ? `0 0 28px ${cyan}, 0 0 56px ${cyan}99`
            : `0 0 6px ${cyan}88`,
          opacity: hovering ? 1 : 0.6,
          rotate: hovering ? 45 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      />

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          background: cyan,
          boxShadow: `0 0 8px ${cyan}, 0 0 16px ${cyan}`,
        }}
        animate={{
          width: clicking ? 12 : hovering ? 5 : 5,
          height: clicking ? 12 : hovering ? 5 : 5,
          opacity: clicking ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Hover electric pulse */}
      <AnimatePresence>
        {hovering && (
          <motion.div
            key="pulse"
            className="fixed top-0 left-0 rounded-full pointer-events-none z-[9996]"
            style={{
              x: springX,
              y: springY,
              translateX: "-50%",
              translateY: "-50%",
              background: `radial-gradient(circle, ${cyan}33 0%, transparent 70%)`,
            }}
            initial={{ width: 40, height: 40, opacity: 0 }}
            animate={{
              width: [48, 72, 48],
              height: [48, 72, 48],
              opacity: [0.3, 0.6, 0.3],
            }}
            exit={{ opacity: 0 }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
