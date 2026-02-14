import { BookOpen, Scale, Zap, Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { GlassCard } from '../shared/GlassCard';

export default function EducationModule() {
    const { t } = useTranslation();
    const categories = [
        { title: t('education_module.categories.laws'), icon: Scale, count: 12, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { title: t('education_module.categories.technical'), icon: Zap, count: 24, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
        { title: t('education_module.categories.modern'), icon: BookOpen, count: 8, color: 'text-green-500', bg: 'bg-green-500/10' },
        { title: t('education_module.categories.training_methods'), icon: Zap, count: 16, color: 'text-orange-500', bg: 'bg-orange-500/10' },
        { title: t('education_module.categories.rules_2026'), icon: Scale, count: 5, color: 'text-red-500', bg: 'bg-red-500/10' },
    ];

    const updates = [
        { title: 'New VAR Protocol 2026/27', date: '2 days ago', category: t('education_module.categories.laws') },
        { title: 'Counter-Pressing in U18 Level', date: '5 days ago', category: 'Tactics' },
        { title: t('education_module.methods.interval') + ' Optimization', date: '1 week ago', category: t('education_module.categories.training_methods') },
    ];

    return (
        <GlassCard
            title={t('education_module.title')}
            icon={BookOpen}
        >
            <div className="space-y-6 md:space-y-8">
                {/* Categories Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                    {categories.map((cat, i) => (
                        <div key={i} className="bg-white/5 border border-white/5 p-3 md:p-4 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group hover:border-primary/20">
                            <div className={`p-1.5 md:p-2 rounded-xl ${cat.bg} w-fit mb-2 md:mb-3 group-hover:scale-110 transition-transform`}>
                                <cat.icon className={`w-4 h-4 md:w-5 md:h-5 ${cat.color}`} />
                            </div>
                            <div className="text-[12px] md:text-sm font-black text-white italic uppercase tracking-tight truncate">{cat.title}</div>
                            <div className="text-[9px] md:text-[10px] text-zinc-500 uppercase font-black tracking-widest mt-1">{cat.count} {t('education_module.modules')}</div>
                        </div>
                    ))}
                </div>

                {/* Focus Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-primary/5 border border-primary/20 p-5 md:p-6 rounded-3xl md:rounded-[32px] relative overflow-hidden group hover:bg-primary/10 transition-colors">
                        <div className="absolute top-0 right-0 p-4 md:p-6 opacity-10">
                            <Zap className="w-12 h-12 md:w-16 md:h-16 text-primary" />
                        </div>
                        <h4 className="text-[9px] md:text-[10px] font-black text-primary mb-3 md:mb-4 uppercase italic tracking-widest">{t('education_module.categories.training_methods')}</h4>
                        <div className="grid grid-cols-1 gap-1.5 md:gap-2 relative z-10">
                            {['continuous', 'interval', 'repetition', 'circuit'].map(m => (
                                <div key={m} className="flex items-center gap-2.5 md:gap-3 text-[11px] md:text-xs text-zinc-300 font-bold group-hover:text-white transition-colors">
                                    <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                    {t(`education_module.methods.${m}`)}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-zinc-900/40 border border-white/5 p-5 md:p-6 rounded-3xl md:rounded-[32px] flex flex-col justify-between group hover:border-primary/20 transition-all min-h-[160px] md:min-h-0">
                        <div>
                            <h4 className="text-[9px] md:text-[10px] font-black text-zinc-500 mb-2 uppercase italic tracking-widest group-hover:text-primary transition-colors">{t('education_module.methodology')}</h4>
                            <p className="text-[11px] md:text-xs text-zinc-400 leading-relaxed font-black uppercase tracking-tight italic">
                                Learn the "Biological Banding" approach for equitable talent identification and development within the academy.
                            </p>
                        </div>
                        <button className="mt-4 md:mt-6 text-[9px] md:text-[10px] text-primary uppercase font-black tracking-widest hover:underline flex items-center gap-2">
                            {t('education_module.read_article')} <Play className="w-2.5 h-2.5 md:w-3 md:h-3 fill-current" />
                        </button>
                    </div>
                </div>

                {/* Latest Updates */}
                <div className="space-y-3.5 md:space-y-4 pt-4 border-t border-white/5">
                    <h3 className="text-[9px] md:text-[10px] text-zinc-500 uppercase font-black tracking-widest px-1">{t('education_module.latest_updates')}</h3>
                    <div className="space-y-3">
                        {updates.map((upd, i) => (
                            <div key={i} className="flex items-center justify-between p-3.5 md:p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer group hover:border-primary/20">
                                <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                                    <div className="w-9 h-9 md:w-10 md:h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                                        <Play className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary fill-current" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-xs md:text-sm font-black text-white italic uppercase tracking-tight truncate">{upd.title}</div>
                                        <div className="text-[9px] md:text-[10px] text-zinc-500 uppercase font-bold tracking-widest mt-0.5 truncate">{upd.category} • {upd.date}</div>
                                    </div>
                                </div>
                                <div className="text-zinc-600 group-hover:text-primary transition-colors shrink-0 ml-2">
                                    <Play className="w-3.5 h-3.5 md:w-4 md:h-4 rotate-180" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </GlassCard>
    );
}
