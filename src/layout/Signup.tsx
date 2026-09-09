import { useEffect, useState } from 'react';

import { AlertColor } from '@mui/material';
import {
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    RadioGroup,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import ReusableButton from 'components/Button.component';
import FormPassword from 'components/Password.component';
import CustomizedSnackbar from 'components/Snackbar.component';
import FormTextField from 'components/TextField.component';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { signin } from 'store/authSlice';
import { useTypeDispatch, useTypeSelector } from 'store/hooks';
import { CustomRadio } from 'styles/Radio.styles';
import { SignupFormData } from 'types';

import { FONT_SIZE, FONT_WEIGHT } from '@constant';

import { SUCCESSMESSAGES, VALIDATION } from '../constants';

function Signup() {
    //setup initial snackbar state
    const dispatch = useTypeDispatch();
    const { isCreated, message, signupAttempt } = useTypeSelector(
        (state) => state.auth,
    );
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as AlertColor,
    });
    const methods = useForm<SignupFormData>();
    const {
        formState: { errors },
    } = methods;

    /**
     * TODO: sets signup data
     * @param data - {SignupFormData}
     */
    const onSubmit = (data: SignupFormData) => {
        dispatch(signin(data)); //update signup attempt at every signup attempt and check signup validations
    };

    useEffect(() => {
        //throws snackbar at every signup attempt
        if (isCreated) {
            setSnackbar({
                open: true,
                message: SUCCESSMESSAGES.SIGNUP,
                severity: 'success',
            });
        } else if (message) {
            setSnackbar({
                open: true,
                message,
                severity: 'error',
            });
        }
    }, [isCreated, message, signupAttempt]);

    return (
        <>
            <Stack spacing={4}>
                <FormProvider {...methods}>
                    <form
                        className="signupForm"
                        onSubmit={(e) => {
                            void methods.handleSubmit(onSubmit)(e);
                        }}
                    >
                        <Stack spacing={5}>
                            <FormTextField
                                name="name"
                                id="signupName"
                                rules={{
                                    required: VALIDATION.NAMEREQUIRED,
                                    maxLength: {
                                        value: 30,
                                        message: VALIDATION.NAMEXCEED.replace(
                                            '{{name_count}}',
                                            '30',
                                        ),
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
                            <FormPassword
                                name="password"
                                id="signupPassword"
                                rules={{
                                    validate: {
                                        minLength: (value: string) =>
                                            value.length >= 8 ||
                                            VALIDATION.PASSWORDSHORT.replace(
                                                '{{password_length}}',
                                                '8',
                                            ),

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
                                            fontSize: FONT_SIZE['XL'],
                                            fontWeight: FONT_WEIGHT.REGULAR,
                                        },
                                    })}
                                >
                                    Role
                                </FormLabel>
                                <Controller
                                    name="role"
                                    control={methods.control}
                                    rules={{
                                        required: 'Please select a role',
                                    }}
                                    render={({ field }) => (
                                        <RadioGroup
                                            row
                                            aria-labelledby="signupUserRole"
                                            {...field}
                                        >
                                            <FormControlLabel
                                                value="customer"
                                                control={<CustomRadio />}
                                                label="Customer"
                                                sx={{
                                                    '& .MuiFormControlLabel-label':
                                                        {
                                                            fontSize:
                                                                FONT_SIZE.XL,
                                                        },
                                                }}
                                            />

                                            <FormControlLabel
                                                value="owner"
                                                control={<CustomRadio />}
                                                label="Owner"
                                                sx={{
                                                    '& .MuiFormControlLabel-label':
                                                        {
                                                            fontSize:
                                                                FONT_SIZE.XL,
                                                        },
                                                }}
                                            />
                                        </RadioGroup>
                                    )}
                                />

                                <FormHelperText error={!!errors.role}>
                                    {errors.role?.message}
                                </FormHelperText>
                            </FormControl>
                            <ReusableButton
                                variant="outlined"
                                type="submit"
                                size="medium"
                            >
                                SignUp
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

export default Signup;
