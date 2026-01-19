import { LayoutDashboard, TrendingUp, BookOpen, MessageSquare, Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

export default function MobileNav() {
    const { t } = useTranslation();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    const items = [
        { id: 'dashboard', path: '/player/dashboard', label: t('nav.dashboard') || 'Home', icon: LayoutDashboard },
        { id: 'progress', path: '/player/progress', label: t('nav.progress') || 'Progress', icon: TrendingUp },
        { id: 'training', path: '/player/training', label: t('nav.training') || 'Train', icon: BookOpen },
        { id: 'feedback', path: '/player/feedback', label: t('nav.feedback') || 'Feedback', icon: MessageSquare },
        { id: 'goals', path: '/player/goals', label: t('nav.goals') || 'Goals', icon: Trophy },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-[#09090b]/90 backdrop-blur-xl border-t border-white/10 pb-safe z-50">
            <div className="flex justify-around items-center h-16">
                {items.map((item) => {
                    const active = isActive(item.path);
                    return (
                        <Link
                            key={item.id}
                            to={item.path}
                            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${active ? 'text-primary' : 'text-zinc-500'
                                }`}
                        >
                            <div className={`p-1.5 rounded-full transition-colors ${active ? 'bg-primary/20' : 'bg-transparent'}`}>
                                <item.icon className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
