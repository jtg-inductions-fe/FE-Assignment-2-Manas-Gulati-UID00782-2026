import { useState } from 'react';

import Login from 'layout/Login';
import Signup from 'layout/Signup';

import { Box, Button, Stack, styled, Typography } from '@mui/material';

const CustomButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'selected',
})<{ selected: boolean }>(({ theme, selected }) => ({
    width: '50%',
    borderRadius: '12px 12px 0 0',
    border: `4px solid ${theme.palette.grey[900]}`,
    borderBottom: selected ? 'none' : `4px solid ${theme.palette.grey[500]}`,
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

const FormContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(5),
    borderRadius: '0 0 20px 20px',
    border: `4px solid ${theme.palette.grey[900]}`,
    borderTop: 'none',
    backgroundColor: theme.palette.common.white,
}));

const AuthPage = styled(Box)(({ theme }) => ({
    backgroundImage: "url('/Assets/restaurant 1.webp')",
    width: '100%',
    maxWidth: '2300px',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(16),
}));

const AuthContent = styled(Box)(({ theme }) => ({
    color: theme.palette.common.white,
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    maxWidth: '40vw',
    justifyContent: 'space-around',

    gap: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
        gap: theme.spacing(8),
    },
}));

export default function Auth() {
    const [login, setLoginFrom] = useState(true);

    const loginHandler = () => {
        setLoginFrom(true);
    };

    const signupHandler = () => {
        setLoginFrom(false);
    };

    return (
        <AuthPage>
            <AuthContent>
                <Typography variant="h1" sx={{ fontSize: '100px !important' }}>
                    Meishi
                </Typography>
                <Typography variant="h2" sx={{ fontSize: '40px !important' }}>
                    An exotic Sushi Restaurant
                </Typography>
                <Typography variant="h6" sx={{ fontSize: '20px !important' }}>
                    People eat with their eyes and Sushi creates an easy way for
                    customers to order when they can see beautiful photos of
                    your food
                </Typography>
            </AuthContent>
            <Stack minWidth="25vw">
                <Stack direction="row" width="100%">
                    <CustomButton
                        selected={login}
                        variant="outlined"
                        onClick={loginHandler}
                    >
                        login
                    </CustomButton>
                    <CustomButton
                        selected={!login}
                        variant="outlined"
                        onClick={signupHandler}
                        sx={{ borderLeft: 'none' }}
                    >
                        SignUp
                    </CustomButton>
                </Stack>
                <FormContainer width="100%">
                    {login === true ? <Login></Login> : <Signup></Signup>}
                </FormContainer>
            </Stack>
        </AuthPage>
    );
}
