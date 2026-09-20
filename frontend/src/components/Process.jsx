import React from "react";
import { PROCESS } from "../data/siteContent";

export default function Process({ onCursorEnter, onCursorLeave }) {
  return (
    <section className="process" id="process">
      <div className="section-head">
        <div>
          <p className="section-tag">How we work</p>
          <h2 className="section-title">
            Four steps, <span className="serif">no theatre.</span>
          </h2>
        </div>
        <span className="section-count">04 stages</span>
      </div>

      <ol className="process-list">
        {PROCESS.map((step, i) => (
          <li
            className="process-step"
            key={step.idx}
            data-reveal
            style={{ "--reveal-delay": `${i * 90}ms` }}
            onMouseEnter={() => onCursorEnter?.(step.title)}
            onMouseLeave={() => onCursorLeave?.()}
          >
            <div className="process-rail" aria-hidden="true">
              <span className="process-dot"></span>
            </div>

            <div className="process-index">
              <span className="process-num">{step.idx}</span>
              <span className="process-duration">{step.duration}</span>
            </div>

            <div className="process-body">
              <h3 className="process-title">{step.title}</h3>
              <p className="process-line">{step.line}</p>
              <p className="process-text">{step.body}</p>
              <ul className="process-points">
                {step.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
