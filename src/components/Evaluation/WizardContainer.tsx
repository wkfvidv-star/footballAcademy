import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { calculateOVR } from '../../services/ovrService';
import { FIELD_TESTS, COACH_ASSESSMENT_QUESTIONS, SELF_ASSESSMENT_QUESTIONS } from './questions';
import { normalizeScore } from '../../services/normalization';
import WizardStep from './WizardStep';
import ProgressBar from './ProgressBar';
import Summary from './Summary';
import type { PlayerMetrics, TestDefinition } from '../../types';
import { X, User, ClipboardList, Activity } from 'lucide-react';

interface WizardContainerProps {
    onCheckOut: () => void;
}

type EvaluationMode = 'SELECT' | 'SELF' | 'COACH' | 'FIELD';

export default function WizardContainer({ onCheckOut }: WizardContainerProps) {
    const { t } = useTranslation();
    const [mode, setMode] = useState<EvaluationMode>('SELECT');
    const [questions, setQuestions] = useState<(TestDefinition & { id: string })[]>([]);

    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [isComplete, setIsComplete] = useState(false);
    const [currentValue, setCurrentValue] = useState(5);
    const [calculatedScore, setCalculatedScore] = useState<PlayerMetrics | null>(null);

    const handleModeSelect = (selectedMode: 'SELF' | 'COACH' | 'FIELD') => {
        let selectedQuestions: (TestDefinition & { id: string })[] = [];

        switch (selectedMode) {
            case 'SELF': selectedQuestions = SELF_ASSESSMENT_QUESTIONS; break;
            case 'COACH': selectedQuestions = COACH_ASSESSMENT_QUESTIONS; break;
            case 'FIELD': selectedQuestions = FIELD_TESTS; break;
        }

        setQuestions(selectedQuestions);
        setMode(selectedMode);
        setCurrentValue(selectedMode === 'FIELD' ? 0 : 5); // Default 0 for input, 5 for rating
    };

    const handleNext = () => {
        const currentQuestion = questions[currentStep];
        const newAnswers = { ...answers, [currentQuestion.id]: currentValue };
        setAnswers(newAnswers);

        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
            const nextQ = questions[currentStep + 1];
            setCurrentValue(nextQ.type === 'OBJECTIVE' ? 0 : 5);
        } else {
            calculateResults(newAnswers);
        }
    };

    const calculateResults = (finalAnswers: Record<string, number>) => {
        let physicalSum = 0, physicalCount = 0;
        let technicalSum = 0, technicalCount = 0;
        let tacticalSum = 0, tacticalCount = 0;
        let mentalSum = 0, mentalCount = 0;

        questions.forEach(q => {
            const rawVal = finalAnswers[q.id];
            // Normalize with Age and Position (Mocking U17 Forward for now)
            const score = normalizeScore(q.id, rawVal, 'U17', 'ATT');

            switch (q.category) {
                case 'PHYSICAL': physicalSum += score; physicalCount++; break;
                case 'TECHNICAL': technicalSum += score; technicalCount++; break;
                case 'TACTICAL': tacticalSum += score; tacticalCount++; break;
                case 'PSYCHOLOGICAL': mentalSum += score; mentalCount++; break;
            }
        });

        const physical = physicalCount > 0 ? Math.round((physicalSum / physicalCount) * 10) : 65;
        const technical = technicalCount > 0 ? Math.round((technicalSum / technicalCount) * 10) : 70;
        const tactical = tacticalCount > 0 ? Math.round((tacticalSum / tacticalCount) * 10) : 60;
        const mental = mentalCount > 0 ? Math.round((mentalSum / mentalCount) * 10) : 75;

        const ovr = calculateOVR(physical, technical, tactical, mental);

        const metrics: PlayerMetrics = {
            overallValid: ovr,
            physical,
            technical,
            tactical,
            psychological: mental,
            lastUpdated: new Date()
        };

        setCalculatedScore(metrics);
        setIsComplete(true);
    };

    if (isComplete && calculatedScore) {
        return <Summary score={calculatedScore} onClose={onCheckOut} />;
    }

    if (mode === 'SELECT') {
        return (
            <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-6">
                <div className="w-full max-w-md bg-card border border-border rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in duration-300">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-black text-white uppercase italic">{t('evaluation.results')}</h2>
                        <button onClick={onCheckOut} className="p-2 bg-secondary rounded-full hover:bg-destructive/20 text-zinc-400 hover:text-destructive transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={() => handleModeSelect('SELF')}
                            className="w-full p-4 bg-secondary/50 hover:bg-primary/20 hover:border-primary border border-transparent rounded-2xl flex items-center gap-4 transition-all group"
                        >
                            <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <User className="w-6 h-6" />
                            </div>
                            <div className="text-start">
                                <div className="font-bold text-white">{t('evaluation.self')}</div>
                                <div className="text-xs text-zinc-500">{t('evaluation.self_desc')}</div>
                            </div>
                        </button>

                        <button
                            onClick={() => handleModeSelect('COACH')}
                            className="w-full p-4 bg-secondary/50 hover:bg-primary/20 hover:border-primary border border-transparent rounded-2xl flex items-center gap-4 transition-all group"
                        >
                            <div className="w-12 h-12 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <ClipboardList className="w-6 h-6" />
                            </div>
                            <div className="text-start">
                                <div className="font-bold text-white">{t('evaluation.coach')}</div>
                                <div className="text-xs text-zinc-500">{t('evaluation.coach_desc')}</div>
                            </div>
                        </button>

                        <button
                            onClick={() => handleModeSelect('FIELD')}
                            className="w-full p-4 bg-secondary/50 hover:bg-primary/20 hover:border-primary border border-transparent rounded-2xl flex items-center gap-4 transition-all group"
                        >
                            <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Activity className="w-6 h-6" />
                            </div>
                            <div className="text-start">
                                <div className="font-bold text-white">{t('evaluation.field')}</div>
                                <div className="text-xs text-zinc-500">{t('evaluation.field_desc')}</div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const question = questions[currentStep];

    return (
        <div className="fixed inset-0 z-50 bg-background flex justify-center">
            <div className="w-full max-w-md flex flex-col p-6">
                <div className="flex justify-between items-center mb-6">
                    <div className="text-sm font-bold text-zinc-500">
                        {t('evaluation.step_of', { current: currentStep + 1, total: questions.length })}
                    </div>
                    <button onClick={onCheckOut} className="p-2 bg-secondary rounded-full text-zinc-400 hover:text-white">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <ProgressBar current={currentStep + 1} total={questions.length} />

                <WizardStep
                    question={question}
                    value={currentValue}
                    onChange={setCurrentValue}
                    onNext={handleNext}
                />
            </div>
        </div>
    );
}
