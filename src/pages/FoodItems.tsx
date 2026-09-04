import AutoGrid from 'layout/FoodDetails';
import { useTypeSelector } from 'store/hooks';

import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import { Box, Chip, Stack, Typography } from '@mui/material';

import { FONT_SIZE, FONT_WEIGHT, LINE_HEIGHT } from '@constant';

import Header from '../layout/Header';

export default function FoodItems() {
    const foodData = useTypeSelector((state) => state.food);
    const selectedRestaurant = useTypeSelector(
        (state) => state.selectedRestaurant,
    );
    const restaurant = useTypeSelector((state) =>
        state.restaurant.find(
            (item) => item.restaurantId === selectedRestaurant.restaurantId,
        ),
    );
    const restaurantName = selectedRestaurant.restaurantName;
    const coverImage = restaurant?.img;

    return (
        <Box
            sx={{
                maxWidth: '2000px',
                display: 'flex',
                flexDirection: 'column',
                //backgroundColor: '#f8f9fa',
            }}
        >
            <Header />
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 1700,
                    mx: 'auto',
                    px: 5,
                    pt: 7,
                    pb: { sm: 10, md: 14 },
                }}
            >
                <Box
                    sx={(theme) => ({
                        overflow: 'hidden',
                        border: `5px solid ${theme.palette.faded?.light}`,
                        borderRadius: 11,
                        boxShadow: '0 10px 30px rgba(28, 35, 40, 0.05)',
                    })}
                >
                    <Box
                        role="img"
                        aria-label={`${restaurantName} restaurant`}
                        sx={{
                            height: { sm: 190, md: 320 },
                            backgroundImage: `linear-gradient(180deg, rgba(15, 6, 1, 0.08), rgba(12, 12, 12, 0.34)), url("${coverImage}")`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                        }}
                    />
                    <Stack
                        direction={{ sm: 'column', md: 'row' }}
                        alignItems={{ sm: 'flex-start', md: 'center' }}
                        gap={3}
                        sx={{ px: 3, py: 4 }}
                    >
                        <Box
                            sx={(theme) => ({
                                width: { sm: 104 },
                                height: { sm: 104 },
                                mt: { sm: -10 },
                                display: 'grid',
                                flexShrink: 0,
                                placeItems: 'center',
                                color: theme.palette.primary.main,
                                border: `1px solid ${theme.palette.faded?.light}`,
                                borderRadius: 2.5,
                                backgroundColor: theme.palette.common.white,
                                boxShadow: '0 5px 15px rgba(28, 35, 40, 0.10)',
                            })}
                        >
                            <Typography variant="h4">
                                {restaurantName.charAt(0).toUpperCase()}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: FONT_WEIGHT.BOLD,
                                }}
                            >
                                {restaurantName}
                            </Typography>
                            <Stack
                                direction="row"
                                flexWrap="wrap"
                                alignItems="center"
                                gap={2}
                                sx={(theme) => ({
                                    mt: 2,
                                    color: theme.palette.faded?.main,
                                })}
                            >
                                {restaurant?.category && (
                                    <Chip
                                        size="small"
                                        icon={<RestaurantMenuOutlinedIcon />}
                                        label={
                                            restaurant.category === 'veg'
                                                ? 'Vegetarian'
                                                : 'Non-Vegetarian'
                                        }
                                        sx={(theme) => ({
                                            color: theme.palette.faded?.main,
                                            backgroundColor:
                                                theme.palette.faded?.light,
                                            fontSize: FONT_SIZE.XS,
                                            fontWeight: FONT_WEIGHT.SEMIBOLD,
                                        })}
                                    />
                                )}
                                {restaurant?.location && (
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        gap={0.75}
                                    >
                                        <PlaceOutlinedIcon
                                            sx={{ fontSize: FONT_SIZE.LG }}
                                        />
                                        <Typography
                                            sx={{ fontSize: FONT_SIZE.SM }}
                                        >
                                            {restaurant.location}
                                        </Typography>
                                    </Stack>
                                )}
                            </Stack>
                            {restaurant?.description && (
                                <Typography
                                    variant="subtitle1"
                                    sx={(theme) => ({
                                        mt: 1.5,
                                        color: theme.palette.faded?.main,
                                        lineHeight: LINE_HEIGHT.HEADING,
                                    })}
                                >
                                    {restaurant.description}
                                </Typography>
                            )}
                        </Box>
                    </Stack>
                </Box>

                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    gap={3}
                    sx={{ mt: 5 }}
                >
                    <Chip
                        label="All Menu Items"
                        sx={(theme) => ({
                            height: 42,
                            px: 2,
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.common.white,
                        })}
                    />
                    <Typography sx={{ fontSize: FONT_SIZE.SM }}>
                        {foodData.length} items
                    </Typography>
                </Stack>

                <AutoGrid data={foodData} />
            </Box>
        </Box>
    );
}
