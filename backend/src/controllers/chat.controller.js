const { callChatWebhook } = require('../services/n8nService')

// The hotel information PDF text is now handled by n8n.
// We no longer extract PDF text inside this backend.
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

  // n8n is expected to handle/know the latest uploaded PDF context.
  // We pass an empty string to keep the existing webhook contract.
  const result = await callChatWebhook(message, EMPTY_PDF_TEXT)

  // Track session/topic regardless of canAnswer.
  incrementSession(sessionId)
  if (result?.topic) incrementTopic(result.topic)

  return res.status(200).json(result)
}

module.exports = { chat }
