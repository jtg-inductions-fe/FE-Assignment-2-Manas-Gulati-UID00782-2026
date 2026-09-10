import { useState } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { CustomInputLabel, CustomTextField } from 'styles/Password.styles';
import { PasswordProps } from 'types';

import { FONT_SIZE } from '@constant';

import { VALIDATION } from '../constants';

export const FormPassword = ({ name, id, label, rules }: PasswordProps) => {
    const { control } = useFormContext(); //constraint rhf to specific form

    //to manage show/hide password functionality
    const [showPassword, setShowPassword] = useState(false);

    /**
     * TODO: set functionality to show or hide password
     * @returns any
     */
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <Controller
            name={name}
            control={control} //RHF management
            rules={{
                required: VALIDATION.PASSWORDREQUIRED,
                ...rules,
            }}
            render={({ field, fieldState }) => (
                <FormControl error={!!fieldState.error}>
                    {/*set current state of form */}
                    {/* add label to password text field */}
                    <CustomInputLabel htmlFor={id}>
                        {label ? `*${label}` : '*Password'}
                    </CustomInputLabel>
                    <CustomTextField
                        {...field}
                        id={id}
                        size="small"
                        //show/hide password functionality
                        type={showPassword ? 'text' : 'password'}
                        //set position of icon
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        showPassword
                                            ? 'hide the password'
                                            : 'display the password'
                                    }
                                    onClick={handleClickShowPassword}
                                    onMouseDown={(event) =>
                                        event.preventDefault()
                                    }
                                    edge="end"
                                >
                                    {showPassword ? (
                                        <VisibilityOff
                                            sx={{ fontSize: FONT_SIZE['4XL'] }}
                                        />
                                    ) : (
                                        <Visibility
                                            sx={{ fontSize: FONT_SIZE['4XL'] }}
                                        />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                        label={label || '*Password'}
                        error={!!fieldState.error}
                    />
                    {/* display error message */}
                    <FormHelperText>{fieldState.error?.message}</FormHelperText>
                </FormControl>
            )}
        />
    );
};
