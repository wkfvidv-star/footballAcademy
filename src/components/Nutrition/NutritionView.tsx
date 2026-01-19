import { ArrowLeft, Flame, Utensils, Droplets } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { MEAL_PLANS } from './nutritionData';

interface NutritionViewProps {
    onBack: () => void;
}

export default function NutritionView({ onBack }: NutritionViewProps) {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center gap-4 bg-background/80 backdrop-blur-md sticky top-0 z-10">
                <button
                    onClick={onBack}
                    className="p-2 -ms-2 rounded-full hover:bg-white/10 transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-zinc-100" />
                </button>
                <h1 className="text-xl font-bold text-white">{t('nutrition.title')}</h1>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-20">

                {/* Daily Status */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-secondary/30 border border-white/5 flex flex-col items-center text-center">
                        <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mb-2">
                            <Droplets className="w-5 h-5" />
                        </div>
                        <div className="text-2xl font-black text-white">1.2L</div>
                        <div className="text-xs text-zinc-500 uppercase">{t('nutrition.hydration')}</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-secondary/30 border border-white/5 flex flex-col items-center text-center">
                        <div className="w-10 h-10 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center mb-2">
                            <Flame className="w-5 h-5" />
                        </div>
                        <div className="text-2xl font-black text-white">1850</div>
                        <div className="text-xs text-zinc-500 uppercase">{t('nutrition.calories')}</div>
                    </div>
                </div>

                {/* Recommendations */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <Utensils className="w-5 h-5 text-primary" />
                        <h2 className="text-lg font-bold text-white">{t('nutrition.recommended_today')}</h2>
                    </div>

                    <div className="space-y-4">
                        {MEAL_PLANS.map((meal) => (
                            <div key={meal.id} className="group relative overflow-hidden rounded-2xl bg-secondary border border-white/5 hover:border-primary/50 transition-all active:scale-[0.98]">
                                <div className="absolute top-0 end-0 p-3 flex gap-2">
                                    {meal.tags.map(tag => (
                                        <span key={tag} className="text-[10px] font-bold px-2 py-1 rounded-full bg-background/50 backdrop-blur-sm border border-white/10 text-zinc-300">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="p-5 pt-12">
                                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">{meal.name}</h3>
                                    <p className="text-sm text-zinc-400 mb-4 line-clamp-2">{meal.description}</p>

                                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                        <div className="text-center">
                                            <div className="text-xs text-zinc-500">{t('nutrition.pro')}</div>
                                            <div className="text-sm font-bold text-white">{meal.nutrients.protein}</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-xs text-zinc-500">{t('nutrition.carb')}</div>
                                            <div className="text-sm font-bold text-white">{meal.nutrients.carbs}</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-xs text-zinc-500">{t('nutrition.fat')}</div>
                                            <div className="text-sm font-bold text-white">{meal.nutrients.fat}</div>
                                        </div>
                                        <div className="text-center px-3 py-1 bg-white/5 rounded-lg">
                                            <div className="text-xs font-black text-primary">{meal.nutrients.calories}</div>
                                            <div className="text-[10px] text-zinc-500">{t('nutrition.kcal')}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
