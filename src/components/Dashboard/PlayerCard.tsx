import { TrendingUp, Activity, Brain, Zap, ArrowUpRight, Target, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getPlayerProgression } from '../../services/progressionService';
import { useState } from 'react';

interface PlayerCardProps {
    variant?: 'default' | 'hero' | 'stats';
}

export default function PlayerCard({ variant = 'default' }: PlayerCardProps) {
    const { t } = useTranslation();
    const ovr = 87;
    const progression = getPlayerProgression(ovr);
    const [showOvrBreakdown, setShowOvrBreakdown] = useState(false);

    const stats = [
        { label: t('card.physical'), value: 85, icon: Zap, color: 'text-yellow-400' },
        { label: t('card.technical'), value: 92, icon: Activity, color: 'text-blue-400' },
        { label: t('card.tactical'), value: 78, icon: Brain, color: 'text-purple-400' },
        { label: t('card.mental'), value: 88, icon: TrendingUp, color: 'text-red-400' },
    ];

    if (variant === 'hero') {
        return (
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 p-4">
                <div className="flex flex-col items-center md:items-start relative group">
                    <h2 className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-1">{t('card.overall')}</h2>
                    <div
                        className="flex items-end gap-2 cursor-pointer relative"
                        onMouseEnter={() => setShowOvrBreakdown(true)}
                        onMouseLeave={() => setShowOvrBreakdown(false)}
                    >
                        <div className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white tracking-tighter group-hover:text-primary transition-colors">
                            {ovr}
                        </div>
                        <div className="mb-2">
                            <span className="text-2xl text-primary font-bold">OVR</span>
                        </div>
                        <Info className="w-4 h-4 text-zinc-500 mb-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* OVR Breakdown Tooltip */}
                    {showOvrBreakdown && (
                        <div className="absolute top-full mt-4 start-0 bg-card/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl z-50 min-w-[280px]">
                            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">{t('card.breakdown')}</h4>
                            <div className="space-y-2">
                                {stats.map((stat) => (
                                    <div key={stat.label} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <stat.icon className={`w-3.5 h-3.5 ${stat.color}`} />
                                            <span className="text-xs text-zinc-300">{stat.label}</span>
                                        </div>
                                        <span className="text-sm font-bold text-white">{stat.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-5 lg:gap-6">
                    <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm flex items-center gap-2">
                        <Target className="w-5 h-5 text-emerald-400" />
                        <div className="flex flex-col">
                            <span className="text-zinc-400 text-[10px] uppercase font-bold tracking-tight">{t('card.potential')}</span>
                            <span className="text-emerald-400 font-bold text-lg leading-none">{progression.potential}</span>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        {progression.trends.map(trend => (
                            <div key={trend.label} className="px-3 py-2 bg-primary/10 rounded-xl border border-primary/20 flex flex-col justify-center">
                                <div className="flex items-center gap-1.5">
                                    <span className="text-[10px] font-bold text-zinc-400 uppercase">{trend.label}</span>
                                    <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                                </div>
                                <span className="text-white font-bold text-lg leading-none">+{trend.delta}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (variant === 'stats') {
        return (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-card p-6 rounded-2xl border border-white/5 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all group flex flex-col gap-4 cursor-pointer">
                        <div className="flex items-center justify-between">
                            <div className="p-2.5 rounded-lg bg-secondary group-hover:bg-primary/10 transition-colors">
                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                            </div>
                            <span className="text-white font-black text-3xl group-hover:text-primary transition-colors">{stat.value}</span>
                        </div>
                        <div>
                            <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider">{stat.label}</span>
                            <div className="mt-3 h-2 bg-secondary rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary rounded-full transition-all duration-1000 group-hover:bg-accent"
                                    style={{ width: `${stat.value}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="bg-card rounded-2xl p-5 border border-white/5 shadow-lg relative overflow-hidden">
            {/* Decorative gradient background element */}
            <div className="absolute top-0 end-0 w-32 h-32 bg-primary/10 blur-[50px] rounded-full pointer-events-none"></div>

            <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                    <h2 className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-1">{t('card.overall')}</h2>
                    <div className="flex items-end gap-2">
                        <div className="text-5xl font-black text-white tracking-tighter">
                            {ovr}
                        </div>
                        <div className="mb-1">
                            <span className="text-lg text-primary font-bold">OVR</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                    <div className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm flex items-center gap-1.5">
                        <Target className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-zinc-300 text-[10px] uppercase font-bold tracking-tight">{t('card.potential')}</span>
                        <span className="text-emerald-400 font-bold text-sm">{progression.potential}</span>
                    </div>

                    <div className="flex gap-1">
                        {progression.trends.map(trend => (
                            <div key={trend.label} className="px-2 py-0.5 bg-primary/10 rounded-md border border-primary/20 flex items-center gap-1">
                                <span className="text-[10px] font-bold text-primary">{trend.label}</span>
                                <span className="text-[10px] font-bold text-white">+{trend.delta}</span>
                                <ArrowUpRight className="w-2.5 h-2.5 text-emerald-400" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 relative z-10">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-secondary/50 p-3 rounded-xl border border-white/5 hover:border-primary/20 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                            <stat.icon className={`w-4 h-4 ${stat.color}`} />
                            <span className="text-zinc-400 text-xs">{stat.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                                <div className="h-full bg-white rounded-full" style={{ width: `${stat.value}%` }}></div>
                            </div>
                            <span className="text-white font-bold text-sm">{stat.value}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
