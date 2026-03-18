import ToolCard from '../components/ToolCard'
import './Tools.css'

const tools = [
  {
    icon: '📄',
    title: 'Image to PDF',
    description: 'Upload single or multiple images and instantly merge them into a downloadable PDF.',
    to: '/tools/image-to-pdf',
    gradient: 'linear-gradient(135deg, rgba(99,102,241,0.18), rgba(139,92,246,0.18))',
    badge: 'Popular',
  },
  {
    icon: '🗜️',
    title: 'Image Compressor',
    description: 'Reduce image file size with adjustable quality. Compare before & after sizes instantly.',
    to: '/tools/image-compressor',
    gradient: 'linear-gradient(135deg, rgba(16,185,129,0.18), rgba(5,150,105,0.18))',
  },
  {
    icon: '✂️',
    title: 'Background Remover',
    description: 'Remove image backgrounds with AI-powered processing. Download as transparent PNG.',
    to: '/tools/bg-remover',
    gradient: 'linear-gradient(135deg, rgba(245,158,11,0.18), rgba(239,68,68,0.18))',
    badge: 'AI Powered',
  },
  {
    icon: '🔄',
    title: 'Image Format Converter',
    description: 'Convert between PNG, JPG, and WebP in bulk. No quality loss on lossless conversions.',
    to: '/tools/image-converter',
    gradient: 'linear-gradient(135deg, rgba(99,102,241,0.18), rgba(236,72,153,0.18))',
  },
  {
    icon: '📑',
    title: 'PDF to Image',
    description: 'Extract every page of a PDF as a high-resolution PNG or JPG image. Bulk download ready.',
    to: '/tools/pdf-to-image',
    gradient: 'linear-gradient(135deg, rgba(245,158,11,0.18), rgba(16,185,129,0.18))',
    badge: 'New',
  },
]

export default function Tools() {
  return (
    <div className="tools-page" style={{ paddingTop: 'var(--navbar-height)' }}>
      <div className="container">
        <div className="tools-hero">
          <div className="badge badge-purple">All Tools</div>
          <h1>Pick your tool, <span className="gradient-text">get it done</span></h1>
          <p>
            Client-side processing — your files stay on your device. Fast, free, forever.
          </p>
          <div className="privacy-notice" style={{ margin: '0 auto' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
            </svg>
            Files never leave your device
          </div>
        </div>

        <div className="ad-placeholder">
          📢 Google AdSense — 728×90 Banner Ad
        </div>

        <div className="tools-grid">
          {tools.map((tool) => (
            <ToolCard key={tool.to} {...tool} />
          ))}
        </div>

        <div className="tools-info">
          <div className="tools-info-card">
            <span className="tools-info-icon">⚡</span>
            <div>
              <h4>Client-Side Only</h4>
              <p>All processing happens in your browser using JavaScript APIs. Zero server communication.</p>
            </div>
          </div>
          <div className="tools-info-card">
            <span className="tools-info-icon">🔒</span>
            <div>
              <h4>Privacy First</h4>
              <p>We don't collect, store, or transmit your files. Period.</p>
            </div>
          </div>
          <div className="tools-info-card">
            <span className="tools-info-icon">🆓</span>
            <div>
              <h4>Forever Free</h4>
              <p>No premium tiers, no hidden fees, no file limits. Everything is free.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
