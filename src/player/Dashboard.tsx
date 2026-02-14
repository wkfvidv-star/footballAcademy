import { Activity, Calendar, TrendingUp, AlertCircle, HeartPulse, Activity as ActivityIcon, Dumbbell, AlertTriangle, Target, BrainCircuit, Brain, Trophy, Map, LayoutDashboard, Zap, GraduationCap } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import PlayerCard from './components/PlayerCard';

import { BioCard } from './components/BioCard';
import { GrowthModal } from './components/GrowthModal';
import { BioEngine } from '../services/bioEngine';
import type { BiologicalProfile, GrowthMeasurement, GeneticInputs } from '../types/growth';
import { useMedical } from '../context/MedicalContext';
import { usePhysical } from '../context/PhysicalContext';
import { useTechnical } from '../context/TechnicalContext';
import { useTactical } from '../context/TacticalContext';
import { useMental } from '../context/MentalContext';
import { WellnessModal } from './components/WellnessModal';
import { SessionModal } from './components/SessionModal';
import { TestInputModal } from './components/TestInputModal';
import { TechnicalTestModal } from './components/TechnicalTestModal';
import { TacticalEvaluationModal } from './components/TacticalEvaluationModal';
import { MatchPerformanceModal } from './components/MatchPerformanceModal';
import { MentalAssessmentModal } from './components/MentalAssessmentModal';
import { PhysicalRadar } from './components/PhysicalRadar';
import { TechnicalRadar } from './components/TechnicalRadar';
import { TacticalRadar } from './components/TacticalRadar';
import { MentalRadar } from './components/MentalRadar';
import { PDICard } from './components/PDICard';
import { TrainingRecommendations } from './components/TrainingRecommendations';
import { useState } from 'react';
import { GPSAnalysisModal } from './components/GPSAnalysisModal';
import NutritionModule from '../components/Nutrition/NutritionModule';
import InjuryDetectionDashboard from '../components/Dashboard/InjuryDetectionDashboard';
import EducationModule from '../components/Education/EducationModule';
import RecoveryModule from '../components/Recovery/RecoveryModule';
import { GlassCard } from '../components/shared/GlassCard';

export default function Dashboard() {
    const { t } = useTranslation();

    // Modals State
    const [showGrowthModal, setShowGrowthModal] = useState(false);
    const [showWellnessModal, setShowWellnessModal] = useState(false);
    const [showSessionModal, setShowSessionModal] = useState(false);
    const [showTestModal, setShowTestModal] = useState(false);
    const [showTechModal, setShowTechModal] = useState(false);
    const [showTacEvalModal, setShowTacEvalModal] = useState(false);
    const [showMatchModal, setShowMatchModal] = useState(false);
    const [showMentalModal, setShowMentalModal] = useState(false);
    const [showGPSModal, setShowGPSModal] = useState(false);

    // Contexts
    const [bioProfile, setBioProfile] = useState<BiologicalProfile | null>(null);
    const { hasCheckedInToday, submitWellness, submitSession, loadMetrics } = useMedical();
    const { addTestResult, weaknesses, maturityStatus, setMaturityStatus } = usePhysical();
    const { addTestResult: addTechResult, weaknesses: techWeaknesses, position, setPosition } = useTechnical();
    const { tacticalProfile, addEvaluation, addMatchLog } = useTactical();
    const { mentalProfile, addAssessment } = useMental();

    const handleGrowthSubmit = (measurement: Omit<GrowthMeasurement, 'id' | 'playerId'>, genetics: GeneticInputs) => {
        const profile = BioEngine.calculateProfile(14, { ...measurement, id: 'temp', playerId: 'current' }, genetics);
        setBioProfile(profile);
    };

    return (
        <div className="space-y-12 pb-24">
            {/* --- MODALS --- */}
            <GrowthModal isOpen={showGrowthModal} onClose={() => setShowGrowthModal(false)} onSubmit={handleGrowthSubmit} />
            <WellnessModal isOpen={showWellnessModal} onClose={() => setShowWellnessModal(false)} onSubmit={submitWellness} />
            <SessionModal isOpen={showSessionModal} onClose={() => setShowSessionModal(false)} onSubmit={submitSession} />
            <TestInputModal isOpen={showTestModal} onClose={() => setShowTestModal(false)} onSubmit={addTestResult} />
            <TechnicalTestModal isOpen={showTechModal} onClose={() => setShowTechModal(false)} onSubmit={addTechResult} />
            <TacticalEvaluationModal isOpen={showTacEvalModal} onClose={() => setShowTacEvalModal(false)} onSubmit={addEvaluation} />
            <MatchPerformanceModal isOpen={showMatchModal} onClose={() => setShowMatchModal(false)} onSubmit={addMatchLog} />
            <MentalAssessmentModal isOpen={showMentalModal} onClose={() => setShowMentalModal(false)} onSubmit={addAssessment} />
            <GPSAnalysisModal isOpen={showGPSModal} onClose={() => setShowGPSModal(false)} />

            {/* --- HEADER --- */}
            <div className="flex items-center justify-between px-4">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-zinc-900 font-black text-xl shadow-2xl shadow-primary/20 transform -rotate-3 group hover:rotate-0 transition-all">
                        RM
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">
                            {t('dashboard.welcome', { name: 'Riyad' })}
                        </h1>
                        <p className="text-zinc-500 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            {t('dashboard.ready_message')}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setShowSessionModal(true)}
                        className="h-12 px-6 rounded-2xl bg-white/5 hover:bg-white/10 flex items-center gap-3 border border-white/10 transition-all active:scale-95 group"
                    >
                        <ActivityIcon className="w-5 h-5 text-primary group-hover:scale-110 transition-all" />
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">{t('dashboard.log_activity')}</span>
                    </button>
                    {!hasCheckedInToday && (
                        <button
                            onClick={() => setShowWellnessModal(true)}
                            className="h-12 px-6 rounded-2xl bg-primary text-zinc-900 flex items-center gap-3 shadow-xl shadow-primary/20 transition-all active:scale-95 group"
                        >
                            <LayoutDashboard className="w-5 h-5 group-hover:rotate-12 transition-all" />
                            <span className="text-[10px] font-black uppercase tracking-widest">{t('dashboard.daily_checkin')}</span>
                        </button>
                    )}
                </div>
            </div>

            {/* --- AI STRATEGY & RECOMMENDATIONS --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4">
                <PDICard />
                <TrainingRecommendations />
            </div>

            {/* --- SECTION: READINESS --- */}
            <section className="space-y-6">
                <div className="flex items-center justify-between px-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-red-500/10 rounded-2xl">
                            <HeartPulse className="w-5 h-5 text-red-500" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-white italic uppercase tracking-tight">{t('dashboard.readiness')}</h2>
                            <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">{t('dashboard.health_recovery_status')}</p>
                        </div>
                    </div>
                    <div className="h-px flex-1 mx-8 bg-gradient-to-r from-white/5 via-white/5 to-transparent"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InjuryDetectionDashboard />
                            <RecoveryModule />
                        </div>
                        <NutritionModule />
                    </div>

                    <div className="space-y-6">
                        {/* Today's Schedule Card */}
                        <GlassCard
                            title={t('upcoming.today')}
                            subtitle="16:30 • Academy Field A"
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
                                <button className="w-full py-4 bg-primary/10 border border-primary/20 text-primary rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-primary/20 transition-all">
                                    {t('dashboard.view_session_plan')}
                                </button>
                            </div>
                        </GlassCard>

                        {/* Recent Streak Tile */}
                        <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-[32px] flex items-center justify-between group hover:border-amber-500/20 transition-all">
                            <div>
                                <div className="text-[10px] text-zinc-500 uppercase font-black mb-1">{t('dashboard.streak')}</div>
                                <div className="text-3xl font-black text-white italic">{t('dashboard.day_count', { count: 3 })}</div>
                                <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-wide mt-1">{t('dashboard.keep_it_up')}</p>
                            </div>
                            <div className="p-4 bg-amber-500/10 rounded-2xl group-hover:scale-110 transition-transform">
                                <Trophy className="w-8 h-8 text-amber-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION: PERFORMANCE ENGINES --- */}
            <section className="space-y-6">
                <div className="flex items-center justify-between px-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-primary/10 rounded-2xl">
                            <Zap className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-white italic uppercase tracking-tight">{t('dashboard.performance_engines')}</h2>
                            <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">{t('dashboard.physical_technical_tactical')}</p>
                        </div>
                    </div>
                    <div className="h-px flex-1 mx-8 bg-gradient-to-r from-white/5 via-white/5 to-transparent"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4">
                    {/* PHYSICAL ENGINE */}
                    <div className="space-y-6">
                        <BioCard profile={bioProfile} onUpdateClick={() => setShowGrowthModal(true)} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <GlassCard
                                title={t('dashboard.physical_engine')}
                                icon={Dumbbell}
                                subtitle={maturityStatus === 'late' ? t('dashboard.late_bloomer') : t('dashboard.on_track')}
                                headerAction={
                                    <button onClick={() => setShowTestModal(true)} className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 rounded-xl transition-colors">
                                        <Dumbbell className="w-4 h-4" />
                                    </button>
                                }
                            >
                                <PhysicalRadar />
                            </GlassCard>
                            <GlassCard
                                title={t('dashboard.focus_areas')}
                                icon={AlertTriangle}
                                variant="muted"
                            >
                                {weaknesses.length > 0 ? (
                                    <div className="space-y-3">
                                        {weaknesses.map(weakness => (
                                            <div key={weakness} className="p-4 bg-red-500/5 border border-red-500/20 rounded-2xl flex items-center justify-between group hover:bg-red-500/10 transition-all">
                                                <div className="flex items-center gap-3">
                                                    <AlertTriangle className="w-4 h-4 text-red-500" />
                                                    <span className="text-xs font-black text-white italic uppercase">{weakness}</span>
                                                </div>
                                                <button className="text-[10px] font-black text-red-500 hover:underline uppercase tracking-widest">{t('dashboard.view_drills')}</button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <div className="p-3 bg-zinc-800 rounded-xl mb-3"><TrendingUp className="w-6 h-6 text-zinc-600" /></div>
                                        <div className="text-xs font-black text-zinc-500 uppercase">{t('dashboard.no_weaknesses')}</div>
                                    </div>
                                )}
                            </GlassCard>
                        </div>
                    </div>

                    {/* INTELLIGENCE HUB (Technical/Tactical/Mental) */}
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* TECHNICAL */}
                            <GlassCard
                                title={t('dashboard.technical_intelligence')}
                                icon={Target}
                                subtitle={`${t('dashboard.positional')}: ${position}`}
                                headerAction={
                                    <button onClick={() => setShowTechModal(true)} className="p-2 bg-primary/10 text-primary rounded-xl transition-colors">
                                        <Target className="w-4 h-4" />
                                    </button>
                                }
                            >
                                <TechnicalRadar />
                            </GlassCard>

                            {/* TACTICAL */}
                            <GlassCard
                                title={t('dashboard.tactical_iq')}
                                icon={BrainCircuit}
                                headerAction={
                                    <div className="flex gap-2">
                                        <button onClick={() => setShowTacEvalModal(true)} className="p-2 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/20 hover:bg-purple-500/20 transition-all"><BrainCircuit className="w-4 h-4" /></button>
                                        <button onClick={() => setShowMatchModal(true)} className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20 hover:bg-emerald-500/20 transition-all"><Trophy className="w-4 h-4" /></button>
                                        <button onClick={() => setShowGPSModal(true)} className="p-2 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20 hover:bg-blue-500/20 transition-all"><Map className="w-4 h-4" /></button>
                                    </div>
                                }
                            >
                                <TacticalRadar />
                            </GlassCard>

                            {/* MENTAL */}
                            <GlassCard
                                title={t('dashboard.mindset')}
                                icon={Brain}
                                headerAction={
                                    <button onClick={() => setShowMentalModal(true)} className="p-2 bg-amber-500/10 text-amber-500 rounded-xl border border-amber-500/20 hover:bg-amber-500/20 transition-all"><Brain className="w-4 h-4" /></button>
                                }
                            >
                                <MentalRadar />
                            </GlassCard>

                            {/* MENTAL GAP ANALYSIS */}
                            <GlassCard
                                title={t('dashboard.psych_profile')}
                                variant="muted"
                            >
                                <div className="flex items-center justify-between mb-8 px-4">
                                    <div className="text-center">
                                        <div className="text-3xl font-black text-white italic">{mentalProfile.selfScore}</div>
                                        <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-1">Self</div>
                                    </div>
                                    <div className="h-px bg-white/5 flex-1 mx-6"></div>
                                    <div className="text-center">
                                        <div className="text-3xl font-black text-white italic">{mentalProfile.coachScore}</div>
                                        <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-1">Coach</div>
                                    </div>
                                </div>
                                {mentalProfile.gapAnalysis.hasGap ? (
                                    <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-1.5 bg-amber-500/20 rounded-lg"><AlertCircle className="w-4 h-4 text-amber-500" /></div>
                                            <h4 className="font-black text-white text-[10px] uppercase tracking-widest">{t('dashboard.gap_detected')}</h4>
                                        </div>
                                        <p className="text-xs text-zinc-500 font-bold uppercase tracking-tight ml-8">{t('dashboard.blind_spots')}: <span className="text-zinc-300">{mentalProfile.gapAnalysis.blindSpots.join(', ')}</span></p>
                                    </div>
                                ) : (
                                    <div className="p-5 rounded-2xl bg-primary/5 border border-primary/20 flex items-center gap-4">
                                        <div className="p-2 bg-primary/20 rounded-xl"><Brain className="w-5 h-5 text-primary" /></div>
                                        <h4 className="font-black text-white text-[10px] uppercase tracking-widest">{t('dashboard.aligned')}</h4>
                                    </div>
                                )}
                            </GlassCard>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION: KNOWLEDGE HUB --- */}
            <section className="space-y-6">
                <div className="flex items-center justify-between px-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-zinc-800 rounded-2xl">
                            <GraduationCap className="w-5 h-5 text-zinc-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-white italic uppercase tracking-tight">{t('dashboard.knowledge_hub')}</h2>
                            <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">{t('dashboard.education_and_insights')}</p>
                        </div>
                    </div>
                    <div className="h-px flex-1 mx-8 bg-gradient-to-r from-white/5 via-white/5 to-transparent"></div>
                </div>

                <div className="px-4">
                    <EducationModule />
                </div>
            </section>

            {/* COACH MOTIVATION BOTTOM BAR */}
            <div className="px-4">
                <div className="bg-zinc-900 border border-white/5 p-8 rounded-[40px] relative overflow-hidden group hover:border-primary/20 transition-all">
                    <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all"></div>
                    <div className="flex gap-8 relative z-10 items-center">
                        <div className="w-16 h-16 rounded-[28px] bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 shrink-0 flex items-center justify-center text-2xl shadow-2xl">
                            📣
                        </div>
                        <div>
                            <h4 className="text-primary font-black text-[10px] mb-2 uppercase tracking-[0.2em] italic">{t('dashboard.coach_focus')}</h4>
                            <p className="text-zinc-200 text-lg leading-relaxed font-black italic uppercase tracking-tight">
                                <Trans i18nKey="dashboard.coach_message" components={[<span className="text-primary" />]} />
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* DEV CONTROLS */}
            <div className="px-4">
                <div className="p-6 bg-zinc-950/50 rounded-[32px] border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.3em]">Developer Engine</div>
                        <div className="flex gap-2">
                            <button onClick={() => setMaturityStatus('late')} className="px-4 py-2 bg-zinc-900 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors border border-white/5">Bio: Late</button>
                            <button onClick={() => setPosition('ATT')} className="px-4 py-2 bg-zinc-900 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors border border-white/5">Pos: ATT</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
