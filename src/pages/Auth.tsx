import { useState } from 'react';

import Login from 'layout/Login';
import Signup from 'layout/Signup';
import { AuthContent } from 'styles/AuthContentBox.styles';
import { FormContainer } from 'styles/AuthFormContainer.styles';
import { AuthPage } from 'styles/AuthPageBox.styles';
import { CustomButton } from 'styles/AuthPageButton.styles';

import { Stack, Typography } from '@mui/material';

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
                <Typography variant="h1">Meishi</Typography>
                <Typography variant="h2">An exotic Sushi Restaurant</Typography>
                <Typography variant="h5" sx={{ maxWidth: '50vw' }}>
                    People eat with their eyes and Sushi creates an easy way for
                    customers to order when they can see beautiful photos of
                    your food
                </Typography>
            </AuthContent>
            <Stack sx={{ maxWidth: '500px', margin: '0 auto' }}>
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
                    {login === true ? <Login /> : <Signup />}
                </FormContainer>
            </Stack>
        </AuthPage>
    );
}
