import Header from 'layout/Header';
import OrdersDetail from 'layout/OrdersDetail';
import { useTypeSelector } from 'store/hooks';
import {
    StyledOrderDetailWrapper,
    StyledOrderPageWrapper,
} from 'styles/Orders.styles';
import { OrderDetails } from 'types';

import { Box, Chip, Stack, Typography } from '@mui/material';

export default function Orders() {
    const user = useTypeSelector((state) => state.auth.user);
    const orderState = useTypeSelector((state) => state.order);
    const restaurantState = useTypeSelector((state) => state.restaurant);
    const isOwner = user?.role === 'owner';
    const allOrders: OrderDetails[] = [];
    const restaurantNames: Record<number, string> = {};
    restaurantState.forEach((restaurant) => {
        restaurantNames[restaurant.restaurantId] = restaurant.heading;
    });
    if (isOwner) {
        const restaurantIds = restaurantState.map(
            (restaurant) => restaurant.restaurantId, //since owner is logged in, we will only get owner specific restaurant from this state
        );
        restaurantIds.forEach((id) => {
            let orderId;
            if (orderState.byRestaurantId[id]) {
                orderId = orderState.byRestaurantId[id]; //this will be another array
            }
            orderId?.forEach((oId) => {
                const order = orderState.byId[oId];
                if (order) {
                    allOrders.push(order);
                }
            });
        });
    } else {
        let customerOrders;
        if (user?.userId != null && orderState.byCustomerId[user?.userId]) {
            customerOrders = orderState.byCustomerId[user?.userId];
        }
        customerOrders?.forEach((id) => {
            const order = orderState.byId[id];
            if (order) {
                allOrders.push(order);
            }
        });
    }

    return (
        <StyledOrderPageWrapper>
            <Header />
            <StyledOrderDetailWrapper>
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    justifyContent="space-between"
                    alignItems={{ sm: 'flex-start', md: 'center' }}
                    gap={2}
                >
                    <Box>
                        <Typography variant="h2">
                            {isOwner ? 'Restaurant Orders' : 'Your Orders'}
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ mt: 1 }}
                        >
                            {
                                'Track your current orders and review your order history.'
                            }
                        </Typography>
                    </Box>
                    <Chip
                        label={`${allOrders.length} orders`}
                        color="primary"
                        variant="outlined"
                    />
                </Stack>

                <OrdersDetail
                    data={allOrders}
                    canChangeStatus={isOwner}
                    restaurantNames={restaurantNames}
                />
            </StyledOrderDetailWrapper>
        </StyledOrderPageWrapper>
    );
}
