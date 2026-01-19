import { useState } from 'react';
import { ArrowLeft, Dumbbell, Target, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getRecommendations } from '../../services/recommendationService';
import { generateMockHistory } from '../../services/ovrService';
import TrainingCard from './TrainingCard';

interface TrainingViewProps {
    onBack: () => void;
}

export default function TrainingView({ onBack }: TrainingViewProps) {
    const { t } = useTranslation();
    const [philosophy, setPhilosophy] = useState<'POSSESSION' | 'TRANSITION' | 'COUNTER_PRESS' | 'DIRECT'>('POSSESSION');

    const history = generateMockHistory();
    const currentMetrics = history[history.length - 1];

    // Get recommendations with age, position, and selected philosophy
    const recommendations = getRecommendations(currentMetrics, 17, 'ATT', philosophy);

    return (
        <div className="flex flex-col">
            {/* Header */}
            <div className="p-6 pb-2">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-bold">{t('common.back')}</span>
                </button>

                <h1 className="text-3xl font-black text-white mb-2 uppercase italic">{t('actions.plans')}</h1>
                <p className="text-zinc-400 text-sm">{t('training.description')}</p>
            </div>

            {/* Philosophy Selector */}
            <div className="px-6 mb-6">
                <div className="bg-secondary/30 border border-white/5 p-4 rounded-2xl flex items-center justify-between">
                    <div>
                        <div className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-1">{t('training.philosophy')}</div>
                        <div className="text-white font-bold">{t(`training.phil_${philosophy.toLowerCase()}`)}</div>
                    </div>
                    <div className="relative">
                        <select
                            value={philosophy}
                            onChange={(e) => setPhilosophy(e.target.value as typeof philosophy)}
                            className="bg-primary/10 border border-primary/20 text-primary text-xs font-bold py-2 px-4 rounded-xl outline-none appearance-none pe-10"
                        >
                            <option value="POSSESSION">{t('training.phil_possession')}</option>
                            <option value="TRANSITION">{t('training.phil_transition')}</option>
                            <option value="COUNTER_PRESS">{t('training.phil_counter_press')}</option>
                            <option value="DIRECT">{t('training.phil_direct')}</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-primary absolute end-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 px-6 pb-8 space-y-8 overflow-y-auto">

                {/* Priority Section */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <Target className="w-5 h-5 text-primary" />
                        <h2 className="text-lg font-bold text-white uppercase tracking-tight">{t('training.focus_areas')}</h2>
                    </div>
                    <div className="grid gap-4">
                        {recommendations.map((drill) => (
                            <TrainingCard key={drill.id} drill={drill} highlight={true} />
                        ))}
                    </div>
                </div>

                {/* General Section Placeholder */}
                <div>
                    <div className="flex items-center gap-2 mb-4 font-rtl">
                        <Dumbbell className="w-5 h-5 text-zinc-500" />
                        <h2 className="text-lg font-bold text-zinc-400 uppercase tracking-tight">{t('training.general')}</h2>
                    </div>
                    <div className="bg-card border border-white/5 rounded-2xl p-6 text-center">
                        <p className="text-zinc-500 text-sm">{t('training.unlock_message')}</p>
                    </div>
                </div>

            </div>
        </div>
    );
}
