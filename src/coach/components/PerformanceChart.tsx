import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useTranslation } from 'react-i18next';

export default function PerformanceChart() {
    const { t } = useTranslation();

    const data = [
        { name: 'Jan', value: 65, avg: 60 },
        { name: 'Feb', value: 72, avg: 62 },
        { name: 'Mar', value: 68, avg: 63 },
        { name: 'Apr', value: 75, avg: 65 },
        { name: 'May', value: 82, avg: 68 },
        { name: 'Jun', value: 78, avg: 70 },
        { name: 'Jul', value: 85, avg: 72 },
    ];

    return (
        <div className="w-full h-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#71717a', fontSize: 12 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#71717a', fontSize: 12 }}
                        domain={[0, 100]}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#18181b',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                        itemStyle={{ fontSize: '12px' }}
                        labelStyle={{ color: '#a1a1aa', marginBottom: '4px' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#22c55e"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorValue)"
                        name={t('coach.dashboard.team_avg', 'Team Avg')}
                    />
                    <Area
                        type="monotone"
                        dataKey="avg"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        fill="none"
                        name={t('coach.dashboard.league_avg', 'League Avg')}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
