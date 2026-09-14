import { Typography } from '@mui/material';
import { AutoGrid } from 'layout/CartDetails';
import { useTypeSelector } from 'store/hooks';
import {
    StyledCartDetailWrapper,
    StyledCartPageWrapper,
} from 'styles/Cart.styles';

import { PrimarySearchAppBar } from '../layout/Header';

export const Cart = () => {
    const foodData = useTypeSelector((state) => state.cart.food);

    return (
        <StyledCartPageWrapper>
            <PrimarySearchAppBar />
            <StyledCartDetailWrapper>
                <Typography variant="h4">Your Cart</Typography>
                <AutoGrid data={foodData} />
            </StyledCartDetailWrapper>
        </StyledCartPageWrapper>
    );
};
