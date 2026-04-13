const axios = require('axios')
require('dotenv').config()

async function callChatWebhook(message, pdfText) {
  try {
    const url = process.env.N8N_CHAT_WEBHOOK_URL

    const res = await axios.post(url, { message, pdfText })
    return res.data
  } catch {
    return {
      answer: "I'm sorry, I don't have that information right now.",
      topic: 'Unknown',
      canAnswer: false,
    }
  }
}

async function callContactWebhook(
  name,
  phone,
  email,
  conversation,
  unansweredQuestion
) {
  const url = process.env.N8N_CONTACT_WEBHOOK_URL

  try {
    const res = await axios.post(url, {
      name,
      phone,
      email,
      conversation,
      unansweredQuestion,
    })

    return res.data
  } catch (err) {
    throw err
  }
}

module.exports = {
  callChatWebhook,
  callContactWebhook,
}
