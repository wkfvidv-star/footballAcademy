export interface RecoveryPlan {
    strategy: string;
    activities: { title: string; duration: string; description: string }[];
    nutritionFocus: string;
    priority: 'low' | 'medium' | 'high';
}

export const RecoveryEngine = {
    generatePlan: (
        intensity: 'Low' | 'Medium' | 'High',
        fatigueLevel: number, // 1-5, 1 is exhausted
        sorenessLevel: number // 1-5, 1 is very sore
    ): RecoveryPlan => {
        const activities = [];
        let strategy = 'recovery.strategy.maintenance';
        let nutritionFocus = 'recovery.nutrition.standard';
        let priority: RecoveryPlan['priority'] = 'low';

        if (intensity === 'High' || fatigueLevel <= 2 || sorenessLevel <= 2) {
            strategy = 'recovery.strategy.aggressive_regeneration';
            priority = 'high';
            activities.push(
                { title: 'recovery.activity.cold_water', duration: '10-15 min', description: 'recovery.activity.cold_water_desc' },
                { title: 'recovery.activity.active_walk', duration: '20 min', description: 'recovery.activity.active_walk_desc' },
                { title: 'recovery.activity.foam_rolling', duration: '15 min', description: 'recovery.activity.foam_rolling_desc' }
            );
            nutritionFocus = 'recovery.nutrition.high_protein';
        } else if (intensity === 'Medium' || fatigueLevel <= 3) {
            strategy = 'recovery.strategy.standard_recovery';
            priority = 'medium';
            activities.push(
                { title: 'recovery.activity.dynamic_stretching', duration: '15 min', description: 'recovery.activity.dynamic_stretching_desc' },
                { title: 'recovery.activity.contrast_showers', duration: '10 min', description: 'recovery.activity.contrast_showers_desc' }
            );
            nutritionFocus = 'recovery.nutrition.electrolytes';
        } else {
            strategy = 'recovery.strategy.maintenance';
            activities.push({ title: 'recovery.activity.sleep_protocol', duration: '8-9 hours', description: 'recovery.activity.sleep_protocol_desc' });
            nutritionFocus = 'recovery.nutrition.standard';
        }

        return {
            strategy,
            activities,
            nutritionFocus,
            priority
        };
    }
};
