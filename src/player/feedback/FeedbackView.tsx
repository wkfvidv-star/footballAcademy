import { ChevronRight, MessageSquare, Shield, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function FeedbackView() {
    const { t } = useTranslation();

    return (
        <div className="space-y-6 pb-24">
            <div className="px-2">
                <h1 className="text-2xl font-black text-white tracking-tight">{t('feedback_view.title')}</h1>
                <p className="text-zinc-400 text-sm font-medium">{t('feedback_view.subtitle')}</p>
            </div>

            {/* Coach Message Hero */}
            <div className="bg-zinc-900 border border-white/5 rounded-3xl p-6 relative overflow-hidden">
                <div className="flex gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shrink-0 flex items-center justify-center text-white border border-white/10 shadow-lg shadow-blue-500/20">
                        <MessageSquare className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-white font-bold">{t('feedback_view.coach_name')}</h4>
                            <span className="text-[10px] bg-white/10 text-zinc-400 px-2 py-0.5 rounded-full">{t('feedback_view.today')}</span>
                        </div>
                        <p className="text-zinc-300 text-sm leading-relaxed">
                            "{t('feedback_view.coach_msg')}"
                        </p>
                    </div>
                </div>
            </div>

            {/* Focus Areas */}
            <div>
                <h2 className="text-lg font-bold text-white mb-4 px-2">{t('feedback_view.focus_areas')}</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 rounded-3xl p-5">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-500 mb-3">
                            <Target className="w-5 h-5" />
                        </div>
                        <div className="text-amber-500 text-xs font-bold uppercase tracking-wider mb-1">{t('feedback_view.tactical')}</div>
                        <div className="text-white font-bold mb-1">{t('feedback_view.scan_freq')}</div>
                        <p className="text-zinc-500 text-xs">{t('feedback_view.scan_desc')}</p>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-3xl p-5">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-500 mb-3">
                            <Shield className="w-5 h-5" />
                        </div>
                        <div className="text-emerald-500 text-xs font-bold uppercase tracking-wider mb-1">{t('feedback_view.physical')}</div>
                        <div className="text-white font-bold mb-1">{t('feedback_view.agility_turns')}</div>
                        <p className="text-zinc-500 text-xs">{t('feedback_view.agility_desc')}</p>
                    </div>
                </div>
            </div>

            {/* Recent Evaluations List (Read-Only) */}
            <div>
                <h2 className="text-lg font-bold text-white mb-4 px-2">{t('feedback_view.evaluations')}</h2>
                <div className="space-y-3">
                    {[
                        { title: t('feedback_view.match_day'), date: 'Oct 24', score: '8.5', type: t('feedback_view.type_match') },
                        { title: t('feedback_view.monthly_assessment'), date: 'Oct 01', score: '8.2', type: t('feedback_view.type_review') },
                        { title: t('feedback_view.physical_testing'), date: 'Sep 15', score: '9.0', type: t('feedback_view.type_test') },
                    ].map((item, i) => (
                        <div key={i} className="bg-zinc-900 border border-white/5 p-4 rounded-3xl flex items-center justify-between group active:scale-[0.99] transition-transform">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 font-bold text-xs">
                                    {item.score}
                                </div>
                                <div>
                                    <h4 className="text-white text-sm font-bold">{item.title}</h4>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-xs text-zinc-500">{item.date}</span>
                                        <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
                                        <span className="text-xs text-zinc-500">{item.type}</span>
                                    </div>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-zinc-700" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Note about editing */}
            <p className="text-center text-xs text-zinc-600 px-8 py-4">
                {t('feedback_view.footer_note')}
            </p>
        </div>
    );
}
