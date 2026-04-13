const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const statsPath = path.join(__dirname, '..', 'data', 'stats.json')

const DEFAULT_STATS = {
  totalSessions: 0,
  topics: {},
}

function readStats() {
  try {
    if (!fs.existsSync(statsPath)) return { ...DEFAULT_STATS }
    const raw = fs.readFileSync(statsPath, 'utf8')
    if (!raw) return { ...DEFAULT_STATS }
    const parsed = JSON.parse(raw)
    return {
      totalSessions: parsed.totalSessions ?? 0,
      topics: parsed.topics ?? {},
      // sessions are tracked separately below
      _sessions: Array.isArray(parsed._sessions) ? parsed._sessions : [],
    }
  } catch {
    return { ...DEFAULT_STATS, _sessions: [] }
  }
}

function writeStats(stats) {
  const payload = {
    totalSessions: stats.totalSessions ?? 0,
    topics: stats.topics ?? {},
    _sessions: Array.isArray(stats._sessions) ? stats._sessions : [],
  }
  fs.writeFileSync(statsPath, JSON.stringify(payload, null, 2), 'utf8')
}

function getStats() {
  const stats = readStats()
  return {
    totalSessions: stats.totalSessions ?? 0,
    topics: stats.topics ?? {},
  }
}

function incrementSession(sessionId) {
  const stats = readStats()
  const sessionsSet = new Set(stats._sessions)

  const id = sessionId || uuidv4()

  const isNew = !sessionsSet.has(id)
  if (isNew) {
    sessionsSet.add(id)
    stats.totalSessions = (stats.totalSessions ?? 0) + 1
  }

  stats._sessions = Array.from(sessionsSet)
  writeStats(stats)

  return isNew
}

function incrementTopic(topic) {
  const stats = readStats()

  const safeTopic = String(topic ?? '')
  if (!safeTopic.trim()) return

  const current = stats.topics[safeTopic] ?? 0
  stats.topics[safeTopic] = current + 1

  writeStats(stats)
}

module.exports = {
  getStats,
  incrementSession,
  incrementTopic,
}
