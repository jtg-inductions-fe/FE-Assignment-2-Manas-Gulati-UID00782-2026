import { Box, styled } from '@mui/material';

export const AuthContent = styled(Box)(({ theme }) => ({
    color: theme.palette.common.white,
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: theme.spacing(4),
}));
