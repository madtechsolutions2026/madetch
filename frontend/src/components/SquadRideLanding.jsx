import React, { useEffect, useState } from "react";
import { ArrowLeft, Check, Plus, Shield, Smartphone } from "lucide-react";
import {
  SQUADRIDE,
  SR_FAQS,
  SR_FEATURES,
  SR_PRIVACY_POINTS,
  SR_PROBLEM,
  SR_STEPS,
} from "../data/squadrideContent";
import { COMPANY } from "../data/siteContent";

export default function SquadRideLanding({ onNavigate, onCursorEnter, onCursorLeave }) {
  const [form, setForm] = useState({ name: "", email: "", city: "", riders: "" });
  const [state, setState] = useState({ type: "", message: "" });
  const [sending, setSending] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `SquadRide — ${SQUADRIDE.promise} | ${COMPANY.name}`;
    return () => {
      document.title = `${COMPANY.name} — Make Anything Digital`;
    };
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setState({ type: "", message: "" });

    try {
      const response = await fetch("https://formspree.io/f/xyyqpewy", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, source: "SquadRide beta waitlist" }),
      });

      if (!response.ok) throw new Error("submit failed");

      setState({
        type: "success",
        message: "You're on the list. We'll send the beta build and set your squad up on a real ride.",
      });
      setForm({ name: "", email: "", city: "", riders: "" });
    } catch {
      setState({
        type: "error",
        message: `Could not send that. Email ${COMPANY.email} and we'll add you manually.`,
      });
    } finally {
      setSending(false);
    }
  };

  const scrollToBeta = () => document.querySelector("#beta")?.scrollIntoView({ behavior: "smooth" });

  return (
    <main className="sr">
      <a className="legal-back" href="/" onClick={(e) => onNavigate(e, "/")}>
        <ArrowLeft size={15} />
        <span>Back to {COMPANY.name}</span>
      </a>

      {/* ---------- Hero ---------- */}
      <header className="sr-hero">
        <p className="eyebrow">
          <span className="tick"></span>
          A {COMPANY.name} product · {SQUADRIDE.status} · {SQUADRIDE.platform}
        </p>

        <h1 className="sr-title">
          <span className="line">Stay together</span>
          <span className="line sr-title-serif">when you travel</span>
          <span className="line grad">together.</span>
        </h1>

        <p className="sr-lede">{SQUADRIDE.pitch}</p>

        <div className="sr-cta-row">
          <button
            className="btn"
            onClick={scrollToBeta}
            onMouseEnter={() => onCursorEnter?.("Join beta")}
            onMouseLeave={() => onCursorLeave?.()}
          >
            <span>Join the beta</span>
          </button>
          <span className="sr-cta-note">
            <Smartphone size={14} /> Android · free during beta
          </span>
        </div>
      </header>

      {/* ---------- Problem ---------- */}
      <section className="sr-problem">
        <div data-reveal>
          <p className="section-tag">{SR_PROBLEM.kicker}</p>
          <h2 className="section-title">
            {SR_PROBLEM.title} <span className="serif">{SR_PROBLEM.serif}</span>
          </h2>
          <p className="sr-body">{SR_PROBLEM.body}</p>
          <p className="sr-body sr-body-dim">{SR_PROBLEM.note}</p>
        </div>

        <ul className="sr-status-demo" data-reveal aria-label="Squad status examples">
          <li><span className="dot green"></span><b>Squad together</b><span>4 riders · within 420 m</span></li>
          <li><span className="dot amber"></span><b>Squad is stretching</b><span>Sai is 1.1 km behind</span></li>
          <li><span className="dot red"></span><b>Squad separated</b><span>Sai is 2.4 km behind</span></li>
          <li><span className="dot grey"></span><b>Connection lost</b><span>Last seen 48 sec ago</span></li>
        </ul>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="sr-steps">
        <div className="section-head">
          <div>
            <p className="section-tag">How it works</p>
            <h2 className="section-title">
              Four taps, <span className="serif">then ride.</span>
            </h2>
          </div>
          <span className="section-count">04 steps</span>
        </div>

        <ol className="sr-step-grid">
          {SR_STEPS.map((step, i) => (
            <li key={step.idx} data-reveal style={{ "--reveal-delay": `${i * 80}ms` }}>
              <span className="sr-step-idx">{step.idx}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- Features ---------- */}
      <section className="sr-features">
        <div className="section-head">
          <div>
            <p className="section-tag">What it does</p>
            <h2 className="section-title">
              It tells you the squad broke up. <span className="serif">A map cannot.</span>
            </h2>
          </div>
        </div>

        <div className="why-grid">
          {SR_FEATURES.map((feature, i) => (
            <article
              className="why-card"
              key={feature.idx}
              data-reveal
              style={{ "--reveal-delay": `${(i % 3) * 80}ms` }}
            >
              <span className="why-idx">{feature.idx}</span>
              <h3 className="why-title">{feature.title}</h3>
              <p className="why-body">{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- Privacy ---------- */}
      <section className="sr-privacy">
        <div className="sr-privacy-inner" data-reveal>
          <span className="trust-icon" aria-hidden="true">
            <Shield size={15} />
          </span>
          <p className="section-tag">Privacy</p>
          <h2 className="section-title">
            Nobody stays on a map <span className="serif">after they get home.</span>
          </h2>

          <ul className="sr-privacy-list">
            {SR_PRIVACY_POINTS.map((point) => (
              <li key={point}>
                <Check size={15} />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="trust-doc-links">
            <a href="/squadride/privacy-policy" onClick={(e) => onNavigate(e, "/squadride/privacy-policy")}>
              Privacy Policy
            </a>
            <a href="/squadride/terms" onClick={(e) => onNavigate(e, "/squadride/terms")}>
              Terms of Use
            </a>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="sr-faq">
        <div className="section-head">
          <div>
            <p className="section-tag">Questions</p>
            <h2 className="section-title">
              Asked on <span className="serif">every ride.</span>
            </h2>
          </div>
        </div>

        <div className="faq-list">
          {SR_FAQS.map((item, i) => {
            const isOpen = openFaq === i;
            return (
              <div className={`faq-item ${isOpen ? "open" : ""}`} key={item.q} data-reveal>
                <button
                  className="faq-q"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? -1 : i)}
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

      {/* ---------- Beta waitlist ---------- */}
      <section className="sr-beta" id="beta">
        <div className="sr-beta-inner" data-reveal>
          <p className="section-tag">Private beta</p>
          <h2 className="cta-title">
            Bring your squad.<br />
            <span className="serif">We'll ride with you.</span>
          </h2>
          <p className="cta-sub">
            We're onboarding riding groups one at a time — we set you up, join a real
            ride, and fix what breaks. Android phones, three riders or more.
          </p>

          <form className="sr-form" onSubmit={handleSubmit}>
            <div className="sr-form-row">
              <label className="form-label" htmlFor="sr-name">
                Your name
                <input
                  id="sr-name"
                  name="name"
                  className="form-input"
                  value={form.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                />
              </label>
              <label className="form-label" htmlFor="sr-email">
                Email
                <input
                  id="sr-email"
                  name="email"
                  type="email"
                  className="form-input"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </label>
            </div>

            <div className="sr-form-row">
              <label className="form-label" htmlFor="sr-city">
                City
                <input
                  id="sr-city"
                  name="city"
                  className="form-input"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Hyderabad"
                  required
                />
              </label>
              <label className="form-label" htmlFor="sr-riders">
                Riders in your group
                <input
                  id="sr-riders"
                  name="riders"
                  type="number"
                  min="2"
                  max="50"
                  className="form-input"
                  value={form.riders}
                  onChange={handleChange}
                  placeholder="4"
                  required
                />
              </label>
            </div>

            <button className="btn" type="submit" disabled={sending}>
              <span>{sending ? "Sending…" : "Request beta access"}</span>
            </button>

            {state.message && (
              <p className={`toast-msg ${state.type === "success" ? "toast-success" : "toast-error"}`}>
                {state.message}
              </p>
            )}
          </form>

          <p className="sr-beta-note">
            No spam, no newsletter. We email you once, when there's a build for your group.
          </p>
        </div>
      </section>
    </main>
  );
}
