import React from "react";
import { ShieldCheck, Lock, FileCheck2 } from "lucide-react";
import { TRUST } from "../data/siteContent";

export default function TrustSection({ onNavigate }) {
  return (
    <section className="trust" id="security">
      <div className="section-head">
        <div>
          <p className="section-tag">Security & compliance</p>
          <h2 className="section-title">
            Boring where it <span className="serif">has to be.</span>
          </h2>
        </div>
        <span className="section-count">
          <ShieldCheck size={14} /> DPDP 2023 aligned
        </span>
      </div>

      <p className="trust-intro">
        Clients hand us their customers' data, their cloud accounts and their
        revenue. That deserves discipline rather than a badge graphic, so here
        is exactly how we handle it.
      </p>

      <div className="trust-grid">
        {TRUST.map((item, i) => (
          <article
            className="trust-card"
            key={item.title}
            data-reveal
            style={{ "--reveal-delay": `${(i % 3) * 80}ms` }}
          >
            <span className="trust-icon" aria-hidden="true">
              <Lock size={15} />
            </span>
            <h3 className="trust-title">{item.title}</h3>
            <p className="trust-body">{item.body}</p>
          </article>
        ))}
      </div>

      <div className="trust-docs" data-reveal>
        <FileCheck2 size={16} className="trust-docs-icon" />
        <p>
          The full detail lives in our policies — what we collect, how long we
          keep it, and the rights you have over it.
        </p>
        <div className="trust-doc-links">
          <a href="/privacy-policy" onClick={(e) => onNavigate?.(e, "/privacy-policy")}>
            Privacy Policy
          </a>
          <a href="/terms-of-service" onClick={(e) => onNavigate?.(e, "/terms-of-service")}>
            Terms of Service
          </a>
          <a href="/refund-policy" onClick={(e) => onNavigate?.(e, "/refund-policy")}>
            Refund & Cancellation
          </a>
          <a href="/cookie-policy" onClick={(e) => onNavigate?.(e, "/cookie-policy")}>
            Cookie Policy
          </a>
        </div>
      </div>
    </section>
  );
}
