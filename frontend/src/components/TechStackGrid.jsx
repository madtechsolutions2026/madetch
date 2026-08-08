import React from "react";
import { TECH_STACK } from "../data/projectsData";
import { Layers } from "lucide-react";

export default function TechStackGrid({ onCursorEnter, onCursorLeave }) {
  return (
    <section className="tech-stack-section" id="tech-stack">
      <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
        <div>
          <p className="section-tag" style={{ marginBottom: 8 }}>
            Engineered Stack
          </p>
          <h2 className="font-display text-3xl uppercase">Full-Stack Expertise</h2>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Layers size={14} className="text-blue-400" />
          <span>Production-Tested Frameworks</span>
        </div>
      </div>

      <div className="tech-grid">
        {TECH_STACK.map((tech) => (
          <div
            key={tech.name}
            className="tech-card"
            onMouseEnter={() => onCursorEnter(tech.name)}
            onMouseLeave={onCursorLeave}
          >
            <div className="tech-name">{tech.name}</div>
            <div className="tech-category">{tech.category}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
