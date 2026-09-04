import { useState } from 'react';

import AccountCircle from '@mui/icons-material/AccountCircle';
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

export default function PrimarySearchAppBar() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); //to handle opening and closing of menu
    const isMenuOpen = Boolean(anchorEl);

    const dispatch = useTypeDispatch();
    const navigate = useNavigate();
    //const cartFoodItem = useTypeSelector((state) => state.cart.food);
    const quantity = 0;
    // cartFoodItem.forEach((food) => {
    //     quantity += food.quantity;
    // });

    const handleProfileMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logout());
        setAnchorEl(null);
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        navigate(ROUTES.HOME, { replace: true });
    };

    const handleOrders = () => {
        //handle orders part
    };

    const userId = useTypeSelector((state) => state.auth.user?.userId);

    const cartHandler = () => {
        void navigate(`/dashboard/cart/${userId}`);
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
                    <Box sx={{ flexGrow: 1 }} />{' '}
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
