import { Alert, Snackbar, SnackbarCloseReason } from '@mui/material';
import { SnackbarProps } from 'types';

import { FONT_SIZE } from '@constant';

export const CustomizedSnackbar = ({
    severity,
    message,
    state,
    onClose,
}: SnackbarProps) => {
    /**
     * TODO: handle closing of snackbar
     * @param _event - {Event}
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
        <Snackbar open={state} autoHideDuration={6000} onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity={severity}
                variant="filled"
                sx={{
                    alignItems: 'center',
                    '&.MuiAlert-icon': {
                        fontSize: FONT_SIZE['3XL'],
                    },
                }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};
