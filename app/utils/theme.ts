import type { ExtendTheme } from '@pigment-css/react/theme';

declare module '@pigment-css/react/theme' {
    interface ColorToken {
        background: string,
        contrastText: string,
    }
    interface TypographyToken {
        fontFamily: string,
        fontSize: string,
        fontWeight: string,
        lineHeight: number,
    }

    interface ThemeToken {
        colors: {
            primary: ColorToken,
            secondary: ColorToken,
        },
        breakpoints: {
            sm: number,
            md: number,
            lg: number,
        }
        typographies: {
            h1: TypographyToken,
            h2: TypographyToken,
            h3: TypographyToken,
            h4: TypographyToken,
            h5: TypographyToken,
            h6: TypographyToken,
            button: TypographyToken,
            body: TypographyToken,
            quote: TypographyToken,
        }
    }

    type ColorVariation = keyof ThemeToken["colors"];
    type TypographyVairation = keyof ThemeToken["typographies"]

    interface ThemeArgs {
        theme: ExtendTheme<{
            colorScheme: 'light' | 'dark';
            tokens: ThemeToken;
        }>;
    }
}

