import { useAICoach } from '../../context/AICoachContext';
import { TrendingUp, TrendingDown, Minus, Zap, Dumbbell, AlertTriangle, Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const PDICard = () => {
    const { pdi } = useAICoach();
    const { t } = useTranslation();

    const getTrendIcon = () => {
        if (pdi.trend === 'improving') return <TrendingUp className="w-4 h-4 text-primary" />;
        if (pdi.trend === 'declining') return <TrendingDown className="w-4 h-4 text-red-500" />;
        return <Minus className="w-4 h-4 text-zinc-500" />;
    };

    return (
        <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-indigo-950/40 border border-white/5 p-8 rounded-[40px] relative overflow-hidden group hover:border-indigo-500/20 transition-all h-full">
            <div className="absolute -right-12 -top-12 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-all" />

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-indigo-500/10 rounded-xl">
                        <Zap className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                        <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] italic">{t('pdi.description')}</h3>
                        <h2 className="text-xl font-black text-white italic uppercase tracking-tight">{t('pdi.title')}</h2>
                    </div>
                </div>

                <div className="flex items-end gap-6 mb-8">
                    <div className="text-8xl font-black text-white italic tracking-tighter leading-none">
                        {pdi.score}
                    </div>
                    <div className="pb-2">
                        <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5 backdrop-blur-sm">
                            {getTrendIcon()}
                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{t(`pdi.trend.${pdi.trend}`)}</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex gap-1.5 h-2">
                        <div className="flex-1 rounded-full bg-zinc-800/50 overflow-hidden">
                            <div className="h-full bg-primary shadow-[0_0_10px_rgba(34,197,94,0.4)]" style={{ width: `${pdi.breakdown.physical * 10}%` }} />
                        </div>
                        <div className="flex-1 rounded-full bg-zinc-800/50 overflow-hidden">
                            <div className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.4)]" style={{ width: `${pdi.breakdown.technical * 10}%` }} />
                        </div>
                        <div className="flex-1 rounded-full bg-zinc-800/50 overflow-hidden">
                            <div className="h-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.4)]" style={{ width: `${pdi.breakdown.tactical * 10}%` }} />
                        </div>
                        <div className="flex-1 rounded-full bg-zinc-800/50 overflow-hidden">
                            <div className="h-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.4)]" style={{ width: `${pdi.breakdown.mental * 10}%` }} />
                        </div>
                    </div>
                    <div className="flex justify-between px-1">
                        {['physical', 'technical', 'tactical', 'mental'].map(stat => (
                            <span key={stat} className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.1em]">
                                {t(`pdi_short.${stat}`)}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
