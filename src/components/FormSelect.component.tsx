import { Controller, useFormContext } from 'react-hook-form';
import { CustomTextField } from 'styles/TextField.styles';
import { FormSelectFieldProps } from 'types/select.types';

export const FormSelectField = ({
    name,
    id,
    label,
    rules,
    children,
}: FormSelectFieldProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => (
                <CustomTextField
                    {...field}
                    id={id}
                    size="small"
                    select
                    label={`*${label}`}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                >
                    {children}
                </CustomTextField>
            )}
        />
    );
};
