import { ChevronDown, ChevronUp, AlertCircle, CheckCircle, Trophy } from 'lucide-react';
import { useState } from 'react';
import type { FeedbackItem } from '../../services/feedbackService';

interface FeedbackCardProps {
    item: FeedbackItem;
}

const STATUS_CONFIG = {
    Strength: { icon: Trophy, color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20' },
    Good: { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20' },
    'Needs Improvement': { icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20' },
};

export default function FeedbackCard({ item }: FeedbackCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const config = STATUS_CONFIG[item.status];
    const Icon = config.icon;

    return (
        <div
            className={`bg-card border ${config.border} rounded-2xl overflow-hidden transition-all duration-300`}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${config.bg}`}>
                        <Icon className={`w-5 h-5 ${config.color}`} />
                    </div>
                    <div className="text-start">
                        <div className="text-xs text-zinc-400 font-bold">{item.category}</div>
                        <div className="text-white font-bold">{item.status}</div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-2xl font-black text-white/20">{item.score}</span>
                    {isOpen ? <ChevronUp className="w-5 h-5 text-zinc-500" /> : <ChevronDown className="w-5 h-5 text-zinc-500" />}
                </div>
            </button>

            {isOpen && (
                <div className="p-4 border-t border-white/5 bg-black/20 animate-in slide-in-from-top-2 duration-200">
                    <div className="mb-3">
                        <h4 className="text-xs text-zinc-500 uppercase font-bold mb-1">Coach Insight</h4>
                        <p className="text-zinc-300 text-sm leading-relaxed">"{item.summary}"</p>
                    </div>
                    <div>
                        <h4 className="text-xs text-primary uppercase font-bold mb-1">Action Plan</h4>
                        <p className="text-white text-sm font-medium">{item.action}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
