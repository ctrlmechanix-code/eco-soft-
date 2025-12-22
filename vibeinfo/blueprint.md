
# ECO-SORT Developer Blueprint

## 🏗️ Project Overview
ECO-SORT is a comprehensive, single-page application (SPA) designed to revolutionize e-waste management on university campuses. It provides a seamless user experience for identifying e-waste, determining the best disposal method (Repair, Donate, Recycle), finding collection points, and tracking environmental impact through a gamified credit system.

## 🛠️ Technology Stack

### Core Framework
- **React 18**: UI Library utilizing Functional Components and Hooks.
- **TypeScript**: Ensures type safety and code reliability across the application.
- **Vite**: Ultra-fast build tool and development server.

### Styling & Design System
- **Tailwind CSS**: Utility-first framework for rapid, responsive UI development.
- **Design Language**: 
  - **Glassmorphism**: Premium aesthetic using backdrop-blur, translucent layers, and subtle borders.
  - **Gradients**: Custom `mesh-gradient` backgrounds and dynamic text gradients.
  - **Typography**: 'Inter' font family for clean, modern readability.
- **Icons**: `lucide-react` for consistent, lightweight SVG iconography.

### Animation & Interaction
- **Framer Motion**: 
  - Page transition animations (`AnimatePresence`).
  - Complex micro-interactions (hover effects, list staggering).
  - Layout animations (`layoutId`) for smooth state changes.
  - `AnimatedCounter` for engaging statistical visualization.

### Routing & Navigation
- **React Router v6**:
  - Client-side routing with `MemoryRouter` (for demo resilience) or `BrowserRouter`.
  - Nested routes with shared `AppLayout`.
  - Dynamic navigation states (Active tabs, history stack).

### Data Visualization & AI
- **Recharts**: Responsive, composable charts for the Dashboard and User Analysis pages.
- **Google GenAI SDK (`@google/genai`)**: Integration with Gemini models (specifically `gemini-3-pro-image-preview`) for the AI Image Generator feature.

---

## 📂 Complete File Structure

```
/
├── components/          
│   ├── ui/              
│   │   ├── AnimatedCounter.tsx  # Counter animation component
│   │   └── Icon.tsx             # Dynamic Lucide icon wrapper
│   ├── Footer.tsx               # Global footer with links
│   └── Navbar.tsx               # Global nav with mobile menu & notification logic
├── data/
│   └── mockData.ts      # Static data (Categories, Leaderboard, Points) & mock DB
├── pages/               
│   ├── AboutUs.tsx      # Mission statement page
│   ├── Auth.tsx         # Login/Signup simulation
│   ├── Blog.tsx         # News feed listing
│   ├── BlogPost.tsx     # Individual article view
│   ├── Careers.tsx      # Job listings page
│   ├── Categories.tsx   # Step 1: E-waste category selection
│   ├── CollectionPoints.tsx # Location finder with Detail View & Chat
│   ├── Dashboard.tsx    # Campus-wide analytics
│   ├── Feedback.tsx     # User support form
│   ├── GreenCredits.tsx # Gamification & Leaderboard
│   ├── ImageGenerator.tsx # AI-powered image creation tool
│   ├── Landing.tsx      # Home page / Hero section
│   ├── Profile.tsx      # User profile, history, and messaging center
│   ├── QuestionFlow.tsx # Step 2: Diagnostic wizard logic
│   ├── Result.tsx       # Step 3: Recommendation engine
│   ├── Submissions.tsx  # Track pending/dropped/completed items
│   ├── Sustainability.tsx # Environmental impact report
│   ├── UserAnalysis.tsx # Personal contribution analytics
│   └── UserRequests.tsx # Support ticket tracking
├── types/
│   └── index.ts         # TypeScript interfaces (Submission, UserRequest, etc.)
├── vibeinfo/            # Project documentation
│   ├── blueprint.md     # This file
│   ├── LICENSE.md       # Apache 2.0 License
│   └── README.md        # Quick start guide
├── App.tsx              # Main entry, Route definitions
├── index.tsx            # React root mount
├── index.html           # HTML entry point
└── metadata.json        # Project metadata
```

## 🧩 Implemented Features & Logic

### 1. Smart Reporting Flow (`Categories` -> `QuestionFlow` -> `Result`)
- Users select a device category.
- A dynamic questionnaire assesses the device condition.
- **Logic**: Determines if the item should be Repaired (high value), Donated (working), or Recycled (broken).
- Generates a `Submission` object with a unique **Drop-off Code**.

### 2. Submission Tracking System (`Submissions.tsx`)
- **State Management**: Uses `localStorage` to persist submissions between sessions.
- **Status Workflow**: 
  1. `PENDING`: User has reported the item.
  2. `DROPPED`: User has marked the item as dropped off (waiting verification).
  3. `COMPLETED`: Admin verified (mocked), credits awarded.
- **Visuals**: Status badges (Amber/Blue/Green) and filterable tabs.

### 3. Integrated Messaging System
- **Collection Points**: Users can open a specific location to see details and start a chat.
- **Profile Hub**: A dedicated "Messaging Portal" in the user profile aggregates all conversations.
- **Notifications**: The Navbar displays a red notification dot when unread messages (simulated admin replies) exist.

### 4. Green Credits & Gamification
- **Calculation**: Credits are calculated based on the sustainability impact of the action (Repair > Donate > Recycle).
- **Display**: "Pending Credits" vs. "Total Balance" are tracked separately in `GreenCredits.tsx`.
- **Leaderboard**: Visual ranking of top contributors.

### 5. Mock Backend Strategy
- **Persistence**: The app mimics a real backend by reading/writing to `localStorage` for:
  - `user_submissions`
  - `cp_messages` (Collection Point messages)
  - `user_requests` (Support tickets)
  - `isAuthenticated` (Session state)
- **Simulation**: `setTimeout` is used to simulate API latency and async admin responses.

---

## 🚀 Recent Updates
- **New Page**: Added `/submissions` for granular tracking of reported items.
- **Navigation Update**: Added "My Submissions" to the main navigation bar.
- **Logic Enhancement**: Updated `QuestionFlow` to auto-generate submission records upon completion.
- **UI Refinement**: Enhanced `Result.tsx` to show Pending Credits and Next Steps clearly.
