import { Box, Card, styled, Typography } from '@mui/material';

import { FONT_SIZE, FONT_WEIGHT } from '@constant';

export const StyledOrderCard = styled(Card)(({ theme }) => ({
    width: '100%',
    border: `1px solid ${theme.palette.faded?.light}`,
    borderRadius: 3,
    boxShadow: '0 8px 24px rgba(28, 35, 40, 0.05)',
}));

export const StyledOrderPrice = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: FONT_SIZE['2XL'],
    fontWeight: FONT_WEIGHT.BOLD,
}));

export const StyledOrderPageWrapper = styled(Box)({
    maxWidth: '2000px',
    margin: '0 auto',
});

export const StyledOrderDetailWrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    maxWidth: 1700,
    margin: '0 auto',
    padding: `${theme.spacing(7)} ${theme.spacing(5)} ${theme.spacing(10)}`,
    [theme.breakpoints.up('md')]: {
        paddingBottom: theme.spacing(14),
    },
}));
