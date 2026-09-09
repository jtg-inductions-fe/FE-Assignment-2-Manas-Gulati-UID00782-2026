import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { theme } from '@theme';

import { router } from './routes/appRoutes';
import { CheckLocalStorage } from './routes/CheckLocalStorage';
import { store } from './store/store';

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
    <StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <CheckLocalStorage>
                    <RouterProvider router={router} />
                </CheckLocalStorage>
            </ThemeProvider>
        </Provider>
    </StrictMode>,
);
