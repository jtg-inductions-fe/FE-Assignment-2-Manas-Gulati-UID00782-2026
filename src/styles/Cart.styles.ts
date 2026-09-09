import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Card, styled, Typography } from '@mui/material';

import { FONT_SIZE, FONT_WEIGHT } from '@constant';

export const StyledCartWrapper = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr',
    alignItems: 'start',
    gap: 4,
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('lg')]: {
        gridTemplateColumns: 'minmax(0, 2fr) 1fr',
    },
}));

export const StyledEmptyCart = styled(Box)(({ theme }) => ({
    padding: theme.spacing(8),
    border: `2px dashed ${theme.palette.faded?.light}`,
    borderRadius: 3,
    color: theme.palette.faded?.main,
    backgroundColor: theme.palette.common.white,
    textAlign: 'center',
}));

export const StyledCartSummaryWrapper = styled(Card)(({ theme }) => ({
    border: `1px solid ${theme.palette.faded?.light}`,
    borderRadius: 3,
    backgroundColor: theme.palette.common.white,
    boxShadow: '0 10px 30px rgba(28, 35, 40, 0.05)',
    [theme.breakpoints.up('lg')]: {
        top: 24,
        position: 'sticky',
    },
}));

export const StyledTotalText = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: FONT_SIZE['3XL'],
    fontWeight: FONT_WEIGHT.BOLD,
}));

export const StyledCartConfirmButton = styled(Button)(({ theme }) => ({
    marginTop: 4,
    borderRadius: 2,
    fontSize: FONT_SIZE.MD,
    color: theme.palette.common.white,
    fontWeight: FONT_WEIGHT.BOLD,
    textTransform: 'none',
}));

export const StyledCartCard = styled(Card)(({ theme }) => ({
    maxWidth: '100%',
    display: 'flex',
    border: `1px solid ${theme.palette.faded?.light}`,
    borderRadius: 3,
    boxShadow: '0 8px 24px rgba(28, 35, 40, 0.04)',
    flexDirection: 'row',
}));

export const StyledCartItem = styled(Card)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '88px minmax(0, 1fr)',
    alignItems: 'center',
    gap: 2.5,
    [theme.breakpoints.up('md')]: {
        gridTemplateColumns: '120px minmax(0, 1fr) auto',
    },
}));

export const StyledCartPrice = styled(Typography)(({ theme }) => ({
    marginTop: theme.spacing(1.5),
    color: theme.palette.primary.main,
    fontWeight: FONT_WEIGHT.BOLD,
    ...theme.mixins.lineClamp(3),
}));

export const StyledCartDeleteIcon = styled(DeleteIcon)(({ theme }) => ({
    fontSize: FONT_SIZE['3XL'],
    width: 30,
    height: 30,
    color: theme.palette.primary.main,
}));

export const StyledCartPageWrapper = styled(Box)({
    maxWidth: '2000px',
    margin: '0 auto',
});

export const StyledCartDetailWrapper = styled('main')(({ theme }) => ({
    width: '100%',
    maxWidth: 1700,
    margin: '0 auto',
    padding: `${theme.spacing(7)} ${theme.spacing(5)} ${theme.spacing(10)}`,
    [theme.breakpoints.up('md')]: {
        paddingBottom: theme.spacing(14),
    },
}));
