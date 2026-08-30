import { useState } from 'react';

import FormPassword from 'components/Password.component';
import CustomizedSnackbar from 'components/Snackbar.component';
import FormTextField from 'components/TextField.component';
import { FormProvider, useForm } from 'react-hook-form';
import { CustomButton } from 'styles/AuthFormButton.styles';
import { CustomRadio } from 'styles/Radio.styles';

import { AlertColor } from '@mui/material';
import {
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    RadioGroup,
} from '@mui/material';
import Stack from '@mui/material/Stack';

import { FONT_SIZE } from '@constant';

import { ERRORMESSAGES, SUCCESSMESSAGES, VALIDATION } from '../constants';

//defining user data schema
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

//signup form data schema
interface SignupFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
}

function Signup() {
    //setup initial snackbar state
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
        //form data validations
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
                    <h3>SignUp Form</h3>

                    <form
                        className="signupForm"
                        onSubmit={(e) => {
                            void methods.handleSubmit(onSubmit)(e);
                        }}
                    >
                        <Stack spacing={4}>
                            <FormTextField
                                name="name"
                                id="signupName"
                                rules={{
                                    required: VALIDATION.NAMEREQUIRED,
                                    maxLength: {
                                        value: 30,
                                        message: VALIDATION.NAMEXCEED,
                                    },
                                }}
                            />
                            <FormTextField
                                name="email"
                                id="signupEmail"
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
                                id="signupPassword"
                                rules={{
                                    validate: {
                                        minLength: (value: string) =>
                                            value.length >= 8 ||
                                            VALIDATION.PASSWORDSHORT,

                                        uppercase: (value: string) =>
                                            /[A-Z]/.test(value) ||
                                            VALIDATION.PASSWORDUPPER,

                                        lowercase: (value: string) =>
                                            /[a-z]/.test(value) ||
                                            VALIDATION.PASSWORDLOWER,

                                        number: (value: string) =>
                                            /[0-9]/.test(value) ||
                                            VALIDATION.PASSWORDNUM,

                                        special: (value: string) =>
                                            /[^A-Za-z0-9]/.test(value) ||
                                            VALIDATION.PASSWORDSPECIAL,
                                    },
                                }}
                            />
                            <FormPassword
                                name="confirmPassword"
                                id="signupConfirmPassword"
                                label="Confirm Password"
                            />
                            <FormControl>
                                <FormLabel
                                    id="signupUserRole"
                                    sx={(theme) => ({
                                        '&.Mui-focused': {
                                            color: theme.palette.common.black,
                                        },
                                        '&.MuiFormLabel-root': {
                                            fontSize: FONT_SIZE['2XL'],
                                        },
                                    })}
                                >
                                    Role
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="signupUserRole"
                                    {...methods.register('role', {
                                        required: 'Please select a role',
                                    })}
                                >
                                    <FormControlLabel
                                        value="customer"
                                        control={<CustomRadio />}
                                        label="Customer"
                                        sx={{
                                            '& .MuiFormControlLabel-label': {
                                                fontSize: FONT_SIZE.XL,
                                            },
                                        }}
                                    />
                                    <FormControlLabel
                                        value="owner"
                                        control={<CustomRadio />}
                                        label="Owner"
                                        sx={{
                                            '& .MuiFormControlLabel-label': {
                                                fontSize: FONT_SIZE.XL,
                                            },
                                        }}
                                    />
                                </RadioGroup>
                                <FormHelperText error={!!errors.role}>
                                    {errors.role?.message}
                                </FormHelperText>
                            </FormControl>
                            <CustomButton
                                variant="outlined"
                                type="submit"
                                size="medium"
                            >
                                SignUp
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

export default Signup;
