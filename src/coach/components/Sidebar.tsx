import { LayoutDashboard, TrendingUp, Users, BarChart3, Filter, Bookmark, Clock, Download, Globe, Settings, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import PlayerSelector from './PlayerSelector';

export default function Sidebar() {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const { logout } = useAuth();

    // Check if path includes key segments to determine "active"
    const isActive = (path: string) => location.pathname.includes(path);

    const [showFilters, setShowFilters] = useState(false);

    // Mock data - replace with actual data from context/props
    const currentPlayer = {
        id: '1',
        name: 'Riadh Necir',
        position: 'RW',
        age: 17,
        ovr: 87
    };

    const players = [
        { id: '1', name: 'Riadh Necir', position: 'RW', age: 17, ovr: 87 },
        { id: '2', name: 'Mohamed Salah', position: 'RW', age: 18, ovr: 89 },
        { id: '3', name: 'Karim Benzema', position: 'ST', age: 17, ovr: 85 },
    ];

    const menuItems = [
        { id: 'dashboard', path: '/coach/dashboard', label: t('nav.dashboard'), icon: LayoutDashboard },
        { id: 'squad', path: '/coach/squad', label: t('coach.sidebar.squad_center'), icon: Users },
        { id: 'progress', path: '/coach/evaluations', label: t('coach.sidebar.evaluations'), icon: TrendingUp },
        { id: 'stats', path: '/coach/analytics', label: t('coach.sidebar.analytics'), icon: BarChart3 },
    ];

    const languages = [
        { code: 'en', label: 'EN' },
        { code: 'ar', label: 'ع' },
        { code: 'fr', label: 'FR' },
    ];

    const quickAccessItems = [
        { id: 'views', label: t('sidebar.savedViews'), icon: Bookmark },
        { id: 'recent', label: t('sidebar.recent'), icon: Clock },
        { id: 'export', label: t('sidebar.export'), icon: Download },
    ];

    return (
        <aside className="hidden lg:flex flex-col w-[240px] h-screen sticky top-0 bg-card/50 border-e border-white/5 backdrop-blur-xl z-20">
            {/* Brand Header */}
            <div className="flex items-center gap-3 p-6 pb-5">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_24px_rgba(34,197,94,0.5)]">
                    <span className="text-background font-black text-lg">F</span>
                </div>
                <span className="text-xl font-bold tracking-tight">{t('login.title')}<span className="text-primary">.</span></span>
            </div>

            {/* Player Selector */}
            <div className="px-5 mb-4">
                <PlayerSelector
                    currentPlayer={currentPlayer}
                    players={players}
                    onSelectPlayer={(player) => console.log('Selected:', player)}
                />
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-5 space-y-1.5 overflow-y-auto">
                {menuItems.map((item) => (
                    <Link
                        key={item.id}
                        to={item.path}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${isActive(item.path)
                            ? 'bg-primary/15 text-primary border border-primary/30 shadow-lg shadow-primary/10'
                            : 'text-zinc-400 hover:bg-white/5 hover:text-white border border-transparent hover:border-white/10'
                            }`}
                    >
                        <item.icon className={`w-4 h-4 transition-colors ${isActive(item.path) ? 'text-primary' : 'text-zinc-500 group-hover:text-primary/70'}`} />
                        <span className="font-semibold text-xs">{item.label}</span>
                    </Link>
                ))}

                {/* Filters Section (Coach Only) */}
                <div className="pt-4 mt-4 border-t border-white/5">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-zinc-400 hover:bg-white/5 hover:text-white transition-all"
                    >
                        <div className="flex items-center gap-2">
                            <Filter className="w-4 h-4" />
                            <span className="font-semibold text-xs">{t('sidebar.filters')}</span>
                        </div>
                        <span className={`text-xs transition-transform ${showFilters ? 'rotate-180' : ''}`}>▼</span>
                    </button>

                    {showFilters && (
                        <div className="mt-2 space-y-3 px-3 py-2">
                            {/* ... kept filters UI simplified for now ... */}
                            <p className="text-xs text-zinc-500">{t('common.noResults')}</p>
                        </div>
                    )}
                </div>

                {/* Quick Access */}
                <div className="pt-4 mt-4 border-t border-white/5">
                    <h4 className="px-3 text-[10px] text-zinc-500 uppercase font-bold mb-2">{t('sidebar.quickAccess')}</h4>
                    {quickAccessItems.map((item) => (
                        <button
                            key={item.id}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-zinc-500 hover:bg-white/5 hover:text-white transition-all text-xs"
                        >
                            <item.icon className="w-3.5 h-3.5" />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </div>
            </nav>

            {/* Footer Section */}
            <div className="p-5 space-y-2.5 border-t border-white/5">
                {/* Language Switcher */}
                <div className="flex items-center gap-2 p-2 bg-secondary/50 rounded-lg">
                    <Globe className="w-3.5 h-3.5 text-zinc-500 ms-1" />
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => i18n.changeLanguage(lang.code)}
                            className={`flex-1 px-2 py-1.5 rounded-md text-[10px] font-bold transition-all ${i18n.language === lang.code
                                ? 'bg-primary text-background shadow-md'
                                : 'text-zinc-500 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {lang.label}
                        </button>
                    ))}
                </div>

                {/* Settings & Logout */}
                <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-zinc-500 hover:bg-white/5 hover:text-white transition-all group">
                    <Settings className="w-4 h-4 group-hover:text-zinc-300" />
                    <span className="font-semibold text-xs">{t('nav.settings')}</span>
                </button>
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-zinc-500 hover:bg-red-500/10 hover:text-red-400 transition-all group"
                >
                    <LogOut className="w-4 h-4 group-hover:text-red-400" />
                    <span className="font-semibold text-xs">{t('nav.logout')}</span>
                </button>
            </div>
        </aside>
    );
}
