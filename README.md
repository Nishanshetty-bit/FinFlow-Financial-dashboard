# FinFlow - Finance Dashboard

A modern and interactive finance dashboard built with React and Tailwind CSS as part of the Zorvyn FinTech internship assignment. This project demonstrates clean component architecture, state management, and responsive design with a premium dark/light theme system.

---

## Live Preview

Start the development server:

```bash
npm run dev
```

Then open http://localhost:5173 in your browser.

---

## Tech Stack

| Layer   | What I Used                     | Why                                         |
| ------- | ------------------------------- | ------------------------------------------- |
| Core    | React 18.2.0 with Hooks         | Modern component-based architecture         |
| Styling | Tailwind CSS + CSS Variables    | Utility-first styling with custom theme     |
| Charts  | Chart.js 4.4.0                  | Interactive data visualizations             |
| Fonts   | Syne, DM Mono, Instrument Serif | Clean typography hierarchy                  |
| Storage | localStorage                    | Persistent data without backend             |
| Build   | Vite 5.0.8                      | Fast development and optimized builds       |
| State   | React Context API               | Centralized state management                |

---

## Features

### Dashboard Overview

* Shows key metrics like total balance, income, expenses, and savings rate
* Line chart for balance trends (1M / 3M / 6M)
* Donut chart for spending categories
* Recent transactions list

---

### Transactions Section

* Displays all transactions in a table
* Search by description or category
* Filter by type (income/expense)
* Sort by date or amount

---

### Role-Based UI (Demo)

* Viewer → can only view data
* Admin → can add, edit, and delete transactions
* Role can be switched from the sidebar (for demonstration purposes)

---

### Insights Section

* Highlights top spending category
* Calculates average transaction value
* Shows expense-to-income ratio
* Identifies the most active month
* Includes charts and category breakdown

---

### Extra Features

* Dark / Light mode toggle (saved in localStorage)
* Smooth animations and transitions
* Fully responsive design (works on mobile too)
* Handles empty states gracefully

---

## Project Structure

finflow-react/
|-- index.html           # React app entry point
|-- src/
|   |-- App.jsx          # Main application component
|   |-- App.css          # Global styles and theme variables
|   |-- index.jsx        # React DOM rendering
|   |-- components/      # Reusable UI components
|   |   |-- Sidebar.jsx
|   |   |-- Topbar.jsx
|   |   |-- Overview.jsx
|   |   |-- Transactions.jsx
|   |   |-- Insights.jsx
|   |   |-- TransactionModal.jsx
|   |   |-- Toast.jsx
|   |-- context/         # React Context for state management
|   |   |-- FinFlowContext.jsx
|   |-- hooks/           # Custom React hooks
|   |   |-- useFinFlow.js
|   |-- utils/           # Utility functions and constants
|   |   |-- constants.js
|-- package.json         # Dependencies and scripts
|-- tailwind.config.js   # Tailwind CSS configuration
|-- vite.config.js       # Vite build configuration
|-- README.md

---

## How to Run

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone or download the project
2. Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### Production Build

Create an optimized production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## Design Approach

I wanted the UI to feel premium and modern, so I designed a dark/light theme system with a vibrant green accent for contrast. The typography uses three distinct fonts to create clear visual hierarchy: Syne for headings, DM Mono for financial data, and Instrument Serif for accents.

From a technical perspective, I built this using React's component architecture:

- **Component-based structure**: Each major section (Overview, Transactions, Insights) is a separate component
- **Centralized state management**: React Context API manages all application state (transactions, theme, role, filters)
- **Custom hooks**: The `useFinFlow` hook provides easy access to state and actions
- **Theme system**: CSS variables with Tailwind utilities enable seamless dark/light mode switching
- **Responsive design**: Mobile-first approach with Tailwind's responsive utilities

Charts are implemented with Chart.js and properly handle theme changes by recreating with updated colors when the theme switches. All data persists in localStorage for a seamless user experience.

---

## Assumptions

* No backend or authentication — role switching is just for UI demonstration
* Data is preloaded so charts and insights work immediately
* Current timeline is assumed around April 2026

---

## Final Note

This project focuses on clarity, usability, and clean design. The aim was to build something that not only works well but is also easy to understand for anyone reviewing it.

---

Submitted by:
Nishan K N
nishanshetty2k19@gmail.com
