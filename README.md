# BudgetTrack

A clean, responsive personal expense tracker built with React. Add income and
expenses, see where your money goes with charts, keep a monthly budget in
check, and get plain-language spending insights — all stored locally in your
browser, no backend required.

## Overview

BudgetTrack is a fresher-portfolio project designed to look and behave like a
real product rather than a tutorial CRUD app. Every number on screen —
totals, charts, insights — is computed live from the transactions you enter.

## Features

- Add, edit and delete transactions (income or expense) with validation
- Dashboard with balance, income, expense and this-month summary cards
- Budget Health: set a monthly budget and see a live progress bar and status
- Spending Insights: auto-generated observations from your real data
- Transaction history with search, filters (type/category/payment/date) and
  multi-column sorting
- Pagination (10 per page) so long histories stay fast and readable
- Category breakdown (pie chart) and monthly spending trend (line chart) via
  Recharts
- Monthly summary with a selectable month
- CSV export
- Light/dark theme, persisted
- Fully responsive: sidebar nav on desktop, bottom nav + floating add button
  on mobile
- Data persists in `localStorage` — refreshing the page keeps your data
- Sample data on first visit so the dashboard isn't empty, easily cleared

## Tech Stack

- React 18 (Vite, no TypeScript)
- Recharts for charts
- lucide-react for icons
- Plain CSS with custom properties for theming (no CSS framework)
- Browser `localStorage` for persistence — no backend in V1

## Project Structure

```
src/
├── components/     Reusable UI pieces (forms, cards, charts, nav, dialogs)
├── pages/          Dashboard, Transactions, Analytics, Settings
├── hooks/          useLocalStorage — generic persistence hook
├── utils/          calculations, dateUtils, insights, csvExport, storage
├── data/           category lists + sample data
├── App.jsx         Top-level state and page routing
├── main.jsx        React entry point
└── index.css       Design tokens + all styling
```

## How to Run

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview   # optional: preview the production build locally
```

## LocalStorage Architecture

All reads/writes go through `src/utils/storage.js`, which exposes named
functions (`getTransactions`, `saveTransactions`, `getBudget`, `saveBudget`,
`getTheme`, `saveTheme`, `clearAllData`) rather than having components touch
`window.localStorage` directly. Every read is wrapped in a try/catch so
malformed or missing data never crashes the app — it just falls back to a
sane default.

## Deployment (Netlify)

1. Push this project to a GitHub repository.
2. In Netlify: **Add new site → Import an existing project** and pick the repo.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy. No environment variables or redirects are needed since this is a
   single-page app with no client-side routing.

## Future Improvements (V2)

This is intentionally a frontend-only V1. A natural next step is to replace
`localStorage` with a real backend:

```
React frontend
    ↓  REST calls
Spring Boot REST API
    ↓
Spring Data JPA / Hibernate
    ↓
MySQL
```

Planned V2 additions:
- User accounts and authentication (JWT)
- Cloud sync across devices
- Recurring transactions
- Notifications/reminders near budget limits
