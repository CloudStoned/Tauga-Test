# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository overview
This repo is a small React + Vite single-page application (`tauga-ai/`). It uses `react-router-dom` for three routes (Landing, User chat, Admin dashboard) and calls a backend via `VITE_API_BASE_URL`.

The UI is implemented mostly as inline-styled React components under `src/`:
- `src/pages/*` contains the route-level pages.
- `src/components/*` contains chat/admin UI building blocks.
- `src/services/api.js` is the client-side API wrapper for chat, stats, PDF upload, and contact submission.

## App routes and flow
- `src/App.jsx`: Defines routes:
  - `/` → `src/pages/Landing.jsx`
  - `/user` → `src/pages/UserChat.jsx`
  - `/admin` → `src/pages/AdminDashboard.jsx`

- `src/pages/UserChat.jsx`:
  - Creates a per-tab `sessionId` (uses `crypto.randomUUID()` when available; otherwise falls back to `Date.now()`).
  - Maintains chat state (`messages`) and renders messages via `src/components/chat/ChatBubble.jsx`.
  - Sends chat messages directly to `${VITE_API_BASE_URL}/api/chat` and interprets response fields like `canAnswer` and `reply`.
  - If `canAnswer === false`, it shows `ContactForm` (`src/components/chat/ContactForm.jsx`).
  - Contact submissions are POSTed to `${VITE_API_BASE_URL}/api/contact` with:
    - `name`, `phone`, `email`
    - `conversation` (the message array)
    - `unansweredQuestion` (derived from the most recent user message)

- `src/pages/AdminDashboard.jsx`:
  - Fetches stats from `${VITE_API_BASE_URL}/api/stats`.
  - Renders:
    - `PdfUploader` (`src/components/admin/PdfUploader.jsx`) to upload a PDF
    - `StatsCard` (`src/components/admin/StatsCard.jsx`) for total sessions
    - `TopicChart` (`src/components/admin/TopicChart.jsx`) for per-topic counts

## Backend contract surface (frontend expectations)
All backend calls depend on `import.meta.env.VITE_API_BASE_URL`.

From `src/pages/UserChat.jsx` and `src/services/api.js`, the frontend expects these endpoints:
- `POST {VITE_API_BASE_URL}/api/chat` with JSON `{ sessionId, message }`
  - Response may include:
    - `canAnswer` (boolean)
    - `reply` (string)
- `POST {VITE_API_BASE_URL}/api/contact` with JSON `{ name, phone, email, conversation, unansweredQuestion }`
- `POST {VITE_API_BASE_URL}/api/upload-pdf` with multipart form field `pdf`
- `GET {VITE_API_BASE_URL}/api/stats`
  - Response fields used by the admin UI:
    - `totalSessions`
    - `topics` (object mapping topic → count)
    - `activeFilename`

## Development commands (run from `tauga-ai/`)
Use these npm scripts from the `tauga-ai` directory:
- Install dependencies: `npm install`
- Start dev server (with HMR): `npm run dev`
- Build for production: `npm run build`
- Lint: `npm run lint`
- Preview production build: `npm run preview`

There is no dedicated test script in the package scripts.

## Tooling and configuration
- ESLint config: `tauga-ai/eslint.config.js`
  - Lints `**/*.{js,jsx}` and includes React Hooks + React Refresh rules.
  - Ignores `dist`.
- Vite config: `tauga-ai/vite.config.js`
  - Uses the `@vitejs/plugin-react` plugin.

## Files to look at first when changing behavior
- `tauga-ai/src/App.jsx` (routing)
- `tauga-ai/src/pages/UserChat.jsx` (chat logic + contact fallback)
- `tauga-ai/src/pages/AdminDashboard.jsx` (stats + admin layout)
- `tauga-ai/src/services/api.js` (shared API wrapper)
- `tauga-ai/src/components/**` (UI pieces)

## Environment variables
The app expects at least:
- `VITE_API_BASE_URL` — backend base URL used for all API calls.
