import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function TopicChart({ topics }) {
  const entries = topics ? Object.entries(topics) : []

  const data = entries.map(([topic, count]) => ({
    topic,
    count: Number(count) || 0,
  }))

  return (
    <div
      style={{
        fontFamily: 'var(--font-sans)',
        background: 'var(--card-strong)',
        padding: 24,
        borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow-sm)',
        border: '1px solid var(--border)',
      }}
    >
      <div style={{ color: 'var(--text)', fontWeight: 600, marginBottom: 12 }}>
        Questions by Topic
      </div>

      {!data.length ? (
        <div
          style={{
            height: 300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#666',
            fontWeight: 600,
          }}
        >
          No data yet
        </div>
      ) : (
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
              <XAxis
                dataKey="topic"
                tick={{ fill: 'var(--muted)', fontSize: 12 }}
                interval={0}
                axisLine={{ stroke: 'var(--border)' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: 'var(--text)', fontSize: 12 }}
                axisLine={{ stroke: 'var(--border)' }}
                tickLine={false}
                width={40}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  background: 'var(--card-strong)',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  boxShadow:
                    '0 1px 2px rgba(0,0,0,.06), 0 10px 30px rgba(0,0,0,.03)',
                }}
                labelStyle={{ color: 'var(--muted)', fontWeight: 700 }}
                formatter={(value) => [value, 'Questions']}
              />
              <Bar dataKey="count" fill="rgba(47, 91, 255, 0.85)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
