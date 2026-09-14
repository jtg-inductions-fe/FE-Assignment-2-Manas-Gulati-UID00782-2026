import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RestaurantCardData, RestaurantFormData } from 'types';
import { RestaurantDataInterface } from 'types/mockdata.types';

import mockData from '../MOCK_DATA/restaurant.json';

const data: RestaurantDataInterface = mockData;

//initial state
const initialState: RestaurantCardData[] = [];

const RestaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        edit: (
            state,
            action: PayloadAction<{ data: RestaurantFormData; id: number }>,
        ) => {
            state.forEach((restaurant) => {
                if (restaurant.restaurantId === action.payload.id) {
                    restaurant.img = action.payload.data.img;
                    restaurant.alt = action.payload.data.alt;
                    restaurant.heading = action.payload.data.heading;
                    restaurant.location = action.payload.data.location;
                    restaurant.description = action.payload.data.description;
                    restaurant.category = action.payload.data.category;
                    restaurant.openingTime = action.payload.data.openingTime;
                    restaurant.closingTime = action.payload.data.closingTime;
                }
            });
        },
        add: (state, action: PayloadAction<RestaurantFormData>) => {
            const id = Date.now();
            state.push({
                restaurantId: id,
                img: action.payload.img,
                alt: action.payload.alt,
                heading: action.payload.heading,
                location: action.payload.location,
                description: action.payload.description,
                category: action.payload.category,
                openingTime: action.payload.openingTime,
                closingTime: action.payload.closingTime,
            });
        },
        get: (
            _state,
            action: PayloadAction<{ role: string; userId: number }>,
        ) => {
            if (action.payload.role === 'customer') {
                return Object.values(mockData).flat();
            } else {
                return data[action.payload.userId] ?? [];
            }
        },
        del: (state, action: PayloadAction<number>) =>
            state.filter(
                (restaurant) => restaurant.restaurantId !== action.payload,
            ),
    },
});

export const { edit, add, del, get } = RestaurantSlice.actions;

export default RestaurantSlice.reducer;
