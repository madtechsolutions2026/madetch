import { useEffect } from "react";

/**
 * Reveals every element carrying `data-reveal` as it scrolls into view by
 * adding `.is-revealed`. One observer for the whole page rather than one
 * per component.
 *
 * Respects prefers-reduced-motion: when motion is reduced, everything is
 * marked revealed immediately and no observer is created.
 */
export default function useScrollReveal(deps = []) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll("[data-reveal]:not(.is-revealed)"));
    if (!nodes.length) return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      nodes.forEach((node) => node.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
