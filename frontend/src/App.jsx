import React, { useCallback, useEffect, useState } from "react";
import WebGLBackground from "./components/WebGLBackground";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Manifesto from "./components/Manifesto";
import WorkShowcase from "./components/WorkShowcase";
import Capabilities from "./components/Capabilities";
import Process from "./components/Process";
import TechStackGrid from "./components/TechStackGrid";
import StatsCounter from "./components/StatsCounter";
import WhyUs from "./components/WhyUs";
import FAQ from "./components/FAQ";
import TrustSection from "./components/TrustSection";
import CTABand from "./components/CTABand";
import ContactSection from "./components/ContactSection";
import ProjectsModal from "./components/ProjectsModal";
import ProductBand from "./components/ProductBand";
import SquadRideLanding from "./components/SquadRideLanding";
import LegalPage from "./components/LegalPage";
import Footer from "./components/Footer";
import useScrollReveal from "./hooks/useScrollReveal";
import { LEGAL_BY_PATH } from "./data/legalContent";
import { SQUADRIDE } from "./data/squadrideContent";

/* Trailing slashes and casing should not decide whether a page exists. */
const normalize = (path) => {
  const trimmed = path.replace(/\/+$/, "").toLowerCase();
  return trimmed === "" ? "/" : trimmed;
};

export default function App() {
  const [cursorLabel, setCursorLabel] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [route, setRoute] = useState(() => normalize(window.location.pathname));

  /* ---- Minimal history routing for the legal pages ---- */
  useEffect(() => {
    const onPop = () => setRoute(normalize(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = useCallback((event, to) => {
    if (event) event.preventDefault();
    if (normalize(to) === normalize(window.location.pathname)) return;
    window.history.pushState({}, "", to);
    setRoute(normalize(to));
  }, []);

  const legalDoc = LEGAL_BY_PATH[route];
  const isSquadRide = route === SQUADRIDE.path;

  /* SquadRide pages wear the app's own palette, not the studio's. */
  useEffect(() => {
    const onProduct = route.startsWith(SQUADRIDE.path);
    document.body.classList.toggle("sr-page", onProduct);
    return () => document.body.classList.remove("sr-page");
  }, [route]);

  useScrollReveal([route]);

  const handleCursorEnter = (label) => {
    setCursorLabel(label);
    setIsHovered(true);
  };

  const handleCursorLeave = () => {
    setCursorLabel("");
    setIsHovered(false);
  };

  return (
    <div className="app-container" id="top">
      {/* Three.js Particle Morphing Background */}
      <WebGLBackground />

      {/* Magnetic Custom Cursor */}
      <CustomCursor cursorLabel={cursorLabel} isHovered={isHovered} />

      {legalDoc ? (
        <LegalPage doc={legalDoc} onNavigate={navigate} />
      ) : isSquadRide ? (
        <SquadRideLanding
          onNavigate={navigate}
          onCursorEnter={handleCursorEnter}
          onCursorLeave={handleCursorLeave}
        />
      ) : (
        <>
          {/* Navigation Header */}
          <Navbar
            onCursorEnter={handleCursorEnter}
            onCursorLeave={handleCursorLeave}
          />

          <main>
            {/* Hero Section */}
            <Hero
              onCursorEnter={handleCursorEnter}
              onCursorLeave={handleCursorLeave}
            />

            {/* Scrolling Capability Band */}
            <Marquee />

            {/* Manifesto Statement */}
            <Manifesto />

            {/* Selected Work Showcase */}
            <WorkShowcase
              onCursorEnter={handleCursorEnter}
              onCursorLeave={handleCursorLeave}
              onSelectProject={setSelectedProject}
            />

            {/* Our own product */}
            <ProductBand
              onNavigate={navigate}
              onCursorEnter={handleCursorEnter}
              onCursorLeave={handleCursorLeave}
            />

            {/* Capabilities Grid */}
            <Capabilities
              onCursorEnter={handleCursorEnter}
              onCursorLeave={handleCursorLeave}
            />

            {/* How We Work */}
            <Process
              onCursorEnter={handleCursorEnter}
              onCursorLeave={handleCursorLeave}
            />

            {/* Stats Counters */}
            <StatsCounter />

            {/* Differentiators */}
            <WhyUs
              onCursorEnter={handleCursorEnter}
              onCursorLeave={handleCursorLeave}
            />

            {/* Interactive Fullstack Tech Stack */}
            <TechStackGrid
              onCursorEnter={handleCursorEnter}
              onCursorLeave={handleCursorLeave}
            />

            {/* Frequently Asked Questions */}
            <FAQ
              onCursorEnter={handleCursorEnter}
              onCursorLeave={handleCursorLeave}
            />

            {/* Security & Compliance */}
            <TrustSection onNavigate={navigate} />

            {/* Closing Call To Action */}
            <CTABand
              onCursorEnter={handleCursorEnter}
              onCursorLeave={handleCursorLeave}
            />

            {/* Contact & Inquiries */}
            <ContactSection
              onCursorEnter={handleCursorEnter}
              onCursorLeave={handleCursorLeave}
            />
          </main>

          {/* Project Deep-Dive Modal */}
          <ProjectsModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onCursorEnter={handleCursorEnter}
            onCursorLeave={handleCursorLeave}
          />
        </>
      )}

      {/* Footer */}
      <Footer onNavigate={navigate} />
    </div>
  );
}
