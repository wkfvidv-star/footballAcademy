import { ArrowUpRight, Users, Trophy, Activity, ClipboardList, Play, UserPlus, AlertTriangle } from 'lucide-react';
import StatCard from './components/StatCard';
import PerformanceChart from './components/PerformanceChart';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMedical } from '../context/MedicalContext';

export default function CoachDashboard() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { loadMetrics } = useMedical();

    const stats = [
        { label: t('coach.dashboard.stat_total_squad'), value: '24', change: '+2', icon: Users, trend: 'up' as const, trendValue: '8.5%' },
        { label: t('coach.dashboard.stat_active_players'), value: '21', change: '0', icon: Activity, trend: 'neutral' as const, subtext: t('coach.dashboard.stat_active_subtext', { count: 3 }) },
        { label: t('coach.dashboard.stat_avg_performance'), value: '8.4', change: '+0.2', icon: Trophy, trend: 'up' as const, trendValue: '+2.4%' },
        { label: t('coach.dashboard.stat_pending_evals'), value: '5', change: '-1', icon: ClipboardList, trend: 'down' as const, trendValue: 'Good' },
    ];

    return (
        <div className="space-y-8 max-w-[1600px] mx-auto">
            {/* Header & Quick Actions */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight mb-2">{t('coach.dashboard.title')}</h1>
                    <p className="text-zinc-400 font-medium">{t('coach.dashboard.subtitle')}</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => navigate('/coach/squad')}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all border border-white/10"
                    >
                        <UserPlus className="w-4 h-4" />
                        <span>{t('coach.dashboard.add_player')}</span>
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-background rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                        <Play className="w-4 h-4 fill-current" />
                        <span>{t('coach.dashboard.start_session')}</span>
                    </button>
                </div>
            </div>

            {/* Stat Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Main Content Area (Chart Placeholder) */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="bg-card/30 border border-white/5 rounded-3xl p-6 min-h-[400px] flex flex-col relative overflow-hidden">
                        <div className="flex justify-between items-center mb-6 z-10">
                            <h3 className="font-bold text-lg text-white">{t('coach.dashboard.performance_trends')}</h3>
                            <select className="bg-black/20 border border-white/10 rounded-lg px-3 py-1 text-xs text-zinc-400">
                                <option>{t('coach.dashboard.last_30_days')}</option>
                                <option>{t('coach.dashboard.season_to_date')}</option>
                            </select>
                        </div>
                        <PerformanceChart />
                    </div>
                </div>

                {/* Side Panel (Alerts & Activity) */}
                <div className="space-y-6">
                    {/* Alerts Section */}
                    <div className="bg-card/30 border border-white/5 rounded-3xl p-6">
                        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-amber-500" />
                            {t('coach.dashboard.critical_alerts')}
                        </h3>
                        <div className="space-y-3">
                            {/* Dynamic High Risk Alert */}
                            {loadMetrics?.riskLevel && (loadMetrics.riskLevel === 'high' || loadMetrics.riskLevel === 'critical') && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 animate-pulse">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5"></div>
                                    <div>
                                        <div className="text-sm font-bold text-white uppercase tracking-wider">High Injury Risk</div>
                                        <div className="text-xs text-zinc-400 mt-0.5">Riyad Mahrez (ACWR: {loadMetrics.acwr})</div>
                                    </div>
                                </div>
                            )}

                            {/* Fallback Static Alert (re-contextualized) */}
                            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5"></div>
                                <div>
                                    <div className="text-sm font-bold text-white">{t('coach.dashboard.performance_drop')}</div>
                                    <div className="text-xs text-zinc-400 mt-0.5">Midfield Unit (-15%)</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Evals */}
                    <div className="bg-card/30 border border-white/5 rounded-3xl p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-white">{t('coach.dashboard.recent_activity')}</h3>
                            <button className="text-xs text-primary font-bold hover:underline">{t('common.viewAll')}</button>
                        </div>
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-colors cursor-pointer group">
                                    <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-xs font-bold text-zinc-500 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                                        P{i}
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-white">{t('coach.dashboard.eval_completed')}</div>
                                        <div className="text-xs text-zinc-500">
                                            {t('coach.dashboard.eval_subtext', { name: 'Carter', time: '2h' })}
                                        </div>
                                    </div>
                                    <div className="ml-auto">
                                        <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />
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
