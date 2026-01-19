import { type LucideIcon, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface StatCardProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    trend?: 'up' | 'down' | 'neutral';
    trendValue?: string;
    subtext?: string;
    className?: string;
}

export default function StatCard({ label, value, icon: Icon, trend, trendValue, subtext, className = '' }: StatCardProps) {
    const trendColors = {
        up: 'text-emerald-400',
        down: 'text-red-400',
        neutral: 'text-zinc-400',
    };

    const TrendIcon = trend === 'up' ? ArrowUpRight : trend === 'down' ? ArrowDownRight : Minus;

    return (
        <div className={`bg-card/50 border border-white/5 p-5 rounded-2xl flex flex-col justify-between hover:bg-card/70 transition-colors ${className}`}>
            <div className="flex justify-between items-start mb-2">
                <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                    <Icon className="w-5 h-5" />
                </div>
                {trend && (
                    <div className={`flex items-center text-xs font-bold gap-1 px-2 py-1 rounded-full bg-white/5 ${trendColors[trend]}`}>
                        <TrendIcon className="w-3 h-3" />
                        <span>{trendValue}</span>
                    </div>
                )}
            </div>

            <div>
                <div className="text-2xl font-bold text-white tracking-tight">{value}</div>
                <div className="text-xs font-medium text-zinc-500 mt-1">{label}</div>
                {subtext && <div className="text-[10px] text-zinc-600 mt-2 border-t border-white/5 pt-2">{subtext}</div>}
            </div>
        </div>
    );
}
