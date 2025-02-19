import { withPigment, extendTheme } from '@pigment-css/nextjs-plugin';

/** @type {import('next').NextConfig} */


const nextConfig = {};


export default withPigment(
    nextConfig,
    {
        theme: extendTheme({
            getSelector: (colorScheme) => colorScheme ? `.theme-${colorScheme}` : 'body',
            colorSchemes: {
                light: {
                    colors: {
                        primary: {
                            background: "255 255 255",
                            contrastText: "0 0 0"
                        },
                        secondary: {
                            background: "205 205 205",
                            contrastText: "50 50 50"
                        },
                    }
                },
                dark: {
                    colors: {
                        primary: {
                            background: "0 0 0",
                            contrastText: "255 255 255"
                        },
                        secondary: {
                            background: "50 50 50",
                            contrastText: "205 205 205"
                        },
                    }
                }
            },
            breakpoint: {
                sm: "400px", // width of navigation thread
                md: "700px", // width of information thread
                lg: "1100px",
            },
            typographies: {
                body: { fontFamily: "var(--fonts-serious)", fontWeight: 300, fontSize: "1rem", lineHeight: 1.4, },
                button: { fontFamily: "var(--fonts-serious)", fontWeight: 500, fontSize: "1rem", lineHeight: 1.4, },
                quote: { fontFamily: "var(--fonts-playful)", fontWeight: 300, fontSize: "0.875rem", lineHeight: 1.4, },
                h1: { fontFamily: "var(--fonts-serious)", fontWeight: 300, fontSize: '4rem', lineHeight: 1.2, },
                h2: { fontFamily: "var(--fonts-serious)", fontWeight: 500, fontSize: '3.75rem', lineHeight: 1.2, },
                h3: { fontFamily: "var(--fonts-serious)", fontWeight: 500, fontSize: '2.25rem', lineHeight: 1.4, },
                h4: { fontFamily: "var(--fonts-serious)", fontWeight: 500, fontSize: '1.5rem', lineHeight: 1.4, },
                h5: { fontFamily: "var(--fonts-serious)", fontWeight: 300, fontSize: '1.25rem', lineHeight: 1.4, },
                h6: { fontFamily: "var(--fonts-serious)", fontWeight: 500, fontSize: '1.25rem', lineHeight: 1.25, },
            },
            transition: {
                short: ".3s",
                long: ".6s",
            },
            padding: {
                thread: "min(4rem, 8%)",
                panel: "1.5rem",
            },
            size: {
                header: {
                    height: "4rem",
                },
            },
            boxShadow: {
                thickness: {
                    normal: "1.5px",
                    focus: "8px"
                }
            }
        })
    }
);
