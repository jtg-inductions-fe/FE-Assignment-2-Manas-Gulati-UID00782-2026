import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import foodReducer from './fooditemSlice';
import restaurantReducer from './restaurantSlice';
import selectRestaurantReducer from './selectRestaurantSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        restaurant: restaurantReducer,
        selectedRestaurant: selectRestaurantReducer,
        food: foodReducer,
    },
});

export type ReduxState = ReturnType<typeof store.getState>;
export type DispatchStore = typeof store.dispatch;
