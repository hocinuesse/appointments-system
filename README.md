# Nexus Dashboard — Appointments, Clients, and Reports Management

A professional system for managing appointments and clients with reports and analytics, built with React and Vite. Integrates Firebase (Auth + Firestore), uses Zustand for state management, and AOS for polished animations.

## Key Features
- Appointments: add/confirm/cancel with instant notification logging
- Clients: create/update and link appointments with total spending tracking
- Reports & Analytics: total revenue, appointments count, clients count, average order value
- Notification Panel: structured, interactive system events
- Modern responsive UI: CSS/Tailwind-like styling + precise AOS animations
- Security: Firestore rules enforce owner-only data access

## Tech Stack
- UI: React 19 + Vite 7
- Routing: React Router
- State: Zustand
- Animations: AOS
- Data: Firebase Auth + Firestore
- Code Quality: ESLint (React Hooks + Refresh configs)

## Project Structure (high-level)
- Global animation setup in the main entry files (App and main)
- Data access via dedicated services (appointments, clients, analytics)
- State management with centralized stores
- Firebase configured via environment variables (no secrets committed)
- Firestore security rules stored alongside project configuration

## Quick Start
Requirements:
- Node.js 18+
- Firebase project (Web)

Install and run:
1. Install dependencies:
   ```bash
   npm install
   ```
2. Development server:
   ```bash
   npm run dev
   ```
3. Production build:
   ```bash
   npm run build
   ```
4. Preview:
   ```bash
   npm run preview
   ```
5. Lint:
   ```bash
   npm run lint
   ```

## Firebase Setup
- Create a `.env` file in project root with your Firebase credentials.
- Use environment variables (e.g., `VITE_*`) and do not commit `.env`.
- The app reads environment values at build time; never expose secrets in README.

## Security
- Firestore rules enforce owner-only access for all data.
- Always include the authenticated user identifier in created documents.
- Keep sensitive details (paths, keys, and user-specific info) out of documentation.

## UI Highlights
- Dashboard, Appointments, Reports, Services, Navigation, and Auth pages are organized into feature-based components.

## Animations & Transitions
- AOS used with staggered delays for clean visual hierarchy
- CSS transitions rely on `transform` with `transition: transform 0.3s ease-in-out` for smooth scaling
- Modals/panels use `fade` and `zoom-in` effects for open/close interactions

## Quality & Production Notes
- Keep code quality via `npm run lint`
- Do not commit secrets; use `.env`
- Consider caching/virtualization for large lists

## License
Private project — for practical and educational use. Redistribution requires permission.
