import type { Components } from '@mui/material/styles';

//import all local font files
import InterRegularTTF from '/src/assets/fonts/inter/inter.regular.ttf';
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
            font-style: light;
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
            font-style: regular;
            font-weight: 600;
            src: url(${InterMediumWOFF2}) format('woff2');
                url(${InterRegularTTF}) format('truetype');
        }
        @font-face {
            font-display: swap; 
            font-family: 'Inter';
            font-style: semibold;
            font-weight: 700;
            src: url(${InterSemiBoldWOFF2}) format('woff2');
        }
        @font-face {
            font-display: swap; 
            font-family: 'Inter';
            font-style: bold;
            font-weight: 900;
            src: url(${InterBoldWOFF2}) format('woff2');
        };
    `;

//export custom fonts to use as default css
export const components: Components = {
    MuiCssBaseline: {
        styleOverrides: `${fontFaceDeclarations}
            html: {
                fontSize: 62.5%,
            }`,
    },
};
