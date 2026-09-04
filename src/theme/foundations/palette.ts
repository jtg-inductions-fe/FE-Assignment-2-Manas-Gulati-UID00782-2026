import type { PaletteOptions } from '@mui/material/styles';

import { COLORS } from '@constant';

/* Custom Palette */
export const palette: PaletteOptions = {
    primary: {
        main: COLORS.PRIMARY.MAIN,
        light: COLORS.PRIMARY.LIGHT,
        dark: COLORS.PRIMARY.DARK,
        contrastText: COLORS.PRIMARY.CONTRASTTEXT,
    },
    warning: {
        main: COLORS.WARNING.MAIN,
        light: COLORS.WARNING.LIGHT,
        dark: COLORS.WARNING.DARK,
    },
    info: {
        main: COLORS.INFO.MAIN,
        light: COLORS.INFO.LIGHT,
        dark: COLORS.INFO.DARK,
    },
    faded: {
        light: COLORS.FADED.LIGHT,
        main: COLORS.FADED.MAIN,
        dark: COLORS.FADED.DARK,
    },
};
