import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

import AuthCard from '../../components/auth/AuthCard';
import AuthInput from '../../components/auth/AuthInput';
import AuthButton from '../../components/auth/AuthButton';
import { UserPlus, ArrowLeft, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function PlayerSignup() {
    const { signUp } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const firstName = formData.get('firstName') as string;
        const lastName = formData.get('lastName') as string;

        try {
            const { error } = await signUp(
                email,
                password,
                'player',
                `${firstName} ${lastName}`
            );

            if (error) throw new Error(error);
            setSuccess(true);
        } catch (err: any) {
            setError(err.message || 'Failed to create account');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4">
                <AuthCard variant="player">
                    <div className="text-center space-y-4 py-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto">
                            <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Check Your Email</h2>
                        <p className="text-zinc-400 text-sm max-w-xs mx-auto">
                            We've sent a verification link to your email address. Please click the link to activate your account.
                        </p>
                        <div className="pt-4">
                            <Link
                                to="/player/login"
                                className="inline-flex items-center justify-center px-6 py-2 rounded-xl bg-zinc-800 text-emerald-500 hover:bg-zinc-700 transition-colors text-sm font-medium"
                            >
                                Back to Login
                            </Link>
                        </div>
                    </div>
                </AuthCard>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4">
            <AuthCard variant="player">
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 mb-2">
                        <UserPlus className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Create Player Account</h1>
                    <p className="text-zinc-400">Join the academy and start your journey</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-4">
                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-500 text-sm">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <AuthInput
                            label="First Name"
                            name="firstName"
                            placeholder="Leo"
                            required
                        />
                        <AuthInput
                            label="Last Name"
                            name="lastName"
                            placeholder="Messi"
                            required
                        />
                    </div>
                    <AuthInput
                        label="Email Address"
                        name="email"
                        placeholder="player@academy.com"
                        type="email"
                        required
                    />
                    <AuthInput
                        label="Password"
                        name="password"
                        placeholder="••••••••"
                        type="password"
                        required
                    />
                    <p className="text-[10px] text-zinc-500 leading-tight">
                        By creating an account, you agree to our Terms of Service and Privacy Policy.
                    </p>

                    <AuthButton type="submit" variant="player" disabled={loading}>
                        {loading ? (
                            <span className="flex items-center gap-2 justify-center">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Creating Account...
                            </span>
                        ) : (
                            'Create Account'
                        )}
                    </AuthButton>
                </form>

                <div className="text-center">
                    <p className="text-sm text-zinc-500">
                        Already have an account?{' '}
                        <Link
                            to="/player/login"
                            className="text-emerald-500 hover:text-emerald-400 font-semibold"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>

                <button
                    onClick={() => navigate('/login')}
                    className="absolute top-8 left-8 text-zinc-500 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
            </AuthCard>
        </div>
    );
}
