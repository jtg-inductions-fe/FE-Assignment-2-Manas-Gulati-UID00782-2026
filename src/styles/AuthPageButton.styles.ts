import { Button, styled } from '@mui/material';

export const CustomButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'selected',
})<{ selected: boolean }>(({ theme, selected }) => ({
    width: '50%',
    maxWidth: '250px',
    borderRadius: '1.2rem 0.75rem 0 0',
    border: `0.25rem solid ${theme.palette.grey[900]}`,
    borderBottom: selected
        ? 'none'
        : `0.25rem solid ${theme.palette.grey[500]}`,
    backgroundColor: selected
        ? theme.palette.common.white
        : theme.palette.grey[300],
    color: selected ? theme.palette.common.black : theme.palette.grey[600],
    cursor: selected ? 'default' : 'pointer',

    transition: 'all 0.1s ease',

    '&:hover': {
        backgroundColor: selected
            ? theme.palette.common.white
            : theme.palette.grey[400],
    },
}));
