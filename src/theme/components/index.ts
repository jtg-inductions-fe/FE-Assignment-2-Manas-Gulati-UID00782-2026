import type { Components } from '@mui/material/styles';

//import all local font files
import InterBoldWOFF2 from '/src/assets/fonts/inter/Inter-Bold.woff2';
import InterMediumWOFF2 from '/src/assets/fonts/inter/Inter-Medium.woff2';
import InterRegularWOFF2 from '/src/assets/fonts/inter/Inter-Regular.woff2';
import InterSemiBoldWOFF2 from '/src/assets/fonts/inter/Inter-SemiBold.woff2';
import InterLightWOFF2 from '/src/assets/fonts/inter/InterDisplay-Light.woff2';

//declare
const fontFaceDeclarations = `
        @font-face {
            font-display: swap; 
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            src: url(${InterLightWOFF2}) format('woff2');
        }
        @font-face {
            font-display: swap; 
            font-family: 'Inter';
            font-style: normal;
            font-weight: 500;
            src: url(${InterRegularWOFF2}) format('woff2');
        }
        @font-face {
            font-display: swap; 
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            src: url(${InterMediumWOFF2}) format('woff2');
        }
        @font-face {
            font-display: swap; 
            font-family: 'Inter';
            font-style: normal;
            font-weight: 700;
            src: url(${InterSemiBoldWOFF2}) format('woff2');
        }
        @font-face {
            font-display: swap; 
            font-family: 'Inter';
            font-style: normal;
            font-weight: 900;
            src: url(${InterBoldWOFF2}) format('woff2');
        };

        
    `;

export const components: Components = {
    MuiCssBaseline: {
        styleOverrides: {
            html: {
                fontSize: '62.5%',
            },
            fontFaceDeclarations,
        },
    },
};
