import { type InputHTMLAttributes, forwardRef } from 'react';

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(({ label, error, ...props }, ref) => {
    return (
        <div className="space-y-1.5 w-full">
            <label className="text-sm font-medium text-zinc-400 ml-1">
                {label}
            </label>
            <input
                ref={ref}
                {...props}
                className={`
                    w-full px-4 py-3 bg-zinc-900/50 border rounded-xl text-white placeholder:text-zinc-600
                    focus:outline-none focus:ring-2 transition-all duration-200
                    ${error
                        ? 'border-red-500/50 focus:ring-red-500/20'
                        : 'border-zinc-800 focus:border-emerald-500/50 focus:ring-emerald-500/20'}
                `}
            />
            {error && <p className="text-xs text-red-400 ml-1">{error}</p>}
        </div>
    );
});

AuthInput.displayName = 'AuthInput';

export default AuthInput;
