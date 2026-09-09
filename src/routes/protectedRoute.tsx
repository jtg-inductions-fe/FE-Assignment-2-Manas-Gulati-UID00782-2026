import { Navigate, Outlet } from 'react-router-dom';
import { useTypeSelector } from 'store/hooks';

import { ROUTES } from '../constants';

function ProtectedRoute() {
    const { isAuthenticated } = useTypeSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.HOME} replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;
