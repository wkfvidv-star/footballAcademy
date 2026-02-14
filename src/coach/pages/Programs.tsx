import React from 'react';
import { useTranslation } from 'react-i18next';
import { ClipboardList, Plus, Play, History, Video, Bookmark, Calendar } from 'lucide-react';
import { GlassCard } from '../../components/shared/GlassCard';

export default function Programs() {
    const { t } = useTranslation();
    return (
        <div className="space-y-10 animate-in fade-in pb-12">
            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none mb-3">
                        {t('coach_programs.title')}
                    </h1>
                    <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.2em]">
                        {t('coach_programs.subtitle')}
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <button className="h-14 px-8 rounded-2xl bg-blue-600 text-white flex items-center gap-3 shadow-xl shadow-blue-500/20 transition-all active:scale-95 group font-black uppercase tracking-widest text-xs">
                        <Plus className="w-5 h-5 group-hover:rotate-90 transition-all" />
                        {t('coach_programs.create_program')}
                    </button>
                    <button className="h-14 px-8 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 hover:bg-white/10 transition-all font-black uppercase text-[10px] tracking-widest text-white">
                        <Calendar className="w-5 h-5 text-zinc-500" />
                        {t('coach_programs.calendar_view')}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* --- PROGRAM LIST --- */}
                <div className="lg:col-span-2 space-y-6">
                    {[
                        { title: t('coach_programs.programs.transitional_speed'), players: t('coach_programs.units.players_count', { count: 8 }), intensity: 'High', color: 'text-red-500' },
                        { title: t('coach_programs.programs.tech_finishing'), players: t('coach_programs.units.forward_unit'), intensity: 'Medium', color: 'text-primary' },
                        { title: t('coach_programs.programs.defensive_blocks'), players: t('coach_programs.units.entire_squad'), intensity: 'Low', color: 'text-blue-500' },
                    ].map((prog, i) => (
                        <div key={i} className="p-8 rounded-[48px] bg-zinc-900 border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer group flex items-center justify-between">
                            <div className="flex items-center gap-8">
                                <div className="w-16 h-16 bg-white/5 rounded-[28px] border border-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-all">
                                    <ClipboardList className="w-8 h-8 text-zinc-700 group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-none mb-2">{prog.title}</h3>
                                    <div className="flex items-center gap-4">
                                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{prog.players}</span>
                                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${prog.color}`}>
                                            {t('coach_programs.intensity_label', { level: prog.intensity })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all"><Play className="w-5 h-5 text-zinc-500" /></button>
                                <button className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all"><Video className="w-5 h-5 text-zinc-500" /></button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- QUICK ACTION CARD --- */}
                <div className="space-y-6">
                    <div className="p-10 rounded-[48px] bg-indigo-600 shadow-2xl shadow-indigo-500/20 relative overflow-hidden group cursor-pointer">
                        <div className="absolute -right-12 -top-12 opacity-10 group-hover:scale-110 transition-transform"><Play className="w-64 h-64 text-white fill-current" /></div>
                        <div className="relative z-10">
                            <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-none mb-4" dangerouslySetInnerHTML={{ __html: t('coach_programs.start_live').replace('\n', '<br />') }} />
                            <p className="text-indigo-100/60 font-black uppercase text-[10px] tracking-widest">{t('coach_programs.gps_enabled')}</p>
                        </div>
                        <button className="mt-10 px-6 py-3 bg-white text-zinc-900 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transform group-hover:translate-x-2 transition-transform">{t('coach_programs.begin_log')}</button>
                    </div>

                    <GlassCard title={t('coach_programs.assigned_today')} icon={History} variant="muted">
                        <div className="py-2 space-y-4">
                            {[
                                { name: 'Bio-Mechanical Load', time: '10:00' },
                                { name: 'Tactical Briefing', time: '14:30' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-black/40 rounded-2xl">
                                    <span className="text-[10px] font-black text-zinc-500 uppercase italic">{item.name}</span>
                                    <span className="text-[9px] font-black text-indigo-400 uppercase">{item.time}</span>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
