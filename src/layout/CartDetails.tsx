import { useTypeSelector } from 'store/hooks';
//import { initializeOrder } from 'store/orderSlice';
import {
    StyledCartConfirmButton,
    StyledCartSummaryWrapper,
    StyledCartWrapper,
    StyledEmptyCart,
    StyledTotalText,
} from 'styles/Cart.styles';
import { AutoGridProps } from 'types';

import { CardContent, Divider, Stack, Typography } from '@mui/material';

import { FONT_SIZE, FONT_WEIGHT } from '@constant';

import CartFoodCard from './CartFoodCard';

export default function AutoGrid({ data }: AutoGridProps) {
    //const dispatch = useTypeDispatch();

    const food = useTypeSelector((state) => state.cart.food);
    let subtotal = 0;
    food.forEach((foodItem) => {
        const price = foodItem.price * foodItem.quantity;
        subtotal += price;
    });

    //initializing required variables
    // const restaurantId = useTypeSelector(
    //     (state) => state.cart.restaurantId ?? 0,
    // );
    // const userId = useTypeSelector((state) => state.cart.userId ?? 0);
    // const cartFood = useTypeSelector((state) => state.cart.food);

    const total = subtotal + 50;

    // const handlePlaceOrder = () => {
    //     if (cartFood.length > 0) {
    //         const date = new Date();
    //         const orderId = restaurantId + userId + date.getTime();
    //         const orderData = {
    //             orderId: orderId,
    //             userId: userId,
    //             foodItem: cartFood,
    //             totalPrice: total,
    //             date: date,
    //             orderStatus: 'Pending',
    //         };
    //         dispatch(initializeOrder({ restaurantId, data: orderData }));
    //     } else {
    //         alert("can't place order");
    //     }
    // };

    return (
        <>
            <StyledCartWrapper>
                <Stack spacing={3}>
                    {data.length > 0 ? (
                        data.map((item) => (
                            <CartFoodCard key={item.foodId} data={item} />
                        ))
                    ) : (
                        <StyledEmptyCart>
                            <Typography
                                variant="body1"
                                sx={{ fontWeight: FONT_WEIGHT.SEMIBOLD }}
                            >
                                Your cart is empty
                            </Typography>
                            <Typography variant="subtitle1">
                                Add an item from a restaurant menu to get
                                started.
                            </Typography>
                        </StyledEmptyCart>
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
                            //onClick={handlePlaceOrder}
                        >
                            Place Order
                        </StyledCartConfirmButton>
                    </CardContent>
                </StyledCartSummaryWrapper>
            </StyledCartWrapper>
        </>
    );
}
