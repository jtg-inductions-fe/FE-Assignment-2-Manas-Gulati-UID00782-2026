import { useState } from 'react';

import { Box, IconButton, Stack } from '@mui/material';
import { CardMedia } from '@mui/material';
import Typography from '@mui/material/Typography';
import Counter from 'components/Counter.component';
import { addFood } from 'store/cartSlice';
import { useTypeDispatch, useTypeSelector } from 'store/hooks';
import {
    StyledCartCard,
    StyledCartDeleteIcon,
    StyledCartItem,
    StyledCartPrice,
} from 'styles/Cart.styles';
import { CardProps } from 'types';

import { FONT_SIZE } from '@constant';

export default function MultiActionAreaCard({ data }: CardProps) {
    const dispatch = useTypeDispatch();
    const [count, setCount] = useState(data.quantity);
    const restaurantName = useTypeSelector(
        (state) => state.selectedRestaurant.restaurantName,
    );

    /**
     * Increases the fooditem quantity by 1
     * @returns {any}
     */
    const increaseHandler = () => {
        dispatch(addFood({ data: data, quantity: count + 1 }));
        setCount(count + 1);
    };

    /**
     * Decreases the fooditem quantity by 1
     * @returns {any}
     */
    const decreaseHandler = () => {
        dispatch(addFood({ data: data, quantity: count - 1 }));
        setCount(count - 1);
    };

    /**
     * Delete fooditem from cart
     * @returns {any}
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
                    <Box>
                        <Typography
                            gutterBottom
                            variant="h3"
                            component="div"
                            sx={{
                                fontSize: {
                                    xs: FONT_SIZE.MD,
                                    md: FONT_SIZE.XL,
                                },
                                textOverflow: 'ellipsis',
                                whiteSpace: { xs: 'normal', sm: 'nowrap' },
                            }}
                        >
                            {data.heading}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={(theme) => ({
                                mt: 1,
                                color: theme.palette.faded?.main,
                                extOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                            })}
                        >
                            {restaurantName}
                        </Typography>
                    </Box>
                    <Stack
                        direction="row"
                        mt="auto"
                        alignItems="center"
                        gap="2.5"
                        sx={{
                            gridColumn: { xs: '1 / -1', sm: '2' },
                        }}
                    >
                        <StyledCartPrice>
                            &#8377; {data.price}
                        </StyledCartPrice>
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
                                decreaseHandler={decreaseHandler}
                            />
                            <IconButton
                                aria-label="delete"
                                onClick={deleteHandler}
                                sx={{ p: { xs: 0.75, sm: 1 } }}
                            >
                                <StyledCartDeleteIcon/>
                            </IconButton>
                        </Stack>
                    </Stack>
                </StyledCartItem>
            </StyledCartCard>
        </>
    );
}
