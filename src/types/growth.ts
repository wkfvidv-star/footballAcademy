export type BioBand = 'pre-phv' | 'circa-phv' | 'post-phv';
export type MaturityStatus = 'early' | 'on-time' | 'late';

export interface GrowthMeasurement {
    id: string;
    playerId: string;
    date: string;
    heightCm: number;
    sittingHeightCm: number;
    weightKg: number;
    // Metadata for the measurement source (e.g., 'clinic', 'home', 'academy')
    source: 'academy' | 'external';
    verifiedBy?: string; // Coach ID who verified the measurement
}

export interface GeneticInputs {
    fatherHeightCm: number;
    motherHeightCm: number;
}

export interface BiologicalProfile {
    playerId: string;
    currentHeightCm: number;
    predictedAdultHeightCm: number;
    currentPercentageAdultHeight: number;
    maturityOffsetYears: number; // Years from PHV (e.g., -1.5 or +0.5)
    bioBand: BioBand;
    maturityStatus: MaturityStatus;
    phvDate?: string; // Estimated date of Peak Height Velocity
    lastUpdated: string;
}

// Logic output for correcting physical scores
export interface BioCorrectionFactor {
    attribute: 'speed' | 'power' | 'stamina';
    correctionMultiplier: number; // e.g., 1.15 represents a 15% boost for late bloomers
    reason: string;
}
