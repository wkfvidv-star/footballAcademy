import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, X, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function GuidedTour() {
    const { t } = useTranslation();
    const [step, setStep] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const hasSeenTour = localStorage.getItem('hasSeenTour');
        if (!hasSeenTour) {
            setIsVisible(true);
        }
    }, []);

    const steps = [
        {
            title: "Welcome to Radiant",
            description: "Your personalized football performance platform has been completely redesigned for clarity and ease of use.",
            position: "center"
        },
        {
            title: "Navigation Sidebar",
            description: "Easily switch between your daily dashboard, training plans, recovery protocols, and performance analysis.",
            position: "left"
        },
        {
            title: "Role-Based Experience",
            description: "Whether you're a player or a coach, the interface adapts to show you exactly what matters most.",
            position: "center"
        }
    ];

    const handleNext = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            handleClose();
        }
    };

    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem('hasSeenTour', 'true');
    };

    if (!isVisible) return null;

    const currentStep = steps[step];

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="bg-zinc-900 border border-white/10 p-10 rounded-[40px] max-w-md w-full shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute -right-12 -top-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />

                    <button
                        onClick={handleClose}
                        className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 transition-colors text-zinc-500 hover:text-white"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="relative z-10">
                        <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-8">
                            <Sparkles className="w-8 h-8 text-primary" />
                        </div>

                        <div className="mb-8">
                            <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2 italic">Discovery Mode</h3>
                            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-4 leading-none">
                                {currentStep.title}
                            </h2>
                            <p className="text-zinc-400 text-sm font-bold uppercase tracking-tight leading-relaxed">
                                {currentStep.description}
                            </p>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex gap-1.5">
                                {steps.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`h-1.5 rounded-full transition-all ${i === step ? 'w-8 bg-primary' : 'w-2 bg-white/10'}`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={handleNext}
                                className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-black uppercase italic tracking-tighter hover:bg-primary hover:text-white transition-all group"
                            >
                                {step === steps.length - 1 ? "Start" : "Next"}
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
