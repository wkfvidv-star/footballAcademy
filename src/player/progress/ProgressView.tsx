import { Area, AreaChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Activity, ArrowUpRight, TrendingUp, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const progressData = [
    { name: 'W1', score: 82 },
    { name: 'W2', score: 84 },
    { name: 'W3', score: 83 },
    { name: 'W4', score: 87 },
];

export default function ProgressView() {
    const { t } = useTranslation();

    const radarData = [
        { subject: t('progress_view.pace'), A: 85, fullMark: 100 },
        { subject: t('progress_view.shoot'), A: 78, fullMark: 100 },
        { subject: t('progress_view.pass'), A: 82, fullMark: 100 },
        { subject: t('progress_view.dribble'), A: 88, fullMark: 100 },
        { subject: t('progress_view.def'), A: 65, fullMark: 100 },
        { subject: t('progress_view.phys'), A: 80, fullMark: 100 },
    ];

    return (
        <div className="space-y-6 pb-24">
            <div className="px-2">
                <h1 className="text-2xl font-black text-white tracking-tight">{t('progress_view.title')}</h1>
                <p className="text-zinc-400 text-sm font-medium">{t('progress_view.subtitle')}</p>
            </div>

            {/* Main Insight Card */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 shadow-xl shadow-indigo-500/10 text-white relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                        <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                            <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <Link to="/player/insights" className="bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-1.5 rounded-lg backdrop-blur-sm transition-colors">
                            {t('progress_view.deep_dive')}
                        </Link>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="bg-green-400 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-md">+8%</span>
                        <h3 className="text-lg font-bold">{t('progress_view.endurance_surge')}</h3>
                    </div>
                    <p className="text-sm opacity-90 leading-relaxed">
                        {t('progress_view.endurance_msg')}
                    </p>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
            </div>

            {/* Radar Chart Section */}
            <div className="bg-zinc-900 border border-white/5 rounded-3xl p-4">
                <div className="text-sm font-bold text-white mb-4 px-2">{t('progress_view.attribute_breakdown')}</div>
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                            <PolarGrid stroke="#333" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 'bold' }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                            <Radar
                                name="Player"
                                dataKey="A"
                                stroke="#3b82f6"
                                strokeWidth={3}
                                fill="#3b82f6"
                                fillOpacity={0.3}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Progress Timeline */}
            <div className="bg-zinc-900 border border-white/5 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="text-sm font-bold text-white">{t('progress_view.overall_trend')}</div>
                    <div className="text-xs text-green-400 font-bold flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3" /> {t('progress_view.last_4_weeks')}
                    </div>
                </div>
                <div className="h-[150px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={progressData}>
                            <defs>
                                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#52525b', fontSize: 12 }} dy={10} />
                            <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
                            <Area type="monotone" dataKey="score" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
                {[
                    { label: t('progress_view.top_speed'), value: '31.2', unit: 'km/h', icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
                    { label: t('progress_view.stamina'), value: '11.5', unit: 'km', icon: Activity, color: 'text-red-400', bg: 'bg-red-400/10' },
                ].map((stat, i) => ( // Using Activity imported below implicitly or needs import
                    <div key={i} className="bg-zinc-900 border border-white/5 p-4 rounded-3xl flex flex-col justify-between h-32">
                        <div className={`p-2 w-fit rounded-xl ${stat.bg}`}>
                            <stat.icon className={`w-5 h-5 ${stat.color}`} />
                        </div>
                        <div>
                            <div className="text-2xl font-black text-white">
                                {stat.value} <span className="text-xs font-medium text-zinc-500">{stat.unit}</span>
                            </div>
                            <div className="text-xs text-zinc-400 font-medium">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


