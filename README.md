# Task Manager — Frontend

React single-page application for the Task Management System. Connects to the [Backend API](../Backend/README.md) for authentication and task CRUD.

---

## Features

- **Register** and **login** with JWT stored in `localStorage`
- **Protected dashboard** — requires valid token
- **Task management** — create, edit, delete, mark complete
- **Filters** — by status and priority
- **Admin panel** — list users/tasks, delete users (Admin role only)
- **Toasts** for success and error messages from the API
- **Axios interceptors** — attach token; redirect to login on 401
- Responsive UI with **Tailwind CSS**

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 19 | UI library |
| Vite 6 | Dev server and build tool |
| React Router 7 | Client-side routing |
| Axios | HTTP client |
| Context API | Auth state |
| react-hot-toast | Notifications |
| Tailwind CSS 3 | Styling |

---

## Project Structure

```
Frontend/
├── src/
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── DashboardPage.jsx
│   │   └── AdminPage.jsx
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── TaskForm.jsx
│   │   ├── TaskList.jsx
│   │   └── LoadingSpinner.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── routes/
│   │   └── ProtectedRoute.jsx
│   ├── services/
│   │   └── api.js           # Axios instance + interceptors
│   ├── hooks/
│   │   └── useAuth.js
│   ├── utils/
│   │   └── constants.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## Prerequisites

- **Node.js** 18+
- **npm**
- Backend API running (default: http://localhost:5000)

Start the API first — see [Backend README](../Backend/README.md).

---

## Quick Start

### 1. Install dependencies

```bash
cd Frontend
npm install
```

### 2. Environment variables

```bash
cp .env.example .env
```

Default `.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

If the API runs on a different host or port, update this value and restart the dev server.

### 3. Start development server

```bash
npm run dev
```

Open **http://localhost:5173**

### 4. Log in

Use the seeded admin account (after backend seed):

| Email | Password |
|-------|----------|
| admin@taskmanager.com | Password123! |

Or register a new user from the **Register** page.

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_BASE_URL` | Yes | Backend API base URL including `/api/v1` |

Example for production:

```env
VITE_API_BASE_URL=https://your-api.onrender.com/api/v1
```

Variables must be prefixed with `VITE_` to be exposed to the client.

---

## NPM Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server (port 5173) |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build locally |

---

## Routes

| Path | Access | Page |
|------|--------|------|
| `/login` | Public | Sign in |
| `/register` | Public | Create account |
| `/dashboard` | Authenticated | Tasks and stats |
| `/admin` | Admin only | Users and all tasks |
| `*` | — | Redirects to `/dashboard` |

Unauthenticated users hitting `/dashboard` or `/admin` are redirected to `/login`.

---

## How Authentication Works

1. **Login** — `POST /auth/login` returns `token` and `user`.
2. **Storage** — `token` and `user` saved to `localStorage`.
3. **Requests** — Axios request interceptor adds `Authorization: Bearer <token>`.
4. **401 responses** — Token and user cleared; redirect to `/login`.
5. **Logout** — Clears storage and navigates to login.

After switching databases (e.g. local → Supabase), **log out and log in again** so the JWT matches a real user in the new database.

---

## Pages Overview

### Dashboard (`/dashboard`)

- User info and task counts
- Create task form
- Task list with edit, delete, mark complete
- Filter by status and priority

### Admin (`/admin`)

Visible in navbar only when `user.role === 'Admin'`.

- Table of all users with delete action
- List of all tasks across users

---

## API Integration

All requests go through `src/services/api.js`:

```javascript
import api from '../services/api';

// Example
const { data } = await api.get('/tasks');
const tasks = data.data;
```

Errors are parsed with `getErrorMessage(error)` for user-friendly toasts.

---

## Build for Production

```bash
npm run build
```

Output is in `dist/`. Deploy to Vercel, Netlify, or any static host.

Set `VITE_API_BASE_URL` to your deployed API URL at build time.

Ensure the backend **CORS** config allows your frontend origin (currently `http://localhost:5173`).

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Network error / CORS | Start backend; check `VITE_API_BASE_URL` |
| 401 on every request | Log out and log in again |
| Empty task list after login | Normal for new users; create a task |
| 500 on create task | Backend DB not migrated or stale JWT — re-login |
| Admin link missing | Log in as Admin (`admin@taskmanager.com`) |

---

## Default Test Flow

1. Start backend (`npm run dev` in `Backend/`)
2. Start frontend (`npm run dev` in `Frontend/`)
3. Open http://localhost:5173
4. Login as admin → see seeded tasks
5. Create, edit, complete, and delete a task
6. Open **Admin** → view users and all tasks
7. Register a second user in another browser/incognito → verify task isolation

---

## Related

- [Backend README](../Backend/README.md) — API setup, endpoints, Swagger
- [Root README](../README.md) — Full-stack overview
