import { Props } from 'types';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, IconButton, Typography } from '@mui/material';

import { FONT_SIZE } from '@constant';

export default function Counter({
    count,
    increaseHandler,
    decreaseHandler,
}: Props) {
    // Determine color based on the value
    const getCounterColor = () => {
        if (count > 0) return 'success.main';
        if (count < 0) return 'error.main';
        return 'text.secondary';
    };

    return (
        <Box display="flex" alignItems="center" gap={2}>
            <IconButton
                onClick={decreaseHandler}
                color="error"
                aria-label="decrement"
            >
                <RemoveIcon sx={{ fontSize: FONT_SIZE['3XL'] }} />
            </IconButton>

            <Typography
                variant="body2"
                fontWeight="bold"
                sx={{
                    color: getCounterColor(),
                    minWidth: '40px',
                    textAlign: 'center',
                }}
            >
                {count}
            </Typography>

            <IconButton
                onClick={increaseHandler}
                color="success"
                aria-label="increment"
            >
                <AddIcon sx={{ fontSize: FONT_SIZE['3XL'] }} />
            </IconButton>
        </Box>
    );
}
