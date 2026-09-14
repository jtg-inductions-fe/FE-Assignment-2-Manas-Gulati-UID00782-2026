import AddIcon from '@mui/icons-material/Add';
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    MenuItem,
    styled,
    TextField,
    Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

import { FONT_SIZE } from '@constant';

export const StyledCard = styled(Card)(({ theme }) => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${theme.palette.faded?.light}`,
    borderRadius: 3,
    transition: 'transform 180ms ease, box-shadow 180ms ease',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0px 4px 4px 4px rgba(28, 35, 40, 0.10)',
    },
}));

export const StyledCardActionArea = styled(CardActionArea)({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
});

export const StyledCategoryBox = styled('img')(({ theme }) => ({
    marginTop: theme.spacing(2.5),
    width: 20,
    objectFit: 'contain',
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: theme.spacing(3),
}));

export const StyledDescription = styled(Typography)(({ theme }) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(6),
    color: theme.palette.common.black,
    ...theme.mixins.lineClamp(3),
}));

export const StyledCategoryTextfield = styled(TextField)(({ theme }) => ({
    '& .MuiSelect-select': {
        fontSize: FONT_SIZE['XL'],
    },
    '& .MuiInputLabel-root': {
        fontSize: FONT_SIZE['XL'],
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: theme.palette.common.black,
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.grey[700],
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.common.black,
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.common.black,
    },
}));

export const StyledMenuItem = styled(MenuItem)({
    '&.MuiMenuItem-root': {
        fontSize: FONT_SIZE['XL'],
    },
});

export const CustomCardGrid = styled(Grid)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
});

export const CustomGridWrapper = styled(Grid)(({ theme }) => ({
    margin: `${theme.spacing(5)} auto 0`,
    alignItems: 'stretch',
}));

export const StyledAddMoreCard = styled(Card)(({ theme }) => ({
    width: '100%',
    minHeight: 600,
    minWidth: 300,
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    filter: 'grayscale(100%)',
    opacity: 0.7,
    transition: '0.3s',
    border: `2px dashed ${theme.palette.faded?.main}`,
    borderRadius: 3,
    color: theme.palette.faded?.main,
    backgroundColor: theme.palette.faded?.light,

    '&:hover': {
        opacity: 1,
        filter: 'grayscale(0%)',
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.common.white,
        borderColor: theme.palette.primary.light,
    },
}));

export const StyledAddIcon = styled(AddIcon)(({ theme }) => ({
    fontSize: 60,
    marginBottom: theme.spacing(1),
}));

export const StyledDashboardWrapper = styled(Box)({
    maxWidth: '2000px',
    margin: '0 auto',
});

export const StyledRestaurantDetailWrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    maxWidth: 1700,
    margin: '0 auto',
    padding: `${theme.spacing(7)} ${theme.spacing(5)} ${theme.spacing(10)}`,
    [theme.breakpoints.up('md')]: {
        paddingBottom: theme.spacing(14),
    },
}));
