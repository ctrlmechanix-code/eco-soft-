
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Recycle, Zap, BarChart3, Globe, ShieldCheck, Quote, ChevronDown, ChevronUp, Calendar, Gift, Users, Building2, Sparkles, ArrowUpRight, Smartphone, Cloud, TreeDeciduous } from 'lucide-react';
import { impactStats, blogPosts, mockTestimonials } from '../data/mockData';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import type { Testimonial } from '../types';

const PageWrapper = ({ children }: { children?: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.6 }}
    className="bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-x-hidden"
  >
    {children}
  </motion.div>
);

const LogoMarquee = () => {
    const departments = [
        "Engineering Faculty", "Student Affairs", "School of Architecture", "IT Services", "Facility Management", 
        "Science Labs", "Main Library", "Residential Halls", "Alumni Association", "Green Club"
    ];

    return (
        <div className="w-full overflow-hidden flex relative z-10 opacity-60 dark:opacity-40 grayscale hover:grayscale-0 transition-all duration-500 py-4">
            <motion.div 
                className="flex gap-16 items-center whitespace-nowrap"
                animate={{ x: [0, -1000] }}
                transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            >
                {[...departments, ...departments, ...departments].map((dept, i) => (
                    <div key={i} className="flex items-center gap-3 text-lg font-semibold text-slate-900 dark:text-white">
                        <Building2 className="w-5 h-5 text-slate-400" />
                        {dept}
                    </div>
                ))}
            </motion.div>
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent z-20 pointer-events-none" />
        </div>
    );
};

const SectionFade = ({ children, className }: { children?: React.ReactNode, className?: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={className}
    >
        {children}
    </motion.div>
);

const Landing = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
      const stored = JSON.parse(localStorage.getItem('testimonials') || '[]');
      if (stored.length > 0) {
          setTestimonials(stored.slice(0, 3));
      } else {
          setTestimonials(mockTestimonials);
          localStorage.setItem('testimonials', JSON.stringify(mockTestimonials));
      }
  }, []);

  const featuredPosts = blogPosts.slice(0, 3);

  const faqs = [
      { q: "What items are accepted?", a: "We accept smartphones, laptops, tablets, chargers, cables, batteries, and small peripherals like mice and keyboards. Large appliances currently require special pickup requests." },
      { q: "How are credits calculated?", a: "Credits are awarded based on the item type and its condition. Repairable items earn the most (70+ pts), followed by working donations (50 pts), and recyclables (30 pts)." },
      { q: "Where can I spend credits?", a: "Credits can be redeemed in our Rewards Marketplace for campus perks (like coffee vouchers), physical sustainable goods, or donated to plant trees." },
      { q: "Is data deletion guaranteed?", a: "Yes. While we recommend you wipe your device first, our R2-certified recycling partners perform military-grade data destruction on all storage devices received." }
  ];

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-40 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] max-w-7xl pointer-events-none opacity-60 dark:opacity-40">
             <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-emerald-200/40 dark:bg-emerald-500/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
             <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] bg-blue-200/40 dark:bg-blue-600/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-pulse" style={{ animationDuration: '10s' }} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/40 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/50 shadow-sm mb-12 backdrop-blur-md cursor-default ring-1 ring-slate-900/5 dark:ring-white/5"
                >
                    <span className="flex h-2.5 w-2.5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-500 dark:from-emerald-400 dark:via-teal-300 dark:to-blue-400 tracking-wide">
                        Smart Waste Management 2.0
                    </span>
                </motion.div>
                
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-8 leading-[1.1]"
                >
                    Sustainability meets <br className="hidden md:block"/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-500 dark:from-emerald-400 dark:via-teal-300 dark:to-blue-400">intelligent action.</span>
                </motion.h1>
                
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-xl text-slate-500 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
                >
                    The intelligent platform for campuses to track, recover, and reward responsible electronic disposal. Turn your old tech into new impact.
                </motion.p>
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <button 
                        onClick={() => navigate('/categories')}
                        className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold text-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-xl shadow-slate-900/10 hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2"
                    >
                        Start Reporting <ArrowRight className="w-5 h-5" />
                    </button>
                    <button 
                        onClick={() => navigate('/dashboard')}
                        className="px-8 py-4 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-full font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                    >
                        View Dashboard
                    </button>
                </motion.div>
            </div>
        </div>
      </section>

      {/* Floating Stats Glass Card */}
      <section className="container mx-auto px-6 max-w-7xl mt-24 xl:-mt-32 mb-32 relative z-20">
        <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="bg-white/70 dark:bg-slate-900/80 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-black/50 p-8 md:p-10 ring-1 ring-white/60 dark:ring-white/10"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12">
                
                {/* Stat 1 */}
                <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 group">
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-white dark:group-hover:bg-slate-700 transition-colors shadow-inner">
                        <Smartphone className="w-7 h-7 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div>
                        <p className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1">
                            <AnimatedCounter to={impactStats.totalDevices} />
                        </p>
                        <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Devices Processed</p>
                    </div>
                </div>

                {/* Stat 2 */}
                <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-emerald-50/40 dark:bg-emerald-900/10 border border-emerald-100/50 dark:border-emerald-800/20 shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 group">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-100/50 dark:bg-emerald-900/20 flex items-center justify-center mb-4 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/30 transition-colors shadow-inner">
                        <Recycle className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                        <p className="text-3xl lg:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight mb-1">
                            <AnimatedCounter to={impactStats.devicesRecycled} />
                        </p>
                        <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Recycled</p>
                    </div>
                </div>

                {/* Stat 3 */}
                <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-blue-50/40 dark:bg-blue-900/10 border border-blue-100/50 dark:border-blue-800/20 shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 group">
                    <div className="w-14 h-14 rounded-2xl bg-blue-100/50 dark:bg-blue-900/20 flex items-center justify-center mb-4 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors shadow-inner">
                        <Cloud className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <p className="text-3xl lg:text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight mb-1">
                            <AnimatedCounter to={impactStats.co2Saved} />
                        </p>
                        <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Kg CO₂ Saved</p>
                    </div>
                </div>

                {/* Stat 4 */}
                <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-amber-50/40 dark:bg-amber-900/10 border border-amber-100/50 dark:border-amber-800/20 shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 group">
                    <div className="w-14 h-14 rounded-2xl bg-amber-100/50 dark:bg-amber-900/20 flex items-center justify-center mb-4 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/30 transition-colors shadow-inner">
                        <TreeDeciduous className="w-7 h-7 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                        <p className="text-3xl lg:text-4xl font-extrabold text-amber-500 dark:text-amber-400 tracking-tight mb-1">
                            <AnimatedCounter to={impactStats.treesEquivalent} />
                        </p>
                        <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Trees Planted</p>
                    </div>
                </div>

            </div>
        </motion.div>
      </section>

      {/* Trusted By - Infinite Marquee */}
      <div className="py-12 mb-20 bg-gradient-to-r from-transparent via-white dark:via-slate-900 to-transparent">
          <div className="container mx-auto px-6 max-w-7xl">
              <p className="text-center text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-10">Powering Sustainability At</p>
              <LogoMarquee />
          </div>
      </div>

      {/* Bento Grid Features */}
      <SectionFade className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Orchestrate your impact</h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-lg leading-relaxed">
                    A comprehensive suite of tools designed to manage the full lifecycle of campus electronics seamlessly.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1: Large */}
                <motion.div 
                    whileHover={{ y: -5 }}
                    className="md:col-span-2 bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-black/50 relative overflow-hidden group ring-1 ring-slate-900/5 dark:ring-white/10"
                >
                    <div className="relative z-10">
                        <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mb-8 text-emerald-600 dark:text-emerald-400">
                            <Zap className="w-7 h-7" />
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Smart Classification</h3>
                        <p className="text-slate-500 dark:text-slate-400 max-w-md text-lg leading-relaxed">Our intelligent workflow guides you to the perfect disposal method—whether it's repair, donation, or recycling—in seconds.</p>
                    </div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-l from-emerald-50 to-transparent dark:from-emerald-900/20 rounded-full blur-3xl group-hover:bg-emerald-100/50 dark:group-hover:bg-emerald-900/30 transition-colors" />
                </motion.div>

                {/* Card 2: Tall */}
                <motion.div 
                    whileHover={{ y: -5 }}
                    className="md:row-span-2 bg-slate-900 dark:bg-black p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden text-white group ring-1 ring-white/10"
                >
                    <div className="relative z-10 h-full flex flex-col">
                        <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-8">
                            <BarChart3 className="w-7 h-7 text-emerald-400" />
                        </div>
                        <h3 className="text-3xl font-bold mb-4">Real-time Analytics</h3>
                        <p className="text-slate-400 mb-8 flex-grow text-lg leading-relaxed">Track CO₂ reduction, device recovery rates, and campus-wide participation trends instantly.</p>
                        
                        <div className="mt-auto bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 group-hover:bg-white/15 transition-colors">
                             <div className="flex justify-between items-end">
                                 <div>
                                     <p className="text-xs text-slate-400 mb-1 font-bold uppercase tracking-wider">Total Saved</p>
                                     <p className="text-3xl font-bold">{impactStats.co2Saved}kg</p>
                                 </div>
                                 <div className="h-10 w-20 bg-emerald-500/20 rounded-lg flex items-end gap-1 px-2 pb-2">
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
                    className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-black/50 ring-1 ring-slate-900/5 dark:ring-white/10"
                >
                    <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-8 text-blue-600 dark:text-blue-400">
                        <Globe className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Campus Logistics</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed">Interactive maps to optimize collection point routing and find drop-off zones easily.</p>
                </motion.div>

                {/* Card 4 */}
                <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-black/50 ring-1 ring-slate-900/5 dark:ring-white/10"
                >
                    <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center mb-8 text-amber-600 dark:text-amber-400">
                        <ShieldCheck className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Verified Disposal</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed">Ensure data security and R2v3 compliant recycling for all sensitive electronics.</p>
                </motion.div>
            </div>
        </div>
      </SectionFade>

      {/* How It Works */}
      <SectionFade className="py-24 bg-slate-50/50 dark:bg-slate-900/20">
          <div className="container mx-auto px-6 max-w-7xl">
              <div className="text-center mb-20">
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">The Recovery Lifecycle</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-lg">Simple, transparent, and rewarding.</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-12 relative">
                  {/* Connector Line - Subtler */}
                  <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent z-0 opacity-50"></div>

                  {[
                      { icon: Recycle, title: "Report Device", desc: "Select your item category and answer a few questions about its condition." },
                      { icon: Zap, title: "Get Recommendation", desc: "Our system instantly decides: Repair, Donate, or Recycle." },
                      { icon: Gift, title: "Earn Rewards", desc: "Drop it off at a designated point and receive Green Credits instantly." }
                  ].map((step, i) => (
                      <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                          <div className="w-24 h-24 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center mb-8 shadow-xl ring-1 ring-slate-900/5 dark:ring-white/10 relative group-hover:scale-110 transition-transform duration-300">
                              <span className="absolute -top-1 -right-1 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-sm ring-4 ring-slate-50 dark:ring-slate-900">{i + 1}</span>
                              <step.icon className="w-10 h-10 text-slate-700 dark:text-slate-200" />
                          </div>
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{step.title}</h3>
                          <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs text-base">{step.desc}</p>
                      </div>
                  ))}
              </div>
          </div>
      </SectionFade>

      {/* Testimonials */}
      <SectionFade className="py-24">
          <div className="container mx-auto px-6 max-w-7xl">
              <div className="flex justify-between items-end mb-16">
                  <div>
                      <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Community Impact</h2>
                      <p className="text-slate-500 dark:text-slate-400 text-lg">See how students and staff are driving change.</p>
                  </div>
                  <Link to="/testimonials" className="hidden sm:flex text-emerald-600 dark:text-emerald-400 font-bold hover:underline items-center gap-2 text-lg">
                      View all stories <ArrowRight className="w-5 h-5" />
                  </Link>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                  {testimonials.map((t) => (
                      <div key={t.id} className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2rem] relative group hover:-translate-y-2 transition-transform duration-300">
                          <Quote className="w-10 h-10 text-emerald-100 dark:text-emerald-900/30 absolute top-8 right-8" />
                          <div className="flex items-center gap-4 mb-6">
                              <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full bg-slate-200 dark:bg-slate-800" />
                              <div>
                                  <h4 className="font-bold text-slate-900 dark:text-white text-lg">{t.name}</h4>
                                  <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide">{t.role}</p>
                              </div>
                          </div>
                          <p className="text-slate-600 dark:text-slate-300 leading-relaxed relative z-10 text-lg italic">"{t.content}"</p>
                      </div>
                  ))}
              </div>
              
              <div className="mt-12 text-center sm:hidden">
                  <Link to="/testimonials" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline inline-flex items-center gap-1">
                      View all stories <ArrowRight className="w-4 h-4" />
                  </Link>
              </div>
          </div>
      </SectionFade>

      {/* Latest News (Featured) */}
      <SectionFade className="py-24 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-6 max-w-7xl">
              <div className="flex justify-between items-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white">Sustainability Insights</h2>
                  <Link to="/blog" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-2 text-lg">
                      View Journal <ArrowRight className="w-5 h-5" />
                  </Link>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                  {featuredPosts.map((post) => (
                      <Link 
                          key={post.id}
                          to={`/blog/${post.id}`}
                          className="group rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-black/50 transition-all duration-300 block bg-slate-50 dark:bg-slate-900"
                      >
                          <div className="h-64 overflow-hidden relative">
                              <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
                              <span className="absolute bottom-6 left-6 px-3 py-1 bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold text-white uppercase tracking-wider">
                                  {post.category}
                              </span>
                          </div>
                          <div className="p-8">
                              <div className="flex items-center gap-3 text-sm text-slate-400 mb-4">
                                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</span>
                              </div>
                              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">{post.title}</h3>
                              <p className="text-slate-500 dark:text-slate-400 text-base line-clamp-3 leading-relaxed">{post.excerpt}</p>
                          </div>
                      </Link>
                  ))}
              </div>
          </div>
      </SectionFade>

      {/* Modern FAQ Section */}
      <SectionFade className="py-24 bg-slate-50 dark:bg-slate-900/20">
          <div className="container mx-auto px-6 max-w-6xl">
              <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
                  {/* Left Side: Sticky Header */}
                  <div className="lg:col-span-4">
                      <div className="lg:sticky lg:top-32">
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold tracking-wide uppercase text-sm mb-2 block">Support</span>
                          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Common Questions</h2>
                          <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed mb-8">
                              Everything you need to know about the process, rewards, and impact tracking.
                          </p>
                          <Link to="/feedback" className="inline-flex items-center text-slate-900 dark:text-white font-bold hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                              Contact Support <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                      </div>
                  </div>

                  {/* Right Side: Clean Accordion */}
                  <div className="lg:col-span-8 space-y-2">
                      {faqs.map((faq, i) => (
                          <div key={i} className="border-b border-slate-200 dark:border-slate-800 last:border-0">
                              <button 
                                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                  className="w-full flex items-center justify-between py-6 text-left hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group"
                              >
                                  <span className="text-xl font-medium text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 pr-8">{faq.q}</span>
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${openFaq === i ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                                      {openFaq === i ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                  </div>
                              </button>
                              <AnimatePresence>
                                  {openFaq === i && (
                                      <motion.div 
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: 'auto', opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          className="overflow-hidden"
                                      >
                                          <div className="pb-8 text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                                              {faq.a}
                                          </div>
                                      </motion.div>
                                  )}
                              </AnimatePresence>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </SectionFade>

      {/* CTA */}
      <section className="py-20">
          <div className="container mx-auto px-6 max-w-5xl">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-700 dark:to-teal-800 rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-emerald-900/20">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                  <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                  
                  <div className="relative z-10">
                      <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Ready to make an impact?</h2>
                      <p className="text-emerald-50 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">Join thousands of students and staff contributing to a greener campus ecosystem today.</p>
                      <button 
                        onClick={() => navigate('/categories')}
                        className="px-12 py-5 bg-white text-emerald-700 dark:text-emerald-800 rounded-full font-bold text-xl hover:bg-emerald-50 hover:scale-105 transition-all shadow-xl"
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
