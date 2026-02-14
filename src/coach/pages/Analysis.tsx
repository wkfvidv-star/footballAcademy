import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    LineChart, Map, Zap, TrendingUp,
    ChevronRight, Play, Download, Settings
} from 'lucide-react';
import { GlassCard } from '../../components/shared/GlassCard';
import PerformanceChart from '../components/PerformanceChart';

export default function Analysis() {
    const { t } = useTranslation();
    return (
        <div className="space-y-10 animate-in fade-in pb-12">
            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none mb-3">
                        {t('coach_analysis.title')}
                    </h1>
                    <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.2em]">
                        {t('coach_analysis.subtitle')}
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <button className="h-14 px-8 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all font-black uppercase text-[10px] tracking-widest text-white">
                        <Download className="w-5 h-5 mr-3 text-blue-500" />
                        {t('coach_analysis.download_raw')}
                    </button>
                    <button className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
                        <Settings className="w-5 h-5 text-zinc-400" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* --- MAIN CHART AREA --- */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-zinc-900 border border-white/5 rounded-[48px] p-10 min-h-[500px] flex flex-col relative overflow-hidden group">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h3 className="font-black text-2xl text-white italic uppercase tracking-tighter">{t('coach_analysis.workload_matrix')}</h3>
                                <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mt-1">{t('coach_analysis.workload_subtext')}</p>
                            </div>
                        </div>
                        <div className="flex-1 flex items-center justify-center border-2 border-dashed border-white/5 rounded-[32px]">
                            <div className="text-center">
                                <LineChart className="w-16 h-16 text-zinc-800 mx-auto mb-4" />
                                <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{t('coach_analysis.loading_viz')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-8 rounded-[40px] bg-white/2 border border-white/5 space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-500/10 rounded-2xl"><Map className="w-6 h-6 text-blue-500" /></div>
                                <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">{t('coach_analysis.tactical_heatmaps')}</h3>
                            </div>
                            <div className="aspect-square bg-zinc-950 rounded-3xl border border-white/5 relative overflow-hidden flex items-center justify-center">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-red-500/20 opacity-30" />
                                <span className="text-[10px] font-black text-zinc-700 uppercase tracking-widest relative z-10 italic">{t('coach_analysis.heatmap_preview')}</span>
                            </div>
                            <button className="w-full py-4 bg-white/5 border border-white/5 rounded-2xl font-black text-[10px] uppercase tracking-widest text-zinc-400 hover:text-white hover:border-blue-500/30 transition-all">{t('coach_analysis.launch_tech_map')}</button>
                        </div>

                        <div className="p-8 rounded-[40px] bg-white/2 border border-white/5 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 bg-emerald-500/10 rounded-2xl"><TrendingUp className="w-6 h-6 text-emerald-500" /></div>
                                    <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">{t('coach_analysis.kpi_correlations')}</h3>
                                </div>
                                <p className="text-zinc-500 font-bold uppercase text-xs leading-relaxed tracking-tight mb-8">
                                    {t('coach_analysis.correlation_insight')}
                                </p>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { label: t('coach_analysis.intensity_corr'), val: '0.92' },
                                    { label: t('coach_analysis.fatigue_load_ratio'), val: '1.14' },
                                ].map((stat, i) => (
                                    <div key={i} className="flex justify-between items-center p-4 bg-black/40 rounded-2xl">
                                        <span className="text-[10px] font-black text-zinc-500 uppercase italic">{stat.label}</span>
                                        <span className="text-sm font-black text-white italic">{stat.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- SIDEBAR INSIGHTS --- */}
                <div className="space-y-6">
                    <GlassCard title={t('coach_analysis.top_sprint_values')} icon={Zap} variant="primary">
                        <div className="py-2 space-y-4">
                            {[
                                { name: 'E. Haaland', val: '36.2 km/h' },
                                { name: 'K. Walker', val: '35.9 km/h' },
                                { name: 'P. Foden', val: '34.8 km/h' },
                            ].map((p, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl group hover:bg-blue-600/10 transition-all">
                                    <span className="text-xs font-black text-white italic uppercase">{p.name}</span>
                                    <span className="text-[11px] font-black text-blue-500">{p.val}</span>
                                </div>
                            ))}
                        </div>
                    </GlassCard>

                    <GlassCard title={t('coach_analysis.squad_distribution')} icon={TrendingUp} variant="muted">
                        <div className="py-6 flex flex-col items-center justify-center text-center">
                            <div className="w-32 h-32 rounded-full border-8 border-white/5 border-t-blue-500 rotate-45 mb-6" />
                            <div className="space-y-1">
                                <div className="text-2xl font-black text-white italic tracking-tighter">84.2</div>
                                <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{t('coach_analysis.global_index_avg')}</div>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
