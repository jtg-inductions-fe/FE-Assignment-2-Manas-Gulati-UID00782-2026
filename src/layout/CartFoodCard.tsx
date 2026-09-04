import { useState } from 'react';

import Counter from 'components/Counter.component';
import { addFood } from 'store/cartSlice';
import { useTypeDispatch, useTypeSelector } from 'store/hooks';
import { CardProps } from 'types';

import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton, Stack } from '@mui/material';
import { CardMedia } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { FONT_SIZE, FONT_WEIGHT } from '@constant';

export default function MultiActionAreaCard({ data }: CardProps) {
    const dispatch = useTypeDispatch();
    const [count, setCount] = useState(data.quantity);
    const restaurantName = useTypeSelector(
        (state) => state.selectedRestaurant.restaurantName,
    );

    const increaseHandler = () => {
        dispatch(addFood({ data: data, quantity: count + 1 }));
        setCount(count + 1);
    };

    const decreaseHandler = () => {
        dispatch(addFood({ data: data, quantity: count - 1 }));
        setCount(count - 1);
    };

    const deleteHandler = () => {
        dispatch(addFood({ data: data, quantity: 0 }));
    };

    return (
        <>
            <Card
                sx={(theme) => ({
                    maxWidth: '100%',
                    display: 'flex',
                    border: `1px solid ${theme.palette.faded?.light}`,
                    borderRadius: 3,
                    boxShadow: '0 8px 24px rgba(28, 35, 40, 0.04)',
                    flexDirection: 'row',
                })}
            >
                <CardContent
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            sm: '88px minmax(0, 1fr)',
                            md: '120px minmax(0, 1fr) auto',
                        },
                        alignItems: 'center',
                        gap: 2.5,
                    }}
                >
                    <CardMedia
                        component="img"
                        image={data.img}
                        alt={data.alt}
                        sx={{
                            objectFit: 'cover',
                            width: { sm: 88, md: 120 },
                            height: { sm: 88, md: 120 },
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
                                    sm: FONT_SIZE.MD,
                                    md: FONT_SIZE.XL,
                                },
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {data.heading}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={(theme) => ({
                                mt: 1,
                                color: theme.palette.faded?.main,
                            })}
                        >
                            {restaurantName}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={(theme) => ({
                                mt: 1.5,
                                color: theme.palette.primary.main,
                                fontWeight: FONT_WEIGHT.BOLD,
                                ...theme.mixins.lineClamp(3),
                            })}
                        >
                            &#8377; {data.price}
                        </Typography>
                    </Box>
                    <Stack
                        direction="row"
                        mt="auto"
                        alignItems="center"
                        gap="2.5"
                    >
                        <Counter
                            count={count}
                            increaseHandler={increaseHandler}
                            decreaseHandler={decreaseHandler}
                        />
                        <IconButton aria-label="delete" onClick={deleteHandler}>
                            <DeleteIcon
                                sx={(theme) => ({
                                    fontSize: FONT_SIZE['3XL'],
                                    width: 30,
                                    height: 30,
                                    color: theme.palette.primary.main,
                                })}
                            />
                        </IconButton>
                    </Stack>
                </CardContent>
            </Card>
        </>
    );
}
