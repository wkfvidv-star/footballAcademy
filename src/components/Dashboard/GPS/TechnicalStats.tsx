
import React from 'react';
import { Target, CheckCircle, XCircle, MousePointer2 } from 'lucide-react';

interface TechnicalStatsProps {
    data: {
        x: number;
        y: number;
        type: 'pass' | 'shot' | 'interception' | 'tackle';
        outcome: 'success' | 'fail';
    }[];
}

export default function TechnicalStats({ data }: TechnicalStatsProps) {
    const totalEvents = data.length;
    const successEvents = data.filter(d => d.outcome === 'success').length;
    const successRate = totalEvents > 0 ? Math.round((successEvents / totalEvents) * 100) : 0;

    const passes = data.filter(d => d.type === 'pass');
    const shots = data.filter(d => d.type === 'shot');

    const passCompletion = passes.length > 0
        ? Math.round((passes.filter(p => p.outcome === 'success').length / passes.length) * 100)
        : 0;

    const stats = [
        { label: 'Success Rate', value: `${successRate}%`, icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
        { label: 'Pass Completion', value: `${passCompletion}%`, icon: div => <div className="text-blue-400 font-bold text-xs border border-blue-400 rounded px-0.5">P</div>, color: 'text-blue-400', bg: 'bg-blue-400/10' },
        { label: 'Total Actions', value: totalEvents, icon: MousePointer2, color: 'text-purple-400', bg: 'bg-purple-400/10' },
        { label: 'Shots', value: shots.length, icon: Target, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    ];

    return (
        <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
                <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-xl flex flex-col gap-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.bg} ${stat.color}`}>
                        {typeof stat.icon === 'function' ? stat.icon({}) : <stat.icon size={16} />}
                    </div>
                    <div>
                        <div className="text-xl font-bold">{stat.value}</div>
                        <div className="text-xs text-zinc-400">{stat.label}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
