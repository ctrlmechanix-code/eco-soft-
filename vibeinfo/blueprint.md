
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
- **Dark Mode**: System-wide dark mode support with manual toggle.
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
  - Nested routes with shared `AppLayout` and `AdminLayout`.
  - Dynamic navigation states (Active tabs, history stack).

### Data Visualization & AI
- **Recharts**: Responsive, composable charts for the Dashboard, User Analysis, and Admin Reports.
- **Google GenAI SDK (`@google/genai`)**: Integration with Gemini models (specifically `gemini-3-pro-image-preview`) for the AI Image Generator feature.

---

## 📂 Complete File Structure

```
/
├── components/          
│   ├── admin/
│   │   ├── AdminLayout.tsx      # Layout wrapper for admin pages
│   │   ├── AdminNavbar.tsx      # Top bar for admin
│   │   └── Sidebar.tsx          # Admin navigation sidebar
│   ├── ui/              
│   │   ├── AnimatedCounter.tsx  # Counter animation component
│   │   └── Icon.tsx             # Dynamic Lucide icon wrapper
│   ├── Footer.tsx               # Global footer with links
│   └── Navbar.tsx               # Global nav with mobile menu & notification logic
├── data/
│   └── mockData.ts      # Static data (Categories, Leaderboard, Points) & mock DB
├── pages/
│   ├── admin/           # -- ADMIN PANEL --
│   │   ├── Activity.tsx         # Audit logs
│   │   ├── CollectionPoints.tsx # Manage locations
│   │   ├── Content.tsx          # Manage blog/CMS
│   │   ├── Credits.tsx          # Configure point rates
│   │   ├── Dashboard.tsx        # Admin analytics
│   │   ├── Redemptions.tsx      # Manage rewards & approvals
│   │   ├── Reports.tsx          # System reports
│   │   ├── Requests.tsx         # User support tickets
│   │   ├── Settings.tsx         # System config
│   │   ├── Submissions.tsx      # Verify drop-offs
│   │   └── Users.tsx            # User management
│   ├── AboutUs.tsx      # Mission statement page
│   ├── Auth.tsx         # Login/Signup simulation
│   ├── Blog.tsx         # News feed listing
│   ├── BlogPost.tsx     # Individual article view
│   ├── Careers.tsx      # Job listings page
│   ├── Categories.tsx   # Step 1: E-waste category selection
│   ├── CollectionPoints.tsx # Location finder with Detail View & Chat
│   ├── CreditTransactions.tsx # User ledger history
│   ├── Dashboard.tsx    # Campus-wide analytics
│   ├── Feedback.tsx     # User support form
│   ├── GreenCredits.tsx # Gamification & Leaderboard
│   ├── ImageGenerator.tsx # AI-powered image creation tool
│   ├── Landing.tsx      # Home page / Hero section
│   ├── MyRedemptions.tsx # User reward history
│   ├── Profile.tsx      # User profile, history, and messaging center
│   ├── QuestionFlow.tsx # Step 2: Diagnostic wizard logic
│   ├── Result.tsx       # Step 3: Recommendation engine
│   ├── Rewards.tsx      # Redemption marketplace
│   ├── Submissions.tsx  # Track pending/dropped/completed items
│   ├── Sustainability.tsx # Environmental impact report
│   ├── UserAnalysis.tsx # Personal contribution analytics
│   └── UserRequests.tsx # Support ticket tracking
├── types/
│   ├── global.d.ts      # Global window/AI types
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

### 2. Admin Panel & Verification
- **Role-Based Access**: Dedicated `/admin` routes with a separate layout.
- **Verification**: Admins can view `PENDING` or `DROPPED` submissions and mark them as `COMPLETED` (Verified) to award points, or `REJECTED`.
- **Management**: Full CRUD capabilities for Users, Collection Points, and Rewards.

### 3. Rewards & Redemption System
- **Marketplace**: Users browse rewards filtered by category and tier (Bronze, Silver, Gold, Platinum).
- **Transaction Ledger**: Tracks every point earned (submission, bonuses) and spent (redemptions).
- **Fulfillment**: 
  - Instant rewards generate a code immediately.
  - Physical items require admin approval in `AdminRedemptions.tsx`.

### 4. AI Image Generator
- **Integration**: Uses Google GenAI (`gemini-3-pro-image-preview`).
- **Functionality**: Users can generate sustainability-themed images (1K/2K/4K) based on text prompts.
- **Key Management**: Includes a flow for users to select their own API key securely via `window.aistudio`.

### 5. Messaging & Support
- **Contextual Chat**: Users can chat with specific Collection Points.
- **Support Tickets**: Users can submit feedback or bug reports; Admins can reply and resolve them.
- **Notifications**: Real-time indicators for unread messages.

### 6. Mock Backend Strategy
- **Persistence**: The app mimics a real backend by reading/writing to `localStorage` for:
  - `user_submissions`, `users`, `collection_points`, `rewards_catalog`
  - `cp_messages`, `user_requests`, `activity_logs`, `credit_transactions`
- **Simulation**: `setTimeout` is used to simulate API latency and async admin responses.

---

## 🚀 Recent Updates
- **Dark Mode**: Fully implemented dark mode across all User and Admin pages.
- **Admin Suite**: Added comprehensive dashboard, user management, and content management for admins.
- **Rewards System**: Launched a full marketplace with tier-based unlocking logic.
- **AI Integration**: Added Generative AI capabilities for creative sustainability visualization.
