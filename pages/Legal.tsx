
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PageWrapper = ({ children }: { children?: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8"
    >
        {children}
    </motion.div>
);

const content = {
    privacy: {
        title: "Privacy Policy",
        lastUpdated: "October 24, 2023",
        body: (
            <>
                <p className="mb-4 text-slate-600 dark:text-slate-300">At ECO-SORT, we take your privacy seriously. This Privacy Policy describes how we collect, use, and protect your personal information.</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 mt-6">Information We Collect</h3>
                <p className="mb-4 text-slate-600 dark:text-slate-300">We collect information you provide directly to us, such as when you create an account, submit e-waste reports, or communicate with us. This may include your name, email address, and location data related to pick-ups.</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 mt-6">How We Use Information</h3>
                <p className="mb-4 text-slate-600 dark:text-slate-300">We use your information to process your recycling requests, award Green Credits, facilitate communication with collection points, and improve our services.</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 mt-6">Data Security</h3>
                <p className="mb-4 text-slate-600 dark:text-slate-300">We implement appropriate technical and organizational measures to protect your personal data against unauthorized access or disclosure.</p>
            </>
        )
    },
    terms: {
        title: "Terms of Service",
        lastUpdated: "September 15, 2023",
        body: (
            <>
                <p className="mb-4 text-slate-600 dark:text-slate-300">By accessing or using ECO-SORT, you agree to be bound by these Terms of Service.</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 mt-6">User Responsibilities</h3>
                <p className="mb-4 text-slate-600 dark:text-slate-300">You are responsible for the accuracy of the information you provide regarding e-waste submissions. Misuse of the platform, including falsifying reports, may result in account suspension and forfeiture of Green Credits.</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 mt-6">Green Credits</h3>
                <p className="mb-4 text-slate-600 dark:text-slate-300">Green Credits have no cash value and can only be redeemed for rewards specified on the platform. We reserve the right to modify the credit system at any time.</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 mt-6">Prohibited Activities</h3>
                <p className="mb-4 text-slate-600 dark:text-slate-300">You may not use the platform for any illegal purpose or to violate any local, state, or federal laws.</p>
            </>
        )
    },
    cookies: {
        title: "Cookie Policy",
        lastUpdated: "November 01, 2023",
        body: (
            <>
                <p className="mb-4 text-slate-600 dark:text-slate-300">We use cookies to enhance your experience on our website.</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 mt-6">What Are Cookies?</h3>
                <p className="mb-4 text-slate-600 dark:text-slate-300">Cookies are small text files stored on your device that help us remember your preferences, keep you logged in, and analyze site traffic.</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 mt-6">Types of Cookies We Use</h3>
                <ul className="list-disc pl-5 mb-4 text-slate-600 dark:text-slate-300">
                    <li>Essential Cookies: Necessary for the website to function.</li>
                    <li>Analytics Cookies: Help us understand how visitors interact with the site.</li>
                    <li>Preference Cookies: Remember your settings (like dark mode).</li>
                </ul>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 mt-6">Managing Cookies</h3>
                <p className="mb-4 text-slate-600 dark:text-slate-300">You can control and manage cookies in your browser settings. However, disabling cookies may affect the functionality of the ECO-SORT platform.</p>
            </>
        )
    }
};

const Legal = ({ type }: { type: 'privacy' | 'terms' | 'cookies' }) => {
    const navigate = useNavigate();
    const data = content[type];

    return (
        <PageWrapper>
            <button 
                onClick={() => navigate(-1)}
                className="flex items-center text-slate-500 hover:text-slate-900 dark:hover:text-white mb-8 transition-colors"
            >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </button>
            
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{data.title}</h1>
            <p className="text-slate-500 dark:text-slate-400 mb-8 border-b border-slate-200 dark:border-slate-800 pb-8">Last Updated: {data.lastUpdated}</p>
            
            <div className="prose prose-slate dark:prose-invert max-w-none">
                {data.body}
            </div>
        </PageWrapper>
    );
};

export default Legal;
