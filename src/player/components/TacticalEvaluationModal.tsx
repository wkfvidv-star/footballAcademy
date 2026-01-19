import { useState } from 'react';
import { X, Save, BrainCircuit } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { TacticalEvaluation } from '../../services/TacticalEngine';

interface TacticalEvaluationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (evalData: Omit<TacticalEvaluation, 'id' | 'date'>) => void;
}

export const TacticalEvaluationModal = ({ isOpen, onClose, onSubmit }: TacticalEvaluationModalProps) => {
    const { t } = useTranslation();
    const [scores, setScores] = useState<Record<string, number>>({
        positioning: 7,
        offBallMovement: 7,
        defensiveAwareness: 7,
        pressing: 7,
        transition: 7,
        decisionMaking: 7,
        spaceOccupation: 7,
        teamShape: 7
    });
    const [notes, setNotes] = useState('');

    if (!isOpen) return null;

    const handleChange = (key: string, val: number) => {
        setScores(prev => ({ ...prev, [key]: val }));
    };

    const handleSubmit = () => {
        onSubmit({
            positioning: scores.positioning,
            offBallMovement: scores.offBallMovement,
            defensiveAwareness: scores.defensiveAwareness,
            pressing: scores.pressing,
            transition: scores.transition,
            decisionMaking: scores.decisionMaking,
            spaceOccupation: scores.spaceOccupation,
            teamShape: scores.teamShape,
            coachNotes: notes
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
                    <BrainCircuit className="w-6 h-6 text-purple-500" />
                    {t('tactical_evaluation.title')}
                </h2>
                <p className="text-xs text-zinc-500 mb-6 font-medium">{t('tactical_evaluation.description')}</p>

                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                    {Object.keys(scores).map(key => (
                        <div key={key}>
                            <div className="flex justify-between mb-1">
                                <label className="text-xs font-bold text-zinc-400 uppercase">
                                    {t(`tactical_evaluation.scores.${key}`)}
                                </label>
                                <span className="text-xs font-bold text-purple-400">{scores[key]}/10</span>
                            </div>
                            <input
                                type="range"
                                min="1" max="10" step="0.5"
                                value={scores[key]}
                                onChange={(e) => handleChange(key, parseFloat(e.target.value))}
                                className="w-full accent-purple-500 h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                    ))}

                    <div>
                        <label className="text-xs font-bold text-zinc-400 uppercase mb-2 block">{t('tactical_evaluation.coach_notes')}</label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="w-full bg-zinc-800 text-white text-sm p-3 rounded-xl border border-white/5 outline-none h-24"
                            placeholder={t('tactical_evaluation.notes_placeholder')}
                        />
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        onClick={handleSubmit}
                        className="w-full py-4 bg-purple-600 text-white font-black rounded-xl hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                    >
                        <Save className="w-5 h-5" />
                        {t('tactical_evaluation.save')}
                    </button>
                </div>
            </div>
        </div>
    );
};
