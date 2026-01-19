
export type UserRole = 'coach' | 'player';

export interface MockUser {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    avatar?: string;
    academyCode?: string; // For coaches
}

interface StoredUser extends MockUser {
    password: string; // In a real app, this would be hashed
}

const STORAGE_KEY_USERS = 'mock_auth_users';
const STORAGE_KEY_SESSION = 'mock_auth_session';

// Helper to get all users
const getUsers = (): StoredUser[] => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY_USERS);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        return [];
    }
};

// Helper to save users
const saveUsers = (users: StoredUser[]) => {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
};

export const mockAuth = {
    // Sign Up
    signUp: async (email: string, password: string, role: UserRole, name: string, academyCode?: string): Promise<{ user: MockUser | null; error: string | null }> => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const users = getUsers();

        // Check if user exists
        if (users.some(u => u.email === email)) {
            return { user: null, error: 'User already exists with this email.' };
        }

        const newUser: StoredUser = {
            id: crypto.randomUUID(),
            email,
            password, // Storing plain text for PROTOTYPE ONLY
            role,
            name,
            academyCode,
            avatar: role === 'player' ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}` : undefined
        };

        users.push(newUser);
        saveUsers(users);

        // Don't auto-login after signup to simulate email verification need if desired, 
        // but for this prototype user asked for "One-time Signup", "Strict Login". 
        // We can treat signup as successful creation.

        // Return public user object (without password)
        const { password: _, ...user } = newUser;
        return { user, error: null };
    },

    // Sign In
    signIn: async (email: string, password: string): Promise<{ user: MockUser | null; error: string | null }> => {
        await new Promise(resolve => setTimeout(resolve, 500));

        const users = getUsers();
        const user = users.find(u => u.email === email);

        if (!user) {
            return { user: null, error: 'Invalid credentials.' };
        }

        if (user.password !== password) {
            return { user: null, error: 'Invalid credentials.' };
        }

        const { password: _, ...publicUser } = user;

        // Persist session
        localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(publicUser));

        return { user: publicUser, error: null };
    },

    // Sign Out
    signOut: async () => {
        await new Promise(resolve => setTimeout(resolve, 200));
        localStorage.removeItem(STORAGE_KEY_SESSION);
    },

    // Get Session
    getSession: (): MockUser | null => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY_SESSION);
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    }
};
