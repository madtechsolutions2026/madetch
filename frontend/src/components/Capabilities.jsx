import React, { useState } from "react";
import { Code, Smartphone, Bot, TrendingUp, CheckCircle2 } from "lucide-react";
import { CAPABILITIES } from "../data/projectsData";

export default function Capabilities({ onCursorEnter, onCursorLeave }) {
  const [activeCap, setActiveCap] = useState(null);

  const getIcon = (idx) => {
    switch (idx) {
      case "01":
        return <Code size={20} className="text-blue-400" />;
      case "02":
        return <Smartphone size={20} className="text-blue-400" />;
      case "03":
        return <Bot size={20} className="text-blue-400" />;
      case "04":
      default:
        return <TrendingUp size={20} className="text-blue-400" />;
    }
  };

  return (
    <section className="caps" id="capabilities">
      <p className="section-tag">Capabilities</p>

      <div className="caps-grid">
        {CAPABILITIES.map((cap) => (
          <div
            key={cap.idx}
            className={`cap-card ${activeCap === cap.idx ? "active-card" : ""}`}
            onMouseEnter={() => {
              setActiveCap(cap.idx);
              onCursorEnter(cap.title);
            }}
            onMouseLeave={() => {
              setActiveCap(null);
              onCursorLeave();
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="cap-idx">{cap.idx}</span>
              {getIcon(cap.idx)}
            </div>

            <h3 className="cap-title">{cap.title}</h3>
            <p className="cap-sub">{cap.subtitle}</p>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">{cap.details}</p>

            <div className="cap-skills">
              {cap.skills.map((skill) => (
                <span key={skill} className="skill-chip">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
