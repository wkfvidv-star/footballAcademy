import { useState } from 'react';
import { X, Save } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface TechnicalTestModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (result: any) => void;
}

export const TechnicalTestModal = ({ isOpen, onClose, onSubmit }: TechnicalTestModalProps) => {
    const { t } = useTranslation();
    const [selectedTest, setSelectedTest] = useState('TEC_PAS_SHORT');
    const [value, setValue] = useState('');
    const [coachNotes, setCoachNotes] = useState('');
    const [validation, setValidation] = useState<'verified' | 'adjustment_needed'>('verified');

    const tests = [
        { id: 'TEC_PAS_SHORT', label: t('technical_tests.tests.TEC_PAS_SHORT'), unit: 'x/10' },
        { id: 'TEC_PAS_LONG', label: t('technical_tests.tests.TEC_PAS_LONG'), unit: 'x/10' },
        { id: 'TEC_CTL_TOUCH', label: t('technical_tests.tests.TEC_CTL_TOUCH'), unit: 'Rating 1-10' },
        { id: 'TEC_DRI_SLALOM', label: t('technical_tests.tests.TEC_DRI_SLALOM'), unit: 'sec' },
        { id: 'TEC_SHO_ACC', label: t('technical_tests.tests.TEC_SHO_ACC'), unit: 'x/10' },
        { id: 'TEC_CRO_ACC', label: t('technical_tests.tests.TEC_CRO_ACC'), unit: 'x/10' },
    ];

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!value) return;

        let adjustment = 0;
        if (validation === 'adjustment_needed') {
            adjustment = -1.0; // Penalty for bad form
        }

        onSubmit({
            testId: selectedTest,
            value: parseFloat(value),
            date: new Date().toISOString(),
            coachValidation: validation,
            coachNotes,
            validationAdjustment: adjustment
        });

        setValue('');
        setCoachNotes('');
        onClose();
    };

    const currentTest = tests.find(t => t.id === selectedTest);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-sm bg-zinc-900 border border-white/10 rounded-3xl p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                >
                    <X className="w-5 h-5 text-zinc-400" />
                </button>

                <h2 className="text-xl font-black text-white mb-6 pr-8">{t('technical_tests.title')}</h2>

                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-zinc-500 uppercase mb-2 block">{t('technical_tests.skill_assessment')}</label>
                        <select
                            value={selectedTest}
                            onChange={(e) => setSelectedTest(e.target.value)}
                            className="w-full bg-zinc-800 text-white font-bold p-3 rounded-xl border border-white/5 outline-none focus:border-blue-500/50"
                        >
                            {tests.map(t => (
                                <option key={t.id} value={t.id}>{t.label}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-zinc-500 uppercase mb-2 block">
                            {t('technical_tests.result')} ({currentTest?.unit})
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            placeholder="0"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="w-full bg-zinc-800 text-white font-black text-2xl p-4 rounded-xl border border-white/5 outline-none focus:border-blue-500/50"
                        />
                    </div>

                    <div className="bg-white/5 p-4 rounded-xl">
                        <label className="text-xs font-bold text-zinc-500 uppercase mb-2 block">{t('technical_tests.coach_validation')}</label>
                        <div className="flex gap-2 mb-3">
                            <button
                                onClick={() => setValidation('verified')}
                                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors ${validation === 'verified' ? 'bg-green-500 text-white' : 'bg-white/5 text-zinc-400'
                                    }`}
                            >
                                {t('technical_tests.verified')}
                            </button>
                            <button
                                onClick={() => setValidation('adjustment_needed')}
                                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors ${validation === 'adjustment_needed' ? 'bg-yellow-500 text-black' : 'bg-white/5 text-zinc-400'
                                    }`}
                            >
                                {t('technical_tests.needs_adjustment')}
                            </button>
                        </div>
                        <input
                            type="text"
                            placeholder={t('technical_tests.coach_notes_placeholder')}
                            value={coachNotes}
                            onChange={(e) => setCoachNotes(e.target.value)}
                            className="w-full bg-transparent text-white text-sm p-2 rounded-lg border border-white/10 outline-none"
                        />
                    </div>

                    <div className="pt-2">
                        <button
                            onClick={handleSubmit}
                            className="w-full py-4 bg-blue-500 text-white font-black rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                        >
                            <Save className="w-5 h-5" />
                            {t('technical_tests.save')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
