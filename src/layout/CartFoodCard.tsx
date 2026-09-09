import { Box, IconButton, Stack } from '@mui/material';
import { CardMedia } from '@mui/material';
import Counter from 'components/Counter.component';
import { addFood } from 'store/cartSlice';
import { useTypeDispatch, useTypeSelector } from 'store/hooks';
import {
    StyledCartCard,
    StyledCartDeleteIcon,
    StyledCartHeading,
    StyledCartItem,
    StyledCartPrice,
    StyledCartRestaurantName,
} from 'styles/Cart.styles';
import { CardProps } from 'types';

export default function MultiActionAreaCard({ data }: CardProps) {
    const dispatch = useTypeDispatch();
    const relevantFoodItem = useTypeSelector((state) =>
        state.cart.food.find((food) => food.foodId === data.foodId),
    );
    const count = relevantFoodItem?.quantity ?? 0; //give relevant fooditem quantity to set counter
    const currentStock = relevantFoodItem?.stock ?? 0; //give relevant fooditem stock for stock management

    const restaurantName = useTypeSelector(
        (state) => state.selectedRestaurant.restaurantName,
    );

    /**
     * TODO: Increases the fooditem quantity by 1
     */
    const increaseHandler = () => {
        if (count >= currentStock) return;
        dispatch(addFood({ data: data, quantity: count + 1 }));
    };

    /**
     * TODO: Decreases the fooditem quantity by 1
     */
    const decreaseHandler = () => {
        dispatch(addFood({ data: data, quantity: count - 1 }));
    };

    /**
     * TODO: Delete fooditem from cart
     */
    const deleteHandler = () => {
        dispatch(addFood({ data: data, quantity: 0 }));
    };

    return (
        <>
            <StyledCartCard>
                <StyledCartItem>
                    <CardMedia
                        component="img"
                        image={data.img}
                        alt={data.alt}
                        sx={{
                            objectFit: 'cover',
                            gridRow: { xs: '1', sm: '1 / span 2' },
                            width: { xs: 72, sm: 100, md: 120 },
                            height: { xs: 72, sm: 100, md: 120 },
                            borderRadius: 2,
                        }}
                    />
                    <Box ml={4}>
                        <StyledCartHeading gutterBottom variant="h3">
                            {data.heading}
                        </StyledCartHeading>
                        <StyledCartRestaurantName variant="body1">
                            {restaurantName}
                        </StyledCartRestaurantName>
                    </Box>
                    <Stack
                        direction="row"
                        mt="auto"
                        ml={4}
                        alignItems="center"
                        gap="2.5"
                        sx={{
                            gridColumn: { xs: '1 / -1', sm: '2' },
                        }}
                    >
                        <StyledCartPrice>&#8377; {data.price}</StyledCartPrice>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="flex-end"
                            gap={{ xs: 0.5, sm: 1.5 }}
                            sx={{ ml: 'auto', flexShrink: 0 }}
                        >
                            <Counter
                                count={count}
                                increaseHandler={increaseHandler}
                                disableIncrease={count >= currentStock}
                                decreaseHandler={decreaseHandler}
                            />
                            <IconButton
                                aria-label="delete"
                                onClick={deleteHandler}
                                sx={{ p: { xs: 0.75, sm: 1 } }}
                            >
                                <StyledCartDeleteIcon />
                            </IconButton>
                        </Stack>
                    </Stack>
                </StyledCartItem>
            </StyledCartCard>
        </>
    );
}
