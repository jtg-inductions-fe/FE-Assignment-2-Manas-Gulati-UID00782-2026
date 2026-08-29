// src/routes/AppRoutes.tsx
import Auth from 'pages/Auth';
import Dashboard from 'pages/Dashboard';
import { createBrowserRouter } from 'react-router-dom';

import ProtectedRoute from './protectedRoute';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Auth />,
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
        ],
    },
]);
