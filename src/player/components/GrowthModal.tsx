import React, { useState } from 'react';
import { X, Ruler, User } from 'lucide-react';
import type { GrowthMeasurement, GeneticInputs } from '../../types/growth';

interface GrowthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (measurement: Omit<GrowthMeasurement, 'id' | 'playerId'>, genetics: GeneticInputs) => void;
}

export const GrowthModal: React.FC<GrowthModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [step, setStep] = useState<1 | 2>(1); // 1: Measures, 2: Genetics (if missing)

    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [sittingHeight, setSittingHeight] = useState(''); // Optional for basic KR, required for Mirwald

    const [fatherHeight, setFatherHeight] = useState('');
    const [motherHeight, setMotherHeight] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate inputs
        if (!height || !weight || !fatherHeight || !motherHeight) return;

        onSubmit({
            date: new Date().toISOString(),
            heightCm: parseFloat(height),
            weightKg: parseFloat(weight),
            sittingHeightCm: parseFloat(sittingHeight) || 0,
            source: 'external'
        }, {
            fatherHeightCm: parseFloat(fatherHeight),
            motherHeightCm: parseFloat(motherHeight)
        });

        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white"
                >
                    <X className="w-5 h-5" />
                </button>

                <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                    <Ruler className="text-emerald-400 w-5 h-5" />
                    Update Assessment
                </h2>
                <p className="text-sm text-slate-400 mb-6">
                    Accurate height & weight helps our AI calculate your biological age and load capacity.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div className="space-y-4">
                        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                            <h3 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
                                <User className="w-4 h-4 text-blue-400" />
                                Current Measurements
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-slate-400 mb-1 block">Height (cm)</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={height}
                                        onChange={(e) => setHeight(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:border-emerald-500 outline-none"
                                        placeholder="e.g. 152.5"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-slate-400 mb-1 block">Weight (kg)</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:border-emerald-500 outline-none"
                                        placeholder="e.g. 42.0"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                            <h3 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
                                <Activity className="w-4 h-4 text-amber-400" />
                                Genetic Potential (Just once)
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-slate-400 mb-1 block">Father's Height (cm)</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={fatherHeight}
                                        onChange={(e) => setFatherHeight(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:border-emerald-500 outline-none"
                                        placeholder="e.g. 180"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-slate-400 mb-1 block">Mother's Height (cm)</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={motherHeight}
                                        onChange={(e) => setMotherHeight(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:border-emerald-500 outline-none"
                                        placeholder="e.g. 165"
                                        required
                                    />
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 mt-2 italic">
                                *Used to predict Adult Height (Khamis-Roche method).
                            </p>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        Calculate Bio-Stats
                    </button>
                </form>
            </div>
        </div>
    );
};

// Helper icon import fix (Lucide isn't imported completely in snippet but assumed globally available or imported above)
import { Activity } from 'lucide-react';
