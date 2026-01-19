import { useAICoach } from '../../context/AICoachContext';
import { Dumbbell, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const TrainingRecommendations = () => {
    const { trainingPlan, risks } = useAICoach();
    const { t } = useTranslation();

    return (
        <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-3xl h-full flex flex-col justify-between">
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-black text-white">{t('training_focus.title')}</h3>
                    {trainingPlan.intensity === 'High' && <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-lg border border-green-500/20">{t('training_focus.intensity.high')}</span>}
                    {trainingPlan.intensity === 'Low' && <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold rounded-lg border border-amber-500/20">{t('training_focus.intensity.low')}</span>}
                </div>

                <div className="mb-4">
                    <div className="text-xl font-bold text-white mb-1">{t(trainingPlan.focus)}</div>
                    <p className="text-xs text-zinc-400 leading-relaxed">{t(trainingPlan.reasoning)}</p>
                </div>
            </div>

            <div className="space-y-3">
                <div className="text-xs font-bold text-zinc-500 uppercase">{t('training_focus.priority_drills')}</div>
                {trainingPlan.recommendedDrills.map((drill, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors cursor-pointer group">
                        <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-zinc-500 group-hover:text-indigo-400 transition-colors">
                            <Dumbbell className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium text-zinc-300 group-hover:text-white">{t(drill)}</span>
                    </div>
                ))}
            </div>

            {risks.length > 0 && (
                <div className="mt-4 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        <span className="text-xs font-bold text-red-500 uppercase">{t('training_focus.risk_factors')}</span>
                    </div>
                    {risks.map(risk => (
                        <div key={risk.id} className="text-[10px] text-red-400/80 bg-red-500/10 px-2 py-1 rounded mb-1">
                            {t(risk.message)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
