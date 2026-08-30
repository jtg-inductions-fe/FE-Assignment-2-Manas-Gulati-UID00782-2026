import { InputLabel, styled } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import { type OutlinedInputProps } from '@mui/material/OutlinedInput';

import { FONT_SIZE } from '@constant';

//Styling Password box component
export const CustomTextField = styled(OutlinedInput)<OutlinedInputProps>(
    ({ theme }) => ({
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.grey[700],
        },

        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.common.black,
        },

        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.common.black,
        },

        //styling input text in password field
        '& .MuiOutlinedInput-input': {
            fontSize: FONT_SIZE.XL,
        },
    }),
);

//Styling password textfield label
export const CustomInputLabel = styled(InputLabel)(({ theme }) => ({
    color: theme.palette.grey[700],
    '&.MuiInputLabel-root': {
        fontSize: FONT_SIZE.XL,
    },
    '&.Mui-focused': {
        color: theme.palette.common.black,
    },
}));
