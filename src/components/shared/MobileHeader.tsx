import React from 'react';
import { Menu, X, Activity } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface MobileHeaderProps {
    isOpen: boolean;
    onToggle: () => void;
    role: 'player' | 'coach';
}

export default function MobileHeader({ isOpen, onToggle, role }: MobileHeaderProps) {
    const { t } = useTranslation();

    return (
        <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#09090b]/80 backdrop-blur-xl border-b border-white/5 z-[60] px-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg ${role === 'player' ? 'bg-primary' : 'bg-blue-600'} flex items-center justify-center`}>
                    <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                    <span className="text-lg font-black text-white italic tracking-tighter uppercase">اكاديمية.</span>
                </div>
            </div>

            <button
                onClick={onToggle}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-white active:scale-90 transition-transform"
                aria-label="Toggle Menu"
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
        </header>
    );
}
