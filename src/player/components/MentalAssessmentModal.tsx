import { useState } from 'react';
import { X, Save, Brain } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { MentalAssessment } from '../../services/MentalEngine';

interface MentalAssessmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Omit<MentalAssessment, 'id' | 'date'>) => void;
}

export const MentalAssessmentModal = ({ isOpen, onClose, onSubmit }: MentalAssessmentModalProps) => {
    const { t } = useTranslation();
    const [evalType, setEvalType] = useState<'self' | 'coach'>('self');
    const [scores, setScores] = useState<Record<string, number>>({
        confidence: 5,
        focus: 5,
        emotionalControl: 5,
        motivation: 5,
        discipline: 5,
        stressManagement: 5,
        coachability: 5,
        competitiveness: 5
    });

    if (!isOpen) return null;

    const handleChange = (key: string, val: number) => {
        setScores(prev => ({ ...prev, [key]: val }));
    };

    const handleSubmit = () => {
        onSubmit({
            type: evalType,
            confidence: scores.confidence,
            focus: scores.focus,
            emotionalControl: scores.emotionalControl,
            motivation: scores.motivation,
            discipline: scores.discipline,
            stressManagement: scores.stressManagement,
            coachability: scores.coachability,
            competitiveness: scores.competitiveness
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <div className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-3xl p-6 relative my-8">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                >
                    <X className="w-5 h-5 text-zinc-400" />
                </button>

                <h2 className="text-xl font-black text-white mb-2 pr-8 flex items-center gap-2">
                    <Brain className="w-6 h-6 text-amber-500" />
                    {t('mental_assessment.title')}
                </h2>

                {/* Type Toggle */}
                <div className="flex bg-zinc-800 p-1 rounded-xl mb-6">
                    <button
                        onClick={() => setEvalType('self')}
                        className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${evalType === 'self' ? 'bg-amber-500 text-black shadow-lg' : 'text-zinc-400 hover:text-white'
                            }`}
                    >
                        {t('mental_assessment.self_eval')}
                    </button>
                    <button
                        onClick={() => setEvalType('coach')}
                        className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${evalType === 'coach' ? 'bg-amber-500 text-black shadow-lg' : 'text-zinc-400 hover:text-white'
                            }`}
                    >
                        {t('mental_assessment.coach_eval')}
                    </button>
                </div>

                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                    {Object.keys(scores).map(key => (
                        <div key={key}>
                            <div className="flex justify-between mb-1">
                                <label className="text-xs font-bold text-zinc-400 uppercase">
                                    {t(`mental_assessment.scores.${key}`)}
                                </label>
                                <span className="text-xs font-bold text-amber-400">{scores[key]}/10</span>
                            </div>
                            <input
                                type="range"
                                min="1" max="10" step="1"
                                value={scores[key]}
                                onChange={(e) => handleChange(key, parseFloat(e.target.value))}
                                className="w-full accent-amber-500 h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                    ))}
                </div>

                <div className="pt-4">
                    <button
                        onClick={handleSubmit}
                        className="w-full py-4 bg-amber-500 text-black font-black rounded-xl hover:bg-amber-400 transition-colors flex items-center justify-center gap-2"
                    >
                        <Save className="w-5 h-5" />
                        {t('mental_assessment.save')}
                    </button>
                </div>
            </div>
        </div>
    );
};
