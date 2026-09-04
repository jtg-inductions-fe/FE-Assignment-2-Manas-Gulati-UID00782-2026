import { Radio, styled } from '@mui/material';

import { FONT_SIZE } from '@constant';

export const CustomRadio = styled(Radio)(({ theme }) => ({
    color: theme.palette.grey[400],

    '& .MuiSvgIcon-root': {
        fontSize: FONT_SIZE.XL,
    },
}));
