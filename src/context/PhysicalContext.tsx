import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { PhysicalEngine, type PhysicalTestInput, type RadarCategory } from '../services/PhysicalEngine';
import { normalizeScore } from '../services/normalization';
// In a real app, maturity would come from global Auth/Player context
import { BioEngine } from '../services/bioEngine';

interface PhysicalContextType {
    testHistory: PhysicalTestInput[];
    radarProfile: RadarCategory[];
    weaknesses: string[];
    addTestResult: (testId: string, value: number) => void;
    // For demo: allowing to toggle 'maturity status' to see bio-banding effects
    maturityStatus: 'early' | 'on-time' | 'late';
    setMaturityStatus: (status: 'early' | 'on-time' | 'late') => void;
}

const PhysicalContext = createContext<PhysicalContextType | undefined>(undefined);

export const PhysicalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [testHistory, setTestHistory] = useState<PhysicalTestInput[]>([]);
    const [radarProfile, setRadarProfile] = useState<RadarCategory[]>([]);
    const [weaknesses, setWeaknesses] = useState<string[]>([]);
    const [maturityStatus, setMaturityStatus] = useState<'early' | 'on-time' | 'late'>('on-time');

    // Load from local storage
    useEffect(() => {
        const stored = localStorage.getItem('ag_physical_history');
        if (stored) {
            setTestHistory(JSON.parse(stored));
        } else {
            // Seed some initial data for the demo so the chart isn't empty
            const seed: PhysicalTestInput[] = [
                { testId: 'PHY_SPD_30', value: 4.2, date: new Date().toISOString() }, // Good speed
                { testId: 'PHY_PWR_VJ', value: 45, date: new Date().toISOString() }, // Avg jump
                { testId: 'PHY_AGL_ILL', value: 16.5, date: new Date().toISOString() }, // Good agility
                { testId: 'PHY_END_YOYO', value: 16.5, date: new Date().toISOString() }, // Decent endurance
                { testId: 'PHY_BAL_Y', value: 95, date: new Date().toISOString() },
                { testId: 'PHY_REA_LIGHT', value: 280, date: new Date().toISOString() },
            ];
            setTestHistory(seed);
            localStorage.setItem('ag_physical_history', JSON.stringify(seed));
        }
    }, []);

    // Recalculate Profile whenever history or maturity changes
    useEffect(() => {
        if (testHistory.length === 0) return;

        // Group by testId, taking the latest result
        const latestTests: Record<string, number> = {};

        testHistory.forEach(Result => {
            // 1. Normalize (Raw Value -> 1-10 Score)
            // Hardcoded U14 Midfielder for demo context
            const rawScore = normalizeScore(Result.testId, Result.value, 'U14', 'MID');

            // 2. Bio-Adjust (1-10 Score -> Adjusted Score)
            const finalScore = PhysicalEngine.calculateBioAdjustedScore(
                Result.testId,
                rawScore,
                maturityStatus,
                'U14',
                'MID'
            );

            latestTests[Result.testId] = finalScore;
        });

        const profile = PhysicalEngine.generateRadarProfile(latestTests);
        setRadarProfile(profile);
        setWeaknesses(PhysicalEngine.identifyWeaknesses(profile));

    }, [testHistory, maturityStatus]);

    const addTestResult = (testId: string, value: number) => {
        const newEntry: PhysicalTestInput = {
            testId,
            value,
            date: new Date().toISOString()
        };
        const updated = [...testHistory, newEntry];
        setTestHistory(updated);
        localStorage.setItem('ag_physical_history', JSON.stringify(updated));
    };

    return (
        <PhysicalContext.Provider value={{
            testHistory,
            radarProfile,
            weaknesses,
            addTestResult,
            maturityStatus,
            setMaturityStatus
        }}>
            {children}
        </PhysicalContext.Provider>
    );
};

export const usePhysical = () => {
    const context = useContext(PhysicalContext);
    if (context === undefined) {
        throw new Error('usePhysical must be used within a PhysicalProvider');
    }
    return context;
};
