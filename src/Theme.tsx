import { createTheme, TypographyVariantsOptions, ThemeProvider } from '@mui/material/styles';
import { common } from '@mui/material/colors'
import * as React from 'react';


function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider theme={APPDARKTHEME} >
            {children}
        </ThemeProvider>
    )
}

const APPTYPOGRAPHY: TypographyVariantsOptions = {
    fontFamily: "Lato",
};


const APPSHAPE = { borderRadius: 0 };


const APPDARKTHEME = createTheme(
    {
        palette: {
            mode: "dark",
            background:
            {
                paper: common.black,
                default: common.black
            },
        },
        typography: APPTYPOGRAPHY,
        shape: APPSHAPE,
    });

export default ThemeProviderWrapper;
