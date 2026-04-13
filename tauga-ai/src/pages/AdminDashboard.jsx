import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PdfUploader from '../components/admin/PdfUploader.jsx'
import StatsCard from '../components/admin/StatsCard.jsx'
import TopicChart from '../components/admin/TopicChart.jsx'

function Loader() {
  return (
    <div
      style={{
        padding: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#666',
        fontWeight: 700,
      }}
    >
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
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
      </div>

      <style>
        {`@keyframes dotPulse{0%,80%,100%{transform:translateY(0);opacity:.45}40%{transform:translateY(-4px);opacity:1}}`}
      </style>
    </div>
  )
}

export default function AdminDashboard() {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [totalSessions, setTotalSessions] = useState(0)
  const [topics, setTopics] = useState({})
  const [activeFilename, setActiveFilename] = useState('')

  async function fetchStats() {
    setLoading(true)
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/stats`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      )

      const data = await res.json()

      setTotalSessions(data?.totalSessions ?? 0)
      setTopics(data?.topics ?? {})
      setActiveFilename(data?.activeFilename ?? '')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return (
    <div
      style={{
        fontFamily: 'var(--font-sans)',
        background: 'transparent',
        minHeight: '100vh',
        margin: 0,
      }}
    >
      <header
        style={{
          background: 'var(--card-strong)',
          borderBottom: '1px solid var(--border)',
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: 'var(--text)',
          fontWeight: 900,
        }}
      >
        <div>Cincinnati Hotel — Admin Dashboard</div>

        <button
          type="button"
          onClick={() => navigate('/')}
          style={{
            background: 'transparent',
            border: 0,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            color: 'var(--text)',
            cursor: 'pointer',
            fontWeight: 700,
            padding: '8px 10px',
            borderRadius: 10,
          }}
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
          Exit
        </button>
      </header>

      <div
        style={{
          maxWidth: 960,
          margin: '0 auto',
          padding: 32,
        }}
      >
        {loading ? (
          <Loader />
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '40% 60%',
              gap: 24,
              alignItems: 'start',
            }}
          >
            <div>
              <PdfUploader activeFilename={activeFilename} />
            </div>

            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginBottom: 16,
                }}
              >
                <button
                  type="button"
                  onClick={fetchStats}
                  style={{
                    background: 'var(--card-strong)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                    padding: '10px 14px',
                    borderRadius: 12,
                    cursor: 'pointer',
                    fontWeight: 800,
                  }}
                >
                  Refresh Stats
                </button>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
                  gap: 16,
                  marginBottom: 16,
                }}
              >
                <StatsCard label="Total Sessions" value={totalSessions} />
              </div>

              <TopicChart topics={topics} />
            </div>

            <style>
              {`
                @media (max-width: 900px){
                  div[style*="gridTemplateColumns"]{grid-template-columns:1fr !important;}
                }
              `}
            </style>
          </div>
        )}
      </div>
    </div>
  )
}
