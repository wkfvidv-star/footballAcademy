import { Check, Flame, Medal, Trophy, Zap, Activity, Shield, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function GoalsView() {
    const { t } = useTranslation();

    return (
        <div className="space-y-6 pb-24">
            <div className="px-2">
                <h1 className="text-2xl font-black text-white tracking-tight">{t('goals_view.title')}</h1>
                <p className="text-zinc-400 text-sm font-medium">{t('goals_view.subtitle')}</p>
            </div>

            {/* Streak Hero */}
            <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl p-1 relative overflow-hidden">
                <div className="bg-zinc-950/90 backdrop-blur-sm rounded-[1.3rem] p-6 flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
                            <span className="text-orange-500 font-bold uppercase text-xs tracking-wider">{t('goals_view.streak_label')}</span>
                        </div>
                        <div className="text-4xl font-black text-white tracking-tighter">{t('goals_view.days', { count: 12 })} 12</div>
                        <p className="text-zinc-500 text-xs mt-1">{t('goals_view.streak_msg', { count: 15 })}</p>
                    </div>
                </div>
            </div>

            {/* Weekly Targets */}
            <div>
                <h2 className="text-lg font-bold text-white mb-4 px-2">{t('goals_view.weekly_targets')}</h2>
                <div className="space-y-3">
                    {[
                        { title: t('goals_view.gym_goal'), current: 2, total: 3, done: false },
                        { title: t('goals_view.sleep_goal'), current: 5, total: 7, done: false },
                        { title: t('goals_view.hydration_goal'), current: 7, total: 7, done: true },
                    ].map((goal, i) => (
                        <div key={i} className={`p-4 rounded-3xl border ${goal.done ? 'bg-green-500/10 border-green-500/20' : 'bg-zinc-900 border-white/5'}`}>
                            <div className="flex items-start justify-between mb-3">
                                <h4 className={`font-bold ${goal.done ? 'text-green-500' : 'text-white'}`}>{goal.title}</h4>
                                {goal.done && <div className="bg-green-500 text-black p-1 rounded-full"><Check className="w-3 h-3 stroke-[4]" /></div>}
                            </div>
                            <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full ${goal.done ? 'bg-green-500' : 'bg-primary'}`}
                                    style={{ width: `${(goal.current / goal.total) * 100}%` }}
                                ></div>
                            </div>
                            <div className="text-right mt-1.5 text-xs text-zinc-500 font-bold">
                                {goal.current} / {goal.total}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Badges Collection */}
            <div>
                <h2 className="text-lg font-bold text-white mb-4 px-2">{t('goals_view.achievements')}</h2>
                <div className="grid grid-cols-3 gap-2">
                    {[
                        { name: t('goals_view.badge_speedster'), icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-400/10', unlocked: true },
                        { name: t('goals_view.badge_iron_lung'), icon: Activity, color: 'text-blue-400', bg: 'bg-blue-400/10', unlocked: true },
                        { name: t('goals_view.badge_sharpshooter'), icon: Target, color: 'text-red-400', bg: 'bg-red-400/10', unlocked: true },
                        { name: t('goals_view.badge_captain'), icon: Trophy, color: 'text-zinc-600', bg: 'bg-zinc-800', unlocked: false },
                        { name: t('goals_view.badge_mvp'), icon: Medal, color: 'text-zinc-600', bg: 'bg-zinc-800', unlocked: false },
                        { name: t('goals_view.badge_loyalist'), icon: Shield, color: 'text-zinc-600', bg: 'bg-zinc-800', unlocked: false },
                    ].map((badge, i) => (
                        <div key={i} className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 border ${badge.unlocked ? 'border-white/10 bg-zinc-900' : 'border-dashed border-white/5 bg-zinc-900/50 opacity-50'}`}>
                            <div className={`p-2 rounded-full ${badge.bg}`}>
                                <badge.icon className={`w-5 h-5 ${badge.color}`} />
                            </div>
                            <span className="text-[10px] font-bold text-zinc-400">{badge.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
