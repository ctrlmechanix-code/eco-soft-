
# ECO-SORT ♻️

> **A Smart Campus E-Waste Management System**

ECO-SORT is a premium, React-based web application designed to gamify and streamline the process of recycling electronic waste on university campuses. It guides users through identifying devices, finding collection points, and tracking their environmental impact.

![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)
![React](https://img.shields.io/badge/React-18-61DAFB.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6.svg)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC.svg)

## ✨ Features

- **🔍 Smart Categorization**: Visual guide to help users identify e-waste types.
- **🧠 Intelligent Triage**: Multi-step questionnaire to determine if items should be repaired, donated, or recycled.
- **📊 Impact Dashboard**: Real-time analytics showing CO₂ saved and devices diverted from landfills.
- **🏆 Gamification**: Green Credits system with leaderboards and achievement badges.
- **📍 Locator**: Interactive interface to find campus collection bins and repair shops.
- **🎨 AI Image Generator**: Integrated Gemini AI tool to visualize sustainability concepts.

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts
- **AI**: Google Gemini API

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/eco-sort.git
   cd eco-sort
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root directory and add your Google Gemini API key:
   ```env
   VITE_API_KEY=your_google_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📱 Application Flow

1. **Landing Page**: Overview of the mission and quick actions.
2. **Auth**: Mock login interface.
3. **Report Waste**: Select category -> Answer questions -> Get Recommendation.
4. **Dashboard**: View personal and campus-wide statistics.

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the Apache 2.0 License. See `vibeinfo/LICENSE.md` for more information.
