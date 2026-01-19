import type { RadarCategory } from "./PhysicalEngine";
import type { TechnicalRadarCategory } from "./TechnicalEngine";
import type { MentalProfile } from "./MentalEngine";
import type { TacticalProfile } from "./TacticalEngine";

export interface TrainingPlan {
    focus: string; // e.g. "High Load - Technical", "Recovery - Light Tactical"
    intensity: 'Low' | 'Medium' | 'High';
    recommendedDrills: string[];
    reasoning: string;
}

export interface AIRisk {
    id: string;
    level: 'Low' | 'Medium' | 'High' | 'Critical';
    category: 'Load' | 'Mental' | 'Physical' | 'Injury';
    message: string;
}

export interface PDI {
    score: number; // 0-100
    trend: 'improving' | 'declining' | 'stable';
    breakdown: {
        physical: number;
        technical: number;
        tactical: number;
        mental: number;
    };
}

export const AICoachEngine = {
    calculatePDI: (
        physicalRadar: RadarCategory[],
        technicalRadar: TechnicalRadarCategory[],
        tacticalProfile: TacticalProfile,
        mentalProfile: MentalProfile
    ): PDI => {
        // 1. Calculate Average for each pillar (0-10 scale)
        const avg = (items: { score: number }[]) => {
            if (items.length === 0) return 0;
            return items.reduce((a, b) => a + b.score, 0) / items.length;
        };

        const physScore = avg(physicalRadar);
        const techScore = avg(technicalRadar);
        const tacScore = tacticalProfile.overallTacticalScore;
        const menScore = mentalProfile.overallScore;

        // 2. Weighted Average
        // Modern academy weighting: Tech & Disciple (Mental) are often prioritized
        // But for PDI 1.0 we use equal weights
        const weightedScore = (physScore * 0.25) + (techScore * 0.25) + (tacScore * 0.25) + (menScore * 0.25);

        // 3. Scale to 0-100
        const finalScore = Math.round(weightedScore * 10);

        return {
            score: finalScore,
            trend: 'stable', // Needs history to calculate trend, defaulting for now
            breakdown: {
                physical: parseFloat(physScore.toFixed(1)),
                technical: parseFloat(techScore.toFixed(1)),
                tactical: parseFloat(tacScore.toFixed(1)),
                mental: parseFloat(menScore.toFixed(1)),
            }
        };
    },

    assessRisks: (
        mentalProfile: MentalProfile,
        wellness: { fatigue: number; sleep: number; soreness: number; } | null
    ): AIRisk[] => {
        const risks: AIRisk[] = [];

        // Wellness Risks
        if (wellness) {
            // 1=Exhausted, 5=Fresh. So <= 2 is High Risk.
            if (wellness.fatigue <= 2 || wellness.soreness <= 2) {
                risks.push({
                    id: 'high_fatigue',
                    level: 'High',
                    category: 'Load',
                    message: 'ai_risks.high_fatigue'
                });
            }
        }

        // Mental Risks
        if (mentalProfile.overallScore < 6.0) {
            risks.push({
                id: 'mental_dip',
                level: 'Medium',
                category: 'Mental',
                message: 'ai_risks.mental_dip'
            });
        }

        if (mentalProfile.gapAnalysis.hasGap && mentalProfile.gapAnalysis.gapSize > 2.5) {
            risks.push({
                id: 'self_awareness_crit',
                level: 'High',
                category: 'Mental',
                message: 'ai_risks.disconnect'
            });
        }

        return risks;
    },

    generateTrainingPlan: (
        risks: AIRisk[],
        physicalWeaknesses: string[],
        technicalWeaknesses: string[],
        tacticalProfile: TacticalProfile,
        position: string
    ): TrainingPlan => {
        // 1. Safety First logic
        const loadRisk = risks.find(r => r.category === 'Load' && (r.level === 'High' || r.level === 'Critical'));

        if (loadRisk) {
            return {
                focus: 'training_plan.active_recovery',
                intensity: 'Low',
                recommendedDrills: ['drills.mobility', 'drills.yoga', 'drills.film'],
                reasoning: 'training_plan.reasoning_recovery'
            };
        }

        // 2. Weakness Targeting
        const drills: string[] = [];

        // Add 1 Physical Drill if any weakness
        if (physicalWeaknesses.length > 0) {
            // Best effort dynamic key: "Speed" -> "drills.Speed_activation"?
            // For now, returning English for dynamic but expecting standard keys in dictionary if possible
            // Or ideally, physicalWeaknesses should be keys. Assuming they are English strings for now.
            // Let's format it to look like a key potentially or just pass through.
            // We'll trust the UI to try t() on it.
            // Return drill keys for localization
            drills.push(`drills.activation_${physicalWeaknesses[0].toLowerCase()}`);
        }

        // Add 1 Technical Drill if any weakness
        if (technicalWeaknesses.length > 0) {
            drills.push(`drills.tech_${technicalWeaknesses[0].toLowerCase()}`);
        } else {
            // Maintenance
            drills.push(`drills.maintain_${position.toLowerCase()}`);
        }

        // Add 1 Tactical Drill
        if (tacticalProfile.overallTacticalScore < 7) {
            drills.push('drills.tactical_fundamentals');
        } else {
            drills.push('drills.advanced_positional');
        }

        return {
            focus: 'training_plan.development',
            intensity: 'High',
            recommendedDrills: drills.slice(0, 3),
            reasoning: 'training_plan.reasoning_development'
        };
    }
};
