import React from "react";
import { ArrowUpRight, Code, ShieldCheck, Zap } from "lucide-react";

export default function Hero({ onCursorEnter, onCursorLeave }) {
  const handleScrollTo = (target) => {
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero" id="hero">
      <p className="eyebrow">
        <span className="tick"></span>
        Mad Tech Solutions — Digital Studio · India · Worldwide
      </p>

      <h1 className="hero-title" aria-label="Mad about anything digital.">
        <span className="line">
          <span className="word">
            M<em>A</em>D
          </span>{" "}
          <span className="word ghost">about</span>
        </span>
        <span className="line">
          <span className="word">ANYTHING</span>
        </span>
        <span className="line">
          <span className="word grad">DIGITAL.</span>
        </span>
      </h1>

      <div className="hero-foot">
        <p className="hero-sub">
          We take mad ideas and engineer them into bespoke websites, scalable mobile applications, custom AI agent integrations, and organic growth engines.
        </p>

        <div className="hero-cta">
          <button
            className="btn"
            onClick={() => handleScrollTo("#contact")}
            onMouseEnter={() => onCursorEnter("Let's go")}
            onMouseLeave={onCursorLeave}
          >
            <span>Start your project</span>
            <ArrowUpRight size={16} />
          </button>

          <button
            className="btn ghost-btn"
            onClick={() => handleScrollTo("#work")}
            onMouseEnter={() => onCursorEnter("Explore")}
            onMouseLeave={onCursorLeave}
          >
            <span>Selected work</span>
          </button>
        </div>
      </div>

      {/* Rotating Hero Badge */}
      <div className="hero-badge" aria-hidden="true">
        <svg viewBox="0 0 200 200">
          <defs>
            <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
          </defs>
          <text>
            <textPath href="#badge-circle">MAKE ANYTHING DIGITAL · EST 2025 · MAD TECH · </textPath>
          </text>
        </svg>
        <span className="hero-badge-core">&lt;/&gt;</span>
      </div>
    </section>
  );
}
