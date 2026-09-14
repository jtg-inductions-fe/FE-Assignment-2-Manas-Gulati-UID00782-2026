import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthUser, LoginFormData, SignupFormData, User } from 'types';
import { AuthDataInterface } from 'types/mockdata.types';

import { ERRORMESSAGES } from '../constants';
import mockData from '../MOCK_DATA/user.json';

const storedUser = localStorage.getItem('user');

const loggedInUser: User | null = storedUser
    ? (JSON.parse(storedUser) as User)
    : null;

const initialState: AuthUser = {
    userId: loggedInUser?.userId ?? null,
    user: loggedInUser,
    isAuthenticated: loggedInUser !== null,
    isCreated: false,
    message: '',
    signupAttempt: 0,
    loginAttempt: 0,
};

const data: AuthDataInterface = mockData;

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<LoginFormData>) => {
            state.loginAttempt += 1;

            const user = data[action.payload.email];
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
            const user = data[action.payload.email];
            if (!user) {
                if (
                    action.payload.confirmPassword === action.payload.password
                ) {
                    data[action.payload.email] = {
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
