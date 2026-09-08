import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    Box,
    CardContent,
    Chip,
    DialogContent,
    Stack,
    styled,
    Typography,
} from '@mui/material';
import { Card } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { FONT_SIZE, FONT_WEIGHT, LINE_HEIGHT } from '@constant';

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

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: theme.spacing(3),
}));

export const StyledOutStockBox = styled(Box)(({}) => ({
    position: 'absolute',
    inset: 0,
    display: 'grid',
    placeItems: 'center',
    backdropFilter: 'blur(10px)',
}));

export const StyledOutStockText = styled(Typography)(({ theme }) => ({
    padding: `${theme.spacing(0.75)}, ${theme.spacing(2.25)}`,
    color: theme.palette.common.white,
    borderRadius: 5,
    border: `2px solid ${theme.palette.common.white}`,
    backgroundColor: theme.palette.faded?.dark,
    textTransform: 'uppercase',
}));

export const StyledPriceText = styled(Typography)(({ theme }) => ({
    marginTop: theme.spacing(3),
    flexShrink: 0,
    color: theme.palette.primary.main,
    fontSize: FONT_SIZE.XL,
    fontWeight: FONT_WEIGHT.BOLD,
    ...theme.mixins.lineClamp(3),
}));

export const StyledDescText = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    ...theme.mixins.lineClamp(3),
}));

export const StyledIngredientsText = styled(Typography)(({ theme }) => ({
    color: theme.palette.faded?.dark,
    fontStyle: 'italic',
    ...theme.mixins.lineClamp(2),
}));

export const StyledDescription = styled(Typography)(({ theme }) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(6),
    color: theme.palette.common.black,
    ...theme.mixins.lineClamp(3),
}));

export const StyledStockText = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontWeight: FONT_WEIGHT.SEMIBOLD,
    ...theme.mixins.lineClamp(3),
}));

export const StyledEditIcon = styled(EditIcon)(({ theme }) => ({
    fontSize: FONT_SIZE['3XL'],
    color: theme.palette.success.light,
}));

export const StyledDeleteIcon = styled(DeleteIcon)(({ theme }) => ({
    fontSize: FONT_SIZE['3XL'],
    color: theme.palette.error.main,
}));

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    marginTop: theme.spacing(2),
}));

export const StyledFoodWrapper = styled(Box)({
    width: '100%',
    display: 'flex',
    flexGrow: 1,
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
    minWidth: 400,
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

export const StyledAddMoreContent = styled(CardContent)(({}) => ({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
}));

export const StyledFooditemWrapper = styled(Box)({
    maxWidth: '2000px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
});

export const StyledFooditemDetailWrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    maxWidth: 1700,
    margin: '0 auto',
    padding: `${theme.spacing(7)} ${theme.spacing(5)} ${theme.spacing(10)}`,
    [theme.breakpoints.up('md')]: {
        paddingBottom: theme.spacing(14),
    },
}));

export const StyledFooditemBannerWrapper = styled(Box)(({ theme }) => ({
    overflow: 'hidden',
    border: `5px solid ${theme.palette.faded?.light}`,
    borderRadius: 11,
    boxShadow: '0 10px 30px rgba(28, 35, 40, 0.05)',
}));

export const StyledFooditemBannerName = styled(Box)(({ theme }) => ({
    display: 'grid',
    flexShrink: 0,
    placeItems: 'center',
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.faded?.light}`,
    borderRadius: 2.5,
    backgroundColor: theme.palette.common.white,
    boxShadow: '0 5px 15px rgba(28, 35, 40, 0.10)',
    [theme.breakpoints.up('sm')]: {
        width: 104,
        height: 104,
        marginTop: theme.spacing(-10),
    },
}));

export const StyledFooditemBannerDetailWrapper = styled(Stack)(({ theme }) => ({
    marginTop: theme.spacing(2),
    color: theme.palette.faded?.main,
}));

export const StyledFooditemBannerChip = styled(Chip)(({ theme }) => ({
    color: theme.palette.faded?.main,
    backgroundColor: theme.palette.faded?.light,
    fontSize: FONT_SIZE.XS,
    fontWeight: FONT_WEIGHT.SEMIBOLD,
}));

export const StyledFooditemBannerDesc = styled(Typography)(({ theme }) => ({
    marginTop: theme.spacing(1.5),
    color: theme.palette.faded?.main,
    lineHeight: LINE_HEIGHT.HEADING,
}));

export const StyledMenuText = styled(Chip)(({ theme }) => ({
    height: 42,
    padding: `0 ${theme.spacing(2)}`,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
}));
