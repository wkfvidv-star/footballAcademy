import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useTranslation } from 'react-i18next';
import type { PlayerMetrics } from '../../types';

interface ResultsChartProps {
    current: PlayerMetrics;
    previous?: PlayerMetrics;
}

export default function ResultsChart({ current, previous }: ResultsChartProps) {
    const { t } = useTranslation();

    const data = [
        {
            subject: t('card.physical'),
            A: current.physical,
            B: previous?.physical || 60,
            fullMark: 100,
        },
        {
            subject: t('card.technical'),
            A: current.technical,
            B: previous?.technical || 65,
            fullMark: 100,
        },
        {
            subject: t('card.tactical'),
            A: current.tactical,
            B: previous?.tactical || 55,
            fullMark: 100,
        },
        {
            subject: t('card.mental'),
            A: current.psychological,
            B: previous?.psychological || 70,
            fullMark: 100,
        },
    ];

    return (
        <div className="w-full h-[320px] relative -ms-4 flex justify-center" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="65%" data={data}>
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: '#a1a1aa', fontSize: 10 }}
                    />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '8px', color: '#fff' }}
                        itemStyle={{ color: '#22c55e' }}
                    />
                    <Radar
                        name={t('evaluation.current')}
                        dataKey="A"
                        stroke="#22c55e"
                        strokeWidth={3}
                        fill="#22c55e"
                        fillOpacity={0.4}
                    />
                    {previous && (
                        <Radar
                            name={t('evaluation.previous')}
                            dataKey="B"
                            stroke="#52525b"
                            strokeWidth={2}
                            fill="#52525b"
                            fillOpacity={0.1}
                            strokeDasharray="4 4"
                        />
                    )}
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
