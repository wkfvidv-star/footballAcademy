import React from 'react';
import type { BiologicalProfile } from '../../types/growth';
import { Activity, Ruler, TrendingUp } from 'lucide-react';

interface BioCardProps {
    profile: BiologicalProfile | null;
    onUpdateClick: () => void;
}

export const BioCard: React.FC<BioCardProps> = ({ profile, onUpdateClick }) => {
    if (!profile) {
        return (
            <div className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl border border-slate-700/50">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-slate-100 font-semibold flex items-center gap-2">
                        <Activity className="w-4 h-4 text-emerald-400" />
                        Biological Profile
                    </h3>
                    <button
                        onClick={onUpdateClick}
                        className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded hover:bg-emerald-500/20 transition-colors"
                    >
                        + Add Data
                    </button>
                </div>
                <p className="text-sm text-slate-400">No growth data available. Add measurements to unlock Bio-Banding.</p>
            </div>
        );
    }

    const percentage = Math.min(100, Math.max(0, profile.currentPercentageAdultHeight));

    // Color logic for Bio-Band
    const bandColor = profile.bioBand === 'circa-phv' ? 'text-amber-400' :
        profile.bioBand === 'post-phv' ? 'text-emerald-400' : 'text-blue-400';

    const bandLabel = profile.bioBand === 'pre-phv' ? 'Pre-Growth Spurt' :
        profile.bioBand === 'circa-phv' ? 'Growth Spurt (PHV)' : 'Maturation Phase';

    return (
        <div className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl border border-slate-700/50">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-slate-100 font-semibold flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    The Lab (Bio-Engine)
                </h3>
                <button
                    onClick={onUpdateClick}
                    className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded hover:bg-slate-600 transition-colors"
                >
                    Update
                </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/30">
                    <div className="text-xs text-slate-400 mb-1 flex items-center gap-1">
                        <Ruler className="w-3 h-3" /> Predicted Adult
                    </div>
                    <div className="text-xl font-bold text-white">{profile.predictedAdultHeightCm} <span className="text-xs text-slate-500">cm</span></div>
                </div>

                <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/30">
                    <div className="text-xs text-slate-400 mb-1 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> Maturity Status
                    </div>
                    <div className={`text-sm font-bold capitalize ${profile.maturityStatus === 'late' ? 'text-blue-400' : profile.maturityStatus === 'early' ? 'text-emerald-400' : 'text-slate-200'}`}>
                        {profile.maturityStatus} Bloomer
                    </div>
                </div>
            </div>

            <div className="mb-2">
                <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Current Progress</span>
                    <span className="text-emerald-400 font-mono">{profile.currentPercentageAdultHeight}%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 via-emerald-500 to-emerald-400 rounded-full transition-all duration-1000"
                        style={{ width: `${percentage}%` }}
                    />
                </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-700/50">
                <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Bio-Band Phase:</span>
                    <span className={`text-xs font-bold border px-2 py-0.5 rounded ${bandColor} border-current opacity-80`}>
                        {bandLabel}
                    </span>
                </div>
            </div>
        </div>
    );
};
