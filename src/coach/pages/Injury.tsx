import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, ShieldAlert, Activity, Filter, Download, LineChart, AlertCircle, Map, Heart, ClipboardList, TrendingUp } from 'lucide-react';
import { GlassCard } from '../../components/shared/GlassCard';

export default function Injury() {
    const { t } = useTranslation();
    return (
        <div className="space-y-10 animate-in fade-in pb-12">
            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none mb-3">
                        {t('coach_injury.title')}
                    </h1>
                    <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.2em]">
                        {t('coach_injury.subtitle')}
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <button className="h-14 px-8 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all font-black uppercase text-[10px] tracking-widest text-white">
                        <ClipboardList className="w-5 h-5 mr-3 text-red-500" />
                        {t('coach_injury.full_incident_log')}
                    </button>
                    <button className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
                        <Filter className="w-5 h-5 text-zinc-400" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* --- MAIN RISK AREA --- */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-zinc-900 border border-white/5 rounded-[48px] p-10 min-h-[500px] relative overflow-hidden group">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h3 className="font-black text-2xl text-white italic uppercase tracking-tighter">{t('coach_injury.risk_heatmap')}</h3>
                                <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mt-1">{t('coach_injury.fatigue_vs_load')}</p>
                            </div>
                        </div>
                        <div className="flex-1 flex items-center justify-center border-2 border-dashed border-white/5 rounded-[32px] min-h-[350px]">
                            <div className="text-center">
                                <Activity className="w-16 h-16 text-zinc-800 mx-auto mb-4" />
                                <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{t('coach_injury.loading_dist')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-8 rounded-[40px] bg-white/2 border border-white/5 space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-red-500/10 rounded-2xl"><AlertCircle className="w-6 h-6 text-red-500" /></div>
                                <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">{t('coach_injury.high_risk_alerts')}</h3>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { name: 'Bernardo Silva', risk: 'High', area: t('coach_injury.lower_body'), type: t('coach_injury.tension') },
                                    { name: 'Nathan Ake', risk: 'Medium', area: t('coach_injury.lower_body'), type: t('coach_injury.tension') },
                                ].map((alert, i) => (
                                    <div key={i} className="p-4 bg-white/2 rounded-2xl border border-white/5 group hover:bg-red-500/5 transition-all">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-black text-white italic uppercase">{alert.name}</span>
                                            <span className="text-[9px] font-black text-red-500 uppercase">{alert.risk}</span>
                                        </div>
                                        <div className="text-[9px] text-zinc-500 font-bold uppercase mt-1">{alert.area} • {alert.type}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-8 rounded-[40px] bg-white/2 border border-white/5 flex flex-col justify-between">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-blue-500/10 rounded-2xl"><Heart className="w-6 h-6 text-blue-500" /></div>
                                <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">{t('coach_injury.medical_insights')}</h3>
                            </div>
                            <p className="text-zinc-500 font-bold uppercase text-xs leading-relaxed tracking-tight">
                                {t('coach_injury.medical_insight_desc')}
                            </p>
                            <div className="mt-8 flex gap-4">
                                <div className="flex-1 h-1 bg-blue-500/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 w-[78%]" />
                                </div>
                                <span className="text-[10px] font-black text-white italic lowercase">78% {t('coach_injury.total_fatigue')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- SQUAD AVAILABILITY --- */}
                <div className="space-y-6">
                    <GlassCard title={t('coach_management.status')} icon={ShieldAlert} variant="primary">
                        <div className="py-6 flex flex-col items-center justify-center text-center">
                            <div className="relative mb-8">
                                <Activity className="w-32 h-32 text-emerald-500/20" />
                                <div className="absolute inset-0 flex items-center justify-center text-4xl font-black text-white italic">21/24</div>
                            </div>
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                                {t('coach_injury.players_ready', { ready: 21, total: 24 })}
                            </p>
                        </div>
                    </GlassCard>

                    <GlassCard title={t('coach_injury.full_incident_log')} icon={Map} variant="muted">
                        <div className="py-2 space-y-4">
                            {[
                                { status: t('coach_management.recovering'), count: 2 },
                                { status: t('coach_injury.in_recovery'), count: 1 },
                                { status: t('coach_injury.long_term'), count: 0 },
                            ].map((s, i) => (
                                <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                                    <span className="text-[10px] font-black text-zinc-500 uppercase italic">{s.status}</span>
                                    <span className="text-sm font-black text-white italic">{s.count}</span>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
