import { Stack, Typography } from '@mui/material';
import { StyledNoOrderBox } from 'styles/Orders.styles';
import { OrdersDetailProps } from 'types';

import { FONT_WEIGHT } from '@constant';

import RecipeReviewCard from './OrderFoodCards';

export default function AutoGrid({
    data,
    canChangeStatus,
    restaurantNames,
}: OrdersDetailProps) {
    if (data.length === 0) {
        return (
            <StyledNoOrderBox>
                <Typography
                    variant="body1"
                    sx={{ fontWeight: FONT_WEIGHT.SEMIBOLD }}
                >
                    No orders available
                </Typography>
                <Typography variant="subtitle1">
                    Confirm Orders to show here
                </Typography>
            </StyledNoOrderBox>
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
