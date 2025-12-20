
# ECO-SORT Developer Blueprint

## 🏗️ Project Overview
ECO-SORT is a modern, single-page application (SPA) designed to streamline e-waste management on university campuses. It utilizes a component-based architecture with client-side routing and mock data simulation to demonstrate a complete user flow from reporting waste to tracking environmental impact.

## 🛠️ Technology Stack

### Core Framework
- **React 18**: UI Library using Functional Components and Hooks.
- **TypeScript**: Static typing for data reliability (Interfaces defined in `types/index.ts`).
- **Vite**: Build tool and development server.

### Styling & Design System
- **Tailwind CSS**: Utility-first CSS framework.
- **Design Language**: 
  - **Glassmorphism**: Extensive use of `backdrop-blur`, semi-transparent whites, and borders.
  - **Gradients**: Custom linear and radial gradients defined in Tailwind classes.
  - **Typography**: Inter font family (via Google Fonts).
- **Icons**: `lucide-react` for consistent, lightweight SVG icons.

### Animation & Interaction
- **Framer Motion**:
  - `AnimatePresence` for smooth page transitions (`App.tsx`).
  - Complex micro-interactions (hover states, staggering lists).
  - `AnimatedCounter` component for statistical visualization.

### Routing
- **React Router v6**:
  - Uses `HashRouter` for easy static deployment compatibility.
  - Layout pattern (`AppLayout`) wrapping nested routes.
  - State passing via `useLocation` (e.g., passing answers from `QuestionFlow` to `Result`).

### Data Visualization & AI
- **Recharts**: Responsive bar charts for dashboard analytics.
- **Google GenAI SDK**: Integration with Gemini models for the Image Generator feature.

---

## 📂 Project Structure

```
/
├── components/          # Reusable UI components
│   ├── ui/              # Atom components (Icon, AnimatedCounter)
│   ├── Navbar.tsx       # Global navigation with mobile menu
│   └── Footer.tsx       # Global footer
├── data/
│   └── mockData.ts      # Static data simulating a backend DB
├── pages/               # Route-level components
│   ├── Landing.tsx      # Hero and feature overview
│   ├── QuestionFlow.tsx # Multi-step wizard form
│   ├── Dashboard.tsx    # Analytics view
│   └── ...              # Other pages
├── types/
│   └── index.ts         # TypeScript interfaces (Category, User, etc.)
├── App.tsx              # Main entry, Routing logic, Layout wrapper
└── main.tsx             # React DOM root rendering
```

## 🧩 Key Design Patterns

### 1. The Layout Pattern
The `App.tsx` file defines an `AppLayout` component that conditionally renders the `Navbar` and `Footer` based on the current route (hiding them on the `/auth` page).

### 2. Mock Data Strategy
Instead of a backend, `data/mockData.ts` exports typed arrays and objects. This allows the frontend to be fully interactive without API dependencies.
- **Future Dev Note**: Replace imports from `mockData.ts` with `fetch` or `axios` calls to a real API.

### 3. State Management
- **Local State**: `useState` is used for component-level interaction (e.g., mobile menu toggle).
- **Navigation State**: Data is passed between pages using `navigate('/path', { state: data })`.

### 4. Animation Strategy
Pages are wrapped in a generic `PageWrapper` or similar motion div structure:
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0 }}
>
```
This ensures consistent entrance animations across the application.

---

## 🚀 Future Development Roadmap

1.  **Backend Integration**: Connect to Firebase/Supabase for real authentication and data persistence.
2.  **State Management**: Introduce Context API or Redux if global state complexity increases (e.g., user session management).
3.  **PWA Support**: Update `vite.config.ts` to support offline capabilities.
