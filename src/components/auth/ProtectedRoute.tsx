import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, type UserRole } from '../../auth/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRole?: UserRole;
}

export default function ProtectedRoute({ children, allowedRole }: ProtectedRouteProps) {
    const { user, isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated || !user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If a specific role is required and user has different role
    if (allowedRole && user.role !== allowedRole) {
        // Redirect to their appropriate dashboard
        const target = user.role === 'coach' ? '/coach/dashboard' : '/player/dashboard';
        return <Navigate to={target} replace />;
    }

    return <>{children}</>;
}
