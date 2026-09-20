import React, { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { LEGAL_UPDATED, LEGAL_DOCS } from "../data/legalContent";
import { COMPANY } from "../data/siteContent";
import { SQUADRIDE_DOCS } from "../data/squadrideContent";

export default function LegalPage({ doc, onNavigate }) {
  /* A SquadRide policy links to the other SquadRide policies, not to the
     studio's — a Play reviewer landing here should stay in the app's set. */
  const isProductDoc = doc.path.startsWith("/squadride");
  const siblings = (isProductDoc ? SQUADRIDE_DOCS : LEGAL_DOCS).filter(
    (other) => other.slug !== doc.slug
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${doc.title} — ${COMPANY.name}`;
    return () => {
      document.title = `${COMPANY.name} — Make Anything Digital`;
    };
  }, [doc]);

  return (
    <main className="legal">
      <a
        className="legal-back"
        href={isProductDoc ? "/squadride" : "/"}
        onClick={(e) => onNavigate(e, isProductDoc ? "/squadride" : "/")}
      >
        <ArrowLeft size={15} />
        <span>Back to {isProductDoc ? "SquadRide" : COMPANY.name}</span>
      </a>

      <header className="legal-head">
        <p className="section-tag">{doc.kicker}</p>
        <h1 className="legal-title">{doc.title}</h1>
        <p className="legal-summary">{doc.summary}</p>
        <p className="legal-updated">Last updated · {LEGAL_UPDATED}</p>
      </header>

      <article className="legal-body">
        {doc.sections.map((section) => (
          <section className="legal-section" key={section.h} data-reveal>
            <h2>{section.h}</h2>
            {section.p?.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
            {section.ul && (
              <ul>
                {section.ul.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
            {section.after?.map((para, i) => (
              <p key={`after-${i}`}>{para}</p>
            ))}
          </section>
        ))}
      </article>

      <nav className="legal-other" aria-label="Other policies">
        <span className="legal-other-label">Also read</span>
        <div className="legal-other-links">
          {siblings.map((other) => (
            <a key={other.slug} href={other.path} onClick={(e) => onNavigate(e, other.path)}>
              {other.title}
            </a>
          ))}
        </div>
      </nav>
    </main>
  );
}
