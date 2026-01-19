import { Calendar, ChevronRight, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function UpcomingSessions() {
    const { t } = useTranslation();

    const sessions = [
        { title: 'Team Training', time: '18:00 - 19:30', date: t('upcoming.today'), type: 'Physical' },
        { title: 'Video Analysis', time: '16:00 - 17:00', date: t('upcoming.tomorrow'), type: 'Tactical' },
    ];

    return (
        <div className="px-4 lg:px-6 xl:px-8">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold text-lg">{t('upcoming.title')}</h3>
                <button className="text-primary text-sm font-medium hover:underline">{t('upcoming.viewAll')}</button>
            </div>

            <div className="space-y-3 md:space-y-4 lg:space-y-5 xl:space-y-6">
                {sessions.map((session, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-2xl bg-secondary border border-white/5 hover:border-white/10 transition-colors cursor-pointer group">
                        <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center text-primary border border-white/5 group-hover:border-primary/30 transition-colors">
                            <Calendar className="w-5 h-5" />
                        </div>

                        <div className="flex-1">
                            <h4 className="text-white font-medium mb-1">{session.title}</h4>
                            <div className="flex items-center gap-3 text-xs text-zinc-400">
                                <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {session.time}
                                </span>
                                <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
                                <span className="text-zinc-500">{session.type}</span>
                            </div>
                        </div>

                        <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-white transition-colors" />
                    </div>
                ))}
            </div>
        </div>
    );
}
