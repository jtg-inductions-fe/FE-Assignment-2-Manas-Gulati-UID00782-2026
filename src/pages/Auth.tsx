import { useState } from 'react';

import Login from 'layout/Login';
import Signup from 'layout/Signup';
import {
    AuthBrand,
    AuthCard,
    AuthContent,
    AuthFormSide,
    AuthPage,
    AuthPageFormHeading,
    AuthPageSubheading,
    CustomButton,
    FormContainer,
} from 'styles/Auth.styles';

import { Stack, Typography } from '@mui/material';

export default function Auth() {
    const [login, setLoginFrom] = useState(true);

    const toggleStateHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        const id = e.currentTarget.id;
        if (id === 'login') {
            setLoginFrom(true);
        } else {
            setLoginFrom(false);
        }
    };

    return (
        <AuthPage>
            <AuthCard>
                <AuthContent>
                    <AuthBrand>
                        <Typography variant="h2">Meishi</Typography>
                        <AuthPageSubheading variant="h6">
                            An exotic Sushi Restaurant
                        </AuthPageSubheading>
                    </AuthBrand>
                </AuthContent>
                <AuthFormSide>
                    <Stack direction="row" width="100%">
                        <CustomButton
                            selected={login}
                            //onClick={toggleStateHandler}
                            aria-pressed={login}
                            id="login"
                        >
                            Log In
                        </CustomButton>
                        <CustomButton
                            selected={!login}
                            onClick={toggleStateHandler}
                            aria-pressed={!login}
                            id="signup"
                        >
                            Sign Up
                        </CustomButton>
                    </Stack>

                    <AuthPageFormHeading variant="h6">
                        {login ? 'Welcome Back' : 'Create Your Account'}
                    </AuthPageFormHeading>

                    <FormContainer>
                        {login ? <Login /> : <Signup />}
                    </FormContainer>
                </AuthFormSide>
            </AuthCard>
        </AuthPage>
    );
}
