import ContentPanel from '../components/ContentPanel';
import { experience } from '../data/experience';

export default function WorkSection() {
  return (
    <ContentPanel className="rail-panel work-rail-panel">
      <section className="rail-layout work-layout">
        <header className="rail-heading">
          <div><p className="ledger-eyebrow">03 / Experience</p><h2>Work so far.</h2></div>
        </header>
        <div className="career-list">
          {experience.map((job, index) => (
            <article className={`career-row ${index === 0 ? 'career-current' : ''}`} key={`${job.company}-${job.period}`}>
              <div className="career-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div>
              <header className="career-role">
                <p>{job.period}</p><h3>{job.company}</h3><h4>{job.role}</h4>
              </header>
              <ul className="career-description">{job.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul>
            </article>
          ))}
        </div>
        <footer className="work-footer"><a href="https://linkedin.com/in/umMatt" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></footer>
      </section>
    </ContentPanel>
  );
}
