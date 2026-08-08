import React, { useState } from "react";
import { ArrowUpRight, ExternalLink, Info, Sparkles } from "lucide-react";
import { PROJECTS } from "../data/projectsData";

export default function WorkShowcase({ onCursorEnter, onCursorLeave, onSelectProject }) {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Web & E-Commerce", "Media Portfolio", "Web & Mobile Platform", "Corporate Portal"];

  const filteredProjects = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.type === filter);

  return (
    <section className="work" id="work">
      <div className="section-head">
        <div>
          <p className="section-tag">Selected work</p>
        </div>
        <p className="section-count">2024 — 2026</p>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-tab ${filter === cat ? "active" : ""}`}
            onClick={() => setFilter(cat)}
            onMouseEnter={() => onCursorEnter(cat)}
            onMouseLeave={onCursorLeave}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project list */}
      <ul className="work-list">
        {filteredProjects.map((project) => (
          <li key={project.id} className="work-item">
            <div className="work-link">
              <span className="work-idx">{project.id}</span>

              <div className="work-title-wrap">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="work-name"
                  onMouseEnter={() => onCursorEnter("Visit ↗")}
                  onMouseLeave={onCursorLeave}
                >
                  <span>{project.name}</span>
                </a>
              </div>

              <div className="work-meta">
                <span>{project.category} · {project.year}</span>
                <div className="work-tags">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  className="btn small ghost-btn"
                  onClick={() => onSelectProject(project)}
                  onMouseEnter={() => onCursorEnter("Details")}
                  onMouseLeave={onCursorLeave}
                  title="View Case Details"
                >
                  <Info size={12} />
                  <span>Case Study</span>
                </button>

                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="work-arrow"
                  onMouseEnter={() => onCursorEnter("Visit ↗")}
                  onMouseLeave={onCursorLeave}
                  title="Open Project Live"
                >
                  ↗
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
