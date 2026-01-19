import { type ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    variant?: 'player' | 'coach';
}

export default function AuthButton({
    children,
    isLoading,
    variant = 'player',
    className = '',
    ...props
}: AuthButtonProps) {
    const variantStyles = {
        player: 'bg-emerald-500 hover:bg-emerald-400 focus:ring-emerald-500/20 text-[#09090b]',
        coach: 'bg-blue-600 hover:bg-blue-500 focus:ring-blue-500/20 text-white'
    };

    return (
        <button
            disabled={isLoading || props.disabled}
            className={`
                w-full py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2
                transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                focus:outline-none focus:ring-4
                ${variantStyles[variant]}
                ${className}
            `}
            {...props}
        >
            {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
                children
            )}
        </button>
    );
}
