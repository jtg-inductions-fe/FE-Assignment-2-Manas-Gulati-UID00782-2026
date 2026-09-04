export declare module '@mui/material/styles/createMixins' {
    //Doubt: Why export
    interface Mixins {
        lineClamp: (lines: number) => CSSProperties;
    }
}

/* we will only consider mobile, tablet and desktop breakpoints for our project*/
declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xs: true;
        sm: true;
        md: true;
        lg: true;
        xl: false;
    }

    interface Palette {
        faded?: {
            light?: string;
            main?: string;
            dark?: string;
        };
    }

    interface PaletteOptions {
        faded?: {
            light?: string;
            main?: string;
            dark?: string;
        };
    }
}

/*create type interface to declare semibold category and value it can take*/
declare module '@mui/material/styles/createTypography' {
    interface Typography {
        fontWeightSemiBold: number;
    }

    interface TypographyOptions {
        fontWeightSemiBold?: number;
    }
}
