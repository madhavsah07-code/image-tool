import { useDropzone } from 'react-dropzone'
import './FileUploader.css'

export default function FileUploader({
  onFiles,
  accept = { 'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.gif'] },
  multiple = false,
  label = 'Drop your image here',
  hint = 'Supports JPG, PNG, WEBP',
  maxSizeMB = 50,
}) {
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop: (accepted, rejected) => {
      if (rejected.length) return
      onFiles(accepted)
    },
    accept,
    multiple,
    maxSize: maxSizeMB * 1024 * 1024,
  })

  return (
    <div
      {...getRootProps()}
      className={`file-uploader ${isDragActive ? 'drag-active' : ''} ${isDragReject ? 'drag-reject' : ''}`}
      id="file-uploader-zone"
    >
      <input {...getInputProps()} />
      <div className="upload-icon">
        {isDragReject ? '🚫' : isDragActive ? '📂' : (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
        )}
      </div>
      <div className="upload-text">
        {isDragReject
          ? 'File type not supported'
          : isDragActive
          ? 'Drop to upload!'
          : label}
      </div>
      <p className="upload-hint">
        {isDragActive ? '' : `${hint} · Max ${maxSizeMB}MB`}
      </p>
      {!isDragActive && (
        <div className="upload-cta">
          <span>Browse files</span>
        </div>
      )}
    </div>
  )
}
