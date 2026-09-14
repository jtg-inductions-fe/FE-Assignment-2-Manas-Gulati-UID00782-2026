import { useState } from 'react';

import { AccountCircle } from '@mui/icons-material';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { Searchbar } from 'components/Searchbar.component';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { logout } from 'store/authSlice';
import { useTypeDispatch, useTypeSelector } from 'store/hooks';
import {
    StyledAppBar,
    StyledBadge,
    StyledShoppingCartIcon,
    StyledToolbar,
    StyledUserBox,
} from 'styles/Header.styles.ts';
import { HeaderProps } from 'types';

import { FONT_SIZE } from '@constant';

import { ROUTES } from '../constants';

export const PrimarySearchAppBar = ({
    searchValue = '',
    onSearchChange,
    searchPlaceholder = 'Search…',
}: HeaderProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);
    const dispatch = useTypeDispatch();
    const navigate = useNavigate();
    const cartFoodItem = useTypeSelector((state) => state.cart.food);
    let quantity = 0;
    cartFoodItem.forEach((food) => {
        quantity += food.quantity;
    });

    /**
     * TODO: handle profile open functionality
     * @param e - {React.MouseEvent<HTMLElement>}
     */
    const handleProfileMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    };

    /**
     * TODO: handle profile close functionality
     */
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    /**
     * TODO: handle user logout
     */
    const handleLogout = () => {
        dispatch(logout());
        setAnchorEl(null);
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        navigate(ROUTES.HOME, { replace: true });
    };

    /**
     * TODO: redirect to orders page
     */
    const handleOrders = () => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        navigate(ROUTES.ORDER);
    };

    const userId = useTypeSelector((state) => state.auth.user?.userId);

    /**
     * TODO: navigate to cart page
     */
    const cartHandler = () => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        navigate(ROUTES.CART(userId ?? ROUTES.ERROR));
    };

    const menuId = 'primary-search-account-menu';

    //to show/hide profile options
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            sx={{
                '& .MuiMenuItem-root': {
                    fontSize: { xs: FONT_SIZE.LG, md: FONT_SIZE.XL },
                },
            }}
        >
            <MenuItem onClick={handleOrders}>Orders</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
    );

    //to display/hide cart
    const role = useTypeSelector((state) => state?.auth?.user?.role);

    return (
        <Box>
            <StyledAppBar position="sticky">
                <StyledToolbar>
                    <Typography
                        variant="h5"
                        component={RouterLink}
                        noWrap
                        to={ROUTES.HOME}
                        sx={(theme) => ({
                            ml: theme.spacing(1),
                            textDecoration: 'none',
                            color: theme.palette.common.black,
                        })}
                    >
                        Meishi
                    </Typography>
                    {onSearchChange && (
                        <Searchbar
                            value={searchValue}
                            placeholder={searchPlaceholder}
                            onChange={onSearchChange}
                        />
                    )}
                    <Box sx={{ flexGrow: 1 }} />
                    {/* Act as justify content: space between(provided by mui itself) */}
                    <StyledUserBox>
                        {role === 'customer' && (
                            <IconButton aria-label="cart" onClick={cartHandler}>
                                <StyledBadge
                                    badgeContent={quantity}
                                    color="success"
                                >
                                    <StyledShoppingCartIcon />
                                </StyledBadge>
                            </IconButton>
                        )}
                        <IconButton
                            size="small"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </StyledUserBox>
                </StyledToolbar>
            </StyledAppBar>
            {renderMenu}
        </Box>
    );
};
