import { useTranslation } from 'react-i18next';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { Download, Filter, Calendar } from 'lucide-react';

const mockPerformanceData = [
    { name: 'Week 1', physical: 65, technical: 70, tactical: 60, mental: 75 },
    { name: 'Week 2', physical: 68, technical: 72, tactical: 62, mental: 74 },
    { name: 'Week 3', physical: 72, technical: 75, tactical: 65, mental: 78 },
    { name: 'Week 4', physical: 70, technical: 78, tactical: 68, mental: 80 },
    { name: 'Week 5', physical: 75, technical: 80, tactical: 72, mental: 82 },
    { name: 'Week 6', physical: 78, technical: 82, tactical: 75, mental: 85 },
];

const mockComparisonData = [
    { name: 'Sprint Speed', squad: 82, academy: 78 },
    { name: 'Stamina', squad: 75, academy: 72 },
    { name: 'Passing', squad: 88, academy: 80 },
    { name: 'Shooting', squad: 70, academy: 75 },
    { name: 'Tactical Awareness', squad: 85, academy: 82 },
];

export default function Analytics() {
    const { t } = useTranslation();

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight mb-2">{t('coach.analytics.title')}</h1>
                    <p className="text-zinc-400 font-medium">{t('coach.analytics.subtitle')}</p>
                </div>

                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all border border-white/10">
                        <Calendar className="w-4 h-4" />
                        <span>{t('coach.analytics.last_30_days')}</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all border border-white/10">
                        <Filter className="w-4 h-4" />
                        <span>{t('common.filter')}</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary/90 text-background rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                        <Download className="w-4 h-4" />
                        <span>{t('common.export')}</span>
                    </button>
                </div>
            </div>

            {/* Main Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Performance Trend */}
                <div className="bg-card/30 border border-white/5 rounded-3xl p-6 min-h-[400px] flex flex-col">
                    <h3 className="font-bold text-lg text-white mb-6">{t('coach.analytics.performance_over_time')}</h3>
                    <div className="flex-1 w-full h-full min-h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={mockPerformanceData}>
                                <defs>
                                    <linearGradient id="colorOvr" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                                    itemStyle={{ color: '#e4e4e7' }}
                                />
                                <Legend />
                                <Area type="monotone" dataKey="technical" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colorOvr)" name={t('shared.technical')} />
                                <Area type="monotone" dataKey="physical" stroke="#3b82f6" strokeWidth={3} fillOpacity={0} fill="url(#colorPhys)" name={t('shared.physical')} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Squad vs Academy Comparison */}
                <div className="bg-card/30 border border-white/5 rounded-3xl p-6 min-h-[400px] flex flex-col">
                    <h3 className="font-bold text-lg text-white mb-6">{t('coach.analytics.squad_vs_academy')}</h3>
                    <div className="flex-1 w-full h-full min-h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={mockComparisonData} layout="vertical" margin={{ left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" horizontal={false} />
                                <XAxis type="number" stroke="#52525b" hide />
                                <YAxis dataKey="name" type="category" stroke="#a1a1aa" fontSize={12} width={100} tickLine={false} axisLine={false} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                                    itemStyle={{ color: '#e4e4e7' }}
                                />
                                <Legend />
                                <Bar dataKey="squad" name={t('coach.dashboard.stat_total_squad')} fill="#22c55e" radius={[0, 4, 4, 0]} barSize={20} />
                                <Bar dataKey="academy" name={t('coach.analytics.academy_avg')} fill="#3f3f46" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card/30 border border-white/5 rounded-3xl p-6">
                    <div className="text-zinc-400 text-sm font-medium mb-1">{t('coach.analytics.top_performer')}</div>
                    <div className="text-2xl font-black text-white">Riadh Necir</div>
                    <div className="text-primary text-sm font-bold mt-1">+12% vs Avg</div>
                </div>
                <div className="bg-card/30 border border-white/5 rounded-3xl p-6">
                    <div className="text-zinc-400 text-sm font-medium mb-1">{t('coach.analytics.most_improved')}</div>
                    <div className="text-2xl font-black text-white">Adam Ounas</div>
                    <div className="text-blue-400 text-sm font-bold mt-1">+5.4 OVR (30d)</div>
                </div>
                <div className="bg-card/30 border border-white/5 rounded-3xl p-6">
                    <div className="text-zinc-400 text-sm font-medium mb-1">{t('coach.analytics.injury_rate')}</div>
                    <div className="text-2xl font-black text-white">4.2%</div>
                    <div className="text-green-500 text-sm font-bold mt-1">-2.1% (Low)</div>
                </div>
            </div>
        </div>
    );
}
