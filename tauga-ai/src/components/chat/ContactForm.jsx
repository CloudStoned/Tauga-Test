import { useState } from 'react'

export default function ContactForm({ onSubmit }) {
  // onSubmit should accept (name, phone, email, extra)
  // but existing callers can ignore the extra arg.
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(name, phone, email)
    setSuccess(true) // success UI will show immediately; notification is handled by backend via onSubmit

  }

  return (
    <div
      style={{
        background: '#ffffff',
        boxShadow: '0 1px 2px rgba(0,0,0,.06), 0 10px 30px rgba(0,0,0,.03)',
        borderRadius: 14,
        padding: 18,
        width: '100%',
        maxWidth: 640,
        margin: '18px auto 0',
      }}
    >
      <div style={{ color: '#000000e6', fontWeight: 600, marginBottom: 14 }}>
        I’m sorry, I don’t have that information right now. Please leave your details and we'll get back to you.
      </div>

      {success ? (
        <div style={{ background: 'rgba(0,67,112,.08)', color: '#004370', padding: 12, borderRadius: 12, fontWeight: 600 }}>
          Thanks! We’ll get back to you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
            <div>
              <div style={{ color: '#666', fontSize: 12, marginBottom: 6, fontFamily: 'sans-serif' }}>
                Name
              </div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: '100%',
                  border: '1px solid #ddd',
                  borderRadius: 10,
                  padding: '12px 12px',
                  fontSize: 12,
                  fontFamily: 'sans-serif',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <div style={{ color: '#666', fontSize: 12, marginBottom: 6, fontFamily: 'sans-serif' }}>
                Phone
              </div>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{
                  width: '100%',
                  border: '1px solid #ddd',
                  borderRadius: 10,
                  padding: '12px 12px',
                  fontSize: 12,
                  fontFamily: 'sans-serif',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <div style={{ color: '#666', fontSize: 12, marginBottom: 6, fontFamily: 'sans-serif' }}>
                Email
              </div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                style={{
                  width: '100%',
                  border: '1px solid #ddd',
                  borderRadius: 10,
                  padding: '12px 12px',
                  fontSize: 12,
                  fontFamily: 'sans-serif',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            style={{
              marginTop: 14,
              width: '100%',
              background: '#004370',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              padding: '12px 16px',
              fontSize: 12,
              fontFamily: 'sans-serif',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Submit
          </button>
        </form>
      )}
    </div>
  )
}
