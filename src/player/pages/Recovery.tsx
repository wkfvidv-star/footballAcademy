import React from 'react';
import { useTranslation } from 'react-i18next';
import { HeartPulse, Moon, Zap, Waves, Wind } from 'lucide-react';
import RecoveryModule from '../../components/Recovery/RecoveryModule';
import { GlassCard } from '../../components/shared/GlassCard';

export default function Recovery() {
    const { t } = useTranslation();
    return (
        <div className="space-y-10 animate-in fade-in pb-12">
            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none mb-3">
                        {t('recovery_center.title')}
                    </h1>
                    <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.2em]">
                        {t('recovery_center.subtitle')}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <RecoveryModule />
                </div>

                <div className="space-y-6">
                    <GlassCard title={t('recovery_center.sleep_analysis')} icon={Moon} variant="primary">
                        <div className="py-4 space-y-8">
                            <div className="flex items-end justify-between">
                                <div>
                                    <div className="text-5xl font-black text-white italic tracking-tighter mb-1">8.5h</div>
                                    <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{t('recovery_center.deep_sleep_score')}</div>
                                </div>
                                <div className="p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                                    <Moon className="w-6 h-6 text-indigo-400" />
                                </div>
                            </div>

                            <div className="p-5 bg-white/5 rounded-[28px] border border-white/5">
                                <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-3 italic">{t('recovery_center.ai_insight')}</h4>
                                <p className="text-xs text-zinc-500 font-bold uppercase tracking-tight leading-relaxed">
                                    {t('recovery_center.hrv_insight')}
                                </p>
                            </div>
                        </div>
                    </GlassCard>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-6 bg-zinc-900 border border-white/5 rounded-[32px] flex flex-col items-center text-center">
                            <Waves className="w-6 h-6 text-blue-500 mb-3" />
                            <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1">{t('recovery_center.cold_plunge')}</div>
                            <div className="text-lg font-black text-white italic">14°C / 5m</div>
                        </div>
                        <div className="p-6 bg-zinc-900 border border-white/5 rounded-[32px] flex flex-col items-center text-center">
                            <Wind className="w-6 h-6 text-emerald-500 mb-3" />
                            <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1">{t('recovery_center.oxygen_hub')}</div>
                            <div className="text-lg font-black text-white italic">{t('recovery_center.high_flow')}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
