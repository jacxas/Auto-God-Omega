# AGENTS.md

## Project Overview
Auto-God Omega — a React + Vite + Express dashboard for autonomous AI orchestration. Uses Google Gemini API (`@google/genai`) for chat, image generation, video generation, and music generation.

## Architecture
- **Single server** (`server.ts`): Express app that serves API routes (`/api/gemini/*`) and Vite middleware in dev mode. Runs via `tsx server.ts`.
- **Frontend**: React 19 + Tailwind CSS v4, entry at `src/main.tsx`.
- **No database** — all state is in-memory/React state with seed data from `src/data/initialData.ts`.

## Setup
- No lockfile — `npm install` (not frozen).
- `GEMINI_API_KEY` is required for AI features but the server boots without it (initializes with empty string).
- Dev command: `npx tsx server.ts` (starts Express + Vite middleware on port 3000).

## Verification
- App is live when `curl localhost:3000` returns HTML with `<div id="root">`.
- AI endpoints (`/api/gemini/chat`, `/api/gemini/image`, etc.) return 500 without a valid `GEMINI_API_KEY`.
- Frontend renders the dashboard UI without any API keys.
