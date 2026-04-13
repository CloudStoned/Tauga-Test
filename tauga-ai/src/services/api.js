import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL })

export async function sendMessage(sessionId, message) {
  const res = await api.post('/api/chat', { sessionId, message })
  return res.data
}

export async function uploadPdf(file) {
  const formData = new FormData()
  formData.append('pdf', file)

  const res = await api.post('/api/upload-pdf', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  return res.data
}

export async function getStats() {
  const res = await api.get('/api/stats')
  return res.data
}

export async function submitContact(
  name,
  phone,
  email,
  conversation,
  unansweredQuestion
) {
  const res = await api.post('/api/contact', {
    name,
    phone,
    email,
    conversation,
    unansweredQuestion,
  })

  return res.data
}
