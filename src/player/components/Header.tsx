import { useAuth } from '../../auth/AuthContext';
import { LogOut } from 'lucide-react';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

export default function PlayerHeader() {
    const { user, logout } = useAuth();
    const { t } = useTranslation();

    return (
        <header className="px-6 py-4 flex justify-between items-center bg-gradient-to-b from-primary/10 to-transparent">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 overflow-hidden">
                    {user?.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-500 font-bold">
                            {user?.name?.[0]}
                        </div>
                    )}
                </div>
                <div>
                    <h1 className="text-lg font-bold leading-none text-white">{user?.name}</h1>
                    <p className="text-xs text-zinc-400">{t('header.role')}</p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <button
                    onClick={logout}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                </button>
            </div>
        </header>
    );
}
