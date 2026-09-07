import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { logout } from 'store/authSlice';
import { useTypeDispatch, useTypeSelector } from 'store/hooks';
import {
    //Search,
    //SearchIconWrapper,
    StyledAppBar,
    StyledBadge,
    //StyledInputBase,
    StyledShoppingCartIcon,
    StyledToolbar,
    StyledUserBox,
} from 'styles/Header.styles.ts';

import AccountCircle from '@mui/icons-material/AccountCircle';
//import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { FONT_SIZE } from '@constant';

export default function PrimarySearchAppBar() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); //to handle opening and closing of menu
    const isMenuOpen = Boolean(anchorEl);

    const dispatch = useTypeDispatch();
    const navigate = useNavigate();

    const handleProfileMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logout());
        setAnchorEl(null);
        void navigate('/', { replace: true });
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
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
    );
    const cartHandler = () => {
        //handle cart logic
    };
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
                    {/* {onSearchChange && (
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
                    )} */}
                    <Box sx={{ flexGrow: 1 }} />{' '}
                    {/* Act as justify content: space between(provided by mui itself) */}
                    <StyledUserBox>
                        {role === 'customer' && (
                            <IconButton aria-label="cart" onClick={cartHandler}>
                                <StyledBadge
                                    //badgeContent={quantity}
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
