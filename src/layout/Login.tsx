import { useEffect, useState } from 'react';

import FormPassword from 'components/Password.component';
import CustomizedSnackbar from 'components/Snackbar.component';
import FormTextField from 'components/TextField.component';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { login } from 'store/authSlice';
import { useTypeDispatch, useTypeSelector } from 'store/hooks';
import { get } from 'store/restaurantSlice';
import { CustomButton } from 'styles/AuthFormButton.styles';

import { AlertColor } from '@mui/material';
import Stack from '@mui/material/Stack';

import { SUCCESSMESSAGES, VALIDATION } from '../constants';

//determining login form data
interface LoginFormData {
    email: string;
    password: string;
}

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
    const auth = useTypeSelector((state) => state.auth);

    const methods = useForm<LoginFormData>(); //create rhf hook to manage form

    const onSubmit = (data: LoginFormData) => {
        dispatch(login(data));
    };
    useEffect(() => {
        if (auth.user) {
            dispatch(
                get({
                    role: auth.user.role,
                    userId: auth.user.userId,
                }),
            );
        }
    }, [auth.user, dispatch]);

    useEffect(() => {
        if (isAuthenticated) {
            setSnackbar({
                open: true,
                message: SUCCESSMESSAGES.LOGIN,
                severity: 'success',
            });
            void navigate('/dashboard', { replace: true });
        } else if (message) {
            setSnackbar({
                open: true,
                message,
                severity: 'error',
            });
        }
    }, [isAuthenticated, message, loginAttempt, navigate]);

    return (
        <>
            <Stack
                spacing={6}
                sx={{
                    justifyContent: 'center',
                    alignItems: 'stretch',
                }}
            >
                <FormProvider {...methods}>
                    <h3>Login Form</h3>

                    <form
                        className="loginForm"
                        onSubmit={(e) => {
                            void methods.handleSubmit(onSubmit)(e);
                        }}
                    >
                        <Stack spacing={4}>
                            <FormTextField
                                name="email"
                                id="loginEmail"
                                rules={{
                                    required: VALIDATION.EMAILREQUIRED,
                                    maxLength: {
                                        value: 50,
                                        message: VALIDATION.EMAILEXCEED,
                                    },
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: VALIDATION.INVALIDEMAIL,
                                    },
                                }}
                            />
                            <FormPassword
                                name="password"
                                id="loginPassword"
                            ></FormPassword>
                            <CustomButton
                                variant="outlined"
                                type="submit"
                                size="medium"
                            >
                                LogIn
                            </CustomButton>
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
