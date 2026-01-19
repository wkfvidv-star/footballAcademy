import type { TestDefinition } from '../../types';

// FIELD TESTS (Objective, Scientific)
export const FIELD_TESTS: (TestDefinition & { id: string })[] = [
    // Physical
    { id: 'PHY_FT_01', label: 'evaluation.test_PHY_FT_01', category: 'PHYSICAL', biggerIsBetter: false, unit: 'seconds', type: 'OBJECTIVE' },
    { id: 'PHY_FT_02', label: 'evaluation.test_PHY_FT_02', category: 'PHYSICAL', biggerIsBetter: true, unit: 'cm', type: 'OBJECTIVE' },
    { id: 'PHY_FT_03', label: 'evaluation.test_PHY_FT_03', category: 'PHYSICAL', biggerIsBetter: false, unit: 'seconds', type: 'OBJECTIVE' },
    { id: 'PHY_FT_04', label: 'evaluation.test_PHY_FT_04', category: 'PHYSICAL', biggerIsBetter: true, unit: 'level', type: 'OBJECTIVE' },
    { id: 'PHY_FT_05', label: 'evaluation.test_PHY_FT_05', category: 'PHYSICAL', biggerIsBetter: true, unit: 'count', type: 'OBJECTIVE' },

    // Technical (Measurable)
    { id: 'TEC_FT_01', label: 'evaluation.test_TEC_FT_01', category: 'TECHNICAL', biggerIsBetter: true, unit: 'count', type: 'OBJECTIVE' },
    { id: 'TEC_FT_02', label: 'evaluation.test_TEC_FT_02', category: 'TECHNICAL', biggerIsBetter: false, unit: 'seconds', type: 'OBJECTIVE' },
    { id: 'TEC_FT_03', label: 'evaluation.test_TEC_FT_03', category: 'TECHNICAL', biggerIsBetter: true, unit: 'count', type: 'OBJECTIVE' },
];

// COACH ASSESSMENT (Subjective, Observation)
export const COACH_ASSESSMENT_QUESTIONS: (TestDefinition & { id: string })[] = [
    // Tactical
    { id: 'TAC_C_01', label: 'evaluation.test_TAC_C_01', category: 'TACTICAL', biggerIsBetter: true, unit: 'rating', type: 'SUBJECTIVE' },
    { id: 'TAC_C_02', label: 'evaluation.test_TAC_C_02', category: 'TACTICAL', biggerIsBetter: true, unit: 'rating', type: 'SUBJECTIVE' },
    { id: 'TAC_C_03', label: 'evaluation.test_TAC_C_03', category: 'TACTICAL', biggerIsBetter: true, unit: 'rating', type: 'SUBJECTIVE' },

    // Technical (Quality based)
    { id: 'TEC_C_01', label: 'evaluation.test_TEC_C_01', category: 'TECHNICAL', biggerIsBetter: true, unit: 'rating', type: 'SUBJECTIVE' },
    { id: 'TEC_C_02', label: 'evaluation.test_TEC_C_02', category: 'TECHNICAL', biggerIsBetter: true, unit: 'rating', type: 'SUBJECTIVE' },

    // Mental / Psychological
    { id: 'PSY_C_01', label: 'evaluation.test_PSY_C_01', category: 'PSYCHOLOGICAL', biggerIsBetter: true, unit: 'rating', type: 'SUBJECTIVE' },
    { id: 'PSY_C_02', label: 'evaluation.test_PSY_C_02', category: 'PSYCHOLOGICAL', biggerIsBetter: true, unit: 'rating', type: 'SUBJECTIVE' },
];

// SELF ASSESSMENT (Subjective, Introspection)
export const SELF_ASSESSMENT_QUESTIONS: (TestDefinition & { id: string })[] = [
    { id: 'PSY_S_01', label: 'evaluation.test_PSY_S_01', category: 'PSYCHOLOGICAL', biggerIsBetter: true, unit: 'rating', type: 'SUBJECTIVE' },
    { id: 'PSY_S_02', label: 'evaluation.test_PSY_S_02', category: 'PSYCHOLOGICAL', biggerIsBetter: true, unit: 'rating', type: 'SUBJECTIVE' },
    { id: 'TAC_S_01', label: 'evaluation.test_TAC_S_01', category: 'TACTICAL', biggerIsBetter: true, unit: 'rating', type: 'SUBJECTIVE' },
];

// Combine for backward compatibility or general finding
export const ALL_TESTS = [...FIELD_TESTS, ...COACH_ASSESSMENT_QUESTIONS, ...SELF_ASSESSMENT_QUESTIONS];
