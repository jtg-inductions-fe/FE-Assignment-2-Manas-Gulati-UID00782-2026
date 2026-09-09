import { Controller, useFormContext } from 'react-hook-form';
import { CustomTextField } from 'styles/TextField.styles';
import { LabelProps } from 'types';

export default function FromTextField({
    name,
    rules,
    id,
    defaultVal,
    type = 'text',
}: LabelProps) {
    const { control } = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            defaultValue={defaultVal}
            render={(
                { field, fieldState }, //field automatically configure all onChange, onBlur, ref and value
            ) => (
                <CustomTextField
                    {...field}
                    id={id}
                    type={type}
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
