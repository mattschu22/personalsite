import { useState } from 'react';
import ContentPanel from '../components/ContentPanel';
import { SqlBackdrop } from '../components/EngineeringVisuals';
import { experience } from '../data/experience';

export default function WorkSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = experience[selectedIndex];

  return (
    <ContentPanel className="rail-panel work-rail-panel">
      <section className="rail-layout">
        <header className="rail-heading rail-heading-dark">
          <div>
            <p className="ledger-eyebrow">03 / Operating record</p>
            <h2>Experience</h2>
          </div>
          <div className="work-metrics" aria-label="Career metrics">
            <span><strong>8+</strong> years</span>
            <span><strong>5</strong> roles</span>
            <span><strong>170+</strong> hospitals</span>
          </div>
        </header>

        <div className="work-console">
          <nav className="work-index" aria-label="Experience index">
            {experience.map((job, index) => (
              <button
                key={`${job.company}-${job.role}`}
                type="button"
                className={selectedIndex === index ? 'work-index-active' : ''}
                onClick={() => setSelectedIndex(index)}
                aria-pressed={selectedIndex === index}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <strong>{job.company}</strong>
                  <small>{job.role}</small>
                  <p>{job.highlights[0]}</p>
                </div>
                <b>{job.period}</b>
              </button>
            ))}
          </nav>

          <article className="work-detail" aria-live="polite">
            <SqlBackdrop />
            <div className="work-detail-meta"><span>ROLE / {String(selectedIndex + 1).padStart(2, '0')}</span><span>{selected.period}</span></div>
            <p className="work-current-marker">{selectedIndex === 0 ? 'CURRENT SYSTEM' : 'ARCHIVED SYSTEM'}</p>
            <h3>{selected.company}</h3>
            <h4>{selected.role}</h4>
            <ul>
              {selected.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
            </ul>
          </article>
        </div>

        <footer className="work-footer">
          <span>FULL EMPLOYMENT REGISTER / SELECT A ROW FOR DETAIL</span>
          <a href="https://linkedin.com/in/ummatt" target="_blank" rel="noopener noreferrer">LINKEDIN ↗</a>
        </footer>
      </section>
    </ContentPanel>
  );
}
