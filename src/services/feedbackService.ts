import type { PlayerMetrics } from '../types';

export interface FeedbackItem {
    category: 'PHYSICAL' | 'TECHNICAL' | 'TACTICAL' | 'PSYCHOLOGICAL';
    score: number;
    status: 'Strength' | 'Good' | 'Needs Improvement';
    summary: string;
    action: string;
}

export const getCoachFeedback = (metrics: PlayerMetrics): FeedbackItem[] => {
    const categories = [
        { key: 'physical', label: 'PHYSICAL' },
        { key: 'technical', label: 'TECHNICAL' },
        { key: 'tactical', label: 'TACTICAL' },
        { key: 'psychological', label: 'PSYCHOLOGICAL' },
    ];

    return categories.map((cat) => {
        const score = metrics[cat.key as keyof PlayerMetrics] as number;
        let status: FeedbackItem['status'] = 'Good';
        let summary = '';
        let action = '';

        if (score >= 85) {
            status = 'Strength';
            summary = `Your ${cat.label} level is elite. You are dominating in this area.`;
            action = 'Maintain this standard and lead by example.';
        } else if (score >= 70) {
            status = 'Good';
            summary = `Solid ${cat.label} performance, but there is room to reach the next level.`;
            action = 'Focus on consistency and fine-tuning details.';
        } else {
            status = 'Needs Improvement';
            summary = `Your ${cat.label} metrics are below target for your age group.`;
            action = 'Prioritize this in your weekly training plan.';
        }

        // specific mock nuances based on category
        if (cat.label === 'PHYSICAL' && score < 75) {
            action = 'Add 2 extra interval sprint sessions per week.';
        } else if (cat.label === 'TACTICAL' && score > 80) {
            action = 'Watch analysis of pro players in your position to refine positioning.';
        }

        return {
            category: cat.label as FeedbackItem['category'],
            score,
            status,
            summary,
            action
        };
    });
};
