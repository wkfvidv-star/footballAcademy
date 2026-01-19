import { normalizeScore } from './normalization';

export interface TechnicalTestInput {
    testId: string;
    value: number;
    attempts?: number; // Should be handled in input value (e.g. 8/10 -> 8), but good to track
    date: string;
    coachValidation?: 'verified' | 'adjustment_needed';
    coachNotes?: string;
    validationAdjustment?: number; // +/- score based on qualitative check
}

export interface TechnicalRadarCategory {
    label: string;
    score: number; // 0-10
    fullMark: number;
}

export const TechnicalEngine = {

    /**
     * Calculates the Final Technical Score
     * Applies Normalization -> Positional Weighting -> Coach Validation Adjustment
     */
    calculateTechnicalScore: (
        testId: string,
        rawValue: number,
        position: string,
        ageGroup: string,
        validationAdjustment: number = 0
    ): number => {
        // 1. Base Normalized Score (includes Positional Weight from normalization.ts)
        const baseScore = normalizeScore(testId, rawValue, ageGroup, position);

        // 2. Apply Validation Adjustment
        // e.g. Coach sees "Bad Form" -> -1.0
        let final = baseScore + validationAdjustment;

        return Math.min(10, Math.max(0, parseFloat(final.toFixed(1))));
    },

    /**
     * Aggregates individual tests into the Technical Radar Categories
     */
    generateTechnicalRadar: (tests: Record<string, number>): TechnicalRadarCategory[] => {
        const get = (id: string) => tests[id] || 0;
        const avg = (...scores: number[]) => {
            const valid = scores.filter(s => s > 0);
            if (valid.length === 0) return 0;
            return valid.reduce((a, b) => a + b, 0) / valid.length;
        };

        return [
            {
                label: 'Passing',
                score: parseFloat(avg(get('TEC_PAS_SHORT'), get('TEC_PAS_LONG')).toFixed(1)),
                fullMark: 10
            },
            {
                label: 'Dribbling',
                score: parseFloat(avg(get('TEC_DRI_SLALOM'), get('TEC_DRI_MASTERY')).toFixed(1)),
                fullMark: 10
            },
            {
                label: 'Shooting',
                score: parseFloat(avg(get('TEC_SHO_ACC'), get('TEC_SHO_WEAK')).toFixed(1)),
                fullMark: 10
            },
            {
                label: 'Control',
                score: parseFloat(avg(get('TEC_CTL_TOUCH')).toFixed(1)),
                fullMark: 10
            },
            {
                label: 'Crossing',
                score: parseFloat(avg(get('TEC_CRO_ACC')).toFixed(1)),
                fullMark: 10
            },
            {
                // Using a mix for "Vision/IQ" placeholder or reusing legacy logic
                // For now, let's map "Ball Mastery" here too as a proxy for technique
                label: 'Technique',
                score: parseFloat(avg(get('TEC_DRI_MASTERY'), get('TEC_CTL_TOUCH')).toFixed(1)),
                fullMark: 10
            },
        ];
    },

    identifyWeaknesses: (radar: TechnicalRadarCategory[]): string[] => {
        return radar
            .filter(cat => cat.score > 0 && cat.score < 6.0)
            .map(cat => cat.label);
    }
};
