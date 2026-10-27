import ContentPanel from '../components/ContentPanel';
import { minorProjects, projects } from '../data/projects';

export default function ProjectsSection() {

  return (
    <ContentPanel className="rail-panel">
      <section className="rail-layout projects-layout">
        <header className="rail-heading">
          <div><p className="ledger-eyebrow">02 / Independent work</p><h2>Projects</h2></div>
        </header>

        <div className="career-list">
          {projects.map((project, index) => (
            <article className="career-row" key={project.title}>
              <div className="career-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div>
              <header className="career-role">
                <p>{project.period}</p><h3>{project.title}</h3>
                <h4>{project.tags.join(' · ')}</h4>
              </header>
              <ul className="career-description">{project.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul>
            </article>
          ))}
        </div>
        <section className="more-projects" aria-label="More projects">
          <h3>More projects</h3>
          <ul>{minorProjects.map(project => <li key={project.title}><strong>{project.title}</strong><p>{project.description}</p></li>)}</ul>
        </section>
        <footer className="work-footer"><a href="https://github.com/mattschu22" target="_blank" rel="noopener noreferrer">GitHub ↗</a></footer>
      </section>
    </ContentPanel>
  );
}
