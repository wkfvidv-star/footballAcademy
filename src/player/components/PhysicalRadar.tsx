import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { usePhysical } from '../../context/PhysicalContext';
import { useTranslation } from 'react-i18next';

export const PhysicalRadar = () => {
    const { radarProfile } = usePhysical();

    const { t } = useTranslation();

    // If empty profile, don't crash chart
    const data = radarProfile.length > 0 ? radarProfile : [
        { label: t('radar.speed'), score: 0, fullMark: 10 },
        { label: t('radar.power'), score: 0, fullMark: 10 },
        { label: t('radar.endurance'), score: 0, fullMark: 10 },
        { label: t('radar.agility'), score: 0, fullMark: 10 },
        { label: t('radar.balance'), score: 0, fullMark: 10 },
        { label: t('radar.reaction'), score: 0, fullMark: 10 },
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
                        name="Riyad"
                        dataKey="score"
                        stroke="#22c55e"
                        fill="#22c55e"
                        fillOpacity={0.4}
                    />
                </RadarChart>
            </ResponsiveContainer>

            {/* Center OVR Score overlay */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                {/* Optional: could put a summary score here */}
            </div>
        </div>
    );
};
