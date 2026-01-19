import { Share2, RefreshCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { PlayerMetrics } from '../../types';
import ResultsChart from './ResultsChart';
import MetricBreakdown from './MetricBreakdown';
import AIInsightCard from './AIInsightCard';

interface SummaryProps {
    score: PlayerMetrics;
    onClose: () => void;
}

export default function Summary({ score, onClose }: SummaryProps) {
    const { t } = useTranslation();

    // Mock Previous Evaluation for Comparison
    const previousScore: PlayerMetrics = {
        overallValid: 80,
        physical: 75,
        technical: 85,
        tactical: 70,
        psychological: 78,
        lastUpdated: new Date()
    };

    return (
        <div className="fixed inset-0 z-50 bg-background flex flex-col overflow-y-auto animate-in fade-in zoom-in duration-300">
            {/* Header */}
            <div className="p-6 pb-2">
                <h2 className="text-2xl font-bold text-white mb-1">{t('evaluation.results')}</h2>
                <p className="text-zinc-400 text-sm">{t('upcoming.today')} • {new Date().toLocaleDateString()}</p>
            </div>

            {/* Content */}
            <div className="flex-1 px-6 pb-12 space-y-6">

                {/* OVR Card */}
                <div className="flex items-center justify-between bg-card border border-white/5 p-4 rounded-2xl">
                    <div>
                        <div className="text-xs text-zinc-500 uppercase tracking-widest mb-1">{t('evaluation.new_ovr')}</div>
                        <div className="flex items-baseline gap-2">
                            <div className="text-5xl font-black text-white tracking-tighter">{score.overallValid}</div>
                            <div className="text-sm font-bold text-green-500">+{(score.overallValid || 0) - (previousScore.overallValid || 0)}</div>
                        </div>
                    </div>
                    {/* Mini chart placeholder or icon */}
                    <div className="w-12 h-12 rounded-full border-4 border-green-500 flex items-center justify-center text-xs font-bold text-white bg-green-500/10">
                        OVR
                    </div>
                </div>

                {/* Radar Chart */}
                <div className="bg-card border border-white/5 rounded-3xl overflow-hidden p-2">
                    <ResultsChart current={score} previous={previousScore} />
                </div>

                {/* AI Insight */}
                <AIInsightCard current={score} ageGroup="U17" position="Forward" />

                {/* Metric Breakdown */}
                <div>
                    <h3 className="text-white font-bold mb-4">{t('evaluation.pillar_breakdown')}</h3>
                    <MetricBreakdown current={score} previous={previousScore} />
                </div>
            </div>

            {/* Actions - Sticky Bottom */}
            <div className="sticky bottom-0 start-0 w-full p-6 bg-background/80 backdrop-blur-md border-t border-white/5 flex gap-3">
                <button
                    onClick={onClose}
                    className="flex-1 py-4 bg-secondary text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-secondary/80 transition-colors"
                >
                    <RefreshCcw className="w-4 h-4" />
                    {t('evaluation.done')}
                </button>
                <button className="px-6 py-4 bg-primary text-background font-bold rounded-xl flex items-center justify-center hover:bg-accent transition-colors">
                    <Share2 className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
