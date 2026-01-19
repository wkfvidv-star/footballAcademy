import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { useTechnical } from '../../context/TechnicalContext';
import { useTranslation } from 'react-i18next';

export const TechnicalRadar = () => {
    const { technicalRadar } = useTechnical();

    const { t } = useTranslation();

    const data = technicalRadar.length > 0 ? technicalRadar : [
        { label: t('radar.passing'), score: 0, fullMark: 10 },
        { label: t('radar.dribbling'), score: 0, fullMark: 10 },
        { label: t('radar.shooting'), score: 0, fullMark: 10 },
        { label: t('radar.control'), score: 0, fullMark: 10 },
        { label: t('radar.crossing'), score: 0, fullMark: 10 },
        { label: t('radar.technique'), score: 0, fullMark: 10 },
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
                        name="Technical"
                        dataKey="score"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.4}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};
