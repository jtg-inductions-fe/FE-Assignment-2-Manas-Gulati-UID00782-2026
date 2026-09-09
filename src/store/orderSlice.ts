import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderDetails, OrdersState } from 'types/order.types';

const initialState: OrdersState = {
    byId: {},
    allIds: [],
    byCustomerId: {},
    byRestaurantId: {},
};

const OrderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        initializeOrder: (state, action: PayloadAction<OrderDetails>) => {
            const order = action.payload;
            state.byId[order.orderId] = {
                ...order,
                stockDeducted: order.stockDeducted ?? false,
            };
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
            if (action.payload.orderStatus === 'Accepted') {
                order.stockDeducted = true;
            }
        },
    },
});

export const { initializeOrder, changeStatus } = OrderSlice.actions;

export default OrderSlice.reducer;
