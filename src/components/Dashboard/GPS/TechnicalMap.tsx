
import React from 'react';
import { Circle, Square, Triangle, X } from 'lucide-react';

interface TechnicalMapProps {
    data: {
        x: number;
        y: number;
        type: 'pass' | 'shot' | 'interception' | 'tackle';
        outcome: 'success' | 'fail';
    }[];
}

export default function TechnicalMap({ data }: TechnicalMapProps) {
    const getIcon = (type: string) => {
        switch (type) {
            case 'pass': return Circle;
            case 'shot': return Triangle;
            case 'interception': return Square;
            case 'tackle': return X;
            default: return Circle;
        }
    };

    const getColor = (type: string, outcome: string) => {
        const isSuccess = outcome === 'success';
        if (!isSuccess) return 'text-red-500 bg-red-500/20 border-red-500/50';

        switch (type) {
            case 'pass': return 'text-blue-400 bg-blue-400/20 border-blue-400/50';
            case 'shot': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/50';
            case 'interception': return 'text-purple-400 bg-purple-400/20 border-purple-400/50';
            case 'tackle': return 'text-emerald-400 bg-emerald-400/20 border-emerald-400/50';
            default: return 'text-white';
        }
    };

    return (
        <div className="relative w-full aspect-[2/3] bg-emerald-900/40 rounded-xl border border-white/10 overflow-hidden">
            {/* Pitch Markings */}
            <div className="absolute inset-4 border-2 border-white/20 rounded-lg"></div>
            <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-white/20"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-2 border-white/20 rounded-full"></div>
            {/* Goals / Boxes (simplified) */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-12 border-b-2 border-x-2 border-white/20 rounded-b-lg"></div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-12 border-t-2 border-x-2 border-white/20 rounded-t-lg"></div>

            {/* Event Points */}
            {data.map((point, i) => {
                const Icon = getIcon(point.type);
                const colorClass = getColor(point.type, point.outcome);

                return (
                    <div
                        key={i}
                        className={`absolute w-6 h-6 flex items-center justify-center rounded-full border transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-150 cursor-pointer ${colorClass}`}
                        style={{
                            left: `${point.x}%`,
                            top: `${point.y}%`,
                        }}
                        title={`${point.type} (${point.outcome})`}
                    >
                        <Icon size={12} fill="currentColor" className="opacity-80" />
                    </div>
                );
            })}

            {/* Legend */}
            <div className="absolute bottom-2 left-2 right-2 flex justify-between bg-black/60 backdrop-blur-md p-2 rounded-lg text-[10px] text-white/50">
                <div className="flex items-center gap-1"><Circle size={10} className="text-blue-400" /> Pass</div>
                <div className="flex items-center gap-1"><Triangle size={10} className="text-yellow-400" /> Shot</div>
                <div className="flex items-center gap-1"><Square size={10} className="text-purple-400" /> Int.</div>
                <div className="flex items-center gap-1"><X size={10} className="text-emerald-400" /> Tackle</div>
            </div>
        </div>
    );
}
