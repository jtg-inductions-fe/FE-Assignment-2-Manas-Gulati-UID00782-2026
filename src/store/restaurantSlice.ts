import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RestaurantCardData, RestaurantFormData } from 'types';

const mockData: Record<number, RestaurantCardData[]> = {
    1: [
        {
            restaurantId: 412,
            img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800',
            alt: 'Kake da dhaba',
            heading: 'Kake da dhaba',
            location: 'Rohini',
            description:
                'Authentic North Indian food with rich flavors and traditional recipes.',
            category: 'veg',
        },
        {
            restaurantId: 413,
            img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800',
            alt: 'Billu hut',
            heading: 'Billu hut',
            location: 'Pitampura',
            description:
                'Delicious fast food and freshly prepared snacks perfect for a quick meal.',
            category: 'non-veg',
        },
        {
            restaurantId: 414,
            img: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=800',
            alt: 'Sindhi Meat Shop',
            heading: 'Sindhi Meat Shop',
            location: 'Shalimar Bagh',
            description:
                'A popular spot for flavorful meat dishes and authentic North Indian cuisine.',
            category: 'non-veg',
        },
        {
            restaurantId: 415,
            img: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800',
            alt: 'Urban Tadka',
            heading: 'Urban Tadka',
            location: 'Model Town',
            description:
                'A modern restaurant serving delicious Indian dishes with a contemporary twist.',
            category: 'veg',
        },
        {
            restaurantId: 416,
            img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
            alt: 'The Burger House',
            heading: 'The Burger House',
            location: 'Rajouri Garden',
            description:
                'Juicy burgers, crispy fries and delicious comfort food made fresh to order.',
            category: 'non-veg',
        },
    ],

    2: [
        {
            restaurantId: 417,
            img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800',
            alt: 'Punjabi Rasoi',
            heading: 'Punjabi Rasoi',
            location: 'Dwarka',
            description:
                'Traditional Punjabi dishes packed with authentic spices and homestyle flavors.',
            category: 'veg',
        },
        {
            restaurantId: 418,
            img: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800',
            alt: 'Chicken Point',
            heading: 'Chicken Point',
            location: 'Janakpuri',
            description:
                'Specializing in juicy chicken dishes, kebabs and flavorful Indian curries.',
            category: 'non-veg',
        },
        {
            restaurantId: 419,
            img: 'https://images.unsplash.com/photo-1552611052-33e04de081de?w=800',
            alt: 'Wok Express',
            heading: 'Wok Express',
            location: 'Vasant Kunj',
            description:
                'Fresh Asian noodles, rice bowls and stir-fried dishes prepared with bold flavors.',
            category: 'veg',
        },
        {
            restaurantId: 420,
            img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800',
            alt: 'Pizza Corner',
            heading: 'Pizza Corner',
            location: 'Saket',
            description:
                'Freshly baked pizzas with crispy crusts, cheesy toppings and flavorful sauces.',
            category: 'veg',
        },
        {
            restaurantId: 421,
            img: 'https://images.unsplash.com/photo-1534790566855-4cb788d389ec?w=800',
            alt: 'Grill Nation',
            heading: 'Grill Nation',
            location: 'Karol Bagh',
            description:
                'Grilled meats, kebabs and smoky specialties served with delicious sides.',
            category: 'non-veg',
        },
    ],
};

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
            });
        },
        get: (
            _state,
            action: PayloadAction<{ role: string; userId: number }>,
        ) => {
            if (action.payload.role === 'customer') {
                return Object.values(mockData).flat();
            } else {
                return mockData[action.payload.userId] ?? [];
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
