import { useState } from 'react';

import FormPassword from 'components/Password.component';
import CustomizedSnackbar from 'components/Snackbar.component';
import FormTextField from 'components/TextField.component';
import { FormProvider, useForm } from 'react-hook-form';
import { CustomButton } from 'styles/AuthFormButton.styles';

import { AlertColor } from '@mui/material';
import Stack from '@mui/material/Stack';

import { ERRORMESSAGES, SUCCESSMESSAGES, VALIDATION } from '../constants';

//defining schema of User data
interface User {
    name: string;
    email: string;
    password: string;
    role: string;
}

//creating preset values
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

//determining login form data
interface LoginFormData {
    email: string;
    password: string;
}

function Login() {
    //set initial hidden state of snackbar
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as AlertColor,
    });

    const methods = useForm<LoginFormData>(); //create rhf hook to manage form

    const onSubmit = (data: LoginFormData) => {
        //fetch existing user data
        const userData = mockData[data.email];
        //cross verification
        if (userData) {
            if (userData.password === data.password) {
                setSnackbar({
                    open: true,
                    message: SUCCESSMESSAGES.LOGIN,
                    severity: 'success',
                });
                //login persist
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
