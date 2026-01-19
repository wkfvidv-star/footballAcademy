import { useNavigate } from 'react-router-dom';
import { useAuth, type UserRole } from './AuthContext';
import { useTranslation } from 'react-i18next';
import { Shield, User } from 'lucide-react';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleLogin = (role: UserRole) => {
        if (role === 'coach') navigate('/coach/login');
        else navigate('/player/login');
    };

    return (
        <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4 relative">
            <div className="absolute top-6 right-6 z-50">
                <LanguageSwitcher />
            </div>
            <div className="max-w-md w-full bg-zinc-950 border border-zinc-800 rounded-3xl p-10 space-y-10 relative overflow-hidden group">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl -mr-16 -mt-16 rounded-full group-hover:bg-emerald-500/10 transition-colors duration-1000"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/5 blur-3xl -ml-16 -mb-16 rounded-full group-hover:bg-blue-500/10 transition-colors duration-1000"></div>

                <div className="text-center space-y-3 relative">

                    <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
                        {t('login.title')}
                    </h1>
                    <p className="text-zinc-400 text-lg max-w-[280px] mx-auto leading-relaxed">
                        {t('login.subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 relative">
                    <button
                        onClick={() => handleLogin('coach')}
                        className="group relative flex items-center p-5 bg-zinc-900/50 border border-zinc-800/80 rounded-2xl hover:bg-zinc-800 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <div className="h-14 w-14 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors shadow-inner">
                            <Shield className="w-7 h-7 text-blue-500" />
                        </div>
                        <div className="ml-5 text-left">
                            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{t('login.coach_title')}</h3>
                            <p className="text-sm text-zinc-500">{t('login.coach_desc')}</p>
                        </div>
                    </button>

                    <button
                        onClick={() => handleLogin('player')}
                        className="group relative flex items-center p-5 bg-zinc-900/50 border border-zinc-800/80 rounded-2xl hover:bg-zinc-800 hover:border-emerald-500/50 transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <div className="h-14 w-14 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors shadow-inner">
                            <User className="w-7 h-7 text-emerald-500" />
                        </div>
                        <div className="ml-5 text-left">
                            <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">{t('login.player_title')}</h3>
                            <p className="text-sm text-zinc-500">{t('login.player_desc')}</p>
                        </div>
                    </button>
                </div>

                <div className="text-center text-xs text-zinc-600">
                    {t('login.footer')}
                </div>
            </div>
        </div>
    );
}
