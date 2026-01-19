import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { MedicalService } from '../services/medicalService';
import type { SessionLoad, WellnessLog, LoadMetrics } from '../types/medical';

interface MedicalContextType {
    sessions: SessionLoad[];
    wellnessLogs: WellnessLog[];
    loadMetrics: LoadMetrics | null;
    submitWellness: (log: Omit<WellnessLog, 'id' | 'date'>) => void;
    submitSession: (session: Omit<SessionLoad, 'id' | 'date' | 'sRPE'>) => void;
    hasCheckedInToday: boolean;
    refreshMetrics: () => void;
}

const MedicalContext = createContext<MedicalContextType | undefined>(undefined);

export const MedicalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Initialize state from localStorage or mock data
    const [sessions, setSessions] = useState<SessionLoad[]>([]);
    const [wellnessLogs, setWellnessLogs] = useState<WellnessLog[]>([]);
    const [loadMetrics, setLoadMetrics] = useState<LoadMetrics | null>(null);

    // Load initial data
    useEffect(() => {
        const storedSessions = localStorage.getItem('ag_medical_sessions');
        const storedWellness = localStorage.getItem('ag_medical_wellness');

        if (storedSessions && storedWellness) {
            setSessions(JSON.parse(storedSessions));
            setWellnessLogs(JSON.parse(storedWellness));
        } else {
            // Generate mock data for demo if empty
            const mockData = MedicalService.generateMockHistory('current_user');
            setSessions(mockData.sessions);
            setWellnessLogs(mockData.wellness);

            // Save initial mock data
            localStorage.setItem('ag_medical_sessions', JSON.stringify(mockData.sessions));
            localStorage.setItem('ag_medical_wellness', JSON.stringify(mockData.wellness));
        }
    }, []);

    // Recalculate metrics whenever data changes
    useEffect(() => {
        if (sessions.length > 0 || wellnessLogs.length > 0) {
            const metrics = MedicalService.calculateLoadMetrics(sessions, wellnessLogs);
            setLoadMetrics(metrics);
        }
    }, [sessions, wellnessLogs]);

    const submitWellness = (logData: Omit<WellnessLog, 'id' | 'date'>) => {
        const newLog: WellnessLog = {
            id: `w_${Date.now()}`,
            date: new Date().toISOString(),
            ...logData
        };

        const updatedLogs = [newLog, ...wellnessLogs];
        setWellnessLogs(updatedLogs);
        localStorage.setItem('ag_medical_wellness', JSON.stringify(updatedLogs));
    };

    const submitSession = (sessionData: Omit<SessionLoad, 'id' | 'date' | 'sRPE'>) => {
        const newSession: SessionLoad = {
            id: `s_${Date.now()}`,
            date: new Date().toISOString(),
            sRPE: MedicalService.calculateSessionLoad(sessionData.durationMinutes, sessionData.rpe),
            ...sessionData
        };

        const updatedSessions = [newSession, ...sessions];
        setSessions(updatedSessions);
        localStorage.setItem('ag_medical_sessions', JSON.stringify(updatedSessions));
    };

    const hasCheckedInToday = wellnessLogs.some(log => {
        const logDate = new Date(log.date);
        const today = new Date();
        return logDate.getDate() === today.getDate() &&
            logDate.getMonth() === today.getMonth() &&
            logDate.getFullYear() === today.getFullYear();
    });

    const refreshMetrics = () => {
        if (sessions.length > 0 || wellnessLogs.length > 0) {
            const metrics = MedicalService.calculateLoadMetrics(sessions, wellnessLogs);
            setLoadMetrics(metrics);
        }
    }

    return (
        <MedicalContext.Provider value={{
            sessions,
            wellnessLogs,
            loadMetrics,
            submitWellness,
            submitSession,
            hasCheckedInToday,
            refreshMetrics
        }}>
            {children}
        </MedicalContext.Provider>
    );
};

export const useMedical = () => {
    const context = useContext(MedicalContext);
    if (context === undefined) {
        throw new Error('useMedical must be used within a MedicalProvider');
    }
    return context;
};
