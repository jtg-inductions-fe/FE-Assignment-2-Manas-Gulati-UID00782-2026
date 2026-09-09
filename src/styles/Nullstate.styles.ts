import { Box, styled } from '@mui/material';

export const StyledNullState = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    gap: theme.spacing(0.5),
    padding: theme.spacing(4),
    width: '100%',
}));
