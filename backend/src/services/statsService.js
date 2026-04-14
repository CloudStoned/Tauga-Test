let stats = {
  totalSessions: 0,
  topics: {},
  _sessions: [],
}

function getStats() {
  return {
    totalSessions: stats.totalSessions ?? 0,
    topics: stats.topics ?? {},
  }
}

function incrementSession(sessionId) {
  const sessionsSet = new Set(stats._sessions)

  const id = sessionId || (globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : String(Date.now()))

  const isNew = !sessionsSet.has(id)
  if (isNew) {
    sessionsSet.add(id)
    stats.totalSessions = (stats.totalSessions ?? 0) + 1
  }

  stats._sessions = Array.from(sessionsSet)

  return isNew
}

function incrementTopic(topic) {
  const safeTopic = String(topic ?? '')
  if (!safeTopic.trim()) return

  const current = stats.topics[safeTopic] ?? 0
  stats.topics[safeTopic] = current + 1
}

module.exports = {
  getStats,
  incrementSession,
  incrementTopic,
}
