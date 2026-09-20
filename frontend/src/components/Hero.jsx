import React from "react";
import { ArrowUpRight } from "lucide-react";

/* Splits a word into animated characters with a staggered delay.
   `start` keeps the stagger continuous across separate words. */
function SplitWord({ text, start = 0, className = "" }) {
  return (
    <span className={`word ${className}`}>
      {text.split("").map((char, i) => (
        <span
          key={`${char}-${i}`}
          className="char"
          style={{ animationDelay: `${(start + i) * 0.035}s` }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

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

      <h1 className="hero-title" aria-label="Make anything digital.">
        <span className="line" aria-hidden="true">
          <SplitWord text="MAKE" start={0} />
        </span>
        <span className="line" aria-hidden="true">
          <SplitWord text="anything" start={5} className="script" />
        </span>
        <span className="line" aria-hidden="true">
          <SplitWord text="DIGITAL." start={14} className="grad" />
        </span>
      </h1>

      <div className="hero-foot">
        <p className="hero-sub">
          Websites, apps, AI agents and growth engines — built from first
          principles for people who are tired of templates. You see a working
          demo in 48 hours, before you pay a rupee.
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

      <a
        className="hero-scroll"
        href="#about"
        aria-label="Scroll to content"
        onClick={(e) => {
          e.preventDefault();
          handleScrollTo("#about");
        }}
      >
        <span className="hero-scroll-label">Scroll</span>
        <span className="hero-scroll-line" aria-hidden="true"></span>
      </a>
    </section>
  );
}
