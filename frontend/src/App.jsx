import React, { useState } from "react";
import WebGLBackground from "./components/WebGLBackground";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Manifesto from "./components/Manifesto";
import WorkShowcase from "./components/WorkShowcase";
import Capabilities from "./components/Capabilities";
import TechStackGrid from "./components/TechStackGrid";
import StatsCounter from "./components/StatsCounter";
import ProjectEstimator from "./components/ProjectEstimator";
import ContactSection from "./components/ContactSection";
import ProjectsModal from "./components/ProjectsModal";
import Footer from "./components/Footer";

export default function App() {
  const [cursorLabel, setCursorLabel] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [estimateData, setEstimateData] = useState(null);

  const handleCursorEnter = (label) => {
    setCursorLabel(label);
    setIsHovered(true);
  };

  const handleCursorLeave = () => {
    setCursorLabel("");
    setIsHovered(false);
  };

  const handleStartWithEstimate = (data) => {
    setEstimateData(data);
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="app-container" id="top">
      {/* Three.js Particle Morphing Background */}
      <WebGLBackground />

      {/* Magnetic Custom Cursor */}
      <CustomCursor cursorLabel={cursorLabel} isHovered={isHovered} />

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

        {/* Manifesto Statement */}
        <Manifesto />

        {/* Selected Work Showcase */}
        <WorkShowcase
          onCursorEnter={handleCursorEnter}
          onCursorLeave={handleCursorLeave}
          onSelectProject={setSelectedProject}
        />

        {/* Capabilities Grid */}
        <Capabilities
          onCursorEnter={handleCursorEnter}
          onCursorLeave={handleCursorLeave}
        />

        {/* Stats Counters */}
        <StatsCounter />

        {/* Interactive Fullstack Tech Stack */}
        <TechStackGrid
          onCursorEnter={handleCursorEnter}
          onCursorLeave={handleCursorLeave}
        />

        {/* Project Cost & Turnaround Estimator */}
        <ProjectEstimator
          onCursorEnter={handleCursorEnter}
          onCursorLeave={handleCursorLeave}
          onStartWithEstimate={handleStartWithEstimate}
        />

        {/* Contact & Inquiries */}
        <ContactSection
          onCursorEnter={handleCursorEnter}
          onCursorLeave={handleCursorLeave}
          initialData={estimateData}
        />
      </main>

      {/* Project Deep-Dive Modal */}
      <ProjectsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onCursorEnter={handleCursorEnter}
        onCursorLeave={handleCursorLeave}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
