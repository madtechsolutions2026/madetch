import React from "react";
import { COMPANY } from "../data/siteContent";
import { LEGAL_DOCS } from "../data/legalContent";

const SITE_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "How we work", href: "#process" },
  { label: "Security", href: "#security" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Footer({ onNavigate }) {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <span className="footer-wordmark">
            Make Anything Digital<b>.</b>
          </span>
          <p className="footer-blurb">
            A digital studio in {COMPANY.city}, building websites, apps, AI
            systems and growth engines for clients worldwide since {COMPANY.founded}.
          </p>
        </div>

        <nav className="footer-col" aria-label="Site">
          <span className="footer-col-title">Explore</span>
          {SITE_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <nav className="footer-col" aria-label="Legal">
          <span className="footer-col-title">Legal</span>
          {LEGAL_DOCS.map((doc) => (
            <a key={doc.slug} href={doc.path} onClick={(e) => onNavigate?.(e, doc.path)}>
              {doc.title}
            </a>
          ))}
        </nav>

        <div className="footer-col" aria-label="Contact">
          <span className="footer-col-title">Contact</span>
          <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
          <a href={COMPANY.phoneHref}>{COMPANY.phone}</a>
          <span className="footer-place">
            {COMPANY.city}, {COMPANY.state}
            <br />
            {COMPANY.country} · Worldwide delivery
          </span>
        </div>
      </div>

      <div className="footer-base">
        <span>
          © {year} {COMPANY.legalEntityName || COMPANY.name}. All rights reserved.
        </span>
        <a className="footer-top" href="#top">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
