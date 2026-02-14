import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { useMental } from '../../context/MentalContext';
import { useTranslation } from 'react-i18next';

export const MentalRadar = () => {
    const { mentalProfile } = useMental();
    const { t } = useTranslation();
    const d = mentalProfile.dimensions;

    // Safety check if dimensions are empty
    if (Object.keys(d).length === 0) return null;

    const data = [
        { label: t('radar.confidence'), score: d.confidence, fullMark: 10 },
        { label: t('radar.focus'), score: d.focus, fullMark: 10 },
        { label: t('radar.emotional_control'), score: d.emotionalControl, fullMark: 10 },
        { label: t('radar.motivation'), score: d.motivation, fullMark: 10 },
        { label: t('radar.discipline'), score: d.discipline, fullMark: 10 },
        { label: t('radar.resilience'), score: d.stressManagement, fullMark: 10 }, // Mapped from stressManagement
        { label: t('radar.coachability'), score: d.coachability, fullMark: 10 },
        { label: t('radar.mindset'), score: d.competitiveness, fullMark: 10 },
    ];

    return (
        <div className="w-full h-[300px] relative">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis
                        dataKey="label"
                        tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 700 }}
                    />
                    <PolarRadiusAxis
                        angle={30}
                        domain={[0, 10]}
                        tick={false}
                        axisLine={false}
                    />
                    <Radar
                        name="Mental"
                        dataKey="score"
                        stroke="#f59e0b" // Amber/Orange
                        fill="#f59e0b"
                        fillOpacity={0.4}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};
