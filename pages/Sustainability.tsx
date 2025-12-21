import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Globe, Recycle, Wind } from 'lucide-react';
import AnimatedCounter from '../components/ui/AnimatedCounter';

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
    return (
        <PageWrapper>
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
                <div>
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-medium mb-6"
                    >
                        <Leaf className="w-4 h-4" /> Green Impact Report 2024
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                        Measuring what matters for our planet.
                    </h1>
                    <p className="text-lg text-slate-500 mb-8 leading-relaxed">
                        We track every gram of e-waste diverted from landfills. Our transparent reporting ensures that your efforts translate into real-world environmental protection.
                    </p>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="p-6 bg-white border border-slate-200 rounded-2xl">
                            <h3 className="text-4xl font-bold text-slate-900 mb-1"><AnimatedCounter to={1450} />kg</h3>
                            <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">CO₂ Offset</p>
                        </div>
                        <div className="p-6 bg-white border border-slate-200 rounded-2xl">
                            <h3 className="text-4xl font-bold text-slate-900 mb-1"><AnimatedCounter to={85} />%</h3>
                            <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">Recovery Rate</p>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <div className="aspect-square bg-gradient-to-br from-emerald-100 to-teal-50 rounded-[3rem] overflow-hidden relative">
                         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-80 mix-blend-overlay"></div>
                         <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/50">
                             <div className="flex items-start gap-4">
                                 <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 shrink-0">
                                     <Globe className="w-6 h-6" />
                                 </div>
                                 <div>
                                     <h4 className="font-bold text-slate-900">Global Standard</h4>
                                     <p className="text-sm text-slate-500">Adhering to WEEE regulations and R2 certification standards for safe disposal.</p>
                                 </div>
                             </div>
                         </div>
                    </div>
                </div>
            </div>

            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Our 2030 Goals</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-emerald-600 text-white p-8 rounded-3xl">
                    <Recycle className="w-8 h-8 mb-6 text-emerald-200" />
                    <h3 className="text-2xl font-bold mb-3">Zero Landfill</h3>
                    <p className="text-emerald-100">Ensure 0% of campus electronics end up in general waste streams.</p>
                </div>
                <div className="bg-white border border-slate-200 p-8 rounded-3xl">
                    <Wind className="w-8 h-8 mb-6 text-blue-500" />
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">Carbon Negative</h3>
                    <p className="text-slate-500">Offset more carbon than our logistics operations produce.</p>
                </div>
                <div className="bg-white border border-slate-200 p-8 rounded-3xl">
                    <Leaf className="w-8 h-8 mb-6 text-green-500" />
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">Education</h3>
                    <p className="text-slate-500">Train 10,000 students on sustainable hardware lifecycles.</p>
                </div>
            </div>
        </PageWrapper>
    );
};

export default Sustainability;