import ContentPanel from '../components/ContentPanel';
import { education, patents, publications, skills } from '../data/education';

const contacts = [
  { label: 'EMAIL', value: 'umMatt@umich.edu', href: 'mailto:umMatt@umich.edu' },
  { label: 'PHONE', value: '(248) 387-9503', href: 'tel:+12483879503' },
  { label: 'GITHUB', value: 'mattschu22', href: 'https://github.com/mattschu22' },
  { label: 'LINKEDIN', value: 'in/umMatt', href: 'https://linkedin.com/in/umMatt' },
];

export default function ContactSection() {
  return (
    <ContentPanel className="rail-panel">
      <section className="rail-layout contact-rail-layout">
        <header className="rail-heading">
          <div>
            <p className="ledger-eyebrow">04 / About & education</p>
            <h2>Matt Schumacher</h2>
          </div>
          <p>Software engineer at SpaceX working on reliable systems for Starlink enterprise customers.</p>
        </header>

        <div className="identity-console">
          <section className="identity-profile">
            <div className="identity-profile-top">
              <img src="/headshot.jpg" alt="Matt Schumacher" />
              <div>
                <span>BASED IN</span>
                <strong>Seattle, Washington</strong>
                <p>Systems software, distributed systems, compilers, databases, infrastructure, and performance engineering.</p>
              </div>
            </div>
            <div className="contact-register">
              {contacts.map((contact) => (
                <a key={contact.label} href={contact.href} target={contact.href.startsWith('http') ? '_blank' : undefined} rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                  <span>{contact.label}</span><strong>{contact.value}</strong><b>↗</b>
                </a>
              ))}
            </div>
          </section>

          <section className="credentials-register">
            <div className="credentials-block">
              <span>EDUCATION / {education.school}</span>
              {education.degrees.map((degree) => (
                <div className="credential-row" key={degree.title}>
                  <div><strong>{degree.title}</strong><small>{degree.status}</small></div>
                  <b>{degree.gpa}</b>
                </div>
              ))}
            </div>

            <div className="credentials-block skills-compact">
              <span>LANGUAGES</span>
              <p>{skills.languages.join(' · ')}</p>
              <span>FOCUS</span>
              <p>{skills.expertise.join(' · ')}</p>
            </div>

            <div className="credentials-block research-compact">
              <span>RESEARCH / IP</span>
              <p><strong>US {patents[0].number}</strong> · {patents[0].title}</p>
              <p><strong>{publications[0].id}</strong> · {publications[0].title}</p>
            </div>

            <div className="credentials-block coursework-compact">
              <span>SELECTED COURSEWORK</span>
              <div>
                {education.keyCourses.slice(0, 8).map((course) => <b key={course}>{course}</b>)}
              </div>
            </div>
          </section>
        </div>

        <footer className="identity-cta">
          <span>OPEN CHANNEL / SYSTEMS</span>
          <div>
            <strong>Building a system where correctness and performance both matter?</strong>
            <p>If the problem is difficult to debug, scale, or reason about, I’d like to hear about it.</p>
          </div>
          <a href="mailto:umMatt@umich.edu">START A CONVERSATION ↗</a>
        </footer>
      </section>
    </ContentPanel>
  );
}
