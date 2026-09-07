import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//schema for orders items
interface OrderDetails {
    orderId: number;
    restaurantId: number;
    customerId: number;
    foodItem: FoodItem[];
    totalPrice: number;
    date: string;
    orderStatus: string;
}

//schema for orders status
interface FoodItem {
    foodId: number;
    img: string;
    alt: string;
    heading: string;
    price: number;
    quantity: number;
}

//different order state for easy management
interface OrdersState {
    byId: Record<number, OrderDetails>; //by order id
    allIds: number[]; //all orders
    byCustomerId: Record<number, number[]>; //mapping customer id with their orders
    byRestaurantId: Record<number, number[]>; //mapping restaurant with their orders
}

const mockOrders: OrderDetails[] = [
    {
        orderId: 5001,
        restaurantId: 412,
        customerId: 0,
        foodItem: [
            {
                foodId: 1001,
                img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800',
                alt: 'Paneer Butter Masala',
                heading: 'Paneer Butter Masala',
                price: 249,
                quantity: 2,
            },
            {
                foodId: 1003,
                img: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800',
                alt: 'Butter Naan',
                heading: 'Butter Naan',
                price: 59,
                quantity: 2,
            },
        ],
        totalPrice: 616,
        date: 'Thu Nov 14 2024',
        orderStatus: 'Delivered',
    },
    {
        orderId: 5002,
        restaurantId: 418,
        customerId: 0,
        foodItem: [
            {
                foodId: 1019,
                img: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800',
                alt: 'Butter Chicken',
                heading: 'Butter Chicken',
                price: 279,
                quantity: 1,
            },
            {
                foodId: 1021,
                img: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800',
                alt: 'Chicken Biryani',
                heading: 'Chicken Biryani',
                price: 249,
                quantity: 1,
            },
        ],
        totalPrice: 578,
        date: 'Sun Jan 18 2026',
        orderStatus: 'Out for delivery',
    },
    {
        orderId: 5003,
        restaurantId: 413,
        customerId: 0,
        foodItem: [
            {
                foodId: 1004,
                img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58ab?w=800',
                alt: 'Classic Chicken Burger',
                heading: 'Classic Chicken Burger',
                price: 179,
                quantity: 1,
            },
        ],
        totalPrice: 229,
        date: 'Wed Aug 04 2027',
        orderStatus: 'Preparing',
    },
];

const initialState: OrdersState = {
    byId: {},
    allIds: [],
    byCustomerId: {},
    byRestaurantId: {},
};

mockOrders.forEach((order) => {
    initialState.byId[order.orderId] = order;
    initialState.allIds.push(order.orderId);
    if (initialState.byCustomerId[order.customerId]) {
        initialState.byCustomerId[order.customerId].push(order.orderId);
    } else {
        initialState.byCustomerId[order.customerId] = [order.orderId];
    }
    if (initialState.byRestaurantId[order.restaurantId]) {
        initialState.byRestaurantId[order.restaurantId].push(order.orderId);
    } else {
        initialState.byRestaurantId[order.restaurantId] = [order.orderId];
    }
});

const OrderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        initializeOrder: (state, action: PayloadAction<OrderDetails>) => {
            const order = action.payload;
            state.byId[order.orderId] = order;
            state.allIds.push(order.orderId);
            if (state.byCustomerId[order.customerId]) {
                state.byCustomerId[order.customerId].push(order.orderId);
            } else {
                state.byCustomerId[order.customerId] = [order.orderId];
            }
            if (state.byRestaurantId[order.restaurantId]) {
                state.byRestaurantId[order.restaurantId].push(order.orderId);
            } else {
                state.byRestaurantId[order.restaurantId] = [order.orderId];
            }
        },
        changeStatus: (
            state,
            action: PayloadAction<{
                orderID: number;
                orderStatus: string;
            }>,
        ) => {
            const order = state.byId[action.payload.orderID];
            order.orderStatus = action.payload.orderStatus;
        },
    },
});

export const { initializeOrder, changeStatus } = OrderSlice.actions;

export default OrderSlice.reducer;
