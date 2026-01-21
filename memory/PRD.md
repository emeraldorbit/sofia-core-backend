# EmeraldOrbit - Product Requirements Document

## Project Overview
EmeraldOrbit is a comprehensive enterprise platform combining AI assistance (Sofia), real estate management, crypto trading, communications, and creative tools in one unified experience.

## Tech Stack
- **Backend**: FastAPI + MongoDB (primary) + Supabase (hybrid, for future features)
- **Frontend**: React 18 + Tailwind CSS + Framer Motion + shadcn/ui components
- **State Management**: @tanstack/react-query
- **Authentication**: JWT-based custom auth

## Core Features

### Phase 1 - Core Infrastructure ✅ (Completed Jan 21, 2026)
1. **Authentication System**
   - User registration with email/password
   - JWT token-based login
   - Session persistence

2. **Landing Page**
   - Hero section with feature highlights
   - Feature grid showcase
   - CTA sections

3. **Dashboard**
   - User welcome section
   - Quick action cards
   - Stats overview
   - Sofia AI preview

4. **Sofia AI Assistant**
   - Chat interface with message history
   - Simulated AI responses (ready for LLM integration)
   - Subscription tier awareness

5. **Properties Management**
   - Property listing with grid/list views
   - Search and filter functionality
   - Sample properties display
   - Favorite functionality

6. **Contacts Management**
   - CRUD operations for contacts
   - Search functionality
   - Company/role tracking

7. **Crypto Hub**
   - Portfolio overview
   - Holdings display
   - Transaction history

8. **User Messaging**
   - Real-time chat between users
   - Online/offline presence
   - Message history

9. **User Profile**
   - Profile editing
   - Sofia personality settings
   - Logout functionality

10. **Subscription Plans**
    - 4 tiers: Free, Premium, Enterprise, Elite
    - Feature comparison
    - Upgrade UI

## Database Schema

### Collections (MongoDB)
- users: {id, email, full_name, hashed_password, role, is_active, created_at}
- contacts: {id, user_email, name, phone, email, company, role}
- properties: {id, title, address, city, state, price, bedrooms, bathrooms, sqft, images, features}
- subscriptions: {id, user_email, tier, message_limits, generation_limits}
- chat_messages: {id, sender_email, receiver_email, message, read, created_date}
- user_presence: {id, user_email, status, last_seen}
- crypto_wallets: {id, user_email, balances}
- crypto_transactions: {id, user_email, type, symbol, amount, price}
- support_tickets: {id, user_email, subject, description, status}
- collaboration_sessions: {id, owner_email, participants, content}

## API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me
- PUT /api/auth/me

### Resources
- GET/POST/PUT/DELETE /api/contacts
- GET/POST/PUT/DELETE /api/properties
- GET/PUT /api/subscriptions
- GET/POST /api/messages
- GET/POST /api/presence
- GET/POST /api/crypto/wallets
- GET/POST /api/crypto/transactions
- GET/POST /api/support/tickets
- GET/POST/PUT /api/collaboration/sessions

## Upcoming Tasks (P1)

### Phase 2 - AI Integration
- [ ] Integrate LLM for Sofia AI (GPT-5.2/Claude/Gemini)
- [ ] Implement conversation memory
- [ ] Add context-aware responses

### Phase 3 - Real Estate Features
- [ ] Property valuation tool
- [ ] AI property marketing
- [ ] Tenant portal
- [ ] Maintenance management

### Phase 4 - Crypto Features
- [ ] Live price feeds (CoinGecko API)
- [ ] Trading simulation
- [ ] Portfolio analytics

### Phase 5 - Creative Tools
- [ ] Music generation
- [ ] Image generation
- [ ] Video creation

## Backlog (P2)
- Live streaming module
- Call/phone system
- Security monitoring
- Admin dashboard
- Payment integration (Stripe)
- Supabase real-time features

## Environment Variables

### Backend (.env)
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=emerald_orbit
JWT_SECRET=<secret>
```

### Frontend (.env)
```
REACT_APP_BACKEND_URL=<preview_url>
```

## File Structure
```
/app/
├── backend/
│   ├── server.py          # Main FastAPI app
│   ├── requirements.txt   # Python dependencies
│   └── .env              # Environment variables
├── frontend/
│   ├── src/
│   │   ├── api/          # API client
│   │   ├── components/ui/ # UI components
│   │   ├── lib/          # Utilities
│   │   ├── pages/        # Page components
│   │   ├── utils/        # Helper functions
│   │   ├── App.js        # Main app with routing
│   │   └── index.js      # Entry point
│   ├── public/
│   └── package.json
└── memory/
    └── PRD.md
```

## Test Accounts
- Email: test@example.com, Password: test123
- Email: demo@emeraldorbit.com, Password: demo123456

---
Last Updated: January 21, 2026
