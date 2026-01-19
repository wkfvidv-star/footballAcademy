import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { usePhysical } from './PhysicalContext';
import { useTechnical } from './TechnicalContext';
import { useTactical } from './TacticalContext';
import { useMental } from './MentalContext';
import { useMedical } from './MedicalContext'; // Correct import
import { AICoachEngine, type PDI, type TrainingPlan, type AIRisk } from '../services/AICoachEngine'; // VSCode fix: Type-only imports

interface AICoachContextType {
    pdi: PDI;
    trainingPlan: TrainingPlan;
    risks: AIRisk[];
    recalculate: () => void;
}

const AICoachContext = createContext<AICoachContextType | undefined>(undefined);

export const AICoachProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { radarProfile: physRadar, weaknesses: physWeaknesses } = usePhysical();
    // Fix: TechnicalContext exposes 'technicalRadar', not 'radarProfile'
    const { technicalRadar: techRadar, weaknesses: techWeaknesses, position } = useTechnical();
    const { tacticalProfile } = useTactical();
    const { mentalProfile } = useMental();
    // Fix: MedicalContext exposes 'wellnessLogs' and 'loadMetrics', not 'metrics'
    const { wellnessLogs } = useMedical();

    const [pdi, setPDI] = useState<PDI>({
        score: 0, trend: 'stable', breakdown: { physical: 0, technical: 0, tactical: 0, mental: 0 }
    });

    const [trainingPlan, setTrainingPlan] = useState<TrainingPlan>({
        focus: 'Assessment Pending', intensity: 'Low', recommendedDrills: [], reasoning: 'Gathering data...'
    });

    const [risks, setRisks] = useState<AIRisk[]>([]);

    const recalculate = () => {
        if (!tacticalProfile || !mentalProfile) return;

        // 1. Calculate PDI
        const newPDI = AICoachEngine.calculatePDI(physRadar, techRadar, tacticalProfile, mentalProfile);
        setPDI(newPDI);

        // 2. Assess Risks
        // Get lateset wellness log if available
        const latestWellness = wellnessLogs.length > 0 ? {
            fatigue: wellnessLogs[0].fatigueLevel,
            sleep: wellnessLogs[0].sleepQuality,
            soreness: wellnessLogs[0].sorenessLevel
        } : null;

        const currentRisks = AICoachEngine.assessRisks(mentalProfile, latestWellness);
        setRisks(currentRisks);

        // 3. Generate Plan
        const plan = AICoachEngine.generateTrainingPlan(
            currentRisks,
            physWeaknesses,
            techWeaknesses,
            tacticalProfile,
            position
        );
        setTrainingPlan(plan);
    };

    // Auto-recalculate when inputs change
    useEffect(() => {
        recalculate();
    }, [physRadar, techRadar, tacticalProfile, mentalProfile, wellnessLogs]);

    return (
        <AICoachContext.Provider value={{
            pdi,
            trainingPlan,
            risks,
            recalculate
        }}>
            {children}
        </AICoachContext.Provider>
    );
};

export const useAICoach = () => {
    const context = useContext(AICoachContext);
    if (context === undefined) {
        throw new Error('useAICoach must be used within an AICoachProvider');
    }
    return context;
};
