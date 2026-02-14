import { useState } from 'react';
import { X, Moon, Battery, Activity, Brain, Smile } from 'lucide-react';
import type { WellnessLog } from '../../types/medical';

interface WellnessModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Omit<WellnessLog, 'id' | 'date'>) => void;
}

export const WellnessModal = ({ isOpen, onClose, onSubmit }: WellnessModalProps) => {
    const [step, setStep] = useState(0);
    const [data, setData] = useState<Partial<WellnessLog>>({
        sleepQuality: 3,
        fatigueLevel: 3,
        sorenessLevel: 3,
        stressLevel: 3,
        mood: 3
    });

    if (!isOpen) return null;

    const metrics = [
        { key: 'sleepQuality', label: 'How did you sleep?', icon: Moon, minLabel: 'Poor', maxLabel: 'Excellent' },
        { key: 'fatigueLevel', label: 'How fresh do you feel?', icon: Battery, minLabel: 'Exhausted', maxLabel: 'Fresh' },
        { key: 'sorenessLevel', label: 'Muscle Soreness?', icon: Activity, minLabel: 'Very Sore', maxLabel: 'No Pain' },
        { key: 'restingHR', label: 'Resting Heart Rate (BPM)', icon: Activity, min: 40, max: 100, step: 1, unit: 'BPM' },
        { key: 'hrv', label: 'Heart Rate Variability (ms)', icon: Activity, min: 20, max: 120, step: 1, unit: 'ms' },
        { key: 'vo2Max', label: 'Estimated VO2 Max', icon: Activity, min: 30, max: 70, step: 0.1, unit: 'ml/kg/min' },
    ] as const;

    const currentMetric = metrics[step];

    const handleNext = () => {
        if (step < metrics.length - 1) {
            setStep(step + 1);
        } else {
            onSubmit(data as Omit<WellnessLog, 'id' | 'date'>);
            onClose();
            setStep(0); // Reset for next time
        }
    };

    const handleValueChange = (val: number) => {
        setData(prev => ({ ...prev, [currentMetric.key]: val }));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-3xl p-6 relative overflow-hidden">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                >
                    <X className="w-5 h-5 text-zinc-400" />
                </button>

                <div className="mt-4 mb-8 text-center">
                    <div className="w-16 h-16 mx-auto bg-primary/20 rounded-2xl flex items-center justify-center mb-4">
                        <currentMetric.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-black text-white mb-2">{currentMetric.label}</h2>
                    <div className="text-sm text-zinc-400 font-medium">Question {step + 1} of {metrics.length}</div>
                </div>

                <div className="space-y-8">
                    <div className="flex justify-between items-end px-2">
                        <span className="text-xs font-bold text-zinc-500 uppercase">
                            {'minLabel' in currentMetric ? currentMetric.minLabel : `${currentMetric.min} ${currentMetric.unit}`}
                        </span>
                        <span className="text-4xl font-black text-white">
                            {(data as any)[currentMetric.key] || ('min' in currentMetric ? currentMetric.min : 3)}
                            {'unit' in currentMetric && <span className="text-sm ml-1 text-zinc-500">{currentMetric.unit}</span>}
                        </span>
                        <span className="text-xs font-bold text-zinc-500 uppercase">
                            {'maxLabel' in currentMetric ? currentMetric.maxLabel : `${currentMetric.max} ${currentMetric.unit}`}
                        </span>
                    </div>

                    <input
                        type="range"
                        min={'min' in currentMetric ? currentMetric.min : 1}
                        max={'max' in currentMetric ? currentMetric.max : 5}
                        step={'step' in currentMetric ? currentMetric.step : 1}
                        value={(data as any)[currentMetric.key] || ('min' in currentMetric ? currentMetric.min : 3)}
                        onChange={(e) => handleValueChange(parseFloat(e.target.value))}
                        className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary"
                    />

                    {!('unit' in currentMetric) && (
                        <div className="flex gap-2 justify-center">
                            {[1, 2, 3, 4, 5].map(v => (
                                <button
                                    key={v}
                                    onClick={() => handleValueChange(v)}
                                    className={`w-10 h-10 rounded-xl font-bold flex items-center justify-center transition-all ${(data as any)[currentMetric.key] === v
                                        ? 'bg-primary text-black scale-110 shadow-lg shadow-primary/25'
                                        : 'bg-zinc-800 text-zinc-500 hover:bg-zinc-700'
                                        }`}
                                >
                                    {v}
                                </button>
                            ))}
                        </div>
                    )}

                    <button
                        onClick={handleNext}
                        className="w-full py-4 bg-white text-black font-black rounded-xl hover:bg-zinc-200 transition-colors"
                    >
                        {step === metrics.length - 1 ? 'Complete Check-in' : 'Next Question'}
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="absolute top-0 left-0 h-1 bg-primary transition-all duration-300"
                    style={{ width: `${((step + 1) / metrics.length) * 100}%` }}
                />
            </div>
        </div>
    );
};
