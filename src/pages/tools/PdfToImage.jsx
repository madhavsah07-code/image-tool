import { useState, useCallback, useRef } from 'react'
import toast from 'react-hot-toast'
import FileUploader from '../../components/FileUploader'
import '../tools/ToolPage.css'
import './PdfToImage.css'

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
}

export default function PdfToImage() {
  const [pdfFile, setPdfFile]   = useState(null)
  const [pages, setPages]       = useState([])
  const [loading, setLoading]   = useState(false)
  const [progress, setProgress] = useState(0)
  const [scale, setScale]       = useState(2)
  const [format, setFormat]     = useState('png')
  const [quality, setQuality]   = useState(92)
  const [pageTotal, setPageTotal] = useState(0)

  const onFiles = useCallback((files) => {
    const file = files[0]
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      toast.error('Please upload a PDF file.')
      return
    }
    setPdfFile(file)
    setPages([])
    toast.success('PDF loaded — click Convert to extract pages')
  }, [])

  const convertPdf = async () => {
    if (!pdfFile) { toast.error('Please upload a PDF first.'); return }
    setLoading(true)
    setProgress(0)
    setPages([])

    try {
      // Dynamically import pdfjs-dist to avoid SSR issues
      const pdfjsLib = await import('pdfjs-dist')
      pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.mjs',
        import.meta.url
      ).toString()

      const arrayBuffer = await pdfFile.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
      setPageTotal(pdf.numPages)

      const extracted = []
      for (let i = 1; i <= pdf.numPages; i++) {
        const page     = await pdf.getPage(i)
        const viewport = page.getViewport({ scale })

        const canvas  = document.createElement('canvas')
        canvas.width  = viewport.width
        canvas.height = viewport.height
        const ctx = canvas.getContext('2d')

        await page.render({ canvasContext: ctx, viewport }).promise

        const mimeType = format === 'png' ? 'image/png' : 'image/jpeg'
        const q        = format === 'jpg' ? quality / 100 : undefined

        const blob = await new Promise(res => canvas.toBlob(res, mimeType, q))
        const url  = URL.createObjectURL(blob)
        extracted.push({
          url,
          blob,
          size: blob.size,
          name: `page-${String(i).padStart(3, '0')}.${format}`,
          width: viewport.width,
          height: viewport.height,
          page: i,
        })

        setProgress(Math.round((i / pdf.numPages) * 100))
      }

      setPages(extracted)
      toast.success(`${pdf.numPages} page${pdf.numPages > 1 ? 's' : ''} extracted!`)
    } catch (err) {
      toast.error('Failed to process PDF. Please try another file.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const downloadOne = (p) => {
    const a = document.createElement('a')
    a.href = p.url; a.download = p.name; a.click()
  }

  const downloadAll = () => {
    pages.forEach((p, i) => setTimeout(() => downloadOne(p), i * 120))
    toast.success(`Downloading ${pages.length} images…`)
  }

  const downloadZip = async () => {
    // Simple sequential download (no JSZip dependency needed)
    downloadAll()
  }

  const reset = () => {
    pages.forEach(p => URL.revokeObjectURL(p.url))
    setPdfFile(null)
    setPages([])
    setPageTotal(0)
  }

  return (
    <div className="tool-page" style={{ paddingTop: 'var(--navbar-height)' }}>
      <div className="container">
        <div className="ad-placeholder">📢 Google AdSense — Top Banner</div>

        <div className="tool-header">
          <div className="badge badge-amber" style={{ margin: '0 auto 12px' }}>📑 PDF to Image</div>
          <h1>PDF to Image Converter</h1>
          <p>Extract every page from a PDF as a high-quality PNG or JPG image.</p>
          <div className="privacy-notice" style={{ margin: '12px auto 0' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
            </svg>
            Your files never leave your device
          </div>
        </div>

        <div className="tool-container">
          {/* Settings */}
          <div className="card mb-4">
            <h3 className="fw-600 mb-4">Output Settings</h3>
            <div className="pdf-settings-grid">
              <div>
                <label className="label">Output Format</label>
                <div className="format-toggle">
                  {['png', 'jpg'].map(f => (
                    <button
                      key={f}
                      className={`format-btn ${format === f ? 'active' : ''}`}
                      onClick={() => setFormat(f)}
                      id={`format-btn-${f}`}
                    >
                      {f.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="label">Resolution Scale: <strong>{scale}×</strong> (~{scale * 72 * 11}px tall)</label>
                <input
                  type="range" min="1" max="4" step="0.5" value={scale}
                  onChange={e => setScale(Number(e.target.value))}
                  className="range-input" id="scale-slider"
                />
                <div className="range-labels"><span>Draft (1×)</span><span>High Res (4×)</span></div>
              </div>
              {format === 'jpg' && (
                <div>
                  <label className="label">JPG Quality: <strong>{quality}%</strong></label>
                  <input
                    type="range" min="10" max="100" value={quality}
                    onChange={e => setQuality(Number(e.target.value))}
                    className="range-input" id="pdf-quality-slider"
                  />
                  <div className="range-labels"><span>Smaller</span><span>Better</span></div>
                </div>
              )}
            </div>
          </div>

          {/* Uploader */}
          {!pdfFile ? (
            <FileUploader
              onFiles={onFiles}
              multiple={false}
              accept={{ 'application/pdf': ['.pdf'] }}
              label="Drop your PDF here"
              hint="PDF files only"
              maxSizeMB={100}
            />
          ) : (
            <div className="pdf-loaded-card card">
              <div className="pdf-icon">📄</div>
              <div className="pdf-loaded-info">
                <div className="pdf-file-name">{pdfFile.name}</div>
                <div className="pdf-file-meta">{formatBytes(pdfFile.size)}{pageTotal > 0 ? ` · ${pageTotal} pages` : ''}</div>
              </div>
              <button className="btn btn-ghost btn-sm text-danger" onClick={reset}>Remove</button>
            </div>
          )}

          {/* Convert button */}
          {pdfFile && !pages.length && (
            <button
              className="btn btn-primary w-full mt-4" style={{ justifyContent: 'center', padding: '16px' }}
              onClick={convertPdf} disabled={loading} id="convert-pdf-to-img-btn"
            >
              {loading
                ? <><div className="spinner spinner-sm" style={{ borderLeftColor: '#fff', borderTopColor: 'transparent' }} /> Extracting pages...</>
                : '📑 Extract All Pages'}
            </button>
          )}

          {/* Progress */}
          {loading && (
            <div className="progress-section mt-4">
              <div className="flex justify-between mb-4" style={{ fontSize: '0.85rem' }}>
                <span>Processing pages...</span>
                <span className="fw-600">{progress}%</span>
              </div>
              <div className="progress-wrap">
                <div className="progress-bar" style={{ width: `${progress}%`, background: 'linear-gradient(135deg, #f59e0b, #6366f1)' }} />
              </div>
            </div>
          )}

          {/* Results */}
          {pages.length > 0 && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="fw-600">{pages.length} page{pages.length > 1 ? 's' : ''} extracted</h3>
                <div className="flex gap-2">
                  <button className="btn btn-secondary btn-sm" onClick={reset}>New PDF</button>
                  <button className="btn btn-success btn-sm" onClick={downloadAll} id="download-all-pages-btn">
                    📥 Download All
                  </button>
                </div>
              </div>

              <div className="pdf-pages-grid">
                {pages.map((p) => (
                  <div key={p.page} className="pdf-page-card">
                    <div className="pdf-page-thumb">
                      <img src={p.url} alt={`Page ${p.page}`} />
                      <div className="pdf-page-overlay">
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => downloadOne(p)}
                          id={`download-page-${p.page}`}
                        >
                          📥 Download
                        </button>
                      </div>
                    </div>
                    <div className="pdf-page-meta">
                      <span className="fw-600 text-sm">Page {p.page}</span>
                      <span className="text-xs text-muted">{formatBytes(p.size)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="ad-placeholder" style={{ marginTop: '40px' }}>📢 Google AdSense — Bottom Banner</div>
      </div>
    </div>
  )
}
