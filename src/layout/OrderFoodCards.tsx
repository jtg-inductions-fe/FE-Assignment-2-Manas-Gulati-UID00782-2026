import { useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Avatar,
    Box,
    CardActions,
    CardContent,
    CardHeader,
    Chip,
    Collapse,
    Divider,
    FormControl,
    IconButton,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    styled,
    Typography,
} from '@mui/material';
import { reduceStock } from 'store/fooditemSlice';
import { useTypeDispatch } from 'store/hooks';
import { changeStatus } from 'store/orderSlice';
import { StyledOrderCard, StyledOrderPrice } from 'styles/Orders.styles';
import { OrderCardProps } from 'types';
import { ExpandMoreProps } from 'types';

import { FONT_WEIGHT } from '@constant';

import { FINAL_STATUS, STATUS } from '../constants';

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { ...other } = props;
    return <IconButton {...other} />;
})(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    variants: [
        {
            props: ({ expand }) => !expand,
            style: {
                transform: 'rotate(0deg)',
            },
        },
        {
            props: ({ expand }) => !!expand,
            style: {
                transform: 'rotate(180deg)',
            },
        },
    ],
}));

export const RecipeReviewCard = ({
    data,
    restaurantName,
    canChangeStatus,
}: OrderCardProps) => {
    const [expanded, setExpanded] = useState(false);
    const dispatch = useTypeDispatch();
    const statusLock = FINAL_STATUS.includes(data.orderStatus);
    let itemCount = 0;
    data.foodItem.forEach((orderedFood) => {
        itemCount += orderedFood.quantity;
    });

    /**
     * TODO: Change order status
     * @param e - {SelectChangeEvent}
     */
    const statusHandler = (e: SelectChangeEvent) => {
        if (e.target.value === 'Accepted' && !data.stockDeducted) {
            dispatch(
                reduceStock({
                    data: data.foodItem,
                }),
            );
        }
        dispatch(
            changeStatus({
                orderID: data.orderId,
                orderStatus: e.target.value,
            }),
        );
    };

    /**
     * TODO: expands orders card
     */
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <StyledOrderCard>
            <CardHeader
                avatar={
                    <Avatar
                        sx={(theme) => ({
                            bgcolor: theme.palette.primary.main,
                        })}
                    >
                        {restaurantName.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={restaurantName}
                subheader={`Order #${data.orderId}`}
            />
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    justifyContent="space-between"
                    alignItems={{ xs: 'stretch', md: 'center' }}
                    gap={3}
                >
                    {canChangeStatus ? (
                        <FormControl size="small" sx={{ minWidth: 190 }}>
                            <Select
                                value={data.orderStatus}
                                aria-label={`Order status`}
                                onChange={statusHandler}
                                disabled={statusLock}
                            >
                                {STATUS.map((status) => (
                                    <MenuItem key={status} value={status}>
                                        {status}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    ) : (
                        <Chip
                            label={data.orderStatus}
                            variant="outlined"
                            sx={(theme) => ({
                                alignSelf: { xs: 'flex-start', md: 'center' },
                                color: theme.palette.primary.main,
                            })}
                        />
                    )}
                </Stack>
                <Divider sx={{ my: 3 }} />

                <Stack
                    direction="row"
                    flexWrap="wrap"
                    alignItems="center"
                    justifyContent="space-between"
                    gap={2}
                >
                    <Stack direction="row" flexWrap="wrap" gap={5}>
                        <Box>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Placed on
                            </Typography>
                            <Typography variant="body1">{data.date}</Typography>
                        </Box>
                        <Box>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Items
                            </Typography>
                            <Typography variant="body1">{itemCount}</Typography>
                        </Box>
                        {canChangeStatus && (
                            <Box>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    Customer
                                </Typography>
                                <Typography variant="body1">
                                    #{data.customerId}
                                </Typography>
                            </Box>
                        )}
                    </Stack>
                    <StyledOrderPrice>
                        &#8377;{data.totalPrice.toFixed(2)}
                    </StyledOrderPrice>
                </Stack>
            </CardContent>
            <CardActions disableSpacing>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Divider />
                <CardContent>
                    <Stack spacing={2} sx={{ p: { xs: 3, md: 4 }, pt: 3 }}>
                        {data.foodItem.map((food) => (
                            <Stack
                                key={food.foodId}
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                                gap={2}
                            >
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    gap={2}
                                    minWidth={0}
                                >
                                    <Box
                                        component="img"
                                        src={food.img}
                                        alt={food.alt}
                                        sx={{
                                            width: 56,
                                            height: 56,
                                            borderRadius: 2,
                                            objectFit: 'cover',
                                        }}
                                    />
                                    <Box minWidth={0}>
                                        <Typography variant="body1" noWrap>
                                            {food.heading}
                                        </Typography>
                                        <Typography
                                            variant="subtitle2"
                                            color="text.secondary"
                                        >
                                            Qty: {food.quantity}
                                        </Typography>
                                    </Box>
                                </Stack>
                                <Typography
                                    variant="body1"
                                    sx={{ fontWeight: FONT_WEIGHT.SEMIBOLD }}
                                >
                                    &#8377;
                                    {(food.price * food.quantity).toFixed(2)}
                                </Typography>
                            </Stack>
                        ))}
                    </Stack>
                </CardContent>
            </Collapse>
        </StyledOrderCard>
    );
};
