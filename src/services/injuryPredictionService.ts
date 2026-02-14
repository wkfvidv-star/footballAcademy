import type { LoadMetrics } from '../types/medical';

export interface InjuryRisk {
    area: string;
    riskScore: number; // 0-100
    indicators: string[];
    severity: 'low' | 'moderate' | 'high' | 'critical';
}

export const InjuryPredictionService = {
    analyzeRisk: (
        loadMetrics: LoadMetrics,
        wellness: { soreness: number; fatigue: number },
        history: { previousInjuries: string[] }
    ): InjuryRisk[] => {
        const risks: InjuryRisk[] = [];

        // Example: Lower Body Risk
        let lowerBodyRisk = 0;
        const indicators: string[] = [];

        if (loadMetrics.acwr > 1.5) {
            lowerBodyRisk += 40;
            indicators.push('injury_module.indicator.acwr_high');
        }

        if (wellness.soreness <= 2) {
            lowerBodyRisk += 30;
            indicators.push('injury_module.indicator.soreness_high');
        }

        if (wellness.fatigue <= 2) {
            lowerBodyRisk += 20;
            indicators.push('injury_module.indicator.fatigue_high');
        }

        if (history.previousInjuries.includes('Hamstring')) {
            lowerBodyRisk += 10;
            indicators.push('injury_module.indicator.history_hamstring');
        }

        const severity = (score: number): InjuryRisk['severity'] => {
            if (score > 80) return 'critical';
            if (score > 60) return 'high';
            if (score > 40) return 'moderate';
            return 'low';
        };

        risks.push({
            area: 'injury_module.area.lower_body',
            riskScore: Math.min(100, lowerBodyRisk),
            indicators,
            severity: severity(lowerBodyRisk)
        });

        return risks;
    }
};
