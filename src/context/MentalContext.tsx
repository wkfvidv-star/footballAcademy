import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { MentalEngine, type MentalAssessment, type MentalProfile } from '../services/MentalEngine';

interface MentalContextType {
    assessments: MentalAssessment[];
    mentalProfile: MentalProfile;
    addAssessment: (assessment: Omit<MentalAssessment, 'id' | 'date'>) => void;
}

const MentalContext = createContext<MentalContextType | undefined>(undefined);

export const MentalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [assessments, setAssessments] = useState<MentalAssessment[]>([]);
    const [mentalProfile, setMentalProfile] = useState<MentalProfile>({
        selfScore: 0,
        coachScore: 0,
        overallScore: 0,
        dimensions: {},
        gapAnalysis: { hasGap: false, gapSize: 0, blindSpots: [], hiddenStrengths: [] },
        risks: []
    });

    // Load from local storage
    useEffect(() => {
        const stored = localStorage.getItem('ag_mental_assessments');
        if (stored) {
            setAssessments(JSON.parse(stored));
        } else {
            // Seed Data: 1 Self, 1 Coach
            const seed: MentalAssessment[] = [
                {
                    id: '1', date: new Date().toISOString(), type: 'self',
                    confidence: 8, focus: 8, emotionalControl: 9, motivation: 8,
                    discipline: 9, stressManagement: 7, coachability: 10, competitiveness: 9
                },
                {
                    id: '2', date: new Date().toISOString(), type: 'coach',
                    confidence: 6, focus: 7, emotionalControl: 6, motivation: 8,
                    discipline: 8, stressManagement: 6, coachability: 9, competitiveness: 8,
                    notes: 'Needs to work on composure after mistakes.'
                }
            ];
            setAssessments(seed);
            localStorage.setItem('ag_mental_assessments', JSON.stringify(seed));
        }
    }, []);

    // Recalculate Profile
    useEffect(() => {
        const profile = MentalEngine.calculateMentalProfile(assessments);
        setMentalProfile(profile);
    }, [assessments]);

    const addAssessment = (data: Omit<MentalAssessment, 'id' | 'date'>) => {
        const newItem: MentalAssessment = {
            ...data,
            id: crypto.randomUUID(),
            date: new Date().toISOString()
        };
        const updated = [...assessments, newItem];
        setAssessments(updated);
        localStorage.setItem('ag_mental_assessments', JSON.stringify(updated));
    };

    return (
        <MentalContext.Provider value={{
            assessments,
            mentalProfile,
            addAssessment
        }}>
            {children}
        </MentalContext.Provider>
    );
};

export const useMental = () => {
    const context = useContext(MentalContext);
    if (context === undefined) {
        throw new Error('useMental must be used within a MentalProvider');
    }
    return context;
};
