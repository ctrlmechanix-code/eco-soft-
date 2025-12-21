
import React from 'react';
import { motion } from 'framer-motion';
import { collectionPoints } from '../data/mockData';
import { MapPin, Clock, ArrowUpRight } from 'lucide-react';

const PageWrapper = ({ children }: { children?: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 h-[calc(100vh-80px)]"
    >
        {children}
    </motion.div>
);

const CollectionPoints = () => {
    return (
        <PageWrapper>
            <div className="flex flex-col lg:flex-row gap-8 h-full">
                {/* Sidebar List */}
                <div className="lg:w-1/3 flex flex-col h-full">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-slate-900">Locations</h1>
                        <p className="text-slate-500 mt-1">Select a drop-off point near you.</p>
                    </div>
                    
                    <div className="flex-grow overflow-y-auto pr-2 space-y-4">
                        {collectionPoints.map((point) => (
                            <motion.div
                                key={point.id}
                                whileHover={{ scale: 1.02 }}
                                className="group bg-white p-5 rounded-2xl border border-slate-200 cursor-pointer hover:border-emerald-500 hover:shadow-md transition-all"
                            >
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-slate-900 text-lg group-hover:text-emerald-600 transition-colors">{point.name}</h3>
                                    <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500" />
                                </div>
                                <div className="mt-3 space-y-2">
                                    <div className="flex items-start gap-2 text-sm text-slate-600">
                                        <MapPin className="w-4 h-4 mt-0.5 text-slate-400" />
                                        {point.location}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <Clock className="w-4 h-4 text-slate-400" />
                                        {point.hours}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Map Area */}
                <div className="lg:w-2/3 h-96 lg:h-full bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 relative shadow-inner">
                     <img 
                        src="https://loremflickr.com/1200/800/city,map/all?lock=456" 
                        alt="Interactive Map" 
                        className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg text-xs font-semibold shadow-sm text-slate-600">
                        Interactive Map
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default CollectionPoints;
