import { Sparkles, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function PerformanceInsight() {
    const { t } = useTranslation();
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 1000);
    };

    return (
        <div className="bg-gradient-to-br from-secondary to-secondary/50 rounded-2xl p-5 border border-white/5">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="p-1 px-2 bg-primary/20 rounded-lg">
                        <Sparkles className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-xs font-bold text-white tracking-wide uppercase italic">{t('evaluation.ai_analysis')}</span>
                </div>
                <button
                    onClick={handleRefresh}
                    className="p-1.5 hover:bg-white/5 rounded-lg transition-colors group"
                    title="Refresh insight"
                >
                    <RefreshCw className={`w-3.5 h-3.5 text-zinc-500 group-hover:text-primary transition-all ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
            </div>

            <p className="text-zinc-300 text-xs leading-relaxed font-rtl">
                {t('dashboard.ai_insight', { name: 'Riyad', percent: '5%', pillar: t('card.technical'), focus: t('card.physical') })}
            </p>

            {/* Minimal chart visualization */}
            <div className="mt-4 w-full h-24 flex items-end justify-between gap-1 px-2 border-b border-white/5 pb-2">
                {[40, 65, 55, 80, 70, 90, 85].map((h, i) => (
                    <div key={i} className="w-full bg-primary/20 rounded-t-sm relative group cursor-pointer" style={{ height: `${h}%` }}>
                        <div className="absolute bottom-0 w-full bg-primary rounded-t-sm transition-all duration-500 group-hover:bg-accent" style={{ height: `${h}%` }}></div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between text-[10px] text-zinc-500 mt-2 px-1">
                <span>{t('time.lastWeek')}</span>
                <span>{t('time.today')}</span>
            </div>
        </div>
    );
}
