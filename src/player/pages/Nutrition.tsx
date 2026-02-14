import React from 'react';
import { useTranslation } from 'react-i18next';
import { Utensils, Apple, Coffee, Moon, Zap, Info } from 'lucide-react';
import NutritionModule from '../../components/Nutrition/NutritionModule';
import { GlassCard } from '../../components/shared/GlassCard';

export default function Nutrition() {
    const { t } = useTranslation();
    return (
        <div className="space-y-6 md:space-y-10 animate-in fade-in pb-12">
            {/* --- HEADER --- */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="text-center lg:text-left">
                    <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase italic leading-none mb-3">
                        {t('nutrition_hub.title')}
                    </h1>
                    <p className="text-zinc-500 text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">
                        {t('nutrition_hub.subtitle')}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
                <div className="xl:col-span-2">
                    <NutritionModule />
                </div>

                <div className="space-y-6">
                    <GlassCard title={t('nutrition_hub.pre_match_fuel')} icon={Zap} variant="primary">
                        <div className="py-2 space-y-4 md:space-y-6">
                            <p className="text-[11px] md:text-xs text-zinc-500 font-bold uppercase tracking-tight leading-relaxed">
                                {t('nutrition_hub.pre_match_desc')}
                            </p>
                            <div className="space-y-3">
                                {[
                                    { label: t('nutrition_hub.meals.oatmeal'), time: '08:00 AM' },
                                    { label: t('nutrition_hub.meals.pasta'), time: '12:30 PM' },
                                    { label: t('nutrition_hub.meals.energy_bar'), time: '15:30 PM' },
                                ].map((item, i) => (
                                    <div key={i} className="p-3 md:p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between">
                                        <span className="text-[9px] md:text-[10px] font-black text-white uppercase italic">{item.label}</span>
                                        <span className="text-[8px] md:text-[9px] font-black text-primary uppercase">{item.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard title={t('nutrition_hub.hydration')} icon={Apple} variant="muted">
                        <div className="py-4 md:py-6 flex flex-col items-center justify-center text-center">
                            <div className="text-5xl md:text-6xl font-black text-primary italic mb-2 tracking-tighter">94%</div>
                            <div className="text-[9px] md:text-[10px] font-black text-zinc-500 uppercase tracking-widest">{t('nutrition_hub.optimal_range')}</div>
                            <div className="mt-6 md:mt-8 w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: '94%' }} />
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
