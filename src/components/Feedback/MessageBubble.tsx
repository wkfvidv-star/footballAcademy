interface MessageBubbleProps {
    message: string;
    isCoach: boolean;
    timestamp: string;
}

export default function MessageBubble({ message, isCoach, timestamp }: MessageBubbleProps) {
    return (
        <div className={`flex flex-col ${isCoach ? 'items-start' : 'items-end'}`}>
            <div
                className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${isCoach
                    ? 'bg-secondary text-white rounded-tl-none'
                    : 'bg-primary text-background font-medium rounded-tr-none'
                    }`}
            >
                {message}
            </div>
            <span className="text-[10px] text-zinc-500 mt-1 px-1">
                {isCoach ? 'Coach' : 'You'} • {timestamp}
            </span>
        </div>
    );
}
