import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    Activity, Target, Dumbbell, Utensils, HeartPulse,
    LayoutDashboard, Users, LineChart, ClipboardList
} from 'lucide-react';

interface BottomNavigationProps {
    role: 'player' | 'coach';
}

export default function BottomNavigation({ role }: BottomNavigationProps) {
    const { t } = useTranslation();

    const playerItems = [
        { name: t('nav.home'), path: '/player/home', icon: Activity },
        { name: t('nav.assessment'), path: '/player/assessment', icon: Target },
        { name: t('nav.training'), path: '/player/training', icon: Dumbbell },
        { name: t('nav.nutrition'), path: '/player/nutrition', icon: Utensils },
    ];

    const coachItems = [
        { name: t('nav.general'), path: '/coach/general', icon: LayoutDashboard },
        { name: t('nav.management'), path: '/coach/management', icon: Users },
        { name: t('nav.analysis'), path: '/coach/analysis', icon: LineChart },
        { name: t('nav.programs'), path: '/coach/programs', icon: ClipboardList },
    ];

    const items = role === 'player' ? playerItems : coachItems;
    const accentColor = role === 'player' ? 'text-primary' : 'text-blue-500';

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#09090b]/80 backdrop-blur-xl border-t border-white/5 z-50 flex items-center justify-around px-2">
            {items.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => `
                        flex flex-col items-center justify-center gap-1 transition-all
                        ${isActive ? accentColor : 'text-zinc-500'}
                    `}
                >
                    <item.icon className="w-5 h-5" />
                    <span className="text-[10px] font-black uppercase tracking-tighter italic">
                        {item.name}
                    </span>
                </NavLink>
            ))}
        </nav>
    );
}
