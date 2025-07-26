# AI-Powered Documentation Platform

Monorepo for a developer-first documentation platform using NestJS (backend) and Next.js (frontend).

## Getting Started

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