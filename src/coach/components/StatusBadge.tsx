import { Activity, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export type PlayerStatus = 'active' | 'injured' | 'rehab' | 'suspended';

interface StatusBadgeProps {
    status: PlayerStatus;
    showLabel?: boolean;
    className?: string;
}

const statusConfig = {
    active: { color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20', icon: CheckCircle2, labelKey: 'common.status.fit' },
    injured: { color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20', icon: AlertTriangle, labelKey: 'common.status.injured' },
    rehab: { color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20', icon: Activity, labelKey: 'common.status.rehab' },
    suspended: { color: 'text-zinc-400', bg: 'bg-zinc-400/10', border: 'border-zinc-400/20', icon: Clock, labelKey: 'common.status.suspended' },
};

export default function StatusBadge({ status, showLabel = true, className = '' }: StatusBadgeProps) {
    const { t } = useTranslation();
    const config = statusConfig[status] || statusConfig.active;
    const Icon = config.icon;

    return (
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${config.bg} ${config.border} ${className}`}>
            <Icon className={`w-3.5 h-3.5 ${config.color}`} />
            {showLabel && <span className={`text-xs font-semibold ${config.color}`}>{t(config.labelKey)}</span>}
        </div>
    );
}
