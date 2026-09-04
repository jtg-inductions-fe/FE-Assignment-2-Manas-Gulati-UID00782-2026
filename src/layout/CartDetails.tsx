import { useTypeDispatch, useTypeSelector } from 'store/hooks';
import { initializeOrder } from 'store/orderSlice';

import {
    Button,
    Card,
    CardContent,
    Divider,
    Stack,
    Typography,
} from '@mui/material';
import Box from '@mui/material/Box';

import { FONT_SIZE, FONT_WEIGHT } from '@constant';

import CartFoodCard from './CartFoodCard';

interface FooditemData {
    foodId: number;
    img: string;
    alt: string;
    heading: string;
    price: number;
    quantity: number;
}

interface AutoGridProps {
    data: FooditemData[];
}

export default function AutoGrid({ data }: AutoGridProps) {
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

    const handlePlaceOrder = () => {
        if (cartFood.length > 0) {
            const date = new Date();
            const orderId = restaurantId + userId + date.getTime();
            const orderData = {
                orderId: orderId,
                userId: userId,
                foodItem: cartFood,
                totalPrice: total,
                date: date,
                orderStatus: 'Pending',
            };
            dispatch(initializeOrder({ restaurantId, data: orderData }));
        } else {
            alert("can't place order");
        }
    };

    return (
        <>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        sm: '1fr',
                        lg: 'minmax(0, 2fr) 1fr',
                    },
                    alignItems: 'start',
                    gap: 4,
                    mt: 4,
                }}
            >
                <Stack spacing={3}>
                    {data.length > 0 ? (
                        data.map((item) => (
                            <CartFoodCard key={item.foodId} data={item} />
                        ))
                    ) : (
                        <Box
                            sx={(theme) => ({
                                p: 8,
                                border: `2px dashed ${theme.palette.faded?.light}`,
                                borderRadius: 3,
                                color: theme.palette.faded?.main,
                                backgroundColor: theme.palette.common.white,
                                textAlign: 'center',
                            })}
                        >
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
                        </Box>
                    )}
                </Stack>

                <Card
                    sx={(theme) => ({
                        position: { lg: 'sticky' },
                        top: { lg: 24 },
                        border: `1px solid ${theme.palette.faded?.light}`,
                        borderRadius: 3,
                        backgroundColor: theme.palette.common.white,
                        boxShadow: '0 10px 30px rgba(28, 35, 40, 0.05)',
                    })}
                >
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
                            <Typography
                                sx={(theme) => ({
                                    color: theme.palette.primary.main,
                                    fontSize: FONT_SIZE['3XL'],
                                    fontWeight: FONT_WEIGHT.BOLD,
                                })}
                            >
                                &#8377;{total.toFixed(2)}
                            </Typography>
                        </Stack>

                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handlePlaceOrder}
                            sx={(theme) => ({
                                mt: 4,
                                borderRadius: 2,
                                fontSize: FONT_SIZE.MD,
                                color: theme.palette.common.white,
                                fontWeight: FONT_WEIGHT.BOLD,
                                textTransform: 'none',
                            })}
                        >
                            Place Order
                        </Button>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
}
