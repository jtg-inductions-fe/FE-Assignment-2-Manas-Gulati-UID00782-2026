import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import { CustomTextField } from 'styles/TextField.styles';

//defining props for the text field component
interface LabelProps {
    name: string;
    rules: RegisterOptions;
    id: string;
}

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
