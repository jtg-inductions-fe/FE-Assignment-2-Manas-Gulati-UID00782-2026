import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';

import { CssBaseline, ThemeProvider } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { theme } from '@theme';

import { router } from './routes/appRoutes';
import { store } from './store/store';

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
    <StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <RouterProvider router={router} />
                <Button variant="contained" color="info">
                    Hello
                </Button>
                <Typography variant="h1">hello</Typography>
            </ThemeProvider>
        </Provider>
    </StrictMode>,
);
