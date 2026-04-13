import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ChatBubble from '../components/chat/ChatBubble.jsx'
import ChatInput from '../components/chat/ChatInput.jsx'
import ContactForm from '../components/chat/ContactForm.jsx'

function Loader() {
  return (
    <div
      aria-label="Loading"
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        padding: '6px 12px',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          gap: 6,
          padding: '10px 12px',
          borderRadius: 14,
          background: '#fff',
          boxShadow: '0 1px 2px rgba(0,0,0,.06), 0 10px 30px rgba(0,0,0,.03)',
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            background: '#004370',
            display: 'inline-block',
            animation: 'dotPulse 1s infinite ease-in-out',
          }}
        />
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            background: '#004370',
            display: 'inline-block',
            animation: 'dotPulse 1s infinite ease-in-out',
            animationDelay: '0.15s',
          }}
        />
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            background: '#004370',
            display: 'inline-block',
            animation: 'dotPulse 1s infinite ease-in-out',
            animationDelay: '0.3s',
          }}
        />

        <style>
          {`@keyframes dotPulse{0%,80%,100%{transform:translateY(0);opacity:.45}40%{transform:translateY(-4px);opacity:1}}`}
        </style>
      </div>
    </div>
  )
}

export default function UserChat() {
  const navigate = useNavigate()

  const [sessionId] = useState(() => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID()
    }
    return String(Date.now())
  })

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! Welcome to Cincinnati Hotel. How can I help you today?',
    },
  ])

  const [waiting, setWaiting] = useState(false)
  const [showContact, setShowContact] = useState(false)

  const listRef = useRef(null)

  const unansweredQuestion = useMemo(() => {
    if (!messages.length) return ''
    const lastUser = [...messages].reverse().find((m) => m.sender === 'user')
    return lastUser?.text || ''
  }, [messages])

  useEffect(() => {
    const el = listRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [messages, waiting])

  async function sendMessage(message) {
    setWaiting(true)
    setShowContact(false)

    const userMessage = { sender: 'user', text: message }
    setMessages((prev) => [...prev, userMessage])

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/chat`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, message }),
        }
      )

      const data = await res.json()

      if (data?.canAnswer === false) {
        if (typeof data?.reply === 'string' && data.reply.trim()) {
          setMessages((prev) => [...prev, { sender: 'bot', text: data.reply }])
        }
        setShowContact(true)
        return
      }

      const botText =
        typeof data?.reply === 'string'
          ? data.reply
          : 'Thanks — I’m still looking into that. Could you share more details?'

      setMessages((prev) => [...prev, { sender: 'bot', text: botText }])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'Sorry — something went wrong. Please try again shortly.',
        },
      ])
    } finally {
      setWaiting(false)
    }
  }

  async function handleContactSubmit(name, phone, email) {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        phone,
        email,
        conversation: messages,
        unansweredQuestion,
      }),
    })

    setShowContact(false)
    setMessages((prev) => [
      ...prev,
      {
        sender: 'bot',
        text: 'Thanks! We received your details and will get back to you shortly.',
      },
    ])
  }

  return (
    <div
      style={{
        fontFamily: 'var(--font-sans)',
      }}
    >
      <style>
        {`
          *{box-sizing:border-box;}
          html,body{width:100%;height:100%;margin:0;padding:0;}
          #root{width:100%;max-width:none;margin:0;border-inline:0;text-align:left;}
        `}
      </style>

      <div
        style={{
          minHeight: '100vh',
          background: '#f7fafc',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <header
          style={{
            background: '#fff',
            borderBottom: '1px solid #eee',
            padding: '0 24px',
            height: 52,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#000000e6',
          }}
        >
          <button
            type="button"
            onClick={() => navigate(-1)}
            style={{
              background: 'transparent',
              border: 0,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              color: '#004370',
              cursor: 'pointer',
              fontWeight: 800,
              padding: '8px 10px',
              borderRadius: 10,
            }}
            aria-label="Back"
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              aria-hidden="true"
              style={{ display: 'block' }}
            >
              <path
                d="M15 18l-6-6 6-6"
                fill="none"
                stroke="#004370"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div style={{ fontWeight: 600 }}>Cincinnati Hotel</div>

          <div
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
          </div>
        </header>

        <div
          style={{
            flexGrow: 1,
            overflow: 'hidden',
            paddingBottom: 64,
          }}
        >
          <div
            style={{
              maxWidth: 720,
              margin: '0 auto',
              padding: 24,
              paddingTop: 32,
              paddingBottom: 16,
              marginTop: 6,
              marginBottom: 12,
              height: '100%',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              ref={listRef}
              style={{
                flexGrow: 1,
                overflowY: 'auto',
                paddingRight: 4,
                paddingBottom: 8,
              }}
            >
              {messages.map((m, idx) => (
                <ChatBubble
                  key={`${idx}-${m.sender}`}
                  message={m.text}
                  sender={m.sender}
                />
              ))}

              {waiting ? <Loader /> : null}

              {showContact ? (
                <ContactForm onSubmit={handleContactSubmit} />
              ) : null}
            </div>
          </div>
        </div>

        <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0 }}>
          <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 0 18px' }}>
            <div style={{ paddingTop: 6 }}>
              <ChatInput onSend={sendMessage} disabled={waiting} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
