import React from 'react';
import { useTranslation } from 'react-i18next';
import { Utensils, Apple, Coffee, Zap, TrendingUp, AlertCircle, LayoutList } from 'lucide-react';
import { GlassCard } from '../../components/shared/GlassCard';

export default function Nutrition() {
    const { t } = useTranslation();
    return (
        <div className="space-y-10 animate-in fade-in pb-12">
            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none mb-3">
                        {t('coach_nutrition.title')}
                    </h1>
                    <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.2em]">
                        {t('coach_nutrition.subtitle')}
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <button className="h-14 px-8 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all font-black uppercase text-[10px] tracking-widest text-white">
                        <LayoutList className="w-5 h-5 mr-3 text-emerald-500" />
                        {t('coach_nutrition.modify_meal_plan')}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* --- MAIN ADHERENCE AREA --- */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-zinc-900 border border-white/5 rounded-[48px] p-10 min-h-[450px] relative overflow-hidden group">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h3 className="font-black text-2xl text-white italic uppercase tracking-tighter">{t('coach_nutrition.meal_adherence')}</h3>
                                <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mt-1">{t('coach_nutrition.actual_vs_target')}</p>
                            </div>
                        </div>
                        <div className="flex-1 flex items-center justify-center border-2 border-dashed border-white/5 rounded-[32px] min-h-[300px]">
                            <div className="text-center">
                                <TrendingUp className="w-16 h-16 text-zinc-800 mx-auto mb-4" />
                                <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{t('coach_nutrition.loading_compliance')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-8 rounded-[40px] bg-white/2 border border-white/5 space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-emerald-500/10 rounded-2xl"><Apple className="w-6 h-6 text-emerald-500" /></div>
                                <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">{t('coach_nutrition.sup_compliance')}</h3>
                            </div>
                            <div className="space-y-6">
                                {[
                                    { label: t('coach_nutrition.supplements.whey'), val: '98%' },
                                    { label: t('coach_nutrition.supplements.magnesium'), val: '72%' },
                                    { label: t('coach_nutrition.supplements.omega3'), val: '84%' },
                                ].map((sup, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                            <span className="text-zinc-500">{sup.label}</span>
                                            <span className="text-white italic">{sup.val}</span>
                                        </div>
                                        <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500" style={{ width: sup.val }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-8 rounded-[40px] bg-amber-500/5 border border-amber-500/10 flex flex-col justify-center">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-amber-500/20 rounded-2xl"><AlertCircle className="w-6 h-6 text-amber-500" /></div>
                                <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">{t('coach_nutrition.vitamin_alert')}</h3>
                            </div>
                            <p className="text-zinc-500 font-bold uppercase text-xs leading-relaxed tracking-tight">
                                {t('coach_nutrition.vitamin_alert_desc')}
                            </p>
                            <button className="mt-8 text-[10px] font-black text-amber-500 uppercase tracking-widest hover:underline text-left">{t('coach_nutrition.view_affected')}</button>
                        </div>
                    </div>
                </div>

                {/* --- MACRO SUMMARY --- */}
                <div className="space-y-6">
                    <GlassCard title={t('coach_nutrition.macro_mix')} icon={Utensils} variant="primary">
                        <div className="py-8 flex flex-col items-center justify-center">
                            <div className="w-48 h-48 rounded-full border-[16px] border-zinc-800 border-t-emerald-500 border-r-blue-500 border-b-amber-500 mb-8" />
                            <div className="grid grid-cols-2 gap-x-8 gap-y-4 w-full px-4">
                                {[
                                    { label: t('coach_nutrition.nutrients.protein'), col: 'bg-emerald-500' },
                                    { label: t('coach_nutrition.nutrients.carbs'), col: 'bg-blue-500' },
                                    { label: t('coach_nutrition.nutrients.fats'), col: 'bg-amber-500' },
                                    { label: t('coach_nutrition.nutrients.fiber'), col: 'bg-zinc-600' },
                                ].map((m, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${m.col}`} />
                                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{m.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </GlassCard>

                    <div className="p-8 rounded-[40px] bg-zinc-900 border border-white/5 space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-zinc-800 rounded-2xl"><Coffee className="w-6 h-6 text-zinc-500" /></div>
                            <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">{t('coach_nutrition.meal_timing')}</h3>
                        </div>
                        <div className="space-y-4">
                            {[
                                { name: t('coach_nutrition.timing.pre_session'), time: '08:00', status: 'Optimal' },
                                { name: t('coach_nutrition.timing.post_session'), time: '12:30', status: 'Active' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-white/2 rounded-2xl border border-white/5">
                                    <span className="text-[10px] font-black text-zinc-400 uppercase italic">{item.name}</span>
                                    <span className="text-[9px] font-black text-emerald-500 uppercase">{item.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
