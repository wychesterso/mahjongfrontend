import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const GuestOnlyRoute = ({ children }: { children: React.ReactNode }) => {
    const { token } = useAuth();

    if (token) {
        return <Navigate to="/lobby" replace />;
    }

    return <>{children}</>;
};

export default GuestOnlyRoute;
