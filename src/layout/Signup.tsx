import { useState } from 'react';

import FormPassword from 'components/Password';
import CustomizedSnackbar from 'components/Snackbar';
import FormTextField from 'components/TextField';
import { FormProvider, useForm } from 'react-hook-form';

import { AlertColor } from '@mui/material';
import {
    Button,
    ButtonProps,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Radio,
    RadioGroup,
    styled,
} from '@mui/material';
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

interface SignupFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
}

const CustomButton = styled(Button)<ButtonProps>(({ theme }) => ({
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    borderColor: theme.palette.common.black,
    borderRadius: 20,
}));

const CustomRadio = styled(Radio)(({ theme }) => ({
    color: theme.palette.common.black,
    '&.Mui-checked': {
        color: theme.palette.common.black,
    },
}));

function Signup() {
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as AlertColor,
    });
    const methods = useForm<SignupFormData>();
    const {
        formState: { errors },
    } = methods;

    const onSubmit = (data: SignupFormData) => {
        if (!mockData[data.email]) {
            if (data.confirmPassword === data.password) {
                mockData[data.email] = {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    role: data.role,
                };

                setSnackbar({
                    open: true,
                    message: SUCCESSMESSAGES.SIGNUP,
                    severity: 'success',
                });
            } else {
                setSnackbar({
                    open: true,
                    message: ERRORMESSAGES.PASSWORDNOMATCH,
                    severity: 'error',
                });
            }
        } else {
            setSnackbar({
                open: true,
                message: ERRORMESSAGES.USEREXIST,
                severity: 'error',
            });
        }
    };

    return (
        <Stack
            spacing={4}
            sx={{
                justifyContent: 'center',
                alignItems: 'stretch',
            }}
        >
            <FormProvider {...methods}>
                <h2>SignUp Form</h2>

                <form
                    className="signupForm"
                    onSubmit={(e) => {
                        void methods.handleSubmit(onSubmit)(e);
                    }}
                >
                    <Stack spacing={8}>
                        <FormTextField
                            name="name"
                            id="signupName"
                            rules={{
                                required: 'Name is required',
                                maxLength: {
                                    value: 30,
                                    message: 'Name cannot exceed 30 characters',
                                },
                            }}
                        ></FormTextField>
                        <FormTextField
                            name="email"
                            id="signupEmail"
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
                            id="signupPassword"
                            rules={{
                                validate: {
                                    minLength: (value: string) =>
                                        value.length >= 8 ||
                                        'Password must be at least 8 characters',

                                    uppercase: (value: string) =>
                                        /[A-Z]/.test(value) ||
                                        'Password must contain an uppercase letter',

                                    lowercase: (value: string) =>
                                        /[a-z]/.test(value) ||
                                        'Password must contain a lowercase letter',

                                    number: (value: string) =>
                                        /[0-9]/.test(value) ||
                                        'Password must contain a number',

                                    special: (value: string) =>
                                        /[^A-Za-z0-9]/.test(value) ||
                                        'Password must contain a special character',
                                },
                            }}
                        ></FormPassword>
                        <FormPassword
                            name="confirmPassword"
                            id="signupConfirmPassword"
                            label="Confirm Password"
                        ></FormPassword>
                        <FormControl>
                            <FormLabel
                                id="signupUserRole"
                                sx={(theme) => ({
                                    '&.Mui-focused': {
                                        color: theme.palette.common.black,
                                    },
                                })}
                            >
                                Role
                            </FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="User Role"
                                {...methods.register('role', {
                                    required: 'Please select a role',
                                })}
                            >
                                <FormControlLabel
                                    value="customer"
                                    control={<CustomRadio />}
                                    label="Customer"
                                />
                                <FormControlLabel
                                    value="owner"
                                    control={<CustomRadio />}
                                    label="Owner"
                                />
                            </RadioGroup>
                            <FormHelperText error={!!errors.role}>
                                {errors.role?.message}
                            </FormHelperText>
                        </FormControl>
                        <CustomButton
                            variant="outlined"
                            type="submit"
                            size="large"
                        >
                            SignUp
                        </CustomButton>
                    </Stack>
                </form>
            </FormProvider>
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
        </Stack>
    );
}

export default Signup;
