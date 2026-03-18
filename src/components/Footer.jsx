import { Link } from 'react-router-dom'
import './Footer.css'

const tools = [
  { to: '/tools/image-to-pdf', label: 'Image to PDF' },
  { to: '/tools/image-compressor', label: 'Image Compressor' },
  { to: '/tools/bg-remover', label: 'Background Remover' },
  { to: '/tools/image-converter', label: 'Format Converter' },
  { to: '/tools/pdf-to-image', label: 'PDF to Image' },
]

const pages = [
  { to: '/', label: 'Home' },
  { to: '/tools', label: 'All Tools' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <svg width="22" height="22" viewBox="0 0 100 100" fill="none">
                  <rect width="100" height="100" rx="20" fill="url(#fg1)"/>
                  <defs>
                    <linearGradient id="fg1" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#6366f1"/><stop offset="1" stopColor="#8b5cf6"/>
                    </linearGradient>
                  </defs>
                  <text x="50" y="66" fontFamily="Arial" fontSize="56" fontWeight="bold" fill="white" textAnchor="middle">S</text>
                  <circle cx="72" cy="30" r="10" fill="#f59e0b"/>
                </svg>
              </div>
              <span className="footer-logo-text">Snap<span>Tools</span></span>
            </div>
            <p className="footer-desc">
              Free, fast, and private image & PDF tools. Everything runs in your browser — no uploads, no tracking.
            </p>
            <div className="privacy-notice" style={{ marginTop: '16px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
              </svg>
              Files never leave your device
            </div>
          </div>

          {/* Tools */}
          <div className="footer-col">
            <h4>Tools</h4>
            <ul>
              {tools.map(({ to, label }) => (
                <li key={to}><Link to={to}>{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Pages */}
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              {pages.map(({ to, label }) => (
                <li key={to}><Link to={to}>{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Affiliate */}
          <div className="footer-col">
            <h4>Sponsors</h4>
            <div className="affiliate-placeholder">
              <span>📢</span>
              <span>Affiliate link space</span>
            </div>
            <div className="affiliate-placeholder" style={{ marginTop: '8px' }}>
              <span>💼</span>
              <span>Partner banner space</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} SnapTools. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
