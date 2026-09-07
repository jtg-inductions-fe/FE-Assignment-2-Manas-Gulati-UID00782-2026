import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
    AppBar,
    Badge,
    BadgeProps,
    Box,
    InputBase,
    Toolbar,
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

import { FONT_SIZE } from '@constant';

export const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius * 3,
    backgroundColor: alpha(theme.palette.common.white, 0.35),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(6),
        width: 'auto',
    },
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

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

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',

    '& .MuiInputBase-input': {
        fontSize: FONT_SIZE.XL,
        paddingLeft: `calc(1.2em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
    color: theme.palette.common.black,
    backgroundColor: theme.palette.primary.light,
    //borderBottom: `2px solid ${theme.palette.faded?.light}`,
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
