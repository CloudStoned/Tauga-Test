const { callContactWebhook } = require('../services/n8nService')

async function submitContact(req, res) {
  const {
    name,
    phone,
    email,
    conversation,
    unansweredQuestion,
  } = req.body || {}

  if (!name || !phone || !email || !conversation || !unansweredQuestion) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    await callContactWebhook(
      name,
      phone,
      email,
      conversation,
      unansweredQuestion
    )

    return res
      .status(200)
      .json({ message: 'Contact submitted successfully' })
  } catch {
    return res.status(500).json({ error: 'Failed to submit contact' })
  }
}

module.exports = { submitContact }
