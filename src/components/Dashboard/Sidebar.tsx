import { LayoutDashboard, TrendingUp, BookOpen, Utensils, MessageSquare, LogOut, Settings, Globe, Users, BarChart3, Filter, Bookmark, Clock, Download, Calendar, Save, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import PlayerSelector from './PlayerSelector';

interface SidebarProps {
    onNavigate: (view: 'dashboard' | 'progress' | 'training' | 'nutrition' | 'feedback') => void;
    currentView: string;
}

export default function Sidebar({ onNavigate, currentView }: SidebarProps) {
    const { t, i18n } = useTranslation();
    const [showFilters, setShowFilters] = useState(false);
    const [showSavedViews, setShowSavedViews] = useState(false);
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [performanceThreshold, setPerformanceThreshold] = useState(70);

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

    const savedViews = [
        { id: '1', name: 'U17 Prospects', filters: 3 },
        { id: '2', name: 'High Performers', filters: 2 },
        { id: '3', name: 'Needs Attention', filters: 4 },
    ];

    const menuItems = [
        { id: 'dashboard', label: t('nav.dashboard'), icon: LayoutDashboard },
        { id: 'squad', label: t('nav.squad'), icon: Users },
        { id: 'progress', label: t('progress.title'), icon: TrendingUp },
        { id: 'stats', label: t('nav.stats'), icon: BarChart3 },
        { id: 'training', label: t('actions.plans'), icon: BookOpen },
        { id: 'nutrition', label: t('actions.nutrition'), icon: Utensils },
        { id: 'feedback', label: t('actions.feedback'), icon: MessageSquare },
    ];

    const languages = [
        { code: 'en', label: 'EN' },
        { code: 'ar', label: 'ع' },
        { code: 'fr', label: 'FR' },
    ];

    const quickAccessItems = [
        { label: t('sidebar.savedViews'), icon: Bookmark },
        { label: t('sidebar.recent'), icon: Clock },
        { label: t('sidebar.export'), icon: Download },
    ];

    return (
        <aside className="hidden lg:flex flex-col w-[240px] h-screen sticky top-0 bg-card/50 border-e border-white/5 backdrop-blur-xl z-20">
            {/* Brand Header */}
            <div className="flex items-center gap-3 p-6 pb-5">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_24px_rgba(34,197,94,0.5)]">
                    <span className="text-background font-black text-lg">F</span>
                </div>
                <span className="text-xl font-bold tracking-tight">{t('app.title')}<span className="text-primary">.</span></span>
            </div>

            {/* Player Selector */}
            <div className="px-5 mb-4">
                <PlayerSelector
                    currentPlayer={currentPlayer}
                    players={players}
                    onSelectPlayer={(player) => console.log('Selected:', player)}
                    onSelectSquadView={() => onNavigate('squad' as any)}
                />
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-5 space-y-1.5 overflow-y-auto">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onNavigate(item.id as any)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${currentView === item.id
                            ? 'bg-primary/15 text-primary border border-primary/30 shadow-lg shadow-primary/10'
                            : 'text-zinc-400 hover:bg-white/5 hover:text-white border border-transparent hover:border-white/10'
                            }`}
                    >
                        <item.icon className={`w-4 h-4 transition-colors ${currentView === item.id ? 'text-primary' : 'text-zinc-500 group-hover:text-primary/70'}`} />
                        <span className="font-semibold text-xs">{item.label}</span>
                    </button>
                ))}

                {/* Filters Section */}
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
                            <div>
                                <label className="text-[10px] text-zinc-500 uppercase font-bold mb-1 block">{t('sidebar.ageRange')}</label>
                                <div className="flex gap-2">
                                    <input type="number" placeholder={t('sidebar.minPlaceholder')} className="w-full px-2 py-1 bg-secondary/50 border border-white/5 rounded text-xs text-white focus:outline-none focus:border-primary/30" />
                                    <input type="number" placeholder={t('sidebar.maxPlaceholder')} className="w-full px-2 py-1 bg-secondary/50 border border-white/5 rounded text-xs text-white focus:outline-none focus:border-primary/30" />
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] text-zinc-500 uppercase font-bold mb-1 block">{t('sidebar.position')}</label>
                                <div className="grid grid-cols-2 gap-1">
                                    {['GK', 'DEF', 'MID', 'FWD'].map((pos) => (
                                        <label key={pos} className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white cursor-pointer">
                                            <input type="checkbox" className="w-3 h-3 rounded accent-primary" />
                                            {pos}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] text-zinc-500 uppercase font-bold mb-1 block">{t('sidebar.dateRange')}</label>
                                <div className="space-y-2">
                                    <div className="relative">
                                        <Calendar className="absolute start-2 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-500" />
                                        <input
                                            type="date"
                                            value={dateRange.start}
                                            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                                            className="w-full ps-7 pe-2 py-1 bg-secondary/50 border border-white/5 rounded text-xs text-white focus:outline-none focus:border-primary/30"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Calendar className="absolute start-2 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-500" />
                                        <input
                                            type="date"
                                            value={dateRange.end}
                                            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                                            className="w-full ps-7 pe-2 py-1 bg-secondary/50 border border-white/5 rounded text-xs text-white focus:outline-none focus:border-primary/30"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] text-zinc-500 uppercase font-bold mb-1 block">
                                    {t('sidebar.minOvr')}: {performanceThreshold}
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={performanceThreshold}
                                    onChange={(e) => setPerformanceThreshold(Number(e.target.value))}
                                    className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                            </div>
                            <button className="w-full px-3 py-1.5 bg-primary/20 hover:bg-primary/30 rounded-lg text-xs font-bold text-primary transition-colors flex items-center justify-center gap-1.5">
                                <Save className="w-3 h-3" />
                                {t('sidebar.saveView')}
                            </button>
                        </div>
                    )}
                </div>

                {/* Saved Views */}
                <div className="pt-4 mt-4 border-t border-white/5">
                    <button
                        onClick={() => setShowSavedViews(!showSavedViews)}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-zinc-400 hover:bg-white/5 hover:text-white transition-all"
                    >
                        <div className="flex items-center gap-2">
                            <Bookmark className="w-4 h-4" />
                            <span className="font-semibold text-xs">{t('sidebar.savedViews')}</span>
                        </div>
                        <span className={`text-xs transition-transform ${showSavedViews ? 'rotate-180' : ''}`}>▼</span>
                    </button>

                    {showSavedViews && (
                        <div className="mt-2 space-y-1">
                            {savedViews.map((view) => (
                                <button
                                    key={view.id}
                                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-zinc-500 hover:bg-white/5 hover:text-white transition-all group"
                                >
                                    <span className="text-xs font-medium">{view.name}</span>
                                    <div className="flex items-center gap-1">
                                        <span className="text-[10px] text-zinc-600">{t('sidebar.filtersCount', { count: view.filters })}</span>
                                        <X className="w-3 h-3 opacity-0 group-hover:opacity-100 text-red-400" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Quick Access */}
                <div className="pt-4 mt-4 border-t border-white/5">
                    <h4 className="px-3 text-[10px] text-zinc-500 uppercase font-bold mb-2">{t('sidebar.quickAccess')}</h4>
                    {quickAccessItems.map((item) => (
                        <button
                            key={item.label}
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
                <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-zinc-500 hover:bg-red-500/10 hover:text-red-400 transition-all group">
                    <LogOut className="w-4 h-4 group-hover:text-red-400" />
                    <span className="font-semibold text-xs">{t('nav.logout')}</span>
                </button>
            </div>
        </aside>
    );
}
