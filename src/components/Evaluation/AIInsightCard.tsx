import { BrainCircuit, Sparkles, ArrowUp, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { PlayerMetrics } from '../../types';
import { generateBenchmarkInsightData, type BenchmarkInsight } from '../../services/normalization';

interface AIInsightCardProps {
    current: PlayerMetrics;
    ageGroup: string;
    position: string;
}

export default function AIInsightCard({ current, ageGroup, position }: AIInsightCardProps) {
    const { t } = useTranslation();

    const topInsightData = generateBenchmarkInsightData('TEC_FT_01', current.technical, ageGroup, position, t('card.technical'));
    const focusInsightData = generateBenchmarkInsightData('PHY_FT_01', current.physical / 15, ageGroup, position, t('card.physical'));

    const formatInsight = (data: BenchmarkInsight | null) => {
        if (!data) return '';
        const directionKey = data.direction === 'above' ? 'evaluation.above' : 'evaluation.below';
        return t('evaluation.insight_template', {
            label: data.label,
            delta: data.delta,
            direction: t(directionKey),
            age: data.ageGroup,
            pos: data.position
        });
    };

    return (
        <div className="bg-gradient-to-br from-green-900/40 to-black rounded-2xl p-5 border border-green-500/20 relative overflow-hidden">
            <div className="absolute top-0 end-0 p-4 opacity-10">
                <Sparkles className="w-24 h-24 text-primary" />
            </div>

            <div className="flex items-center gap-2 mb-6">
                <div className="p-1.5 bg-green-500/20 rounded-lg">
                    <BrainCircuit className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-bold text-white tracking-wide uppercase">{t('evaluation.ai_analysis')}</span>
            </div>

            <div className="space-y-4 relative z-10">
                <div className="flex items-start gap-4">
                    <ArrowUp className="w-5 h-5 text-green-400 mt-1 shrink-0" />
                    <div>
                        <div className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-1">{t('evaluation.strength')}</div>
                        <p className="text-zinc-200 text-sm leading-relaxed">
                            {formatInsight(topInsightData)}
                        </p>
                    </div>
                </div>

                <div className="w-full h-px bg-white/10"></div>

                <div className="flex items-start gap-4">
                    <AlertCircle className="w-5 h-5 text-yellow-400 mt-1 shrink-0" />
                    <div>
                        <div className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-1">{t('evaluation.focus_area')}</div>
                        <p className="text-zinc-200 text-sm leading-relaxed">
                            {formatInsight(focusInsightData)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
