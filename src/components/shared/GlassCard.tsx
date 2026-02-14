import React, { type ReactNode } from 'react';
import { type LucideIcon } from 'lucide-react';

interface GlassCardProps {
    title?: string;
    subtitle?: string;
    icon?: LucideIcon;
    children: ReactNode;
    className?: string;
    headerAction?: ReactNode;
    variant?: 'default' | 'primary' | 'muted';
}

export const GlassCard: React.FC<GlassCardProps> = ({
    title,
    subtitle,
    icon: Icon,
    children,
    className = '',
    headerAction,
    variant = 'default'
}) => {
    const variantStyles = {
        default: 'bg-zinc-900/50 border-white/5',
        primary: 'bg-primary/5 border-primary/20',
        muted: 'bg-white/5 border-white/10'
    };

    return (
        <div className={`backdrop-blur-md border rounded-3xl p-6 h-full flex flex-col shadow-xl transition-all hover:border-white/20 ${variantStyles[variant]} ${className}`}>
            {(title || Icon || headerAction) && (
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        {Icon && (
                            <div className={`p-2 rounded-xl ${variant === 'primary' ? 'bg-primary/20' : 'bg-white/5'}`}>
                                <Icon className={`w-5 h-5 ${variant === 'primary' ? 'text-primary' : 'text-zinc-400'}`} />
                            </div>
                        )}
                        <div>
                            {title && (
                                <h3 className="text-lg font-black text-white uppercase tracking-tight italic">
                                    {title}
                                </h3>
                            )}
                            {subtitle && (
                                <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider leading-none mt-0.5">
                                    {subtitle}
                                </p>
                            )}
                        </div>
                    </div>
                    {headerAction && (
                        <div className="flex items-center gap-2">
                            {headerAction}
                        </div>
                    )}
                </div>
            )}
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
};
