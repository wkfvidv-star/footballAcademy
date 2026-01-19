import { Area, AreaChart, CartesianGrid, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ArrowRight, Bot, ChevronLeft, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { useAuth } from '../../auth/AuthContext';

const growthData = [
    { month: 'Aug', score: 78, projected: 78 },
    { month: 'Sep', score: 80, projected: 80 },
    { month: 'Oct', score: 82, projected: 82 },
    { month: 'Nov', score: 85, projected: 85 },
    { month: 'Dec', score: 87, projected: 87 },
    { month: 'Jan', projected: 89 },
    { month: 'Feb', projected: 91 },
    { month: 'Mar', projected: 92 },
];

export default function InsightsView() {
    const { t } = useTranslation();
    const { user } = useAuth();

    const comparisonData = [
        { subject: t('insights.label_pace'), Player: 85, Avg: 75, fullMark: 100 },
        { subject: t('insights.label_shoot'), Player: 78, Avg: 70, fullMark: 100 },
        { subject: t('insights.label_pass'), Player: 82, Avg: 78, fullMark: 100 },
        { subject: t('insights.label_dribble'), Player: 88, Avg: 72, fullMark: 100 },
        { subject: t('insights.label_def'), Player: 65, Avg: 60, fullMark: 100 },
        { subject: t('insights.label_phys'), Player: 80, Avg: 70, fullMark: 100 },
    ];

    return (
        <div className="space-y-6 pb-24">
            <div className="px-2 flex items-center gap-2">
                <Link to="/player/progress" className="p-2 bg-zinc-900 rounded-full text-white">
                    <ChevronLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-black text-white tracking-tight">{t('insights.title')}</h1>
                    <p className="text-zinc-400 text-sm font-medium">{t('insights.subtitle')}</p>
                </div>
            </div>

            {/* AI Scout Report */}
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                    <Sparkles className="w-24 h-24 text-primary" />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="bg-primary/20 p-2 rounded-xl text-primary">
                            <Bot className="w-6 h-6" />
                        </div>
                        <span className="text-primary font-bold text-sm tracking-wide uppercase">{t('insights.scout_report')}</span>
                    </div>
                    <div className="space-y-4">
                        <p className="text-white text-sm leading-relaxed font-medium">
                            <Trans
                                i18nKey="insights.scout_report_msg"
                                values={{ name: user?.name }}
                                components={[<span className="text-white" />, <span className="text-green-400" />]}
                            />
                        </p>
                        <div className="h-px bg-white/10"></div>
                        <div>
                            <span className="text-zinc-500 text-xs font-bold uppercase">{t('insights.development_focus')}</span>
                            <p className="text-zinc-300 text-sm mt-1">
                                {t('insights.dev_focus_msg')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Peer Comparison */}
            <div className="bg-zinc-900 border border-white/5 rounded-3xl p-4">
                <div className="flex items-center justify-between mb-2 px-2">
                    <div className="text-sm font-bold text-white">{t('insights.comparison')}</div>
                    <div className="flex items-center gap-3 text-[10px] font-bold">
                        <span className="flex items-center gap-1 text-blue-400"><div className="w-2 h-2 rounded-full bg-blue-500"></div> {t('insights.you')}</span>
                        <span className="flex items-center gap-1 text-zinc-500"><div className="w-2 h-2 rounded-full bg-zinc-600"></div> {t('insights.avg')}</span>
                    </div>
                </div>
                <div className="h-[280px] w-full lowercase">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={comparisonData}>
                            <PolarGrid stroke="#333" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 'bold' }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                            <Radar name={t('insights.you')} dataKey="Player" stroke="#3b82f6" strokeWidth={3} fill="#3b82f6" fillOpacity={0.3} />
                            <Radar name={t('insights.avg')} dataKey="Avg" stroke="#52525b" strokeWidth={2} fill="#52525b" fillOpacity={0.1} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Projected Growth */}
            <div className="bg-zinc-900 border border-white/5 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <div className="text-sm font-bold text-white">{t('insights.projected_growth')}</div>
                        <div className="text-xs text-zinc-500">{t('insights.based_on_load')}</div>
                    </div>
                    <div className="bg-green-500/10 text-green-500 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> +5.2
                    </div>
                </div>
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={growthData}>
                            <defs>
                                <linearGradient id="colorProj" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#52525b', fontSize: 10 }} dy={10} />
                            <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Area type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} fill="url(#colorProj)" />
                            <Area type="monotone" dataKey="projected" stroke="#3b82f6" strokeDasharray="4 4" strokeWidth={2} fill="none" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 text-white text-center">
                <h3 className="font-bold text-lg mb-2">{t('insights.cta_title')}</h3>
                <h3 className="font-bold text-lg mb-2">{t('insights.cta_title')}</h3>
                <p className="text-white/80 text-sm mb-4">{t('insights.cta_desc')}</p>
                <Link to="/player/training" className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-xl active:scale-95 transition-transform">
                    {t('insights.cta_button')} <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
