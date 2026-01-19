import type { SessionLoad, WellnessLog, LoadMetrics } from '../types/medical';

// Standard constant for days
const ACUTE_DAYS = 7;
const CHRONIC_DAYS = 28;

export const MedicalService = {
    /**
     * Calculates the Session RPE (sRPE) Load
     * Formula: Duration (mins) * RPE (1-10)
     */
    calculateSessionLoad: (durationMinutes: number, rpe: number): number => {
        return durationMinutes * rpe;
    },

    /**
     * Calculates Acute (7-day) and Chronic (28-day) loads and ACWR
     * Returns complete LoadMetrics object
     */
    calculateLoadMetrics: (
        sessionHistory: SessionLoad[],
        recentWellness: WellnessLog[]
    ): LoadMetrics => {
        const today = new Date();
        const oneDay = 24 * 60 * 60 * 1000;

        // Filter sessions for Acute (Last 7 days) and Chronic (Last 28 days) windows
        // Note: In a real elite system, we might use Exponentially Weighted Moving Averages (EWMA)
        // For this implementation, we use Rolling Averages (RA) as per the spec requirements.

        let acuteSum = 0;
        let chronicSum = 0;

        sessionHistory.forEach(session => {
            const sessionDate = new Date(session.date);
            const diffDays = Math.round(Math.abs((today.getTime() - sessionDate.getTime()) / oneDay));

            const load = session.sRPE || (session.durationMinutes * session.rpe);

            if (diffDays <= ACUTE_DAYS) {
                acuteSum += load;
            }
            if (diffDays <= CHRONIC_DAYS) {
                chronicSum += load;
            }
        });

        const acuteLoad = acuteSum / ACUTE_DAYS; // Average daily load over 7 days
        const chronicLoad = chronicSum / CHRONIC_DAYS; // Average daily load over 28 days

        // Avoid division by zero
        const acwr = chronicLoad === 0 ? 0 : Math.round((acuteLoad / chronicLoad) * 100) / 100;

        // Calculate Freshness Index from latest wellness log
        // Sum of 5 metrics (each 1-5), max 25. 
        // Normalized to 0-100%
        const latestWellness = recentWellness[0]; // Assuming sorted desc
        let freshnessIndex = 100; // Default

        if (latestWellness) {
            const totalScore =
                latestWellness.sleepQuality +
                latestWellness.fatigueLevel +
                latestWellness.sorenessLevel +
                latestWellness.stressLevel +
                latestWellness.mood;

            // Max score is 25 (5*5). Min is 5.
            // (Score - Min) / (Max - Min) * 100
            freshnessIndex = Math.round(((totalScore - 5) / 20) * 100);
        }

        return {
            acuteLoad: Math.round(acuteLoad),
            chronicLoad: Math.round(chronicLoad),
            acwr,
            freshnessIndex,
            riskLevel: MedicalService.determineRiskLevel(acwr, freshnessIndex)
        };
    },

    /**
     * Determines Injury Risk Level based on ACWR and Freshness
     * 'Sweet Spot': 0.8 - 1.3
     * 'Danger Zone': > 1.5
     */
    determineRiskLevel: (acwr: number, freshness: number): LoadMetrics['riskLevel'] => {
        // High risk if ACWR is spiked (>1.5) or very low (<0.8 - undertraining risk/spikes)
        // Also high risk if player is exhausted (Freshness < 40%)

        if (freshness < 40) return 'critical';
        if (acwr > 1.5) return 'high';
        if (acwr > 1.3) return 'moderate';
        if (freshness < 60) return 'moderate';

        // Optional: Check for "undertraining" risk if needed, but usually Green is considered safe
        return 'low';
    },

    /**
     * Generates mock data for verification/demo purposes
     */
    generateMockHistory: (playerId: string): { sessions: SessionLoad[], wellness: WellnessLog[] } => {
        const sessions: SessionLoad[] = [];
        const wellness: WellnessLog[] = [];
        const today = new Date();

        // Generate 30 days of history
        for (let i = 0; i < 30; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString();

            // Random wellness
            wellness.push({
                id: `w_${i}`,
                playerId,
                date: dateStr,
                sleepQuality: Math.floor(Math.random() * 3) + 3 as any, // 3-5
                fatigueLevel: Math.floor(Math.random() * 3) + 3 as any,
                sorenessLevel: Math.floor(Math.random() * 3) + 3 as any,
                stressLevel: Math.floor(Math.random() * 3) + 3 as any,
                mood: Math.floor(Math.random() * 3) + 3 as any,
            });

            // Random session (Rest days included)
            if (Math.random() > 0.2) { // 80% training days
                const duration = [60, 75, 90][Math.floor(Math.random() * 3)];
                const rpe = Math.floor(Math.random() * 5) + 5 as any; // 5-9

                sessions.push({
                    id: `s_${i}`,
                    playerId,
                    date: dateStr,
                    durationMinutes: duration,
                    rpe,
                    sessionType: 'training',
                    sRPE: duration * rpe
                });
            }
        }

        return { sessions, wellness };
    }
};
