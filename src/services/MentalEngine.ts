export interface MentalAssessment {
    id: string;
    date: string;
    type: 'self' | 'coach';
    // 8 Dimensions (1-10)
    confidence: number;
    focus: number;
    emotionalControl: number;
    motivation: number;
    discipline: number;
    stressManagement: number;
    coachability: number;
    competitiveness: number;
    notes?: string;
}

export interface MentalProfile {
    selfScore: number;
    coachScore: number;
    overallScore: number;
    dimensions: Record<string, number>; // Weighted dimensions
    gapAnalysis: {
        hasGap: boolean;
        gapSize: number;
        blindSpots: string[]; // Dimensions where Self > Coach by > 2
        hiddenStrengths: string[]; // Dimensions where Coach > Self by > 2
    };
    risks: string[];
}

export const MentalEngine = {
    calculateMentalProfile: (
        assessments: MentalAssessment[],
        behaviorFlags: string[] = [] // e.g. 'yellow_card_dissent'
    ): MentalProfile => {
        // Separete Assessments
        const selfEvals = assessments.filter(a => a.type === 'self');
        const coachEvals = assessments.filter(a => a.type === 'coach');

        // Use latest or default
        const self = selfEvals[selfEvals.length - 1] || {
            confidence: 5, focus: 5, emotionalControl: 5, motivation: 5,
            discipline: 5, stressManagement: 5, coachability: 5, competitiveness: 5
        };
        const coach = coachEvals[coachEvals.length - 1] || {
            confidence: 5, focus: 5, emotionalControl: 5, motivation: 5,
            discipline: 5, stressManagement: 5, coachability: 5, competitiveness: 5
        };

        const dims = [
            'confidence', 'focus', 'emotionalControl', 'motivation',
            'discipline', 'stressManagement', 'coachability', 'competitiveness'
        ] as const;

        // Calculate Scores
        // Mental Score: 40% Self, 60% Coach
        let selfTotal = 0;
        let coachTotal = 0;
        let weightedTotal = 0;
        const dimensions: Record<string, number> = {};
        const blindSpots: string[] = [];
        const hiddenStrengths: string[] = [];

        dims.forEach(dim => {
            const sVal = self[dim] as number;
            const cVal = coach[dim] as number;

            selfTotal += sVal;
            coachTotal += cVal;

            // Weighted Dimension Score
            dimensions[dim] = parseFloat(((sVal * 0.4) + (cVal * 0.6)).toFixed(1));

            // Gap Analysis
            const delta = sVal - cVal;
            if (delta > 2.0) blindSpots.push(dim); // Player overestimates
            if (delta < -2.0) hiddenStrengths.push(dim); // Player underestimates
        });

        // Apply Behavior Penalties to specific dimensions (logic applied to overall score or dimension overrides)
        // For simplicity in this engine version, we just note them in risks, 
        // but in a full engine we would reduce 'Discipline' score directly.

        const selfScore = parseFloat((selfTotal / 8).toFixed(1));
        const coachScore = parseFloat((coachTotal / 8).toFixed(1));
        const overallScore = parseFloat(((selfScore * 0.4) + (coachScore * 0.6)).toFixed(1));

        // Identify Risks (< 6.0 in weighted score)
        const risks: string[] = dims.filter(d => dimensions[d] < 6.0);
        if (blindSpots.length > 0) risks.push('Self-Awareness Gap');

        return {
            selfScore,
            coachScore,
            overallScore,
            dimensions,
            gapAnalysis: {
                hasGap: Math.abs(selfScore - coachScore) > 1.5,
                gapSize: parseFloat(Math.abs(selfScore - coachScore).toFixed(1)),
                blindSpots,
                hiddenStrengths
            },
            risks
        };
    }
};
