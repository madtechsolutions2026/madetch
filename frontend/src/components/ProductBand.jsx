import React from "react";
import { ArrowUpRight, Smartphone } from "lucide-react";
import { SQUADRIDE } from "../data/squadrideContent";

/* The studio's own product, shown between client work and capabilities. */
export default function ProductBand({ onNavigate, onCursorEnter, onCursorLeave }) {
  return (
    <section className="product-band" id="product">
      <div className="section-head">
        <div>
          <p className="section-tag">Our own product</p>
          <h2 className="section-title">
            We don't only build for clients. <span className="serif">We ship.</span>
          </h2>
        </div>
        <span className="section-count">01 in beta</span>
      </div>

      <a
        className="product-card"
        href={SQUADRIDE.path}
        onClick={(e) => onNavigate(e, SQUADRIDE.path)}
        onMouseEnter={() => onCursorEnter?.("Open")}
        onMouseLeave={() => onCursorLeave?.()}
        data-reveal
      >
        <div className="product-card-main">
          <div className="product-badges">
            <span className="product-badge">
              <Smartphone size={12} /> {SQUADRIDE.platform}
            </span>
            <span className="product-badge dim">{SQUADRIDE.status}</span>
          </div>

          <h3 className="product-name">{SQUADRIDE.name}</h3>
          <p className="product-promise">{SQUADRIDE.promise}</p>
          <p className="product-pitch">{SQUADRIDE.pitch}</p>
        </div>

        <span className="product-arrow" aria-hidden="true">
          <ArrowUpRight size={22} />
        </span>
      </a>
    </section>
  );
}
