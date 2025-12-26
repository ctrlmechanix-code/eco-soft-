
import React, { useState, useEffect } from 'react';
import { Coins, CheckCircle2 } from 'lucide-react';

const AdminCredits = () => {
    // Updated default values to match QuestionFlow logic
    const [rates, setRates] = useState({ recycle: 40, donate: 30, repair: 20, advice: 20 });
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('credit_rates');
        if (stored) {
            setRates(JSON.parse(stored));
        } else {
            // Initialize storage with defaults if not present
            localStorage.setItem('credit_rates', JSON.stringify({ recycle: 40, donate: 30, repair: 20, advice: 20 }));
        }
    }, []);

    const handleSave = () => {
        localStorage.setItem('credit_rates', JSON.stringify(rates));
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const inputClasses = "w-32 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-right font-bold text-slate-700 dark:text-white placeholder:text-slate-400";

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Credit System</h1>
                    <p className="text-slate-500 dark:text-slate-400">Configure point values and view transaction logs.</p>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm text-center max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-amber-50 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-500">
                    <Coins className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Credit Configuration</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6">Manage how many points users earn per action.</p>
                
                <div className="grid gap-4 text-left">
                    <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                        <span className="font-medium text-slate-700 dark:text-slate-200">Recycle Item</span>
                        <input 
                            type="number" 
                            value={rates.recycle}
                            onChange={(e) => setRates({...rates, recycle: parseInt(e.target.value) || 0})}
                            className={inputClasses}
                        />
                    </div>
                    <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                        <span className="font-medium text-slate-700 dark:text-slate-200">Donate Item</span>
                        <input 
                            type="number" 
                            value={rates.donate}
                            onChange={(e) => setRates({...rates, donate: parseInt(e.target.value) || 0})}
                            className={inputClasses}
                        />
                    </div>
                    <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                        <span className="font-medium text-slate-700 dark:text-slate-200">Repair Item</span>
                        <input 
                            type="number" 
                            value={rates.repair}
                            onChange={(e) => setRates({...rates, repair: parseInt(e.target.value) || 0})}
                            className={inputClasses}
                        />
                    </div>
                    <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                        <span className="font-medium text-slate-700 dark:text-slate-200">Seek Advice</span>
                        <input 
                            type="number" 
                            value={rates.advice}
                            onChange={(e) => setRates({...rates, advice: parseInt(e.target.value) || 0})}
                            className={inputClasses}
                        />
                    </div>
                </div>
                
                <button 
                    onClick={handleSave}
                    className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 flex items-center justify-center gap-2 mx-auto shadow-lg shadow-blue-900/20 transition-all hover:-translate-y-0.5"
                >
                    {saved ? <><CheckCircle2 className="w-4 h-4"/> Saved</> : 'Save Changes'}
                </button>
            </div>
        </div>
    );
};

export default AdminCredits;
