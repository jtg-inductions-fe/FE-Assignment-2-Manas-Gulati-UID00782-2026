import { Button, styled } from '@mui/material';

import { FONT_WEIGHT } from '@constant';

export const StyledButton = styled(Button)(({ theme }) => ({
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
