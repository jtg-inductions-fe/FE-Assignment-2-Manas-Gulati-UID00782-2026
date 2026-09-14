import { useState } from 'react';

import {
    AlertColor,
    CardContent,
    Divider,
    Stack,
    Typography,
} from '@mui/material';
import { removeFoodData } from 'store/cartSlice';
import { useTypeDispatch, useTypeSelector } from 'store/hooks';
import { initializeOrder } from 'store/orderSlice';
import {
    StyledCartConfirmButton,
    StyledCartSummaryWrapper,
    StyledCartWrapper,
    StyledTotalText,
} from 'styles/Cart.styles';
import { CartAutoGridProps } from 'types';

import { CustomizedSnackbar, NullState } from '@components';
import { FONT_SIZE, FONT_WEIGHT } from '@constant';

import { ORDER } from '../constants';
import { MultiActionAreaCard } from './CartFoodCard';

export const AutoGrid = ({ data }: CartAutoGridProps) => {
    const dispatch = useTypeDispatch();

    const food = useTypeSelector((state) => state.cart.food);
    let subtotal = 0;
    food.forEach((foodItem) => {
        const price = foodItem.price * foodItem.quantity;
        subtotal += price;
    });

    //initializing required variables
    const restaurantId = useTypeSelector(
        (state) => state.cart.restaurantId ?? 0,
    );
    const userId = useTypeSelector((state) => state.cart.userId ?? 0);
    const cartFood = useTypeSelector((state) => state.cart.food);

    const total = subtotal + 50;

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as AlertColor,
    });

    /**
     * TODO: Place an order and empties cart
     */
    const handlePlaceOrder = () => {
        if (cartFood.length > 0) {
            const date = new Date();
            const orderId = restaurantId + userId + date.getTime();
            const orderData = {
                orderId: orderId,
                customerId: userId,
                restaurantId: restaurantId,
                foodItem: cartFood,
                totalPrice: total,
                date: date.toDateString(),
                orderStatus: 'Pending',
            };
            dispatch(initializeOrder(orderData));
            dispatch(removeFoodData());
            setSnackbar({
                open: true,
                message: ORDER.SUCCESS,
                severity: 'success',
            });
        } else {
            setSnackbar({
                open: true,
                message: ORDER.FAILED,
                severity: 'error',
            });
        }
    };
    let nullState = false;
    if (data.length <= 0) {
        nullState = true;
    }

    return (
        <>
            <StyledCartWrapper>
                <Stack spacing={3}>
                    {!nullState ? (
                        data.map((item) => (
                            <MultiActionAreaCard
                                key={item.foodId}
                                data={item}
                            />
                        ))
                    ) : (
                        <NullState
                            title="Your cart is empty"
                            description="Add an item from a restaurant menu to get started."
                        />
                    )}
                </Stack>

                <StyledCartSummaryWrapper>
                    <CardContent sx={{ p: 4 }}>
                        <Typography
                            component="h2"
                            sx={{ fontWeight: FONT_WEIGHT.BOLD }}
                        >
                            Order Summary
                        </Typography>

                        <Stack spacing={2} sx={{ mt: 4 }}>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                            >
                                <Typography
                                    variant="body1"
                                    sx={(theme) => ({
                                        color: theme.palette.faded?.main,
                                    })}
                                >
                                    Subtotal
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={(theme) => ({
                                        color: theme.palette.faded?.main,
                                    })}
                                >
                                    &#8377;{subtotal.toFixed(2)}
                                </Typography>
                            </Stack>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                            >
                                <Typography
                                    variant="body1"
                                    sx={(theme) => ({
                                        color: theme.palette.faded?.main,
                                    })}
                                >
                                    Delivery Fee
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={(theme) => ({
                                        color: theme.palette.faded?.main,
                                    })}
                                >
                                    &#8377;50
                                </Typography>
                            </Stack>
                        </Stack>

                        <Divider sx={{ my: 3 }} />

                        <Stack direction="row" justifyContent="space-between">
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: FONT_SIZE['2XL'],
                                    fontWeight: FONT_WEIGHT.BOLD,
                                }}
                            >
                                Total
                            </Typography>
                            <StyledTotalText>
                                &#8377;{total.toFixed(2)}
                            </StyledTotalText>
                        </Stack>

                        <StyledCartConfirmButton
                            variant="contained"
                            fullWidth
                            onClick={handlePlaceOrder}
                        >
                            Place Order
                        </StyledCartConfirmButton>
                    </CardContent>
                </StyledCartSummaryWrapper>
            </StyledCartWrapper>
            <CustomizedSnackbar
                severity={snackbar.severity}
                message={snackbar.message}
                state={snackbar.open}
                onClose={() =>
                    setSnackbar((previous) => ({
                        ...previous,
                        open: false,
                    }))
                }
            />
        </>
    );
};
