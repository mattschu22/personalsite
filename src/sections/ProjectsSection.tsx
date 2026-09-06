import { useState } from 'react';
import ContentPanel from '../components/ContentPanel';
import { SimdBackdrop } from '../components/EngineeringVisuals';
import { minorProjects, projects } from '../data/projects';

export default function ProjectsSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = projects[selectedIndex];

  return (
    <ContentPanel className="rail-panel">
      <section className="rail-layout">
        <header className="rail-heading">
          <div>
            <p className="ledger-eyebrow">02 / Selected systems</p>
            <h2>Projects</h2>
          </div>
          <p>One consolidated register. Select a system to inspect its purpose, current state, and implementation surface.</p>
        </header>

        <div className="project-console project-console-rail">
          <nav className="project-index" aria-label="Project index">
            {projects.map((project, index) => (
              <button
                key={project.title}
                type="button"
                className={`project-index-row ${selectedIndex === index ? 'project-index-row-active' : ''}`}
                onClick={() => setSelectedIndex(index)}
                aria-pressed={selectedIndex === index}
              >
                <span className="project-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="project-index-copy">
                  <strong className="project-index-title">{project.title}</strong>
                  <small>{project.subtitle}</small>
                </span>
                <span className="project-index-metric">{project.period}</span>
              </button>
            ))}
          </nav>

          <article className="project-detail" aria-live="polite">
            <SimdBackdrop />
            <div className="project-detail-topline">
              <span>PROJECT / {String(selectedIndex + 1).padStart(2, '0')}</span>
              <span>{selected.period}</span>
            </div>
            <p className="project-register-label">SYSTEM RECORD</p>
            <h3>{selected.title}</h3>
            <p className="project-subtitle">{selected.subtitle}</p>
            <p className="project-description">{selected.description}</p>
            <div className="tag-register" aria-label="Technologies">
              {selected.tags.map((tag) => <span key={tag}>[{tag.toUpperCase()}]</span>)}
            </div>
            <div className="project-evidence">
              <div><span>STATUS</span><strong>{selected.period === 'Current' || selected.period.includes('Current') ? 'IN DEVELOPMENT' : 'COMPLETED WORK'}</strong></div>
              <div><span>PRIMARY DOMAIN</span><strong>{selected.tags[0]}</strong></div>
              <div><span>IMPLEMENTATION</span><strong>{selected.tags.slice(1, 3).join(' / ') || selected.tags[0]}</strong></div>
            </div>
          </article>
        </div>

        <footer className="project-other-strip">
          <span>ADDITIONAL BUILDS / {minorProjects.length}</span>
          <p>{minorProjects.map((project) => project.title).join(' · ')}</p>
          <a href="https://github.com/mattschu22" target="_blank" rel="noopener noreferrer">SOURCE ↗</a>
        </footer>
      </section>
    </ContentPanel>
  );
}
