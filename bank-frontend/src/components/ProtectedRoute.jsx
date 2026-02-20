import { Navigate } from 'react-router-dom';
import { getToken, isTokenExpired } from '../utils/auth';

const ProtectedRoute = ({ children }) => {
    const token = getToken();

    if (!token || isTokenExpired()) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
