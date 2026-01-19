export type Position = 'Defender' | 'Midfielder' | 'Forward';

export interface Benchmark {
    physical: number;
    technical: number;
    tactical: number;
    psychological: number;
}

// Global averages based on age and position
// These are rough scientific mock benchmarks for a youth academy
const GLOBAL_BENCHMARKS: Record<number, Record<Position, Benchmark>> = {
    15: {
        Defender: { physical: 65, technical: 60, tactical: 68, psychological: 65 },
        Midfielder: { physical: 62, technical: 70, tactical: 65, psychological: 68 },
        Forward: { physical: 70, technical: 68, tactical: 60, psychological: 65 },
    },
    17: {
        Defender: { physical: 72, technical: 68, tactical: 75, psychological: 72 },
        Midfielder: { physical: 70, technical: 78, tactical: 72, psychological: 75 },
        Forward: { physical: 78, technical: 75, tactical: 68, psychological: 72 },
    },
    19: {
        Defender: { physical: 80, technical: 75, tactical: 82, psychological: 80 },
        Midfielder: { physical: 78, technical: 85, tactical: 80, psychological: 82 },
        Forward: { physical: 85, technical: 82, tactical: 75, psychological: 80 },
    }
};

export const getBenchmark = (age: number, position: Position): Benchmark => {
    // Find closest age bracket
    const ages = Object.keys(GLOBAL_BENCHMARKS).map(Number).sort((a, b) => a - b);
    const bracket = ages.reduce((prev, curr) =>
        Math.abs(curr - age) < Math.abs(prev - age) ? curr : prev
    );

    return GLOBAL_BENCHMARKS[bracket][position];
};

export const calculateDiff = (current: number, target: number): number => {
    if (target === 0) return 0;
    return Math.round(((current - target) / target) * 100);
};

export const getInsight = (diff: number, label: string): string => {
    const absDiff = Math.abs(diff);
    if (diff > 5) {
        return `${label} is ${absDiff}% above global average for your age & position. Excellent!`;
    } else if (diff < -5) {
        return `${label} is ${absDiff}% below global average. Focus area identified.`;
    } else {
        return `${label} is on par with global benchmarks for elite youth levels.`;
    }
};
