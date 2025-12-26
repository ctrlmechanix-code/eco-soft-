
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Leaf, Globe, Recycle, Wind, Search, Sparkles, Loader2, ExternalLink, X, LogIn } from 'lucide-react';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import { GoogleGenAI, HarmBlockThreshold, HarmCategory } from '@google/genai';

const PageWrapper = ({ children }: { children?: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8"
    >
        {children}
    </motion.div>
);

const Sustainability = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [query, setQuery] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [sources, setSources] = useState<{title: string, uri: string}[]>([]);
    const [loading, setLoading] = useState(false);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Auth Check
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        if (!isAuthenticated) {
            setShowLoginPrompt(true);
            return;
        }

        if (!query.trim()) return;

        setLoading(true);
        setAiResponse('');
        setSources([]);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: query,
                config: {
                    temperature: 0.2,
                    // maxOutputTokens removed to ensure complete answers for complex regulations.
                    // Length is controlled by system instruction "OPTIMAL ANSWER QUALITY".
                    thinkingConfig: { thinkingBudget: 1024 },
                    systemInstruction: `You are an expert E-Waste Regulation and Safety Assistant. 
                    Your mission is to provide accurate, up-to-date information regarding electronic waste laws, recycling guidelines, hazardous material handling, and environmental sustainability.
                    
                    CRITICAL RULES:
                    1. DOMAIN STRICTNESS: Answer ONLY questions directly related to e-waste, recycling, environmental regulations, hardware disposal, and sustainability.
                    2. OFF-TOPIC RESPONSE: If the user asks about anything unrelated (e.g., general life advice, coding, math, sports), reply ONLY with: "Use our Chatbot for general queries. I am here to help with e-waste regulations. Thanks."
                    3. OPTIMAL ANSWER QUALITY: Provide answers that are complete and comprehensive regarding the law/regulation but remain concise and to the point. Do not leave out critical legal details, but avoid unnecessary filler. Target a professional, informative tone.
                    4. FORMATTING: Use Markdown. Use **bold** for laws/regulations, *lists* for steps, and ### headers for clarity.
                    5. SAFETY: Always include safety warnings when discussing hazardous materials (batteries, CRTs).`,
                    tools: [{ googleSearch: {} }],
                    safetySettings: [
                        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
                        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
                        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
                        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
                    ]
                },
            });

            if (response.text) {
                setAiResponse(response.text);
            }

            const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
            if (chunks) {
                const webs = chunks
                    .filter((c: any) => c.web)
                    .map((c: any) => ({ title: c.web.title, uri: c.web.uri }));
                setSources(webs);
            }

        } catch (error) {
            console.error("AI Error:", error);
            setAiResponse("Sorry, I couldn't fetch that information right now. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageWrapper>
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
                <div>
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-sm font-medium mb-6"
                    >
                        <Leaf className="w-4 h-4" /> Green Impact Report 2024
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                        Measuring what matters for our planet.
                    </h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                        We track every gram of e-waste diverted from landfills. Our transparent reporting ensures that your efforts translate into real-world environmental protection.
                    </p>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
                            <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-1"><AnimatedCounter to={1450} />kg</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">CO₂ Offset</p>
                        </div>
                        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
                            <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-1"><AnimatedCounter to={85} />%</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">Recovery Rate</p>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <div className="aspect-square bg-gradient-to-br from-emerald-100 to-teal-50 dark:from-emerald-900 dark:to-teal-900 rounded-[3rem] overflow-hidden relative">
                         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-80 mix-blend-overlay"></div>
                         <div className="absolute bottom-8 left-8 right-8 bg-white/90 dark:bg-black/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/50 dark:border-white/10">
                             <div className="flex items-start gap-4">
                                 <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                                     <Globe className="w-6 h-6" />
                                 </div>
                                 <div>
                                     <h4 className="font-bold text-slate-900 dark:text-white">Global Standard</h4>
                                     <p className="text-sm text-slate-500 dark:text-slate-400">Adhering to WEEE regulations and R2 certification standards for safe disposal.</p>
                                 </div>
                             </div>
                         </div>
                    </div>
                </div>
            </div>

            {/* AI Search Grounding Section */}
            <div className="mb-24 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-900 dark:to-black rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden text-white shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                
                <div className="relative z-10 max-w-3xl mx-auto text-center">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
                        <Sparkles className="w-3 h-3" /> Live Eco-Intel
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ask about E-Waste & Regulations</h2>
                    <p className="text-slate-300 mb-8 text-lg">Use our AI assistant to find the latest recycling laws, hazardous material info, or local news grounded in real-time Google Search data.</p>
                    
                    <form onSubmit={handleSearch} className="relative mb-10">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input 
                                type="text" 
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="e.g., What are the e-waste rules for lithium batteries in 2024?"
                                className="w-full pl-12 pr-32 py-4 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-slate-400 focus:bg-white/20 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all backdrop-blur-sm"
                            />
                            <button 
                                type="submit" 
                                disabled={loading || !query.trim()}
                                className="absolute right-2 top-2 bottom-2 px-6 bg-emerald-600 hover:bg-emerald-50 disabled:bg-slate-700 text-white rounded-xl font-bold transition-colors flex items-center justify-center"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Search'}
                            </button>
                        </div>
                    </form>

                    {aiResponse && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10 text-left"
                        >
                            <div className="prose prose-invert max-w-none text-slate-200">
                                <ReactMarkdown 
                                    components={{
                                        h1: ({node, ...props}) => <h3 className="text-xl font-bold text-white mt-6 mb-3" {...props} />,
                                        h2: ({node, ...props}) => <h4 className="text-lg font-bold text-white mt-5 mb-2" {...props} />,
                                        h3: ({node, ...props}) => <h5 className="text-base font-bold text-emerald-400 mt-4 mb-2" {...props} />,
                                        p: ({node, ...props}) => <p className="mb-4 leading-relaxed text-slate-300" {...props} />,
                                        ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4 space-y-2 text-slate-300" {...props} />,
                                        li: ({node, ...props}) => <li className="pl-1" {...props} />,
                                        a: ({node, ...props}) => <a className="text-emerald-400 hover:text-emerald-300 underline" target="_blank" rel="noopener noreferrer" {...props} />,
                                        strong: ({node, ...props}) => <strong className="text-white font-bold" {...props} />,
                                    }}
                                >
                                    {aiResponse}
                                </ReactMarkdown>
                            </div>
                            
                            {sources.length > 0 && (
                                <div className="mt-6 pt-6 border-t border-white/10">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Sources</p>
                                    <div className="flex flex-wrap gap-3">
                                        {sources.map((source, i) => (
                                            <a 
                                                key={i} 
                                                href={source.uri} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-emerald-300 transition-colors border border-white/5 hover:border-emerald-500/30 truncate max-w-full"
                                            >
                                                <ExternalLink className="w-3 h-3 shrink-0" />
                                                <span className="truncate max-w-[200px]">{source.title}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </div>
            </div>

            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Our 2030 Goals</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-emerald-600 text-white p-8 rounded-3xl">
                    <Recycle className="w-8 h-8 mb-6 text-emerald-200" />
                    <h3 className="text-2xl font-bold mb-3">Zero Landfill</h3>
                    <p className="text-emerald-100">Ensure 0% of campus electronics end up in general waste streams.</p>
                </div>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl">
                    <Wind className="w-8 h-8 mb-6 text-blue-500 dark:text-blue-400" />
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Carbon Negative</h3>
                    <p className="text-slate-500 dark:text-slate-400">Offset more carbon than our logistics operations produce.</p>
                </div>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl">
                    <Leaf className="w-8 h-8 mb-6 text-green-500 dark:text-green-400" />
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Education</h3>
                    <p className="text-slate-500 dark:text-slate-400">Train 10,000 students on sustainable hardware lifecycles.</p>
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
                            
                            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-emerald-600 dark:text-emerald-400 rotate-[-10deg]">
                                <Sparkles className="w-8 h-8" />
                            </div>
                            
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Unlock Intelligent Insights</h3>
                            <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                                To access real-time regulatory data and ask complex questions about e-waste, please sign in to your account. It's free and helps us track your positive impact!
                            </p>
                            
                            <button
                                onClick={() => navigate('/auth', { state: { from: location } })}
                                className="w-full py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-slate-200 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
                            >
                                <LogIn className="w-4 h-4" /> Sign In to Search
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </PageWrapper>
    );
};

export default Sustainability;
