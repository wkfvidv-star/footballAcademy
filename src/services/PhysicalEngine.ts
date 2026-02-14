import { normalizeScore } from './normalization';
import type { BioBand, MaturityStatus } from '../types/growth';

export interface PhysicalTestInput {
    testId: string;
    value: number;
    date: string;
}

export interface RadarCategory {
    label: string;
    score: number; // 0-10
    fullMark: number;
}

export const PhysicalEngine = {
    /**
     * Calculates the Bio-Adjusted Score
     * Adjusts the raw normalized score based on maturity status.
     * 
     * Logic:
     * - Late Maturers (Pre-PHV/Late): Disadvantaged in Power/Speed. Get a BOOST.
     * - Early Maturers (Post-PHV/Early): Advantaged. Get a slight TAX (or 0 boost) to reveal true technical/tactical potential without physical bias.
     */
    calculateBioAdjustedScore: (
        testId: string,
        rawScore: number, // 0-10 from normalization
        maturityStatus: MaturityStatus,
        ageGroup: string,
        position: string
    ): number => {
        let multiplier = 1.0;

        // Categorize tests by physical demand type
        const isPowerSpeed = [
            'PHY_SPD_10', 'PHY_SPD_30', 'PHY_SPD_RSA',
            'PHY_PWR_VJ', 'PHY_PWR_BJ', 'PHY_PWR_SHOT'
        ].includes(testId);

        if (isPowerSpeed) {
            if (maturityStatus === 'late') {
                multiplier = 1.15; // +15% boost for late bloomers
            } else if (maturityStatus === 'early') {
                multiplier = 0.95; // -5% tax for early bloomers (dominance check)
            }
        }

        let adjusted = rawScore * multiplier;
        return Math.min(10, Math.max(0, parseFloat(adjusted.toFixed(1))));
    },

    /**
     * Aggregates individual tests into the 6 Radar Categories
     */
    generateRadarProfile: (tests: Record<string, number>): RadarCategory[] => {
        // Helper to safe get score
        const get = (id: string) => tests[id] || 0;
        const avg = (...scores: number[]) => {
            const valid = scores.filter(s => s > 0);
            if (valid.length === 0) return 0;
            return valid.reduce((a, b) => a + b, 0) / valid.length;
        };

        return [
            {
                label: 'Sprint Speed',
                score: parseFloat(avg(get('PHY_SPD_10'), get('PHY_SPD_30'), get('PHY_SPD_RSA')).toFixed(1)),
                fullMark: 10
            },
            {
                label: 'Explosive Power',
                score: parseFloat(avg(get('PHY_PWR_VJ'), get('PHY_PWR_BJ'), get('PHY_PWR_SHOT')).toFixed(1)),
                fullMark: 10
            },
            {
                label: 'Aerobic Capacity',
                score: parseFloat(avg(get('PHY_END_YOYO'), get('PHY_END_BEEP')).toFixed(1)),
                fullMark: 10
            },
            {
                label: 'Agility (COD)',
                score: parseFloat(avg(get('PHY_AGL_ILL')).toFixed(1)),
                fullMark: 10
            },
            {
                label: 'Neuromuscular Balance',
                score: parseFloat(avg(get('PHY_BAL_Y')).toFixed(1)),
                fullMark: 10
            },
            {
                label: 'Cognitive Reaction',
                score: parseFloat(avg(get('PHY_REA_LIGHT')).toFixed(1)),
                fullMark: 10
            },
        ];
    },

    /**
     * Identifies Weak Areas (< 6.0 score)
     */
    identifyWeaknesses: (radar: RadarCategory[]): string[] => {
        return radar
            .filter(cat => cat.score > 0 && cat.score < 6.0)
            .map(cat => cat.label);
    }
};
