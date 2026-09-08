// src/routes/AppRoutes.tsx
import Auth from 'pages/Auth';
//import Cart from 'pages/Cart';
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
            {
                path: '/dashboard/cart/:userId',
                //element: <Cart />,
            },
        ],
    },
]);
