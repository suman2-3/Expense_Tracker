SpendWise — Full Stack Expense Tracker

A production-minded full-stack expense tracking application designed to handle real-world conditions such as unreliable networks, retries, and user interaction edge cases.

---

## Overview

SpendWise allows users to:

- Record daily expenses with amount, category, description, and date
- View and analyze spending through a modern dashboard
- Filter and sort expenses efficiently
- Gain insights through summaries and visualizations

The system is built with a focus on **data correctness, reliability, and maintainability**, rather than just feature completion.

---

## Tech Stack

### Frontend

- React (Create React App)
- Axios (API communication)
- Recharts (data visualization)

### Backend

- Node.js + Express
- SQLite (via better-sqlite3)

---

## Features Implemented

### Core Requirements

- Add new expense (amount, category, description, date)
- View list of expenses
- Filter expenses by category
- Sort expenses by date (newest first)
- Display total of visible expenses

---

### Advanced / Production Features

#### 1. Idempotent API (Retry-safe)

- Each expense includes a unique `id`
- Duplicate submissions (due to refresh/retry) do NOT create duplicate entries
- Ensures correctness under real-world conditions

#### 2. Persistent Storage

- SQLite database used for reliability
- Data survives refreshes and server restarts

#### 3. Validation (Bonus)

- Prevents invalid inputs (negative amount, missing date)

#### 4. Loading & Error States (Bonus)

- UI handles slow API responses gracefully
- Displays meaningful error messages

#### 5. Dashboard UI (Enhanced)

- Sidebar navigation (Dashboard / Transactions)
- Summary cards (Total, Entries, Category)
- Chart visualization (category-wise spending)

#### 6. Summary Insights (Bonus)

- Total expenses
- Category-wise breakdown
- Quick snapshot of spending trends

---

## Architecture & Design Decisions

### 1. Separation of Concerns

Backend is structured into:

- `routes/` → API endpoints
- `controllers/` → business logic
- `utils/` → validation

Frontend is structured into:

- `components/` → reusable UI
- `pages/` → page-level logic
- `api/` → API communication

---

### 2. Database Choice (SQLite)

Chosen because:

- Lightweight and zero setup
- Persistent (unlike in-memory store)
- Suitable for small-scale production apps

---

### 3. Handling Real-world Edge Cases

| Scenario        | Solution                         |
| --------------- | -------------------------------- |
| Multiple clicks | Disabled button + idempotent API |
| Page refresh    | Persistent DB                    |
| Network retry   | Same ID prevents duplication     |
| Slow API        | Loading state                    |
| API failure     | Error handling                   |

---

## UI Highlights

- Modern dashboard layout
- Clean card-based analytics
- Interactive chart visualization
- Dark theme inspired UI

---

## Trade-offs

Due to time constraints:

- No authentication system implemented
- Limited test coverage
- Basic charting (can be extended further)

Priority was given to:

- Correctness
- Reliability
- Clean architecture

---

## Running the Project

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm start
```

---

## Future Improvements

- Authentication (JWT-based)
- Advanced analytics (monthly trends, predictions)
- Pagination for large datasets
- Deployment (Docker + Cloud)

---

## Key Takeaway

This project focuses on **real-world engineering thinking**:

✔ Data integrity over UI polish
✔ Handling unreliable systems
✔ Clean, maintainable architecture

---

## Author

Developed as part of a full-stack assignment with emphasis on **production-quality thinking under time constraints**.
