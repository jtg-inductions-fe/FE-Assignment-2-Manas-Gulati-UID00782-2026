import * as React from 'react';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { logout } from 'store/authSlice';
import { useTypeDispatch, useTypeSelector } from 'store/hooks';

import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AppBar from '@mui/material/AppBar';
import Badge, { BadgeProps } from '@mui/material/Badge';
import Box from '@mui/material/Box';
import { common } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { alpha, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius * 3,
    backgroundColor: alpha(theme.palette.common.white, 0.35),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(6),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',

    '& .MuiInputBase-input': {
        fontSize: '22px',
        paddingLeft: `calc(1.2em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    padding: 5,
    '& .MuiBadge-badge': {
        right: 0,
        top: 5,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '4px ',
        minWidth: 25,
        height: 25,
        fontSize: 16,
    },
}));

export default function PrimarySearchAppBar() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const dispatch = useTypeDispatch();
    const navigate = useNavigate();
    const isMenuOpen = Boolean(anchorEl);

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
                    fontSize: { sm: '18px', md: '20px' },
                },
            }}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
    );
    const role = useTypeSelector((state) => state?.auth?.user?.role);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ p: 2 }}>
                    <Typography
                        variant="h5"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' }, ml: 2 }}
                    >
                        Meishi
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon fontSize="small" />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: 'flex', gap: 3 }}>
                        {role === 'customer' && (
                            <IconButton aria-label="cart">
                                <StyledBadge badgeContent={4} color="success">
                                    <ShoppingCartIcon
                                        sx={{
                                            fontSize: '35px',
                                            color: common.black,
                                        }}
                                    />
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
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </Box>
    );
}
