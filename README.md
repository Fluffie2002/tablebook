# TableBook

TableBook is a portfolio-grade restaurant reservation platform localized for Malaysia, built with Next.js 15, NestJS, Prisma, PostgreSQL, and AWS-ready infrastructure patterns.

## Apps

- `frontend/`: Next.js App Router, TypeScript, Tailwind CSS, shadcn-style UI primitives, TanStack Query, React Hook Form, Zod, Recharts.
- `backend/`: NestJS, Prisma ORM, PostgreSQL, JWT auth, role guards, dashboard analytics, S3 presigned uploads.

## Demo Accounts

After seeding:

- Admin: `admin@tablebook.dev` / `TableBook123!` (Farid Ibrahim)
- Guest: `guest@tablebook.dev` / `TableBook123!` (Siti Aminah)

## Local Setup

Start PostgreSQL with Docker (recommended):

```bash
# Docker Desktop must be running first
docker compose up -d
```

The default `.env` uses port `5434` for the Docker PostgreSQL container.

If you already have PostgreSQL 17 installed locally, update `backend/.env` instead:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/tablebook?schema=public"
```

Then create the database once:

```bash
psql -U postgres -h localhost -c "CREATE DATABASE tablebook;"
```

```bash
cd backend
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run start:dev
```

```bash
cd frontend
cp .env.example .env.local
npm run dev
```

## Deployment Notes

- Run PostgreSQL on AWS RDS and set `DATABASE_URL` in the backend environment.
- Deploy the NestJS API on AWS EC2 behind HTTPS and set `FRONTEND_URL` for CORS.
- Use AWS S3 for restaurant image uploads through `POST /api/admin/uploads/presign`.
- Run `npm run prisma:migrate` during release setup and `npm run start:prod` for the compiled API.
