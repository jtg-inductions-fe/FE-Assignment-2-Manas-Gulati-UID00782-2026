import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthUser, LoginFormData, SignupFormData, User } from 'types';

import { ERRORMESSAGES } from '../constants';

const mockData: Record<string, User> = {
    'm@gmail.com': {
        userId: 0,
        name: 'manas',
        email: 'm@gmail.com',
        password: 'abs',
        role: 'customer',
    },
    's@gmail.com': {
        userId: 1,
        name: 'sanjay',
        email: 's@gmail.com',
        password: 'abc',
        role: 'owner',
    },
    'k@gmail.com': {
        userId: 2,
        name: 'kris',
        email: 'k@gmail.com',
        password: 'abk',
        role: 'owner',
    },
};

const initialState: AuthUser = {
    userId: null,
    user: null,
    isAuthenticated: false,
    isCreated: false,
    message: '',
    signupAttempt: 0,
    loginAttempt: 0,
};

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<LoginFormData>) => {
            state.loginAttempt += 1;
            const user = mockData[action.payload.email];

            if (user && user.password === action.payload.password) {
                state.user = user;
                state.isAuthenticated = true;
                state.message = '';

                localStorage.setItem('user', JSON.stringify(user));
            } else if (user && user.password !== action.payload.password) {
                state.user = null;
                state.isAuthenticated = false;
                state.message = ERRORMESSAGES.WRONGPASSWORD;
            } else {
                state.user = null;
                state.isAuthenticated = false;
                state.message = ERRORMESSAGES.USERNOTFOUND;
            }
        },

        signin: (state, action: PayloadAction<SignupFormData>) => {
            state.signupAttempt += 1;
            const user = mockData[action.payload.email];
            if (!user) {
                if (
                    action.payload.confirmPassword === action.payload.password
                ) {
                    mockData[action.payload.email] = {
                        userId: Date.now(),
                        name: action.payload.name,
                        email: action.payload.email,
                        password: action.payload.password,
                        role: action.payload.role,
                    };
                    state.isCreated = true;
                    state.message = '';
                } else {
                    state.isCreated = false;
                    state.message = ERRORMESSAGES.PASSWORDNOMATCH;
                }
            } else {
                state.isCreated = false;
                state.message = ERRORMESSAGES.USEREXIST;
            }
        },

        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;

            localStorage.removeItem('user');
        },
    },
});

export const { login, logout, signin } = AuthSlice.actions;

export default AuthSlice.reducer;
