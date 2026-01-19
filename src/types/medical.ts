export type SessionType = 'match' | 'training' | 'gym' | 'recovery';
export type InjuryStatus = 'active' | 'rehab' | 'cleared';
export type BodyPart = 'ankle' | 'knee' | 'hamstring' | 'quad' | 'groin' | 'other';

export interface WellnessLog {
    id: string;
    playerId: string;
    date: string; // ISO Date
    sleepQuality: 1 | 2 | 3 | 4 | 5; // 1=Poor, 5=Excellent
    fatigueLevel: 1 | 2 | 3 | 4 | 5; // 1=Exhausted, 5=Fresh
    sorenessLevel: 1 | 2 | 3 | 4 | 5; // 1=Very Sore, 5=No Pain
    stressLevel: 1 | 2 | 3 | 4 | 5; // 1=High Stress, 5=Relaxed
    mood: 1 | 2 | 3 | 4 | 5;
    comment?: string;
}

export interface SessionLoad {
    id: string;
    playerId: string;
    date: string;
    durationMinutes: number;
    rpe: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10; // Rate of Perceived Exertion
    sessionType: SessionType;
    sRPE?: number; // Calculated: duration * rpe
}

export interface LoadMetrics {
    acuteLoad: number; // 7-day average daily load
    chronicLoad: number; // 28-day average daily load
    acwr: number; // Acute:Chronic Workload Ratio
    freshnessIndex: number; // Derived from wellness scores
    riskLevel: 'low' | 'moderate' | 'high' | 'critical';
}

export interface InjuryRecord {
    id: string;
    playerId: string;
    dateOccurred: string;
    dateResolved?: string;
    bodyPart: BodyPart;
    diagnosis: string;
    severity: 'minor' | 'moderate' | 'severe';
    status: InjuryStatus;
    notes: string;
}
