import React, { useState } from "react";
import { Calculator, Sparkles, Check, ArrowRight } from "lucide-react";

export default function ProjectEstimator({ onCursorEnter, onCursorLeave, onStartWithEstimate }) {
  const [projectType, setProjectType] = useState("web");
  const [platform, setPlatform] = useState("react-next");
  const [aiIntegration, setAiIntegration] = useState("agent-bot");
  const [timeline, setTimeline] = useState("fast");

  const projectTypes = [
    { id: "web", label: "Custom Web Application", basePrice: 1200, days: 10 },
    { id: "mobile", label: "Mobile App (iOS/Android)", basePrice: 2000, days: 18 },
    { id: "ai", label: "Autonomous AI System", basePrice: 1500, days: 12 },
    { id: "growth", label: "Full Growth & SEO Engine", basePrice: 800, days: 7 },
  ];

  const platforms = [
    { id: "react-next", label: "React / Next.js", multiplier: 1.0 },
    { id: "node-fullstack", label: "Node.js Fullstack", multiplier: 1.15 },
    { id: "flutter-cross", label: "Flutter Hybrid", multiplier: 1.25 },
  ];

  const aiOptions = [
    { id: "none", label: "No AI", cost: 0 },
    { id: "agent-bot", label: "AI Chatbot & Lead Agent", cost: 350 },
    { id: "mcp-full", label: "Custom MCP Agent & Workflows", cost: 700 },
  ];

  const timelineOptions = [
    { id: "fast", label: "Standard (48h Demo Delivery)", factor: 1.0 },
    { id: "express", label: "Express Sprint (High Priority)", factor: 1.2 },
  ];

  const currentType = projectTypes.find((p) => p.id === projectType) || projectTypes[0];
  const currentPlatform = platforms.find((p) => p.id === platform) || platforms[0];
  const currentAi = aiOptions.find((a) => a.id === aiIntegration) || aiOptions[0];
  const currentTimeline = timelineOptions.find((t) => t.id === timeline) || timelineOptions[0];

  const estimatedPrice = Math.round(
    (currentType.basePrice * currentPlatform.multiplier + currentAi.cost) * currentTimeline.factor
  );

  const estimatedDays = currentTimeline.id === "express" ? Math.max(5, Math.round(currentType.days * 0.7)) : currentType.days;

  return (
    <section className="estimator-section" id="estimator">
      <p className="section-tag">Interactive Estimate</p>

      <div className="estimator-card">
        <div className="estimator-grid">
          {/* Options */}
          <div className="estimator-options">
            <div>
              <h3 className="option-group-title">1. Project Category</h3>
              <div className="pill-group">
                {projectTypes.map((t) => (
                  <button
                    key={t.id}
                    className={`pill-btn ${projectType === t.id ? "active" : ""}`}
                    onClick={() => setProjectType(t.id)}
                    onMouseEnter={() => onCursorEnter(t.label)}
                    onMouseLeave={onCursorLeave}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="option-group-title">2. Architecture & Framework</h3>
              <div className="pill-group">
                {platforms.map((p) => (
                  <button
                    key={p.id}
                    className={`pill-btn ${platform === p.id ? "active" : ""}`}
                    onClick={() => setPlatform(p.id)}
                    onMouseEnter={() => onCursorEnter(p.label)}
                    onMouseLeave={onCursorLeave}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="option-group-title">3. AI & Automation Add-ons</h3>
              <div className="pill-group">
                {aiOptions.map((a) => (
                  <button
                    key={a.id}
                    className={`pill-btn ${aiIntegration === a.id ? "active" : ""}`}
                    onClick={() => setAiIntegration(a.id)}
                    onMouseEnter={() => onCursorEnter(a.label)}
                    onMouseLeave={onCursorLeave}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="option-group-title">4. Delivery Speed</h3>
              <div className="pill-group">
                {timelineOptions.map((t) => (
                  <button
                    key={t.id}
                    className={`pill-btn ${timeline === t.id ? "active" : ""}`}
                    onClick={() => setTimeline(t.id)}
                    onMouseEnter={() => onCursorEnter(t.label)}
                    onMouseLeave={onCursorLeave}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="estimator-result">
            <span className="result-badge">48-Hour Prototype Guarantee</span>

            <div className="text-xs uppercase tracking-widest text-gray-400 mb-2">Estimated Investment</div>
            <div className="result-price">${estimatedPrice}</div>
            <div className="result-timeline">
              Target completion: <b>{estimatedDays} Days</b> (Free Demo in 48h)
            </div>

            <p className="text-xs text-gray-400 leading-relaxed mb-6">
              Includes full source code ownership, zero vendor lock-in, CI/CD pipeline, and 30 days post-launch support.
            </p>

            <button
              className="btn w-full"
              onClick={() =>
                onStartWithEstimate({
                  projectType: currentType.label,
                  platform: currentPlatform.label,
                  aiIntegration: currentAi.label,
                  estimatedPrice: `$${estimatedPrice}`,
                  estimatedDays: `${estimatedDays} Days`,
                })
              }
              onMouseEnter={() => onCursorEnter("Lock in Demo")}
              onMouseLeave={onCursorLeave}
            >
              <Sparkles size={16} />
              <span>Claim 48h Demo</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
