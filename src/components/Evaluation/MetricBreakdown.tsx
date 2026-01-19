import { useTranslation } from 'react-i18next';
import type { PlayerMetrics } from '../../types';

interface MetricBreakdownProps {
    current: PlayerMetrics;
    previous?: PlayerMetrics;
}

export default function MetricBreakdown({ current, previous }: MetricBreakdownProps) {
    const { t } = useTranslation();

    const METRICS = [
        { key: 'physical' as keyof PlayerMetrics, label: t('card.physical'), color: 'bg-yellow-400' },
        { key: 'technical' as keyof PlayerMetrics, label: t('card.technical'), color: 'bg-blue-400' },
        { key: 'tactical' as keyof PlayerMetrics, label: t('card.tactical'), color: 'bg-purple-400' },
        { key: 'psychological' as keyof PlayerMetrics, label: t('card.mental'), color: 'bg-red-400' },
    ];

    return (
        <div className="space-y-4">
            {METRICS.map((metric) => {
                const currentVal = current[metric.key] as number;
                const prevVal = previous ? (previous[metric.key] as number) : (currentVal - 5);
                const delta = currentVal - prevVal;
                const isPositive = delta >= 0;

                return (
                    <div key={metric.key} className="bg-white/5 rounded-xl p-3">
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-zinc-400 text-sm font-medium">{metric.label}</span>
                            <div className="flex items-center gap-2">
                                <span className={`text-xs ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                                    {isPositive ? '+' : ''}{delta}
                                </span>
                                <span className="text-white font-bold text-lg leading-none">{currentVal}</span>
                            </div>
                        </div>

                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div
                                className={`h-full ${metric.color} rounded-full`}
                                style={{ width: `${currentVal}%` }}
                            ></div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
