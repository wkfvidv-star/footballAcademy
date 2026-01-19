import { Play, TrendingUp, BookOpen, MessageSquare, Utensils } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ActionButtonsProps {
    onStartEvaluation: () => void;
    onViewProgress: () => void;
    onViewTraining: () => void;
    onViewFeedback: () => void;
    onViewNutrition: () => void;
}

export default function ActionButtons({ onStartEvaluation, onViewProgress, onViewTraining, onViewFeedback, onViewNutrition }: ActionButtonsProps) {
    const { t } = useTranslation();

    const actions = [
        { label: t('actions.start'), icon: Play, primary: true, onClick: onStartEvaluation },
        { label: t('actions.progress'), icon: TrendingUp, primary: false, onClick: onViewProgress },
        { label: t('actions.plans'), icon: BookOpen, primary: false, onClick: onViewTraining },
        { label: t('actions.nutrition'), icon: Utensils, primary: false, onClick: onViewNutrition },
        { label: t('actions.feedback'), icon: MessageSquare, primary: false, onClick: onViewFeedback },
    ];

    return (
        <div className="grid grid-cols-2 xl:flex xl:flex-col gap-3 w-full">
            {actions.map((action, index) => (
                <button
                    key={index}
                    onClick={action.onClick}
                    className={`flex flex-row items-center justify-start p-4 xl:p-3 rounded-2xl xl:rounded-xl border transition-all active:scale-95 gap-3 ${action.primary
                        ? 'col-span-2 bg-primary border-primary text-background font-bold shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]'
                        : 'bg-secondary border-white/5 text-zinc-300 hover:bg-secondary/80 hover:border-white/10'
                        }`}
                >
                    <action.icon className={`w-5 h-5 xl:w-4 xl:h-4 ${action.primary ? 'text-background' : 'text-primary'}`} />
                    <span className="text-sm xl:text-xs font-bold">{action.label}</span>
                </button>
            ))}
        </div>
    );
}
