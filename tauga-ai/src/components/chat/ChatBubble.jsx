export default function ChatBubble({ message, sender }) {
  const isBot = sender === 'bot'

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isBot ? 'flex-start' : 'flex-end',
        padding: '6px 12px',
      }}
    >
      <div style={{ maxWidth: 520, width: '100%' }}>
        <div
          style={{
            fontSize: 11,
            color: 'var(--muted)',
            marginBottom: 6,
            textAlign: isBot ? 'left' : 'right',
          }}
        >
          {isBot ? 'Bot' : 'You'}
        </div>

        <div
          style={{
            background: isBot ? 'var(--card-strong)' : 'rgba(47, 91, 255, 0.95)',
            color: isBot ? 'var(--text)' : 'white',
            boxShadow: isBot ? 'var(--shadow-sm)' : 'none',
            border: isBot ? '1px solid var(--border)' : '1px solid rgba(47, 91, 255, 0.4)',
            padding: '12px 14px',
            borderRadius: 14,
            borderTopLeftRadius: isBot ? 14 : 0,
            borderTopRightRadius: isBot ? 14 : 14,
            borderBottomLeftRadius: isBot ? 14 : 0,
            borderBottomRightRadius: isBot ? 14 : 14,
          }}
        >
          {message}
        </div>
      </div>
    </div>
  )
}
