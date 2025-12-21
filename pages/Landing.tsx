
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Recycle, Check, Leaf, Zap, BarChart3, Globe, ShieldCheck } from 'lucide-react';
import { impactStats } from '../data/mockData';
import AnimatedCounter from '../components/ui/AnimatedCounter';

const PageWrapper = ({ children }: { children?: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.6 }}
    className="bg-white"
  >
    {children}
  </motion.div>
);

const Landing = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      {/* Premium Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
             <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gradient-to-br from-emerald-100/50 to-teal-50/50 rounded-full blur-3xl opacity-70 mix-blend-multiply" />
             <div className="absolute top-40 -left-20 w-[400px] h-[400px] bg-gradient-to-tr from-blue-100/50 to-indigo-50/50 rounded-full blur-3xl opacity-70 mix-blend-multiply" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-medium mb-8"
                >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Smart Waste Management 2.0
                </motion.div>
                
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.1]"
                >
                    Sustainability meets <br className="hidden md:block"/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Intelligent Action.</span>
                </motion.h1>
                
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed"
                >
                    Transform how your campus handles e-waste. An elegant, data-driven platform to report, recover, and reward responsible disposal.
                </motion.p>
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <button 
                        onClick={() => navigate('/categories')}
                        className="px-8 py-4 bg-slate-900 text-white rounded-full font-semibold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2"
                    >
                        Start Reporting <ArrowRight className="w-5 h-5" />
                    </button>
                    <button 
                        onClick={() => navigate('/dashboard')}
                        className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-semibold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                    >
                        View Dashboard
                    </button>
                </motion.div>
            </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="py-24 bg-slate-50/50">
        <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Orchestrate your impact</h2>
                <p className="text-slate-500 max-w-xl mx-auto">Everything you need to manage the lifecycle of electronic devices on campus.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1: Large */}
                <motion.div 
                    whileHover={{ y: -5 }}
                    className="md:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-200/60 relative overflow-hidden group"
                >
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 text-emerald-600">
                            <Zap className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">Identify & Decide</h3>
                        <p className="text-slate-500 max-w-md">Our intelligent workflow guides you to the perfect disposal method—whether it's repair, donation, or recycling—in seconds.</p>
                    </div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-l from-emerald-50 to-transparent rounded-full blur-3xl group-hover:bg-emerald-100/50 transition-colors" />
                </motion.div>

                {/* Card 2: Tall */}
                <motion.div 
                    whileHover={{ y: -5 }}
                    className="md:row-span-2 bg-slate-900 p-8 rounded-3xl shadow-xl relative overflow-hidden text-white group"
                >
                    <div className="relative z-10 h-full flex flex-col">
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6">
                            <BarChart3 className="w-6 h-6 text-emerald-400" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">Real-time Analytics</h3>
                        <p className="text-slate-400 mb-8 flex-grow">Track CO₂ reduction, device recovery rates, and campus-wide participation trends instantly.</p>
                        
                        <div className="mt-auto bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                             <div className="flex justify-between items-end">
                                 <div>
                                     <p className="text-xs text-slate-400 mb-1">Total Saved</p>
                                     <p className="text-2xl font-bold">{impactStats.co2Saved}kg</p>
                                 </div>
                                 <div className="h-8 w-16 bg-emerald-500/20 rounded flex items-end gap-1 px-1 pb-1">
                                     <div className="w-1/3 h-1/2 bg-emerald-400 rounded-sm"></div>
                                     <div className="w-1/3 h-3/4 bg-emerald-400 rounded-sm"></div>
                                     <div className="w-1/3 h-full bg-emerald-400 rounded-sm"></div>
                                 </div>
                             </div>
                        </div>
                    </div>
                </motion.div>

                {/* Card 3 */}
                <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/60"
                >
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                        <Globe className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Campus Collection</h3>
                    <p className="text-slate-500 text-sm">Interactive maps to find the nearest drop-off points.</p>
                </motion.div>

                {/* Card 4 */}
                <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/60"
                >
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-6 text-amber-600">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Verified Disposal</h3>
                    <p className="text-slate-500 text-sm">Ensure your data is safe and disposal adheres to regulations.</p>
                </motion.div>
            </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100">
                <div className="text-center px-4">
                    <p className="text-4xl md:text-5xl font-bold text-slate-900 mb-2"><AnimatedCounter to={impactStats.totalDevices} /></p>
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Devices Processed</p>
                </div>
                <div className="text-center px-4">
                    <p className="text-4xl md:text-5xl font-bold text-slate-900 mb-2"><AnimatedCounter to={impactStats.devicesRecycled} /></p>
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Recycled</p>
                </div>
                <div className="text-center px-4">
                    <p className="text-4xl md:text-5xl font-bold text-slate-900 mb-2"><AnimatedCounter to={impactStats.co2Saved} /></p>
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Kg CO₂ Saved</p>
                </div>
                <div className="text-center px-4">
                    <p className="text-4xl md:text-5xl font-bold text-slate-900 mb-2"><AnimatedCounter to={impactStats.treesEquivalent} /></p>
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Trees Planted</p>
                </div>
            </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
          <div className="container mx-auto px-6 max-w-5xl">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-[2.5rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                  <div className="relative z-10">
                      <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to make an impact?</h2>
                      <p className="text-emerald-50 text-lg mb-10 max-w-2xl mx-auto">Join thousands of students and staff contributing to a greener campus ecosystem today.</p>
                      <button 
                        onClick={() => navigate('/categories')}
                        className="px-10 py-4 bg-white text-emerald-700 rounded-full font-bold text-lg hover:bg-emerald-50 transition-all shadow-lg"
                      >
                          Get Started Now
                      </button>
                  </div>
              </div>
          </div>
      </section>
    </PageWrapper>
  );
};

export default Landing;
