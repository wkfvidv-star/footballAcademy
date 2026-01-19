import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useTranslation } from 'react-i18next';
import AuthCard from '../../components/auth/AuthCard';
import AuthInput from '../../components/auth/AuthInput';
import AuthButton from '../../components/auth/AuthButton';
import { Shield, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import LanguageSwitcher from '../../components/LanguageSwitcher';

export default function CoachLogin() {
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const { user, error } = await signIn(email, password);

            if (error) throw new Error(error);

            // Check role
            if (user?.role !== 'coach') {
                // If it's a player trying to log in as coach
                throw new Error('Unauthorized access. This area is for coaches only.');
            }

            navigate('/coach/dashboard');
        } catch (err: any) {
            setError(err.message || 'Failed to sign in');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4 relative">
            <div className="absolute top-6 right-6 z-50">
                <LanguageSwitcher />
            </div>
            <AuthCard variant="coach">
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/10 mb-2">
                        <Shield className="w-8 h-8 text-blue-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">{t('login.coach_title')}</h1>
                    <p className="text-zinc-400">{t('auth.coach_desc')}</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-500 text-sm">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            {error}
                        </div>
                    )}

                    <AuthInput
                        label={t('auth.work_email')}
                        name="email"
                        placeholder="coach@academy.com"
                        type="email"
                        required
                    />
                    <div className="space-y-1">
                        <AuthInput
                            label={t('auth.password')}
                            name="password"
                            placeholder="••••••••"
                            type="password"
                            required
                        />
                        <div className="flex justify-end">
                            <Link
                                to="/coach/forgot-password"
                                className="text-xs text-blue-500 hover:text-blue-400 transition-colors"
                            >
                                {t('auth.forgot_password')}
                            </Link>
                        </div>
                    </div>

                    <AuthButton type="submit" variant="coach" disabled={loading}>
                        {loading ? (
                            <span className="flex items-center gap-2 justify-center">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                {t('auth.signing_in')}
                            </span>
                        ) : (
                            t('auth.signin_portal')
                        )}
                    </AuthButton>
                </form>

                <div className="text-center space-y-4">
                    <p className="text-sm text-zinc-500">
                        {t('auth.new_coach')}{' '}
                        <Link
                            to="/coach/signup"
                            className="text-blue-500 hover:text-blue-400 font-semibold"
                        >
                            {t('auth.request_access')}
                        </Link>
                    </p>

                    <button
                        onClick={() => navigate('/login')}
                        className="text-xs text-zinc-600 hover:text-zinc-400 flex items-center justify-center gap-1 mx-auto transition-colors"
                    >
                        {t('auth.switch_player')}
                        <ArrowRight className="w-3 h-3" />
                    </button>
                </div>
            </AuthCard>
        </div>
    );
}
