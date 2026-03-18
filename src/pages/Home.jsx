import { Link } from 'react-router-dom'
import ToolCard from '../components/ToolCard'
import './Home.css'

const tools = [
  {
    icon: '📄',
    title: 'Image to PDF',
    description: 'Merge multiple images into a single, beautifully formatted PDF in seconds.',
    to: '/tools/image-to-pdf',
    gradient: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))',
    badge: 'Popular',
  },
  {
    icon: '🗜️',
    title: 'Image Compressor',
    description: 'Reduce image file size without losing quality. See instant before & after comparisons.',
    to: '/tools/image-compressor',
    gradient: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(5,150,105,0.15))',
  },
  {
    icon: '✂️',
    title: 'Background Remover',
    description: 'Remove backgrounds from images instantly and download a transparent PNG.',
    to: '/tools/bg-remover',
    gradient: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(239,68,68,0.15))',
    badge: 'AI Powered',
  },
]

const stats = [
  { value: '100%', label: 'Free Forever' },
  { value: '0', label: 'File Uploads' },
  { value: '3+', label: 'Powerful Tools' },
  { value: '∞', label: 'Files Processed' },
]

const features = [
  {
    icon: '🔒',
    title: 'Private by Design',
    desc: 'Every tool runs entirely in your browser. Your files are never sent to any server.',
  },
  {
    icon: '⚡',
    title: 'Blazing Fast',
    desc: 'Optimized client-side processing means results in seconds, not minutes.',
  },
  {
    icon: '📱',
    title: 'Works Everywhere',
    desc: 'Fully responsive — use SnapTools seamlessly on phone, tablet, or desktop.',
  },
  {
    icon: '🆓',
    title: 'Always Free',
    desc: 'No subscriptions, no limits, no sign-ups. Just upload and convert.',
  },
  {
    icon: '🎯',
    title: 'Precise Results',
    desc: 'High-quality outputs with adjustable settings to match your exact needs.',
  },
  {
    icon: '🌙',
    title: 'Dark Mode',
    desc: 'Easy on the eyes with a beautiful dark theme available at any time.',
  },
]

export default function Home() {
  return (
    <div className="home" style={{ paddingTop: 'var(--navbar-height)' }}>

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-grid" />
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="badge badge-purple animate-fade-up" style={{ marginBottom: '20px' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
              </svg>
              Files never leave your device
            </div>

            <h1 className="hero-title animate-fade-up-delay-1">
              All-in-One{' '}
              <span className="gradient-text">Image & PDF</span>
              <br />
              Toolkit
            </h1>

            <p className="hero-subtitle animate-fade-up-delay-2">
              Convert, compress, and transform your images — completely free,
              blazing fast, and 100% private. No sign-up required.
            </p>

            <div className="hero-actions animate-fade-up-delay-3">
              <Link to="/tools" className="btn btn-primary btn-lg" id="hero-cta-btn">
                Start Using Tools
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
              <Link to="/about" className="btn btn-secondary btn-lg" id="hero-learn-btn">
                Learn More
              </Link>
            </div>

            <div className="hero-stats animate-fade-up-delay-4">
              {stats.map(({ value, label }) => (
                <div key={label} className="stat-item">
                  <span className="stat-value">{value}</span>
                  <span className="stat-label">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual */}
          <div className="hero-visual animate-float">
            <div className="hero-card-stack">
              <div className="hero-mock-card hc-1">
                <div className="hm-icon">📄</div>
                <div className="hm-text">
                  <div className="hm-title">Image to PDF</div>
                  <div className="hm-sub">4 images → 1 PDF</div>
                </div>
                <div className="hm-status success">Done ✓</div>
              </div>
              <div className="hero-mock-card hc-2">
                <div className="hm-icon">🗜️</div>
                <div className="hm-text">
                  <div className="hm-title">Compressed</div>
                  <div className="hm-sub">4.2 MB → 820 KB</div>
                </div>
                <div className="hm-status success">−81% ✓</div>
              </div>
              <div className="hero-mock-card hc-3">
                <div className="hm-icon">✂️</div>
                <div className="hm-text">
                  <div className="hm-title">BG Removed</div>
                  <div className="hm-sub">Transparent PNG</div>
                </div>
                <div className="hm-status success">Ready ✓</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TOOLS ===== */}
      <section className="section tools-section">
        <div className="container">
          <div className="section-title">
            <h2>Powerful Tools, <span className="gradient-text">Zero Complexity</span></h2>
            <p>Everything you need — image conversion, compression, and editing. All free, all private.</p>
          </div>
          <div className="grid-auto">
            {tools.map((tool) => (
              <ToolCard key={tool.to} {...tool} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== AD PLACEHOLDER ===== */}
      <div className="container">
        <div className="ad-placeholder">
          <span>📢</span> Google AdSense Banner — 728×90
        </div>
      </div>

      {/* ===== FEATURES ===== */}
      <section className="section features-section">
        <div className="container">
          <div className="section-title">
            <h2>Why Choose <span className="gradient-text">SnapTools?</span></h2>
            <p>Built for students, creators, and professionals who value speed, privacy, and simplicity.</p>
          </div>
          <div className="features-grid">
            {features.map(({ icon, title, desc }) => (
              <div key={title} className="feature-item">
                <div className="feature-icon">{icon}</div>
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-box">
            <div className="cta-bg-orb" />
            <div className="badge badge-purple" style={{ marginBottom: '16px' }}>
              100% Free &amp; Open
            </div>
            <h2>Ready to get started?</h2>
            <p>No account needed. Just pick a tool and go.</p>
            <Link to="/tools" className="btn btn-primary btn-lg" id="cta-bottom-btn">
              Explore All Tools
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
