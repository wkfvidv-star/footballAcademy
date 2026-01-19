import { Link, useNavigate } from 'react-router-dom';
import AuthCard from '../../components/auth/AuthCard';
import AuthInput from '../../components/auth/AuthInput';
import AuthButton from '../../components/auth/AuthButton';
import { KeyRound, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export default function CoachForgotPassword() {
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4">
            <AuthCard variant="coach">
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/10 mb-2">
                        <KeyRound className="w-8 h-8 text-blue-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Coach Recovery</h1>
                    <p className="text-zinc-400">
                        {submitted
                            ? "Check your work email for instructions"
                            : "Enter your email to reset your portal access"}
                    </p>
                </div>

                {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <AuthInput
                            label="Work Email"
                            placeholder="coach@academy.com"
                            type="email"
                            required
                        />

                        <AuthButton type="submit" variant="coach">
                            Send Reset Link
                        </AuthButton>
                    </form>
                ) : (
                    <div className="space-y-6 text-center">
                        <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                            <p className="text-sm text-blue-400">
                                If a coach account exists with that email, you will receive a password reset link shortly.
                            </p>
                        </div>
                        <AuthButton onClick={() => navigate('/coach/login')} variant="coach">
                            Back to Login
                        </AuthButton>
                    </div>
                )}

                <button
                    onClick={() => navigate('/coach/login')}
                    className="absolute top-8 left-8 text-zinc-500 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
            </AuthCard>
        </div>
    );
}
