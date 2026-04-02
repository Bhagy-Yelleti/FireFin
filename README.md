# FireFin

FireFin is a responsive personal finance dashboard built with React, Vite, Tailwind CSS, Zustand, and Recharts. It helps users track transactions, review spending trends, and view financial insights in a clean light or dark theme.

## Live Demo

- App: https://firefin.vercel.app

## Core Features

- Dashboard summary cards for balance, income, and expenses
- Balance trend chart and spending category breakdown
- Transaction search, filter, sort, and CSV export
- Admin and Viewer role-based UI behavior
- Insights page with savings, trends, and smart tips
- Responsive layout with dark mode support

## Tech Stack

- React
- Vite
- Tailwind CSS
- Zustand
- Recharts
- Lucide React

## Run Locally

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```text
src/
  components/
    common/
    dashboard/
    insights/
    layout/
    transactions/
  data/
  hooks/
  store/
  utils/
  App.jsx
  main.jsx
  index.css
```

## Main Screens

- Dashboard
- Transactions
- Insights

## Notes

- Data is stored locally in the browser using Zustand persistence.
- Currency formatting uses INR.
- This project is frontend-only and does not include a backend.
