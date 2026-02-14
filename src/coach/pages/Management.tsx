import React from 'react';
import { useTranslation } from 'react-i18next';
import { Users, Search, Filter, UserPlus, ArrowUpRight, TrendingUp, AlertCircle } from 'lucide-react';
import { GlassCard } from '../../components/shared/GlassCard';

export default function Management() {
    const { t } = useTranslation();

    const players = [
        { id: 1, name: 'Riyad Mahrez', pos: 'RW', fitness: 92, status: 'Ready' },
        { id: 2, name: 'Kevin De Bruyne', pos: 'CAM', fitness: 84, status: 'Active' },
        { id: 3, name: 'Rodri', pos: 'CDM', fitness: 98, status: 'Peak' },
        { id: 4, name: 'Erling Haaland', pos: 'ST', fitness: 76, status: 'Recovering' },
        { id: 5, name: 'Phil Foden', pos: 'LW', fitness: 89, status: 'Active' },
    ];

    return (
        <div className="space-y-10 animate-in fade-in pb-12">
            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none mb-3">
                        {t('coach_management.title')}
                    </h1>
                    <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.2em]">
                        {t('coach_management.subtitle')}
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-hover:text-blue-500 transition-colors" />
                        <input
                            type="text"
                            placeholder={t('coach_management.search_placeholder')}
                            className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-xs font-black uppercase tracking-widest text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 transition-all w-64 shadow-2xl"
                        />
                    </div>
                    <button className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all active:scale-95">
                        <Filter className="w-5 h-5 text-zinc-400" />
                    </button>
                    <button className="h-14 px-8 rounded-2xl bg-blue-600 text-white flex items-center gap-3 shadow-xl shadow-blue-500/20 transition-all active:scale-95 group font-black uppercase tracking-widest text-xs">
                        <UserPlus className="w-5 h-5" />
                        {t('coach_management.add_new_player')}
                    </button>
                </div>
            </div>

            {/* --- PLAYER LIST --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-zinc-900 border border-white/5 rounded-[48px] overflow-hidden">
                    <div className="p-8 border-b border-white/5 flex items-center justify-between">
                        <h3 className="font-black text-xl text-white italic uppercase tracking-tighter">{t('coach_management.active_roster', { count: 24 })}</h3>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">{t('coach_management.available')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-amber-500 bubble-animate" />
                                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">{t('coach_management.at_risk')}</span>
                            </div>
                        </div>
                    </div>
                    <div className="divide-y divide-white/5">
                        {players.map((player) => (
                            <div key={player.id} className="p-6 flex items-center justify-between hover:bg-white/2 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 bg-zinc-800 rounded-[22px] flex items-center justify-center text-xs font-black text-zinc-500 group-hover:bg-blue-600 group-hover:text-white transition-all border border-white/5">
                                        {player.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <div className="text-lg font-black text-white uppercase italic tracking-tighter leading-none">{player.name}</div>
                                        <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] mt-1.5">
                                            {player.pos} • {player.id % 2 === 0 ? t('coach_management.right_foot') : t('coach_management.both_feet')}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-12">
                                    <div className="text-right">
                                        <div className="text-xs font-black text-zinc-600 uppercase tracking-widest mb-1">{t('coach_management.fitness')}</div>
                                        <div className={`text-xl font-black italic ${player.fitness > 90 ? 'text-emerald-500' : player.fitness > 80 ? 'text-primary' : 'text-amber-500'}`}>{player.fitness}%</div>
                                    </div>
                                    <div className="text-right w-32">
                                        <div className="text-xs font-black text-zinc-600 uppercase tracking-widest mb-1">{t('coach_management.status')}</div>
                                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${player.status === 'Peak' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                                            player.status === 'Ready' ? 'bg-primary/10 text-primary border border-primary/20' :
                                                player.status === 'Active' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                                                    'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                                            }`}>
                                            {player.status === 'Peak' ? t('coach_management.peak') :
                                                player.status === 'Ready' ? t('coach_management.ready') :
                                                    player.status === 'Active' ? t('coach_management.active') :
                                                        t('coach_management.recovering')}
                                        </span>
                                    </div>
                                    <button className="p-3 bg-white/5 rounded-2xl hover:bg-blue-600 transition-all border border-white/10 group-hover:rotate-45">
                                        <ArrowUpRight className="w-5 h-5 text-zinc-400 group-hover:text-white" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <GlassCard title={t('coach_management.squad_insights')} icon={TrendingUp} variant="primary">
                        <div className="py-2 space-y-8">
                            <div className="p-6 bg-white/5 rounded-[32px] border border-white/5">
                                <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">{t('coach_management.top_performer')}</h4>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center font-black text-white italic">R</div>
                                    <div>
                                        <div className="text-lg font-black text-white italic uppercase tracking-tighter">Rodri</div>
                                        <div className="text-[10px] text-primary font-black uppercase tracking-widest">
                                            {t('coach_management.score_with_trend', { score: '9.2', trend: '↑0.4' })}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-red-500/5 rounded-[32px] border border-red-500/10 flex items-center gap-4">
                                <div className="p-3 bg-red-500/10 rounded-2xl"><AlertCircle className="w-6 h-6 text-red-500" /></div>
                                <div>
                                    <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-1">{t('coach_management.low_availability')}</h4>
                                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-tight">
                                        {t('coach_management.defensive_at_risk', { count: 4 })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </GlassCard>

                    <div className="p-10 rounded-[48px] bg-blue-600 shadow-2xl shadow-blue-500/20 relative overflow-hidden group cursor-pointer">
                        <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-transform"><Users className="w-48 h-48 text-white" /></div>
                        <div className="relative z-10">
                            <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-none mb-4" dangerouslySetInnerHTML={{ __html: t('coach_management.export_report').replace('\n', '<br />') }} />
                            <p className="text-blue-100/60 font-black uppercase text-[10px] tracking-widest">{t('coach_management.export_subtext')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
