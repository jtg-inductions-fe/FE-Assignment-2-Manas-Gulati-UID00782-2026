import {
    DialogActions,
    DialogContent,
    DialogTitle,
    styled,
} from '@mui/material';

export const StyledDialogTitle = styled(DialogTitle)({
    paddingBottom: 0,
});

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    marginTop: theme.spacing(2),
}));

export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
    padding: theme.spacing(2, 3, 3),
    gap: theme.spacing(1),
}));
