import { useState } from 'react';
import { Utensils, Plus, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NutritionService } from '../../services/nutritionService';
import type { MealInput } from '../../services/nutritionService';
import { GlassCard } from '../shared/GlassCard';

export default function NutritionModule() {
    const { t } = useTranslation();
    const [meals, setMeals] = useState<MealInput[]>([
        { id: 'seed-1', type: 'lunch', description: 'Grilled Chicken & Quinoa', calories: 650, protein: 45, carbs: 60, fat: 22, date: new Date().toISOString() }
    ]);
    const [showAddForm, setShowAddForm] = useState(false);

    // Mock target
    const targetCalories = 2800;
    const stats = NutritionService.calculateDailyStats(meals, targetCalories);

    const handleAddMeal = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newMeal: MealInput = {
            id: Date.now().toString(),
            type: formData.get('type') as any,
            description: formData.get('description') as string,
            calories: Number(formData.get('calories')),
            protein: Number(formData.get('protein')),
            carbs: Number(formData.get('carbs')),
            fat: Number(formData.get('fat')),
            date: new Date().toISOString(),
        };
        setMeals([...meals, newMeal]);
        setShowAddForm(false);
    };

    return (
        <GlassCard
            title={t('nutrition_module.title')}
            icon={Utensils}
            headerAction={
                <button
                    onClick={() => setShowAddForm(true)}
                    className="p-2 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-all active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                </button>
            }
        >
            <div className="space-y-8">
                {/* Stats Summary */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    <StatCard label={t('nutrition_module.calories')} value={stats.totalCalories} target={targetCalories} unit="kcal" />
                    <StatCard label={t('nutrition_module.protein')} value={stats.totalProtein} unit="g" />
                    <StatCard label={t('nutrition_module.carbs')} value={stats.totalCarbs} unit="g" />
                    <StatCard label={t('nutrition_module.fat')} value={stats.totalFat} unit="g" />
                </div>

                {/* Macronutrient Ratios */}
                <div className="space-y-3">
                    <div className="flex justify-between text-[9px] md:text-[10px] text-zinc-500 uppercase font-black tracking-widest px-1">
                        <span>{t('nutrition_module.protein')} ({stats.ratios.protein}%)</span>
                        <span>{t('nutrition_module.carbs')} ({stats.ratios.carbs}%)</span>
                        <span>{t('nutrition_module.fat')} ({stats.ratios.fat}%)</span>
                    </div>
                    <div className="h-2.5 md:h-3 w-full bg-zinc-800 rounded-full flex overflow-hidden border border-white/5">
                        <div style={{ width: `${stats.ratios.protein}%` }} className="bg-blue-500 h-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                        <div style={{ width: `${stats.ratios.carbs}%` }} className="bg-primary h-full shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                        <div style={{ width: `${stats.ratios.fat}%` }} className="bg-amber-500 h-full shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                    </div>
                </div>

                {/* Recommendations */}
                {stats.recommendations.length > 0 && (
                    <div className="bg-amber-500/5 border border-amber-500/20 p-4 md:p-5 rounded-2xl md:rounded-[24px] space-y-3 group hover:bg-amber-500/10 transition-colors">
                        <div className="flex items-center gap-2 text-amber-500 font-black text-[9px] md:text-[10px] uppercase tracking-widest">
                            <AlertCircle className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            <span>{t('nutrition_module.insights')}</span>
                        </div>
                        <ul className="space-y-2">
                            {stats.recommendations.map((rec, i) => (
                                <li key={i} className="text-[11px] md:text-xs text-zinc-400 font-medium leading-relaxed flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                                    {rec}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Add Meal Modal Overlay (Simplified for inline) */}
            {showAddForm && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[100] flex items-center justify-center p-4 md:p-6 animate-in fade-in transition-all">
                    <div className="bg-zinc-900 border border-white/10 p-6 md:p-8 rounded-3xl md:rounded-[40px] w-full max-w-md shadow-2xl shadow-black max-h-[90vh] overflow-y-auto hide-scrollbar">
                        <h3 className="text-xl md:text-2xl font-black text-white mb-6 uppercase italic tracking-tight">{t('nutrition_module.log_meal')}</h3>
                        <form onSubmit={handleAddMeal} className="space-y-5 md:space-y-6">
                            <div className="space-y-2">
                                <label className="block text-[9px] md:text-[10px] text-zinc-500 uppercase font-black tracking-widest px-1">{t('nutrition_module.meal_type')}</label>
                                <select name="type" className="w-full bg-zinc-800/50 border border-white/10 rounded-2xl p-3.5 md:p-4 text-white outline-none focus:border-primary/50 transition-colors text-sm font-bold">
                                    <option value="breakfast">{t('nutrition_module.breakfast')}</option>
                                    <option value="lunch">{t('nutrition_module.lunch')}</option>
                                    <option value="dinner">{t('nutrition_module.dinner')}</option>
                                    <option value="snack">{t('nutrition_module.snack')}</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-[9px] md:text-[10px] text-zinc-500 uppercase font-black tracking-widest px-1">{t('nutrition_module.description')}</label>
                                <input name="description" required className="w-full bg-zinc-800/50 border border-white/10 rounded-2xl p-3.5 md:p-4 text-white outline-none focus:border-primary/50 transition-colors text-sm font-bold" placeholder="e.g. Chicken Pasta" />
                            </div>
                            <div className="grid grid-cols-2 gap-3 md:gap-4">
                                <Input label={t('nutrition_module.calories')} name="calories" />
                                <Input label={`${t('nutrition_module.protein')} (g)`} name="protein" />
                                <Input label={`${t('nutrition_module.carbs')} (g)`} name="carbs" />
                                <Input label={`${t('nutrition_module.fat')} (g)`} name="fat" />
                            </div>
                            <div className="flex gap-4 mt-8 pt-4 border-t border-white/5">
                                <button type="button" onClick={() => setShowAddForm(false)} className="flex-1 py-3.5 md:py-4 text-zinc-500 font-black uppercase text-[10px] md:text-xs tracking-widest hover:text-white transition-colors">{t('nutrition_module.cancel')}</button>
                                <button type="submit" className="flex-1 py-3.5 md:py-4 bg-primary text-zinc-900 font-black rounded-2xl hover:scale-[1.02] active:scale-95 transition-all uppercase text-[10px] md:text-xs tracking-widest">{t('nutrition_module.save_meal')}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </GlassCard>
    );
}

function StatCard({ label, value, target, unit }: { label: string, value: number, target?: number, unit: string }) {
    return (
        <div className="bg-white/5 border border-white/5 p-3 md:p-4 rounded-2xl group hover:border-primary/20 transition-all">
            <div className="text-[9px] md:text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-1.5 md:mb-2 px-1">{label}</div>
            <div className="flex items-baseline gap-1.5 px-1 min-w-0">
                <span className="text-lg md:text-xl font-black text-white italic truncate">{value}</span>
                <span className="text-[8px] md:text-[10px] text-zinc-500 uppercase font-bold shrink-0">{unit}</span>
            </div>
            {target && (
                <div className="mt-2.5 md:mt-3 h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden border border-white/5">
                    <div
                        className={`h-full transition-all duration-1000 ${value > target ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-primary shadow-[0_0_8px_rgba(34,197,94,0.5)]'}`}
                        style={{ width: `${Math.min(100, (value / target) * 100)}%` }}
                    />
                </div>
            )}
        </div>
    );
}

function Input({ label, name }: { label: string, name: string }) {
    return (
        <div className="space-y-1.5">
            <label className="block text-[10px] text-zinc-500 uppercase font-black tracking-widest px-1">{label}</label>
            <input name={name} type="number" required className="w-full bg-zinc-800/50 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-primary/50 transition-colors text-sm font-bold" />
        </div>
    );
}
