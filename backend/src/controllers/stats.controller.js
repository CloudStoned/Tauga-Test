const { getStats } = require('../services/statsService')

async function getStatsHandler(req, res) {
  try {
    const { totalSessions, topics } = await getStats()

    return res.status(200).json({ totalSessions, topics })
  } catch {
    return res.status(500).json({ error: 'Failed to fetch stats' })
  }
}

module.exports = { getStatsHandler }
