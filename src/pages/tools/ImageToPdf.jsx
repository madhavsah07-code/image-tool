import { useState, useCallback } from 'react'
import { jsPDF } from 'jspdf'
import toast from 'react-hot-toast'
import FileUploader from '../../components/FileUploader'
import './ToolPage.css'

export default function ImageToPdf() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const onFiles = useCallback((files) => {
    const newImgs = files.map(f => ({
      file: f,
      url: URL.createObjectURL(f),
      name: f.name,
      size: f.size,
    }))
    setImages(prev => [...prev, ...newImgs])
    toast.success(`${files.length} image(s) added`)
  }, [])

  const removeImage = (idx) => {
    setImages(prev => {
      URL.revokeObjectURL(prev[idx].url)
      return prev.filter((_, i) => i !== idx)
    })
  }

  const moveImage = (idx, dir) => {
    setImages(prev => {
      const arr = [...prev]
      const target = idx + dir
      if (target < 0 || target >= arr.length) return arr
      ;[arr[idx], arr[target]] = [arr[target], arr[idx]]
      return arr
    })
  }

  const convertToPDF = async () => {
    if (!images.length) { toast.error('Please add at least one image.'); return }
    setLoading(true)
    setProgress(0)
    try {
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      const W = pdf.internal.pageSize.getWidth()
      const H = pdf.internal.pageSize.getHeight()

      for (let i = 0; i < images.length; i++) {
        setProgress(Math.round(((i + 0.5) / images.length) * 100))
        const { url } = images[i]
        const img = await loadImage(url)
        const ratio = Math.min(W / img.width, H / img.height)
        const w = img.width * ratio
        const h = img.height * ratio
        const x = (W - w) / 2
        const y = (H - h) / 2

        if (i > 0) pdf.addPage()
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        canvas.getContext('2d').drawImage(img, 0, 0)
        const data = canvas.toDataURL('image/jpeg', 0.92)
        pdf.addImage(data, 'JPEG', x, y, w, h)
        setProgress(Math.round(((i + 1) / images.length) * 100))
      }

      pdf.save('snaptools-converted.pdf')
      toast.success('PDF downloaded successfully!')
    } catch (err) {
      toast.error('Something went wrong. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
      setProgress(0)
    }
  }

  const loadImage = (src) => new Promise((res, rej) => {
    const img = new Image()
    img.onload = () => res(img)
    img.onerror = rej
    img.src = src
  })

  const clearAll = () => {
    images.forEach(i => URL.revokeObjectURL(i.url))
    setImages([])
  }

  return (
    <div className="tool-page" style={{ paddingTop: 'var(--navbar-height)' }}>
      <div className="container">
        <div className="ad-placeholder">📢 Google AdSense — Top Banner</div>

        <div className="tool-header">
          <div className="badge badge-purple" style={{ margin: '0 auto 12px' }}>📄 Image to PDF</div>
          <h1>Image to PDF Converter</h1>
          <p>Upload one or multiple images and convert them into a single downloadable PDF.</p>
          <div className="privacy-notice" style={{ margin: '12px auto 0' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
            </svg>
            Your files never leave your device
          </div>
        </div>

        <div className="tool-container">
          <FileUploader
            onFiles={onFiles}
            multiple
            label="Drop images here or click to upload"
            hint="Supports JPG, PNG, WEBP, GIF"
          />

          {images.length > 0 && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="fw-600">{images.length} image{images.length > 1 ? 's' : ''} ready</h3>
                <button className="btn btn-ghost btn-sm text-danger" onClick={clearAll}>Clear All</button>
              </div>

              <div className="image-grid">
                {images.map((img, idx) => (
                  <div key={idx} className="image-thumb">
                    <img src={img.url} alt={img.name} />
                    <div className="thumb-overlay">
                      <div className="thumb-controls">
                        <button onClick={() => moveImage(idx, -1)} disabled={idx === 0} title="Move up">↑</button>
                        <button onClick={() => moveImage(idx, 1)} disabled={idx === images.length - 1} title="Move down">↓</button>
                        <button onClick={() => removeImage(idx)} className="remove-btn" title="Remove">✕</button>
                      </div>
                    </div>
                    <div className="thumb-label">
                      <span className="thumb-index">{idx + 1}</span>
                      <span className="thumb-name">{img.name.slice(0, 16)}</span>
                    </div>
                  </div>
                ))}
              </div>

              {loading && (
                <div className="progress-section">
                  <div className="flex justify-between mb-4" style={{ fontSize: '0.85rem' }}>
                    <span>Converting...</span>
                    <span className="fw-600">{progress}%</span>
                  </div>
                  <div className="progress-wrap">
                    <div className="progress-bar" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )}

              <button
                className="btn btn-primary w-full mt-6"
                style={{ justifyContent: 'center', padding: '16px' }}
                onClick={convertToPDF}
                disabled={loading}
                id="convert-pdf-btn"
              >
                {loading ? (
                  <><div className="spinner spinner-sm" style={{ borderLeftColor: '#fff', borderTopColor: 'transparent' }} /> Converting...</>
                ) : (
                  <><span>📥</span> Convert & Download PDF</>
                )}
              </button>
            </div>
          )}
        </div>
        <div className="ad-placeholder" style={{ marginTop: '40px' }}>📢 Google AdSense — Bottom Banner</div>
      </div>
    </div>
  )
}
