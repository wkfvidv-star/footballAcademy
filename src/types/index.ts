// Core Player Entity
export interface Player {
    id: string;
    name: string;
    position: 'GK' | 'DEF' | 'MID' | 'ATT';
    ageGroup: 'U10' | 'U12' | 'U14' | 'U16' | 'U18';
    avatarUrl?: string; // Digital Player Card visual
    metrics: PlayerMetrics; // Calculated aggregated stats
}

// The 4 Pillars of Evaluation
export interface PlayerMetrics {
    overallValid: number; // 0-100 (OVR)
    physical: number;
    technical: number;
    tactical: number;
    psychological: number;
    lastUpdated: Date;
}

// A Single Evaluation Session
export interface Evaluation {
    id: string;
    playerId: string;
    coachId: string;
    date: Date;
    type: 'MATCH' | 'TRAINING' | 'PERIODIC_REVIEW';

    // Evaluation consists of Inputs (Raw Scores) which generate Metrics
    inputs: EvaluationInput[];

    // Resulting scores from this specific session
    computedScore: PlayerMetrics;
}

// Granular Data Point
export interface EvaluationInput {
    testId: string; // e.g., "TEST_JUGGLING_30SEC" or "SKILL_PASSING"
    value: number; // Raw value or 1-10 rating
    category: 'PHYSICAL' | 'TECHNICAL' | 'TACTICAL' | 'PSYCHOLOGICAL';
}

// Helper to define Test Metadata
export interface TestDefinition {
    id: string;
    label: string;
    category: 'PHYSICAL' | 'TECHNICAL' | 'TACTICAL' | 'PSYCHOLOGICAL';
    unit?: 'seconds' | 'count' | 'rating' | 'cm' | 'level'; // rating is 1-10
    biggerIsBetter: boolean; // e.g. Sprint time: false, Juggling count: true
    type: 'SUBJECTIVE' | 'OBJECTIVE'; // Subjective = Rating 1-10, Objective = Raw Data
}

export * from './growth';
export * from './medical';
