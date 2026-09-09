import { useEffect, useState } from 'react';

import { AlertColor } from '@mui/material';
import Stack from '@mui/material/Stack';
import ReusableButton from 'components/Button.component';
import FormPassword from 'components/Password.component';
import CustomizedSnackbar from 'components/Snackbar.component';
import FormTextField from 'components/TextField.component';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { login } from 'store/authSlice';
import { initializeUser } from 'store/cartSlice';
import { useTypeDispatch, useTypeSelector } from 'store/hooks';
import { get } from 'store/restaurantSlice';
import { LoginFormData } from 'types';

import { ROUTES, SUCCESSMESSAGES, VALIDATION } from '../constants';

function Login() {
    //set initial hidden state of snackbar
    const dispatch = useTypeDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, message, loginAttempt } = useTypeSelector(
        (state) => state.auth,
    );
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as AlertColor,
    });
    const auth = useTypeSelector((state) => state.auth); //to send user data forward

    const methods = useForm<LoginFormData>(); //create rhf hook to manage form

    const onSubmit = (data: LoginFormData) => {
        dispatch(login(data)); //update login attempt and checks authN
    };

    useEffect(() => {
        if (auth.user) {
            dispatch(
                get({
                    role: auth.user.role,
                    userId: auth.user.userId,
                }), //to initialize restaurant to show to user
            );
            dispatch(initializeUser(auth.user.userId)); //to set user for the cart
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth.user]);

    useEffect(() => {
        //to generate snackbar at every login attempt
        if (isAuthenticated) {
            setSnackbar({
                open: true,
                message: SUCCESSMESSAGES.LOGIN,
                severity: 'success',
            });

            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            navigate(ROUTES.DASHBOARD, { replace: true });
        } else if (message) {
            setSnackbar({
                open: true,
                message,
                severity: 'error',
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, message, loginAttempt]);

    return (
        <>
            <Stack spacing={4}>
                <FormProvider {...methods}>
                    <form
                        className="loginForm"
                        onSubmit={(e) => {
                            void methods.handleSubmit(onSubmit)(e);
                        }}
                    >
                        <Stack spacing={5}>
                            <FormTextField
                                name="email"
                                id="loginEmail"
                                rules={{
                                    required: VALIDATION.EMAILREQUIRED,
                                    maxLength: {
                                        value: 50,
                                        message: VALIDATION.EMAILEXCEED.replace(
                                            '{{email_count}}',
                                            '50',
                                        ),
                                    },
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: VALIDATION.INVALIDEMAIL,
                                    },
                                }}
                            />
                            <FormPassword name="password" id="loginPassword" />
                            <ReusableButton
                                variant="outlined"
                                type="submit"
                                size="medium"
                            >
                                LogIn
                            </ReusableButton>
                        </Stack>
                    </form>
                </FormProvider>
            </Stack>
            <CustomizedSnackbar
                severity={snackbar.severity}
                message={snackbar.message}
                state={snackbar.open}
                onClose={() =>
                    setSnackbar((prev) => ({
                        ...prev,
                        open: false,
                    }))
                }
            />
        </>
    );
}

export default Login;
