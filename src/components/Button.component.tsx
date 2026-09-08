import { ButtonProps } from '@mui/material';
import { StyledButton } from 'styles/Button.styles';

export interface ReusableButtonProps extends ButtonProps {
    selected?: boolean;
}

export default function ReusableButton({
    children,
    variant = 'contained',
    selected,
    ...props
}: ReusableButtonProps) {
    return (
        <StyledButton
            variant={variant}
            {...(selected !== undefined ? { selected } : {})}
            {...props}
        >
            {children}
        </StyledButton>
    );
}
