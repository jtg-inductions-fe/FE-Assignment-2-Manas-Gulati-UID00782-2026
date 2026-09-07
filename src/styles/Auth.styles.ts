import { Box, Button, ButtonProps, styled, Typography } from '@mui/material';

import { FONT_SIZE, FONT_WEIGHT } from '@constant';

export const AuthContent = styled(Box)(({ theme }) => ({
    position: 'relative',
    color: theme.palette.common.white,
    minHeight: 180,
    backgroundImage: "url('/Assets/restaurant 1.webp')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    [theme.breakpoints.up('md')]: {
        minHeight: 260,
        backgroundPosition: 'center',
    },
    [theme.breakpoints.up('lg')]: {
        minHeight: '100vh',
    },
}));

export const AuthBrand = styled(Box)(({ theme }) => ({
    position: 'absolute',
    left: theme.spacing(4),
    right: theme.spacing(7.5),
    bottom: theme.spacing(5.5),

    [theme.breakpoints.up('md')]: {
        left: theme.spacing(6),
        bottom: theme.spacing(12),
    },

    [theme.breakpoints.up('lg')]: {
        left: theme.spacing(7.5),
        bottom: theme.spacing(7),
    },
}));

export const FormCustomButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 11,
    fontWeight: FONT_WEIGHT.SEMIBOLD,
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
        borderColor: theme.palette.primary.dark,
    },
}));

export const AuthCard = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'minmax(180px, 34vh) minmax(0, 1fr)',
    overflow: 'hidden',
    backgroundColor: theme.palette.common.white,

    [theme.breakpoints.up('lg')]: {
        gridTemplateColumns: '60% 40%',
        gridTemplateRows: '1fr',
    },
}));

export const AuthFormSide = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(5),
    padding: theme.spacing(0, 5),
    backgroundColor: theme.palette.common.white,

    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(0, 8),
    },

    [theme.breakpoints.up('lg')]: {
        padding: theme.spacing(0, 10),
        justifyContent: 'center',
    },
}));

export const FormContainer = styled(Box)(() => ({
    width: '100%',
}));

export const CustomButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'selected',
})<{ selected: boolean }>(({ theme, selected }) => ({
    width: '50%',
    padding: theme.spacing(2, 3),
    borderRadius: 0,
    border: 0,
    borderBottom: `4px solid ${selected ? theme.palette.primary.main : theme.palette.grey[200]}`,
    //backgroundColor: 'transparent',
    letterSpacing: '0.04em',
    //color: selected ? theme.palette.primary.main : theme.palette.faded?.dark,
    cursor: selected ? 'default' : 'pointer',

    transition: 'all 0.1s ease',

    '&:hover': {
        border: 0,
        borderBottom: `4px solid ${selected ? theme.palette.primary.main : theme.palette.grey[300]}`,
        backgroundColor: 'transparent',
    },
}));

export const AuthPage = styled(Box)({
    width: '100%',
    minHeight: '100vh',
    padding: 0,
    display: 'flex',
    margin: '0 auto',
    maxWidth: '2000px',
});

export const AuthPageSubheading = styled(Typography)(({ theme }) => ({
    marginTop: theme.spacing(1),
    fontsize: FONT_SIZE.MD,
    [theme.breakpoints.up('md')]: {
        fontSize: FONT_SIZE.LG,
    },
}));

export const AuthPageFormHeading = styled(Typography)(({ theme }) => ({
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5),
    color: theme.palette.common.black,
}));
