import { InputLabel, styled } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import { type OutlinedInputProps } from '@mui/material/OutlinedInput';

import { FONT_SIZE, FONT_WEIGHT } from '@constant';

//Styling Password box component
export const CustomTextField = styled(OutlinedInput)<OutlinedInputProps>(
    ({ theme }) => ({
        borderRadius: 11,

        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.faded?.light,
        },

        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.grey[700],
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
    transform: 'translate(14px, 9px) scale(1)',

    '&.MuiInputLabel-shrink': {
        //when it start to top
        transform: 'translate(14px, -10px) scale(0.75)',
    },
    '&.MuiInputLabel-root': {
        fontSize: FONT_SIZE.XL,
        fontWeight: FONT_WEIGHT.MEDIUM,
    },
    '&.Mui-focused': {
        color: theme.palette.common.black,
    },
}));
