BudgetTrack

A clean and responsive personal expense tracker built with React.

BudgetTrack helps users manage their income and expenses, track monthly spending, set a budget, and understand their spending habits through charts and simple insights.
 
---

🔗 Live Demo: https://budget-track-teal.vercel.app/

Features:

- Add, edit, and delete income and expense transactions
- Input validation for transaction details
- Dashboard showing:
  - Current balance
  - Total income
  - Total expenses
  - This month's spending
- Set a monthly budget and track spending progress
- Budget status updates based on current spending
- Automatic spending insights based on transaction data
- Search and filter transactions by:
  - Type
  - Category
  - Payment method
  - Date
- Multi-column sorting and pagination
- Category-wise expense breakdown using a pie chart
- Monthly spending trend using a line chart
- Selectable monthly summary
- Export transaction data as CSV
- Light and dark theme
- Fully responsive design for desktop and mobile
- Sample data available on first visit
- All data is stored locally in the browser.

---

 Tech Stack

- React 18
- Vite
- Recharts
- lucide-react
- Plain CSS
- Browser LocalStorage

No backend or database is required for the current version.

---

 Responsive Design

BudgetTrack is designed to work smoothly across different screen sizes.

- Desktop: Sidebar navigation
- Mobile: Bottom navigation with a floating add button

The interface adapts to provide a simple and easy-to-use experience on both desktop and mobile devices.

---

📊 How It Works

Every value shown in the application is calculated from the user's transactions.

User adds transactions
        ↓
Data is stored in LocalStorage
        ↓
React updates the application state
        ↓
Dashboard totals, charts, budget progress,
and insights are calculated automatically

Refreshing the page does not remove the data.

---

Data Storage

BudgetTrack uses browser LocalStorage for data persistence.

All LocalStorage operations are handled through a central storage utility instead of directly accessing "window.localStorage" from components.

This includes functions for:

- Transactions
- Budget
- Theme
- Clearing application data

Error handling is included so missing or invalid stored data falls back to safe default values.

---

📂 Project Structure

src/
├── components/     # Reusable UI components
├── pages/          # Dashboard, Transactions, Analytics, Settings
├── hooks/          # Custom React hooks
├── utils/          # Calculations, insights, dates, CSV and storage logic
├── data/           # Categories and sample data
├── App.jsx         # Main application component
├── main.jsx        # Application entry point
└── index.css       # Global styles and theme variables

---

Getting Started

Prerequisites

Make sure you have Node.js and npm installed.

Installation

Clone the repository:

git clone <your-repository-url>

Go to the project folder:

cd budgettrack

Install dependencies:

npm install

Start the development server:

npm run dev

Open the local URL shown in your terminal.

---

Build for Production

npm run build

To preview the production build locally:

npm run preview

---

🚀 Future Improvements

The current version is intentionally built as a frontend-only application. Future versions may include:

- User authentication
- Cloud data synchronization
- Backend REST API using Spring Boot
- MySQL database integration
- Recurring transactions
- Budget notifications and reminders
- Multi-device access

Planned architecture:

React Frontend
      ↓
Spring Boot REST API
      ↓
Spring Data JPA / Hibernate
      ↓
MySQL Database

---

👨‍💻 Why I Built This Project

I wanted to build something that feels more like a real product than a basic CRUD project.

Instead of only storing and displaying transactions, BudgetTrack uses the entered data to generate live dashboard totals, spending charts, budget progress, and useful insights.

The project helped me practice React component design, state management, reusable utilities, data persistence, responsive UI design, and building features around real user needs.
