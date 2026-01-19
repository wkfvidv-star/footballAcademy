import { Link, useNavigate } from 'react-router-dom';
import AuthCard from '../../components/auth/AuthCard';
import AuthInput from '../../components/auth/AuthInput';
import AuthButton from '../../components/auth/AuthButton';
import { KeyRound, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export default function PlayerForgotPassword() {
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4">
            <AuthCard variant="player">
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 mb-2">
                        <KeyRound className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Recovery</h1>
                    <p className="text-zinc-400">
                        {submitted
                            ? "Check your email for recovery instructions"
                            : "Enter your email to reset your password"}
                    </p>
                </div>

                {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <AuthInput
                            label="Email Address"
                            placeholder="player@academy.com"
                            type="email"
                            required
                        />

                        <AuthButton type="submit" variant="player">
                            Send Reset Link
                        </AuthButton>
                    </form>
                ) : (
                    <div className="space-y-6 text-center">
                        <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                            <p className="text-sm text-emerald-400">
                                If an account exists with that email, you will receive a password reset link shortly.
                            </p>
                        </div>
                        <AuthButton onClick={() => navigate('/player/login')} variant="player">
                            Back to Login
                        </AuthButton>
                    </div>
                )}

                <button
                    onClick={() => navigate('/player/login')}
                    className="absolute top-8 left-8 text-zinc-500 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
            </AuthCard>
        </div>
    );
}
