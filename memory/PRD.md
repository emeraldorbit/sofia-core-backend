# Admin Auth System PRD

## Original Problem Statement
User's deploy-emerald app showed low credits warning. Additionally, the authentication system (login, signup, admin dashboard) was missing/reset.

## What Was Built (Jan 22, 2026)

### Authentication System
- **JWT-based custom auth** (email/password registration & login)
- **Emergent-managed Google OAuth** social login
- Session management with httpOnly cookies (7-day expiry)
- Password hashing with bcrypt

### Pages Implemented
1. **Login Page** (`/login`) - Email/password + Google OAuth
2. **Signup Page** (`/signup`) - Registration with password confirmation
3. **Admin Dashboard** (`/dashboard`) with 3 tabs:
   - Dashboard Overview - Stats (total users, active sessions, auth type breakdown)
   - User Management - Admin-only user list
   - Admin Settings - Account information

### Backend Endpoints
- `POST /api/auth/register` - Email registration
- `POST /api/auth/login` - Email login
- `POST /api/auth/google-session` - Google OAuth callback
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Clear session
- `GET /api/admin/users` - List users (admin only)
- `GET /api/admin/stats` - Dashboard statistics

## Tech Stack
- Frontend: React with Tailwind CSS (Dark theme)
- Backend: FastAPI with MongoDB
- Auth: JWT sessions + Google OAuth via Emergent Auth

## Test Credentials
- Email: demo@test.com / Password: demo123
- Email: admin@test.com / Password: admin123 (admin role)

## Next Tasks / Backlog
- P1: Light theme toggle (user requested both)
- P2: Individual hub/page settings
- Sofia Persona settings (DO NOT TOUCH without permission)

## Files Modified
- `/app/backend/server.py` - Auth routes added
- `/app/frontend/src/App.js` - Routes configured
- `/app/frontend/src/pages/Login.js` - New
- `/app/frontend/src/pages/Signup.js` - New
- `/app/frontend/src/pages/Dashboard.js` - New
- `/app/frontend/src/components/AuthCallback.js` - New
