# 🖼️ SnapTools — All-in-One Image & PDF Toolkit

> **Convert, compress, and transform your images — completely free, blazing fast, and 100% private.**

SnapTools is a modern, client-side image and PDF toolkit built with React + Vite. Every tool runs entirely in your browser — your files are **never uploaded to a server**.

---

## ✨ Features

| Tool | Description |
|------|-------------|
| 📄 **Image to PDF** | Merge multiple images into a single, beautifully formatted PDF |
| 🗜️ **Image Compressor** | Reduce image file size without losing quality, with before/after preview |
| ✂️ **Background Remover** | AI-powered background removal — outputs a transparent PNG |
| 🔄 **Image Converter** | Convert between image formats (JPG, PNG, WebP, etc.) |
| 📑 **PDF to Image** | Extract pages from a PDF and download as images |

---

## 🔒 Privacy First

- **Zero uploads** — all processing happens locally in your browser
- No sign-up, no account, no data collection
- Works completely offline after the first load

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/snaptools.git
cd snaptools

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` folder.

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [React 18](https://react.dev/) |
| Build Tool | [Vite 5](https://vitejs.dev/) |
| Routing | [React Router v6](https://reactrouter.com/) |
| Image Compression | [browser-image-compression](https://github.com/Donaldcwl/browser-image-compression) |
| PDF Generation | [jsPDF](https://github.com/parallax/jsPDF) |
| PDF Parsing | [pdf.js](https://mozilla.github.io/pdf.js/) |
| File Drag & Drop | [react-dropzone](https://react-dropzone.js.org/) |
| Notifications | [react-hot-toast](https://react-hot-toast.com/) |
| Styling | Vanilla CSS |

---

## 📁 Project Structure

```
snaptools/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ToolCard.jsx
│   │   └── FileUploader.jsx
│   ├── pages/              # Route-level pages
│   │   ├── Home.jsx
│   │   ├── Tools.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   └── tools/          # Individual tool pages
│   │       ├── ImageToPdf.jsx
│   │       ├── ImageCompressor.jsx
│   │       ├── ImageConverter.jsx
│   │       ├── BgRemover.jsx
│   │       └── PdfToImage.jsx
│   ├── App.jsx             # Routes & layout
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles & design tokens
├── index.html
├── vite.config.js
└── package.json
```

---

## 🎨 Design Highlights

- **Dark mode** UI with glassmorphism-style cards
- Animated hero section with floating mock cards
- Fully **responsive** — works on mobile, tablet, and desktop
- Smooth micro-animations and hover effects
- Google AdSense-ready banner placeholders

---

## 🤝 Contributing

Contributions are welcome! Please open an issue first to discuss what you'd like to change.

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙌 Acknowledgements

- [Mozilla PDF.js](https://mozilla.github.io/pdf.js/) for PDF rendering
- [browser-image-compression](https://github.com/Donaldcwl/browser-image-compression) for client-side compression
- All open-source contributors whose libraries power this project

---

<p align="center">Made with ❤️ — No files ever leave your device.</p>


yehmera read me file h sahi h 
