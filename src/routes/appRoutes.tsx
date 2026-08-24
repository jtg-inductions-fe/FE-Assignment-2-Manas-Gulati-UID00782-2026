// src/routes/AppRoutes.tsx
import Auth from 'pages/Auth';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Auth />,
    },
]);
