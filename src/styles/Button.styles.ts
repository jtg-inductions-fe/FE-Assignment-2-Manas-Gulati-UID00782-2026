import { Button, styled } from '@mui/material';
import { alpha } from '@mui/material/styles';

import { FONT_WEIGHT } from '@constant';

export const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: 11,
    fontWeight: FONT_WEIGHT.SEMIBOLD,

    '&.MuiButton-contained': {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.primary.main,
        border: `1px solid ${theme.palette.primary.main}`,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
            borderColor: theme.palette.primary.dark,
        },
    },

    '&.MuiButton-outlined': {
        color: theme.palette.common.black,
        backgroundColor: theme.palette.common.white,
        border: `1px solid ${theme.palette.primary.main}`,
        '&:hover': {
            color: theme.palette.common.black,
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
            borderColor: theme.palette.primary.dark,
        },
    },
}));
