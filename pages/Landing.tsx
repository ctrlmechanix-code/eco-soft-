import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Recycle, Check, Leaf, Zap, BarChart3, Globe, ShieldCheck, Quote, ChevronDown, ChevronUp, Calendar, User, Gift } from 'lucide-react';
import { impactStats, blogPosts, mockTestimonials } from '../data/mockData';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import type { Testimonial } from '../types';

const PageWrapper = ({ children }: { children?: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.6 }}
    className="bg-white dark:bg-slate-950 transition-colors duration-300"
  >
    {children}
  </motion.div>
);

const Landing = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
      // Load testimonials from storage or mock to simulate admin management capability
      const stored = JSON.parse(localStorage.getItem('testimonials') || '[]');
      if (stored.length > 0) {
          setTestimonials(stored);
      } else {
          setTestimonials(mockTestimonials);
          localStorage.setItem('testimonials', JSON.stringify(mockTestimonials));
      }
  }, []);

  const featuredPosts = blogPosts.slice(0, 3);

  const faqs = [
      { q: "What types of items can I recycle?", a: "We accept most electronic devices including phones, laptops, batteries, chargers, and small appliances. Large appliances might need special pickup arrangements." },
      { q: "How do Green Credits work?", a: "You earn credits for every verified submission. These credits accumulate in your wallet and can be redeemed for campus perks, goods, or charitable donations." },
      { q: "Where are the collection points located?", a: "We have multiple secure drop-off bins across campus, typically in the Student Center, Library, and major faculty buildings. Check the Locations page for a map." },
      { q: "Is my data safe?", a: "We strongly recommend wiping your devices before drop-off. However, our certified recycling partners follow strict data destruction protocols for all devices." }
  ];

  return (
    <PageWrapper>
      {/* Premium Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
             <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gradient-to-br from-emerald-100/50 to-teal-50/50 dark:from-emerald-500/10 dark:to-teal-500/10 rounded-full blur-3xl opacity-70 mix-blend-multiply dark:mix-blend-screen" />
             <div className="absolute top-40 -left-20 w-[400px] h-[400px] bg-gradient-to-tr from-blue-100/50 to-indigo-50/50 dark:from-blue-500/10 dark:to-indigo-500/10 rounded-full blur-3xl opacity-70 mix-blend-multiply dark:mix-blend-screen" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-400 text-sm font-medium mb-8"
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
                    className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-8 leading-[1.1]"
                >
                    Sustainability meets <br className="hidden md:block"/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-400">Intelligent Action.</span>
                </motion.h1>
                
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-xl text-slate-500 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
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
                        className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-semibold text-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-all shadow-xl shadow-slate-200 dark:shadow-white/5 hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2"
                    >
                        Start Reporting <ArrowRight className="w-5 h-5" />
                    </button>
                    <button 
                        onClick={() => navigate('/dashboard')}
                        className="px-8 py-4 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-full font-semibold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                    >
                        View Dashboard
                    </button>
                </motion.div>
            </div>
        </div>
      </section>

      {/* Trusted By Strip */}
      <div className="py-10 border-y border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/20">
          <div className="container mx-auto px-6 max-w-7xl">
              <p className="text-center text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6">Trusted by Campus Departments</p>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                  {['Engineering', 'Architecture', 'Student Affairs', 'Facilities', 'IT Services'].map((name, i) => (
                      <div key={i} className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-lg">
                          <div className="w-6 h-6 bg-current rounded-full opacity-20"></div>
                          {name}
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* Bento Grid Features */}
      <section className="py-24 bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Orchestrate your impact</h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">Everything you need to manage the lifecycle of electronic devices on campus.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1: Large */}
                <motion.div 
                    whileHover={{ y: -5 }}
                    className="md:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200/60 dark:border-slate-800 relative overflow-hidden group"
                >
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400">
                            <Zap className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Identify & Decide</h3>
                        <p className="text-slate-500 dark:text-slate-400 max-w-md">Our intelligent workflow guides you to the perfect disposal method—whether it's repair, donation, or recycling—in seconds.</p>
                    </div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-l from-emerald-50 to-transparent dark:from-emerald-900/20 rounded-full blur-3xl group-hover:bg-emerald-100/50 dark:group-hover:bg-emerald-900/30 transition-colors" />
                </motion.div>

                {/* Card 2: Tall */}
                <motion.div 
                    whileHover={{ y: -5 }}
                    className="md:row-span-2 bg-slate-900 dark:bg-black p-8 rounded-3xl shadow-xl relative overflow-hidden text-white group border border-transparent dark:border-slate-800"
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
                    className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200/60 dark:border-slate-800"
                >
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                        <Globe className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Campus Collection</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Interactive maps to find the nearest drop-off points.</p>
                </motion.div>

                {/* Card 4 */}
                <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200/60 dark:border-slate-800"
                >
                    <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center mb-6 text-amber-600 dark:text-amber-400">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Verified Disposal</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Ensure your data is safe and disposal adheres to regulations.</p>
                </motion.div>
            </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-6 max-w-7xl">
              <div className="text-center mb-20">
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Three Steps to Zero Waste</h2>
                  <p className="text-slate-500 dark:text-slate-400">Simple, transparent, and rewarding.</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-12 relative">
                  {/* Connector Line */}
                  <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent z-0"></div>

                  {[
                      { icon: Recycle, title: "Report Device", desc: "Select your item category and answer a few questions about its condition." },
                      { icon: Zap, title: "Get Recommendation", desc: "Our system instantly decides: Repair, Donate, or Recycle." },
                      { icon: Gift, title: "Earn Rewards", desc: "Drop it off at a designated point and receive Green Credits instantly." }
                  ].map((step, i) => (
                      <div key={i} className="relative z-10 flex flex-col items-center text-center">
                          <div className="w-24 h-24 bg-white dark:bg-slate-900 border-4 border-slate-50 dark:border-slate-800 rounded-full flex items-center justify-center mb-6 shadow-xl relative">
                              <span className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-sm border-4 border-white dark:border-slate-900">{i + 1}</span>
                              <step.icon className="w-10 h-10 text-slate-700 dark:text-slate-200" />
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{step.title}</h3>
                          <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">{step.desc}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-200 dark:divide-slate-800">
                <div className="text-center px-4">
                    <p className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2"><AnimatedCounter to={impactStats.totalDevices} /></p>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Devices Processed</p>
                </div>
                <div className="text-center px-4">
                    <p className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2"><AnimatedCounter to={impactStats.devicesRecycled} /></p>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Recycled</p>
                </div>
                <div className="text-center px-4">
                    <p className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2"><AnimatedCounter to={impactStats.co2Saved} /></p>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Kg CO₂ Saved</p>
                </div>
                <div className="text-center px-4">
                    <p className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2"><AnimatedCounter to={impactStats.treesEquivalent} /></p>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Trees Planted</p>
                </div>
            </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-6 max-w-7xl">
              <div className="flex justify-between items-end mb-12">
                  <div>
                      <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Campus Voices</h2>
                      <p className="text-slate-500 dark:text-slate-400">See how students and staff are making a difference.</p>
                  </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                  {testimonials.map((t) => (
                      <div key={t.id} className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 relative">
                          <Quote className="w-10 h-10 text-emerald-100 dark:text-emerald-900/30 absolute top-6 right-6" />
                          <p className="text-slate-600 dark:text-slate-300 mb-8 relative z-10 leading-relaxed">"{t.content}"</p>
                          <div className="flex items-center gap-4">
                              <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full bg-white dark:bg-slate-800" />
                              <div>
                                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{t.name}</h4>
                                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">{t.role}</p>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Latest News (Featured) */}
      <section className="py-24 bg-slate-50/50 dark:bg-slate-900/20 border-t border-slate-200 dark:border-slate-800">
          <div className="container mx-auto px-6 max-w-7xl">
              <div className="flex justify-between items-center mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Campus Updates</h2>
                  <Link to="/blog" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1">
                      View all news <ArrowRight className="w-4 h-4" />
                  </Link>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                  {featuredPosts.map((post) => (
                      <Link 
                          key={post.id}
                          to={`/blog/${post.id}`}
                          className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl transition-all duration-300 block"
                      >
                          <div className="h-48 overflow-hidden">
                              <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="p-6">
                              <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                                  <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300">{post.category}</span>
                              </div>
                              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">{post.title}</h3>
                              <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2">{post.excerpt}</p>
                          </div>
                      </Link>
                  ))}
              </div>
          </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-6 max-w-4xl">
              <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Frequently Asked Questions</h2>
              </div>
              
              <div className="space-y-4">
                  {faqs.map((faq, i) => (
                      <div key={i} className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                          <button 
                              onClick={() => setOpenFaq(openFaq === i ? null : i)}
                              className="w-full flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-900 text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          >
                              <span className="font-bold text-slate-900 dark:text-white">{faq.q}</span>
                              {openFaq === i ? <ChevronUp className="w-5 h-5 text-emerald-500" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                          </button>
                          <AnimatePresence>
                              {openFaq === i && (
                                  <motion.div 
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="bg-white dark:bg-slate-950"
                                  >
                                      <div className="p-6 text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                                          {faq.a}
                                      </div>
                                  </motion.div>
                              )}
                          </AnimatePresence>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* CTA */}
      <section className="py-20">
          <div className="container mx-auto px-6 max-w-5xl">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-700 dark:to-teal-800 rounded-[2.5rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                  <div className="relative z-10">
                      <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to make an impact?</h2>
                      <p className="text-emerald-50 text-lg mb-10 max-w-2xl mx-auto">Join thousands of students and staff contributing to a greener campus ecosystem today.</p>
                      <button 
                        onClick={() => navigate('/categories')}
                        className="px-10 py-4 bg-white text-emerald-700 dark:text-emerald-800 rounded-full font-bold text-lg hover:bg-emerald-50 transition-all shadow-lg"
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