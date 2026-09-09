import { BoxProps } from '@mui/material';
import { StyledWrapper } from 'styles/Wrapper.styles';

export default function ReusableWrapper({ children, ...props }: BoxProps) {
    return <StyledWrapper {...props}>{children}</StyledWrapper>;
}
