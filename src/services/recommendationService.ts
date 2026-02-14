import type { PlayerMetrics } from '../types';

export interface TrainingDrill {
    id: string;
    title: string;
    category: 'PHYSICAL' | 'TECHNICAL' | 'TACTICAL' | 'PSYCHOLOGICAL';
    duration: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Elite';
    description: string;
    minAge: number;
    maxAge: number;
    positions: ('GK' | 'DEF' | 'MID' | 'ATT')[];
    philosophy?: 'POSSESSION' | 'TRANSITION' | 'COUNTER_PRESS' | 'DIRECT';
}

const DRILLS_DB: TrainingDrill[] = [
    // Physical
    {
        id: 'PHY_1', title: 'training.drill_PHY_1_title', category: 'PHYSICAL', duration: '25 min', difficulty: 'Advanced',
        description: 'training.drill_PHY_1_desc',
        minAge: 14, maxAge: 21, positions: ['DEF', 'MID', 'ATT'], philosophy: 'TRANSITION'
    },
    {
        id: 'PHY_2', title: 'training.drill_PHY_2_title', category: 'PHYSICAL', duration: '15 min', difficulty: 'Intermediate',
        description: 'training.drill_PHY_2_desc',
        minAge: 10, maxAge: 21, positions: ['GK', 'DEF', 'MID', 'ATT']
    },
    {
        id: 'PHY_3', title: 'training.drill_PHY_3_title', category: 'PHYSICAL', duration: '20 min', difficulty: 'Beginner',
        description: 'training.drill_PHY_3_desc',
        minAge: 8, maxAge: 15, positions: ['DEF', 'MID', 'ATT']
    },

    // Technical
    {
        id: 'TEC_1', title: 'training.drill_TEC_1_title', category: 'TECHNICAL', duration: '20 min', difficulty: 'Intermediate',
        description: 'training.drill_TEC_1_desc',
        minAge: 10, maxAge: 21, positions: ['MID', 'ATT'], philosophy: 'POSSESSION'
    },
    {
        id: 'TEC_2', title: 'training.drill_TEC_2_title', category: 'TECHNICAL', duration: '15 min', difficulty: 'Beginner',
        description: 'training.drill_TEC_2_desc',
        minAge: 8, maxAge: 18, positions: ['MID', 'ATT']
    },
    {
        id: 'TEC_3', title: 'training.drill_TEC_3_title', category: 'TECHNICAL', duration: '30 min', difficulty: 'Advanced',
        description: 'training.drill_TEC_3_desc',
        minAge: 12, maxAge: 21, positions: ['ATT']
    },
    {
        id: 'TEC_4', title: 'training.drill_TEC_4_title', category: 'TECHNICAL', duration: '25 min', difficulty: 'Advanced',
        description: 'training.drill_TEC_4_desc',
        minAge: 14, maxAge: 21, positions: ['MID', 'DEF'], philosophy: 'POSSESSION'
    },

    // Tactical
    {
        id: 'TAC_1', title: 'training.drill_TAC_1_title', category: 'TACTICAL', duration: '20 min', difficulty: 'Intermediate',
        description: 'training.drill_TAC_1_desc',
        minAge: 12, maxAge: 21, positions: ['DEF', 'MID'], philosophy: 'COUNTER_PRESS'
    },
    {
        id: 'TAC_2', title: 'training.drill_TAC_2_title', category: 'TACTICAL', duration: '25 min', difficulty: 'Advanced',
        description: 'training.drill_TAC_2_desc',
        minAge: 14, maxAge: 21, positions: ['MID'], philosophy: 'POSSESSION'
    },
    {
        id: 'TAC_3', title: 'Decision Making: 2v1 Overloads', category: 'TACTICAL', duration: '20 min', difficulty: 'Intermediate',
        description: 'Developing quick decision making in numerical advantage scenarios.',
        minAge: 10, maxAge: 18, positions: ['MID', 'ATT'], philosophy: 'TRANSITION'
    },

    // Mental
    {
        id: 'MEN_1', title: 'training.drill_MEN_1_title', category: 'PSYCHOLOGICAL', duration: '10 min', difficulty: 'Beginner',
        description: 'training.drill_MEN_1_desc',
        minAge: 10, maxAge: 21, positions: ['GK', 'DEF', 'MID', 'ATT']
    },
    {
        id: 'MEN_2', title: 'Visual Scanning Drill', category: 'PSYCHOLOGICAL', duration: '15 min', difficulty: 'Advanced',
        description: 'Scanning the environment before receiving the ball to improve spatial awareness.',
        minAge: 12, maxAge: 21, positions: ['MID', 'DEF']
    },
];

export interface TrainingPathway {
    shortTerm: TrainingDrill[];
    mediumTerm: TrainingDrill[];
    longTerm: string; // Strategy description
}

export const getRecommendations = (
    metrics: PlayerMetrics,
    age: number,
    position: 'GK' | 'DEF' | 'MID' | 'ATT',
    preferredPhilosophy?: 'POSSESSION' | 'TRANSITION' | 'COUNTER_PRESS' | 'DIRECT'
): TrainingPathway => {
    // 1. Identify Weakest pillar
    const scores = [
        { cat: 'PHYSICAL' as const, val: metrics.physical },
        { cat: 'TECHNICAL' as const, val: metrics.technical },
        { cat: 'TACTICAL' as const, val: metrics.tactical },
        { cat: 'PSYCHOLOGICAL' as const, val: metrics.psychological },
    ];

    const sorted = scores.sort((a, b) => a.val - b.val);
    const weakest = sorted[0];

    // 2. Filter logic
    const filterDrills = (category: typeof scores[0]['cat']) => {
        return DRILLS_DB.filter(d => {
            const matchesCategory = d.category === category;
            const matchesAge = age >= d.minAge && age <= d.maxAge;
            const matchesPosition = d.positions.includes(position);
            return matchesCategory && matchesAge && matchesPosition;
        });
    };

    const primaryRecs = filterDrills(weakest.cat);
    const tacticalRecs = filterDrills('TACTICAL');

    return {
        shortTerm: primaryRecs.slice(0, 2),
        mediumTerm: tacticalRecs.slice(0, 2),
        longTerm: `Focus on improving ${weakest.cat.toLowerCase()} attributes while integrating ${position} specific tactical principles.`
    };
};
