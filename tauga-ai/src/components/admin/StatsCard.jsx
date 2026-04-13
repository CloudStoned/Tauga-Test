export default function StatsCard({ label, value }) {
  return (
    <div
      style={{
        background: 'var(--card-strong)',
        padding: 24,
        borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow-sm)',
        border: '1px solid var(--border)',
        borderLeft: '3px solid rgba(47, 91, 255, 0.55)',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <div style={{ color: 'var(--text)', fontWeight: 900, fontSize: 28 }}>
        {value}
      </div>
      <div
        style={{
          color: 'var(--muted)',
          fontSize: 12,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          fontWeight: 700,
          marginTop: 8,
        }}
      >
        {label}
      </div>
    </div>
  )
}
