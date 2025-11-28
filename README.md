# Frenzy

Frenzy is a full-stack language exchange platform where learners can discover new study partners, exchange friend requests, chat in real-time, and jump into video calls—all powered by Stream's chat and video APIs. The project ships with an Express/MongoDB backend and a Vite/React frontend styled with Tailwind + DaisyUI.

## Features

- Authentication & onboarding workflow with JWT cookies, profile photos, and learner metadata (bio, languages, location).
- Smart friend recommendations plus incoming/outgoing friend-request flows backed by MongoDB relations.
- Stream Chat messaging with persistent 1:1 channels, typing indicators, rich message lists, and inline video-call invitations.
- Stream Video calls embedded in-app, including call controls, speaker layout, and auto-created rooms per friend pair.
- Theme-aware UI with responsive layout, sidebar navigation, loaders, and toast notifications.
- Production-ready build pipeline that statically serves the frontend from the backend when `NODE_ENV=production`.

## Tech Stack

- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Stream Chat server SDK.
- **Frontend:** React 19, Vite, Stream Chat React, Stream Video React SDK, React Router, React Query, Zustand, Tailwind CSS, DaisyUI.
- **Tooling:** Vite dev server, Nodemon for backend dev, ESLint, PostCSS.

## Project Structure

```
.
├── backend
│   ├── src
│   │   ├── controller      # Auth, users, chat controllers
│   │   ├── lib             # DB + Stream helpers
│   │   ├── middleware      # Auth guard
│   │   ├── model           # User + FriendRequest schemas
│   │   └── routes          # /api/auth, /api/users, /api/chat
│   └── package.json
├── frontend
│   ├── src
│   │   ├── components      # Layout, loaders, friend cards, etc.
│   │   ├── hooks           # Auth + auth mutation hooks
│   │   ├── lib             # Axios client + API helpers
│   │   └── pages           # Home, Chat, Call, Notifications, Onboarding
│   └── package.json
└── package.json            # Workspace-level scripts
```

## Prerequisites

- Node.js 18+ and npm 9+.
- A MongoDB connection string.
- Stream Chat & Stream Video credentials (same API key/secret pair).

## Environment Variables

Create `.env` files in the backend and frontend directories.

`backend/.env`

```
PORT=5008
MONGO_URL=mongodb+srv://...
SECRET_KEY=super-secure-jwt-secret
STREAM_API_KEY=your_stream_key              # same as used on the client
STREAM_SECRET_KEY=your_stream_secret        # server-side only
NODE_ENV=development
```

`frontend/.env`

```
VITE_STREAM_API_KEY=your_stream_key
```

> In development the frontend expects the backend at `http://localhost:5008`. Update `frontend/src/lib/axios.js` if you need a different origin or proxy.

## Getting Started

Install dependencies for both apps:

```
npm install --prefix backend
npm install --prefix frontend
```

### Run in development

Start the API (Express + Mongo + Stream server helpers):

```
npm run dev --prefix backend
```

Start the client (Vite dev server with HMR on port 5173):

```
npm run dev --prefix frontend
```

The backend enables CORS for `http://localhost:5173` and issues httpOnly `jwt` cookies that power authenticated routes.

### Production build

From the repository root you can build the frontend and serve it via Express:

```
npm run build
```

That script installs dependencies (if needed) and runs `vite build` inside `frontend`. After the build, deploy by running:

```
npm run start
```

Express will serve the compiled assets from `frontend/dist` while keeping the API routes available under `/api`.

## API Overview

- `POST /api/auth/signup` – create a new user, seed Stream profile, auto-login.
- `POST /api/auth/login` / `POST /api/auth/logout`
- `POST /api/auth/onboard` – store profile details, mark user as onboarded.
- `GET /api/users/recommended` – discover new learners to connect with.
- `GET /api/users/friends` – list accepted friends.
- `POST /api/users/friends/:id` – send friend request.
- `PUT /api/users/friends/:requestId/accept` – accept a pending request.
- `GET /api/users/friend-requests` – incoming/outgoing request dashboards.
- `GET /api/chat/token` – server-generated Stream access token used by both chat and video clients.

All non-auth routes are protected with `protectRoute`, which reads the `jwt` cookie, verifies the token, and loads the user document for downstream handlers.

## Frontend Highlights

- **Routing guard:** `App.jsx` keeps public pages (`/login`, `/signup`) separate from private routes and enforces onboarding completion before unlocking the app.
- **State/query:** React Query caches friends, recommendations, and friend-requests; Zustand stores theme preferences.
- **Chat:** `ChatPage` initializes a deterministic Stream channel per friend pair (`userA-userB`) and renders Stream's `Channel`, `MessageList`, and `MessageInput` components.
- **Video:** `CallPage` uses the Stream Video SDK to join or create a call room that matches the current channel ID.
- **UX:** DaisyUI themes, loader skeletons, toast feedback, and responsive grid layouts for friend cards.

## Useful Commands

- `npm run dev --prefix backend` – Express server with Nodemon.
- `npm run dev --prefix frontend` – Vite dev server.
- `npm run build` – Install deps (both apps) + build frontend.
- `npm run start` – Run backend in production mode (serves frontend build).
- `npm run lint --prefix frontend` – Lint the React app.

## Troubleshooting

- **Stream errors:** ensure both `STREAM_API_KEY` and `STREAM_SECRET_KEY` are present on the backend, and that the frontend uses the same public key via `VITE_STREAM_API_KEY`.
- **Invalid JWT / 401:** delete your browser cookies, re-login, and make sure the backend `SECRET_KEY` matches the token issuer.
- **CORS issues:** adjust the `origin` value inside `backend/src/server.js` if you serve the frontend from a different host/port in development.

## License

This project inherits the license declared in `package.json` (ISC). Feel free to adapt it for your own learning or production deployments.
