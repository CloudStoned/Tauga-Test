export default function Navbar({ mode, showBack }) {
  const isAdmin = mode === 'admin'

  return (
    <header
      style={{
        '--color-text-primary': '#000000e6',
        '--color-text-secondary': '#666',
        '--color-background': '#f7fafc',
        '--color-accent': '#004370',
        fontFamily: 'sans-serif',
        background: '#ffffff',
        borderBottom: '1px solid #eee',
        padding: '0 24px',
        height: 52,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: '#000000e6',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {showBack ? (
          <div
            aria-hidden="true"
            style={{
              color: '#004370',
              display: 'flex',
              alignItems: 'center',
              fontWeight: 800,
            }}
          >
            ←
          </div>
        ) : null}

        <div style={{ fontWeight: 600 }}>Cincinnati Hotel</div>
      </div>

      <div>
        {isAdmin ? (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px 12px',
              borderRadius: 999,
              background: '#004370',
              color: '#fff',
              fontWeight: 800,
              fontSize: 12,
            }}
          >
            Admin
          </span>
        ) : (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px 12px',
              borderRadius: 999,
              background: '#f7fafc',
              border: '1px solid #eee',
              color: '#004370',
              fontWeight: 800,
              fontSize: 12,
            }}
          >
            Guest
          </span>
        )}
      </div>
    </header>
  )
}
