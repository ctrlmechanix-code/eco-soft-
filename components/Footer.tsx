
import React from 'react';
import { Recycle, Twitter, Github, Linkedin, ArrowRight, Instagram, Mail, MapPin } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const FooterLink = ({ to, children }: { to: string; children?: React.ReactNode }) => (
    <li>
        <Link 
            to={to} 
            className="group flex items-center text-slate-400 hover:text-white transition-colors duration-300 text-sm py-1.5"
        >
            <span className="w-0 overflow-hidden group-hover:w-2 transition-all duration-300 h-px bg-emerald-500 mr-0 group-hover:mr-2"></span>
            {children}
        </Link>
    </li>
);

const SocialIcon = ({ href, children, label }: { href: string; children?: React.ReactNode; label: string }) => (
     <a 
        href={href} 
        aria-label={label}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:bg-emerald-500/10 hover:border-emerald-500/50 hover:text-emerald-400 transition-all duration-300 backdrop-blur-sm"
    >
        {children}
    </a>
);

const Footer = () => {
    const location = useLocation();
    const isLanding = location.pathname === '/';

    return (
        <footer className={`relative pt-20 pb-10 overflow-hidden ${
            isLanding ? "bg-slate-950" : "bg-slate-950 border-t border-slate-900"
        }`}>
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none select-none">
                {isLanding ? (
                    <>
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-black" />
                        <div className="absolute -top-[500px] -left-[500px] w-[1000px] h-[1000px] bg-emerald-500/5 rounded-full blur-[120px] mix-blend-screen opacity-60" />
                        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[100px] mix-blend-screen opacity-40" />
                    </>
                ) : (
                   <div className="absolute inset-0 bg-slate-950" />
                )}
                 {/* Noise Texture */}
                 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
                    {/* Brand Section - Takes up 4 columns */}
                    <div className="lg:col-span-4 space-y-6">
                        <Link to="/" className="flex items-center gap-2 group w-fit">
                            <div className="relative w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/20 group-hover:shadow-emerald-500/30 transition-all duration-300">
                                <Recycle className="h-5 w-5 text-white" />
                                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20"></div>
                            </div>
                            <span className="text-2xl font-bold text-white tracking-tight">ECO-SORT</span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                            Empowering campuses to embrace circular economy principles through intelligent e-waste tracking and rewards.
                        </p>
                        
                        <div className="flex gap-4 pt-2">
                            <SocialIcon href="https://twitter.com" label="Twitter"><Twitter className="w-5 h-5" /></SocialIcon>
                            <SocialIcon href="https://github.com" label="GitHub"><Github className="w-5 h-5" /></SocialIcon>
                            <SocialIcon href="https://linkedin.com" label="LinkedIn"><Linkedin className="w-5 h-5" /></SocialIcon>
                            <SocialIcon href="https://instagram.com" label="Instagram"><Instagram className="w-5 h-5" /></SocialIcon>
                        </div>
                    </div>
                    
                    {/* Navigation Links - 2 cols each */}
                    <div className="lg:col-span-2 lg:col-start-6">
                        <h3 className="font-semibold text-white mb-6 text-sm tracking-wider uppercase">Platform</h3>
                        <ul className="space-y-2">
                            <FooterLink to="/categories">Report Waste</FooterLink>
                            <FooterLink to="/dashboard">Impact Dashboard</FooterLink>
                            <FooterLink to="/collection-points">Find Locations</FooterLink>
                            <FooterLink to="/credits">Green Credits</FooterLink>
                            <FooterLink to="/feedback">Feedback & Support</FooterLink>
                        </ul>
                    </div>

                    <div className="lg:col-span-2">
                        <h3 className="font-semibold text-white mb-6 text-sm tracking-wider uppercase">Company</h3>
                        <ul className="space-y-2">
                            <FooterLink to="/about">Our Mission</FooterLink>
                            <FooterLink to="/sustainability">Sustainability Report</FooterLink>
                            <FooterLink to="/careers">Careers</FooterLink>
                            <FooterLink to="/blog">Latest News</FooterLink>
                        </ul>
                    </div>

                    {/* Newsletter / Contact Info - 3 columns */}
                    <div className="lg:col-span-3">
                        <h3 className="font-semibold text-white mb-6 text-sm tracking-wider uppercase">Stay in the Loop</h3>
                        <p className="text-slate-400 text-sm mb-4">
                            Join our newsletter for the latest updates on campus sustainability.
                        </p>
                        <form className="relative mb-6" onSubmit={(e) => e.preventDefault()}>
                             <input 
                                type="email" 
                                placeholder="email@campus.edu" 
                                className="w-full bg-white/5 border border-white/10 text-sm rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all pr-12" 
                             />
                             <button 
                                type="submit"
                                className="absolute right-1.5 top-1.5 p-1.5 bg-emerald-600 hover:bg-emerald-50 text-white rounded-md transition-colors shadow-lg shadow-emerald-900/20"
                             >
                                 <ArrowRight className="w-4 h-4" />
                             </button>
                        </form>
                        
                        <div className="space-y-3">
                            <div className="flex items-start gap-3 text-sm text-slate-500">
                                <MapPin className="w-4 h-4 mt-0.5 text-emerald-600/80" />
                                <span>SAC building, Nit Patna ,800005</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-500">
                                <Mail className="w-4 h-4 text-emerald-600/80" />
                                <a href="mailto:ctrlmechanix@gmail.com" className="hover:text-emerald-400 transition-colors">ctrlmechanix@gmail.com</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-600 font-medium">
                        © {new Date().getFullYear()} ECO-SORT Inc. All rights reserved.
                    </p>
                    <div className="flex gap-8">
                         <Link to="/privacy" className="text-xs text-slate-500 hover:text-emerald-400 transition-colors">Privacy</Link>
                         <Link to="/terms" className="text-xs text-slate-500 hover:text-emerald-400 transition-colors">Terms</Link>
                         <Link to="/cookies" className="text-xs text-slate-500 hover:text-emerald-400 transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
