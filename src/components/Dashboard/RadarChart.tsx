import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Info } from 'lucide-react';

interface RadarChartProps {
    data: {
        physical: number;
        technical: number;
        tactical: number;
        mental: number;
    };
    showBenchmark?: boolean;
}

export default function RadarChart({ data, showBenchmark = false }: RadarChartProps) {
    const { t } = useTranslation();
    const [hoveredPillar, setHoveredPillar] = useState<string | null>(null);
    const [showBenchmarkToggle, setShowBenchmarkToggle] = useState(showBenchmark);

    // Benchmark data (age group average)
    const benchmark = {
        physical: 75,
        technical: 78,
        tactical: 72,
        mental: 76,
    };

    const pillars = [
        { key: 'physical', label: t('card.physical'), value: data.physical, color: 'text-yellow-400', fill: 'fill-yellow-400/20', stroke: 'stroke-yellow-400' },
        { key: 'technical', label: t('card.technical'), value: data.technical, color: 'text-blue-400', fill: 'fill-blue-400/20', stroke: 'stroke-blue-400' },
        { key: 'tactical', label: t('card.tactical'), value: data.tactical, color: 'text-purple-400', fill: 'fill-purple-400/20', stroke: 'stroke-purple-400' },
        { key: 'mental', label: t('card.mental'), value: data.mental, color: 'text-red-400', fill: 'fill-red-400/20', stroke: 'stroke-red-400' },
    ];

    const size = 280;
    const center = size / 2;
    const maxRadius = size / 2 - 40;
    const levels = 5;

    // Calculate point position on radar
    const getPoint = (value: number, index: number, total: number) => {
        const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
        const radius = (value / 100) * maxRadius;
        return {
            x: center + radius * Math.cos(angle),
            y: center + radius * Math.sin(angle),
        };
    };

    // Generate path for data
    const generatePath = (values: number[]) => {
        return values
            .map((value, i) => {
                const point = getPoint(value, i, values.length);
                return `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
            })
            .join(' ') + ' Z';
    };

    const playerPath = generatePath([data.physical, data.technical, data.tactical, data.mental]);
    const benchmarkPath = generatePath([benchmark.physical, benchmark.technical, benchmark.tactical, benchmark.mental]);

    return (
        <div className="bg-card/50 rounded-3xl border border-white/5 p-8">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Performance Radar</h3>
                <button
                    onClick={() => setShowBenchmarkToggle(!showBenchmarkToggle)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${showBenchmarkToggle
                            ? 'bg-primary/20 text-primary border border-primary/30'
                            : 'bg-secondary text-zinc-400 border border-white/5 hover:border-white/10'
                        }`}
                >
                    <Info className="w-3.5 h-3.5" />
                    Show Benchmark
                </button>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* SVG Radar Chart */}
                <div className="relative">
                    <svg width={size} height={size} className="overflow-visible">
                        {/* Background circles (levels) */}
                        {Array.from({ length: levels }).map((_, i) => {
                            const radius = ((i + 1) / levels) * maxRadius;
                            return (
                                <circle
                                    key={i}
                                    cx={center}
                                    cy={center}
                                    r={radius}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                    className="text-white/5"
                                />
                            );
                        })}

                        {/* Axis lines */}
                        {pillars.map((pillar, i) => {
                            const point = getPoint(100, i, pillars.length);
                            return (
                                <line
                                    key={pillar.key}
                                    x1={center}
                                    y1={center}
                                    x2={point.x}
                                    y2={point.y}
                                    stroke="currentColor"
                                    strokeWidth="1"
                                    className="text-white/10"
                                />
                            );
                        })}

                        {/* Benchmark data (dashed) */}
                        {showBenchmarkToggle && (
                            <path
                                d={benchmarkPath}
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeDasharray="4 4"
                                className="text-zinc-500/30 fill-zinc-500/5"
                            />
                        )}

                        {/* Player data */}
                        <path
                            d={playerPath}
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            className="text-primary/40 fill-primary/10 transition-all duration-300"
                        />

                        {/* Data points */}
                        {pillars.map((pillar, i) => {
                            const point = getPoint(pillar.value, i, pillars.length);
                            const isHovered = hoveredPillar === pillar.key;
                            return (
                                <g key={pillar.key}>
                                    <circle
                                        cx={point.x}
                                        cy={point.y}
                                        r={isHovered ? 8 : 5}
                                        fill="currentColor"
                                        className={`${pillar.color} transition-all cursor-pointer`}
                                        onMouseEnter={() => setHoveredPillar(pillar.key)}
                                        onMouseLeave={() => setHoveredPillar(null)}
                                    />
                                    {isHovered && (
                                        <circle
                                            cx={point.x}
                                            cy={point.y}
                                            r={12}
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            className={pillar.stroke}
                                            opacity="0.5"
                                        />
                                    )}
                                </g>
                            );
                        })}

                        {/* Labels */}
                        {pillars.map((pillar, i) => {
                            const point = getPoint(110, i, pillars.length);
                            return (
                                <text
                                    key={`label-${pillar.key}`}
                                    x={point.x}
                                    y={point.y}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    className={`text-xs font-bold ${pillar.color} cursor-pointer`}
                                    onMouseEnter={() => setHoveredPillar(pillar.key)}
                                    onMouseLeave={() => setHoveredPillar(null)}
                                >
                                    {pillar.label}
                                </text>
                            );
                        })}
                    </svg>

                    {/* Hover tooltip */}
                    {hoveredPillar && (
                        <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 bg-card/95 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-2xl z-50 pointer-events-none">
                            {pillars
                                .filter((p) => p.key === hoveredPillar)
                                .map((pillar) => (
                                    <div key={pillar.key} className="text-center">
                                        <div className={`text-2xl font-black ${pillar.color}`}>{pillar.value}</div>
                                        <div className="text-xs text-zinc-400 mt-1">{pillar.label}</div>
                                        {showBenchmarkToggle && (
                                            <div className="text-xs text-zinc-500 mt-2">
                                                Avg: {benchmark[pillar.key as keyof typeof benchmark]}
                                            </div>
                                        )}
                                    </div>
                                ))}
                        </div>
                    )}
                </div>

                {/* Legend */}
                <div className="flex flex-col gap-3 w-full lg:w-auto">
                    {pillars.map((pillar) => (
                        <div
                            key={pillar.key}
                            className={`flex items-center justify-between gap-4 p-3 rounded-xl border transition-all cursor-pointer ${hoveredPillar === pillar.key
                                    ? 'bg-white/5 border-white/20'
                                    : 'bg-secondary/30 border-white/5 hover:bg-white/5'
                                }`}
                            onMouseEnter={() => setHoveredPillar(pillar.key)}
                            onMouseLeave={() => setHoveredPillar(null)}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${pillar.color.replace('text-', 'bg-')}`}></div>
                                <span className="text-sm font-bold text-zinc-300">{pillar.label}</span>
                            </div>
                            <span className={`text-lg font-black ${pillar.color}`}>{pillar.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
