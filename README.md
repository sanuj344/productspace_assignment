# TaskFlow — Mini SaaS Task Manager

A full-stack, production-ready task management application built with **Node.js + Express + PostgreSQL** on the backend and **React + Vite + Tailwind CSS** on the frontend.

---

## ✨ Features

| Feature | Details |
|---|---|
| 🔐 Authentication | JWT-based signup / login with bcrypt password hashing |
| ✅ Task CRUD | Create, read, update, delete tasks |
| 🔄 Toggle Status | Instant Pending ↔ Completed toggle |
| 🔍 Filter & Search | Filter by status, priority, or free-text search |
| 👤 Multi-user | Each user sees only their own tasks |
| 💬 Toast Notifications | Success / error feedback on every action |
| 🌐 Empty States | Friendly prompts when no tasks exist |
| 🛡️ Protected Routes | Frontend guards, auto logout on 401 |

---

## 📁 Project Structure

```
productspace_assignment/
├── backend/
│   ├── config/         # Sequelize DB config
│   ├── controllers/    # Route handlers
│   ├── middleware/     # Auth, validation, error handler
│   ├── models/         # Sequelize models (User, Task)
│   ├── routes/         # Express routers
│   ├── utils/          # AppError, catchAsync
│   ├── validations/    # express-validator chains
│   ├── app.js          # Express app setup
│   ├── server.js       # Entry point
│   └── .env            # Environment variables
│
└── frontend/
    └── src/
        ├── components/ # Navbar, TaskCard, AddTaskModal, etc.
        ├── context/    # AuthContext
        ├── hooks/      # useTasks
        ├── pages/      # Login, Signup, Dashboard
        ├── services/   # Axios API service files
        ├── App.jsx
        └── main.jsx
```

---

## 🚀 Quick Start

### 1. Prerequisites

- **Node.js** v18+
- **PostgreSQL** (running locally or via Docker)

---

### 2. Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE taskmanager;
```

---

### 3. Backend Setup

```bash
cd backend

# Copy and edit env variables
cp .env.example .env
# → Set DB_PASSWORD and JWT_SECRET

# Install dependencies
npm install

# Start dev server (auto-syncs DB tables on first run)
npm run dev
```

Backend runs at: **http://localhost:5000**

---

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

Frontend runs at: **http://localhost:5173**

---

## 🔑 Environment Variables (`backend/.env`)

| Variable | Description |
|---|---|
| `PORT` | Express server port (default 5000) |
| `DB_HOST` | PostgreSQL host |
| `DB_PORT` | PostgreSQL port (default 5432) |
| `DB_NAME` | Database name (`taskmanager`) |
| `DB_USER` | Database username |
| `DB_PASSWORD` | Database password |
| `JWT_SECRET` | Long random secret for JWT signing |
| `JWT_EXPIRES_IN` | Token expiry (e.g. `7d`) |
| `FRONTEND_URL` | Allowed CORS origin (e.g. `http://localhost:5173`) |

---

## 📡 API Reference

### Auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/signup` | ❌ | Register new user |
| POST | `/api/auth/login` | ❌ | Login, returns JWT |
| GET | `/api/auth/me` | ✅ | Get current user |

### Tasks

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/tasks` | ✅ | Get all user tasks (supports `?status=&priority=&search=`) |
| POST | `/api/tasks` | ✅ | Create a task |
| PATCH | `/api/tasks/:id` | ✅ | Update task fields |
| PATCH | `/api/tasks/:id/toggle` | ✅ | Toggle Pending ↔ Completed |
| DELETE | `/api/tasks/:id` | ✅ | Delete a task |

---

## 🛠️ Tech Stack

**Backend**: Node.js · Express · PostgreSQL · Sequelize · bcryptjs · jsonwebtoken · express-validator

**Frontend**: React 18 · Vite · Tailwind CSS v4 · Axios · React Router v6 · React Hot Toast · Lucide Icons
