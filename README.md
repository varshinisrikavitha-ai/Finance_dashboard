# Zorvyn Finance Dashboard

A production-style fintech dashboard built with React and Vite, focused on clean architecture, premium UI quality, and practical financial workflows.

## Overview

Zorvyn Finance Dashboard is a portfolio-ready web app for treasury-style transaction tracking and analytics. It includes role-based controls, interactive charts, polished motion, and persistent local state.

## Core Features

- Responsive layout for mobile, tablet, and desktop
- Admin and Viewer role modes
- Transaction management: add, edit, delete
- Search, category filter, type filter, sorting controls
- Balance trend chart, category donut chart, monthly comparison chart
- Executive-style insight cards derived from transaction data
- Dark mode with persistent user preference
- LocalStorage persistence for theme, role, and transactions

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
- State layer: Context API with reducer-based actions
- Utility layer: pure financial calculations, formatters, storage helpers

### State Management

- Centralized state with Context API and useReducer
- Predictable action flow for role, filters, CRUD operations, and theme
- Derived data for summary, charts, and insights computed from source transactions

## Implementation Highlights

- Debounced search to reduce unnecessary updates
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
  data/
  hooks/
  layouts/
  pages/
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

## License

For portfolio and educational demonstration.