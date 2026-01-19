import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { useTactical } from '../../context/TacticalContext';
import { useTranslation } from 'react-i18next';

export const TacticalRadar = () => {
    const { tacticalProfile } = useTactical();
    const { t } = useTranslation();
    const d = tacticalProfile.dimensions;

    const data = [
        { label: t('radar.positioning'), score: d.positioning, fullMark: 10 },
        { label: t('radar.off_ball'), score: d.offBallMovement, fullMark: 10 },
        { label: t('radar.defense'), score: d.defensiveAwareness, fullMark: 10 },
        { label: t('radar.pressing'), score: d.pressing, fullMark: 10 },
        { label: t('radar.transition'), score: d.transition, fullMark: 10 },
        { label: t('radar.decision'), score: d.decisionMaking, fullMark: 10 },
        { label: t('radar.space'), score: d.spaceOccupation, fullMark: 10 },
        { label: t('radar.shape'), score: d.teamShape, fullMark: 10 },
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
                        name="Tactical"
                        dataKey="score"
                        stroke="#a855f7" // Purple
                        fill="#a855f7"
                        fillOpacity={0.4}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};
