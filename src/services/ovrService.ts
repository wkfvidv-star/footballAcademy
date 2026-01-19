import type { PlayerMetrics } from '../types';
import { getBenchmark, calculateDiff, type Position } from './benchmarkService';

// Weighted Scoring Constants (for Attacker/Winger)
const WEIGHTS = {
    TECHNICAL: 0.4,
    PHYSICAL: 0.3,
    TACTICAL: 0.2,
    PSYCHOLOGICAL: 0.1,
};

export const calculateOVR = (
    physical: number,
    technical: number,
    tactical: number,
    mental: number
): number => {
    const weightedScore =
        technical * WEIGHTS.TECHNICAL +
        physical * WEIGHTS.PHYSICAL +
        tactical * WEIGHTS.TACTICAL +
        mental * WEIGHTS.PSYCHOLOGICAL;

    return Math.round(weightedScore);
};

export interface ComparativeInsight {
    category: string;
    diff: number;
    benchmark: number;
}

export const getComparativeAnalysis = (metrics: PlayerMetrics, age: number, position: Position): ComparativeInsight[] => {
    const benchmark = getBenchmark(age, position);

    return [
        { category: 'Physical', diff: calculateDiff(metrics.physical, benchmark.physical), benchmark: benchmark.physical },
        { category: 'Technical', diff: calculateDiff(metrics.technical, benchmark.technical), benchmark: benchmark.technical },
        { category: 'Tactical', diff: calculateDiff(metrics.tactical, benchmark.tactical), benchmark: benchmark.tactical },
        { category: 'Psychological', diff: calculateDiff(metrics.psychological, benchmark.psychological), benchmark: benchmark.psychological },
    ];
};

export const generateMockHistory = (): PlayerMetrics[] => {
    // Generate 6 months of history to show a solid trend
    const history: PlayerMetrics[] = [];

    // Base stats (starting lower to show progress)
    let current = {
        physical: 68,
        technical: 72,
        tactical: 60,
        psychological: 65
    };

    for (let i = 0; i < 6; i++) {
        const ovr = calculateOVR(current.physical, current.technical, current.tactical, current.psychological);

        history.push({
            overallValid: ovr,
            physical: current.physical,
            technical: current.technical,
            tactical: current.tactical,
            psychological: current.psychological,
            lastUpdated: new Date(2025, 7 + i, 15) // From August 2025
        });

        // Simulate progress for next month
        current = {
            physical: Math.min(99, current.physical + Math.floor(Math.random() * 2) + 1),
            technical: Math.min(99, current.technical + Math.floor(Math.random() * 3) + 1),
            tactical: Math.min(99, current.tactical + Math.floor(Math.random() * 2) + 1),
            psychological: Math.min(99, current.psychological + Math.floor(Math.random() * 1) + 1),
        };
    }

    return history;
};
