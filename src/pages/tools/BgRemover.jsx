import { useState, useCallback, useRef } from 'react'
import toast from 'react-hot-toast'
import FileUploader from '../../components/FileUploader'
import './ToolPage.css'

export default function BgRemover() {
  const [original, setOriginal] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [sensitivity, setSensitivity] = useState(30)
  const canvasRef = useRef(null)

  const onFiles = useCallback((files) => {
    const file = files[0]
    const url = URL.createObjectURL(file)
    setOriginal({ file, url, name: file.name })
    setResult(null)
  }, [])

  const removeBackground = async () => {
    if (!original) { toast.error('Please upload an image first.'); return }
    setLoading(true)
    setProgress(0)

    try {
      const img = await loadImage(original.url)
      const canvas = canvasRef.current
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      const total = data.length / 4

      // Sample corner pixels as background color candidates
      const corners = [
        [0, 0], [img.width - 1, 0],
        [0, img.height - 1], [img.width - 1, img.height - 1],
        [Math.floor(img.width / 2), 0],
      ]
      const bgColors = corners.map(([x, y]) => {
        const i = (y * img.width + x) * 4
        return [data[i], data[i + 1], data[i + 2]]
      })

      const colorDist = (r1, g1, b1, r2, g2, b2) =>
        Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2)

      setProgress(20)
      await new Promise(r => setTimeout(r, 50))

      const thresh = sensitivity * 2.5

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2]
        const isBackground = bgColors.some(([br, bg, bb]) => colorDist(r, g, b, br, bg, bb) < thresh)
        if (isBackground) {
          data[i + 3] = 0
        }
        if (i % Math.floor(total * 4 / 5) === 0) {
          setProgress(prev => Math.min(prev + 15, 90))
          await new Promise(r => setTimeout(r, 10))
        }
      }

      ctx.putImageData(imageData, 0, 0)
      setProgress(100)

      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob)
        setResult({ url, blob, size: blob.size })
        toast.success('Background removed!')
        setLoading(false)
        setProgress(0)
      }, 'image/png')

    } catch (err) {
      toast.error('Processing failed. Please try another image.')
      console.error(err)
      setLoading(false)
    }
  }

  const loadImage = (src) => new Promise((res, rej) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => res(img)
    img.onerror = rej
    img.src = src
  })

  const download = () => {
    if (!result) return
    const a = document.createElement('a')
    a.href = result.url
    a.download = 'snaptools-no-bg.png'
    a.click()
    toast.success('Transparent PNG downloaded!')
  }

  const reset = () => {
    if (original) URL.revokeObjectURL(original.url)
    if (result) URL.revokeObjectURL(result.url)
    setOriginal(null)
    setResult(null)
  }

  return (
    <div className="tool-page" style={{ paddingTop: 'var(--navbar-height)' }}>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <div className="container">
        <div className="ad-placeholder">📢 Google AdSense — Top Banner</div>

        <div className="tool-header">
          <div className="badge badge-amber" style={{ margin: '0 auto 12px' }}>✂️ BG Remover</div>
          <h1>Background Remover</h1>
          <p>Remove image backgrounds completely in your browser. No server needed.</p>
          <div className="privacy-notice" style={{ margin: '12px auto 0' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
            </svg>
            Your files never leave your device
          </div>
        </div>

        <div className="tool-container">
          {!original ? (
            <>
              <div className="bg-tip card mb-4">
                <span>💡</span>
                <span>Works best on images with a <strong>solid or near-solid background</strong> (white, blue sky, green screen, etc.)</span>
              </div>
              <FileUploader onFiles={onFiles} label="Drop your image here" hint="PNG, JPG, WEBP work best" />
            </>
          ) : (
            <div>
              {/* Sensitivity */}
              <div className="card mb-6">
                <h3 className="fw-600 mb-4">Background Detection Sensitivity</h3>
                <label className="label">Threshold: <strong>{sensitivity}</strong> — Higher = removes more</label>
                <input
                  type="range" min="5" max="80" value={sensitivity}
                  onChange={e => setSensitivity(Number(e.target.value))}
                  className="range-input" id="sensitivity-slider"
                />
                <div className="range-labels"><span>Precise</span><span>Aggressive</span></div>
              </div>

              {/* Before / After */}
              <div className="compare-grid">
                <div className="compare-panel">
                  <div className="compare-header">
                    <span className="badge badge-purple">Original</span>
                  </div>
                  <img src={original.url} alt="Original" className="compare-img" />
                </div>
                <div className="compare-panel">
                  <div className="compare-header">
                    <span className="badge badge-amber">Result</span>
                    {result && <span className="text-xs text-muted">Transparent PNG</span>}
                  </div>
                  <div className="compare-img-wrap checkerboard">
                    {result
                      ? <img src={result.url} alt="Result" className="compare-img" />
                      : (
                        <div className="compare-placeholder">
                          {loading
                            ? <><div className="spinner" /><span>Removing background... {progress}%</span></>
                            : <span>Press "Remove Background" to process</span>}
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>

              {loading && (
                <div className="progress-section mt-4">
                  <div className="flex justify-between mb-4" style={{ fontSize: '0.85rem' }}>
                    <span>Processing...</span>
                    <span className="fw-600">{progress}%</span>
                  </div>
                  <div className="progress-wrap">
                    <div className="progress-bar" style={{ width: `${progress}%`, background: 'linear-gradient(135deg, #f59e0b, #ef4444)' }} />
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <button className="btn btn-secondary" onClick={reset} id="reset-bg-btn">Upload New</button>
                <button
                  className="btn btn-primary flex-1" style={{ justifyContent: 'center' }}
                  onClick={removeBackground} disabled={loading} id="remove-bg-btn"
                >
                  {loading
                    ? <><div className="spinner spinner-sm" style={{ borderLeftColor: '#fff', borderTopColor: 'transparent' }} /> Processing...</>
                    : '✂️ Remove Background'}
                </button>
                {result && (
                  <button className="btn btn-success" onClick={download} id="download-png-btn">
                    📥 Download PNG
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
