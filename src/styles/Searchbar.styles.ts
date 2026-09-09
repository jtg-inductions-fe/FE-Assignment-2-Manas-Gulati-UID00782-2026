import { InputBase } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

import { FONT_SIZE } from '@constant';

export const StyledSearchContainer = styled('div')(({ theme }) => ({
    position: 'relative',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    borderRadius: theme.shape.borderRadius * 3,
    backgroundColor: alpha(theme.palette.common.white, 0.35),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(6),
        width: 'auto',
    },
}));

export const StyledSearchIconContainer = styled('div')(({ theme }) => ({
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: theme.spacing(0, 2),
    pointerEvents: 'none',
}));

export const StyledSearchInput = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        width: '100%',
        paddingLeft: `calc(1.2em + ${theme.spacing(4)})`,
        fontSize: FONT_SIZE.XL,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));
