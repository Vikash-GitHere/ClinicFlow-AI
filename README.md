<<<<<<< HEAD
# ClinicFlow AI
  UW PICO 5.09                               File: README.md                                  

<<<<<<< HEAD
# ClinicFlow AI

AI-powered clinic workflow tool for small clinics and solo doctors. Reduces paperwork and con$

**Not** an EMR, hospital management system, or billing platform.

## Stack

^G Get Help    ^O WriteOut    ^R Read File   ^Y Prev Pg     ^K Cut Text    ^C Cur Pos     
^X Exit        ^J Justify     ^W Where is    ^V Next Pg     ^U UnCut Text  ^T To Spell    
AI-powered clinic workflow tool for small clinics and solo doctors. Reduces paperwork and consultation documentation time.

**Not** an EMR, hospital management system, or billing platform.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Supabase (Auth, PostgreSQL, Realtime, Storage)
- Prisma ORM
- Zustand, React Hook Form, Zod
- OpenAI API
- @react-pdf/renderer

## Getting Started

### 1. Clone and install

```bash
cd clinicflow-ai
npm install
```

### 2. Supabase project

1. Create a project at [supabase.com](https://supabase.com)
2. Copy connection strings from **Settings → Database**
3. Copy API keys from **Settings → API**

### 3. Environment

```bash
cp .env.example .env
```

Fill in `DATABASE_URL`, `DIRECT_URL`, Supabase keys, and `OPENAI_API_KEY`.

### 4. Database

```bash
npm run db:push
```

Then run RLS policies in Supabase SQL Editor:

```bash
# File: supabase/migrations/001_rls_policies.sql
```

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── (app)/          # Authenticated routes (queue, dashboard)
│   ├── (auth)/         # Login, signup
│   ├── api/            # API routes
│   └── intake/         # Public patient intake (Phase 2)
├── components/
│   ├── layout/         # App shell
│   └── ui/             # Design system primitives
├── lib/
│   ├── supabase/       # Auth clients
│   ├── validations/    # Zod schemas
│   ├── auth.ts         # Session helpers
│   └── prisma.ts       # DB client
└── types/              # Shared types
```

## Deployment (Vercel)

1. Push to GitHub
2. Import in Vercel
3. Add environment variables from `.env.example`
4. Run `prisma db push` against production DB (or use migrations)

## Development Phases

| Phase | Scope |
|-------|-------|
| **1** ✅ | Foundation, schema, auth, design system |
| **2** | Patient intake wizard + queue board |
| **3** | Doctor dashboard + consultation notes |
| **4** | AI SOAP note generation |
| **5** | Visit summary PDF |
=======
# ClinicFlow-AI
>>>>>>> 14633581d9279fc7dca675f57ecd1f6766487fe0
