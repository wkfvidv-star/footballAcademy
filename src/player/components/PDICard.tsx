import { useAICoach } from '../../context/AICoachContext';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const PDICard = () => {
    const { pdi } = useAICoach();

    const { t } = useTranslation();

    const getTrendIcon = () => {
        if (pdi.trend === 'improving') return <TrendingUp className="w-4 h-4 text-green-500" />;
        if (pdi.trend === 'declining') return <TrendingDown className="w-4 h-4 text-red-500" />;
        return <Minus className="w-4 h-4 text-zinc-500" />;
    };

    return (
        <div className="bg-gradient-to-br from-indigo-900 to-zinc-900 border border-indigo-500/30 p-6 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <TrendingUp className="w-32 h-32 text-white" />
            </div>

            <div className="relative z-10">
                <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider mb-1">{t('pdi.description')}</h3>
                <h2 className="text-2xl font-black text-white mb-4">{t('pdi.title')}</h2>

                <div className="flex items-end gap-3">
                    <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-white leading-none">
                        {pdi.score}
                    </div>
                    <div className="pb-2">
                        <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg border border-white/10 backdrop-blur-sm">
                            {getTrendIcon()}
                            <span className="text-xs font-bold text-zinc-300 uppercase">{t(`pdi.trend.${pdi.trend}`)}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex gap-1">
                    <div className="flex-1 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                        <div className="h-full bg-pink-500" style={{ width: `${pdi.breakdown.physical * 10}%` }} title={t('pdi.breakdown.physical')} />
                    </div>
                    <div className="flex-1 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: `${pdi.breakdown.technical * 10}%` }} title={t('pdi.breakdown.technical')} />
                    </div>
                    <div className="flex-1 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: `${pdi.breakdown.tactical * 10}%` }} title={t('pdi.breakdown.tactical')} />
                    </div>
                    <div className="flex-1 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                        <div className="h-full bg-amber-500" style={{ width: `${pdi.breakdown.mental * 10}%` }} title={t('pdi.breakdown.mental')} />
                    </div>
                </div>
                <div className="flex justify-between mt-1 text-[9px] font-bold text-zinc-500 uppercase">
                    <span>{t('pdi.breakdown.physical').substring(0, 3)}</span>
                    <span>{t('pdi.breakdown.technical').substring(0, 3)}</span>
                    <span>{t('pdi.breakdown.tactical').substring(0, 3)}</span>
                    <span>{t('pdi.breakdown.mental').substring(0, 3)}</span>
                </div>
            </div>
        </div>
    );
};
