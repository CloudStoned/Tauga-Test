const { callChatWebhook } = require('../services/n8nService')

const EMPTY_PDF_TEXT = ''
const {
  incrementSession,
  incrementTopic,
} = require('../services/statsService')

async function chat(req, res) {
  const { sessionId, message } = req.body || {}

  if (!sessionId || !message) {
    return res.status(400).json({ error: 'sessionId and message required' })
  }

  const result = await callChatWebhook(message, EMPTY_PDF_TEXT)

  incrementSession(sessionId)
  if (result?.output?.topic) incrementTopic(result.output.topic)

  return res.status(200).json(result)
}

module.exports = { chat }
