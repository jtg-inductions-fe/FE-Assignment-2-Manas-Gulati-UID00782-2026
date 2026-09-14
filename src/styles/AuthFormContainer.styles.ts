import { Box, styled } from '@mui/material';

export const FormContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(5),
    borderRadius: '0 0 20px 20px',
    border: `0.25rem solid ${theme.palette.grey[900]}`,
    borderTop: 'none',
    backgroundColor: theme.palette.common.white,
    maxWidth: '500px',
}));
