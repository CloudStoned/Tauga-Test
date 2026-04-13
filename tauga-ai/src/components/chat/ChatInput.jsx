import { useEffect, useState } from 'react'

export default function ChatInput({ onSend, disabled }) {
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (disabled) setMessage('')
  }, [disabled])

  function submit() {
    const trimmed = message.trim()
    if (!trimmed) return
    onSend(trimmed)
    setMessage('')
  }

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        alignItems: 'stretch',
        background: 'var(--card)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        disabled={disabled}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            if (!disabled) submit()
          }
        }}
        style={{
          flexGrow: 1,
          border: 'none',
          outline: 'none',
          boxShadow: 'none',
          caretColor: 'var(--accent-2)',
          padding: '14px 16px',
          fontSize: 12,
          fontFamily: 'sans-serif',
          color: 'var(--text)',
          background: 'transparent',
          borderRadius: 14,
          transition: 'box-shadow .15s ease',
        }}
      />
      <button
        type="button"
        disabled={disabled}
        onClick={submit}
        style={{
          background: 'linear-gradient(135deg, rgba(47, 91, 255, 0.95) 0%, rgba(0, 183, 168, 0.95) 100%)',
          color: 'white',
          border: '1px solid rgba(47, 91, 255, 0.3)',
          padding: '0 18px',
          fontSize: 12,
          fontFamily: 'sans-serif',
          fontWeight: 700,
          cursor: disabled ? 'not-allowed' : 'pointer',
          borderRadius: 0,
          transition: 'transform .15s ease, box-shadow .15s ease, opacity .15s ease',
          opacity: disabled ? 0.65 : 1,
          boxShadow: '0 10px 24px rgba(47, 91, 255, 0.18)',
        }}
      >
        Send
      </button>
    </div>
  )
}
