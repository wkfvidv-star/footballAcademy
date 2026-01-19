import { type ReactNode } from 'react';

interface AuthCardProps {
    children: ReactNode;
    variant?: 'player' | 'coach';
}

export default function AuthCard({ children, variant = 'player' }: AuthCardProps) {
    const accentColor = variant === 'player' ? 'emerald' : 'blue';

    return (
        <div className="relative group w-full max-w-md">
            {/* Ambient Glow */}
            <div className={`absolute -inset-0.5 bg-gradient-to-r from-${accentColor}-500/20 to-${accentColor}-600/20 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200`}></div>

            <div className="relative bg-zinc-950 border border-zinc-800 rounded-2xl p-8 space-y-8 backdrop-blur-sm">
                {children}
            </div>
        </div>
    );
}
