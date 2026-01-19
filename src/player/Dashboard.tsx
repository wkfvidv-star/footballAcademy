import { Activity, Calendar, TrendingUp } from 'lucide-react';
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
import { AlertCircle, HeartPulse, Activity as ActivityIcon, Dumbbell, AlertTriangle, Target, BrainCircuit, Brain, Trophy, Map } from 'lucide-react';
import { useState } from 'react';
import { GPSAnalysisModal } from './components/GPSAnalysisModal';

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

    const getRiskColor = (risk?: string) => {
        switch (risk) {
            case 'critical': return 'text-red-500';
            case 'high': return 'text-red-500';
            case 'moderate': return 'text-amber-500';
            default: return 'text-green-500';
        }
    };

    const playerStats = {
        physical: 84,
        technical: 89,
        tactical: tacticalProfile?.overallScore ? tacticalProfile.overallScore * 10 : 82,
        mental: mentalProfile?.overallScore ? mentalProfile.overallScore * 10 : 85
    };

    return (
        <div className="space-y-6 pb-24">
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
            <div className="flex items-center justify-between px-2">
                <div>
                    <h1 className="text-2xl font-black text-white tracking-tight">
                        {t('dashboard.welcome', { name: 'Riyad' })}
                    </h1>
                    <p className="text-zinc-400 text-sm font-medium">{t('dashboard.ready_message')}</p>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={() => setShowSessionModal(true)} className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center border border-white/10 transition-colors">
                        <ActivityIcon className="w-5 h-5 text-white" />
                    </button>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20">
                        RM
                    </div>
                </div>
            </div>

            {/* --- HERO: AI COACH --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <PDICard />
                <TrainingRecommendations />
            </div>

            {/* --- HERO: BIO CARD --- */}
            <BioCard profile={bioProfile} onUpdateClick={() => setShowGrowthModal(true)} />


            {/* --- MAIN GRID --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT COLUMN (2/3): METRICS */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Medical / Load */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div onClick={() => !hasCheckedInToday && setShowWellnessModal(true)}
                            className={`p-5 rounded-3xl border transition-all relative overflow-hidden ${hasCheckedInToday ? 'bg-green-500/10 border-green-500/20 cursor-default' : 'bg-primary border-primary cursor-pointer shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95'}`}>
                            <div className="relative z-10">
                                <div className={`p-2 rounded-xl w-fit mb-3 ${hasCheckedInToday ? 'bg-green-500/20' : 'bg-black/20 backdrop-blur-sm'}`}>
                                    <HeartPulse className={`w-6 h-6 ${hasCheckedInToday ? 'text-green-500' : 'text-white'}`} />
                                </div>
                                <h3 className={`text-lg font-black leading-tight mb-1 ${hasCheckedInToday ? 'text-white' : 'text-black'}`}>
                                    {hasCheckedInToday ? 'Readiness Logged' : 'Daily Check-in'}
                                </h3>
                                <p className={`text-xs font-bold leading-tight ${hasCheckedInToday ? 'text-zinc-400' : 'text-black/60'}`}>
                                    {hasCheckedInToday ? 'Updates tomorrow' : 'Log sleep & fatigue'}
                                </p>
                            </div>
                            {!hasCheckedInToday && <Activity className="absolute -bottom-4 -right-4 w-24 h-24 text-black/10 rotate-12" />}
                        </div>

                        <div className="p-5 rounded-3xl bg-zinc-900/50 border border-white/5 flex flex-col justify-between relative overflow-hidden">
                            <div className="flex justify-between items-start z-10">
                                <div className="p-2 bg-zinc-800 rounded-xl">
                                    <AlertCircle className={`w-5 h-5 ${getRiskColor(loadMetrics?.riskLevel)}`} />
                                </div>
                                {loadMetrics ? (
                                    <div className="text-right">
                                        <div className={`text-2xl font-black ${getRiskColor(loadMetrics.riskLevel)}`}>{loadMetrics.acwr}</div>
                                        <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">ACWR Ratio</div>
                                    </div>
                                ) : <div className="text-xs text-zinc-500 font-bold mt-2">No Data</div>}
                            </div>
                            <div className="z-10 mt-4">
                                <div className="text-sm font-bold text-white mb-1">
                                    {loadMetrics?.riskLevel === 'critical' || loadMetrics?.riskLevel === 'high' ? 'High Injury Risk' : loadMetrics?.riskLevel === 'moderate' ? 'Monitor Load' : 'Optimal Load'}
                                </div>
                                <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full ${loadMetrics?.riskLevel === 'low' ? 'bg-green-500' : loadMetrics?.riskLevel === 'moderate' ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${Math.min(((loadMetrics?.acwr || 0) / 2) * 100, 100)}%` }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Physical */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-3xl relative overflow-hidden">
                            <div className="flex justify-between items-center mb-4 relative z-10">
                                <div>
                                    <h3 className="text-lg font-black text-white">{t('dashboard.physical_engine')}</h3>
                                    <p className="text-xs font-medium text-zinc-500">{t('dashboard.bio_adjusted')} {maturityStatus === 'late' ? t('dashboard.late_bloomer') : ''}</p>
                                </div>
                                <button onClick={() => setShowTestModal(true)} className="bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded-xl border border-white/5"><Dumbbell className="w-4 h-4" /></button>
                            </div>
                            <PhysicalRadar />
                        </div>
                        <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-3xl">
                            <h3 className="text-lg font-black text-white mb-4">{t('dashboard.focus_areas')}</h3>
                            {weaknesses.length > 0 ? (
                                <div className="space-y-3">
                                    {weaknesses.map(weakness => (
                                        <div key={weakness} className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-between">
                                            <div className="flex items-center gap-3"><AlertTriangle className="w-4 h-4 text-red-500" /><span className="text-sm font-bold text-white max-w-[120px] truncate">{weakness}</span></div>
                                            <button className="text-xs font-bold text-red-400 hover:underline">{t('dashboard.view_drills')}</button>
                                        </div>
                                    ))}
                                </div>
                            ) : <div className="text-center py-8 text-zinc-500 text-sm">{t('dashboard.no_weaknesses')}</div>}
                        </div>
                    </div>

                    {/* Technical */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-3xl relative overflow-hidden">
                            <div className="flex justify-between items-center mb-4 relative z-10">
                                <div>
                                    <h3 className="text-lg font-black text-white">{t('dashboard.technical_intelligence')}</h3>
                                    <p className="text-xs font-medium text-zinc-500">{t('dashboard.positional')}: {position}</p>
                                </div>
                                <button onClick={() => setShowTechModal(true)} className="bg-blue-600/20 text-blue-500 p-2 rounded-xl border border-blue-500/20"><Target className="w-4 h-4" /></button>
                            </div>
                            <TechnicalRadar />
                        </div>
                        <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-3xl">
                            <h3 className="text-lg font-black text-white mb-4">{t('dashboard.tech_targets')}</h3>
                            {techWeaknesses.length > 0 ? (
                                <div className="space-y-3">
                                    {techWeaknesses.map(weakness => (
                                        <div key={weakness} className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-between">
                                            <div className="flex items-center gap-3"><Target className="w-4 h-4 text-blue-500" /><span className="text-sm font-bold text-white max-w-[120px] truncate">{weakness}</span></div>
                                            <button className="text-xs font-bold text-blue-400 hover:underline">Assign Drill</button>
                                        </div>
                                    ))}
                                </div>
                            ) : <div className="text-center py-8 text-zinc-500 text-sm">Tech Mastery Achieved.</div>}
                        </div>
                    </div>

                    {/* Tactical */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-3xl relative overflow-hidden">
                            <div className="flex justify-between items-center mb-4 relative z-10">
                                <div>
                                    <h3 className="text-lg font-black text-white">{t('dashboard.tactical_iq')}</h3>
                                    <p className="text-xs font-medium text-zinc-500">{t('dashboard.coach_eval_match')}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => setShowTacEvalModal(true)} className="bg-purple-600/20 text-purple-500 p-2 rounded-xl border border-purple-500/20"><BrainCircuit className="w-4 h-4" /></button>
                                    <button onClick={() => setShowMatchModal(true)} className="bg-green-600/20 text-green-500 p-2 rounded-xl border border-green-500/20"><Trophy className="w-4 h-4" /></button>
                                    <button onClick={() => setShowGPSModal(true)} className="bg-emerald-600/20 text-emerald-500 p-2 rounded-xl border border-emerald-500/20"><Map className="w-4 h-4" /></button>
                                </div>
                            </div>
                            <TacticalRadar />
                        </div>
                        {/* Placeholder for Tactical Weakness or Match Log Summary if needed, or just fill with stats */}
                        <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-3xl flex flex-col justify-center items-center">
                            <div className='text-zinc-500 text-sm font-medium text-center' dangerouslySetInnerHTML={{ __html: t('dashboard.game_intelligence_overview') }}></div>
                        </div>
                    </div>

                    {/* Mental */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-3xl relative overflow-hidden">
                            <div className="flex justify-between items-center mb-4 relative z-10">
                                <div>
                                    <h3 className="text-lg font-black text-white">{t('dashboard.mindset')}</h3>
                                    <p className="text-xs font-medium text-zinc-500">{t('dashboard.psychology_focus')}</p>
                                </div>
                                <button onClick={() => setShowMentalModal(true)} className="bg-amber-600/20 text-amber-500 p-2 rounded-xl border border-amber-500/20"><Brain className="w-4 h-4" /></button>
                            </div>
                            <MentalRadar />
                        </div>
                        <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-3xl">
                            <h3 className="text-lg font-black text-white mb-6">{t('dashboard.psych_profile')}</h3>
                            <div className="flex items-center justify-between mb-8">
                                <div className="text-center">
                                    <div className="text-2xl font-black text-white">{mentalProfile.selfScore}</div>
                                    <div className="text-[10px] font-bold text-zinc-500 uppercase">Self</div>
                                </div>
                                <div className="h-px bg-white/10 flex-1 mx-4"></div>
                                <div className="text-center">
                                    <div className="text-2xl font-black text-white">{mentalProfile.coachScore}</div>
                                    <div className="text-[10px] font-bold text-zinc-500 uppercase">Coach</div>
                                </div>
                            </div>
                            {mentalProfile.gapAnalysis.hasGap ? (
                                <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 mb-4">
                                    <div className="flex items-center gap-3 mb-2"><AlertCircle className="w-5 h-5 text-orange-500" /><h4 className="font-bold text-white text-sm">{t('dashboard.gap_detected')}</h4></div>
                                    <p className="text-xs text-zinc-400">{t('dashboard.blind_spots')}: {mentalProfile.gapAnalysis.blindSpots.join(', ')}</p>
                                </div>
                            ) : (
                                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 mb-4">
                                    <div className="flex items-center gap-3"><Brain className="w-5 h-5 text-green-500" /><h4 className="font-bold text-white text-sm">{t('dashboard.aligned')}</h4></div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                {/* RIGHT COLUMN (1/3): UTILITIES */}
                <div className="space-y-6">
                    {/* Today's Status */}
                    <div className="relative overflow-hidden rounded-3xl bg-primary text-white p-6 shadow-xl shadow-primary/10">
                        <div className="relative z-10 flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-2 mb-2 opacity-90">
                                    <Calendar className="w-4 h-4" />
                                    <span className="text-xs font-bold uppercase tracking-wider">{t('upcoming.today')} • 16:30</span>
                                </div>
                                <h3 className="text-2xl font-black leading-tight mb-1">{t('dashboard.team_training')}</h3>
                                <p className="text-sm opacity-90 font-medium">{t('dashboard.training_details')}</p>
                            </div>
                            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                                <Activity className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Stats Tiles */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-zinc-900/50 border border-white/5 p-5 rounded-3xl">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-2 bg-blue-500/10 rounded-xl"><TrendingUp className="w-5 h-5 text-blue-400" /></div>
                                <span className="text-xs font-bold text-green-400">+12%</span>
                            </div>
                            <div>
                                <div className="text-2xl font-black text-white">{t('dashboard.high')}</div>
                                <div className="text-xs text-zinc-500 font-medium">{t('dashboard.weekly_load')}</div>
                            </div>
                        </div>
                        <div className="bg-zinc-900/50 border border-white/5 p-5 rounded-3xl">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-2 bg-amber-500/10 rounded-xl"><Trophy className="w-5 h-5 text-amber-400" /></div>
                                <span className="text-xs font-bold text-white">{t('dashboard.day_count', { count: 3 })}</span>
                            </div>
                            <div>
                                <div className="text-2xl font-black text-white">{t('dashboard.streak')}</div>
                                <div className="text-xs text-zinc-500 font-medium">{t('dashboard.keep_it_up')}</div>
                            </div>
                        </div>
                    </div>

                    {/* Coach Motivation */}
                    <div className="bg-zinc-900 border border-white/5 p-6 rounded-3xl relative overflow-hidden">
                        <div className="flex gap-4 relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 shrink-0 flex items-center justify-center">
                                <span className="text-lg">📣</span>
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-sm mb-1">{t('dashboard.coach_focus')}</h4>
                                <p className="text-zinc-400 text-sm leading-relaxed">
                                    <Trans i18nKey="dashboard.coach_message" components={[<span className="text-primary font-bold" />]} />
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Debug / Toggles */}
                    <div className="p-4 bg-zinc-900/30 rounded-3xl border border-white/5">
                        <div className="text-[10px] text-zinc-500 font-bold uppercase mb-2">Dev Controls</div>
                        <div className="flex flex-wrap gap-2">
                            <button onClick={() => setMaturityStatus('late')} className="px-2 py-1 bg-zinc-800 rounded text-xs">Bio: Late</button>
                            <button onClick={() => setPosition('ATT')} className="px-2 py-1 bg-zinc-800 rounded text-xs">Pos: ATT</button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}
