function formatBotText(text) {
  if (typeof text !== 'string') return text

  const trimmed = text.trim()
  if (!trimmed) return trimmed

  // Split into paragraphs on blank lines.
  const paragraphs = trimmed.split(/\n\s*\n/g)

  return paragraphs.map((p, idx) => {
    const lines = p.split(/\n/g).map((l) => l.trimEnd())

    // Detect simple unordered list blocks: consecutive lines starting with - or *.
    const isBullet = (line) => /^\s*[-*]\s+/.test(line)
    if (lines.length >= 2 && lines.every((l) => l.trim() === '' || isBullet(l))) {
      const items = lines
        .filter((l) => l.trim() !== '')
        .map((l) => l.replace(/^\s*[-*]\s+/, ''))

      return (
        <ul key={idx} style={{ margin: '8px 0 0 18px', padding: 0 }}>
          {items.map((item, i) => (
            <li key={i} style={{ margin: '4px 0' }}>
              {item}
            </li>
          ))}
        </ul>
      )
    }

    // Detect numbered blocks like "1) ..." "2) ..." etc.
    const isNumbered = (line) => /^\s*\d+\)\s+/.test(line)
    if (lines.length >= 2 && lines.every((l) => l.trim() === '' || isNumbered(l))) {
      const items = lines
        .filter((l) => l.trim() !== '')
        .map((l) => l.replace(/^\s*\d+\)\s+/, ''))

      return (
        <ol key={idx} style={{ margin: '8px 0 0 18px', padding: 0 }}>
          {items.map((item, i) => (
            <li key={i} style={{ margin: '4px 0' }}>
              {item}
            </li>
          ))}
        </ol>
      )
    }

    // Otherwise, render as a paragraph with preserved newlines.
    return (
      <p key={idx} style={{ margin: '0 0 8px 0' }}>
        {p.split(/\n/g).map((line, i) => (
          <span key={i}>
            {line}
            {i < p.split(/\n/g).length - 1 ? <br /> : null}
          </span>
        ))}
      </p>
    )
  })
}

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
          {isBot ? formatBotText(message) : message}
        </div>
      </div>
    </div>
  )
}
