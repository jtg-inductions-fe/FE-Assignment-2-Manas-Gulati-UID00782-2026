import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SelectedRestaurant } from 'types';

const initialState: SelectedRestaurant = {
    restaurantId: null,
    restaurantName: '',
};

const selectRestaurantSlice = createSlice({
    name: 'selectRestaurant',
    initialState,
    reducers: {
        selectRestaurant: (
            state,
            action: PayloadAction<{ id: number; name: string }>,
        ) => {
            state.restaurantId = action.payload.id;
            state.restaurantName = action.payload.name;
        },
        clearRestaurant: (state) => {
            state.restaurantId = null;
            state.restaurantName = '';
        },
    },
});

export const { selectRestaurant, clearRestaurant } =
    selectRestaurantSlice.actions;

export default selectRestaurantSlice.reducer;
