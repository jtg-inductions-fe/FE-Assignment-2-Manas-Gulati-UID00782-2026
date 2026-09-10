import { Box, Typography } from '@mui/material';
import { StyledNullState } from 'styles/Nullstate.styles';
import { NullStateProps } from 'types/null.types';

import { FONT_WEIGHT } from '@constant';

export const NullState = ({ title, description }: NullStateProps) => (
    <StyledNullState>
        <Typography variant="body1" sx={{ fontWeight: FONT_WEIGHT.SEMIBOLD }}>
            {title}
        </Typography>

        <Typography variant="subtitle1">{description}</Typography>
        <Box
            component="img"
            src="/Assets/null.webp"
            alt="null state"
            sx={{
                width: '60%',
                minHeight: 180,
                objectFit: 'cover',
            }}
        />
    </StyledNullState>
);
