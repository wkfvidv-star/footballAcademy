export interface TacticalEvaluation {
    id: string;
    date: string;
    // 8 Dimensions (1-10)
    positioning: number;
    offBallMovement: number;
    defensiveAwareness: number;
    pressing: number;
    transition: number;
    decisionMaking: number;
    spaceOccupation: number;
    teamShape: number;
    coachNotes?: string;
}

export interface MatchStats {
    id: string;
    date: string;
    opponent: string;
    minutesPlayed: number;
    performanceRating: number; // 0-10
    // Key Stats
    goals: number;
    assists: number;
    keyPasses: number;
    interceptions: number;
    tacklesWon: number;
    errors: number; // Leading to shots/goals
    possessionLost: number;
    gps?: {
        totalDistance: number; // km
        topSpeed: number; // km/h
        sprints: number; // > 25km/h
        heatmap: { x: number; y: number; intensity: number }[];
        technicalMap?: {
            x: number;
            y: number;
            type: 'pass' | 'shot' | 'interception' | 'tackle';
            outcome: 'success' | 'fail';
        }[];
    };
}

export interface TacticalProfile {
    // Aggregated Scores
    trainingScore: number;
    matchScore: number;
    overallScore: number;
    dimensions: Record<string, number>;
    status: 'training_ghost' | 'match_performer' | 'consistent' | 'developing';
}

export const TacticalEngine = {
    /**
     * Calculates the Tactical Score based heavily on Coach Evaluation (Training)
     * and adjusts it with "Match Proof" data.
     */
    calculateTacticalProfile: (
        evaluations: TacticalEvaluation[],
        matches: MatchStats[],
        position: string
    ): TacticalProfile => {
        // 1. Calculate Training/Observation Score (Average of last 3 evals)
        const recentEvals = evaluations.slice(-3);
        const avgDim = (key: keyof TacticalEvaluation) => {
            if (recentEvals.length === 0) return 5; // Default average
            return recentEvals.reduce((a, b) => a + (b[key] as number), 0) / recentEvals.length;
        };

        const dimensions = {
            positioning: avgDim('positioning'),
            offBallMovement: avgDim('offBallMovement'),
            defensiveAwareness: avgDim('defensiveAwareness'),
            pressing: avgDim('pressing'),
            transition: avgDim('transition'),
            decisionMaking: avgDim('decisionMaking'),
            spaceOccupation: avgDim('spaceOccupation'),
            teamShape: avgDim('teamShape'),
        };

        const trainingScore = Object.values(dimensions).reduce((a, b) => a + b, 0) / 8;

        // 2. Calculate Match Score (Performance Rating + Stats Impact)
        const recentMatches = matches.slice(-5);
        let matchBaseScore = 5;

        if (recentMatches.length > 0) {
            const avgRating = recentMatches.reduce((a, b) => a + b.performanceRating, 0) / recentMatches.length;

            // Calculate Stats Impact (Bonus/Penalty)
            let statsBonus = 0;
            recentMatches.forEach(m => {
                // Good actions
                if (position === 'DEF' || position === 'MID') {
                    statsBonus += (m.interceptions * 0.1) + (m.tacklesWon * 0.1);
                }
                if (position === 'MID' || position === 'ATT') {
                    statsBonus += (m.keyPasses * 0.2) + (m.goals * 0.5) + (m.assists * 0.3);
                }
                // Bad actions
                statsBonus -= (m.errors * 0.5);
            });
            const avgStatsBonus = statsBonus / recentMatches.length;

            matchBaseScore = avgRating + avgStatsBonus;
        }

        // Clamp Match Score
        const matchScore = Math.min(10, Math.max(1, parseFloat(matchBaseScore.toFixed(1))));

        // 3. Compare & Status
        let status: TacticalProfile['status'] = 'consistent';
        const diff = matchScore - trainingScore;

        if (diff > 1.5) status = 'match_performer'; // Performs better in games
        else if (diff < -1.5) status = 'training_ghost'; // Good in training, disappears in games
        else if (trainingScore < 6 && matchScore < 6) status = 'developing';

        // 4. Overall Weighted Score (60% Training IQ + 40% Match Proof)
        // We weigh training higher for "Tactical IQ" as it's often more controlled evaluation,
        // but match proof is the ultimate validator.
        const overall = (trainingScore * 0.6) + (matchScore * 0.4);

        return {
            trainingScore: parseFloat(trainingScore.toFixed(1)),
            matchScore: parseFloat(matchScore.toFixed(1)),
            overallScore: parseFloat(overall.toFixed(1)),
            dimensions,
            status
        };
    }
};
