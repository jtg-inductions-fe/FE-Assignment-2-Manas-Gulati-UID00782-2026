export declare module '@mui/material/styles/createMixins' {
    //Doubt: Why export
    interface Mixins {
        lineClamp: (lines: number) => CSSProperties;
    }
}

/* we will only consider mobile, tablet and desktop breakpoints for our project*/
declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xs: false;
        sm: true;
        md: true;
        lg: true;
        xl: false;
    }
}

declare module '@mui/material/styles/createTypography' {
    interface Typography {
        fontWeightSemiBold: number;
    }

    interface TypographyOptions {
        fontWeightSemiBold?: number;
    }
}
