import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FooditemCardData } from 'types';

const mockFoodData: Record<number, FooditemCardData[]> = {
    412: [
        {
            foodId: 1001,
            img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800',
            alt: 'Paneer Butter Masala',
            heading: 'Paneer Butter Masala',
            description: 'Soft paneer cooked in a rich, creamy tomato gravy.',
            ingredients: 'Paneer, tomato, butter, cream, onion, spices',
            price: 249,
            stock: 0,
        },
        {
            foodId: 1002,
            img: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=800',
            alt: 'Dal Makhani',
            heading: 'Dal Makhani',
            description:
                'Slow-cooked black lentils prepared with butter and aromatic spices.',
            ingredients:
                'Black lentils, kidney beans, butter, cream, tomato, spices',
            price: 199,
            stock: 12,
        },
        {
            foodId: 1003,
            img: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800',
            alt: 'Butter Naan',
            heading: 'Butter Naan',
            description: 'Soft and fluffy tandoori naan brushed with butter.',
            ingredients: 'Refined flour, yogurt, butter, salt',
            price: 59,
            stock: 38,
        },
    ],

    413: [
        {
            foodId: 1004,
            img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58ab?w=800',
            alt: 'Classic Chicken Burger',
            heading: 'Classic Chicken Burger',
            description:
                'Crispy chicken patty layered with fresh vegetables and creamy sauce.',
            ingredients:
                'Chicken patty, burger bun, lettuce, tomato, mayonnaise',
            price: 179,
            stock: 18,
        },
        {
            foodId: 1005,
            img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800',
            alt: 'French Fries',
            heading: 'French Fries',
            description:
                'Golden and crispy fries served hot and seasoned perfectly.',
            ingredients: 'Potatoes, salt, cooking oil, seasoning',
            price: 99,
            stock: 45,
        },
        {
            foodId: 1006,
            img: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=800',
            alt: 'Chicken Wrap',
            heading: 'Chicken Wrap',
            description:
                'Tender chicken wrapped with fresh vegetables and flavorful sauce.',
            ingredients: 'Chicken, tortilla, lettuce, onion, tomato, sauce',
            price: 149,
            stock: 9,
        },
    ],

    414: [
        {
            foodId: 1007,
            img: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800',
            alt: 'Chicken Curry',
            heading: 'Chicken Curry',
            description:
                'Tender chicken simmered in a flavorful onion and tomato gravy.',
            ingredients: 'Chicken, onion, tomato, ginger, garlic, spices, oil',
            price: 229,
            stock: 16,
        },
        {
            foodId: 1008,
            img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800',
            alt: 'Chicken Tikka',
            heading: 'Chicken Tikka',
            description:
                'Juicy pieces of marinated chicken grilled to perfection.',
            ingredients: 'Chicken, yogurt, lemon, ginger, garlic, spices',
            price: 249,
            stock: 7,
        },
        {
            foodId: 1009,
            img: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800',
            alt: 'Mutton Biryani',
            heading: 'Mutton Biryani',
            description:
                'Aromatic basmati rice layered with tender mutton and fragrant spices.',
            ingredients:
                'Mutton, basmati rice, onion, yogurt, saffron, herbs, spices',
            price: 299,
            stock: 21,
        },
    ],

    415: [
        {
            foodId: 1010,
            img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800',
            alt: 'Paneer Tikka',
            heading: 'Paneer Tikka',
            description:
                'Grilled paneer cubes marinated in spiced yogurt with vegetables.',
            ingredients: 'Paneer, capsicum, onion, yogurt, spices',
            price: 219,
            stock: 14,
        },
        {
            foodId: 1011,
            img: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=800',
            alt: 'Veg Manchurian',
            heading: 'Veg Manchurian',
            description:
                'Crispy vegetable balls tossed in a flavorful Indo-Chinese sauce.',
            ingredients:
                'Cabbage, carrot, flour, soy sauce, garlic, chilli sauce',
            price: 169,
            stock: 31,
        },
        {
            foodId: 1012,
            img: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=800',
            alt: 'Vegetable Biryani',
            heading: 'Vegetable Biryani',
            description:
                'Fragrant basmati rice cooked with seasonal vegetables and spices.',
            ingredients:
                'Basmati rice, vegetables, onion, yogurt, herbs, spices',
            price: 189,
            stock: 5,
        },
    ],

    416: [
        {
            foodId: 1013,
            img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58ab?w=800',
            alt: 'Classic Burger',
            heading: 'Classic Burger',
            description:
                'Juicy grilled patty served in a toasted bun with fresh toppings.',
            ingredients: 'Patty, burger bun, lettuce, tomato, onion, sauce',
            price: 159,
            stock: 27,
        },
        {
            foodId: 1014,
            img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800',
            alt: 'Crispy Fries',
            heading: 'Crispy Fries',
            description:
                'Crispy golden potato fries served with a house dipping sauce.',
            ingredients: 'Potatoes, salt, cooking oil, seasoning',
            price: 99,
            stock: 42,
        },
        {
            foodId: 1015,
            img: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800',
            alt: 'Loaded Burger',
            heading: 'Loaded Burger',
            description:
                'A loaded burger with a juicy patty, cheese and fresh toppings.',
            ingredients:
                'Patty, cheese, burger bun, lettuce, tomato, onion, sauce',
            price: 219,
            stock: 11,
        },
    ],

    417: [
        {
            foodId: 1016,
            img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800',
            alt: 'Chole Bhature',
            heading: 'Chole Bhature',
            description:
                'Spicy chickpea curry served with fluffy fried bhature.',
            ingredients: 'Chickpeas, flour, onion, tomato, yogurt, spices',
            price: 169,
            stock: 20,
        },
        {
            foodId: 1017,
            img: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=800',
            alt: 'Rajma Chawal',
            heading: 'Rajma Chawal',
            description:
                'Comforting kidney bean curry served with steamed basmati rice.',
            ingredients:
                'Kidney beans, rice, tomato, onion, ginger, garlic, spices',
            price: 149,
            stock: 8,
        },
        {
            foodId: 1018,
            img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800',
            alt: 'Aloo Paratha',
            heading: 'Aloo Paratha',
            description:
                'Crispy stuffed Indian flatbread filled with spiced potatoes.',
            ingredients:
                'Wheat flour, potato, onion, coriander, spices, butter',
            price: 129,
            stock: 34,
        },
    ],

    418: [
        {
            foodId: 1019,
            img: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800',
            alt: 'Butter Chicken',
            heading: 'Butter Chicken',
            description:
                'Tender chicken pieces cooked in a creamy tomato and butter gravy.',
            ingredients: 'Chicken, tomato, butter, cream, yogurt, spices',
            price: 279,
            stock: 13,
        },
        {
            foodId: 1020,
            img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800',
            alt: 'Chicken Seekh Kebab',
            heading: 'Chicken Seekh Kebab',
            description:
                'Juicy minced chicken kebabs grilled with aromatic Indian spices.',
            ingredients:
                'Minced chicken, onion, coriander, ginger, garlic, spices',
            price: 239,
            stock: 6,
        },
        {
            foodId: 1021,
            img: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800',
            alt: 'Chicken Biryani',
            heading: 'Chicken Biryani',
            description:
                'Fragrant basmati rice layered with spiced chicken and herbs.',
            ingredients:
                'Chicken, basmati rice, onion, yogurt, saffron, herbs, spices',
            price: 249,
            stock: 25,
        },
    ],

    419: [
        {
            foodId: 1022,
            img: 'https://images.unsplash.com/photo-1552611052-33e04de081de?w=800',
            alt: 'Vegetable Noodles',
            heading: 'Vegetable Noodles',
            description:
                'Stir-fried noodles tossed with fresh vegetables and Asian sauces.',
            ingredients:
                'Noodles, cabbage, carrot, capsicum, soy sauce, garlic',
            price: 159,
            stock: 29,
        },
        {
            foodId: 1023,
            img: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800',
            alt: 'Veg Fried Rice',
            heading: 'Veg Fried Rice',
            description:
                'Fragrant rice stir-fried with vegetables and savory Asian sauces.',
            ingredients:
                'Rice, carrot, peas, capsicum, spring onion, soy sauce',
            price: 149,
            stock: 17,
        },
        {
            foodId: 1024,
            img: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800',
            alt: 'Chilli Paneer',
            heading: 'Chilli Paneer',
            description:
                'Crispy paneer tossed in a spicy and tangy Indo-Chinese sauce.',
            ingredients:
                'Paneer, capsicum, onion, soy sauce, chilli sauce, garlic',
            price: 199,
            stock: 4,
        },
    ],

    420: [
        {
            foodId: 1025,
            img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80c4a5?w=800',
            alt: 'Margherita Pizza',
            heading: 'Margherita Pizza',
            description:
                'Classic pizza topped with tomato sauce, mozzarella and basil.',
            ingredients:
                'Pizza dough, tomato sauce, mozzarella, basil, olive oil',
            price: 249,
            stock: 22,
        },
        {
            foodId: 1026,
            img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
            alt: 'Farmhouse Pizza',
            heading: 'Farmhouse Pizza',
            description: 'Cheesy pizza loaded with fresh vegetables and herbs.',
            ingredients:
                'Pizza dough, tomato sauce, mozzarella, onion, capsicum, mushrooms',
            price: 299,
            stock: 15,
        },
        {
            foodId: 1027,
            img: 'https://images.unsplash.com/photo-1593560708920-61dd98c8a1c3?w=800',
            alt: 'Cheese Burst Pizza',
            heading: 'Cheese Burst Pizza',
            description:
                'Loaded cheese pizza with a deliciously creamy cheese-filled crust.',
            ingredients:
                'Pizza dough, mozzarella, cheddar, tomato sauce, herbs',
            price: 329,
            stock: 3,
        },
    ],

    421: [
        {
            foodId: 1028,
            img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800',
            alt: 'Tandoori Chicken',
            heading: 'Tandoori Chicken',
            description:
                'Chicken marinated in spiced yogurt and roasted in a tandoor.',
            ingredients:
                'Chicken, yogurt, lemon, ginger, garlic, chilli, spices',
            price: 269,
            stock: 19,
        },
        {
            foodId: 1029,
            img: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800',
            alt: 'Chicken Tikka',
            heading: 'Chicken Tikka',
            description:
                'Tender chicken pieces marinated with spices and grilled until smoky.',
            ingredients: 'Chicken, yogurt, ginger, garlic, lemon, spices',
            price: 249,
            stock: 10,
        },
        {
            foodId: 1030,
            img: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800',
            alt: 'Mutton Seekh Kebab',
            heading: 'Mutton Seekh Kebab',
            description:
                'Juicy minced mutton kebabs grilled with aromatic herbs and spices.',
            ingredients:
                'Minced mutton, onion, coriander, ginger, garlic, spices',
            price: 289,
            stock: 2,
        },
    ],
};

//initial state
const initialState: FooditemCardData[] = [];

//schema for form data
interface FormFoodData {
    img: string;
    alt: string;
    heading: string;
    description: string;
    ingredients: string;
    price: number;
    stock: number;
}

const FooditemSlice = createSlice({
    name: 'food',
    initialState,
    reducers: {
        edit: (
            state,
            action: PayloadAction<{ data: FormFoodData; id: number }>,
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
        add: (state, action: PayloadAction<FormFoodData>) => {
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
            mockFoodData[action.payload] ?? [],
        del: (state, action: PayloadAction<number>) =>
            state.filter((food) => food.foodId !== action.payload),
    },
});

export const { edit, add, del, get } = FooditemSlice.actions;

export default FooditemSlice.reducer;
