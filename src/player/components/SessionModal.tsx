import { useState } from 'react';
import { X, Clock, Zap, Target } from 'lucide-react';
import type { SessionLoad } from '../../types/medical';

interface SessionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Omit<SessionLoad, 'id' | 'date' | 'sRPE'>) => void;
}

export const SessionModal = ({ isOpen, onClose, onSubmit }: SessionModalProps) => {
    const [duration, setDuration] = useState(60);
    const [rpe, setRpe] = useState(5);
    const [type, setType] = useState<SessionLoad['sessionType']>('training');

    if (!isOpen) return null;

    const handleSubmit = () => {
        onSubmit({
            playerId: 'current', // In real app, from auth
            durationMinutes: duration,
            rpe: rpe as any,
            sessionType: type
        });
        onClose();
        // Reset defaults
        setDuration(60);
        setRpe(5);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-sm bg-zinc-900 border border-white/10 rounded-3xl p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                >
                    <X className="w-5 h-5 text-zinc-400" />
                </button>

                <h2 className="text-xl font-black text-white mb-6 pr-8">Log Training Session</h2>

                <div className="space-y-6">
                    {/* Session Type */}
                    <div className="grid grid-cols-2 gap-2">
                        {(['training', 'match', 'gym', 'recovery'] as const).map((t) => (
                            <button
                                key={t}
                                onClick={() => setType(t)}
                                className={`py-2 rounded-xl text-sm font-bold capitalize transition-all ${type === t
                                        ? 'bg-primary text-black'
                                        : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                    {/* Duration */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-bold text-zinc-400 flex items-center gap-2">
                                <Clock className="w-4 h-4" /> Duration (min)
                            </label>
                            <span className="text-xl font-black text-white">{duration}m</span>
                        </div>
                        <input
                            type="range"
                            min="15"
                            max="180"
                            step="15"
                            value={duration}
                            onChange={(e) => setDuration(parseInt(e.target.value))}
                            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                    </div>

                    {/* RPE */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-bold text-zinc-400 flex items-center gap-2">
                                <Zap className="w-4 h-4" /> Intensity (RPE)
                            </label>
                            <div className="flex items-end gap-1">
                                <span className={`text-xl font-black ${rpe >= 8 ? 'text-red-500' : rpe >= 5 ? 'text-amber-500' : 'text-green-500'
                                    }`}>{rpe}</span>
                                <span className="text-xs font-bold text-zinc-500 mb-1">/ 10</span>
                            </div>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            step="1"
                            value={rpe}
                            onChange={(e) => setRpe(parseInt(e.target.value))}
                            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <div className="flex justify-between px-1 mt-2">
                            <span className="text-[10px] font-bold text-zinc-600 uppercase">Very Light</span>
                            <span className="text-[10px] font-bold text-zinc-600 uppercase">Max Effort</span>
                        </div>
                    </div>

                    <div className="pt-2">
                        <div className="bg-zinc-800/50 rounded-xl p-3 mb-4 flex items-center justify-between">
                            <span className="text-xs font-medium text-zinc-400">Estimated Load</span>
                            <span className="text-lg font-black text-white">{duration * rpe} <span className="text-xs font-normal text-zinc-500">AU</span></span>
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full py-4 bg-white text-black font-black rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                        >
                            <Target className="w-5 h-5" />
                            Save Session
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
