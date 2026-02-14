import React from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen, GraduationCap, Video, Trophy, Globe, Heart } from 'lucide-react';
import EducationModule from '../../components/Education/EducationModule';
import { GlassCard } from '../../components/shared/GlassCard';

export default function Culture() {
    const { t } = useTranslation();
    return (
        <div className="space-y-10 animate-in fade-in pb-12">
            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none mb-3">
                        {t('knowledge_hub.title')}
                    </h1>
                    <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.2em]">
                        {t('knowledge_hub.subtitle')}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <EducationModule />
                </div>

                <div className="space-y-6">
                    <GlassCard title={t('knowledge_hub.weekly_focus')} icon={Trophy} variant="primary">
                        <div className="py-2 space-y-6">
                            <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-tight">{t('knowledge_hub.var_mastery')}</h3>
                            <p className="text-xs text-zinc-400 font-bold uppercase tracking-tight leading-relaxed">
                                {t('knowledge_hub.var_desc')}
                            </p>
                            <button className="w-full py-4 bg-white text-zinc-900 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-primary transition-all flex items-center justify-center gap-2">
                                <Video className="w-4 h-4" /> {t('knowledge_hub.start_module')}
                            </button>
                        </div>
                    </GlassCard>

                    <div className="p-8 rounded-[40px] bg-zinc-900 border border-white/5 space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-zinc-800 rounded-2xl"><Globe className="w-6 h-6 text-zinc-500" /></div>
                            <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">{t('knowledge_hub.radiant_culture')}</h3>
                        </div>
                        <div className="space-y-4">
                            {[
                                { title: t('knowledge_hub.club_philosophy'), icon: Heart },
                                { title: t('knowledge_hub.dressing_room'), icon: GraduationCap },
                                { title: t('knowledge_hub.social_resp'), icon: Globe },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 bg-white/2 rounded-2xl border border-white/5 hover:border-primary/20 transition-all cursor-pointer group">
                                    <item.icon className="w-5 h-5 text-zinc-600 group-hover:text-primary transition-colors" />
                                    <span className="text-xs font-black text-zinc-400 uppercase italic tracking-tight group-hover:text-white transition-colors">{item.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
