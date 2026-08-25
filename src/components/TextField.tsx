import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';

import { styled, TextField, type TextFieldProps } from '@mui/material';

//defining props for the text field component
interface LabelProps {
    name: string;
    rules: RegisterOptions;
    id: string;
}

const CustomTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
    '& .MuiInputLabel-root.Mui-focused': {
        color: theme.palette.common.black,
    },

    '& .MuiOutlinedInput-root': {
        fontSize: '20px',
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.grey[700],
        },

        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.common.black,
        },

        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.common.black,
        },
    },
    '& .MuiInputLabel-root': { fontSize: '20px' },
}));

export default function FromTextField({ name, rules, id }: LabelProps) {
    const { control } = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={(
                { field, fieldState }, //field automatically configure all onChange, onBlur, ref and value
            ) => (
                <CustomTextField
                    {...field}
                    id={id}
                    size="small"
                    label={name}
                    variant="outlined"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                />
            )}
        />
    );
}
