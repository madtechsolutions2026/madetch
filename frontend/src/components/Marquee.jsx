import React from "react";
import { MARQUEE_ITEMS } from "../data/siteContent";

/* Seamless infinite band. The list is rendered twice and the track is
   translated by exactly half its width, so the loop has no visible seam. */
export default function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map((item, i) => (
          <span className="marquee-item" key={`${item}-${i}`}>
            {item}
            <span className="marquee-dot">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}
