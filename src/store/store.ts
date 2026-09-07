import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        //Add my reducers here later on
    },
});

export type ReduxState = ReturnType<typeof store.getState>;
export type DispatchStore = typeof store.dispatch;
