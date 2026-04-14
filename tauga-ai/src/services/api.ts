const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

type RequestOptions = RequestInit

export interface Message {
  sender: 'user' | 'bot'
  text: string
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, options)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data?.message ?? 'Request failed')
  }

  return data as T
}

export async function sendMessage(sessionId: string, message: string) {
  return request('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, message }),
  })
}

export async function uploadPdf(file: File) {
  const formData = new FormData()
  formData.append('pdf', file)

  return request('/api/upload-pdf', {
    method: 'POST',
    body: formData,
  })
}

export async function getStats() {
  return request('/api/stats')
}

export async function submitContact(
  name: string,
  phone: string,
  email: string,
  conversation: Message[],
  unansweredQuestion: string,
) {
  return request('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      phone,
      email,
      conversation,
      unansweredQuestion,
    }),
  })
}
