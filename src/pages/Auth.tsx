import { useState } from 'react';

import { AlertColor, Stack, Typography } from '@mui/material';
import { Login } from 'layout/Login';
import { Signup } from 'layout/Signup';
import { Navigate } from 'react-router-dom';
import { useTypeSelector } from 'store/hooks';
import {
    AuthBrand,
    AuthCard,
    AuthContent,
    AuthFormSide,
    AuthPage,
    AuthPageFormHeading,
    AuthPageSubheading,
    CustomButton,
    FormContainer,
} from 'styles/Auth.styles';
import { SnackbarProps } from 'types/snackbar.types';

import { CustomizedSnackbar } from '@components';

import { ROUTES } from '../constants';

export const Auth = () => {
    const [login, setLoginFrom] = useState(true);
    const isAuthenticated = useTypeSelector(
        (state) => state.auth.isAuthenticated,
    );

    const [snackbar, setSnackbar] = useState<SnackbarProps>({
        state: false,
        message: '',
        severity: 'success' as AlertColor,
        onClose: () => {
            setSnackbar((prev) => ({ ...prev, state: false }));
        },
    });

    if (isAuthenticated) {
        <Navigate to={ROUTES.DASHBOARD} replace />;
    }

    const toggleStateHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        const id = e.currentTarget.id;
        setSnackbar((prev) => ({ ...prev, state: false }));
        if (id === 'login') {
            setLoginFrom(true);
        } else {
            setLoginFrom(false);
        }
    };

    return (
        <AuthPage>
            <AuthCard>
                <AuthContent>
                    <AuthBrand>
                        <Typography variant="h2">Meishi</Typography>
                        <AuthPageSubheading variant="h6">
                            An exotic Sushi Restaurant
                        </AuthPageSubheading>
                    </AuthBrand>
                </AuthContent>
                <AuthFormSide>
                    <Stack direction="row" width="100%">
                        <CustomButton
                            selected={login}
                            onClick={toggleStateHandler}
                            aria-pressed={login}
                            id="login"
                        >
                            Log In
                        </CustomButton>
                        <CustomButton
                            selected={!login}
                            onClick={toggleStateHandler}
                            aria-pressed={!login}
                            id="signup"
                        >
                            Sign Up
                        </CustomButton>
                    </Stack>

                    <AuthPageFormHeading variant="h6">
                        {login ? 'Welcome Back' : 'Create Your Account'}
                    </AuthPageFormHeading>

                    <FormContainer mb={4}>
                        {login ? (
                            <Login setSnackbar={setSnackbar} />
                        ) : (
                            <Signup setSnackbar={setSnackbar} />
                        )}
                    </FormContainer>
                </AuthFormSide>
            </AuthCard>
            <CustomizedSnackbar
                severity={snackbar.severity}
                message={snackbar.message}
                state={snackbar.state}
                onClose={() =>
                    setSnackbar((prev) => ({
                        ...prev,
                        state: false,
                    }))
                }
            />
        </AuthPage>
    );
};
