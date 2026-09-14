import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FooditemCardData, FooditemFormData, ReduceStock } from 'types';
import { FooditemDataInterface } from 'types/mockdata.types';

import mockData from '../MOCK_DATA/fooditem.json';

const data: FooditemDataInterface = mockData;

//initial state
const initialState: FooditemCardData[] = [];

const FooditemSlice = createSlice({
    name: 'food',
    initialState,
    reducers: {
        edit: (
            state,
            action: PayloadAction<{ data: FooditemFormData; id: number }>,
        ) => {
            state.forEach((food) => {
                if (food.foodId === action.payload.id) {
                    food.img = action.payload.data.img;
                    food.alt = action.payload.data.alt;
                    food.heading = action.payload.data.heading;
                    food.description = action.payload.data.description;
                    food.ingredients = action.payload.data.ingredients;
                    food.price = action.payload.data.price;
                    food.stock = action.payload.data.stock;
                }
            });
        },
        add: (state, action: PayloadAction<FooditemFormData>) => {
            const id = Date.now();
            state.push({
                foodId: id,
                img: action.payload.img,
                alt: action.payload.alt,
                heading: action.payload.heading,
                description: action.payload.description,
                ingredients: action.payload.ingredients,
                price: action.payload.price,
                stock: action.payload.stock,
            });
        },
        get: (_state, action: PayloadAction<number>) =>
            data[action.payload] ?? [],
        del: (state, action: PayloadAction<number>) =>
            state.filter((food) => food.foodId !== action.payload),
        reduceStock: (state, action: PayloadAction<ReduceStock>) => {
            action.payload.data.forEach((foodItem) => {
                const food = state.find(
                    (item) => item.foodId === foodItem.foodId,
                );

                if (food) {
                    food.stock = food.stock - foodItem.quantity;
                }
            });
        },
    },
});

export const { edit, add, del, get, reduceStock } = FooditemSlice.actions;

export default FooditemSlice.reducer;
