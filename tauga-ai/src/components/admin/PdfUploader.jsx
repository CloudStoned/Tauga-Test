import { useRef, useState } from 'react'

export default function PdfUploader({ activeFilename, onUpload }) {
  const inputRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [filename, setFilename] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)

  function pickFile(file) {
    setSuccess('')
    setError('')
    setSelectedFile(file)
    setFilename(file?.name || '')
  }

  async function handleUpload() {
    if (!selectedFile) return

    setUploading(true)
    setSuccess('')
    setError('')

    try {
      const result = await onUpload?.(selectedFile)

      if (typeof result === 'string') {
        setSuccess(result)
      } else {
        setSuccess('PDF uploaded successfully.')
      }
    } catch (e) {
      const msg = e?.message || 'Upload failed. Please try again.'
      setError(msg)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div
      style={{
        fontFamily: 'var(--font-sans)',
        background: 'var(--card-strong)',
        padding: 24,
        borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow-sm)',
        border: '1px solid var(--border)',
      }}
    >
      <div style={{ color: 'var(--text)', fontWeight: 900, marginBottom: 6 }}>
        Hotel Information PDF
      </div>
      <div style={{ color: 'var(--muted)', marginBottom: 18 }}>
        Upload a PDF to update the chatbot's knowledge base
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault()
        }}
        onDrop={(e) => {
          e.preventDefault()
          const file = e.dataTransfer?.files?.[0]
          if (file) pickFile(file)
        }}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click()
        }}
        style={{
          border: '2px dashed rgba(47, 91, 255, 0.35)',
          background: 'rgba(47, 91, 255, 0.08)',
          borderRadius: 14,
          padding: 18,
          cursor: 'pointer',
          textAlign: 'center',
          color: 'var(--text)',
          marginBottom: 14,
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          style={{ display: 'none' }}
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) pickFile(file)
          }}
        />

        <div style={{ fontWeight: 700, marginBottom: 6 }}>
          Click to select or drag and drop
        </div>
        <div style={{ color: 'var(--muted)', fontSize: 12 }}>
          PDF files only
        </div>
      </div>

      {activeFilename ? (
        <div style={{ color: '#666', fontSize: 12, marginBottom: 10 }}>
          Active file: <span style={{ color: 'var(--text)', fontWeight: 700 }}>{activeFilename}</span>
        </div>
      ) : null}

      {filename ? (
        <div style={{ color: 'var(--text)', fontSize: 12, fontWeight: 700, marginBottom: 14 }}>
          Selected: {filename}
        </div>
      ) : null}

      {success ? (
        <div style={{ marginBottom: 12, color: '#0a7a2f', fontWeight: 700 }}>
          {success}
        </div>
      ) : null}
      {error ? (
        <div style={{ marginBottom: 12, color: '#c0392b', fontWeight: 700 }}>
          {error}
        </div>
      ) : null}

      <button
        type="button"
        onClick={handleUpload}
        disabled={uploading || !selectedFile}
        style={{
          width: '100%',
          background: 'linear-gradient(135deg, rgba(47, 91, 255, 0.95) 0%, rgba(0, 183, 168, 0.95) 100%)',
          color: 'white',
          border: 'none',
          borderRadius: 12,
          padding: '12px 16px',
          fontWeight: 700,
          cursor: uploading || !selectedFile ? 'not-allowed' : 'pointer',
          opacity: uploading || !selectedFile ? 0.65 : 1,
          border: '1px solid rgba(47, 91, 255, 0.25)',
          transition: 'transform .15s ease, box-shadow .15s ease, opacity .15s ease',
          boxShadow: '0 12px 26px rgba(47, 91, 255, 0.18)',
          boxSizing: 'border-box',

        }}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  )
}
