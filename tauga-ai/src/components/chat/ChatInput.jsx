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
        alignItems: 'center',
        background: 'rgba(255,255,255,0.75)',
        borderTop: '1px solid rgba(0,0,0,0.06)',
        padding: '7px 10px',
        borderRadius: 20,
        boxShadow: '0 14px 40px rgba(0,0,0,0.06)'
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
          height: 40,
          lineHeight: '40px',
          width: '100%',
          maxWidth: '100%',
          flexGrow: 1,
          border: 'none',
          outline: 'none',
          boxShadow: 'none',
          caretColor: 'var(--accent-2)',
          padding: '0 16px',
          fontSize: 13,
          fontFamily: 'sans-serif',
          color: 'var(--text)',
          background: 'transparent',
          borderRadius: 16,
          transition: 'box-shadow .15s ease',
        }}
      />

    </div>
  )
}
