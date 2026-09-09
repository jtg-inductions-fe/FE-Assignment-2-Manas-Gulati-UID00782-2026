import { useState } from 'react';

import { Stack, ToggleButton, Typography } from '@mui/material';
import { useDebouncedValue } from 'hooks/useDebounceHook';
import { AutoGrid } from 'layout/RestaurantDetail';
import { useTypeSelector } from 'store/hooks';
import {
    StyledDashboardWrapper,
    StyledRestaurantDetailWrapper,
} from 'styles/Restaurant.styles';
import { StyledToggleButtonGroup } from 'styles/ToggleButton.styles';

import { PrimarySearchAppBar } from '../layout/Header';

export const Dashboard = () => {
    //determine what filter selected
    const [option, setOption] = useState<string>('null');
    const handleAlignment = (
        _event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setOption(newAlignment);
    };
    //determine user name
    const name = useTypeSelector((state) => state?.auth?.user?.name);
    const displayName =
        name && name.length > 0
            ? name.charAt(0).toUpperCase() + name.slice(1)
            : 'Guest';
    const restaurantData = useTypeSelector((state) => state.restaurant);
    const [searchValue, setSearchValue] = useState('');
    const debouncedSearchValue = useDebouncedValue(searchValue, 200);
    const query = debouncedSearchValue.trim().toLowerCase();

    let filterData = restaurantData;
    if (option) {
        if (option === 'veg') {
            filterData = restaurantData.filter(
                (item) => item.category === 'veg',
            );
        } else if (option === 'non-veg') {
            filterData = restaurantData.filter(
                (item) => item.category === 'non-veg',
            );
        }
    }
    if (query) {
        filterData = filterData.filter((item) =>
            item.heading.toLowerCase().includes(query),
        );
    }

    return (
        <StyledDashboardWrapper>
            <PrimarySearchAppBar
                searchValue={searchValue}
                onSearchChange={setSearchValue}
                searchPlaceholder="Search restaurants…"
            />
            <StyledRestaurantDetailWrapper>
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    justifyContent="space-between"
                    alignItems={{ xs: 'flex-start', md: 'flex-end' }}
                    gap={4}
                >
                    <Stack spacing={4}>
                        <Typography variant="h2">
                            Welcome, {displayName}
                        </Typography>
                        <Typography variant="h6">
                            Discover Deliciousness
                        </Typography>
                        <Typography variant="body1">
                            Find the best food near you, delivered hot and
                            fresh.
                        </Typography>
                    </Stack>

                    <StyledToggleButtonGroup
                        value={option}
                        exclusive
                        onChange={handleAlignment}
                        aria-label="Restaurant category"
                    >
                        <ToggleButton
                            value="null"
                            aria-label="All"
                            size="small"
                        >
                            All
                        </ToggleButton>
                        <ToggleButton value="veg" aria-label="veg" size="small">
                            Veg
                        </ToggleButton>
                        <ToggleButton
                            value="non-veg"
                            aria-label="non-veg"
                            size="small"
                        >
                            Non-Veg
                        </ToggleButton>
                    </StyledToggleButtonGroup>
                </Stack>
                <AutoGrid data={filterData} />
            </StyledRestaurantDetailWrapper>
        </StyledDashboardWrapper>
    );
};
