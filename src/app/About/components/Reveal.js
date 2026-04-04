"use client";

import { useEffect, useRef } from "react";

/* ── Reveal
   Wraps any content with a scroll-triggered fade/slide animation.
   Props:
     dir      → "" (up) | "left" | "right"
     className → extra classes
     style     → inline styles (e.g. transitionDelay)
     children  → content
   ─────────────────────────────────────── */
export default function Reveal({ children, className = "", dir = "", style = {} }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("visible");
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cls =
    dir === "left"  ? "reveal-left"  :
    dir === "right" ? "reveal-right" :
    "reveal";

  return (
    <div ref={ref} className={`${cls} ${className}`} style={style}>
      {children}
    </div>
  );
}