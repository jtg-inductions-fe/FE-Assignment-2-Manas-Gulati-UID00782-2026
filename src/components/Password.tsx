import { useState } from 'react';

import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormControl, FormHelperText, InputLabel, styled } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { type OutlinedInputProps } from '@mui/material/OutlinedInput';

//defining props for password component
interface PasswordProps {
    name: string;
    id: string;
    label?: string;
    rules?: RegisterOptions;
}

const CustomTextField = styled(OutlinedInput)<OutlinedInputProps>(
    ({ theme }) => ({
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.grey[700],
        },

        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.common.black,
        },

        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.common.black,
        },
        '& .MuiOutlinedInput-input': {
            fontSize: '20px',
        },
    }),
);

const CustomInputLabel = styled(InputLabel)(({ theme }) => ({
    color: theme.palette.grey[700],
    '&.MuiInputLabel-root': {
        fontSize: '20px',
    },
    '&.Mui-focused': {
        color: theme.palette.common.black,
    },
}));

export default function FormPassword({
    name,
    id,
    label,
    rules,
}: PasswordProps) {
    const { control } = useFormContext();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <Controller
            name={name}
            control={control}
            rules={{
                required: 'Password is required',
                ...rules,
            }}
            render={({ field, fieldState }) => (
                <FormControl error={!!fieldState.error}>
                    <CustomInputLabel htmlFor={id}>
                        {label || 'Password'}
                    </CustomInputLabel>

                    <CustomTextField
                        {...field}
                        id={id}
                        size="small"
                        type={showPassword ? 'text' : 'password'}
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
                                            sx={{ fontSize: '35px' }}
                                        />
                                    ) : (
                                        <Visibility sx={{ fontSize: '35px' }} />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                        label={label || 'Password'}
                        error={!!fieldState.error}
                    />

                    <FormHelperText>{fieldState.error?.message}</FormHelperText>
                </FormControl>
            )}
        />
    );
}
