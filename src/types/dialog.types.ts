import { ReactNode } from 'react';

import { ButtonProps, DialogProps } from '@mui/material';
import { DefaultValues, FieldValues, SubmitHandler } from 'react-hook-form';

interface ReusableDialogProps {
    title: ReactNode;
    children: ReactNode;
    open: boolean;
    onClose: () => void;

    cancelLabel?: string;
    confirmLabel?: string;

    cancelButtonProps?: ButtonProps;
    confirmButtonProps?: ButtonProps;

    fullWidth?: boolean;
    maxWidth?: DialogProps['maxWidth'];
}

export interface NoFormProps extends ReusableDialogProps {
    onConfirm: () => void;
}

export interface FormProps<TFormValues extends FieldValues>
    extends ReusableDialogProps {
    onSubmit: SubmitHandler<TFormValues>;
    defaultValues?: DefaultValues<TFormValues>;
}
