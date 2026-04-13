const { extractPdfText } = require('../services/pdfService')
const { callChatWebhook } = require('../services/n8nService')
const {
  incrementSession,
  incrementTopic,
} = require('../services/statsService')

async function chat(req, res) {
  const { sessionId, message } = req.body || {}

  if (!sessionId || !message) {
    return res.status(400).json({ error: 'sessionId and message required' })
  }

  const pdfText = await extractPdfText()

  if (pdfText == null) {
    return res
      .status(503)
      .json({ error: 'No hotel information PDF uploaded yet' })
  }

  const result = await callChatWebhook(message, pdfText)

  const { answer, topic, canAnswer } = result || {}

  // Track session/topic regardless of canAnswer.
  incrementSession(sessionId)
  if (topic) incrementTopic(topic)

  return res.status(200).json({ answer, topic, canAnswer })
}

module.exports = { chat }
