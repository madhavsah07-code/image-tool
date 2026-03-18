import { useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import FileUploader from '../../components/FileUploader'
import '../tools/ToolPage.css'
import './ImageConverter.css'

const CONVERSIONS = [
  { from: 'PNG', to: 'JPG',  fromMime: 'image/png',  toMime: 'image/jpeg', ext: 'jpg',  quality: 0.92, icon: '🔵→🟡' },
  { from: 'JPG', to: 'PNG',  fromMime: 'image/jpeg', toMime: 'image/png',  ext: 'png',  quality: 1,    icon: '🟡→🔵' },
  { from: 'WebP', to: 'JPG', fromMime: 'image/webp', toMime: 'image/jpeg', ext: 'jpg',  quality: 0.92, icon: '🟢→🟡' },
  { from: 'JPG', to: 'WebP', fromMime: 'image/jpeg', toMime: 'image/webp', ext: 'webp', quality: 0.9,  icon: '🟡→🟢' },
  { from: 'PNG', to: 'WebP', fromMime: 'image/png',  toMime: 'image/webp', ext: 'webp', quality: 0.9,  icon: '🔵→🟢' },
]

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
}

export default function ImageConverter() {
  const [selected, setSelected] = useState(0)
  const [files, setFiles]       = useState([])
  const [results, setResults]   = useState([])
  const [loading, setLoading]   = useState(false)
  const [progress, setProgress] = useState(0)
  const [quality, setQuality]   = useState(92)

  const conv = CONVERSIONS[selected]

  const accept = {
    [conv.fromMime]: [],
    // also accept generic image types so users aren't confused
  }

  const onFiles = useCallback((dropped) => {
    const valid = dropped.filter(f => {
      const matches = f.type === conv.fromMime ||
        (conv.from === 'JPG' && f.type === 'image/jpg') ||
        (conv.from === 'PNG' && f.name.toLowerCase().endsWith('.png')) ||
        (conv.from === 'JPG' && (f.name.toLowerCase().endsWith('.jpg') || f.name.toLowerCase().endsWith('.jpeg'))) ||
        (conv.from === 'WebP' && f.name.toLowerCase().endsWith('.webp'))
      return matches
    })
    if (valid.length === 0) {
      toast.error(`Please upload ${conv.from} files for this conversion.`)
      return
    }
    if (valid.length < dropped.length) {
      toast(`${dropped.length - valid.length} incompatible file(s) skipped.`, { icon: '⚠️' })
    }
    setFiles(prev => [...prev, ...valid.map(f => ({ file: f, url: URL.createObjectURL(f), name: f.name, size: f.size }))])
    setResults([])
    toast.success(`${valid.length} file(s) added`)
  }, [conv])

  const convertAll = async () => {
    if (!files.length) { toast.error('Please upload at least one file.'); return }
    setLoading(true)
    setProgress(0)
    const out = []
    try {
      for (let i = 0; i < files.length; i++) {
        const { file, name } = files[i]
        const blob = await convertImage(file, conv.toMime, quality / 100)
        const url  = URL.createObjectURL(blob)
        const baseName = name.replace(/\.[^.]+$/, '')
        out.push({ url, blob, size: blob.size, name: `${baseName}.${conv.ext}`, original: files[i].size })
        setProgress(Math.round(((i + 1) / files.length) * 100))
      }
      setResults(out)
      toast.success(`${out.length} file(s) converted!`)
    } catch (err) {
      toast.error('Conversion failed. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const convertImage = (file, toMime, q) => new Promise((res, rej) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width  = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d')
      if (toMime === 'image/jpeg') {
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
      ctx.drawImage(img, 0, 0)
      canvas.toBlob(blob => blob ? res(blob) : rej(new Error('Conversion failed')), toMime, q)
    }
    img.onerror = rej
    img.src = URL.createObjectURL(file)
  })

  const downloadOne = (r) => {
    const a = document.createElement('a')
    a.href = r.url; a.download = r.name; a.click()
  }

  const downloadAll = () => {
    results.forEach((r, i) => setTimeout(() => downloadOne(r), i * 150))
    toast.success('All files downloaded!')
  }

  const reset = () => {
    files.forEach(f => URL.revokeObjectURL(f.url))
    results.forEach(r => URL.revokeObjectURL(r.url))
    setFiles([]); setResults([])
  }

  const switchConversion = (idx) => {
    reset()
    setSelected(idx)
  }

  return (
    <div className="tool-page" style={{ paddingTop: 'var(--navbar-height)' }}>
      <div className="container">
        <div className="ad-placeholder">📢 Google AdSense — Top Banner</div>

        <div className="tool-header">
          <div className="badge badge-purple" style={{ margin: '0 auto 12px' }}>🔄 Format Converter</div>
          <h1>Image Format Converter</h1>
          <p>Convert between PNG, JPG, and WebP — bulk processing, instant download.</p>
          <div className="privacy-notice" style={{ margin: '12px auto 0' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
            </svg>
            Your files never leave your device
          </div>
        </div>

        <div className="tool-container">
          {/* Conversion type selector */}
          <div className="conv-tabs">
            {CONVERSIONS.map((c, i) => (
              <button
                key={i}
                className={`conv-tab ${selected === i ? 'active' : ''}`}
                onClick={() => switchConversion(i)}
                id={`conv-tab-${c.from.toLowerCase()}-to-${c.to.toLowerCase()}`}
              >
                <span className="conv-tab-icon">{c.icon.split('→')[0]}</span>
                <span className="conv-tab-label">{c.from} → {c.to}</span>
              </button>
            ))}
          </div>

          {/* Quality slider (for lossy targets) */}
          {(conv.to === 'JPG' || conv.to === 'WebP') && (
            <div className="card mb-4">
              <label className="label">
                Output Quality: <strong>{quality}%</strong>
              </label>
              <input
                type="range" min="10" max="100" value={quality}
                onChange={e => setQuality(Number(e.target.value))}
                className="range-input" id="conv-quality-slider"
              />
              <div className="range-labels"><span>Smaller file</span><span>Better quality</span></div>
            </div>
          )}

          {/* Uploader */}
          <FileUploader
            onFiles={onFiles}
            multiple
            accept={{ [conv.fromMime]: [], 'image/*': [] }}
            label={`Drop your ${conv.from} files here`}
            hint={`Upload ${conv.from} files — bulk supported`}
          />

          {/* File list */}
          {files.length > 0 && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="fw-600">{files.length} file{files.length > 1 ? 's' : ''} ready to convert</h3>
                <button className="btn btn-ghost btn-sm text-danger" onClick={reset}>Clear All</button>
              </div>

              <div className="conv-file-list">
                {files.map((f, i) => (
                  <div key={i} className="conv-file-row">
                    <img src={f.url} alt={f.name} className="conv-thumb" />
                    <div className="conv-file-info">
                      <div className="conv-file-name">{f.name}</div>
                      <div className="conv-file-meta">{formatBytes(f.size)}</div>
                    </div>
                    {results[i] && (
                      <div className="conv-result-info">
                        <span className="badge badge-success">{conv.to}</span>
                        <span className="text-sm text-muted">{formatBytes(results[i].size)}</span>
                      </div>
                    )}
                    {results[i] && (
                      <button className="btn btn-success btn-sm" onClick={() => downloadOne(results[i])}>
                        📥 Save
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {loading && (
                <div className="progress-section mt-4">
                  <div className="flex justify-between mb-4" style={{ fontSize: '0.85rem' }}>
                    <span>Converting...</span>
                    <span className="fw-600">{progress}%</span>
                  </div>
                  <div className="progress-wrap">
                    <div className="progress-bar" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <button
                  className="btn btn-primary flex-1" style={{ justifyContent: 'center' }}
                  onClick={convertAll} disabled={loading} id="convert-images-btn"
                >
                  {loading
                    ? <><div className="spinner spinner-sm" style={{ borderLeftColor: '#fff', borderTopColor: 'transparent' }} /> Converting...</>
                    : `🔄 Convert to ${conv.to}`}
                </button>
                {results.length > 0 && (
                  <button className="btn btn-success" onClick={downloadAll} id="download-all-btn">
                    📥 Download All
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
