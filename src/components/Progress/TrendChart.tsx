import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { PlayerMetrics } from '../../types';

interface TrendChartProps {
    history: PlayerMetrics[];
}

export default function TrendChart({ history }: TrendChartProps) {
    const data = history.map(h => ({
        date: new Date(h.lastUpdated).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        ovr: h.overallValid
    }));

    return (
        <div className="w-full h-[200px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis
                        dataKey="date"
                        tick={{ fill: '#71717a', fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        domain={['dataMin - 5', 'dataMax + 5']}
                        hide
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '8px' }}
                        itemStyle={{ color: '#22c55e' }}
                        labelStyle={{ color: '#71717a', marginBottom: '4px' }}
                    />
                    <Line
                        type="monotone"
                        dataKey="ovr"
                        stroke="#22c55e"
                        strokeWidth={3}
                        dot={{ fill: '#09090b', stroke: '#22c55e', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, fill: '#22c55e' }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
