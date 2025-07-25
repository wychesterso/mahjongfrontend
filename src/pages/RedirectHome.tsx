import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const RedirectHome = () => {
    const { token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate('/lobby', { replace: true });
        } else {
            navigate('/login', { replace: true });
        }
    }, [token, navigate]);

    return null;
};

export default RedirectHome;
