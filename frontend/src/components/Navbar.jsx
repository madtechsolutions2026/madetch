import React, { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";

const NAV_ITEMS = [
  { label: "Work", target: "#work" },
  { label: "Capabilities", target: "#capabilities" },
  { label: "How we work", target: "#process" },
  { label: "Estimator", target: "#estimator" },
  { label: "FAQ", target: "#faq" },
];

export default function Navbar({ onCursorEnter, onCursorLeave }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");

  /* Scroll state + reading progress for the top bar */
  useEffect(() => {
    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 40);
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Highlight the section currently in view */
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.querySelector(item.target)).filter(Boolean);
    if (!sections.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /* Stop the page scrolling behind the mobile panel */
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e, target) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`}>
      <span
        className="nav-progress"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />

      <a
        className="nav-brand"
        href="#top"
        onClick={(e) => handleNavClick(e, "#top")}
        onMouseEnter={() => onCursorEnter("MadTech")}
        onMouseLeave={onCursorLeave}
      >
        <img src="/logo.png" alt="Mad Tech Solutions Logo" className="nav-logo" />
      </a>

      {/* Desktop Navigation */}
      <nav className="nav-links">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.target}
            className={`nav-link ${activeSection === item.target ? "active" : ""}`}
            onClick={(e) => handleNavClick(e, item.target)}
            onMouseEnter={() => onCursorEnter(item.label)}
            onMouseLeave={onCursorLeave}
          >
            {item.label}
          </a>
        ))}
        <a
          href="#contact"
          className="nav-cta"
          onClick={(e) => handleNavClick(e, "#contact")}
          onMouseEnter={() => onCursorEnter("Let's go")}
          onMouseLeave={onCursorLeave}
        >
          <Sparkles size={14} />
          <span>Start a project</span>
        </a>
      </nav>

      {/* Mobile trigger */}
      <button
        className="nav-burger"
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileMenuOpen}
        onClick={() => setMobileMenuOpen((open) => !open)}
      >
        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile panel */}
      <div className={`nav-mobile ${mobileMenuOpen ? "open" : ""}`}>
        {NAV_ITEMS.map((item, i) => (
          <a
            key={item.label}
            href={item.target}
            style={{ transitionDelay: `${mobileMenuOpen ? 80 + i * 45 : 0}ms` }}
            onClick={(e) => handleNavClick(e, item.target)}
          >
            <span className="nav-mobile-idx">{String(i + 1).padStart(2, "0")}</span>
            {item.label}
          </a>
        ))}
        <a
          className="nav-mobile-cta"
          href="#contact"
          style={{ transitionDelay: `${mobileMenuOpen ? 80 + NAV_ITEMS.length * 45 : 0}ms` }}
          onClick={(e) => handleNavClick(e, "#contact")}
        >
          Start a project
        </a>
      </div>
    </header>
  );
}
