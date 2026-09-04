import AutoGrid from 'layout/CartDetails';
import { useTypeSelector } from 'store/hooks';

import { Box, Typography } from '@mui/material';

import Header from '../layout/Header';

export default function Cart() {
    const foodData = useTypeSelector((state) => state.cart.food);

    return (
        <Box sx={{ maxWidth: '2000px' }}>
            <Header />
            <Box
                component="main"
                sx={{
                    width: '100%',
                    maxWidth: 1700,
                    mx: 'auto',
                    px: 5,
                    pt: 5,
                    pb: { sm: 10, md: 14 },
                }}
            >
                <Typography variant="h4">Your Cart</Typography>
                <AutoGrid data={foodData} />
            </Box>
        </Box>
    );
}
