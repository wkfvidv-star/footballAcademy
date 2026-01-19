import { useState } from 'react';
import { X, Save, Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { MatchStats } from '../../services/TacticalEngine';

interface MatchPerformanceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (matchData: Omit<MatchStats, 'id' | 'date'>) => void;
}

export const MatchPerformanceModal = ({ isOpen, onClose, onSubmit }: MatchPerformanceModalProps) => {
    const { t } = useTranslation();
    const [stats, setStats] = useState({
        opponent: '',
        minutesPlayed: 90,
        performanceRating: 7,
        goals: 0,
        assists: 0,
        keyPasses: 0,
        interceptions: 0,
        tacklesWon: 0,
        errors: 0,
        possessionLost: 0
    });

    if (!isOpen) return null;

    const handleChange = (key: string, val: string | number) => {
        setStats(prev => ({ ...prev, [key]: val }));
    };

    const handleSubmit = () => {
        onSubmit({
            ...stats,
            minutesPlayed: Number(stats.minutesPlayed),
            performanceRating: Number(stats.performanceRating),
            goals: Number(stats.goals),
            assists: Number(stats.assists),
            keyPasses: Number(stats.keyPasses),
            interceptions: Number(stats.interceptions),
            tacklesWon: Number(stats.tacklesWon),
            errors: Number(stats.errors),
            possessionLost: Number(stats.possessionLost)
        });
        onClose();
    };

    // Mapping for stat labels
    const statLabels: Record<string, string> = {
        'Goals': t('match_performance.goals'),
        'Assists': t('match_performance.assists'),
        'Key Passes': t('match_performance.key_passes'),
        'Interceptions': t('match_performance.interceptions'),
        'Tackles Won': t('match_performance.tackles_won'),
        'Errors': t('match_performance.errors')
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-lg bg-zinc-900 border border-white/10 rounded-3xl p-6 relative my-8 overflow-y-auto max-h-[90vh]">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                >
                    <X className="w-5 h-5 text-zinc-400" />
                </button>

                <h2 className="text-xl font-black text-white mb-6 pr-8 flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-purple-500" />
                    {t('match_performance.title')}
                </h2>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-zinc-500 uppercase mb-2 block">{t('match_performance.opponent')}</label>
                            <input
                                type="text"
                                value={stats.opponent}
                                onChange={(e) => handleChange('opponent', e.target.value)}
                                className="w-full bg-zinc-800 text-white font-bold p-3 rounded-xl border border-white/5"
                                placeholder={t('match_performance.team_name_placeholder')}
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-zinc-500 uppercase mb-2 block">{t('match_performance.rating')}</label>
                            <input
                                type="number" min="1" max="10" step="0.5"
                                value={stats.performanceRating}
                                onChange={(e) => handleChange('performanceRating', parseFloat(e.target.value))}
                                className="w-full bg-zinc-800 text-white font-bold p-3 rounded-xl border border-white/5"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        {['Goals', 'Assists', 'Key Passes'].map(stat => (
                            <div key={stat}>
                                <label className="text-[10px] font-bold text-zinc-500 uppercase mb-1 block">{statLabels[stat]}</label>
                                <input
                                    type="number"
                                    value={stats[stat.toLowerCase().replace(' ', '') as keyof typeof stats]}
                                    onChange={(e) => handleChange(stat.toLowerCase().replace(' ', ''), parseInt(e.target.value))}
                                    className="w-full bg-zinc-800 text-white font-bold p-2 rounded-lg border border-white/5 text-center"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        {['Interceptions', 'Tackles Won', 'Errors'].map(stat => (
                            <div key={stat}>
                                <label className="text-[10px] font-bold text-zinc-500 uppercase mb-1 block">{statLabels[stat]}</label>
                                <input
                                    type="number"
                                    value={stats[stat.toLowerCase().replace(' ', '') as keyof typeof stats]}
                                    onChange={(e) => handleChange(stat.toLowerCase().replace(' ', ''), parseInt(e.target.value))}
                                    className="w-full bg-zinc-800 text-white font-bold p-2 rounded-lg border border-white/5 text-center"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-6">
                    <button
                        onClick={handleSubmit}
                        className="w-full py-4 bg-zinc-100 text-black font-black rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2"
                    >
                        <Save className="w-5 h-5" />
                        {t('match_performance.save')}
                    </button>
                </div>
            </div>
        </div>
    );
};
