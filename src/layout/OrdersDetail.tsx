import { Stack } from '@mui/material';
import { NullState } from 'components/Nullstate.component';
import { OrdersDetailProps } from 'types';

import { RecipeReviewCard } from './OrderFoodCards';

export const AutoGrid = ({
    data,
    canChangeStatus,
    restaurantNames,
}: OrdersDetailProps) => {
    let nullState = false;
    if (data.length === 0) {
        nullState = true;
    }
    if (nullState) {
        return (
            <NullState
                title="No orders available"
                description="Confirm Orders to show here"
            />
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
};
