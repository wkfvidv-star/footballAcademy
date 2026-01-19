import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { TacticalEngine, type TacticalEvaluation, type MatchStats, type TacticalProfile } from '../services/TacticalEngine';

interface TacticalContextType {
    evaluations: TacticalEvaluation[];
    matchLogs: MatchStats[];
    tacticalProfile: TacticalProfile;
    addEvaluation: (evalData: Omit<TacticalEvaluation, 'id' | 'date'>) => void;
    addMatchLog: (matchData: Omit<MatchStats, 'id' | 'date'>) => void;
}

const TacticalContext = createContext<TacticalContextType | undefined>(undefined);

export const TacticalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [evaluations, setEvaluations] = useState<TacticalEvaluation[]>([]);
    const [matchLogs, setMatchLogs] = useState<MatchStats[]>([]);
    const [tacticalProfile, setTacticalProfile] = useState<TacticalProfile>({
        trainingScore: 0,
        matchScore: 0,
        overallTacticalScore: 0,
        dimensions: {
            positioning: 0, offBallMovement: 0, defensiveAwareness: 0, pressing: 0,
            transition: 0, decisionMaking: 0, spaceOccupation: 0, teamShape: 0
        },
        status: 'developing'
    });

    // Load from local storage
    useEffect(() => {
        const storedEvals = localStorage.getItem('ag_tactical_evals');
        const storedMatches = localStorage.getItem('ag_match_logs');

        if (storedEvals) setEvaluations(JSON.parse(storedEvals));
        else {
            // Seed Evaluation
            const seedEval: TacticalEvaluation[] = [{
                id: '1', date: new Date().toISOString(),
                positioning: 8, offBallMovement: 7, defensiveAwareness: 6, pressing: 8,
                transition: 7, decisionMaking: 8, spaceOccupation: 7, teamShape: 8,
                coachNotes: 'Solid understanding of zoning.'
            }];
            setEvaluations(seedEval);
            localStorage.setItem('ag_tactical_evals', JSON.stringify(seedEval));
        }

        if (storedMatches) setMatchLogs(JSON.parse(storedMatches));
        else {
            // Seed Match
            const seedMatch: MatchStats[] = [{
                id: '1', date: new Date().toISOString(), opponent: 'Academy U15',
                minutesPlayed: 80, performanceRating: 7.5,
                goals: 0, assists: 1, keyPasses: 2, interceptions: 3, tacklesWon: 2, errors: 0, possessionLost: 5,
                gps: {
                    totalDistance: 9.8,
                    topSpeed: 32.4,
                    sprints: 12,
                    heatmap: [
                        { x: 20, y: 50, intensity: 0.8 }, { x: 25, y: 55, intensity: 0.6 },
                        { x: 50, y: 50, intensity: 0.9 }, { x: 80, y: 20, intensity: 0.7 },
                        { x: 85, y: 45, intensity: 0.8 }, { x: 70, y: 80, intensity: 0.5 },
                    ],
                    technicalMap: [
                        { x: 30, y: 40, type: 'pass', outcome: 'success' },
                        { x: 45, y: 60, type: 'pass', outcome: 'success' },
                        { x: 60, y: 50, type: 'pass', outcome: 'fail' },
                        { x: 75, y: 25, type: 'shot', outcome: 'success' },
                        { x: 20, y: 30, type: 'tackle', outcome: 'success' },
                        { x: 55, y: 70, type: 'interception', outcome: 'success' },
                        { x: 80, y: 50, type: 'pass', outcome: 'success' },
                        { x: 85, y: 45, type: 'shot', outcome: 'fail' },
                    ]
                }
            }];
            setMatchLogs(seedMatch);
            localStorage.setItem('ag_match_logs', JSON.stringify(seedMatch));
        }
    }, []);

    // Recalculate Profile
    useEffect(() => {
        // Hardcoded position 'MID' for demo, ideally comes from PlayerContext
        const profile = TacticalEngine.calculateTacticalProfile(evaluations, matchLogs, 'MID');
        setTacticalProfile(profile);
    }, [evaluations, matchLogs]);

    const addEvaluation = (evalData: Omit<TacticalEvaluation, 'id' | 'date'>) => {
        const newEval: TacticalEvaluation = {
            ...evalData,
            id: crypto.randomUUID(),
            date: new Date().toISOString()
        };
        const updated = [...evaluations, newEval];
        setEvaluations(updated);
        localStorage.setItem('ag_tactical_evals', JSON.stringify(updated));
    };

    const addMatchLog = (matchData: Omit<MatchStats, 'id' | 'date'>) => {
        const newMatch: MatchStats = {
            ...matchData,
            id: crypto.randomUUID(),
            date: new Date().toISOString()
        };
        const updated = [...matchLogs, newMatch];
        setMatchLogs(updated);
        localStorage.setItem('ag_match_logs', JSON.stringify(updated));
    };

    return (
        <TacticalContext.Provider value={{
            evaluations,
            matchLogs,
            tacticalProfile,
            addEvaluation,
            addMatchLog
        }}>
            {children}
        </TacticalContext.Provider>
    );
};

export const useTactical = () => {
    const context = useContext(TacticalContext);
    if (context === undefined) {
        throw new Error('useTactical must be used within a TacticalProvider');
    }
    return context;
};
