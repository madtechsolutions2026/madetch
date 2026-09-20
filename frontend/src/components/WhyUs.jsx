import React from "react";
import { DIFFERENTIATORS } from "../data/siteContent";

export default function WhyUs({ onCursorEnter, onCursorLeave }) {
  return (
    <section className="why" id="why">
      <div className="section-head">
        <div>
          <p className="section-tag">Why Mad Tech</p>
          <h2 className="section-title">
            Reasons that survive <span className="serif">a reference check.</span>
          </h2>
        </div>
        <span className="section-count">06 reasons</span>
      </div>

      <div className="why-grid">
        {DIFFERENTIATORS.map((item, i) => (
          <article
            className="why-card"
            key={item.idx}
            data-reveal
            style={{ "--reveal-delay": `${(i % 3) * 80}ms` }}
            onMouseEnter={() => onCursorEnter?.(item.title)}
            onMouseLeave={() => onCursorLeave?.()}
          >
            <span className="why-idx">{item.idx}</span>
            <h3 className="why-title">{item.title}</h3>
            <p className="why-body">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
