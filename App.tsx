
import React from 'react';
import { MemoryRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Categories from './pages/Categories';
import QuestionFlow from './pages/QuestionFlow';
import Result from './pages/Result';
import CollectionPoints from './pages/CollectionPoints';
import GreenCredits from './pages/GreenCredits';
import Dashboard from './pages/Dashboard';
import AboutUs from './pages/AboutUs';
import Sustainability from './pages/Sustainability';
import Careers from './pages/Careers';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Profile from './pages/Profile';
import UserAnalysis from './pages/UserAnalysis';
import Feedback from './pages/Feedback';
import UserRequests from './pages/UserRequests';
import Submissions from './pages/Submissions';
import ImageGenerator from './pages/ImageGenerator';
import NotFound from './pages/NotFound';
import Rewards from './pages/Rewards';
import MyRedemptions from './pages/MyRedemptions';
import CreditTransactions from './pages/CreditTransactions';

// Admin Imports
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminSubmissions from './pages/admin/Submissions';
import AdminUsers from './pages/admin/Users';
import AdminCollectionPoints from './pages/admin/CollectionPoints';
import AdminCredits from './pages/admin/Credits';
import AdminContent from './pages/admin/Content';
import AdminRequests from './pages/admin/Requests';
import AdminActivity from './pages/admin/Activity';
import AdminReports from './pages/admin/Reports';
import AdminSettings from './pages/admin/Settings';
import AdminRedemptions from './pages/admin/Redemptions';

const AppLayout = () => {
    const location = useLocation();
    const isAuthPage = location.pathname === '/auth';

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Navbar />
            <main className="flex-grow">
                <AnimatePresence mode="wait">
                    <Outlet />
                </AnimatePresence>
            </main>
            {!isAuthPage && <Footer />}
        </div>
    );
};

function App() {
  return (
    <MemoryRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/questions" element={<QuestionFlow />} />
          <Route path="/result" element={<Result />} />
          <Route path="/collection-points" element={<CollectionPoints />} />
          <Route path="/credits" element={<GreenCredits />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/analysis" element={<UserAnalysis />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/requests" element={<UserRequests />} />
          <Route path="/submissions" element={<Submissions />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/my-redemptions" element={<MyRedemptions />} />
          <Route path="/credits/transactions" element={<CreditTransactions />} />
          <Route path="/generate-image" element={<ImageGenerator />} />
          
          {/* Company Pages */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/sustainability" element={<Sustainability />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/auth" element={<Auth />} />
          
          {/* Catch all */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin Routes - Separate Layout */}
        <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="submissions" element={<AdminSubmissions />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="collection-points" element={<AdminCollectionPoints />} />
            <Route path="credits" element={<AdminCredits />} />
            <Route path="redemptions" element={<AdminRedemptions />} />
            <Route path="content" element={<AdminContent />} />
            <Route path="requests" element={<AdminRequests />} />
            <Route path="activity" element={<AdminActivity />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

export default App;
