import { Button, ButtonProps, styled } from '@mui/material';

export const CustomButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.black,
    borderColor: theme.palette.common.black,
    borderRadius: 20,
}));
