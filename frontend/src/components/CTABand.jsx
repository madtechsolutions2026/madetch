import React from "react";
import { ArrowUpRight } from "lucide-react";
import { COMPANY } from "../data/siteContent";

export default function CTABand({ onCursorEnter, onCursorLeave }) {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="cta-band" id="start">
      <div className="cta-inner" data-reveal>
        <p className="section-tag">Next move</p>
        <h2 className="cta-title">
          Tell us the mad idea.<br />
          <span className="serif">We will show you it working.</span>
        </h2>
        <p className="cta-sub">
          One brief, 48 hours, a real demo on a real device. No retainer, no
          deck, no obligation to continue.
        </p>

        <div className="cta-actions">
          <button
            className="btn"
            onClick={scrollToContact}
            onMouseEnter={() => onCursorEnter?.("Start")}
            onMouseLeave={() => onCursorLeave?.()}
          >
            <span>Start your project</span>
            <ArrowUpRight size={16} />
          </button>
          <a
            className="btn ghost-btn"
            href={`mailto:${COMPANY.email}`}
            onMouseEnter={() => onCursorEnter?.("Email us")}
            onMouseLeave={() => onCursorLeave?.()}
          >
            <span>{COMPANY.email}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
