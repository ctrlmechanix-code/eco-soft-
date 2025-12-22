
import React, { useState, useEffect } from 'react';
import { collectionPoints as mockPoints } from '../../data/mockData';
import { MapPin, Phone, Mail, Edit2, Trash2, Plus, X, Save } from 'lucide-react';
import type { CollectionPoint } from '../../types';

const AdminCollectionPoints = () => {
    const [points, setPoints] = useState<CollectionPoint[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPoint, setEditingPoint] = useState<CollectionPoint | null>(null);
    const [formData, setFormData] = useState<Partial<CollectionPoint>>({});

    useEffect(() => {
        const stored = localStorage.getItem('collection_points');
        if (stored) {
            setPoints(JSON.parse(stored));
        } else {
            setPoints(mockPoints);
            localStorage.setItem('collection_points', JSON.stringify(mockPoints));
        }
    }, []);

    const savePoints = (newPoints: CollectionPoint[]) => {
        setPoints(newPoints);
        localStorage.setItem('collection_points', JSON.stringify(newPoints));
    };

    const handleAdd = () => {
        setEditingPoint(null);
        setFormData({ status: 'Active' });
        setIsModalOpen(true);
    };

    const handleEdit = (point: CollectionPoint) => {
        setEditingPoint(point);
        setFormData(point);
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        if (window.confirm("Delete this location?")) {
            savePoints(points.filter(p => p.id !== id));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (editingPoint) {
            const updated = points.map(p => p.id === editingPoint.id ? { ...p, ...formData } as CollectionPoint : p);
            savePoints(updated);
        } else {
            const newPoint: CollectionPoint = {
                id: Date.now(),
                name: formData.name || 'New Location',
                location: formData.location || '',
                address: formData.address || '',
                hours: formData.hours || '9 AM - 5 PM',
                coordinates: formData.coordinates || { lat: 0, lng: 0 },
                phone: formData.phone || '',
                email: formData.email || '',
                mapUrl: formData.mapUrl || '',
                status: formData.status as any,
                totalCollected: 0
            };
            savePoints([...points, newPoint]);
        }
        setIsModalOpen(false);
    };

    const inputClasses = "w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-slate-700 dark:text-white";

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Collection Points</h1>
                    <p className="text-slate-500 dark:text-slate-400">Manage drop-off locations and hours.</p>
                </div>
                <button 
                    onClick={handleAdd}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" /> Add Location
                </button>
            </div>

            <div className="grid gap-6">
                {points.map((point) => (
                    <div key={point.id} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{point.name}</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">{point.location} <span className="text-slate-300 dark:text-slate-600 mx-2">|</span> {point.address}</p>
                                <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-300">
                                    <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-slate-400"/> {point.phone}</span>
                                    <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-slate-400"/> {point.email}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="mr-4 text-right hidden md:block">
                                <p className="text-xs font-medium text-slate-400 uppercase">Status</p>
                                <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${point.status === 'Active' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'}`}>
                                    {point.status || 'Active'}
                                </span>
                            </div>
                            <button 
                                onClick={() => handleEdit(point)}
                                className="flex-1 md:flex-none px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center gap-2"
                            >
                                <Edit2 className="w-4 h-4" /> Edit
                            </button>
                            <button 
                                onClick={() => handleDelete(point.id)}
                                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto border border-slate-100 dark:border-slate-800">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center sticky top-0 bg-white dark:bg-slate-900 z-10">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{editingPoint ? 'Edit Location' : 'Add Location'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Name</label>
                                <input type="text" required value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className={inputClasses} placeholder="Student Center Hub" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Location/Building</label>
                                <input type="text" required value={formData.location || ''} onChange={e => setFormData({...formData, location: e.target.value})} className={inputClasses} placeholder="Building A, Ground Floor" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Full Address</label>
                                <input type="text" value={formData.address || ''} onChange={e => setFormData({...formData, address: e.target.value})} className={inputClasses} placeholder="123 Campus Drive..." />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Phone</label>
                                    <input type="text" value={formData.phone || ''} onChange={e => setFormData({...formData, phone: e.target.value})} className={inputClasses} placeholder="+1 555-0123" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Status</label>
                                    <select value={formData.status || 'Active'} onChange={e => setFormData({...formData, status: e.target.value as any})} className={inputClasses}>
                                        <option value="Active">Active</option>
                                        <option value="Maintenance">Maintenance</option>
                                        <option value="Closed">Closed</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
                                <input type="email" value={formData.email || ''} onChange={e => setFormData({...formData, email: e.target.value})} className={inputClasses} placeholder="contact@ecosort.edu" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Opening Hours</label>
                                <input type="text" value={formData.hours || ''} onChange={e => setFormData({...formData, hours: e.target.value})} className={inputClasses} placeholder="9 AM - 6 PM" />
                            </div>
                            
                            <div className="pt-4">
                                <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20">
                                    <Save className="w-4 h-4" /> Save Location
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCollectionPoints;
