import ContentPanel from '../components/ContentPanel';
import { education, patents, publications, skills } from '../data/education';

const contacts = [
  { label: 'Email', value: 'umMatt@umich.edu', href: 'mailto:umMatt@umich.edu' },
  { label: 'Phone', value: '(248) 387-9503', href: 'tel:+12483879503' },
  { label: 'GitHub', value: 'mattschu22', href: 'https://github.com/mattschu22' },
  { label: 'LinkedIn', value: 'in/umMatt', href: 'https://linkedin.com/in/umMatt' },
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
                <span>Software engineer</span>
                <strong>Systems & infrastructure</strong>
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
              <span>Education / {education.school}</span>
              {education.degrees.map((degree) => (
                <div className="credential-row" key={degree.title}>
                  <div><strong>{degree.title}</strong><small>{degree.status}</small></div>
                  <b>{degree.gpa}</b>
                </div>
              ))}
            </div>

            <div className="credentials-block skills-compact">
              <span>Languages</span>
              <p>{skills.languages.join(' · ')}</p>
              <span>Focus</span>
              <p>{skills.expertise.join(' · ')}</p>
            </div>

            <div className="credentials-block research-compact">
              <span>Research & patents</span>
              <p><strong>US {patents[0].number}</strong> · {patents[0].title}</p>
              <p><strong>{publications[0].id}</strong> · {publications[0].title}</p>
            </div>

            <div className="credentials-block interests-compact">
              <span>Technical interests</span>
              <div>
                <p>Distributed systems & databases</p>
                <p>Compilers & performance engineering</p>
              </div>
            </div>
          </section>
        </div>

        <footer className="identity-cta">
          <span>Say hello</span>
          <div>
            <strong>I’m Matt. Software engineer and Michigan grad.</strong>
            <p>Distributed systems, databases, and performance engineering.</p>
          </div>
          <a href="mailto:umMatt@umich.edu">Email me ↗</a>
        </footer>
      </section>
    </ContentPanel>
  );
}
