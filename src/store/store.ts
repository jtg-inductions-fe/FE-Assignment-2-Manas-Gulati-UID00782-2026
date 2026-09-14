import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import cartReducer from './cartSlice';
import foodReducer from './fooditemSlice';
import orderReducer from './orderSlice';
import restaurantReducer from './restaurantSlice';
import selectRestaurantReducer from './selectRestaurantSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        restaurant: restaurantReducer,
        selectedRestaurant: selectRestaurantReducer,
        food: foodReducer,
        cart: cartReducer,
        order: orderReducer,
    },
});

export type ReduxState = ReturnType<typeof store.getState>;
export type DispatchStore = typeof store.dispatch;
