import { StyledButton } from 'styles/Button.styles';
import { ReusableButtonProps } from 'types/button.types';

export const ReusableButton = ({
    children,
    variant = 'contained',
    selected,
    ...props
}: ReusableButtonProps) => (
    <StyledButton
        variant={variant}
        {...(selected !== undefined ? { selected } : {})}
        {...props}
    >
        {children}
    </StyledButton>
);
