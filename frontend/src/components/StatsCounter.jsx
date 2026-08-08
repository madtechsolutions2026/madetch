import React, { useEffect, useState, useRef } from "react";
import { STATS } from "../data/projectsData";

export default function StatsCounter() {
  const [counts, setCounts] = useState(STATS.map(() => 0));
  const containerRef = useRef(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          const duration = 1400;
          const start = performance.now();

          const animate = (now) => {
            const progress = Math.min(1, (now - start) / duration);
            const ease = 1 - Math.pow(1 - progress, 3);

            setCounts(STATS.map((stat) => Math.round(stat.count * ease)));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats-wrap" style={{ padding: "0 var(--pad)" }}>
      <div className="stats" ref={containerRef}>
        {STATS.map((stat, idx) => (
          <div key={stat.label} className="stat-item">
            <div className="stat-num">
              <span>{counts[idx]}</span>
              <span className="stat-suffix">{stat.suffix}</span>
            </div>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
