
import React from 'react';
import { Activity, Gauge, Zap, Flame } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface GPSStatsProps {
    data: {
        totalDistance: number;
        topSpeed: number;
        sprints: number;
    };
}

export default function GPSStats({ data }: GPSStatsProps) {
    const { t } = useTranslation();
    const stats = [
        { label: t('gps.total_distance'), value: `${data.totalDistance} km`, icon: Activity, color: 'text-blue-400', bg: 'bg-blue-400/10' },
        { label: t('gps.top_speed'), value: `${data.topSpeed} km/h`, icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
        { label: t('gps.sprints'), value: data.sprints, icon: Flame, color: 'text-orange-400', bg: 'bg-orange-400/10' },
        { label: t('gps.accels_decels'), value: `${(data as any).accelerations || 24} / ${(data as any).decelerations || 18}`, icon: Gauge, color: 'text-purple-400', bg: 'bg-purple-400/10' },
        { label: t('gps.hi_running'), value: `${(data as any).hiIntensityRunning || 1.2} km`, icon: Activity, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    ];

    return (
        <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
                <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-xl flex flex-col gap-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.bg} ${stat.color}`}>
                        <stat.icon size={16} />
                    </div>
                    <div>
                        <div className="text-xl font-bold">{stat.value}</div>
                        <div className="text-xs text-zinc-400">{stat.label}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
