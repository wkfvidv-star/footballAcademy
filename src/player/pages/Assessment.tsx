import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Target, BrainCircuit, Brain, Dumbbell,
    AlertCircle, TrendingUp, Info
} from 'lucide-react';
import { usePhysical } from '../../context/PhysicalContext';
import { useTechnical } from '../../context/TechnicalContext';
import { useTactical } from '../../context/TacticalContext';
import { useMental } from '../../context/MentalContext';
import { PDICard } from '../components/PDICard';
import { PhysicalRadar } from '../components/PhysicalRadar';
import { TechnicalRadar } from '../components/TechnicalRadar';
import { TacticalRadar } from '../components/TacticalRadar';
import { MentalRadar } from '../components/MentalRadar';
import { GlassCard } from '../../components/shared/GlassCard';
import { TestInputModal } from '../components/TestInputModal';
import { TechnicalTestModal } from '../components/TechnicalTestModal';
import { TacticalEvaluationModal } from '../components/TacticalEvaluationModal';
import { MentalAssessmentModal } from '../components/MentalAssessmentModal';

export default function Assessment() {
    const { t } = useTranslation();
    const { addTestResult, weaknesses, maturityStatus, setMaturityStatus } = usePhysical();
    const { addTestResult: addTechResult, position, setPosition } = useTechnical();
    const { addEvaluation } = useTactical();
    const { mentalProfile, addAssessment } = useMental();

    const [showTestModal, setShowTestModal] = useState(false);
    const [showTechModal, setShowTechModal] = useState(false);
    const [showTacEvalModal, setShowTacEvalModal] = useState(false);
    const [showMentalModal, setShowMentalModal] = useState(false);

    const tabs = [
        { id: 'all', name: t('assessment.tabs.all'), icon: Target },
        { id: 'physical', name: t('assessment.tabs.physical'), icon: Dumbbell },
        { id: 'technical', name: t('assessment.tabs.technical'), icon: Target },
        { id: 'tactical', name: t('assessment.tabs.tactical'), icon: BrainCircuit },
        { id: 'mental', name: t('assessment.tabs.mental'), icon: Brain },
    ];

    const [activeTab, setActiveTab] = useState('all');

    return (
        <div className="space-y-10 animate-in fade-in pb-12">
            <TestInputModal isOpen={showTestModal} onClose={() => setShowTestModal(false)} onSubmit={addTestResult} />
            <TechnicalTestModal isOpen={showTechModal} onClose={() => setShowTechModal(false)} onSubmit={addTechResult} />
            <TacticalEvaluationModal isOpen={showTacEvalModal} onClose={() => setShowTacEvalModal(false)} onSubmit={addEvaluation} />
            <MentalAssessmentModal isOpen={showMentalModal} onClose={() => setShowMentalModal(false)} onSubmit={addAssessment} />

            {/* --- HEADER & TABS --- */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none mb-3">
                        {t('assessment.title')}
                    </h1>
                    <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.2em]">
                        {t('assessment.subtitle')}
                    </p>
                </div>

                <div className="flex bg-zinc-900/80 p-1.5 rounded-[24px] border border-white/5 backdrop-blur-md overflow-x-auto no-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                flex items-center gap-2 px-6 py-3 rounded-[20px] transition-all whitespace-nowrap
                                ${activeTab === tab.id ? 'bg-primary text-zinc-900 shadow-xl shadow-primary/20' : 'text-zinc-500 hover:text-white'}
                            `}
                        >
                            <tab.icon className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest">{tab.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* --- CONTENT BASED ON TAB --- */}
            <div className="space-y-10">
                {activeTab === 'all' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <PDICard />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <GlassCard title={t('bio.maturity_status')} icon={TrendingUp} variant="primary">
                                <div className="py-2">
                                    <div className="text-5xl font-black text-white italic uppercase mb-2">
                                        {maturityStatus === 'late' ? t('bio.late') : t('bio.on_time')}
                                    </div>
                                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-tight">{t('assessment.maturity_desc')}</p>
                                    <div className="mt-8 flex gap-2">
                                        <button onClick={() => setMaturityStatus('late')} className="px-4 py-2 bg-zinc-800 rounded-xl text-[10px] font-black uppercase text-zinc-400 hover:text-white border border-white/5 transition-all">{t('bio.late')}</button>
                                        <button onClick={() => setMaturityStatus('on-time')} className="px-4 py-2 bg-zinc-800 rounded-xl text-[10px] font-black uppercase text-zinc-400 hover:text-white border border-white/5 transition-all">{t('bio.on_time')}</button>
                                    </div>
                                </div>
                            </GlassCard>
                            <GlassCard title={t('assessment.dominant_pos')} icon={Target} variant="muted">
                                <div className="py-2">
                                    <div className="text-5xl font-black text-white italic uppercase mb-2">
                                        {position}
                                    </div>
                                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-tight">{t('assessment.pos_desc')}</p>
                                    <div className="mt-8">
                                        <button onClick={() => setPosition('ATT')} className="px-4 py-2 bg-zinc-800 rounded-xl text-[10px] font-black uppercase text-zinc-400 hover:text-white border border-white/5 transition-all">{t('assessment.update_pos')}</button>
                                    </div>
                                </div>
                            </GlassCard>
                        </div>
                    </div>
                )}

                {(activeTab === 'all' || activeTab === 'physical') && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <GlassCard
                            title={t('dashboard.physical_engine')}
                            icon={Dumbbell}
                            headerAction={
                                <button onClick={() => setShowTestModal(true)} className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 rounded-xl transition-colors">
                                    <Dumbbell className="w-4 h-4" />
                                </button>
                            }
                        >
                            <PhysicalRadar />
                        </GlassCard>

                        <GlassCard
                            title={t('assessment.weakness_log')}
                            icon={AlertCircle}
                            variant="muted"
                        >
                            <div className="space-y-4">
                                {weaknesses.map(weakness => (
                                    <div key={weakness} className="p-5 bg-red-500/5 border border-red-500/10 rounded-3xl flex items-center justify-between group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                                                <AlertCircle className="w-5 h-5 text-red-500" />
                                            </div>
                                            <span className="text-sm font-black text-white italic uppercase tracking-tight">{weakness}</span>
                                        </div>
                                        <button className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em]">{t('dashboard.view_drills')} →</button>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    </div>
                )}

                {(activeTab === 'all' || activeTab === 'technical') && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <GlassCard
                            title={t('dashboard.technical_intelligence')}
                            icon={Target}
                            headerAction={
                                <button onClick={() => setShowTechModal(true)} className="p-2 bg-primary/10 text-primary rounded-xl transition-colors">
                                    <Target className="w-4 h-4" />
                                </button>
                            }
                        >
                            <TechnicalRadar />
                        </GlassCard>
                        <div className="p-8 rounded-[40px] bg-zinc-900 shadow-2xl border border-white/5 flex flex-col justify-center">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-primary/20 rounded-2xl"><Info className="w-6 h-6 text-primary" /></div>
                                <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">{t('assessment.positional_insights')}</h3>
                            </div>
                            <p className="text-zinc-500 font-bold uppercase text-xs leading-relaxed tracking-tight">
                                {t('assessment.positional_msg', { pos: position })}
                            </p>
                        </div>
                    </div>
                )}

                {(activeTab === 'all' || activeTab === 'tactical') && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <GlassCard
                            title={t('dashboard.tactical_iq')}
                            icon={BrainCircuit}
                            headerAction={
                                <button onClick={() => setShowTacEvalModal(true)} className="p-2 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/20 hover:bg-purple-500/20 transition-all"><BrainCircuit className="w-4 h-4" /></button>
                            }
                        >
                            <TacticalRadar />
                        </GlassCard>
                        <div className="p-8 rounded-[40px] bg-indigo-950/20 shadow-2xl border border-white/5 flex flex-col justify-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-5"><BrainCircuit className="w-32 h-32 text-indigo-400" /></div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-indigo-500/20 rounded-2xl"><Target className="w-6 h-6 text-indigo-400" /></div>
                                <h3 className="text-xl font-black text-white italic uppercase tracking-tighter whitespace-nowrap">{t('assessment.tactical_footprint')}</h3>
                            </div>
                            <p className="text-zinc-400 font-bold uppercase text-xs leading-relaxed tracking-tight relative z-10">
                                {t('assessment.tactical_msg')}
                            </p>
                        </div>
                    </div>
                )}

                {(activeTab === 'all' || activeTab === 'mental') && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <GlassCard
                            title={t('dashboard.mindset')}
                            icon={Brain}
                            headerAction={
                                <button onClick={() => setShowMentalModal(true)} className="p-2 bg-amber-500/10 text-amber-500 rounded-xl border border-amber-500/20 hover:bg-amber-500/20 transition-all"><Brain className="w-4 h-4" /></button>
                            }
                        >
                            <MentalRadar />
                        </GlassCard>

                        <GlassCard
                            title={t('dashboard.psych_profile')}
                            variant="muted"
                        >
                            <div className="flex items-center justify-between mb-10 px-6">
                                <div className="text-center">
                                    <div className="text-5xl font-black text-white italic">{mentalProfile.selfScore}</div>
                                    <div className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mt-2">{t('assessment.self_eval')}</div>
                                </div>
                                <div className="h-px bg-white/10 flex-1 mx-10"></div>
                                <div className="text-center">
                                    <div className="text-5xl font-black text-white italic">{mentalProfile.coachScore}</div>
                                    <div className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mt-2">{t('assessment.coach_eval')}</div>
                                </div>
                            </div>
                            {mentalProfile.gapAnalysis.hasGap ? (
                                <div className="p-6 rounded-[32px] bg-amber-500/5 border border-amber-500/10">
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="p-2 bg-amber-500/20 rounded-xl"><AlertCircle className="w-5 h-5 text-amber-500" /></div>
                                        <h4 className="font-black text-white text-[11px] uppercase tracking-widest">{t('dashboard.gap_detected')}</h4>
                                    </div>
                                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-tight ml-12">
                                        {t('dashboard.blind_spots')}: <span className="text-zinc-300">{mentalProfile.gapAnalysis.blindSpots.join(', ')}</span>
                                    </p>
                                </div>
                            ) : (
                                <div className="p-6 rounded-[32px] bg-primary/5 border border-primary/10 flex items-center gap-5">
                                    <div className="p-3 bg-primary/20 rounded-2xl"><Brain className="w-6 h-6 text-primary" /></div>
                                    <h4 className="font-black text-white text-xs uppercase tracking-widest">{t('assessment.alignment_verified')}</h4>
                                </div>
                            )}
                        </GlassCard>
                    </div>
                )}
            </div>
        </div>
    );
}
