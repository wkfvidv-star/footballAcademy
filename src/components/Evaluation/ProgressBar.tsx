interface ProgressBarProps {
    current: number;
    total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
    const progress = Math.min(100, (current / total) * 100);

    return (
        <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden mb-6">
            <div
                className="h-full bg-primary transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
}
