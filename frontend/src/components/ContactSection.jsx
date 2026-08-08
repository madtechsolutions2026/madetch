import React, { useState, useEffect } from "react";
import { Mail, Phone, MessageSquare, Send, CheckCircle, AlertCircle, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

export default function ContactSection({ onCursorEnter, onCursorLeave, initialData }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Web Engineering",
    message: "",
  });

  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        message: `Hi MadTech, I calculated an estimate for a ${initialData.projectType} (${initialData.platform}) with ${initialData.aiIntegration}. Estimated budget: ${initialData.estimatedPrice}. Let's build this demo in 48 hours!`,
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      // First attempt submission to Express backend API (if running), or Formspree
      let response;
      try {
        response = await fetch("http://localhost:5000/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } catch (backendErr) {
        // Fallback to Formspree
        response = await fetch("https://formspree.io/f/xyyqpewy", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(formData),
        });
      }

      if (response.ok) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#2e9bff", "#ffffff", "#00d2d3"],
        });

        setStatus({
          type: "success",
          message: "Mad idea received! We'll review your project details and deliver your custom demo in 48 hours.",
        });
        setFormData({ name: "", email: "", phone: "", service: "Web Engineering", message: "" });
      } else {
        throw new Error("Unable to submit. Please contact directly via WhatsApp or email.");
      }
    } catch (err) {
      setStatus({
        type: "error",
        message: "Message could not be sent online. Please chat directly on WhatsApp (+91 70956 82464) or email us.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact" id="contact">
      <p className="section-tag">Got a mad idea?</p>

      <div className="contact-grid">
        {/* Left: Quick Connect Channels */}
        <div className="contact-info">
          <a
            className="contact-big"
            href="mailto:madtechsolutions.in@gmail.com"
            onMouseEnter={() => onCursorEnter("Email us")}
            onMouseLeave={onCursorLeave}
          >
            LET'S TALK
          </a>

          <div className="contact-channels">
            <a
              href="mailto:madtechsolutions.in@gmail.com"
              className="contact-link"
              onMouseEnter={() => onCursorEnter("Write email")}
              onMouseLeave={onCursorLeave}
            >
              <span className="channel-label">
                <Mail size={16} className="text-blue-400" />
                Email
              </span>
              <span className="channel-val">madtechsolutions.in@gmail.com</span>
            </a>

            <a
              href="https://wa.me/917095682464"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
              onMouseEnter={() => onCursorEnter("WhatsApp Chat")}
              onMouseLeave={onCursorLeave}
            >
              <span className="channel-label">
                <MessageSquare size={16} className="text-green-400" />
                WhatsApp
              </span>
              <span className="channel-val">+91 70956 82464</span>
            </a>

            <a
              href="tel:+917095682464"
              className="contact-link"
              onMouseEnter={() => onCursorEnter("Call us")}
              onMouseLeave={onCursorLeave}
            >
              <span className="channel-label">
                <Phone size={16} className="text-blue-400" />
                Phone
              </span>
              <span className="channel-val">+91 70956 82464</span>
            </a>
          </div>

          <p className="contact-note">
            Free custom demo in 48 hours. No templates, no catch. Based in Hyderabad, India — serving clients worldwide.
          </p>
        </div>

        {/* Right: Modern Form */}
        <div className="contact-form-wrap">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="form-input"
                placeholder="e.g. Alex Morgan"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="form-input"
                placeholder="alex@company.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Phone / WhatsApp (Optional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="form-input"
                placeholder="+91 / +1..."
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">
                Tell us about your project
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="form-textarea"
                placeholder="What are we engineering together?"
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            {status.message && (
              <div className={`toast-msg ${status.type === "success" ? "toast-success" : "toast-error"}`}>
                {status.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                <span>{status.message}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn"
              onMouseEnter={() => onCursorEnter("Send it")}
              onMouseLeave={onCursorLeave}
            >
              <Send size={15} />
              <span>{loading ? "Sending inquiry..." : "Send Message"}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
