
import React from 'react';

interface HeatmapProps {
    data: { x: number; y: number; intensity: number }[];
}

export default function Heatmap({ data }: HeatmapProps) {
    return (
        <div className="relative w-full aspect-[2/3] bg-emerald-900/40 rounded-xl border border-white/10 overflow-hidden">
            {/* Pitch Markings */}
            <div className="absolute inset-4 border-2 border-white/20 rounded-lg"></div>
            <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-white/20"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-2 border-white/20 rounded-full"></div>
            {/* Goals / Boxes (simplified) */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-12 border-b-2 border-x-2 border-white/20 rounded-b-lg"></div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-12 border-t-2 border-x-2 border-white/20 rounded-t-lg"></div>

            {/* Heatmap Points */}
            {data.map((point, i) => (
                <div
                    key={i}
                    className="absolute rounded-full blur-xl animate-pulse"
                    style={{
                        left: `${point.x}%`,
                        top: `${point.y}%`,
                        width: '40px',
                        height: '40px',
                        background: `radial-gradient(circle, rgba(239,68,68,${point.intensity}) 0%, rgba(239,68,68,0) 70%)`,
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            ))}
        </div>
    );
}
