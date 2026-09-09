import { StyledButton } from 'styles/Button.styles';
import { ReusableButtonProps } from 'types/button.types';

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
