import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { logout } from 'store/authSlice';
import { useTypeDispatch, useTypeSelector } from 'store/hooks';
import {
    Search,
    SearchIconWrapper,
    StyledAppBar,
    StyledBadge,
    StyledInputBase,
    StyledShoppingCartIcon,
    StyledToolbar,
    StyledUserBox,
} from 'styles/Header.styles.ts';
import { HeaderProps } from 'types';

import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
//import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
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

import { FONT_SIZE } from '@constant';
import { ROUTES } from '../constants';

export default function PrimarySearchAppBar({
    searchValue = '',
    onSearchChange,
    searchPlaceholder = 'Search…',
}: HeaderProps) {
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
     * handle profile open functionality
     * @param {any} e:React.MouseEvent<HTMLElement>
     * @returns {any}
     */
    const handleProfileMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    };

    /**
     * handle profile close functionality
     * @returns {any}
     */
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    /**
     * handle user logout
     * @returns {any}
     */
    const handleLogout = () => {
        dispatch(logout());
        setAnchorEl(null);
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        navigate(ROUTES.HOME, { replace: true });
    };

    const handleOrders = () => {
        void navigate('/dashboard/order');
    };

    const userId = useTypeSelector((state) => state.auth.user?.userId);

    /**
     * navigate to cart page
     * @returns {any}
     */
    const cartHandler = () => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        navigate(`/dashboard/cart/${userId}`);
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
                    fontSize: { sm: FONT_SIZE.LG, md: FONT_SIZE.XL },
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
                        to="/dashboard"
                        sx={(theme) => ({
                            ml: theme.spacing(1),
                            textDecoration: 'none',
                            color: theme.palette.common.black,
                        })}
                    >
                        Meishi
                    </Typography>
                    {onSearchChange && (
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon fontSize="small" />
                            </SearchIconWrapper>
                            <StyledInputBase
                                value={searchValue}
                                placeholder={searchPlaceholder}
                                inputProps={{ 'aria-label': searchPlaceholder }}
                                onChange={(event) =>
                                    onSearchChange(event.target.value)
                                }
                            />
                        </Search>
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
}
