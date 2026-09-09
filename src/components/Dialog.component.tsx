import { Dialog } from '@mui/material';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import {
    StyledDialogActions,
    StyledDialogContent,
    StyledDialogTitle,
} from 'styles/Dialog.styles';
import { FormProps, NoFormProps } from 'types/dialog.types';

import { ReusableButton } from './Button.component';

export const NoFormDialog = ({
    title,
    children,
    open,
    onClose,
    onConfirm,
    cancelLabel = 'Cancel',
    confirmLabel = 'Confirm',
    cancelButtonProps,
    confirmButtonProps,
    fullWidth = true,
    maxWidth = 'sm',
}: NoFormProps) => (
    <Dialog
        open={open}
        onClose={onClose}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
    >
        <StyledDialogTitle>{title}</StyledDialogTitle>

        <StyledDialogContent>{children}</StyledDialogContent>

        <StyledDialogActions>
            <ReusableButton
                size="small"
                color="inherit"
                onClick={onClose}
                {...cancelButtonProps}
            >
                {cancelLabel}
            </ReusableButton>

            <ReusableButton
                size="small"
                variant="contained"
                onClick={() => {
                    onConfirm();
                    onClose();
                }}
                {...confirmButtonProps}
            >
                {confirmLabel}
            </ReusableButton>
        </StyledDialogActions>
    </Dialog>
);

export const FormDialog = <TFormValues extends FieldValues>({
    title,
    children,
    open,
    onClose,
    onSubmit,
    defaultValues,
    cancelLabel = 'Cancel',
    confirmLabel = 'Confirm',
    cancelButtonProps,
    confirmButtonProps,
    fullWidth = true,
    maxWidth = 'sm',
}: FormProps<TFormValues>) => {
    const methods = useForm<TFormValues>({
        defaultValues,
    });

    const handleSubmit = methods.handleSubmit((data) => {
        onSubmit(data);
        onClose();
    });

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth={fullWidth}
            maxWidth={maxWidth}
        >
            <StyledDialogTitle>{title}</StyledDialogTitle>

            <FormProvider {...methods}>
                <form
                    onSubmit={(event) => {
                        void handleSubmit(event);
                    }}
                    noValidate
                >
                    <StyledDialogContent>{children}</StyledDialogContent>

                    <StyledDialogActions>
                        <ReusableButton
                            size="small"
                            color="inherit"
                            onClick={onClose}
                            {...cancelButtonProps}
                        >
                            {cancelLabel}
                        </ReusableButton>

                        <ReusableButton
                            size="small"
                            variant="contained"
                            type="submit"
                            disabled={methods.formState.isSubmitting}
                            {...confirmButtonProps}
                        >
                            {confirmLabel}
                        </ReusableButton>
                    </StyledDialogActions>
                </form>
            </FormProvider>
        </Dialog>
    );
};
