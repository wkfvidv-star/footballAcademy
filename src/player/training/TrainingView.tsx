import { Bot, Calendar, CheckCircle2, Circle, Clock, Dumbbell, PlayCircle } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';

export default function TrainingView() {
    const { t } = useTranslation();

    return (
        <div className="space-y-6 pb-24">
            <div className="px-2">
                <h1 className="text-2xl font-black text-white tracking-tight">{t('training_view.title')}</h1>
                <p className="text-zinc-400 text-sm font-medium">{t('training_view.subtitle')}</p>
            </div>

            {/* Load Awareness Header */}
            <div className="bg-zinc-900 border border-white/5 rounded-3xl p-5 flex items-center justify-between">
                <div>
                    <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1">{t('training_view.weekly_load')}</div>
                    <div className="text-xl font-black text-white">{t('training_view.load_normal')}</div>
                </div>
                <div className="flex gap-1">
                    <div className="w-2 h-8 rounded-full bg-green-500"></div>
                    <div className="w-2 h-8 rounded-full bg-green-500"></div>
                    <div className="w-2 h-8 rounded-full bg-green-500/30"></div>
                    <div className="w-2 h-8 rounded-full bg-zinc-800"></div>
                    <div className="w-2 h-8 rounded-full bg-zinc-800"></div>
                </div>
            </div>

            {/* Today's Focus */}
            <div>
                <h2 className="text-lg font-bold text-white mb-4 px-2">{t('training_view.today_header')}</h2>
                <div className="bg-gradient-to-br from-primary via-primary/80 to-blue-600 rounded-[2rem] p-6 text-white shadow-lg relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                            <span className="bg-black/20 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">16:30 - 18:00</span>
                            <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                                <PlayCircle className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <h3 className="text-3xl font-black tracking-tight mb-2">
                            <Trans i18nKey="training_view.technical_tactical" />
                        </h3>
                        <p className="text-sm opacity-90 font-medium flex items-center gap-2">
                            <Calendar className="w-4 h-4" /> {t('training_view.field_info')}
                        </p>
                    </div>
                </div>
            </div>


            {/* AI Recommendations */}
            <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-indigo-500/20 rounded-3xl p-5 relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-3 opacity-10">
                    <Bot className="w-16 h-16 text-indigo-400" />
                </div>
                <h2 className="text-sm font-bold text-indigo-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Bot className="w-4 h-4" /> {t('ai_recommendation.title')}
                </h2>
                <div className="space-y-3 relative z-10">
                    <div className="bg-zinc-900/80 p-3 rounded-2xl border border-indigo-500/20 flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/20 rounded-xl text-indigo-400">
                            <Dumbbell className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-white text-sm">{t('ai_recommendation.drill_name')}</h4>
                            <p className="text-zinc-400 text-xs">{t('ai_recommendation.reason')}</p>
                        </div>
                        <button className="ml-auto bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg">{t('ai_recommendation.view')}</button>
                    </div>
                </div>
            </div>

            {/* Upcoming Sessions List */}
            <div className="space-y-3">
                <h2 className="text-lg font-bold text-white px-2">{t('training_view.upcoming')}</h2>
                {[
                    { day: t('training_view.wed'), date: '25', title: t('training_view.session_strength'), time: '10:00', type: t('training_view.type_physical'), load: t('training_view.load_high'), color: 'bg-red-500' },
                    { day: t('training_view.thu'), date: '26', title: t('training_view.session_recovery'), time: '09:00', type: t('training_view.type_recovery'), load: t('training_view.load_light'), color: 'bg-green-500' },
                ].map((session, i) => (
                    <div key={i} className="bg-zinc-900/50 border border-white/5 p-4 rounded-3xl flex items-center gap-4">
                        <div className="bg-zinc-800 rounded-2xl p-3 text-center min-w-[3.5rem] shrink-0">
                            <div className="text-xs text-zinc-500 font-bold uppercase">{session.day}</div>
                            <div className="text-lg font-black text-white">{session.date}</div>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-white text-sm">{session.title}</h4>
                            <div className="flex items-center gap-3 mt-1">
                                <span className="text-xs text-zinc-500 flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {session.time}
                                </span>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${session.color === 'bg-red-500' ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>
                                    {session.type}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Daily Tasks Checklist */}
            <div className="bg-zinc-900 border border-white/5 rounded-3xl p-5">
                <h2 className="text-lg font-bold text-white mb-4">{t('training_view.daily_targets')}</h2>
                <div className="space-y-4">
                    <div className="flex items-center gap-4 group">
                        <div className="w-6 h-6 rounded-full border-2 border-primary bg-primary flex items-center justify-center text-white">
                            <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <span className="text-zinc-500 line-through text-sm font-medium">{t('training_view.target_hydration')}</span>
                    </div>
                    <div className="flex items-center gap-4 group">
                        <div className="w-6 h-6 rounded-full border-2 border-zinc-700 flex items-center justify-center text-transparent group-active:scale-90 transition-transform">
                            <Circle className="w-4 h-4" />
                        </div>
                        <span className="text-white text-sm font-medium">{t('training_view.target_stretching')}</span>
                    </div>
                    <div className="flex items-center gap-4 group">
                        <div className="w-6 h-6 rounded-full border-2 border-zinc-700 flex items-center justify-center text-transparent">
                            <Circle className="w-4 h-4" />
                        </div>
                        <span className="text-white text-sm font-medium">{t('training_view.target_feedback')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
