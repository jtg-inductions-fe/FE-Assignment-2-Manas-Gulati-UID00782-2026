import { styled } from '@mui/material/styles';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { FONT_SIZE, FONT_WEIGHT, LINE_HEIGHT } from '@constant';

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)(
    ({ theme }) => ({
        padding: 5,
        border: `1px solid ${theme.palette.grey[300]}`,
        borderRadius: 28,
        backgroundColor: '#f4f5f6',
        marginRight: 35,

        '& .MuiToggleButton-root': {
            minWidth: 72,
            minHeight: 40,
            padding: theme.spacing(2, 4),
            border: 0,
            borderRadius: '22px',
            color: theme.palette.faded?.dark,
            fontSize: FONT_SIZE.SM,
            fontWeight: FONT_WEIGHT.SEMIBOLD,
            lineHeight: LINE_HEIGHT.TIGHT,

            '&.Mui-selected': {
                color: theme.palette.common.white,
                backgroundColor: theme.palette.primary.main,
            },

            '&.Mui-selected:hover': {
                backgroundColor: theme.palette.primary.dark,
            },
        },
    }),
);
