import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Tools from './pages/Tools'
import About from './pages/About'
import Contact from './pages/Contact'
import ImageToPdf from './pages/tools/ImageToPdf'
import ImageCompressor from './pages/tools/ImageCompressor'
import BgRemover from './pages/tools/BgRemover'
import ImageConverter from './pages/tools/ImageConverter'
import PdfToImage from './pages/tools/PdfToImage'

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('snaptools-theme') || 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('snaptools-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light')

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/tools/image-to-pdf" element={<ImageToPdf />} />
            <Route path="/tools/image-compressor" element={<ImageCompressor />} />
            <Route path="/tools/bg-remover" element={<BgRemover />} />
            <Route path="/tools/image-converter" element={<ImageConverter />} />
            <Route path="/tools/pdf-to-image" element={<PdfToImage />} />
          </Routes>
        </main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              boxShadow: 'var(--shadow-lg)',
              padding: '14px 18px',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9rem',
            },
            success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
            error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
          }}
        />
      </div>
    </BrowserRouter>
  )
}
