import { Auth } from 'pages/Auth';
import { Cart } from 'pages/Cart';
import { Dashboard } from 'pages/Dashboard';
import { FoodItems } from 'pages/FoodItems';
import { NotFoundPage } from 'pages/NotFound';
import { Orders } from 'pages/Orders';
import { createBrowserRouter } from 'react-router-dom';

import { ROUTES } from '../constants';
import { ProtectedRoute } from './protectedRoute';

export const router = createBrowserRouter([
    {
        path: ROUTES.HOME,
        element: <Auth />,
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: ROUTES.DASHBOARD,
                element: <Dashboard />,
            },
            {
                path: ROUTES.FOOD_ROUTE,
                element: <FoodItems />,
            },
            {
                path: ROUTES.CART_ROUTE,
                element: <Cart />,
            },
            {
                path: ROUTES.ORDER,
                element: <Orders />,
            },
        ],
    },
]);
