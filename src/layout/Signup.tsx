import { useEffect, useRef } from 'react';

import {
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    RadioGroup,
    Stack,
} from '@mui/material';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { signin } from 'store/authSlice';
import { useTypeDispatch, useTypeSelector } from 'store/hooks';
import { CustomRadio } from 'styles/Radio.styles';
import { SignupFormData } from 'types';
import { SignupProps } from 'types/signup.types';

import { FormPassword, FormTextField, ReusableButton } from '@components';
import { FONT_SIZE, FONT_WEIGHT } from '@constant';

import { SUCCESSMESSAGES, VALIDATION } from '../constants';

export const Signup = ({ setSnackbar }: SignupProps) => {
    //setup initial snackbar state
    const dispatch = useTypeDispatch();
    const { isCreated, message, signupAttempt } = useTypeSelector(
        (state) => state.auth,
    );

    const methods = useForm<SignupFormData>();
    const {
        formState: { errors },
    } = methods;

    const signupNumber = useRef(signupAttempt);

    /**
     * TODO: sets signup data
     * @param data - {SignupFormData}
     */
    const onSubmit = (data: SignupFormData) => {
        dispatch(signin(data)); //update signup attempt at every signup attempt and check signup validations
    };

    useEffect(() => {
        if (signupAttempt === signupNumber.current) return;
        //throws snackbar at every signup attempt
        if (isCreated) {
            setSnackbar((prev) => ({
                ...prev,
                state: true,
                message: SUCCESSMESSAGES.SIGNUP,
                severity: 'success',
            }));
        } else if (message) {
            setSnackbar((prev) => ({
                ...prev,
                state: true,
                message,
                severity: 'error',
            }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [signupAttempt]);

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
                                    *Role
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
                            <ReusableButton type="submit" size="medium">
                                SignUp
                            </ReusableButton>
                        </Stack>
                    </form>
                </FormProvider>
            </Stack>
        </>
    );
};
