
interface Benchmark {
    min: number; // Value for 0 points (or 10 if inverse)
    max: number; // Value for 10 points (or 0 if inverse)
    inverse: boolean; // True if Lower is Better (e.g. Sprint)
}

const AGE_BENCHMARKS: Record<string, Record<string, Benchmark>> = {
    // --- Speed & Acceleration ---
    'PHY_SPD_10': { // Sprint 10m (Seconds)
        'U10': { min: 2.5, max: 1.8, inverse: true },
        'U12': { min: 2.3, max: 1.7, inverse: true },
        'U14': { min: 2.1, max: 1.6, inverse: true },
        'U16': { min: 1.9, max: 1.5, inverse: true },
        'U18': { min: 1.8, max: 1.45, inverse: true },
    },
    'PHY_SPD_30': { // Sprint 30m (Seconds)
        'U10': { min: 6.0, max: 5.0, inverse: true },
        'U12': { min: 5.5, max: 4.5, inverse: true },
        'U14': { min: 5.0, max: 4.0, inverse: true },
        'U16': { min: 4.6, max: 3.8, inverse: true },
        'U18': { min: 4.4, max: 3.7, inverse: true },
    },
    'PHY_SPD_RSA': { // RSA Mean Time (Seconds)
        'U14': { min: 8.0, max: 6.5, inverse: true },
        'U16': { min: 7.5, max: 6.0, inverse: true },
        'U18': { min: 7.0, max: 5.5, inverse: true },
    },

    // --- Power ---
    'PHY_PWR_VJ': { // Vertical Jump (cm)
        'U10': { min: 20, max: 35, inverse: false },
        'U12': { min: 25, max: 45, inverse: false },
        'U14': { min: 30, max: 55, inverse: false },
        'U16': { min: 40, max: 65, inverse: false },
        'U18': { min: 50, max: 75, inverse: false },
    },
    'PHY_PWR_BJ': { // Broad Jump (cm)
        'U12': { min: 140, max: 190, inverse: false },
        'U14': { min: 160, max: 220, inverse: false },
        'U16': { min: 190, max: 250, inverse: false },
        'U18': { min: 210, max: 270, inverse: false },
    },
    'PHY_PWR_SHOT': { // Shooting Power (km/h) - Estimated/Measured
        'U12': { min: 40, max: 70, inverse: false },
        'U14': { min: 50, max: 85, inverse: false },
        'U16': { min: 70, max: 100, inverse: false },
        'U18': { min: 80, max: 115, inverse: false },
    },

    // --- Endurance ---
    'PHY_END_YOYO': { // Yo-Yo IR1 Level (e.g. 16.5 -> 16.5)
        'U14': { min: 14.5, max: 17.5, inverse: false },
        'U16': { min: 16.0, max: 20.0, inverse: false },
        'U18': { min: 18.0, max: 22.0, inverse: false },
    },
    'PHY_END_BEEP': { // Beep Test Level
        'U12': { min: 6, max: 10, inverse: false },
        'U14': { min: 8, max: 12, inverse: false },
        'U16': { min: 10, max: 14, inverse: false },
        'U18': { min: 11, max: 15, inverse: false },
    },

    // --- Agility & Balance ---
    'PHY_AGL_ILL': { // Illinois Agility (Seconds)
        'U12': { min: 20.0, max: 17.0, inverse: true },
        'U14': { min: 18.5, max: 15.5, inverse: true },
        'U16': { min: 17.0, max: 14.5, inverse: true },
        'U18': { min: 16.0, max: 13.8, inverse: true },
    },
    'PHY_BAL_Y': { // Y-Balance (Composite Score %)
        'U14': { min: 75, max: 95, inverse: false },
        'U16': { min: 85, max: 105, inverse: false },
        'U18': { min: 90, max: 115, inverse: false },
    },
    'PHY_REA_LIGHT': { // Reaction Light (ms)
        'U14': { min: 400, max: 250, inverse: true },
        'U16': { min: 350, max: 220, inverse: true },
        'U18': { min: 300, max: 200, inverse: true },
    },

    // --- Technical Passing ---
    'TEC_PAS_SHORT': { // Short Passing Accuracy (x/10)
        'U12': { min: 5, max: 9, inverse: false },
        'U14': { min: 6, max: 9.5, inverse: false },
        'U16': { min: 7, max: 9.8, inverse: false },
        'U18': { min: 8, max: 10, inverse: false },
    },
    'TEC_PAS_LONG': { // Long Passing Accuracy (x/10)
        'U12': { min: 3, max: 7, inverse: false },
        'U14': { min: 4, max: 8, inverse: false },
        'U16': { min: 5, max: 9, inverse: false },
        'U18': { min: 6, max: 9.5, inverse: false },
    },

    // --- Ball Control & Dribbling ---
    'TEC_CTL_TOUCH': { // First Touch Quality (Coach Rating 1-10)
        'U12': { min: 4, max: 8, inverse: false },
        'U14': { min: 5, max: 9, inverse: false },
        'U16': { min: 6, max: 9.5, inverse: false },
        'U18': { min: 7, max: 10, inverse: false },
    },
    'TEC_DRI_SLALOM': { // Slalom Dribble (Seconds)
        'U12': { min: 18, max: 14, inverse: true },
        'U14': { min: 16, max: 12.5, inverse: true },
        'U16': { min: 14, max: 11.5, inverse: true },
        'U18': { min: 13, max: 10.5, inverse: true },
    },
    'TEC_DRI_MASTERY': { // Ball Mastery (Juggling/Skills 1-10)
        'U12': { min: 4, max: 8, inverse: false },
        'U14': { min: 5, max: 9, inverse: false },
        'U16': { min: 6, max: 9.5, inverse: false },
        'U18': { min: 7, max: 10, inverse: false },
    },

    // --- Shooting & Finishing ---
    'TEC_SHO_ACC': { // Shooting Accuracy (x/10 on target)
        'U12': { min: 3, max: 7, inverse: false },
        'U14': { min: 4, max: 8, inverse: false },
        'U16': { min: 5, max: 9, inverse: false },
        'U18': { min: 6, max: 9.5, inverse: false },
    },
    'TEC_SHO_WEAK': { // Weak Foot Ability (Rating 1-5 stars converted to 1-10)
        'U12': { min: 2, max: 6, inverse: false },
        'U14': { min: 3, max: 8, inverse: false },
        'U16': { min: 4, max: 9, inverse: false },
        'U18': { min: 5, max: 10, inverse: false },
    },

    // --- Crossing ---
    'TEC_CRO_ACC': { // Crossing Accuracy (x/10)
        'U14': { min: 3, max: 7, inverse: false },
        'U16': { min: 4, max: 8, inverse: false },
        'U18': { min: 5, max: 9, inverse: false },
    },

    // Legacy / Other
    'PHY_FT_01': { // Sprint 30m Legacy
        'U10': { min: 7.5, max: 5.5, inverse: true },
        'U12': { min: 7.0, max: 4.8, inverse: true },
        'U14': { min: 6.5, max: 4.4, inverse: true },
        'U16': { min: 6.0, max: 4.0, inverse: true },
        'U18': { min: 5.5, max: 3.8, inverse: true },
    },
    'PHY_FT_02': { // Vertical Jump Legacy
        'U10': { min: 15, max: 35, inverse: false },
        'U12': { min: 20, max: 45, inverse: false },
        'U14': { min: 25, max: 55, inverse: false },
        'U16': { min: 30, max: 65, inverse: false },
        'U18': { min: 35, max: 75, inverse: false },
    },
    'PHY_FT_05': { // Push-ups
        'U10': { min: 0, max: 20, inverse: false },
        'U12': { min: 5, max: 30, inverse: false },
        'U14': { min: 10, max: 40, inverse: false },
        'U16': { min: 15, max: 50, inverse: false },
        'U18': { min: 20, max: 60, inverse: false },
    },
    'TEC_FT_01': { // Juggling
        'U10': { min: 0, max: 20, inverse: false },
        'U12': { min: 5, max: 50, inverse: false },
        'U14': { min: 10, max: 100, inverse: false },
        'U16': { min: 20, max: 200, inverse: false },
        'U18': { min: 30, max: 300, inverse: false },
    },
    'TEC_FT_03': { // Shooting
        'U10': { min: 0, max: 8, inverse: false },
        'U12': { min: 0, max: 9, inverse: false },
        'U14': { min: 0, max: 10, inverse: false },
        'U16': { min: 0, max: 10, inverse: false },
        'U18': { min: 0, max: 10, inverse: false },
    }
};

const POSITION_WEIGHTS: Record<string, Record<string, number>> = {
    'DEF': {
        'PHY_FT_01': 0.8, 'PHY_FT_02': 1.2,
        'TEC_PAS_SHORT': 1.1, 'TEC_PAS_LONG': 1.2, // Modern defenders need to play out
        'TEC_CTL_TOUCH': 1.0,
        'TEC_SHO_ACC': 0.6, // Less critical
        'TEC_CRO_ACC': 0.8  // Fullbacks might be higher, CBs lower. Averaged.
    },
    'MID': {
        'PHY_FT_01': 1.0, 'PHY_FT_02': 1.0,
        'TEC_PAS_SHORT': 1.3, 'TEC_PAS_LONG': 1.2, // Critical
        'TEC_CTL_TOUCH': 1.3, // Critical
        'TEC_DRI_MASTERY': 1.2,
        'TEC_SHO_ACC': 1.0
    },
    'ATT': {
        'PHY_FT_01': 1.2, 'PHY_FT_02': 1.1,
        'TEC_SHO_ACC': 1.4, // Critical
        'TEC_SHO_WEAK': 1.2,
        'TEC_DRI_SLALOM': 1.3,
        'TEC_CTL_TOUCH': 1.1
    },
};

export const normalizeScore = (testId: string, rawValue: number, ageGroup: string, position: string): number => {
    if (!testId.includes('FT')) {
        return rawValue;
    }

    const testBenchmarks = AGE_BENCHMARKS[testId];
    if (!testBenchmarks) return 5;

    const benchmark = testBenchmarks[ageGroup] || testBenchmarks['U14'];
    let score = 0;

    if (benchmark.inverse) {
        if (rawValue >= benchmark.min) score = 1;
        else if (rawValue <= benchmark.max) score = 10;
        else {
            score = 1 + (rawValue - benchmark.min) * (10 - 1) / (benchmark.max - benchmark.min);
        }
    } else {
        if (rawValue <= benchmark.min) score = 1;
        else if (rawValue >= benchmark.max) score = 10;
        else {
            score = 1 + (rawValue - benchmark.min) * (10 - 1) / (benchmark.max - benchmark.min);
        }
    }

    // Apply positional weighting
    const weight = POSITION_WEIGHTS[position]?.[testId] || 1.0;
    score = score * weight;

    return Math.min(10, Math.max(1, parseFloat(score.toFixed(1))));
};

export interface BenchmarkInsight {
    label: string;
    delta: number;
    direction: 'above' | 'below';
    ageGroup: string;
    position: string;
}

export const generateBenchmarkInsightData = (testId: string, rawValue: number, ageGroup: string, position: string, label: string): BenchmarkInsight | null => {
    const testBenchmarks = AGE_BENCHMARKS[testId];
    if (!testBenchmarks) return null;

    const benchmark = testBenchmarks[ageGroup] || testBenchmarks['U14'];
    const avg = (benchmark.min + benchmark.max) / 2;

    let delta = 0;
    if (benchmark.inverse) {
        delta = ((avg - rawValue) / avg) * 100;
    } else {
        delta = ((rawValue - avg) / avg) * 100;
    }

    const direction = delta >= 0 ? 'above' : 'below';
    const absDelta = Math.abs(Math.round(delta));

    return {
        label,
        delta: absDelta,
        direction,
        ageGroup,
        position
    };
};
