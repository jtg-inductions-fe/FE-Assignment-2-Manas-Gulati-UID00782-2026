import { ButtonProps } from '@mui/material';
import { StyledButton } from 'styles/Button.styles';

export default function ReusableButton({
    children,
    variant = 'contained',
    ...props
}: ButtonProps) {
    return (
        <StyledButton variant={variant} {...props}>
            {children}
        </StyledButton>
    );
}
