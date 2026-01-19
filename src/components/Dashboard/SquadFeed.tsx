import { Clock, TrendingUp, MessageSquare, Target, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Activity {
    id: string;
    actor: string;
    action: string;
    target?: string;
    time: string;
    type: 'evaluation' | 'feedback' | 'training' | 'system';
}

export default function SquadFeed() {
    const { t } = useTranslation();
    // Sample activity data
    const activities: Activity[] = [
        { id: '1', actor: 'Coach Mahmoud', action: 'added feedback for', target: 'Riyad', time: '2 min ago', type: 'feedback' },
        { id: '2', actor: 'Ahmed', action: 'completed sprint test', target: undefined, time: '15 min ago', type: 'evaluation' },
        { id: '3', actor: 'System', action: 'generated AI insight for', target: 'Karim', time: '1 hour ago', type: 'system' },
        { id: '4', actor: 'Coach Sarah', action: 'scheduled training for', target: 'Squad A', time: '2 hours ago', type: 'training' },
        { id: '5', actor: 'Youssef', action: 'improved tactical score', target: undefined, time: '3 hours ago', type: 'evaluation' },
    ];

    const getIcon = (type: Activity['type']) => {
        switch (type) {
            case 'evaluation':
                return TrendingUp;
            case 'feedback':
                return MessageSquare;
            case 'training':
                return Target;
            case 'system':
                return User;
            default:
                return Clock;
        }
    };

    const getIconColor = (type: Activity['type']) => {
        switch (type) {
            case 'evaluation':
                return 'text-blue-400 bg-blue-400/10';
            case 'feedback':
                return 'text-purple-400 bg-purple-400/10';
            case 'training':
                return 'text-yellow-400 bg-yellow-400/10';
            case 'system':
                return 'text-primary bg-primary/10';
            default:
                return 'text-zinc-400 bg-zinc-400/10';
        }
    };

    return (
        <div className="space-y-3">
            {activities.map((activity) => {
                const Icon = getIcon(activity.type);
                const iconColor = getIconColor(activity.type);

                return (
                    <div
                        key={activity.id}
                        className="group p-3 rounded-xl bg-secondary/30 border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all cursor-pointer"
                    >
                        <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg ${iconColor} flex-shrink-0`}>
                                <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-zinc-300 leading-relaxed">
                                    <span className="font-bold text-white">{activity.actor}</span>{' '}
                                    <span className="text-zinc-400">{activity.action}</span>{' '}
                                    {activity.target && (
                                        <span className="font-bold text-primary">{activity.target}</span>
                                    )}
                                </p>
                                <div className="flex items-center gap-1.5 mt-1.5">
                                    <Clock className="w-3 h-3 text-zinc-600" />
                                    <span className="text-[10px] text-zinc-600">{activity.time}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Empty state (if no activities) */}
            {activities.length === 0 && (
                <div className="text-center py-8">
                    <Clock className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
                    <p className="text-xs text-zinc-500">{t('squad.noActivity')}</p>
                </div>
            )}
        </div>
    );
}
