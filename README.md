# AI Calling CRM

> A production-grade, multi-tenant SaaS platform for AI-assisted recruitment calling, candidate management, and analytics.

---

## 🚀 Features

- **Multi-Tenant Architecture** — Complete data isolation per company
- **RBAC** — Super Admin, Company Admin, Recruiter, Agent roles
- **CRM Modules** — Candidates, Clients, Leads, Campaigns
- **AI Calling Simulator** — Demo mode with simulated call states, timer, disposition
- **AI Pipeline** — Speech-to-Text → LLM Analysis → Sentiment/Intent/Summary
- **Candidate Matching** — AI job-to-candidate scoring engine
- **Analytics Dashboard** — Recharts-powered metrics and trend charts
- **Real-Time** — Socket.IO for live call status and agent events
- **Subscription System** — FREE/STARTER/PRO/ENTERPRISE plans
- **JWT Authentication** — Access + Refresh tokens with HTTP-only cookies

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, TypeScript, Tailwind CSS |
| State | Zustand, TanStack Query |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL, Prisma ORM |
| Auth | JWT (Access + Refresh Token) |
| Real-time | Socket.IO |
| AI (Simulated) | Custom abstraction layer (Whisper/Ollama-ready) |
| DevOps | Docker, Docker Compose, Nginx |

---

## 📁 Project Structure

```
recrubweb__platform/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma        # Complete database schema
│   │   └── seed.ts              # Seed roles, plans, demo user
│   ├── src/
│   │   ├── ai/                  # STT + LLM abstraction layer
│   │   ├── calling/             # Telephony adapter (Simulator + Interface)
│   │   ├── controllers/
│   │   ├── middleware/          # auth, role, tenant middlewares
│   │   ├── routes/
│   │   ├── services/
│   │   ├── sockets/             # Socket.IO handler
│   │   └── server.ts
│   ├── Dockerfile
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── features/
│   │   │   ├── auth/            # Login, Register
│   │   │   ├── analytics/       # Dashboard with Recharts
│   │   │   ├── crm/             # Candidates, Clients
│   │   │   ├── campaigns/       # Campaign cards
│   │   │   ├── calls/           # Call Simulator Modal
│   │   │   └── team/            # Team Management
│   │   ├── hooks/               # useSocket.ts
│   │   ├── layouts/             # DashboardLayout
│   │   ├── services/            # Axios API client
│   │   ├── store/               # Zustand stores
│   │   └── App.tsx
│   ├── Dockerfile
│   └── nginx.conf
├── docker-compose.yml           # Full production stack
└── README.md
```

---

## ⚡ Quick Start (Local Development)

### Prerequisites
- [Node.js v20+](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### 1. Start Infrastructure
```bash
docker-compose up postgres redis -d
```

### 2. Backend Setup
```bash
cd backend
cp .env.example .env
npm install
npx prisma migrate dev --name init
npm run prisma:seed
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 4. Open App
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:5000](http://localhost:5000)
- Health Check: [http://localhost:5000/health](http://localhost:5000/health)

---

## 🔑 Demo Credentials
After seeding the database:
```
Email:    admin@demo.aicrm.io
Password: Admin@123
```

---

## 🏗 Architecture

```
Browser
  └── React SPA (Vite)
        └── Axios API Client → JWT Bearer Token
        └── Socket.IO Client → Tenant Room

Backend (Express)
  ├── authMiddleware → tenantMiddleware → roleMiddleware
  ├── Controllers → Services → Prisma → PostgreSQL
  ├── Socket.IO Server → Tenant Rooms
  ├── Calling Layer
  │     ├── ICallingAdapter (interface)
  │     └── SimulatorCallingAdapter (demo)
  └── AI Layer
        ├── ISpeechToTextService (interface)
        ├── SimulatorSpeechToTextService (demo)
        ├── ILLMService (interface)
        └── SimulatorLLMService (demo)
```

---

## 🔒 Security
- JWT Access Tokens (15min) + Refresh Tokens (7d) in HTTP-only cookies
- bcrypt password hashing
- Tenant isolation enforced in every query
- Helmet.js security headers
- CORS configured per environment
- Zod input validation on all routes

---

## 🤖 AI Integration (Production)

The AI layer is built with adapters — swap simulators for real models:

| Component | Production Option |
|---|---|
| Speech-to-Text | OpenAI Whisper (local) / AssemblyAI |
| LLM Analysis | Ollama (Llama3) / LM Studio |
| Embeddings | sentence-transformers |
| Vector Search | pgvector extension |

---

## 🚀 Production Deployment

```bash
docker-compose up --build -d
```

All services start in order: PostgreSQL → Redis → Backend → Frontend (Nginx)

---

## 📋 API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | /api/auth/register | Public | Register company + admin |
| POST | /api/auth/login | Public | Login |
| GET | /api/auth/me | JWT | Current user |
| GET | /api/candidates | JWT | List candidates |
| POST | /api/candidates | JWT | Create candidate |
| GET | /api/campaigns | JWT | List campaigns |
| POST | /api/calls/initiate | JWT | Start a call |
| POST | /api/calls/:id/end | JWT | End a call |
| POST | /api/ai/analyze-call/:id | JWT | AI analysis |
| POST | /api/ai/match-candidate | JWT | Candidate matching |
| GET | /api/analytics/dashboard | JWT | Dashboard metrics |

---

## 🗺 Roadmap

- [ ] Real WebRTC/SIP integration via Asterisk adapter
- [ ] Whisper local model for real transcription
- [ ] Ollama (Llama3) for local LLM analysis
- [ ] Email notification system (SendGrid/Nodemailer)
- [ ] Interview scheduling with calendar integration
- [ ] Advanced candidate filtering and bulk import (CSV)
- [ ] Payment integration (Stripe) for subscription billing
- [ ] Mobile-responsive PWA
- [ ] Kubernetes deployment manifests

---

## 📄 License
MIT
