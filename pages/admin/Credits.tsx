
import React, { useState, useEffect } from 'react';
import { Coins, CheckCircle2 } from 'lucide-react';

const AdminCredits = () => {
    const [rates, setRates] = useState({ recycle: 30, donate: 50, repair: 70 });
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('credit_rates');
        if (stored) {
            setRates(JSON.parse(stored));
        }
    }, []);

    const handleSave = () => {
        localStorage.setItem('credit_rates', JSON.stringify(rates));
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Credit System</h1>
                    <p className="text-slate-500">Configure point values and view transaction logs.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm text-center max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-500">
                    <Coins className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Credit Configuration</h3>
                <p className="text-slate-500 mb-6">Manage how many points users earn per action.</p>
                
                <div className="grid gap-4 text-left">
                    <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                        <span className="font-medium text-slate-700">Recycle Item</span>
                        <input 
                            type="number" 
                            value={rates.recycle}
                            onChange={(e) => setRates({...rates, recycle: parseInt(e.target.value) || 0})}
                            className="w-24 px-2 py-1 border rounded text-right" 
                        />
                    </div>
                    <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                        <span className="font-medium text-slate-700">Donate Item</span>
                        <input 
                            type="number" 
                            value={rates.donate}
                            onChange={(e) => setRates({...rates, donate: parseInt(e.target.value) || 0})}
                            className="w-24 px-2 py-1 border rounded text-right" 
                        />
                    </div>
                    <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                        <span className="font-medium text-slate-700">Repair Item</span>
                        <input 
                            type="number" 
                            value={rates.repair}
                            onChange={(e) => setRates({...rates, repair: parseInt(e.target.value) || 0})}
                            className="w-24 px-2 py-1 border rounded text-right" 
                        />
                    </div>
                </div>
                
                <button 
                    onClick={handleSave}
                    className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center gap-2 mx-auto"
                >
                    {saved ? <><CheckCircle2 className="w-4 h-4"/> Saved</> : 'Save Changes'}
                </button>
            </div>
        </div>
    );
};

export default AdminCredits;
