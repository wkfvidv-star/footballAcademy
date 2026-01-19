import React from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, Award, Zap, Shield, Target, Brain } from 'lucide-react';

interface PlayerCardProps {
    name: string;
    ovr: number;
    position: string;
    portraitUrl: string;
    nationUrl?: string;
    clubUrl?: string;
    stats: {
        physical: number;
        technical: number;
        tactical: number;
        mental: number;
    };
    trend?: number;
}

export default function PlayerCard({
    name,
    ovr,
    position,
    portraitUrl,
    stats,
    trend = 2.4
}: PlayerCardProps) {
    const { t } = useTranslation();

    return (
        <div className="relative group perspective-1000">
            {/* Main Card Container */}
            <div className="relative w-full max-w-[320px] mx-auto aspect-[3/4] bg-zinc-900 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl transition-all duration-500 group-hover:shadow-primary/20 group-hover:border-primary/30 group-hover:-translate-y-2">

                {/* Background Gradients & Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black z-0"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[60px] -mr-16 -mt-16 group-hover:bg-primary/20 transition-colors duration-500"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[60px] -ml-16 -mb-16 group-hover:bg-blue-500/20 transition-colors duration-500"></div>

                {/* Glassmorphism Overlay */}
                <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-[1px] z-0"></div>

                {/* Card Content */}
                <div className="relative z-10 h-full flex flex-col p-6">

                    {/* Top Section: OVR & Position */}
                    <div className="flex justify-between items-start pt-2">
                        <div className="flex flex-col items-center">
                            <span className="text-5xl font-black text-white tracking-tighter leading-none mb-1">
                                {ovr}
                            </span>
                            <span className="text-zinc-400 font-bold text-lg uppercase tracking-widest border-t border-white/10 pt-1">
                                {position}
                            </span>
                            {trend && (
                                <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
                                    <TrendingUp className="w-2.5 h-2.5" /> +{trend}
                                </div>
                            )}
                        </div>

                        {/* Club/Academy Logo Placeholder */}
                        <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center backdrop-blur-md">
                            <Shield className="w-6 h-6 text-primary" />
                        </div>
                    </div>

                    {/* Player Portrait */}
                    <div className="absolute inset-x-0 top-12 bottom-0 flex justify-center items-end pointer-events-none overflow-hidden">
                        <img
                            src={portraitUrl}
                            alt={name}
                            className="h-[85%] object-contain object-bottom transition-transform duration-700 group-hover:scale-110 drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)]"
                        />
                    </div>

                    {/* Attributes Overlay (Bottom) */}
                    <div className="mt-auto relative bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-4 grid grid-cols-2 gap-y-2 gap-x-6 overflow-hidden">
                        {/* Decorative Line */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[1px] bg-primary/50"></div>

                        <Attribute label={t('card.physical')} value={stats.physical} icon={<Zap className="w-3 h-3" />} />
                        <Attribute label={t('card.technical')} value={stats.technical} icon={<Target className="w-3 h-3" />} />
                        <Attribute label={t('card.tactical')} value={stats.tactical} icon={<Award className="w-3 h-3" />} />
                        <Attribute label={t('card.mental')} value={stats.mental} icon={<Brain className="w-3 h-3" />} />
                    </div>
                </div>

                {/* Player Name Banner (Floating) */}
                <div className="absolute bottom-28 inset-x-0 z-20 flex justify-center">
                    <div className="bg-gradient-to-r from-transparent via-black/80 to-transparent w-full py-1 backdrop-blur-sm border-y border-white/5">
                        <h2 className="text-center text-white font-black text-xl uppercase tracking-widest drop-shadow-lg">
                            {name}
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Attribute({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between group/attr">
            <div className="flex items-center gap-2">
                <span className="text-primary/70 group-hover/attr:text-primary transition-colors">
                    {icon}
                </span>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider group-hover/attr:text-zinc-300 transition-colors">
                    {label}
                </span>
            </div>
            <span className="text-sm font-black text-white group-hover/attr:text-primary transition-colors">
                {value}
            </span>
        </div>
    );
}
