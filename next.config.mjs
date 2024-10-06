import { withPigment, extendTheme } from '@pigment-css/nextjs-plugin';

/** @type {import('next').NextConfig} */


const nextConfig = {};

export default withPigment(
    nextConfig,
    {
        theme: extendTheme({
            colorSchemes: {
                light: {
                    colors: {
                        primary: { background: "#FFFFFF", contrastText: "#000000" },
                        secondary: { background: "#DDDDDD", contrastText: "#222222" },
                    }
                },
                dark: {
                    colors: {
                        primary: { background: "#000000", contrastText: "#FFFFFF" },
                        secondary: { background: "#222222", contrastText: "#DDDDDD" },
                    }
                }
            },
            breakpoints: {
                sm: "600px",
                md: "1000px",
                lg: "1400px",
            },
            typographies: {
                body: { fontFamily: "var(--lato-font-family)", fontWeight: 400, fontSize: "1.125rem", lineHeight: 1.4, },
                quote: { fontFamily: "var(--dancing-font-family)", fontWeight: 300, fontSize: "1.125rem", lineHeight: 1.4, },
                button: { fontFamily: "var(--lato-font-family)", fontWeight: 700, fontSize: "1rem", lineHeight: 1.4, },
                h1: { fontFamily: "var(--lato-font-family)", fontWeight: 700, fontSize: '4rem', lineHeight: 1.2, },
                h2: { fontFamily: "var(--lato-font-family)", fontWeight: 700, fontSize: '3.75rem', lineHeight: 1.2, },
                h3: { fontFamily: "var(--lato-font-family)", fontWeight: 700, fontSize: '2.25rem', lineHeight: 1.4, },
                h4: { fontFamily: "var(--lato-font-family)", fontWeight: 700, fontSize: '1.5rem', lineHeight: 1.4, },
                h5: { fontFamily: "var(--lato-font-family)", fontWeight: 700, fontSize: '1.25rem', lineHeight: 1.25, },
                h6: { fontFamily: "var(--lato-font-family)", fontWeight: 700, fontSize: '1.25rem', lineHeight: 1.4, },
            },
            transition: {
                short: ".3s",
                long: ".6s",
            }
        })
    }
);
