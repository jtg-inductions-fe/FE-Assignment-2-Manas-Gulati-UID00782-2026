import { Navigate, Outlet } from 'react-router-dom';
import { useTypeSelector } from 'store/hooks';

function ProtectedRoute() {
    const { isAuthenticated } = useTypeSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;
