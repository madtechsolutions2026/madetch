import React, { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X, Sparkles } from "lucide-react";

export default function Navbar({ activeTab, setActiveTab, onCursorEnter, onCursorLeave }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Work", target: "#work" },
    { label: "Capabilities", target: "#capabilities" },
    { label: "Tech Stack", target: "#tech-stack" },
    { label: "Estimator", target: "#estimator" },
  ];

  const handleNavClick = (e, target) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`}>
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
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.target}
            className="nav-link"
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
          <Sparkles size={14} className="text-blue-400" />
          <span>Start a project</span>
        </a>
      </nav>
    </header>
  );
}
