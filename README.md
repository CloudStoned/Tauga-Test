# Tauga AI — Hotel Chatbot System
**Technical Documentation**

---

## 1. Architecture & Technology Stack

Tauga AI is a three-tier full-stack application: a React frontend, a Node.js/Express backend, and an n8n automation layer.

| Layer | Technology | Role |
|-------|-----------|------|
| Frontend | React + Vite (SPA) | Routes: `/` landing, `/user` chat, `/admin` dashboard |
| Backend | Node.js + Express | API gateway — forwards requests to n8n webhooks |
| Automation | n8n | Handles chat logic, PDF ingestion, and email delivery |

### API Endpoints

| Endpoint | Description |
|----------|-------------|
| `POST /api/chat` | Receives user message, forwards to n8n, returns bot reply |
| `POST /api/upload-pdf` | Accepts PDF bytes, forwards to n8n for knowledge base update |
| `POST /api/contact` | Sends contact form data to n8n for emailing |
| `GET  /api/stats` | Returns in-memory session/topic/unanswered-query stats |

---

## 2. PDF Processing Flow

When the admin uploads a hotel information PDF, it travels through the following steps:

1. Admin opens `/admin` and selects a PDF file.
2. Frontend sends the raw PDF bytes via `POST /api/upload-pdf`.
3. Backend forwards the file to the n8n upload webhook (`N8N_UPLOAD_FILE`).
4. n8n extracts the text, updates the knowledge base, and applies the overwrite policy.
5. All subsequent chat requests use the latest PDF content as context.

> Text parsing, chunking, and storage are handled entirely inside n8n — the backend acts only as a pass-through. Using supabase as the vector database.

---

## 3. Admin Dashboard Design & Data Flow

The `/admin` route provides two capabilities: uploading a new hotel PDF and viewing live chatbot statistics.

### PDF Upload
- Admin selects a file; the frontend sends it to `POST /api/upload-pdf`.
- A success/error response is shown after n8n confirms ingestion.

### Statistics Panel

The backend maintains in-memory counters surfaced via `GET /api/stats`:

| Stat | Description |
|------|-------------|
| `totalSessions` | Number of unique chat sessions started |
| `topics` | Counts per topic label returned by n8n |

> **Note:** Stats are in-memory only and reset when the backend restarts. See Section 5 for persistence options.

---

## 4. Running & Testing

### Local Setup

**Frontend** (from `tauga-ai/`):
```bash
npm install
npm run dev
```

**Backend** (from `backend/`):
```bash
npm install
npm start
```

### Environment Variables

| Variable | Location | Description |
|----------|----------|-------------|
| `VITE_API_BASE_URL` | Frontend | Backend base URL |
| `N8N_CHAT_WEBHOOK_URL` | Backend | n8n chat webhook |
| `N8N_UPLOAD_FILE` | Backend | n8n PDF upload webhook |
| `N8N_CONTACT_WEBHOOK_URL` | Backend | n8n contact/email webhook |
| `FRONTEND_URL` | Backend | Optional CORS allowlist |

### Manual Test Checklist

- [ ] Upload a PDF from `/admin` — confirm success message appears.
- [ ] Send an answerable question from `/user` — confirm bot replies and `totalSessions` increments also `topics` is updated.
- [ ] Send an unanswerable question — confirm the contact form appears.
- [ ] Submit the contact form — verify n8n sends an email to `idan@tauga.ai` and the query is logged in stats.

---

## 5. Extending the System
 
| Improvement | Description |
|-------------|-------------|
| **Add chat memory** | Currently each message is sent to n8n with no conversation history — the bot has no context of previous turns. To fix this, maintain a `messages` array on the frontend (keyed by `sessionId`) and include it in every `POST /api/chat` payload. The backend forwards the full history to n8n, which passes it to the AI model so it can reference earlier messages in the same session. Clear the history when the session ends or the page is refreshed. |
| **Authentication & security** | The `/admin` route and all backend endpoints are currently unprotected. Recommended steps: (1) add login to `/admin` using JWT or session cookies so only authorized staff can upload PDFs or view stats; (2) protect backend endpoints with middleware that validates the token on every request; (3) secure n8n webhooks with a shared secret header (e.g. `X-Webhook-Secret`) so only the backend can trigger them; (4) store all secrets (`N8N_*` URLs, JWT secret) in environment variables and never commit them to source control. |
| Persist stats | Replace in-memory counters with a database (e.g. PostgreSQL, MongoDB) so stats survive restarts. |
| Show unanswered queries in UI | Expose the `unansweredQueries` array in the admin dashboard for review. |
| Tighten contracts | Define and validate a shared schema between frontend, backend, and n8n. |
| PDF versioning | Add DB-backed tracking of uploaded PDFs with timestamps and overwrite history. |