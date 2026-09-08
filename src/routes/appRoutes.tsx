import Auth from 'pages/Auth';
import Dashboard from 'pages/Dashboard';
import FoodItems from 'pages/FoodItems';
import { createBrowserRouter } from 'react-router-dom';

import { ROUTES } from '../constants';
import ProtectedRoute from './protectedRoute';

export const router = createBrowserRouter([
    {
        path: ROUTES.HOME,
        element: <Auth />,
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: ROUTES.DASHBOARD,
                element: <Dashboard />,
            },
            {
                path: '/dashboard/:restaurantId',
                element: <FoodItems />,
            },
        ],
    },
]);
