
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { collectionPoints as mockPoints } from '../data/mockData';
import { CollectionPoint, CollectionPointMessage } from '../types';
import { MapPin, Clock, ArrowUpRight, Phone, Mail, MessageSquare, ArrowLeft, Send, CheckCircle2, X, LogIn } from 'lucide-react';

const PageWrapper = ({ children }: { children?: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto pt-12 pb-24 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-80px)]"
    >
        {children}
    </motion.div>
);

const CollectionPoints = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    
    const [points, setPoints] = useState<CollectionPoint[]>([]);
    const [selectedPoint, setSelectedPoint] = useState<CollectionPoint | null>(null);
    const [chatMessage, setChatMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [showSentSuccess, setShowSentSuccess] = useState(false);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);

    // Load Data
    useEffect(() => {
        const storedPoints = JSON.parse(localStorage.getItem('collection_points') || '[]');
        if (storedPoints.length > 0) {
            setPoints(storedPoints);
        } else {
            setPoints(mockPoints);
            // Initialize storage to ensure admin sees data if they visit first
            localStorage.setItem('collection_points', JSON.stringify(mockPoints));
        }
    }, []);

    // Sync state with URL params
    useEffect(() => {
        if (points.length > 0) {
            const pointId = searchParams.get('point');
            if (pointId) {
                const point = points.find(p => p.id.toString() === pointId);
                if (point) {
                    setSelectedPoint(point);
                } else {
                    setSelectedPoint(null);
                }
            } else {
                setSelectedPoint(null);
            }
        }
    }, [searchParams, points]);

    const handlePointClick = (point: CollectionPoint) => {
        setSearchParams({ point: point.id.toString() });
    };

    const handleBack = () => {
        setSearchParams({});
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Auth Check
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        if (!isAuthenticated) {
            setShowLoginPrompt(true);
            return;
        }

        if (!chatMessage.trim() || !selectedPoint) return;

        setIsSending(true);
        
        // Simulate sending
        setTimeout(() => {
            const newMessage: CollectionPointMessage & { isReply: boolean } = {
                id: `MSG-${Date.now()}`,
                pointId: selectedPoint.id,
                pointName: selectedPoint.name,
                text: chatMessage,
                date: new Date().toISOString(),
                isReply: false
            };

            const existingMessages = JSON.parse(localStorage.getItem('cp_messages') || '[]');
            localStorage.setItem('cp_messages', JSON.stringify([newMessage, ...existingMessages]));

            setIsSending(false);
            setChatMessage('');
            setShowSentSuccess(true);
            setTimeout(() => setShowSentSuccess(false), 3000);

            // Trigger a simulated reply for later
            setTimeout(() => {
                const adminReply: CollectionPointMessage & { isReply: boolean, unread: boolean } = {
                    id: `REPLY-${Date.now()}`,
                    pointId: selectedPoint.id,
                    pointName: selectedPoint.name,
                    text: "Hello! We received your inquiry regarding drop-offs. Please note we are open today until 6 PM. Looking forward to your visit!",
                    date: new Date().toISOString(),
                    isReply: true,
                    unread: true
                };
                const withReply = [adminReply, ...JSON.parse(localStorage.getItem('cp_messages') || '[]')];
                localStorage.setItem('cp_messages', JSON.stringify(withReply));
                localStorage.setItem('unread_messages', 'true');
            }, 6000);
        }, 1000);
    };

    const openMap = (url: string) => {
        window.open(url, '_blank');
    };

    return (
        <PageWrapper>
            <div className="flex flex-col lg:flex-row gap-8 h-full">
                {/* Sidebar List */}
                <div className={`lg:w-1/3 flex flex-col h-full transition-all duration-300 ${selectedPoint ? 'hidden lg:flex' : 'flex'}`}>
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Locations</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">Select a drop-off point near you.</p>
                    </div>
                    
                    <div className="flex-grow overflow-y-auto pr-2 space-y-4 max-h-[70vh]">
                        {points.filter(p => p.status !== 'Closed').map((point) => (
                            <motion.div
                                key={point.id}
                                whileHover={{ scale: 1.02 }}
                                onClick={() => handlePointClick(point)}
                                className={`group p-5 rounded-2xl border cursor-pointer transition-all ${
                                    selectedPoint?.id === point.id 
                                    ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 shadow-md ring-1 ring-emerald-200 dark:ring-emerald-800' 
                                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md'
                                }`}
                            >
                                <div className="flex justify-between items-start">
                                    <h3 className={`font-bold text-lg transition-colors ${selectedPoint?.id === point.id ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400'}`}>
                                        {point.name}
                                    </h3>
                                    <ArrowUpRight className={`w-5 h-5 transition-colors ${selectedPoint?.id === point.id ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-600 group-hover:text-emerald-500 dark:group-hover:text-emerald-400'}`} />
                                </div>
                                <div className="mt-3 space-y-2">
                                    <div className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                                        <MapPin className="w-4 h-4 mt-0.5 text-slate-400 dark:text-slate-500" />
                                        {point.location}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                        <Clock className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                                        {point.hours}
                                    </div>
                                    {point.status === 'Maintenance' && (
                                        <span className="inline-block px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-700 rounded-md">Maintenance</span>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Detail View or Map Area */}
                <div className={`lg:w-2/3 h-full flex flex-col gap-6 ${!selectedPoint ? 'hidden lg:flex' : 'flex'}`}>
                    <AnimatePresence mode="wait">
                        {selectedPoint ? (
                            <motion.div
                                key="detail"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="bg-white dark:bg-slate-900 rounded-3xl md:rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl p-6 md:p-8 lg:p-10 flex flex-col h-full overflow-hidden"
                            >
                                <button 
                                    onClick={handleBack}
                                    className="lg:hidden flex items-center gap-2 text-slate-400 hover:text-slate-900 dark:hover:text-white mb-6 transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" /> Back to List
                                </button>

                                <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
                                    <div className="flex-grow">
                                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{selectedPoint.name}</h2>
                                        <div className="flex flex-wrap gap-4 text-slate-500 dark:text-slate-400">
                                            <span className="flex items-center gap-1.5 text-sm">
                                                <MapPin className="w-4 h-4 text-emerald-500" /> {selectedPoint.location}
                                            </span>
                                            <span className="flex items-center gap-1.5 text-sm">
                                                <Clock className="w-4 h-4 text-blue-500" /> {selectedPoint.hours}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <button 
                                        onClick={() => openMap(selectedPoint.mapUrl)}
                                        className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl border border-emerald-100 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-all flex items-center gap-2 font-bold shadow-sm"
                                        title="Open in Google Maps"
                                    >
                                        <MapPin className="w-6 h-6" />
                                        <span className="text-sm">Open Maps</span>
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                    <div className="space-y-6">
                                        <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Contact Information</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                                                <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center text-slate-400 dark:text-slate-500 shadow-sm">
                                                    <Phone className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Call Us</p>
                                                    <p className="text-sm font-bold text-slate-900 dark:text-white">{selectedPoint.phone}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                                                <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center text-slate-400 dark:text-slate-500 shadow-sm">
                                                    <Mail className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Email Us</p>
                                                    <p className="text-sm font-bold text-slate-900 dark:text-white">{selectedPoint.email}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Real Location Map Placeholder */}
                                    <div className="h-full min-h-[150px] bg-slate-100 dark:bg-slate-800 rounded-3xl overflow-hidden relative border border-slate-200 dark:border-slate-700">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            frameBorder="0"
                                            scrolling="no"
                                            marginHeight={0}
                                            marginWidth={0}
                                            src={`https://maps.google.com/maps?q=${selectedPoint.coordinates.lat},${selectedPoint.coordinates.lng}&z=15&output=embed`}
                                            className="w-full h-full opacity-90 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0"
                                            title="Point Location"
                                        ></iframe>
                                    </div>
                                </div>

                                {/* Chatbox */}
                                <div className="mt-auto pt-8 border-t border-slate-100 dark:border-slate-800">
                                    <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <MessageSquare className="w-4 h-4" /> Message this Center
                                    </h3>
                                    
                                    <form onSubmit={handleSendMessage} className="relative group">
                                        <textarea 
                                            value={chatMessage}
                                            onChange={(e) => setChatMessage(e.target.value)}
                                            placeholder="Ask about collection items, status, or help..."
                                            className="w-full px-5 py-4 pr-14 rounded-[1.5rem] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-none"
                                            rows={2}
                                        />
                                        <button 
                                            type="submit"
                                            disabled={!chatMessage.trim() && !isSending} // Allow click if sending (to show spinner) or prompt
                                            className="absolute right-3 bottom-3 p-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl hover:bg-emerald-600 dark:hover:bg-emerald-400 disabled:bg-slate-200 dark:disabled:bg-slate-700 disabled:text-slate-400 dark:disabled:text-slate-500 transition-all shadow-lg active:scale-95"
                                        >
                                            {isSending ? (
                                                <motion.div 
                                                    animate={{ rotate: 360 }}
                                                    transition={{ repeat: Infinity, duration: 1 }}
                                                >
                                                    <Send className="w-5 h-5" />
                                                </motion.div>
                                            ) : (
                                                <Send className="w-5 h-5" />
                                            )}
                                        </button>
                                    </form>
                                    
                                    <AnimatePresence>
                                        {showSentSuccess && (
                                            <motion.p 
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-2 flex items-center gap-1 justify-center"
                                            >
                                                <CheckCircle2 className="w-3 h-3" /> Message sent! Check your profile for updates.
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="map"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-96 lg:h-full bg-slate-100 dark:bg-slate-800 rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-slate-700 relative shadow-inner group"
                            >
                                <iframe
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    scrolling="no"
                                    marginHeight={0}
                                    marginWidth={0}
                                    // Defaulting to NIT Patna as the central location
                                    src="https://maps.google.com/maps?q=National+Institute+of+Technology+Patna&t=&z=16&ie=UTF8&iwloc=&output=embed"
                                    className="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                                    title="Campus Map"
                                ></iframe>
                                
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none" />
                                <div className="absolute bottom-8 left-8 right-8 text-white pointer-events-none">
                                    <h3 className="text-xl font-bold mb-1">Campus Interactive Map</h3>
                                    <p className="text-white/80 text-sm">Select a point on the left to view specific contact details and start a direct inquiry.</p>
                                </div>
                                <div className="absolute top-6 right-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold shadow-sm text-slate-700 dark:text-slate-200 uppercase tracking-widest border border-slate-100 dark:border-slate-800 pointer-events-none">
                                    Live View
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Login Prompt Modal */}
            <AnimatePresence>
                {showLoginPrompt && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                            onClick={() => setShowLoginPrompt(false)}
                        />
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 text-center border border-slate-100 dark:border-slate-800"
                        >
                            <button 
                                onClick={() => setShowLoginPrompt(false)}
                                className="absolute top-4 right-4 p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                            
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600 dark:text-blue-400 rotate-[-10deg]">
                                <LogIn className="w-8 h-8" />
                            </div>
                            
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Join the Conversation</h3>
                            <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                                You need to be logged in to send messages to collection points. It only takes a moment!
                            </p>
                            
                            <button
                                onClick={() => navigate('/auth', { state: { from: location } })}
                                className="w-full py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-slate-200 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                            >
                                Sign In to Chat
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </PageWrapper>
    );
};

export default CollectionPoints;
