import { useState, useCallback } from 'react'
import imageCompression from 'browser-image-compression'
import toast from 'react-hot-toast'
import FileUploader from '../../components/FileUploader'
import './ToolPage.css'

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
}

export default function ImageCompressor() {
  const [original, setOriginal] = useState(null)
  const [compressed, setCompressed] = useState(null)
  const [quality, setQuality] = useState(0.7)
  const [maxWidthPx, setMaxWidthPx] = useState(1920)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const onFiles = useCallback((files) => {
    const file = files[0]
    setOriginal({ file, url: URL.createObjectURL(file), size: file.size, name: file.name })
    setCompressed(null)
  }, [])

  const compress = async () => {
    if (!original) { toast.error('Please upload an image first.'); return }
    setLoading(true)
    setProgress(0)
    try {
      const options = {
        maxSizeMB: 50,
        maxWidthOrHeight: maxWidthPx,
        useWebWorker: true,
        fileType: original.file.type,
        initialQuality: quality,
        onProgress: (p) => setProgress(p),
      }
      const blob = await imageCompression(original.file, options)
      const url = URL.createObjectURL(blob)
      setCompressed({ blob, url, size: blob.size })
      const saved = Math.round(((original.size - blob.size) / original.size) * 100)
      toast.success(`Compressed! Saved ${saved}% (${formatBytes(original.size - blob.size)})`)
    } catch (err) {
      toast.error('Compression failed. Please try another image.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const download = () => {
    if (!compressed) return
    const a = document.createElement('a')
    a.href = compressed.url
    const ext = original.name.split('.').pop()
    a.download = `snaptools-compressed.${ext}`
    a.click()
    toast.success('Image downloaded!')
  }

  const reset = () => {
    if (original) URL.revokeObjectURL(original.url)
    if (compressed) URL.revokeObjectURL(compressed.url)
    setOriginal(null)
    setCompressed(null)
  }

  const saving = compressed ? Math.round(((original.size - compressed.size) / original.size) * 100) : 0

  return (
    <div className="tool-page" style={{ paddingTop: 'var(--navbar-height)' }}>
      <div className="container">
        <div className="ad-placeholder">📢 Google AdSense — Top Banner</div>

        <div className="tool-header">
          <div className="badge badge-success" style={{ margin: '0 auto 12px' }}>🗜️ Compressor</div>
          <h1>Image Compressor</h1>
          <p>Reduce image file size without noticeable quality loss.</p>
          <div className="privacy-notice" style={{ margin: '12px auto 0' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
            </svg>
            Your files never leave your device
          </div>
        </div>

        <div className="tool-container">
          {!original ? (
            <FileUploader onFiles={onFiles} label="Drop an image to compress" hint="JPG, PNG, WEBP" />
          ) : (
            <div>
              {/* Settings */}
              <div className="card mb-6">
                <h3 className="fw-600 mb-4">Compression Settings</h3>
                <div className="settings-grid">
                  <div>
                    <label className="label">Quality: <strong>{Math.round(quality * 100)}%</strong></label>
                    <input
                      type="range" min="10" max="100" value={Math.round(quality * 100)}
                      onChange={e => setQuality(e.target.value / 100)}
                      className="range-input" id="quality-slider"
                    />
                    <div className="range-labels"><span>Smaller</span><span>Better Quality</span></div>
                  </div>
                  <div>
                    <label className="label">Max Width: <strong>{maxWidthPx}px</strong></label>
                    <input
                      type="range" min="320" max="3840" step="80" value={maxWidthPx}
                      onChange={e => setMaxWidthPx(Number(e.target.value))}
                      className="range-input" id="width-slider"
                    />
                    <div className="range-labels"><span>320px</span><span>3840px</span></div>
                  </div>
                </div>
              </div>

              {/* Before/After */}
              <div className="compare-grid">
                <div className="compare-panel">
                  <div className="compare-header">
                    <span className="badge badge-purple">Original</span>
                    <span className="text-sm text-muted fw-600">{formatBytes(original.size)}</span>
                  </div>
                  <img src={original.url} alt="Original" className="compare-img" />
                </div>
                <div className="compare-panel">
                  <div className="compare-header">
                    <span className="badge badge-success">Compressed</span>
                    {compressed
                      ? <span className="text-sm text-success fw-600">{formatBytes(compressed.size)} (−{saving}%)</span>
                      : <span className="text-sm text-muted">—</span>}
                  </div>
                  <div className="compare-img-wrap">
                    {compressed
                      ? <img src={compressed.url} alt="Compressed" className="compare-img" />
                      : (
                        <div className="compare-placeholder">
                          {loading
                            ? <><div className="spinner" /><span>Compressing...</span></>
                            : <span>Click "Compress" to see result</span>}
                        </div>
                      )}
                  </div>
                </div>
              </div>

              {loading && (
                <div className="progress-section mt-4">
                  <div className="flex justify-between mb-4" style={{ fontSize: '0.85rem' }}>
                    <span>Compressing...</span>
                    <span className="fw-600">{progress}%</span>
                  </div>
                  <div className="progress-wrap">
                    <div className="progress-bar" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <button className="btn btn-secondary" onClick={reset} id="reset-compressor-btn">Upload New</button>
                <button
                  className="btn btn-primary flex-1" style={{ justifyContent: 'center' }}
                  onClick={compress} disabled={loading} id="compress-btn"
                >
                  {loading ? <><div className="spinner spinner-sm" style={{ borderLeftColor: '#fff', borderTopColor: 'transparent' }} /> Compressing...</> : '🗜️ Compress Image'}
                </button>
                {compressed && (
                  <button className="btn btn-success" onClick={download} id="download-compressed-btn">
                    📥 Download
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="ad-placeholder" style={{ marginTop: '40px' }}>📢 Google AdSense — Bottom Banner</div>
      </div>
    </div>
  )
}
