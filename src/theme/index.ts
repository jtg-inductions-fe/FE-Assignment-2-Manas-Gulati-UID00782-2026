import { SCALING_FACTOR } from 'theme/constant';

import { createTheme, responsiveFontSizes } from '@mui/material/styles';

/* Customized MUI components themes */
import { components } from './components';
/* Customized foundation themes */
import { breakpoints, mixins, palette, typography } from './foundations';

/* 
Initialize the theme with base theme elements (excluding typography styles and spacing to ensure the theme has correct breakpoints and pxToRem function set.)
*/
let theme = createTheme({
    palette,
    breakpoints,
    mixins,
    components,
    typography: {
        ...typography.typographyStyle(),
        ...typography.typographyUtil,
        fontFamily: 'Inter,sans-serif',
    },
    spacing: (factor: number) =>
        theme.typography.pxToRem(factor * SCALING_FACTOR),
});

theme = responsiveFontSizes(theme, {
    factor: 1.25,
});

export { theme };
