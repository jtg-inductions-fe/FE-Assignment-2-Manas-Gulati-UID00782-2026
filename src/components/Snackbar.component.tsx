import { Box } from '@mui/material';
import Alert, { AlertColor } from '@mui/material/Alert';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';

//defining props for the Snackbar component
interface SnackbarProps {
    severity: AlertColor;
    message: string;
    state: boolean;
    onClose: () => void; //child tells the parent to just close itself: necessary for remounting
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
        //don't close snackbar when user touch anywhere outside snackbar
        if (reason === 'clickaway') {
            return;
        }
        onClose();
    };

    return (
        <Box>
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
        </Box>
    );
}
