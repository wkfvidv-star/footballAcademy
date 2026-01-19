
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { mockAuth, type MockUser, type UserRole } from '../services/mockAuth';

interface AuthContextType {
    user: MockUser | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (role: UserRole) => Promise<void>; // Kept for interface compatibility but warns if used incorrectly
    logout: () => Promise<void>;
    // Expose direct methods for components
    signIn: typeof mockAuth.signIn;
    signUp: typeof mockAuth.signUp;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<MockUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Initialize session
        const sessionUser = mockAuth.getSession();
        setUser(sessionUser);
        setLoading(false);
    }, []);

    const login = async () => {
        console.warn('Deprecated: Use signIn() instead of login()');
    };

    const logout = async () => {
        await mockAuth.signOut();
        setUser(null);
    };

    const exposedSignIn: typeof mockAuth.signIn = async (email, password) => {
        const result = await mockAuth.signIn(email, password);
        if (result.user) {
            setUser(result.user);
        }
        return result;
    };

    const exposedSignUp: typeof mockAuth.signUp = async (email, password, role, name, academyCode) => {
        const result = await mockAuth.signUp(email, password, role, name, academyCode);
        // We do NOT auto-login on signup, forcing the user to go to login page, 
        // mimicking "account created, now login" flow.
        return result;
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            loading,
            login,
            logout,
            signIn: exposedSignIn,
            signUp: exposedSignUp
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export type { UserRole };
