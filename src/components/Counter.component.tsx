import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove'; //can't be merged coz both have its own js file
import { IconButton } from '@mui/material';
import { StyledCount, StyledCounterBox } from 'styles/Counter.styles';
import { CounterProps } from 'types';

import { FONT_SIZE } from '@constant';

export const Counter = ({
    count,
    increaseHandler,
    decreaseHandler,
    disableIncrease = false,
}: CounterProps) => {
    /**
     * TODO: Determine color based on the value
     * @returns "success.main" | "text.secondary"
     */
    const getCounterColor = () => {
        if (count > 0) {
            return 'success.main';
        }

        return 'text.secondary';
    };

    return (
        <StyledCounterBox
            display="flex"
            alignItems="center"
            gap={{ xs: 0.25, md: 2 }}
        >
            <IconButton
                onClick={decreaseHandler}
                color="error"
                aria-label="decrement"
            >
                <RemoveIcon sx={{ fontSize: FONT_SIZE['3XL'] }} />
            </IconButton>

            <StyledCount
                variant="body2"
                fontWeight="bold"
                sx={{
                    color: getCounterColor(),
                }}
            >
                {count}
            </StyledCount>

            <IconButton
                onClick={increaseHandler}
                disabled={disableIncrease}
                color="success"
                aria-label="increment"
            >
                <AddIcon sx={{ fontSize: FONT_SIZE['3XL'] }} />
            </IconButton>
        </StyledCounterBox>
    );
};
