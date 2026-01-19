import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, TrendingUp, TrendingDown, Minus, Activity, Brain, Zap } from 'lucide-react';

interface Player {
    id: string;
    name: string;
    position: string;
    age: number;
    ovr: number;
    physical: number;
    technical: number;
    tactical: number;
    mental: number;
}

interface ComparisonViewProps {
    players: Player[];
    onRemovePlayer: (playerId: string) => void;
    onAddPlayer?: () => void;
    maxPlayers?: number;
}

export default function ComparisonView({
    players,
    onRemovePlayer,
    onAddPlayer,
    maxPlayers = 2
}: ComparisonViewProps) {
    const { t } = useTranslation();
    const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);

    if (players.length === 0) {
        return (
            <div className="text-center py-12 bg-card/30 rounded-3xl border border-white/5">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Activity className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-zinc-400 mb-2">{t('comparison.noPlayersSelected')}</h3>
                <p className="text-sm text-zinc-500 mb-4">{t('comparison.selectToCompare')}</p>
                {onAddPlayer && (
                    <button onClick={onAddPlayer} className="btn-primary">
                        {t('comparison.selectPlayers')}
                    </button>
                )}
            </div>
        );
    }

    const metrics = [
        { key: 'physical', label: t('card.physical'), icon: Zap, color: 'text-yellow-400', bgColor: 'bg-yellow-400' },
        { key: 'technical', label: t('card.technical'), icon: Activity, color: 'text-blue-400', bgColor: 'bg-blue-400' },
        { key: 'tactical', label: t('card.tactical'), icon: Brain, color: 'text-purple-400', bgColor: 'bg-purple-400' },
        { key: 'mental', label: t('card.mental'), icon: TrendingUp, color: 'text-red-400', bgColor: 'bg-red-400' },
    ];

    const getDifferential = (player1Value: number, player2Value: number) => {
        const diff = player1Value - player2Value;
        if (Math.abs(diff) < 2) return { icon: Minus, color: 'text-zinc-500', value: diff };
        if (diff > 0) return { icon: TrendingUp, color: 'text-emerald-400', value: diff };
        return { icon: TrendingDown, color: 'text-red-400', value: diff };
    };

    return (
        <div className="space-y-6">
            {/* Player Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {players.map((player, index) => (
                    <div
                        key={player.id}
                        className="bg-card/50 rounded-3xl border border-white/5 p-8 relative overflow-hidden group"
                    >
                        {/* Decorative gradient */}
                        <div className="absolute top-0 end-0 w-32 h-32 bg-primary/10 blur-[50px] rounded-full pointer-events-none" />

                        {/* Remove button */}
                        <button
                            onClick={() => onRemovePlayer(player.id)}
                            className="absolute top-4 end-4 p-2 rounded-lg bg-secondary hover:bg-red-500/20 text-zinc-500 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100"
                            aria-label={`Remove ${player.name}`}
                        >
                            <X className="w-4 h-4" />
                        </button>

                        {/* Player Header */}
                        <div className="relative z-10 mb-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-16 h-16 rounded-full bg-secondary border-2 border-primary flex items-center justify-center">
                                    <span className="text-2xl font-bold">{player.name.charAt(0)}</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold mb-1">{player.name}</h3>
                                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                                        <span className="px-2 py-0.5 rounded-full bg-secondary text-primary text-xs font-semibold">
                                            {player.position}
                                        </span>
                                        <div className="text-xs text-zinc-400">
                                            {player.position} • {player.age} {t('common.years')} • {player.ovr} OVR
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* OVR Score */}
                            <div className="flex items-end gap-2">
                                <div className="text-5xl font-black text-white tracking-tighter">
                                    {player.ovr}
                                </div>
                                <div className="mb-1">
                                    <span className="text-lg text-primary font-bold">OVR</span>
                                </div>
                            </div>
                        </div>

                        {/* Metrics */}
                        <div className="space-y-3 relative z-10">
                            {metrics.map((metric) => {
                                const value = player[metric.key as keyof Player] as number;
                                return (
                                    <div
                                        key={metric.key}
                                        className={`p-3 rounded-xl border transition-all ${hoveredMetric === metric.key
                                            ? 'bg-white/5 border-white/20'
                                            : 'bg-secondary/30 border-white/5'
                                            }`}
                                        onMouseEnter={() => setHoveredMetric(metric.key)}
                                        onMouseLeave={() => setHoveredMetric(null)}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <metric.icon className={`w-4 h-4 ${metric.color}`} />
                                                <span className="text-sm font-bold text-zinc-300">{metric.label}</span>
                                            </div>
                                            <span className={`text-lg font-black ${metric.color}`}>{value}</span>
                                        </div>
                                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${metric.bgColor} rounded-full transition-all duration-1000`}
                                                style={{ width: `${value}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

                {/* Add Player Card */}
                {players.length < maxPlayers && onAddPlayer && (
                    <button
                        onClick={onAddPlayer}
                        className="bg-card/30 rounded-3xl border-2 border-dashed border-white/10 hover:border-primary/30 hover:bg-card/50 transition-all p-8 flex flex-col items-center justify-center gap-4 min-h-[400px]"
                    >
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-3xl text-primary">+</span>
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg font-bold text-zinc-400 mb-1">{t('comparison.addPlayer')}</h3>
                            <p className="text-sm text-zinc-500">{t('comparison.compareUpTo', { max: maxPlayers })}</p>
                        </div>
                    </button>
                )}
            </div>

            {/* Differential Analysis */}
            {players.length === 2 && (
                <div className="bg-card/50 rounded-3xl border border-white/5 p-8">
                    <h3 className="text-xl font-bold mb-6">{t('comparison.differential')}</h3>
                    <div className="space-y-4">
                        {metrics.map((metric) => {
                            const player1Value = players[0][metric.key as keyof Player] as number;
                            const player2Value = players[1][metric.key as keyof Player] as number;
                            const diff = getDifferential(player1Value, player2Value);

                            return (
                                <div
                                    key={metric.key}
                                    className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 border border-white/5 hover:bg-white/5 transition-colors"
                                >
                                    <metric.icon className={`w-5 h-5 ${metric.color}`} />
                                    <span className="flex-1 font-bold text-zinc-300">{metric.label}</span>

                                    {/* Player 1 */}
                                    <div className="text-center min-w-[60px]">
                                        <div className={`text-lg font-black ${metric.color}`}>{player1Value}</div>
                                        <div className="text-xs text-zinc-500">{players[0].name.split(' ')[0]}</div>
                                    </div>

                                    {/* Differential */}
                                    <div className={`flex items-center gap-1 min-w-[80px] justify-center ${diff.color}`}>
                                        <diff.icon className="w-4 h-4" />
                                        <span className="font-bold">
                                            {diff.value > 0 ? '+' : ''}
                                            {diff.value.toFixed(0)}
                                        </span>
                                    </div>

                                    {/* Player 2 */}
                                    <div className="text-center min-w-[60px]">
                                        <div className={`text-lg font-black ${metric.color}`}>{player2Value}</div>
                                        <div className="text-xs text-zinc-500">{players[1].name.split(' ')[0]}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Summary */}
                    <div className="mt-6 p-4 bg-primary/10 border border-primary/30 rounded-xl">
                        <h4 className="text-sm font-bold text-primary mb-2">{t('comparison.keyInsights')}</h4>
                        <ul className="space-y-1 text-sm text-zinc-300">
                            {metrics.map((metric) => {
                                const player1Value = players[0][metric.key as keyof Player] as number;
                                const player2Value = players[1][metric.key as keyof Player] as number;
                                const diff = player1Value - player2Value;

                                if (Math.abs(diff) >= 5) {
                                    const leader = diff > 0 ? players[0].name.split(' ')[0] : players[1].name.split(' ')[0];
                                    return (
                                        <li key={metric.key} className="flex items-start gap-2">
                                            <span className="text-primary">•</span>
                                            <span>
                                                {t('comparison.leadsBy', {
                                                    leader: leader,
                                                    metric: metric.label.toLowerCase(),
                                                    points: Math.abs(diff).toFixed(0)
                                                })}
                                            </span>
                                        </li>
                                    );
                                }
                                return null;
                            }).filter(Boolean)}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
