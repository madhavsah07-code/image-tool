import { Link } from 'react-router-dom'
import './About.css'

const team = [
  { emoji: '👨‍💻', name: 'SnapTools Team', role: 'Builder & Maintainer' },
]

export default function About() {
  return (
    <div className="about-page" style={{ paddingTop: 'var(--navbar-height)' }}>
      <div className="container">

        <div className="about-hero">
          <div className="badge badge-purple" style={{ marginBottom: '16px' }}>About Us</div>
          <h1>Built for speed, <span className="gradient-text">privacy, and you</span></h1>
          <p>
            SnapTools was created with one belief: powerful file tools should be free,
            fast, and respect user privacy. No accounts. No uploads. No nonsense.
          </p>
        </div>

        <div className="about-mission">
          <div className="mission-card card">
            <div className="mission-icon">🎯</div>
            <h2>Our Mission</h2>
            <p>
              To build the most useful, private, and accessible suite of image and document
              tools for students, designers, and creators — completely free, running entirely
              in the browser, forever.
            </p>
          </div>
        </div>

        <div className="about-values">
          {[
            { icon: '🔒', title: 'Privacy First', desc: 'Every tool processes files locally in your browser. We physically cannot see your files.' },
            { icon: '⚡', title: 'Always Fast', desc: 'Client-side processing means no waiting for server round-trips.' },
            { icon: '🆓', title: 'Forever Free', desc: 'No hidden costs. The core tools will always be 100% free.' },
            { icon: '🌍', title: 'Open & Accessible', desc: 'Works on any device with a modern browser — phone, tablet, or desktop.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="value-card card">
              <div className="value-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>

        <div className="about-tech">
          <h2>Built with modern tech</h2>
          <div className="tech-list">
            {['React.js', 'jsPDF', 'browser-image-compression', 'react-dropzone', 'Canvas API', 'Vite'].map(t => (
              <div key={t} className="tech-chip">{t}</div>
            ))}
          </div>
        </div>

        <div className="about-cta">
          <h2>Start using SnapTools today</h2>
          <p>No sign-up. No credit card. Just tools that work.</p>
          <Link to="/tools" className="btn btn-primary btn-lg">View All Tools</Link>
        </div>
      </div>
    </div>
  )
}
