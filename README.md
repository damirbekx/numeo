# High-Volume Users Dashboard

A professional, high-performance dashboard built with React, TypeScript, and Ant Design.

## 🚀 Features

- **Performance First**: Optimized Ant Design Table for high-volume data handling.
- **Data Management**: Powered by TanStack React Query with Infinite Scroll.
- **Interactions**:
  - Debounced search (500ms).
  - Multi-column sorting.
  - Country filtering.
  - User details modal with editable fields.
- **Reliability**:
  - Optimistic UI updates for immediate feedback.
  - Simulated random API failures with automatic rollback.
  - Beautiful alerts via SweetAlert2.
- **Rich Aesthetics**: Custom Ant Design theme with smooth transitions and premium typography.

## 🛠 Tech Stack

- **React 19** + **TypeScript**
- **Vite** (Build tool)
- **Ant Design** (UI Components)
- **TanStack React Query** (Server state)
- **Axios** (API requests)
- **SweetAlert2** (Popups)
- **Lucide React** (Icons)
- **Ant Design Table** (Virtual scrolling)

## 📦 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- The API server should be running at `http://127.0.0.1:8000`

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## 🧪 Implementation Highlights

- **Virtualization**: Uses Ant Design's built-in scroll optimization to render only the visible rows, keeping the DOM light even with 10k items.
- **Expensive Row Computation**: Each user row calculates a dynamic "Score" on the fly with a forced delay to demonstrate rendering efficiency.
- **Optimistic Updates**: When you save a user, the UI updates immediately. If the API fails (simulated for testing), it rolls back the state and shows an error.
