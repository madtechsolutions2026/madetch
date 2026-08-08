import React from "react";
import { X, ExternalLink, CheckCircle, Clock, Tag } from "lucide-react";

export default function ProjectsModal({ project, onClose, onCursorEnter, onCursorLeave }) {
  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
          onMouseEnter={() => onCursorEnter("Close")}
          onMouseLeave={onCursorLeave}
        >
          <X size={24} />
        </button>

        <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-blue-400 mb-2">
          <span>{project.category}</span>
          <span>·</span>
          <span>{project.year}</span>
        </div>

        <h2 className="font-display text-3xl mb-4 uppercase">{project.name}</h2>

        <p className="text-sm text-gray-300 leading-relaxed mb-6">{project.description}</p>

        <div className="grid grid-cols-2 gap-4 bg-white/5 p-4 rounded-xl mb-6 border border-white/10">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
              <CheckCircle size={14} className="text-blue-400" />
              <span>Key Impact</span>
            </div>
            <div className="text-sm font-medium text-white">{project.metrics}</div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
              <Clock size={14} className="text-blue-400" />
              <span>Sprint Timeline</span>
            </div>
            <div className="text-sm font-medium text-white">{project.timeline}</div>
          </div>
        </div>

        {project.clientQuote && (
          <div className="border-l-2 border-blue-400 pl-4 py-1 mb-6 text-xs italic text-gray-300">
            "{project.clientQuote}"
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((t) => (
            <span key={t} className="tag-pill">
              {t}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-white/10">
          <button className="btn small ghost-btn" onClick={onClose}>
            Back to Showcase
          </button>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn small"
            onMouseEnter={() => onCursorEnter("Visit Live")}
            onMouseLeave={onCursorLeave}
          >
            <span>Visit Live Project</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
