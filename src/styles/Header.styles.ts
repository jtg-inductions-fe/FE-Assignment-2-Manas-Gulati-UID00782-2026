import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, Badge, BadgeProps, Box, styled, Toolbar } from '@mui/material';

import { FONT_SIZE } from '@constant';

export const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    padding: 5,
    '& .MuiBadge-badge': {
        right: 0,
        top: 5,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '4px ',
        minWidth: 25,
        height: 25,
        fontSize: FONT_SIZE.MD,
    },
}));

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
    color: theme.palette.common.black,
    backgroundColor: theme.palette.primary.light,

    boxShadow: '1px 4px 7px rgba(26, 31, 36, 0.06)',
}));

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    padding: theme.spacing(1.5),
    width: '100%',
}));

export const StyledUserBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(2),
}));

export const StyledShoppingCartIcon = styled(ShoppingCartIcon)(({ theme }) => ({
    fontSize: FONT_SIZE['4XL'],
    color: theme.palette.common.black,
}));
