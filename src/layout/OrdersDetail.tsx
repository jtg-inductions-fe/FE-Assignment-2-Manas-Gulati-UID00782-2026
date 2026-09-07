import { OrdersDetailProps } from 'types';

import { Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';

import { FONT_WEIGHT } from '@constant';

import RecipeReviewCard from './OrderFoodCards';

export default function AutoGrid({
    data,
    canChangeStatus,
    restaurantNames,
}: OrdersDetailProps) {
    if (data.length === 0) {
        return (
            <Box
                sx={(theme) => ({
                    p: { sm: 5, md: 8 },
                    mt: 4,
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
                    No orders available
                </Typography>
                <Typography variant="subtitle1">
                    Confirm Orders to show here
                </Typography>
            </Box>
        );
    }
    return (
        <>
            <Stack spacing={3} sx={{ mt: 4 }}>
                {data.map((order) => (
                    <RecipeReviewCard
                        key={order.orderId}
                        data={order}
                        canChangeStatus={canChangeStatus}
                        restaurantName={
                            restaurantNames[order.restaurantId] ??
                            `Restaurant ${order.restaurantId}`
                        }
                    />
                ))}
            </Stack>
        </>
    );
}
