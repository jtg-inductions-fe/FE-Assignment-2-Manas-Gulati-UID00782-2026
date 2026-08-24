import Alert, { AlertColor } from '@mui/material/Alert';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';

//defining props for the Snackbar component
interface SnackbarProps {
    severity: AlertColor;
    message: string;
    state: boolean;
    onClose: () => void;
}

export default function CustomizedSnackbar({
    severity,
    message,
    state,
    onClose,
}: SnackbarProps) {
    const handleClose = (
        _event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        onClose();
    };

    return (
        <div>
            <Snackbar
                open={state}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}
