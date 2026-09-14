import { Controller, useFormContext } from 'react-hook-form';
import { CustomTextField } from 'styles/TextField.styles';
import { FormTimeFieldProps } from 'types/time.types';

export const FormTimeField = ({
    name,
    id,
    label,
    rules,
}: FormTimeFieldProps) => {
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
                    type="time"
                    size="small"
                    label={`*${label}`}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                />
            )}
        />
    );
};
