import { Badge, BadgeProps, InputBase } from '@mui/material';
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
