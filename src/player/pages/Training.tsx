import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dumbbell, Play, Plus, History, Bookmark } from 'lucide-react';
import { useAICoach } from '../../context/AICoachContext';
import { useMedical } from '../../context/MedicalContext';
import { TrainingRecommendations } from '../components/TrainingRecommendations';
import { SessionModal } from '../components/SessionModal';
import { TestInputModal } from '../components/TestInputModal';
import { usePhysical } from '../../context/PhysicalContext';

export default function Training() {
    const { t } = useTranslation();
    const { trainingPlan } = useAICoach();
    const { submitSession } = useMedical();
    const { addTestResult } = usePhysical();
    const [showSessionModal, setShowSessionModal] = useState(false);
    const [showTestModal, setShowTestModal] = useState(false);

    return (
        <div className="space-y-10 animate-in fade-in pb-12">
            <SessionModal isOpen={showSessionModal} onClose={() => setShowSessionModal(false)} onSubmit={submitSession} />
            <TestInputModal isOpen={showTestModal} onClose={() => setShowTestModal(false)} onSubmit={addTestResult} />

            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none mb-3">
                        {t('training_prog.title')}
                    </h1>
                    <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.2em]">
                        {t('training_prog.subtitle')}
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setShowSessionModal(true)}
                        className="h-14 px-8 rounded-2xl bg-white text-zinc-900 flex items-center gap-3 shadow-xl shadow-white/10 transition-all active:scale-95 group font-black uppercase tracking-widest text-xs"
                    >
                        <Plus className="w-5 h-5 group-hover:rotate-90 transition-all" />
                        {t('training_prog.log_session')}
                    </button>
                    <button
                        onClick={() => setShowTestModal(true)}
                        className="h-14 px-8 rounded-2xl bg-white/5 hover:bg-white/10 flex items-center gap-3 border border-white/10 transition-all active:scale-95 group font-black uppercase tracking-widest text-xs text-white"
                    >
                        <History className="w-5 h-5 text-zinc-500 group-hover:text-primary transition-all" />
                        {t('training_prog.log_test')}
                    </button>
                </div>
            </div>

            {/* --- CORE TRAINING PLAN --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <TrainingRecommendations />

                <div className="p-10 rounded-[48px] bg-zinc-900 shadow-2xl border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Dumbbell className="w-64 h-64 text-white" />
                    </div>

                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-4 bg-white/10 rounded-[28px]"><Play className="w-8 h-8 text-white fill-current" /></div>
                                <div>
                                    <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">{t('training_prog.warmup_title')}</h3>
                                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">{t('training_prog.warmup_subtitle')}</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {[
                                    t('training_prog.warmup_steps.stretching'),
                                    t('training_prog.warmup_steps.activation'),
                                    t('training_prog.warmup_steps.ball_mastery')
                                ].map((step, i) => (
                                    <div key={i} className="flex items-center gap-5 p-5 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
                                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] font-black text-white italic">{i + 1}</div>
                                        <span className="text-sm font-black text-zinc-300 uppercase italic">{step}</span>
                                        <div className="ml-auto flex items-center gap-2">
                                            <span className="text-[9px] font-black text-zinc-500 uppercase">{t('training_prog.video')}</span>
                                            <Bookmark className="w-4 h-4 text-zinc-700" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{t('training_prog.mastery_level', { percent: 84 })}</span>
                            <button className="text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:underline">{t('training_prog.view_all_protocols')} →</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- DRILL LIBRARY PREVIEW --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { title: t('training_prog.drills.finishing'), cat: t('shared.technical'), icon: '⚽' },
                    { title: t('training_prog.drills.reaction'), cat: t('shared.physical'), icon: '⚡' },
                    { title: t('training_prog.drills.defensive'), cat: t('shared.tactical'), icon: '🛡️' },
                ].map((item, i) => (
                    <div key={i} className="p-8 rounded-[40px] bg-white/5 border border-white/5 hover:border-white/20 transition-all cursor-pointer group">
                        <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform w-12 h-12 flex items-center justify-center bg-zinc-900 rounded-2xl shadow-xl">{item.icon}</div>
                        <h4 className="text-lg font-black text-white italic uppercase tracking-tighter mb-2">{item.title}</h4>
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{item.cat}</span>
                            <ArrowRight className="w-4 h-4 text-zinc-700 group-hover:text-primary transition-colors" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const ArrowRight = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
);
