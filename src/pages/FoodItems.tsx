import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import { Box, Stack, Typography } from '@mui/material';
import { useState } from 'react';

import { useDebouncedValue } from 'hooks/debounceHook';
import AutoGrid from 'layout/FoodDetails';
import { useTypeSelector } from 'store/hooks';
import {
    StyledFooditemBannerChip,
    StyledFooditemBannerDesc,
    StyledFooditemBannerDetailWrapper,
    StyledFooditemBannerName,
    StyledFooditemBannerWrapper,
    StyledFooditemDetailWrapper,
    StyledFooditemWrapper,
    StyledMenuText,
} from 'styles/Fooditem.styles';

import { FONT_SIZE, FONT_WEIGHT } from '@constant';

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
    const [searchValue, setSearchValue] = useState('');
    const debouncedSearchValue = useDebouncedValue(searchValue, 200);
    const query = debouncedSearchValue.trim().toLowerCase();
    let filterData = foodData;
    if (query) {
        filterData = foodData.filter((item) =>
            item.heading.toLowerCase().includes(query),
        );
    }
    return (
        <StyledFooditemWrapper>
            <Header
                searchValue={searchValue}
                onSearchChange={setSearchValue}
                searchPlaceholder="Search this menu…"
            />
            <StyledFooditemDetailWrapper>
                <StyledFooditemBannerWrapper>
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
                        <StyledFooditemBannerName>
                            <Typography variant="h4">
                                {restaurantName.charAt(0).toUpperCase()}
                            </Typography>
                        </StyledFooditemBannerName>
                        <Box>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: FONT_WEIGHT.BOLD,
                                }}
                            >
                                {restaurantName}
                            </Typography>
                            <StyledFooditemBannerDetailWrapper
                                direction="row"
                                flexWrap="wrap"
                                alignItems="center"
                                gap={2}
                            >
                                {restaurant?.category && (
                                    <StyledFooditemBannerChip
                                        size="small"
                                        icon={<RestaurantMenuOutlinedIcon />}
                                        label={
                                            restaurant.category === 'veg'
                                                ? 'Vegetarian'
                                                : 'Non-Vegetarian'
                                        }
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
                                        <Typography>
                                            {restaurant.location}
                                        </Typography>
                                    </Stack>
                                )}
                            </StyledFooditemBannerDetailWrapper>
                            {restaurant?.description && (
                                <StyledFooditemBannerDesc variant="subtitle1">
                                    {restaurant.description}
                                </StyledFooditemBannerDesc>
                            )}
                        </Box>
                    </Stack>
                </StyledFooditemBannerWrapper>

                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    gap={3}
                    sx={{ mt: 5 }}
                >
                    <StyledMenuText label="All Menu Items" />
                    <Typography sx={{ fontSize: FONT_SIZE.SM }}>
                        {filterData.length} items
                    </Typography>
                </Stack>

                <AutoGrid data={foodData} />
            </StyledFooditemDetailWrapper>
        </StyledFooditemWrapper>
    );
}
