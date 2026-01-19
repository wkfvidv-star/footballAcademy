import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { TechnicalEngine, type TechnicalTestInput, type TechnicalRadarCategory } from '../services/TechnicalEngine';

interface TechnicalContextType {
    testHistory: TechnicalTestInput[];
    technicalRadar: TechnicalRadarCategory[];
    weaknesses: string[];
    addTestResult: (input: TechnicalTestInput) => void;
    // For demo: allowing to switch 'Position' to see weighting effects
    position: string;
    setPosition: (pos: string) => void;
}

const TechnicalContext = createContext<TechnicalContextType | undefined>(undefined);

export const TechnicalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [testHistory, setTestHistory] = useState<TechnicalTestInput[]>([]);
    const [technicalRadar, setTechnicalRadar] = useState<TechnicalRadarCategory[]>([]);
    const [weaknesses, setWeaknesses] = useState<string[]>([]);
    const [position, setPosition] = useState<string>('MID'); // Default to Midfielder

    // Load from local storage
    useEffect(() => {
        const stored = localStorage.getItem('ag_technical_history');
        if (stored) {
            setTestHistory(JSON.parse(stored));
        } else {
            // Seed some initial data
            const seed: TechnicalTestInput[] = [
                { testId: 'TEC_PAS_SHORT', value: 8, date: new Date().toISOString() }, // 8/10
                { testId: 'TEC_CTL_TOUCH', value: 7.5, date: new Date().toISOString() },
                { testId: 'TEC_DRI_SLALOM', value: 13.5, date: new Date().toISOString() }, // Good time
                { testId: 'TEC_SHO_ACC', value: 6, date: new Date().toISOString() }, // Avg shooting
            ];
            setTestHistory(seed);
            localStorage.setItem('ag_technical_history', JSON.stringify(seed));
        }
    }, []);

    // Recalculate Profile whenever history or position changes
    useEffect(() => {
        if (testHistory.length === 0) return;

        const latestTests: Record<string, number> = {};

        testHistory.forEach(Result => {
            const finalScore = TechnicalEngine.calculateTechnicalScore(
                Result.testId,
                Result.value,
                position,
                'U14', // Hardcoded age for demo
                Result.validationAdjustment || 0
            );
            latestTests[Result.testId] = finalScore;
        });

        const profile = TechnicalEngine.generateTechnicalRadar(latestTests);
        setTechnicalRadar(profile);
        setWeaknesses(TechnicalEngine.identifyWeaknesses(profile));

    }, [testHistory, position]);

    const addTestResult = (input: TechnicalTestInput) => {
        const updated = [...testHistory, input];
        setTestHistory(updated);
        localStorage.setItem('ag_technical_history', JSON.stringify(updated));
    };

    return (
        <TechnicalContext.Provider value={{
            testHistory,
            technicalRadar,
            weaknesses,
            addTestResult,
            position,
            setPosition
        }}>
            {children}
        </TechnicalContext.Provider>
    );
};

export const useTechnical = () => {
    const context = useContext(TechnicalContext);
    if (context === undefined) {
        throw new Error('useTechnical must be used within a TechnicalProvider');
    }
    return context;
};
