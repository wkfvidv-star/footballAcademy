export interface ProgressionTrend {
    label: string; // "3m", "6m", "12m"
    delta: number; // e.g., +5
    direction: 'up' | 'down' | 'stable';
}

export interface PlayerProgression {
    history: { date: string, overall: number }[];
    trends: ProgressionTrend[];
    potential: number;
}

export const getPlayerProgression = (currentOVR: number): PlayerProgression => {
    // Mocking historical data for the demo
    const history = [
        { date: '2025-01', overall: currentOVR - 12 },
        { date: '2025-04', overall: currentOVR - 8 },
        { date: '2025-07', overall: currentOVR - 4 },
        { date: '2025-10', overall: currentOVR - 2 },
        { date: '2026-01', overall: currentOVR },
    ];

    const calculateDelta = (monthsBack: number) => {
        const past = history[Math.max(0, history.length - 1 - Math.floor(monthsBack / 3))];
        return currentOVR - past.overall;
    };

    const trends: ProgressionTrend[] = [
        { label: '3m', delta: calculateDelta(3), direction: 'up' },
        { label: '6m', delta: calculateDelta(6), direction: 'up' },
        { label: '12m', delta: calculateDelta(12), direction: 'up' },
    ];

    return {
        history,
        trends,
        potential: Math.min(99, currentOVR + 8)
    };
};
