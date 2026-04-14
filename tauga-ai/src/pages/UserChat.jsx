import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ChatBubble from '../components/chat/ChatBubble.jsx'
import ChatInput from '../components/chat/ChatInput.jsx'
import ContactForm from '../components/chat/ContactForm.jsx'
import Navbar from '../components/shared/Navbar.jsx'
import { sendMessage } from '../services/api.js'

async function sendMessageViaApi(sessionId, message) {
  const data = await sendMessage(sessionId, message)
  return data
}

async function sendMessageHandler({ sessionId, setWaiting, setShowContact, setMessages, message }) {
  setWaiting(true)
  setShowContact(false)

  const userMessage = { sender: 'user', text: message }
  setMessages((prev) => [...prev, userMessage])

  try {
    const data = await sendMessageViaApi(sessionId, message)

    if(data.output?.offer_contact_form) {
      setShowContact(true)
      return
    }

    const botText = data.output?.message
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
    await sendMessageHandler({
      sessionId,
      setWaiting,
      setShowContact,
      setMessages,
      message,
    })
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
        <div style={{ position: 'sticky', top: 0, zIndex: 50 }}>
          <Navbar mode="user" showBack={false} />

          <button
            type="button"
            onClick={() => navigate(-1)}
            style={{
              position: 'absolute',
              top: 8,
              left: 10,
              background: 'transparent',
              border: 0,
              width: 40,
              height: 40,
              borderRadius: 12,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#004370',
              cursor: 'pointer',
            }}
            aria-label="Back"
          >
            ←
          </button>
        </div>

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
