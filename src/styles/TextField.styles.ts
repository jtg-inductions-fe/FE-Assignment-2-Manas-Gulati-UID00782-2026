import { styled, TextField, type TextFieldProps } from '@mui/material';

import { FONT_SIZE, FONT_WEIGHT } from '@constant';

//Change styling of input Text field
export const CustomTextField = styled(TextField)<TextFieldProps>(
    ({ theme }) => ({
        '& .MuiInputLabel-root.Mui-focused': {
            color: theme.palette.common.black,
        },

        //change size of input text
        '& .MuiOutlinedInput-root': {
            borderRadius: 11,
            fontSize: FONT_SIZE.XL,
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.faded?.light,
            },

            '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.grey[700],
            },

            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.common.black,
            },
        },

        //change fontsize of label text
        '& .MuiInputLabel-root': {
            fontSize: FONT_SIZE.XL,
            fontWeight: FONT_WEIGHT.MEDIUM,
        },
    }),
);
