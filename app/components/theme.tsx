"use client"

import { createTheme, TypographyVariantsOptions, ThemeProvider } from '@mui/material/styles';
import { common } from '@mui/material/colors'
import * as React from 'react';
import { Lato } from 'next/font/google';

const lato = Lato({
    weight: ['100', '300', '400', '700', '900'],
    style: ['italic', 'normal'],
    subsets: ['latin-ext']
});

function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider theme={APPDARKTHEME} >
            {children}
        </ThemeProvider>
    )
}

const APPTYPOGRAPHY: TypographyVariantsOptions = {
    fontFamily: lato.style.fontFamily,
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
