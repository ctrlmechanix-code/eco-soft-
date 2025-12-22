
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, ArrowUpRight, MapPin, Clock, X, Heart } from 'lucide-react';

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

const positions = [
    { title: "Senior Frontend Engineer", type: "Full-time", location: "Remote / Campus", dept: "Engineering" },
    { title: "Sustainability Officer", type: "Part-time", location: "On-Campus", dept: "Operations" },
    { title: "Community Manager", type: "Full-time", location: "Remote", dept: "Marketing" },
    { title: "Logistics Coordinator", type: "Contract", location: "On-Campus", dept: "Operations" },
];

const Careers = () => {
    const [selectedJob, setSelectedJob] = useState<string | null>(null);

    return (
        <PageWrapper>
            <div className="text-center max-w-2xl mx-auto mb-20">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Work with purpose.</h1>
                <p className="text-xl text-slate-500">
                    Join the team building the future of campus sustainability. We are looking for passionate individuals to help us scale ECO-SORT.
                </p>
            </div>

            <div className="space-y-4">
                {positions.map((job, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setSelectedJob(job.title)}
                        className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{job.title}</h3>
                                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200">{job.dept}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-slate-500">
                                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {job.type}</span>
                                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                            Apply Now <ArrowUpRight className="w-4 h-4" />
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-20 p-8 bg-slate-50 rounded-3xl text-center border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Don't see a fit?</h3>
                <p className="text-slate-500 mb-6">We are always looking for talent. Send us your resume.</p>
                <a 
                    href="mailto:hello@ecosort.edu"
                    className="inline-block px-6 py-2 bg-white border border-slate-300 rounded-lg font-medium text-slate-700 hover:border-slate-400 transition-colors"
                >
                    Email General Application
                </a>
            </div>

            {/* Application Status Modal */}
            <AnimatePresence>
                {selectedJob && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center px-4"
                    >
                        <div 
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                            onClick={() => setSelectedJob(null)}
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-slate-100 text-center"
                        >
                            <button 
                                onClick={() => setSelectedJob(null)}
                                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            
                            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-5 text-emerald-500">
                                <Heart className="w-8 h-8 fill-current" />
                            </div>
                            
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">Thanks for the enthusiasm!</h3>
                            <p className="text-slate-500 mb-8 leading-relaxed">
                                We are thrilled that you're interested in the <span className="font-semibold text-slate-800">{selectedJob}</span> role. However, we aren't actively hiring for this specific position at the moment. Please keep an eye on this page for future updates as we grow!
                            </p>
                            
                            <button
                                onClick={() => setSelectedJob(null)}
                                className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10"
                            >
                                Got it
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </PageWrapper>
    );
};

export default Careers;
