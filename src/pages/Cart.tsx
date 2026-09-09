import { Typography } from '@mui/material';
import AutoGrid from 'layout/CartDetails';
import { useTypeSelector } from 'store/hooks';
import {
    StyledCartDetailWrapper,
    StyledCartPageWrapper,
} from 'styles/Cart.styles';

import Header from '../layout/Header';

export default function Cart() {
    const foodData = useTypeSelector((state) => state.cart.food);

    return (
        <StyledCartPageWrapper>
            <Header />
            <StyledCartDetailWrapper>
                <Typography variant="h4">Your Cart</Typography>
                <AutoGrid data={foodData} />
            </StyledCartDetailWrapper>
        </StyledCartPageWrapper>
    );
}
