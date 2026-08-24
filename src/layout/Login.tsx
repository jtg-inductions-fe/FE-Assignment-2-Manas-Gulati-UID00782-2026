import { useState } from 'react';

import FormPassword from 'components/Password';
import CustomizedSnackbar from 'components/Snackbar';
import FormTextField from 'components/TextField';
import { FormProvider, useForm } from 'react-hook-form';

import { Button, ButtonProps, styled } from '@mui/material';
import { AlertColor } from '@mui/material';
import Stack from '@mui/material/Stack';

import { ERRORMESSAGES, SUCCESSMESSAGES } from '../constants';

interface User {
    name: string;
    email: string;
    password: string;
    role: string;
}
const mockData: Record<string, User> = {
    'm@gmail.com': {
        name: 'manas',
        email: 'm@gmail.com',
        password: 'abs',
        role: 'customer',
    },
    's@gmail.com': {
        name: 'sanjay',
        email: 's@gmail.com',
        password: 'abc',
        role: 'owner',
    },
};

interface LoginFormData {
    email: string;
    password: string;
}

const CustomButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.black,
    borderColor: theme.palette.common.black,
    borderRadius: 20,
}));

function Login() {
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as AlertColor,
    });

    const methods = useForm<LoginFormData>();

    const onSubmit = (data: LoginFormData) => {
        const userData = mockData[data.email];
        if (userData) {
            if (userData.password === data.password) {
                setSnackbar({
                    open: true,
                    message: SUCCESSMESSAGES.LOGIN,
                    severity: 'success',
                });
                localStorage.setItem(
                    'user',
                    JSON.stringify(mockData[data.email]),
                );
            } else {
                setSnackbar({
                    open: true,
                    message: ERRORMESSAGES.WRONGPASSWORD,
                    severity: 'error',
                });
            }
        } else {
            setSnackbar({
                open: true,
                message: ERRORMESSAGES.USERNOTFOUND,
                severity: 'error',
            });
        }
    };

    return (
        <>
            <Stack
                spacing={4}
                sx={{
                    justifyContent: 'center',
                    alignItems: 'stretch',
                }}
            >
                <FormProvider {...methods}>
                    <h2>Login Form</h2>

                    <form
                        className="loginForm"
                        onSubmit={(e) => {
                            void methods.handleSubmit(onSubmit)(e);
                        }}
                    >
                        <Stack spacing={8}>
                            <FormTextField
                                name="email"
                                id="loginEmail"
                                rules={{
                                    required: 'Email is required',
                                    maxLength: {
                                        value: 50,
                                        message:
                                            'Email cannot exceed 50 characters',
                                    },
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Invalid email address format',
                                    },
                                }}
                            ></FormTextField>
                            <FormPassword
                                name="password"
                                id="loginPassword"
                            ></FormPassword>
                            <CustomButton
                                variant="outlined"
                                type="submit"
                                size="large"
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
