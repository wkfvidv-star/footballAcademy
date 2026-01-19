import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { useMental } from '../../context/MentalContext';

export const MentalRadar = () => {
    const { mentalProfile } = useMental();
    const d = mentalProfile.dimensions;

    // Safety check if dimensions are empty
    if (Object.keys(d).length === 0) return null;

    const data = [
        { label: 'Confidence', score: d.confidence, fullMark: 10 },
        { label: 'Focus', score: d.focus, fullMark: 10 },
        { label: 'Control', score: d.emotionalControl, fullMark: 10 },
        { label: 'Motivation', score: d.motivation, fullMark: 10 },
        { label: 'Discipline', score: d.discipline, fullMark: 10 },
        { label: 'Resilience', score: d.stressManagement, fullMark: 10 }, // Mapped from stressManagement
        { label: 'Coachability', score: d.coachability, fullMark: 10 },
        { label: 'Mindset', score: d.competitiveness, fullMark: 10 },
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
