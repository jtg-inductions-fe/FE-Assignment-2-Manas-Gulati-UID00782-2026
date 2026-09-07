import { Radio, styled } from '@mui/material';

import { FONT_SIZE } from '@constant';

export const CustomRadio = styled(Radio)(({ theme }) => ({
    color: theme.palette.common.black,
    '&.Mui-checked': {
        color: theme.palette.common.black,
    },

    '& .MuiSvgIcon-root': {
        fontSize: FONT_SIZE.XL,
    },
}));
