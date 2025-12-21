
import React from 'react';
import { HashRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
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

const AppLayout = () => {
    const location = useLocation();
    const isAuthPage = location.pathname === '/auth';

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            {!isAuthPage && <Navbar />}
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
    <HashRouter>
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
          
          {/* Company Pages */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/sustainability" element={<Sustainability />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
