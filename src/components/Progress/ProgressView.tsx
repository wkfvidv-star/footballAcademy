import { ArrowLeft, User, TrendingUp, Calendar, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { generateMockHistory } from '../../services/ovrService';
import TrendChart from './TrendChart';

interface ProgressViewProps {
    onBack: () => void;
}

export default function ProgressView({ onBack }: ProgressViewProps) {
    const { t } = useTranslation();
    const history = generateMockHistory();
    const current = history[history.length - 1];
    const previous = history[history.length - 2];

    const delta = current.overallValid - previous.overallValid;
    const isPositive = delta > 0;
    const isNeutral = delta === 0;

    return (
        <div className="flex flex-col">
            {/* Header */}
            <div className="p-6 pb-2">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-bold">{t('common.back')}</span>
                </button>

                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">{t('progress.title')}</h1>
                        <p className="text-zinc-400 text-sm">{t('progress.season')}</p>
                    </div>
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center border border-white/10">
                        <User className="w-6 h-6 text-zinc-400" />
                    </div>
                </div>
            </div>

            {/* content */}
            <div className="flex-1 px-6 pb-8 space-y-6 overflow-y-auto">

                {/* Main Stats Card */}
                <div className="bg-gradient-to-br from-secondary to-black border border-white/5 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        <span className="text-sm font-bold text-zinc-300">{t('progress.ovr_trend')}</span>
                    </div>

                    <div className="flex items-baseline gap-3 mb-1">
                        <div className="text-6xl font-black text-white tracking-tighter">{current.overallValid}</div>
                        <div className={`flex items-center text-sm font-bold ${isPositive ? 'text-green-500' : isNeutral ? 'text-yellow-500' : 'text-red-500'}`}>
                            {isPositive ? <ArrowUpRight className="w-4 h-4" /> : isNeutral ? <Minus className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                            <span>{Math.abs(delta)} {t('progress.this_month')}</span>
                        </div>
                    </div>

                    <TrendChart history={history} />
                </div>

                {/* History List */}
                <div>
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-zinc-500" />
                        {t('progress.history')}
                    </h3>
                    <div className="space-y-3">
                        {[...history].reverse().map((record, i) => (
                            <div key={i} className="bg-card border border-white/5 p-4 rounded-xl flex justify-between items-center transition-colors hover:bg-white/5 cursor-pointer group">
                                <div>
                                    <div className="text-white font-bold mb-0.5">{t('progress.periodic_review')}</div>
                                    <div className="text-xs text-zinc-500">{record.lastUpdated.toLocaleDateString()}</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-end">
                                        <div className="text-xs text-zinc-500 uppercase">OVR</div>
                                        <div className="font-bold text-white text-lg leading-none">{record.overallValid}</div>
                                    </div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
