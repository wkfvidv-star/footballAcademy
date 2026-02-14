export interface MealInput {
    id: string;
    type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    description: string;
    calories: number;
    protein: number; // in grams
    carbs: number;   // in grams
    fat: number;     // in grams
    date: string;
}

export interface NutritionStats {
    totalCalories: number;
    totalProtein: number;
    totalCarbs: number;
    totalFat: number;
    ratios: {
        protein: number; // percentage
        carbs: number;   // percentage
        fat: number;     // percentage
    };
    status: 'optimal' | 'deficit' | 'excess';
    recommendations: string[];
}

export const NutritionService = {
    calculateDailyStats: (meals: MealInput[], targetCalories: number): NutritionStats => {
        const stats = meals.reduce(
            (acc, meal) => {
                acc.totalCalories += meal.calories;
                acc.totalProtein += meal.protein;
                acc.totalCarbs += meal.carbs;
                acc.totalFat += meal.fat;
                return acc;
            },
            { totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFat: 0 }
        );

        const totalGrams = stats.totalProtein + stats.totalCarbs + stats.totalFat;
        const ratios = {
            protein: totalGrams > 0 ? (stats.totalProtein / totalGrams) * 100 : 0,
            carbs: totalGrams > 0 ? (stats.totalCarbs / totalGrams) * 100 : 0,
            fat: totalGrams > 0 ? (stats.totalFat / totalGrams) * 100 : 0,
        };

        let status: NutritionStats['status'] = 'optimal';
        if (stats.totalCalories < targetCalories * 0.9) status = 'deficit';
        if (stats.totalCalories > targetCalories * 1.1) status = 'excess';

        const recommendations: string[] = [];
        if (status === 'deficit') recommendations.push('Increase caloric intake to support high training loads.');
        if (ratios.protein < 20) recommendations.push('Increase protein intake for muscle recovery.');
        if (ratios.carbs < 50) recommendations.push('Increase carbohydrate intake for better energy levels during training.');

        return {
            ...stats,
            ratios: {
                protein: parseFloat(ratios.protein.toFixed(1)),
                carbs: parseFloat(ratios.carbs.toFixed(1)),
                fat: parseFloat(ratios.fat.toFixed(1)),
            },
            status,
            recommendations,
        };
    },

    estimateTargetCalories: (weightKg: number, intensity: 'low' | 'medium' | 'high'): number => {
        // Simple Harris-Benedict or similar approximation for athletes
        const base = weightKg * 30; // 30 kcal/kg base
        const multipliers = { low: 1.2, medium: 1.5, high: 1.8 };
        return Math.round(base * multipliers[intensity]);
    }
};
