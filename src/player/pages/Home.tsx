import React, { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import {
    Activity, Calendar, HeartPulse, Trophy, LayoutDashboard,
    ArrowRight, Bell, Zap, Quote
} from 'lucide-react';
import { useMedical } from '../../context/MedicalContext';
import { WellnessModal } from '../components/WellnessModal';
import { SessionModal } from '../components/SessionModal';
import { GlassCard } from '../../components/shared/GlassCard';
import InjuryDetectionDashboard from '../../components/Dashboard/InjuryDetectionDashboard';
import { Link } from 'react-router-dom';

export default function Home() {
    const { t } = useTranslation();
    const { hasCheckedInToday, submitWellness, submitSession } = useMedical();
    const [showWellnessModal, setShowWellnessModal] = useState(false);
    const [showSessionModal, setShowSessionModal] = useState(false);

    return (
        <div className="space-y-10 animate-in fade-in pb-12">
            <WellnessModal isOpen={showWellnessModal} onClose={() => setShowWellnessModal(false)} onSubmit={submitWellness} />
            <SessionModal isOpen={showSessionModal} onClose={() => setShowSessionModal(false)} onSubmit={submitSession} />

            {/* --- WELCOME HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-[32px] bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-zinc-900 font-black text-2xl shadow-2xl shadow-primary/20 transform -rotate-3 transition-transform hover:rotate-0">
                        RM
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none mb-2">
                            {t('dashboard.welcome', { name: 'Riyad' })}
                        </h1>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.2em]">
                                {t('dashboard.ready_message')}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {!hasCheckedInToday && (
                        <button
                            onClick={() => setShowWellnessModal(true)}
                            className="h-14 px-8 rounded-2xl bg-primary text-zinc-900 flex items-center gap-3 shadow-xl shadow-primary/20 transition-all active:scale-95 group font-black uppercase tracking-widest text-xs"
                        >
                            <LayoutDashboard className="w-5 h-5 group-hover:rotate-12 transition-all" />
                            {t('dashboard.daily_checkin')}
                        </button>
                    )}
                    <button
                        onClick={() => setShowSessionModal(true)}
                        className="h-14 px-8 rounded-2xl bg-white/5 hover:bg-white/10 flex items-center gap-3 border border-white/10 transition-all active:scale-95 group font-black uppercase tracking-widest text-xs text-white"
                    >
                        <Activity className="w-5 h-5 text-primary group-hover:scale-110 transition-all" />
                        {t('dashboard.log_activity')}
                    </button>
                </div>
            </div>

            {/* --- TOP SUMMARY GRID --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Readiness Index */}
                <div className="lg:col-span-2">
                    <InjuryDetectionDashboard />
                </div>

                <div className="space-y-6">
                    {/* Today's Schedule Card */}
                    <GlassCard
                        title={t('upcoming.today')}
                        subtitle={t('schedule.training_time_location')}
                        icon={Calendar}
                        variant="primary"
                    >
                        <div className="space-y-6 py-2">
                            <div>
                                <h3 className="text-3xl font-black text-white italic leading-tight tracking-tighter uppercase">{t('dashboard.team_training')}</h3>
                                <p className="text-sm text-primary font-black uppercase tracking-tight mt-1 opacity-80">{t('dashboard.training_details')}</p>
                            </div>
                            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                                <div className="p-3 bg-zinc-800 rounded-xl">
                                    <Activity className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <div className="text-[10px] text-zinc-500 uppercase font-black">{t('dashboard.weekly_load')}</div>
                                    <div className="text-lg font-black text-white italic uppercase">{t('dashboard.high')} <span className="text-primary text-xs ml-1">+12%</span></div>
                                </div>
                            </div>
                            <Link to="/player/training" className="block">
                                <button className="w-full py-4 bg-primary/10 border border-primary/20 text-primary rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-primary/20 transition-all flex items-center justify-center gap-2">
                                    {t('dashboard.view_session_plan')} <ArrowRight className="w-3 h-3" />
                                </button>
                            </Link>
                        </div>
                    </GlassCard>

                    {/* Streak Tile */}
                    <div className="bg-zinc-900/50 border border-white/5 p-8 rounded-[40px] flex items-center justify-between group hover:border-amber-500/20 transition-all">
                        <div>
                            <div className="text-[10px] text-zinc-500 uppercase font-black mb-1">{t('dashboard.streak')}</div>
                            <div className="text-4xl font-black text-white italic">{t('dashboard.day_count', { count: 3 })}</div>
                            <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-wide mt-1">{t('dashboard.keep_it_up')}</p>
                        </div>
                        <div className="p-5 bg-amber-500/10 rounded-2xl group-hover:scale-110 transition-transform">
                            <Trophy className="w-10 h-10 text-amber-500" />
                        </div>
                    </div>
                </div>
            </div>

            {/* --- ALERTS & NOTIFICATIONS --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-red-500/5 border border-red-500/10 p-6 rounded-[32px] flex items-center gap-5">
                    <div className="p-4 bg-red-500/10 rounded-2xl border border-red-500/20">
                        <Bell className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                        <div className="text-[10px] text-red-500/80 font-black uppercase tracking-widest mb-1">{t('alerts.critical_alert')}</div>
                        <div className="text-sm font-black text-white uppercase italic">{t('alerts.high_hamstring_risk')}</div>
                    </div>
                </div>
                <div className="bg-amber-500/5 border border-amber-500/10 p-6 rounded-[32px] flex items-center gap-5">
                    <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20">
                        <Zap className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                        <div className="text-[10px] text-amber-500/80 font-black uppercase tracking-widest mb-1">{t('alerts.performance')}</div>
                        <div className="text-sm font-black text-white uppercase italic">{t('alerts.sleep_efficiency_down')}</div>
                    </div>
                </div>
                <div className="bg-blue-500/5 border border-blue-500/10 p-6 rounded-[32px] flex items-center gap-5">
                    <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                        <Quote className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                        <div className="text-[10px] text-blue-500/80 font-black uppercase tracking-widest mb-1">{t('alerts.coach_note')}</div>
                        <div className="text-sm font-black text-white uppercase italic">{t('alerts.review_var_updates')}</div>
                    </div>
                </div>
            </div>

            {/* --- COACH MESSAGE --- */}
            <div className="bg-zinc-900 border border-white/5 p-10 rounded-[48px] relative overflow-hidden group hover:border-primary/20 transition-all">
                <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px] group-hover:bg-primary/10 transition-all"></div>
                <div className="flex gap-10 relative z-10 items-center">
                    <div className="w-24 h-24 rounded-[36px] bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 shrink-0 flex items-center justify-center text-4xl shadow-2xl">
                        📣
                    </div>
                    <div>
                        <h4 className="text-primary font-black text-xs mb-3 uppercase tracking-[0.3em] italic">{t('dashboard.coach_focus')}</h4>
                        <p className="text-zinc-200 text-2xl leading-tight font-black italic uppercase tracking-tighter">
                            <Trans i18nKey="dashboard.coach_message" components={[<span className="text-primary" />]} />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
