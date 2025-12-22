
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Recycle, Mail, ArrowRight, ArrowLeft, Key, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const GoogleLogo = () => (
    <svg className="w-5 h-5" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
        <path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path>
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.012 35.426 44 30.039 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
    </svg>
);

type AuthView = 'initial' | 'login' | 'forgot-password';

const Auth = () => {
    const navigate = useNavigate();
    const [view, setView] = useState<AuthView>('initial');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    // Form States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleGoogleLogin = () => {
        setIsLoading(true);
        setTimeout(() => {
            localStorage.setItem('isAuthenticated', 'true');
            navigate('/categories');
        }, 1500);
    };

    const handleEmailLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        setIsLoading(true);
        // Mock API call
        setTimeout(() => {
            setIsLoading(false);
            if (email.includes('error')) {
                setError("Invalid credentials. Please try again.");
            } else {
                localStorage.setItem('isAuthenticated', 'true');
                navigate('/categories');
            }
        }, 1500);
    };

    const handleResetPassword = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!email) {
            setError("Please enter your email address.");
            return;
        }

        setIsLoading(true);
        // Mock API call
        setTimeout(() => {
            setIsLoading(false);
            setSuccessMsg("Reset link sent! Check your inbox.");
        }, 1500);
    };

    const goBack = () => {
        setError(null);
        setSuccessMsg(null);
        if (view === 'forgot-password') setView('login');
        else setView('initial');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden px-4">
            {/* Abstract Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[50vh] h-[50vh] bg-emerald-100 rounded-full blur-[100px] opacity-60"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[50vh] h-[50vh] bg-blue-100 rounded-full blur-[100px] opacity-60"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-white p-6 sm:p-10 rounded-[2rem] shadow-2xl shadow-slate-200 border border-slate-100 relative z-10"
            >
                <div className="flex justify-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                        <Recycle className="h-8 w-8 text-white" />
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {view === 'initial' && (
                        <motion.div
                            key="initial"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            <div className="text-center mb-10">
                                <h2 className="text-3xl font-bold text-slate-900 mb-3">Welcome Back</h2>
                                <p className="text-slate-500">Log in to track your impact and earn credits.</p>
                            </div>
                            
                            <div className="space-y-4">
                                <button
                                    onClick={handleGoogleLogin}
                                    disabled={isLoading}
                                    className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-white border border-slate-200 rounded-xl font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <GoogleLogo />}
                                    <span>Continue with Google</span>
                                </button>

                                <div className="relative py-2">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t border-slate-100"></span>
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-white px-2 text-slate-400 font-medium">Or continue with</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setView('login')}
                                    className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
                                >
                                    <Mail className="w-5 h-5" />
                                    <span>Sign in with Email</span>
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {view === 'login' && (
                        <motion.div
                            key="login"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <button 
                                onClick={goBack}
                                className="mb-6 flex items-center text-sm text-slate-500 hover:text-slate-900 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4 mr-1" /> Back
                            </button>

                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">Sign In</h2>
                                <p className="text-slate-500 text-sm">Enter your credentials to access your account.</p>
                            </div>

                            <form onSubmit={handleEmailLogin} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                                    <input 
                                        type="email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-slate-900 font-medium placeholder:text-slate-400"
                                        placeholder="you@campus.edu"
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-1.5">
                                        <label className="block text-sm font-medium text-slate-700">Password</label>
                                        <button 
                                            type="button"
                                            onClick={() => setView('forgot-password')}
                                            className="text-xs font-medium text-emerald-600 hover:text-emerald-700 hover:underline"
                                        >
                                            Forgot password?
                                        </button>
                                    </div>
                                    <input 
                                        type="password" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-slate-900 font-medium placeholder:text-slate-400"
                                        placeholder="••••••••"
                                    />
                                </div>

                                {error && (
                                    <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4 shrink-0" />
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            Sign In <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    )}

                    {view === 'forgot-password' && (
                        <motion.div
                            key="forgot-password"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <button 
                                onClick={goBack}
                                className="mb-6 flex items-center text-sm text-slate-500 hover:text-slate-900 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4 mr-1" /> Back to Login
                            </button>

                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">Reset Password</h2>
                                <p className="text-slate-500 text-sm">Enter your email and we'll send you a link to reset your password.</p>
                            </div>

                            {successMsg ? (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-8"
                                >
                                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-4">
                                        <CheckCircle2 className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">Check your email</h3>
                                    <p className="text-slate-500 text-sm mb-6">{successMsg}</p>
                                    <button 
                                        onClick={() => setView('login')}
                                        className="text-emerald-600 font-bold hover:underline"
                                    >
                                        Return to Sign In
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleResetPassword} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                                        <input 
                                            type="email" 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-slate-900 font-medium placeholder:text-slate-400"
                                            placeholder="you@campus.edu"
                                        />
                                    </div>

                                    {error && (
                                        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
                                            <AlertCircle className="w-4 h-4 shrink-0" />
                                            {error}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/10 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <>
                                                <Key className="w-4 h-4" /> Send Reset Link
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {view === 'initial' && (
                    <div className="mt-8 text-center">
                        <p className="text-xs text-slate-400">
                            By continuing, you agree to our <a href="#" className="underline hover:text-emerald-600">Terms</a> and <a href="#" className="underline hover:text-emerald-600">Privacy Policy</a>.
                        </p>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default Auth;
