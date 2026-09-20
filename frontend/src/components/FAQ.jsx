import React, { useState } from "react";
import { Plus } from "lucide-react";
import { FAQS } from "../data/siteContent";

export default function FAQ({ onCursorEnter, onCursorLeave }) {
  const [open, setOpen] = useState(0);

  return (
    <section className="faq" id="faq">
      <div className="section-head">
        <div>
          <p className="section-tag">Questions</p>
          <h2 className="section-title">
            Answered <span className="serif">before you ask.</span>
          </h2>
        </div>
        <span className="section-count">{String(FAQS.length).padStart(2, "0")} answers</span>
      </div>

      <div className="faq-list">
        {FAQS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div className={`faq-item ${isOpen ? "open" : ""}`} key={item.q} data-reveal>
              <button
                className="faq-q"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : i)}
                onMouseEnter={() => onCursorEnter?.(isOpen ? "Close" : "Open")}
                onMouseLeave={() => onCursorLeave?.()}
              >
                <span className="faq-q-text">{item.q}</span>
                <span className="faq-icon" aria-hidden="true">
                  <Plus size={18} />
                </span>
              </button>

              <div className="faq-a-wrap">
                <div className="faq-a-inner">
                  <p className="faq-a">{item.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
