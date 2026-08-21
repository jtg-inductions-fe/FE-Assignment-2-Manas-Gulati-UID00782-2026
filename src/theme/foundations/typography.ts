import type {
    TypographyOptions,
    TypographyUtils,
} from '@mui/material/styles/createTypography';

import { FONT_SIZE, FONT_WEIGHT, HTML_FONT_SIZE, LINE_HEIGHT } from '@constant';

/* Custom px to rem function */
const typographyUtil: TypographyUtils = {
    /**
     * Converts a pixel value to rem units.
     * @param px - The pixel value to convert.
     * @returns The equivalent value in rem units as a string.
     */
    pxToRem: (px: number) => `${px / HTML_FONT_SIZE}` + 'rem',
};

/**
 * Creates a typography block with various styles
 * @returns The function returns a TypographyOptions object, which includes various typography settings,
 */
const typographyStyle = (): TypographyOptions => ({
    fontFamily: 'Inter',
    htmlFontSize: HTML_FONT_SIZE,

    fontWeightLight: FONT_WEIGHT.LIGHT,
    fontWeightRegular: FONT_WEIGHT.REGULAR,
    fontWeightMedium: FONT_WEIGHT.MEDIUM,
    fontWeightSemiBold: FONT_WEIGHT.SEMIBOLD,
    fontWeightBold: FONT_WEIGHT.BOLD,

    h1: {
        fontSize: typographyUtil.pxToRem(FONT_SIZE.XL),
        fontWeight: FONT_WEIGHT.BOLD,
        lineHeight: LINE_HEIGHT.HEADING,
    },
    h2: {
        fontSize: typographyUtil.pxToRem(FONT_SIZE.LG),
        fontWeight: FONT_WEIGHT.BOLD,
        lineHeight: LINE_HEIGHT.HEADING,
    },
    h3: {
        fontSize: typographyUtil.pxToRem(FONT_SIZE.LG),
        fontWeight: FONT_WEIGHT.SEMIBOLD,
        lineHeight: LINE_HEIGHT.HEADING,
    },
    h4: {
        fontSize: typographyUtil.pxToRem(FONT_SIZE.MD),
        fontWeight: FONT_WEIGHT.BOLD,
        lineHeight: LINE_HEIGHT.HEADING,
    },
    h5: {
        fontSize: typographyUtil.pxToRem(FONT_SIZE.MD),
        fontWeight: FONT_WEIGHT.SEMIBOLD,
        lineHeight: LINE_HEIGHT.HEADING,
    },
    h6: {
        fontSize: typographyUtil.pxToRem(FONT_SIZE.SM),
        fontWeight: FONT_WEIGHT.BOLD,
        lineHeight: LINE_HEIGHT.HEADING,
    },
});

export const typography = { typographyStyle, typographyUtil };
