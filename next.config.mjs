import { withPigment, extendTheme } from '@pigment-css/nextjs-plugin';

/** @type {import('next').NextConfig} */


const nextConfig = {};


export default withPigment(
    nextConfig,
    {
        css: {
            defaultDirection: 'ltr',
        },
        theme: extendTheme({
            getSelector: (colorScheme) => colorScheme ? `.theme-${colorScheme}` : ':root',
            colorSchemes: {
                light: {
                    colors: {
                        primary: {
                            background: "#FFFFFF",
                            contrastText: "#000000"
                        },
                        secondary: {
                            background: "#CCCCCC",
                            contrastText: "#333333"
                        },
                    }
                },
                dark: {
                    colors: {
                        primary: {
                            background: "#000000",
                            contrastText: "#FFFFFF"
                        },
                        secondary: {
                            background: "#333333",
                            contrastText: "#CCCCCC"
                        },
                    }
                }
            },
            breakpoints: {
                sm: "450px", // width of navigation thread
                md: "600px", // width of information thread
                lg: "1050px",
            },
            typographies: {
                body: { fontFamily: "var(--serious-font-family)", fontWeight: 300, fontSize: "1.125rem", lineHeight: 1.4, },
                quote: { fontFamily: "var(--playful-font-family)", fontWeight: 300, fontSize: "0.875rem", lineHeight: 1.4, },
                button: { fontFamily: "var(--serious-font-family)", fontWeight: 700, fontSize: "1rem", lineHeight: 1.4, },
                h1: { fontFamily: "var(--serious-font-family)", fontWeight: 700, fontSize: '4rem', lineHeight: 1.2, },
                h2: { fontFamily: "var(--serious-font-family)", fontWeight: 400, fontSize: '3.75rem', lineHeight: 1.2, },
                h3: { fontFamily: "var(--serious-font-family)", fontWeight: 400, fontSize: '2.25rem', lineHeight: 1.4, },
                h4: { fontFamily: "var(--serious-font-family)", fontWeight: 400, fontSize: '1.5rem', lineHeight: 1.4, },
                h5: { fontFamily: "var(--serious-font-family)", fontWeight: 300, fontSize: '1.25rem', lineHeight: 1.4, },
                h6: { fontFamily: "var(--serious-font-family)", fontWeight: 300, fontSize: '1.25rem', lineHeight: 1.25, },
            },
            transition: {
                short: ".3s",
                long: ".6s",
            },
            padding: {
                thread: "min(4rem, 8%)",
                panel: "1.5rem",
            }
        })
    }
);
