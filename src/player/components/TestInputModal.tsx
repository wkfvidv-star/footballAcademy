import { useState } from 'react';
import { X, Save, Calculator } from 'lucide-react';
import { useTranslation } from 'react-i18next';


interface TestInputModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (testId: string, value: number) => void;
}

export const TestInputModal = ({ isOpen, onClose, onSubmit }: TestInputModalProps) => {
    const { t } = useTranslation();
    const [selectedTest, setSelectedTest] = useState('PHY_SPD_30');
    const [value, setValue] = useState('');

    const tests = [
        { id: 'PHY_SPD_10', label: t('physical_tests.tests.PHY_SPD_10'), unit: 'sec' },
        { id: 'PHY_SPD_30', label: t('physical_tests.tests.PHY_SPD_30'), unit: 'sec' },
        { id: 'PHY_PWR_VJ', label: t('physical_tests.tests.PHY_PWR_VJ'), unit: 'cm' },
        { id: 'PHY_PWR_BJ', label: t('physical_tests.tests.PHY_PWR_BJ'), unit: 'cm' },
        { id: 'PHY_AGL_ILL', label: t('physical_tests.tests.PHY_AGL_ILL'), unit: 'sec' },
        { id: 'PHY_END_YOYO', label: t('physical_tests.tests.PHY_END_YOYO'), unit: 'lvl' },
        { id: 'PHY_REA_LIGHT', label: t('physical_tests.tests.PHY_REA_LIGHT'), unit: 'ms' },
    ];

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!value) return;
        onSubmit(selectedTest, parseFloat(value));
        setValue('');
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

                <h2 className="text-xl font-black text-white mb-6 pr-8">{t('physical_tests.title')}</h2>

                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-zinc-500 uppercase mb-2 block">{t('physical_tests.protocol')}</label>
                        <select
                            value={selectedTest}
                            onChange={(e) => setSelectedTest(e.target.value)}
                            className="w-full bg-zinc-800 text-white font-bold p-3 rounded-xl border border-white/5 outline-none focus:border-primary/50"
                        >
                            {tests.map(t => (
                                <option key={t.id} value={t.id}>{t.label}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-zinc-500 uppercase mb-2 block">
                            {t('physical_tests.result')} ({currentTest?.unit})
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="w-full bg-zinc-800 text-white font-black text-2xl p-4 rounded-xl border border-white/5 outline-none focus:border-primary/50"
                        />
                    </div>

                    <div className="pt-2">
                        <button
                            onClick={handleSubmit}
                            className="w-full py-4 bg-white text-black font-black rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                        >
                            <Save className="w-5 h-5" />
                            {t('physical_tests.save')}
                        </button>
                    </div>

                    <div className="bg-primary/10 p-3 rounded-lg flex items-start gap-2">
                        <Calculator className="w-4 h-4 text-primary mt-0.5" />
                        <p className="text-xs text-primary/80 leading-relaxed font-medium">
                            {t('physical_tests.auto_calc_msg')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
