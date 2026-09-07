import { useState } from 'react';

import { STATUS } from 'constants/orderStatusConstants';
import { useTypeDispatch } from 'store/hooks';
import { changeStatus } from 'store/orderSlice';
import { OrderCardProps } from 'types';
import { ExpandMoreProps } from 'types';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Box,
    Chip,
    Divider,
    FormControl,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { FONT_SIZE, FONT_WEIGHT } from '@constant';

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

export default function RecipeReviewCard({
    data,
    restaurantName,
    canChangeStatus,
}: OrderCardProps) {
    const [expanded, setExpanded] = useState(false);
    const dispatch = useTypeDispatch();
    let itemCount = 0;
    data.foodItem.forEach((orderedFood) => {
        itemCount += orderedFood.quantity;
    });

    const statusHandler = (e: SelectChangeEvent) => {
        dispatch(
            changeStatus({
                orderID: data.orderId,
                orderStatus: e.target.value,
            }),
        );
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card
            sx={(theme) => ({
                width: '100%',
                border: `1px solid ${theme.palette.faded?.light}`,
                borderRadius: 3,
                boxShadow: '0 8px 24px rgba(28, 35, 40, 0.05)',
            })}
        >
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
            <CardContent sx={{ p: { sm: 3, md: 4 } }}>
                <Stack
                    direction={{ sm: 'column', md: 'row' }}
                    justifyContent="space-between"
                    alignItems={{ sm: 'stretch', md: 'center' }}
                    gap={3}
                >
                    {canChangeStatus ? (
                        <FormControl size="small" sx={{ minWidth: 190 }}>
                            <Select
                                value={data.orderStatus}
                                aria-label={`Order status`}
                                onChange={statusHandler}
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
                                alignSelf: { sm: 'flex-start', md: 'center' },
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
                    <Typography
                        sx={(theme) => ({
                            color: theme.palette.primary.main,
                            fontSize: FONT_SIZE['2XL'],
                            fontWeight: FONT_WEIGHT.BOLD,
                        })}
                    >
                        &#8377;{data.totalPrice.toFixed(2)}
                    </Typography>
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
                    <Stack spacing={2} sx={{ p: { sm: 3, md: 4 }, pt: 3 }}>
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
        </Card>
    );
}
