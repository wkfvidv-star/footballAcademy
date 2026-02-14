import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertCircle, Map, ShieldAlert, Activity, Heart } from 'lucide-react';
import InjuryDetectionDashboard from '../../components/Dashboard/InjuryDetectionDashboard';
import { GlassCard } from '../../components/shared/GlassCard';

export default function Injury() {
    const { t } = useTranslation();
    return (
        <div className="space-y-10 animate-in fade-in pb-12">
            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none mb-3">
                        {t('injury_monitoring.title')}
                    </h1>
                    <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.2em]">
                        {t('injury_monitoring.subtitle')}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <InjuryDetectionDashboard />
                </div>

                <div className="space-y-6">
                    <GlassCard title={t('injury_monitoring.body_map')} icon={Map} variant="primary">
                        <div className="py-6 flex flex-col items-center justify-center min-h-[300px] border-2 border-dashed border-white/5 rounded-[40px] bg-white/2">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                                <Activity className="w-8 h-8 text-zinc-700" />
                            </div>
                            <p className="text-xs text-zinc-600 font-bold uppercase tracking-widest">{t('injury_monitoring.scan_pending')}</p>
                            <button className="mt-8 px-6 py-3 bg-primary text-zinc-900 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform">
                                {t('injury_monitoring.start_scan')}
                            </button>
                        </div>
                    </GlassCard>

                    <div className="p-8 rounded-[40px] bg-red-500/5 border border-red-500/10 space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-red-500/10 rounded-2xl"><ShieldAlert className="w-6 h-6 text-red-500" /></div>
                            <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">{t('injury_monitoring.zones_of_concern')}</h3>
                        </div>
                        <div className="space-y-4">
                            {[
                                { area: t('injury_monitoring.hamstring'), risk: '72%', status: t('injury_monitoring.high_risk') },
                                { area: t('injury_monitoring.ankle'), risk: '15%', status: t('injury_monitoring.stable') },
                            ].map((zone, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5">
                                    <span className="text-[10px] font-black text-white uppercase italic">{zone.area}</span>
                                    <span className={`text-[9px] font-black uppercase ${zone.risk > '50%' ? 'text-red-500' : 'text-zinc-500'}`}>{zone.risk}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
