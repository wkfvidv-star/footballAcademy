import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    Activity, Target, Dumbbell, Utensils, HeartPulse, AlertCircle, BookOpen,
    LayoutDashboard, Users, LineChart, ClipboardList, LogOut, ChevronRight
} from 'lucide-react';
import { useAuth } from '../../auth/AuthContext';

interface SidebarProps {
    role: 'player' | 'coach';
}

export default function Sidebar({ role }: SidebarProps) {
    const { t } = useTranslation();
    const { logout } = useAuth();
    const location = useLocation();

    const playerItems = [
        { name: t('nav.home'), path: '/player/home', icon: Activity },
        { name: t('nav.assessment'), path: '/player/assessment', icon: Target },
        { name: t('nav.training'), path: '/player/training', icon: Dumbbell },
        { name: t('nav.nutrition'), path: '/player/nutrition', icon: Utensils },
        { name: t('nav.recovery'), path: '/player/recovery', icon: HeartPulse },
        { name: t('nav.injury'), path: '/player/injury', icon: AlertCircle },
        { name: t('nav.culture'), path: '/player/culture', icon: BookOpen },
    ];

    const coachItems = [
        { name: t('nav.general'), path: '/coach/general', icon: LayoutDashboard },
        { name: t('nav.management'), path: '/coach/management', icon: Users },
        { name: t('nav.analysis'), path: '/coach/analysis', icon: LineChart },
        { name: t('nav.programs'), path: '/coach/programs', icon: ClipboardList },
        { name: t('nav.injury'), path: '/coach/injury', icon: AlertCircle },
        { name: t('nav.nutrition'), path: '/coach/nutrition', icon: Utensils },
    ];

    const items = role === 'player' ? playerItems : coachItems;
    const accentColor = role === 'player' ? 'text-primary' : 'text-blue-500';
    const activeBg = role === 'player' ? 'bg-primary/10' : 'bg-blue-500/10';
    const activeBorder = role === 'player' ? 'border-primary' : 'border-blue-500';

    return (
        <aside className="w-72 h-screen fixed left-0 top-0 bg-[#09090b] border-r border-white/5 flex flex-col z-50">
            <div className="p-8">
                <div className="flex items-center gap-3 mb-10">
                    <div className={`w-10 h-10 rounded-xl ${role === 'player' ? 'bg-primary' : 'bg-blue-600'} flex items-center justify-center`}>
                        <Activity className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <span className="text-xl font-black text-white italic tracking-tighter uppercase">Radiant</span>
                        <div className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] -mt-1">{t(`header.${role}`)}</div>
                    </div>
                </div>

                <nav className="space-y-2">
                    {items.map((item) => {
                        const isActive = location.pathname.startsWith(item.path);
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) => `
                                    flex items-center justify-between p-4 rounded-2xl transition-all group
                                    ${isActive ? `${activeBg} border ${activeBorder}/20` : 'hover:bg-white/5 border border-transparent'}
                                `}
                            >
                                <div className="flex items-center gap-4">
                                    <item.icon className={`w-5 h-5 ${isActive ? accentColor : 'text-zinc-500 group-hover:text-zinc-300'} transition-colors`} />
                                    <span className={`text-sm font-black uppercase italic tracking-tighter ${isActive ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
                                        {item.name}
                                    </span>
                                </div>
                                {isActive && <ChevronRight className={`w-4 h-4 ${accentColor}`} />}
                            </NavLink>
                        );
                    })}
                </nav>
            </div>

            <div className="mt-auto p-8 border-t border-white/5">
                <button
                    onClick={logout}
                    className="flex items-center gap-4 w-full p-4 rounded-2xl hover:bg-red-500/10 group transition-all"
                >
                    <LogOut className="w-5 h-5 text-zinc-500 group-hover:text-red-500 transition-colors" />
                    <span className="text-sm font-black uppercase italic tracking-tighter text-zinc-500 group-hover:text-red-500">{t('nav.logout')}</span>
                </button>
            </div>
        </aside>
    );
}
