import { styled, TextField, type TextFieldProps } from '@mui/material';

import { FONT_SIZE } from '@constant';

//Change styling of input Text field
export const CustomTextField = styled(TextField)<TextFieldProps>(
    ({ theme }) => ({
        '& .MuiInputLabel-root.Mui-focused': {
            color: theme.palette.common.black,
        },
        //change size of input text
        '& .MuiOutlinedInput-root': {
            fontSize: FONT_SIZE.XL,
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.grey[700],
            },

            '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.common.black,
            },

            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.common.black,
            },
        },
        //change fontsize of label text
        '& .MuiInputLabel-root': { fontSize: FONT_SIZE.XL },
    }),
);
