# AI-Powered Documentation Platform

Monorepo for a developer-first documentation platform using NestJS (backend) and Next.js (frontend).

## Getting Started

### Gemini Setup

- The backend now uses Google Gemini via the official `@google/genai` SDK.
- You must set `GEMINI_API_KEY` in your `.env`.
- `OPENAI_API_KEY` will still be accepted as a fallback during transition.

```bash
yarn install
yarn dev:all
```

- Backend: http://localhost:3333
- Frontend: http://localhost:3000

## Structure

- `/packages/backend` — NestJS 10 (Fastify, Prisma, Auth, Upload, Docs, Chat)
- `/packages/frontend` — Next.js 14 (App Router, NextAuth.js, Tailwind)

See `/configs/` for shared lint/formatting/tsconfig.

## Seeding

To seed the development database with a demo user, run:

```bash
yarn workspace backend seed
```

This will create a demo user and project for local testing.  
**Default login credentials:**

- Email: `demo@example.com`
- Password: `password123`

You can now log in with these credentials after starting both backend and frontend (`yarn dev:all`).