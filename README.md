# Zorvyn Finance Dashboard

A production-style fintech dashboard built with React and Vite, focused on clean architecture, premium UI quality, and practical financial workflows.

## Overview

Zorvyn Finance Dashboard is a portfolio-ready web app for treasury-style transaction tracking and analytics. It includes authentication, protected routes, role-based controls, interactive charts, polished motion, and persistent local state.

## Core Features

- Responsive layout for mobile, tablet, and desktop
- Login and signup flows with inline form validation
- Protected routing for dashboard pages
- Session persistence with auto-login on refresh
- Remember Me session option
- Admin and Viewer role modes
- Transaction management: add, edit, delete
- Search, category filter, type filter, sorting controls
- Balance trend chart, category donut chart, monthly comparison chart
- Executive-style insight cards derived from transaction data
- Dark mode with persistent user preference
- LocalStorage persistence for auth session, theme, role, and transactions

## Authentication and Access Control

- Public routes:
  - /login
  - /signup
- Protected route:
  - /dashboard
- Unauthenticated users are redirected to /login
- Authenticated users are redirected away from public auth screens
- Logout is available from the topbar profile area

### Validation Rules

- Required field validation on login and signup forms
- Email format validation
- Password minimum length (6 characters)
- Disabled submit button with loading indicator during authentication requests

### Role-Based Authorization

- Admin: full create, edit, delete transaction access
- Viewer: read-only dashboard and transaction views
- Selected role is synced into the finance state layer so existing role-aware UI behavior remains consistent

## Premium UI and UX

- Fintech-inspired visual hierarchy with clear KPI-first layout
- Smooth motion using Framer Motion (entry, hover, and micro-interactions)
- Reusable design system components: Card, Button, Input, Select, Badge, Modal
- Polished loading and empty states
- Consistent accessibility-focused interaction states (hover, focus, disabled)

## Architecture

The project follows a feature-oriented, scalable React structure:

- Layout layer: topbar, sidebar, page shell
- Domain layer: transactions, insights, summaries, charts
- UI layer: reusable primitive components
- State layer: Context API with reducer-based actions (AuthContext + FinanceContext)
- Utility layer: pure financial calculations, formatters, storage helpers

### State Management

- Centralized state with Context API and useReducer
- AuthContext handles login, signup, logout, user hydration, and session state
- FinanceContext handles dashboard domain state (transactions, filters, charts, UI settings)
- Predictable action flow for role, filters, CRUD operations, theme, and auth state transitions
- Derived data for summary, charts, and insights computed from source transactions

## Implementation Highlights

- Debounced search to reduce unnecessary updates
- ProtectedRoute component for reusable route guards
- Auto-login by restoring valid local auth session on app load
- Auth UI transitions with loading and feedback states
- Role-aware UI behavior (admin edit/delete vs viewer read-only)
- Responsive table behavior with mobile-friendly controls
- Chart components built with Recharts and adaptive containers
- Persistent app experience via LocalStorage hydration on load

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Framer Motion
- Recharts
- React Router DOM
- Context API + custom hooks
- Lucide React icons

## Project Structure

```text
src/
  components/
    charts/
    dashboard/
    layout/
    transactions/
    ui/
  context/
    AuthContext.jsx
    FinanceContext.jsx
  data/
  hooks/
  layouts/
  pages/
    Login.jsx
    Signup.jsx
    DashboardPage.jsx
  routes/
    ProtectedRoute.jsx
  utils/
  App.jsx
  main.jsx
```

## Getting Started

Prerequisites:

- Node.js 18+
- npm

Install and run:

```bash
npm install
npm run dev
```

Build and preview:

```bash
npm run build
npm run preview
```

## Scripts

- npm run dev: start development server
- npm run build: create production build
- npm run preview: run production preview locally

## Screenshots

- Dashboard Overview: docs/screenshots/dashboard-overview.png
- Transactions Table: docs/screenshots/transactions-table.png
- Dark Theme: docs/screenshots/dark-mode.png

## Notes

- This project currently uses mock financial data.
- All data changes are persisted in browser LocalStorage.
- Authentication is implemented client-side for portfolio/demo use.
- User credentials are stored in localStorage for demonstration only; do not use this pattern for production security.

## License

For portfolio and educational demonstration.