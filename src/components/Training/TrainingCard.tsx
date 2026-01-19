import { Clock, BarChart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { TrainingDrill } from '../../services/recommendationService';

interface TrainingCardProps {
    drill: TrainingDrill;
    highlight?: boolean;
}

const DIFFICULTY_COLORS = {
    Beginner: 'text-green-400',
    Intermediate: 'text-yellow-400',
    Advanced: 'text-orange-400',
    Elite: 'text-red-500',
};

const CATEGORY_COLORS = {
    PHYSICAL: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    TECHNICAL: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    TACTICAL: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    PSYCHOLOGICAL: 'bg-red-500/10 text-red-500 border-red-500/20',
};

export default function TrainingCard({ drill, highlight }: TrainingCardProps) {
    const { t } = useTranslation();

    return (
        <div className={`bg-card border ${highlight ? 'border-primary/50 shadow-[0_0_15px_rgba(34,197,94,0.15)]' : 'border-white/5'} rounded-2xl p-4 flex flex-col gap-3 transition-transform active:scale-[0.98]`}>
            <div className="flex justify-between items-start">
                <span className={`px-2 py-1 rounded text-[10px] font-bold border ${CATEGORY_COLORS[drill.category]}`}>
                    {t(`shared.${drill.category.toLowerCase()}`)}
                </span>
                {highlight && <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-full uppercase">{t('shared.recommended')}</span>}
            </div>

            <h3 className="text-white font-bold text-lg leading-tight">{t(drill.title)}</h3>
            <p className="text-zinc-400 text-xs leading-relaxed flex-1 line-clamp-2">{t(drill.description)}</p>

            <div className="flex items-center gap-4 mt-auto pt-2 border-t border-white/5">
                <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{drill.duration}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                    <BarChart className="w-3.5 h-3.5 text-zinc-500" />
                    <span className={DIFFICULTY_COLORS[drill.difficulty]}>{t(`shared.${drill.difficulty.toLowerCase()}`)}</span>
                </div>
            </div>
        </div>
    );
}
