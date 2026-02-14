import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    Users, Trophy, Activity, ClipboardList,
    AlertTriangle, ArrowUpRight, Play, UserPlus
} from 'lucide-react';
import { useMedical } from '../../context/MedicalContext';
import StatCard from '../components/StatCard';
import PerformanceChart from '../components/PerformanceChart';

export default function General() {
    const { t } = useTranslation();
    const { loadMetrics } = useMedical();

    const stats = [
        { label: t('coach.dashboard.stat_total_squad'), value: '24', change: '+2', icon: Users, trend: 'up' as const, trendValue: '8.5%' },
        { label: t('coach.dashboard.stat_active_players'), value: '21', change: '0', icon: Activity, trend: 'neutral' as const, subtext: t('coach.dashboard.stat_active_subtext', { count: 3 }) },
        { label: t('coach.dashboard.stat_avg_performance'), value: '8.4', change: '+0.2', icon: Trophy, trend: 'up' as const, trendValue: '+2.4%' },
        { label: t('coach.dashboard.stat_pending_evals'), value: '5', change: '-1', icon: ClipboardList, trend: 'down' as const, trendValue: 'Good' },
    ];

    return (
        <div className="space-y-6 md:space-y-10 animate-in fade-in pb-12">
            {/* --- HEADER & ACTIONS --- */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="text-center lg:text-left">
                    <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase italic leading-none mb-3">
                        {t('coach_general.title')}
                    </h1>
                    <p className="text-zinc-500 text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">
                        {t('coach_general.subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:flex items-center gap-4">
                    <button className="h-12 md:h-14 px-6 md:px-8 rounded-2xl bg-white/5 hover:bg-white/10 text-white flex items-center justify-center gap-3 border border-white/10 transition-all active:scale-95 group font-black uppercase tracking-widest text-[10px]">
                        <UserPlus className="w-5 h-5 text-blue-500" />
                        {t('coach_management.add_new_player')}
                    </button>
                    <button className="h-12 md:h-14 px-6 md:px-8 rounded-2xl bg-blue-600 text-white flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20 transition-all active:scale-95 group font-black uppercase tracking-widest text-[10px]">
                        <Play className="w-5 h-5 fill-current" />
                        {t('coach_programs.start_live')}
                    </button>
                </div>
            </div>

            {/* --- STAT GRID --- */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {stats.map((stat) => (
                    <StatCard
                        key={stat.label}
                        label={stat.label}
                        value={stat.value}
                        icon={stat.icon}
                        trend={stat.trend}
                        trendValue={stat.trendValue}
                        subtext={stat.subtext}
                    />
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
                {/* --- ANALYTICS CHART --- */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="bg-zinc-900 border border-white/5 rounded-[32px] md:rounded-[48px] p-6 md:p-10 min-h-[400px] md:min-h-[450px] flex flex-col relative overflow-hidden group hover:border-blue-500/20 transition-all">
                        <div className="absolute -right-24 -top-24 w-64 md:w-96 h-64 md:h-96 bg-blue-500/5 rounded-full blur-[100px] group-hover:bg-blue-500/10 transition-all"></div>

                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8 md:mb-10 z-10">
                            <div>
                                <h3 className="font-black text-xl md:text-2xl text-white italic uppercase tracking-tighter">{t('coach_analysis.workload_matrix')}</h3>
                                <p className="text-[9px] md:text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em] mt-1 italic">{t('coach_general.cumulative_kpi')}</p>
                            </div>
                            <select className="bg-white/5 border border-white/10 rounded-2xl px-4 py-2 text-[9px] font-black uppercase tracking-widest text-zinc-400 focus:outline-none focus:border-blue-500/50 transition-colors w-fit">
                                <option>{t('coach.dashboard.last_30_days')}</option>
                                <option>{t('coach.dashboard.season_to_date')}</option>
                            </select>
                        </div>

                        <div className="flex-1 relative z-10">
                            <PerformanceChart />
                        </div>
                    </div>
                </div>

                {/* --- ALERTS & ACTIVITY --- */}
                <div className="space-y-6 md:space-y-8">
                    {/* Alerts Section */}
                    <div className="bg-zinc-900 border border-white/5 rounded-[32px] p-6 md:p-8">
                        <h3 className="font-black text-white uppercase italic tracking-tighter mb-6 flex items-center gap-3">
                            <AlertTriangle className="w-5 h-5 text-amber-500" />
                            {t('coach.dashboard.critical_alerts')}
                        </h3>
                        <div className="space-y-4">
                            {loadMetrics?.riskLevel && (loadMetrics.riskLevel === 'high' || loadMetrics.riskLevel === 'critical') && (
                                <div className="p-4 md:p-5 bg-red-500/5 border border-red-500/10 rounded-2xl flex items-start gap-4 animate-pulse">
                                    <div className="p-2 bg-red-500/20 rounded-xl mt-1"><AlertTriangle className="w-4 h-4 text-red-500" /></div>
                                    <div>
                                        <div className="text-xs md:text-sm font-black text-white uppercase italic">{t('coach_general.high_injury_risk')}</div>
                                        <div className="text-[9px] md:text-[10px] text-zinc-500 font-bold uppercase tracking-wide mt-1">
                                            {t('coach_general.injury_risk_subtext', { name: 'Riyad Mahrez', acwr: loadMetrics.acwr })}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="p-4 md:p-5 bg-amber-500/5 border border-amber-500/10 rounded-2xl flex items-start gap-4">
                                <div className="p-2 bg-amber-500/20 rounded-xl mt-1"><Activity className="w-4 h-4 text-amber-500" /></div>
                                <div>
                                    <div className="text-xs md:text-sm font-black text-white uppercase italic">{t('coach.dashboard.performance_drop')}</div>
                                    <div className="text-[9px] md:text-[10px] text-zinc-500 font-bold uppercase tracking-wide mt-1">Midfield Unit (-15%)</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-zinc-900 border border-white/5 rounded-[32px] p-6 md:p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-black text-white uppercase italic tracking-tighter">{t('coach.dashboard.recent_activity')}</h3>
                            <button className="text-[9px] font-black text-blue-500 hover:underline uppercase tracking-widest">{t('common.viewAll')}</button>
                        </div>
                        <div className="space-y-3 md:space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-4 p-3 md:p-4 hover:bg-white/2 rounded-2xl transition-all border border-transparent hover:border-white/5 cursor-pointer group">
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-zinc-800 rounded-2xl flex items-center justify-center text-[9px] md:text-[10px] font-black text-zinc-500 group-hover:bg-blue-600/20 group-hover:text-blue-500 transition-all border border-white/5">
                                        P{i}
                                    </div>
                                    <div>
                                        <div className="text-[10px] md:text-[11px] font-black text-white uppercase italic">{t('coach.dashboard.eval_completed')}</div>
                                        <div className="text-[8px] md:text-[9px] text-zinc-500 font-bold uppercase tracking-tight mt-0.5">
                                            {t('coach.dashboard.eval_subtext', { name: i === 1 ? 'Mahrez' : i === 2 ? 'De Bruyne' : 'Rodri', time: i * 2 + 'h' })}
                                        </div>
                                    </div>
                                    <div className="ml-auto">
                                        <ArrowUpRight className="w-4 h-4 text-zinc-700 group-hover:text-blue-500 transition-colors" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
