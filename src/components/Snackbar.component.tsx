import { Box } from '@mui/material';
import Alert from '@mui/material/Alert';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import { SnackbarProps } from 'types';

export default function CustomizedSnackbar({
    severity,
    message,
    state,
    onClose,
}: SnackbarProps) {
    /**
     * TODO: handle closing of snackbar
     * @param _event - {any}
     * @param reason - {SnackbarCloseReason}
     */
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
