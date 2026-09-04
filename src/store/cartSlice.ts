import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//schema for food items
interface FoodItem {
    foodId: number;
    img: string;
    alt: string;
    heading: string;
    price: number;
    quantity: number;
}

//schema for cart data required
interface CartData {
    userId: number | null;
    restaurantId: number | null;
    food: FoodItem[];
}

//schema for Fooditem data required
interface FooditemData {
    foodId: number;
    img: string;
    alt: string;
    heading: string;
    price: number;
}

const initialState: CartData = { userId: null, restaurantId: null, food: [] };

const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        initializeUser: (state, action: PayloadAction<number>) => {
            state.userId = action.payload;
        },
        initializeRestaurant: (state, action: PayloadAction<number>) => {
            state.restaurantId = action.payload;
            state.food = [];
        },
        addFood: (
            state,
            action: PayloadAction<{ data: FooditemData; quantity: number }>,
        ) => {
            let foodExist = false;
            state.food.forEach((food) => {
                if (food.foodId === action.payload.data.foodId) {
                    food.quantity = action.payload.quantity;
                    foodExist = true;
                }
            });
            if (!foodExist) {
                const data = {
                    foodId: action.payload.data.foodId,
                    img: action.payload.data.img,
                    alt: action.payload.data.alt,
                    heading: action.payload.data.heading,
                    price: action.payload.data.price,
                    quantity: action.payload.quantity,
                };
                state.food.push(data);
            }
            if (action.payload.quantity === 0) {
                state.food = state.food.filter(
                    (food) => food.foodId !== action.payload.data.foodId,
                );
            }
        },
    },
});

export const { initializeUser, initializeRestaurant, addFood } =
    CartSlice.actions;

export default CartSlice.reducer;
