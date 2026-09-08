import {
    Dialog,
    DialogActions,
    DialogActionsProps,
    DialogContent,
    DialogContentProps,
    DialogProps,
    DialogTitle,
    DialogTitleProps,
} from '@mui/material';
import {
    StyledDialogActions,
    StyledDialogContent,
    StyledDialogTitle,
} from 'styles/Dialog.styles';

export function ReusableDialogTitle(props: DialogTitleProps) {
    return <StyledDialogTitle {...props} />;
}

export function ReusableDialogContent(props: DialogContentProps) {
    return <StyledDialogContent {...props} />;
}

export function ReusableDialogActions(props: DialogActionsProps) {
    return <StyledDialogActions {...props} />;
}

export { DialogActions, DialogContent, DialogTitle };

export default function ReusableDialog({ children, ...props }: DialogProps) {
    return <Dialog {...props}>{children}</Dialog>;
}
