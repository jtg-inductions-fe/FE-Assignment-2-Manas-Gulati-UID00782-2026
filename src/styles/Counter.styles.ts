import { Box, styled, Typography } from '@mui/material';

export const StyledCount = styled(Typography)(({}) => ({
    minWidth: 40,
    textAlign: 'center',
}));

export const StyledCounterBox = styled(Box)(({ theme }) => ({
    flexShrink: 0,
    p: theme.spacing(0.25),
    borderRadius: 2,
    backgroundColor: theme.palette.faded?.light,
}));
