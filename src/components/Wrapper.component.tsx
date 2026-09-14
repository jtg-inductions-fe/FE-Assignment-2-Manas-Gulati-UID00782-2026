import { BoxProps } from '@mui/material';
import { StyledWrapper } from 'styles/Wrapper.styles';

export const ReusableWrapper = ({ children, ...props }: BoxProps) => (
    <StyledWrapper {...props}>{children}</StyledWrapper>
);
