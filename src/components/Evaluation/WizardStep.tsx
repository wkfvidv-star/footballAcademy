import { Zap, Activity, Brain, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { TestDefinition } from '../../types';

interface WizardStepProps {
    question: TestDefinition;
    value: number;
    onChange: (val: number) => void;
    onNext: () => void;
}

const ICONS = {
    PHYSICAL: Zap,
    TECHNICAL: Activity,
    TACTICAL: Brain,
    PSYCHOLOGICAL: TrendingUp,
};

const COLORS = {
    PHYSICAL: 'text-yellow-400',
    TECHNICAL: 'text-blue-400',
    TACTICAL: 'text-purple-400',
    PSYCHOLOGICAL: 'text-red-400',
};

export default function WizardStep({ question, value, onChange, onNext }: WizardStepProps) {
    const { t } = useTranslation();
    const Icon = ICONS[question.category];
    const isObjective = question.type === 'OBJECTIVE';

    // Step configuration for inputs
    const getStep = () => {
        if (question.unit === 'seconds') return 0.01;
        if (question.unit === 'level') return 0.1;
        return 1;
    };

    const getDisplayValue = () => {
        if (question.unit === 'seconds') return value.toFixed(2) + 's';
        if (question.unit === 'cm') return value + 'cm';
        if (question.unit === 'level') return t('evaluation.lvl') + ' ' + value;
        return value;
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in slide-in-from-right-4 duration-300">
            <div className={`p-4 rounded-full bg-secondary/50 mb-6 ${COLORS[question.category]}`}>
                <Icon className="w-8 h-8" />
            </div>

            <h2 className="text-xl font-bold text-white mb-2 text-center">{t(question.label)}</h2>
            <span className="text-sm text-zinc-500 uppercase tracking-widest mb-8">{t(`shared.${question.category.toLowerCase()}`)}</span>

            <div className="text-6xl font-black text-primary mb-8 tabular-nums">
                {getDisplayValue()}
            </div>

            {!isObjective ? (
                <>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        step="1"
                        value={value}
                        onChange={(e) => onChange(parseFloat(e.target.value))}
                        className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary mb-8"
                    />
                    <div className="flex w-full justify-between text-xs text-zinc-500 px-1 mb-8">
                        <span>{t('evaluation.poor')} (1)</span>
                        <span>{t('shared.elite')} (10)</span>
                    </div>
                </>
            ) : (
                <div className="w-full mb-8 flex flex-col items-center">
                    <input
                        type="number"
                        step={getStep()}
                        value={value}
                        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
                        className="w-full max-w-[200px] bg-secondary text-white text-3xl font-bold text-center py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="0.00"
                        autoFocus
                    />
                    <div className="mt-4 text-xs text-zinc-500">
                        {t('evaluation.enter_result', { unit: t(`evaluation.unit_${question.unit}`) })}
                    </div>
                </div>
            )}

            <button
                onClick={onNext}
                className="w-full py-4 bg-primary text-background font-bold rounded-xl text-lg hover:bg-accent transition-transform active:scale-95"
            >
                {t('common.next')}
            </button>
        </div>
    );
}
