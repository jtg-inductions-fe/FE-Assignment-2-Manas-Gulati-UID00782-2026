import { AlertColor } from '@mui/material';

//defining props for the Snackbar component
export interface SnackbarProps {
    severity: AlertColor;
    message: string;
    state: boolean;
    onClose: () => void; //child tells the parent to just close itself: necessary for remounting
}
