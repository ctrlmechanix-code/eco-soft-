import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
        >
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                <AlertTriangle className="w-12 h-12" />
            </div>
            <h1 className="text-6xl font-black text-slate-900 mb-2">404</h1>
            <h2 className="text-2xl font-bold text-slate-600 mb-4">Page Not Found</h2>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">
                The page you are looking for doesn't exist or has been moved. 
            </p>
            <Link 
                to="/"
                className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-500/20"
            >
                <Home className="w-4 h-4" /> Back Home
            </Link>
        </motion.div>
    </div>
  );
};

export default NotFound;